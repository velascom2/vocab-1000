import { Acepciones } from "@/components/Acepciones";
import { Button } from "@/components/Button";
import { DirectionButton } from "@/components/DirectionButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProgressDual } from "@/components/ProgressDual";
import { WordDisplay } from "@/components/WordDisplay";
import styles from "./page.module.css";

export const metadata = {
  title: "Sistema de diseño · vocab-1000",
  description: "Guía de estilos del sistema de diseño del piloto vocab-1000 (arnés churrerIA).",
};

type ColorToken = {
  name: string;
  hex: string;
  use: string;
  textColor?: string;
};

const COLOR_BACKGROUNDS: ColorToken[] = [
  { name: "--color-bg", hex: "#FFFFFF", use: "Fondo principal de la app" },
  { name: "--color-surface", hex: "#FFFFFF", use: "Header, footer, cards" },
  { name: "--color-surface-elevated", hex: "#F8FAFC", use: "Modal, hover surfaces" },
];

const COLOR_TEXT: ColorToken[] = [
  { name: "--color-text", hex: "#0F172A", use: "Texto primario" },
  { name: "--color-text-muted", hex: "#475569", use: "Labels, secundario" },
  { name: "--color-text-faint", hex: "#64748B", use: "Terciario, atribución" },
];

const COLOR_BRAND: ColorToken[] = [
  { name: "--color-primary", hex: "#6366F1", use: "Botón primario, foco", textColor: "#fff" },
  { name: "--color-primary-hover", hex: "#4F46E5", use: "Hover del primario", textColor: "#fff" },
  { name: "--color-accent", hex: "#A855F7", use: "Acento (gradient tagline)", textColor: "#fff" },
];

const COLOR_SEMANTIC: ColorToken[] = [
  { name: "--color-success", hex: "#16A34A", use: "Botón Acerté", textColor: "#fff" },
  { name: "--color-danger", hex: "#DC2626", use: "Botón Fallé, errores", textColor: "#fff" },
  { name: "--color-warning-soft", hex: "#F59E0B", use: "Banner memory-only" },
];

const COLOR_BORDERS: ColorToken[] = [
  { name: "--color-border", hex: "#E2E8F0", use: "Bordes sutiles entre superficies" },
  { name: "--color-border-strong", hex: "#CBD5E1", use: "Bordes definidos, botones secundarios" },
];

const TYPE_SCALE = [
  { token: "--font-size-sm", size: "0.875rem", sample: "14px · The quick brown fox" },
  { token: "--font-size-base", size: "1rem", sample: "16px · The quick brown fox" },
  { token: "--font-size-lg", size: "1.25rem", sample: "20px · The quick brown" },
  { token: "--font-size-xl", size: "2rem", sample: "32px · Quick brown" },
  { token: "--font-size-xxl", size: "3rem", sample: "48px · Quick" },
];

const SPACING_SCALE = [
  { token: "--space-1", rem: "0.25rem", px: 4 },
  { token: "--space-2", rem: "0.5rem", px: 8 },
  { token: "--space-3", rem: "0.75rem", px: 12 },
  { token: "--space-4", rem: "1rem", px: 16 },
  { token: "--space-6", rem: "1.5rem", px: 24 },
  { token: "--space-8", rem: "2rem", px: 32 },
  { token: "--space-12", rem: "3rem", px: 48 },
  { token: "--space-16", rem: "4rem", px: 64 },
];

const RADII = [
  { token: "--radius-sm", rem: "0.375rem" },
  { token: "--radius-md", rem: "0.75rem" },
  { token: "--radius-lg", rem: "1rem" },
  { token: "--radius-xl", rem: "1.5rem" },
];

const SHADOWS = [
  { token: "--shadow-sm", desc: "elevación mínima" },
  { token: "--shadow-md", desc: "cards, hovers" },
  { token: "--shadow-lg", desc: "modal" },
  { token: "--shadow-glow-primary", desc: "primary hover" },
];

