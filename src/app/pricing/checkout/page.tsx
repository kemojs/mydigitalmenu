'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import PricingPlans from '@/components/pricing/PricingPlans'
import {
  Check,
  ArrowLeft,
  CreditCard,
  Shield,
  Clock
} from 'lucide-react'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const planFromUrl = searchParams.get('plan')

  useEffect(() => {
    if (planFromUrl && ['STARTER', 'PROFESSIONAL', 'ENTERPRISE'].includes(planFromUrl)) {
      setSelectedPlan(planFromUrl)
    }
  }, [planFromUrl])

  const handlePlanSelect = async (plan: string) => {
    setIsLoading(true)
    
    try {
      // Create checkout session
      const response = await fetch('/api/billing/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          billingPeriod: 'monthly', // Default to monthly, can be made configurable
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        console.error('Error creating checkout session:', data.error)
        // Handle error - could show toast notification
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-display font-bold text-neutral-900">
                Plan auswählen
              </h1>
              <p className="mt-2 text-lg text-neutral-600">
                Wählen Sie den passenden Plan für Ihr Restaurant
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                1
              </div>
              <span className="ml-3 text-sm font-medium text-neutral-900">Plan auswählen</span>
            </div>
            
            <div className="flex-1 mx-4 h-1 bg-neutral-200 rounded">
              <div className="h-1 bg-primary-500 rounded" style={{ width: '33%' }}></div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500 text-sm font-medium">
                2
              </div>
              <span className="ml-3 text-sm font-medium text-neutral-500">Zahlungsdetails</span>
            </div>
            
            <div className="flex-1 mx-4 h-1 bg-neutral-200 rounded"></div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500 text-sm font-medium">
                3
              </div>
              <span className="ml-3 text-sm font-medium text-neutral-500">Bestätigung</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {selectedPlan ? (
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4"
            >
              <Check className="w-4 h-4 mr-2" />
              {selectedPlan} Plan ausgewählt
            </motion.div>
          </div>
        ) : null}

        <PricingPlans onPlanSelect={handlePlanSelect} />

        {/* Security & Trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-sm"
        >
          <h3 className="text-2xl font-display font-bold text-center text-neutral-900 mb-8">
            Sicher und vertrauenswürdig
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                256-Bit SSL Verschlüsselung
              </h4>
              <p className="text-neutral-600 text-sm">
                Ihre Zahlungsdaten sind durch die höchsten Sicherheitsstandards geschützt
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                Sichere Zahlungsabwicklung
              </h4>
              <p className="text-neutral-600 text-sm">
                Powered by Stripe - der weltweit vertrauenswürdigste Zahlungsanbieter
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                Sofort aktiv
              </h4>
              <p className="text-neutral-600 text-sm">
                Nach erfolgreicher Zahlung ist Ihr Plan sofort verfügbar
              </p>
            </div>
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8"
        >
          <h3 className="text-xl font-display font-bold text-primary-900 mb-6">
            Was passiert als Nächstes?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="font-semibold text-primary-900 mb-1">
                  Sichere Zahlung
                </h4>
                <p className="text-primary-800 text-sm">
                  Geben Sie Ihre Zahlungsdaten sicher über Stripe ein
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="font-semibold text-primary-900 mb-1">
                  Konto aktivieren
                </h4>
                <p className="text-primary-800 text-sm">
                  Ihr Plan wird automatisch aktiviert und alle Features freigeschaltet
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="font-semibold text-primary-900 mb-1">
                  Loslegen
                </h4>
                <p className="text-primary-800 text-sm">
                  Beginnen Sie sofort mit der Digitalisierung Ihres Restaurants
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 text-center max-w-md w-full mx-4"
          >
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
              Weiterleitung zu Stripe...
            </h3>
            <p className="text-neutral-600">
              Sie werden zur sicheren Zahlungsseite weitergeleitet.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Laden...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}