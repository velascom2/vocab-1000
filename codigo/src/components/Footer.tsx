import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.attribution}>
        Vocabulario derivado de NGSL · CC BY-SA 4.0
      </p>
    </footer>
  );
}
