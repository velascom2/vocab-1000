---
proyecto: vocab-1000
etapa: 2
nombre_etapa: kickoff
propietario: Técnico
documento: tecnica
version: 3
fecha: 2026-05-26
autor_humano_validador: Alberto Muñoz Velasco
estado: consolidado (retroactiva post-cierre)
---

# tecnica.md — vocab-1000 · Etapa 2 (iteración v2 — kickoff post-auditoría NGSL) + consolidación retroactiva

> Output del agente Técnico (CTO + Arquitecto fusionados, fase 1).
>
> **v1** (kickoff inicial, 2026-05-21): propuesta técnica + stack + contratos. Aprobado en gate de etapa 2.
> **v2** (kickoff iteración v2, 2026-05-21): actualizada para reflejar el nuevo modelo §4.1 v3 del `funcional.md` (sentidos atómicos + grupos por dirección — R-b de `acta-kickoff.md v2`). Cambios localizados en §3.4 (shape progreso), §3.5 nueva (asimetría direccional), §4.3 (proceso de construcción), §4.4 (set canónico ampliado a 11 tipos), §4.5 (modelo de entrada léxica reescrito), §11 (catálogo final con criterio de cap), §13 nueva (trazabilidad v1→v2). El resto del documento se conserva intacto como contexto histórico válido.
> **v3** (2026-05-26): consolidacion-tecnica ejecutada en Etapa 6 retroactiva. Deltas concentrados en §2.1 (stack real: Next.js 16.2.6 + Vercel free tier — drift respecto a Next.js 15 + Strato/k3s declarados), §4 (cifras catálogo real: 1000 en_es / 1419 es_en — asimetría declarada por §3.5/§4.5 ahora con cifras concretas), §6.2 (mecanismo Next.js 16 `error.tsx + unstable_retry`). Ver §14 Delta v3 al final. Sin cambios en arquitectura: la decisión de fase 1 (frontend 100% cliente con catálogo embebido + persistencia IDB→LS→memory-only) se mantiene; solo se actualizan piezas concretas del stack a la realidad construida y desplegada.

---

## 1. Encuadre técnico

vocab-1000 MVP es un **frontend 100% cliente** con catálogo estático embebido o servido como JSON, persistencia local del progreso, sin servidor con lógica de negocio ni base de datos. La elección técnica está condicionada por cuatro restricciones que vienen del PO y del workspace:

- **R-02 (sin coste por usuario)** + criterio firme 2026-05-02 → preferencia explícita open source / plan free sin tarjeta.
- **R-03 (capacidad de empaquetado nativo preservada)** → el frontend debe ser un bundle que pueda envolverse como app iOS/Android sin reescritura.
- **R-04 (no bloquear fase 2/3)** → el progreso persistido en cliente debe ser **migrable** a backend sin cambiar el shape de los datos.
- **Decisión 2026-05-02** (UX emite directamente HTML/JSX) → descarta Flutter (Dart) y React Native (que renderiza componentes nativos, no DOM).

---

## 2. Stack del piloto MVP

### 2.1. Capa Frontend (única capa en MVP)

| Pieza | Decisión | Razón |
|---|---|---|
| Framework | **Next.js 16.2.6 (App Router) + TypeScript** (consolidado v3 — antes v2 declaraba 15) | JSX puro (coherente con 2026-05-02), agentes lo generan limpio, ecosistema maduro. `output: 'export'` permite estático sin SSR runtime. Next.js 16 introduce breaking changes vs 15 (`unstable_retry` en error boundaries, `useRouter` de `next/navigation`, etc.); el `AGENTS.md` del repo advierte explícitamente. |
| Build estático | Mode `'export'` con `next build` (`next.config.ts` real: `output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`) | Genera HTML+JS+CSS servibles desde cualquier static server o CDN. Cero runtime Node en producción. |
| Lenguaje | **TypeScript estricto** | `strict: true`, `noUncheckedIndexedAccess: true`. CAL (calidad) lo recomienda; tipos del catálogo y del progreso son contrato que el Técnico defiende. |
| Estado UI | **Zustand 5** | Store minimal sin boilerplate, los agentes lo escriben con poca fricción. Persistencia desacoplada del store (no usamos `persist` middleware, ver §3). |
| Persistencia | **IndexedDB nativa** con fallback a **LocalStorage** y `memory-only` (consolidado v3 — `idb-keyval` no se usó al final; el código usa la API nativa de IndexedDB en `lib/persistence.ts`) | Ver §3. |
| i18n UI | **`next-intl` 4** | Estándar Next.js. Para MVP solo es/en de la UI; el catálogo es contenido, no UI. |
| Styling | **CSS Modules + design tokens en CSS Variables** | Coherente con USA-020. Cero coste, cero dependencia, accesibilidad cromática nativa. Sistema final firmado en sub-gate 4.2 v5: paleta "terminal sobre blanco" + tipografía monospace + radios reducidos (ver `etapa-4/acta-diseno.md v5`). |
| Tests | **Vitest** (unit + integración) + **Playwright** (e2e + responsive) | Ya en catálogo ARQ-018. |
| Lint / format | **Biome 2** | Una sola herramienta, rapidísima, configuración mínima. Alternativa Prettier+ESLint queda descartada por complejidad. |
| Hosting MVP | **Vercel free tier** (consolidado v3 — antes v2 declaraba Strato VC 6-24 + k3s + nginx-ingress) | Decisión efectiva tomada durante Etapa 5 (2026-05-22): zero-config para Next.js, import directo desde GitHub (`velascom2/vocab-1000`), auto-deploy en `push`. URL canónica de producción: `https://vocab-1000.vercel.app/`. La opción Strato+k3s+nginx-ingress queda como **plan B documentado** para cuando la fase 2 requiera infra propia. |

