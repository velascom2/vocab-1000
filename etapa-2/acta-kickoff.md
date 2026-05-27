---
proyecto: vocab-1000
etapa: 2
nombre_etapa: kickoff
propietario: Director
documento: acta-kickoff
version: 2
fecha: 2026-05-21
autor_humano_validador: Alberto Muñoz Velasco
estado: aprobado
---

# acta-kickoff.md — vocab-1000 · Etapa 2 (iteración v2)

> Acta de la **segunda iteración del kickoff** del piloto vocab-1000. Emitida por el Director del ciclo según la regla del bucle del ciclo (ver `ciclo.md` §3, decisión 2026-05-21).
>
> Esta v2 no sustituye al `acta-kickoff.md v1` — la v1 documentó el kickoff inicial y su contenido vive como snapshot inmutable en Drive (`acta-kickoff.v1.pdf` / `.v1.html`). Esta v2 documenta **solo** el evento de la segunda iteración disparada por la auditoría NGSL.
>
> Función formal: este documento es el **input del gate humano de etapa 2 iteración v2**. Resume si el kickoff v2 es exitoso (procede gate y propaga a etapa 3 iteración v2) o incompleto (vuelta a etapa 1).

---

## 1. Disparador de la iteración v2

**Origen**: `auditoria-ngsl.md v1` (output del Técnico en etapa 3 iteración v1, fecha 2026-05-21).

**Veredicto**: la auditoría dictamina **~6-8% de polisemia intra-tipo significativa** en el catálogo NGSL-1000 (top-100 medido al 13%, cola larga extrapolada al 5-7%). Esto **supera el umbral del 5%** estipulado en §4.1 del `funcional.md v2`.

**Implicación**: el modelo de entrada léxica decidido en el kickoff v1 (opción c — entradas separadas por acepción polisémica) **no es viable**:
- Genera entradas distintas con misma palabra y mismo tipo gramatical que el jugador **no puede distinguir** sin un desambiguador visible (rompe simplicidad y CA-01 — "usable sin instrucciones").
- El catálogo crecería a ~1060-1300 entradas, contradiciendo el nombre "vocab-1000".

**Decisión de gobierno (Director)**: aplicar la regla del bucle del ciclo (`ciclo.md` §3) — volver a etapa 2 y ejecutar **kickoff iteración v2** con el contexto acumulado hasta ahora.

---

## 2. Convocatoria

- **Fecha**: 2026-05-21
- **Proyecto**: vocab-1000
- **Iteración**: v2 (segunda iteración del kickoff)
- **Stakeholder**: Alberto Muñoz Velasco
- **Director**: Alberto, asistido por sesión Claude Code que simula los 3 agentes desde sus fichas de diseño + las 4 directrices.
- **Agentes participantes**:
  - PO (`funcional.md`)
  - UX (`ux.md`)
  - Técnico (`tecnica.md`)
- **Mecánica acordada**: **turno corto** (no las tres mini-rondas con cruces del kickoff v1). Justificación: la decisión a tomar es acotada (cómo modelar la polisemia intra-tipo) y las opciones están enumeradas en `auditoria-ngsl.md v1` §6.3. Un turno corto basta para alinear PO ↔ UX ↔ Técnico.

---

## 3. Inputs declarados (regla de versionado 2026-05-21)

Outputs consumidos por esta iteración v2 del kickoff:

| Archivo | Versión | Origen |
|---|---|---|
| `00-necesidad-stakeholder.md` | v1 | etapa 1 |
| `requerimiento-funcional-mvp.md` | v1 | etapa 1 |
| `funcional.md` | v2 | etapa 2 iteración v1 (kickoff inicial, aprobado en gate) |
| `tecnica.md` | v1 | etapa 2 iteración v1 |
| `ux.md` | v1 | etapa 2 iteración v1 |
| `arbol-contenidos.md` | v1 | etapa 2 iteración v1 |
| `diagrama-flujos.md` | v1 | etapa 2 iteración v1 |
| `acta-kickoff.md` | v1 | etapa 2 iteración v1 (snapshot histórico) |
| `hu.md` | v2 | etapa 3 iteración v1 (PO + Técnico, con estimación) |
| `auditoria-ngsl.md` | v1 | etapa 3 iteración v1 (output que dispara esta iteración) |

---

## 4. Outputs declarados

