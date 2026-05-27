import Link from "next/link";
import { IconPlay } from "./icons";
import styles from "./DirectionButton.module.css";

type DirectionButtonProps = {
  from: string;
  to: string;
  href: string;
};

/**
 * Botón "Empezar X → Y" — variante A de la home (sin progreso). Verde
 * esmeralda píldora, icono play SVG inline, etiqueta serif del par.
 */
export function DirectionButton({ from, to, href }: DirectionButtonProps) {
  return (
    <Link href={href} className={styles.button}>
      <span className={styles.icon} aria-hidden="true">
        <IconPlay size={16} />
      </span>
      <span className={styles.label}>
        Empezar {from} <span aria-hidden="true">→</span> {to}
      </span>
    </Link>
  );
}
