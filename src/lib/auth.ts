import { NextRequest } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import type { User } from '@/types'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key')
const SESSION_COOKIE = 'session'

export interface SessionData {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(user: User): Promise<string> {
  const payload: Omit<SessionData, 'iat' | 'exp'> = {
    userId: user.id,
    email: user.email,
    role: user.role
  }

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  // Store session in database for better control
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expiresAt
    }
  })

  return token
}

export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    // Verify JWT signature and expiration
    const { payload } = await jwtVerify(token, JWT_SECRET)
    
    // Check if session exists in database and is not expired
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: true
      }
    })

    if (!session || session.expiresAt < new Date()) {
      return null
    }

    return payload as SessionData
  } catch (error) {
    console.error('Session verification failed:', error)
    return null
  }
}

export async function getSessionFromCookie(): Promise<SessionData | null> {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE)
  
  if (!sessionCookie?.value) {
    return null
  }

  return verifySession(sessionCookie.value)
}

export async function getSessionFromRequest(request: NextRequest): Promise<SessionData | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE)
  
  if (!sessionCookie?.value) {
    return null
  }

  return verifySession(sessionCookie.value)
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSessionFromCookie()
  
  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      restaurant: true
    }
  })

  return user
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { token }
  })
}

export async function deleteAllUserSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { userId }
  })
}

export function setSessionCookie(token: string): void {
  const cookieStore = cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  })
}

export function clearSessionCookie(): void {
  const cookieStore = cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Clean up expired sessions (should be run by a cron job)
export async function cleanupExpiredSessions(): Promise<void> {
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  })
}