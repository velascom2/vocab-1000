---
proyecto: vocab-1000
documento: acta-despliegue-pro
version: 1.1.0
version_producto: 1.1.0
parent_version: 1.0.0
estado: aprobado
autor: asistente Claude Code (en ausencia de SRE/QA agénticos en fase 1)
fecha: 2026-05-27
gate: D-5
tipo_ciclo: sub-ciclo MINOR
regla_aplicable: ARQ-027
---

# Acta de despliegue `pro` · vocab-1000 v1.1.0

Primer **sub-ciclo MINOR** ejecutado bajo la regla firme ARQ-027 (versionado del producto, formalizada 2026-05-27). El piloto vocab-1000 cerró Etapa 6 en su recorrido inicial sin acta canónica de Etapa 5 — la primera acta física de `etapa-5/` del proyecto es ésta, generada como parte del sub-ciclo MINOR. La regla firme se aplica desde día uno; los proyectos cerrados antes de existir la regla quedan en su estado.

## 1. Resumen

- **Bump**: v1.0.0 → v1.1.0 (SemVer MINOR).
- **Cambio**: rediseño editorial completo (paleta papel+tinta+esmeralda, tipografía editorial, iconografía SVG) + fix de regresión WCAG 2.2 AA capturado por el sub-ciclo.
- **Sin cambios funcionales ni de HU** — todas las HU vigentes (HU-001..HU-012) mantienen su comportamiento. Verificado por Vitest del catálogo (4/4) y por inspección manual del flujo de juego.
- **Sin drift de stack**: Next.js 16.2.6 (igual que v1.0.0), Vercel free tier, sin BD. **ARQ-022 extendida no aplica** — no hubo cambio de hosting ni salto de versión mayor del framework.

## 2. Commits incluidos

| Commit | Fecha | Concepto |
|---|---|---|
| `1abf9c8` | 2026-05-27 15:14 | Rediseño editorial: paleta papel+tinta+esmeralda + tipografía Newsreader/Manrope/JetBrains Mono + iconos SVG. 25 ficheros, +2506/-1029 líneas. Todo CSS/styleguide/iconos. |
| `1eeda47` | 2026-05-27 ~23:10 | fix(a11y): oscurece `--muted` y `--muted-2` para cumplir WCAG 2.2 AA 4.5:1. Regresión detectada por el QA del sub-ciclo. |

## 3. Cómo se condujo el sub-ciclo (post-hoc estructurado)

- **Implementación**: ejecutada por Alberto en sesión Claude Code interactiva el 2026-05-27 ~15:14 (commit `1abf9c8`). El push directo a `velascom2/vocab-1000` produjo despliegue automático en Vercel a producción **sin haber pasado por el sub-ciclo del arnés** (porque ARQ-027 aún no estaba formalizada en ese momento).
- **Sub-ciclo retroactivo**: tras formalizar ARQ-027 (~18:48), Alberto pide arrancar el sub-ciclo MINOR. El asistente ejecuta:
  1. **QA programático** sobre el código actual del repo: Vitest 4/4 ✅, Playwright 14/14 — pero **a11y inicialmente 0/10** (detectó violaciones de contraste serias).
  2. **Bloqueo D-4** con el formato CAL-049 reportado al titular: el rediseño introdujo `--muted #7C786F` y `--muted-2 #A8A498` que fallan WCAG 2.2 AA 4.5:1 sobre los fondos del sistema. Violación de USA-R-008 (regla firme).
  3. **Decisión del titular**: fix de contraste + re-validación + tag.
  4. **Fix ejecutado**: tokens ajustados a `#666259` y `#6D6963` (matemática de contraste verificada con calculadora WCAG previa al cambio). Commit `1eeda47`.
  5. **Re-validación**: Vitest 4/4 ✅, Playwright a11y 10/10 ✅, catalog 4/4 ✅. Suite completa **14/14**.
  6. **Push + auto-despliegue Vercel + tag v1.1.0** sobre `1eeda47`.

## 4. Verificación QA en `pro`

| Suite | Resultado | Comando |
|---|---|---|
| Vitest unitarios (catálogo) | 4/4 ✅ | `npm run test` |
| Playwright e2e a11y (5 rutas × 2 viewports, axe-core WCAG 2.2 AA) | 10/10 ✅ | `npx playwright test e2e/a11y.spec.ts --workers=1` |
| Playwright e2e catalog (2 tests × 2 viewports) | 4/4 ✅ | `npx playwright test e2e/catalog.spec.ts` |
| Build Next.js (`next build`, 8 páginas estáticas) | ✅ | declarado en mensaje de commit del rediseño |
| URL producción reachable | ✅ | `https://vocab-1000.vercel.app/` |

## 5. Stack desplegado (verificación coherencia ARQ-022 extendida + ciclo §3 Etapa 5)

| Capa | Declarado en `tecnica.md` vigente (v3) | Desplegado en `pro` | Coherente |
|---|---|---|---|
| Framework principal | Next.js 16 (App Router) | Next.js **16.2.6** | ✅ (parche, no MAJOR) |
| TypeScript | estricto | estricto | ✅ |
| Hosting | Vercel free tier | Vercel free tier | ✅ |
| BD | ninguna (frontend-only) | ninguna | ✅ |

