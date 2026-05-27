---
proyecto: vocab-1000
etapa: 1
nombre_etapa: recogida-necesidad
propietario: PO
documento: requerimiento-funcional-mvp
version: 1
fecha: 2026-05-18
autor_humano_validador: Alberto Muñoz Velasco
estado: aprobado
---

# Requerimiento funcional MVP — vocab-1000

> Output del agente PO (en su rol CPO+PO de fase 1) tras procesar la necesidad del stakeholder recogida en `00-necesidad-stakeholder.md`. Fecha: 2026-05-18. Este documento es el **input del kickoff de etapa 2** donde entran los agentes UX y Técnico.

## 1. Resumen ejecutivo

Construir un juego web de vocabulario que ayude a memorizar las palabras más usadas de un idioma extranjero mediante autoevaluación con bucle de falladas. El MVP es web responsive, anónimo, con catálogo cerrado de aproximadamente 1000 entradas léxicas en español e inglés, y debe permitir su empaquetado posterior como app iOS/Android sin reescritura.

## 2. Problema que resuelve

Una persona que quiere ampliar su vocabulario en un segundo idioma carece de una herramienta sencilla, gratis y multiplataforma que le permita **practicar las palabras más frecuentes** sin la curva de aprendizaje de Anki, sin el coste de Duolingo Premium y sin tener que crear cuenta.

## 3. Producto en una frase

> Un juego anónimo de tarjetas mentales que muestra palabras al azar de una lista de las más usadas, deja al jugador autoevaluarse, y reintroduce las falladas hasta completar el catálogo.

## 4. Alcance MVP

### 4.1. Funcionalidades que entran

- **F1 — Pantalla inicial con selector de dirección**: el jugador entra y elige `idioma origen → idioma destino`. En MVP se ofrecen dos pares: `español → inglés` y `inglés → español`.
- **F2 — Catálogo cerrado de entradas léxicas**: aproximadamente 1000 entradas con identificador estable, tipo gramatical y lemas en español e inglés. El catálogo es estático, servido junto al frontend.
- **F3 — Ronda de juego**: las palabras aparecen una a una, en orden aleatorio sin reemplazo, hasta que el jugador ha acertado todas.
- **F4 — Mecánica de turno**: ver palabra origen → pensar traducción mentalmente → revelar (botón "Mostrar") → ver traducción + tipo gramatical → autoevaluar OK / fallo.
- **F5 — Bucle de falladas**: una palabra marcada como fallada vuelve a la cola y se reinserta en un hueco aleatorio entre las restantes.
- **F6 — Cambio de dirección mid-game**: control accesible durante la partida que invierte el sentido (`es→en` ↔ `en→es`) sin reiniciar. El progreso de cada dirección es independiente y se preserva al cambiar.
- **F7 — Persistencia local del progreso**: el estado de la ronda (acertadas, pendientes, dirección activa, progreso por dirección) sobrevive al cierre del navegador / pestaña. Al volver, el jugador retoma donde lo dejó.
- **F8 — Indicador de progreso**: el jugador ve en todo momento cuántas palabras le quedan / lleva acertadas en la dirección activa.
- **F9 — Pantalla de fin de ronda**: cuando el jugador completa el catálogo en una dirección, ve una pantalla de cierre con resumen mínimo y opción de "Volver a empezar" en la misma dirección o cambiar de dirección.

### 4.2. Funcionalidades que NO entran en MVP

- Identidad de usuario, login, registro, recuperación de contraseña.
- Sincronización del progreso entre dispositivos.
- Estadísticas históricas o analítica de jugadas.
- Algoritmos de repetición espaciada (Anki / SM-2 / FSRS).
- Más idiomas además de español e inglés.
- App nativa empaquetada (queda como capacidad técnica preservada, no como entregable MVP).
- Sonido / pronunciación de palabras.
- Categorías o filtros del catálogo (jugar solo verbos, solo nivel A2, etc.).
- Modo offline garantizado (más allá del cache natural del navegador).

## 5. Casos de uso esenciales

| ID | Caso de uso | Actor | Precondición | Flujo principal | Postcondición |
|---|---|---|---|---|---|
| CU-01 | Empezar una ronda | Jugador anónimo | Primera visita o sin progreso vigente | Selecciona dirección → comienza | Hay ronda activa en la dirección elegida |
| CU-02 | Continuar una ronda | Jugador anónimo | Hay progreso local de una sesión anterior | Reabre la web → ve "Continuar" → entra al juego en el estado guardado | Sigue jugando |
| CU-03 | Adivinar una palabra | Jugador anónimo | Ronda activa | Ve palabra → piensa → revela → autoevalúa OK | Palabra sale del loop, avanza el contador |
| CU-04 | Fallar una palabra | Jugador anónimo | Ronda activa | Ve palabra → piensa → revela → autoevalúa fallo | Palabra vuelve a la cola en un hueco aleatorio |
| CU-05 | Cambiar de dirección durante la partida | Jugador anónimo | Ronda activa | Pulsa el control de inversión | La ronda continúa en la dirección inversa con su propio progreso |
| CU-06 | Completar una ronda | Jugador anónimo | Todas las palabras acertadas en la dirección actual | Ve pantalla de fin | Puede reiniciar o cambiar dirección |
| CU-07 | Reiniciar una ronda | Jugador anónimo | Ronda en curso o terminada | Acción "Reiniciar" → confirma | Estado de la dirección activa vuelve a cero |

## 6. Criterios de aceptación a alto nivel

A nivel de producto, el MVP se considera aceptado cuando:

