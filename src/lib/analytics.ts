import { db } from '@/lib/db';

// Event tracking types
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  sessionId: string;
  timestamp?: Date;
}

export interface EcommerceEvent {
  event: 'view_item' | 'add_to_cart' | 'remove_from_cart' | 'begin_checkout' | 'purchase';
  currency?: string;
  value?: number;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}

// Analytics service class
export class Analytics {
  private sessionId: string;
  private userId?: string;

  constructor(sessionId: string, userId?: string) {
    this.sessionId = sessionId;
    this.userId = userId;
  }

  // Track page views
  async trackPageView(path: string, additionalData?: Record<string, any>) {
    try {
      await db.pageView.create({
        data: {
          path,
          userId: this.userId,
          sessionId: this.sessionId,
          userAgent: additionalData?.userAgent,
          referer: additionalData?.referer,
          country: additionalData?.country,
        },
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  // Track product views
  async trackProductView(productId: string) {
    try {
      await db.productView.create({
        data: {
          productId,
          userId: this.userId,
          sessionId: this.sessionId,
        },
      });
    } catch (error) {
      console.error('Error tracking product view:', error);
    }
  }

  // Track custom events
  async trackEvent(event: AnalyticsEvent) {
    try {
      // Store custom events in a generic way
      // You might want to use a time-series database for this in production
      console.log('Analytics Event:', {
        ...event,
        userId: this.userId,
        sessionId: this.sessionId,
        timestamp: new Date(),
      });
      
      // Send to external analytics services
      if (typeof window !== 'undefined') {
        // Google Analytics 4
        if (window.gtag) {
          window.gtag('event', event.name, {
            custom_parameter: JSON.stringify(event.properties),
            user_id: this.userId,
          });
        }

        // PostHog
        if (window.posthog) {
          window.posthog.capture(event.name, {
            ...event.properties,
            sessionId: this.sessionId,
          });
        }
      }
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  // E-commerce specific tracking
  async trackEcommerceEvent(event: EcommerceEvent) {
    try {
      await this.trackEvent({
        name: event.event,
        properties: {
          currency: event.currency,
          value: event.value,
          items: event.items,
        },
        sessionId: this.sessionId,
        userId: this.userId,
      });

      // Send to Google Analytics Enhanced E-commerce
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event.event, {
          currency: event.currency || 'USD',
          value: event.value,
          items: event.items,
        });
      }
    } catch (error) {
      console.error('Error tracking e-commerce event:', error);
    }
  }
}

// Utility functions for generating session IDs
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Server-side analytics functions
export async function getAnalyticsSummary(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    const [
      pageViews,
      productViews,
      orders,
      revenue,
      newUsers,
    ] = await Promise.all([
      // Page views
      db.pageView.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
      
      // Product views
      db.productView.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
      
      // Orders
      db.order.count({
        where: {
          createdAt: {
            gte: startDate,
          },
          status: {
            in: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'],
          },
        },
      }),
      
      // Revenue
      db.order.aggregate({
        where: {
          createdAt: {
            gte: startDate,
          },
          paymentStatus: 'PAID',
        },
        _sum: {
          totalAmount: true,
        },
      }),
      
      // New users
      db.user.count({
        where: {
          createdAt: {
            gte: startDate,
          },
        },
      }),
    ]);

    return {
      pageViews,
      productViews,
      orders,
      revenue: revenue._sum.totalAmount || 0,
      newUsers,
      conversionRate: pageViews > 0 ? (orders / pageViews * 100).toFixed(2) : '0.00',
    };
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    throw error;
  }
}

export async function getTopProducts(limit = 10, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    return await db.product.findMany({
      include: {
        _count: {
          select: {
            orderItems: {
              where: {
                order: {
                  createdAt: {
                    gte: startDate,
                  },
                },
              },
            },
          },
        },
        images: {
          take: 1,
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: {
        orderItems: {
          _count: 'desc',
        },
      },
      take: limit,
    });
  } catch (error) {
    console.error('Error getting top products:', error);
    throw error;
  }
}

// Types for external analytics services
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string, properties?: Record<string, any>) => void;
    };
  }
}