import { useState, useEffect } from 'react'

export interface MediaDevice {
  deviceId: string
  label: string
  kind: MediaDeviceKind
}

export function useDevices() {
  const [devices, setDevices] = useState<MediaDevice[]>([])
  const [cameras, setCameras] = useState<MediaDevice[]>([])
  const [microphones, setMicrophones] = useState<MediaDevice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshDevices = async () => {
    try {
      // Request permission first to get device labels
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      
      const deviceList = await navigator.mediaDevices.enumerateDevices()
      const deviceInfo: MediaDevice[] = deviceList.map(device => ({
        deviceId: device.deviceId,
        label: device.label || `${device.kind} ${device.deviceId.slice(0, 5)}`,
        kind: device.kind,
      }))

      setDevices(deviceInfo)
      setCameras(deviceInfo.filter(d => d.kind === 'videoinput'))
      setMicrophones(deviceInfo.filter(d => d.kind === 'audioinput'))
      setIsLoading(false)
    } catch (error) {
      console.error('Error enumerating devices:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshDevices()
    
    // Listen for device changes
    const handleDeviceChange = () => {
      refreshDevices()
    }
    
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
    
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
    }
  }, [])

  return {
    devices,
    cameras,
    microphones,
    isLoading,
    refreshDevices,
  }
}