- **CA-01** El juego es **usable sin instrucciones** por una persona ajena al proyecto: alguien que entra por primera vez completa al menos 10 turnos sin asistencia.
- **CA-02** Funciona correctamente en **móvil, tablet y desktop** en los principales navegadores modernos (criterio operativo lo cierra UX en etapa 2).
- **CA-03** Después de cerrar el navegador y volver a abrir la web, el **progreso se conserva** y se puede continuar sin pérdida.
- **CA-04** El **cambio de dirección mid-game** se siente natural: el cambio es inmediato, el estado de cada dirección es independiente y observable.
- **CA-05** Una **ronda completa** (acertar las ~1000 palabras de una dirección) es alcanzable y termina con una pantalla de cierre clara.
- **CA-06** El catálogo de palabras está **categorizado por tipo gramatical** y la categoría se muestra al revelar la traducción.
- **CA-07** La elección de la lista canónica de palabras (Oxford 3000 / NGSL / COCA / derivado) está **justificada** por criterio explícito ("vocabulario más universal posible") y documentada.

## 7. Visión fase 2 (conocida, no construir)

Funcionalidades que entrarán **después** del MVP y cuyo conocimiento debe condicionar las decisiones de diseño del MVP para no bloquearlas:

- **V2-01** Identidad de usuario: registro con correo + contraseña, recuperación, gestión de sesión.
- **V2-02** Persistencia del progreso por usuario en servidor — el mismo usuario continúa su ronda en cualquier dispositivo.
- **V2-03** Privacidad / RGPD: aviso legal, política de privacidad, consentimiento explícito de tratamiento, mecanismo de baja y exportación.
- **V2-04** Empaquetado como **app iOS + Android** a partir del mismo código base, distribuible en App Store y Google Play.

**Implicación para el MVP**: el progreso local del MVP debe ser migrable a servidor sin reescritura. El frontend del MVP debe permitir el empaquetado nativo sin saltar de stack.

## 8. Visión fase 3 (conocida, no construir)

- **V3-01** Estadísticas por usuario: palabras acertadas/falladas, tipos gramaticales con mejor/peor rendimiento, evolución temporal, rachas.
- **V3-02** Posiblemente recomendación: priorizar las palabras que se fallan más, sugerir tipos gramaticales a reforzar.

**Implicación para el MVP**: cada interacción del jugador (palabra mostrada, palabra acertada, palabra fallada, cambio de dirección) es un **evento** que en MVP no se persiste pero cuyo modelo conceptual debe estar pensado. El equipo técnico decide si emitirlo a un sumidero local desde día 1 o introducirlo en fase 2/3.

## 9. Restricciones funcionales

- **R-01** **Anónimo en MVP**: el juego no puede pedir identificación de ningún tipo en MVP.
- **R-02** **Sin coste por usuario**: el MVP no puede requerir un servicio de pago para funcionar. (Implicación heredada del criterio firme 2026-05-02 del workspace; el stakeholder lo ratifica.)
- **R-03** **Capacidad de empaquetado nativo preservada**: la elección técnica del MVP no puede impedir que el código se empaquete posteriormente como app iOS/Android.
- **R-04** **No bloquear fase 2 / 3**: ninguna decisión del MVP puede impedir o encarecer desproporcionadamente la incorporación de login, persistencia servidor o analítica de eventos.

## 10. Supuestos

- **S-01** El catálogo de ~1000 entradas léxicas con tipo gramatical y traducciones es **adquirible o construible** con coste razonable a partir de listas canónicas públicas (Oxford 3000, NGSL, COCA u otras). El PO confía en el equipo para elegir y procesar.
- **S-02** Las traducciones por entrada son **unívocas o casi unívocas en MVP**: una palabra origen tiene una traducción canónica que el jugador debe reconocer. Los matices (acepciones múltiples, idiomaticidad) no son objetivo del MVP.
- **S-03** La autoevaluación honesta del jugador es **aceptable como fuente de verdad** del progreso: no se valida texto escrito, no se penaliza la sobreestimación. El jugador es responsable de su propia evaluación.

## 11. Glosario

- **Entrada léxica**: unidad del catálogo. Identificador estable + tipo gramatical + uno o más lemas (uno por idioma). Ej: `{ id: 'cat-en-001', type: 'sustantivo', lemmas: { es: 'gato', en: 'cat' } }`.
- **Dirección**: combinación origen → destino. En MVP las dos válidas son `es→en` y `en→es`.
- **Ronda**: una pasada completa del catálogo en una dirección hasta haber acertado todas las entradas. Cada dirección tiene su propia ronda con su propio progreso.
- **Loop**: estructura interna de la ronda — cola de palabras pendientes en la que las falladas se reinsertan en huecos aleatorios.
- **Autoevaluación**: el propio jugador declara si acertó o no tras ver la traducción.

## 12. Lo que el PO delega explícitamente al equipo técnico

Para evitar precipitaciones (gap #2 anotado en `memory.md`), el PO **NO decide** y deja al kickoff de etapa 2 (UX + Técnico):

- Stack tecnológico concreto (lenguaje, framework, librerías).
- Modelo de datos detallado y formato del catálogo.
- Mecanismo concreto de persistencia local (LocalStorage / IndexedDB / otro).
- Estrategia de empaquetado nativo (Capacitor / Tauri / PWA pura / otro).
- Diseño visual (paleta, tipografía, layout) — corresponde a UX.
- Elección entre Oxford 3000 / NGSL / COCA / otra fuente, criterio operativo de "vocabulario más universal", y cualquier post-procesado del catálogo.
