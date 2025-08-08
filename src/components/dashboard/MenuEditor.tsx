'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Plus,
  GripVertical,
  Edit,
  Trash2,
  Save,
  Eye,
  Camera,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Heart,
  Leaf,
  Wheat,
  AlertTriangle,
  CheckCircle,
  Clock,
  Euro,
  Globe
} from 'lucide-react'
import type { Restaurant, Menu, Category, MenuItem } from '@/types'

interface MenuEditorProps {
  restaurant: Restaurant
}

interface ExtendedMenuItem extends Omit<MenuItem, 'createdAt' | 'updatedAt'> {
  isEditing?: boolean
  isNew?: boolean
}

interface ExtendedCategory extends Omit<Category, 'createdAt' | 'updatedAt'> {
  items: ExtendedMenuItem[]
  isEditing?: boolean
  isCollapsed?: boolean
}

const MenuEditor = ({ restaurant }: MenuEditorProps) => {
  const [categories, setCategories] = useState<ExtendedCategory[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Mock data for demonstration
  useEffect(() => {
    const mockCategories: ExtendedCategory[] = [
      {
        id: '1',
        name: 'Vorspeisen',
        description: 'Leckere Appetithäppchen',
        order: 0,
        isActive: true,
        menuId: 'menu1',
        isCollapsed: false,
        items: [
          {
            id: '1',
            name: 'Bruschetta al Pomodoro',
            description: 'Geröstetes Brot mit frischen Tomaten, Basilikum und Knoblauch',
            price: 8.90,
            currency: 'EUR',
            image: null,
            allergens: ['gluten'],
            isAvailable: true,
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            order: 0,
            categoryId: '1',
            menuId: 'menu1',
            nutritionalInfo: { calories: 180, protein: 4, carbs: 20, fat: 8 }
          },
          {
            id: '2',
            name: 'Antipasti Misti',
            description: 'Auswahl italienischer Vorspeisen mit Oliven, Käse und Aufschnitt',
            price: 12.90,
            currency: 'EUR',
            image: null,
            allergens: ['laktose'],
            isAvailable: true,
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            order: 1,
            categoryId: '1',
            menuId: 'menu1',
            nutritionalInfo: { calories: 320, protein: 15, carbs: 8, fat: 24 }
          }
        ]
      },
      {
        id: '2',
        name: 'Hauptgerichte',
        description: 'Herzhafte Hauptspeisen',
        order: 1,
        isActive: true,
        menuId: 'menu1',
        isCollapsed: false,
        items: [
          {
            id: '3',
            name: 'Spaghetti Carbonara',
            description: 'Klassische Pasta mit Ei, Speck und Parmesan',
            price: 14.90,
            currency: 'EUR',
            image: null,
            allergens: ['gluten', 'ei', 'laktose'],
            isAvailable: true,
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            order: 0,
            categoryId: '2',
            menuId: 'menu1',
            nutritionalInfo: { calories: 580, protein: 28, carbs: 65, fat: 22 }
          },
          {
            id: '4',
            name: 'Risotto ai Funghi',
            description: 'Cremiges Risotto mit gemischten Pilzen und Kräutern',
            price: 16.50,
            currency: 'EUR',
            image: null,
            allergens: ['laktose'],
            isAvailable: false,
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            order: 1,
            categoryId: '2',
            menuId: 'menu1',
            nutritionalInfo: { calories: 420, protein: 12, carbs: 68, fat: 10 }
          }
        ]
      }
    ]
    setCategories(mockCategories)
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      setCategories((categories) => {
        const oldIndex = categories.findIndex((cat) => cat.id === active.id)
        const newIndex = categories.findIndex((cat) => cat.id === over.id)

        const newCategories = arrayMove(categories, oldIndex, newIndex).map(
          (cat, index) => ({ ...cat, order: index })
        )
        
        setHasChanges(true)
        return newCategories
      })
    }
  }

  const addCategory = () => {
    const newCategory: ExtendedCategory = {
      id: `temp-${Date.now()}`,
      name: 'Neue Kategorie',
      description: '',
      order: categories.length,
      isActive: true,
      menuId: 'menu1',
      isEditing: true,
      isCollapsed: false,
      items: []
    }
    setCategories([...categories, newCategory])
    setHasChanges(true)
  }

  const addMenuItem = (categoryId: string) => {
    const newItem: ExtendedMenuItem = {
      id: `temp-item-${Date.now()}`,
      name: 'Neues Gericht',
      description: '',
      price: 0,
      currency: 'EUR',
      image: null,
      allergens: [],
      isAvailable: true,
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      order: 0,
      categoryId,
      menuId: 'menu1',
      isEditing: true,
      isNew: true
    }

    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, items: [...cat.items, newItem] }
        : cat
    ))
    setHasChanges(true)
  }

  const updateCategory = (categoryId: string, updates: Partial<ExtendedCategory>) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, ...updates }
        : cat
    ))
    setHasChanges(true)
  }

  const updateMenuItem = (categoryId: string, itemId: string, updates: Partial<ExtendedMenuItem>) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId
        ? {
            ...cat,
            items: cat.items.map(item =>
              item.id === itemId ? { ...item, ...updates } : item
            )
          }
        : cat
    ))
    setHasChanges(true)
  }

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId))
    setHasChanges(true)
  }

  const deleteMenuItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId
        ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
        : cat
    ))
    setHasChanges(true)
  }

  const saveChanges = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setHasChanges(false)
    } catch (error) {
      console.error('Error saving changes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.items.some(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    
    const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={addCategory}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Kategorie hinzufügen
          </button>
          <button className="btn-outline">
            <Camera className="w-4 h-4 mr-2" />
            Speisekarte scannen
          </button>
          <button className="btn-outline">
            <Eye className="w-4 h-4 mr-2" />
            Vorschau
          </button>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-lg text-sm"
            >
              <Clock className="w-4 h-4" />
              Nicht gespeicherte Änderungen
            </motion.div>
          )}
          
          <button
            onClick={saveChanges}
            disabled={!hasChanges || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Speichere...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Speichern
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Gerichte oder Kategorien suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input lg:w-48"
          >
            <option value="all">Alle Kategorien</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Categories */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredCategories.map(cat => cat.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <CategoryEditor
                key={category.id}
                category={category}
                onUpdate={(updates) => updateCategory(category.id, updates)}
                onDelete={() => deleteCategory(category.id)}
                onAddItem={() => addMenuItem(category.id)}
                onUpdateItem={(itemId, updates) => updateMenuItem(category.id, itemId, updates)}
                onDeleteItem={(itemId) => deleteMenuItem(category.id, itemId)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Keine Kategorien gefunden
          </h3>
          <p className="text-neutral-600 mb-6">
            {searchTerm ? 'Ihre Suche ergab keine Treffer.' : 'Fügen Sie Ihre erste Kategorie hinzu.'}
          </p>
          {!searchTerm && (
            <button onClick={addCategory} className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Erste Kategorie erstellen
            </button>
          )}
        </motion.div>
      )}
    </div>
  )
}

