import Link from "next/link";
import styles from "./Header.module.css";

type HeaderProps = {
  variant?: "home" | "turno";
};

export function Header({ variant = "home" }: HeaderProps) {
  return (
    <header className={styles.header} data-variant={variant}>
      <h1 className={`${styles.title} cursor`}>vocab-1000</h1>
      <Link
        href="/acerca-de"
        className={styles.info}
        aria-label="Acerca de"
        title="Acerca de"
      >
        <span aria-hidden="true">ⓘ</span>
      </Link>
    </header>
  );
}