### 2.2. Capa de empaquetado nativo (capacidad preservada, no construir en MVP)

- **Capacitor 7** envolverá el bundle estático para producir apps iOS y Android cuando entre fase 2.
- Decisión: aditivo, no reescribe. Las APIs nativas (haptics, notificaciones) se llaman vía plugins de Capacitor solo si la HU lo requiere.
- **Por qué no Tauri/PWA pura**: Tauri exige Rust (curva mayor para los agentes y dependencia extra). PWA pura no es app real en App Store (criterio del stakeholder en `00-necesidad-stakeholder.md`).
- **Implicación para el MVP**: ninguna decisión del MVP puede usar APIs `window.*` que Capacitor no soporte en WebView. En la práctica, IndexedDB, LocalStorage y fetch son universales.

### 2.3. Capa Backend (fase 2, no construir en MVP)

- **Python 3.12 + FastAPI** — genera contrato OpenAPI desde el código (regala ARQ-010), OTel auto-instrumentación maduro, pytest, agentes generan código limpio.
- **PostgreSQL 16** para datos de usuario y progreso persistente por cuenta.
- **Redis 7** para sessions + rate-limit.
- **No se levanta en MVP**. Queda decidido para que el shape del progreso de cliente coincida con el shape del recurso REST de fase 2 (ver §4.4).

---

## 3. Persistencia local del progreso (PQ-T1 del PO)

### 3.1. Decisión

**IndexedDB vía `idb-keyval`** con fallback a **LocalStorage** y aviso inline si ambos fallan.

### 3.2. Razonamiento (trade-off PO solicitado)

| Criterio | LocalStorage | IndexedDB |
|---|---|---|
| API | Síncrona, simple | Asíncrona, `idb-keyval` la simplifica a `get/set` |
| Tamaño | 5-10 MB típico | 50 MB+ típico, soporta GBs |
| Estructura | Solo strings (requiere `JSON.stringify`/`parse` en cada acceso) | Objetos nativos, lecturas atómicas |
| Modo incógnito Safari | Falla escritura | Falla escritura |
| Soporte navegadores | Universal | >97% caniuse (Safari 10+) |

**Veredicto**: para un progreso que es un objeto anidado de tamaño medio (~50KB en ronda larga) con lecturas atómicas en cada turno, IndexedDB es **mejor encaje conceptual**. Tamaño no es el motivo (LocalStorage sobraría); el motivo es no parsear JSON en cada `set` y aislarse de race conditions cuando dos turnos solapan (Acerté + cambio de dirección).

### 3.3. Detección de soporte (PQ-T4)

Al cargar la app:

1. Probar escritura+lectura en IndexedDB con una clave canaria (`__vocab1000_probe__`).
2. Si IDB falla → probar lo mismo con LocalStorage.
3. Si LS falla también → marcar `storageMode = 'memory-only'` y disparar evento que UX muestra como aviso inline (UX-O5).

### 3.4. Shape de los datos persistidos (contrato fase 2 — actualizado v2)

```typescript
type Direction = 'es-en' | 'en-es';

// Identificador estable de grupo (lo que el jugador percibe como "una entrada"):
// 'en_es:noun:bank' o 'es_en:noun:banco'
type GroupId = string;

interface DirectionState {
  catalogVersion: string;      // ID del catálogo cargado, para invalidación
  acertadas: GroupId[];        // groupIds acertados en esta dirección
  pendientes: GroupId[];       // cola ordenada de groupIds pendientes (incluye reinsertados)
  turnosJugados: number;       // turnos totales en la ronda actual
  iniciadaEn: string;          // ISO 8601 (UTC)
}

interface ProgressDocument {
  version: 2;                  // schema version (bump v1→v2 por cambio de unidad de progreso)
  activeDirection: Direction | null;
  directions: Record<Direction, DirectionState | null>;
  lastModified: string;        // ISO 8601 (UTC)
}
```

**Cambio respecto a v1**: la unidad indexada del progreso pasa de `entryId` (entrada léxica clásica) a `groupId` (grupo presentado en la dirección activa, ver §4.5 v2). Razón: con el nuevo modelo §4.1 v3 del funcional, lo que el jugador percibe como "una entrada" es el **grupo** (un lema con array de acepciones), no el sentido atómico.

**`groupId` es estable mientras `(direction, pos, lema)` sea estable**. El catálogo puede añadir o retirar acepciones de un grupo (extendiendo o reduciendo `answers[]`) sin afectar al progreso, mientras el grupo siga existiendo. R-04 respetado.

**Extensión a granularidad de acepción (fase 2/3)**: si el producto evoluciona a recordar qué acepciones específicas conoce el jugador (recomendaciones, estadísticas de fase 3), se añade un campo opcional:

```typescript
interface DirectionState {
  // ...campos anteriores
  acertadasPorSentido?: Record<GroupId, SenseId[]>; // opcional, no rompe v2
}
```

Esto es **no-rompedor** del shape v2 actual. Cuando entre fase 2/3, los clientes existentes siguen funcionando.

Este shape **es** el shape del recurso REST `GET /me/progress` de fase 2. La migración cliente→servidor es serializar/deserializar el mismo objeto, sin transformación.

### 3.5. Asimetría direccional del catálogo (nuevo, v2)

