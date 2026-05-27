---
proyecto: vocab-1000
etapa: 3
nombre_etapa: refinamiento
propietario: PO
documento: hu
version: 3
fecha: 2026-05-21
autor_humano_validador: Alberto Muñoz Velasco
estado: aprobado
---

# hu.md — vocab-1000 · Etapa 3 (refinamiento)

> Historias de usuario formales del MVP, derivadas del `funcional.md v3`, de los casos de uso de etapa 1 (CU-01..CU-07) y del prototipo UX (`ux.md v1`, `arbol-contenidos.md v1`, `diagrama-flujos.md v1`).
>
> Plantilla: Connextra + criterios de aceptación Gherkin-lite (decisión 2026-05-21).
> Granularidad: una HU = un objetivo del usuario independiente, valuable y testable (INVEST).
>
> **v1** (2026-05-21): redacción del PO con 12 HU. Gate intermedio firmado.
> **v2** (2026-05-21): el Técnico añade el campo `estimación` a cada HU con tallas S/M/L/XL. Ninguna HU clasificada como XL → no aplica regla de retorno al PO.
> **v3** (2026-05-21): tras la mini-ronda de reapertura §4.1 (`reapertura-4-1.md v1`), HU-004 y HU-005 se reformulan para soportar el modelo de grupos con array de acepciones (R-b). El resto de HU queda intacto.

---

## HU-001 — Empezar a jugar en una dirección

- **área**: onboarding
- **prioridad**: must
- **origen**: CU-01 · funcional.md §2 (F1, F3) · ux.md §4.1, §4.2
- **estimación**: M  _(render HOME-A/B, bootstrap de ronda con cola aleatoria, persistencia inicial en IDB/LS, navegación HOME → TURNO-1)_

**Historia**
Como _jugador anónimo_, quiero _elegir una dirección de juego (`español → inglés` o `inglés → español`) y empezar a jugar inmediatamente_, para _entrar a la mecánica sin fricción y sin tener que crear cuenta_.

**Criterios de aceptación**
- Dado que entro al juego por primera vez (sin progreso local en ninguna dirección),
  cuando llego a HOME-A,
  entonces veo dos opciones de dirección (`español → inglés`, `inglés → español`) y un tagline explicativo.
- Dado que estoy en HOME-A,
  cuando pulso una de las dos direcciones,
  entonces se inicializa una ronda nueva en esa dirección y aparece TURNO-1 con la primera palabra del catálogo en orden aleatorio.
- Dado que tengo progreso en una dirección y la otra aún no la he empezado (HOME-B),
  cuando pulso `+ Empezar en <otra dirección>` en la card vacía,
  entonces se inicializa la ronda de la otra dirección sin tocar el progreso de la primera y entro a TURNO-1.
- Dado que arranco una ronda nueva,
  cuando se carga la primera palabra,
  entonces el orden interno de la cola pendiente es aleatorio (no determinista entre sesiones).

**Notas**
- "Anónimo" en MVP: no se pide identificación de ningún tipo (R-01).
- El tagline de HOME-A no son instrucciones de mecánica (se valida la regla "usable sin instrucciones" en CA-01).
- La elección de copy: `+ Empezar en inglés → español` (no `+ Empezar` a secas) — decisión kickoff §4.7 + cruce PO-OU5.

**Dependencias**
- Ninguna.

---

## HU-002 — Retomar mi progreso al volver

- **área**: persistencia
- **prioridad**: must
- **origen**: CU-02 · funcional.md §2 (F7) · ux.md §4.2, §4.3 · tecnica.md §3 (persistencia)
- **estimación**: M  _(detección de progreso al bootstrap, render HOME-B/C, restauración del estado al pulsar Continuar, manejo de turno no autoevaluado al cerrar pestaña)_

**Historia**
Como _jugador que ya empecé una ronda en una sesión anterior_, quiero _que al abrir de nuevo la web mi progreso esté intacto y pueda continuar exactamente donde lo dejé_, para _no tener que rehacer trabajo y mantener mi sensación de avance_.

**Criterios de aceptación**
- Dado que en una sesión anterior tengo progreso en una sola dirección,
  cuando vuelvo a abrir la URL,
  entonces veo HOME-B con la card de esa dirección mostrando `acertadas / total · turnos jugados` y acción primaria `▶ Continuar`.
- Dado que en una sesión anterior tengo progreso en ambas direcciones,
  cuando vuelvo a abrir la URL,
  entonces veo HOME-C con dos cards apiladas, una por dirección, con su progreso respectivo.
- Dado que pulso `▶ Continuar` en una card,
  cuando entro al juego,
  entonces aparezco en TURNO-1 con la **misma cola pendiente** que tenía al cerrar (no se reinicializa el orden), el contador `acertadas/total` y `turnos jugados` reflejan el estado guardado, y la dirección activa es la de la card pulsada.
