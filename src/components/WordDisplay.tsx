import styles from "./WordDisplay.module.css";

type WordDisplayProps = {
  prompt: string;
};

export function WordDisplay({ prompt }: WordDisplayProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.word}>{prompt}</h2>
    </div>
  );
}
