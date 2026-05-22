/**
 * Helpers de aleatoriedad para la cola del juego.
 * Math.random aceptado como suficiente (decisión §4 funcional v3 / tecnica v2).
 */

/** Fisher-Yates shuffle in-place. Devuelve el mismo array. */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j] as T, arr[i] as T];
  }
  return arr;
}

/**
 * Reinserta un elemento en una posición aleatoria entre las pendientes
 * restantes, excluyendo posición 0 (no inmediata) y N (no última)
 * cuando hay suficientes elementos. Si pending.length === 0 tras Fallé,
 * vuelve a quedar el mismo elemento (VB-07 — aceptable).
 */
export function reinsertRandom<T>(pending: T[], item: T): T[] {
  if (pending.length === 0) {
    return [item];
  }
  if (pending.length === 1) {
    return [pending[0] as T, item];
  }
  const minIdx = 1;
  const maxIdx = pending.length;
  const idx = minIdx + Math.floor(Math.random() * (maxIdx - minIdx));
  return [...pending.slice(0, idx), item, ...pending.slice(idx)];
}