- Dado que cierro la pestaña o el navegador en medio de un turno,
  cuando vuelvo a entrar,
  entonces el turno en curso se considera **no presentado** y la palabra que estaba en pantalla vuelve a la cola pendiente (no penaliza).

**Notas**
- Mecanismo concreto de persistencia (IndexedDB con fallback a LocalStorage) lo cierra `tecnica.md`. La HU sólo requiere **garantía de continuidad** desde la mirada del jugador.
- Si no hay ningún mecanismo de persistencia disponible (memory-only), se aplica HU-010, no esta.

**Dependencias**
- Ninguna.

---

## HU-003 — Decidir qué hacer cuando una dirección está completada

- **área**: home
- **prioridad**: must
- **origen**: CU-06 · funcional.md §4.7 · ux.md §4.2 (variante completada) · arbol-contenidos.md §3.1
- **estimación**: S  _(variante "completada" de card HOME y prop readonly del componente FinRonda; reutiliza componentes existentes, integra HU-009)_

**Historia**
Como _jugador que ha completado una dirección_, quiero _verlo claramente en HOME al volver y elegir entre volver a empezarla o revisar el resumen de mi logro_, para _no perder la sensación de cierre y poder reanudar el aprendizaje a mi ritmo_.

**Criterios de aceptación**
- Dado que tengo una dirección al `1000/1000`,
  cuando vuelvo a HOME,
  entonces la card de esa dirección muestra "✅ Completada · 1000/1000 · `<turnos>`t · `<%>`%" y dos acciones: "Volver a empezar" y "Ver resumen".
- Dado que pulso "Ver resumen" en una dirección completada,
  cuando se abre la pantalla,
  entonces veo la pantalla de fin de ronda en **modo readonly**: muestra los 4 datos (dirección completada, palabras acertadas, turnos totales, % aciertos) y un único botón "Cerrar"; no aparecen las acciones primarias "Volver a empezar" / "Cambiar dirección".
- Dado que pulso "Volver a empezar" en una dirección completada desde HOME,
  cuando confirmo el reinicio (HU-009),
  entonces la dirección vuelve a su estado inicial (cola completa, `0/1000`, 0 turnos) y la otra dirección queda intacta.

**Notas**
- El modo readonly de la pantalla de fin de ronda **reutiliza el mismo componente** que la pantalla de fin de ronda normal (decisión cruce PO-OU3).
- El % de aciertos se calcula como `palabras acertadas / turnos totales × 100`, redondeado a un decimal (decisión §4.6 del funcional v2).

**Dependencias**
- HU-008 (pantalla de fin de ronda) — comparte componente.
- HU-009 (reinicio con confirmación).

---

## HU-004 — Ver palabra y revelar su traducción

- **área**: turno
- **prioridad**: must
- **origen**: CU-03, CU-04 (parte) · funcional.md v3 §4.1, §4.3, §4.8, §4.11 · ux.md v1 §4.4, §4.5 (actualización pos-gate pendiente)
- **estimación**: M  _(componente WordDisplay con variantes, render `<ul>` de acepciones por grupo con CSS responsive inline/vertical, layout sin CLS al revelar, tipo gramatical localizado + responsive abrev/full con `aria-label`, transición fade-in 150ms respetando `prefers-reduced-motion`)_

**Historia**
Como _jugador en una ronda activa_, quiero _ver la palabra origen, pensar su traducción mentalmente y revelar todas sus acepciones válidas con un solo gesto_, para _ejecutar el bucle de autoevaluación rápido y sin fricción aun cuando la palabra sea polisémica_.

**Criterios de aceptación**
- Dado que estoy en TURNO-1 con un grupo activo (`prompt` visible),
  cuando aún no he revelado nada,
  entonces veo la palabra origen (`prompt`) grande y centrada (en el idioma origen de la dirección activa) y un único botón primario "Mostrar traducción". No veo aún las acepciones ni el tipo gramatical.
- Dado que estoy en TURNO-1,
  cuando pulso "Mostrar traducción",
  entonces se revelan las **acepciones del grupo** (`answers[]`) y el tipo gramatical justo debajo de la palabra origen, **sin layout shift** sobre la palabra origen (no se mueve), y el botón "Mostrar traducción" es sustituido por los dos botones de autoevaluación.
- Dado que el grupo tiene `answers.length === 1` (caso monosémico, ~92-94% del catálogo),
  cuando se renderiza TURNO-2,
  entonces aparece la única acepción como una línea simple seguida del tipo gramatical (sin marcador de lista visible).
- Dado que el grupo tiene `answers.length === 2`,
  cuando se renderiza TURNO-2,
  entonces las dos acepciones aparecen en **línea única separadas por ` · `** (espacios alrededor del bullet medio), seguidas del tipo gramatical en línea propia o subtexto. Ej.: `banco · ribera` / `· sust.  (sustantivo)`.
