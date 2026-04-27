export default function CampaignCard({ campaign }) {
  return (
    <div style={styles.card}>
      
      <div style={styles.badge}>ATIVA</div>

      <h2 style={styles.title}>{campaign.title}</h2>
      <p style={styles.desc}>{campaign.description}</p>

      <a href={campaign.link} target="_blank" style={styles.button}>
        🚀 Abrir oferta
      </a>
    </div>
  )
}

const styles = {
  card: {
    background: "linear-gradient(145deg, #111c33, #0f172a)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    transition: "0.3s",
    cursor: "pointer",
    position: "relative"
  },
  title: {
    fontSize: "18px",
    marginBottom: "8px"
  },
  desc: {
    color: "#94a3b8",
    marginBottom: "15px"
  },
  button: {
    background: "#3b82f6",
    padding: "10px 15px",
    borderRadius: "10px",
    color: "white",
    textDecoration: "none",
    display: "inline-block",
    fontWeight: "bold"
  },
  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#22c55e",
    padding: "5px 10px",
    borderRadius: "8px",
    fontSize: "12px"
  }
}