import { useState, useEffect, useRef } from 'react'

export function useAudioLevel(stream: MediaStream | null) {
  const [audioLevel, setAudioLevel] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!stream) {
      setAudioLevel(0)
      setIsSpeaking(false)
      return
    }

    const audioTrack = stream.getAudioTracks()[0]
    if (!audioTrack || !audioTrack.enabled) {
      setAudioLevel(0)
      setIsSpeaking(false)
      return
    }

    // Create AudioContext
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const microphone = audioContext.createMediaStreamSource(stream)

    analyser.fftSize = 256
    analyser.smoothingTimeConstant = 0.8
    microphone.connect(analyser)

    audioContextRef.current = audioContext
    analyserRef.current = analyser

    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    const updateAudioLevel = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)

      // Calculate average volume
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length
      const normalizedLevel = Math.min(average / 128, 1) // Normalize to 0-1
      
      setAudioLevel(normalizedLevel)
      setIsSpeaking(normalizedLevel > 0.1) // Threshold for "speaking"

      animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
    }

    updateAudioLevel()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      analyserRef.current = null
      audioContextRef.current = null
    }
  }, [stream])

  return { audioLevel, isSpeaking }
}
