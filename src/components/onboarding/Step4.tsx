'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Palette, 
  Smartphone, 
  Check,
  Download,
  Eye,
  RefreshCw,
  Settings,
  CheckCircle,
  Sparkles
} from 'lucide-react'
import type { OnboardingStep4Input } from '@/types'

interface Step4Props {
  data?: OnboardingStep4Input
  onComplete: (data: OnboardingStep4Input) => void
  onNext: () => void
  onPrevious: () => void
  onFinish: () => void
  isLoading: boolean
  isFirstStep: boolean
  isLastStep: boolean
}

const OnboardingStep4 = ({ 
  data, 
  onComplete, 
  onFinish,
  isLoading 
}: Step4Props) => {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState(data?.template || 'modern')
  const [selectedQRStyle, setSelectedQRStyle] = useState(data?.qrCodeStyle || 'square')
  const [colors, setColors] = useState(data?.colors || {
    primary: '#FF6B35',
    secondary: '#2D5A27'
  })
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Klean und zeitgemäß',
      preview: '/templates/modern-preview.png',
      features: ['Minimalistisch', 'Mobile-optimiert', 'Schnelle Ladezeit']
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated und stilvoll',
      preview: '/templates/elegant-preview.png',
      features: ['Premium-Look', 'Typografie-fokus', 'Luxuriös']
    },
    {
      id: 'classic',
      name: 'Klassisch',
      description: 'Traditionell und vertraut',
      preview: '/templates/classic-preview.png',
      features: ['Zeitlos', 'Bewährt', 'Universell']
    },
    {
      id: 'colorful',
      name: 'Farbenfroh',
      description: 'Lebhaft und einladend',
      preview: '/templates/colorful-preview.png',
      features: ['Auffällig', 'Lebendig', 'Einprägsam']
    }
  ]

  const qrStyles = [
    {
      id: 'square',
      name: 'Eckig',
      description: 'Klassische QR-Code Form',
      preview: '⬛'
    },
    {
      id: 'circle',
      name: 'Rund',
      description: 'Moderne, abgerundete Form',
      preview: '⚫'
    },
    {
      id: 'logo',
      name: 'Mit Logo',
      description: 'QR-Code mit Ihrem Logo',
      preview: '🎯'
    }
  ]

  const handleFinish = async () => {
    const formData: OnboardingStep4Input = {
      template: selectedTemplate,
      qrCodeStyle: selectedQRStyle,
      colors
    }

    onComplete(formData)

    try {
      setIsGeneratingPreview(true)
      await onFinish()
    } catch (error) {
      console.error('Error finishing onboarding:', error)
    }
  }

  const generatePreview = async () => {
    setIsGeneratingPreview(true)
    // Simulate preview generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGeneratingPreview(false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Palette className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
          Design & QR-Code erstellen
        </h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Wählen Sie das perfekte Template und Design für Ihre digitale Speisekarte. 
          Ihr QR-Code wird automatisch generiert.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Template Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Templates */}
          <div className="card">
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
              Template auswählen
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedTemplate === template.id
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-neutral-300'
                  }`}>
                    {selectedTemplate === template.id && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>

                  <div className="w-full h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl">🖼️</span>
                  </div>
                  
                  <h4 className="font-semibold text-neutral-900 mb-2">{template.name}</h4>
                  <p className="text-sm text-neutral-600 mb-3">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Color Customization */}
          <div className="card">
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
              Farben anpassen
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Primärfarbe
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={colors.primary}
                    onChange={(e) => setColors(prev => ({ ...prev, primary: e.target.value }))}
                    className="w-12 h-12 rounded-lg border border-neutral-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={colors.primary}
                    onChange={(e) => setColors(prev => ({ ...prev, primary: e.target.value }))}
                    className="input flex-1"
                    placeholder="#FF6B35"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Sekundärfarbe
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={colors.secondary}
                    onChange={(e) => setColors(prev => ({ ...prev, secondary: e.target.value }))}
                    className="w-12 h-12 rounded-lg border border-neutral-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={colors.secondary}
                    onChange={(e) => setColors(prev => ({ ...prev, secondary: e.target.value }))}
                    className="input flex-1"
                    placeholder="#2D5A27"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r rounded-lg" 
                 style={{ 
                   background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
                   border: `2px solid ${colors.primary}40`
                 }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg" 
                     style={{ backgroundColor: colors.primary }} />
                <div className="w-8 h-8 rounded-lg" 
                     style={{ backgroundColor: colors.secondary }} />
                <span className="text-neutral-700 font-medium">Farbvorschau</span>
              </div>
            </div>
          </div>

          {/* QR Code Style */}
          <div className="card">
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
              QR-Code Stil
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {qrStyles.map((style) => (
                <div
                  key={style.id}
                  className={`p-4 border-2 rounded-xl text-center cursor-pointer transition-all ${
                    selectedQRStyle === style.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedQRStyle(style.id)}
                >
                  <div className="text-4xl mb-3">{style.preview}</div>
                  <h4 className="font-semibold text-neutral-900 mb-1">{style.name}</h4>
                  <p className="text-xs text-neutral-600">{style.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Live Preview */}
          <div className="card">
            <h4 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Live-Vorschau
            </h4>
            
            <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl p-4 aspect-[9/16] flex items-center justify-center">
              {isGeneratingPreview ? (
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-neutral-400 mx-auto mb-2 animate-spin" />
                  <p className="text-sm text-neutral-500">Generiere Vorschau...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Smartphone className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-sm text-neutral-500 mb-4">Mobile Vorschau</p>
                  <button
                    onClick={generatePreview}
                    className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1 mx-auto"
                  >
                    <Eye className="w-3 h-3" />
                    Vorschau generieren
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* QR Code Preview */}
          <div className="card">
            <h4 className="font-semibold text-neutral-900 mb-4">Ihr QR-Code</h4>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-neutral-900 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">QR</span>
              </div>
              <p className="text-sm text-neutral-600 mb-4">
                Wird automatisch generiert
              </p>
              <div className="flex gap-2">
                <button className="flex-1 text-xs text-primary-600 hover:text-primary-700">
                  <Download className="w-3 h-3 mx-auto mb-1" />
                  Download
                </button>
                <button className="flex-1 text-xs text-primary-600 hover:text-primary-700">
                  <Settings className="w-3 h-3 mx-auto mb-1" />
                  Anpassen
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Zusammenfassung
            </h4>
            <div className="space-y-2 text-sm text-primary-800">
              <div>✅ Restaurant-Details eingegeben</div>
              <div>✅ Speisekarte gescannt</div>
              <div>✅ Daten überprüft</div>
              <div className="flex items-center gap-2">
                <span>🎨 Design:</span>
                <span className="font-medium">{templates.find(t => t.id === selectedTemplate)?.name}</span>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <button
            onClick={handleFinish}
            disabled={isLoading || isGeneratingPreview}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" />
                Setup wird abgeschlossen...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Digitale Speisekarte erstellen
              </div>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default OnboardingStep4