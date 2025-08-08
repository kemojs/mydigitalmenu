'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Camera, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Building,
  Upload,
  Edit,
  Palette,
  CheckCircle
} from 'lucide-react'
import OnboardingStep1 from '@/components/onboarding/Step1'
import OnboardingStep2 from '@/components/onboarding/Step2'
import OnboardingStep3 from '@/components/onboarding/Step3'
import OnboardingStep4 from '@/components/onboarding/Step4'
import type { OnboardingFormData } from '@/types'

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  const totalSteps = 4

  const steps = [
    {
      id: 1,
      title: 'Restaurant-Details',
      description: 'Grundlegende Informationen zu Ihrem Restaurant',
      icon: Building,
      component: OnboardingStep1
    },
    {
      id: 2,
      title: 'Speisekarte scannen',
      description: 'Laden Sie ein Foto Ihrer aktuellen Speisekarte hoch',
      icon: Upload,
      component: OnboardingStep2
    },
    {
      id: 3,
      title: 'Daten überprüfen',
      description: 'Kontrollieren und bearbeiten Sie die erkannten Daten',
      icon: Edit,
      component: OnboardingStep3
    },
    {
      id: 4,
      title: 'Design wählen',
      description: 'Wählen Sie Template und Farben für Ihre digitale Speisekarte',
      icon: Palette,
      component: OnboardingStep4
    }
  ]

  const handleStepComplete = useCallback((stepData: any) => {
    setFormData(prev => ({
      ...prev,
      [`step${currentStep}`]: stepData
    }))
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleFinish = async () => {
    setIsLoading(true)
    try {
      // Submit complete onboarding data
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        // Redirect to dashboard
        window.location.href = '/dashboard'
      } else {
        throw new Error('Fehler beim Abschließen des Onboardings')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="container-padding max-w-7xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-neutral-900">
                MyDigitalMenu
              </h1>
              <p className="text-neutral-600">Onboarding</p>
            </div>
          </div>

          <div className="text-sm text-neutral-500">
            Schritt {currentStep} von {totalSteps}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isCompleted = index + 1 < currentStep
              const isCurrent = index + 1 === currentStep
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1 relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: isCurrent ? 1.1 : 1,
                      opacity: 1
                    }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-primary-500 text-white'
                        : isCurrent
                        ? 'bg-primary-100 text-primary-600 ring-4 ring-primary-200'
                        : 'bg-neutral-200 text-neutral-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </motion.div>
                  
                  <div className="text-center max-w-32">
                    <div className={`text-sm font-medium transition-colors ${
                      isCurrent ? 'text-primary-600' : isCompleted ? 'text-primary-500' : 'text-neutral-500'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1 leading-tight">
                      {step.description}
                    </div>
                  </div>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-full h-0.5 -z-10 flex items-center">
                      <div className={`flex-1 h-0.5 transition-colors duration-300 ${
                        index + 1 < currentStep ? 'bg-primary-500' : 'bg-neutral-200'
                      }`} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Overall Progress Bar */}
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 container-padding max-w-7xl mx-auto pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {CurrentStepComponent && (
              <CurrentStepComponent
                data={formData[`step${currentStep}` as keyof OnboardingFormData]}
                onComplete={handleStepComplete}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirstStep={currentStep === 1}
                isLastStep={currentStep === totalSteps}
                onFinish={handleFinish}
                isLoading={isLoading}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="border-t border-neutral-200 bg-white/80 backdrop-blur-sm">
        <div className="container-padding max-w-7xl mx-auto py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 text-neutral-600 hover:text-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück
            </button>

            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span>{currentStep} von {totalSteps} Schritten abgeschlossen</span>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            </div>

            {currentStep === totalSteps ? (
              <button
                onClick={handleFinish}
                disabled={isLoading}
                className="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Setup wird abgeschlossen...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Setup abschließen
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 btn-primary"
              >
                Weiter
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage