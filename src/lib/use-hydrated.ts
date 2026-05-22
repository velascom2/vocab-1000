"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/game";

/**
 * Llama a bootstrap() del store al primer mount.
 * Devuelve true cuando el estado ha sido leído desde persistencia.
 *
 * Antes de hydrated=true, el componente debe renderizar un estado neutro
 * (loading, placeholder) para evitar hydration mismatch — la lectura de
 * IDB/LS es asíncrona y server-side no la conoce.
 */
export function useHydrated(): boolean {
  const hydrated = useGameStore((s) => s.hydrated);
  const bootstrap = useGameStore((s) => s.bootstrap);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  return hydrated;
}
