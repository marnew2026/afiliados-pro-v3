import { campaigns } from "./data/campaigns"
import CampaignCard from "./components/CampaignCard"

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Painel Afiliados Pro</h1>

      {campaigns.map((c) => (
        <CampaignCard key={c.id} campaign={c} />
      ))}
    </div>
  )
}