El nuevo modelo §4.1 v3 del funcional declara que **el catálogo es asimétrico entre direcciones**:

- En `en→es`, los lemas EN polisémicos (~6-8% del catálogo) se agrupan en un único grupo con `answers.length > 1`. Ejemplo: `bank` → `['banco', 'ribera']`.
- En `es→en`, los lemas ES correspondientes (`banco`, `ribera`, …) son **grupos separados** con `answers.length === 1` porque las palabras españolas suelen ser monosémicas en estos casos.

**Implicación técnica**: las dos direcciones se construyen como **dos colecciones independientes de grupos** en el JSON del catálogo. No hay garantía de simetría de cardinalidad. Estimación: si el catálogo origen son ~1080 sentidos atómicos (1000 lemas EN únicos × promedio 1,08 acepciones), tras agrupar resultan:

- `en→es`: **~1000 grupos** (uno por lema EN único; los polisémicos colapsan).
- `es→en`: **~1080 grupos** (uno por lema ES único; cada acepción ES de un lema EN polisémico es un grupo distinto).

El nombre "vocab-1000" sigue siendo nominal: ~1000 grupos por dirección, con leve asimetría inherente al lenguaje.

**Cifras reales del catálogo desplegado** (consolidación v3, 2026-05-26 — verificado sobre `codigo/src/catalog/data/catalog.ts` versión `ngsl-2026-05-22`): **1000 grupos `en_es`** + **1419 grupos `es_en`**. La asimetría real (1,42×) es mayor que la estimada (~1,08×) — la auditoría NGSL operativa produjo más sentidos distintos por lado ES de los previstos en la estimación. Distribución de `answers.length` sobre los 2419 grupos totales: 1441 × 1 acepción, 893 × 2 acepciones, 85 × 3 acepciones, ninguno con 4+ (cap §4.11 del funcional respetado). La marca "vocab-1000" se refiere al cap exacto de la dirección `en→es`.

**Operativamente** (Técnico al construir el catálogo): el JSON estático sirve `{ en_es: Group[], es_en: Group[] }`. Cada dirección se carga independientemente al inicializar la ronda correspondiente.

---

## 4. Catálogo de palabras (PQ-T3)

### 4.1. Fuente elegida

**NGSL — New General Service List (Browne, Culligan & Phillips, 2013)**. Subconjunto de las primeras ~1000 entradas por frecuencia.

### 4.2. Justificación (CA-07)

| Fuente | Cobertura | Licencia | Disponibilidad | Coste | Veredicto |
|---|---|---|---|---|---|
| **NGSL** | 2800 palabras que cubren ~92% del inglés general según corpus académico | **CC BY-SA 4.0** | CSV público en newgeneralservicelist.com | 0 € | **Elegida**. Primeros 1000 lemas. |
| Oxford 3000 | 3000 palabras, cubre nivel A1-B2 CEFR | © Oxford University Press, uso académico **restringido**, no redistribuible comercialmente | Disponible vía Oxford Learner's Dictionaries | 0 € en uso personal | **Descartada por R-02** (limita comercialización). |
| COCA top frequency | Frecuencias en corpus contemporáneo de 1B+ palabras | Acceso al corpus de pago (BYU) | Listas derivadas variables | 50-200 USD/año por usuario | **Descartada** por coste y complejidad de derivar 1000 lemas estables. |
| Word frequency wikilist / scrapes | Variable | Variable, a menudo dudosa | Heterogénea | 0 € | **Descartada** por riesgo legal y calidad. |

**Por qué exactamente 1000**: el stakeholder lo pidió aproximadamente, el Técnico cierra "los primeros 1000 lemas de NGSL ordenados por frecuencia descendente". Cifra exacta queda en NGSL-1000.

### 4.3. Proceso de construcción (actualizado v2)

1. Descargar NGSL CSV (CC BY-SA, atribución obligatoria en créditos del producto).
2. Tomar los primeros 1000 lemas por frecuencia, **filtrando palabras-función vacías** según §4.2 del funcional v3 (descender en el ranking para completar 1000 lemas léxicamente útiles).
3. Para cada lema, identificar **todos sus tipos gramaticales** documentados en el corpus → un conjunto de **sentidos atómicos** por (lema, tipo, acepción) (modelo §4.1 v3 del funcional).
4. Traducir a español (pasada LLM + revisión humana con criterio "traducción que el jugador esperaría", no la académica).
5. **Agrupar por dirección de juego** según §4.5 v2:
   - Dirección `en→es`: agrupar sentidos por `(pos, lema_en)`. Cada grupo tiene `answers[]` = lista de acepciones ES, ordenadas por frecuencia descendente.
   - Dirección `es→en`: agrupar sentidos por `(pos, lema_es)`. Análogo.
6. **Aplicar cap operativo §4.11**: si un grupo tiene `answers.length > 3`, seleccionar las **3 acepciones más útiles para nivel A2/B1**. Criterio de selección: frecuencia descendente; en caso de empate, mayor utilidad pedagógica (descartar acepciones idiomáticas, slang, o muy específicas). Documentar las acepciones descartadas en el changelog del catálogo para auditoría.
7. Salida: archivo JSON estático `catalog-vocab1000.json` versionado en el repo, con campo `version` para invalidación. Estructura: `{ version, source, license, en_es: Group[], es_en: Group[] }`.

**Cardinalidades finales** (estimadas):
- ~1000 grupos en dirección `en→es` (uno por lema EN único tras filtrado).
- ~1080 grupos en dirección `es→en` (las acepciones ES de los lemas EN polisémicos quedan como grupos separados).
- ~1080 sentidos atómicos en el catálogo (1000 lemas EN × promedio 1.08 acepciones).

