'use client'

import { useState, useEffect } from 'react'

export interface User {
  id: string
  name: string
  isLocal: boolean
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Get user from localStorage or generate new one
    const storedUser = localStorage.getItem('videoCallUser')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        setUser(parsed)
      } catch {
        // Invalid stored data, create new user
        createNewUser()
      }
    } else {
      createNewUser()
    }
  }, [])

  const createNewUser = () => {
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `User ${Math.floor(Math.random() * 1000)}`,
      isLocal: true,
    }
    setUser(newUser)
    localStorage.setItem('videoCallUser', JSON.stringify(newUser))
  }

  const updateUserName = (name: string) => {
    if (!user) return
    const updatedUser = { ...user, name: name.trim() || user.name }
    setUser(updatedUser)
    localStorage.setItem('videoCallUser', JSON.stringify(updatedUser))
  }

  return {
    user,
    updateUserName,
  }
}
