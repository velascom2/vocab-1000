/**
 * build-catalog.mjs
 * Lee scripts/translations.json y genera src/catalog/data/catalog.ts
 * Ejecutar: node scripts/build-catalog.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");

const raw = JSON.parse(
  readFileSync(join(__dir, "translations.json"), "utf-8")
);

const senses = [];
const en_es = [];
const es_en = [];

for (const entry of raw) {
  const { l: lemma, p: pos, e: translations } = entry;
  const capped = translations.slice(0, 3);

  const entrySenseIds = capped.map((es) => {
    const id = `${pos}-${lemma}-${es}`.replace(/\s+/g, "_");
    senses.push({ id, pos, en: lemma, es });
    return id;
  });

  en_es.push({
    groupId: `en_es:${pos}:${lemma}`,
    pos,
    prompt: lemma,
    answers: capped,
    senseIds: entrySenseIds,
  });

  for (let i = 0; i < capped.length; i++) {
    const es = capped[i];
    const senseId = entrySenseIds[i];
    const existingGroup = es_en.find(
      (g) => g.groupId === `es_en:${pos}:${es}`
    );
    if (existingGroup) {
      if (!existingGroup.answers.includes(lemma)) {
        existingGroup.answers.push(lemma);
        existingGroup.senseIds.push(senseId);
      }
    } else {
      es_en.push({
        groupId: `es_en:${pos}:${es}`,
        pos,
        prompt: es,
        answers: [lemma],
        senseIds: [senseId],
      });
    }
  }
}

const catalog = {
  version: "ngsl-2026-05-22",
  source: "NGSL 1.2",
  license: "CC BY-SA 4.0",
  senses,
  en_es,
  es_en,
};

const ts = `import type { Catalog } from "../types";

export const catalog: Catalog = ${JSON.stringify(catalog, null, 2)} as const;
`;

const outPath = join(root, "src", "catalog", "data", "catalog.ts");
writeFileSync(outPath, ts, "utf-8");

console.log(
  `✅  catalog.ts generado: ${senses.length} sentidos · ${en_es.length} grupos en_es · ${es_en.length} grupos es_en`
);
