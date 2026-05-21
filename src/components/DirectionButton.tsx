import Link from "next/link";
import styles from "./DirectionButton.module.css";

type DirectionButtonProps = {
  from: string;
  to: string;
  href: string;
};

export function DirectionButton({ from, to, href }: DirectionButtonProps) {
  return (
    <Link href={href} className={styles.button}>
      <span className={styles.label}>
        {from} <span aria-hidden="true">→</span> {to}
      </span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}
