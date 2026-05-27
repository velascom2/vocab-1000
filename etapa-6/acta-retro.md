---
proyecto: vocab-1000
etapa: 6
sub-etapa: 6.4
propietario: Director (asistente en fase 1)
documento: acta-retro
version: 1
fecha: 2026-05-23
firmado_por: Alberto Muñoz Velasco (rol Director + stakeholder)
estado: firmado (gate 6.4 OK, procede 6.5)
---

# Acta de triaje — Retrospectiva piloto vocab-1000

Triaje humano (gate 6.4) de las 10 propuestas de cambio al sistema generadas en `retrospectiva.md` §5.

## Veredictos

| # | Propuesta (resumen) | Tipo | Coste | Veredicto | Motivo / condición de retoma |
|---|---|---|---|---|---|
| 1 | Output canónico de Etapa 5 (`acta-pruebas-qa.md`, `acta-despliegue-pro.md`) | ciclo | bajo | ✅ Aceptar | — |
| 2 | Sub-paso en 6.1: auditar deuda en caliente (`-bis`, TODOs, marcadores) | ciclo | bajo | ✅ Aceptar | — |
| 3 | Sub-paso en 6.5: limpiar deuda detectada en 6.1 (complementa #2) | ciclo | bajo | ✅ Aceptar | — |
| 4 | Recomendación IDB→LS→memory en `directrices/arquitectura.md` | directriz | medio | ✅ Aceptar | — |
| 5 | Recomendación de flujo de bugs (Issue→fix+test→push→deploy→cierre) en `directrices/calidad.md` | directriz | medio | ✅ Aceptar | — |
| 6 | Patrón de archivado de `memory.md` cuando excede umbral | ciclo / convención | bajo-medio | ✅ Aceptar | — |
| 7 | Sub-paso "informe individual de aprendizaje por agente" antes de 6.1 | ciclo / agente | medio | ✅ Aceptar | Aceptada la intención. Formato detallado se acota cuando existan los agentes en fase 1; ahora se anota el sub-paso en `ciclo.md` con marcador "formato a definir cuando los agentes existan". |
| 8 | Plantilla esqueleto de `retrospectiva.md` para futuros proyectos | plantilla | bajo | ✅ Aceptar | — |
| 9 | Caso canónico del Gap #10 como ejemplo en CLAUDE.md de agente futuro | agente | bajo (nota futura) | ✅ Aceptar | Anotación trazable; ejecución real cuando se construyan los CLAUDE.md de los 8 agentes. |
| 10 | Ejemplo del Gap #10 en `directrices/calidad.md` §8 reforzando CAL-046 | directriz | bajo | ✅ Aceptar | — |

**Resultado**: 10 aceptadas, 0 pospuestas, 0 rechazadas.

**Procede sub-etapa 6.5** (ejecución de cambios aceptados). El detalle de cada commit/edit ejecutado se registra en `retrospectiva.md` §"Cambios aplicados".

## Firma

Alberto Muñoz Velasco (rol Director del ciclo + stakeholder) — 2026-05-23.

Gate 6.4 firmado. Procede 6.5.
