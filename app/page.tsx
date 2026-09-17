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

function CTA({ label = 'FAZER PARTE DESSE PROPÓSITO' }: { label?: string }) {
  return <a className="cta" href="/doar">{label} <span aria-hidden="true">♥</span></a>
}

export default function Page() {
  return (
    <main>
      <header className="topbar site-header">
        <a className="brand-mark" aria-label="Esperança do Bem" href="#inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2014%20de%20set.%20de%202026%2C%2022_56_29-RvUWngotSiiyqW9IjYE2RL60GGAyvj.png" alt="Logo Esperança do Bem" width="104" height="70" /></a>
        <nav className="main-nav" aria-label="Navegação principal"><a href="#impacto">Nosso impacto</a><a href="#depoimentos">Depoimentos</a><a className="nav-donate" href="/doar">Doar agora</a></nav>
      </header>

      <section className="campaign-banner" id="inicio">
        <video className="campaign-banner-video" autoPlay muted loop playsInline preload="none" poster={images.banner} aria-label="Vídeo sobre a alimentação de crianças em Moçambique">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Alimentando%20Crian%C3%A7as%20em%20Mo%C3%A7ambique_%20Contribua%20para%20esta%20Obra%20Evangel%C3%ADstica%21%20_canal%20_boa%20_palavra-FUKOG676gp2gtuePYpafIjqllMEb2V.mp4" type="video/mp4" />
        </video>
        <div className="campaign-banner-overlay" />
        <div className="campaign-banner-content">
          <span className="banner-kicker">UMA VIDA PODE COMEÇAR COM VOCÊ</span>
          <h1>Quando a fome dói, a esperança precisa chegar.</h1>
          <p>Seu gesto transforma doação em alimento, cuidado e dignidade.</p>
          <div className="hero-cta-row"><CTA label="AJUDE AGORA" /><a className="hero-ghost-cta" href="#impacto">CONHEÇA O IMPACTO <span aria-hidden="true">↓</span></a></div>
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
        <CTA />
      </section>

      <section className="story section paper">
        <img className="feature-image" src={images.child} alt="Criança sorrindo com um prato de comida" width="720" height="480" fetchPriority="high" />
        <div className="story-copy"><p>Se você chegou até aqui, não foi por acaso,<br /><b>Deus poderia tocar muitos corações, mas tocou o seu.</b></p><p>Essas crianças estão vivas hoje esperando que alguém <b>diga sim.</b></p></div>
        <CTA />
        <img className="feature-image" src={images.hunger} alt="Crianças em situação de vulnerabilidade" loading="lazy" width="720" height="480" />
        <div className="story-copy"><p><b>Crianças em Moçambique dormem com fome,</b> muitas são órfãs.</p><p>Falta comida, falta água, falta tudo.<br />Enquanto alguns têm mesa farta, <b>elas não têm o básico para viver.</b></p></div>
        <CTA label="NÃO QUERO VIRAR AS COSTAS" />
      </section>

      <section className="impact-section section" id="impacto">
        <div className="section-heading"><span className="section-kicker">POR QUE SUA AJUDA IMPORTA</span><h2>Não é apenas uma doação.<br /><em>É uma resposta.</em></h2><p>Enquanto você lê, uma criança espera por uma refeição, água limpa e alguém que diga: eu me importo.</p></div>
        <div className="impact-grid"><figure><img src={images.childClose} alt="Criança recebendo avaliação e cuidado" loading="lazy" width="720" height="480" /><figcaption>Cuidado que devolve força para continuar.</figcaption></figure><figure><img src={images.community} alt="Crianças reunidas em uma comunidade" loading="lazy" width="720" height="480" /><figcaption>Esperança que cresce quando chega em muitas mãos.</figcaption></figure></div>
      </section>

      <section className="gallery section paper"><div className="gallery-grid"><img src={images.prayer} alt="Crianças reunidas em oração" loading="lazy" width="720" height="480" /><img src={images.historic} alt="Criança em situação de fome observada por um abutre" loading="lazy" width="720" height="480" /><img src={images.community} alt="Crianças reunidas em comunidade" loading="lazy" width="720" height="480" /></div><p className="quote">&quot;Quem recebe uma destas crianças em meu nome, a mim me recebe.&quot;<small>▧ Mateus 18:5</small></p></section>

      <section className="testimonials section" id="depoimentos"><span className="section-kicker">VOZES DA NOSSA COMUNIDADE</span><h2>Quem já fez parte, compartilha</h2><p className="testimonials-intro">Cada gesto cria uma corrente de cuidado que chega muito mais longe.</p><div className="testimonial-row">{testimonials.map(([name, city, text, avatar], index) => <article className="testimonial" key={`${name}-${index}`}><img className="avatar-photo" src={avatar} alt={`Avatar de ${name}`} loading="lazy" width="66" height="66" /><div><h3>{name}</h3><small>{city} · Doador(a)</small></div><span className="verified">✓ verificado</span><p>&quot;{text}&quot;</p></article>)}</div></section>

      <section className="final section"><h2>Não vire as costas para o propósito de Deus</h2><p className="subtitle">Tive fome, e vocês me deram de comer.<br />Hoje, você pode ser a resposta dessa palavra.</p><img src={images.video} alt="Vídeo sobre o projeto Esperança do Bem" loading="lazy" width="900" height="506" /><CTA label="QUERO AJUDAR AGORA" /><p><b>É rápido, seguro e qualquer valor ajuda.</b></p></section>
      <footer>Esperança do Bem · Uma mão estendida transforma uma vida.</footer>
    </main>
  )
}
