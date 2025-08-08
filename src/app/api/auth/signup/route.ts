import { NextRequest, NextResponse } from 'next/server'
import { signupSchema } from '@/lib/validations'
import { hashPassword, createSession, setSessionCookie } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = signupSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.errors
        },
        { status: 400 }
      )
    }

    const { name, email, password, restaurantName, acceptTerms } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ein Benutzer mit dieser E-Mail-Adresse existiert bereits'
        },
        { status: 409 }
      )
    }

    // Generate restaurant slug
    const slug = generateSlug(restaurantName)
    
    // Check if slug is already taken
    const existingRestaurant = await prisma.restaurant.findUnique({
      where: { slug }
    })

    const finalSlug = existingRestaurant ? `${slug}-${Date.now()}` : slug

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Calculate beta expiration (6 months for beta users)
    const betaExpiresAt = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000)

    // Create user and restaurant in transaction
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      })

      const restaurant = await tx.restaurant.create({
        data: {
          name: restaurantName,
          slug: finalSlug,
          plan: 'STARTER',
          betaExpiresAt,
          isBetaUser: true,
          ownerId: newUser.id
        }
      })

      // Create default menu
      await tx.menu.create({
        data: {
          name: 'Hauptspeisekarte',
          restaurantId: restaurant.id,
          languages: 'de'
        }
      })

      return { ...newUser, restaurant }
    })

    // Create session
    const sessionToken = await createSession(user as any)
    
    // Set session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Konto erfolgreich erstellt',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        restaurant: {
          id: user.restaurant.id,
          name: user.restaurant.name,
          slug: user.restaurant.slug,
          plan: user.restaurant.plan
        }
      }
    })

    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Interner Serverfehler'
      },
      { status: 500 }
    )
  }
}