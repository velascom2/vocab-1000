---
proyecto: vocab-1000
etapa: 3
nombre_etapa: refinamiento
propietario: Director
documento: acta-refinamiento
version: 2
fecha: 2026-05-21
autor_humano_validador: Alberto Muñoz Velasco
estado: aprobado
---

# acta-refinamiento.md — vocab-1000 · Etapa 3 (iteración v2)

> Acta de la **segunda iteración del refinamiento** del piloto vocab-1000. Emitida por el Director del ciclo según la regla del bucle del ciclo (`ciclo.md` §3, decisión 2026-05-21).
>
> Esta v2 no sustituye al `acta-refinamiento.md v1` — la v1 documenta la iteración inicial del refinamiento que terminó con vuelta a etapa 2 por la auditoría NGSL. La v1 vive como snapshot inmutable en Drive (`acta-refinamiento.v1.pdf` / `.v1.html`). Esta v2 documenta **solo** el evento de la segunda iteración, ejecutada sobre los outputs del kickoff v2.
>
> Función formal: este documento es el **input del gate humano de etapa 3 iteración v2**.

---

## 1. Disparador de la iteración v2

**Origen**: cierre satisfactorio del kickoff iteración v2 (`acta-kickoff.md v2`, estado `borrador` esperando gate humano).

**Cambios sobre los outputs de etapa 2 que entran en esta iteración v2**:
- `funcional.md v3` (modelo §4.1 reescrito: sentidos atómicos + grupos por dirección; §4.11 nueva: cap operativo de 3 acepciones; S-02 actualizado).
- `tecnica.md v2` (modelo de datos del catálogo actualizado al nuevo shape; indexación del progreso por `groupId`; asimetría direccional declarada).
- `ux.md v2` (wireframes TURNO-2 con 3 variantes según `answers.length`; componente `Acepciones` nuevo).
- `arbol-contenidos.md v1` y `diagrama-flujos.md v1` declarados **sin cambios** por el kickoff v2.

**Implicación para el refinamiento**: las HU del refinamiento v1 (`hu.md v2`) deben **reflejar el nuevo modelo**. Concretamente, HU-004 (revelar traducción) y HU-005 (autoevaluar) necesitan criterios reformulados para soportar `answers.length ∈ [1, 3]` y la mecánica de "Acerté alguna acepción válida". El resto de HU queda intacto.

---

## 2. Convocatoria

- **Fecha**: 2026-05-21
- **Proyecto**: vocab-1000
- **Iteración**: v2 (segunda iteración del refinamiento)
- **Director**: Alberto, asistido por sesión Claude Code.
- **Agentes participantes**:
  - PO (reformulación de HU-004 y HU-005, turno 1).
  - Técnico (revisión de estimaciones para HU reformuladas, turno 2).

**Mecánica**: turno corto (las decisiones funcionales ya están tomadas en el kickoff v2; el refinamiento v2 solo propaga al `hu.md`). El equipo ejecutor sigue sin convocarse (mismo encuadre que el refinamiento v1).

---

## 3. Inputs declarados

| Archivo | Versión | Origen |
|---|---|---|
| `funcional.md` | v3 | etapa 2 iteración v2 (borrador) |
| `tecnica.md` | v2 | etapa 2 iteración v2 (borrador) |
| `ux.md` | v2 | etapa 2 iteración v2 (borrador) |
| `arbol-contenidos.md` | v1 | etapa 2 iteración v1 (sin cambios en v2 — declarado en acta-kickoff v2) |
| `diagrama-flujos.md` | v1 | etapa 2 iteración v1 (sin cambios en v2 — declarado en acta-kickoff v2) |
| `acta-kickoff.md` | v2 | etapa 2 iteración v2 (borrador) |
| `hu.md` | v2 | etapa 3 iteración v1 (output del refinamiento v1, contexto de evolución) |
| `auditoria-ngsl.md` | v1 | etapa 3 iteración v1 (origen del bucle) |
| `acta-refinamiento.md` | v1 | etapa 3 iteración v1 (snapshot histórico) |

---

## 4. Outputs producidos

| Archivo | Versión | Cambio | Notas |
|---|---|---|---|
| `hu.md` | **v3** | reformulación localizada | HU-004 y HU-005 reescritas para soportar `answers.length ∈ [1, 3]` y autoevaluación atómica por grupo. Matriz de cobertura actualizada (§4.1 v3 y §4.11 nuevas pasan a estar cubiertas por HU-004 y HU-005). Resto de HU intactas. Estimaciones revisadas: sin cambios (HU-004 sigue M, HU-005 sigue L; el modelo nuevo no incrementa tamaño). |
| `acta-refinamiento.md` | **v2** | este documento | Acta canónica del evento. |

