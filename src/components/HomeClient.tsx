"use client";

import { DirectionButton } from "@/components/DirectionButton";
import { DirectionCard } from "@/components/DirectionCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useHydrated } from "@/lib/use-hydrated";
import { useGameStore } from "@/store/game";
import styles from "@/app/page.module.css";

/**
 * HOME del producto. Renderiza HOME-A/B/C según el progreso persistido.
 *
 * - HOME-A: sin progreso en ninguna dirección. Selector limpio.
 * - HOME-B: progreso en una dirección + estado vacío en la otra.
 * - HOME-C: progreso en ambas. Dos cards apiladas.
 *
 * Antes de hidratar, renderiza un esqueleto neutro (idéntico a HOME-A
 * con el tagline pero sin los botones reactivos) para evitar layout shift
 * y hydration mismatch.
 */
export function HomeClient() {
  const hydrated = useHydrated();
  const directions = useGameStore((s) => s.directions);

  const hasEnEs = Boolean(directions.en_es);
  const hasEsEn = Boolean(directions.es_en);

  const variant: "A" | "B" | "C" = !hydrated
    ? "A"
    : hasEnEs && hasEsEn
      ? "C"
      : hasEnEs || hasEsEn
        ? "B"
        : "A";

  return (
    <div className={styles.app}>
      <Header variant="home" />
      <main className={styles.main}>
        <h2 className={styles.tagline}>
          <span className={styles.taglinePrefix} aria-hidden="true">
            &gt;
          </span>
          Aprende vocabulario
          <br />
          de las palabras más usadas
        </h2>

        {variant === "A" && (
          <>
            <p className={styles.intro}>// Elige cómo quieres jugar</p>
            <nav className={styles.directions} aria-label="Elegir dirección de juego">
              <DirectionButton from="Español" to="Inglés" href="/jugar/es-en" />
              <DirectionButton from="Inglés" to="Español" href="/jugar/en-es" />
            </nav>
          </>
        )}

        {variant !== "A" && (
          <>
            <p className={styles.intro}>// Retoma o empieza una dirección</p>
            <div className={styles.cards}>
              <DirectionCard direction="es_en" from="Español" to="Inglés" />
              <DirectionCard direction="en_es" from="Inglés" to="Español" />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
