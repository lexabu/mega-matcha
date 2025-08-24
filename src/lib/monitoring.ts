import winston from 'winston';
import * as Sentry from '@sentry/nextjs';
import nodemailer from 'nodemailer';

// Winston logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'mega-matcha' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Email transporter for alerts
const emailTransporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Alert severity levels
export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Alert types
export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  timestamp: Date;
  service: string;
  metadata?: Record<string, any>;
}

// Monitoring service class
export class MonitoringService {
  private static instance: MonitoringService;

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  // Log messages with different levels
  log(level: 'info' | 'warn' | 'error', message: string, meta?: any) {
    logger.log(level, message, meta);
    
    // Send to Sentry for errors
    if (level === 'error' && meta?.error) {
      Sentry.captureException(meta.error, {
        tags: {
          service: 'mega-matcha',
          level,
        },
        extra: meta,
      });
    }
  }

  // Track custom metrics
  async trackMetric(name: string, value: number, tags?: Record<string, string>) {
    const metric = {
      name,
      value,
      tags,
      timestamp: new Date(),
    };

    this.log('info', `Metric: ${name}`, metric);

    // Send to external monitoring services
    // e.g., DataDog, New Relic, etc.
    if (process.env.DATADOG_API_KEY) {
      // Implementation for DataDog
      console.log('Would send to DataDog:', metric);
    }
  }

  // Send alerts
  async sendAlert(alert: Alert) {
    this.log('warn', `Alert: ${alert.title}`, alert);

    // Send email alert for high/critical severity
    if (alert.severity === AlertSeverity.HIGH || alert.severity === AlertSeverity.CRITICAL) {
      await this.sendEmailAlert(alert);
    }

    // Send to Slack webhook
    if (process.env.SLACK_WEBHOOK_URL) {
      await this.sendSlackAlert(alert);
    }

    // Send to PagerDuty for critical alerts
    if (alert.severity === AlertSeverity.CRITICAL && process.env.PAGERDUTY_INTEGRATION_KEY) {
      await this.sendPagerDutyAlert(alert);
    }
  }

  private async sendEmailAlert(alert: Alert) {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'alerts@mega-matcha.com',
        to: process.env.ALERT_EMAIL || 'admin@mega-matcha.com',
        subject: `🚨 ${alert.severity.toUpperCase()}: ${alert.title}`,
        html: `
          <h2>${alert.title}</h2>
          <p><strong>Severity:</strong> ${alert.severity}</p>
          <p><strong>Service:</strong> ${alert.service}</p>
          <p><strong>Time:</strong> ${alert.timestamp.toISOString()}</p>
          <p><strong>Message:</strong> ${alert.message}</p>
          ${alert.metadata ? `<pre>${JSON.stringify(alert.metadata, null, 2)}</pre>` : ''}
        `,
      };

      await emailTransporter.sendMail(mailOptions);
    } catch (error) {
      this.log('error', 'Failed to send email alert', { error, alert });
    }
  }

  private async sendSlackAlert(alert: Alert) {
    try {
      const webhook = process.env.SLACK_WEBHOOK_URL;
      if (!webhook) return;

      const color = {
        [AlertSeverity.LOW]: '#36a64f',
        [AlertSeverity.MEDIUM]: '#ffaa00',
        [AlertSeverity.HIGH]: '#ff6600',
        [AlertSeverity.CRITICAL]: '#ff0000',
      }[alert.severity];

      const payload = {
        attachments: [
          {
            color,
            title: alert.title,
            text: alert.message,
            fields: [
              {
                title: 'Severity',
                value: alert.severity.toUpperCase(),
                short: true,
              },
              {
                title: 'Service',
                value: alert.service,
                short: true,
              },
              {
                title: 'Time',
                value: alert.timestamp.toISOString(),
                short: false,
              },
            ],
          },
        ],
      };

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      this.log('error', 'Failed to send Slack alert', { error, alert });
    }
  }

  private async sendPagerDutyAlert(alert: Alert) {
    try {
      const integrationKey = process.env.PAGERDUTY_INTEGRATION_KEY;
      if (!integrationKey) return;

      const payload = {
        routing_key: integrationKey,
        event_action: 'trigger',
        payload: {
          summary: alert.title,
          source: alert.service,
          severity: alert.severity,
          custom_details: {
            message: alert.message,
            metadata: alert.metadata,
          },
        },
      };

      await fetch('https://events.pagerduty.com/v2/enqueue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      this.log('error', 'Failed to send PagerDuty alert', { error, alert });
    }
  }
}

// Health check monitors
export class HealthMonitor {
  private monitoring = MonitoringService.getInstance();

