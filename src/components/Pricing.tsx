'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Pricing() {
  const { t } = useLanguage()
  
  const features = [
    'pricing.feature1',
    'pricing.feature2',
    'pricing.feature3',
    'pricing.feature4',
    'pricing.feature5',
    'pricing.feature6',
    'pricing.feature7',
    'pricing.feature8',
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
                  <span className="text-yellow-800 dark:text-yellow-200 font-semibold">
                    {t('pricing.special')}
                  </span>
                </div>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white">
                    $9.95
                  </span>
                  <span className="text-2xl text-gray-600 dark:text-gray-300">
                    {t('pricing.month')}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('pricing.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {features.map((featureKey, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{t(featureKey)}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/consultatie"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {t('pricing.cta')}
                </Link>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {t('pricing.disclaimer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
