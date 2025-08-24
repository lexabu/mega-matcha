import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getAnalyticsSummary, getTopProducts } from '@/lib/analytics';
import { db } from '@/lib/db';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { RevenueChart } from '@/components/admin/revenue-chart';
import { OrdersTable } from '@/components/admin/orders-table';
import { TopProductsCard } from '@/components/admin/top-products-card';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Mega Matcha',
  description: 'Administrative dashboard for managing Mega Matcha operations',
};

export default async function AdminDashboard() {
  // Check authentication and authorization
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    redirect('/auth/signin?callbackUrl=/admin/dashboard');
  }

  // Fetch dashboard data
  const [
    analyticsSummary,
    topProducts,
    recentOrders,
    lowStockProducts,
  ] = await Promise.all([
    getAnalyticsSummary(30),
    getTopProducts(5, 30),
    db.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true },
        },
        items: {
          include: {
            product: {
              select: { name: true },
            },
          },
        },
      },
    }),
    db.product.findMany({
      where: {
        AND: [
          { inventory: { lte: 10 } }, // Default low stock threshold
          { isActive: true },
        ],
      },
      take: 5,
      include: {
        images: {
          take: 1,
          orderBy: { sortOrder: 'asc' },
        },
      },
    }),
  ]);

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='border-b pb-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground mt-2'>
          Welcome back, {session.user.name}. Here&apos;s what&apos;s happening with your
          store today.
        </p>
      </div>

      {/* Stats Overview */}
      <DashboardStats
        pageViews={analyticsSummary.pageViews}
        orders={analyticsSummary.orders}
        revenue={Number(analyticsSummary.revenue)}
        newUsers={analyticsSummary.newUsers}
        conversionRate={Number(analyticsSummary.conversionRate)}
      />

      {/* Charts and Analytics */}
      <div className='grid gap-6 md:grid-cols-2'>
        <RevenueChart />
        <TopProductsCard products={topProducts} />
      </div>

      {/* Recent Orders and Alerts */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Recent Orders</h3>
          <OrdersTable orders={recentOrders} />
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>
            Low Stock Alert
            {lowStockProducts.length > 0 && (
              <span className='ml-2 text-sm text-red-600'>
                ({lowStockProducts.length} items)
              </span>
            )}
          </h3>
          <div className='space-y-3'>
            {lowStockProducts.length === 0 ? (
              <p className='text-muted-foreground'>All products are well-stocked</p>
            ) : (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className='flex items-center justify-between rounded-lg border p-3'
                >
                  <div className='flex items-center space-x-3'>
                    {product.images[0] && (
                      <div
                        className='h-10 w-10 rounded bg-muted flex items-center justify-center'
                        title={product.name}
                      >
                        📦
                      </div>
                    )}
                    <div>
                      <p className='font-medium'>{product.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-red-600'>
                      {product.inventory} left
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Alert at {product.lowStockAlert}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}