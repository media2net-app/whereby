'use client'

import { useRef, useState } from 'react'
import { BackgroundType, VideoFilter } from '@/hooks/useVideoEffects'

interface VideoEffectsPanelProps {
  background: BackgroundType
  filter: VideoFilter
  onBackgroundChange: (type: BackgroundType, image?: string) => void
  onFilterChange: (filter: VideoFilter) => void
  isOpen: boolean
  onClose: () => void
}

const backgroundOptions: { value: BackgroundType; label: string; icon: string }[] = [
  { value: 'none', label: 'None', icon: '🚫' },
  { value: 'blur', label: 'Blur', icon: '🌫️' },
  { value: 'image', label: 'Image', icon: '🖼️' },
]

const filterOptions: { value: VideoFilter; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'grayscale', label: 'Grayscale' },
  { value: 'sepia', label: 'Sepia' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'cool', label: 'Cool' },
  { value: 'warm', label: 'Warm' },
  { value: 'bright', label: 'Bright' },
]

export default function VideoEffectsPanel({
  background,
  filter,
  onBackgroundChange,
  onFilterChange,
  isOpen,
  onClose,
}: VideoEffectsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [backgroundImage, setBackgroundImage] = useState<string>('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setBackgroundImage(imageUrl)
        onBackgroundChange('image', imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isOpen) return null

  return (
    <div className="absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-gray-800 border-l border-gray-700 flex flex-col z-40 shadow-2xl animate-slide-in">
      <div className="p-3 sm:p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-semibold">Video Effects</h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-700 transition-colors"
          title="Close effects"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Background Options */}
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2 sm:mb-3 uppercase">Background</h3>
          <div className="space-y-2">
            {backgroundOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  if (option.value === 'image') {
                    fileInputRef.current?.click()
                  } else {
                    onBackgroundChange(option.value)
                  }
                }}
                className={`w-full p-2 sm:p-3 rounded-lg transition-colors text-left flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
                  background === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <span className="text-xl sm:text-2xl">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {background === 'image' && backgroundImage && (
            <div className="mt-3">
              <img
                src={backgroundImage}
                alt="Background"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Filter Options */}
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-400 mb-2 sm:mb-3 uppercase">Filters</h3>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                className={`p-2 sm:p-3 rounded-lg transition-colors text-xs sm:text-sm ${
                  filter === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
