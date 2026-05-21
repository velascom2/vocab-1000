import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "./page.module.css";

type Direction = "es-en" | "en-es";

const DIRECTIONS: Record<Direction, { from: string; to: string }> = {
  "es-en": { from: "Español", to: "Inglés" },
  "en-es": { from: "Inglés", to: "Español" },
};

export function generateStaticParams() {
  return [{ direction: "es-en" }, { direction: "en-es" }];
}

export default async function JugarPage({
  params,
}: {
  params: Promise<{ direction: string }>;
}) {
  const { direction } = await params;
  if (direction !== "es-en" && direction !== "en-es") {
    notFound();
  }
  const dir = DIRECTIONS[direction as Direction];

  return (
    <div className={styles.app}>
      <Header variant="turno" />
      <main className={styles.main}>
        <p className={styles.directionLabel}>
          {dir.from} <span aria-hidden="true">→</span> {dir.to}
        </p>
        <p className={styles.placeholder}>
          La pantalla de turno se construye en la <strong>Fase 3</strong> de
          esta etapa.
        </p>
        <Link href="/" className={styles.back}>
          ← Volver a inicio
        </Link>
      </main>
      <Footer />
    </div>
  );
}