**Sin drift que active ARQ-022 extendida**. No procede ADR adicional.

## 6. Inventario de scope HU implementadas vs planificadas (CAL-045)

| HU | v1.0.0 | v1.1.0 | Cambio |
|---|---|---|---|
| HU-001..HU-012 | ✅ | ✅ | Sin cambio funcional |
| (sin nuevas HU en v1.1.0) | — | — | — |

## 7. Ventana de observación (CAL-031 + ciclo §3 Etapa 5)

- **Smoke test en `pro`**: navegación manual a `https://vocab-1000.vercel.app/`, `/jugar/en-es`, `/jugar/es-en`, `/acerca-de`, `/styleguide` tras el deploy. Carga sin errores, render correcto, juego funcional.
- **Ventana declarada**: 24h tras firma del gate D-5. Si aparece anomalía → rollback a v1.0.0 con `git revert 1abf9c8 1eeda47 && git push` (rollback verificado en piloto con Issues #1/#2/#3).
- **Observabilidad**: el proyecto es frontend-only sobre Vercel — observabilidad continua vía analytics de Vercel si se activa (USA-024 sigue ❌ no cumple, según informe Arquitecto del 2026-05-26; no es bloqueante para este sub-ciclo).

## 8. Veredicto QA (CAL-030)

**APROBADO**.

- Suite de regresión verde tras fix de contraste.
- Sin bugs conocidos en `pro`.
- Sin drift de stack que requiera ADR.
- Inventario de scope congelado (no se añaden HU, no se quitan).
- Ventana de observación abierta sobre `https://vocab-1000.vercel.app/`.

## 9. Tag git aplicado

- `v1.1.0` sobre commit `1eeda47` (HEAD de `velascom2/vocab-1000` main al cierre del gate).
- Push del tag al remote ejecutado: `git push origin v1.1.0`.
- Genealogía declarada: `parent_version: 1.0.0` (commit `a670b64`).

## 10. Hallazgos sistémicos del primer sub-ciclo MINOR

1. **Validación operativa de ARQ-027**: el sub-ciclo MINOR detectó una regresión WCAG AA que entró a `pro` por push directo (sin sub-ciclo). **El flujo formalizado captura justo lo que debe capturar** — un fallo de cobertura que un PATCH no habría detectado. Confirmación empírica de que el umbral PATCH/MINOR/MAJOR de ARQ-027 está bien calibrado: un cambio de tokens visibles es MINOR, no PATCH.

2. **El push directo del rediseño antes de formalizar ARQ-027 fue "operativamente aceptable" pero "sistémicamente subóptimo"**: aceptable porque no había convención que lo prohibiera en el momento; subóptimo porque la regresión llegó a usuarios reales durante ~3 horas. Lección destilada para futuros casos: aunque ARQ-027 no estuviera escrita, USA-R-008 (contraste como criterio antes que estética, regla firme desde el 2026-05-22) sí lo estaba — y se rompió. **Las directrices se cumplen incluso fuera de un sub-ciclo formal**.

3. **Frontera con ARQ-022 extendida verificada**: el sub-ciclo MINOR comprueba coherencia stack `tecnica.md` ↔ `pro` como dicta ciclo §3 Etapa 5 reescrita. Cero drift detectado en v1.1.0 — el fix de a11y es solo CSS, no toca framework ni hosting ni BD. **Los dos gaps (ARQ-027 + ARQ-022 extendida) son ortogonales en este caso**, como predijo la sección "Frontera con G-arnés-6" del propio ARQ-027.

## 11. Ejecución del sub-ciclo "post-hoc": legitimidad y precedente

Este sub-ciclo se ejecutó **después** del push del rediseño a `pro`, no antes. La regla firme ARQ-027 dicta que un MINOR pase por sub-ciclo (PO + ejecutor + QA) — el orden ideal es `PO → ejecutor → QA → tag`. En este caso el orden fue `ejecutor → push → QA tardío → fix → tag`.

**Aceptable como caso especial únicamente por**:

- ARQ-027 acababa de formalizarse el mismo día — no había precedente operativo.
- El push se hizo en sesión Claude Code interactiva con Alberto en rol "ejecutor humano-equivalente", no en violación deliberada del flujo.
- El QA tardío sí capturó el fallo de cobertura, validando ARQ-027 incluso en su primera aplicación imperfecta.

**No se considera precedente válido para casos futuros**. A partir de v1.2.0 (o de la primera versión MINOR de cualquier proyecto del arnés), el flujo será `PO recibe encargo → ejecutor → QA en stage → fix si procede → S-3/D-4/D-5 → push + tag`.

## 12. Firmas

| Rol | Firmante | Fecha | Decisión |
|---|---|---|---|
| QA del sub-ciclo | asistente Claude Code (en ausencia de QA agéntico) | 2026-05-27 | APROBADO tras fix de contraste |
| D-5 (cierre `pro` operativo) | Alberto Muñoz Velasco (Director) | 2026-05-27 | Firmado al autorizar este acta |
| Tag git aplicado | asistente Claude Code | 2026-05-27 | `v1.1.0` sobre `1eeda47` pusheado |
