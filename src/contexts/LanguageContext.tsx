'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'ro' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

export type { Language }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  ro: {
    // Hero
    'hero.title': 'MyRoom.world',
    'hero.subtitle': 'Your rooms for sales, education, growth, and communities.',
    'hero.cta': 'Create your Room. Build your Team. Reach your Goals.',
    'hero.cta.button': 'Start Your Room',
    
    // Room Types
    'rooms.sales.title': 'MyRoom Sales',
    'rooms.sales.subtitle': 'For: Sales teams, CallAPro networks, franchises (MyWheel, NutriOne, etc.)',
    'rooms.sales.feature1': 'Sales rooms (up to 200 participants)',
    'rooms.sales.feature2': 'Daily team meetings',
    'rooms.sales.feature3': 'New agent onboarding',
    'rooms.sales.feature4': 'Live sales training',
    'rooms.sales.feature5': 'Sales challenges (30 / 60 / 90 days)',
    'rooms.sales.feature6': 'Leaderboards & goal tracking',
    'rooms.sales.types': 'Sales Rooms · Team Rooms · Challenge Rooms',
    
    'rooms.edu.title': 'MyRoom Edu',
    'rooms.edu.subtitle': 'For: Teachers, trainers, mentors, private schools, informal education',
    'rooms.edu.feature1': '1-on-1 online tutoring',
    'rooms.edu.feature2': 'Live classes (10–50 participants)',
    'rooms.edu.feature3': 'Structured courses',
    'rooms.edu.feature4': 'Q&A sessions',
    'rooms.edu.feature5': 'Recordings & replays',
    'rooms.edu.types': 'Tutoring Rooms · Class Rooms · Masterclass Rooms',
    
    'rooms.growth.title': 'MyRoom Growth',
    'rooms.growth.subtitle': 'For: Coaching, personal development, leadership, productivity',
    'rooms.growth.feature1': 'Live coaching sessions',
    'rooms.growth.feature2': 'Habit-building challenges',
    'rooms.growth.feature3': 'Accountability groups',
    'rooms.growth.feature4': 'Personal & professional goals',
    'rooms.growth.types': 'Growth Rooms · Accountability Rooms',
    
    'rooms.health.title': 'MyRoom Health',
    'rooms.health.subtitle': 'For: Nutrition, movement, wellbeing, corporate health programs',
    'rooms.health.feature1': 'Health challenges',
    'rooms.health.feature2': 'Live sessions with specialists',
    'rooms.health.feature3': 'Nutrition programs',
    'rooms.health.feature4': 'Support groups',
    'rooms.health.types': 'Health Rooms · Wellness Rooms',
    
    'rooms.worksafe.title': 'MyRoom WorkSafe',
    'rooms.worksafe.subtitle': 'For: Companies, HR, construction, industry, services',
    'rooms.worksafe.feature1': 'Online H&S (SSM) training',
    'rooms.worksafe.feature2': 'Fire safety (PSI) instruction',
    'rooms.worksafe.feature3': 'Testing & assessments',
    'rooms.worksafe.feature4': 'Mandatory periodic training sessions',
    'rooms.worksafe.feature5': 'Attendance & compliance tracking',
    'rooms.worksafe.types': 'SSM Rooms · PSI Rooms · Compliance Rooms',
    
    'rooms.community.title': 'MyRoom Community',
    'rooms.community.subtitle': 'For: Thematic communities, NGOs, churches, online events',
    'rooms.community.feature1': 'Community meetings',
    'rooms.community.feature2': 'Live events',
    'rooms.community.feature3': 'Online conferences',
    'rooms.community.feature4': 'Networking sessions',
    'rooms.community.types': 'Community Rooms · Event Rooms',
    
    'rooms.pro.title': 'MyRoom Pro',
    'rooms.pro.subtitle': 'For: Corporations, large networks, enterprise partners',
    'rooms.pro.feature1': 'Private rooms',
    'rooms.pro.feature2': 'Custom branding',
    'rooms.pro.feature3': 'User management',
    'rooms.pro.feature4': 'Reports & analytics',
    'rooms.pro.feature5': 'External platform integrations',
    'rooms.pro.types': 'Enterprise Rooms',
    
    // Categories
    'categories.title': 'Main Categories',
    'categories.sales': 'Sales Teams',
    'categories.edu': 'Online Education',
    'categories.growth': 'Personal Growth',
    'categories.health': 'Health & Wellness',
    'categories.worksafe': 'Work Safety (SSM & PSI)',
    'categories.community': 'Communities',
    
    // Video room
    'videoroom.brand': 'MyRoom.world',
    'videoroom.title': 'Video Room',
    'videoroom.subtitle': 'Join your room to start the session',
    'videoroom.join': 'Join Room',
    'videoroom.joining': 'Joining...',
    'videoroom.joined': 'You joined the room!',
    'videoroom.left': 'You left the room',
    'videoroom.room': 'Room:',
    'videoroom.leave': 'Leave',
    'videoroom.leaveTooltip': 'Leave room (Esc)',
  },
  en: {
    // Hero
    'hero.title': 'MyRoom.world',
    'hero.subtitle': 'Your rooms for sales, education, growth, and communities.',
    'hero.cta': 'Create your Room. Build your Team. Reach your Goals.',
    'hero.cta.button': 'Start Your Room',
    
    // Room Types
    'rooms.sales.title': 'MyRoom Sales',
    'rooms.sales.subtitle': 'For: Sales teams, CallAPro networks, franchises (MyWheel, NutriOne, etc.)',
    'rooms.sales.feature1': 'Sales rooms (up to 200 participants)',
    'rooms.sales.feature2': 'Daily team meetings',
    'rooms.sales.feature3': 'New agent onboarding',
    'rooms.sales.feature4': 'Live sales training',
    'rooms.sales.feature5': 'Sales challenges (30 / 60 / 90 days)',
    'rooms.sales.feature6': 'Leaderboards & goal tracking',
    'rooms.sales.types': 'Sales Rooms · Team Rooms · Challenge Rooms',
    
    'rooms.edu.title': 'MyRoom Edu',
    'rooms.edu.subtitle': 'For: Teachers, trainers, mentors, private schools, informal education',
    'rooms.edu.feature1': '1-on-1 online tutoring',
    'rooms.edu.feature2': 'Live classes (10–50 participants)',
    'rooms.edu.feature3': 'Structured courses',
    'rooms.edu.feature4': 'Q&A sessions',
    'rooms.edu.feature5': 'Recordings & replays',
    'rooms.edu.types': 'Tutoring Rooms · Class Rooms · Masterclass Rooms',
    
    'rooms.growth.title': 'MyRoom Growth',
    'rooms.growth.subtitle': 'For: Coaching, personal development, leadership, productivity',
    'rooms.growth.feature1': 'Live coaching sessions',
    'rooms.growth.feature2': 'Habit-building challenges',
    'rooms.growth.feature3': 'Accountability groups',
    'rooms.growth.feature4': 'Personal & professional goals',
    'rooms.growth.types': 'Growth Rooms · Accountability Rooms',
    
    'rooms.health.title': 'MyRoom Health',
    'rooms.health.subtitle': 'For: Nutrition, movement, wellbeing, corporate health programs',
    'rooms.health.feature1': 'Health challenges',
    'rooms.health.feature2': 'Live sessions with specialists',
    'rooms.health.feature3': 'Nutrition programs',
    'rooms.health.feature4': 'Support groups',
    'rooms.health.types': 'Health Rooms · Wellness Rooms',
    
    'rooms.worksafe.title': 'MyRoom WorkSafe',
    'rooms.worksafe.subtitle': 'For: Companies, HR, construction, industry, services',
    'rooms.worksafe.feature1': 'Online H&S (SSM) training',
    'rooms.worksafe.feature2': 'Fire safety (PSI) instruction',
    'rooms.worksafe.feature3': 'Testing & assessments',
    'rooms.worksafe.feature4': 'Mandatory periodic training sessions',
    'rooms.worksafe.feature5': 'Attendance & compliance tracking',
    'rooms.worksafe.types': 'SSM Rooms · PSI Rooms · Compliance Rooms',
    
    'rooms.community.title': 'MyRoom Community',
    'rooms.community.subtitle': 'For: Thematic communities, NGOs, churches, online events',
    'rooms.community.feature1': 'Community meetings',
    'rooms.community.feature2': 'Live events',
    'rooms.community.feature3': 'Online conferences',
    'rooms.community.feature4': 'Networking sessions',
    'rooms.community.types': 'Community Rooms · Event Rooms',
    
    'rooms.pro.title': 'MyRoom Pro',
    'rooms.pro.subtitle': 'For: Corporations, large networks, enterprise partners',
    'rooms.pro.feature1': 'Private rooms',
    'rooms.pro.feature2': 'Custom branding',
    'rooms.pro.feature3': 'User management',
    'rooms.pro.feature4': 'Reports & analytics',
    'rooms.pro.feature5': 'External platform integrations',
    'rooms.pro.types': 'Enterprise Rooms',
    
    // Categories
    'categories.title': 'Main Categories',
    'categories.sales': 'Sales Teams',
    'categories.edu': 'Online Education',
    'categories.growth': 'Personal Growth',
    'categories.health': 'Health & Wellness',
    'categories.worksafe': 'Work Safety (SSM & PSI)',
    'categories.community': 'Communities',
    
    // Video room
    'videoroom.brand': 'MyRoom.world',
    'videoroom.title': 'Video Room',
    'videoroom.subtitle': 'Join your room to start the session',
    'videoroom.join': 'Join Room',
    'videoroom.joining': 'Joining...',
    'videoroom.joined': 'You joined the room!',
    'videoroom.left': 'You left the room',
    'videoroom.room': 'Room:',
    'videoroom.leave': 'Leave',
    'videoroom.leaveTooltip': 'Leave room (Esc)',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ro')

  useEffect(() => {
    // Load language from localStorage or default to Romanian
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'ro' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ro] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
