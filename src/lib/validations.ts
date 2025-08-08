import { z } from 'zod'
import type { Plan } from '@/types'

// Auth Validations
export const signupSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(6, 'Passwort muss mindestens 6 Zeichen lang sein'),
  restaurantName: z.string().min(2, 'Restaurant-Name muss mindestens 2 Zeichen lang sein'),
  acceptTerms: z.boolean().refine(val => val === true, 'Sie müssen den AGB zustimmen')
})

export const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(1, 'Passwort ist erforderlich')
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse')
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token ist erforderlich'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen lang sein'),
  confirmPassword: z.string().min(8, 'Passwort-Bestätigung ist erforderlich')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwörter stimmen nicht überein',
  path: ['confirmPassword']
})

// Restaurant Validations
export const restaurantSchema = z.object({
  name: z.string().min(2, 'Restaurant-Name muss mindestens 2 Zeichen lang sein'),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Ungültiger Hex-Farbcode').optional(),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Ungültiger Hex-Farbcode').optional(),
  template: z.string().min(1, 'Template ist erforderlich'),
  qrCodeStyle: z.string().min(1, 'QR-Code-Stil ist erforderlich')
})

// Menu Validations
export const menuSchema = z.object({
  name: z.string().min(2, 'Menü-Name muss mindestens 2 Zeichen lang sein'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  languages: z.array(z.string()).min(1, 'Mindestens eine Sprache ist erforderlich')
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Kategorie-Name muss mindestens 2 Zeichen lang sein'),
  description: z.string().optional(),
  order: z.number().min(0),
  isActive: z.boolean().default(true)
})

export const menuItemSchema = z.object({
  name: z.string().min(2, 'Gericht-Name muss mindestens 2 Zeichen lang sein'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preis muss positiv sein'),
  currency: z.string().min(3, 'Währung ist erforderlich').max(3),
  image: z.string().url().optional().or(z.literal('')),
  allergens: z.array(z.string()).default([]),
  nutritionalInfo: z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    carbs: z.number().optional(),
    fat: z.number().optional(),
    fiber: z.number().optional(),
    sugar: z.number().optional(),
    sodium: z.number().optional()
  }).optional(),
  isAvailable: z.boolean().default(true),
  isVegetarian: z.boolean().default(false),
  isVegan: z.boolean().default(false),
  isGlutenFree: z.boolean().default(false),
  order: z.number().min(0)
})

// Onboarding Validations
export const onboardingStep1Schema = z.object({
  restaurantName: z.string().min(2, 'Restaurant-Name ist erforderlich'),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal(''))
})

export const onboardingStep2Schema = z.object({
  ocrMethod: z.enum(['CLIENT', 'SERVER', 'BOTH']),
  // File validation will be handled separately on the client
})

export const onboardingStep3Schema = z.object({
  processedMenu: z.object({
    categories: z.array(z.object({
      name: z.string(),
      items: z.array(z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number().optional(),
        allergens: z.array(z.string()).default([]),
        confidence: z.number()
      })),
      confidence: z.number()
    })),
    currency: z.string().optional(),
    language: z.string().optional(),
    confidence: z.number()
  }),
  corrections: z.record(z.any()).default({})
})

export const onboardingStep4Schema = z.object({
  template: z.string().min(1, 'Template ist erforderlich'),
  qrCodeStyle: z.string().min(1, 'QR-Code-Stil ist erforderlich'),
  colors: z.object({
    primary: z.string().regex(/^#[0-9A-F]{6}$/i, 'Ungültiger Hex-Farbcode'),
    secondary: z.string().regex(/^#[0-9A-F]{6}$/i, 'Ungültiger Hex-Farbcode')
  })
})

// File Upload Validations
export const uploadSchema = z.object({
  file: z.any().refine(
    (file) => file instanceof File,
    'Datei ist erforderlich'
  ).refine(
    (file) => file.size <= 10 * 1024 * 1024, // 10MB
    'Datei darf maximal 10MB groß sein'
  ).refine(
    (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Nur JPEG, PNG und WebP Dateien sind erlaubt'
  )
})

// Analytics Validations
export const analyticsQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  restaurantId: z.string().cuid().optional(),
  granularity: z.enum(['hour', 'day', 'week', 'month']).default('day')
})

// API Response Validation
export const apiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional()
})

// Utility type extractors
export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RestaurantInput = z.infer<typeof restaurantSchema>
export type MenuInput = z.infer<typeof menuSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type MenuItemInput = z.infer<typeof menuItemSchema>
export type OnboardingStep1Input = z.infer<typeof onboardingStep1Schema>
export type OnboardingStep2Input = z.infer<typeof onboardingStep2Schema>
export type OnboardingStep3Input = z.infer<typeof onboardingStep3Schema>
export type OnboardingStep4Input = z.infer<typeof onboardingStep4Schema>
export type AnalyticsQuery = z.infer<typeof analyticsQuerySchema>

// Validation helper functions
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return { success: true, data: result.data }
  }
  
  return {
    success: false,
    errors: result.error.errors.map(err => err.message)
  }
}

export function getValidationError(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {}
  
  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      errors[err.path.join('.')] = err.message
    }
  })
  
  return errors
}