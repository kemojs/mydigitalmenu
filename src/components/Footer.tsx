'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Camera,
  QrCode,
  Shield,
  Heart
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Preise', href: '#pricing' },
      { name: 'Live Demo', href: '/demo' },
      { name: 'Templates', href: '/templates' },
      { name: 'API', href: '/api-docs' }
    ],
    company: [
      { name: 'Über uns', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Karriere', href: '/careers' },
      { name: 'Presse', href: '/press' },
      { name: 'Kontakt', href: '/contact' }
    ],
    support: [
      { name: 'Hilfe Center', href: '/help' },
      { name: 'Dokumentation', href: '/docs' },
      { name: 'Status', href: '/status' },
      { name: 'Community', href: '/community' },
      { name: 'Training', href: '/training' }
    ],
    legal: [
      { name: 'Datenschutz', href: '/privacy' },
      { name: 'AGB', href: '/terms' },
      { name: 'Impressum', href: '/imprint' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'DSGVO', href: '/gdpr' }
    ]
  }

  const features = [
    { name: 'Foto-zu-Digital-Scanner', icon: Camera },
    { name: 'QR-Code Generator', icon: QrCode },
    { name: 'DSGVO Konform', icon: Shield },
    { name: 'Made with ❤️ in Germany', icon: Heart }
  ]

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer */}
      <div className="container-padding max-w-7xl mx-auto py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="inline-flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display font-bold text-white">
                  MyDigitalMenu
                </span>
              </Link>
              
              <p className="text-lg text-neutral-400 mb-6 leading-relaxed">
                Die revolutionäre All-in-One-Lösung für digitale Speisekarten. 
                Verwandeln Sie Ihre Papierspeisekarte in 30 Sekunden in eine 
                professionelle digitale Erfahrung.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <a href="mailto:hello@mydigitalmenu.com" className="hover:text-primary-400 transition-colors">
                    hello@mydigitalmenu.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <a href="tel:+49301234567890" className="hover:text-primary-400 transition-colors">
                    +49 (30) 123 456 789
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>Berlin, Deutschland</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([category, categoryLinks], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold text-lg mb-4 capitalize">
                {category === 'product' ? 'Produkt' : 
                 category === 'company' ? 'Unternehmen' :
                 category === 'support' ? 'Support' : 'Rechtliches'}
              </h3>
              <ul className="space-y-3">
                {categoryLinks.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="hover:text-primary-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {link.name}
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                        →
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-neutral-800"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-4 bg-neutral-800/50 rounded-xl hover:bg-neutral-800 transition-all duration-300"
              >
                <feature.icon className="w-5 h-5 text-primary-400" />
                <span className="text-sm font-medium">{feature.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-padding max-w-7xl mx-auto py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-4"
          >
            <div className="flex flex-col lg:flex-row items-center gap-4 text-sm text-neutral-500">
              <span>© {currentYear} MyDigitalMenu. Alle Rechte vorbehalten.</span>
              <span className="hidden lg:block">•</span>
              <span>Made with ❤️ in Germany</span>
              <span className="hidden lg:block">•</span>
              <span>DSGVO konform & sicher</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link href="/status" className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Alle Systeme betriebsbereit
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer