---
proyecto: vocab-1000
etapa: 2
nombre_etapa: kickoff
propietario: UX
documento: ux
version: 3
fecha: 2026-05-26
autor_humano_validador: Alberto Muñoz Velasco
estado: consolidado (retroactiva post-cierre)
---

# ux.md — vocab-1000 · Etapa 2 (iteración v2 — kickoff post-auditoría NGSL) + consolidación retroactiva

> Output del agente UX (fusionado con UI en fase 1).
>
> **v1** (kickoff inicial, 2026-05-21): propuesta UX + sistema de diseño + wireframes. Aprobado en gate de etapa 2.
> **v2** (kickoff iteración v2, 2026-05-21): actualizada para reflejar el nuevo modelo §4.1 v3 del `funcional.md` (sentidos atómicos + grupos por dirección — R-b). Cambios localizados en §4.5 (wireframes TURNO-2 con 3 variantes según `answers.length`), §5 (componente `Acepciones` nuevo), §13 nueva (trazabilidad v1→v2). El resto del documento se conserva intacto como contexto histórico válido.
> **v3** (2026-05-26): consolidacion-ux ejecutada en Etapa 6 retroactiva. Delta: §3 design tokens cross-referenciado al `etapa-4/acta-diseno.md v5` (look "terminal sobre blanco" firmado en sub-gate 4.2 v5, 2026-05-22). El prototipo y los wireframes de v2 siguen siendo el contrato de etapa 2; el sistema visual final del producto vive en el acta-diseno de etapa 4 — son artefactos coherentes pero de etapas distintas. Ver §14 Delta v3 al final.

---

## 1. Encuadre UX

vocab-1000 MVP es un juego web responsive con una mecánica de un solo flujo principal (ver palabra → revelar → autoevaluar) que se repite N veces. Esto **simplifica radicalmente la arquitectura de información**: hay pocas pantallas (3-4) y la mayoría del tiempo del jugador transcurre en una sola (pantalla de turno). El reto UX no es la navegación, es:

1. Hacer la mecánica de turno **rapidísima y sin fricción** (Acerté/Fallé en un tap, transición fluida).
2. Comunicar **estado dual** (dos direcciones con progreso independiente) sin saturar.
3. Acomodar el juego a **móvil (375px) + tablet + desktop** sin reescritura.
4. Ser **accesible WCAG 2.2 AA** (USA-014) sin sacrificar estética.

Las decisiones técnicas del turno 2 que el UX hereda y respeta:
- Next.js 15 + JSX puro + CSS Modules + design tokens en CSS Variables (USA-020).
- Fuente del sistema (`system-ui`), no fuentes web (no romper LCP).
- `env(safe-area-inset-*)` para futura WebView con Capacitor.
- Set canónico de 11 tipos gramaticales.
- Indicador de progreso doble señal y control de inversión informativo.

---

## 2. Mapa de pantallas (information architecture)

```
┌──────────────────┐
│ Home             │← Pantalla inicial. Variantes según progreso local:
│                  │   - HOME-A: sin progreso (selector limpio)
│                  │   - HOME-B: progreso en una dirección (card + continuar)
│                  │   - HOME-C: progreso en ambas (dos cards apiladas)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Turno            │← Pantalla de juego activa. Estado dual interno:
│                  │   - TURNO-1: viendo palabra origen (antes de revelar)
│                  │   - TURNO-2: traducción revelada (esperando autoevaluar)
└────────┬─────────┘
         │ (cuando se completa la dirección activa)
         ▼
┌──────────────────┐
│ Fin de ronda     │← Resumen + dos acciones
└──────────────────┘

Modal/aux:
- "Reiniciar dirección" → confirmación.
- "Acerca de" → atribución NGSL.
- "Sin persistencia" → aviso inline fijo.
```

3 pantallas principales + 1 confirmación + 1 página informativa. Cero menús. Cero modales bloqueantes salvo confirmación de reinicio.

---

## 3. Sistema de diseño (design tokens)

Tokens declarados como CSS Variables en `:root`. Permite tema oscuro futuro sin reescritura.

