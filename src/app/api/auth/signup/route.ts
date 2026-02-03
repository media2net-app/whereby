import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, roomName } = await request.json()

    if (!email || !password || !name || !roomName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create user
    const passwordHash = auth.hashPassword(password)
    const user = await db.createUser({
      email,
      passwordHash,
      name,
      role: 'user',
      isActive: true,
    })

    // Create room with the chosen name (slug from room name)
    const slug = roomName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    // Ensure unique slug
    let finalSlug = slug
    let counter = 1
    while (await db.getRoomBySlug(finalSlug)) {
      finalSlug = `${slug}-${counter}`
      counter++
    }

    const room = await db.createRoom({
      userId: user.id,
      name: roomName,
      slug: finalSlug,
      roomType: 'general',
      maxParticipants: 200,
      isActive: true,
    })

    // Generate token
    const token = auth.generateToken(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      },
      room: {
        id: room.id,
        name: room.name,
        slug: room.slug,
        link: `/room/${room.slug}`,
      },
      token,
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
