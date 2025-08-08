'use client'

import { motion } from 'framer-motion'
import { Camera, Zap, Edit, QrCode } from 'lucide-react'
import Image from 'next/image'

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Foto aufnehmen',
      description: 'Fotografieren Sie Ihre bestehende Papierspeisekarte einfach mit Ihrem Smartphone. Unser System funktioniert mit allen Layouts und Sprachen.',
      icon: Camera,
      color: 'from-blue-500 to-blue-600',
      image: '/images/step-1-photo.jpg',
    },
    {
      id: 2,
      title: 'Automatische Erkennung',
      description: 'Unsere fortschrittliche OCR-Technologie erkennt automatisch Gerichte, Preise, Kategorien und sogar Allergenkennzeichnungen.',
      icon: Zap,
      color: 'from-primary-500 to-primary-600',
      image: '/images/step-2-ocr.jpg',
    },
    {
      id: 3,
      title: 'Bearbeiten & Anpassen',
      description: 'Überprüfen und bearbeiten Sie die erkannten Daten in unserer intuitiven Vorschau. Fügen Sie Bilder hinzu und passen Sie das Design an.',
      icon: Edit,
      color: 'from-secondary-500 to-secondary-600',
      image: '/images/step-3-edit.jpg',
    },
    {
      id: 4,
      title: 'QR-Code & Live gehen',
      description: 'Erhalten Sie Ihren personalisierten QR-Code und gehen Sie sofort live. Änderungen werden in Echtzeit ohne neue QR-Codes übernommen.',
      icon: QrCode,
      color: 'from-accent-500 to-accent-600',
      image: '/images/step-4-qr.jpg',
    },
  ]

  return (
    <section id="demo" className="section-spacing bg-white">
      <div className="container-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            So einfach geht&apos;s
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            In nur 4 Schritten von der Papierspeisekarte zur professionellen digitalen Lösung
          </p>
        </motion.div>

        <div className="space-y-24">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
              >
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                        Schritt {step.id}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features for this step */}
                  <div className="space-y-3">
                    {step.id === 1 && (
                      <>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Funktioniert mit allen Smartphone-Kameras</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Unterstützt alle Speisekarten-Layouts</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Mehrsprachige Erkennung</span>
                        </div>
                      </>
                    )}
                    {step.id === 2 && (
                      <>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>99% Genauigkeit bei der Texterkennung</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Automatische Kategorisierung</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Preiserkennung in allen Währungen</span>
                        </div>
                      </>
                    )}
                    {step.id === 3 && (
                      <>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Intuitive Drag & Drop Bearbeitung</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Live-Vorschau während der Bearbeitung</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>20+ professionelle Templates</span>
                        </div>
                      </>
                    )}
                    {step.id === 4 && (
                      <>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Personalisierte QR-Codes mit Logo</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Sofortige Updates ohne neue QR-Codes</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full" />
                          <span>Analytics & Einblicke</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Image/Visual */}
                <div className="flex-1 relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className={`w-full h-80 bg-gradient-to-br ${step.color} rounded-3xl p-8 shadow-2xl relative overflow-hidden`}>
                      {/* Placeholder for step visualization */}
                      <div className="w-full h-full bg-white/20 rounded-2xl flex items-center justify-center">
                        <Icon className="w-24 h-24 text-white/60" />
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 rounded-lg" />
                    </div>

                    {/* Floating step number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-neutral-900">{step.id}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 mb-4">
              Bereit für Ihre digitale Transformation?
            </h3>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Starten Sie jetzt kostenlos und erleben Sie, wie einfach die Digitalisierung Ihrer Speisekarte ist.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              <Camera className="w-5 h-5 mr-2" />
              Jetzt kostenlos starten
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks