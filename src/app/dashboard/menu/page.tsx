import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import MenuEditor from '@/components/dashboard/MenuEditor'

export default async function MenuPage() {
  const user = await getCurrentUser()

  if (!user?.restaurant) {
    redirect('/onboarding')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900">
          Speisekarten-Editor
        </h1>
        <p className="mt-2 text-lg text-neutral-600">
          Verwalten Sie Ihre Gerichte, Kategorien und Preise mit unserem intuitiven Editor
        </p>
      </div>
      
      <MenuEditor restaurant={user.restaurant} />
    </div>
  )
}