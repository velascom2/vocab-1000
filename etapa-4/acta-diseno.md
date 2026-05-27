---
proyecto: vocab-1000
etapa: 4
nombre_etapa: implementacion
propietario: UX
documento: acta-diseno
version: 5
fecha: 2026-05-22
autor_humano_validador: Alberto Muñoz Velasco
estado: aprobado
---

# acta-diseno.md — vocab-1000 · Etapa 4 (sub-etapa 4.1)

> Entregable canónico de la sub-etapa 4.1. Dos partes obligatorias: **Parte A — guía de estilos del sistema de diseño** + **Parte B — aplicación al producto vocab-1000** (decisión 2026-05-22, `ciclo.md` §3 Etapa 4.1).
>
> Historial:
> - **v1** (2026-05-22): paleta clara default, solo Parte B.
> - **v2** (2026-05-22): paleta SaaS premium oscura.
> - **v3** (2026-05-22): introduce Parte A (styleguide interactiva).
> - **v4** (2026-05-22): paleta startup fresca clara (familia C de USA-R-006).
> - **v5** (2026-05-22, este documento): cambio de identidad visual completo — tipografía **monoespaciada** + acento **teal terminal** + radios más cuadrados + sombras planas + sidebar fijo + cursor parpadeante. Look "terminal sobre blanco".

---

## 1. Inputs declarados

| Archivo | Versión | Origen |
|---|---|---|
| `funcional.md` | v3 | etapa 2 v2 (aprobado) |
| `tecnica.md` | v2 | etapa 2 v2 (aprobado) |
| `ux.md` | v2 | etapa 2 v2 (aprobado) |
| `hu.md` | v3 | etapa 3 v2 (aprobado) |
| `acta-refinamiento.md` | v2 | etapa 3 v2 (aprobado) |
| `directrices/usabilidad.md` | v1.1 | recomendaciones USA-R-006/007/008 |
| `ciclo.md` | (decisión 2026-05-22 actualizada) | doc general del arnés |
| `acta-diseno.md` | v1, v2, v3, v4 | snapshots históricos (Drive) |

---

## 2. Parte A — Guía de estilos del sistema de diseño v5

**Página interactiva navegable**: `http://localhost:3100/styleguide/`

Reutilizable entre proyectos del arnés. La identidad visual v5 establece **"terminal sobre blanco"** como dirección estética del sistema.

### 2.1. Colores (sección 01) — paleta v5

Fondos claros + acento teal terminal. Mantiene la regla "1 primary + neutros + semánticos" de USA-R-006 con un tono más sobrio y técnico que las paletas previas.

