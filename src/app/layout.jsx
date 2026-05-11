import Script from 'next/script'
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GameProvider } from '@/context/GameContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/components/layout/Navbar'
import BottomNav from '@/components/layout/BottomNav'
import Footer from '@/components/layout/Footer'
import './globals.css'

// Clash Display — local variable font
const clashDisplay = localFont({
  src: '../../public/ClashDisplay-Variable.woff2',
  variable: '--font-clash',
  display: 'optional',
  preload: true,
})

// Satoshi — local variable font
const satoshi = localFont({
  src: '../../public/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'optional',
  preload: true,
})

// JetBrains Mono — XP numbers, stats
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

// Root metadata (individual pages override title via template)
export const metadata = {
  title: {
    default:  'Pass the UK Test — Free Life in the UK Test Practice 2026',
    template: '%s — Pass the UK Test',
  },
  description: 'Practice for your Life in the UK citizenship test with 500+ free questions, adaptive learning, and gamified revision. Pass first time.',
  keywords: ['life in the uk test', 'british citizenship test', 'life in the uk practice', 'uk citizenship test 2026', 'ilr test practice'],
  authors: [{ name: 'Pass the UK Test' }],
  creator: 'Pass the UK Test',
  metadataBase: new URL('https://passtheuktest.co.uk'),
  openGraph: {
    type:        'website',
    siteName:    'Pass the UK Test',
    title:       'Pass the UK Test — Free Life in the UK Test Practice 2026',
    description: 'Practice for your Life in the UK citizenship test. Free, adaptive, gamified.',
    url:         'https://passtheuktest.co.uk',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Pass the UK Test — Life in the UK Test Practice' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Pass the UK Test — Free Life in the UK Test Practice',
    description: 'Practice for your citizenship test. 500+ questions, adaptive learning, gamified.',
    images:      ['/og-image.png'],
  },
  robots: {
    index:        true,
    follow:       true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    // Add Google Search Console verification token after launch:
    // google: 'YOUR_VERIFICATION_TOKEN',
  },
}

// Inline script that runs synchronously before hydration to set the theme class,
// preventing a flash of wrong theme and the forced repaint that delays LCP.
const themeInitScript = `(function(){try{var t=localStorage.getItem('passtheuktest_theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add(t);}catch(e){}})();`

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Theme init: runs before hydration to prevent repaint that delays LCP */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XN3L6SC1QL" strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XN3L6SC1QL');
      `}</Script>
      <body className="font-body antialiased bg-surface text-ink" suppressHydrationWarning>
        <ThemeProvider>
        <GameProvider>
          {/* Skip to main content — accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                       focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
          >
            Skip to main content
          </a>

          <Navbar />

          <main
            id="main-content"
            className="min-h-dvh pb-nav md:pb-0 md:pt-16"
          >
            {children}
          </main>

          <Footer />
          <BottomNav />
        </GameProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
