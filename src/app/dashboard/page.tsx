import { getCurrentUser } from '@/lib/auth'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import BetaBanner from '@/components/dashboard/BetaBanner'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user?.restaurant) {
    redirect('/onboarding')
  }

  return (
    <div>
      <BetaBanner restaurant={user.restaurant} />
      <DashboardOverview user={user} />
    </div>
  )
}