---
proyecto: vocab-1000
etapa: 2
nombre_etapa: kickoff
propietario: UX
documento: diagrama-flujos
version: 1
fecha: 2026-05-21
autor_humano_validador: Alberto Muñoz Velasco
estado: aprobado
verificacion_retroactiva: 2026-05-26 (consolidacion-ux · sin deltas)
---

# diagrama-flujos.md — vocab-1000 · Etapa 2

> Output del agente UX. **User flow** del producto MVP a alto nivel. Construido desde los casos de uso de etapa 1 (CU-01..CU-07) y las decisiones funcionales del kickoff. No requiere historias de usuario.
>
> **Verificación retroactiva 2026-05-26** (consolidacion-ux): el golden path y todas las ramificaciones del diagrama §1 + flujos §2.1-§2.5 + estados auxiliares §3 coinciden con el producto desplegado en `https://vocab-1000.vercel.app/`. **No hay deltas — versión sigue siendo v1**. El cambio de dirección mid-game (§2.4) se materializó en código con navegación URL en lugar de mutación de estado interno (fix HU-006 de Fase 4), pero el flujo conceptual es el mismo. Firma en `memory.md` del piloto.
>
> Granularidad: golden path + ramificaciones principales. Las ramas de excepción exhaustivas se cubrirán en etapa 3 (refinamiento) con las HU formales del PO.
>
> Forma textual normativa: Mermaid (ARQ-025 — Markdown canónico, render PNG aditivo).

---

## 1. Diagrama de estados (state diagram)

```mermaid
stateDiagram-v2
  [*] --> Bootstrap

  Bootstrap --> ErrorCarga: catálogo no carga (VB-04)
  Bootstrap --> Home: catálogo OK
  ErrorCarga --> Bootstrap: pulsa "Reintentar"

  Home --> Turno1: elige dirección (HOME-A)
  Home --> Turno1: pulsa "Continuar" (HOME-B/C)
  Home --> Turno1: empieza nueva dirección
  Home --> Acerca: pulsa ⓘ
  Acerca --> Home: cerrar
  Home --> ModalReset: pulsa "Reiniciar" desde card
  Home --> Fin: pulsa "Ver resumen" en dirección completada

  Turno1 --> Turno2: pulsa "Mostrar traducción"
  Turno1 --> Turno1: cambia dirección (palabra vuelve a la cola sin penalización)
  Turno1 --> ModalReset: pulsa "Reiniciar"

  Turno2 --> Turno1: pulsa "Acerté" (palabra sale del loop)
  Turno2 --> Turno1: pulsa "Fallé" (palabra reinsertada en cola)
  Turno2 --> Fin: era la última pendiente y se acertó (VB-02)
  Turno2 --> Turno1: cambia dirección (palabra vuelve a la cola sin penalización)
  Turno2 --> ModalReset: pulsa "Reiniciar"

  ModalReset --> Home: confirma reinicio (estado dirección vuelve a cero)
  ModalReset --> Turno1: cancela reinicio (vuelve al estado previo)

  Fin --> Turno1: pulsa "Volver a empezar"
  Fin --> Home: pulsa "Cambiar dirección"
  Fin --> [*]: cierra el navegador (estado preservado en IDB/LS)
```

---

## 2. Flujos principales explicados

### 2.1. Flujo "primera visita" (CU-01)

```mermaid
flowchart LR
  A[Abre URL] --> B[Bootstrap carga catálogo]
  B --> C{¿Catálogo OK?}
  C -->|sí| D[HOME-A · sin progreso]
  C -->|no| E[Pantalla de error]
  E -->|"Reintentar"| B
  D --> F[Elige dirección]
  F --> G[TURNO-1 · primera palabra]
```

### 2.2. Flujo "visita recurrente" (CU-02)

```mermaid
flowchart LR
  A[Abre URL] --> B[Bootstrap]
  B --> C{¿Progreso local?}
  C -->|en una dirección| D[HOME-B]
  C -->|en ambas direcciones| E[HOME-C]
  D -->|"Continuar"| F[TURNO-1 · estado guardado]
  E -->|"Continuar dirección"| F
```