function ColorBlock({ tokens, title }: { tokens: ColorToken[]; title: string }) {
  return (
    <div className={styles.subsection}>
      <h3 className={styles.subsectionTitle}>{title}</h3>
      <div className={styles.swatchGrid}>
        {tokens.map((t) => (
          <div className={styles.swatch} key={t.name}>
            <div className={styles.swatchColor} style={{ background: t.hex }} />
            <div className={styles.swatchInfo}>
              <p className={styles.swatchName}>{t.name}</p>
              <p className={styles.swatchHex}>{t.hex}</p>
              <p className={styles.swatchUse}>{t.use}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h1 className={styles.sidebarTitle}>vocab-1000 · Sistema de diseño</h1>
        <ul className={styles.sidebarNav}>
          <li><a className={styles.sidebarLink} href="#colores">01 · Colores</a></li>
          <li><a className={styles.sidebarLink} href="#tipografia">02 · Tipografía</a></li>
          <li><a className={styles.sidebarLink} href="#espaciado">03 · Espaciado</a></li>
          <li><a className={styles.sidebarLink} href="#radios-sombras">04 · Radios y sombras</a></li>
          <li><a className={styles.sidebarLink} href="#iconografia">05 · Iconografía</a></li>
          <li><a className={styles.sidebarLink} href="#botones">06 · Botones</a></li>
          <li><a className={styles.sidebarLink} href="#inputs">07 · Inputs y forms</a></li>
          <li><a className={styles.sidebarLink} href="#componentes">08 · Componentes del producto</a></li>
          <li><a className={styles.sidebarLink} href="#banners">09 · Banners y estados</a></li>
          <li><a className={styles.sidebarLink} href="#layout">10 · Layout y breakpoints</a></li>
        </ul>
      </aside>

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Sistema de diseño</h1>
        <p className={styles.pageSubtitle}>
          Guía de estilos del piloto vocab-1000 y, por extensión, del arnés churrerIA.
          Catálogo de tokens y componentes para validar la dirección visual antes de la
          implementación. Entregable canónico de la sub-etapa 4.1 del ciclo (decisión 2026-05-22).
        </p>

        {/* SECCIÓN 1 — Colores */}
        <section id="colores" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>01</span>
            <h2 className={styles.sectionTitle}>Colores</h2>
          </div>
          <p className={styles.sectionDesc}>
            Paleta startup fresca clara (familia C de USA-R-006) con primary indigo
            heredado de la iteración previa. Tokens semánticos definidos en{" "}
            <code>globals.css</code>. Contraste verificado en todos los pares texto/fondo
            (USA-013, USA-R-008).
          </p>
          <ColorBlock tokens={COLOR_BACKGROUNDS} title="Fondos" />
          <ColorBlock tokens={COLOR_TEXT} title="Texto" />
          <ColorBlock tokens={COLOR_BRAND} title="Marca" />
          <ColorBlock tokens={COLOR_SEMANTIC} title="Semánticos" />
          <ColorBlock tokens={COLOR_BORDERS} title="Bordes" />
        </section>

        {/* SECCIÓN 2 — Tipografía */}
        <section id="tipografia" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>02</span>
            <h2 className={styles.sectionTitle}>Tipografía</h2>
          </div>
          <p className={styles.sectionDesc}>
            Familia <code>system-ui</code> (sin fuentes web por USA-020). Pesos en uso:
            400 regular, 500 medium, 600 semibold, 700 bold. Line-height base 1.5.
          </p>
          {TYPE_SCALE.map((t) => (
            <div className={styles.typeRow} key={t.token}>
              <span className={styles.typeToken}>{t.token}</span>
              <span className={styles.typeMeta}>{t.size}</span>
              <span className={styles.typeSample} style={{ fontSize: t.size }}>
                {t.sample}
              </span>
            </div>
          ))}
        </section>

        {/* SECCIÓN 3 — Espaciado */}
        <section id="espaciado" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>03</span>
            <h2 className={styles.sectionTitle}>Espaciado</h2>
          </div>
          <p className={styles.sectionDesc}>
            Escala incremental no lineal (1, 2, 3, 4, 6, 8, 12, 16). Cubre desde
            elementos compactos a separaciones de sección.
          </p>
          {SPACING_SCALE.map((s) => (
            <div className={styles.spacingRow} key={s.token}>
              <span className={styles.typeToken}>{s.token}</span>
              <span className={styles.typeMeta}>
                {s.rem} · {s.px}px
              </span>
              <div className={styles.spacingBar} style={{ width: s.px }} />
            </div>
          ))}
        </section>

        {/* SECCIÓN 4 — Radios y sombras */}
        <section id="radios-sombras" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>04</span>
            <h2 className={styles.sectionTitle}>Radios y sombras</h2>
          </div>
          <p className={styles.sectionDesc}>
            Radios generosos (estilo Linear/Vercel). Sombras adaptadas al tema oscuro con
            alpha alto y blur amplio para suavidad.
          </p>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Radios</h3>
            <div className={styles.radiusGrid}>
              {RADII.map((r) => (
                <div className={styles.radiusItem} key={r.token}>
                  <div
                    className={styles.radiusBox}
                    style={{ borderRadius: `var(${r.token})` }}
                  />
                  <span className={styles.radiusLabel}>{r.token}</span>
                  <span className={styles.radiusLabel}>{r.rem}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Sombras</h3>
            <div className={styles.shadowGrid}>
              {SHADOWS.map((s) => (
                <div className={styles.shadowItem} key={s.token}>
                  <div
                    className={styles.shadowBox}
                    style={{ boxShadow: `var(${s.token})` }}
                  />
                  <span className={styles.radiusLabel}>{s.token}</span>
                  <span className={styles.radiusLabel}>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 5 — Iconografía */}
        <section id="iconografia" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>05</span>
            <h2 className={styles.sectionTitle}>Iconografía</h2>
          </div>
          <p className={styles.sectionDesc}>
            Set mínimo en uso para el piloto. Glyphs Unicode (los SVG inline migrarán en
            fase de implementación según cruce TEC-OU1 del kickoff v1).
          </p>
          <div
            className={styles.componentDemo}
            style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap" }}
          >
            {[
              { glyph: "→", name: "arrow-right", use: "Dirección, navegación" },
              { glyph: "↻", name: "refresh", use: "Reiniciar ronda" },
              { glyph: "↔", name: "swap", use: "Cambiar dirección" },
              { glyph: "ⓘ", name: "info", use: "Acerca de" },
              { glyph: "✓", name: "check", use: "Acerté" },
              { glyph: "✗", name: "cross", use: "Fallé" },
              { glyph: "✨", name: "sparkles", use: "Fin de ronda" },
              { glyph: "·", name: "dot", use: "Separador" },
            ].map((icon) => (
              <div
                key={icon.name}
                style={{ textAlign: "center", minWidth: "80px" }}
              >
                <div style={{ fontSize: "2rem", lineHeight: "1.2" }}>{icon.glyph}</div>
                <p className={styles.swatchName}>{icon.name}</p>
                <p className={styles.swatchUse}>{icon.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 6 — Botones */}
        <section id="botones" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>06</span>
            <h2 className={styles.sectionTitle}>Botones</h2>
          </div>
          <p className={styles.sectionDesc}>
            Componente <code>&lt;Button&gt;</code>: 5 variantes + opciones de icono y
            full-width. Estados <em>hover</em>, <em>focus</em> y <em>active</em> se
            verifican navegando en vivo (CSS reales).
          </p>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>Variantes</p>
            <div className={styles.buttonRow}>
              <span className={styles.buttonLabel}>primary</span>
              <Button variant="primary">Mostrar traducción</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
            <div className={styles.buttonRow}>
              <span className={styles.buttonLabel}>secondary</span>
              <Button variant="secondary">Cancelar</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
            <div className={styles.buttonRow}>
              <span className={styles.buttonLabel}>success</span>
              <Button variant="success" icon="✓">
                Acerté
              </Button>
              <Button variant="success" icon="✓" disabled>
                Disabled
              </Button>
            </div>
            <div className={styles.buttonRow}>
              <span className={styles.buttonLabel}>danger</span>
              <Button variant="danger" icon="✗">
                Fallé
              </Button>
              <Button variant="danger" icon="✗" disabled>
                Disabled
              </Button>
            </div>
            <div className={styles.buttonRow}>
              <span className={styles.buttonLabel}>ghost</span>
              <Button variant="ghost">Más tarde</Button>
            </div>
          </div>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>Full width</p>
            <Button variant="primary" fullWidth>
              Continuar
            </Button>
          </div>
        </section>

        {/* SECCIÓN 7 — Inputs */}
        <section id="inputs" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>07</span>
            <h2 className={styles.sectionTitle}>Inputs y formularios</h2>
          </div>
          <p className={styles.sectionDesc}>
            vocab-1000 MVP no usa formularios (sin login, sin búsqueda). Estos elementos
            forman parte del sistema heredable por proyectos futuros del arnés.
          </p>

          <div className={styles.componentDemo}>
            <div className={styles.inputRow}>
              <label htmlFor="sg-text" className={styles.inputLabel}>
                Text input
              </label>
              <input
                id="sg-text"
                className={styles.input}
                placeholder="email@ejemplo.com"
              />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="sg-focus" className={styles.inputLabel}>
                Focus (haz click)
              </label>
              <input id="sg-focus" className={styles.input} placeholder="Recibe focus" />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="sg-error" className={styles.inputLabel}>
                Con error
              </label>
              <div style={{ width: "100%" }}>
                <input
                  id="sg-error"
                  className={`${styles.input} ${styles.inputError}`}
                  defaultValue="alberto@"
                  aria-invalid
                />
                <p className={styles.inputErrorMsg}>
                  El correo no es válido. Verifica el dominio.
                </p>
              </div>
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="sg-disabled" className={styles.inputLabel}>
                Disabled
              </label>
              <input
                id="sg-disabled"
                className={styles.input}
                defaultValue="No editable"
                disabled
              />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="sg-textarea" className={styles.inputLabel}>
                Textarea
              </label>
              <textarea
                id="sg-textarea"
                className={styles.textarea}
                placeholder="Comentario…"
                defaultValue=""
              />
            </div>
            <div className={styles.inputRow}>
              <label htmlFor="sg-select" className={styles.inputLabel}>
                Select
              </label>
              <select id="sg-select" className={styles.select} defaultValue="">
                <option value="">Elige…</option>
                <option value="es-en">Español → Inglés</option>
                <option value="en-es">Inglés → Español</option>
              </select>
            </div>
            <div className={styles.inputRow}>
              <span className={styles.inputLabel}>Checkbox</span>
              <div className={styles.checkboxRow}>
                <input
                  id="sg-check"
                  type="checkbox"
                  className={styles.checkbox}
                  defaultChecked
                />
                <label htmlFor="sg-check">Recordar mi progreso</label>
              </div>
            </div>
            <div className={styles.inputRow}>
              <span className={styles.inputLabel}>Radio</span>
              <div className={styles.checkboxRow}>
                <input id="sg-r1" type="radio" name="dir" className={styles.radio} defaultChecked />
                <label htmlFor="sg-r1">Español → Inglés</label>
                <span style={{ width: "var(--space-4)" }} />
                <input id="sg-r2" type="radio" name="dir" className={styles.radio} />
                <label htmlFor="sg-r2">Inglés → Español</label>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 8 — Componentes del producto */}
        <section id="componentes" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>08</span>
            <h2 className={styles.sectionTitle}>Componentes del producto</h2>
          </div>
          <p className={styles.sectionDesc}>
            Componentes específicos de vocab-1000 con su markup en vivo. Los hover/focus
            se comprueban en interacción real.
          </p>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>Header</p>
            <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <Header variant="home" />
            </div>
          </div>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>DirectionButton</p>
            <DirectionButton from="Español" to="Inglés" href="/jugar/es-en" />
          </div>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>WordDisplay</p>
            <WordDisplay prompt="understand" />
          </div>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>Acepciones · length 1 (monosémico)</p>
            <Acepciones answers={["entender"]} pos="verb" destLang="es" />
          </div>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>Acepciones · length 2 (polisémico inline)</p>
            <Acepciones answers={["banco", "ribera"]} pos="noun" destLang="es" />
          </div>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>Acepciones · length 3 (polisémico vertical)</p>
            <Acepciones answers={["agarrar", "tomar", "llevar"]} pos="verb" destLang="es" />
          </div>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>ProgressDual</p>
            <ProgressDual acertadas={247} total={1000} turnos={312} />
          </div>

          <div className={styles.componentDemo}>
            <p className={styles.componentDemoLabel}>Footer</p>
            <Footer />
          </div>
        </section>

        {/* SECCIÓN 9 — Banners y estados */}
        <section id="banners" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>09</span>
            <h2 className={styles.sectionTitle}>Banners y estados</h2>
          </div>
          <p className={styles.sectionDesc}>
            Avisos y estados de feedback. El banner <em>warning</em> es el que se usará
            para HU-010 (memory-only) en Fase 5 de etapa 4.
          </p>

          <div className={`${styles.banner} ${styles.bannerWarning}`}>
            <span aria-hidden="true">⚠</span>
            <span>Este navegador no guardará tu progreso entre sesiones.</span>
          </div>
          <div className={`${styles.banner} ${styles.bannerInfo}`}>
            <span aria-hidden="true">ⓘ</span>
            <span>Has cambiado de dirección. El progreso de la anterior se conserva.</span>
          </div>
          <div className={`${styles.banner} ${styles.bannerSuccess}`}>
            <span aria-hidden="true">✓</span>
            <span>Progreso guardado correctamente.</span>
          </div>
          <div className={`${styles.banner} ${styles.bannerDanger}`}>
            <span aria-hidden="true">✗</span>
            <span>No se ha podido cargar el catálogo. Recarga la página.</span>
          </div>
        </section>

        {/* SECCIÓN 10 — Layout y breakpoints */}
        <section id="layout" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionId}>10</span>
            <h2 className={styles.sectionTitle}>Layout y breakpoints</h2>
          </div>
          <p className={styles.sectionDesc}>
            Patrones de layout estables del producto. Container max-width 480-600px según
            pantalla. Tres breakpoints semánticos.
          </p>

          <div className={styles.breakpointRow}>
            <span className={styles.breakpointName}>mobile</span>
            <span className={styles.breakpointRange}>&lt; 600px</span>
            <span className={styles.breakpointUse}>
              Botones full-width apilados, tipo gramatical abreviado, container 100% con
              padding interno.
            </span>
          </div>
          <div className={styles.breakpointRow}>
            <span className={styles.breakpointName}>tablet</span>
            <span className={styles.breakpointRange}>600 – 1024px</span>
            <span className={styles.breakpointUse}>
              Botones lado a lado, tipo gramatical completo, container 600px máximo.
            </span>
          </div>
          <div className={styles.breakpointRow}>
            <span className={styles.breakpointName}>desktop</span>
            <span className={styles.breakpointRange}>&gt; 1024px</span>
            <span className={styles.breakpointUse}>
              Mismo container 600px centrado con mucho aire alrededor.
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
