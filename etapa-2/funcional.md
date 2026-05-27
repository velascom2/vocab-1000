---
proyecto: vocab-1000
etapa: 2
nombre_etapa: kickoff
propietario: PO
documento: funcional
version: 4
fecha: 2026-05-26
autor_humano_validador: Alberto Muñoz Velasco
estado: consolidado (retroactiva post-cierre)
---

# funcional.md — vocab-1000 · Etapa 2 (kickoff) + reapertura etapa 3 + consolidación retroactiva

> Output canónico del agente PO. **v4 = consolidación retroactiva post-cierre** (2026-05-26): aplicación de la habilidad `consolidacion-funcional` sobre el piloto ya cerrado el 2026-05-23, antes de la creación de la sub-etapa 6.0. Marcador `retroactiva post-cierre` registrado en `memory.md` del piloto. Cambios resueltos en §12 Delta v4.
>
> v1 = `requerimiento-funcional-mvp.md v1` (etapa 1). v2 = funcional aprobado en gate humano del kickoff (2026-05-21). v3 = funcional vigente tras reapertura §4.1 (2026-05-21). **v4 = consolidación retroactiva** (2026-05-26).
>
> Las **HU formales** se redactan en `hu.md` (etapa 3), no aquí.
>
> **Historial de versiones**:
> - **v1** (2026-05-18) = `requerimiento-funcional-mvp.md` (etapa 1). Alcance MVP cerrado, casos de uso CU-01..CU-07, criterios CA-01..CA-07.
> - **v2** (2026-05-21) = funcional kickoff. Decisiones §4 + CA-08 + glosario.
> - **v3** (2026-05-21) = funcional con reapertura §4.1 (modelo de sentidos atómicos + agrupación por dirección).
> - **v4** (2026-05-26) = consolidación-funcional ejecutada en Etapa 6 retroactiva. Delta: §1 + §4.1 + CA-08 aclarados con realidad del catálogo asimétrico (1000 en_es / 1419 es_en) y alcance real de la auditoría WCAG (parcial, deuda diferida). Sin cambios en alcance.

---

## 1. Resumen ejecutivo (sin cambios respecto a etapa 1)

Juego web de vocabulario que ayuda a memorizar las palabras más usadas de un idioma extranjero mediante autoevaluación con bucle de falladas. MVP web responsive, anónimo, con catálogo cerrado **asimétrico por dirección** (1000 grupos `en→es` / 1419 grupos `es→en`, ver §4.1 v3 sobre asimetría direccional del lenguaje). La marca "vocab-1000" se refiere al cap de 1000 grupos en la dirección `en→es`. Empaquetable como app iOS/Android sin reescritura.

---

## 2. Alcance MVP — confirmado en kickoff

Las funcionalidades **F1-F9** del requerimiento de etapa 1 quedan **confirmadas** sin cambios de alcance. Lo que el kickoff ha añadido son **precisiones y decisiones funcionales** (sección 4) sobre el comportamiento concreto de algunas de ellas.

| ID | Funcionalidad | Estado tras kickoff |
|---|---|---|
| F1 | Pantalla inicial con selector de dirección | Confirmada. UX detalla 3 variantes en `ux.md` (HOME-A/B/C). |
| F2 | Catálogo cerrado de entradas léxicas | Confirmada. Modelo revisado (ver §4). |
| F3 | Ronda de juego con orden aleatorio | Confirmada. |
| F4 | Mecánica de turno (ver → revelar → autoevaluar) | Confirmada. |
| F5 | Bucle de falladas con reinserción aleatoria | Confirmada. Math.random suficiente (decisión Técnico). |
| F6 | Cambio de dirección mid-game | Confirmada. Comportamiento ante turno no autoevaluado precisado (ver §4). |
| F7 | Persistencia local del progreso | Confirmada. Técnico cierra mecanismo: IndexedDB + fallback LS. |
| F8 | Indicador de progreso | Confirmada con cambio (ver §4): dos señales en lugar de una. |
| F9 | Pantalla de fin de ronda | Confirmada con contenido concretado (ver §4). |

---

## 3. Casos de uso esenciales (heredados, intactos)

Los siete casos de uso del requerimiento de etapa 1 (**CU-01..CU-07**) se mantienen sin cambios. Se referencian desde el árbol de contenidos y el diagrama de flujos del UX (`arbol-contenidos.md`, `diagrama-flujos.md`).

---

## 4. Decisiones funcionales tomadas en el kickoff

