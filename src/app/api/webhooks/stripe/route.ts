import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { validateWebhookSignature } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = validateWebhookSignature(body, signature, endpointSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancellation(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      case 'customer.created': {
        const customer = event.data.object as Stripe.Customer
        console.log('Customer created:', customer.id)
        break
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string
    
    // Find user by Stripe customer ID
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
      include: { restaurant: true }
    })

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // Extract plan and billing info from subscription metadata or price
    const plan = subscription.metadata.plan as 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
    const billingPeriod = subscription.metadata.billingPeriod as 'monthly' | 'yearly'

    // Update user's subscription info
    await prisma.user.update({
      where: { id: user.id },
      data: {
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: subscription.status as any,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    })

    // Update restaurant plan if exists
    if (user.restaurant) {
      await prisma.restaurant.update({
        where: { id: user.restaurant.id },
        data: {
          plan: plan || 'STARTER',
        }
      })
    }

    console.log(`Subscription updated for user ${user.id}:`, {
      subscriptionId: subscription.id,
      status: subscription.status,
      plan: plan,
      billingPeriod: billingPeriod
    })
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string
    
    // Find user by Stripe customer ID
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
      include: { restaurant: true }
    })

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // Update user's subscription status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionStatus: 'canceled',
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      }
    })

    // Set restaurant to FREE plan or disable features
    if (user.restaurant) {
      await prisma.restaurant.update({
        where: { id: user.restaurant.id },
        data: {
          plan: 'STARTER', // Or create a FREE plan
        }
      })
    }

    console.log(`Subscription canceled for user ${user.id}`)
  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string
    
    // Find user by Stripe customer ID
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    })

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // You could create an invoice record or send confirmation email here
    console.log(`Payment succeeded for user ${user.id}:`, {
      invoiceId: invoice.id,
      amount: invoice.amount_paid / 100, // Convert from cents
      currency: invoice.currency
    })

    // Optional: Create invoice record in database
    // await prisma.invoice.create({
    //   data: {
    //     userId: user.id,
    //     stripeInvoiceId: invoice.id,
    //     amount: invoice.amount_paid / 100,
    //     currency: invoice.currency,
    //     status: 'paid',
    //     paidAt: new Date(invoice.status_transitions.paid_at! * 1000),
    //   }
    // })
  } catch (error) {
    console.error('Error handling payment succeeded:', error)
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string
    
    // Find user by Stripe customer ID
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId }
    })

    if (!user) {
      console.error('User not found for customer:', customerId)
      return
    }

    // Handle payment failure - could send notification email, etc.
    console.log(`Payment failed for user ${user.id}:`, {
      invoiceId: invoice.id,
      amount: invoice.amount_due / 100,
      currency: invoice.currency
    })

    // Optional: Send notification email to user about failed payment
    // You might also want to implement a grace period before downgrading
  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}