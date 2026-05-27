import Link from "next/link";
import { IconInfo, IconMenu } from "./icons";
import styles from "./Header.module.css";

type HeaderProps = {
  variant?: "home" | "turno";
};

export function Header({ variant = "home" }: HeaderProps) {
  return (
    <header className={styles.header} data-variant={variant}>
      <Link href="/" className={styles.brand} aria-label="vocab-1000, ir a inicio">
        <span className={styles.mark} aria-hidden="true">
          <IconMenu />
        </span>
        <span className={styles.brandText}>
          vocab<span className={styles.brandNum}>·1000</span>
        </span>
      </Link>
      <Link
        href="/acerca-de"
        className={styles.info}
        aria-label="Acerca de"
        title="Acerca de"
      >
        <IconInfo size={20} />
      </Link>
    </header>
  );
}