### 4.4. Set canónico de tipos gramaticales (actualizado v2 — 11 tipos)

11 categorías (set actualizado en §4.3 del funcional v2, ratificado en v3):

| ID interno | UI español (full) | UI español (compact) |
|---|---|---|
| `noun` | sustantivo | sust. |
| `verb` | verbo | v. |
| `adjective` | adjetivo | adj. |
| `adverb` | adverbio | adv. |
| `pronoun` | pronombre | pron. |
| `preposition` | preposición | prep. |
| `conjunction` | conjunción | conj. |
| `interjection` | interjección | interj. |
| `determiner` | determinante | det. |
| `numeral` | numeral | num. |
| `modal` | modal | mod. |

Traducción a la UI vía `next-intl`. Versión `full` o `compact` según viewport (decisión UX: compact en < 600px).

### 4.5. Modelo de entrada léxica (reescrito v2)

Implementa el modelo §4.1 v3 del funcional (sentidos atómicos + agrupación por dirección).

```typescript
type PartOfSpeech =
  | 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun'
  | 'preposition' | 'conjunction' | 'interjection'
  | 'determiner' | 'numeral' | 'modal';

type Direction = 'en_es' | 'es_en';

// Unidad atómica del catálogo (un sentido = una acepción concreta):
interface Sense {
  id: string;              // estable, ej "ngsl-0142-noun-bank-banco"
  pos: PartOfSpeech;
  en: string;              // lema EN del sentido
  es: string;              // lema ES del sentido
}

// Grupo presentado al jugador en una dirección (lo que el jugador percibe como "una entrada"):
interface Group {
  groupId: string;         // 'en_es:noun:bank' o 'es_en:noun:banco'
  pos: PartOfSpeech;
  prompt: string;          // lema origen ('bank' en en_es, 'banco' en es_en)
  answers: string[];       // lemas destino. answers.length ∈ [1, 3] por cap §4.11 del funcional
  senseIds: string[];      // referencia a los sentidos atómicos que componen el grupo
}

interface Catalog {
  version: string;         // ej "ngsl-1000-2026-05"
  source: 'ngsl';
  license: 'CC BY-SA 4.0';
  senses: Sense[];         // ~1080 sentidos atómicos
  en_es: Group[];          // ~1000 grupos en dirección en→es
  es_en: Group[];          // ~1080 grupos en dirección es→en
}
```

**Invariantes**:
- `Group.answers.length ∈ [1, 3]` (cap §4.11 del funcional). Violación = build falla.
- `Group.groupId` derivado de `(direction, pos, prompt)` y estable mientras esos tres lo sean.
- `Group.pos` es **único por grupo** (polisemia es intra-tipo por construcción).
- `Group.senseIds` apunta a sentidos válidos en `Catalog.senses`. Permite extender a granularidad de acepción en fase 2/3 sin romper el modelo.

---

## 5. Empaquetado nativo (PQ-T2)

- **MVP**: solo web. El bundle `next export` se sirve estático en Strato + k3s + nginx-ingress.
- **Fase 2**: el mismo bundle se envuelve con **Capacitor** para iOS y Android.
- **Aviso al UX**: el prototipo debe asumir que en algún momento estará dentro de una WebView con notch / safe-area. Usar `env(safe-area-inset-*)` y diseñar para que el header del juego no se cubra con la barra de estado. Es trivial añadir, costoso re-añadir.
- **Compatibilidad WebView**: ningún uso de `window.open`, `popups`, `iframe`. Sin pagos, sin OAuth (el MVP es anónimo). Cero fricción.

---

## 6. Detección de soporte y mensajes de error

### 6.1. Sin persistencia local (VB-05, UX-O5)

- Detección: §3.3.
- Mensaje (copy técnico, UX define forma final): "Este navegador no guardará tu progreso entre sesiones. Puedes jugar igualmente."
- Con `dismiss` persistente solo si IDB funciona (sin IDB, el aviso reaparece al recargar — coherente).

### 6.2. Catálogo corrupto / no carga (VB-04)

- Mensaje validado por PO (TEC-O5): "No se ha podido cargar el juego. Recarga la página o vuelve a intentarlo más tarde."
- Si en algún momento futuro hay un endpoint dinámico del catálogo, distinguir "sin conexión" de "corrupto". En MVP el catálogo es bundleado → si no carga, es bug de despliegue, no del usuario.
- **Mecanismo implementado** (consolidación v3 — antes v2 no lo declaraba): `codigo/src/app/error.tsx` (error boundary de Next.js App Router) con prop `unstable_retry` (API específica de Next.js 16, **diferente** de `reset` de versiones anteriores). Renderiza copy del PO + botón "Reintentar" que dispara el retry sin recarga completa. Implementa HU-011.

---

## 7. Performance y Core Web Vitals

Objetivos para cumplir HU-01 (`< 5s en 4G de referencia`) y USA-025 (Core Web Vitals):

| Métrica | Objetivo MVP | Cómo se asegura |
|---|---|---|
| Bundle JS gzipped | < 100 KB | Next.js 15 + tree shaking + sin librerías UI pesadas (sin MUI/Antd). |
| Catálogo JSON gzipped | < 80 KB | 1000-1300 entradas × ~50 bytes c/u = ~60-80 KB. |
| CSS gzipped | < 20 KB | CSS Modules + tokens en CSS Variables, sin frameworks de utility. |
| Total inicial | < 200 KB | Suma de los anteriores. |
| LCP | < 2.5 s | Render server-time-zero (estático), prefetch de fuente del sistema. |
| INP | < 200 ms | Eventos simples (un tap = un setState). Sin re-renders innecesarios. |
| CLS | < 0.1 | Sin imágenes con dimensión variable; layout estable desde primer frame. |

