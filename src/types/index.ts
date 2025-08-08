// User and Authentication Types
export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: Date
  updatedAt: Date
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  subscriptionStatus?: string
  currentPeriodEnd?: Date
  restaurant?: Restaurant
}

// Restaurant Types
export interface Restaurant {
  id: string
  name: string
  slug: string
  description?: string
  address?: string
  phone?: string
  email?: string
  website?: string
  logo?: string
  primaryColor?: string
  secondaryColor?: string
  template: string
  qrCodeStyle: string
  isActive: boolean
  plan: Plan
  planExpiresAt?: Date
  betaExpiresAt?: Date
  isBetaUser?: boolean
  ownerId: string
  owner: User
  menus: Menu[]
  analytics: Analytics[]
  createdAt: Date
  updatedAt: Date
}

// Menu and Category Types
export interface Menu {
  id: string
  name: string
  description?: string
  isActive: boolean
  restaurantId: string
  restaurant: Restaurant
  categories: Category[]
  items: MenuItem[]
  languages: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description?: string
  order: number
  isActive: boolean
  menuId: string
  menu: Menu
  items: MenuItem[]
  createdAt: Date
  updatedAt: Date
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  currency: string
  image?: string
  allergens: string[]
  nutritionalInfo?: NutritionalInfo
  isAvailable: boolean
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  order: number
  categoryId: string
  category: Category
  menuId: string
  menu: Menu
  translations: MenuItemTranslation[]
  createdAt: Date
  updatedAt: Date
}

export interface MenuItemTranslation {
  id: string
  language: string
  name: string
  description?: string
  menuItemId: string
  menuItem: MenuItem
}

export interface NutritionalInfo {
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  fiber?: number
  sugar?: number
  sodium?: number
}

// Plan and Billing Types
export type Plan = string // 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE' - now stored as string in SQLite

export interface PlanFeatures {
  maxLocations: number
  qrCodeDesigns: number
  languages: number
  analytics: 'BASIC' | 'ADVANCED' | 'ENTERPRISE'
  support: 'EMAIL' | 'EMAIL_PHONE' | 'DEDICATED'
  customBranding: boolean
  apiAccess: boolean
  whiteLabel: boolean
  abTesting: boolean
}

export const PLAN_FEATURES: Record<Plan, PlanFeatures> = {
  STARTER: {
    maxLocations: 1,
    qrCodeDesigns: 5,
    languages: 10,
    analytics: 'BASIC',
    support: 'EMAIL',
    customBranding: false,
    apiAccess: false,
    whiteLabel: false,
    abTesting: false,
  },
  PROFESSIONAL: {
    maxLocations: 3,
    qrCodeDesigns: 20,
    languages: 20,
    analytics: 'ADVANCED',
    support: 'EMAIL_PHONE',
    customBranding: true,
    apiAccess: false,
    whiteLabel: false,
    abTesting: false,
  },
  ENTERPRISE: {
    maxLocations: -1, // unlimited
    qrCodeDesigns: -1, // unlimited
    languages: 30,
    analytics: 'ENTERPRISE',
    support: 'DEDICATED',
    customBranding: true,
    apiAccess: true,
    whiteLabel: true,
    abTesting: true,
  },
}

export const PLAN_PRICES = {
  STARTER: 29,
  PROFESSIONAL: 49,
  ENTERPRISE: 89,
} as const

// OCR and Image Processing Types
export interface OCRResult {
  text: string
  confidence: number
  boundingBox?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface ProcessedMenu {
  categories: ProcessedCategory[]
  currency?: string
  language?: string
  confidence: number
}

export interface ProcessedCategory {
  name: string
  items: ProcessedMenuItem[]
  confidence: number
}

export interface ProcessedMenuItem {
  name: string
  description?: string
  price?: number
  allergens?: string[]
  confidence: number
}

// QR Code Types
export interface QRCodeOptions {
  size: number
  margin: number
  color: {
    dark: string
    light: string
  }
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  logo?: string
  style: 'square' | 'circle' | 'rounded'
}

// Analytics Types
export interface Analytics {
  id: string
  restaurantId: string
  restaurant: Restaurant
  date: Date
  views: number
  uniqueViews: number
  deviceTypes: Record<string, number>
  browsers: Record<string, number>
  locations: Record<string, number>
  popularItems: Record<string, number>
  peakHours: Record<string, number>
  createdAt: Date
  updatedAt: Date
}

// Template Types
export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  category: 'MODERN' | 'CLASSIC' | 'MINIMAL' | 'ELEGANT' | 'COLORFUL'
  features: string[]
  customizations: {
    colors: boolean
    fonts: boolean
    layout: boolean
    images: boolean
  }
  isActive: boolean
  isPremium: boolean
  createdAt: Date
  updatedAt: Date
}

// Form Types
export interface SignupFormData {
  name: string
  email: string
  password: string
  restaurantName: string
  acceptTerms: boolean
}

export interface LoginFormData {
  email: string
  password: string
}

export interface OnboardingFormData {
  step1: {
    restaurantName: string
    description: string
    address: string
    phone: string
    website?: string
  }
  step2: {
    menuImage: File
    ocrMethod: 'CLIENT' | 'SERVER' | 'BOTH'
  }
  step3: {
    processedMenu: ProcessedMenu
    corrections: Record<string, any>
  }
  step4: {
    template: string
    qrCodeStyle: string
    colors: {
      primary: string
      secondary: string
    }
  }
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type CreateInput<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateInput<T> = Partial<CreateInput<T>>