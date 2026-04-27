import { campaigns } from "./data/campaigns"
import CampaignCard from "./components/CampaignCard"

export default function App() {
  return (
    <div style={styles.page}>
      
      <header style={styles.header}>
        <h1 style={styles.title}>📊 Painel Afiliados Pro</h1>
        <p style={styles.subtitle}>Gerencie suas campanhas em um só lugar</p>
      </header>

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
    fontFamily: "Arial",
    background: "#0f172a",
    minHeight: "100vh",
    padding: "30px",
    color: "white"
  },
  header: {
    marginBottom: "20px"
  },
  title: {
    fontSize: "28px",
    margin: 0
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: "5px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px"
  }
}