---

## 8. Observabilidad (en MVP, mínima)

- MVP es 100% cliente sin backend → no hay logs server-side a emitir.
- **Cliente**: errores no controlados se envían al `console.error` por defecto. Cuando entre fase 2, se conectan a SigNoz vía OTel (decisión 2026-05-02).
- **No se construye instrumentación en MVP** salvo `console.error` natural. Coherente con OBS para producto-cero-usuarios.
- En cuanto haya backend (fase 2), el contrato OpenAPI declara que cada endpoint emite logs estructurados + trazas OTel.

---

## 9. Respuesta a las PQ-T del PO

- **PQ-T1** (persistencia): IndexedDB+fallback. §3.
- **PQ-T2** (empaquetado): Capacitor en fase 2. §5.
- **PQ-T3** (fuente y tipos): NGSL primeros 1000 lemas + 10 tipos. §4.
- **PQ-T4** (detección de soporte): §3.3 + §6.1.

---

## 10. Cuestiones que el Técnico eleva al kickoff

Para el PO y el UX. **El Técnico no decide funcionalidad ni visuales**.

### Para el PO

- **TQ-P1** — Ambigüedad **dentro del mismo tipo gramatical** (no resuelta por el modelo nuevo). Ejemplo: `bank` es sustantivo tanto para "banco financiero" como para "ribera del río". La tupla `(id, pos, en, es)` no separa acepciones; admite una sola traducción `es` por (lema, tipo). Tres opciones:
  - (a) Traducción canónica única por (lema, tipo) — elegir la acepción más frecuente. Riesgo: el jugador piensa "ribera" pero el catálogo espera "banco", lo marca "Fallé" injustamente.
  - (b) Permitir `es: string[]` (varias traducciones aceptables). UX muestra la primera y permite expandir.
  - (c) Tratar cada acepción como entrada distinta (`bank-noun-finance`, `bank-noun-river`). Catálogo crece más; UX debe diferenciar visualmente.
  - **Propuesta del Técnico**: opción (b) — un único elemento visual con la traducción canónica + "(y variantes)" si hay más. Pide al PO ratificar.

- **TQ-P2** — Atribución legal de NGSL: el producto debe incluir un crédito visible "Vocabulario derivado de NGSL (Browne, Culligan, Phillips) — CC BY-SA 4.0". ¿Dónde y cómo lo encaja el PO? Footer del juego, modal "Acerca de", página `creditos.md`? El Técnico necesita pista para reservar espacio en el prototipo.

- **TQ-P3** — Versionado del catálogo: si en fase 2/3 el catálogo se actualiza (más entradas, mejores traducciones), ¿el progreso del jugador se preserva contra la nueva versión? Decisión funcional sobre migración. Propuesta del Técnico: las IDs son estables, las nuevas entradas entran como pendientes; las eliminadas (raras) desaparecen del progreso sin pérdida visible. **Pide validación**.

### Para el UX

- **TQ-U1** — El control de inversión de dirección (HU-08) está cargado de **estado**: la dirección activa, el progreso conservado en la otra. UX debe diseñar un control que **comunique** esa carga (ej. indicador de progreso de la otra dirección en miniatura). El Técnico no impone formato pero levanta el riesgo de que un control simétrico (doble flecha) ofrezca poca información.
- **TQ-U2** — `safe-area-inset-*` para futuro Capacitor (§5). El UX debe diseñar respetando que la app puede estar embebida con notch.
- **TQ-U3** — Estado "memory-only" (sin persistencia disponible): UX-O5 ya acepta aviso inline, pero ¿cómo se comunica al jugador que el progreso **NO** se guardará entre recargas? Propuesta: el aviso del header se mantiene fijo durante toda la sesión (no dismissable cuando sin storage).

### Para PO y UX (transversal)

- **TQ-X1** — El Técnico recomienda **medir** desde día uno aunque no haya backend: usar `navigator.sendBeacon` contra un endpoint mínimo de telemetría (gratis, latencia cero) para registrar eventos del juego. Sería un MVP de telemetría. **Pero contradice MVP-zero-coste** si requiere infraestructura propia. Lo levanta como **pregunta**, no decisión: ¿se introduce un endpoint de telemetría mínima en MVP o se difiere a fase 2/3? **El Técnico se inclina por DIFERIR** (coherente con §8): sin usuarios, no hay nada que medir.

---

## 11. Catálogo ARQ-018 (pendiente sistémico, no del piloto)

El Técnico observa que el catálogo ARQ-018 de la directriz de Arquitectura está **parcialmente vacío** (decisiones del 2026-05-13). Las elecciones de §2 deben **poblar** ese catálogo como entrada inicial:

- Frontend: Next.js + TypeScript ↔ ARQ-018.
- Persistencia cliente: IndexedDB + idb-keyval.
- Empaquetado nativo: Capacitor.
- Backend: FastAPI + PostgreSQL + Redis (declarado, no implementado en MVP).
- Linter: Biome.
- Tests: Vitest + Playwright.

**Cierre formal de ARQ-018**: se hace **al cerrar el kickoff completo** de etapa 2 (tras turno UX). El Técnico levanta esto para que el Director (Alberto) lo gestione en el gate de etapa 2.

