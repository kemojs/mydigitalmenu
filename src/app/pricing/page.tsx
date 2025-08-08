import { getCurrentUser } from '@/lib/auth'
import PricingPlans from '@/components/pricing/PricingPlans'
import { redirect } from 'next/navigation'

export default async function PricingPage() {
  const user = await getCurrentUser()
  
  // Redirect to dashboard if already logged in with active subscription
  if (user?.restaurant && user.subscriptionStatus === 'active') {
    redirect('/dashboard')
  }

  const handlePlanSelect = async (plan: string) => {
    'use server'
    
    if (!user) {
      redirect('/auth/login?redirect=/pricing')
      return
    }

    // This will be handled by client-side checkout
    redirect(`/pricing/checkout?plan=${plan}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-neutral-900">
                Wählen Sie Ihren Plan
              </h1>
              <p className="mt-2 text-lg text-neutral-600">
                Digitalisieren Sie Ihr Restaurant mit der passenden Lösung
              </p>
            </div>
            
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-600">
                  Angemeldet als {user.email}
                </span>
                <a href="/dashboard" className="btn-outline">
                  Zum Dashboard
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <PricingPlans 
          currentPlan={user?.restaurant?.plan}
          showCurrentPlan={!!user}
        />

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-neutral-600">
              Alles was Sie über unsere Pläne wissen müssen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Kann ich meinen Plan jederzeit ändern?",
                answer: "Ja, Sie können Ihren Plan jederzeit upgraden oder downgraden. Änderungen werden anteilig berechnet."
              },
              {
                question: "Gibt es eine kostenlose Testphase?",
                answer: "Ja, alle neuen Kunden erhalten 14 Tage kostenlos zum Testen aller Features ihres gewählten Plans."
              },
              {
                question: "Welche Zahlungsmethoden akzeptieren Sie?",
                answer: "Wir akzeptieren alle gängigen Kreditkarten, SEPA-Lastschrift und PayPal für maximale Flexibilität."
              },
              {
                question: "Ist meine Daten sicher?",
                answer: "Ja, alle Daten werden verschlüsselt gespeichert und verarbeitet. Wir sind vollständig DSGVO-konform."
              },
              {
                question: "Kann ich mein Abonnement kündigen?",
                answer: "Ja, Sie können jederzeit kündigen. Ihr Plan bleibt bis zum Ende der Abrechnungsperiode aktiv."
              },
              {
                question: "Bieten Sie Support an?",
                answer: "Ja, alle Pläne beinhalten Support. Professional und Enterprise Kunden erhalten prioritären Support."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-display font-semibold text-neutral-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-6">
              Vertrauen Sie auf MyDigitalMenu
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
                <p className="text-neutral-600">Restaurants vertrauen uns</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
                <p className="text-neutral-600">Verfügbarkeit garantiert</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <p className="text-neutral-600">Support für Enterprise</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}