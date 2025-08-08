'use client'

import { motion } from 'framer-motion'
import { Check, Crown, Zap, Building, ArrowRight, Gift } from 'lucide-react'
import Link from 'next/link'
import { PLAN_PRICES, PLAN_FEATURES, type Plan } from '@/types'

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      id: 'STARTER' as Plan,
      description: 'Perfekt für kleine Restaurants und Cafés',
      price: PLAN_PRICES.STARTER,
      features: [
        '1 Restaurant-Standort',
        'Unbegrenzte Menü-Items',
        '5 QR-Code Designs',
        'Foto-zu-Digital-Scanner',
        '10 Sprachen',
        'Basic Analytics',
        'Email Support',
        'Allergen-Kennzeichnung'
      ],
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      popular: false,
      cta: 'Starter wählen'
    },
    {
      name: 'Professional',
      id: 'PROFESSIONAL' as Plan,
      description: 'Ideal für etablierte Restaurants und kleine Ketten',
      price: PLAN_PRICES.PROFESSIONAL,
      features: [
        '3 Restaurant-Standorte',
        'Unbegrenzte Menü-Items',
        '20 QR-Code Designs',
        'Foto-zu-Digital-Scanner',
        '20 Sprachen',
        'Advanced Analytics & Heatmaps',
        'Custom Branding',
        'Lieferdienst-Integration',
        'Priority Email & Telefon Support'
      ],
      icon: Crown,
      color: 'from-primary-500 to-primary-600',
      popular: true,
      cta: 'Professional wählen'
    },
    {
      name: 'Enterprise',
      id: 'ENTERPRISE' as Plan,
      description: 'Für große Restaurantketten und Franchise-Unternehmen',
      price: PLAN_PRICES.ENTERPRISE,
      features: [
        'Unbegrenzte Standorte',
        'Unbegrenzte Menü-Items',
        'Unbegrenzte QR-Code Designs',
        'White-Label-Option',
        '30+ Sprachen',
        'Enterprise Analytics',
        'API-Zugang für POS-Integration',
        'Dediziertes Account-Management',
        'A/B-Testing Features',
        '24/7 Priority Support'
      ],
      icon: Building,
      color: 'from-secondary-600 to-secondary-700',
      popular: false,
      cta: 'Enterprise wählen'
    }
  ]

  return (
    <section className="section-spacing bg-white">
      <div className="container-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            Transparente Preise,{' '}
            <span className="text-gradient">maximaler Wert</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Wählen Sie den Plan, der perfekt zu Ihrem Restaurant passt. 
            Alle Pläne beinhalten den revolutionären Foto-zu-Digital-Scanner ohne Einschränkungen.
          </p>
          
          {/* Beta Announcement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-100 to-secondary-100 px-6 py-3 rounded-full border border-primary-200"
          >
            <Gift className="w-5 h-5 text-primary-600" />
            <span className="font-medium text-primary-800">
              🎉 Beta-Phase: 60 Tage Professional Plan kostenlos für alle Neukunden!
            </span>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-3xl overflow-hidden ${
                  plan.popular
                    ? 'ring-4 ring-primary-200 shadow-2xl scale-105'
                    : 'shadow-xl hover:shadow-2xl'
                } transition-all duration-300 group hover:scale-105`}
              >
                {plan.popular && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white px-6 py-2 rounded-b-xl text-sm font-medium">
                    Beliebtester Plan
                  </div>
                )}

                <div className="bg-white p-8 lg:p-10 relative">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      {plan.description}
                    </p>
                    
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-neutral-900">
                        €{plan.price}
                      </span>
                      <span className="text-xl text-neutral-600 ml-2">
                        /Monat
                      </span>
                    </div>
                    
                    <p className="text-sm text-neutral-500 mt-2">
                      Erste 30 Tage kostenlos
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-600" />
                        </div>
                        <span className="text-neutral-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/signup?plan=${plan.id.toLowerCase()}`}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-medium transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white hover:from-primary-600 hover:to-secondary-700 shadow-lg hover:shadow-xl'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-neutral-50 to-white rounded-3xl p-8 lg:p-12"
        >
          <h3 className="text-3xl font-display font-bold text-center text-neutral-900 mb-8">
            Detaillierter Funktionsvergleich
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-4 px-4 font-display font-semibold text-neutral-900">
                    Feature
                  </th>
                  {plans.map(plan => (
                    <th key={plan.id} className="text-center py-4 px-4 font-display font-semibold text-neutral-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Restaurant-Standorte', values: ['1', '3', 'Unbegrenzt'] },
                  { feature: 'QR-Code Designs', values: ['5', '20', 'Unbegrenzt'] },
                  { feature: 'Sprachen', values: ['10', '20', '30+'] },
                  { feature: 'Analytics', values: ['Basic', 'Advanced', 'Enterprise'] },
                  { feature: 'Custom Branding', values: ['❌', '✅', '✅'] },
                  { feature: 'API-Zugang', values: ['❌', '❌', '✅'] },
                  { feature: 'White-Label', values: ['❌', '❌', '✅'] },
                  { feature: 'A/B-Testing', values: ['❌', '❌', '✅'] },
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-neutral-100"
                  >
                    <td className="py-4 px-4 font-medium text-neutral-700">
                      {row.feature}
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td key={valueIndex} className="py-4 px-4 text-center text-neutral-600">
                        {value}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 mb-6">
            Häufig gestellte Fragen
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'Wie funktioniert die Beta-Phase?',
                a: 'Alle neuen Kunden erhalten 60 Tage vollständigen Zugang zum Professional Plan kostenlos. Keine Kreditkarte erforderlich.'
              },
              {
                q: 'Kann ich zwischen Plänen wechseln?',
                a: 'Ja, Sie können jederzeit upgraden oder downgraden. Alle Ihre Daten und QR-Codes bleiben erhalten.'
              },
              {
                q: 'Was passiert nach der kostenlosen Testphase?',
                a: 'Nach der Beta-Phase können Sie einen Plan wählen oder erhalten weitere 30 Tage kostenlose Testzeit.'
              },
              {
                q: 'Ist MyDigitalMenu DSGVO-konform?',
                a: 'Ja, wir erfüllen alle DSGVO-Anforderungen und hosten alle Daten in Deutschland mit höchsten Sicherheitsstandards.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-left bg-white p-6 rounded-xl shadow-sm"
              >
                <h4 className="font-display font-semibold text-neutral-900 mb-3">
                  {faq.q}
                </h4>
                <p className="text-neutral-600">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing