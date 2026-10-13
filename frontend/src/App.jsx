import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const API = (import.meta.env.VITE_TUAI_API_URL || "https://tuai-staging.onrender.com").replace(/\/$/, "");
const SAVED_KEY = "tuai:saved-products";
const SESSION_KEY = "tuai:session-id";

function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function readSaved() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

async function sendEvent(productId, type, sessionId) {
  const response = await fetch(`${API}/tuai/v1/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, type, sessionId, source: "tuai_web", placement: "vertical_feed" }),
  });
  if (!response.ok) throw new Error(`Evento recusado (${response.status})`);
  return response.json();
}

function ProductCard({ item, sessionId, saved, onSave }) {
  const cardRef = useRef(null);
  const impressionSent = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.65 && !impressionSent.current) {
          impressionSent.current = true;
          sendEvent(item.id, "impression", sessionId).catch(() => {
            impressionSent.current = false;
          });
        }
      },
      { threshold: [0.65] },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [item.id, sessionId]);

  const openProduct = () => {
    const destination = `${API}${item.destinationUrl}?sessionId=${encodeURIComponent(sessionId)}&placement=vertical_feed`;
    window.open(destination, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="feed-card" ref={cardRef}>
      <div className="product-media">
        <img src={item.imageUrl} alt={item.title} loading="lazy" />
        <div className="media-shade" />
        <div className="score-ring" aria-label={`Pontuação ${item.opportunity?.score ?? 0}`}>
          <strong>{item.opportunity?.score ?? 0}</strong>
          <span>score</span>
        </div>

        <div className="product-copy">
          <span className="category">{item.category || "produto"}</span>
          <h1>{item.title}</h1>
          <div className="signals">
            <span>{item.opportunity?.label || "em análise"}</span>
            <span>•</span>
            <span>{item.impressions || 0} visualizações</span>
            <span>•</span>
            <span>{item.clicks || 0} acessos</span>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className={saved ? "save-button saved" : "save-button"} onClick={() => onSave(item)} disabled={saved}>
          <span>{saved ? "✓" : "♡"}</span>
          {saved ? "Salvo" : "Salvar"}
        </button>
        <button className="offer-button" onClick={openProduct}>
          Ver produto com segurança <span>↗</span>
        </button>
      </div>
      <p className="affiliate-note">Você será direcionado ao site oficial do vendedor.</p>
    </article>
  );
}

export default function App() {
  const sessionId = useMemo(getSessionId, []);
  const [items, setItems] = useState([]);
  const [savedIds, setSavedIds] = useState(readSaved);
  const [state, setState] = useState("loading");

  const loadFeed = useCallback(async () => {
    try {
      setState("loading");
      const response = await fetch(`${API}/tuai/v1/feed`, { cache: "no-store" });
      if (!response.ok) throw new Error("Feed indisponível");
      const data = await response.json();
      setItems(Array.isArray(data.items) ? data.items : []);
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => { loadFeed(); }, [loadFeed]);

  const saveProduct = async (item) => {
    if (savedIds.has(item.id)) return;
    const next = new Set(savedIds).add(item.id);
    setSavedIds(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify([...next]));
    try {
      await sendEvent(item.id, "save", sessionId);
    } catch {
      next.delete(item.id);
      setSavedIds(new Set(next));
      localStorage.setItem(SAVED_KEY, JSON.stringify([...next]));
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><b>tu</b><span>aí</span></div>
        <div className="live"><i /> oportunidades ao vivo</div>
      </header>

      <section className="feed-stream">
        {state === "loading" && <div className="message">Carregando oportunidades…</div>}
        {state === "error" && <div className="message">Não foi possível carregar.<button onClick={loadFeed}>Tentar novamente</button></div>}
        {state === "ready" && items.length === 0 && <div className="message">Novas oportunidades aparecerão aqui.</div>}
        {items.map((item) => (
          <ProductCard key={item.id} item={item} sessionId={sessionId} saved={savedIds.has(item.id)} onSave={saveProduct} />
        ))}
      </section>

      <nav className="bottom-nav" aria-label="Navegação principal">
        <button className="active"><span>⌂</span>Descobrir</button>
        <button><span>♡</span>Salvos</button>
        <button><span>◎</span>Perfil</button>
      </nav>
    </main>
  );
}
