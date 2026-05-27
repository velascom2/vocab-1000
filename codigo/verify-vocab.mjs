import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const SHOTS = '/tmp/vocab-shots';
mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();

const shot = async (name) => {
  await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: false });
  console.log(`📸 ${name}`);
};

const results = [];
const ok  = (msg) => { results.push(`✅ ${msg}`); console.log(`✅ ${msg}`); };
const fail = (msg) => { results.push(`❌ ${msg}`); console.log(`❌ ${msg}`); };

// ── 1. HOME-A ──────────────────────────────────────────────
await page.goto('http://localhost:3001/');
await page.waitForLoadState('networkidle');
await shot('01-home-a');

const btnEnEs = page.getByRole('link', { name: /inglés.*español/i });
const btnEsEn = page.getByRole('link', { name: /español.*inglés/i });
if (await btnEnEs.isVisible() && await btnEsEn.isVisible()) {
  ok('HOME-A: dos botones de dirección visibles');
} else {
  fail('HOME-A: botones de dirección no encontrados');
}

const banner = page.locator('[role="status"]');
if (await banner.count() === 0 || !(await banner.isVisible())) {
  ok('Banner memory-only: ausente en Chrome normal');
} else {
  fail('Banner memory-only: aparece cuando no debería');
}

// ── 2. TURNO — jugar 4 turnos ──────────────────────────────
await page.goto('http://localhost:3001/jugar/en-es');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(600); // hidratación store
await shot('02-turno-1-prompt');

const btnMostrar = page.getByRole('button', { name: /mostrar traducción/i });
if (await btnMostrar.isVisible()) {
  ok('TURNO-1: botón "Mostrar traducción" visible');
} else {
  fail('TURNO-1: botón "Mostrar traducción" no visible');
}

// 4 turnos alternando acerté/fallé
for (let i = 0; i < 4; i++) {
  await page.getByRole('button', { name: /mostrar traducción/i }).click();
  await page.waitForTimeout(200);
  if (i % 2 === 0) {
    await page.getByRole('button', { name: /acerté/i }).click();
  } else {
    await page.getByRole('button', { name: /fallé/i }).click();
  }
  await page.waitForTimeout(200);
}
await shot('02-turno-tras-4-rondas');
ok('TURNO: 4 turnos jugados (2 acerté, 2 fallé)');

// ── 3. Recargar → HOME-B ───────────────────────────────────
await page.goto('http://localhost:3001/');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(800);
await shot('03-home-b');

const card = page.locator('[class*="card"]').first();
const hasCard = await card.count() > 0 && await card.isVisible();
// Alternativa: verificar que ya no están los botones de HOME-A
const stillHomeA = await btnEnEs.isVisible().catch(() => false);
if (hasCard || !stillHomeA) {
  ok('HOME-B: progreso persistido (no muestra HOME-A tras jugar)');
} else {
  fail('HOME-B: sigue mostrando HOME-A, persistencia no funciona');
}

// ── 4. Switch de dirección mid-game ────────────────────────
await page.goto('http://localhost:3001/jugar/en-es');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(600);

const switchBtn = page.locator('button[aria-label*="Cambiar"]').or(
  page.locator('button[title*="Cambiar"]')
).first();
const urlAntes = page.url();
if (await switchBtn.isVisible()) {
  await switchBtn.click();
  await page.waitForTimeout(600);
  const urlDespues = page.url();
  await shot('04-switch-direction');
  if (urlDespues.includes('es-en')) {
    ok(`Switch dirección: navegó a ${urlDespues}`);
  } else {
    fail(`Switch dirección: URL no cambió (${urlDespues})`);
  }
} else {
  fail('Switch dirección: botón no encontrado');
}

// ── 5. Página Acerca de ────────────────────────────────────
await page.goto('http://localhost:3001/');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(400);

const infoLink = page.locator('a[aria-label="Acerca de"]').or(
  page.locator('a[title="Acerca de"]')
).first();
if (await infoLink.isVisible()) {
  await infoLink.click();
  await page.waitForURL('**/acerca-de**');
  await shot('05-acerca-de');
  const body = await page.textContent('main');
  if (body?.includes('NGSL') && body?.includes('CC BY-SA')) {
    ok('Acerca de: contiene atribución NGSL y licencia CC BY-SA 4.0');
  } else {
    fail('Acerca de: falta texto NGSL o CC BY-SA');
  }
  // Botón Volver
  const volver = page.getByRole('link', { name: /volver/i });
  if (await volver.isVisible()) {
    await volver.click();
    await page.waitForURL('http://localhost:3001/');
    await shot('06-home-desde-acerca-de');
    ok('Acerca de → Volver: llega a HOME');
  } else {
    fail('Acerca de: botón Volver no encontrado');
  }
} else {
  fail('Header ⓘ: link Acerca de no encontrado');
}

await browser.close();

console.log('\n── Resumen ──');
results.forEach(r => console.log(r));
