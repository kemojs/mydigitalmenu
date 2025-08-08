import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validations'
import { verifyPassword, createSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = loginSchema.safeParse(body)

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

    const { email, password } = validation.data

    // Find user with restaurant
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        restaurant: true
      }
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ungültige E-Mail-Adresse oder Passwort'
        },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ungültige E-Mail-Adresse oder Passwort'
        },
        { status: 401 }
      )
    }

    // Create session
    const sessionToken = await createSession(user as any)
    
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Erfolgreich angemeldet',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        restaurant: user.restaurant ? {
          id: user.restaurant.id,
          name: user.restaurant.name,
          slug: user.restaurant.slug,
          plan: user.restaurant.plan,
          betaExpiresAt: user.restaurant.betaExpiresAt
        } : null
      }
    })

    // Set session cookie
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Interner Serverfehler'
      },
      { status: 500 }
    )
  }
}