```css
:root {
  /* Color · paleta semántica */
  --color-bg: #fafafa;
  --color-surface: #ffffff;
  --color-text: #1a1a1a;
  --color-text-muted: #6b7280;
  --color-primary: #2563eb;        /* botón primario, foco */
  --color-success: #16a34a;        /* "Acerté" */
  --color-danger: #dc2626;         /* "Fallé" */
  --color-warning-soft: #f59e0b;   /* banner memory-only */
  --color-border: #e5e7eb;

  /* Spacing scale (rem) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  /* Tipografía */
  --font-family: system-ui, -apple-system, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 2rem;       /* palabra principal en turno */
  --font-size-xxl: 3rem;      /* palabra en desktop / tablet */
  --line-height-base: 1.5;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 8px rgba(0,0,0,.08);

  /* Safe area (Capacitor preview) */
  --safe-top: env(safe-area-inset-top);
  --safe-bottom: env(safe-area-inset-bottom);
}
```

**Por qué estos tokens y no más**:
- Cobertura mínima necesaria para todas las pantallas.
- `--color-success` y `--color-danger` son los únicos colores semánticos del juego — y SOLO se usan en combinación con texto y/o icono (CA-08, USA-014).
- Sin gradientes, sin sombras estéticas — coherente con USA-020 (claridad sobre adorno).

**Modo oscuro**: tokens preparados (declarar `:root[data-theme="dark"]`), pero **no se construye en MVP** (eleva al cierre como UX-Q3).

---

## 4. Prototipo de alto nivel (wireframes ASCII)

Los wireframes se entregan en ASCII por ser ágil para iteración rápida y porque el agente UX en fase 1 también emite JSX directamente — los wireframes son la fase **previa** al JSX, no su reemplazo (decisión 2026-05-02).

### 4.1. HOME-A (sin progreso)

```
┌────────────────────────────────┐
│ vocab-1000               ⓘ     │ ← header con título + info (Acerca de)
├────────────────────────────────┤
│                                │
│   Aprende vocabulario          │
│   de las palabras más usadas   │ ← microcopy explicativo (no instructions
│                                │     que rompan HU-01, solo encuadre)
│                                │
│   Elige cómo quieres jugar:    │
│                                │
│   ┌─────────────────────────┐  │
│   │  Español → Inglés    →  │  │
│   └─────────────────────────┘  │
│                                │
│   ┌─────────────────────────┐  │
│   │  Inglés → Español    →  │  │
│   └─────────────────────────┘  │
│                                │
│                                │
│   Vocabulario derivado de NGSL │ ← atribución persistente (PO-O2)
│   · CC BY-SA 4.0               │
└────────────────────────────────┘
```

### 4.2. HOME-B (progreso en una dirección)

```
┌────────────────────────────────┐
│ vocab-1000               ⓘ     │
├────────────────────────────────┤
│                                │
│   ┌─────────────────────────┐  │
│   │ Español → Inglés        │  │ ← card con resumen
│   │                         │  │
│   │ 247 / 1000              │  │ ← progreso hacia meta
│   │ 312 turnos jugados      │  │ ← esfuerzo (UX-O1 acordado)
│   │                         │  │
│   │ ▶ Continuar             │  │ ← acción primaria
│   │ ↻ Reiniciar             │  │ ← acción secundaria (con confirmación)
│   └─────────────────────────┘  │
│                                │
│   ┌─────────────────────────┐  │
│   │ Inglés → Español        │  │
│   │                         │  │
│   │ Aún no has empezado     │  │ ← estado vacío de la otra dirección
│   │                         │  │
│   │ + Empezar               │  │
│   └─────────────────────────┘  │
│                                │
│   ─── NGSL · CC BY-SA 4.0 ───  │
└────────────────────────────────┘
```

### 4.3. HOME-C (progreso en ambas)

```
┌────────────────────────────────┐
│ vocab-1000               ⓘ     │
├────────────────────────────────┤
│   ┌─────────────────────────┐  │
│   │ Español → Inglés        │  │
│   │ 247 / 1000  ·  312 turnos│ │
│   │ ▶ Continuar  ·  ↻       │  │ ← más compacto que HOME-B
│   └─────────────────────────┘  │ ← cards apiladas (UX-O4 acordado)
│   ┌─────────────────────────┐  │
│   │ Inglés → Español        │  │
│   │ 89 / 1000  ·  131 turnos│  │
│   │ ▶ Continuar  ·  ↻       │  │
│   └─────────────────────────┘  │
│                                │
│   ─── NGSL · CC BY-SA 4.0 ───  │
└────────────────────────────────┘
```

### 4.4. TURNO-1 (viendo palabra origen, antes de revelar)

