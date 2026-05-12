import { getRiskStatus } from "../services/riskRules.js";


export function getRiskStatus(score) {
  if (score < 30) return "BLOCK";
  if (score < 60) return "REVIEW";
  if (score < 80) return "NORMAL";
  return "PRIORITY";
}

const status = getRiskStatus(user.riskScore);