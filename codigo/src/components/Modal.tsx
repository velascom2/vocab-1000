"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { Button } from "./Button";
import styles from "./Modal.module.css";

type ModalProps = {
  open: boolean;
  title: string;
  body: ReactNode;
  confirmLabel: string;
  confirmVariant?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Modal de confirmación basado en <dialog> HTML nativo (decisión TEC-OU2 del kickoff v1).
 * Focus trap automático del navegador, backdrop clickable, ESC cierra.
 */
export function Modal({
  open,
  title,
  body,
  confirmLabel,
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onCancel();
    };
    d.addEventListener("cancel", handleCancel);
    return () => d.removeEventListener("cancel", handleCancel);
  }, [onCancel]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClick={(e) => {
        // Click fuera del contenido (en el backdrop) cancela.
        if (e.target === dialogRef.current) onCancel();
      }}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.body}>{body}</div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