- Dado que el grupo tiene `answers.length === 3`,
  cuando se renderiza TURNO-2,
  entonces las tres acepciones aparecen en **lista vertical centrada** (una acepción por línea), seguidas del tipo gramatical en línea final. Ej.: `agarrar / tomar / llevar / · v.  (verbo)`.
- Dado que el grupo tiene `answers.length > 3`,
  cuando se valida el catálogo en build,
  entonces falla el build con error de violación de §4.11 del funcional v3 (cap operativo). En runtime esta condición nunca se da.
- Dado que se renderizan las acepciones,
  cuando inspecciono el DOM,
  entonces están dentro de un `<ul>` semántico con un `<li>` por acepción, con clases CSS que controlan render inline vs vertical según `answers.length`. El tipo gramatical va **fuera** de la lista, una sola vez por grupo.
- Dado que las acepciones se acaban de revelar,
  cuando un lector de pantalla está activo,
  entonces enuncia las acepciones **como elementos separados** (no como un único texto con puntos), seguidas del tipo gramatical, mediante `aria-live="polite"` en el contenedor del grupo revelado.
- Dado que estoy en TURNO-2 y miro el tipo gramatical,
  cuando lo leo,
  entonces lo veo en el **idioma destino** de la dirección activa (en español si juego `en→es`, en inglés si juego `es→en`).
- Dado que estoy en un viewport `< 600px`,
  cuando se muestra el tipo gramatical,
  entonces aparece en su forma **abreviada** (p. ej. `v.`, `sust.`) en la pantalla y la forma completa va en `aria-label` para accesibilidad. En viewports mayores aparece la forma completa.

**Notas**
- La transición de TURNO-1 a TURNO-2 es un fade-in suave (~150ms) sobre `opacity`, no `width/height/top/left` (no rompe INP/CLS sobre la palabra origen).
- Si el navegador respeta `prefers-reduced-motion: reduce`, la transición es instantánea.
- Los botones de autoevaluación pueden bajar 1-2 líneas en grupos polisémicos respecto a monosémicos. Aceptable: la palabra origen es la referencia visual, no los botones.
- El **cap operativo de 3 acepciones** se garantiza en construcción del catálogo (funcional v3 §4.11). El runtime no debe contemplar `length > 3`.

**Dependencias**
- Ninguna.

---

## HU-005 — Autoevaluar acierto o fallo y avanzar al siguiente turno

- **área**: turno
- **prioridad**: must
- **origen**: CU-03, CU-04 · funcional.md v3 §4.1 (modelo grupo), §4.11 (cap), §2 (F4, F5) · ux.md v1 §4.5
- **estimación**: L  _(núcleo del juego: lógica de cola pendiente de grupos, acierto saca grupo, fallo reinserta en posición aleatoria no inmediata no última, caso límite cola=1, persistencia de cada cambio indexada por `groupId`, detección "último grupo pendiente acertado" → Fin de Ronda, botones CA-08 responsive apilados/lado-a-lado, flash 120ms; muchos comportamientos sutiles)_

**Historia**
Como _jugador que acaba de ver las acepciones del grupo_, quiero _declarar honestamente si acerté alguna acepción válida o no, con un solo tap, y pasar inmediatamente al siguiente grupo_, para _mantener el ritmo del repaso sin pantallas intermedias_.

**Criterios de aceptación**
- Dado que estoy en TURNO-2 con las acepciones reveladas,
  cuando veo los controles,
  entonces tengo dos botones igualmente accesibles: "✓ Acerté" (color éxito + icono ✓) y "✗ Fallé" (color peligro + icono ✗), ambos con texto explícito.
- Dado que el grupo tiene `answers.length === 1`,
  cuando pulso "✓ Acerté",
  entonces declaro haber acertado la única acepción válida.
- Dado que el grupo tiene `answers.length > 1` (polisemia, 2 o 3 acepciones),
  cuando pulso "✓ Acerté",
  entonces declaro haber acertado **alguna acepción válida** del grupo (autoevaluación honesta, S-03 del funcional v3 §10). No se distingue cuál; basta con una.
- Dado que el grupo tiene `answers.length > 1`,
  cuando pulso "✗ Fallé",
  entonces declaro **no haber acertado ninguna** de las acepciones válidas del grupo.
- Dado que pulso "✓ Acerté" (cualquier `length`),
  cuando la acción se procesa,
  entonces el **grupo entero sale de la cola pendiente** (indexado por `groupId`) de la dirección activa, el contador `acertadas/total` se incrementa en 1, el contador `turnos jugados` se incrementa en 1, y aparezco en TURNO-1 con el **siguiente grupo pendiente** (orden aleatorio).
