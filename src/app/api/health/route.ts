import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/db';

export async function GET() {
  try {
    const dbConnected = await checkDatabaseConnection();
    
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbConnected ? 'connected' : 'disconnected',
        api: 'operational',
      },
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
    };

    return NextResponse.json(health, {
      status: dbConnected ? 200 : 503,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}