```
┌────────────────────────────────┐
│  ES→EN  247/1000 · 312t   🔄    │ ← header: dirección, progreso doble, control
│        ↕ EN→ES 89/1000          │     de inversión (UX-OT5 acordado)
├────────────────────────────────┤
│                                │
│                                │
│                                │
│                                │
│         entender               │ ← palabra grande, centrada
│                                │     (font-size-xl, system-ui)
│                                │
│                                │
│   ┌─────────────────────────┐  │
│   │  Mostrar traducción     │  │ ← botón primario único
│   └─────────────────────────┘  │
│                                │
│                                │
└────────────────────────────────┘
```

### 4.5. TURNO-2 (acepciones reveladas — actualizado v2)

El grupo presentado puede tener entre 1 y 3 acepciones (`answers.length`, modelo §4.1 v3 + cap §4.11 del funcional). El render de TURNO-2 es **responsive a `length`**:

#### 4.5.1. Caso `length === 1` (monosémico, ~92-94% del catálogo)

```
┌────────────────────────────────┐
│  ES→EN  247/1000 · 312t   ⇄     │
│        ↕ EN→ES 89/1000          │
├────────────────────────────────┤
│                                │
│                                │
│         entender               │ ← palabra origen, CLS=0
│                                │
│         understand             │ ← única acepción (sin lista visible)
│         · v.  (verbo)          │ ← tipo gramatical localizado, único por grupo
│                                │
│  ┌──────────┐  ┌──────────┐    │
│  │ ✓ Acerté │  │ ✗ Fallé  │    │ ← CA-08 / USA-014
│  └──────────┘  └──────────┘    │
│                                │
└────────────────────────────────┘
```

#### 4.5.2. Caso `length === 2` (polisémico moderado, render inline)

```
┌────────────────────────────────┐
│  EN→ES  142/1000 · 187t   ⇄     │
│        ↕ ES→EN 247/1000         │
├────────────────────────────────┤
│                                │
│                                │
│           bank                 │ ← palabra origen, CLS=0
│                                │
│        banco · ribera          │ ← dos acepciones separadas por `·`
│       · sust.  (sustantivo)    │ ← tipo gramatical único
│                                │
│  ┌──────────┐  ┌──────────┐    │
│  │ ✓ Acerté │  │ ✗ Fallé  │    │
│  └──────────┘  └──────────┘    │
│                                │
└────────────────────────────────┘
```

#### 4.5.3. Caso `length === 3` (polisémico máximo, render vertical)

```
┌────────────────────────────────┐
│  EN→ES  142/1000 · 187t   ⇄     │
│        ↕ ES→EN 247/1000         │
├────────────────────────────────┤
│                                │
│           take                 │ ← palabra origen, CLS=0
│                                │
│          agarrar               │ ← lista vertical centrada
│          tomar                 │
│          llevar                │
│          · v.  (verbo)         │ ← tipo gramatical único, al final
│                                │
│  ┌──────────┐  ┌──────────┐    │
│  │ ✓ Acerté │  │ ✗ Fallé  │    │
│  └──────────┘  └──────────┘    │
│                                │
└────────────────────────────────┘
```

#### 4.5.4. Reglas de render

- **Marcado semántico**: las acepciones se renderizan **siempre** como `<ul>` con un `<li>` por acepción, independientemente del modo de presentación (inline o vertical). Esto garantiza que un lector de pantalla las enuncie como elementos separados.
- **Decisión inline vs vertical**: por **CSS** (`display: inline-flex` vs `flex-direction: column`), no por estructura HTML. Cero JS de medición de viewport.
  - `length === 1`: render lineal (sin marcador visible). El `<li>` único se estiliza sin viñeta.
  - `length === 2`: inline. CSS coloca los `<li>` lado a lado separados por ` · ` (vía `::before` o gap).
  - `length === 3`: vertical. CSS coloca los `<li>` apilados centrados.
- **Tipo gramatical**: **aparece una sola vez por grupo**, fuera del `<ul>`. La polisemia es intra-tipo por construcción del modelo §4.1 v3 del funcional.
- **Anuncio accesible**: `aria-live="polite"` en el contenedor del grupo revelado. El lector de pantalla enuncia las acepciones como lista (cada `<li>` por separado), seguido del tipo gramatical.
- **Cap operativo**: el componente **asume** `answers.length ∈ [1, 3]`. Si recibe `> 3`, falla en build (regla §4.11 del funcional). En runtime esto no debe pasar.
- **Layout shift**: la palabra origen mantiene CLS=0 (no se mueve entre TURNO-1 y TURNO-2). Los botones de autoevaluar pueden bajar 1-2 líneas según `length` — aceptable, la palabra origen es la referencia visual.

