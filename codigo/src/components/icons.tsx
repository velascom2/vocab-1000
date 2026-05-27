/**
 * SVG inline reutilizables — vocab-1000.
 *
 * Cumple cruce TEC-OU1 del kickoff: sin emojis Unicode en chrome de
 * producto. Trazo 1.6 por defecto, lineJoin/lineCap round, herencia
 * de `currentColor`. Viewbox 0 0 20 20 (excepto menu, 24 24).
 *
 * Todos los iconos aceptan `size` y `strokeWidth`. Decorativos por
 * defecto (`aria-hidden`); el chrome que los usa debe poner aria-label
 * en el botón contenedor cuando sea icon-only.
 */

type IconProps = {
  size?: number;
  strokeWidth?: number;
};

export function IconArrow({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 10h10M11 6l4 4-4 4" />
    </svg>
  );
}

export function IconRefresh({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10a7 7 0 0 1 12-5l2 2M17 4v4h-4M17 10a7 7 0 0 1-12 5l-2-2M3 16v-4h4" />
    </svg>
  );
}

export function IconSwap({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7h14M14 4l3 3-3 3" />
      <path d="M17 13H3M6 16l-3-3 3-3" />
    </svg>
  );
}

export function IconInfo({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M10 9v5M10 6.5v.5" />
    </svg>
  );
}

export function IconCheck({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}

export function IconCross({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function IconEye({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" />
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  );
}

export function IconPlay({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M6 4l10 6-10 6V4z" />
    </svg>
  );
}

export function IconComplete({ size = 20, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M6 10l3 3 6-6" />
    </svg>
  );
}

export function IconMenu({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6h12M4 12h16M4 18h10" />
    </svg>
  );
}

/** Flecha larga (24×12) — usada en el chip "ES → EN" de DirectionCard. */
export function IconArrowLong({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 12"
      width={size}
      height={size / 2}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 6h20M17 1.5L21.5 6 17 10.5" />
    </svg>
  );
}
