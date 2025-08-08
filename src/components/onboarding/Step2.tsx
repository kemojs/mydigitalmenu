'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Camera, 
  FileImage, 
  AlertCircle, 
  CheckCircle, 
  Zap,
  Eye,
  RotateCcw,
  Download,
  Loader2
} from 'lucide-react'
import { createWorker } from 'tesseract.js'
import type { OnboardingStep2Input, ProcessedMenu } from '@/types'

interface Step2Props {
  data?: OnboardingStep2Input
  onComplete: (data: OnboardingStep2Input & { processedMenu: ProcessedMenu }) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const OnboardingStep2 = ({ 
  data, 
  onComplete, 
  onNext, 
  onPrevious 
}: Step2Props) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [ocrProgress, setOcrProgress] = useState(0)
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle')
  const [ocrMethod, setOcrMethod] = useState<'CLIENT' | 'SERVER' | 'BOTH'>('CLIENT')
  const [processedMenu, setProcessedMenu] = useState<ProcessedMenu | null>(null)
  const [error, setError] = useState<string>('')
  
  const workerRef = useRef<any>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
      if (workerRef.current) {
        workerRef.current.terminate().catch(console.error)
      }
    }
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploadedFile(file)
    setError('')
    setOcrStatus('idle')
    setOcrProgress(0)
    setProcessedMenu(null)

    // Clean up any existing processing
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    if (workerRef.current) {
      workerRef.current.terminate().catch(console.error)
      workerRef.current = null
    }

    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    // Auto-start OCR processing
    await processImage(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onError: (error) => {
      setError('Fehler beim Hochladen: ' + error.message)
    }
  })

  const processImage = async (file: File) => {
    setOcrStatus('processing')
    setOcrProgress(0)
    setError('')

    try {
      if (ocrMethod === 'CLIENT' || ocrMethod === 'BOTH') {
        await processWithTesseract(file)
      } else {
        await processWithServer(file)
      }
    } catch (err) {
      console.error('OCR processing error:', err)
      setError('Fehler bei der Texterkennung. Bitte versuchen Sie es erneut.')
      setOcrStatus('error')
    }
  }

  const processWithTesseract = async (file: File) => {
    try {
      // Clean up any existing interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }

      // Initialize Tesseract worker with a safe logger implementation
      workerRef.current = await createWorker({
        logger: (m) => {
          console.log('Tesseract log:', m)
          // Only handle specific progress messages to avoid DataCloneError
          if (m && typeof m === 'object' && m.status === 'recognizing text' && typeof m.progress === 'number') {
            setOcrProgress(Math.round(m.progress * 100))
          }
        }
      })

      await workerRef.current.loadLanguage('deu+eng')
      await workerRef.current.initialize('deu+eng')

      // Recognize text
      const { data: { text } } = await workerRef.current.recognize(file)
      
      // Set progress to 100%
      setOcrProgress(100)
      
      // Process and structure the recognized text
      const processed = await structureMenuText(text)
      setProcessedMenu(processed)
      setOcrStatus('completed')

      // Cleanup worker
      await workerRef.current.terminate()
      workerRef.current = null
    } catch (error) {
      // Clean up on error
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
      if (workerRef.current) {
        await workerRef.current.terminate().catch(console.error)
        workerRef.current = null
      }
      throw new Error('Tesseract processing failed: ' + error)
    }
  }

  const processWithServer = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('/api/ocr/process', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Server OCR processing failed')
    }

    const result = await response.json()
    setProcessedMenu(result.processedMenu)
    setOcrStatus('completed')
  }

  const structureMenuText = async (text: string): Promise<ProcessedMenu> => {
    // Simulate more sophisticated text processing
    // In a real implementation, this would use NLP and ML models
    await new Promise(resolve => setTimeout(resolve, 1000))

    const lines = text.split('\n').filter(line => line.trim())
    const categories: any[] = []
    let currentCategory: any = null

    for (const line of lines) {
      const trimmedLine = line.trim()
      
      // Skip empty lines
      if (!trimmedLine) continue

      // Detect potential category headers (usually in caps or special formatting)
      if (isLikelyCategory(trimmedLine)) {
        if (currentCategory) {
          categories.push(currentCategory)
        }
        currentCategory = {
          name: trimmedLine,
          items: [],
          confidence: 0.85
        }
      } else if (currentCategory && isLikelyMenuItem(trimmedLine)) {
        // Extract price from line
        const price = extractPriceFromText(trimmedLine)
        const nameWithoutPrice = trimmedLine.replace(/[€$]\s*\d+[.,]\d{2}|\d+[.,]\d{2}\s*[€$]/g, '').trim()
        
        currentCategory.items.push({
          name: nameWithoutPrice,
          price: price,
          confidence: 0.8,
          allergens: detectAllergens(trimmedLine)
        })
      }
    }

    // Add the last category
    if (currentCategory) {
      categories.push(currentCategory)
    }

    return {
      categories,
      currency: 'EUR',
      language: 'de',
      confidence: 0.82
    }
  }

  const isLikelyCategory = (text: string): boolean => {
    const categoryWords = [
      'vorspeisen', 'hauptgerichte', 'nachspeisen', 'getränke', 'desserts',
      'suppen', 'salate', 'fleisch', 'fisch', 'vegetarisch', 'pizza', 'pasta'
    ]
    return categoryWords.some(word => text.toLowerCase().includes(word)) || 
           text === text.toUpperCase() && text.length < 30
  }

  const isLikelyMenuItem = (text: string): boolean => {
    return /[€$]\s*\d+[.,]\d{2}|\d+[.,]\d{2}\s*[€$]/.test(text)
  }

  const extractPriceFromText = (text: string): number | null => {
    const match = text.match(/(?:[€$]\s*)?(\d+)[.,](\d{2})/)
    if (match) {
      return parseFloat(`${match[1]}.${match[2]}`)
    }
    return null
  }

  const detectAllergens = (text: string): string[] => {
    const allergenMap: Record<string, string[]> = {
      'gluten': ['weizen', 'roggen', 'gerste', 'hafer', 'dinkel'],
      'laktose': ['milch', 'käse', 'butter', 'sahne', 'joghurt'],
      'ei': ['ei', 'eier'],
      'nüsse': ['nuss', 'nüsse', 'mandel', 'haselnuss', 'walnuss']
    }

    const found: string[] = []
    const lowerText = text.toLowerCase()

    Object.entries(allergenMap).forEach(([allergen, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        found.push(allergen)
      }
    })

    return found
  }

  const handleContinue = () => {
    if (uploadedFile && processedMenu) {
      onComplete({
        ocrMethod,
        processedMenu
      })
      onNext()
    }
  }

  const retryOCR = () => {
    if (uploadedFile) {
      processImage(uploadedFile)
    }
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
          <Camera className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
          Speisekarte fotografieren
        </h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Laden Sie ein Foto Ihrer aktuellen Speisekarte hoch. Unser intelligenter 
          Scanner erkennt automatisch alle Texte und strukturiert sie für Sie.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* OCR Method Selection */}
          <div className="card">
            <h3 className="font-semibold text-neutral-900 mb-4">Verarbeitungsmethode</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  value: 'CLIENT',
                  title: 'Client-seitig (Empfohlen)',
                  description: 'Schnell & DSGVO-konform - Daten verlassen Ihr Gerät nicht',
                  icon: Zap
                },
                {
                  value: 'SERVER',
                  title: 'Server-seitig',
                  description: 'Höhere Genauigkeit für komplexe Layouts',
                  icon: Upload
                },
                {
                  value: 'BOTH',
                  title: 'Hybrid-Verarbeitung',
                  description: 'Kombiniert beide Methoden für beste Ergebnisse',
                  icon: CheckCircle
                }
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    ocrMethod === method.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="ocrMethod"
                    value={method.value}
                    checked={ocrMethod === method.value}
                    onChange={(e) => setOcrMethod(e.target.value as any)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    ocrMethod === method.value ? 'border-primary-500 bg-primary-500' : 'border-neutral-300'
                  }`}>
                    {ocrMethod === method.value && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <method.icon className={`w-5 h-5 ${ocrMethod === method.value ? 'text-primary-600' : 'text-neutral-400'}`} />
                  <div>
                    <div className="font-medium text-neutral-900">{method.title}</div>
                    <div className="text-sm text-neutral-600">{method.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="card">
            <h3 className="font-semibold text-neutral-900 mb-4">Speisekarten-Foto hochladen</h3>
            
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                  isDragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-neutral-700 mb-2">
                  {isDragActive ? 'Foto hier ablegen' : 'Foto hochladen'}
                </p>
                <p className="text-neutral-500 mb-4">
                  Ziehen Sie ein Foto hierher oder klicken Sie zum Auswählen
                </p>
                <p className="text-sm text-neutral-400">
                  Unterstützt: JPG, PNG, WebP (max. 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Uploaded menu"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setUploadedFile(null)
                      setPreviewUrl('')
                      setOcrStatus('idle')
                      setOcrProgress(0)
                      setProcessedMenu(null)
                      setError('')
                      if (progressIntervalRef.current) {
                        clearInterval(progressIntervalRef.current)
                        progressIntervalRef.current = null
                      }
                      if (workerRef.current) {
                        workerRef.current.terminate().catch(console.error)
                        workerRef.current = null
                      }
                      URL.revokeObjectURL(previewUrl)
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <FileImage className="w-4 h-4" />
                  <span>{uploadedFile.name}</span>
                  <span className="text-neutral-400">
                    ({(uploadedFile.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
              {ocrStatus === 'error' && (
                <button
                  onClick={retryOCR}
                  className="ml-auto flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  Wiederholen
                </button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Processing & Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {/* OCR Processing Status */}
          <div className="card">
            <h3 className="font-semibold text-neutral-900 mb-4">Verarbeitungsstatus</h3>
            
            <AnimatePresence mode="wait">
              {ocrStatus === 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <Eye className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-500">
                    Warten auf Foto-Upload...
                  </p>
                </motion.div>
              )}

              {ocrStatus === 'processing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <div className="relative w-16 h-16 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-200" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-600">
                        {ocrProgress}%
                      </span>
                    </div>
                  </div>
                  <p className="text-neutral-700 font-medium mb-2">
                    Texterkennung läuft...
                  </p>
                  <p className="text-sm text-neutral-500">
                    Dies kann je nach Bildgröße 30-60 Sekunden dauern
                  </p>
                </motion.div>
              )}

              {ocrStatus === 'completed' && processedMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-lg">
                    <CheckCircle className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Texterkennung abgeschlossen!</div>
                      <div className="text-sm">
                        {processedMenu.categories.length} Kategorien und{' '}
                        {processedMenu.categories.reduce((sum, cat) => sum + cat.items.length, 0)} Gerichte erkannt
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-neutral-900">Erkannte Kategorien:</h4>
                    {processedMenu.categories.map((category, index) => (
                      <div key={index} className="border border-neutral-200 rounded-lg p-4">
                        <div className="font-medium text-neutral-900 mb-2">
                          {category.name}
                        </div>
                        <div className="text-sm text-neutral-600 space-y-1">
                          {category.items.slice(0, 3).map((item, itemIndex) => (
                            <div key={itemIndex} className="flex justify-between">
                              <span>{item.name}</span>
                              {item.price && (
                                <span className="font-medium">€{item.price.toFixed(2)}</span>
                              )}
                            </div>
                          ))}
                          {category.items.length > 3 && (
                            <div className="text-neutral-400 italic">
                              ... und {category.items.length - 3} weitere Gerichte
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full btn-primary"
                  >
                    Zur Datenprüfung
                  </button>
                </motion.div>
              )}

              {ocrStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <p className="text-red-600 font-medium mb-4">
                    Fehler bei der Texterkennung
                  </p>
                  <button
                    onClick={retryOCR}
                    className="btn-outline"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Erneut versuchen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tips */}
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-4">📸 Tipps für beste Ergebnisse</h4>
            <ul className="space-y-2 text-sm text-primary-800">
              <li>• Gute Beleuchtung verwenden</li>
              <li>• Foto gerade und vollständig aufnehmen</li>
              <li>• Scharfes, nicht verwackeltes Bild</li>
              <li>• Kontrastreiche Aufnahme (dunkler Text auf hellem Hintergrund)</li>
              <li>• Reflexionen und Schatten vermeiden</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OnboardingStep2