- Dado que pulso "✗ Fallé" (cualquier `length`),
  cuando la acción se procesa,
  entonces el **grupo se reinserta** en una posición aleatoria entre los pendientes restantes (no la siguiente inmediata, no la última), `acertadas/total` no cambia, `turnos jugados` se incrementa en 1, y aparezco en TURNO-1 con el siguiente grupo pendiente.
- Dado que la cola pendiente tiene exactamente 1 grupo restante y lo marco como "Fallé",
  cuando se procesa la reinserción,
  entonces el siguiente grupo mostrado es el mismo (único caso aceptable de repetición inmediata — VB-07).
- Dado que el grupo que acabo de marcar "Acerté" era el **último pendiente** de la dirección activa,
  cuando se procesa el acierto,
  entonces se cumple HU-008 (transición directa a la pantalla de fin de ronda).
- Dado que los botones de autoevaluación se renderizan,
  cuando los inspecciono,
  entonces cumplen CA-08 / USA-014: el estado (acierto/fallo) se distingue **por más de un canal sensorial** (color + icono + texto), no solo por color.
- Dado que estoy en un viewport `< 600px`,
  cuando se muestran los botones,
  entonces aparecen **full-width apilados** (ergonomía de pulgar único). En viewports `≥ 600px` aparecen lado a lado en una fila.

**Notas**
- Sin pantalla intermedia entre autoevaluación y siguiente turno (decisión UX §8).
- El feedback breve tras pulsar es un flash de color en el botón pulsado (~120ms), no una transición de pantalla.
- La autoevaluación es **honesta y atómica a nivel de grupo**: no hay manera (ni necesidad) de marcar parcialmente "acerté una de las dos pero la otra no". Esto preserva la simplicidad de la mecánica y el carácter agéntico-mínimo del producto.

**Dependencias**
- HU-004 (necesario para llegar a TURNO-2 con las acepciones reveladas).

---

## HU-006 — Cambiar de dirección durante la partida

- **área**: direccion
- **prioridad**: must
- **origen**: CU-05 · funcional.md §4.4 (F6) · ux.md §4.4, §4.5
- **estimación**: L  _(estado dual independiente persistido, preservación + restauración por dirección, inicialización lazy de dirección destino primera vez, caso TURNO-2 sin autoevaluar no penaliza, icono SVG inline, `aria-label` dinámico, cross-fade 200ms; estado dual siempre delicado)_

**Historia**
Como _jugador en una ronda activa_, quiero _invertir la dirección de juego en cualquier momento del turno sin perder mi progreso_, para _practicar en ambos sentidos a mi ritmo y mantener el aprendizaje vivo_.

**Criterios de aceptación**
- Dado que estoy en TURNO-1 o TURNO-2,
  cuando miro el header,
  entonces veo el control de inversión con la dirección activa, el progreso de la activa y un **mini-progreso de la otra dirección** (p. ej. `↕ EN→ES 89/1000`), todo en un componente compuesto.
- Dado que estoy en TURNO-1 (sin haber revelado),
  cuando pulso el control de inversión,
  entonces el estado actual de la dirección abandonada se preserva (cola pendiente, acertadas, turnos), la palabra que estaba en pantalla vuelve a la cola de la dirección abandonada como pendiente, y aparezco en TURNO-1 de la dirección inversa (con su propia cola y contadores).
- Dado que estoy en TURNO-2 (he revelado pero no he autoevaluado),
  cuando pulso el control de inversión,
  entonces la palabra se considera **no presentada**: vuelve a la cola pendiente de la dirección abandonada sin entrar al loop de falladas y sin penalizar, los contadores no cambian, y aparezco en TURNO-1 de la dirección inversa.
- Dado que la dirección inversa todavía no tiene progreso (primera vez),
  cuando entro en ella tras pulsar inversión,
  entonces se inicializa la ronda con el catálogo completo y aparezco en TURNO-1 con la primera palabra.
- Dado que el control de inversión recibe foco con un lector de pantalla,
  cuando se enuncia,
  entonces se anuncia con `aria-label` **dinámico**: "Cambiar a `<idioma origen → idioma destino>`" según la dirección de destino del cambio.
- Dado que el control de inversión se renderiza en cualquier viewport,
  cuando lo inspecciono,
  entonces su área táctil es **mínimo 44×44px** (USA-014).

**Notas**
- El icono del control es un SVG inline (par de flechas circulares), no emoji `🔄` (decisión cruce TEC-OU1).
- La transición entre direcciones es un cross-fade suave (~200ms) que respeta `prefers-reduced-motion`.

**Dependencias**
- Ninguna.

---

## HU-007 — Ver mi progreso en todo momento

