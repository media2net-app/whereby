import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Get all published courses (marketplace)
export async function GET(request: NextRequest) {
  try {
    const courses = await db.getPublishedCourses()
    
    return NextResponse.json(
      courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        category: course.category,
        downloadCount: course.downloadCount,
        createdAt: course.createdAt,
        // Don't expose fileUrl - only after purchase
      }))
    )
  } catch (error) {
    console.error('Get courses error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create new course
export async function POST(request: NextRequest) {
  try {
    // In production, verify user token here
    const { userId, title, description, price, category, fileUrl, fileName, fileSize } = await request.json()

    if (!userId || !title || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const course = await db.createCourse({
      userId,
      title,
      description,
      price: parseFloat(price),
      fileUrl,
      fileName,
      fileSize: fileSize ? parseInt(fileSize) : undefined,
      category,
      isPublished: false, // Admin must approve
    })

    return NextResponse.json({
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      category: course.category,
      isPublished: course.isPublished,
    })
  } catch (error) {
    console.error('Create course error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
