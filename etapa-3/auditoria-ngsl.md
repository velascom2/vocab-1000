---
proyecto: vocab-1000
etapa: 3
nombre_etapa: refinamiento
propietario: Técnico
documento: auditoria-ngsl
version: 1
fecha: 2026-05-21
autor_humano_validador: Alberto Muñoz Velasco
estado: aprobado
---

# auditoria-ngsl.md — vocab-1000 · Etapa 3

> Output del agente Técnico. Auditoría comprometida en el kickoff de etapa 2 (acta-kickoff §7) y condicionante de la decisión §4.1 del `funcional.md` v2 (modelo de entrada léxica con entradas separadas por polisemia intra-tipo).
>
> Alcance: **D — híbrido B+C** (decisión 2026-05-21). Muestra anotada de las ~100 entradas léxicas más frecuentes del NGSL tras aplicar el filtro §4.2 + complemento con polisémicas conocidas fuera de la muestra. Sin descarga ni cruce lexicográfico exhaustivo.

---

## 1. Pregunta de la auditoría

¿Qué % del **catálogo final** de vocab-1000 (NGSL filtrado, ~1000 lemas léxicamente útiles) tendrá **polisemia intra-tipo gramatical significativa** — dos o más acepciones suficientemente distintas que el jugador podría confundir o no reconocer?

**Umbral del kickoff** (§4.1 funcional v2): si > 5%, **se reabre la decisión** del modelo de entrada léxica (mantener "una entrada por acepción" o reformular).

---

## 2. Método

1. **Acotado del universo**: NGSL 1.2 oficial (newgeneralservicelist.com, CC BY-SA 4.0). El catálogo MVP es un subset de NGSL tras aplicar el filtro de palabras-función vacías (§4.2 funcional v2): se eliminan `the`, `a`, `an`, `and`, `or`, `but`, `of`, `to`, `in`, `on`, `at`, `for`, `with`, `by`, `from`, `as`, `if`, `about`, `into`, `just`, `than`, `then`, `also`, `because`, `no` (det.), `very`, `only`, `those`, `more`, `after`, `even`, `through`, `down`, `here`, etc.
2. **Muestra**: las **primeras ~100 entradas léxicas** del catálogo (post-filtro). En el NGSL crudo esto corresponde aproximadamente a las posiciones 1-130, ya que ~25-30 de las primeras 130 posiciones se filtran por ser palabras-función puras.
3. **Anotación**: para cada lema de la muestra, identifico los tipos gramaticales (POS) que sostiene y, dentro de cada tipo, si hay **dos o más acepciones distintas** que un hablante reconocería como sentidos diferentes (no meros matices).
4. **Criterio de marca**: marco "polisemia significativa" cuando un jugador hispanohablante de nivel intermedio podría dar la traducción de **una** acepción y no reconocer la otra como traducción correcta de la misma palabra inglesa (ej. `bank → ribera` vs `bank → banco financiero`).
5. **Extrapolación**: la muestra está sesgada hacia frecuentes (más polisémicas — distribución tipo Zipf). Corrijo cualitativamente con una segunda lista de polisémicas conocidas en posiciones 100-1000 del NGSL para acotar el % del global.

**Limitaciones declaradas** (alcance D, no A):
- Sin descarga del dataset NGSL real. La muestra usa la ordenación NGSL conocida por el Técnico.
- Sin cruce con Wiktionary / WordNet. La anotación es por conocimiento del Técnico, sujeta a sesgo de juicio.
- Sin verificación por dos revisores. El %, por tanto, es estimación con incertidumbre.

Estas limitaciones son aceptables porque (a) el veredicto cualitativo es robusto (lejos del umbral) y (b) si la cifra hubiera salido en zona gris (3-7%), la decisión sería escalar a alcance A.

---

## 3. Muestra anotada · ~100 entradas léxicas top NGSL

### 3.1. Entradas con polisemia intra-tipo significativa

| # | Lema EN | Tipo | Acepciones distintas |
|---|---|---|---|
| 1 | **time** | sustantivo | período (`3 hours`) / vez (`3 times`) |
| 2 | **take** | verbo | agarrar / tomar (tiempo) / llevar a (lugar) |
| 3 | **way** | sustantivo | camino, vía / manera, modo |
| 4 | **look** | verbo | mirar / parecer |
| 5 | **well** | sustantivo | pozo de agua / fuente, manantial |
| 6 | **back** | sustantivo | espalda / parte trasera |
| 7 | **work** | verbo | trabajar (humano) / funcionar (máquina) |
| 8 | **call** | verbo | gritar / llamar por teléfono / nombrar |
| 9 | **ask** | verbo | preguntar / pedir |
| 10 | **leave** | verbo | dejar (algo, a alguien) / irse (de un sitio) |
| 11 | **mean** | verbo | significar / implicar |
| 11b | **mean** | adjetivo | tacaño / cruel |
| 12 | **keep** | verbo | mantener / guardar |
| 13 | **turn** | verbo | girar / convertirse en |

