#!/usr/bin/env node
/**
 * Screenshots de la styleguide del piloto vocab-1000.
 * Captura un PNG full-page por sección y otro de la página completa, en desktop (1400)
 * y mobile (iPhone 13), para embeber en acta-diseno.md.
 */

import { chromium, devices } from "@playwright/test";

const BASE = process.env.SCREENSHOT_BASE || "http://localhost:3100";
const OUT = process.env.SCREENSHOT_OUT || "/tmp/vocab-mockup";

const SECTIONS = [
  "colores",
  "tipografia",
  "espaciado",
  "radios-sombras",
  "iconografia",
  "botones",
  "inputs",
  "componentes",
  "banners",
  "layout",
];

const viewports = [
  { name: "desktop", device: { viewport: { width: 1400, height: 900 } } },
  { name: "mobile", device: devices["iPhone 13"] },
];

const browser = await chromium.launch();
for (const v of viewports) {
  const context = await browser.newContext({ ...v.device });
  const page = await context.newPage();
  await page.goto(`${BASE}/styleguide/`, { waitUntil: "networkidle" });

  // Screenshot full-page (vista completa)
  const fullFile = `${OUT}/styleguide-${v.name}-full.png`;
  await page.screenshot({ path: fullFile, fullPage: true });
  console.log(`OK · ${fullFile}`);

  // Screenshots por sección (desplazando a la sección y capturando un viewport)
  for (const section of SECTIONS) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }, section);
    await page.waitForTimeout(200);
    const file = `${OUT}/styleguide-${v.name}-${section}.png`;
    // Para secciones, capturamos solo el viewport visible (no fullPage)
    // así obtenemos cada sección como un "card" enfocado.
    const el = await page.$(`#${section}`);
    if (el) {
      await el.screenshot({ path: file });
      console.log(`OK · ${file}`);
    }
  }
  await context.close();
}
await browser.close();
