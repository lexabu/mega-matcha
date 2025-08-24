import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

export const metadata: Metadata = {
  title: 'Admin Panel | Mega Matcha',
  description: 'Administrative panel for managing Mega Matcha',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated and has admin role
  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/admin/dashboard');
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    redirect('/');
  }

  return (
    <div className='flex h-screen bg-background'>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Header */}
        <AdminHeader user={session.user} />

        {/* Content */}
        <main className='flex-1 overflow-y-auto bg-muted/10 p-6'>
          <div className='mx-auto max-w-7xl'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}