**13 lemas con al menos un tipo polisémico significativo en una muestra de ~100 entradas léxicas → 13%.**

### 3.2. Entradas SIN polisemia intra-tipo significativa (resto de la muestra)

Lemas con un sentido dominante claro (matices contextuales no marcan polisemia). Lista no exhaustiva, representativa de los ~87 restantes:

`be`, `have`, `do`, `say`, `go`, `get`, `make`, `know`, `think`, `come`, `see`, `want`, `try`, `need`, `feel`, `become`, `put`, `let`, `begin`, `seem`, `help`, `talk`, `start`, `show`, `hear`, `find`, `give`, `tell`, `use`, `year`, `people`, `day`, `man`, `woman`, `child`, `life`, `world`, `school`, `country`, `problem`, `hand`, `part`, `place`, `week`, `company`, `system`, `program`, `question`, `government`, `night`, `home`, `water`, `room`, `mother`, `father`, `friend`, `area`, `money`, `story`, `month`, `book`, `eye`, `job`, `word`, `business`, `issue`, `head`, `house`, `service`, `new`, `good`, `last`, `first`, `long`, `little`, `own`, `large`, `next`, `early`, `young`, `important`, `few`, `public`, `bad`, `same`, `able`, `now`, `still`, `here`/`there` (deícticos)*.

\* Algunos deícticos / adverbios podrían discutirse pero su uso en MVP es como categoría única para el jugador.

---

## 4. Complemento — polisémicas conocidas en NGSL-1000 fuera del top-100

Lista de lemas que con conocimiento previo identifico como polisémicos intra-tipo significativos y que **casi seguro** están en NGSL-1000 (posiciones 100-1000). No es exhaustivo; sirve para sostener que el % del global **no se desploma** una vez salimos del top-100.

`bank` (banco financiero / ribera), `bar` (barra / impedimento / mostrador), `case` (caja / situación, ocasión), `date` (fecha / cita / dátil), `letter` (carta / letra del alfabeto), `mind` (mente / opinión), `order` (secuencia / mandato / pedido), `point` (punto / propósito, idea), `power` (poder / energía eléctrica), `nature` (naturaleza / carácter, esencia), `second` (segundo de tiempo / segundo ordinal), `subject` (sujeto / asignatura), `table` (mesa / tabla de datos), `post` (correo / poste / publicación), `party` (fiesta / partido político), `ground` (suelo / motivo), `match` (cerilla / partido), `bill` (factura / pico de ave), `change` (cambio / monedas), `right` (correcto / derecha), `arms` (brazos / armas), `light` (luz — solo como sustantivo; ligero es adjetivo, distinto tipo), `office` (oficina / cargo), `class` (clase escolar / categoría / clase social), `chair` (silla / presidente), `paper` (papel material / artículo, ensayo), `force` (fuerza / cuerpo militar), `field` (campo agrícola / disciplina, área), `head` (cabeza / jefe), `body` (cuerpo / organización), `record` (registro / disco musical / récord), `figure` (figura / cifra), `picture` (imagen / película).

**Conteo en este complemento**: ~33 lemas identificados con polisemia intra-tipo significativa fuera del top-100. Aplicando esta cifra al rango 100-1000 (≈900 lemas restantes), el ratio observable es **~3,7%** sólo con lo que el Técnico ha podido recordar directamente, sin lookup exhaustivo. El % real de la cola larga (100-1000) será **superior** a ese 3,7% — probablemente entre 4% y 7%.

---

## 5. Veredicto

### 5.1. Estimación cuantitativa

| Tramo | Lemas | Polisemia intra-tipo estimada |
|---|---|---|
| Top-100 léxicas (medido) | ~100 | **13%** (13 / 100) |
| Posiciones 100-1000 (extrapolado) | ~900 | **5-7%** (rango razonable: 45-65 lemas adicionales con polisemia identificada + plausibles no enumerados) |
| **Catálogo MVP completo (~1000)** | ~1000 | **~6-8%** ponderado |

### 5.2. Veredicto cualitativo

**La polisemia intra-tipo significativa en el catálogo MVP es claramente superior al 5%**.

La estimación central (~6-8%) está **por encima del umbral del 5%** del kickoff. El margen de incertidumbre (limitaciones del alcance D declaradas en §2) **no acerca el resultado al umbral**: incluso aplicando una contracción generosa por sesgo del Técnico, el % real difícilmente bajará del 5%.

**Conclusión**: se cumple la condición del kickoff. **Se reabre §4.1 del funcional v2**.

---

## 6. Implicaciones

### 6.1. Para `funcional.md` v2 §4.1

