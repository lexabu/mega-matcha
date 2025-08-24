import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Leaf, Sparkles, Heart, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className='from-background to-muted/50 min-h-screen bg-gradient-to-br'>
      {/* Header */}
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
        <div className='container flex h-16 items-center justify-between px-4'>
          <div className='flex items-center space-x-2'>
            <Leaf className='text-primary h-8 w-8' />
            <span className='matcha-text-gradient text-xl font-bold'>
              Mega Matcha
            </span>
          </div>
          <nav className='hidden items-center space-x-6 text-sm font-medium md:flex'>
            <a
              href='#products'
              className='hover:text-primary transition-colors'
            >
              Products
            </a>
            <a href='#about' className='hover:text-primary transition-colors'>
              About
            </a>
            <a href='#contact' className='hover:text-primary transition-colors'>
              Contact
            </a>
          </nav>
          <div className='flex items-center space-x-2'>
            <ThemeToggle />
            <Button variant='matcha' size='sm'>
              Shop Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className='container px-4 py-16'>
        <section className='flex flex-col items-center space-y-8 text-center'>
          <div className='animate-fade-in space-y-4'>
            <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'>
              Premium <span className='matcha-text-gradient'>Matcha</span>{' '}
              Experience
            </h1>
            <p className='text-muted-foreground mx-auto max-w-[700px] text-lg sm:text-xl'>
              Discover the finest matcha products and experience the authentic
              taste of Japanese tea culture. From ceremonial grade to everyday
              blends, we bring you premium quality matcha for tea lovers
              worldwide.
            </p>
          </div>

          <div className='animate-slide-up flex flex-col gap-4 sm:flex-row'>
            <Button variant='matcha' size='lg' className='min-w-[200px]'>
              <Sparkles className='mr-2 h-4 w-4' />
              Explore Collection
            </Button>
            <Button variant='outline' size='lg' className='min-w-[200px]'>
              Learn About Matcha
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className='grid gap-8 py-24 md:grid-cols-3'>
          <div className='animate-scale-in flex flex-col items-center space-y-4 text-center'>
            <div className='bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full'>
              <Leaf className='text-primary h-8 w-8' />
            </div>
            <h3 className='text-xl font-semibold'>Premium Quality</h3>
            <p className='text-muted-foreground'>
              Sourced directly from the finest tea gardens in Uji, Japan, our
              matcha is stone-ground to perfection.
            </p>
          </div>

          <div className='animate-scale-in flex flex-col items-center space-y-4 text-center'>
            <div className='bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full'>
              <Heart className='text-primary h-8 w-8' />
            </div>
            <h3 className='text-xl font-semibold'>Health Benefits</h3>
            <p className='text-muted-foreground'>
              Rich in antioxidants, L-theanine, and natural caffeine for
              sustained energy and mental clarity.
            </p>
          </div>

          <div className='animate-scale-in flex flex-col items-center space-y-4 text-center'>
            <div className='bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full'>
              <Globe className='text-primary h-8 w-8' />
            </div>
            <h3 className='text-xl font-semibold'>Sustainable</h3>
            <p className='text-muted-foreground'>
              Ethically sourced and environmentally conscious packaging for a
              better tomorrow.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className='from-primary/10 via-primary/5 to-primary/10 rounded-lg bg-gradient-to-r p-8 text-center'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
            Ready to Begin Your Matcha Journey?
          </h2>
          <p className='text-muted-foreground mx-auto mt-4 max-w-[600px]'>
            Join thousands of matcha enthusiasts who have discovered the perfect
            balance of flavor, quality, and tradition.
          </p>
          <Button variant='matcha' size='lg' className='mt-6'>
            Start Shopping
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className='bg-muted/50 border-t'>
        <div className='container px-4 py-8'>
          <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
            <div className='flex items-center space-x-2'>
              <Leaf className='text-primary h-6 w-6' />
              <span className='font-semibold'>Mega Matcha</span>
            </div>
            <p className='text-muted-foreground text-sm'>
              © 2024 Mega Matcha. Crafted with love for matcha enthusiasts
              worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
