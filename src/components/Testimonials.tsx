'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Maria Rossi',
      title: 'Inhaberin',
      restaurant: 'Trattoria da Maria, München',
      image: '/images/testimonial-maria.jpg',
      rating: 5,
      text: 'MyDigitalMenu hat unser Restaurant revolutioniert! In nur 30 Sekunden hatten wir unsere komplette Speisekarte digitalisiert. Die OCR-Erkennung war perfekt - sogar unsere handgeschriebenen Tagesangebote wurden korrekt erfasst. Unsere Gäste lieben die hygienische Lösung und wir sparen monatlich über 200€ an Druckkosten.',
      highlight: 'Über 200€ monatlich gespart'
    },
    {
      id: 2,
      name: 'Thomas Müller',
      title: 'Geschäftsführer',
      restaurant: 'Müller\'s Gasthaus Kette (5 Standorte)',
      image: '/images/testimonial-thomas.jpg',
      rating: 5,
      text: 'Als Kette mit 5 Standorten war die Verwaltung unserer Speisekarten ein Albtraum. MyDigitalMenu ermöglicht es uns, alle Standorte zentral zu verwalten und Preise in Echtzeit anzupassen. Die Analytics zeigen uns genau, welche Gerichte bei welchen Standorten am beliebtesten sind. Unbezahlbar für unser Business!',
      highlight: 'Zentrale Verwaltung aller 5 Standorte'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      title: 'Marketingleiterin',
      restaurant: 'Le Petit Bistro, Hamburg',
      image: '/images/testimonial-sophie.jpg',
      rating: 5,
      text: 'Die mehrsprachige Unterstützung ist fantastisch! Unsere französische Speisekarte wurde automatisch ins Deutsche und Englische übersetzt. Die Custom-Branding-Optionen passen perfekt zu unserem eleganten Restaurant-Design. Unsere internationalen Gäste sind begeistert von der intuitiven Bedienung.',
      highlight: 'Automatische Übersetzung in 3 Sprachen'
    },
    {
      id: 4,
      name: 'Ahmed Hassan',
      title: 'Inhaber',
      restaurant: 'Shawarma Palace, Berlin',
      image: '/images/testimonial-ahmed.jpg',
      rating: 5,
      text: 'Die Allergen-Kennzeichnung funktioniert einwandfrei! Unsere Kunden mit Nahrungsmittelallergien fühlen sich endlich sicher. Das System erkannte sogar komplexe arabische Schriftzeichen in unserer ursprünglichen Speisekarte. Der Support ist hervorragend - immer schnelle und kompetente Hilfe.',
      highlight: 'Perfekte Allergen-Kennzeichnung'
    },
    {
      id: 5,
      name: 'Lisa Weber',
      title: 'Gastronomie-Expertin',
      restaurant: 'Food & Beverage Consultant',
      image: '/images/testimonial-lisa.jpg',
      rating: 5,
      text: 'Ich empfehle MyDigitalMenu allen meinen Kunden. Die Lösung ist nicht nur technisch ausgereift, sondern auch wirtschaftlich sinnvoll. Die ROI liegt meist unter 2 Monaten durch gesparte Druckkosten und erhöhte Effizienz. Die Analytics-Features bieten wertvolle Einblicke für die Menüoptimierung.',
      highlight: 'ROI unter 2 Monaten'
    },
    {
      id: 6,
      name: 'Marco Schneider',
      title: 'Restaurantbesitzer',
      restaurant: 'Alpen Stube, Garmisch',
      image: '/images/testimonial-marco.jpg',
      rating: 5,
      text: 'Saisonale Anpassungen waren früher ein Horror - neue Karten drucken, alle Tische abkleben, QR-Codes austauschen. Jetzt ändere ich Preise und Verfügbarkeit mit einem Klick! Die Gäste scannen denselben QR-Code und sehen immer die aktuellen Angebote. Einfach genial!',
      highlight: 'Echtzeit-Updates ohne neue QR-Codes'
    }
  ]

  const stats = [
    { number: '1000+', label: 'Restaurants vertrauen uns' },
    { number: '4.9/5', label: 'Durchschnittliche Bewertung' },
    { number: '99%', label: 'Kundenzufriedenheit' },
    { number: '24/7', label: 'Premium Support' }
  ]

  return (
    <section className="section-spacing bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            Was unsere Kunden{' '}
            <span className="text-gradient">sagen</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Über 1.000 Restaurants vertrauen bereits auf MyDigitalMenu. 
            Lesen Sie echte Erfahrungen von echten Restaurantbesitzern.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-neutral-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary-100">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star key={starIndex} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-neutral-700 mb-6 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Highlight */}
              <div className="bg-primary-50 text-primary-700 px-4 py-2 rounded-lg text-sm font-medium mb-6 inline-block">
                ⭐ {testimonial.highlight}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-700">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {testimonial.title}
                  </div>
                  <div className="text-sm text-primary-600 font-medium">
                    {testimonial.restaurant}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-secondary-600 to-primary-600 rounded-3xl p-8 lg:p-12 text-white text-center"
        >
          <h3 className="text-3xl lg:text-4xl font-display font-bold mb-6">
            Werden Sie Teil unserer Erfolgsgeschichte
          </h3>
          
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Schließen Sie sich über 1.000 erfolgreichen Restaurants an, die bereits 
            auf MyDigitalMenu vertrauen und ihre Umsätze gesteigert haben.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">47%</div>
              <div className="opacity-90">Durchschnittliche Kosteneinsparung</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">23%</div>
              <div className="opacity-90">Steigerung der Gästezufriedenheit</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">31%</div>
              <div className="opacity-90">Mehr Bestellungen durch Analytics</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 font-bold px-8 py-4 rounded-xl hover:bg-neutral-100 transition-colors duration-200 inline-flex items-center gap-2"
          >
            Jetzt kostenlos testen
            <Star className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials