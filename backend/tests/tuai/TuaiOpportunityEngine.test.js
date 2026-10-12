import test from "node:test";
import assert from "node:assert/strict";
import {
  rankOpportunities,
  scoreOpportunity,
} from "../../services/tuai/TuaiOpportunityEngine.js";

test("mantem a pontuacao dentro de zero e cem", () => {
  assert.equal(scoreOpportunity({}).score >= 0, true);
  assert.equal(scoreOpportunity({ clicks: 9999, sales: 999, earnings: 9999 }).score <= 100, true);
});

test("premia uma oportunidade com conversao comprovada", () => {
  const strong = scoreOpportunity({
    clicks: 100,
    sales: 12,
    earnings: 120,
    ageHours: 1,
    trustScore: 90,
  });
  const weak = scoreOpportunity({
    clicks: 5,
    sales: 0,
    earnings: 0,
    ageHours: 720,
    trustScore: 50,
  });

  assert.ok(strong.score > weak.score);
  assert.equal(strong.label, "forte oportunidade");
});

test("ranking e deterministico quando ha empate", () => {
  const ranked = rankOpportunities([
    { id: "b", clicks: 10 },
    { id: "a", clicks: 10 },
  ]);

  assert.deepEqual(ranked.map((item) => item.id), ["a", "b"]);
});
