import { DirectionButton } from "@/components/DirectionButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.app}>
      <Header variant="home" />
      <main className={styles.main}>
        <h2 className={styles.tagline}>
          Aprende vocabulario
          <br />
          de las palabras más usadas
        </h2>
        <p className={styles.intro}>Elige cómo quieres jugar:</p>
        <nav className={styles.directions} aria-label="Elegir dirección de juego">
          <DirectionButton from="Español" to="Inglés" href="/jugar/es-en" />
          <DirectionButton from="Inglés" to="Español" href="/jugar/en-es" />
        </nav>
      </main>
      <Footer />
    </div>
  );
}
