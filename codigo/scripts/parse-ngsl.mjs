#!/usr/bin/env node
/**
 * Subfase 2.2 del piloto vocab-1000 — Procesado del NGSL crudo.
 *
 * Lee scripts/data/ngsl-raw.csv (descargado de newgeneralservicelist.com)
 * y genera scripts/data/ngsl-filtered.json con los primeros 1000 lemas
 * léxicamente útiles aplicando el filtro de palabras-función del
 * funcional.md v3 §4.2 (con ampliación pedagógica documentada).
 *
 * Lista de filtrado: arranca con las 16 palabras explícitas del funcional v3
 * y se amplía con palabras-función claramente vacías de valor pedagógico
 * (conjunciones, pronombres relativos, negaciones, adverbios funcionales, etc.).
 * La ampliación queda documentada en este archivo como criterio del Técnico.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const INPUT = resolve(__dirname, "data/ngsl-raw.csv");
const OUTPUT = resolve(__dirname, "data/ngsl-filtered.json");
const TARGET_SIZE = 1000;

/**
 * Palabras-función vacías de valor pedagógico para vocab-1000.
 *
 * Núcleo base del funcional v3 §4.2 (16 palabras):
 *   the, a, an, and, or, but, of, to, in, on, at, for, with, by, from, as
 *
 * Ampliación pedagógica del Técnico (justificación: enseñar "if" o "not"
 * como traducción aislada tiene poco valor de aprendizaje real; el jugador
 * los conoce por uso, no por traducción; ocupan slots de palabras
 * léxicamente útiles). Verbos modales (would, could, should, must, may,
 * might, can, shall, will) **NO se filtran** — entran como POS `modal`
 * según §4.3 del funcional v3.
 */
const FUNCTION_WORDS = new Set([
  // Artículos
  "the",
  "a",
  "an",
  // Conjunciones coordinantes
  "and",
  "or",
  "but",
  "so",
  // Conjunciones subordinantes
  "if",
  "that",
  "because",
  "when",
  "while",
  "although",
  "though",
  "unless",
  "since",
  "as",
  "whether",
  "until",
  "before",
  "after",
  // Preposiciones
  "of",
  "to",
  "in",
  "on",
  "at",
  "for",
  "with",
  "by",
  "from",
  "into",
  "onto",
  "upon",
  "about",
  "against",
  "between",
  "among",
  "during",
  "above",
  "below",
  "under",
  "over",
  "through",
  "throughout",
  "without",
  "within",
  "across",
  "around",
  "behind",
  "beyond",
  "beside",
  "besides",
  "near",
  "off",
  // Pronombres relativos/interrogativos
  "who",
  "whom",
  "which",
  "what",
  "whose",
  // Demostrativos
  "this",
  "these",
  "those",
  // Negaciones / placeholders
  "not",
  "no",
  "there",
  "here",
  // Adverbios conectores / funcionales
  "however",
  "therefore",
  "thus",
  "moreover",
  "nevertheless",
  "otherwise",
  "also",
  "even",
  "just",
  "only",
  "very",
  "too",
  "then",
  "now",
  "ever",
  "never",
  "already",
  "still",
  "yet",
  "again",
  "perhaps",
  "maybe",
  "instead",
  // Cuantificadores funcionales
  "any",
  "some",
  "all",
  "every",
  "each",
  "both",
  "neither",
  "either",
  "much",
  "many",
  "more",
  "most",
  "few",
  "less",
  "several",
  "such",
  // Posesivos
  "my",
  "your",
  "his",
  "her",
  "its",
  "our",
  "their",
  // Demás pronombres personales y objetivos
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "us",
  "them",
]);

/**
 * Parser CSV minimal. NGSL no usa comas en valores, no necesitamos un parser
 * sofisticado. Solo split por línea + split por coma.
 */
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0].split(",").map((s) => s.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(",").map((s) => s.trim());
    return Object.fromEntries(header.map((k, i) => [k, cells[i]]));
  });
}

function main() {
  const csv = readFileSync(INPUT, "utf-8");
  const rows = parseCSV(csv);

  const all = rows.map((r) => ({
    lemma: r.Lemma,
    sfiRank: Number.parseInt(r["SFI Rank"], 10),
    sfi: Number.parseFloat(r.SFI),
    adjFreqPerMillion: Number.parseFloat(r["Adjusted Frequency per Million (U)"]),
  }));

  const filtered = [];
  const dropped = [];
  for (const entry of all) {
    if (filtered.length >= TARGET_SIZE) break;
    if (FUNCTION_WORDS.has(entry.lemma.toLowerCase())) {
      dropped.push(entry.lemma);
      continue;
    }
    filtered.push(entry);
  }

  const output = {
    source: "NGSL 1.2",
    license: "CC BY-SA 4.0",
    citation: "Browne, C., Culligan, B., & Phillips, J. (2013). The New General Service List.",
    fetchedAt: new Date().toISOString().slice(0, 10),
    targetSize: TARGET_SIZE,
    actualSize: filtered.length,
    droppedCount: dropped.length,
    droppedSample: dropped.slice(0, 30),
    droppedAll: dropped,
    entries: filtered,
  };

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2), "utf-8");

  console.log(`OK · ${filtered.length} lemas filtrados`);
  console.log(`Descartados: ${dropped.length} palabras-función`);
  console.log(`Primeras 10 entradas:`);
  for (const e of filtered.slice(0, 10)) {
    console.log(`  rank ${e.sfiRank}: ${e.lemma} (SFI ${e.sfi})`);
  }
  console.log(`Últimas 5 entradas (cola del top-1000):`);
  for (const e of filtered.slice(-5)) {
    console.log(`  rank ${e.sfiRank}: ${e.lemma} (SFI ${e.sfi})`);
  }
}

main();
