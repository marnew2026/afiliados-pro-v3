import InfoCard from "./InfoCard";
import React from "react";
interface Props {
  balance: number;
  totalEarned: number;
  campaigns: number;
  clicks: number;
  isPro: boolean;
  withdrawn: number;
  formatMoney: (value: number) => string;
}

export default function StatsCards({
  balance,
  totalEarned,
  campaigns,
  clicks,
  isPro,
  withdrawn,
  formatMoney,
}: Props) {
  return (
    <>
      

      <InfoCard
        icon="📈"
        title="Resultado do Trabalho"
        value={`R$ ${formatMoney(totalEarned)}`}
        subtitle="Todo patrimônio começa com pequenos resultados."
        description="Seu trabalho diário fortalece sua empresa."
        footer="🚀 Continue evoluindo."
      />

      <InfoCard
        icon="📢"
        title="Campanhas Ativas"
        value={campaigns}
        subtitle={`${campaigns} campanhas trabalhando para sua empresa.`}
        description="Cada campanha representa um ativo gerando oportunidades."
        footer="🏆 Sua empresa continua evoluindo."
      />

      <InfoCard
        icon="👆"
        title="Cliques Recebidos"
        value={clicks}
        subtitle="Pessoas descobriram seus produtos."
        description="Cada clique pode representar uma nova oportunidade."
        footer="📈 Continue gerando resultados."
      />

      <InfoCard
        icon={isPro ? "👑" : "🟡"}
        title={isPro ? "Empresa PRO" : "Plano FREE"}
        subtitle={
          isPro
            ? "Sua empresa possui acesso completo aos recursos do Afiliados Pro."
            : "Faça upgrade e desbloqueie todo o potencial da sua empresa."
        }
        footer={
          isPro
            ? "⭐ Continue evoluindo."
            : "🚀 Evolua para o Plano PRO."
        }
      />

      <InfoCard
        icon="💸"
        title="Patrimônio Realizado"
        value={`R$ ${formatMoney(withdrawn)}`}
        subtitle="Parte do patrimônio já foi transformado em resultado."
        description="Isso demonstra que sua empresa está gerando frutos."
        footer="🏆 Continue construindo."
      />
    </>
  );
}