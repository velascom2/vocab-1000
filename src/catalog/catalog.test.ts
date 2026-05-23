import { describe, expect, it } from "vitest";
import { catalog } from "./data/catalog";

describe("catalog NGSL-1000", () => {
  it("contiene al menos 900 grupos en_es (regresión Issue #1)", () => {
    expect(catalog.en_es.length).toBeGreaterThanOrEqual(900);
  });

  it("ninguna acepción contiene paréntesis explicativos (regresión Issue #2)", () => {
    const offenders: Array<{ direction: string; group: string; answer: string }> = [];
    for (const g of catalog.en_es) {
      for (const a of g.answers) {
        if (/[()]/.test(a)) offenders.push({ direction: "en_es", group: g.prompt, answer: a });
      }
    }
    for (const g of catalog.es_en) {
      for (const a of g.answers) {
        if (/[()]/.test(a)) offenders.push({ direction: "es_en", group: g.prompt, answer: a });
      }
    }
    expect(offenders).toEqual([]);
  });

  it("ningún prompt contiene paréntesis explicativos (regresión Issue #2)", () => {
    const offenders = [
      ...catalog.en_es.filter((g) => /[()]/.test(g.prompt)),
      ...catalog.es_en.filter((g) => /[()]/.test(g.prompt)),
    ];
    expect(offenders).toEqual([]);
  });

  it("todos los grupos tienen entre 1 y 3 answers (funcional v3 §4.11)", () => {
    const violations = [...catalog.en_es, ...catalog.es_en].filter(
      (g) => g.answers.length < 1 || g.answers.length > 3
    );
    expect(violations).toEqual([]);
  });
});
