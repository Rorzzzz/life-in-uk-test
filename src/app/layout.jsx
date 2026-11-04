import Script from 'next/script'
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
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
  description: 'Practice for your Life in the UK citizenship test with 767 free questions, adaptive learning, and gamified revision. Pass first time.',
  authors: [{ name: 'Pass the UK Test' }],
  creator: 'Pass the UK Test',
  metadataBase: new URL('https://passtheuktest.co.uk'),
  openGraph: {
    type:        'website',
    siteName:    'Pass the UK Test',
    title:       'Pass the UK Test — Free Life in the UK Test Practice 2026',
    description: 'Practice for your Life in the UK citizenship test. Free, adaptive, gamified.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Pass the UK Test — Life in the UK Test Practice' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Pass the UK Test — Free Life in the UK Test Practice',
    description: 'Practice for your citizenship test. 767 questions, adaptive learning, gamified.',
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
    other: {
      'msvalidate.01': 'c6137c47675f4c49a6db8183a507268d', // Bing Webmaster Tools
    },
  },
}

// Runs before hydration: sets theme class, initialises Google Consent Mode v2,
// and signals Google Funding Choices is present.
// Consent: denied by default in the UK/EEA/Switzerland (opt-in law), where
// Funding Choices (the Google-certified CMP) is the ONLY source of consent.
// Elsewhere (opt-out regimes) the default is granted. The legacy custom banner
// and its 'ptukt_consent' flag were removed 2026-11-04: the flag could override
// a "Do not consent" given in Funding Choices (ICO/PECR + Google consent policy).
const headInitScript = `(function(){
  try{var t=localStorage.getItem('passtheuktest_theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);document.documentElement.classList.add(t);}catch(e){}
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);}
  window.gtag=gtag;
  gtag('consent','default',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
  gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:2000,region:['GB','CH','AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO']});
  try{localStorage.removeItem('ptukt_consent');}catch(e){}
  (function signalGfc(){if(!window.frames['googlefcPresent']){if(document.body){var i=document.createElement('iframe');i.style.cssText='width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;display:none';i.name='googlefcPresent';document.body.appendChild(i);}else{setTimeout(signalGfc,0);}}})();
})();`

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Theme + Consent Mode v2 init — must run before any ad/analytics scripts */}
        <script dangerouslySetInnerHTML={{ __html: headInitScript }} />
        {/* AdSense — inline in <head> so it appears in static HTML for crawler verification */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9877949460965281" crossOrigin="anonymous" />
        {/* Google Funding Choices — IAB TCF 2.2 certified CMP for EEA/UK consent */}
        {/* Configure the message at: AdSense → Privacy & messaging → GDPR */}
        <script async src="https://fundingchoicesmessages.google.com/i/pub-9877949460965281/prompt.js" />
      </head>

      {/* Google Analytics 4 */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-XN3L6SC1QL" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
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
      </body>
    </html>
  )
}
