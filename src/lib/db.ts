// Database client - using a simple in-memory store for now
// In production, replace with Supabase, PostgreSQL, or your preferred database

export interface User {
  id: string
  email: string
  name: string
  passwordHash?: string // Internal only, not returned in API
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

// In-memory storage (replace with real database in production)
const storage = {
  users: new Map<string, User>(),
  rooms: new Map<string, Room>(),
  courses: new Map<string, Course>(),
  payments: new Map<string, Payment>(),
}

// Helper functions
export const db = {
  // Users
  createUser: async (userData: Omit<User, 'id' | 'createdAt'> & { passwordHash: string }): Promise<User> => {
    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...userData,
      createdAt: new Date(),
    }
    storage.users.set(user.id, user)
    return user
  },

  getUser: async (id: string): Promise<User | null> => {
    return storage.users.get(id) || null
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    const users = Array.from(storage.users.values())
    for (const user of users) {
      if (user.email === email) {
        // Don't return passwordHash
        const { passwordHash, ...userWithoutPassword } = user
        return userWithoutPassword as User
      }
    }
    return null
  },

  getUserWithPassword: async (email: string): Promise<User | null> => {
    const users = Array.from(storage.users.values())
    for (const user of users) {
      if (user.email === email) return user
    }
    return null
  },

  getAllUsers: async (): Promise<User[]> => {
    return Array.from(storage.users.values())
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User | null> => {
    const user = storage.users.get(id)
    if (!user) return null
    const updated = { ...user, ...updates }
    storage.users.set(id, updated)
    return updated
  },

  // Rooms
  createRoom: async (roomData: Omit<Room, 'id' | 'createdAt'>): Promise<Room> => {
    const room: Room = {
      id: `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...roomData,
      createdAt: new Date(),
    }
    storage.rooms.set(room.id, room)
    return room
  },

  getRoom: async (id: string): Promise<Room | null> => {
    return storage.rooms.get(id) || null
  },

  getRoomBySlug: async (slug: string): Promise<Room | null> => {
    const rooms = Array.from(storage.rooms.values())
    for (const room of rooms) {
      if (room.slug === slug) return room
    }
    return null
  },

  getRoomsByUserId: async (userId: string): Promise<Room[]> => {
    return Array.from(storage.rooms.values()).filter(r => r.userId === userId)
  },

  getAllRooms: async (): Promise<Room[]> => {
    return Array.from(storage.rooms.values())
  },

  // Courses
  createCourse: async (courseData: Omit<Course, 'id' | 'createdAt' | 'downloadCount'>): Promise<Course> => {
    const course: Course = {
      id: `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      downloadCount: 0,
      ...courseData,
      createdAt: new Date(),
    }
    storage.courses.set(course.id, course)
    return course
  },

  getCourse: async (id: string): Promise<Course | null> => {
    return storage.courses.get(id) || null
  },

  getPublishedCourses: async (): Promise<Course[]> => {
    return Array.from(storage.courses.values()).filter(c => c.isPublished)
  },

  getAllCourses: async (): Promise<Course[]> => {
    return Array.from(storage.courses.values())
  },

  updateCourse: async (id: string, updates: Partial<Course>): Promise<Course | null> => {
    const course = storage.courses.get(id)
    if (!course) return null
    const updated = { ...course, ...updates }
    storage.courses.set(id, updated)
    return updated
  },

  // Payments
  createPayment: async (paymentData: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> => {
    const payment: Payment = {
      id: `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...paymentData,
      createdAt: new Date(),
    }
    storage.payments.set(payment.id, payment)
    return payment
  },

  getPayment: async (id: string): Promise<Payment | null> => {
    return storage.payments.get(id) || null
  },

  getPaymentsByUserId: async (userId: string): Promise<Payment[]> => {
    return Array.from(storage.payments.values()).filter(p => p.userId === userId)
  },

  getAllPayments: async (): Promise<Payment[]> => {
    return Array.from(storage.payments.values())
  },

  updatePayment: async (id: string, updates: Partial<Payment>): Promise<Payment | null> => {
    const payment = storage.payments.get(id)
    if (!payment) return null
    const updated = { ...payment, ...updates }
    storage.payments.set(id, updated)
    return updated
  },
}
