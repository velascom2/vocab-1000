import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Acerca de · vocab-1000",
};

export default function AcercaDePage() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <h2 className={styles.heading}>Acerca de</h2>

        <section className={styles.section}>
          <h3 className={styles.subheading}>Vocabulario</h3>
          <p>
            Las palabras de este juego proceden del{" "}
            <a
              href="http://www.newgeneralservicelist.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              New General Service List (NGSL)
            </a>
            , una lista de las palabras más frecuentes del inglés, desarrollada
            por Charles Browne, Brent Culligan y Joseph Phillips.
          </p>
          <p className={styles.license}>
            Licencia:{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              CC BY-SA 4.0
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h3 className={styles.subheading}>Producto</h3>
          <p>vocab-1000 — piloto del sistema churrerIA.</p>
        </section>

        <Link href="/" className={styles.closeBtn}>
          ← Volver
        </Link>
      </main>
      <Footer />
    </div>
  );
}