---

## 12. Cierre del turno del Técnico — cruces y respuestas

Kickoff opción C, mini-ronda 2. Orden: cruce PO → cruce UX → respuesta Técnico.

### 12.1. Cruce del PO

> Voz del PO leyendo el `tecnica.md` recién emitido.

**Acuerdo general**: el stack es coherente con las restricciones funcionales, y la elección NGSL+CC BY-SA cumple R-02 sin atajos. Mis objeciones / decisiones:

- **PO-O1 sobre TQ-P1 (ambigüedad dentro del mismo tipo, `bank` financiero vs. ribera)**: descarto la propuesta (b) del Técnico (`es: string[]`). Razón: introduce un caso UX nuevo (mostrar la primera + expandir el resto) que **complica el cierre del MVP**. Decido **opción (c)**: entradas separadas con IDs distintos (`bank-noun-finance`, `bank-noun-river`). El modelo se mantiene simple: una entrada = una traducción canónica. **Condición**: el Técnico audita el subconjunto NGSL-1000 antes de construir el catálogo final. Si más del 5% del catálogo presenta acepciones múltiples problemáticas, reabrimos.
- **PO-O2 sobre TQ-P2 (atribución NGSL)**: acepto. La atribución vive en **dos sitios**:
  - Footer permanente del juego (línea pequeña: "Vocabulario derivado de NGSL · CC BY-SA 4.0").
  - Página/modal "Acerca de" con la atribución completa, enlace al sitio oficial y licencia.
- **PO-O3 sobre TQ-P3 (versionado del catálogo)**: acepto la propuesta del Técnico. IDs estables, nuevas entradas entran como pendientes, eliminadas desaparecen del progreso. Lo elevo a regla funcional: el progreso es **idempotente respecto a la versión del catálogo** mientras los IDs sean estables.
- **PO-O4 sobre TQ-X1 (telemetría en MVP)**: validado diferir. Sin usuarios, no hay nada que medir y no procede gastar ni un minuto en infraestructura de telemetría.
- **PO-O5 nueva — sobre §4.3 (proceso de traducción LLM + revisión humana)**: tres preguntas:
  - ¿Quién revisa? En fase 1 propones "Alberto en rol Director". OK pero quiero anotar el coste (tiempo humano una vez).
  - ¿Calidad esperada de las traducciones? Una palabra mal traducida lleva al jugador a fallar injustamente. Pido que la revisión humana lo haga **con criterio de "traducción que el jugador esperaría", no la más académica**.
  - ¿Y si NGSL trae lemas como "be", "have", "do"? La traducción canónica de "do" no es trivial. Lo levanto: necesito saber si nos vamos a topar con muchas palabras-función inicios-de-lista cuya traducción tiene poco valor pedagógico.
- **PO-O6 sobre §4.4 (set canónico de 10 tipos gramaticales)**: ¿está cubierto el caso de palabras del inglés que en español **no tienen traducción directa** (gerundios, modales, artículos definidos)? Ejemplos: `the`, `a` (artículos), `would`, `could` (modales). El set canónico tiene "determinante" pero "modal" no está. ¿Modal se considera verbo? Pido al Técnico aclarar.

### 12.2. Cruce del UX

> Voz del UX leyendo el `tecnica.md` recién emitido.

**Acuerdo general**: el stack me deja control total sobre HTML/JSX y CSS, sin imponer librería UI con estilos propios. Es lo que necesito. Objeciones:

- **UX-OT1 sobre §3 (IndexedDB asíncrono)**: me preocupa la **latencia perceptible** entre turnos. Si cada `set` del progreso espera al disco, ¿hay flash visual o estado intermedio? Necesito que el Técnico me confirme que `idb-keyval.set` no introduce loading state perceptible en el ciclo "Acerté/Fallé → siguiente palabra".
- **UX-OT2 sobre §4.3 (traducciones LLM+revisión)**: antes de cerrar el catálogo, **quiero ver una muestra de 20-30 entradas** ya traducidas para validar la legibilidad y el tono. La diferencia entre "comprender" como traducción de `understand` y "entender" cambia cómo se percibe el juego.
- **UX-OT3 sobre §5 (Capacitor + safe-area)**: aceptado, lo añado a mi propuesta UX.
- **UX-OT4 sobre §7 (Core Web Vitals)**: aceptados los objetivos. Yo además me comprometo a no introducir fuentes web que rompan LCP — uso `font-family: system-ui` o similar. Lo cierro en mi turno.
- **UX-OT5 sobre TQ-U1 (control de inversión informativo)**: propongo concreto — el control va en el header con esta forma:

  `[ progreso dirección activa ] · 🔄 [ progreso dirección inversa (mini) ]`

  Al pulsar, se intercambian. La presencia del "mini" comunica que la otra dirección tiene progreso conservado (o muestra `0/1000` si nunca se ha jugado). Cierra TQ-U1 desde mi lado.
- **UX-OT6 sobre TQ-U3 (modo memory-only)**: acepto. Aviso fijo no-dismissable durante toda la sesión cuando IDB+LS fallan. Lo materializo como banner del header en rojo suave (no rojo agresivo — coherente con USA-002).
- **UX-OT7 nueva — sobre §4.4 (10 tipos gramaticales)**: cuando se muestre el tipo gramatical en español al jugador (F2bis), las palabras largas como "preposición" o "interjección" pueden romper el layout en móvil pequeño (375px). Necesito espacio o abreviatura. Propongo abreviaturas estándar: `sust., v., adj., adv., pron., prep., conj., interj., det., num.` Pido validación del PO (decisión funcional: ¿abrevia o no?).

