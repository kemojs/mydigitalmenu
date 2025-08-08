'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Edit, 
  Save, 
  Trash2, 
  Plus, 
  GripVertical,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import type { OnboardingStep3Input, ProcessedMenu, ProcessedMenuItem } from '@/types'

interface Step3Props {
  data?: OnboardingStep3Input
  onComplete: (data: OnboardingStep3Input) => void
  onNext: () => void
  onPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const OnboardingStep3 = ({ 
  data, 
  onComplete, 
  onNext 
}: Step3Props) => {
  const [processedMenu, setProcessedMenu] = useState<ProcessedMenu | null>(
    data?.processedMenu || null
  )
  const [editingItem, setEditingItem] = useState<{categoryIndex: number, itemIndex: number} | null>(null)
  const [corrections, setCorrections] = useState<Record<string, any>>(data?.corrections || {})

  useEffect(() => {
    // Mock processed menu for demo
    if (!processedMenu) {
      const mockMenu: ProcessedMenu = {
        categories: [
          {
            name: 'Vorspeisen',
            confidence: 0.92,
            items: [
              { name: 'Gemischter Salat', price: 8.50, confidence: 0.89, allergens: [] },
              { name: 'Bruschetta al Pomodoro', price: 9.90, confidence: 0.85, allergens: ['gluten'] },
              { name: 'Antipasti Misti', price: 12.90, confidence: 0.91, allergens: ['laktose'] }
            ]
          },
          {
            name: 'Hauptgerichte',
            confidence: 0.88,
            items: [
              { name: 'Spaghetti Carbonara', price: 13.90, confidence: 0.94, allergens: ['gluten', 'ei', 'laktose'] },
              { name: 'Pizza Margherita', price: 11.50, confidence: 0.92, allergens: ['gluten', 'laktose'] },
              { name: 'Schnitzel Wiener Art', price: 16.90, confidence: 0.87, allergens: ['gluten', 'ei'] },
              { name: 'Lachs mit Gemüse', price: 18.90, confidence: 0.91, allergens: [] }
            ]
          },
          {
            name: 'Desserts',
            confidence: 0.85,
            items: [
              { name: 'Tiramisu', price: 6.90, confidence: 0.88, allergens: ['ei', 'laktose'] },
              { name: 'Panna Cotta', price: 5.90, confidence: 0.83, allergens: ['laktose'] }
            ]
          }
        ],
        currency: 'EUR',
        language: 'de',
        confidence: 0.89
      }
      setProcessedMenu(mockMenu)
    }
  }, [])

  const updateItem = (categoryIndex: number, itemIndex: number, updates: Partial<ProcessedMenuItem>) => {
    if (!processedMenu) return

    const newMenu = { ...processedMenu }
    newMenu.categories[categoryIndex].items[itemIndex] = {
      ...newMenu.categories[categoryIndex].items[itemIndex],
      ...updates
    }
    setProcessedMenu(newMenu)

    // Track corrections
    const correctionKey = `${categoryIndex}-${itemIndex}`
    setCorrections(prev => ({
      ...prev,
      [correctionKey]: updates
    }))
  }

  const addItem = (categoryIndex: number) => {
    if (!processedMenu) return

    const newItem: ProcessedMenuItem = {
      name: 'Neues Gericht',
      price: 0,
      confidence: 1.0,
      allergens: []
    }

    const newMenu = { ...processedMenu }
    newMenu.categories[categoryIndex].items.push(newItem)
    setProcessedMenu(newMenu)
  }

  const removeItem = (categoryIndex: number, itemIndex: number) => {
    if (!processedMenu) return

    const newMenu = { ...processedMenu }
    newMenu.categories[categoryIndex].items.splice(itemIndex, 1)
    setProcessedMenu(newMenu)
  }

  const handleContinue = () => {
    if (processedMenu) {
      onComplete({
        processedMenu,
        corrections
      })
      onNext()
    }
  }

  if (!processedMenu) {
    return <div>Loading...</div>
  }

  const totalItems = processedMenu.categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const highConfidenceItems = processedMenu.categories.reduce(
    (sum, cat) => sum + cat.items.filter(item => item.confidence > 0.9).length, 0
  )

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Edit className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
          Daten überprüfen & bearbeiten
        </h2>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Kontrollieren Sie die automatisch erkannten Daten und nehmen Sie bei Bedarf Korrekturen vor.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar with Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Stats Card */}
          <div className="card">
            <h3 className="font-semibold text-neutral-900 mb-4">Übersicht</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-600">Kategorien:</span>
                <span className="font-medium">{processedMenu.categories.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Gerichte:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Hohe Genauigkeit:</span>
                <span className="font-medium text-green-600">
                  {highConfidenceItems}/{totalItems}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Durchschn. Vertrauen:</span>
                <span className="font-medium">
                  {Math.round(processedMenu.confidence * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <h4 className="font-semibold text-primary-900 mb-4">Legende</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-primary-800">Hohe Erkennungsgenauigkeit</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-primary-800">Niedrige Erkennungsgenauigkeit</span>
              </div>
              <div className="flex items-center gap-2">
                <Edit className="w-4 h-4 text-blue-500" />
                <span className="text-primary-800">Zum Bearbeiten klicken</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full btn-primary"
          >
            Weiter zum Design
          </button>
        </motion.div>

        {/* Menu Editor */}
        <div className="lg:col-span-3 space-y-8">
          {processedMenu.categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-display font-semibold text-neutral-900">
                    {category.name}
                  </h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.confidence > 0.9 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {Math.round(category.confidence * 100)}% Genauigkeit
                  </div>
                </div>
                
                <button
                  onClick={() => addItem(categoryIndex)}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Gericht hinzufügen
                </button>
              </div>

              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const isEditing = editingItem?.categoryIndex === categoryIndex && 
                                   editingItem?.itemIndex === itemIndex

                  return (
                    <div
                      key={itemIndex}
                      className={`border rounded-lg p-4 transition-all ${
                        item.confidence < 0.8 ? 'border-yellow-200 bg-yellow-50' : 'border-neutral-200'
                      }`}
                    >
                      {isEditing ? (
                        <EditItemForm
                          item={item}
                          onSave={(updates) => {
                            updateItem(categoryIndex, itemIndex, updates)
                            setEditingItem(null)
                          }}
                          onCancel={() => setEditingItem(null)}
                        />
                      ) : (
                        <div className="flex items-center gap-4">
                          <GripVertical className="w-4 h-4 text-neutral-400 cursor-move" />
                          
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <div className="font-medium text-neutral-900">{item.name}</div>
                              {item.allergens && item.allergens.length > 0 && (
                                <div className="text-xs text-neutral-600 mt-1">
                                  Allergene: {item.allergens.join(', ')}
                                </div>
                              )}
                            </div>
                            
                            <div className="text-lg font-semibold text-neutral-900">
                              {item.price ? `€${item.price.toFixed(2)}` : 'Kein Preis'}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {item.confidence > 0.9 ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              )}
                              <span className="text-sm text-neutral-600">
                                {Math.round(item.confidence * 100)}%
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingItem({ categoryIndex, itemIndex })}
                              className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeItem(categoryIndex, itemIndex)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Edit Item Form Component
interface EditItemFormProps {
  item: ProcessedMenuItem
  onSave: (updates: Partial<ProcessedMenuItem>) => void
  onCancel: () => void
}

const EditItemForm = ({ item, onSave, onCancel }: EditItemFormProps) => {
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price?.toString() || '')
  const [allergens, setAllergens] = useState(item.allergens?.join(', ') || '')

  const handleSave = () => {
    const updates: Partial<ProcessedMenuItem> = {
      name,
      price: price ? parseFloat(price) : undefined,
      allergens: allergens ? allergens.split(',').map(a => a.trim()) : []
    }
    onSave(updates)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Gericht-Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Name des Gerichts"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Preis (€)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            placeholder="0.00"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Allergene (kommagetrennt)
          </label>
          <input
            type="text"
            value={allergens}
            onChange={(e) => setAllergens(e.target.value)}
            className="input"
            placeholder="gluten, laktose, ei"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 btn-primary text-sm px-4 py-2"
        >
          <Save className="w-4 h-4" />
          Speichern
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 btn-outline text-sm px-4 py-2"
        >
          Abbrechen
        </button>
      </div>
    </div>
  )
}

export default OnboardingStep3