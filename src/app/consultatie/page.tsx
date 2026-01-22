'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PreCallForm from '@/components/PreCallForm'
import VideoRoom from '@/components/VideoRoom'

export default function ConsultatiePage() {
  const router = useRouter()
  const [showVideoRoom, setShowVideoRoom] = useState(false)
  const [userData, setUserData] = useState<{
    name: string
    email: string
    ageGroup: string
    goal: string
  } | null>(null)

  const handleFormSubmit = (data: { name: string; email: string; ageGroup: string; goal: string }) => {
    setUserData(data)
    setShowVideoRoom(true)
  }

  if (showVideoRoom && userData) {
    return <VideoRoom userData={userData} />
  }

  return <PreCallForm onSubmit={handleFormSubmit} />
}
