'use client';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { signOut } from 'next-auth/react';
import { LogOut, User } from 'lucide-react';

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className='flex h-16 items-center justify-between border-b bg-background px-6'>
      <div className='flex items-center space-x-4'>
        <h2 className='text-lg font-semibold'>Admin Panel</h2>
      </div>

      <div className='flex items-center space-x-4'>
        <ThemeToggle />
        
        <div className='flex items-center space-x-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10'>
            <User className='h-4 w-4' />
          </div>
          <div className='hidden md:block'>
            <p className='text-sm font-medium'>{user.name || 'Admin'}</p>
            <p className='text-xs text-muted-foreground'>{user.role}</p>
          </div>
        </div>

        <Button
          variant='ghost'
          size='sm'
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <LogOut className='h-4 w-4' />
          <span className='ml-2 hidden md:inline'>Sign Out</span>
        </Button>
      </div>
    </header>
  );
}