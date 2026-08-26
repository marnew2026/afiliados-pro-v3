export interface CompanyEvolution {
  level: number;

  title: string;

  progress: number;

  nextTitle: string;

  medal: string;

  kaelMessage: string;

  color: string;

  background: string;

  border: string;

  icon: string;
}

interface EvolutionInput {
  patrimony: number;
  campaigns: number;
  clicks: number;
  earnings: number;
  withdrawn: number;
  achievements: number;
  streak: number;
}

export function getCompanyEvolution(data: EvolutionInput): CompanyEvolution {

  let score = 0;

  // Patrimônio (40%)
  score += Math.min(data.patrimony / 10000, 1) * 40;

  // Campanhas (20%)
  score += Math.min(data.campaigns / 20, 1) * 20;

  // Cliques (10%)
  score += Math.min(data.clicks / 1000, 1) * 10;

  // Ganhos (15%)
  score += Math.min(data.earnings / 10000, 1) * 15;

  // Conquistas (10%)
  score += Math.min(data.achievements / 20, 1) * 10;

  // Consistência (5%)
  score += Math.min(data.streak / 30, 1) * 5;

  if (score < 25) {
    return {
        color: "#22c55e",

background: "#052e16",

border: "#4ade80",

icon: "🌱",
      level: 1,
      title: "🌱 Fundação",
      progress: score * 4,
      nextTitle: "🏪 Empresa Local",
      medal: "🥉",
      kaelMessage:
        "Toda empresa começa pequena. Continue construindo.",
    };
  }

  if (score < 50) {
    return {
        color: "#60a5fa",

background: "#172554",

border: "#2563eb",

icon: "🏪",
      level: 2,
      title: "🏪 Empresa Local",
      progress: (score - 25) * 4,
      nextTitle: "🏢 Empresa Regional",
      medal: "🥈",
      kaelMessage:
        "Sua empresa está crescendo de forma consistente.",
    };
  }

  if (score < 75) {
    return {
        color: "#c084fc",

background: "#3b0764",

border: "#a855f7",

icon: "🏢",
      level: 3,
      title: "🏢 Empresa Regional",
      progress: (score - 50) * 4,
      nextTitle: "🌎 Empresa Nacional",
      medal: "🥇",
      kaelMessage:
        "Você já está construindo algo relevante.",
    };
  }

  return {
    color: "#fbbf24",

background: "#78350f",

border: "#f59e0b",

icon: "🌎",
    level: 4,
    title: "🌎 Empresa Nacional",
    progress: 100,
    nextTitle: "👑 Referência",
    medal: "🏆",
    kaelMessage:
      "Sua empresa tornou-se referência. Continue deixando um legado.",
  };
}