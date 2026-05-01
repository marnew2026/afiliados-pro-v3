import React from "react";

export default function CampaignCard({ campaign }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <h3>{campaign.nome}</h3>

      <button
        onClick={() =>
          window.open(`http://localhost:3001/go/${campaign.id}`, "_blank")
        }
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Abrir link de afiliado
      </button>

      <p style={{ marginTop: "10px" }}>
        Cliques: {campaign.cliques}
      </p>
    </div>
  );
}