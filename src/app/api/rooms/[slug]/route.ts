import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const room = await db.getRoomBySlug(params.slug)
    
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      )
    }

    if (!room.isActive) {
      return NextResponse.json(
        { error: 'Room is not active' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      id: room.id,
      name: room.name,
      slug: room.slug,
      roomType: room.roomType,
      description: room.description,
      maxParticipants: room.maxParticipants,
      link: `/room/${room.slug}`,
    })
  } catch (error) {
    console.error('Get room error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
