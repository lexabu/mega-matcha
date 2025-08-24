'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Leaf,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className='flex h-full w-64 flex-col bg-card border-r'>
      {/* Logo */}
      <div className='flex h-16 items-center border-b px-6'>
        <div className='flex items-center space-x-2'>
          <Leaf className='h-8 w-8 text-primary' />
          <span className='text-xl font-bold matcha-text-gradient'>
            Mega Matcha
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1 p-4'>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className='h-5 w-5' />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className='border-t p-4'>
        <p className='text-xs text-muted-foreground'>
          Mega Matcha Admin v1.0
        </p>
      </div>
    </div>
  );
}