- **área**: progreso
- **prioridad**: must
- **origen**: CU-03..CU-06 (transversal) · funcional.md §4.5 (F8) · ux.md §4.4, §4.5
- **estimación**: S  _(componente ProgressDual reutilizable que lee el estado del juego; render en header de TURNO-1/2, responsive en una línea < 600px)_

**Historia**
Como _jugador en una ronda activa_, quiero _ver de forma permanente cuántas palabras he acertado y cuántos turnos he jugado_, para _entender cuánto me queda hacia la meta y reconocer mi esfuerzo aunque falle mucho_.

**Criterios de aceptación**
- Dado que estoy en TURNO-1 o TURNO-2,
  cuando miro el header,
  entonces veo **dos señales** de progreso de la ronda activa, **ambas permanentemente visibles**:
  1. Progreso hacia meta: `acertadas / total` (ej. `247 / 1000`).
  2. Esfuerzo invertido: `turnos jugados` (ej. `312 turnos`, o forma compacta `312t`).
- Dado que pulso "✓ Acerté",
  cuando avanza el turno,
  entonces ambos contadores se actualizan visiblemente (acertadas +1, turnos +1).
- Dado que pulso "✗ Fallé",
  cuando avanza el turno,
  entonces solo `turnos jugados` se incrementa (+1), acertadas se mantiene.
- Dado que cambio de dirección (HU-006),
  cuando aparezco en la dirección inversa,
  entonces los contadores del header reflejan **el progreso de la nueva dirección activa**, no el de la abandonada.
- Dado que estoy en un viewport `< 600px`,
  cuando se renderiza el header,
  entonces los contadores caben en una sola línea con el control de inversión sin truncamiento.

**Notas**
- No se muestra barra de progreso visual (decisión UX PQ-U2): el número es más informativo y ocupa menos.
- El indicador del fin de ronda (resumen) se cubre en HU-008.

**Dependencias**
- Ninguna.

---

## HU-008 — Ver el cierre de una ronda y decidir cómo continuar

- **área**: fin-ronda
- **prioridad**: must
- **origen**: CU-06 · funcional.md §4.6 (F9) · ux.md §4.6
- **estimación**: M  _(componente FinRonda con 4 datos + 2 acciones, cálculo % aciertos con 1 decimal, microcopy aclaratorio, variante readonly por prop, transición directa sin pantalla intermedia)_

**Historia**
Como _jugador que acaba de completar una dirección_, quiero _ver un resumen claro de lo que he logrado y elegir entre repetir esa dirección o cambiar a la otra_, para _cerrar la sensación de logro y decidir el siguiente paso del aprendizaje_.

**Criterios de aceptación**
- Dado que marco como "Acerté" la última palabra pendiente de la dirección activa,
  cuando se procesa el acierto,
  entonces aparezco directamente en la pantalla de fin de ronda **sin pantalla intermedia**.
- Dado que estoy en la pantalla de fin de ronda,
  cuando la miro,
  entonces veo **cuatro datos** en este orden:
  1. Frase de felicitación con la dirección completada (ej. "¡Has completado Español → Inglés!").
  2. Palabras acertadas (= tamaño del catálogo de esa dirección).
  3. Turnos totales jugados en esa ronda.
  4. `% de aciertos` = `palabras acertadas / turnos totales × 100`, redondeado a un decimal, con microcopy aclaratorio "(sobre turnos jugados)" si no satura.
- Dado que estoy en la pantalla de fin de ronda (no readonly),
  cuando miro las acciones,
  entonces veo **dos botones** primarios:
  - "↻ Volver a empezar": reinicia la dirección activa (la otra dirección queda intacta) y me lleva a TURNO-1 con la primera palabra; pasa por HU-009 (confirmación si la dirección no está al `1000/1000`; en este caso ya está completada y la confirmación es informativa).
  - "↔ Cambiar dirección": me lleva a HOME (HOME-B o HOME-C según el estado de la otra dirección).
- Dado que estoy en la pantalla de fin de ronda en **modo readonly** (acceso desde HOME-completada),
  cuando miro la pantalla,
  entonces los 4 datos son los mismos y aparece un único botón "Cerrar" (sin acciones primarias). Las acciones se mantienen en la card de HOME (HU-003).

**Notas**
- La pantalla no muestra: tiempo total, palabras falladas al menos una vez, ratios por tipo gramatical (diferido a fase 3).
- La pantalla y su variante readonly **comparten componente**; el modo se controla por prop (decisión cruce PO-OU3).

**Dependencias**
- HU-005 (transición desde el último acierto).

---

## HU-009 — Reiniciar una ronda con confirmación

- **área**: reinicio
- **prioridad**: must
- **origen**: CU-07 · funcional.md §2 (F1, mecánica de reset) · ux.md §4.7
- **estimación**: S  _(modal `<dialog>` HTML nativo con focus trap automático, texto dinámico de confirmación, lógica de reset por dirección activa, acceso desde HOME y desde TURNO)_

