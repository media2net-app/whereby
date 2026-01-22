'use client'

import { useEffect, useRef } from 'react'
import { useAudioLevel } from '@/hooks/useAudioLevel'
import { VideoEffects } from '@/hooks/useVideoEffects'

interface VideoPlayerProps {
  stream: MediaStream | null
  screenStream?: MediaStream | null
  isLocal?: boolean
  muted?: boolean
  effects?: VideoEffects
}

const getFilterStyle = (filter: string): string => {
  switch (filter) {
    case 'grayscale':
      return 'grayscale(100%)'
    case 'sepia':
      return 'sepia(100%)'
    case 'vintage':
      return 'sepia(50%) contrast(1.2) brightness(0.9)'
    case 'cool':
      return 'brightness(0.9) contrast(1.1) saturate(0.8) hue-rotate(180deg)'
    case 'warm':
      return 'brightness(1.1) contrast(1.1) saturate(1.2) hue-rotate(-10deg)'
    case 'bright':
      return 'brightness(1.3) contrast(1.2)'
    default:
      return 'none'
  }
}

export default function VideoPlayer({
  stream,
  screenStream,
  isLocal = false,
  muted = false,
  effects,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const displayStream = screenStream || stream
  const { audioLevel, isSpeaking } = useAudioLevel(stream)
  const backgroundImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (videoRef.current && displayStream) {
      videoRef.current.srcObject = displayStream
    }
  }, [displayStream])

  // Load background image
  useEffect(() => {
    if (effects?.background === 'image' && effects.backgroundImage) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = effects.backgroundImage
      img.onload = () => {
        backgroundImageRef.current = img
      }
    } else {
      backgroundImageRef.current = null
    }
  }, [effects?.background, effects?.backgroundImage])

  // Apply video effects with canvas
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !displayStream) return
    
    const hasBackgroundEffect = effects && effects.background !== 'none'
    const hasFilterEffect = effects && effects.filter !== 'none'
    const hasEffects = hasBackgroundEffect || hasFilterEffect
    
    if (!hasEffects) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const updateCanvas = () => {
      if (!video.videoWidth || !video.videoHeight) {
        animationFrameId = requestAnimationFrame(updateCanvas)
        return
      }

      // Set canvas size to match video
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background first (only if background effect is active)
      if (effects?.background === 'blur') {
        // Create blurred background by drawing video scaled and blurred
        ctx.save()
        ctx.filter = 'blur(30px)'
        ctx.globalAlpha = 0.8
        ctx.drawImage(video, -50, -50, canvas.width + 100, canvas.height + 100)
        ctx.restore()
      } else if (effects?.background === 'image' && backgroundImageRef.current) {
        // Draw background image
        const bgImg = backgroundImageRef.current
        const scale = Math.max(canvas.width / bgImg.width, canvas.height / bgImg.height)
        const x = (canvas.width - bgImg.width * scale) / 2
        const y = (canvas.height - bgImg.height * scale) / 2
        ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale)
      }

      // Apply filter and draw video
      ctx.save()
      if (effects?.filter && effects.filter !== 'none') {
        ctx.filter = getFilterStyle(effects.filter)
      }
      
      // Draw video on top
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      ctx.restore()

      animationFrameId = requestAnimationFrame(updateCanvas)
    }

    // Start when video is ready
    const handleLoadedMetadata = () => {
      updateCanvas()
    }

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    
    // Also try to start immediately if already loaded
    if (video.readyState >= 2) {
      updateCanvas()
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [displayStream, effects])

  const hasBackgroundEffect = effects && effects.background !== 'none'
  const hasFilterEffect = effects && effects.filter !== 'none'
  const hasEffects = hasBackgroundEffect || hasFilterEffect
  const showCanvas = hasEffects && !screenStream

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      {showCanvas ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={muted || isLocal}
            className="hidden"
          />
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted || isLocal}
          className="w-full h-full object-cover"
          style={{
            filter: effects?.filter && effects.filter !== 'none' ? getFilterStyle(effects.filter) : 'none',
          }}
        />
      )}
      
      {/* Screen share indicator */}
      {screenStream && (
        <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
          Sharing screen
        </div>
      )}

      {/* Audio level indicator */}
      {stream && isSpeaking && !screenStream && (
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => {
              const barHeight = audioLevel * 20 * (i + 1)
              return (
                <div
                  key={i}
                  className="w-1 bg-green-500 rounded-full transition-all duration-75"
                  style={{
                    height: `${Math.max(4, barHeight)}px`,
                    opacity: audioLevel > i * 0.2 ? 1 : 0.3,
                  }}
                />
              )
            })}
          </div>
          <span className="text-xs text-white font-medium ml-1">Speaking</span>
        </div>
      )}

      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-white text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <p className="text-sm">No video</p>
          </div>
        </div>
      )}
    </div>
  )
}
