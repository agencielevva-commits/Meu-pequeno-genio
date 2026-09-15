'use client'

import { useEffect, useState } from 'react'

const images = {
  child: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202026-09-14%20214854-ZkCilOKv0aDoNBjlbZO9y8lAKJUq40.png',
  prayer: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYMmSciIepgEEQPHJbqWg6VxStFsmF.png',
  hunger: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-R46rJCnr3fDNSLnxCHEQPPPjOukAuo.png',
  pix: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xKEiwTqbBGpmSTkS8cczf15OanH0xt.png',
  video: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202026-09-14%20214824-stGGvZi2GrcWD02nK6qP6BgS6BynQ3.png',
  banner: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%282%29-nnNryWlguuWMxDnT9LjoiCZ9ym3t5M.jpeg',
  childClose: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image560x340cropped-0qLBvivbxsW8PhsKz3PMFvAKzIYR85.jpg',
  historic: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/30set2013---o-fotografo-kevin-carter-recebeu-o-premio-pullitzer-com-a-foto-que-sensibilizou-o-mundo-com-o-tema-da-fome-na-africa-na-foto-um-urubu-observa-uma-crianca-desnutrida-no-sudao-1623410034962_v2_4x3-PKFl42aUHpMYozEYDfqJ36nQdqBY65.jpg',
  community: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%281%29-sEuMz1UvuKyq0VPmjI25WDsbnRbC2w.jpeg',
}

const testimonials = [
  ['Luciana Mello', 'Curitiba', 'Doei R$100,00 e fico grata por fazer parte dessa missão, alimentando quem mais precisa... Amém!', 'https://randomuser.me/api/portraits/women/44.jpg'],
  ['Márcia Santos', 'Recife', 'Sempre que posso ajudo essas crianças, ninguém merece passar fome. Que Deus abençoe o Esperança do Bem por ajudar!', 'https://randomuser.me/api/portraits/women/32.jpg'],
  ['João Paulo', 'São Paulo', 'Ajudei hoje, fico muito feliz com pessoas que se importam com o próximo e seguem o propósito de Deus aqui na Terra.', 'https://randomuser.me/api/portraits/men/32.jpg'],
  ['Luciana Mello', 'Curitiba', 'Doei R$100,00 e fico grata por fazer parte dessa missão, alimentando quem mais precisa... Amém!', 'https://randomuser.me/api/portraits/women/68.jpg'],
]

type PixData = { copyPaste?: string; qrCodeBase64?: string }

function DonationModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState(50)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pix, setPix] = useState<PixData | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  async function generatePix() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/pix', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount }) })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error || 'Não foi possível gerar o PIX.')
      setPix(payload.data?.pix || null)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível gerar o PIX.')
    } finally { setLoading(false) }
  }

  return <div className="donation-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-modal-title">
      <button className="modal-close" onClick={onClose} aria-label="Fechar janela">×</button>
      {!pix ? <>
        <span className="modal-kicker">UM GESTO QUE TRANSFORMA</span>
        <h2 id="donation-modal-title">Escolha como fazer parte</h2>
        <p className="modal-intro">Sua contribuição chega como alimento, cuidado e esperança.</p>
        <div className="modal-amounts">{[30, 50, 100, 150, 200].map((value) => <button key={value} className={amount === value ? 'selected' : ''} onClick={() => setAmount(value)}>R$ {value},00</button>)}</div>
        <button className="modal-primary" onClick={generatePix} disabled={loading}>{loading ? 'GERANDO PIX...' : 'GERAR PIX AGORA'}</button>
        <a className="modal-full-link" href="/doar">Prefiro abrir a página completa de doação</a>
        {error && <p className="modal-error" role="alert">{error}</p>}
      </> : <>
        <span className="modal-success-icon" aria-hidden="true">✓</span>
        <span className="modal-kicker">OBRIGADO POR DIZER SIM</span>
        <h2 id="donation-modal-title">Sua atitude leva esperança</h2>
        <p className="modal-verse">&quot;Cada um contribua segundo propôs no coração, não com tristeza ou por necessidade; porque Deus ama quem dá com alegria.&quot;</p>
        <small className="modal-reference">2 Coríntios 9:7</small>
        {pix.qrCodeBase64 && <img className="modal-qr" src={`data:image/png;base64,${pix.qrCodeBase64}`} alt="QR Code PIX para pagamento" />}
        {pix.copyPaste && <><div className="modal-copy-code">{pix.copyPaste}</div><button className="modal-primary" onClick={async () => { await navigator.clipboard?.writeText(pix.copyPaste || ''); setCopied(true); window.setTimeout(() => setCopied(false), 2200) }}>{copied ? 'PIX COPIADO' : 'COPIAR PIX COPIA E COLA'}</button></>}
      </>}
    </section>
  </div>
}

function CTA({ label = 'FAZER PARTE DESSE PROPÓSITO', onDonate }: { label?: string; onDonate: () => void }) {
  return <button className="cta" onClick={onDonate}>{label} <span aria-hidden="true">♥</span></button>
}

