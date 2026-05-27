---
proyecto: vocab-1000
etapa: 1
nombre_etapa: recogida-necesidad
propietario: stakeholder
documento: necesidad-stakeholder
version: 1
fecha: 2026-05-18
autor_humano_validador: Alberto Muñoz Velasco
estado: aprobado
---

# Necesidad del stakeholder — vocab-1000

> Voz cruda del stakeholder tal como llegó al CPO/PO. Persistido en este archivo el 2026-05-18 tras una conversación oral/escrita con el CPO/PO. Sin filtros técnicos.

## Quién la presenta

Alberto Muñoz Velasco, en rol **stakeholder** del proyecto piloto sintético de la transformación IA de Quadrant. Es el promotor del producto y quien define qué quiere que haga.

## Qué quiere

Un **juego de vocabulario** que ayude a una persona a memorizar las palabras más usadas de un idioma extranjero.

## Cómo lo imagina

- **Plataformas**: navegable en **desktop, móvil y tablet** desde el navegador.
- **Apps**: en un futuro debe poder construirse como **app nativa para Apple y Android** a partir del mismo trabajo.
- **Contenido**: en torno a **1000 palabras** del idioma a aprender — "las más importantes / más usadas". El número 1000 viene de un artículo que el stakeholder recuerda haber leído: con 1000 palabras una persona puede expresarse más o menos sin dificultad. El número puede ajustarse al alza o a la baja si hay criterio mejor; lo importante es que cubra **el vocabulario más universal posible**.
- **Cada palabra tiene un tipo gramatical** (pronombre, verbo, adverbio, adjetivo, sustantivo…). El jugador debe ver el tipo al revelar la traducción.

## Cómo se juega

1. El jugador entra a la **pantalla inicial** y elige **idioma origen → idioma destino**. En MVP se ofrecen las dos combinaciones español ↔ inglés.
2. Empieza la ronda: aparecen palabras **una a una, en orden completamente aleatorio** de un catálogo finito (las ~1000 entradas).
3. Para cada palabra:
   - El jugador ve la palabra en el idioma origen.
   - **Piensa mentalmente** la traducción. No la escribe.
   - Pulsa "Mostrar traducción" cuando quiere verla.
   - Ve la traducción + el tipo gramatical.
   - **Autoevalúa**: marca "**acerté**" o "**fallé**".
4. Si **acierta** → la palabra **sale del loop**.
5. Si **falla** → la palabra **vuelve al loop** y aparecerá de nuevo más adelante, mezclada al azar entre las que quedan.
6. La ronda termina cuando ha acertado las ~1000 palabras.

## Cambio de dirección mid-game

- Durante una partida en curso, el jugador puede **invertir el sentido** (de `es→en` a `en→es` o viceversa) **sin reiniciar**.
- Cada dirección tiene **su propio progreso**: si llevaba la mitad de `es→en` y cambia a `en→es`, retoma el progreso anterior de `en→es` (o empieza de cero si nunca jugó esa dirección).
- **Razón pedagógica**: adivinar "cat" pensando "gato" (producir) es distinto que adivinar "gato" pensando "cat" (reconocer). Son retos independientes.

## Alcance MVP (lo que tiene que estar en la primera versión)

- Web responsive (los tres dispositivos).
- Catálogo de ~1000 palabras en español e inglés con tipo gramatical.
- Selector de dirección + cambio mid-game.
- Mecánica completa: random, autoevaluación, loop de falladas, fin cuando se completa.
- **Sin login, sin registro, sin servidor con datos de usuario**. Anónimo.
- El progreso de la ronda se **conserva localmente** entre sesiones (si cierro el navegador, al volver retomo donde estaba).

## Lo que vendrá después (no entra en MVP, pero condiciona el diseño)

### Fase 2

- **Login / registro / recuperar contraseña**.
- **Personalización por usuario**: el progreso vive ligado a la cuenta, no al dispositivo.
- Implica **privacidad / RGPD** (avisos, consentimientos, gestión de datos).

### Fase 3

- **Estadísticas por usuario**: palabras que se aciertan / fallan, tipos gramaticales que se dominan más o menos, evolución temporal.

### Más idiomas

El catálogo y el selector se conciben preparados para añadir más idiomas (alemán, francés, italiano, etc.) sin reescribir el núcleo del juego. En MVP solo está activo español ↔ inglés.

## Restricciones que impone el stakeholder

- **Sin coste por usuario** en MVP. No hay infraestructura de pago a montar para esta primera versión.
- **Reutilizable como app móvil**: la decisión técnica del MVP no puede impedir que después se empaquete como app iOS/Android.
- **Diseñado pensando en fases 2 y 3**: las decisiones del MVP no deben bloquear la incorporación de login, persistencia servidor y analítica de eventos.

## Cómo sabremos que está bien

Desde el punto de vista del stakeholder:

- Cualquier persona puede entrar a la web y ponerse a jugar **sin instrucciones**.
- Funciona igual de bien en móvil que en escritorio.
- Si se completa una vuelta de 1000 palabras, el jugador siente que ha aprendido vocabulario útil.
- El cambio de dirección mid-game se siente natural (no como una funcionalidad rara).

## Lo que NO ha decidido el stakeholder

- **Qué lista exacta de palabras usar** (delega en el equipo: Oxford 3000, NGSL, COCA o derivado — criterio "vocabulario más universal").
- **Cómo se llama el producto** comercialmente (de momento, alias interno `vocab-1000`).
- **Stack tecnológico**: explícitamente delegado al equipo técnico. El stakeholder no tiene preferencia siempre que se cumplan las restricciones de arriba (web, appificable, sin coste, no bloqueante para fases 2/3).
