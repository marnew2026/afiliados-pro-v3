import { useEffect, useState } from 'react'
import './App.css'

const API = (import.meta.env.VITE_TUAI_API_URL || 'https://tuai-staging.onrender.com').replace(/\/$/, '')

function getSessionId() {
  const key = 'tuai_session_id'
  let value = localStorage.getItem(key)
  if (!value) {
    value = crypto.randomUUID()
    localStorage.setItem(key, value)
  }
  return value
}

async function recordEvent(productId, type) {
  const response = await fetch(`${API}/tuai/v1/events`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      productId,
      type,
      sessionId: getSessionId(),
      source: 'tuai_web',
      placement: 'vertical_feed',
    }),
  })
  if (!response.ok) throw new Error('Falha ao registrar interação')
  return response.json()
}

function App() {
  const [items, setItems] = useState([])
  const [saved, setSaved] = useState(() => new Set())
  const [status, setStatus] = useState('loading')
  const product = items[0]

  useEffect(() => {
    let cancelled = false
    fetch(`${API}/tuai/v1/feed`)
      .then((response) => {
        if (!response.ok) throw new Error('Feed indisponível')
        return response.json()
      })
      .then((data) => {
        if (cancelled) return
        setItems(Array.isArray(data.items) ? data.items : [])
        setStatus('ready')
      })
      .catch(() => !cancelled && setStatus('error'))
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (product?.id) recordEvent(product.id, 'impression').catch(() => {})
  }, [product?.id])

  const toggleSave = async () => {
    if (!product || saved.has(product.id)) return
    await recordEvent(product.id, 'save')
    setSaved((current) => new Set(current).add(product.id))
  }

  const openOffer = () => {
    if (!product) return
    const destination = `${API}${product.destinationUrl}?sessionId=${encodeURIComponent(getSessionId())}&placement=vertical_feed`
    window.open(destination, '_blank', 'noopener,noreferrer')
  }

  if (status === 'loading') return <main className="state"><span className="pulse" />Carregando oportunidades…</main>
  if (status === 'error') return <main className="state"><strong>Não foi possível carregar o Tuaí.</strong><button onClick={() => location.reload()}>Tentar novamente</button></main>
  if (!product) return <main className="state"><strong>Novas oportunidades em breve.</strong></main>

  const score = product.opportunity?.score ?? 0
  const isSaved = saved.has(product.id)

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Tuaí"><span>tu</span>aí</a>
        <div className="live"><i /> oportunidades ao vivo</div>
      </header>

      <section className="feed-card">
        <div className="media">
          <img src={product.imageUrl} alt={product.title} />
          <div className="shade" />
          <div className="score" aria-label={`Potencial ${score} de 100`}><b>{score}</b><small>/100</small></div>
          <div className="copy">
            <span className="category">{product.category || 'seleção tuaí'}</span>
            <h1>{product.title}</h1>
            <p>{product.opportunity?.label || 'Em análise'}</p>
            <div className="signals"><span>{product.impressions} visualizações</span><span>{product.clicks} cliques</span></div>
          </div>
        </div>

        <aside className="actions" aria-label="Ações do produto">
          <button className={isSaved ? 'saved' : ''} onClick={toggleSave} aria-label="Salvar"><span>{isSaved ? '✓' : '♡'}</span><small>Salvar</small></button>
          <button onClick={openOffer} aria-label="Ver oferta"><span>↗</span><small>Oferta</small></button>
        </aside>

        <button className="cta" onClick={openOffer}>Ver produto com segurança <span>→</span></button>
      </section>

      <nav className="bottom-nav" aria-label="Navegação principal">
        <button className="active"><span>⌂</span>Descobrir</button>
        <button><span>⌕</span>Buscar</button>
        <button><span>♡</span>Salvos</button>
        <button><span>○</span>Perfil</button>
      </nav>
    </main>
  )
}

export default App
