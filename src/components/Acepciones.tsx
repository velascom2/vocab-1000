import { POS_LABEL_FULL, POS_LABEL_SHORT, type Direction, type PartOfSpeech } from "@/catalog/types";
import styles from "./Acepciones.module.css";

type AcepcionesProps = {
  answers: string[];
  pos: PartOfSpeech;
  /** Idioma destino de la dirección activa: en→es destino "es", es→en destino "en". */
  destLang: "es" | "en";
};

/**
 * Renderiza el conjunto de acepciones reveladas en TURNO-2 según ux.md v2 §4.5.
 * - length === 1: render lineal (sin viñeta).
 * - length === 2: inline, separadas por " · ".
 * - length === 3: lista vertical centrada.
 * Tipo gramatical único por grupo, mostrado al final.
 *
 * Marcado siempre semántico <ul>; CSS decide inline vs vertical según data-length.
 * Cap operativo §4.11 del funcional v3: length > 3 nunca debe pasar en runtime.
 */
export function Acepciones({ answers, pos, destLang }: AcepcionesProps) {
  if (answers.length > 3) {
    throw new Error(
      `Violación §4.11 funcional v3: answers.length=${answers.length} excede el cap operativo de 3.`,
    );
  }
  const length = answers.length as 1 | 2 | 3;
  const posLabelFull = POS_LABEL_FULL[pos][destLang];
  const posLabelShort = POS_LABEL_SHORT[pos][destLang];

  return (
    <div className={styles.container} aria-live="polite">
      <ul className={styles.list} data-length={length}>
        {answers.map((answer) => (
          <li key={answer} className={styles.item}>
            {answer}
          </li>
        ))}
      </ul>
      <p className={styles.pos} aria-label={posLabelFull}>
        <span aria-hidden="true">· </span>
        <span className={styles.posShort}>{posLabelShort}</span>
        <span className={styles.posFull}>{` (${posLabelFull})`}</span>
      </p>
    </div>
  );
}

export type { Direction };