### 4.6. Fin de ronda

```
┌────────────────────────────────┐
│ vocab-1000               ⓘ     │
├────────────────────────────────┤
│                                │
│       ✨                       │ ← ilustración mínima
│                                │
│   ¡Has completado              │
│   Español → Inglés!            │
│                                │
│   1000 palabras acertadas      │ ← resumen concreto (PO-O3 acordado)
│   1247 turnos jugados          │
│   80,2% de aciertos            │
│                                │
│   ┌─────────────────────────┐  │
│   │ ↻ Volver a empezar      │  │
│   └─────────────────────────┘  │
│   ┌─────────────────────────┐  │
│   │ ↔ Cambiar dirección     │  │
│   └─────────────────────────┘  │
│                                │
└────────────────────────────────┘
```

### 4.7. Modal de confirmación de reinicio

```
       ┌────────────────────────┐
       │                        │
       │  ¿Reiniciar la ronda   │
       │  de Español → Inglés?  │
       │                        │
       │  Tu progreso actual    │
       │  (247 / 1000) se       │
       │  perderá. La otra      │
       │  dirección no se toca. │
       │                        │
       │  ┌─────────┐ ┌──────┐  │
       │  │ Cancelar│ │ Sí, │  │ ← acción destructiva diferenciada
       │  │         │ │ reiniciar│
       │  └─────────┘ └──────┘  │
       │                        │
       └────────────────────────┘
```

### 4.8. Banner sin persistencia (modo memory-only)

```
┌────────────────────────────────┐
│ ⚠ Este navegador no guardará   │ ← banner fijo arriba del header (UX-OT6)
│   tu progreso entre sesiones.  │     · color-warning-soft, no rojo agresivo
├────────────────────────────────┤
│ vocab-1000               ⓘ     │
│  ...                           │
```

---

## 5. Componentes UI

| Componente | Variantes | Uso |
|---|---|---|
| `Button` | `primary`, `secondary`, `success`, `danger`, `ghost` | Acciones principales y autoevaluación. Mínimo 44×44px (tactile, USA-014). |
| `Card` | `direction`, `empty` | Resumen de dirección en HOME. |
| `Header` | `home`, `turno` | Top bar con título o estado del juego. |
| `WordDisplay` | `prompt`, `revealed` | Palabra grande centrada (TURNO-1) y revelada (TURNO-2 cabecera). |
| `Acepciones` (nuevo v2) | render responsive según `answers.length` | Renderiza `<ul>` con un `<li>` por acepción. CSS decide modo: lineal (length=1), inline separadas por ` · ` (length=2), vertical (length=3). Inputs: `answers: string[]`, `pos: PartOfSpeech`. |
| `ProgressDual` | inline | Indicador `247/1000 · 312 turnos` reutilizable. |
| `DirectionSwitch` | inline | Control compuesto del header con dirección activa, control y mini-progreso de la otra (TQ-U1 cerrado por UX). |
| `Modal` | `confirm` | Confirmación de reinicio. |
| `Banner` | `warning`, `info` | Banner memory-only y otros avisos no bloqueantes. |
| `Layout` | base | Container responsive con `padding` que respeta safe-area. |

Componentes mínimos. Cero dependencias UI externas. Coherente con bundle < 100KB del Técnico.

---

## 6. Responsive

Tres breakpoints semánticos:

| Breakpoint | Aplica a | Layout principal |
|---|---|---|
| `< 600px` | móvil | Pantalla de turno: palabra grande centrada (`font-size-xl`), botones full-width apilados. |
| `600px - 1024px` | tablet | Pantalla de turno: palabra más grande (`font-size-xxl`), botones lado a lado en una fila. |
| `> 1024px` | desktop | Pantalla de turno: contenido centrado en columna de máximo 600px, mucho aire alrededor. La palabra grande aún ocupa el centro del viewport. |

**Reglas firmes**:
- En móvil, el control de inversión (🔄) tiene un área táctil mínima de 44×44px.
- En móvil, los botones "Acerté/Fallé" son full-width apilados — más fácil de pulsar con un solo pulgar.
- En tablet/desktop, los botones "Acerté/Fallé" son lado a lado y caben en una sola fila.

---

## 7. Accesibilidad (WCAG 2.2 AA)

