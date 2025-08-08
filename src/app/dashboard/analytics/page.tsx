import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard'

export default async function AnalyticsPage() {
  const user = await getCurrentUser()

  if (!user?.restaurant) {
    redirect('/onboarding')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900">
          Analytics & Insights
        </h1>
        <p className="mt-2 text-lg text-neutral-600">
          Verstehen Sie Ihre Gäste und optimieren Sie Ihre Speisekarte mit detaillierten Auswertungen
        </p>
      </div>
      
      <AnalyticsDashboard restaurant={user.restaurant} />
    </div>
  )
}