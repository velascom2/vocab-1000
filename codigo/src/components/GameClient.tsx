"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Direction } from "@/catalog/types";
import { useHydrated } from "@/lib/use-hydrated";
import { useGameStore } from "@/store/game";
import { Acepciones } from "./Acepciones";
import { Button } from "./Button";
import { DirectionSwitch } from "./DirectionSwitch";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Modal } from "./Modal";
import { WordDisplay } from "./WordDisplay";
import styles from "./GameClient.module.css";

type GameClientProps = {
  initialDirection: Direction;
};

const DIRECTION_LABEL: Record<Direction, { from: string; to: string; destLang: "es" | "en" }> = {
  en_es: { from: "Inglés", to: "Español", destLang: "es" },
  es_en: { from: "Español", to: "Inglés", destLang: "en" },
};

export function GameClient({ initialDirection }: GameClientProps) {
  const hydrated = useHydrated();

  const activeDirection = useGameStore((s) => s.activeDirection);
  const directions = useGameStore((s) => s.directions);
  const phase = useGameStore((s) => s.phase);
  const startDirection = useGameStore((s) => s.startDirection);
  const reveal = useGameStore((s) => s.reveal);
  const markAcerte = useGameStore((s) => s.markAcerte);
  const markFalle = useGameStore((s) => s.markFalle);
  const resetDirection = useGameStore((s) => s.resetDirection);
  const currentGroupFn = useGameStore((s) => s.currentGroup);
  const totalFor = useGameStore((s) => s.totalForDirection);

  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Tras hydrate: si la dirección activa no coincide con la URL, inicializa la URL.
  useEffect(() => {
    if (!hydrated) return;
    if (activeDirection !== initialDirection) {
      startDirection(initialDirection);
    }
  }, [hydrated, activeDirection, initialDirection, startDirection]);

  if (!hydrated) {
    return (
      <div className={styles.app}>
        <Header variant="turno" />
        <main className={styles.turnoMain}>
          <p className={styles.loading}>Cargando…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!activeDirection) return null; // Aún inicializando

  const label = DIRECTION_LABEL[activeDirection];
  const directionState = directions[activeDirection];
  const total = totalFor(activeDirection);
  const correct = directionState?.correct.length ?? 0;
  const turns = directionState?.turns ?? 0;
  const current = currentGroupFn();
  const finished = directionState !== undefined && directionState.pending.length === 0;

  // Fin de ronda
  if (finished) {
    const porcentajeAciertos = ((correct / Math.max(turns, 1)) * 100).toFixed(1);
    return (
      <div className={styles.app}>
        <Header variant="turno" />
        <main className={styles.finMain}>
          <div className={styles.finIcon} aria-hidden="true">
            ✨
          </div>
          <h2 className={styles.finTitle}>
            ¡Has completado
            <br />
            {label.from} → {label.to}!
          </h2>
          <div className={styles.finStats}>
            <p>
              <strong>{correct}</strong> palabras acertadas
            </p>
            <p>
              <strong>{turns}</strong> turnos jugados
            </p>
            <p>
              <strong>{porcentajeAciertos}%</strong> de aciertos
              <span className={styles.finStatsHint}> (sobre turnos jugados)</span>
            </p>
          </div>
          <div className={styles.finActions}>
            <Button
              variant="primary"
              fullWidth
              icon="↻"
              onClick={() => resetDirection(activeDirection)}
            >
              Volver a empezar
            </Button>
            <Link href="/" className={styles.linkButton}>
              ↔ Cambiar dirección
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!current) {
    return (
      <div className={styles.app}>
        <Header variant="turno" />
        <main className={styles.turnoMain}>
          <p className={styles.loading}>Cargando…</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Header variant="turno" />
      <div className={styles.turnoHeader}>
        <DirectionSwitch />
        <button
          type="button"
          className={styles.resetIcon}
          onClick={() => setResetModalOpen(true)}
          aria-label="Reiniciar ronda"
          title="Reiniciar ronda"
        >
          ↻
        </button>
      </div>

      <main className={styles.turnoMain}>
        <WordDisplay prompt={current.prompt} />

        {phase === "revealed" && (
          <Acepciones answers={current.answers} pos={current.pos} destLang={label.destLang} />
        )}

        <div className={styles.actions}>
          {phase === "prompt" ? (
            <Button variant="primary" fullWidth onClick={reveal}>
              Mostrar traducción
            </Button>
          ) : (
            <div className={styles.evalButtons}>
              <Button variant="success" icon="✓" onClick={markAcerte} fullWidth>
                Acerté
              </Button>
              <Button variant="danger" icon="✗" onClick={markFalle} fullWidth>
                Fallé
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <Modal
        open={resetModalOpen}
        title={`¿Reiniciar la ronda de ${label.from} → ${label.to}?`}
        body={
          <>
            Tu progreso actual (<strong>{correct} / {total}</strong>) se perderá. La otra
            dirección no se toca.
          </>
        }
        confirmLabel="Sí, reiniciar"
        confirmVariant="danger"
        onConfirm={() => {
          resetDirection(activeDirection);
          setResetModalOpen(false);
        }}
        onCancel={() => setResetModalOpen(false)}
      />
    </div>
  );
}
