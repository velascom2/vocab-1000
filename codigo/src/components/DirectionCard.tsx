"use client";

import Link from "next/link";
import { useState } from "react";
import type { Direction } from "@/catalog/types";
import { useGameStore } from "@/store/game";
import { Button } from "./Button";
import { Modal } from "./Modal";
import styles from "./DirectionCard.module.css";

type CardProps = {
  direction: Direction;
  from: string;
  to: string;
};

const URL_SLUG: Record<Direction, string> = {
  en_es: "en-es",
  es_en: "es-en",
};

/**
 * Card de dirección para HOME-B/C: muestra el progreso de una dirección
 * con acciones Continuar / Reiniciar. Si la dirección no tiene progreso,
 * muestra el estado vacío con "+ Empezar".
 */
export function DirectionCard({ direction, from, to }: CardProps) {
  const ds = useGameStore((s) => s.directions[direction]);
  const total = useGameStore((s) => s.totalForDirection(direction));
  const resetDirection = useGameStore((s) => s.resetDirection);

  const [resetModalOpen, setResetModalOpen] = useState(false);

  if (!ds) {
    // Estado vacío — card "Aún no has empezado"
    return (
      <article className={styles.cardEmpty}>
        <p className={styles.dirLabel}>
          {from} <span aria-hidden="true">→</span> {to}
        </p>
        <p className={styles.emptyText}>Aún no has empezado</p>
        <Link href={`/jugar/${URL_SLUG[direction]}`} className={styles.linkPrimary}>
          + Empezar en {from} → {to}
        </Link>
      </article>
    );
  }

  const isCompleted = ds.pending.length === 0;
  const porcentaje = ((ds.correct.length / Math.max(ds.turns, 1)) * 100).toFixed(0);

  return (
    <article className={styles.card}>
      <p className={styles.dirLabel}>
        {from} <span aria-hidden="true">→</span> {to}
        {isCompleted && (
          <span className={styles.completedBadge} aria-label="Completada">
            ✓ Completada
          </span>
        )}
      </p>
      <div className={styles.stats}>
        <span className={styles.score}>
          {ds.correct.length}
          <span className={styles.dim}>/</span>
          {total}
        </span>
        <span className={styles.dim}> · </span>
        <span className={styles.turns}>{ds.turns} turnos</span>
        {isCompleted && (
          <>
            <span className={styles.dim}> · </span>
            <span className={styles.percent}>{porcentaje}%</span>
          </>
        )}
      </div>
      <div className={styles.actions}>
        <Link href={`/jugar/${URL_SLUG[direction]}`} className={styles.linkPrimary}>
          ▸ {isCompleted ? "Volver a empezar" : "Continuar"}
        </Link>
        <Button variant="secondary" onClick={() => setResetModalOpen(true)} icon="↻">
          Reiniciar
        </Button>
      </div>

      <Modal
        open={resetModalOpen}
        title={`¿Reiniciar la ronda de ${from} → ${to}?`}
        body={
          <>
            Tu progreso actual (<strong>{ds.correct.length} / {total}</strong>) se
            perderá. La otra dirección no se toca.
          </>
        }
        confirmLabel="Sí, reiniciar"
        confirmVariant="danger"
        onConfirm={() => {
          resetDirection(direction);
          setResetModalOpen(false);
        }}
        onCancel={() => setResetModalOpen(false)}
      />
    </article>
  );
}
