import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>vocab-1000</h1>
      <p className={styles.subtitle}>
        Aprende vocabulario de las palabras más usadas
      </p>
      <p className={styles.placeholder}>
        Setup inicial · Fase 1 de etapa 4 · UI completa en fases siguientes.
      </p>
    </main>
  );
}
