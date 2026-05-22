import styles from "./Header.module.css";

type HeaderProps = {
  variant?: "home" | "turno";
};

export function Header({ variant = "home" }: HeaderProps) {
  return (
    <header className={styles.header} data-variant={variant}>
      <h1 className={`${styles.title} cursor`}>vocab-1000</h1>
      <button
        type="button"
        className={styles.info}
        aria-label="Acerca de"
        title="Acerca de"
      >
        <span aria-hidden="true">ⓘ</span>
      </button>
    </header>
  );
}