---

## 5. Eventos de la iteración v2

### 5.1. Turno del PO — reformulación de HU-004 y HU-005

Sobre el `hu.md v2` (output del refinamiento v1, ya con estimaciones), el PO reformula los criterios de aceptación de HU-004 y HU-005 para reflejar el nuevo modelo de grupos:

- **HU-004 — Ver palabra y revelar su traducción**:
  - Nuevos criterios para `answers.length === 1` (caso monosémico, sin cambios visuales perceptibles).
  - Nuevos criterios para `answers.length === 2` (render inline con ` · `).
  - Nuevos criterios para `answers.length === 3` (render vertical centrado).
  - Criterio de validación de build: `answers.length > 3` falla por violación de §4.11.
  - Render semántico con `<ul>` + `<li>` por acepción (decisión UX).
  - Estimación: **M** (intacta — la lógica de render responsive es trivial CSS).

- **HU-005 — Autoevaluar acierto o fallo y avanzar al siguiente turno**:
  - Criterio reformulado: "Acerté" cubre **alguna acepción válida** del grupo (autoevaluación atómica a nivel de grupo, no por acepción).
  - Indexación de la cola pendiente y del set de acertadas por `groupId` (no por sentido individual).
  - Resto de criterios (reinserción aleatoria, caso límite cola=1, transición a Fin de Ronda, CA-08, responsive) intactos.
  - Estimación: **L** (intacta — el comportamiento del bucle de falladas no cambia).

**Resto de HU** (HU-001, HU-002, HU-003, HU-006, HU-007, HU-008, HU-009, HU-010, HU-011, HU-012): sin cambios. Sus criterios no dependen del modelo §4.1.

### 5.2. Turno del Técnico — revisión de estimaciones

El Técnico revisa las estimaciones de las HU reformuladas:

- HU-004: la introducción del render responsive por `length` no añade tamaño significativo (es CSS condicional sobre el mismo componente `Acepciones`). **Estimación se mantiene en M**.
- HU-005: el comportamiento de la cola pendiente y la autoevaluación no cambia desde la mirada interna (sigue indexando por unidad atómica de presentación; lo único que cambia es que esa unidad ahora se llama `groupId` en lugar de `entryId`). **Estimación se mantiene en L**.

**Sin XL → no aplica regla de retorno al PO**. Suma rough total del proyecto sigue siendo ≈ 17 días.

---

## 6. Decisiones consolidadas de la iteración v2

| Tema | Decisión |
|---|---|
| HU-004 criterios | Reformulados para responder al modelo §4.1 v3 (3 variantes de render según `length`) |
| HU-005 criterios | Reformulados con "Acerté = alguna acepción válida"; indexación por `groupId` |
| Estimaciones | Sin cambios (M y L respectivamente). Distribución global del proyecto intacta |
| Resto de HU | Sin cambios |
| Matriz de cobertura | Actualizada: §4.1 v3 y §4.11 pasan a estar cubiertas por HU-004 + HU-005 |

---

## 7. Cierre de la iteración v2

**Veredicto**: **SATISFACTORIO**.

**Justificación**: el `hu.md v3` propaga limpiamente las decisiones del kickoff v2 a las HU afectadas. Sin gaps detectados. Sin retorno al PO. Sin HU XL.

**Procede**: **gate humano final de etapa 3** sobre el conjunto de outputs de la iteración v2:

- `hu.md v3` (PO+Técnico, refinamiento v2).
- `acta-refinamiento.md v2` (este documento).
- Outputs del kickoff v2 ya firmes en sus borradores (`funcional.md v3`, `tecnica.md v2`, `ux.md v2`) — pendientes de su propio gate de etapa 2 iteración v2.

**Hilos abiertos** (no bloqueantes del gate final de etapa 3):
- **Muestra de 30 entradas representativas del catálogo** (Técnico, compromiso del kickoff v1 §7 hilo 1, ratificado en kickoff v2). Pendiente ejecutar; entregable intermedio del catálogo que el Técnico produce en etapa 4 cuando construya el JSON estático.
- **Tabla concreta de selección de las 3 acepciones para los lemas con >3 reales** (criterio en `tecnica.md v2` §11). Pendiente, entregable de etapa 4.

**Siguiente paso**: gate humano de etapa 2 iteración v2 (sobre funcional v3 + tecnica v2 + ux v2 + acta-kickoff v2) y gate humano de etapa 3 iteración v2 (sobre hu v3 + esta acta). Pueden firmarse en bloque ya que los outputs son consistentes entre sí.
