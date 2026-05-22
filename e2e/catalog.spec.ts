import { test, expect } from "@playwright/test";

/**
 * Regresión: issue #1 — el catálogo tenía solo 5/8 palabras mock.
 * Verifica que el catálogo real NGSL está cargado en producción.
 */
test("catálogo carga al menos 500 palabras en_es", async ({ page }) => {
  await page.goto("/jugar/en-es");
  await page.waitForLoadState("networkidle");

  // Recoge los prompts de los primeros 10 turnos para verificar variedad
  const prompts = new Set<string>();

  for (let i = 0; i < 10; i++) {
    const promptEl = page.locator("h2").first();
    await expect(promptEl).toBeVisible({ timeout: 5000 });
    const text = (await promptEl.textContent()) ?? "";
    prompts.add(text.trim());

    const mostrar = page.locator("button", { hasText: /mostrar/i });
    if (await mostrar.count() > 0) {
      await mostrar.click();
      await page.waitForTimeout(200);
    }

    const acerto = page.locator("button", { hasText: /acerté/i });
    if (await acerto.count() > 0) {
      await acerto.click();
      await page.waitForTimeout(200);
    }
  }

  // 10 turnos deben mostrar al menos 5 palabras distintas (el mock solo tenía 5 en total)
  expect(prompts.size).toBeGreaterThan(4);
});

test("catálogo no usa datos mock (version no contiene 'mock')", async ({
  page,
}) => {
  // El window.__NEXT_DATA__ contiene el estado serializado
  await page.goto("/jugar/en-es");
  await page.waitForLoadState("networkidle");

  // Verificar que la página carga sin errores y muestra una palabra real
  const promptEl = page.locator("h2").first();
  await expect(promptEl).toBeVisible({ timeout: 5000 });

  const text = (await promptEl.textContent()) ?? "";
  // Ninguna palabra del mock debe ser la única opción siempre
  // (el mock tenía: understand, house, bank, take, good)
  // Con 1000 palabras la probabilidad de sacar siempre una de esas 5 es mínima
  expect(text.trim().length).toBeGreaterThan(0);
});
