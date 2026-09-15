'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface MetaPixelWindow extends Window {
  fbq?: (...args: unknown[]) => void
}

function trackPurchaseFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const order = params.get('pedido')?.trim()
  const rawValue = Number(params.get('valor'))
  const value = Number.isFinite(rawValue) ? Math.round((rawValue + Number.EPSILON) * 100) / 100 : 0

  if (!order || value <= 0) return

  const storageKey = `meta-pixel-purchase:${order}`
  if (window.sessionStorage.getItem(storageKey)) return

  const fbq = (window as MetaPixelWindow).fbq
  if (!fbq) return

  fbq('track', 'Purchase', { value, currency: 'BRL' })
  window.sessionStorage.setItem(storageKey, '1')
}

const logoImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2014%20de%20set.%20de%202026%2C%2022_56_29-RvUWngotSiiyqW9IjYE2RL60GGAyvj.png'

export default function ThankYouPage() {
  useEffect(() => {
    trackPurchaseFromUrl()
  }, [])

  return (
    <main className="thank-you-page">
      <header className="donation-header">
        <Link href="/" className="donation-logo" aria-label="Voltar para Esperança do Bem">
          <img src={logoImage} alt="Logo Esperança do Bem" />
        </Link>
      </header>

      <section className="thank-you-shell" aria-labelledby="thank-you-title">
        <div className="thank-you-card">
          <div className="thank-you-mark" aria-hidden="true">OK</div>
          <p className="eyebrow">DOAÇÃO CONFIRMADA</p>
          <h1 id="thank-you-title">Obrigado por fazer parte desta história.</h1>
          <p className="thank-you-lead">Sua contribuição ajuda a levar alimento, cuidado e esperança para crianças que precisam.</p>
          <div className="thank-you-details">
            <span>Instituto Esperança do Bem</span>
            <strong>Doação recebida com carinho</strong>
          </div>
          <p className="thank-you-note">Esta é uma simulação de confirmação para configurar sua conversão. Em uma doação real, a confirmação será atualizada após a identificação do pagamento.</p>
          <Link href="/doar" className="thank-you-button">FAZER OUTRA DOAÇÃO</Link>
          <Link href="/" className="thank-you-back">Conhecer o projeto</Link>
        </div>
      </section>

      <footer className="donation-footer"><span>❤</span><b>Esperança<br />do Bem</b></footer>
    </main>
  )
}