export default function Page() {
  const [donationOpen, setDonationOpen] = useState(false)
  const openDonation = () => setDonationOpen(true)

  return (
    <main>
      <header className="topbar site-header">
        <a className="brand-mark" aria-label="Esperança do Bem" href="#inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2014%20de%20set.%20de%202026%2C%2022_56_29-RvUWngotSiiyqW9IjYE2RL60GGAyvj.png" alt="Logo Esperança do Bem" /></a>
        <nav className="main-nav" aria-label="Navegação principal"><a href="#impacto">Nosso impacto</a><a href="#depoimentos">Depoimentos</a><a className="nav-donate" href="/doar">Doar agora</a></nav>
      </header>

      <section className="campaign-banner" id="inicio">
        <video className="campaign-banner-video" autoPlay muted loop playsInline poster={images.banner} aria-label="Vídeo sobre a alimentação de crianças em Moçambique">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alimentando%20Crian%C3%A7as%20em%20Mo%C3%A7ambique_%20Contribua%20para%20esta%20Obra%20Evangel%C3%ADstica%21%20_canal%20_boa%20_palavra-FUKOG676gp2gtuePYpafIjqllMEb2V.mp4" type="video/mp4" />
        </video>
        <div className="campaign-banner-overlay" />
        <div className="campaign-banner-content">
          <span className="banner-kicker">UMA VIDA PODE COMEÇAR COM VOCÊ</span>
          <h1>Quando a fome dói, a esperança precisa chegar.</h1>
          <p>Seu gesto transforma doação em alimento, cuidado e dignidade.</p>
          <div className="hero-cta-row"><CTA label="AJUDE AGORA" onDonate={openDonation} /><a className="hero-ghost-cta" href="#impacto">CONHEÇA O IMPACTO <span aria-hidden="true">↓</span></a></div>
        </div>
      </section>

      <section className="hero section narrow">
        <h1>Essa é uma obra feita por muitas mãos</h1>
        <p className="subtitle">Cada doação é um ato de fé.</p>
        <div className="progress-meta"><span>Já conseguimos arrecadar<br /><b>R$ 143.450,00</b></span><span className="live">AO VIVO ▷</span></div>
        <div className="progress"><span /></div>
        <div className="progress-label"><b>65,20%</b><span>Faltam R$76.550,00 para alcançarmos a meta</span></div>
        <p className="fine">*Os valores são atualizados conforme as doações entram.</p>
        <div className="donors"><span>Dan Doou R$25,00.</span><span>Ana Doou R$65,00.</span></div>
        <blockquote>&quot;Cada um contribua segundo propôs no coração.&quot;<small>▧ 2 Coríntios 9:7</small></blockquote>
        <CTA onDonate={openDonation} />
      </section>

      <section className="story section paper">
        <img className="feature-image" src={images.child} alt="Criança sorrindo com um prato de comida" />
        <div className="story-copy"><p>Se você chegou até aqui, não foi por acaso,<br /><b>Deus poderia tocar muitos corações, mas tocou o seu.</b></p><p>Essas crianças estão vivas hoje esperando que alguém <b>diga sim.</b></p></div>
        <CTA onDonate={openDonation} />
        <img className="feature-image" src={images.hunger} alt="Crianças em situação de vulnerabilidade" />
        <div className="story-copy"><p><b>Crianças em Moçambique dormem com fome,</b> muitas são órfãs.</p><p>Falta comida, falta água, falta tudo.<br />Enquanto alguns têm mesa farta, <b>elas não têm o básico para viver.</b></p></div>
        <CTA label="NÃO QUERO VIRAR AS COSTAS" onDonate={openDonation} />
      </section>

      <section className="impact-section section" id="impacto">
        <div className="section-heading"><span className="section-kicker">POR QUE SUA AJUDA IMPORTA</span><h2>Não é apenas uma doação.<br /><em>É uma resposta.</em></h2><p>Enquanto você lê, uma criança espera por uma refeição, água limpa e alguém que diga: eu me importo.</p></div>
        <div className="impact-grid"><figure><img src={images.childClose} alt="Criança recebendo avaliação e cuidado" /><figcaption>Cuidado que devolve força para continuar.</figcaption></figure><figure><img src={images.community} alt="Crianças reunidas em uma comunidade" /><figcaption>Esperança que cresce quando chega em muitas mãos.</figcaption></figure></div>
      </section>

      <section className="gallery section paper"><div className="gallery-grid"><img src={images.prayer} alt="Crianças reunidas em oração" /><img src={images.historic} alt="Criança em situação de fome observada por um abutre" /><img src={images.community} alt="Crianças reunidas em comunidade" /></div><p className="quote">&quot;Quem recebe uma destas crianças em meu nome, a mim me recebe.&quot;<small>▧ Mateus 18:5</small></p></section>

      <section className="testimonials section" id="depoimentos"><span className="section-kicker">VOZES DA NOSSA COMUNIDADE</span><h2>Quem já fez parte, compartilha</h2><p className="testimonials-intro">Cada gesto cria uma corrente de cuidado que chega muito mais longe.</p><div className="testimonial-row">{testimonials.map(([name, city, text, avatar], index) => <article className="testimonial" key={`${name}-${index}`}><img className="avatar-photo" src={avatar} alt={`Avatar de ${name}`} /><div><h3>{name}</h3><small>{city} · Doador(a)</small></div><span className="verified">✓ verificado</span><p>&quot;{text}&quot;</p></article>)}</div></section>

      <section className="final section"><h2>Não vire as costas para o propósito de Deus</h2><p className="subtitle">Tive fome, e vocês me deram de comer.<br />Hoje, você pode ser a resposta dessa palavra.</p><img src={images.video} alt="Vídeo sobre o projeto Esperança do Bem" /><CTA label="QUERO AJUDAR AGORA" onDonate={openDonation} /><p><b>É rápido, seguro e qualquer valor ajuda.</b></p></section>
      <footer>Esperança do Bem · Uma mão estendida transforma uma vida.</footer>
      {donationOpen && <DonationModal onClose={() => setDonationOpen(false)} />}
    </main>
  )
}
