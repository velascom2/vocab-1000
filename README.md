# vocab-1000

Proyecto piloto sintético de la **fase 1** de churrerIA. Es la primera vuelta al ciclo agéntico diseñado en los pasos 1-4 — la usa Alberto haciendo de Director manualmente para **detectar carriles que faltan** en directrices y diseños de agentes antes de codificar a los agentes.

## Qué es

Un juego de vocabulario en idiomas. El jugador elige `origen → destino` (en MVP: `es→en` o `en→es`), ve una palabra y se autoevalúa al revelar la traducción. Las falladas vuelven al loop hasta completar el catálogo.

- **MVP**: web responsive (desktop / móvil / tablet) sin login. ~1000 entradas léxicas multilingües. Progreso local (IndexedDB). Selector de dirección + cambio mid-game.
- **Fase 2**: app iOS + Android (Capacitor) + login + persistencia servidor + RGPD.
- **Fase 3**: estadísticas por usuario (palabras, tipos gramaticales, evolución).

Detalle completo en `churrerIA/memory.md`, sección "Sub-paso 5.1 — Proyecto piloto sintético".

## Estructura

Sigue ARQ-020 (directriz de Arquitectura). Cada carpeta se rellena cuando llegue su etapa del ciclo:

```
vocab-1000/
├── etapa-1/        requerimiento funcional MVP (PO)
├── etapa-2/        análisis a alto nivel
│   ├── funcional.md
│   ├── ux.md
│   └── tecnica.md
├── etapa-3/        refinamiento (HUs detalladas)
├── adr/            decisiones arquitectónicas
├── backend/        no se construye en MVP (decisión 2026-05-18)
├── frontend/       Next.js 15 + TypeScript
├── infra/          Helm chart + workflows
├── tests/          e2e cross-componente
├── fixtures/       datos de prueba (catálogo de palabras)
├── pruebas/        informes QA por entorno y fecha
└── incidentes/     registros operativos
```

## Naturaleza experimental

Este proyecto **no está pensado para venderse** ni para ser cliente cero. Su valor es servir de **caso de prueba del sistema agéntico** — los outputs por etapa y los huecos detectados alimentan la evolución de directrices y agentes. Cuando el sistema esté maduro, el código puede reusarse o tirarse según convenga.
