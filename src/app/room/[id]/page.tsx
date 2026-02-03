'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import VideoRoom from '@/components/VideoRoom'

export default function RoomPage() {
  const params = useParams()
  const roomSlug = params.id as string
  const [roomData, setRoomData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (roomSlug) {
      fetch(`/api/rooms/${roomSlug}`)
        .then(res => res.json())
        .then(data => {
          setRoomData(data)
          setIsLoading(false)
        })
        .catch(err => {
          console.error('Error fetching room:', err)
          setIsLoading(false)
        })
    }
  }, [roomSlug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading room...</p>
        </div>
      </div>
    )
  }

  if (!roomData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room not found</h1>
          <p className="text-gray-400">The room you're looking for doesn't exist or is not active.</p>
        </div>
      </div>
    )
  }

  return <VideoRoom roomData={roomData} />
}
