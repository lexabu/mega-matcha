'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrdersTableProps {
  orders: any[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {orders.length === 0 ? (
            <p className='text-muted-foreground'>No orders yet</p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className='flex items-center justify-between rounded-lg border p-3'
              >
                <div>
                  <p className='font-medium'>{order.orderNumber}</p>
                  <p className='text-sm text-muted-foreground'>
                    {order.user?.name || order.user?.email}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>${Number(order.totalAmount).toFixed(2)}</p>
                  <p className='text-xs text-muted-foreground'>{order.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}