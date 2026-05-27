"use client";

import { useRouter } from "next/navigation";
import type { Direction } from "@/catalog/types";
import { useGameStore } from "@/store/game";
import { ProgressDual } from "./ProgressDual";
import styles from "./DirectionSwitch.module.css";

const DIRECTION_HREF: Record<Direction, string> = {
  en_es: "/jugar/en-es",
  es_en: "/jugar/es-en",
};

const LABELS: Record<Direction, { short: string; from: string; to: string }> = {
  en_es: { short: "EN→ES", from: "Inglés", to: "Español" },
  es_en: { short: "ES→EN", from: "Español", to: "Inglés" },
};

/**
 * Control compuesto del header del turno (HU-006 + UX-OT5).
 * Muestra la dirección activa con su progreso, y debajo un mini-progreso
 * de la otra dirección con el control de inversión. Pulsar invierte.
 */
export function DirectionSwitch() {
  const router = useRouter();
  const activeDirection = useGameStore((s) => s.activeDirection);
  const directions = useGameStore((s) => s.directions);
  const totalFor = useGameStore((s) => s.totalForDirection);

  if (!activeDirection) return null;
  const other: Direction = activeDirection === "en_es" ? "es_en" : "en_es";

  const activeState = directions[activeDirection];
  const otherState = directions[other];

  const ariaLabel = `Cambiar a ${LABELS[other].from} → ${LABELS[other].to}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.active}>
        <span className={styles.dirShort}>{LABELS[activeDirection].short}</span>
        <ProgressDual
          acertadas={activeState?.correct.length ?? 0}
          total={totalFor(activeDirection)}
          turnos={activeState?.turns ?? 0}
        />
      </div>
      <button
        type="button"
        onClick={() => router.push(DIRECTION_HREF[other], { scroll: false })}
        className={styles.switchBtn}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <span className={styles.swapIcon} aria-hidden="true">
          ↕
        </span>
        <span className={styles.otherInfo}>
          <span className={styles.dirShort}>{LABELS[other].short}</span>
          <span className={styles.miniProgress}>
            {otherState ? `${otherState.correct.length}/${totalFor(other)}` : `0/${totalFor(other)}`}
          </span>
        </span>
      </button>
    </div>
  );
}
