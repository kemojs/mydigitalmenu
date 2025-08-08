'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import QRCode from 'qrcode'
import { 
  Download, 
  Share2, 
  Copy, 
  Printer, 
  Palette,
  Eye,
  Refresh,
  Settings,
  Image as ImageIcon,
  FileText,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle,
  ExternalLink,
  QrCode,
  Camera,
  Zap,
  Star
} from 'lucide-react'
import type { Restaurant } from '@/types'

interface QRCodeGeneratorProps {
  restaurant: Restaurant
}

const QRCodeGenerator = ({ restaurant }: QRCodeGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('modern')
  const [selectedSize, setSelectedSize] = useState('medium')
  const [customColor, setCustomColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [includeFrame, setIncludeFrame] = useState(true)
  const [includeLogo, setIncludeLogo] = useState(true)
  const [includeText, setIncludeText] = useState(true)
  const [customText, setCustomText] = useState('Scan für digitale Speisekarte')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  const menuUrl = `${process.env.NODE_ENV === 'production' ? 'https://mydigitalmenu.com' : 'http://localhost:3000'}/menu/${restaurant.slug}`

  const styles = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Klean und minimalistisch',
      preview: '⬛'
    },
    {
      id: 'rounded',
      name: 'Abgerundet',
      description: 'Weiche Ecken und Formen',
      preview: '⬜'
    },
    {
      id: 'dotted',
      name: 'Gepunktet',
      description: 'Dots statt Quadrate',
      preview: '⚫'
    },
    {
      id: 'artistic',
      name: 'Künstlerisch',
      description: 'Kreative Formen',
      preview: '🎨'
    }
  ]

  const sizes = [
    { id: 'small', name: 'Klein', pixels: 256, description: 'Für kleine Aufsteller' },
    { id: 'medium', name: 'Medium', pixels: 512, description: 'Standard-Größe' },
    { id: 'large', name: 'Groß', pixels: 1024, description: 'Für Poster und Drucke' },
    { id: 'xlarge', name: 'Extra Groß', pixels: 2048, description: 'Höchste Qualität' }
  ]

  const downloadFormats = [
    { id: 'png', name: 'PNG', description: 'Für Web und digitale Nutzung' },
    { id: 'svg', name: 'SVG', description: 'Vektorgrafik, unbegrenzt skalierbar' },
    { id: 'pdf', name: 'PDF', description: 'Druckfertig' },
    { id: 'jpeg', name: 'JPEG', description: 'Komprimiert für E-Mail' }
  ]

  useEffect(() => {
    generateQRCode()
  }, [selectedStyle, selectedSize, customColor, backgroundColor, menuUrl])

  const generateQRCode = async () => {
    setIsGenerating(true)
    
    try {
      const size = sizes.find(s => s.id === selectedSize)?.pixels || 512
      
      const qrCodeDataURL = await QRCode.toDataURL(menuUrl, {
        width: size,
        margin: 2,
        color: {
          dark: customColor,
          light: backgroundColor
        },
        errorCorrectionLevel: 'H'
      })
      
      setQrCodeUrl(qrCodeDataURL)
    } catch (error) {
      console.error('Error generating QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async (format: string) => {
    if (!qrCodeUrl) return

    setIsGenerating(true)
    
    try {
      let dataUrl = qrCodeUrl
      let filename = `${restaurant.slug}-qr-code`
      
      if (format === 'pdf') {
        // For PDF, we would integrate with jsPDF
        filename += '.pdf'
        // TODO: Implement PDF generation
      } else if (format === 'svg') {
        const svgString = await QRCode.toString(menuUrl, { type: 'svg' })
        dataUrl = 'data:image/svg+xml;base64,' + btoa(svgString)
        filename += '.svg'
      } else if (format === 'jpeg') {
        // Convert PNG to JPEG
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx!.fillStyle = backgroundColor
          ctx!.fillRect(0, 0, canvas.width, canvas.height)
          ctx!.drawImage(img, 0, 0)
          
          dataUrl = canvas.toDataURL('image/jpeg', 0.9)
          triggerDownload(dataUrl, filename + '.jpeg')
        }
        
        img.src = qrCodeUrl
        return
      } else {
        filename += '.png'
      }
      
      triggerDownload(dataUrl, filename)
    } catch (error) {
      console.error('Error downloading QR code:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const triggerDownload = (dataUrl: string, filename: string) => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = dataUrl
      downloadLinkRef.current.download = filename
      downloadLinkRef.current.click()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${restaurant.name} - Digitale Speisekarte`,
          text: 'Schauen Sie sich unsere digitale Speisekarte an:',
          url: menuUrl
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* QR Code Preview */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-display font-semibold text-neutral-900 mb-4">
              QR-Code Vorschau
            </h3>
            
            <div className="relative">
              <div className="bg-neutral-50 rounded-xl p-8 flex items-center justify-center min-h-64">
                {isGenerating ? (
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-neutral-600">Generiere QR-Code...</p>
                  </div>
                ) : qrCodeUrl ? (
                  <div className="relative">
                    <img 
                      src={qrCodeUrl} 
                      alt="QR Code" 
                      className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                    {includeText && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <p className="text-sm text-neutral-700 bg-white px-3 py-1 rounded-full shadow-sm">
                          {customText}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-neutral-500">
                    <QrCode className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
                    <p>QR-Code wird generiert...</p>
                  </div>
                )}
              </div>
              
              {qrCodeUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-3"
                >
                  <div className="text-center">
                    <p className="text-sm text-neutral-600 mb-2">QR-Code führt zu:</p>
                    <div className="bg-neutral-100 rounded-lg p-3">
                      <p className="text-xs font-mono text-neutral-800 break-all">
                        {menuUrl}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 btn-outline text-sm py-2"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      URL kopieren
                    </button>
                    <button
                      onClick={shareQRCode}
                      className="flex-1 btn-outline text-sm py-2"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Teilen
                    </button>
                  </div>
                  
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 text-green-600 bg-green-50 py-2 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">In Zwischenablage kopiert!</span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Device Preview */}
          <div className="card mt-6">
            <h4 className="font-semibold text-neutral-900 mb-4">Geräte-Vorschau</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Smartphone className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
                <p className="text-xs text-neutral-600">Smartphone</p>
              </div>
              <div>
                <Tablet className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
                <p className="text-xs text-neutral-600">Tablet</p>
              </div>
              <div>
                <Monitor className="w-8 h-8 mx-auto mb-2 text-neutral-600" />
                <p className="text-xs text-neutral-600">Desktop</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Style Selection */}
          <div className="card">
            <h3 className="text-lg font-display font-semibold text-neutral-900 mb-4">
              QR-Code Stil
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {styles.map((style) => (
                <motion.div
                  key={style.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedStyle === style.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{style.preview}</div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">{style.name}</h4>
                      <p className="text-sm text-neutral-600">{style.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="card">
            <h3 className="text-lg font-display font-semibold text-neutral-900 mb-4">
              Größe
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {sizes.map((size) => (
                <label
                  key={size.id}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedSize === size.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    value={size.id}
                    checked={selectedSize === size.id}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="sr-only"
                  />
                  <div>
                    <div className="font-semibold text-neutral-900">
                      {size.name}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {size.pixels}x{size.pixels}px - {size.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Color Customization */}
          <div className="card">
            <h3 className="text-lg font-display font-semibold text-neutral-900 mb-4">
              Farbanpassung
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  QR-Code Farbe
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border border-neutral-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="input flex-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Hintergrundfarbe
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border border-neutral-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="input flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="card">
            <h3 className="text-lg font-display font-semibold text-neutral-900 mb-4">
              Erweiterte Optionen
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-neutral-900">Logo einfügen</label>
                  <p className="text-sm text-neutral-600">Restaurant-Logo in der Mitte</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLogo}
                    onChange={(e) => setIncludeLogo(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-neutral-900">Rahmen hinzufügen</label>
                  <p className="text-sm text-neutral-600">Dekorativer Rahmen um den QR-Code</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFrame}
                    onChange={(e) => setIncludeFrame(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-neutral-900">Text hinzufügen</label>
                  <p className="text-sm text-neutral-600">Erklärender Text unter dem QR-Code</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeText}
                    onChange={(e) => setIncludeText(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              {includeText && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Custom Text
                  </label>
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="input"
                    placeholder="z.B. Scan für digitale Speisekarte"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-neutral-900">
            Download & Export
          </h3>
          <button
            onClick={generateQRCode}
            className="btn-outline"
          >
            <Refresh className="w-4 h-4 mr-2" />
            Neu generieren
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {downloadFormats.map((format) => (
            <motion.button
              key={format.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDownload(format.id)}
              disabled={isGenerating || !qrCodeUrl}
              className="p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="text-center">
                <Download className="w-8 h-8 mx-auto mb-2 text-neutral-600 group-hover:text-primary-600" />
                <h4 className="font-semibold text-neutral-900 mb-1">
                  {format.name}
                </h4>
                <p className="text-sm text-neutral-600">
                  {format.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h4 className="font-semibold text-primary-900 mb-2">
                Pro-Tipp für den Druck
              </h4>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Verwenden Sie SVG oder PDF für gestochen scharfe Drucke</li>
                <li>• Mindestgröße: 3x3 cm für zuverlässiges Scannen</li>
                <li>• Testen Sie den QR-Code vor dem Massendruck</li>
                <li>• Platzieren Sie ihn auf Augenhöhe für beste Erreichbarkeit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden download link */}
      <a ref={downloadLinkRef} className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default QRCodeGenerator