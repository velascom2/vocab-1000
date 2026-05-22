"use client";

import { useEffect } from "react";
import styles from "./error.module.css";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container} role="alert">
      <p className={styles.message}>
        No se ha podido cargar el juego.<br />
        Recarga la página o vuelve a intentarlo más tarde.
      </p>
      <button type="button" className={styles.retryBtn} onClick={unstable_retry}>
        Reintentar
      </button>
    </div>
  );
}
