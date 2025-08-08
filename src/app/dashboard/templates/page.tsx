import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import TemplateGallery from '@/components/dashboard/TemplateGallery'

export default async function TemplatesPage() {
  const user = await getCurrentUser()

  if (!user?.restaurant) {
    redirect('/onboarding')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900">
          Template Gallery
        </h1>
        <p className="mt-2 text-lg text-neutral-600">
          Wählen Sie aus unserer Sammlung professioneller Templates oder erstellen Sie Ihr eigenes Design
        </p>
      </div>
      
      <TemplateGallery restaurant={user.restaurant} />
    </div>
  )
}