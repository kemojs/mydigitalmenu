import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest, deleteSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('session')
    
    if (sessionCookie?.value) {
      // Delete session from database
      await deleteSession(sessionCookie.value)
    }

    // Create response and clear session cookie
    const response = NextResponse.json({
      success: true,
      message: 'Erfolgreich abgemeldet'
    })

    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Interner Serverfehler'
      },
      { status: 500 }
    )
  }
}