- **Color + texto + icono** en Acerté/Fallé (CA-08, USA-014).
- **Contraste**: todas las parejas color/fondo verificadas ≥ 4.5:1 para texto regular, ≥ 3:1 para texto grande.
- **Foco visible**: outline 2px con `color-primary` en todos los interactivos.
- **Tab order** lineal y predecible: header → control de inversión → contenido → botones.
- **Etiquetas ARIA**:
  - El control de inversión lleva `aria-label="Cambiar a inglés → español"` (dinámico).
  - El botón "Mostrar traducción" anuncia su acción mediante `aria-live="polite"` cuando la traducción aparece.
- **Reduced motion**: respetar `prefers-reduced-motion: reduce` desactivando animaciones de transición.
- **Tipo gramatical**: cuando se muestra abreviado (`sust.`), incluir el texto completo en `title` y `aria-label` para lectores de pantalla.

---

## 8. Microinteracciones

- **Revelar traducción**: fade-in suave (~150ms) de la traducción + tipo gramatical + botones autoevaluar. El botón "Mostrar" se sustituye, no se mueve. **CLS=0**.
- **Acertar/Fallar**: feedback breve (color flash en el botón pulsado ~120ms) y transición a la siguiente palabra. **Sin pantalla intermedia**, sin "siguiente" extra.
- **Cambio de dirección**: animación de cross-fade (~200ms) entre la palabra antigua y la nueva. La estructura del header no salta.
- **Reinicio confirmado**: el modal se cierra, la home muestra el estado reset con un leve fade.
- **Sin animaciones**: si `prefers-reduced-motion: reduce`, todas las transiciones se desactivan; los cambios son instantáneos.

---

## 9. Estados especiales

| Estado | Comportamiento |
|---|---|
| **Cargando catálogo** | Pantalla con título + spinner mínimo. Si tarda > 3s, mensaje "Cargando…". |
| **Catálogo no carga** (VB-04) | Pantalla full-screen con copy validado: "No se ha podido cargar el juego. Recarga la página o vuelve a intentarlo más tarde." + botón "Reintentar". |
| **Memory-only** (VB-05, sin IDB/LS) | Banner amarillo fijo arriba del header durante toda la sesión, no-dismissable. |
| **Última palabra acertada** (VB-02) | Transición directa a la pantalla de fin de ronda sin intermedios. |
| **Sin red durante carga inicial** | Comportamiento como "Catálogo no carga" — el catálogo es estático bundleado, si no carga es bug. |

---

## 10. Respuesta a las preguntas elevadas

### 10.1. A las PQ-U del PO (turno 1)

- **PQ-U1** (cambio de dirección antes de autoevaluar): acepto la propuesta del PO (opción a — la palabra no autoevaluada vuelve a la cola de la dirección abandonada como pendiente). Es coherente: el turno no se cerró. Sin cambio respecto a lo que el PO ya decidió.
- **PQ-U2** (formato del indicador de progreso): el UX implementa el indicador **doble señal** acordado en UX-O1: `247 / 1000 · 312 turnos`. Sin barra de progreso — el número es más informativo en este caso y ocupa menos.
- **PQ-U3** (confirmación del reinicio): **modal de confirmación**, no doble tap ni undo. Razón: el reinicio es destructivo y poco frecuente; el modal evita falsos positivos sin añadir fricción al uso normal. Wireframe en §4.7.
- **PQ-U4** (aviso de no-persistencia): **banner inline fijo no-dismissable**, color amarillo suave. Wireframe en §4.8. Coherente con USA-013.

### 10.2. A las TQ-U del Técnico (turno 2)

- **TQ-U1** (control de inversión informativo): resuelto por UX-OT5 → control compuesto en header con progreso miniatura de la otra dirección. Implementado en §4.4 y §4.5.
- **TQ-U2** (safe-area-inset-*): aceptado y materializado en design tokens (`--safe-top`, `--safe-bottom`).
- **TQ-U3** (banner memory-only no-dismissable): aceptado y materializado en §9 y §4.8.

### 10.3. A las decisiones reabiertas

- **UX-OT7** (abreviaturas de tipos gramaticales): el UX usa **responsive**:
  - Desktop / tablet: tipo completo ("verbo", "sustantivo").
  - Móvil < 600px: tipo abreviado ("v.", "sust.") junto al texto completo en `aria-label` para accesibilidad.
  - El componente `WordDisplay` decide variant según viewport, sin necesidad de duplicar contenido en el catálogo.

---

## 11. Cuestiones que el UX eleva

### Para el PO

