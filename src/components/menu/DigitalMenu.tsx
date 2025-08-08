'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Heart,
  Leaf,
  Wheat,
  AlertTriangle,
  MapPin,
  Phone,
  Globe,
  Clock,
  Info,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Share2,
  Languages,
  ShoppingBag,
  ArrowUp
} from 'lucide-react'

interface DigitalMenuProps {
  restaurant: any
  selectedLanguage?: string
  tableNumber?: string
}

const DigitalMenu = ({ 
  restaurant, 
  selectedLanguage = 'de', 
  tableNumber 
}: DigitalMenuProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false
  })
  const [showNutrition, setShowNutrition] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const primaryColor = restaurant.primaryColor || '#FF6B35'
  const secondaryColor = restaurant.secondaryColor || '#2D5A27'

  const menu = restaurant.menus[0] // Assuming first menu is active
  const categories = menu.categories

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Track visit for analytics
    trackMenuView()
  }, [])

  const trackMenuView = async () => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantSlug: restaurant.slug,
          event: 'menu_view',
          tableNumber,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      })
    } catch (error) {
      console.error('Analytics tracking failed:', error)
    }
  }

  const filteredItems = categories.flatMap((category: any) =>
    category.items.filter((item: any) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDietary = (!dietaryFilters.vegetarian || item.isVegetarian) &&
                            (!dietaryFilters.vegan || item.isVegan) &&
                            (!dietaryFilters.glutenFree || item.isGlutenFree)
      
      const matchesCategory = !selectedCategory || category.id === selectedCategory
      
      return matchesSearch && matchesDietary && matchesCategory && item.isAvailable
    }).map((item: any) => ({ ...item, categoryName: category.name }))
  )

  const allergenTranslations: Record<string, string> = {
    gluten: 'Gluten',
    laktose: 'Laktose',
    ei: 'Eier',
    nüsse: 'Nüsse',
    fisch: 'Fisch',
    mollusken: 'Muscheln',
    soja: 'Soja'
  }

  const shareMenu = async () => {
    const url = window.location.href
    const text = `Schau dir die Speisekarte von ${restaurant.name} an!`

    if (navigator.share) {
      try {
        await navigator.share({ title: restaurant.name, text, url })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      await navigator.clipboard.writeText(url)
      // Show toast notification
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header 
        className="sticky top-0 z-40 bg-white shadow-sm transition-all duration-300"
        style={{
          borderBottom: `3px solid ${primaryColor}`,
          backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
          backgroundColor: scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'white'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-neutral-900">
                {restaurant.name}
              </h1>
              <p className="text-sm text-neutral-600">
                {restaurant.description}
              </p>
              {tableNumber && (
                <p className="text-xs text-neutral-500 mt-1">
                  Tisch {tableNumber}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={shareMenu}
                className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              {/* Language Selector */}
              <select 
                className="text-sm border-none bg-transparent text-neutral-600 focus:outline-none"
                value={selectedLanguage}
                onChange={(e) => {
                  window.location.search = new URLSearchParams({
                    ...Object.fromEntries(new URLSearchParams(window.location.search)),
                    lang: e.target.value
                  }).toString()
                }}
              >
                <option value="de">🇩🇪 Deutsch</option>
                <option value="en">🇺🇸 English</option>
                <option value="it">🇮🇹 Italiano</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Gerichte durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all"
              style={{ focusRingColor: primaryColor }}
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                !selectedCategory
                  ? 'text-white shadow-lg'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              style={{
                backgroundColor: !selectedCategory ? primaryColor : undefined
              }}
            >
              Alle
            </button>
            {categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? primaryColor : undefined
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            <div className="flex items-center gap-3 text-sm">
              <button
                onClick={() => setShowNutrition(!showNutrition)}
                className={`px-3 py-1 rounded-full transition-all ${
                  showNutrition
                    ? 'text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
                style={{
                  backgroundColor: showNutrition ? secondaryColor : undefined
                }}
              >
                <Info className="w-4 h-4 inline mr-1" />
                Nährwerte
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-4 rounded-xl border border-neutral-200"
              >
                <h3 className="font-medium text-neutral-900 mb-3">Ernährungsweise</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: 'vegetarian', label: 'Vegetarisch', icon: Leaf, color: 'text-green-600' },
                    { key: 'vegan', label: 'Vegan', icon: Heart, color: 'text-green-700' },
                    { key: 'glutenFree', label: 'Glutenfrei', icon: Wheat, color: 'text-yellow-600' }
                  ].map((filter) => (
                    <label
                      key={filter.key}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={dietaryFilters[filter.key as keyof typeof dietaryFilters]}
                        onChange={(e) =>
                          setDietaryFilters(prev => ({
                            ...prev,
                            [filter.key]: e.target.checked
                          }))
                        }
                        className="w-4 h-4 rounded border-neutral-300 focus:ring-2"
                        style={{ accentColor: primaryColor }}
                      />
                      <filter.icon className={`w-4 h-4 ${filter.color}`} />
                      <span className="text-sm text-neutral-700">{filter.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="space-y-4">
          <AnimatePresence>
            {filteredItems.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-display font-semibold text-neutral-900">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {item.isVegetarian && <Leaf className="w-4 h-4 text-green-600" />}
                          {item.isVegan && <Heart className="w-4 h-4 text-green-700" />}
                          {item.isGlutenFree && <Wheat className="w-4 h-4 text-yellow-600" />}
                        </div>
                      </div>
                      
                      {item.description && (
                        <p className="text-neutral-600 mb-3 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Allergens */}
                      {item.allergens && item.allergens.length > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span className="text-sm text-amber-700">
                            Enthält: {item.allergens.map((a: string) => allergenTranslations[a] || a).join(', ')}
                          </span>
                        </div>
                      )}

                      {/* Nutrition Info */}
                      {showNutrition && item.nutritionalInfo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-neutral-50 p-3 rounded-lg mb-3"
                        >
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-neutral-900">Kalorien:</span>
                              <span className="text-neutral-600 ml-1">{item.nutritionalInfo.calories} kcal</span>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-900">Protein:</span>
                              <span className="text-neutral-600 ml-1">{item.nutritionalInfo.protein}g</span>
                            </div>
                            <div>
                              <span className="font-medium text-neutral-900">Fett:</span>
                              <span className="text-neutral-600 ml-1">{item.nutritionalInfo.fat}g</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="text-right ml-6">
                      <div 
                        className="text-2xl font-bold mb-2"
                        style={{ color: primaryColor }}
                      >
                        €{item.price.toFixed(2)}
                      </div>
                      
                      {!item.isAvailable && (
                        <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full">
                          Nicht verfügbar
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category Tag */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${primaryColor}20`, 
                        color: primaryColor 
                      }}
                    >
                      {item.categoryName}
                    </span>
                    
                    {item.image && (
                      <button
                        onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                        className="text-sm text-neutral-500 hover:text-neutral-700"
                      >
                        Bild {expandedItem === item.id ? 'ausblenden' : 'anzeigen'}
                      </button>
                    )}
                  </div>

                  {/* Expanded Image */}
                  <AnimatePresence>
                    {expandedItem === item.id && item.image && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Keine Gerichte gefunden
            </h3>
            <p className="text-neutral-600">
              Versuchen Sie andere Suchbegriffe oder Filter.
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-display font-semibold text-neutral-900 mb-2">
                {restaurant.name}
              </h3>
              <div className="space-y-2 text-sm text-neutral-600">
                {restaurant.address && (
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {restaurant.address}
                  </div>
                )}
                {restaurant.phone && (
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${restaurant.phone}`} className="hover:text-neutral-900">
                      {restaurant.phone}
                    </a>
                  </div>
                )}
                {restaurant.website && (
                  <div className="flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4" />
                    <a 
                      href={restaurant.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-neutral-900"
                    >
                      Website besuchen
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500">
                Digitale Speisekarte powered by{' '}
                <a 
                  href="https://mydigitalmenu.com" 
                  className="hover:text-neutral-700"
                  style={{ color: primaryColor }}
                >
                  MyDigitalMenu
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full text-white shadow-lg hover:shadow-xl transition-all z-30"
            style={{ backgroundColor: primaryColor }}
          >
            <ArrowUp className="w-5 h-5 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DigitalMenu