### 12.3. Respuesta del Técnico

> Voz del Técnico tras leer ambos cruces.

**Acepto sin reabrir**:
- **PO-O1 opción (c)**: acepto. Auditaré los 1000 primeros lemas NGSL en la fase de construcción del catálogo y reportaré porcentaje real de acepciones múltiples. Compromiso de reabrir el modelo si > 5%.
- **PO-O2 atribución dual**: aceptado. Footer + página "Acerca de".
- **PO-O3 idempotencia del progreso vs. versión del catálogo**: aceptado y elevado a invariante del modelo. Lo documento en `tecnica.md` final como ARQ candidata (catálogos versionados con IDs estables).
- **PO-O4 diferir telemetría**: confirmado.
- **UX-OT3, OT4, OT5, OT6**: aceptados.

**Respuesta a UX-OT1 (latencia IndexedDB)**: confirmado que **no hay latencia perceptible**. `idb-keyval.set` con un objeto de < 50KB tarda < 5ms en hardware razonable. Estrategia adicional: actualizamos el store de Zustand **inmediatamente** (estado en memoria), y el `set` a IDB ocurre en paralelo sin bloquear la UI. Si el `set` falla, el estado en memoria sigue siendo correcto (se reintentará en el siguiente turno o al cerrar). El usuario nunca espera al disco. Cierro UX-OT1.

**Respuesta a UX-OT2 (muestra del catálogo)**: aceptado. El Técnico se compromete a producir, antes del cierre del kickoff completo de etapa 2 (o como hito de etapa 3 si se prefiere mover), una **muestra de 30 entradas representativas** (10 sustantivos top, 10 verbos top, 5 adjetivos, 5 misceláneo) ya traducidas, para validación conjunta PO+UX. Lo anoto como **entregable intermedio**.

**Respuesta a UX-OT7 (abreviaturas de tipos)**: la decisión es funcional, no técnica. **Devuelvo al PO** (PO-OT7-response): el catálogo expone identifiers internos en inglés (`noun`, `verb`...); la presentación en español (palabra completa o abreviatura) es decisión del UX en consenso con el PO. El Técnico solo asegura que `next-intl` puede manejar dos versiones (`noun.full = "sustantivo"`, `noun.short = "sust."`) si se decide responsive.

**Respuestas a las preguntas nuevas del PO**:

- **PO-O5 (criterio de traducción + palabras-función)**:
  - Quien revisa: en fase 1, Alberto como Director. **Coste estimado**: 1000-1300 entradas × ~20 segundos/entrada de revisión = **5-7 horas** de trabajo humano una sola vez. Reducible si se acepta confiar en la pasada LLM con muestra de control.
  - Criterio: acepto "traducción que el jugador esperaría". Lo elevamos a directriz del proceso de catálogo.
  - Palabras-función (`the`, `a`, `do`, `be`, `have`): **el Técnico levanta esto como decisión funcional del PO** — devuelvo. Tres opciones:
    - (i) Incluirlas y traducir con criterio (`the → el/la`, `do → hacer`). El jugador puede sentir que son rellenos.
    - (ii) Filtrar las palabras-función del top 1000 NGSL y descender en el ranking para completar (los lemas 1001-1100 entran).
    - (iii) Incluir solo algunas (los verbos modales y auxiliares sí; los artículos definidos no).
  - **Propuesta del Técnico**: opción (ii) — filtrar palabras-función vacías (artículos, conjunciones simples) y reemplazar con los siguientes en frecuencia. El número final puede acabar en ~1050 entradas tras este filtrado + entradas múltiples por ambigüedad. **Pide ratificación al PO**.
- **PO-O6 (modales en el set canónico)**: válido el flag. **Propongo añadir un undécimo tipo: `modal` (verbos modales en español: poder, deber, querer)**. Los verbos modales del inglés (`would`, `could`, `should`, `must`, `may`, `might`) no son verbos plenos en el sentido tradicional. Set canónico final: **11 tipos**. Cerrado salvo objeción del PO.

**Status del turno 2**: cerrado. Listos para abrir turno 3 del UX.

**Hilos vivos al cierre del turno 2** (no cerrados aún, esperan turno 3 o gate):
- Muestra de 30 entradas del catálogo (compromiso del Técnico, pendiente ejecutar).
- Decisión PO sobre palabras-función (opción (ii) propuesta, ratificación pendiente).
- Decisión PO/UX sobre abreviaturas de tipos en UI (resoponsivo opcional).
- Cierre de ARQ-018 al final del kickoff completo (capítulo §11 de este archivo).

---

## 13. Trazabilidad v1 → v2 (kickoff iteración v2)

**Disparador**: `auditoria-ngsl.md v1` dictamina >5% de polisemia intra-tipo en NGSL-1000. El kickoff iteración v2 (ver `acta-kickoff.md v2`) redecide §4.1 del funcional a modelo de **sentidos atómicos + agrupación por dirección (R-b)**.

**Cambios en este documento**:

