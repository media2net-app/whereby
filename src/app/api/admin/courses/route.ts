import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Get all courses (admin view)
export async function GET(request: NextRequest) {
  try {
    // In production, verify admin token here
    const courses = await db.getAllCourses()
    
    return NextResponse.json(courses)
  } catch (error) {
    console.error('Admin courses error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update course (approve/publish)
export async function PATCH(request: NextRequest) {
  try {
    const { courseId, isPublished } = await request.json()

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID required' },
        { status: 400 }
      )
    }

    const updated = await db.updateCourse(courseId, { isPublished: isPublished !== false })
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
      isPublished: updated.isPublished,
    })
  } catch (error) {
    console.error('Update course error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
