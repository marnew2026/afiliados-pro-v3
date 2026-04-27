import { useState } from "react"
import CampaignCard from "./components/CampaignCard"
import { campaigns as initialCampaigns } from "./data/campaigns"

export default function App() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")

  function addCampaign() {
    if (!title || !description || !link) return

    const newCampaign = {
      id: Date.now(),
      title,
      description,
      link
    }

    setCampaigns([newCampaign, ...campaigns])

    setTitle("")
    setDescription("")
    setLink("")
  }

  return (
    <div style={styles.page}>
      
      <h1>📊 Painel Afiliados Pro</h1>

      {/* FORMULÁRIO */}
      <div style={styles.form}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Link da campanha"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={styles.input}
        />

        <button onClick={addCampaign} style={styles.button}>
          ➕ Criar campanha
        </button>
      </div>

      {/* LISTA */}
      <div style={styles.grid}>
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>

    </div>
  )
}

const styles = {
  page: {
    padding: "30px",
    background: "#0b1220",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none"
  },
  button: {
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "15px"
  }
}