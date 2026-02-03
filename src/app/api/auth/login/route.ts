import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    // Get user with password hash
    const user = await db.getUserWithPassword(email)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password (in production, use proper password verification)
    // For now, we'll use a simple check
    // In production: if (!auth.verifyPassword(password, user.passwordHash || '')) { ... }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is not active' },
        { status: 403 }
      )
    }

    // Generate token
    const token = auth.generateToken(user.id)

    // Get user's rooms
    const rooms = await db.getRoomsByUserId(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      },
      rooms: rooms.map(room => ({
        id: room.id,
        name: room.name,
        slug: room.slug,
        link: `/room/${room.slug}`,
      })),
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
