import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    // In production, verify admin token here
    const users = await db.getAllUsers()
    const payments = await db.getAllPayments()

    const usersWithPayments = users.map(user => {
      const userPayments = payments.filter(p => p.userId === user.id)
      const totalPaid = userPayments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0)
      
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        totalPayments: userPayments.length,
        totalPaid,
        hasPayment: userPayments.length > 0,
      }
    })

    return NextResponse.json(usersWithPayments)
  } catch (error) {
    console.error('Admin users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { userId, isActive } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const updated = await db.updateUser(userId, { isActive: isActive !== false })
    
    if (!updated) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
      isActive: updated.isActive,
    })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
