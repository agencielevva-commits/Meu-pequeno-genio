import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Esperança do Bem | Cada doação é um ato de fé',
  description: 'Ajude o Projeto Esperança do Bem a levar alimento e esperança para crianças em situação de vulnerabilidade.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f5f5',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className="antialiased">
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');fbq('init', '1637241087343595');fbq('track', 'PageView');`}
    </Script>
    {children}{process.env.NODE_ENV === 'production' && <Analytics />}
    <noscript><img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1637241087343595&ev=PageView&noscript=1" alt="" /></noscript>
  </body></html>
}
