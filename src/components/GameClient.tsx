"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { mockCatalog } from "@/catalog/data/mock";
import type { Direction, Group } from "@/catalog/types";
import { reinsertRandom, shuffle } from "@/lib/shuffle";
import { Acepciones } from "./Acepciones";
import { Button } from "./Button";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Modal } from "./Modal";
import { ProgressDual } from "./ProgressDual";
import { WordDisplay } from "./WordDisplay";
import styles from "./GameClient.module.css";

type GameClientProps = {
  direction: Direction;
};

type Phase = "prompt" | "revealed" | "finished";

const DIRECTION_LABEL: Record<Direction, { from: string; to: string; destLang: "es" | "en" }> = {
  en_es: { from: "Inglés", to: "Español", destLang: "es" },
  es_en: { from: "Español", to: "Inglés", destLang: "en" },
};

function initialPending(direction: Direction): Group[] {
  const groups = direction === "en_es" ? mockCatalog.en_es : mockCatalog.es_en;
  return shuffle([...groups]);
}

export function GameClient({ direction }: GameClientProps) {
  const label = DIRECTION_LABEL[direction];

  const [pending, setPending] = useState<Group[]>(() => initialPending(direction));
  const [acertadas, setAcertadas] = useState<Group[]>([]);
  const [turnos, setTurnos] = useState(0);
  const [phase, setPhase] = useState<Phase>("prompt");
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const total = useMemo(
    () => (direction === "en_es" ? mockCatalog.en_es.length : mockCatalog.es_en.length),
    [direction],
  );
  const current = pending[0];

  function handleReveal() {
    if (phase === "prompt") setPhase("revealed");
  }

  function handleAcerte() {
    if (!current) return;
    const nextPending = pending.slice(1);
    const nextAcertadas = [...acertadas, current];
    const nextTurnos = turnos + 1;
    setAcertadas(nextAcertadas);
    setTurnos(nextTurnos);
    setPending(nextPending);
    setPhase(nextPending.length === 0 ? "finished" : "prompt");
  }

  function handleFalle() {
    if (!current) return;
    const rest = pending.slice(1);
    const nextPending = reinsertRandom(rest, current);
    setTurnos(turnos + 1);
    setPending(nextPending);
    setPhase("prompt");
  }

  function reset() {
    setPending(initialPending(direction));
    setAcertadas([]);
    setTurnos(0);
    setPhase("prompt");
    setResetModalOpen(false);
  }

  if (phase === "finished") {
    const porcentajeAciertos = ((acertadas.length / Math.max(turnos, 1)) * 100).toFixed(1);
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
              <strong>{acertadas.length}</strong> palabras acertadas
            </p>
            <p>
              <strong>{turnos}</strong> turnos jugados
            </p>
            <p>
              <strong>{porcentajeAciertos}%</strong> de aciertos
              <span className={styles.finStatsHint}> (sobre turnos jugados)</span>
            </p>
          </div>
          <div className={styles.finActions}>
            <Button variant="primary" fullWidth icon="↻" onClick={reset}>
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
    return <div className={styles.app}>Cargando…</div>;
  }

  return (
    <div className={styles.app}>
      <Header variant="turno" />
      <div className={styles.turnoHeader}>
        <span className={styles.directionLabel}>
          {label.from} <span aria-hidden="true">→</span> {label.to}
        </span>
        <ProgressDual acertadas={acertadas.length} total={total} turnos={turnos} />
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
            <Button variant="primary" fullWidth onClick={handleReveal}>
              Mostrar traducción
            </Button>
          ) : (
            <div className={styles.evalButtons}>
              <Button variant="success" icon="✓" onClick={handleAcerte} fullWidth>
                Acerté
              </Button>
              <Button variant="danger" icon="✗" onClick={handleFalle} fullWidth>
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
            Tu progreso actual (<strong>{acertadas.length} / {total}</strong>) se perderá. La otra
            dirección no se toca.
          </>
        }
        confirmLabel="Sí, reiniciar"
        confirmVariant="danger"
        onConfirm={reset}
        onCancel={() => setResetModalOpen(false)}
      />
    </div>
  );
}
