import { Suspense } from 'react'
import VideoRoom from '@/components/VideoRoom'

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>}>
      <VideoRoom />
    </Suspense>
  )
}