Outputs producidos por esta iteración v2 del kickoff:

| Archivo | Versión | Cambio | Razón |
|---|---|---|---|
| `funcional.md` | **v3** | sí, regenerado | §4.1 reescrito (modelo R-b: sentidos atómicos + grupos por dirección); §4.11 nueva (cap operativo 3 acepciones); §8 glosario ampliado; §9 trazabilidad ampliada; §10 supuestos vigentes (S-02 actualizado); §11 inputs actualizados |
| `tecnica.md` | **v2** | sí, regenerado | §3 modelo de datos actualizado al shape de sentidos + grupos; nuevo §3.5 sobre asimetría direccional del catálogo; §11 catálogo final con criterio de cap operativo |
| `ux.md` | **v2** | sí, regenerado | §4.5 wireframes TURNO-2 actualizados con 3 variantes según `answers.length` (monosémico / 2 acepciones inline / 3 acepciones vertical); render `<ul>` semántico con CSS responsive |
| `arbol-contenidos.md` | v1 | **sin cambios** | Los casos de uso (CU-01..CU-07) no cambian con R-b. La jerarquía de pantallas tampoco. La polisemia es propiedad de la **entrada léxica** dentro de la pantalla de Turno, no de la arquitectura de información. |
| `diagrama-flujos.md` | v1 | **sin cambios** | El user flow no cambia: TURNO-1 → "Mostrar traducción" → TURNO-2 → autoevaluar. Que TURNO-2 muestre 1, 2 o 3 acepciones no cambia el flow — son tres renders del mismo estado de UI. |
| `acta-kickoff.md` | **v2** | este documento | Documenta la iteración v2 del kickoff. |

---

## 5. Decisiones de la iteración v2

### 5.1. Turno del PO

**Análisis** (resumen):

- **R-a — Mantener entradas separadas**: descartada. Problema funcional grave no resuelto: dos entradas con misma palabra y mismo tipo son **indistinguibles** para el jugador. Añadir desambiguador rompe simplicidad y contradice CA-01.
- **R-c — Monosémico canónico**: descartada. Decidir qué acepción de `take`, `bank`, `order` es "la canónica" es juicio editorial arbitrario. Empobrece el aprendizaje.
- **R-b — Modelo agrupado** (elegida):
  - Catálogo se mantiene en ~1000 grupos presentados por dirección. Naming "vocab-1000" intacto.
  - Refleja la realidad del lenguaje sin ocultarla.
  - Para los lemas monosémicos (~92-94%): `answers.length === 1`, ningún cambio aparente en UI.
  - Para los lemas polisémicos (~6-8%): la UI en TURNO-2 muestra lista corta de traducciones.
  - El criterio de "Acerté" se reformula: el jugador autoevalúa honestamente si acertó **alguna acepción válida** del grupo (coherente con S-03).

**Cruces que el PO eleva**:
- **UX-Q1**: ¿cómo renderizas la lista de acepciones en TURNO-2 sin romper layout?
- **TEC-Q1**: confirma que el cambio del shape del catálogo no rompe R-04 (progreso persistido migrable a fase 2).

### 5.2. Turno del UX

Acepta **R-b** con 4 precisiones:

1. **Cap operativo: máximo 3 acepciones por lema** en MVP. Para los pocos lemas NGSL con 4+ acepciones reales (`take`, `order`, `set`, `point`, `mean`, `keep`, `turn`...), el Técnico selecciona las 3 más útiles para A2/B1 al construir el catálogo.
2. **Render responsive según `answers.length`**:
   - `1` → render lineal (sin lista visible).
   - `2` → línea única con ` · ` separador.
   - `3` → lista vertical centrada.
   - El **tipo gramatical aparece una sola vez** por grupo.
3. **Semántica accesible**: siempre `<ul>` HTML con `<li>` por acepción + CSS que decide inline vs vertical según `length`. Lectores de pantalla enuncian las acepciones como elementos separados.
4. **Layout shift**: la palabra origen conserva CLS=0. Los botones de autoevaluar pueden bajar 1-2 líneas según `length` — aceptable.

**Wireframes TURNO-2 v2** (los 3 casos):

```
Monosémico (sin cambios):     length=2:                          length=3:

       entender                       bank                                take
       understand                     banco · ribera                      agarrar
       · v.  (verbo)                  · sust.  (sustantivo)               tomar
                                                                          llevar
                                                                          · v.  (verbo)
```