| Grupo | Tokens v5 |
|---|---|
| Fondos | `--color-bg` (#FFFFFF), `--color-surface` (#FFFFFF), `--color-surface-elevated` (#F8FAFC) |
| Texto | `--color-text` (#0F172A), `--color-text-muted` (#475569), `--color-text-faint` (#64748B) |
| Marca | `--color-primary` (#0F766E teal-700), `--color-primary-hover` (#0D5B54 teal-800), `--color-accent` (#14B8A6 teal-500) |
| Semánticos | `--color-success` (#15803D green-700), `--color-danger` (#B91C1C red-700), `--color-warning-soft` (#B45309 amber-700) |
| Bordes | `--color-border` (#E2E8F0 slate-200), `--color-border-strong` (#94A3B8 slate-400) |

**Cambios respecto a v4**:
- Primary deja indigo `#6366F1` → teal `#0F766E`. Más sobrio, menos genérico SaaS.
- Accent deja violet `#A855F7` → teal-500 `#14B8A6`. Familia única teal en toda la marca.
- Semánticos un tono más oscuros (de `-600` a `-700`). Más sobrios.
- `border-strong` sube de `slate-300` a `slate-400` — bordes más visibles, look más "cuadrado" / definido.

**Contraste verificado** (USA-013, USA-R-008): todos los pares ≥ 4.5:1.

![Sección Colores · desktop](mockup-snapshots/styleguide-desktop-colores.png)

### 2.2. Tipografía (sección 02) — v5 monoespaciada

Cambio sustancial respecto a v4: la tipografía por defecto pasa de `system-ui` a **monoespaciada** (`ui-monospace, "SF Mono", "Menlo", "Monaco", "Consolas", ...`).

Razones:
- Look terminal / developer-friendly inspirado en herramientas técnicas modernas (Cursor, Linear monospace, Matrix sobrio).
- Refuerza la sensación de "sistema" / "código" propia de una app de aprendizaje densa.
- Cada caracter ocupa el mismo ancho, lo que cuadra muy bien con el catálogo léxico donde alinear palabras de longitudes variables aporta legibilidad.

`--font-family-sans` se mantiene como token para casos puntuales que quieran romper la regla.

![Sección Tipografía · desktop](mockup-snapshots/styleguide-desktop-tipografia.png)

### 2.3. Espaciado (sección 03)

Sin cambios respecto a v4.

![Sección Espaciado · desktop](mockup-snapshots/styleguide-desktop-espaciado.png)

### 2.4. Radios y sombras (sección 04) — v5 más cuadrados, casi planas

Radios reducidos para look "código / terminal":
- `--radius-sm`: 0.375 → **0.125rem**.
- `--radius-md`: 0.75 → **0.25rem**.
- `--radius-lg`: 1 → **0.375rem**.
- `--radius-xl`: 1.5 → **0.5rem** (modales).

Sombras casi planas (alpha 0.04-0.10 sobre slate-900). El sistema renuncia a la "elevation suave" Linear/Vercel a favor de un look más brutalist / técnico.

![Sección Radios y sombras · desktop](mockup-snapshots/styleguide-desktop-radios-sombras.png)

### 2.5. Iconografía (sección 05)

Sin cambios respecto a v4 — glyphs Unicode (`→ ↻ ↔ ⓘ ✓ ✗ ✨ ·`). La migración eventual a ASCII puro (`-> [r] <-> [i]`) queda registrada como opción futura no priorizada.

![Sección Iconografía · desktop](mockup-snapshots/styleguide-desktop-iconografia.png)

### 2.6. Botones (sección 06)

Mismas 5 variantes con la nueva paleta teal/verde/rojo aplicada. Primary teal-700 sobre blanco. Etiquetas en minúsculas (la opción "uppercase tipo robot" queda como ajuste futuro no priorizado).

![Sección Botones · desktop](mockup-snapshots/styleguide-desktop-botones.png)

### 2.7. Inputs y formularios (sección 07)

Inputs con borde slate-400 (más visible), focus teal con halo sutil, error rojo, disabled con fondo slate-50.

![Sección Inputs · desktop](mockup-snapshots/styleguide-desktop-inputs.png)

### 2.8. Componentes del producto (sección 08)

Mismo catálogo (Header con cursor `_` parpadeante, DirectionButton, WordDisplay, Acepciones × 3, ProgressDual, Footer).

![Sección Componentes · desktop](mockup-snapshots/styleguide-desktop-componentes.png)

### 2.9. Banners y estados especiales (sección 09)

Mismas 4 variantes con la paleta v5 (warning amber-700, info teal-700, success green-700, danger red-700).

![Sección Banners · desktop](mockup-snapshots/styleguide-desktop-banners.png)

### 2.10. Layout y breakpoints (sección 10)

**Cambio v5**: el sidebar de la styleguide pasa de `position: sticky` a `position: fixed`. Razón: con `sticky` el navegador a veces lo desliza al pulsar anchor links en secciones bajas. `fixed` garantiza visibilidad permanente.

En mobile (`< 900px`) el sidebar se transforma en una barra horizontal fija arriba con scroll horizontal de los anchors, no se va al lateral.

Patrones de container y breakpoints del producto sin cambios.

![Sección Layout · desktop](mockup-snapshots/styleguide-desktop-layout.png)

### 2.11. Detalles "terminal" añadidos en v5

- **Cursor parpadeante** decorativo (clase utilitaria `.cursor`): se añade tras `vocab-1000` en el Header del producto y tras `vocab-1000 / sistema` en el sidebar de la styleguide. CSS-only con `@keyframes blink` que respeta `prefers-reduced-motion`.
- **Prefijo `>`** en teal antes del tagline de HOME y antes del título principal de la styleguide. Vibe prompt de shell.
- **Subtítulo `// Elige cómo quieres jugar`** con sintaxis de comentario de código.

### 2.12. Versiones mobile

| Sección | Mobile |
|---|---|
| Colores | ![colores mobile](mockup-snapshots/styleguide-mobile-colores.png) |
| Botones | ![botones mobile](mockup-snapshots/styleguide-mobile-botones.png) |
| Componentes | ![componentes mobile](mockup-snapshots/styleguide-mobile-componentes.png) |
| Banners | ![banners mobile](mockup-snapshots/styleguide-mobile-banners.png) |

---

## 3. Parte B — Aplicación al producto vocab-1000

### 3.1. Pantallas implementadas vs pendientes

Sin cambios estructurales respecto a v3/v4 — sólo la identidad visual cambia.

| Pantalla | HU origen | Estado |
|---|---|---|
| HOME-A | HU-001 | ✅ implementada |
| HOME-B / HOME-C | HU-002, HU-003 | ✅ implementada (Fase 4) |
| TURNO-1 | HU-004 | ✅ implementada |
| TURNO-2 `length=1` | HU-004, HU-005 | ✅ implementada |
| TURNO-2 `length=2` | HU-004, HU-005 | ✅ implementada |
| TURNO-2 `length=3` | HU-004, HU-005 | ✅ implementada |
| Fin de Ronda | HU-008 | ✅ implementada |
| Modal Reiniciar | HU-009 | ✅ implementada |
| Cambio de dirección mid-game | HU-006 | ✅ implementada (Fase 4) |
| Banner memory-only | HU-010 | ✅ implementada (Fase 5) |
| Error de carga | HU-011 | ✅ implementada (Fase 5) |
| Página "Acerca de" | HU-012 | ✅ implementada (Fase 8) |

### 3.2. Screenshots por viewport

#### HOME-A

| Desktop | Tablet | Mobile |
|---|---|---|
| ![HOME desktop](mockup-snapshots/desktop-home.png) | ![HOME tablet](mockup-snapshots/tablet-home.png) | ![HOME mobile](mockup-snapshots/mobile-home.png) |

#### TURNO-1

| Desktop | Tablet | Mobile |
|---|---|---|
| ![TURNO-1 desktop](mockup-snapshots/desktop-turno1.png) | ![TURNO-1 tablet](mockup-snapshots/tablet-turno1.png) | ![TURNO-1 mobile](mockup-snapshots/mobile-turno1.png) |

#### TURNO-2 — `length === 1` (monosémico)

| Desktop | Tablet | Mobile |
|---|---|---|
| ![TURNO-2 len=1 desktop](mockup-snapshots/desktop-turno2-len1.png) | ![TURNO-2 len=1 tablet](mockup-snapshots/tablet-turno2-len1.png) | ![TURNO-2 len=1 mobile](mockup-snapshots/mobile-turno2-len1.png) |

#### TURNO-2 — `length === 2` (polisémico inline)

`bank → banco · ribera`

| Desktop | Tablet | Mobile |
|---|---|---|
| ![TURNO-2 len=2 desktop](mockup-snapshots/desktop-turno2-len2.png) | ![TURNO-2 len=2 tablet](mockup-snapshots/tablet-turno2-len2.png) | ![TURNO-2 len=2 mobile](mockup-snapshots/mobile-turno2-len2.png) |

#### TURNO-2 — `length === 3` (polisémico vertical)

`take → agarrar / tomar / llevar`

| Desktop | Tablet | Mobile |
|---|---|---|
| ![TURNO-2 len=3 desktop](mockup-snapshots/desktop-turno2-len3.png) | ![TURNO-2 len=3 tablet](mockup-snapshots/tablet-turno2-len3.png) | ![TURNO-2 len=3 mobile](mockup-snapshots/mobile-turno2-len3.png) |

#### Fin de Ronda

| Desktop | Tablet | Mobile |
|---|---|---|
| ![Fin desktop](mockup-snapshots/desktop-fin.png) | ![Fin tablet](mockup-snapshots/tablet-fin.png) | ![Fin mobile](mockup-snapshots/mobile-fin.png) |

---

## 4. URLs locales para la sesión de review

- **Guía de estilos**: `http://localhost:3100/styleguide/`
- **Producto**: `http://localhost:3100/`

---

## 5. Histórico de decisiones visuales

- **v1**: paleta default Next.js.
- **v2**: paleta SaaS premium oscura.
- **v3**: introducción Parte A (styleguide).
- **v4**: paleta startup fresca clara.
- **v5 (este documento)**: cambio identidad completa — **tipografía monoespaciada + paleta teal terminal + radios cuadrados + sombras planas + sidebar fijo + cursor parpadeante**. Look "terminal sobre blanco" como dirección estética del sistema. Foco en sobriedad técnica.

---

## 6. Outputs producidos por esta sub-etapa 4.1 v5

| Artefacto | Tipo |
|---|---|
| `acta-diseno.md v5` | este documento |
| `mockup-snapshots/*.png` (40 archivos) | regenerados con identidad v5 |
| `codigo/src/app/globals.css` | tokens v5 (mono + teal + radius cuadrados + sombras planas) |
| `codigo/src/app/styleguide/page.tsx` | constantes de colores actualizadas a teal/green-700/red-700/amber-700/slate-400 + título con `>` prefix + cursor |
| `codigo/src/app/styleguide/page.module.css` | sidebar `position: fixed` con margin-left en main + responsive mobile (sidebar top) |
| `codigo/src/components/Header.tsx` | cursor `_` parpadeante tras `vocab-1000` |
| `codigo/src/app/page.tsx` y `page.module.css` | tagline con prefijo `>` teal, subtítulo `// ...`, sin gradient |

---

## 7. Opciones futuras no priorizadas en v5

Si el stakeholder o el UX deciden empujar más la dirección "terminal", quedan tres puntos abiertos para futuras iteraciones (no aplicados en v5):

1. **Botones en uppercase** (`MOSTRAR TRADUCCIÓN`, `ACERTÉ`, `FALLÉ`). Refuerza vibe robot.
2. **Iconografía ASCII pura** (`->`, `[r]`, `<->`, `[i]`, `[v]`, `[x]`) sustituyendo glyphs Unicode actuales. Coherente con tipografía mono.
3. **Primary alternativo `slate-900` (negro)** en lugar de teal, dejando teal solo como acento. Brutalist + terminal puro. Más extremo.

---

## 8. Veredicto y siguientes pasos

**Estado del entregable 4.1 v5**: completo.

**Sub-gate 4.2 v5 firmado por el stakeholder** el 2026-05-22 (aprobación de la dirección visual "terminal sobre blanco"). Procede arrancar **Fase 4 del plan de etapa 4 v1 del piloto** (Zustand + persistencia IDB+LS).

**Iteración**: si en algún momento el stakeholder o el UX deciden empujar más alguno de los 3 puntos del §7, sale `acta-diseno.md v6` sin retrabajo de componentes (sólo tokens y/o etiquetas).
