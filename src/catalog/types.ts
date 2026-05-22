/**
 * Tipos del catálogo vocab-1000.
 * Origen: tecnica.md v2 §4.5 (modelo de sentidos atómicos + agrupación por dirección).
 */

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "interjection"
  | "determiner"
  | "numeral"
  | "modal";

export const POS_LABEL_FULL: Record<PartOfSpeech, { es: string; en: string }> = {
  noun: { es: "sustantivo", en: "noun" },
  verb: { es: "verbo", en: "verb" },
  adjective: { es: "adjetivo", en: "adjective" },
  adverb: { es: "adverbio", en: "adverb" },
  pronoun: { es: "pronombre", en: "pronoun" },
  preposition: { es: "preposición", en: "preposition" },
  conjunction: { es: "conjunción", en: "conjunction" },
  interjection: { es: "interjección", en: "interjection" },
  determiner: { es: "determinante", en: "determiner" },
  numeral: { es: "numeral", en: "numeral" },
  modal: { es: "modal", en: "modal" },
};

export const POS_LABEL_SHORT: Record<PartOfSpeech, { es: string; en: string }> = {
  noun: { es: "sust.", en: "n." },
  verb: { es: "v.", en: "v." },
  adjective: { es: "adj.", en: "adj." },
  adverb: { es: "adv.", en: "adv." },
  pronoun: { es: "pron.", en: "pron." },
  preposition: { es: "prep.", en: "prep." },
  conjunction: { es: "conj.", en: "conj." },
  interjection: { es: "interj.", en: "interj." },
  determiner: { es: "det.", en: "det." },
  numeral: { es: "num.", en: "num." },
  modal: { es: "mod.", en: "mod." },
};

export type Direction = "en_es" | "es_en";

/** Sentido atómico: una acepción concreta de un lema. */
export interface Sense {
  /** Identificador estable, p. ej. "mock-noun-bank-banco". */
  id: string;
  pos: PartOfSpeech;
  en: string;
  es: string;
}

/** Grupo presentado al jugador en una dirección. */
export interface Group {
  /** "en_es:noun:bank" o "es_en:noun:banco". Estable. */
  groupId: string;
  pos: PartOfSpeech;
  /** Lema origen en la dirección activa. */
  prompt: string;
  /** Lemas destino, length ∈ [1, 3] por §4.11 del funcional v3. */
  answers: string[];
  /** IDs de los sentidos atómicos que componen el grupo. */
  senseIds: string[];
}

export interface Catalog {
  version: string;
  source: string;
  license: string;
  senses: Sense[];
  en_es: Group[];
  es_en: Group[];
}
