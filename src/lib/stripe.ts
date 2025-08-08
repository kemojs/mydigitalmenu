import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const PLANS = {
  STARTER: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    name: 'Starter',
    price: 29,
    yearlyPriceId: process.env.STRIPE_STARTER_YEARLY_PRICE_ID!,
    yearlyPrice: 290,
    features: [
      'Bis zu 100 Menü-Items',
      'Digitale Speisekarte mit QR-Code',
      'OCR Foto-zu-Digital Scanner',
      'Basis Analytics',
      'Mobile Optimierung',
      'Template Gallery (Basic)',
      'Email Support'
    ],
    limits: {
      restaurants: 1,
      menuItems: 100,
      analyticsRetention: 30, // days
    }
  },
  PROFESSIONAL: {
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
    name: 'Professional',
    price: 49,
    yearlyPriceId: process.env.STRIPE_PROFESSIONAL_YEARLY_PRICE_ID!,
    yearlyPrice: 490,
    features: [
      'Unbegrenzte Menü-Items',
      'Multi-Location Support (bis 3)',
      'Erweiterte Analytics & Insights',
      'A/B Testing für Menüs',
      'Custom Branding & Farben',
      'Premium Template Gallery',
      'Mehrsprachige Menüs',
      'Priority Support',
      'API Zugang',
      'Export Funktionen'
    ],
    limits: {
      restaurants: 3,
      menuItems: -1, // unlimited
      analyticsRetention: 365, // days
    }
  },
  ENTERPRISE: {
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
    name: 'Enterprise',
    price: 89,
    yearlyPriceId: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
    yearlyPrice: 890,
    features: [
      'Unbegrenzte Restaurants',
      'White-Label Lösungen',
      'Advanced Analytics Suite',
      'KI-basierte Empfehlungen',
      'Custom Integrationen',
      'Dedicated Account Manager',
      '24/7 Phone Support',
      'Training & Onboarding',
      'SLA Garantie',
      'Custom API Limits',
      'Multi-Tenant Management',
      'Advanced Security Features'
    ],
    limits: {
      restaurants: -1, // unlimited
      menuItems: -1, // unlimited
      analyticsRetention: -1, // unlimited
    }
  }
} as const

export type Plan = keyof typeof PLANS

/**
 * Creates a Stripe customer for a user
 */
export async function createStripeCustomer(email: string, name: string, userId: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId,
      },
    })
    
    return customer
  } catch (error) {
    console.error('Error creating Stripe customer:', error)
    throw new Error('Failed to create Stripe customer')
  }
}

/**
 * Creates a subscription for a customer
 */
export async function createSubscription(
  customerId: string,
  plan: Plan,
  billingPeriod: 'monthly' | 'yearly' = 'monthly'
) {
  try {
    const planConfig = PLANS[plan]
    const priceId = billingPeriod === 'yearly' ? planConfig.yearlyPriceId : planConfig.priceId

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{
        price: priceId,
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription'
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        plan,
        billingPeriod,
      },
    })

    return subscription
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw new Error('Failed to create subscription')
  }
}

/**
 * Updates a subscription to a new plan
 */
export async function updateSubscription(
  subscriptionId: string,
  newPlan: Plan,
  billingPeriod: 'monthly' | 'yearly' = 'monthly'
) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const planConfig = PLANS[newPlan]
    const priceId = billingPeriod === 'yearly' ? planConfig.yearlyPriceId : planConfig.priceId

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }],
      proration_behavior: 'create_prorations',
      metadata: {
        plan: newPlan,
        billingPeriod,
      },
    })

    return updatedSubscription
  } catch (error) {
    console.error('Error updating subscription:', error)
    throw new Error('Failed to update subscription')
  }
}

/**
 * Cancels a subscription at the end of the current period
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    return subscription
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw new Error('Failed to cancel subscription')
  }
}

/**
 * Reactivates a canceled subscription
 */
export async function reactivateSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    })

    return subscription
  } catch (error) {
    console.error('Error reactivating subscription:', error)
    throw new Error('Failed to reactivate subscription')
  }
}

/**
 * Creates a billing portal session for customer self-service
 */
export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session
  } catch (error) {
    console.error('Error creating billing portal session:', error)
    throw new Error('Failed to create billing portal session')
  }
}

/**
 * Creates a checkout session for new subscriptions
 */
export async function createCheckoutSession(
  customerId: string,
  plan: Plan,
  billingPeriod: 'monthly' | 'yearly',
  successUrl: string,
  cancelUrl: string
) {
  try {
    const planConfig = PLANS[plan]
    const priceId = billingPeriod === 'yearly' ? planConfig.yearlyPriceId : planConfig.priceId

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card', 'sepa_debit'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      tax_id_collection: {
        enabled: true,
      },
      customer_update: {
        name: 'auto',
        address: 'auto',
      },
      metadata: {
        plan,
        billingPeriod,
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw new Error('Failed to create checkout session')
  }
}

/**
 * Retrieves invoices for a customer
 */
export async function getCustomerInvoices(customerId: string, limit: number = 10) {
  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit,
      status: 'paid',
    })

    return invoices.data
  } catch (error) {
    console.error('Error retrieving invoices:', error)
    throw new Error('Failed to retrieve invoices')
  }
}

/**
 * Retrieves payment methods for a customer
 */
export async function getCustomerPaymentMethods(customerId: string) {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    })

    const sepaPaymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'sepa_debit',
    })

    return [...paymentMethods.data, ...sepaPaymentMethods.data]
  } catch (error) {
    console.error('Error retrieving payment methods:', error)
    throw new Error('Failed to retrieve payment methods')
  }
}

/**
 * Validates webhook signature
 */
export function validateWebhookSignature(payload: string, signature: string, secret: string) {
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, secret)
    return event
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    throw new Error('Invalid webhook signature')
  }
}

/**
 * Formats amount from Stripe (cents) to euros
 */
export function formatAmountFromStripe(amount: number): number {
  return amount / 100
}

/**
 * Formats amount to Stripe format (cents)
 */
export function formatAmountForStripe(amount: number): number {
  return Math.round(amount * 100)
}

export default stripe