#!/usr/bin/env node
/**
 * Screenshots del piloto vocab-1000 con device emulation real (Playwright).
 * Sirve el build estático en http://localhost:3100/ y captura desktop / tablet / mobile.
 */

import { chromium, devices } from "@playwright/test";

const BASE = process.env.SCREENSHOT_BASE || "http://localhost:3100";
const OUT = process.env.SCREENSHOT_OUT || "/tmp/vocab-mockup";

const targets = [
  { name: "desktop", device: { viewport: { width: 1200, height: 800 } }, paths: ["/", "/jugar/es-en/"] },
  { name: "tablet", device: devices["iPad (gen 7)"], paths: ["/", "/jugar/es-en/"] },
  { name: "mobile", device: devices["iPhone 13"], paths: ["/", "/jugar/es-en/"] },
];

const browser = await chromium.launch();
for (const t of targets) {
  const context = await browser.newContext({ ...t.device });
  const page = await context.newPage();
  for (const path of t.paths) {
    const slug = path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replace(/\//g, "-");
    const file = `${OUT}/${slug}-${t.name}.png`;
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.screenshot({ path: file, fullPage: true });
    console.log(`OK · ${file}`);
  }
  await context.close();
}
await browser.close();
