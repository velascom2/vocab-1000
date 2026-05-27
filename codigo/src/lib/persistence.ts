"use client";

/**
 * Capa de persistencia local — IndexedDB (idb-keyval) con fallback a LocalStorage,
 * y modo "memory-only" cuando ninguno funciona.
 *
 * Origen: tecnica.md v2 §3 (persistencia local del progreso) + HU-010 (aviso al
 * jugador cuando no se puede persistir).
 *
 * API:
 *   detectStorage(): Promise<StorageMode>
 *   load<T>(key, fallback): Promise<T>
 *   save<T>(key, value): Promise<void>
 */

import { del, get, set } from "idb-keyval";

export type StorageMode = "idb" | "ls" | "memory-only";

const PROBE_KEY = "__vocab1000_probe__";
const PROBE_VALUE = "ok";

const memoryStore = new Map<string, unknown>();

let cachedMode: StorageMode | null = null;

async function probeIdb(): Promise<boolean> {
  try {
    await set(PROBE_KEY, PROBE_VALUE);
    const v = await get<string>(PROBE_KEY);
    await del(PROBE_KEY);
    return v === PROBE_VALUE;
  } catch {
    return false;
  }
}

function probeLs(): boolean {
  try {
    window.localStorage.setItem(PROBE_KEY, PROBE_VALUE);
    const v = window.localStorage.getItem(PROBE_KEY);
    window.localStorage.removeItem(PROBE_KEY);
    return v === PROBE_VALUE;
  } catch {
    return false;
  }
}

/** Detecta el modo de almacenamiento disponible. Cachea el resultado. */
export async function detectStorage(): Promise<StorageMode> {
  if (cachedMode) return cachedMode;
  if (typeof window === "undefined") {
    cachedMode = "memory-only";
    return cachedMode;
  }
  if (await probeIdb()) {
    cachedMode = "idb";
    return cachedMode;
  }
  if (probeLs()) {
    cachedMode = "ls";
    return cachedMode;
  }
  cachedMode = "memory-only";
  return cachedMode;
}

/** Carga un valor; si no existe o falla, devuelve el fallback. */
export async function load<T>(key: string, fallback: T): Promise<T> {
  const mode = await detectStorage();
  try {
    if (mode === "idb") {
      const v = await get<T>(key);
      return v ?? fallback;
    }
    if (mode === "ls") {
      const raw = window.localStorage.getItem(key);
      return raw == null ? fallback : (JSON.parse(raw) as T);
    }
    return (memoryStore.get(key) as T | undefined) ?? fallback;
  } catch {
    return fallback;
  }
}

/** Guarda un valor de forma asíncrona; los fallos son silenciosos (memory-only). */
export async function save<T>(key: string, value: T): Promise<void> {
  const mode = await detectStorage();
  try {
    if (mode === "idb") {
      await set(key, value);
      return;
    }
    if (mode === "ls") {
      window.localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    memoryStore.set(key, value);
  } catch {
    // Silencioso — si falla, el estado en memoria es la fuente de verdad
    // y el aviso al jugador lo da el banner memory-only (HU-010 en Fase 5).
  }
}