**Historia**
Como _jugador con progreso en una dirección_, quiero _poder reiniciar la ronda de esa dirección con una confirmación clara_, para _empezar de cero sin perder por accidente el trabajo acumulado_.

**Criterios de aceptación**
- Dado que tengo progreso en una dirección,
  cuando estoy en HOME-B/HOME-C o en TURNO-1/TURNO-2 y pulso "↻ Reiniciar" en la card o el control correspondiente,
  entonces se abre un **modal de confirmación** con texto: "¿Reiniciar la ronda de `<dirección>`? Tu progreso actual (`<acertadas/total>`) se perderá. La otra dirección no se toca."
- Dado que estoy en el modal de confirmación,
  cuando lo miro,
  entonces veo dos botones diferenciados visualmente: "Cancelar" (acción segura, secundaria) y "Sí, reiniciar" (acción destructiva, destacada en color peligro).
- Dado que pulso "Cancelar",
  cuando se cierra el modal,
  entonces vuelvo exactamente al estado previo (la misma pantalla y el mismo turno, sin cambios).
- Dado que pulso "Sí, reiniciar",
  cuando se procesa,
  entonces la dirección activa vuelve a su estado inicial (cola completa con orden aleatorio nuevo, `acertadas = 0`, `turnos = 0`), la **otra dirección queda intacta**, y aparezco en HOME-B/HOME-C con el estado actualizado (o en TURNO-1 si veníamos del turno y se prefiere flujo directo — define `tecnica.md`).
- Dado que el modal se abre,
  cuando se renderiza,
  entonces usa el elemento HTML nativo `<dialog>` con focus trap automático y backdrop clickeable (decisión cruce TEC-OU2).

**Notas**
- El reinicio es una acción destructiva y poco frecuente; el modal evita falsos positivos sin añadir fricción al uso normal.
- Cuando la dirección está completada (`1000/1000`) y el botón se llama "Volver a empezar", el modal aparece igualmente para consistencia (aunque el efecto sea idéntico al reinicio sin progreso vigente — la regla es "siempre confirma reset").

**Dependencias**
- Ninguna.

---

## HU-010 — Saber cuándo mi progreso no se guardará

- **área**: estado-especial
- **prioridad**: must
- **origen**: VB-05 · funcional.md §8 (modo memory-only en glosario) · ux.md §4.8, §9
- **estimación**: S  _(detección al bootstrap de IDB+LS no disponibles, componente Banner amarillo fijo no-dismissable con `role="status"`)_

**Historia**
Como _jugador que está usando un navegador donde la persistencia local no funciona_ (Safari incógnito estricto, almacenamiento deshabilitado), quiero _ser avisado de que mi progreso no se guardará entre sesiones_, para _decidir si juego de todos modos o cambio de navegador, sin sorpresas al volver_.

**Criterios de aceptación**
- Dado que el bootstrap detecta que **ni IndexedDB ni LocalStorage** son utilizables,
  cuando se inicializa la app,
  entonces aparece un **banner fijo arriba del header**, color amarillo suave (`color-warning-soft`), con texto "Este navegador no guardará tu progreso entre sesiones."
- Dado que estoy en modo memory-only,
  cuando intento dismissar el banner,
  entonces **no puedo** (el banner es no-dismissable durante toda la sesión).
- Dado que estoy en modo memory-only,
  cuando juego (HOME, turno, fin de ronda),
  entonces el juego funciona normalmente: avanzo, autoevalúo, completo rondas, pero el progreso vive **solo en memoria** de la pestaña actual.
- Dado que cierro la pestaña en modo memory-only,
  cuando vuelvo a abrir,
  entonces aparezco en HOME-A (sin progreso) y el banner sigue activo (la detección se repite al bootstrap).
- Dado que se renderiza el banner,
  cuando un lector de pantalla está activo,
  entonces se anuncia con `role="status"` o equivalente y se incluye en el orden de tabulación de forma no intrusiva.

**Notas**
- Color amarillo suave, no rojo (USA-013): es un aviso, no un error bloqueante; el juego sigue siendo usable.
- El banner se valida visualmente como un estado más en cualquier pantalla.

**Dependencias**
- Ninguna.

---

## HU-011 — Recuperarme cuando el catálogo no carga

- **área**: estado-especial
- **prioridad**: must
- **origen**: VB-04 · funcional.md (alcance MVP) · ux.md §9
- **estimación**: S  _(detección de fallo de carga del catálogo bundleado, pantalla full-screen con copy + Reintentar, mensaje "Cargando..." tras 3s, lógica de reintento)_

**Historia**
Como _jugador que abre la URL_, quiero _que si el catálogo no se carga me aparezca un mensaje claro con la opción de reintentar_, para _no quedarme en blanco y poder recuperar el juego cuando la red mejore_.

