// Simple authentication utilities
// In production, use proper JWT tokens and secure password hashing

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'partner'
  isActive: boolean
}

// Simple password hashing (use bcrypt in production)
function hashPassword(password: string): string {
  // This is a placeholder - use proper bcrypt in production
  return btoa(password)
}

function verifyPassword(password: string, hash: string): boolean {
  return btoa(password) === hash
}

export const auth = {
  hashPassword,
  verifyPassword,
  
  // Generate a simple token (use JWT in production)
  generateToken: (userId: string): string => {
    return btoa(`${userId}:${Date.now()}`)
  },
  
  // Verify token
  verifyToken: (token: string): string | null => {
    try {
      const decoded = atob(token)
      const [userId] = decoded.split(':')
      return userId || null
    } catch {
      return null
    }
  },
}
