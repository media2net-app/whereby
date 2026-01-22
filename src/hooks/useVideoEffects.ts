'use client'

import { useState } from 'react'

export type BackgroundType = 'none' | 'blur' | 'image'
export type VideoFilter = 'none' | 'grayscale' | 'sepia' | 'vintage' | 'cool' | 'warm' | 'bright'

export interface VideoEffects {
  background: BackgroundType
  backgroundImage?: string
  filter: VideoFilter
}

export function useVideoEffects() {
  const [effects, setEffects] = useState<VideoEffects>({
    background: 'none',
    filter: 'none',
  })

  const setBackground = (type: BackgroundType, image?: string) => {
    setEffects((prev) => ({
      ...prev,
      background: type,
      backgroundImage: type === 'image' ? image : undefined,
    }))
  }

  const setFilter = (filter: VideoFilter) => {
    setEffects((prev) => ({
      ...prev,
      filter,
    }))
  }

  const resetEffects = () => {
    setEffects({
      background: 'none',
      filter: 'none',
    })
  }

  return {
    effects,
    setBackground,
    setFilter,
    resetEffects,
  }
}
