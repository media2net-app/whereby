'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface RoomType {
  id: string
  titleKey: string
  subtitleKey: string
  features: string[]
  typesKey: string
  gradient: string
  icon: JSX.Element
}

export default function RoomTypes() {
  const { t } = useLanguage()

  const roomTypes: RoomType[] = [
    {
      id: 'sales',
      titleKey: 'rooms.sales.title',
      subtitleKey: 'rooms.sales.subtitle',
      features: [
        'rooms.sales.feature1',
        'rooms.sales.feature2',
        'rooms.sales.feature3',
        'rooms.sales.feature4',
        'rooms.sales.feature5',
        'rooms.sales.feature6',
      ],
      typesKey: 'rooms.sales.types',
      gradient: 'from-red-500 to-pink-500',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: 'edu',
      titleKey: 'rooms.edu.title',
      subtitleKey: 'rooms.edu.subtitle',
      features: [
        'rooms.edu.feature1',
        'rooms.edu.feature2',
        'rooms.edu.feature3',
        'rooms.edu.feature4',
        'rooms.edu.feature5',
      ],
      typesKey: 'rooms.edu.types',
      gradient: 'from-blue-500 to-cyan-500',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'growth',
      titleKey: 'rooms.growth.title',
      subtitleKey: 'rooms.growth.subtitle',
      features: [
        'rooms.growth.feature1',
        'rooms.growth.feature2',
        'rooms.growth.feature3',
        'rooms.growth.feature4',
      ],
      typesKey: 'rooms.growth.types',
      gradient: 'from-green-500 to-emerald-500',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'health',
      titleKey: 'rooms.health.title',
      subtitleKey: 'rooms.health.subtitle',
      features: [
        'rooms.health.feature1',
        'rooms.health.feature2',
        'rooms.health.feature3',
        'rooms.health.feature4',
      ],
      typesKey: 'rooms.health.types',
      gradient: 'from-purple-500 to-pink-500',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'worksafe',
      titleKey: 'rooms.worksafe.title',
      subtitleKey: 'rooms.worksafe.subtitle',
      features: [
        'rooms.worksafe.feature1',
        'rooms.worksafe.feature2',
        'rooms.worksafe.feature3',
        'rooms.worksafe.feature4',
        'rooms.worksafe.feature5',
      ],
      typesKey: 'rooms.worksafe.types',
      gradient: 'from-orange-500 to-red-500',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'community',
      titleKey: 'rooms.community.title',
      subtitleKey: 'rooms.community.subtitle',
      features: [
        'rooms.community.feature1',
        'rooms.community.feature2',
        'rooms.community.feature3',
        'rooms.community.feature4',
      ],
      typesKey: 'rooms.community.types',
      gradient: 'from-indigo-500 to-purple-500',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'pro',
      titleKey: 'rooms.pro.title',
      subtitleKey: 'rooms.pro.subtitle',
      features: [
        'rooms.pro.feature1',
        'rooms.pro.feature2',
        'rooms.pro.feature3',
        'rooms.pro.feature4',
        'rooms.pro.feature5',
      ],
      typesKey: 'rooms.pro.types',
      gradient: 'from-yellow-500 to-orange-500',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="rooms" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('categories.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomTypes.map((room) => (
            <div
              key={room.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${room.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {room.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t(room.titleKey)}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {t(room.subtitleKey)}
              </p>

              <ul className="space-y-2 mb-6">
                {room.features.map((featureKey, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{t(featureKey)}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {t(room.typesKey)}
                </p>
              </div>

              {/* Hover effect gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${room.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