| Sección | Cambio | Razón |
|---|---|---|
| Encabezado | Añadida nota de v2 con disparador y alcance | Trazabilidad de la regeneración |
| §3.4 Shape del progreso persistido | Indexación de `entryId` → `groupId`. Schema bumped a v2. Extensión opcional `acertadasPorSentido` declarada | Modelo §4.1 v3 del funcional cambia la unidad de progreso |
| §3.5 (nueva) Asimetría direccional del catálogo | Sección nueva | Propiedad emergente del nuevo modelo: las dos direcciones tienen distinta cardinalidad por naturaleza del lenguaje |
| §4.3 Proceso de construcción | Paso 5 nuevo (agrupar por dirección), paso 6 nuevo (aplicar cap §4.11). Cardinalidades estimadas actualizadas | Reflejar la construcción agrupada |
| §4.4 Set canónico | 10 → 11 tipos (añade `modal`); columna "compact" añadida | Ya estaba en funcional v2 §4.3, ahora también en tecnica |
| §4.5 Modelo de entrada léxica | Reescrito por completo: `Sense` + `Group` en lugar de `LexicalEntry`. Catalog ahora tiene `senses[]` + `en_es[]` + `es_en[]` | Implementa §4.1 v3 del funcional |
| §11 ARQ-018 | Sin cambios estructurales; el cierre formal sigue siendo post-gate de etapa 2 (cualquiera de las iteraciones) | Las decisiones de stack del piloto no cambian |
| §10, §12 (cuestiones que el Técnico eleva, cierre del turno) | Sin tocar — son contexto histórico del kickoff v1, válidos como referencia | Regla del bucle: los outputs previos se citan como inputs, no se reescriben |

**Lo que NO cambia respecto a v1**:
- Stack tecnológico (§2): Next.js 15 + TypeScript + Zustand + IndexedDB + Capacitor + Strato k3s. Intacto.
- Persistencia local (§3.1, §3.2, §3.3): IndexedDB + LS fallback. Intacto.
- Catálogo fuente (§4.1, §4.2): NGSL + justificación CA-07. Intacto.
- Empaquetado nativo (§5): Capacitor fase 2. Intacto.
- Performance y Core Web Vitals (§7): mismos objetivos. Intacto.
- Observabilidad (§8): mínima en MVP. Intacto.
- ARQ-018 (§11): pendiente sistémico. Intacto.

**Inputs declarados de v2** (regla 2026-05-21):
- `funcional.md v3` (estado borrador, post-mini-ronda).
- `auditoria-ngsl.md v1` (output que disparó la iteración).
- `tecnica.md v1` (la propia versión anterior, como base sobre la que se itera).
- `hu.md v2` (output de refinamiento v1, contexto del estado del piloto).

**Output**: este `tecnica.md v2` (borrador, espera gate humano de etapa 2 iteración v2).

---

## 14. Delta v3 (Etapa 6 retroactiva — consolidacion-tecnica 2026-05-26)

Aplicación de la habilidad `consolidacion-tecnica` sobre el piloto cerrado el 2026-05-23 (Excepción retroactiva post-cierre). 4 inconsistencias detectadas en auditoría `tecnica.md` ↔ código + infra reales:

- **TEC-INC-01** (tipo A — contradicción) — resuelta en §2.1 fila Framework: v2 declaraba **Next.js 15 + App Router**. Realidad: **Next.js 16.2.6** (verificado en `codigo/package.json`). Next.js 16 introduce breaking changes que ya están en uso en el código del piloto (`unstable_retry` en `error.tsx`, `useRouter` de `next/navigation`).
- **TEC-INC-02** (tipo A — contradicción fuerte) — resuelta en §2.1 fila Hosting MVP: v2 declaraba **Strato VC 6-24 + k3s + nginx-ingress**. Realidad: **Vercel free tier**, decisión efectiva tomada durante Etapa 5 (2026-05-22). URL canónica `https://vocab-1000.vercel.app/`. La decisión Strato+k3s queda anotada como plan B para fase 2 con infra propia, pero NO es lo desplegado.
- **TEC-INC-03** (tipo A — corrección de cifras) — resuelta en §3.5: v2 estimaba `~1080 grupos es_en` con asimetría ~1,08×. Realidad: **1419 grupos es_en** con asimetría real ~1,42×. La auditoría NGSL operativa produjo más sentidos distintos por lado ES de los previstos. La estructura del modelo y la cardinalidad de `answers.length` (1441 × 1, 893 × 2, 85 × 3) sí coinciden con lo declarado en §4.5 + §4.11 del funcional.
- **TEC-INC-04** (tipo C — decisión no declarada) — resuelta en §6.2: v2 hablaba del mensaje del PO pero no mencionaba el **mecanismo concreto Next.js 16** (`error.tsx` con `unstable_retry`). Documentado ahora con cross-ref a `codigo/src/app/error.tsx`.

**Inconsistencia menor adicional resuelta** (no numerada): §2.1 fila Persistencia declaraba `idb-keyval` como librería usada. El código real (`codigo/src/lib/persistence.ts`) usa la API nativa de IndexedDB sin esa librería. Aclarado en la fila.

**Sin cambios en arquitectura**: la decisión de fase 1 (frontend 100% cliente con catálogo embebido + persistencia IDB→LS→memory-only + capacidad de empaquetado Capacitor preservada) se mantiene íntegra. La consolidación solo actualiza piezas concretas del stack a la realidad construida y desplegada.

**Implicación para el arnés**: dos drifts detectados aquí (`Next.js 15→16` y `Strato→Vercel`) son **típicos del paso entre kickoff y despliegue**. La directriz `arquitectura.md` (gap detectable) no exige hoy que cambios de hosting o de versión mayor de framework durante construcción produzcan un ADR explícito. Posible gap del arnés a abrir desde la próxima retrospectiva sistémica: **ADR obligatorio cuando se cambia hosting o versión mayor del framework durante construcción**. Anotado para futura revisión, no se actúa aquí.
