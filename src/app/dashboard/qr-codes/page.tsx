import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import QRCodeGenerator from '@/components/dashboard/QRCodeGenerator'

export default async function QRCodesPage() {
  const user = await getCurrentUser()

  if (!user?.restaurant) {
    redirect('/onboarding')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900">
          QR-Code Generator
        </h1>
        <p className="mt-2 text-lg text-neutral-600">
          Erstellen, anpassen und verwalten Sie Ihre QR-Codes für digitale Speisekarten
        </p>
      </div>
      
      <QRCodeGenerator restaurant={user.restaurant} />
    </div>
  )
}