  async checkDatabaseHealth(): Promise<boolean> {
    try {
      const { checkDatabaseConnection } = await import('@/lib/db');
      const isHealthy = await checkDatabaseConnection();
      
      if (!isHealthy) {
        await this.monitoring.sendAlert({
          id: `db-health-${Date.now()}`,
          title: 'Database Connection Failed',
          message: 'Unable to connect to the database',
          severity: AlertSeverity.CRITICAL,
          timestamp: new Date(),
          service: 'database',
        });
      }

      await this.monitoring.trackMetric('database.health', isHealthy ? 1 : 0);
      return isHealthy;
    } catch (error) {
      await this.monitoring.sendAlert({
        id: `db-error-${Date.now()}`,
        title: 'Database Health Check Error',
        message: 'Error occurred during database health check',
        severity: AlertSeverity.HIGH,
        timestamp: new Date(),
        service: 'database',
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
      });
      return false;
    }
  }

  async checkApiHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/health`);
      const isHealthy = response.ok;

      if (!isHealthy) {
        await this.monitoring.sendAlert({
          id: `api-health-${Date.now()}`,
          title: 'API Health Check Failed',
          message: `API health endpoint returned status ${response.status}`,
          severity: AlertSeverity.HIGH,
          timestamp: new Date(),
          service: 'api',
        });
      }

      await this.monitoring.trackMetric('api.health', isHealthy ? 1 : 0);
      return isHealthy;
    } catch (error) {
      await this.monitoring.sendAlert({
        id: `api-error-${Date.now()}`,
        title: 'API Health Check Error',
        message: 'Error occurred during API health check',
        severity: AlertSeverity.HIGH,
        timestamp: new Date(),
        service: 'api',
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
      });
      return false;
    }
  }

  async checkPaymentProviderHealth(): Promise<boolean> {
    try {
      const { stripe } = await import('@/lib/stripe');
      
      // Simple test to check if Stripe is accessible
      await stripe.customers.list({ limit: 1 });
      
      await this.monitoring.trackMetric('stripe.health', 1);
      return true;
    } catch (error) {
      await this.monitoring.sendAlert({
        id: `stripe-error-${Date.now()}`,
        title: 'Stripe Health Check Failed',
        message: 'Unable to communicate with Stripe API',
        severity: AlertSeverity.HIGH,
        timestamp: new Date(),
        service: 'payments',
        metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
      });

      await this.monitoring.trackMetric('stripe.health', 0);
      return false;
    }
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private monitoring = MonitoringService.getInstance();

  async trackApiResponse(endpoint: string, duration: number, statusCode: number) {
    await this.monitoring.trackMetric('api.response_time', duration, {
      endpoint,
      status_code: statusCode.toString(),
    });

    // Alert on slow responses
    if (duration > 5000) { // 5 seconds
      await this.monitoring.sendAlert({
        id: `slow-api-${Date.now()}`,
        title: 'Slow API Response',
        message: `API endpoint ${endpoint} took ${duration}ms to respond`,
        severity: AlertSeverity.MEDIUM,
        timestamp: new Date(),
        service: 'api',
        metadata: { endpoint, duration, statusCode },
      });
    }
  }

  async trackDatabaseQuery(query: string, duration: number) {
    await this.monitoring.trackMetric('database.query_time', duration, {
      query_type: this.getQueryType(query),
    });

    // Alert on slow queries
    if (duration > 10000) { // 10 seconds
      await this.monitoring.sendAlert({
        id: `slow-query-${Date.now()}`,
        title: 'Slow Database Query',
        message: `Database query took ${duration}ms to execute`,
        severity: AlertSeverity.MEDIUM,
        timestamp: new Date(),
        service: 'database',
        metadata: { query, duration },
      });
    }
  }

  private getQueryType(query: string): string {
    const queryLower = query.toLowerCase().trim();
    if (queryLower.startsWith('select')) return 'select';
    if (queryLower.startsWith('insert')) return 'insert';
    if (queryLower.startsWith('update')) return 'update';
    if (queryLower.startsWith('delete')) return 'delete';
    return 'other';
  }
}

// Error handler middleware
export function createErrorHandler() {
  return (error: Error, req: any, res: any, next: any) => {
    const monitoring = MonitoringService.getInstance();
    
    monitoring.log('error', error.message, {
      error,
      url: req?.url,
      method: req?.method,
      userAgent: req?.headers?.['user-agent'],
    });

    // Send alert for 5xx errors
    if (res?.statusCode >= 500) {
      monitoring.sendAlert({
        id: `server-error-${Date.now()}`,
        title: '5xx Server Error',
        message: error.message,
        severity: AlertSeverity.HIGH,
        timestamp: new Date(),
        service: 'api',
        metadata: {
          url: req?.url,
          method: req?.method,
          statusCode: res?.statusCode,
        },
      });
    }

    next(error);
  };
}

// Export singleton instances
export const monitoring = MonitoringService.getInstance();
export const healthMonitor = new HealthMonitor();
export const performanceMonitor = new PerformanceMonitor();