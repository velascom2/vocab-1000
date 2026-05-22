"use client";

/**
 * Store global del estado del juego — vocab-1000.
 *
 * Diseño según tecnica.md v2 §3.4:
 *  - Estado dual independiente por dirección (`en_es` + `es_en`).
 *  - Persistencia indexada por `groupId` (no por `senseId`), schema v2.
 *  - Shape espejo del recurso REST `GET /me/progress` de fase 2 (R-04).
 *
 * Implementación: Zustand con suscripción a la capa de persistencia
 * (IDB+LS fallback) que carga al primer mount y guarda con debounce
 * tras cada acción que muta progreso.
 */

import { create } from "zustand";
import { catalog as mockCatalog } from "@/catalog/data/catalog";
import type { Direction, Group } from "@/catalog/types";
import { detectStorage, load, save, type StorageMode } from "@/lib/persistence";
import { reinsertRandom, shuffle } from "@/lib/shuffle";

const STORAGE_KEY = "vocab1000.progress";
const SAVE_DEBOUNCE_MS = 200;

export type Phase = "prompt" | "revealed";

export interface DirectionState {
  /** Cola pendiente de groupIds. */
  pending: string[];
  /** GroupIds ya acertados en esta ronda. */
  correct: string[];
  /** Turnos jugados en la ronda actual. */
  turns: number;
  /** ISO 8601 (UTC) de cuándo se inicializó. */
  startedAt: string;
}

export interface PersistedProgress {
  schemaVersion: 2;
  catalogVersion: string;
  activeDirection: Direction | null;
  directions: Partial<Record<Direction, DirectionState>>;
  lastModified: string;
}

const EMPTY_PROGRESS: PersistedProgress = {
  schemaVersion: 2,
  catalogVersion: mockCatalog.version,
  activeDirection: null,
  directions: {},
  lastModified: new Date(0).toISOString(),
};

function groupsForDirection(direction: Direction): Group[] {
  return direction === "en_es" ? mockCatalog.en_es : mockCatalog.es_en;
}

function findGroup(direction: Direction, groupId: string): Group | undefined {
  return groupsForDirection(direction).find((g) => g.groupId === groupId);
}

function makeFreshDirection(direction: Direction): DirectionState {
  const all = groupsForDirection(direction);
  return {
    pending: shuffle(all.map((g) => g.groupId)),
    correct: [],
    turns: 0,
    startedAt: new Date().toISOString(),
  };
}

interface GameStore {
  // Estado persistido
  schemaVersion: 2;
  catalogVersion: string;
  activeDirection: Direction | null;
  directions: Partial<Record<Direction, DirectionState>>;
  lastModified: string;

  // Estado no persistido (UI)
  hydrated: boolean;
  phase: Phase;
  storageMode: StorageMode | null;

  // Acciones
  bootstrap: () => Promise<void>;
  startDirection: (direction: Direction) => void;
  reveal: () => void;
  markAcerte: () => void;
  markFalle: () => void;
  switchDirection: () => void;
  resetDirection: (direction: Direction) => void;

  // Selectores derivados
  currentGroup: () => Group | null;
  totalForDirection: (direction: Direction) => number;
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;

function schedulePersist(state: PersistedProgress): void {
  if (typeof window === "undefined") return;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    void save(STORAGE_KEY, state);
  }, SAVE_DEBOUNCE_MS);
}

function snapshotPersist(s: GameStore): PersistedProgress {
  return {
    schemaVersion: s.schemaVersion,
    catalogVersion: s.catalogVersion,
    activeDirection: s.activeDirection,
    directions: s.directions,
    lastModified: new Date().toISOString(),
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...EMPTY_PROGRESS,
  hydrated: false,
  phase: "prompt",
  storageMode: null,

  bootstrap: async () => {
    if (get().hydrated) return;
    const mode = await detectStorage();
    const loaded = await load<PersistedProgress>(STORAGE_KEY, EMPTY_PROGRESS);
    // Migración / invalidación si el catálogo cambió
    const valid =
      loaded.schemaVersion === 2 && loaded.catalogVersion === mockCatalog.version;
    set({
      schemaVersion: 2,
      catalogVersion: mockCatalog.version,
      activeDirection: valid ? loaded.activeDirection : null,
      directions: valid ? loaded.directions : {},
      lastModified: loaded.lastModified,
      hydrated: true,
      phase: "prompt",
      storageMode: mode,
    });
  },

  startDirection: (direction) => {
    const state = get();
    const existing = state.directions[direction];
    const dir = existing ?? makeFreshDirection(direction);
    const next = {
      ...state,
      activeDirection: direction,
      directions: { ...state.directions, [direction]: dir },
      phase: "prompt" as Phase,
    };
    set(next);
    schedulePersist(snapshotPersist({ ...state, ...next } as GameStore));
  },

  reveal: () => {
    const state = get();
    if (state.phase === "prompt") set({ phase: "revealed" });
  },

  markAcerte: () => {
    const s = get();
    const dirKey = s.activeDirection;
    if (!dirKey) return;
    const ds = s.directions[dirKey];
    if (!ds || ds.pending.length === 0) return;
    const [head, ...rest] = ds.pending;
    if (!head) return;
    const next: DirectionState = {
      ...ds,
      pending: rest,
      correct: [...ds.correct, head],
      turns: ds.turns + 1,
    };
    set({
      directions: { ...s.directions, [dirKey]: next },
      phase: "prompt",
    });
    schedulePersist(snapshotPersist({ ...s, directions: { ...s.directions, [dirKey]: next } } as GameStore));
  },

  markFalle: () => {
    const s = get();
    const dirKey = s.activeDirection;
    if (!dirKey) return;
    const ds = s.directions[dirKey];
    if (!ds || ds.pending.length === 0) return;
    const [head, ...rest] = ds.pending;
    if (!head) return;
    const reinserted = reinsertRandom(rest, head);
    const next: DirectionState = {
      ...ds,
      pending: reinserted,
      turns: ds.turns + 1,
    };
    set({
      directions: { ...s.directions, [dirKey]: next },
      phase: "prompt",
    });
    schedulePersist(snapshotPersist({ ...s, directions: { ...s.directions, [dirKey]: next } } as GameStore));
  },

  switchDirection: () => {
    const s = get();
    if (!s.activeDirection) return;
    const newDirection: Direction = s.activeDirection === "en_es" ? "es_en" : "en_es";
    const existing = s.directions[newDirection];
    const dir = existing ?? makeFreshDirection(newDirection);
    const next = {
      activeDirection: newDirection,
      directions: { ...s.directions, [newDirection]: dir },
      phase: "prompt" as Phase,
    };
    set(next);
    schedulePersist(snapshotPersist({ ...s, ...next } as GameStore));
  },

  resetDirection: (direction) => {
    const s = get();
    const fresh = makeFreshDirection(direction);
    set({
      directions: { ...s.directions, [direction]: fresh },
      phase: "prompt",
    });
    schedulePersist(snapshotPersist({ ...s, directions: { ...s.directions, [direction]: fresh } } as GameStore));
  },

  currentGroup: () => {
    const s = get();
    if (!s.activeDirection) return null;
    const ds = s.directions[s.activeDirection];
    if (!ds || ds.pending.length === 0) return null;
    const firstId = ds.pending[0];
    if (!firstId) return null;
    return findGroup(s.activeDirection, firstId) ?? null;
  },

  totalForDirection: (direction) => groupsForDirection(direction).length,
}));