**Criterios de aceptación**
- Dado que el bootstrap intenta cargar el catálogo,
  cuando la carga falla (timeout, error de red, error de parseo),
  entonces aparece una **pantalla full-screen** con copy: "No se ha podido cargar el juego. Recarga la página o vuelve a intentarlo más tarde." + botón "Reintentar".
- Dado que estoy en la pantalla de error de carga,
  cuando pulso "Reintentar",
  entonces el bootstrap reintenta la carga del catálogo desde cero.
- Dado que el catálogo se carga correctamente tras un reintento,
  cuando termina el bootstrap,
  entonces aparezco en HOME (variante A/B/C según el progreso local, si existe).
- Dado que llevo `> 3s` esperando la carga del catálogo,
  cuando aún no ha terminado,
  entonces aparece un mensaje "Cargando…" para evitar pantalla en blanco prolongada.
- Dado que estoy en la pantalla de error,
  cuando un lector de pantalla está activo,
  entonces anuncia el error y la acción de reintentar.

**Notas**
- El catálogo es estático bundleado con el frontend (decisión `tecnica.md`); un fallo de carga indica problema de red en la descarga inicial o bug. No es estado frecuente.
- El mensaje se ha validado como copy aceptable para MVP (cruce kickoff).

**Dependencias**
- Ninguna.

---

## HU-012 — Acceder a la atribución del catálogo NGSL

- **área**: legal
- **prioridad**: must
- **origen**: §4.10 funcional.md · ux.md §4.1 (footer permanente) · arbol-contenidos.md §3.4
- **estimación**: S  _(footer permanente en HOME, página "Acerca de" estática con atribución completa, navegación desde icono ⓘ del header)_

**Historia**
Como _jugador (o cualquier observador que se asome al juego)_, quiero _ver de forma persistente que el vocabulario procede de NGSL y poder acceder a la atribución completa con su licencia_, para _que el cumplimiento legal CC BY-SA 4.0 sea inequívoco y para satisfacer curiosidad sobre la fuente_.

**Criterios de aceptación**
- Dado que estoy en HOME (cualquiera de A/B/C),
  cuando miro el pie de la pantalla,
  entonces veo un footer permanente con el texto "Vocabulario derivado de NGSL · CC BY-SA 4.0" (estilo pequeño pero legible, contraste ≥ 4.5:1).
- Dado que estoy en HOME,
  cuando pulso el icono `ⓘ` del header,
  entonces se abre la página "Acerca de" con la atribución completa: NGSL como fuente del vocabulario, enlace al sitio oficial NGSL, mención explícita de licencia CC BY-SA 4.0, créditos del producto.
- Dado que estoy en la página "Acerca de",
  cuando pulso "Cerrar" o el control de vuelta,
  entonces vuelvo a HOME al estado en que estaba (HOME-A/B/C según progreso).
- Dado que estoy en TURNO o en Fin de Ronda,
  cuando miro la pantalla,
  entonces el footer puede no estar visible (el espacio se prioriza para la mecánica) pero el acceso al "Acerca de" sigue disponible desde HOME — la atribución es **al menos accesible**, no necesariamente en cada pantalla.

**Notas**
- La atribución es **restricción legal** (CC BY-SA 4.0 obliga a atribución de la fuente). No es opcional: sin ella estamos rompiendo la licencia.
- En fase 2/3, si entra audio, identidad u otros recursos con licencias propias, esta HU se extenderá.

**Dependencias**
- Ninguna.

---

## Cobertura

| Caso de uso (etapa 1) | HU que lo cubren |
|---|---|
| CU-01 — Empezar una ronda | HU-001 |
| CU-02 — Continuar una ronda | HU-002 |
| CU-03 — Adivinar una palabra | HU-004, HU-005 |
| CU-04 — Fallar una palabra | HU-004, HU-005 |
| CU-05 — Cambiar de dirección durante la partida | HU-006 |
| CU-06 — Completar una ronda | HU-008, HU-003 |
| CU-07 — Reiniciar una ronda | HU-009 |

| Decisión funcional kickoff + reapertura (funcional.md v3) | HU que la cubren |
|---|---|
| §4.1 Modelo de grupos con array de acepciones (R-b) | **HU-004** (render `<ul>` responsive según `answers.length`), **HU-005** ("Acerté" cubre alguna acepción válida del grupo) |
| §4.2 Palabras-función filtradas | (operación de catálogo — `tecnica.md`, no HU directa) |
| §4.3 Set canónico 11 tipos gramaticales | HU-004 (tipo gramatical localizado al revelar) |
| §4.4 Comportamiento del cambio antes de autoevaluar | HU-006 |
| §4.5 Indicador de progreso doble señal | HU-007 |
| §4.6 Resumen final concretado | HU-008 |
| §4.7 Estado "completada" en HOME | HU-003 |
| §4.8 Tipo gramatical localizado al destino | HU-004 |
| §4.9 Versionado del catálogo | (operación interna — `tecnica.md`, no HU directa) |
| §4.10 Atribución NGSL | HU-012 |
| **§4.11 Cap operativo de 3 acepciones por grupo** (v3) | **HU-004** (criterio "Dado que el grupo tiene `answers.length > 3`, el build falla") |