**Cruces que el UX eleva**: ninguno nuevo. El detalle visual fino se cierra en etapa 4.

### 5.3. Turno del Técnico

Acepta **R-b** y el cap del UX. Confirma que el cambio de shape **no rompe R-04**.

**Modelo de datos del catálogo** (sustituye al de v2):

```ts
// Unidad atómica del catálogo (un sentido):
type Sense = {
  id: string;        // estable, una por sentido. Ej: 'ngsl-0142-noun-bank-banco'
  pos: POS;          // del set canónico de 11 tipos (§4.3)
  en: string;        // lema EN del sentido
  es: string;        // lema ES del sentido
};

// Grupo presentado al jugador en una dirección:
type GroupEnEs = {
  groupId: string;   // 'en_es:noun:bank' — estable, derivado de (direction, pos, lema)
  pos: POS;
  prompt: string;
  answers: string[]; // ≤ 3 (cap §4.11)
};
// Análogo simétrico para GroupEsEn.
```

**Asimetría direccional declarada**: en `en→es`, los lemas EN polisémicos se agrupan (`bank` con 2-3 acepciones). En `es→en`, los lemas ES correspondientes (`banco`, `ribera`) son entradas separadas con `length===1`. **El catálogo es asimétrico entre direcciones por naturaleza del lenguaje**, no por defecto del modelo.

**Progreso persistido — indexado por `groupId`**:

```ts
type Progress = {
  en_es: { pending: GroupId[]; correct: Set<GroupId>; turns: number };
  es_en: { pending: GroupId[]; correct: Set<GroupId>; turns: number };
  activeDirection: 'en_es' | 'es_en';
  catalogVersion: string;
};
```

- `groupId` estable mientras `(direction, pos, lema)` sea estable.
- Extensión a granularidad de acepción (`correctSenses: Set<SenseId>`) es no-rompedora — R-04 respetado.

**Cap de 3 aceptado**: criterio de selección documentado en `tecnica.md v2` §11.

**Cruces que el Técnico eleva**: ninguno nuevo.

---

## 6. Decisiones consolidadas

| Tema | Decisión |
|---|---|
| **Modelo §4.1** | R-b — sentidos atómicos + agrupación por dirección |
| **Cap operativo §4.11** | Máximo 3 acepciones por grupo |
| **Asimetría direccional** | Declarada como propiedad del lenguaje, no defecto del modelo |
| **Progreso persistido** | Indexado por `groupId` derivado de `(direction, pos, lema)`. R-04 respetado |
| **S-02 (supuesto)** | Actualizado: el MVP cubre polisemia mediante array de acepciones |
| **Nombre del producto** | **vocab-1000 sigue siendo exacto** (~1000 grupos presentados por dirección) |
| **Render TURNO-2** | `<ul>` semántico con CSS responsive: inline para `length≤2`, vertical para `length===3` |
| **Mecánica de "Acerté"** | Autoevaluación honesta y **atómica a nivel de grupo**: cubre alguna acepción válida; no hay granularidad parcial |
| **Propagación a etapa 3** | El `hu.md` se regenera (HU-004 y HU-005 reformulados) en la **iteración v2 del refinamiento** que esta acta dispara. |

---

## 7. Gaps detectados en la iteración v2

Ninguno bloqueante. El turno corto cierra todas las cuestiones planteadas. **Kickoff iteración v2 declarado EXITOSO**.

Hilos vivos que se elevan al gate (no bloqueantes):

- **Tabla concreta de selección de acepciones para los lemas con >3 reales**: el Técnico la materializa al construir el catálogo final (criterio en `tecnica.md v2` §11). No es entregable de etapa 2 sino de etapa 4.
- **Validación visual del render `<ul>` en móvil real**: pendiente para etapa 4 cuando el front renderice.

---

## 8. Veredicto del kickoff iteración v2

**Cierre satisfactorio**. Procede:

1. Gate humano sobre los outputs de esta iteración v2 (`funcional.md v3`, `tecnica.md v2`, `ux.md v2`, `arbol-contenidos.md v1` declarado intacto, `diagrama-flujos.md v1` declarado intacto, `acta-kickoff.md v2`).
2. Tras gate: propagación a etapa 3, **iteración v2 del refinamiento** (que produce `hu.md v3` + `acta-refinamiento.md v2`).
