'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const generateRoomId = (): string => {
  // Generate a random 8-character room ID
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function useRoomId() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [roomId, setRoomId] = useState<string | null>(null)

  useEffect(() => {
    const roomIdParam = searchParams.get('room')
    
    if (roomIdParam) {
      setRoomId(roomIdParam)
    } else {
      // Generate a new room ID if none exists
      const newRoomId = generateRoomId()
      setRoomId(newRoomId)
      // Update URL without page reload
      const url = new URL(window.location.href)
      url.searchParams.set('room', newRoomId)
      router.replace(url.pathname + url.search, { scroll: false })
    }
  }, [searchParams, router])

  const getShareLink = (): string => {
    if (typeof window === 'undefined' || !roomId) return ''
    return `${window.location.origin}${window.location.pathname}?room=${roomId}`
  }

  return {
    roomId,
    shareLink: getShareLink(),
  }
}
