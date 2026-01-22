'use client'

import { useState, useRef, useEffect } from 'react'
import { MediaDevice } from '@/hooks/useDevices'
import Tooltip from './Tooltip'

interface DeviceSelectorProps {
  devices: MediaDevice[]
  selectedDeviceId: string | null
  onSelect: (deviceId: string) => void
  label: string
  icon: React.ReactNode
}

export default function DeviceSelector({
  devices,
  selectedDeviceId,
  onSelect,
  label,
  icon,
}: DeviceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (devices.length <= 1) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Tooltip content={`Select ${label} (${devices.length} available)`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 sm:p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          {icon}
        </button>
      </Tooltip>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-64 sm:w-64 max-w-[calc(100vw-2rem)] bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
          <div className="p-2">
            <div className="text-xs text-gray-400 px-3 py-2 uppercase tracking-wide">
              {label}
            </div>
            {devices.map((device) => (
              <button
                key={device.deviceId}
                onClick={() => {
                  onSelect(device.deviceId)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  selectedDeviceId === device.deviceId
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {device.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
