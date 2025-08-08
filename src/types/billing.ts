import { Plan, SubscriptionStatus } from '@prisma/client'

export interface BillingInfo {
  plan: Plan
  subscriptionStatus: SubscriptionStatus
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  stripeCustomerId: string
  stripeSubscriptionId: string
}

export interface Invoice {
  id: string
  number: string
  date: string
  amount: number
  currency: string
  status: 'paid' | 'pending' | 'overdue' | 'draft'
  plan: string
  period: string
  downloadUrl?: string
  paidAt?: string
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'sepa_debit' | 'paypal'
  card?: {
    brand: string
    last4: string
    expiryMonth: number
    expiryYear: number
  }
  sepaDebit?: {
    last4: string
    bankCode?: string
    country: string
  }
  isDefault: boolean
}

export interface PlanFeature {
  name: string
  included: boolean
  limit?: number | string
}

export interface PlanDetails {
  id: Plan
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: PlanFeature[]
  limits: {
    restaurants: number | -1 // -1 means unlimited
    menuItems: number | -1
    analyticsRetention: number | -1 // days, -1 means unlimited
    apiCalls?: number | -1
    customDomains?: number
    teamMembers?: number
  }
  isPopular?: boolean
  colorScheme: {
    primary: string
    secondary: string
  }
}

export interface StripeConfig {
  publishableKey: string
  priceIds: {
    [key in Plan]: {
      monthly: string
      yearly: string
    }
  }
}

export interface CheckoutSession {
  sessionId: string
  url: string
}

export interface BillingPortalSession {
  url: string
}

export interface UsageStats {
  restaurants: {
    current: number
    limit: number | -1
  }
  menuItems: {
    current: number
    limit: number | -1
  }
  analyticsRetention: {
    current: number // days
    limit: number | -1
  }
  apiCalls?: {
    current: number
    limit: number | -1
    resetDate: string
  }
}

export interface BillingAlert {
  id: string
  type: 'payment_failed' | 'trial_ending' | 'subscription_canceled' | 'usage_limit'
  title: string
  message: string
  severity: 'info' | 'warning' | 'error'
  createdAt: string
  isRead: boolean
  actionUrl?: string
  actionLabel?: string
}

export type BillingPeriod = 'monthly' | 'yearly'