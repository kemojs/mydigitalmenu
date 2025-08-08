'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Globe, 
  Smartphone, 
  BarChart, 
  Shield, 
  Paintbrush, 
  Clock, 
  Heart, 
  Users, 
  Wifi,
  Camera,
  RefreshCw
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'Blitzschnelle OCR-Technologie',
      description: 'Fortschrittliche Texterkennung mit 99% Genauigkeit in unter 30 Sekunden',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      category: 'Technologie'
    },
    {
      id: 2,
      title: 'Mehrsprachige Unterstützung',
      description: 'Automatische Erkennung und Übersetzung in über 30 Sprachen',
      icon: Globe,
      color: 'from-blue-400 to-blue-600',
      category: 'International'
    },
    {
      id: 3,
      title: 'Mobile-First Design',
      description: 'Perfekt optimiert für alle Smartphones und Tablets',
      icon: Smartphone,
      color: 'from-green-400 to-green-600',
      category: 'User Experience'
    },
    {
      id: 4,
      title: 'Detaillierte Analytics',
      description: 'Verstehen Sie Ihre Gäste mit umfangreichen Statistiken',
      icon: BarChart,
      color: 'from-purple-400 to-purple-600',
      category: 'Business Intelligence'
    },
    {
      id: 5,
      title: 'DSGVO Konform',
      description: 'Höchste Sicherheitsstandards und Datenschutz made in Germany',
      icon: Shield,
      color: 'from-red-400 to-red-600',
      category: 'Sicherheit'
    },
    {
      id: 6,
      title: 'Custom Branding',
      description: 'Vollständige Anpassung an Ihr Restaurant-Design und Corporate Identity',
      icon: Paintbrush,
      color: 'from-pink-400 to-pink-600',
      category: 'Design'
    },
    {
      id: 7,
      title: 'Echtzeit Updates',
      description: 'Preise und Verfügbarkeit sofort ändern, ohne neue QR-Codes zu drucken',
      icon: RefreshCw,
      color: 'from-indigo-400 to-indigo-600',
      category: 'Flexibilität'
    },
    {
      id: 8,
      title: '24/7 Verfügbarkeit',
      description: 'Ihre digitale Speisekarte ist immer und überall erreichbar',
      icon: Clock,
      color: 'from-teal-400 to-teal-600',
      category: 'Verfügbarkeit'
    },
    {
      id: 9,
      title: 'Allergen-Management',
      description: 'Automatische Kennzeichnung von Allergenen und Nährwertangaben',
      icon: Heart,
      color: 'from-rose-400 to-rose-600',
      category: 'Gesundheit'
    },
    {
      id: 10,
      title: 'Multi-Location Support',
      description: 'Verwalten Sie mehrere Standorte zentral in einem Dashboard',
      icon: Users,
      color: 'from-cyan-400 to-cyan-600',
      category: 'Skalierung'
    },
    {
      id: 11,
      title: 'Offline Funktionalität',
      description: 'OCR funktioniert auch ohne Internetverbindung dank Client-Side Processing',
      icon: Wifi,
      color: 'from-gray-400 to-gray-600',
      category: 'Technologie'
    },
    {
      id: 12,
      title: 'Foto-zu-Digital Scanner',
      description: 'Revolutionäre Technologie verwandelt jede Papierspeisekarte in digitales Format',
      icon: Camera,
      color: 'from-orange-400 to-red-500',
      category: 'Innovation'
    }
  ]

  const categories = [...new Set(features.map(f => f.category))]

  return (
    <section className="section-spacing bg-gradient-to-br from-neutral-50 to-white">
      <div className="container-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
            Alles was Sie brauchen,{' '}
            <span className="text-gradient">in einer Lösung</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            MyDigitalMenu bietet alle Features, die moderne Restaurants für erfolgreiche 
            Digitalisierung benötigen - ohne Kompromisse bei Qualität oder Benutzerfreundlichkeit.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <span className="inline-block text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded-full mb-3">
                    {feature.category}
                  </span>
                  
                  <h3 className="text-lg font-display font-semibold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-display font-bold mb-4">
              Vertrauen Sie auf bewährte Technologie
            </h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Bereits über 1.000 Restaurants digitalisieren täglich ihre Speisekarten mit MyDigitalMenu
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                99%
              </div>
              <div className="text-lg opacity-90">OCR Genauigkeit</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                &lt;30s
              </div>
              <div className="text-lg opacity-90">Digitalisierung</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                30+
              </div>
              <div className="text-lg opacity-90">Sprachen</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-lg opacity-90">Support</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl lg:text-3xl font-display font-bold text-neutral-900 mb-6">
            Gebaut mit modernster Technologie
          </h3>
          
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {[
              'Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL',
              'Tesseract.js', 'Google Vision API', 'Vercel', 'Redis'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-lg font-medium text-neutral-600 hover:text-primary-600 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features