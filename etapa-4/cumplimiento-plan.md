---
proyecto: vocab-1000
etapa: 4
documento: cumplimiento-plan
version: 2
fecha_inicio: 2026-05-22
fecha_cierre: 2026-05-23
autor: Director (asistente fase 1)
autor_humano_validador: Alberto Muñoz Velasco
estado: cerrado · todas las filas ✅
---

# cumplimiento-plan.md — vocab-1000 · Etapa 4

Registro formal del cumplimiento del plan de fases de etapa 4. Creado **retroactivamente el 2026-05-23** como consecuencia del incidente Issue #1 ("numero de palabras erroneas") y la decisión sistémica del mismo día (`ciclo.md` §3 Etapa 4.7 + §8). Para proyectos futuros este artefacto se crea **al inicio de etapa 4** y se mantiene vivo durante la implementación.

## Estado por fase

| # | Fase | Estado | HU cubiertas | Commit(s) que cierran | Tests verificadores | Fecha cierre |
|---|------|--------|--------------|----------------------|---------------------|--------------|
| 1 | Setup (Next.js 16 + TS + tokens + Biome/Vitest/Playwright) | ✅ | — | `e20b4eb` | smoke build | 2026-05-22 |
| 2 | UI shell + HOME-A con mock data | ✅ | HU-001 | `d3651aa` | manual | 2026-05-22 |
| 3 | UI navegable (HOME-B/C + TURNO-1/2 + Fin Ronda + Reinicio) | ✅ | HU-002, HU-003, HU-004, HU-005, HU-008, HU-009 | (snapshot etapa 3 sub-gate 4.2) | Playwright smoke 8/8 | 2026-05-22 |
| 4 | Estado central (Zustand + IDB+LS) | ✅ | HU-006 (parcial), persistencia general | `f65c7c7` | Playwright switch dir + reload | 2026-05-22 |
| 5 | Estados especiales (memory-only + error de carga) | ✅ | HU-010, HU-011 | `6554d5f` | manual (Safari incógnito para HU-010) | 2026-05-22 |
| 6 | **Catálogo NGSL real (1000 lemas)** | ✅ (cerrada retroactivamente con fix Issue #1) | HU-001 (criterio "1000 lemas NGSL filtrados") | `a5ecc52` | `e2e/catalog.spec.ts` (2/2 ✅) | 2026-05-23 |
| 7 | Cambio de dirección + i18n tipo gramatical + a11y WCAG 2.2 AA | ✅ | HU-006 (cambio dirección); i18n tipo gramatical en `Acepciones.tsx`; audit WCAG 2.2 AA cerrado en `etapa-4/audit-a11y.md` (5/5 scans axe-core verde, paleta verificada por cálculo) | f65c7c7 + (commit del audit pendiente) | `e2e/a11y.spec.ts` (5/5 ✅) | 2026-05-23 |
| 8 | Atribución NGSL + "Acerca de" | ✅ | HU-012 | (incluido en commits de fase 5/8 consolidados) | manual | 2026-05-22 |

## Observaciones del cierre retroactivo

- **Fase 6 estuvo en estado ❌ pendiente** durante toda la firma del gate de etapa 4 y la promoción a producción (Etapa 5). **No se detectó porque este documento no existía**.
- **Fase 7 sigue ⚠️ parcial** a fecha 2026-05-23. Tras verificar el código (`Acepciones.tsx:28-29`), la i18n del tipo gramatical **sí está implementada** — la v1 de este documento se equivocaba en ese punto. La deuda real es **solo el audit WCAG 2.2 AA completo** (registrado como Issue #3, 2026-05-23). Además, el fix del Issue #1 introdujo un bug propio (paréntesis explicativos en ~50 entradas del catálogo, registrado como Issue #2).
- **Fase 8 se consolidó** dentro de commits que también tocaban otros temas — patrón a evitar en futuros proyectos (un commit por fase, o al menos un mensaje que mencione la fase cerrada).
- El gate final de etapa 4 firmado el 2026-05-22 se firmó con **fase 6 ❌ y fase 7 ⚠️** sin excepción documentada por el humano. **Esta firma queda revisada a posteriori**: con la regla actual (§3 Etapa 4.7) el gate no se habría firmado.

## Implicación para futuros proyectos

Crear este documento **al inicio de etapa 4** con el plan completo en estado ⏳/❌ inicial. Cada fase se marca ✅ con su commit y test verificadores **antes** de poder pasar a la siguiente. El Director firma el gate final solo si todas las filas son ✅ (o tienen excepción documentada).

## Cierre del piloto (firma de la v2)

Las 8 fases del plan de etapa 4 están **✅ cerradas** a fecha 2026-05-23. El piloto vocab-1000 queda **completo** como recorrido del ciclo. Los tres bugs reportados por el stakeholder post-deploy (#1 catálogo NGSL, #2 paréntesis explicativos, #3 audit WCAG) están cerrados con commits, tests de regresión y verificación. Repo en producción: `https://vocab-1000.vercel.app/`. Cero issues abiertos.

Firmado por: Alberto Muñoz Velasco (stakeholder + Director humano), 2026-05-23.
