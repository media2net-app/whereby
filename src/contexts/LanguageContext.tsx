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
    'hero.title': 'Transformă-ți timpul în',
    'hero.titleHighlight': 'venit pasiv',
    'hero.subtitle': 'Platformă educațională inovatoare pentru tineri și profesioniști ambițioși. Construiește-ți succesul financiar cu suport personalizat și mentorat dedicat.',
    'hero.cta.primary': 'Start Gratis Consultatie',
    'hero.cta.secondary': 'Descoperă Platforma',
    'hero.trust.guarantee': 'Garanție satisfacție',
    'hero.trust.mentoring': 'Mentorat personalizat',
    'hero.trust.price': 'Doar $9.95/lună',
    
    // Features
    'features.title': 'De ce RoProfit?',
    'features.subtitle': 'Oferim tot ce ai nevoie pentru a-ți construi succesul financiar într-un singur loc',
    'features.video.title': 'Consultatie Video Gratuita',
    'features.video.description': 'Discută direct cu un mentor dedicat prin video call. Obține răspunsuri personalizate și planuri de acțiune concrete.',
    'features.platform.title': 'Platformă Educațională',
    'features.platform.description': 'Accesează materiale didactice premium, training-uri și resurse pentru a-ți construi succesul financiar pas cu pas.',
    'features.mentoring.title': 'Mentorat Personalizat',
    'features.mentoring.description': 'Ai un mentor dedicat care te ghidează pas cu pas, oferind suport continuu și strategii adaptate nevoilor tale.',
    'features.automated.title': 'Sistem Automatizat',
    'features.automated.description': 'Sistem inteligent care ține evidența veniturilor și cheltuielilor, economisind timp și oferind claritate financiară.',
    'features.passive.title': 'Venituri Pasive',
    'features.passive.description': 'Învață cum să construiești surse de venit pasive care funcționează pentru tine, fără să fii legat de un loc de muncă tradițional.',
    'features.growth.title': 'Creștere Garantată',
    'features.growth.description': 'Metode dovedite care au ajutat mii de oameni să-și construiască succesul financiar și independența economică.',
    
    // Testimonials
    'testimonials.title': 'Oameni care au reușit',
    'testimonials.subtitle': 'De la care învățăm și care ne inspiră',
    'testimonials.mentors.title': 'Mentorii noștri',
    'testimonials.mentors.subtitle': 'Oameni de succes de la care învățăm',
    
    // Pricing
    'pricing.title': 'Investește în tine',
    'pricing.subtitle': 'Costuri reduse la minim: Platforma educațională este fără concurență, având un preț accesibil',
    'pricing.special': 'Preț Special',
    'pricing.month': '/lună',
    'pricing.description': 'Cu doar $9.95 pe lună, poți deveni proprietar de sistem',
    'pricing.feature1': 'Acces complet la platformă educațională',
    'pricing.feature2': 'Consultații video gratuite cu mentori',
    'pricing.feature3': 'Sistem automatizat de gestionare financiară',
    'pricing.feature4': 'Mentorat personalizat continuu',
    'pricing.feature5': 'Materiale didactice premium',
    'pricing.feature6': 'Suport tehnic dedicat',
    'pricing.feature7': 'Comunitate de membri activi',
    'pricing.feature8': 'Actualizări constante cu noi resurse',
    'pricing.cta': 'Începe Acum - Start Gratis Consultatie',
    'pricing.disclaimer': 'Fără costuri ascunse • Anulare oricând • Garanție satisfacție',
    
    // Pre-call form
    'precall.title': 'Începe Consultația Ta',
    'precall.subtitle': 'Completează formularul pentru a începe consultația video gratuită',
    'precall.name': 'Nume complet *',
    'precall.namePlaceholder': 'Introdu numele tău',
    'precall.email': 'Email *',
    'precall.emailPlaceholder': 'email@exemplu.com',
    'precall.age': 'Vârsta *',
    'precall.ageSelect': 'Selectează vârsta',
    'precall.goal': 'Ce vrei să obții? *',
    'precall.goalSelect': 'Selectează obiectivul',
    'precall.goal1': 'Venituri pasive',
    'precall.goal2': 'Construire rețea',
    'precall.goal3': 'Creștere afacere',
    'precall.goal4': 'Libertate financiară',
    'precall.submit': 'Start Consultație Video',
    'precall.submitting': 'Se procesează...',
    
    // Post-call form
    'postcall.title': 'Mulțumim pentru consultație!',
    'postcall.subtitle': 'Ne-ar plăcea să știm cum a fost experiența ta',
    'postcall.rating': 'Cum ai evalua consultația? *',
    'postcall.feedback': 'Feedback (opțional)',
    'postcall.feedbackPlaceholder': 'Spune-ne ce ți-a plăcut sau ce am putea îmbunătăți...',
    'postcall.submit': 'Trimite Feedback',
    'postcall.submitting': 'Se trimite...',
    'postcall.back': 'Înapoi la Homepage',
    
    // Video room
    'videoroom.brand': 'RoProfit',
    'videoroom.title': 'Consultație Video',
    'videoroom.subtitle': 'Pregătește-te pentru consultația ta gratuită cu mentorul dedicat',
    'videoroom.join': 'Intră în Consultație',
    'videoroom.joining': 'Se conectează...',
    'videoroom.joined': 'Ai intrat în consultație!',
    'videoroom.left': 'Ai părăsit consultația',
    'videoroom.room': 'Consultație:',
    'videoroom.leave': 'Părăsește',
    'videoroom.leaveTooltip': 'Părăsește consultația (Esc)',
  },
  en: {
    // Hero
    'hero.title': 'Transform your time into',
    'hero.titleHighlight': 'passive income',
    'hero.subtitle': 'Innovative educational platform for ambitious young people and professionals. Build your financial success with personalized support and dedicated mentoring.',
    'hero.cta.primary': 'Start Free Consultation',
    'hero.cta.secondary': 'Discover Platform',
    'hero.trust.guarantee': 'Satisfaction guarantee',
    'hero.trust.mentoring': 'Personalized mentoring',
    'hero.trust.price': 'Only $9.95/month',
    
    // Features
    'features.title': 'Why RoProfit?',
    'features.subtitle': 'We offer everything you need to build your financial success in one place',
    'features.video.title': 'Free Video Consultation',
    'features.video.description': 'Talk directly with a dedicated mentor via video call. Get personalized answers and concrete action plans.',
    'features.platform.title': 'Educational Platform',
    'features.platform.description': 'Access premium educational materials, training and resources to build your financial success step by step.',
    'features.mentoring.title': 'Personalized Mentoring',
    'features.mentoring.description': 'You have a dedicated mentor who guides you step by step, providing continuous support and strategies adapted to your needs.',
    'features.automated.title': 'Automated System',
    'features.automated.description': 'Smart system that tracks income and expenses, saving time and providing financial clarity.',
    'features.passive.title': 'Passive Income',
    'features.passive.description': 'Learn how to build passive income sources that work for you, without being tied to a traditional job.',
    'features.growth.title': 'Guaranteed Growth',
    'features.growth.description': 'Proven methods that have helped thousands of people build their financial success and economic independence.',
    
    // Testimonials
    'testimonials.title': 'People who succeeded',
    'testimonials.subtitle': 'From whom we learn and who inspire us',
    'testimonials.mentors.title': 'Our Mentors',
    'testimonials.mentors.subtitle': 'Successful people from whom we learn',
    
    // Pricing
    'pricing.title': 'Invest in yourself',
    'pricing.subtitle': 'Costs reduced to a minimum: The educational platform is unmatched, with an affordable price',
    'pricing.special': 'Special Price',
    'pricing.month': '/month',
    'pricing.description': 'For just $9.95 per month, you can become a system owner',
    'pricing.feature1': 'Full access to educational platform',
    'pricing.feature2': 'Free video consultations with mentors',
    'pricing.feature3': 'Automated financial management system',
    'pricing.feature4': 'Continuous personalized mentoring',
    'pricing.feature5': 'Premium educational materials',
    'pricing.feature6': 'Dedicated technical support',
    'pricing.feature7': 'Active member community',
    'pricing.feature8': 'Constant updates with new resources',
    'pricing.cta': 'Start Now - Start Free Consultation',
    'pricing.disclaimer': 'No hidden costs • Cancel anytime • Satisfaction guarantee',
    
    // Pre-call form
    'precall.title': 'Start Your Consultation',
    'precall.subtitle': 'Fill out the form to start your free video consultation',
    'precall.name': 'Full name *',
    'precall.namePlaceholder': 'Enter your name',
    'precall.email': 'Email *',
    'precall.emailPlaceholder': 'email@example.com',
    'precall.age': 'Age *',
    'precall.ageSelect': 'Select age',
    'precall.goal': 'What do you want to achieve? *',
    'precall.goalSelect': 'Select goal',
    'precall.goal1': 'Passive income',
    'precall.goal2': 'Network building',
    'precall.goal3': 'Business growth',
    'precall.goal4': 'Financial freedom',
    'precall.submit': 'Start Video Consultation',
    'precall.submitting': 'Processing...',
    
    // Post-call form
    'postcall.title': 'Thank you for the consultation!',
    'postcall.subtitle': 'We would love to know how your experience was',
    'postcall.rating': 'How would you rate the consultation? *',
    'postcall.feedback': 'Feedback (optional)',
    'postcall.feedbackPlaceholder': 'Tell us what you liked or what we could improve...',
    'postcall.submit': 'Submit Feedback',
    'postcall.submitting': 'Submitting...',
    'postcall.back': 'Back to Homepage',
    
    // Video room
    'videoroom.brand': 'RoProfit',
    'videoroom.title': 'Video Consultation',
    'videoroom.subtitle': 'Prepare for your free consultation with your dedicated mentor',
    'videoroom.join': 'Join Consultation',
    'videoroom.joining': 'Connecting...',
    'videoroom.joined': 'You joined the consultation!',
    'videoroom.left': 'You left the consultation',
    'videoroom.room': 'Consultation:',
    'videoroom.leave': 'Leave',
    'videoroom.leaveTooltip': 'Leave consultation (Esc)',
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