Solo decisiones de **alcance funcional o de comportamiento del producto**. Las decisiones puramente técnicas viven en `tecnica.md`; las puramente visuales en `ux.md`.

### 4.1. Modelo de entrada léxica del catálogo (v3 — reabierto tras auditoría NGSL)

**Decisión vigente** (`reapertura-4-1.md v1`, 2026-05-21 — R-b): el catálogo se modela como **sentidos atómicos** + **agrupación por dirección de juego**.

**Modelo**:

```ts
// Unidad atómica del catálogo:
type Sense = {
  id: string;        // estable, una por sentido. Ej: 'ngsl-0142-noun-bank-banco'
  pos: POS;          // del set canónico de 11 tipos gramaticales (§4.3)
  en: string;        // lema EN del sentido
  es: string;        // lema ES del sentido
};

// Grupo presentado al jugador en una dirección de juego:
type GroupEnEs = {
  groupId: string;   // 'en_es:noun:bank' — estable, derivado de (direction, pos, lema)
  pos: POS;
  prompt: string;    // 'bank'
  answers: string[]; // ['banco', 'ribera', 'arcén']  ≤ 3 (cap operativo, §4.11)
};
// Análogo simétrico para GroupEsEn (agrupado por (pos, lema_es)).
```

**Implicaciones**:
- Para los lemas **monosémicos** del catálogo (~92-94% según `auditoria-ngsl.md v1`), `answers.length === 1`. Sin diferencia de comportamiento respecto al modelo monosémico clásico.
- Para los lemas **polisémicos intra-tipo** (~6-8%), `answers.length` es 2 o 3 (cap §4.11). La UI en TURNO-2 muestra las acepciones como `<ul>` (lista semántica) renderizado inline si `length ≤ 2` y vertical si `length === 3` (detalle en `ux.md v1` actualización pos-gate). El **tipo gramatical aparece una sola vez** por grupo: la polisemia es intra-tipo por construcción.
- El criterio de **acierto** en autoevaluación: el jugador declara "Acerté" si pensó **alguna acepción válida** del grupo. Coherente con S-03 (autoevaluación honesta como fuente de verdad).
- El catálogo final tiene **1000 grupos en `en→es`** y **1419 grupos en `es→en`** (consolidado v4 sobre catálogo real desplegado en `https://vocab-1000.vercel.app/`). La marca "vocab-1000" se refiere al cap de la dirección `en→es`; la dirección `es→en` tiene más grupos por la asimetría direccional del lenguaje (ver siguiente párrafo).

**Asimetría direccional declarada**: en `en→es`, los lemas EN polisémicos se agrupan (`bank` con array de 2-3 acepciones). En `es→en`, los lemas ES correspondientes (`banco`, `ribera`) son entradas separadas con `length === 1` porque las palabras españolas son monosémicas en estos casos. **El catálogo es asimétrico entre direcciones por naturaleza del lenguaje**, no por defecto del modelo.

**Progreso persistido**: indexado por `groupId` por dirección. Estable mientras `(direction, pos, lema)` sea estable. La extensión a granularidad de acepción (`correctSenses: Set<SenseId>`) es no rompedora — R-04 respetado. Detalle del shape vive en `tecnica.md` (actualización pos-gate final).