- **UX-Q1** — ¿Sonido en MVP? El stakeholder no menciona audio en `00-necesidad-stakeholder.md`. El UX **NO incluye sonido** por defecto (cero coste cognitivo, accesible en entornos públicos). Pide confirmación.
- **UX-Q2** — ¿Hay copy/microcopy clave que el PO quiera revisar antes de implementar? Tres frases candidatas: (a) tagline en HOME-A ("Aprende vocabulario de las palabras más usadas"), (b) felicitación final ("¡Has completado…!"), (c) mensaje de error de carga. Si el PO acepta delegar, el UX lo cierra; si no, los lleva a su revisión.

### Para el Técnico

- **UX-Q3** — Modo oscuro: ¿se construye en MVP o se difiere? Los tokens están preparados — coste de añadir es activar `prefers-color-scheme: dark` + tokens del tema oscuro. UX-friendly de añadir pero implica QA en dos temas.
- **UX-Q4** — Animaciones (§8): ¿el Técnico ve riesgo de regresión en CLS / INP con las transiciones propuestas (~150-200ms)? Especialmente la cross-fade del cambio de dirección.

### Transversal (PO + Técnico)

- **UX-Q5** — Diferencia entre "Aún no has empezado" (estado vacío de una dirección en HOME-B) y "Has terminado" (estado completado): el wireframe HOME-B muestra solo el primer estado. ¿Qué hacemos cuando una dirección está **completada** (acertadas = 1000) y el jugador entra a HOME? Propuesta UX: card de la dirección completada muestra "✅ Completada · 1000/1000 · 1247t · 80%" con acciones "Volver a empezar" y "Ver resumen" (que abre el fin de ronda otra vez). Pide ratificación.

---

## 12. Cierre del turno del UX — cruces y respuestas

Kickoff opción C, mini-ronda 3 (última). Orden: cruce PO → cruce Técnico → respuesta UX.

### 12.1. Cruce del PO

> Voz del PO leyendo el `ux.md` recién emitido.

**Acuerdo general**: el prototipo cubre todas las HU con un mapa de pantallas mínimo y un sistema de diseño coherente con la simplicidad del producto. Objeciones / decisiones:

- **PO-OU1 sobre UX-Q1 (sonido)**: confirmado **sin sonido en MVP**. Coherente con el anonimato y la jugabilidad en cualquier entorno (oficina, transporte público). Si en fase 2/3 entra audio, será opt-in.
- **PO-OU2 sobre UX-Q2 (microcopy)**: delego los tres en el UX:
  - Tagline HOME-A: el actual ("Aprende vocabulario de las palabras más usadas") está bien.
  - Felicitación final: aceptado el wording propuesto.
  - Mensaje de error de carga: aceptado el copy del Técnico (§6.2 de `tecnica.md` + §9 de `ux.md`).
- **PO-OU3 sobre UX-Q5 (estado "dirección completada" en HOME)**: validado. Una dirección al 1000/1000 muestra estado "completada" con acciones "Volver a empezar" y "Ver resumen". El "Ver resumen" abre la pantalla de fin de ronda en **modo readonly** (sin acciones primarias, solo "Cerrar"). Aprovecha el mismo componente.
- **PO-OU4 sobre §4.6 (resumen final, fórmula del %)**: el copy "80,2% de aciertos" debe ser **inequívoco** sobre qué se mide. Pido que el UX anote en el componente: `% aciertos = palabras acertadas / turnos totales × 100`. Tooltip o microcopy "(aciertos sobre turnos jugados)" al lado del número si no satura.
- **PO-OU5 sobre §4.2 (HOME-B, card "Aún no has empezado")**: el copy `+ Empezar` puede ser ambiguo cuando se ve sola. Propongo `+ Empezar en inglés → español` (replicando la dirección). Coherente con la card hermana de HOME-C que sí muestra dirección.
- **PO-OU6 nueva — sobre §4.5 (TURNO-2, tipo gramatical)**: el wireframe muestra `· v. (verbo)` — texto duplicado abreviado + completo. ¿Es intencional o redundante? El PO sugiere que en la pantalla principal aparezca solo el formato responsive (full o abrev. según viewport), no ambos. La forma completa **solo en accesibilidad** (`aria-label`).

### 12.2. Cruce del Técnico

> Voz del Técnico leyendo el `ux.md` recién emitido.

**Acuerdo general**: el sistema de tokens es simple y coherente con CSS Modules + CSS Variables del stack. Sin librerías UI pesadas. Bundle objetivo (< 100KB JS, < 20KB CSS) se mantiene viable. Objeciones:

