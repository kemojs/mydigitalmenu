'use client'

import { motion } from 'framer-motion'
import { Camera, ArrowRight, CheckCircle, Clock, Gift } from 'lucide-react'
import Link from 'next/link'

const CTA = () => {
  const benefits = [
    'Keine Kreditkarte erforderlich',
    '60 Tage kostenlos in der Beta-Phase',
    'Setup in unter 5 Minuten',
    'Sofort einsatzbereit',
    'Deutscher Support'
  ]

  return (
    <section className="section-spacing bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-padding max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-primary-500/20 border border-primary-400/30 px-6 py-3 rounded-full mb-6"
            >
              <Gift className="w-5 h-5 text-primary-300" />
              <span className="text-primary-200 font-medium">
                Limitiertes Beta-Angebot - Nur noch wenige Plätze verfügbar!
              </span>
            </motion.div>

            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Bereit für die{' '}
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                digitale Revolution
              </span>
              ?
            </h2>

            <p className="text-xl lg:text-2xl text-neutral-300 mb-8 leading-relaxed">
              Verwandeln Sie Ihre Papierspeisekarte in 30 Sekunden in eine 
              professionelle digitale Lösung. Über 1.000 Restaurants vertrauen 
              bereits auf MyDigitalMenu.
            </p>

            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  <span className="text-neutral-200">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/signup"
                className="group bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Jetzt kostenlos starten
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/demo"
                className="border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/10 font-medium text-lg px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Clock className="w-5 h-5" />
                Live Demo ansehen
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-sm text-neutral-400 mt-6"
            >
              🚀 Setup in unter 5 Minuten • 🔒 100% DSGVO-konform • ⭐ 4.9/5 Sterne Bewertung
            </motion.p>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 lg:p-10 shadow-2xl"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    Starten Sie in 3 Schritten
                  </h3>
                  
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <span className="text-neutral-200">Speisekarte fotografieren</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <span className="text-neutral-200">Automatische Digitalisierung</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <span className="text-neutral-200">QR-Code erhalten & live gehen</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-2xl">📱</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-2xl">⚡</span>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-br from-primary-300 to-primary-500 rounded-xl flex items-center justify-center shadow-xl"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-lg">🎯</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10"
        >
          {[
            { number: '1000+', label: 'Restaurants' },
            { number: '30s', label: 'Digitalisierung' },
            { number: '99%', label: 'OCR Genauigkeit' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-primary-300 mb-2">
                {stat.number}
              </div>
              <div className="text-neutral-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CTA