'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[300px] w-full rounded-md border border-dashed border-muted-foreground/25 flex items-center justify-center'>
          <p className='text-muted-foreground'>Chart will be rendered here</p>
        </div>
      </CardContent>
    </Card>
  );
}