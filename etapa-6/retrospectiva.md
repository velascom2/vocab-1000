---
proyecto: vocab-1000
etapa: 6
propietario: Director (asistente en fase 1)
documento: retrospectiva
version: 1
fecha: 2026-05-23
estado: cerrado (gate 6.6 firmado)
---

# Retrospectiva — Piloto vocab-1000

Primera ejecución real de la Etapa 6 del arnés churrerIA. Aplicación retroactiva al piloto, que estaba en estado "cerrado funcional" tras gate de etapa 5 firmado el 2026-05-22 + ciclo de mantenimiento post-PRO completado el 2026-05-23 (3 issues atendidos, post-mortem del Gap #10 ejecutado en caliente, 3 reglas firmes nuevas + Etapa 4.7).

**Alcance acordado de la 6.1**: solo evidencia ya consolidada en `memory.md`. No se revisita `git log`, issues GitHub ni archivos hermanos `memory-archivo-NN-*.md`.

---

## §0 — Evidencia

Volcado en bruto desde `memory.md`, agrupado por tema. Sin lectura todavía — eso es §1-4.

### E1. Iteraciones del Sub-gate 4.2 (v1 → v5)

Cinco versiones del entregable visual antes de la firma del stakeholder:

| Versión | Cambio principal | Disparador |
|---|---|---|
| v1 | Paleta clara default, Parte B (pantallas del producto) | Primer cierre de la 4.1 |
| v2 | Paleta SaaS oscura | "no me acaba de enamorar" sobre v1 |
| v3 | Añadida Parte A (guía de estilos del sistema), styleguide navegable | Stakeholder pide "Tailwind UI / Storybook completo" sobre v2 |
| v4 | Vuelta a paleta clara (startup fresca) | Stakeholder declara preferencia por fondo blanco |
| v5 | Look "terminal sobre blanco" (mono + teal + radios reducidos + cursor parpadeante) | Stakeholder pide robotismo + sidebar siempre visible |

**Coste real medido** de cada iteración (excluyendo v3 que añadió la styleguide nueva): **una sesión de tokens + acta + screenshots regenerados**. Cero retrabajo de componentes, marcado HTML ni mecánica del juego.

### E2. Gap #10 — Issue #1 ("número de palabras erróneas")

App desplegada en producción con 5 palabras EN→ES y 8 ES→EN cuando la spec pedía 1000.

**Análisis de 4 capas con Opus 4.7**:
1. **Síntoma**: producción tenía 5 palabras mock cuando debía tener 1000.
2. **Inmediata**: Fases 6 (catálogo NGSL real) y 7 (i18n + a11y) del plan de etapa 4 nunca se ejecutaron.
3. **Próxima**: el gate de etapa 4 se firmó sin verificar completitud del plan; el `acta-diseno.md` solo mostraba screenshots sin inventario de scope.
4. **Estructural**: no había tests para criterios cuantitativos, ni cierre formal de fases, ni marcador técnico para distinguir mock de real.

**Cambios aplicados al sistema en caliente** (4 reglas firmes nuevas, originalmente `-bis`, renumeradas hoy a IDs limpios):

- **CAL-045** — Inventario de scope obligatorio en acta del gate.
- **CAL-046** — Criterios cuantitativos se materializan como tests automáticos al cerrar HU.
- **CAL-047** — Datos provisionales con marcador detectable por el build (`_mock_*` + lint rule).
- **Etapa 4.7** — Cierre formal de fases por el Director con `cumplimiento-plan.md`.

**Coste**: 1 push corregir el síntoma + 1 sesión Opus 4.7 estructurar las 4 capas. Sin ese análisis, el siguiente proyecto habría reproducido el bug.

### E3. Bugs post-PRO atendidos (issues #1, #2, #3)

3 issues atendidos en una sesión con el patrón estándar: stakeholder reporta → fix + test de regresión → push → Vercel auto-deploy → cierre con `Closes #N`.

- #1: catálogo de 5 palabras (Gap #10).
- #2: paréntesis explicativos en catálogo + cap es-en a 3 answers.
- #3: audit WCAG 2.2 AA con 5/5 axe-core.

### E4. Stack técnico del piloto

- **Next.js 16** + TypeScript estricto + App Router + Biome + Vitest + Playwright.
- **Persistencia**: IndexedDB → localStorage → memory-only (con detección y caché del modo).
- **Estado**: Zustand con bootstrap asíncrono, debounce 200ms, schema v2 con migración por `catalogVersion`.
- **Hosting**: Vercel free tier (auto-redeploy en push a `main`).
- **Identidad git**: cuenta personal Alberto `alberto@velascom.es` (regla de aislamiento con Quadrant respetada).

### E5. Tests vivos en el repo (suite de regresión permanente)

- `src/catalog/catalog.test.ts` (4/4 ✅ Vitest) — cubre regresiones #1 y #2 + restricción 1-3 answers.
- `e2e/catalog.spec.ts` (2/2 ✅ Playwright) — variedad de palabras y ausencia de mock en runtime.
- `e2e/a11y.spec.ts` (5/5 ✅ Playwright + axe-core) — WCAG 2.2 AA en 5 rutas.

### E6. Decisión sistémica intra-piloto — Sub-gate 4.2

Durante la implementación, el stakeholder pidió validar la línea gráfica antes de que el Frontend programara. Detectado como patrón transversal y promovido a regla del arnés (decisión 2026-05-22): Etapa 4 se subdivide en 6 sub-etapas con sub-gate humano 4.2 obligatorio.

### E7. Coste real del modelo

- **Sonnet 4.6**: suficiente para implementación de fases y fix de bugs acotados.
- **Opus 4.7**: necesario para post-mortems, análisis de capas estructurales, diseño de directrices. Confirmado operativamente con el Gap #10 (Sonnet identificó solo la capa superficial).

### E8. Aprendizajes consolidados ya documentados el 2026-05-23

Los 8 puntos del bloque "Aprendizajes consolidados del piloto para el arnés churrerIA" en `memory.md`. Esos puntos son **insumo de §1-4 de esta retrospectiva**, no resultado. Aquí los releemos con el filtro de las 4 lentes.

### E9. Trabajo de consolidación post-cierre (2026-05-23)

- Renumeración `-bis` → CAL-045/046/047 (esta misma sesión).
- Reubicación de CAL-047 del Bloque I (Fixtures) al Bloque D (Carriles de desarrollo).
- Cross-ref CAL-037 ↔ CAL-046.
- Actualización de `ciclo.md`, `memory.md`, `biome.json` del piloto, anti-patrones y §9 Revisiones de `calidad.md`.

---

## §1 — Patrones validados (lo que funcionó)

### P1. Separación tokens vs marcado, con styleguide como Parte A del entregable 4.2

Las 5 iteraciones de paleta del sub-gate 4.2 (E1) costaron **una sesión cada una**, no semanas. Cambiar de paleta entera no obligó a tocar componentes, marcado ni mecánica del juego. **El sistema de diseño con tokens probó su valor empírico**.

> **Implicación para el arnés**: la decisión sistémica del sub-gate 4.2 con Parte A (styleguide) + Parte B (pantallas del producto) ya está incorporada al `ciclo.md`. Confirmar que se respeta desde día 1 en el siguiente proyecto.

### P2. Persistencia IDB→LS→memory-only con detección de modo

Patrón usado en E4: detectar capacidad de almacenamiento al arrancar, cachear el modo, mostrar banner si memory-only. Funcionó sin sobresaltos. **Aplicable a cualquier app web con persistencia**.

> **Implicación para el arnés**: candidato a documento de patrón consultable por futuros proyectos web. Hoy vive solo en `memory.md` del piloto.

### P3. Flujo de bugs por GitHub Issues con auto-deploy

E3 documenta el patrón: stakeholder reporta → fix + test → push → Vercel auto-deploy → cierre con `Closes #N`. 3 issues atendidos en una sesión, sin fricción.

> **Implicación para el arnés**: este patrón vive informalmente en el piloto pero no está declarado en `directrices/calidad.md` ni en `ciclo.md`. Conviene declararlo como recomendación operativa.

### P4. Sonnet 4.6 implementa, Opus 4.7 estructura

Validado empíricamente con el Gap #10 (E2, E7). La regla operativa del `CLAUDE.md` global ("selección de modelo por tarea") se confirma en el caso real.

> **Implicación para el arnés**: la regla ya existe en el `CLAUDE.md` global. El caso del Gap #10 sirve como ejemplo canónico cuando se documente.

### P5. Aislamiento técnico con Quadrant ejecutado sin fricción

E4 nota la identidad `alberto@velascom.es`. Cero pushes a infra de Quadrant, cero credenciales cruzadas. La regla del 2026-05-22 (aislamiento bidireccional) no costó implementarla.

> **Implicación para el arnés**: validación empírica de que la regla es operativa. Patrón a mantener.

---

## §2 — Anti-patrones confirmados (lo que evitar)

### A1. Gate firmado sin inventario de scope

Causa raíz del Gap #10 (E2 capa 3). Mitigado en caliente con CAL-045 + Etapa 4.7.

> **Estado**: regla aplicada. Patrón a vigilar en el primer proyecto siguiente para confirmar que CAL-045 se respeta.

### A2. Criterio cuantitativo de HU sin test automático

Causa raíz del Gap #10 (E2 capa 4). Mitigado con CAL-046.

> **Estado**: regla aplicada. Aplicar desde día 1 del siguiente proyecto.

### A3. Mock indistinguible de dato real

Causa raíz del Gap #10 (E2 capa 4). Mitigado con CAL-047 + convención `_mock_*` + lint rule.

> **Estado**: regla aplicada. Aplicar desde día 1 del siguiente proyecto.

### A4. Deuda generada en caliente sin contrato de limpieza

Las 4 reglas del Gap #10 se introdujeron como `-bis` el 2026-05-23 y se quedaron así dos días hasta que la consolidación ad-hoc las renumeró (E9). **No había ninguna ceremonia obligatoria que forzara la limpieza**. Si el siguiente proyecto hubiera arrancado con las `-bis` aún ahí, las habría heredado tal cual.

> **Estado**: mitigado parcialmente con la creación de la propia Etapa 6 (esta misma retrospectiva). Pero la limpieza de deuda generada en caliente es solo uno de los outputs de la 6.5 — conviene hacerla explícita como sub-paso de 6.1 o 6.2.

### A5. Plan de fases vivo solo como prosa en `memory.md`

El plan de etapa 4 del piloto vivía como lista en `memory.md`. Las fases 6 y 7 se "evaporaron" sin que nadie las tachara oficialmente como pendientes (E2 capa 2). Mitigado con Etapa 4.7 + `cumplimiento-plan.md`.

> **Estado**: regla aplicada. Vigilar adopción real en el siguiente proyecto.

---

## §3 — Sorpresas

### S1. Iteraciones de paleta sin coste de componentes (positiva)

Esperado: cada cambio de paleta cuesta varios días de retrabajo de componentes. Real: una sesión por iteración (E1). **5 iteraciones consecutivas sin retrabajo de mecánica ni marcado**. El sistema de tokens funciona mejor de lo que esperábamos.

### S2. Coste oculto de Next.js 16 (negativa)

Esperado: Next.js es Next.js. Real: Next.js 16 tiene breaking changes vs versiones anteriores (`unstable_retry` en error boundary en vez de `reset`, `useRouter` desde `next/navigation`). El `AGENTS.md` del proyecto lo advertía, pero **el coste real de descubrir cada cambio en caliente fue significativo** (E4, fix HU-006).

> **Implicación**: tener `AGENTS.md` del proyecto avisando es necesario pero no suficiente. Cada agente que toque ese stack necesita la información en su contexto, no solo accesible.

### S3. Diferencia Sonnet 4.6 vs Opus 4.7 mayor de lo asumido (positiva-y-cara)

Esperado: ambos modelos resuelven el mismo tipo de tarea con calidad similar, con Opus algo mejor. Real: en el post-mortem del Gap #10 (E7), Sonnet identificó la capa superficial correctamente pero no las 4 capas estructurales. **Opus identificó las 4 capas y propuso cambios sistémicos**. La diferencia no es de matiz — es de tipo de análisis.

> **Implicación**: la regla "Opus para análisis estratégico, Sonnet para implementación" no es preferencia, es **decisión operativa con consecuencias**. Forzarlo en sentido contrario lleva a fixes superficiales.

### S4. La consolidación post-cierre vale tanto o más que el cierre (positiva)

Esperado: tras firmar etapa 5, el proyecto está hecho. Real: el trabajo de la sesión del 2026-05-23 (renumeración, cross-refs, reubicación de CAL-047) ha producido **el cambio más estructural del arnés desde el diseño inicial** (Etapa 6). **Sin la sesión de hoy, el siguiente proyecto habría heredado el sistema con deudas significativas**.

> **Implicación**: la propia Etapa 6 es la materialización formal de esta sorpresa. Sin sorpresa, no hay etapa 6.

---

## §4 — Gaps del sistema

### G1. Ausencia de Etapa 6 (cerrado en esta sesión)

Identificado durante la sesión del 2026-05-23. **Resuelto con la decisión sistémica de hoy** (Etapa 6 en `ciclo.md`).

### G2. Falta de etapa-5/ con actas físicas en el piloto

El piloto tiene `etapa-1/`, `etapa-2/`, `etapa-3/`, `etapa-4/`, `etapa-6/`. **No tiene `etapa-5/`**. El trabajo de etapa 5 (QA local, despliegue Vercel, gate firmado) está documentado solo en `memory.md`, sin actas físicas. Esto es síntoma de un gap: el `ciclo.md` describe etapa 5 con outputs pero no enumera artefactos canónicos persistentes como sí lo hace con etapa 4 (`acta-diseno.md`, `cumplimiento-plan.md`).

> **Implicación**: candidato a propuesta de §5 — definir output canónico de etapa 5 (`acta-pruebas.md`, `acta-despliegue.md` o similar).

### G3. Patrones operativos no declarados (IDB→LS, flujo de bugs)

P2 y P3 son patrones que funcionaron en el piloto pero no están declarados en directrices ni en `ciclo.md`. Quedan implícitos en el código del piloto.

> **Implicación**: candidato a propuesta de §5 — declarar patrones operativos transversales (¿en `directrices/arquitectura.md`? ¿en un nuevo archivo `patrones.md`?).

### G4. Ausencia de retrospectiva sistémica cross-proyectos

La etapa 6 mira UN proyecto. Cuando haya varios proyectos cerrados con sus retrospectivas, conviene mirar el arnés entero (¿qué propuestas se aceptan repetidamente? ¿qué directriz aparece como insuficiente en N retrospectivas seguidas?). **No formalizado todavía**.

> **Implicación**: no procede crear ahora — solo hay un proyecto. Anotar para cuando exista el segundo.

### G5. Memoria del proyecto se infla durante el ciclo

`memory.md` del piloto creció hasta ~500 líneas. Se archivaron 3 archivos hermanos (`memory-archivo-NN-*.md`). **Funcionó**, pero el patrón "archivar histórico cuando el archivo activo se infla" no está declarado en ningún sitio del arnés.

> **Implicación**: candidato a propuesta de §5 — declarar el patrón de archivado de `memory.md` activo cuando el archivo crece sobre cierto umbral.

### G6. Limpieza de deuda generada en caliente no es sub-paso explícito de 6.x

La renumeración `-bis` → 045/046/047 se hizo hoy ad-hoc, no como parte de un sub-paso explícito de la Etapa 6 redactada. Sería natural que **6.1 incluyera "auditar deuda introducida en caliente durante el ciclo"** y que **6.5 incluyera "limpieza de esa deuda"** como sub-paso obligatorio.

> **Implicación**: candidato a propuesta de §5 — añadir sub-paso explícito en 6.1 y/o 6.5.

---

## §5 — Propuestas de cambio al sistema

| # | Tipo | Propuesta | Justificación (evidencia) | Coste |
|---|---|---|---|---|
| **1** | `ciclo` | Definir output canónico de **Etapa 5** (`acta-pruebas-qa.md`, `acta-despliegue-pro.md`) con la misma cadencia que etapa 4 ya tiene | G2 — el piloto no tiene `etapa-5/` con actas físicas; los gates QA→PRE, PRE→PRO y cierre PRO se firmaron sin material persistente equivalente al de etapa 4 | Baja (editar §3 Etapa 5 de `ciclo.md`) |
| **2** | `ciclo` | Añadir sub-paso explícito en **6.1**: "auditar deuda introducida en caliente durante el ciclo (reglas `-bis`, TODOs sin cerrar, decisiones con marcador temporal)" | G6 + A4 — la deuda `-bis` se quedó dos días flotando sin contrato de limpieza | Baja (editar §3 Etapa 6 de `ciclo.md`) |
| **3** | `ciclo` | Añadir sub-paso explícito en **6.5**: "limpiar la deuda detectada en 6.1 que el triaje 6.4 haya aceptado limpiar" | Como #2 — completar el ciclo de la deuda | Baja |
| **4** | `directriz` | Declarar **patrón operativo** "persistencia IDB→LS→memory-only con detección de modo" en `directrices/arquitectura.md` como recomendación (no regla firme) para apps web con persistencia local | P2 + G3 — patrón validado empíricamente, vale la pena hacerlo descubrible | Media (redactar recomendación con criterios) |
| **5** | `directriz` | Declarar **patrón de flujo de bugs**: "Issue → fix + test regresión → push → auto-deploy → cierre con `Closes #N`" en `directrices/calidad.md` como recomendación operativa | P3 + G3 — patrón validado en 3 issues seguidos sin fricción | Media |
| **6** | `ciclo` o `directriz` | Declarar el **patrón de archivado de `memory.md`** cuando excede cierto umbral (líneas o sesiones): cómo nombrar el archivo histórico, qué dejar en el activo, qué llevarse | G5 — patrón usado en el piloto sin estar documentado en ningún sitio | Baja-Media |
| **7** | `ciclo` o `agente` | Sub-paso "informe individual de aprendizaje por agente" antes de 6.1: cada agente (Backend, Frontend, SRE, QA, UX, PO, Técnico, Director) entrega al Director un mini-informe propio (qué le costó, qué directrices se sintieron forzadas o ausentes). Insumo adicional para 6.2 | La retrospectiva actual mira el proyecto desde el Director — al institucionalizar voces de los agentes (cuando existan en fase 1) se gana señal | Media (definir formato del mini-informe) |
| **8** | `plantilla` | Crear `proyectos/<proyecto>/etapa-6/retrospectiva.md` como **plantilla esqueleto** copiada del piloto (esta misma) para que el siguiente proyecto arranque rápido | Esta retrospectiva sirve como referencia consultable; conviene formalizarla como plantilla | Baja (copiar + sanitizar contenido del piloto) |
| **9** | `agente` | Documentar el **caso canónico del Gap #10** como ejemplo en el `CLAUDE.md` del agente futuro de post-mortem (o del Director, según dónde acabe viviendo la capacidad) | P4 — el caso ilustra de forma concreta cuándo se necesita Opus y por qué Sonnet es insuficiente | Baja (cuando exista el agente correspondiente; ahora solo nota futura) |
| **10** | `directriz` | Reforzar **CAL-046** (criterios cuantitativos como tests) con ejemplo concreto del Gap #10 en `directrices/calidad.md` §8 Ejemplos | A2 — la regla existe pero el ejemplo canónico ayuda al agente a aplicarla | Baja |

---

## Cambios aplicados

Ejecutado en sub-etapa 6.5 tras gate 6.4 firmado el 2026-05-23. Las 10 propuestas fueron aceptadas; se ejecutan todas excepto la #9 (anotación trazable para agentes que aún no existen).

| # | Veredicto 6.4 | Acción ejecutada | Trazabilidad |
|---|---|---|---|
| 1 | ✅ Aceptada | Output canónico de Etapa 5 añadido a `ciclo.md` §3 Etapa 5 (3 actas: `acta-pruebas-qa.md`, `acta-pruebas-pre.md`, `acta-despliegue-pro.md` con render a Drive `etapa-5-pruebas/`) | `ciclo.md` §3 Etapa 5 (editada) |
| 2 | ✅ Aceptada | Sub-paso "auditoría de deuda en caliente" añadido a `ciclo.md` §3 Etapa 6.1 (bullet en lista de insumos) | `ciclo.md` §3 Etapa 6.1 (editada) |
| 3 | ✅ Aceptada | Sub-paso "limpieza explícita de la deuda detectada en 6.1" añadido a `ciclo.md` §3 Etapa 6.5 | `ciclo.md` §3 Etapa 6.5 (editada) |
| 4 | ✅ Aceptada | **ARQ-R-006** "Persistencia local en apps web: cascada IDB→LS→memory-only" añadida a `directrices/arquitectura.md` §5 | `directrices/arquitectura.md` §5 (nueva recomendación) |
| 5 | ✅ Aceptada | **CAL-R-005** "Flujo operativo para bugs reportados post-PRO" añadida a `directrices/calidad.md` §5 | `directrices/calidad.md` §5 (nueva recomendación) |
| 6 | ✅ Aceptada | Sección "Patrón de archivado de `memory.md`" añadida a `CLAUDE.md` de churrerIA (en §"Memoria activa") con disparadores, convención de nombre y qué NO archivar | `CLAUDE.md` (editada) |
| 7 | ✅ Aceptada (intención) | Sub-paso "Informes individuales de aprendizaje por agente" añadido a `ciclo.md` §3 Etapa 6.1 con marcador "formato a definir cuando los agentes existan en fase 1" | `ciclo.md` §3 Etapa 6.1 (editada, junto con #2) |
| 8 | ✅ Aceptada | Plantilla esqueleto creada en `proyectos/_plantilla/etapa-6/retrospectiva.md` + `acta-retro.md` + `README.md` orientativo en `_plantilla/` | `proyectos/_plantilla/` (carpeta nueva) |
| 9 | ✅ Aceptada (diferida) | **Nota futura** registrada aquí y en `memory.md`: cuando se construyan los `CLAUDE.md` de los 8 agentes (fase 1), incorporar el caso canónico del Gap #10 como ejemplo para el agente Director del ciclo y/o el agente que asuma post-mortems. La evidencia E2 + S3 de esta retrospectiva sirve como material listo. | Nota en `memory.md` entrada 2026-05-23 (etapa 6 cerrada) |
| 10 | ✅ Aceptada | Ejemplo canónico del Gap #10 añadido a `directrices/calidad.md` §8 Ejemplos (sección "Ejemplo canónico de CAL-046 — criterio cuantitativo como test"). Incluye HU original, código del test `vocab-1000` y patrón generalizable | `directrices/calidad.md` §8 (sección nueva) |

**Verificación post-ejecución**:

- `ciclo.md`: contiene Etapa 5 con output canónico, Etapa 6.1 con sub-pasos de auditoría de deuda + informes por agente, Etapa 6.5 con limpieza explícita.
- `directrices/arquitectura.md`: ARQ-R-006 añadida (recomendaciones pasan de 5 a 6).
- `directrices/calidad.md`: CAL-R-005 añadida (recomendaciones pasan de 4 a 5) + §8 con ejemplo canónico CAL-046.
- `CLAUDE.md` de churrerIA: patrón de archivado declarado.
- `proyectos/_plantilla/`: estructura creada con esqueletos de etapa-6 + README.

**Trazabilidad cruzada**: cada cambio cita la propuesta numerada (`#1` a `#10`) que lo justifica.

---

## Cierre formal (sub-etapa 6.6)

**Gate 6.6 FIRMADO** por Alberto Muñoz Velasco (rol Director del ciclo + stakeholder) — 2026-05-23.

Verificación de cierre:

- ✅ Las 10 propuestas aceptadas en 6.4 están ejecutadas (9 cambios aplicados + 1 nota diferida #9 trazable).
- ✅ `retrospectiva.md` completa con §0-5 + "Cambios aplicados".
- ✅ `acta-retro.md` firmada.
- ✅ Trazabilidad cruzada (cada cambio cita su propuesta numerada).
- ✅ `memory.md` actualizado con la sesión y el estado del piloto.

**Piloto vocab-1000**: 🔒 **CERRADO EN EL ARNÉS**.

Primer recorrido completo del ciclo de 6 etapas. Queda como referencia consultable inmutable. No se reabre salvo que un incidente futuro lo justifique (y entonces sería post-mortem, no retrospectiva nueva).

**Estado de la Etapa 6 del arnés**: validada empíricamente con esta primera ejecución. El formato canónico se traslada a `proyectos/_plantilla/etapa-6/` para el siguiente proyecto.

