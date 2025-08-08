'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { 
  Building, 
  MapPin, 
  Phone, 
  Globe, 
  FileText,
  CheckCircle 
} from 'lucide-react'
import { onboardingStep1Schema, type OnboardingStep1Input } from '@/lib/validations'

interface Step1Props {
  data?: OnboardingStep1Input
  onComplete: (data: OnboardingStep1Input) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const OnboardingStep1 = ({ 
  data, 
  onComplete, 
  onNext, 
  isFirstStep 
}: Step1Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<OnboardingStep1Input>({
    resolver: zodResolver(onboardingStep1Schema),
    defaultValues: data || {},
    mode: 'onChange'
  })

  const onSubmit = (formData: OnboardingStep1Input) => {
    onComplete(formData)
    onNext()
  }

  const watchedFields = watch()
  const completedFields = Object.values(watchedFields).filter(value => 
    value && value.toString().trim() !== ''
  ).length

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Building className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
          Erzählen Sie uns von Ihrem Restaurant
        </h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Diese Informationen helfen uns dabei, Ihre digitale Speisekarte 
          optimal auf Ihr Restaurant anzupassen.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="card space-y-6">
            <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-6">
              Restaurant-Details
            </h3>

            {/* Restaurant Name */}
            <div>
              <label htmlFor="restaurantName" className="block text-sm font-medium text-neutral-700 mb-2">
                Restaurant-Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="restaurantName"
                  type="text"
                  {...register('restaurantName')}
                  className={`input pl-10 ${errors.restaurantName ? 'border-red-500' : ''}`}
                  placeholder="Zur Goldenen Gans"
                />
              </div>
              {errors.restaurantName && (
                <p className="text-red-600 text-sm mt-1">{errors.restaurantName.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-2">
                Beschreibung (optional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <textarea
                  id="description"
                  {...register('description')}
                  rows={3}
                  className={`input pl-10 resize-none ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Authentische deutsche Küche im Herzen der Altstadt..."
                />
              </div>
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-2">
                Adresse (optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="address"
                  type="text"
                  {...register('address')}
                  className={`input pl-10 ${errors.address ? 'border-red-500' : ''}`}
                  placeholder="Marktplatz 1, 12345 Musterstadt"
                />
              </div>
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                Telefon (optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className={`input pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+49 (0) 123 456789"
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-2">
                Website (optional)
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="website"
                  type="url"
                  {...register('website')}
                  className={`input pl-10 ${errors.website ? 'border-red-500' : ''}`}
                  placeholder="https://www.restaurant-goldene-gans.de"
                />
              </div>
              {errors.website && (
                <p className="text-red-600 text-sm mt-1">{errors.website.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter zum Foto-Upload
            </button>
          </form>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Progress Card */}
          <div className="card">
            <h4 className="font-semibold text-neutral-900 mb-4">Fortschritt</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Ausgefüllte Felder</span>
                <span className="font-medium">{completedFields}/5</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-secondary-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedFields / 5) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-600" />
              Tipps für optimale Ergebnisse
            </h4>
            <ul className="space-y-3 text-sm text-primary-800">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <span>Verwenden Sie Ihren offiziellen Restaurant-Namen</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <span>Eine aussagekräftige Beschreibung hilft Ihren Gästen</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <span>Vollständige Kontaktdaten verbessern das Vertrauen</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <span>Alle Angaben können später bearbeitet werden</span>
              </li>
            </ul>
          </div>

          {/* What's Next Card */}
          <div className="card">
            <h4 className="font-semibold text-neutral-900 mb-4">Als nächstes</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-600">2</span>
                </div>
                <div>
                  <div className="font-medium text-neutral-900">Speisekarte fotografieren</div>
                  <div className="text-sm text-neutral-600">OCR-Scanner digitalisiert automatisch</div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-neutral-400">3</span>
                </div>
                <div>
                  <div className="font-medium text-neutral-500">Daten überprüfen</div>
                  <div className="text-sm text-neutral-400">Korrekturen und Anpassungen</div>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-neutral-400">4</span>
                </div>
                <div>
                  <div className="font-medium text-neutral-500">Design anpassen</div>
                  <div className="text-sm text-neutral-400">Template und Farben wählen</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OnboardingStep1