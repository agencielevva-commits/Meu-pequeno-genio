'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const childImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%282%29-nnNryWlguuWMxDnT9LjoiCZ9ym3t5M.jpeg'
const careImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image560x340cropped-0qLBvivbxsW8PhsKz3PMFvAKzIYR85.jpg'
const communityImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%281%29-sEuMz1UvuKyq0VPmjI25WDsbnRbC2w.jpeg'
const heroVideo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alimentando%20Crian%C3%A7as%20em%20Mo%C3%A7ambique_%20Contribua%20para%20esta%20Obra%20Evangel%C3%ADstica%21%20_canal%20_boa%20_palavra-FUKOG676gp2gtuePYpafIjqllMEb2V.mp4'
const logoImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2014%20de%20set.%20de%202026%2C%2022_56_29-RvUWngotSiiyqW9IjYE2RL60GGAyvj.png'
const pixKey = 'pix@institutoesperancadobem.org'
const amounts = [30, 50, 70, 100, 150, 200, 500]

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function DonatePage() {
  const [selected, setSelected] = useState(50)
  const [custom, setCustom] = useState('')
  const [impact, setImpact] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [pixData, setPixData] = useState<{ copyPaste?: string; qrCodeBase64?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [externalId, setExternalId] = useState<string | null>(null)
  const router = useRouter()
  const chosenAmount = custom ? Number(custom.replace(',', '.')) || 0 : selected

  useEffect(() => {
    if (!externalId) return
    const timer = window.setInterval(async () => {
      const response = await fetch(`/api/status/${externalId}`, { cache: 'no-store' })
      if (response.ok && (await response.json()).status === 'PAID') router.push(`/obrigado?valor=${chosenAmount}&pedido=${externalId}`)
    }, 3000)
    return () => window.clearInterval(timer)
  }, [externalId, chosenAmount, router])

  const generatePix = async () => {
    const amount = chosenAmount + (impact ? 4.99 : 0)
    if (amount < 10 || amount > 1000) { setError('Escolha um valor entre R$ 10,00 e R$ 1.000,00.'); return }
    setLoading(true); setError('')
    try {
      const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount }) })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Não foi possível gerar o PIX.')
      setPixData(payload.pix || null)
      setExternalId(payload.externalId || null)
      setGenerated(true)
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Não foi possível gerar o PIX.') } finally { setLoading(false) }
  }

  const copyPix = async () => {
    await navigator.clipboard?.writeText(pixKey)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <main className="donation-page">
      <header className="donation-header">
        <Link href="/" className="donation-logo" aria-label="Voltar para Esperança do Bem">
          <img src={logoImage} alt="Logo Esperança do Bem" />
        </Link>
      </header>

      {!generated ? (
        <section className="donation-shell">
          <section className="donation-banner">
            <video className="donation-banner-video" autoPlay muted loop playsInline poster={childImage} aria-label="Vídeo sobre a alimentação de crianças em Moçambique">
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="donation-banner-content"><p className="eyebrow">UM GESTO QUE ALIMENTA</p><h1>Sua doação vira comida.</h1><p>É rápido e seguro. Qualquer valor ajuda a colocar uma refeição na mesa.</p><div className="hero-actions"><a href="#valores" className="hero-button hero-button-primary">DOAR AGORA</a><a href="#como-ajudar" className="hero-button hero-button-secondary">COMO AJUDAR</a></div></div>
          </section>
          <section className="donation-message"><div><p className="eyebrow">CADA VALOR CONTA</p><h2>Hoje, você pode ser a resposta.</h2><p>Uma refeição chega mais longe quando muitas pessoas decidem ajudar.</p></div><div className="donation-mini-gallery"><img src={careImage} alt="Criança recebendo cuidado" /><img src={communityImage} alt="Crianças reunidas em comunidade" /></div></section>

          <section className="support-strip" id="como-ajudar"><b>Você também pode ajudar</b><span>Compartilhe esta campanha com alguém que queira fazer parte.</span><a href="#valores">Escolher valor →</a></section>

          <div className="donation-card" id="valores">
            <h2>Escolha o valor da sua doação</h2>
            <p className="donation-intro">Hoje, você pode ser a resposta para uma criança.</p>
            <div className="amount-grid" aria-label="Valores de doação">
              {amounts.map((amount) => <button key={amount} className={selected === amount && !custom ? 'amount active' : 'amount'} onClick={() => { setSelected(amount); setCustom('') }}>{formatCurrency(amount)}</button>)}
            </div>
            <label className="other-label" htmlFor="custom-amount">Prefere escolher outro valor?</label>
            <div className="custom-box">
              <label htmlFor="custom-amount">Ajude com o valor que seu coração mandar</label>
              <input id="custom-amount" inputMode="decimal" placeholder="Digite outro valor (ex: 45)" value={custom} onChange={(event) => setCustom(event.target.value)} />
              <label className="impact-option"><input type="checkbox" checked={impact} onChange={(event) => setImpact(event.target.checked)} /><span><b>Multiplique o impacto</b><small>Por só R$ 4,99 a mais, você garante que uma criança não durma com fome.</small></span></label>
              <button className="primary-action" onClick={generatePix} disabled={!chosenAmount || loading}>{loading ? 'GERANDO PIX...' : 'GERAR PIX AGORA'}</button>
              {error && <p className="form-error" role="alert">{error}</p>}
              <small className="secure-note">Pagamento via OniPay · PIX seguro · Instantâneo</small>
            </div>
          </div>
        </section>
      ) : (
        <section className="pix-result donation-shell">
          <div className="success-card">
            <p className="success-title">PIX gerado com sucesso!</p>
            <h1>Valor: {formatCurrency(chosenAmount + (impact ? 4.99 : 0))}</h1>
            <div className="pix-code">{pixData?.copyPaste || 'O gateway não retornou o código copia e cola.'}</div>
            <button className="pix-copy" onClick={async () => { await navigator.clipboard?.writeText(pixData?.copyPaste || ''); setCopied(true); window.setTimeout(() => setCopied(false), 2200) }}>{copied ? 'PIX COPIADO' : 'CLIQUE PARA COPIAR PIX COPIA E COLA'}</button>
            <div className="pix-instructions"><b>1.</b> Toque em &quot;Copiar PIX Copia e Cola&quot;<br /><b>2.</b> No seu banco: PIX → Copia e Cola → Confirmar</div>
            <div className="bank-lines"><span>Recebedor:<b>Instituto Esperança</b></span><span>Banco:<b>ASS</b></span></div>
            <p className="qr-caption">Se preferir, utilize o QR Code abaixo.</p>
            {pixData?.qrCodeBase64 ? <img className="real-qr" src={`data:image/png;base64,${pixData.qrCodeBase64}`} alt="QR Code PIX para pagamento" /> : <div className="fake-qr" aria-label="QR Code não disponível" />}
            <Link className="paid-button" href="/obrigado">JÁ PAGUEI · VERIFICAR PAGAMENTO</Link>
          </div>
        </section>
      )}
      <footer className="donation-footer"><span>❤</span><b>Esperança<br />do Bem</b></footer>
    </main>
  )
}
