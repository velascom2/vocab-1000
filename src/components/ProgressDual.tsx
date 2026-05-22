import styles from "./ProgressDual.module.css";

type ProgressDualProps = {
  acertadas: number;
  total: number;
  turnos: number;
};

export function ProgressDual({ acertadas, total, turnos }: ProgressDualProps) {
  return (
    <div className={styles.progress} aria-label={`${acertadas} de ${total} acertadas, ${turnos} turnos jugados`}>
      <span className={styles.score}>
        {acertadas}
        <span className={styles.divider}>/</span>
        {total}
      </span>
      <span className={styles.dot} aria-hidden="true">
        ·
      </span>
      <span className={styles.turnos}>{turnos}t</span>
    </div>
  );
}