**Histórico de la decisión §4.1**:
- v1 (etapa 1, requerimiento): modelo monosémico `{id, type, lemmas: {es, en}}` con S-02 ("traducciones unívocas o casi unívocas en MVP").
- v2 (etapa 2, kickoff — gaps #5, #6): tupla `(id, tipo_gramatical, lema_origen, lema_destino)` con entradas separadas por acepción polisémica. **Condicionado a auditoría NGSL ≤ 5%**.
- v3 (etapa 3, reapertura — `auditoria-ngsl.md v1` dictamina ~6-8%, supera umbral): modelo de sentidos atómicos + agrupación por dirección (R-b de la mini-ronda).

### 4.2. Palabras-función en el catálogo

**Decisión**: **filtrar las palabras-función vacías de valor pedagógico** del top NGSL (artículos como `the`/`a`, conjunciones simples, auxiliares no portadores de significado independiente) y **descender en el ranking de frecuencia** hasta completar 1000 lemas lexicalmente útiles. Opción (ii) propuesta por el Técnico, ratificada por el PO.

**Motivos**: ver gap #7. NGSL ordena por frecuencia textual; vocab-1000 quiere "vocabulario más universal **para aprender jugando**". Criterios no idénticos.

**Lista preliminar de palabras-función a filtrar** (revisable en etapa 3 cuando el Técnico audite): `the`, `a`, `an`, `and`, `or`, `but`, `of`, `to`, `in`, `on`, `at`, `for`, `with`, `by`, `from`, `as`. Verbos modales (`would`, `could`, `should`, `must`, `may`, `might`) **sí entran** clasificados como `modal` (tipo nuevo, ver §4.3).

### 4.3. Set canónico de tipos gramaticales

**Decisión**: **11 tipos**, en español para mostrar al jugador, con identifiers internos en inglés.

| ID interno | Etiqueta UI (full) | Etiqueta UI (compact) |
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

**Motivos**: ver gap #8. El set de 10 tipos canónicos del Técnico no cubría los verbos modales del inglés. Se amplía a 11.

### 4.4. Comportamiento del cambio de dirección mid-game

**Decisión** (refina F6):

- El control de inversión está disponible **en cualquier momento del turno** (antes de revelar, después de revelar, antes de autoevaluar).
- Si el jugador cambia de dirección **después de revelar la traducción pero antes de autoevaluar**, esa palabra se considera **no presentada** en la dirección abandonada: vuelve a la cola como pendiente, sin penalización. **No** entra al loop de falladas.
- El progreso de la dirección abandonada se conserva intacto (cola pendiente, palabras acertadas, contadores).
- Al volver a esa dirección, se reanuda exactamente donde quedó.

**Motivos**: el turno no se cerró con autoevaluación; no procede penalizar.

### 4.5. Indicador de progreso del jugador (refina F8)

**Decisión**: la pantalla de turno muestra **dos señales** del progreso de la ronda activa, ambas permanentes y visibles:

1. **Progreso hacia meta**: `acertadas / total catálogo de la dirección activa` (ej. `247 / 1000`).
2. **Esfuerzo invertido**: turnos jugados en la ronda actual (ej. `312 turnos`).

**Motivos**: el indicador único (solo `acertadas/total`) genera frustración cuando el jugador falla mucho (ver UX-O1 en histórico). Las dos señales conviven sin saturar.

### 4.6. Pantalla de fin de ronda (refina F9)

**Decisión**: el resumen final muestra **cuatro datos** y **dos acciones**:

- Dirección completada (ej. "Has terminado la ronda `es → en`").
- Palabras acertadas (= tamaño del catálogo de esa dirección).
- Turnos totales jugados.
- **% de aciertos = palabras acertadas / turnos totales × 100**, redondeado a un decimal.
- Acción 1: "Volver a empezar" (reset de la dirección actual, sin tocar la otra).
- Acción 2: "Cambiar dirección" (lleva a HOME donde el jugador elige).

**No** se muestran: tiempo total, palabras falladas al menos una vez, ratios por tipo gramatical (eventualmente en fase 3).

### 4.7. Estado "dirección completada" en pantalla inicial

**Decisión**: cuando el jugador vuelve a HOME y una dirección está al 1000/1000, la card de esa dirección muestra "✅ Completada · 1000/1000 · X turnos · Y%" con dos acciones:

- "Volver a empezar" (= reset de esa dirección).
- "Ver resumen" (abre la pantalla de fin de ronda en **modo readonly**: solo cierra, no permite acciones primarias).

### 4.8. Tipo gramatical visible al revelar — localización e idioma

**Decisión**: al revelar la traducción de una palabra, el tipo gramatical se muestra **en el idioma destino de la dirección activa** (es decir, en el idioma del jugador). En MVP solo hay dos pares (`es↔en`), mapeo trivial. Identifiers internos del catálogo son en inglés (`noun`, `verb`...); la presentación al jugador se localiza vía `next-intl`.

### 4.9. Versionado del catálogo

**Decisión**: el catálogo del producto se versiona (`catalogVersion`). El progreso del jugador es **idempotente respecto a la versión** mientras los IDs sean estables. Cuando una versión nueva añade entradas, estas entran como pendientes. Si una versión elimina entradas (raro), desaparecen del progreso sin pérdida visible para el jugador.

### 4.10. Atribución legal del catálogo NGSL

**Decisión**: la atribución a NGSL (CC BY-SA 4.0) aparece **en dos sitios**:

1. **Footer permanente** del juego: línea pequeña con "Vocabulario derivado de NGSL · CC BY-SA 4.0".
2. **Página/modal "Acerca de"**: atribución completa, enlace al sitio oficial NGSL, mención de licencia.

### 4.11. Cap operativo de 3 acepciones por grupo (v3 — reapertura)

**Decisión** (`reapertura-4-1.md v1`, 2026-05-21): ningún grupo del catálogo MVP tiene más de 3 acepciones (`answers.length ≤ 3`).

**Razones**:
- En móvil 375px, 3 acepciones encajan sin empujar los botones de autoevaluar fuera del viewport.
- En NGSL-1000 hay un puñado pequeño de lemas con 4+ acepciones reales (`take`, `order`, `set`, `point`, `mean`, `keep`, `turn`...). Para esos, el **Técnico selecciona las 3 acepciones más útiles para nivel A2/B1** al construir el catálogo final, con criterio documentado en `tecnica.md` §11 (pos-gate final).
- Capping no es pérdida didáctica en MVP: las acepciones descartadas son normalmente las menos frecuentes o más idiomáticas (objetivo fase 2/3).

---

## 5. Criterios de aceptación a alto nivel

| ID | Criterio | Origen |
|---|---|---|
| CA-01 | Usable sin instrucciones (10 turnos completados sin asistencia por persona ajena al proyecto) | Etapa 1 |
| CA-02 | Funciona en móvil, tablet y desktop en navegadores modernos | Etapa 1 |
| CA-03 | Progreso preservado tras cierre del navegador | Etapa 1 |
| CA-04 | Cambio de dirección mid-game se siente natural | Etapa 1 |
| CA-05 | Ronda completa alcanzable, pantalla de cierre clara | Etapa 1 |
| CA-06 | Catálogo categorizado por tipo gramatical, mostrado al revelar | Etapa 1 |
| CA-07 | Justificación de la fuente del catálogo documentada | Etapa 1 |
| **CA-08** | **Controles "Acerté/Fallé" distinguibles por más de un canal sensorial (color + texto + icono opcional). WCAG 2.2 AA / USA-014.** Implementado y verificado sobre los botones Acerté/Fallé. **Auditoría WCAG 2.2 AA end-to-end del producto completo queda como deuda diferida** (Issue #3 cerrado el 2026-05-23 como deuda Fase 7 — hay piezas sueltas implementadas: `aria-label` en POS_LABEL, `role="status"` en MemoryOnlyBanner, focus trap en Modal, `prefers-reduced-motion` en globals.css, semántica `<ul>` para acepciones, contraste verificado en pares texto/fondo; falta auditoría formal criterio a criterio). | **Kickoff (UX-O6)** |

---

## 6. Restricciones funcionales — confirmadas

R-01 (anónimo en MVP), R-02 (sin coste por usuario), R-03 (capacidad de empaquetado nativo preservada), R-04 (no bloquear fase 2/3) → **intactas**.

---

## 7. Visión fase 2 y fase 3 — confirmadas

Sin cambios respecto a etapa 1. Compromiso técnico nuevo del kickoff: **el shape del progreso persistido en cliente del MVP es idéntico al shape del recurso REST `GET /me/progress` de fase 2** (cierra R-04). Detalle del shape en `tecnica.md` §3.4.

---

## 8. Glosario actualizado (v3)

- **Sentido atómico** (v3, nuevo): unidad mínima del catálogo, definida por la tupla `(id, pos, en, es)` donde `id` es estable. Cada sentido representa una **acepción** concreta de una palabra. Ej.: `{ id: 'ngsl-0142-noun-bank-banco', pos: 'noun', en: 'bank', es: 'banco' }`.
- **Grupo presentado** (v3, nuevo): la "entrada" que el jugador ve en una dirección de juego. Se obtiene agrupando sentidos por `(direction, pos, lema_origen)`. Tiene `groupId` estable, `prompt` (lema origen), `answers` (array de lemas destino, `length ≤ 3` por §4.11), y único `pos`. Ejemplo en `en→es`: `{ groupId: 'en_es:noun:bank', pos: 'noun', prompt: 'bank', answers: ['banco', 'ribera'] }`.
- **Asimetría direccional del catálogo** (v3, nuevo): en `en→es`, los lemas EN polisémicos generan grupos con `length > 1`. En `es→en`, los lemas ES correspondientes son a menudo monosémicos (entradas separadas con `length === 1`). Es propiedad del lenguaje, no defecto del modelo. Implica que las dos direcciones del catálogo se construyen como **dos colecciones independientes** de grupos.
- **Dirección**: combinación origen → destino. En MVP `es→en` y `en→es`.
- **Ronda**: una pasada completa del catálogo en una dirección hasta haber acertado todos los grupos.
- **Loop / cola pendiente**: estructura interna de la ronda donde las falladas se reinsertan en huecos aleatorios.
- **Autoevaluación**: el propio jugador declara si acertó o no tras ver las acepciones. Fuente de verdad del progreso (S-03). En grupos con `length > 1`, "Acerté" cubre **cualquier acepción válida**.
- **Versión del catálogo**: identificador estable del set de sentidos y grupos vigente (`catalogVersion`). El progreso del jugador es idempotente respecto a la versión mientras los `groupId` sean estables.
- **Modo memory-only**: estado cuando ni IndexedDB ni LocalStorage funcionan (Safari incógnito estricto, etc.). El juego corre pero no preserva progreso entre sesiones; banner fijo lo comunica.

---

## 9. Trazabilidad

### 9.1. Cambios v1 (etapa 1) → v2 (etapa 2 — kickoff)

| Cambio | Sección | Motivo |
|---|---|---|
| Modelo de entrada léxica revisado a tupla | §4.1 (v2) | Gap #5 + gap #6 |
| Palabras-función filtradas del catálogo | §4.2 | Gap #7 |
| Set canónico amplio a 11 tipos (añade `modal`) | §4.3 | Gap #8 |
| Comportamiento del cambio antes de autoevaluar precisado | §4.4 | PQ-U1 |
| Indicador de progreso pasa a dos señales | §4.5 | UX-O1 |
| Resumen final concretado (4 datos + 2 acciones) | §4.6 | UX-O3 |
| Estado "completada" en HOME definido | §4.7 | UX-Q5 |
| Localización del tipo gramatical al idioma jugador | §4.8 | UX-O7 |
| Versionado del catálogo formalizado | §4.9 | PO-O3 |
| Atribución NGSL en footer + Acerca de | §4.10 | PO-O2 |
| **CA-08 nueva**: accesibilidad cromática | §5 | UX-O6 |

### 9.2. Cambios v2 → v3 (etapa 3 — reapertura §4.1)

| Cambio | Sección | Motivo |
|---|---|---|
| Modelo de entrada léxica reformulado a "sentidos atómicos + agrupación por dirección" (R-b) | §4.1 (v3) | `auditoria-ngsl.md v1` dictamina ~6-8% polisemia intra-tipo > umbral 5% |
| **§4.11 nueva**: cap operativo de 3 acepciones por grupo | §4.11 | Cap del UX para no romper layout en móvil 375px |
| **S-02 actualizado**: el MVP cubre polisemia mediante array de acepciones | §10 (nueva) | Coherencia post-reapertura |
| Glosario ampliado con "sentido atómico", "grupo presentado", "asimetría direccional" | §8 | Cambio de modelo |
| Asimetría direccional del catálogo declarada como propiedad del lenguaje | §4.1 + §8 | Cierre técnico de la mini-ronda |

### 9.3. Cambios v3 → v4 (Etapa 6 retroactiva — consolidación-funcional)

| Cambio | Sección | Motivo |
|---|---|---|
| §1 Resumen ejecutivo: declarar catálogo asimétrico (1000 en→es / 1419 es→en) y aclarar que "vocab-1000" se refiere al cap de la dirección en→es | §1 | FUN-INC-02 — ambigüedad de cifra detectada en catálogo real desplegado |
| §4.1: cifra exacta del catálogo desplegado (1000 en_es / 1419 es_en) en lugar de "~1000 por dirección" | §4.1 | FUN-INC-01 — frase contradecía la asimetría declarada en el mismo §4.1 |
| CA-08: aclaración del alcance real cumplido (botones Acerté/Fallé sí, audit WCAG end-to-end como deuda diferida Issue #3) | §5 | FUN-INC-03 — supuesto WCAG sin matiz; Issue #3 cerrado como deuda Fase 7 |
| Sin cambios en alcance (F1-F9 intactas, CU-01..CU-07 intactos, S-01/S-02/S-03 intactos) | — | Consolidación no es retrospectiva — solo registra realidad |

---

## 10. Supuestos vigentes (v3)

Heredados del requerimiento de etapa 1 (`requerimiento-funcional-mvp.md v1`) salvo **S-02 actualizado** en v3:

- **S-01** (intacto): el catálogo de ~1000 entradas léxicas con tipo gramatical y traducciones es **adquirible o construible** con coste razonable a partir de listas canónicas públicas (NGSL elegido como fuente — ver `tecnica.md v1` §11).
- **S-02 v3** (**actualizado**): el MVP **cubre la polisemia intra-tipo** del idioma origen mediante array de acepciones por grupo (modelo §4.1 v3, cap §4.11). Una palabra origen puede tener 1-3 traducciones válidas; el jugador autoevalúa honestamente si pensó alguna de ellas (S-03).
- **S-03** (intacto): la autoevaluación honesta del jugador es **aceptable como fuente de verdad** del progreso: no se valida texto escrito, no se penaliza la sobreestimación. El jugador es responsable de su propia evaluación.

---

## 11. Entradas para etapa 3 (refinamiento) — vigentes v3

El equipo ejecutor de etapa 3 (PO en su rol de refinador, Técnico estimador, Backend/Frontend/SRE/QA posteriores) recibe como input:

- Este `funcional.md` **v3** (sustituye al `v2` aprobado en el gate del kickoff).
- `tecnica.md v1` (queda a actualizar pos-gate final con el nuevo modelo §4.1 v3).
- `ux.md v1` (prototipo a actualizar pos-gate final con render `<ul>` de acepciones por grupo).
- `arbol-contenidos.md v1` y `diagrama-flujos.md v1` (intactos, casos de uso no cambian).
- `acta-kickoff.md v1` (input histórico del kickoff).
- `auditoria-ngsl.md v1` (output Técnico que disparó la reapertura).
- `reapertura-4-1.md v1` (acta de la mini-ronda que produce esta v3).
- `hu.md v3` (output PO+Técnico de etapa 3 con HU-004 y HU-005 reformulados según R-b).

---

## 12. Delta v4 (Etapa 6 retroactiva — consolidación-funcional 2026-05-26)

Aplicación de la habilidad `consolidacion-funcional` sobre el piloto cerrado el 2026-05-23 (Excepción retroactiva post-cierre, decisión 2026-05-26). 3 inconsistencias detectadas en auditoría funcional ↔ producto desplegado:

- **FUN-INC-01** (tipo A — contradicción) — resuelta en §4.1: la frase *"el catálogo final mantiene ~1000 grupos por dirección"* contradecía la asimetría direccional declarada en el mismo §4.1 v3. Catálogo real desplegado: **1000 grupos `en_es` / 1419 grupos `es_en`** (verificado sobre `codigo/src/catalog/data/catalog.ts`). El cap de 1000 aplica solo a la dirección `en→es`.
- **FUN-INC-02** (tipo A — contradicción suave) — resuelta en §1: el resumen ejecutivo decía "catálogo cerrado de ~1000 entradas léxicas en español ↔ inglés" sin precisar la asimetría. La marca "vocab-1000" se refiere al cap de `en→es`; `es→en` tiene 1419 grupos. Aclarado en §1.
- **FUN-INC-03** (tipo D — supuesto a aclarar) — resuelta en CA-08: el criterio declaraba "WCAG 2.2 AA" sin matiz. Realidad: CA-08 sobre los botones Acerté/Fallé sí está cumplido; la **auditoría WCAG 2.2 AA end-to-end del producto completo** quedó como **deuda diferida** (Issue #3 cerrado el 2026-05-23 como deuda Fase 7). Hay piezas sueltas implementadas (aria-label, role=status, focus trap, prefers-reduced-motion, `<ul>` semántico, contraste verificado); falta verificación formal criterio a criterio. Aclarado en CA-08.

**Sin cambios en alcance**: F1-F9 confirmadas, CU-01..CU-07 intactos, S-01/S-02 v3/S-03 intactos, glosario intacto. La consolidación no es retrospectiva: solo registra realidad.

**hu.md**: auditado en paralelo, sin deltas. Las 12 HU (HU-001..HU-012) están todas implementadas y verificadas en el gate de Etapa 5 (2026-05-22). Issue #2 (paréntesis del catálogo) e Issue #3 (auditoría WCAG diferida) son **deuda y bugs post-PRO ya cerrados** y no afectan a las HU declaradas en `hu.md v3`.

**Encadenamiento**: tras esta consolidación se ejecutan `consolidacion-ux` (sobre `ux.md v2`, `arbol-contenidos.md v1`, `diagrama-flujos.md v1`) y `consolidacion-tecnica` (sobre `tecnica.md v2`) — ver firmas en `memory.md` del piloto.
