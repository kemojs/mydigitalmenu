'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Crown, 
  Palette, 
  Download,
  Check,
  Star,
  Filter,
  Search,
  Grid3X3,
  List,
  Smartphone,
  Monitor,
  Settings,
  Sparkles,
  Heart,
  Zap,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react'
import type { Restaurant } from '@/types'

interface TemplateGalleryProps {
  restaurant: Restaurant
}

interface Template {
  id: string
  name: string
  description: string
  category: 'modern' | 'classic' | 'elegant' | 'minimal' | 'colorful' | 'artistic'
  isPremium: boolean
  rating: number
  downloads: number
  features: string[]
  colors: string[]
  thumbnail: string
  previewUrl: string
  isActive?: boolean
  price?: number
}

const TemplateGallery = ({ restaurant }: TemplateGalleryProps) => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>(restaurant.template || 'modern')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  const categories = [
    { id: 'all', name: 'Alle', icon: Grid3X3 },
    { id: 'modern', name: 'Modern', icon: Zap },
    { id: 'classic', name: 'Klassisch', icon: Star },
    { id: 'elegant', name: 'Elegant', icon: Crown },
    { id: 'minimal', name: 'Minimal', icon: Sparkles },
    { id: 'colorful', name: 'Farbenfroh', icon: Heart },
    { id: 'artistic', name: 'Künstlerisch', icon: Palette }
  ]

  // Mock templates data
  useEffect(() => {
    const mockTemplates: Template[] = [
      {
        id: 'modern-clean',
        name: 'Modern Clean',
        description: 'Minimalistisches Design mit klaren Linien und perfekter Typografie',
        category: 'modern',
        isPremium: false,
        rating: 4.8,
        downloads: 2341,
        features: ['Mobile-optimiert', 'Schnelle Ladezeit', 'Accessibility'],
        colors: ['#FFFFFF', '#000000', '#FF6B35'],
        thumbnail: '/templates/modern-clean-thumb.jpg',
        previewUrl: '/templates/modern-clean-preview',
        isActive: selectedTemplate === 'modern-clean'
      },
      {
        id: 'elegant-gold',
        name: 'Elegant Gold',
        description: 'Luxuriöses Design mit goldenen Akzenten für gehobene Restaurants',
        category: 'elegant',
        isPremium: true,
        rating: 4.9,
        downloads: 1876,
        features: ['Premium-Look', 'Animation', 'Custom Fonts'],
        colors: ['#1A1A1A', '#D4AF37', '#FFFFFF'],
        thumbnail: '/templates/elegant-gold-thumb.jpg',
        previewUrl: '/templates/elegant-gold-preview',
        price: 29
      },
      {
        id: 'rustic-wood',
        name: 'Rustic Wood',
        description: 'Warmes, natürliches Design perfekt für traditionelle Restaurants',
        category: 'classic',
        isPremium: false,
        rating: 4.6,
        downloads: 3421,
        features: ['Natürliche Texturen', 'Warme Farben', 'Handschrift-Fonts'],
        colors: ['#8B4513', '#DEB887', '#2F1B14'],
        thumbnail: '/templates/rustic-wood-thumb.jpg',
        previewUrl: '/templates/rustic-wood-preview'
      },
      {
        id: 'minimal-white',
        name: 'Minimal White',
        description: 'Ultraminimalistisches Design das Ihre Gerichte in den Fokus stellt',
        category: 'minimal',
        isPremium: false,
        rating: 4.7,
        downloads: 2987,
        features: ['Ultra-minimal', 'Fokus auf Content', 'Große Bilder'],
        colors: ['#FFFFFF', '#F8F8F8', '#333333'],
        thumbnail: '/templates/minimal-white-thumb.jpg',
        previewUrl: '/templates/minimal-white-preview'
      },
      {
        id: 'vibrant-colors',
        name: 'Vibrant Colors',
        description: 'Lebendiges, farbenfrohes Design das Appetit macht',
        category: 'colorful',
        isPremium: true,
        rating: 4.5,
        downloads: 1654,
        features: ['Lebendige Farben', 'Playful Design', 'Instagram-Style'],
        colors: ['#FF6B35', '#F7931E', '#C5299B'],
        thumbnail: '/templates/vibrant-colors-thumb.jpg',
        previewUrl: '/templates/vibrant-colors-preview',
        price: 19
      },
      {
        id: 'artistic-brush',
        name: 'Artistic Brush',
        description: 'Künstlerisches Design mit handgemalten Elementen',
        category: 'artistic',
        isPremium: true,
        rating: 4.4,
        downloads: 987,
        features: ['Handgemalte Elemente', 'Unique Design', 'Künstlerisch'],
        colors: ['#2C3E50', '#E74C3C', '#F39C12'],
        thumbnail: '/templates/artistic-brush-thumb.jpg',
        previewUrl: '/templates/artistic-brush-preview',
        price: 39
      }
    ]
    setTemplates(mockTemplates)
  }, [selectedTemplate])

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesPremium = !showPremiumOnly || template.isPremium

    return matchesSearch && matchesCategory && matchesPremium
  })

  const handleApplyTemplate = async (templateId: string) => {
    setIsApplying(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSelectedTemplate(templateId)
      
      // Update templates to reflect active state
      setTemplates(templates.map(t => ({
        ...t,
        isActive: t.id === templateId
      })))
    } catch (error) {
      console.error('Error applying template:', error)
    } finally {
      setIsApplying(false)
    }
  }

  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId)
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.icon || Grid3X3
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Templates durchsuchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-64"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Premium Filter */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPremiumOnly}
                onChange={(e) => setShowPremiumOnly(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <Crown className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-neutral-700">Nur Premium</span>
            </label>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-100 text-primary-700 border border-primary-300'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          )
        })}
      </div>

      {/* Templates Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        <AnimatePresence>
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={viewMode === 'grid' ? 'card group hover:shadow-lg transition-all' : 'card'}
            >
              {viewMode === 'grid' ? (
                <GridTemplateCard
                  template={template}
                  isSelected={template.id === selectedTemplate}
                  onApply={() => handleApplyTemplate(template.id)}
                  onPreview={() => handlePreview(template.id)}
                  isApplying={isApplying && template.id === selectedTemplate}
                />
              ) : (
                <ListTemplateCard
                  template={template}
                  isSelected={template.id === selectedTemplate}
                  onApply={() => handleApplyTemplate(template.id)}
                  onPreview={() => handlePreview(template.id)}
                  isApplying={isApplying && template.id === selectedTemplate}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ImageIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Keine Templates gefunden
          </h3>
          <p className="text-neutral-600">
            Versuchen Sie andere Suchbegriffe oder Filter.
          </p>
        </motion.div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setPreviewTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold text-neutral-900">
                  Template Vorschau
                </h3>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="w-10 h-10 bg-neutral-100 hover:bg-neutral-200 rounded-full flex items-center justify-center transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Smartphone className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <p className="text-neutral-600">Template Vorschau</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 btn-primary">
                      <Check className="w-4 h-4 mr-2" />
                      Template verwenden
                    </button>
                    <button className="btn-outline">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  {templates.find(t => t.id === previewTemplate) && (
                    <TemplateDetails template={templates.find(t => t.id === previewTemplate)!} />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Grid Template Card Component
interface TemplateCardProps {
  template: Template
  isSelected: boolean
  onApply: () => void
  onPreview: () => void
  isApplying: boolean
}

const GridTemplateCard = ({ template, isSelected, onApply, onPreview, isApplying }: TemplateCardProps) => {
  return (
    <div className="relative">
      {/* Premium Badge */}
      {template.isPremium && (
        <div className="absolute top-3 right-3 z-10 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Crown className="w-3 h-3" />
          Premium
        </div>
      )}

      {/* Active Badge */}
      {isSelected && (
        <div className="absolute top-3 left-3 z-10 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Check className="w-3 h-3" />
          Aktiv
        </div>
      )}

      {/* Template Preview */}
      <div className="aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl mb-4 relative overflow-hidden cursor-pointer group-hover:scale-105 transition-transform">
        <div 
          className="w-full h-full flex items-center justify-center"
          onClick={onPreview}
        >
          <div className="text-center">
            <Smartphone className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 font-medium">{template.name}</p>
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={onPreview}
            className="bg-white text-neutral-900 px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Vorschau
          </button>
        </div>
      </div>

      {/* Template Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-display font-semibold text-neutral-900 mb-1">
            {template.name}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2">
            {template.description}
          </p>
        </div>

        {/* Rating and Downloads */}
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{template.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{template.downloads.toLocaleString()}</span>
          </div>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-2">
          {template.colors.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border border-neutral-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onApply}
          disabled={isApplying || isSelected}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isSelected
              ? 'bg-primary-100 text-primary-700 cursor-default'
              : 'btn-primary disabled:opacity-50 disabled:cursor-not-allowed'
          }`}
        >
          {isApplying ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block" />
              Wird angewendet...
            </>
          ) : isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2 inline-block" />
              Aktiv
            </>
          ) : (
            'Verwenden'
          )}
        </button>
      </div>
    </div>
  )
}

const ListTemplateCard = ({ template, isSelected, onApply, onPreview, isApplying }: TemplateCardProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="w-32 h-40 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex-shrink-0 relative">
        {template.isPremium && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-full">
            <Crown className="w-3 h-3" />
          </div>
        )}
        <div className="w-full h-full flex items-center justify-center cursor-pointer" onClick={onPreview}>
          <Smartphone className="w-8 h-8 text-neutral-400" />
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-semibold text-neutral-900 mb-2">
              {template.name}
            </h3>
            <p className="text-neutral-600 mb-3">
              {template.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{template.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{template.downloads.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onPreview}
              className="btn-outline py-2 px-4"
            >
              <Eye className="w-4 h-4 mr-2" />
              Vorschau
            </button>
            <button
              onClick={onApply}
              disabled={isApplying || isSelected}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                isSelected
                  ? 'bg-primary-100 text-primary-700 cursor-default'
                  : 'btn-primary disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {isApplying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block" />
                  Anwenden...
                </>
              ) : isSelected ? (
                <>
                  <Check className="w-4 h-4 mr-2 inline-block" />
                  Aktiv
                </>
              ) : (
                'Verwenden'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const TemplateDetails = ({ template }: { template: Template }) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-display font-semibold text-neutral-900 mb-2">
          {template.name}
        </h4>
        <p className="text-neutral-600 mb-4">
          {template.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{template.rating} Bewertung</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4 text-neutral-500" />
            <span>{template.downloads.toLocaleString()} Downloads</span>
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-semibold text-neutral-900 mb-3">Features</h5>
        <div className="space-y-2">
          {template.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary-500" />
              <span className="text-sm text-neutral-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5 className="font-semibold text-neutral-900 mb-3">Farbschema</h5>
        <div className="flex items-center gap-2">
          {template.colors.map((color, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg border border-neutral-200"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs font-mono text-neutral-600 uppercase">
                {color}
              </span>
            </div>
          ))}
        </div>
      </div>

      {template.isPremium && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">Premium Template</span>
          </div>
          <p className="text-sm text-yellow-700">
            Dieses Premium-Template kostet €{template.price} und bietet erweiterte Features und Support.
          </p>
        </div>
      )}
    </div>
  )
}

export default TemplateGallery