| Criterio de aceptación (funcional.md v2 §5) | HU asociadas |
|---|---|
| CA-01 Usable sin instrucciones | HU-001 (camino directo desde HOME-A a TURNO-1, tagline encuadre sin instrucciones) |
| CA-02 Funciona en móvil / tablet / desktop | HU-004, HU-005, HU-006, HU-007 (todas tienen criterios por breakpoint) |
| CA-03 Progreso preservado tras cierre del navegador | HU-002 |
| CA-04 Cambio de dirección mid-game se siente natural | HU-006 |
| CA-05 Ronda completa alcanzable con pantalla de cierre clara | HU-005 (avance), HU-008 (cierre) |
| CA-06 Tipo gramatical mostrado al revelar | HU-004 |
| CA-07 Justificación de la fuente del catálogo documentada | (documentación del proyecto — fuera de HU funcionales del jugador) |
| CA-08 Acerté/Fallé distinguible por más de un canal sensorial | HU-005 |

**Huecos detectados**: ninguno funcionalmente bloqueante.

**Notas de cobertura**:
- §4.1, §4.2 y §4.9 son decisiones de **operación interna de datos** (modelo, catálogo, versionado). No generan HU funcionales desde la mirada del jugador; se traducen en contratos de `tecnica.md` y criterios técnicos para etapa 4.
- **CA-07** (justificación documental de la fuente del catálogo) es un entregable documental (vive en `funcional.md`, en `tecnica.md` §11 y en el material de Acerca de — HU-012 acerca la atribución legal), no una HU funcional separada.

---

## Estimaciones — turno técnico (v2, 2026-05-21)

Tallas S/M/L/XL aplicadas según tabla de referencia (decisión 2026-05-21): **S** ≈ ½ día · **M** ≈ 1-2 días · **L** ≈ 3-5 días · **XL** > 5 días (alarma, vuelve al PO).

| HU | Título | Estimación |
|---|---|---|
| HU-001 | Empezar a jugar en una dirección | M |
| HU-002 | Retomar mi progreso al volver | M |
| HU-003 | Decidir qué hacer cuando una dirección está completada | S |
| HU-004 | Ver palabra y revelar su traducción | M |
| HU-005 | Autoevaluar acierto o fallo y avanzar al siguiente turno | L |
| HU-006 | Cambiar de dirección durante la partida | L |
| HU-007 | Ver mi progreso en todo momento | S |
| HU-008 | Ver el cierre de una ronda y decidir cómo continuar | M |
| HU-009 | Reiniciar una ronda con confirmación | S |
| HU-010 | Saber cuándo mi progreso no se guardará | S |
| HU-011 | Recuperarme cuando el catálogo no carga | S |
| HU-012 | Acceder a la atribución del catálogo NGSL | S |

**Distribución**: 6×S · 4×M · 2×L · 0×XL.

**Suma aproximada** (un dev senior, sin contar setup de infra ni QA exhaustivo): 6×0.5 + 4×1.5 + 2×4 ≈ **17 días** de implementación pura.

**Retorno por XL**: ninguna HU clasificada como XL → no se devuelve nada al PO.

**Notas técnicas del turno**:
- Las dos HU de mayor tamaño (HU-005 autoevaluar, HU-006 cambio de dirección) son las que concentran complejidad de estado: cola pendiente con reinserción aleatoria, estado dual independiente por dirección, persistencia consistente. Conviene abordarlas pronto en etapa 4 para validar el modelo de estado central.
- Las HU de estado-especial (HU-010, HU-011) son baratas pero importantes para CA-01 (usable sin instrucciones) y para no perder usuarios en navegadores restrictivos.
- HU-008 (FinRonda) y HU-003 (dirección completada en HOME) **comparten componente** — implementar HU-008 primero abarata HU-003 (justifica la S de HU-003).

## Pendientes de etapa 3 antes del gate final

- **Auditoría NGSL-1000** (hilo vivo del kickoff): si revela >5% de polisemia dentro del mismo tipo gramatical, reabrir §4.1 del funcional v2 y reformular HU-004 / HU-005 en consecuencia.
- **Muestra de 30 entradas representativas del catálogo** (hilo vivo del kickoff): entregable intermedio del Técnico, no afecta directamente a esta lista de HU.
