'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

interface DashboardStatsProps {
  pageViews: number;
  orders: number;
  revenue: number;
  newUsers: number;
  conversionRate: number;
}

export function DashboardStats({
  pageViews,
  orders,
  revenue,
  newUsers,
  conversionRate,
}: DashboardStatsProps) {
  const stats = [
    {
      title: 'Total Revenue',
      value: `$${revenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Orders',
      value: orders.toLocaleString(),
      icon: ShoppingCart,
      change: '+8.2%',
      changeType: 'positive' as const,
    },
    {
      title: 'New Users',
      value: newUsers.toLocaleString(),
      icon: Users,
      change: '+5.1%',
      changeType: 'positive' as const,
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      icon: TrendingUp,
      change: '+0.5%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
            <stat.icon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
            <p className='text-xs text-muted-foreground'>
              <span
                className={`inline-flex items-center ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}