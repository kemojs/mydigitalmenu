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
  AlertCircle, 
  ArrowRight,
  Mail,
  Lock,
  Shield,
  Zap,
  Clock
} from 'lucide-react'
import { loginSchema, type LoginInput } from '@/lib/validations'

const LoginPage = () => {
  const router = useRouter()
  
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Fehler bei der Anmeldung')
      }

      // Check if user has completed onboarding
      if (result.data.restaurant) {
        router.push('/dashboard')
      } else {
        router.push('/onboarding')
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unerwarteter Fehler ist aufgetreten')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10"
        >
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-neutral-900">
                MyDigitalMenu
              </span>
            </Link>
            
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-3">
              Willkommen zurück
            </h1>
            <p className="text-lg text-neutral-600">
              Melden Sie sich in Ihr Dashboard an
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="max@restaurant.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`input pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Ihr Passwort"
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
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-600">Angemeldet bleiben</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Passwort vergessen?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Anmeldung läuft...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Anmelden
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8">
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">oder</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                Noch kein Konto?{' '}
                <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                  Jetzt kostenlos registrieren
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
              Ihr digitales Restaurant-Dashboard
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  icon: Zap,
                  title: 'Echtzeit-Updates',
                  description: 'Ändern Sie Preise und Verfügbarkeit sofort, ohne neue QR-Codes drucken zu müssen'
                },
                {
                  icon: Shield,
                  title: 'Sicher & DSGVO-konform',
                  description: 'Höchste Sicherheitsstandards und vollständige DSGVO-Konformität'
                },
                {
                  icon: Clock,
                  title: 'Zeit sparen',
                  description: 'Verwalten Sie alle Ihre Speisekarten zentral und sparen Sie wertvolle Zeit'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-neutral-900 to-primary-900 rounded-3xl p-8 text-white relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full" />
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-lg" />
            
            <h3 className="text-2xl font-bold mb-4">Dashboard Highlights</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold mb-1">127</div>
                <div className="text-sm opacity-80">Scans heute</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold mb-1">€247</div>
                <div className="text-sm opacity-80">Kostenersparnis</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-sm opacity-80">Aktive Gerichte</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold mb-1">4.8★</div>
                <div className="text-sm opacity-80">Gäste-Bewertung</div>
              </div>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-neutral-600 mb-4">
              Benötigen Sie Hilfe bei der Anmeldung?
            </p>
            <Link 
              href="/contact" 
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Kontaktieren Sie unseren Support →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage