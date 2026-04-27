export default function CampaignCard({ campaign }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{campaign.title}</h2>
      <p style={styles.desc}>{campaign.description}</p>

      <a href={campaign.link} target="_blank" style={styles.button}>
        Acessar campanha
      </a>
    </div>
  )
}

const styles = {
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
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
    borderRadius: "8px",
    color: "white",
    textDecoration: "none",
    display: "inline-block"
  }
}