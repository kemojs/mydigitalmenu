'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Zap, QrCode, Smartphone, FileText, CheckCircle } from 'lucide-react'

const Hero = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const animationSteps = [
    {
      id: 'photo',
      title: 'Foto aufnehmen',
      icon: Camera,
      description: 'Einfach mit dem Smartphone fotografieren'
    },
    {
      id: 'scan',
      title: 'Text erkennen',
      icon: Zap,
      description: 'KI-gestützte OCR erkennt alle Texte automatisch'
    },
    {
      id: 'process',
      title: 'Menu erstellen',
      icon: FileText,
      description: 'Gerichte werden automatisch kategorisiert'
    },
    {
      id: 'qr',
      title: 'QR-Code generieren',
      icon: QrCode,
      description: 'Personalisierter QR-Code wird erstellt'
    },
    {
      id: 'done',
      title: 'Fertig!',
      icon: CheckCircle,
      description: 'Digitale Speisekarte ist einsatzbereit'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % animationSteps.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const currentStepData = animationSteps[currentStep]
  const StepIcon = currentStepData.icon

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-60 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-60 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-100 rounded-full opacity-40 animate-pulse-slow" />
      </div>

      <div className="relative z-10 container-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Jetzt in der Beta-Phase - 6 Monate kostenlos!
              </span>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
                Digitale{' '}
                <span className="text-gradient">Speisekarten</span>{' '}
                in{' '}
                <span className="relative">
                  30 Sekunden
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-primary-200 -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-2xl"
            >
              Verwandeln Sie Ihre Papierspeisekarte mit unserem revolutionären 
              <strong className="text-primary-600"> Foto-zu-Digital-Scanner</strong> in 
              eine professionelle, hygienische digitale Speisekarte mit QR-Code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link href="/signup" className="btn-primary text-lg px-8 py-4">
                <Smartphone className="w-5 h-5 mr-2" />
                Kostenlos testen
              </Link>
              <Link href="#demo" className="btn-outline text-lg px-8 py-4">
                Live Demo ansehen
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-neutral-500"
            >
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                Keine Kreditkarte erforderlich
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                DSGVO konform
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-primary-500 mr-2" />
                Sofort einsatzbereit
              </div>
            </motion.div>
          </div>

          {/* Right Animation */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Animation Container */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
                {/* Process Steps Indicator */}
                <div className="flex justify-between items-center mb-8">
                  {animationSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      className={`flex flex-col items-center transition-all duration-500 ${
                        index === currentStep
                          ? 'text-primary-600 scale-110'
                          : index < currentStep
                          ? 'text-primary-400'
                          : 'text-neutral-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
                        index === currentStep
                          ? 'bg-primary-100 shadow-glow'
                          : index < currentStep
                          ? 'bg-primary-50'
                          : 'bg-neutral-100'
                      }`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div className={`w-full h-1 rounded-full transition-all duration-500 ${
                        index <= currentStep ? 'bg-primary-500' : 'bg-neutral-200'
                      }`} />
                    </motion.div>
                  ))}
                </div>

                {/* Animation Content */}
                <div className="relative h-80 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="text-center"
                    >
                      <motion.div
                        className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-6 mx-auto shadow-glow"
                        animate={{
                          scale: isAnimating ? [1, 1.2, 1] : 1,
                          rotate: currentStep === 1 ? [0, 360] : 0,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <StepIcon className="w-12 h-12 text-white" />
                      </motion.div>

                      <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-3">
                        {currentStepData.title}
                      </h3>
                      <p className="text-neutral-600 max-w-xs mx-auto">
                        {currentStepData.description}
                      </p>

                      {/* Step-specific animations */}
                      {currentStep === 0 && (
                        <motion.div
                          className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 0.8, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ✨
                        </motion.div>
                      )}

                      {currentStep === 1 && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[...Array(20)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-primary-400 rounded-full"
                              style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-neutral-500 mb-2">
                    <span>Fortschritt</span>
                    <span>{Math.round(((currentStep + 1) / animationSteps.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -left-6 w-12 h-12 bg-accent-200 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                📱
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -right-6 w-12 h-12 bg-secondary-200 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📋
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero