import { useState, useEffect, useRef } from 'react'

export function useMediaStream() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null)
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)

  // Auto-select default microphone when stream starts
  const setDefaultMicrophone = async (mediaStream: MediaStream) => {
    try {
      const audioTrack = mediaStream.getAudioTracks()[0]
      if (audioTrack && audioTrack.getSettings().deviceId) {
        const deviceId = audioTrack.getSettings().deviceId
        if (deviceId) {
          setSelectedMicrophoneId(deviceId)
        }
      }
    } catch (err) {
      console.error('Error getting default microphone:', err)
    }
  }

  // Auto-select default camera when stream starts
  const setDefaultCamera = async (mediaStream: MediaStream) => {
    try {
      const videoTrack = mediaStream.getVideoTracks()[0]
      if (videoTrack && videoTrack.getSettings().deviceId) {
        const deviceId = videoTrack.getSettings().deviceId
        if (deviceId) {
          setSelectedCameraId(deviceId)
        }
      }
    } catch (err) {
      console.error('Error getting default camera:', err)
    }
  }

  const startStream = async (cameraId?: string, microphoneId?: string) => {
    try {
      setError(null)
      const constraints: MediaStreamConstraints = {
        video: isVideoEnabled
          ? cameraId
            ? { deviceId: { exact: cameraId } }
            : true
          : false,
        audio: isAudioEnabled
          ? microphoneId
            ? { deviceId: { exact: microphoneId } }
            : true
          : false,
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = mediaStream
      setStream(mediaStream)
      
      // Auto-detect and set default devices
      if (isAudioEnabled && !microphoneId) {
        await setDefaultMicrophone(mediaStream)
      }
      if (isVideoEnabled && !cameraId) {
        await setDefaultCamera(mediaStream)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to access media devices'
      setError(errorMessage)
      console.error('Error accessing media devices:', err)
    }
  }

  const switchCamera = async (cameraId: string) => {
    if (!streamRef.current) return

    const videoTrack = streamRef.current.getVideoTracks()[0]
    if (videoTrack) {
      videoTrack.stop()
      streamRef.current.removeTrack(videoTrack)
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: cameraId } },
      })
      const newVideoTrack = newStream.getVideoTracks()[0]
      if (newVideoTrack && streamRef.current) {
        streamRef.current.addTrack(newVideoTrack)
        setSelectedCameraId(cameraId)
        setStream(new MediaStream(streamRef.current.getTracks()))
      }
    } catch (err) {
      console.error('Error switching camera:', err)
    }
  }

  const switchMicrophone = async (microphoneId: string) => {
    if (!streamRef.current) return

    const audioTrack = streamRef.current.getAudioTracks()[0]
    if (audioTrack) {
      audioTrack.stop()
      streamRef.current.removeTrack(audioTrack)
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: microphoneId } },
      })
      const newAudioTrack = newStream.getAudioTracks()[0]
      if (newAudioTrack && streamRef.current) {
        streamRef.current.addTrack(newAudioTrack)
        setSelectedMicrophoneId(microphoneId)
        setStream(new MediaStream(streamRef.current.getTracks()))
      }
    } catch (err) {
      console.error('Error switching microphone:', err)
    }
  }

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setStream(null)
    }
  }

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled
        setIsVideoEnabled(!isVideoEnabled)
      }
    }
  }

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled
        setIsAudioEnabled(!isAudioEnabled)
      }
    }
  }

  const startScreenShare = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })
      
      screenStreamRef.current = displayStream
      setScreenStream(displayStream)
      setIsScreenSharing(true)

      // Stop screen share when user clicks stop in browser UI
      displayStream.getVideoTracks()[0].addEventListener('ended', () => {
        stopScreenShare()
      })
    } catch (err) {
      console.error('Error starting screen share:', err)
      setError('Failed to start screen share')
    }
  }

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop())
      screenStreamRef.current = null
      setScreenStream(null)
      setIsScreenSharing(false)
    }
  }

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      stopScreenShare()
    } else {
      await startScreenShare()
    }
  }

  useEffect(() => {
    return () => {
      stopStream()
      stopScreenShare()
    }
  }, [])

  return {
    stream,
    screenStream,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    selectedCameraId,
    selectedMicrophoneId,
    error,
    startStream,
    stopStream,
    toggleVideo,
    toggleAudio,
    switchCamera,
    switchMicrophone,
    toggleScreenShare,
    setSelectedCameraId,
    setSelectedMicrophoneId,
  }
}
