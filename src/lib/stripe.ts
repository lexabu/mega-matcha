import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// Client-side Stripe instance
let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Helper functions for common Stripe operations
export async function createPaymentIntent(amount: number, currency = 'usd') {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function createCustomer(data: {
  email: string;
  name?: string;
  phone?: string;
}) {
  try {
    const customer = await stripe.customers.create(data);
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function createSubscription(data: {
  customerId: string;
  priceId: string;
  paymentMethodId?: string;
}) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: data.customerId,
      items: [{ price: data.priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

export async function retrievePaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw error;
  }
}

export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  secret: string
) {
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, secret);
    return event;
  } catch (error) {
    console.error('Error constructing webhook event:', error);
    throw error;
  }
}

// Product and pricing helpers
export async function createProduct(data: {
  name: string;
  description?: string;
  images?: string[];
  metadata?: Record<string, string>;
}) {
  try {
    const product = await stripe.products.create(data);
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function createPrice(data: {
  productId: string;
  unitAmount: number;
  currency?: string;
  recurring?: {
    interval: 'day' | 'week' | 'month' | 'year';
    intervalCount?: number;
  };
}) {
  try {
    const price = await stripe.prices.create({
      product: data.productId,
      unit_amount: Math.round(data.unitAmount * 100),
      currency: data.currency || 'usd',
      recurring: data.recurring,
    });
    return price;
  } catch (error) {
    console.error('Error creating price:', error);
    throw error;
  }
}

// Utility functions
export function formatAmountForDisplay(amount: number, currency = 'usd'): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  return formatter.format(amount);
}

export function formatAmountFromStripe(amount: number, currency = 'usd'): number {
  return amount / 100; // Convert from cents to dollars
}