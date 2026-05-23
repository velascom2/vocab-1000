import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Audit WCAG 2.2 AA con axe-core (Issue #3).
 * Cubre las rutas estáticas + flujo de juego sin estado previo.
 * Tags axe-core: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa.
 */

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function scan(page: import("@playwright/test").Page, label: string) {
  const result = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  if (result.violations.length > 0) {
    console.log(`\n=== ${label} — ${result.violations.length} violación(es) ===`);
    for (const v of result.violations) {
      console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
      console.log(`    ${v.helpUrl}`);
      console.log(`    Nodos afectados: ${v.nodes.length}`);
    }
  }
  return result.violations;
}

test("HOME-A (sin progreso)", async ({ page, context }) => {
  await context.clearCookies();
  await page.addInitScript(() => {
    indexedDB.deleteDatabase("vocab-1000");
    localStorage.clear();
  });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(await scan(page, "HOME-A")).toEqual([]);
});

test("/acerca-de", async ({ page }) => {
  await page.goto("/acerca-de");
  await page.waitForLoadState("networkidle");
  expect(await scan(page, "/acerca-de")).toEqual([]);
});

test("/styleguide", async ({ page }) => {
  await page.goto("/styleguide");
  await page.waitForLoadState("networkidle");
  expect(await scan(page, "/styleguide")).toEqual([]);
});

test("/jugar/en-es TURNO-1", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/jugar/en-es");
  await page.waitForLoadState("networkidle");
  expect(await scan(page, "TURNO-1")).toEqual([]);
});

test("/jugar/en-es TURNO-2 (acepciones reveladas)", async ({ page }) => {
  await page.goto("/jugar/en-es");
  await page.waitForLoadState("networkidle");
  const mostrar = page.locator("button", { hasText: /mostrar/i });
  await mostrar.click();
  await page.waitForTimeout(200);
  expect(await scan(page, "TURNO-2")).toEqual([]);
});

// Pantalla "Fin de Ronda" NO se escanea automáticamente:
// completar una ronda real con el catálogo de 1000 palabras excede el timeout del test (30s).
// Queda verificada por composición — usa Header, Footer, Button, todos cubiertos por los 5 scans
// anteriores. Smoke manual al final del audit (ver audit-a11y.md §3 "Cobertura no automatizada").
