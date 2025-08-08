'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  Camera, 
  Eye, 
  EyeOff, 
  Check, 
  AlertCircle, 
  ArrowRight,
  Building,
  Mail,
  Lock,
  User,
  Sparkles
} from 'lucide-react'
import { z } from 'zod'

// Simplified signup schema without plan selection
const signupSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen lang sein'),
  restaurantName: z.string().min(2, 'Restaurant-Name muss mindestens 2 Zeichen lang sein'),
  acceptTerms: z.boolean().refine(val => val === true, 'Sie müssen die AGB akzeptieren')
})

type SignupInput = z.infer<typeof signupSchema>

const SignupPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      acceptTerms: false
    }
  })

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registrierung fehlgeschlagen')
      }

      // Redirect to onboarding
      router.push('/onboarding')
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unerwarteter Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-60 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container-padding max-w-md mx-auto pt-8 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-primary-500" />
          </div>
          
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
            Registrieren
          </h1>
          <p className="text-neutral-600">
            Erstellen Sie Ihr kostenloses Beta-Konto
          </p>
        </motion.div>

        {/* Beta Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Beta-Phase: 6 Monate kostenlos
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Vollständiger Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  {...register('name')}
                  type="text"
                  className={`input pl-10 ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Ihr vollständiger Name"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  {...register('email')}
                  type="email"
                  className={`input pl-10 ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="ihre@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={`input pl-10 pr-10 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Mindestens 6 Zeichen"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Restaurant Name Field */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Restaurant-Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  {...register('restaurantName')}
                  type="text"
                  className={`input pl-10 ${errors.restaurantName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Name Ihres Restaurants"
                />
              </div>
              {errors.restaurantName && (
                <p className="mt-2 text-sm text-red-600">{errors.restaurantName.message}</p>
              )}
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start gap-3">
              <input
                {...register('acceptTerms')}
                type="checkbox"
                id="acceptTerms"
                className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 mt-0.5"
              />
              <label htmlFor="acceptTerms" className="text-sm text-neutral-700 leading-relaxed">
                Ich akzeptiere die{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700 underline">
                  Allgemeinen Geschäftsbedingungen
                </Link>{' '}
                und{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                  Datenschutzerklärung
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Konto wird erstellt...
                </>
              ) : (
                <>
                  Kostenloses Beta-Konto erstellen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-neutral-200"
        >
          <h3 className="font-display font-semibold text-neutral-900 mb-4 text-center">
            Was Sie erhalten:
          </h3>
          <div className="space-y-3">
            {[
              'Unbegrenzte digitale Speisekarten',
              'OCR Foto-zu-Digital Scanner',
              'QR-Code Generator',
              'Analytics Dashboard',
              'Mobile Optimierung',
              '6 Monate kostenlose Nutzung'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span className="text-sm text-neutral-700">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-neutral-600">
            Haben Sie bereits ein Konto?{' '}
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Hier anmelden
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SignupPage