### 2.3. Flujo del turno (CU-03 + CU-04)

```mermaid
flowchart TD
  T1[TURNO-1 · ve palabra origen] -->|"Mostrar traducción"| T2[TURNO-2 · revelada]
  T2 -->|"Acerté"| Acerto{¿Era la última<br/>pendiente?}
  Acerto -->|no| T1
  Acerto -->|sí| Fin[Pantalla Fin de Ronda]
  T2 -->|"Fallé"| Reinser[Reinsertar en cola<br/>aleatoria]
  Reinser --> T1
```

### 2.4. Flujo "cambio de dirección mid-game" (CU-05)

```mermaid
flowchart LR
  TXn[Turno en dirección D] -->|pulsa control inversión| Save[Guarda estado de D<br/>palabra no autoevaluada<br/>vuelve a la cola de D]
  Save --> Load{¿Hay progreso en D'?}
  Load -->|sí| Restore[Restaura estado de D']
  Load -->|no| Init[Inicializa D'<br/>con catálogo completo]
  Restore --> TXn2[Turno en dirección D']
  Init --> TXn2
```

### 2.5. Flujo "fin de ronda y opciones" (CU-06 + CU-07)

```mermaid
flowchart LR
  Fin[Pantalla Fin de Ronda<br/>4 datos · 2 acciones] -->|"Volver a empezar"| Reset[Reset dirección activa<br/>otra dirección intacta]
  Fin -->|"Cambiar dirección"| Home[HOME-B/C]
  Reset --> TXn[TURNO-1 · primera palabra]
```

---

## 3. Estados auxiliares (no parte del golden path)

```mermaid
flowchart TD
  Any[Cualquier pantalla] -.->|detección al bootstrap| MemoryOnly[Modo memory-only<br/>banner fijo no-dismissable]
  MemoryOnly -.->|el juego sigue funcionando| Any
  MemoryOnly -.->|cierra navegador| Perdido[Progreso se pierde<br/>no es bug, es esperado]

  Turno1[TURNO-1/2] -.->|cierra navegador| Persiste[Progreso persistido en IDB/LS]
  Persiste -.->|abre URL después| Home[HOME con 'Continuar']
```

---

## 4. Reglas de transición no representadas en los diagramas

Algunas reglas son demasiado finas para los diagramas pero forman parte del flujo:

- **Reinserción aleatoria de falladas**: cuando una palabra se marca "Fallé", se inserta en una posición aleatoria entre las pendientes restantes (no inmediatamente la siguiente, no la última). Si la cola pendiente tiene tamaño 1 tras el "Fallé", la siguiente palabra mostrada es la misma — aceptable (VB-07).
- **Tipo gramatical localizado al destino**: en TURNO-2, el tipo gramatical se muestra en el idioma destino de la dirección activa (es: "verbo" si se juega `en→es`; en: "verb" si se juega `es→en`). El TURNO-2 del wireframe lo refleja.
- **Animaciones suspendibles**: si el navegador del jugador respeta `prefers-reduced-motion: reduce`, todas las transiciones de cross-fade, fade-in, flash de color son **instantáneas** (sin animación).
- **Foco accesible**: tras cualquier transición de estado, el foco se mueve al primer interactivo de la nueva pantalla. En TURNO-2 el foco va automáticamente al botón "Acerté" para permitir autoevaluación con teclado.

---

## 5. Lo que NO entra en este diagrama (entra en etapa 3)

- Estados de error específicos por bug (network failures, race conditions entre `set` IDB y cambio de dirección, etc.).
- Manejo detallado de `aria-live` y orden de tabulación caso a caso.
- Validaciones internas de integridad del catálogo en runtime.
- Métricas de jugabilidad (intencionalmente fuera del MVP — telemetría diferida a fase 2).

Esos detalles entran en etapa 3 (refinamiento) cuando el PO redacte las HU formales y el equipo ejecutor (Backend/Frontend/SRE/QA) las analice.