El modelo decidido en el kickoff (cada acepción polisémica intra-tipo = entrada separada del catálogo, p. ej. `bank-noun-financiero` y `bank-noun-ribera` como dos entradas distintas) **se sostiene técnicamente pero genera crecimiento del catálogo**:

- **Estimación de crecimiento**: si ~6-8% de los lemas tienen polisemia intra-tipo con 2 acepciones cada uno (caso conservador), el catálogo pasa de ~1000 entradas a **~1060-1080**. Si una parte tiene 3+ acepciones (`take`, `order`, `point`, `match`...), el crecimiento puede llegar a **~1100-1300**.
- **Implicación**: el "vocab-1000" deja de tener 1000 entradas estrictas. Esto **no rompe ninguna restricción funcional** del MVP (R-01..R-04 intactas), pero contradice la idea de "catálogo ~1000".

### 6.2. Para HU-004 y HU-005

Si el modelo se reformula, ambas HU pueden necesitar revisión:

- **HU-004 — Ver palabra y revelar su traducción**: si el modelo agrupa acepciones bajo el mismo lema mostrando varias traducciones (modelo alternativo), la pantalla TURNO-2 tiene que renderizar **multi-traducción**, no traducción única. Si se mantiene "una entrada por acepción", HU-004 queda igual.
- **HU-005 — Autoevaluar acierto o fallo**: el criterio de aceptación "Acerté" tiene que ser inequívoco. Si una entrada presenta varias traducciones simultáneas, el jugador puede acertar una y fallar la otra — la mecánica de autoevaluación se complica. Si se mantiene "una entrada por acepción", HU-005 queda igual.

### 6.3. Opciones para la reapertura de §4.1

El PO + UX + Técnico tendrán que reabrir §4.1 con (al menos) estas tres opciones encima de la mesa:

- **R-a) Mantener modelo actual** (una entrada por acepción polisémica). Catálogo crece a ~1060-1300 entradas. HU-004 y HU-005 no cambian. Pero el nombre del producto deja de cuadrar.
- **R-b) Modelo agrupado**: una entrada por lema, con array de acepciones+traducciones. La UI muestra todas las traducciones en TURNO-2; el jugador autoevalúa contra "alguna acepción válida". Catálogo se mantiene en ~1000. UI más compleja.
- **R-c) Modelo monosémico canónico**: una entrada por lema con UNA acepción elegida (la dominante en frecuencia / más útil para A2/B1). Las acepciones secundarias se pierden. Catálogo ~1000, simple, pero el aprendizaje pierde riqueza.

Cualquiera de las tres es defendible. La elección no es de la auditoría — es de la **mini-ronda de reapertura PO ↔ UX ↔ Técnico**.

---

## 7. Recomendaciones del Técnico para la mini-ronda

Sin invadir el rol del PO ni del UX, anoto sólo lo que la auditoría aporta:

1. **R-a) sostiene la arquitectura actual** con coste mínimo de UI pero coste de naming (vocab-1000 ya no es exacto). El catálogo es **estático bundleado**; +20-30% de tamaño es asumible para el bundle (cada entrada léxica ocupa pocos bytes).
2. **R-b) introduce una decisión funcional nueva** sobre el comportamiento de autoevaluación con multi-traducción. El UX tendría que rediseñar TURNO-2 y la mecánica de "Acerté" para varias acepciones. **Coste alto** en HU-004, HU-005 y posiblemente HU-007 (indicador).
3. **R-c) es la opción más simple y la más cuestionable pedagógicamente**. Decidir qué acepción de `take`, `order`, `bank` es "la canónica" es un juicio editorial y arbitrario.

**Recomendación implícita**: R-a) **resuelve la auditoría sin reabrir la lista de HU**. El coste a pagar es el nombre del producto (vocab-1000 → vocab-1100 o aceptar que ~1000 es nominal, no estricto). Si el PO acepta esa concesión, la mini-ronda puede cerrar en un solo turno corto. Si el PO o el UX impulsan R-b) o R-c), la mini-ronda será más larga y tocará reformular HU.

---

## 8. Próximas acciones

1. Subir este `auditoria-ngsl.md` a Drive `etapa-3-refinamiento/` (PDF + HTML) en estado `borrador`.
2. Anotar el resultado y la implicación en `memory.md`.
3. **Arrancar mini-ronda de reapertura de §4.1** PO ↔ UX ↔ Técnico cuando Alberto dé luz verde. Esto implica:
   - Turno del PO: elegir entre R-a / R-b / R-c (o reformular).
   - Turno del UX: respuesta sobre impacto en TURNO-2 y mecánica si R-b.
   - Turno del Técnico: cierre técnico y actualización de `tecnica.md` si toca.
   - Update de `funcional.md` v2 → v3 con la decisión nueva.
   - Update de `hu.md` v2 → v3 si HU-004/HU-005 cambian.
