import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // In production, verify admin token here
    // const token = request.headers.get('authorization')
    // if (!isAdmin(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const users = await db.getAllUsers()
    const rooms = await db.getAllRooms()
    const courses = await db.getAllCourses()
    const payments = await db.getAllPayments()

    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      totalRooms: rooms.length,
      activeRooms: rooms.filter(r => r.isActive).length,
      totalCourses: courses.length,
      publishedCourses: courses.filter(c => c.isPublished).length,
      totalPayments: payments.length,
      completedPayments: payments.filter(p => p.status === 'completed').length,
      totalRevenue: payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0),
      pendingPayments: payments.filter(p => p.status === 'pending').length,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