// Category Editor Component
interface CategoryEditorProps {
  category: ExtendedCategory
  onUpdate: (updates: Partial<ExtendedCategory>) => void
  onDelete: () => void
  onAddItem: () => void
  onUpdateItem: (itemId: string, updates: Partial<ExtendedMenuItem>) => void
  onDeleteItem: (itemId: string) => void
}

const CategoryEditor = ({
  category,
  onUpdate,
  onDelete,
  onAddItem,
  onUpdateItem,
  onDeleteItem
}: CategoryEditorProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      className={`card ${isDragging ? 'opacity-50' : ''}`}
    >
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          {...attributes}
          {...listeners}
          className="p-2 text-neutral-400 hover:text-neutral-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {category.isEditing ? (
          <div className="flex-1 flex gap-3">
            <input
              type="text"
              value={category.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="input flex-1"
              placeholder="Kategorie-Name"
            />
            <input
              type="text"
              value={category.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="input flex-1"
              placeholder="Beschreibung (optional)"
            />
            <button
              onClick={() => onUpdate({ isEditing: false })}
              className="btn-primary px-4"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-display font-semibold text-neutral-900">
                  {category.name}
                </h3>
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                  {category.items.length} Gerichte
                </span>
                {!category.isActive && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                    Inaktiv
                  </span>
                )}
              </div>
              {category.description && (
                <p className="text-neutral-600 mt-1">{category.description}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdate({ isCollapsed: !category.isCollapsed })}
                className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg hover:bg-neutral-100"
              >
                {category.isCollapsed ? <Plus className="w-4 h-4" /> : <MoreHorizontal className="w-4 h-4" />}
              </button>
              <button
                onClick={() => onUpdate({ isEditing: true })}
                className="p-2 text-primary-600 hover:text-primary-700 rounded-lg hover:bg-primary-50"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Menu Items */}
      <AnimatePresence>
        {!category.isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              {category.items.map((item) => (
                <MenuItemEditor
                  key={item.id}
                  item={item}
                  onUpdate={(updates) => onUpdateItem(item.id, updates)}
                  onDelete={() => onDeleteItem(item.id)}
                />
              ))}

              <button
                onClick={onAddItem}
                className="w-full p-4 border-2 border-dashed border-neutral-300 rounded-lg text-neutral-600 hover:border-primary-400 hover:text-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Gericht hinzufügen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Menu Item Editor Component
interface MenuItemEditorProps {
  item: ExtendedMenuItem
  onUpdate: (updates: Partial<ExtendedMenuItem>) => void
  onDelete: () => void
}

const MenuItemEditor = ({ item, onUpdate, onDelete }: MenuItemEditorProps) => {
  const allergenOptions = [
    { id: 'gluten', label: 'Gluten', icon: Wheat },
    { id: 'laktose', label: 'Laktose', icon: '🥛' },
    { id: 'ei', label: 'Ei', icon: '🥚' },
    { id: 'nüsse', label: 'Nüsse', icon: '🥜' },
    { id: 'fisch', label: 'Fisch', icon: '🐟' },
    { id: 'soja', label: 'Soja', icon: '🫘' }
  ]

  return (
    <div className={`border rounded-lg p-4 ${item.isNew ? 'border-primary-200 bg-primary-50' : 'border-neutral-200'} transition-all`}>
      {item.isEditing ? (
        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Gericht-Name *
              </label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="input"
                placeholder="z.B. Spaghetti Carbonara"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Preis *
              </label>
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || 0 })}
                  className="input pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Beschreibung
            </label>
            <textarea
              value={item.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={2}
              className="input resize-none"
              placeholder="Beschreibung des Gerichts..."
            />
          </div>

          {/* Dietary Options */}
          <div className="grid grid-cols-3 gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isVegetarian}
                onChange={(e) => onUpdate({ isVegetarian: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <Leaf className="w-4 h-4 text-green-500" />
              <span className="text-sm">Vegetarisch</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isVegan}
                onChange={(e) => onUpdate({ isVegan: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <Heart className="w-4 h-4 text-green-600" />
              <span className="text-sm">Vegan</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isGlutenFree}
                onChange={(e) => onUpdate({ isGlutenFree: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <Wheat className="w-4 h-4 text-yellow-600" />
              <span className="text-sm">Glutenfrei</span>
            </label>
          </div>

          {/* Allergens */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Allergene
            </label>
            <div className="flex flex-wrap gap-2">
              {allergenOptions.map((allergen) => (
                <button
                  key={allergen.id}
                  type="button"
                  onClick={() => {
                    const currentAllergens = item.allergens || []
                    const newAllergens = currentAllergens.includes(allergen.id)
                      ? currentAllergens.filter(a => a !== allergen.id)
                      : [...currentAllergens, allergen.id]
                    onUpdate({ allergens: newAllergens })
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    item.allergens?.includes(allergen.id)
                      ? 'bg-red-100 text-red-700 border border-red-300'
                      : 'bg-neutral-100 text-neutral-700 border border-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  {typeof allergen.icon === 'string' ? (
                    <span>{allergen.icon}</span>
                  ) : (
                    <allergen.icon className="w-3 h-3" />
                  )}
                  {allergen.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isAvailable}
                onChange={(e) => onUpdate({ isAvailable: e.target.checked })}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">Verfügbar</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdate({ isEditing: false })}
                className="btn-primary text-sm px-4 py-2"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Fertig
              </button>
              <button
                onClick={onDelete}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex-1 grid md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-neutral-900">{item.name}</h4>
                <div className="flex items-center gap-1">
                  {item.isVegetarian && <Leaf className="w-3 h-3 text-green-500" />}
                  {item.isVegan && <Heart className="w-3 h-3 text-green-600" />}
                  {item.isGlutenFree && <Wheat className="w-3 h-3 text-yellow-600" />}
                </div>
              </div>
              {item.description && (
                <p className="text-sm text-neutral-600 line-clamp-2">{item.description}</p>
              )}
              {item.allergens && item.allergens.length > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  <span className="text-xs text-amber-600">
                    {item.allergens.join(', ')}
                  </span>
                </div>
              )}
            </div>
            
            <div className="text-right md:text-center">
              <div className="text-xl font-bold text-neutral-900">
                €{item.price.toFixed(2)}
              </div>
              <div className={`text-sm ${item.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {item.isAvailable ? 'Verfügbar' : 'Nicht verfügbar'}
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => onUpdate({ isEditing: true })}
                  className="p-2 text-primary-600 hover:text-primary-700 rounded-lg hover:bg-primary-50"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuEditor