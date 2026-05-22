"use client";

import { useGameStore } from "@/store/game";
import styles from "./MemoryOnlyBanner.module.css";

export function MemoryOnlyBanner() {
  const storageMode = useGameStore((s) => s.storageMode);

  if (storageMode !== "memory-only") return null;

  return (
    <div role="status" className={styles.banner}>
      Este navegador no guardará tu progreso entre sesiones.
    </div>
  );
}
