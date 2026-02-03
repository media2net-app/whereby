// Database client using Prisma
import { prisma } from './prisma'
import { Prisma } from '@prisma/client'

// Type helpers
export interface User {
  id: string
  email: string
  name: string
  passwordHash?: string
  role: 'user' | 'admin' | 'partner'
  isActive: boolean
  createdAt: Date
}

export interface Room {
  id: string
  userId: string
  name: string
  slug: string
  roomType: string
  description?: string
  maxParticipants: number
  isActive: boolean
  createdAt: Date
}

export interface Course {
  id: string
  userId: string
  title: string
  description?: string
  price: number
  fileUrl?: string
  fileName?: string
  fileSize?: number
  category?: string
  isPublished: boolean
  downloadCount: number
  createdAt: Date
}

export interface Payment {
  id: string
  userId: string
  amount: number
  paymentType: 'subscription' | 'course' | 'room'
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod?: string
  transactionId?: string
  createdAt: Date
  completedAt?: Date
}

// Helper to convert Decimal to number
const decimalToNumber = (value: Prisma.Decimal | null | undefined): number => {
  return value ? parseFloat(value.toString()) : 0
}

// Database functions using Prisma
export const db = {
  // Users
  createUser: async (userData: Omit<User, 'id' | 'createdAt'> & { passwordHash: string }): Promise<User> => {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash: userData.passwordHash,
        name: userData.name,
        role: userData.role,
        isActive: userData.isActive,
      },
    })
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'user' | 'admin' | 'partner',
      isActive: user.isActive,
      createdAt: user.createdAt,
    }
  },

  getUser: async (id: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    if (!user) return null
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'user' | 'admin' | 'partner',
      isActive: user.isActive,
      createdAt: user.createdAt,
    }
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) return null
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'user' | 'admin' | 'partner',
      isActive: user.isActive,
      createdAt: user.createdAt,
    }
  },

  getUserWithPassword: async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) return null
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash,
      role: user.role as 'user' | 'admin' | 'partner',
      isActive: user.isActive,
      createdAt: user.createdAt,
    }
  },

  getAllUsers: async (): Promise<User[]> => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'user' | 'admin' | 'partner',
      isActive: user.isActive,
      createdAt: user.createdAt,
    }))
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User | null> => {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(updates.email && { email: updates.email }),
        ...(updates.name && { name: updates.name }),
        ...(updates.role && { role: updates.role }),
        ...(updates.isActive !== undefined && { isActive: updates.isActive }),
      },
    })
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'user' | 'admin' | 'partner',
      isActive: user.isActive,
      createdAt: user.createdAt,
    }
  },

  // Rooms
  createRoom: async (roomData: Omit<Room, 'id' | 'createdAt'>): Promise<Room> => {
    const room = await prisma.room.create({
      data: {
        userId: roomData.userId,
        name: roomData.name,
        slug: roomData.slug,
        roomType: roomData.roomType,
        description: roomData.description,
        maxParticipants: roomData.maxParticipants,
        isActive: roomData.isActive,
      },
    })
    return {
      id: room.id,
      userId: room.userId,
      name: room.name,
      slug: room.slug,
      roomType: room.roomType,
      description: room.description || undefined,
      maxParticipants: room.maxParticipants,
      isActive: room.isActive,
      createdAt: room.createdAt,
    }
  },

  getRoom: async (id: string): Promise<Room | null> => {
    const room = await prisma.room.findUnique({
      where: { id },
    })
    if (!room) return null
    return {
      id: room.id,
      userId: room.userId,
      name: room.name,
      slug: room.slug,
      roomType: room.roomType,
      description: room.description || undefined,
      maxParticipants: room.maxParticipants,
      isActive: room.isActive,
      createdAt: room.createdAt,
    }
  },

  getRoomBySlug: async (slug: string): Promise<Room | null> => {
    const room = await prisma.room.findUnique({
      where: { slug },
    })
    if (!room) return null
    return {
      id: room.id,
      userId: room.userId,
      name: room.name,
      slug: room.slug,
      roomType: room.roomType,
      description: room.description || undefined,
      maxParticipants: room.maxParticipants,
      isActive: room.isActive,
      createdAt: room.createdAt,
    }
  },

  getRoomsByUserId: async (userId: string): Promise<Room[]> => {
    const rooms = await prisma.room.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return rooms.map(room => ({
      id: room.id,
      userId: room.userId,
      name: room.name,
      slug: room.slug,
      roomType: room.roomType,
      description: room.description || undefined,
      maxParticipants: room.maxParticipants,
      isActive: room.isActive,
      createdAt: room.createdAt,
    }))
  },

  getAllRooms: async (): Promise<Room[]> => {
    const rooms = await prisma.room.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return rooms.map(room => ({
      id: room.id,
      userId: room.userId,
      name: room.name,
      slug: room.slug,
      roomType: room.roomType,
      description: room.description || undefined,
      maxParticipants: room.maxParticipants,
      isActive: room.isActive,
      createdAt: room.createdAt,
    }))
  },

  // Courses
  createCourse: async (courseData: Omit<Course, 'id' | 'createdAt' | 'downloadCount'>): Promise<Course> => {
    const course = await prisma.course.create({
      data: {
        userId: courseData.userId,
        title: courseData.title,
        description: courseData.description,
        price: courseData.price,
        fileUrl: courseData.fileUrl,
        fileName: courseData.fileName,
        fileSize: courseData.fileSize ? BigInt(courseData.fileSize) : null,
        category: courseData.category,
        isPublished: courseData.isPublished,
      },
    })
    return {
      id: course.id,
      userId: course.userId,
      title: course.title,
      description: course.description || undefined,
      price: decimalToNumber(course.price),
      fileUrl: course.fileUrl || undefined,
      fileName: course.fileName || undefined,
      fileSize: course.fileSize ? Number(course.fileSize) : undefined,
      category: course.category || undefined,
      isPublished: course.isPublished,
      downloadCount: course.downloadCount,
      createdAt: course.createdAt,
    }
  },

  getCourse: async (id: string): Promise<Course | null> => {
    const course = await prisma.course.findUnique({
      where: { id },
    })
    if (!course) return null
    return {
      id: course.id,
      userId: course.userId,
      title: course.title,
      description: course.description || undefined,
      price: decimalToNumber(course.price),
      fileUrl: course.fileUrl || undefined,
      fileName: course.fileName || undefined,
      fileSize: course.fileSize ? Number(course.fileSize) : undefined,
      category: course.category || undefined,
      isPublished: course.isPublished,
      downloadCount: course.downloadCount,
      createdAt: course.createdAt,
    }
  },

  getPublishedCourses: async (): Promise<Course[]> => {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    })
    return courses.map(course => ({
      id: course.id,
      userId: course.userId,
      title: course.title,
      description: course.description || undefined,
      price: decimalToNumber(course.price),
      fileUrl: course.fileUrl || undefined,
      fileName: course.fileName || undefined,
      fileSize: course.fileSize ? Number(course.fileSize) : undefined,
      category: course.category || undefined,
      isPublished: course.isPublished,
      downloadCount: course.downloadCount,
      createdAt: course.createdAt,
    }))
  },

  getAllCourses: async (): Promise<Course[]> => {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return courses.map(course => ({
      id: course.id,
      userId: course.userId,
      title: course.title,
      description: course.description || undefined,
      price: decimalToNumber(course.price),
      fileUrl: course.fileUrl || undefined,
      fileName: course.fileName || undefined,
      fileSize: course.fileSize ? Number(course.fileSize) : undefined,
      category: course.category || undefined,
      isPublished: course.isPublished,
      downloadCount: course.downloadCount,
      createdAt: course.createdAt,
    }))
  },

  updateCourse: async (id: string, updates: Partial<Course>): Promise<Course | null> => {
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(updates.title && { title: updates.title }),
        ...(updates.description !== undefined && { description: updates.description }),
        ...(updates.price !== undefined && { price: updates.price }),
        ...(updates.fileUrl !== undefined && { fileUrl: updates.fileUrl }),
        ...(updates.fileName !== undefined && { fileName: updates.fileName }),
        ...(updates.fileSize !== undefined && { fileSize: updates.fileSize ? BigInt(updates.fileSize) : null }),
        ...(updates.category !== undefined && { category: updates.category }),
        ...(updates.isPublished !== undefined && { isPublished: updates.isPublished }),
      },
    })
    return {
      id: course.id,
      userId: course.userId,
      title: course.title,
      description: course.description || undefined,
      price: decimalToNumber(course.price),
      fileUrl: course.fileUrl || undefined,
      fileName: course.fileName || undefined,
      fileSize: course.fileSize ? Number(course.fileSize) : undefined,
      category: course.category || undefined,
      isPublished: course.isPublished,
      downloadCount: course.downloadCount,
      createdAt: course.createdAt,
    }
  },

  // Payments
  createPayment: async (paymentData: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> => {
    const payment = await prisma.payment.create({
      data: {
        userId: paymentData.userId,
        amount: paymentData.amount,
        paymentType: paymentData.paymentType,
        status: paymentData.status,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.transactionId,
        completedAt: paymentData.completedAt,
      },
    })
    return {
      id: payment.id,
      userId: payment.userId,
      amount: decimalToNumber(payment.amount),
      paymentType: payment.paymentType as 'subscription' | 'course' | 'room',
      status: payment.status as 'pending' | 'completed' | 'failed' | 'refunded',
      paymentMethod: payment.paymentMethod || undefined,
      transactionId: payment.transactionId || undefined,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt || undefined,
    }
  },

  getPayment: async (id: string): Promise<Payment | null> => {
    const payment = await prisma.payment.findUnique({
      where: { id },
    })
    if (!payment) return null
    return {
      id: payment.id,
      userId: payment.userId,
      amount: decimalToNumber(payment.amount),
      paymentType: payment.paymentType as 'subscription' | 'course' | 'room',
      status: payment.status as 'pending' | 'completed' | 'failed' | 'refunded',
      paymentMethod: payment.paymentMethod || undefined,
      transactionId: payment.transactionId || undefined,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt || undefined,
    }
  },

  getPaymentsByUserId: async (userId: string): Promise<Payment[]> => {
    const payments = await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return payments.map(payment => ({
      id: payment.id,
      userId: payment.userId,
      amount: decimalToNumber(payment.amount),
      paymentType: payment.paymentType as 'subscription' | 'course' | 'room',
      status: payment.status as 'pending' | 'completed' | 'failed' | 'refunded',
      paymentMethod: payment.paymentMethod || undefined,
      transactionId: payment.transactionId || undefined,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt || undefined,
    }))
  },

  getAllPayments: async (): Promise<Payment[]> => {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return payments.map(payment => ({
      id: payment.id,
      userId: payment.userId,
      amount: decimalToNumber(payment.amount),
      paymentType: payment.paymentType as 'subscription' | 'course' | 'room',
      status: payment.status as 'pending' | 'completed' | 'failed' | 'refunded',
      paymentMethod: payment.paymentMethod || undefined,
      transactionId: payment.transactionId || undefined,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt || undefined,
    }))
  },

  updatePayment: async (id: string, updates: Partial<Payment>): Promise<Payment | null> => {
    const payment = await prisma.payment.update({
      where: { id },
      data: {
        ...(updates.amount !== undefined && { amount: updates.amount }),
        ...(updates.paymentType && { paymentType: updates.paymentType }),
        ...(updates.status && { status: updates.status }),
        ...(updates.paymentMethod !== undefined && { paymentMethod: updates.paymentMethod }),
        ...(updates.transactionId !== undefined && { transactionId: updates.transactionId }),
        ...(updates.completedAt !== undefined && { completedAt: updates.completedAt }),
      },
    })
    return {
      id: payment.id,
      userId: payment.userId,
      amount: decimalToNumber(payment.amount),
      paymentType: payment.paymentType as 'subscription' | 'course' | 'room',
      status: payment.status as 'pending' | 'completed' | 'failed' | 'refunded',
      paymentMethod: payment.paymentMethod || undefined,
      transactionId: payment.transactionId || undefined,
      createdAt: payment.createdAt,
      completedAt: payment.completedAt || undefined,
    }
  },
}
