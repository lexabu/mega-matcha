import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty',
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Helper function to handle database errors
export function handleDatabaseError(error: unknown): Error {
  if (error instanceof Error) {
    console.error('Database error:', error.message);
    return error;
  }
  console.error('Unknown database error:', error);
  return new Error('An unknown database error occurred');
}

// Connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function disconnectDatabase(): Promise<void> {
  await db.$disconnect();
}