- **TEC-OU1 sobre §4.4 (control de inversión 🔄)**: el emoji `🔄` se renderiza distinto entre Apple, Google y Microsoft, y de manera **especialmente impredecible** dentro de WebView (Capacitor en fase 2). En iOS WebView, el emoji se ve diferente que en Safari standalone. **Propongo SVG inline o icono CSS estilizado**, no emoji. Cero coste de implementación y consistencia visual cross-platform.
- **TEC-OU2 sobre §4.7 (modal de confirmación)**: el modal debe usar **`<dialog>` HTML nativo** con focus trap automático y backdrop click manageable. Cero JS de gestión de foco, accesibilidad gratis. Cierro como recomendación firme.
- **TEC-OU3 sobre UX-Q3 (modo oscuro)**: **diferir a fase 2**. Razón:
  - Aumenta la matriz de QA (tests en dos temas).
  - Implica un trabajo de revisión de contrastes en oscuro que no es trivial.
  - Los tokens preparados permiten activarlo en fase 2 sin reescritura.
  - El MVP gana en simplicidad sin perder usuarios (la mayoría aceptan tema claro como default).
- **TEC-OU4 sobre UX-Q4 (animaciones)**: las transiciones de 150-200ms con `opacity` y `transform` (no `width`/`height`/`top`/`left`) **no rompen CWV ni INP**. Cierro como aceptado: las animaciones propuestas en §8 son seguras.
- **TEC-OU5 sobre §6 (responsive)**: confirmo que los 3 breakpoints se implementan **CSS-only** con `@media` queries, no `useMediaQuery` JS. Cero coste de runtime, cero hydration mismatch. Pido al UX que ratifique esto en su respuesta.
- **TEC-OU6 sobre §7 (ARIA `aria-live`)**: el botón "Mostrar traducción" cambia la región. Recomiendo `aria-live="polite"` en el contenedor de traducción + tipo (no en el botón). Detalle técnico, cierra el comportamiento del lector de pantalla.
- **TEC-OU7 nueva — sobre §8 (`prefers-reduced-motion`)**: aceptado y aplaudido. Añado que las transiciones se desactivan vía CSS `@media (prefers-reduced-motion: reduce)`, no vía JS. Coherente con TEC-OU5.

### 12.3. Respuesta del UX

> Voz del UX tras leer ambos cruces.

**Acepto sin reabrir** (todos los del PO y del Técnico que son ajustes o confirmaciones):
- PO-OU1, PO-OU2, PO-OU3 (validados).
- PO-OU4 (anoto fórmula del % con microcopy aclaratorio "(sobre turnos jugados)" al lado del número en la pantalla final).
- PO-OU5 (copy de la card vacía pasa a `+ Empezar en inglés → español` con sustitución dinámica de la dirección).
- PO-OU6 (validado — la pantalla principal muestra solo el formato responsive; el texto completo va solo en `aria-label`). Anoto: el wireframe §4.5 tenía un error de redundancia.
- TEC-OU2 (`<dialog>` nativo con focus trap).
- TEC-OU3 (modo oscuro diferido a fase 2). Cierro UX-Q3.
- TEC-OU4 (animaciones validadas). Cierro UX-Q4.
- TEC-OU5 (responsive CSS-only). Confirmado.
- TEC-OU6 (`aria-live="polite"` en el contenedor de la traducción).
- TEC-OU7 (reduced-motion via CSS).

**Acepto con cambio** (un punto reabierto en mi propuesta):

- **TEC-OU1 (emoji `🔄` → SVG)**: aceptado con cambio. Sustituyo el emoji por un **icono SVG inline** estandarizado (par de flechas circulares). Cero dependencia, consistencia cross-platform garantizada. Lo materializo como token de componente (`<Icon name="swap" />` con SVG inline). Esto es **un gap real** de mi propuesta que el Técnico ha atrapado: confié en glyphs Unicode para iconografía sin pensar en la WebView. Anoto para mi `CLAUDE.md` futuro.

**Estado del turno 3**: cerrado.

**Estado del kickoff de etapa 2**: las **tres mini-rondas completas**. Los tres outputs (`funcional.md`, `tecnica.md`, `ux.md`) tienen secciones de cierre con cruces aplicados.

**Hilos vivos al cierre del kickoff** (a tratar en el gate de etapa 2 del Director):

