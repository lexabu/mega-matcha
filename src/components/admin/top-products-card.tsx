'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopProductsCardProps {
  products: any[];
}

export function TopProductsCard({ products }: TopProductsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {products.length === 0 ? (
            <p className='text-muted-foreground'>No product data yet</p>
          ) : (
            products.map((product, index) => (
              <div
                key={product.id}
                className='flex items-center justify-between rounded-lg border p-3'
              >
                <div className='flex items-center space-x-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium'>
                    {index + 1}
                  </div>
                  <div>
                    <p className='font-medium'>{product.name}</p>
                    <p className='text-sm text-muted-foreground'>
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>{product._count?.orderItems || 0} sold</p>
                  <p className='text-xs text-muted-foreground'>
                    {product.inventory} in stock
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}