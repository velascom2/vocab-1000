# memory.md — vocab-1000

Estado vivo de la memoria del proyecto piloto `vocab-1000`. Se crea el **2026-05-26** retroactivamente para alojar las firmas de la cascada de consolidación de Etapa 6 (sub-etapa 6.0 — habilidades `consolidacion-funcional`, `consolidacion-ux`, `consolidacion-tecnica`) que se aplican como **excepción retroactiva post-cierre** sobre el piloto, cerrado el 2026-05-23.

## Estado del proyecto

🔒 **CERRADO EN EL ARNÉS** (gate 6.6 firmado 2026-05-23). Producto en producción en `https://vocab-1000.vercel.app/`. **Inmutable** salvo bugs post-PRO (3 atendidos: Issues #1, #2, #3, todos closed) y la consolidación retroactiva de 2026-05-26.

Histórico narrativo completo del proyecto (etapas 1-3) en archivo hermano del padre: `../../memory-archivo-03-piloto-vocab1000-etapas1-3-2026-05-18-a-21.md`. Etapas 4-6 documentadas en el `memory.md` activo de churrerIA hasta 2026-05-23 y luego en sus archivos respectivos.

## Cuándo se escribe aquí

- Firmas de habilidades del arnés que requieren cierre formal en `memory.md` del proyecto.
- Notas de mantenimiento post-PRO si se reabren issues que requieran actas.
- **No** se reabre como diario de sesión: el proyecto está cerrado.

---

## 2026-05-26 — Cascada de consolidación retroactiva (sub-etapa 6.0)

Aplicación retroactiva post-cierre de la cascada de 3 habilidades de consolidación (creadas el 2026-05-26 en `habilidades/consolidacion-*`). El piloto cerró Etapa 6 con gate 6.6 firmado el 2026-05-23 — **tres días antes** de la creación de la sub-etapa 6.0. Las habilidades dictan literalmente *"si la retrospectiva ya está cerrada, el artefacto queda congelado como histórico"*, pero la decisión 2026-05-26 (ver `ciclo.md` §10) abre una excepción acotada para proyectos cuyo cierre 6.6 es anterior al 2026-05-26 — en la práctica afecta solo a este piloto. Se ejecuta como **pasada histórica única** con marcador `retroactiva post-cierre`. No reabre el gate 6.6; los artefactos vN+1 quedan como evidencia para futuras consultas y para servir de banco de pruebas real de las propias habilidades.

**Ejecutor**: asistente en ausencia de agentes PO / UX / Técnico (los tres aún no están construidos en fase 1; marcador `ejecutada por asistente en ausencia de agente <rol>` registrado en cada firma).

### Firma 1 — consolidacion-funcional (PO)

**Estado**: ✅ cerrada con deltas.
**Ejecutada por**: asistente en ausencia de agente PO.
**Marcador**: `retroactiva post-cierre`.
**Inputs leídos**: `etapa-2/funcional.md v3`, `etapa-3/hu.md v3`, código real en `codigo/src/`, catálogo desplegado `codigo/src/catalog/data/catalog.ts` (versión `ngsl-2026-05-22`), URL canónica `https://vocab-1000.vercel.app/`, Issues #1, #2, #3 de `velascom2/vocab-1000` (todos closed).
**Artefacto resultante**: `etapa-2/funcional.md v4`.

**Deltas aplicados** (3 inconsistencias resueltas — ver §12 Delta v4 del propio funcional):

- **FUN-INC-01** (tipo A) — §4.1: la frase *"el catálogo final mantiene ~1000 grupos por dirección"* contradecía la asimetría direccional declarada en el mismo §4.1 v3. Catálogo real: 1000 `en_es` / 1419 `es_en`. El cap de 1000 aplica solo a `en→es`.
- **FUN-INC-02** (tipo A — contradicción suave) — §1: el resumen ejecutivo decía "catálogo cerrado de ~1000 entradas léxicas" sin precisar la asimetría. Aclarado: la marca "vocab-1000" se refiere al cap de la dirección `en→es`.
- **FUN-INC-03** (tipo D) — §5 CA-08: el criterio declaraba "WCAG 2.2 AA" sin matiz. Realidad: CA-08 sobre los botones Acerté/Fallé sí cumplido; la auditoría WCAG end-to-end completa quedó como **deuda diferida** (Issue #3 cerrado el 2026-05-23 como deuda Fase 7). Aclarado en CA-08.

**hu.md v3**: auditado en paralelo, **sin deltas**. Las 12 HU (HU-001..HU-012) están todas implementadas y verificadas en el gate de Etapa 5 (2026-05-22). Issue #2 (paréntesis catálogo) e Issue #3 (auditoría WCAG diferida) son **deuda post-PRO ya cerrada** y no afectan a las HU declaradas en `hu.md v3`. Versión `hu.md` queda en v3 sin incrementar; firma "sin deltas" registrada aquí.

**Encadenamiento disparado**:
- consolidacion-ux (UX) — ✅ ejecutada (ver Firma 2).
- consolidacion-tecnica (Técnico) — ✅ ejecutada (ver Firma 3).

### Firma 2 — consolidacion-ux (UX)

**Estado**: ✅ cerrada con deltas.
**Ejecutada por**: asistente en ausencia de agente UX.
**Marcador**: `retroactiva post-cierre`.
**Inputs leídos**: `funcional.md v4` (recién consolidado por PO en Firma 1), `etapa-2/ux.md v2`, `etapa-2/arbol-contenidos.md v1`, `etapa-2/diagrama-flujos.md v1`, código real en `codigo/src/`, `etapa-4/acta-diseno.md v5`.
**Artefactos resultantes**: `etapa-2/ux.md v3`, `etapa-2/arbol-contenidos.md v2`, `etapa-2/diagrama-flujos.md v1` (sin deltas).

**Deltas aplicados**:

- **UX-INC-01** (tipo A — contradicción) — resuelta en `arbol-contenidos.md v2` §5: v1 declaraba "Single Page Application: no hay routing entre pantallas separadas en términos de URL en MVP". Realidad: el producto sí usa rutas reales Next.js App Router (`/`, `/jugar/[direction]/`, `/acerca-de`). El cambio de dirección mid-game (HU-006) depende de la navegación URL para resolverse.
- **UX-INC-02** (tipo C — feature no declarada) — resuelta en `arbol-contenidos.md v2` §6 nueva: la ruta `/styleguide` existe en el repo desde el sub-gate 4.2 v3 como material de equipo (no destino del jugador). Declarada en sección separada para no contaminar el árbol del producto.
- **UX-INC-03** (tipo C — cross-ref no declarado) — resuelta en `ux.md v3` §14: cross-ref a `etapa-4/acta-diseno.md v5` para el sistema visual final ("terminal sobre blanco"). El prototipo de etapa 2 (v2) sigue siendo contrato de etapa 2; el sistema visual del producto vive en el acta-diseno de etapa 4 — son artefactos coherentes pero de etapas distintas.

**`diagrama-flujos.md` v1**: verificado contra producto, **sin deltas**. Versión sigue siendo v1 con campo `verificacion_retroactiva: 2026-05-26 (consolidacion-ux · sin deltas)` añadido en frontmatter. Golden path §1 + flujos §2.1-§2.5 + estados auxiliares §3 coinciden con el producto desplegado.

### Firma 3 — consolidacion-tecnica (Técnico)

**Estado**: ✅ cerrada con deltas.
**Ejecutada por**: asistente en ausencia de agente Técnico.
**Marcador**: `retroactiva post-cierre`.
**Inputs leídos**: `funcional.md v4` (recién consolidado por PO en Firma 1), `etapa-2/tecnica.md v2`, `codigo/package.json`, `codigo/next.config.ts`, `codigo/src/` completo, URL canónica `https://vocab-1000.vercel.app/`, catálogo desplegado.
**Artefacto resultante**: `etapa-2/tecnica.md v3`.

**Deltas aplicados** (4 inconsistencias resueltas — ver §14 Delta v3 del propio tecnica):

- **TEC-INC-01** (tipo A) — §2.1 fila Framework: v2 declaraba Next.js 15. Realidad: Next.js 16.2.6. Breaking changes de 16 ya en uso (`unstable_retry`, `useRouter` de `next/navigation`).
- **TEC-INC-02** (tipo A — drift fuerte) — §2.1 fila Hosting MVP: v2 declaraba Strato VC 6-24 + k3s + nginx-ingress. Realidad: Vercel free tier, decisión efectiva durante Etapa 5 (2026-05-22). URL canónica `https://vocab-1000.vercel.app/`. Strato+k3s queda como plan B para fase 2.
- **TEC-INC-03** (tipo A — corrección de cifras) — §3.5: v2 estimaba ~1080 grupos `es_en`. Realidad: 1419 grupos `es_en`. Asimetría real 1,42× (estimada ~1,08×).
- **TEC-INC-04** (tipo C — decisión no declarada) — §6.2: añadido mecanismo Next.js 16 `error.tsx + unstable_retry` que implementa HU-011.
- **Menor**: §2.1 fila Persistencia declaraba `idb-keyval` como librería usada. Código real usa API nativa de IndexedDB sin esa librería. Aclarado.

**Gap del arnés detectado durante la consolidación**: dos drifts (`Next.js 15→16` y `Strato→Vercel`) son típicos del paso entre kickoff y despliegue. Hoy `arquitectura.md` no exige ADR explícito para cambios de hosting o versión mayor del framework durante construcción. **Posible gap a abrir en próxima retrospectiva sistémica**: ADR obligatorio cuando cambia hosting o versión mayor del framework durante construcción. Anotado para futura revisión, no se actúa aquí.

---

## Cierre de la cascada

Las 3 firmas anteriores cierran la sub-etapa 6.0 retroactiva. El piloto sigue en estado **🔒 CERRADO EN EL ARNÉS**: la consolidación retroactiva **no reabre** el gate 6.6, no produce nuevas decisiones del ciclo, no añade scope, no toca código. Solo registra realidad sobre los artefactos de etapa 2-3 que tenían drift respecto al producto final.

**Validación cruzada**: cualquier consumidor futuro del piloto como referencia (otro proyecto del arnés que parta de plantillas de vocab-1000) ahora encuentra artefactos coherentes con el producto en producción.

**Próxima vez que se aplique consolidación** será en posición canónica (sub-etapa 6.0 antes de 6.1) sobre `oficina-agentica` cuando cierre Etapa 5, o sobre cualquier proyecto futuro del arnés. La excepción `retroactiva post-cierre` se acota a proyectos con cierre 6.6 anterior al 2026-05-26 — hoy solo vocab-1000.

---

## Cross-refs del Director

- 2026-05-26 16:19 (Director): detectado cierre formal de la cascada de consolidación retroactiva (3 firmas — `consolidacion-funcional`, `consolidacion-ux`, `consolidacion-tecnica` — todas ✅ cerradas con deltas; `hu.md v3` "sin deltas"). Creación de este `memory.md` resuelve la inconsistencia operativa del marcador `retroactiva post-cierre` que las sesiones SDK del Director de 13:38 y 16:16/16:18 venían señalando. Registrado en `director/log.md`.
- 2026-05-27 23:18 (Director): detectado **primer sub-ciclo MINOR ejecutado bajo ARQ-027** — acta canónica `etapa-5/acta-despliegue-pro.v1.1.0.md` (`estado: aprobado`, gate D-5 firmado por Alberto el 2026-05-27, `tipo_ciclo: sub-ciclo MINOR`, `version_producto: 1.1.0`, `parent_version: 1.0.0`). Bump v1.0.0 → v1.1.0 con dos commits (`1abf9c8` rediseño editorial + `1eeda47` fix WCAG 2.2 AA de regresión capturada por el sub-ciclo); tag git `v1.1.0` aplicado sobre `1eeda47` en `velascom2/vocab-1000` y pusheado al remote. Sin cambios funcionales ni de HU; sin drift de stack (ARQ-022 extendida no aplica). Es el primer acta física en `etapa-5/` del proyecto — el piloto cerró Etapa 6 sin acta canónica de Etapa 5 (gap G2 del piloto). El proyecto mantiene su estado 🔒 CERRADO EN EL ARNÉS; el sub-ciclo entra como "mantenimiento post-PRO" sin reabrir el gate 6.6. Registrado en `director/log.md`.

---

## 2026-05-27 — Sub-ciclo MINOR `v1.0.0 → v1.1.0` firmado (ARQ-027)

**Disparador**: tras formalizar ARQ-027 (versionado del producto con SemVer + umbral pragmático) en el arnés churrerIA el 2026-05-27 ~18:48, Alberto solicita aplicar el primer sub-ciclo MINOR del arnés sobre la mejora estética que él mismo había implementado en sesión Claude Code interactiva pocas horas antes (commit `1abf9c8` del 15:14: "Rediseño editorial: paleta papel+tinta+esmeralda + tipografía Newsreader/Manrope/JetBrains Mono + iconos SVG").

**Tag v1.0.0 retroactivo previo**: aplicado sobre `a670b64` (último commit pre-rediseño, estado de cierre del arnés + Issues #1/#2/#3) con `git push origin v1.0.0`. URL del tag: `https://github.com/velascom2/vocab-1000/releases/tag/v1.0.0`.

**Sub-ciclo MINOR ejecutado** (asistente como ejecutor en ausencia de Frontend agéntico):

1. Verificación de coherencia stack `tecnica.md v3` ↔ `pro` (ciclo §3 Etapa 5 + ARQ-022 extendida): ✅ Next.js 16.2.6 / Vercel / sin BD — sin drift que active ADR.
2. **QA programático**:
   - Vitest unitarios 4/4 ✅ (`npm run test`).
   - Playwright e2e catalog 4/4 ✅.
   - **Playwright e2e a11y 0/10 ❌** — axe-core detecta `color-contrast` (serious) en 5 rutas × 2 viewports.
3. **Bloqueo D-4 reportado al titular** con formato CAL-049: `--muted #7C786F` y `--muted-2 #A8A498` rompen WCAG 2.2 AA 4.5:1 sobre los fondos del sistema. Violación de **USA-R-008** (regla firme: contraste como criterio antes que estética).
4. **Decisión del titular**: fix de contraste + re-validación + tag.
5. **Fix ejecutado** (commit `1eeda47`): `--muted #7C786F → #666259` (3.94 → 5.44 sobre `#F6F2EB`), `--muted-2 #A8A498 → #6D6963` (2.23 → 4.55). Cálculo de contraste WCAG previo al cambio con calculadora programática (script Python embebido en la sesión). Cero cambios de hue — sólo luminosidad.
6. **Re-validación QA**: Vitest 4/4 ✅, Playwright a11y **10/10** ✅, catalog 4/4 ✅. Suite completa **14/14**.
7. **Push del fix + auto-despliegue Vercel + tag v1.1.0** sobre `1eeda47`. Push del tag al remote ejecutado.

**Outputs canónicos del sub-ciclo**:

- `proyectos/vocab-1000/etapa-5/acta-despliegue-pro.v1.1.0.md` — primera acta física de `etapa-5/` del proyecto (el piloto cerró Etapa 6 sin acta-5 canónica en su recorrido inicial). Frontmatter: `version_producto: 1.1.0`, `parent_version: 1.0.0`, `gate: D-5`, `tipo_ciclo: sub-ciclo MINOR`, `regla_aplicable: ARQ-027`, `estado: aprobado`.
- Tag git `v1.1.0` sobre `1eeda47` en `velascom2/vocab-1000`.

**Hallazgos sistémicos** (transcritos al `memory.md` global del arnés en entrada del 2026-05-27 sobre el sub-ciclo):

1. **ARQ-027 valida operativamente**: el sub-ciclo capturó una regresión WCAG AA que un push directo (PATCH) no habría detectado. El umbral PATCH/MINOR está bien calibrado — un cambio de tokens es MINOR.
2. **El push directo del rediseño antes de formalizar ARQ-027 fue operativamente aceptable pero sistémicamente subóptimo**: la regresión llegó a usuarios reales durante ~3 horas (entre `1abf9c8` 15:14 y `1eeda47` ~23:10). Aunque ARQ-027 no estaba escrita en el momento, **USA-R-008 (regla firme desde 2026-05-22) sí lo estaba — y se rompió**. Lección: las directrices se cumplen incluso fuera de un sub-ciclo formal.
3. **Frontera ARQ-027 ↔ ARQ-022 extendida verificada en vivo**: sin drift de stack → no procede ADR. Las dos reglas firmes son ortogonales en este caso.
4. **Caso especial post-hoc**: el orden de este primer sub-ciclo fue `ejecutor → push → QA tardío → fix → tag` (no el ideal `PO → ejecutor → QA → tag`). Aceptable como caso único porque ARQ-027 acababa de formalizarse. **No se considera precedente válido** para casos futuros.

**Estado del producto post-firma**:

- URL: `https://vocab-1000.vercel.app/` (sin cambio — Vercel auto-deploy del HEAD de main).
- Tags vigentes: `v1.0.0` (sobre `a670b64`), `v1.1.0` (sobre `1eeda47`).
- Ventana de observación de 24h abierta sobre `pro`. Rollback disponible vía `git revert 1abf9c8 1eeda47 && git push`.

**Cambio pendiente operativo (fuera de esta sesión)**: aplicar la migración del `memory.md` del proyecto + carpetas `etapa-N/` desde local del arnés a `velascom2/vocab-1000` según la regla firme del 2026-05-26 ("1 proyecto = 1 repo independiente"). Hoy el acta `acta-despliegue-pro.v1.1.0.md` vive en local del arnés (gitignored), no en el repo del producto. Migración no urgente pero declarada como deuda.
