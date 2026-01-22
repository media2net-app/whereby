import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export const metadata: Metadata = {
  title: 'RoProfit - Transformă-ți timpul în venit pasiv',
  description: 'Platformă educațională inovatoare pentru tineri și profesioniști ambițioși. Consultații video gratuite, mentorat personalizat și sistem automatizat de gestionare financiară.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>
        <LanguageProvider>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
