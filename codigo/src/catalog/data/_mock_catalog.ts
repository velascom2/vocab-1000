import type { Catalog } from "../types";

/**
 * Catálogo mock para Fase 2-3 del piloto (etapa 4 v1).
 * Sustituido en Fase 6 por el catálogo NGSL-1000 real.
 *
 * Cobertura del mock:
 *   - 8 sentidos atómicos.
 *   - en_es: 6 grupos (uno monosémico length=1, uno length=2 polisémico, uno length=3).
 *   - es_en: 8 grupos (los lemas ES polisémicos generan grupos separados).
 */
export const mockCatalog: Catalog = {
  version: "mock-2026-05-22",
  source: "mock",
  license: "CC BY-SA 4.0",
  senses: [
    { id: "mock-verb-understand-entender", pos: "verb", en: "understand", es: "entender" },
    { id: "mock-noun-house-casa", pos: "noun", en: "house", es: "casa" },
    { id: "mock-noun-bank-banco", pos: "noun", en: "bank", es: "banco" },
    { id: "mock-noun-bank-ribera", pos: "noun", en: "bank", es: "ribera" },
    { id: "mock-verb-take-agarrar", pos: "verb", en: "take", es: "agarrar" },
    { id: "mock-verb-take-tomar", pos: "verb", en: "take", es: "tomar" },
    { id: "mock-verb-take-llevar", pos: "verb", en: "take", es: "llevar" },
    { id: "mock-adjective-good-bueno", pos: "adjective", en: "good", es: "bueno" },
  ],
  en_es: [
    {
      groupId: "en_es:verb:understand",
      pos: "verb",
      prompt: "understand",
      answers: ["entender"],
      senseIds: ["mock-verb-understand-entender"],
    },
    {
      groupId: "en_es:noun:house",
      pos: "noun",
      prompt: "house",
      answers: ["casa"],
      senseIds: ["mock-noun-house-casa"],
    },
    {
      groupId: "en_es:noun:bank",
      pos: "noun",
      prompt: "bank",
      answers: ["banco", "ribera"],
      senseIds: ["mock-noun-bank-banco", "mock-noun-bank-ribera"],
    },
    {
      groupId: "en_es:verb:take",
      pos: "verb",
      prompt: "take",
      answers: ["agarrar", "tomar", "llevar"],
      senseIds: [
        "mock-verb-take-agarrar",
        "mock-verb-take-tomar",
        "mock-verb-take-llevar",
      ],
    },
    {
      groupId: "en_es:adjective:good",
      pos: "adjective",
      prompt: "good",
      answers: ["bueno"],
      senseIds: ["mock-adjective-good-bueno"],
    },
  ],
  es_en: [
    {
      groupId: "es_en:verb:entender",
      pos: "verb",
      prompt: "entender",
      answers: ["understand"],
      senseIds: ["mock-verb-understand-entender"],
    },
    {
      groupId: "es_en:noun:casa",
      pos: "noun",
      prompt: "casa",
      answers: ["house"],
      senseIds: ["mock-noun-house-casa"],
    },
    {
      groupId: "es_en:noun:banco",
      pos: "noun",
      prompt: "banco",
      answers: ["bank"],
      senseIds: ["mock-noun-bank-banco"],
    },
    {
      groupId: "es_en:noun:ribera",
      pos: "noun",
      prompt: "ribera",
      answers: ["bank"],
      senseIds: ["mock-noun-bank-ribera"],
    },
    {
      groupId: "es_en:verb:agarrar",
      pos: "verb",
      prompt: "agarrar",
      answers: ["take"],
      senseIds: ["mock-verb-take-agarrar"],
    },
    {
      groupId: "es_en:verb:tomar",
      pos: "verb",
      prompt: "tomar",
      answers: ["take"],
      senseIds: ["mock-verb-take-tomar"],
    },
    {
      groupId: "es_en:verb:llevar",
      pos: "verb",
      prompt: "llevar",
      answers: ["take"],
      senseIds: ["mock-verb-take-llevar"],
    },
    {
      groupId: "es_en:adjective:bueno",
      pos: "adjective",
      prompt: "bueno",
      answers: ["good"],
      senseIds: ["mock-adjective-good-bueno"],
    },
  ],
};