1. Muestra de 30 entradas del catálogo (compromiso del Técnico, ejecución durante etapa 3).
2. Ratificación PO de la opción (ii) sobre palabras-función NGSL (filtrar artículos/auxiliares vacíos).
3. Cierre formal del catálogo ARQ-018 con las decisiones de stack del piloto (§11 de `tecnica.md`).
4. Iconografía: paso de emoji a SVG inline (TEC-OU1) registrado, materialización en etapa 4.

**Listos para el gate humano de etapa 2.**

---

## 13. Trazabilidad v1 → v2 (kickoff iteración v2)

**Disparador**: `auditoria-ngsl.md v1` dictamina >5% de polisemia intra-tipo en NGSL-1000. El kickoff iteración v2 (ver `acta-kickoff.md v2`) redecide §4.1 del funcional a modelo de **sentidos atómicos + agrupación por dirección (R-b)**. Esto cambia lo que TURNO-2 muestra al jugador (cuando hay polisemia).

**Cambios en este documento**:

| Sección | Cambio | Razón |
|---|---|---|
| Encabezado | Añadida nota de v2 con disparador y alcance | Trazabilidad de la regeneración |
| §4.5 TURNO-2 | Reescrito por completo. Antes: un solo wireframe (entrada monosémica). Ahora: 3 wireframes (length 1, 2, 3) + reglas de render | Modelo §4.1 v3 del funcional cambia lo que TURNO-2 muestra cuando hay polisemia |
| §5 Componentes UI | Añadido componente `Acepciones` | Encapsular la lógica de render responsive por `length` |
| §10, §11, §12 (preguntas elevadas, cierres) | Sin tocar — contexto histórico válido | Regla del bucle: los outputs previos se citan como inputs, no se reescriben |

**Lo que NO cambia respecto a v1**:
- §1 Encuadre UX, §2 Mapa de pantallas, §3 Sistema de diseño (design tokens) — intactos.
- §4.1 (HOME-A), §4.2 (HOME-B), §4.3 (HOME-C), §4.4 (TURNO-1), §4.6 (Fin de ronda), §4.7 (modal reset), §4.8 (banner memory-only) — intactos.
- §6 Responsive, §7 Accesibilidad, §8 Microinteracciones, §9 Estados especiales — intactos.

**Inputs declarados de v2** (regla 2026-05-21):
- `funcional.md v3` (estado borrador, post-mini-ronda).
- `tecnica.md v2` (modelo de datos actualizado).
- `auditoria-ngsl.md v1` (output que disparó la iteración).
- `ux.md v1` (la propia versión anterior, como base).
- `hu.md v2` (contexto del estado del piloto).

**Output**: este `ux.md v2` (borrador, espera gate humano de etapa 2 iteración v2).

---

## 14. Delta v3 (Etapa 6 retroactiva — consolidacion-ux 2026-05-26)

Aplicación de la habilidad `consolidacion-ux` sobre el piloto cerrado el 2026-05-23 (Excepción retroactiva post-cierre):

- **UX-INC-01** (tipo C — feature no declarada) — resuelta cross-ref a `etapa-4/acta-diseno.md v5`: el `ux.md v2` describe el prototipo de etapa 2 con un sistema de diseño preliminar. El **sistema visual final** del producto (paleta "terminal sobre blanco" + tipografía monospace + radios reducidos + cursor parpadeante decorativo + styleguide navegable en `/styleguide`) se forjó en el sub-gate 4.2 a través de **cinco iteraciones v1→v5** durante etapa 4 y firmó en v5 el 2026-05-22. La consolidación NO reescribe los wireframes ni los tokens preliminares de v2 — los deja como contrato de etapa 2; el lector debe acudir a `etapa-4/acta-diseno.md v5` (Drive: `15S9LIgDIUmkjF-o5j1hXbY0s9NRs-z3t` / `1OEApcenZiGHRtDlNf0HYMYe0s4HfEAa9`) para el sistema visual que llegó a producción.

**Sin cambios en wireframes**: los 8 wireframes (HOME-A/B/C, TURNO-1, TURNO-2 con 3 variantes de polisemia, Fin de ronda, Modal Reset, banner memory-only) coinciden con el producto desplegado y siguen siendo el contrato de UX de etapa 2.

**Sin cambios en componentes**: la lista §5 (Button, DirectionButton, Acepciones, WordDisplay, ProgressDual, Modal, MemoryOnlyBanner, Header, Footer, DirectionCard, DirectionSwitch, GameClient, HomeClient) coincide con `codigo/src/components/`.
