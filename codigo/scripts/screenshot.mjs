#!/usr/bin/env node
/**
 * Screenshots del piloto vocab-1000 con device emulation real (Playwright).
 * Sirve el build estático en http://localhost:3100/ y captura:
 *   - HOME
 *   - TURNO-1 (prompt visible, antes de revelar)
 *   - TURNO-2 length=1 (monosémico)
 *   - TURNO-2 length=2 (2 acepciones inline)
 *   - TURNO-2 length=3 (3 acepciones vertical)
 *   - Fin Ronda
 * en 3 viewports: desktop / tablet (iPad gen 7) / mobile (iPhone 13).
 */

import { chromium, devices } from "@playwright/test";

const BASE = process.env.SCREENSHOT_BASE || "http://localhost:3100";
const OUT = process.env.SCREENSHOT_OUT || "/tmp/vocab-mockup";

const viewports = [
  { name: "desktop", device: { viewport: { width: 1200, height: 800 } } },
  { name: "tablet", device: devices["iPad (gen 7)"] },
  { name: "mobile", device: devices["iPhone 13"] },
];

async function capturePages(page, prefix) {
  // HOME
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/${prefix}-home.png`, fullPage: true });
  console.log(`OK · ${prefix}-home.png`);

  // Navegar a jugar
  await page.goto(`${BASE}/jugar/en-es/`, { waitUntil: "networkidle" });

  // TURNO-1 (prompt visible)
  await page.screenshot({ path: `${OUT}/${prefix}-turno1.png`, fullPage: true });
  console.log(`OK · ${prefix}-turno1.png`);

  // Recorre los grupos buscando length 1, 2, 3 para capturar las 3 variantes.
  const captured = { 1: false, 2: false, 3: false };
  let maxIterations = 20;
  while ((!captured[1] || !captured[2] || !captured[3]) && maxIterations-- > 0) {
    const mostrar = page.getByRole("button", { name: /Mostrar traducción/i });
    if ((await mostrar.count()) === 0) break;
    await mostrar.click();
    // Esperar a que la lista renderice + animación fade-in (~150ms)
    await page.waitForSelector("ul[data-length]");
    await page.waitForTimeout(250);
    const length = await page.locator("ul[data-length]").getAttribute("data-length");
    if (length && !captured[length]) {
      const file = `${OUT}/${prefix}-turno2-len${length}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log(`OK · ${prefix}-turno2-len${length}.png`);
      captured[length] = true;
    }
    const acerte = page.getByRole("button", { name: /Acerté/ });
    await acerte.click();
    // Si la ronda terminó, salimos del loop.
    const finVisible = await page.getByText(/¡Has completado/).count();
    if (finVisible > 0) break;
  }

  // Llegar a Fin de Ronda completando lo que quede.
  let safety = 30;
  while (safety-- > 0) {
    const finVisible = await page.getByText(/¡Has completado/).count();
    if (finVisible > 0) break;
    const mostrar = page.getByRole("button", { name: /Mostrar traducción/i });
    if ((await mostrar.count()) === 0) break;
    await mostrar.click();
    await page.getByRole("button", { name: /Acerté/ }).click();
  }
  await page.screenshot({ path: `${OUT}/${prefix}-fin.png`, fullPage: true });
  console.log(`OK · ${prefix}-fin.png`);
}

const browser = await chromium.launch();
for (const v of viewports) {
  const context = await browser.newContext({ ...v.device });
  const page = await context.newPage();
  await capturePages(page, v.name);
  await context.close();
}
await browser.close();
