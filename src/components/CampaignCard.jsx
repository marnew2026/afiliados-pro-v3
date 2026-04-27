export default function CampaignCard({ campaign }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: 15,
      marginBottom: 10,
      borderRadius: 10
    }}>
      <h3>{campaign.title}</h3>
      <p>{campaign.description}</p>

      <a href={campaign.link} target="_blank">
        <button style={{ padding: 10, cursor: "pointer" }}>
          Acessar link
        </button>
      </a>
    </div>
  )
}