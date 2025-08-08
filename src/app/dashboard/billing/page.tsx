import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import BillingDashboard from '@/components/billing/BillingDashboard'
import { Suspense } from 'react'

function BillingLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Tab Navigation Skeleton */}
      <div className="border-b border-neutral-200">
        <div className="flex space-x-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-24 bg-neutral-200 rounded animate-pulse mb-4" />
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-6 w-48 bg-neutral-200 rounded animate-pulse mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="w-16 h-16 bg-neutral-200 rounded-2xl animate-pulse" />
                <div className="h-4 w-32 bg-neutral-200 rounded animate-pulse" />
                <div className="h-3 w-24 bg-neutral-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-neutral-200 rounded-xl animate-pulse mb-4" />
              <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-32 bg-neutral-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user?.restaurant) {
    redirect('/onboarding')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900">
          Abrechnung & Abonnement
        </h1>
        <p className="mt-2 text-lg text-neutral-600">
          Verwalten Sie Ihr Abonnement, Rechnungen und Zahlungsmethoden
        </p>
      </div>
      
      <Suspense fallback={<BillingLoadingSkeleton />}>
        <BillingDashboard restaurant={user.restaurant} />
      </Suspense>
    </div>
  )
}