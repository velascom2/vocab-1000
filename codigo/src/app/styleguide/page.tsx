import type { CSSProperties } from "react";
import styles from "./page.module.css";

export const metadata = {
  title: "Sistema de diseño · vocab-1000",
  description:
    "Guía de estilos v2 (rediseño editorial paper + emerald) del piloto vocab-1000 — arnés churrerIA.",
};

/* ── SVG inline reutilizables (TEC-OU1 — sin emojis) ───────────────── */

function IconArrow({ size = 20, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 10h10M11 6l4 4-4 4" />
    </svg>
  );
}

function IconRefresh({ size = 20, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 10a7 7 0 0 1 12-5l2 2M17 4v4h-4M17 10a7 7 0 0 1-12 5l-2-2M3 16v-4h4" />
    </svg>
  );
}

function IconSwap({ size = 20, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7h14M14 4l3 3-3 3" />
      <path d="M17 13H3M6 16l-3-3 3-3" />
    </svg>
  );
}

function IconInfo({ size = 20, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M10 9v5M10 6.5v.5" />
    </svg>
  );
}

function IconCheck({ size = 20, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}

function IconCross({ size = 20, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

function IconEye({ size = 20, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" />
      <circle cx="10" cy="10" r="2.5" />
    </svg>
  );
}

function IconPlay({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M6 4l10 6-10 6V4z" />
    </svg>
  );
}

function IconComplete({ size = 20, strokeWidth = 1.6 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M6 10l3 3 6-6" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6h12M4 12h16M4 18h10" />
    </svg>
  );
}

function IconWarningTri() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.bannerIcon}
    >
      <path d="M10 2l8 14H2L10 2z" />
      <path d="M10 8v3M10 13v.5" />
    </svg>
  );
}

function ArrowLong() {
  return (
    <svg
      viewBox="0 0 24 12"
      width="28"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 6h20M17 1.5L21.5 6 17 10.5" />
    </svg>
  );
}

/* ── Datos tabulares ───────────────────────────────────────────────── */

type ColorToken = { name: string; hex: string; desc: string; bottomBorder?: string };

const BACKGROUNDS: ColorToken[] = [
  { name: "--bg", hex: "#F6F2EB", desc: "Fondo principal de la app (papel cálido)." },
  { name: "--bg-2", hex: "#EFEAE0", desc: "Hover de fondos sutiles, chips inertes." },
  {
    name: "--surface",
    hex: "#FBF8F2",
    desc: "Cards, modal, superficies elevadas.",
    bottomBorder: "#E7E1D2",
  },
];

const TEXTS: ColorToken[] = [
  { name: "--ink", hex: "#1B1A17", desc: "Texto primario, botón primario." },
  { name: "--ink-2", hex: "#3A3833", desc: "Texto secundario, hover primary." },
  { name: "--muted", hex: "#7C786F", desc: "Labels mono, microcopy, footers." },
  { name: "--muted-2", hex: "#A8A498", desc: "Separadores, decoración tipográfica." },
];

const ACCENTS: ColorToken[] = [
  { name: "--accent", hex: "#1F6F5C", desc: "Verde esmeralda. Acentos, foco, progreso." },
  { name: "--accent-ink", hex: "#0E3D32", desc: "Texto sobre fondo claro de acento." },
  { name: "--accent-bg", hex: "#E4EEE9", desc: "Fondo del botón “Mostrar traducción”." },
];

const SEMANTICS: ColorToken[] = [
  { name: "--success", hex: "#1F6F5C", desc: "Botón “Acerté”. Igual al acento (intencional)." },
  { name: "--danger", hex: "#A8392E", desc: "Botón “Fallé”, confirm destructiva." },
  { name: "--danger-bg", hex: "#F1DDD9", desc: "Fondos de aviso suave." },
];

const RULES: ColorToken[] = [
  { name: "--rule", hex: "#D8D2C4", desc: "Borde estándar de cards, separadores." },
  { name: "--rule-2", hex: "#E7E1D2", desc: "Carriles de progreso, divisores sutiles." },
];

function TokenGrid({ tokens, fonts }: { tokens: ColorToken[]; fonts?: boolean }) {
  return (
    <div className={`${styles.tokens} ${fonts ? styles.tokensFonts : ""}`.trim()}>
      {tokens.map((t) => (
        <div key={t.name} className={styles.token}>
          <div
            className={styles.tokenSwatch}
            style={
              t.bottomBorder
                ? ({ background: t.hex, borderBottomColor: t.bottomBorder } as CSSProperties)
                : { background: t.hex }
            }
          />
          <div className={styles.tokenBody}>
            <div className={styles.tokenName}>{t.name}</div>
            <div className={styles.tokenValue}>{t.hex}</div>
            <div className={styles.tokenDesc}>{t.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const SPACES = [
  { name: "--space-1", val: "4px", px: 4 },
  { name: "--space-2", val: "8px", px: 8 },
  { name: "--space-3", val: "12px", px: 12 },
  { name: "--space-4", val: "16px", px: 16 },
  { name: "--space-5", val: "20px", px: 20 },
  { name: "--space-6", val: "24px", px: 24 },
  { name: "--space-8", val: "32px", px: 32 },
  { name: "--space-10", val: "40px", px: 40 },
  { name: "--space-12", val: "48px", px: 48 },
  { name: "--space-16", val: "64px", px: 64 },
  { name: "--space-20", val: "80px", px: 80 },
  { name: "--space-24", val: "96px", px: 96 },
];

const RADII = [
  { val: "4px", name: "--radius-sm", use: "4px · chips internos" },
  { val: "10px", name: "--radius-md", use: "10px · cards, inputs" },
  { val: "16px", name: "--radius-lg", use: "16px · botones evaluación, modal" },
  { val: "22px", name: "--radius-xl", use: "22px · DirectionCards" },
  { val: "999px", name: "999px", use: "píldora · chips, botones UI" },
];

const SHADOWS = [
  {
    css: "0 1px 0 rgba(0,0,0,.02), 0 1px 2px rgba(0,0,0,.04)",
    name: "--shadow-card",
    use: "cards en reposo",
  },
  {
    css: "0 1px 0 rgba(0,0,0,.03), 0 8px 24px -8px rgba(0,0,0,.10)",
    name: "--shadow-lift",
    use: "cards en hover, botones eval hover",
  },
  {
    css: "0 24px 64px -16px rgba(0,0,0,.28)",
    name: "--shadow-modal",
    use: "modal de reset",
  },
];

const TOC = [
  { num: "01", id: "colores", label: "Colores" },
  { num: "02", id: "tipografia", label: "Tipografía" },
  { num: "03", id: "espaciado", label: "Espaciado" },
  { num: "04", id: "radios", label: "Radios y sombras" },
  { num: "05", id: "iconografia", label: "Iconografía" },
  { num: "06", id: "botones", label: "Botones" },
  { num: "07", id: "inputs", label: "Inputs y forms" },
  { num: "08", id: "componentes", label: "Componentes del producto" },
  { num: "09", id: "banners", label: "Banners y estados" },
  { num: "10", id: "layout", label: "Layout y breakpoints" },
];

/* ── Página ────────────────────────────────────────────────────────── */

export default function StyleguidePage() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <a href="#top" className={styles.brand}>
          vocab<span className={styles.brandNum}>·1000</span>
        </a>
        <p className={styles.sidebarSub}>Sistema de diseño · rediseño editorial</p>
        <ul className={styles.toc}>
          {TOC.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={styles.tocLink}>
                <span className={styles.tocNum}>{item.num}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.content} id="top">
        <header className={styles.hero}>
          <span className={styles.eyebrow}>
            vocab-1000 · sistema de diseño · v2 (rediseño editorial)
          </span>
          <h1 className={styles.heroTitle}>
            De terminal-teal
            <br />
            <em>a entrada de diccionario.</em>
          </h1>
          <p className={styles.heroLead}>
            Esta guía documenta el sistema visual del rediseño de mayo 2026 del piloto{" "}
            <strong>vocab-1000</strong>. Reemplaza la guía anterior (terminal sobre blanco,
            monoespaciada). El núcleo del cambio: papel cálido + tinta + un acento verde sobrio,
            tipografía pareada (serif Newsreader para la palabra-protagonista, sans Manrope para
            UI, mono JetBrains Mono solo para microcopy técnico).
          </p>
        </header>

        {/* 01 COLORES */}
        <section id="colores" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>01</span>
            <h2 className={styles.sectionTitle}>Colores</h2>
          </div>
          <p className={styles.sectionIntro}>
            Paleta &ldquo;papel + tinta + esmeralda&rdquo;. Fondos cálidos, tinta casi-negra,
            acento verde profundo. Sin gradientes. Contraste verificado en todos los pares
            texto/fondo (≥ 4.5:1 AA, ≥ 7:1 AAA donde es posible).
          </p>

          <p className={styles.subhead}>Fondos</p>
          <TokenGrid tokens={BACKGROUNDS} />

          <p className={styles.subhead}>Texto</p>
          <TokenGrid tokens={TEXTS} />

          <p className={styles.subhead}>Marca y acento</p>
          <TokenGrid tokens={ACCENTS} />

          <p className={styles.subhead}>Semánticos</p>
          <TokenGrid tokens={SEMANTICS} />

          <p className={styles.subhead}>Bordes</p>
          <TokenGrid tokens={RULES} />
        </section>

        {/* 02 TIPOGRAFÍA */}
        <section id="tipografia" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>02</span>
            <h2 className={styles.sectionTitle}>Tipografía</h2>
          </div>
          <p className={styles.sectionIntro}>
            Pareja tipográfica intencional: <strong>Newsreader</strong> (serif variable) para la
            palabra-protagonista, dándole peso de &ldquo;entrada de diccionario&rdquo;;{" "}
            <strong>Manrope</strong> (sans) para todo lo demás de la UI;{" "}
            <strong>JetBrains Mono</strong> reservada para microcopy técnico (códigos{" "}
            <span className={styles.mono}>ES → EN</span>, contadores, ids). Servidas vía{" "}
            <span className={styles.mono}>next/font/google</span> (self-host, sin pings externos).
          </p>

          <p className={styles.subhead}>Familias</p>
          <div className={`${styles.tokens} ${styles.tokensFonts}`}>
            <div className={styles.token}>
              <div className={styles.tokenBody}>
                <div className={styles.tokenSpecimenSerif}>Aa</div>
                <div className={`${styles.tokenName} ${styles.tokenNameSpaced}`}>--font-serif</div>
                <div className={styles.tokenValue}>Newsreader · 400/500/600/700 · italic</div>
                <div className={styles.tokenDesc}>
                  Palabra protagonista, titulares, números grandes.
                </div>
              </div>
            </div>
            <div className={styles.token}>
              <div className={styles.tokenBody}>
                <div className={styles.tokenSpecimenSans}>Aa</div>
                <div className={`${styles.tokenName} ${styles.tokenNameSpaced}`}>--font-sans</div>
                <div className={styles.tokenValue}>Manrope · 400/500/600/700</div>
                <div className={styles.tokenDesc}>UI, botones, párrafos, labels.</div>
              </div>
            </div>
            <div className={styles.token}>
              <div className={styles.tokenBody}>
                <div className={styles.tokenSpecimenMono}>Aa</div>
                <div className={`${styles.tokenName} ${styles.tokenNameSpaced}`}>--font-mono</div>
                <div className={styles.tokenValue}>JetBrains Mono · 400/500</div>
                <div className={styles.tokenDesc}>Códigos, contadores, eyebrows, kbd.</div>
              </div>
            </div>
          </div>

          <p className={styles.subhead}>Escala</p>
          <div>
            <div className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaToken}>word/display</span>
                <span className={styles.typeMetaSpec}>
                  Serif 500 · 96px · ln 1 · ls -0.03em
                </span>
              </div>
              <div className={`${styles.typeSpecimen} ${styles.specDisplay}`}>understand</div>
            </div>
            <div className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaToken}>hero</span>
                <span className={styles.typeMetaSpec}>
                  Serif 500 · clamp 48-96px · ln 0.98 · ls -0.025em
                </span>
              </div>
              <div className={`${styles.typeSpecimen} ${styles.specHero}`}>Las mil palabras</div>
            </div>
            <div className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaToken}>title</span>
                <span className={styles.typeMetaSpec}>
                  Serif 500 · 36px · ln 1.05 · ls -0.02em
                </span>
              </div>
              <div className={`${styles.typeSpecimen} ${styles.specTitle}`}>
                ¿Reiniciar la ronda?
              </div>
            </div>
            <div className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaToken}>subtitle</span>
                <span className={styles.typeMetaSpec}>
                  Serif 500 · 24px · ln 1.1 · ls -0.015em
                </span>
              </div>
              <div className={`${styles.typeSpecimen} ${styles.specSubtitle}`}>
                Español → Inglés
              </div>
            </div>
            <div className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaToken}>body-lg</span>
                <span className={styles.typeMetaSpec}>Sans 400 · 18px · ln 1.55</span>
              </div>
              <div className={`${styles.typeSpecimen} ${styles.specBodyLg}`}>
                Un juego sencillo: ves una palabra, intentas su traducción y te autoevalúas.
              </div>
            </div>
            <div className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaToken}>body</span>
                <span className={styles.typeMetaSpec}>Sans 400 · 15px · ln 1.55</span>
              </div>
              <div className={`${styles.typeSpecimen} ${styles.specBody}`}>
                El catálogo deriva de NGSL. Filtramos palabras-función vacías de valor
                pedagógico.
              </div>
            </div>
            <div className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaToken}>button</span>
                <span className={styles.typeMetaSpec}>Sans 500 · 14.5px · ls -0.005em</span>
              </div>
              <div className={`${styles.typeSpecimen} ${styles.specButton}`}>
                Continuar Español → Inglés
              </div>
            </div>
            <div className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <span className={styles.typeMetaToken}>eyebrow / mono</span>
                <span className={styles.typeMetaSpec}>Mono 500 · 11px · upper · ls 0.12em</span>
              </div>
              <div className={`${styles.typeSpecimen} ${styles.specEyebrow}`}>
                Aprende vocabulario · derivado de NGSL
              </div>
            </div>
          </div>
        </section>

        {/* 03 ESPACIADO */}
        <section id="espaciado" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>03</span>
            <h2 className={styles.sectionTitle}>Espaciado</h2>
          </div>
          <p className={styles.sectionIntro}>
            Escala 4-pt extendida. Los espacios pequeños son rítmicos; los grandes (12, 16, 24)
            son los que crean el &ldquo;aire editorial&rdquo; característico del rediseño.
          </p>
          <div>
            {SPACES.map((s) => (
              <div key={s.name} className={styles.spaceRow}>
                <span className={styles.spaceMeta}>
                  {s.name} <span className="dim">{s.val}</span>
                </span>
                <div className={styles.spaceBar} style={{ width: `${s.px}px` }} />
              </div>
            ))}
          </div>
        </section>

        {/* 04 RADIOS Y SOMBRAS */}
        <section id="radios" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>04</span>
            <h2 className={styles.sectionTitle}>Radios y sombras</h2>
          </div>
          <p className={styles.sectionIntro}>
            Radios suaves (no agresivos). Los botones y chips usan{" "}
            <span className={styles.mono}>999px</span> (píldora completa); los containers usan{" "}
            <span className={styles.mono}>--radius-md</span> o{" "}
            <span className={styles.mono}>--radius-xl</span>. Sombras casi imperceptibles — la
            jerarquía se hace con tipografía y aire, no con elevación.
          </p>

          <p className={styles.subhead}>Radios</p>
          <div className={styles.shapeGrid}>
            {RADII.map((r) => (
              <div key={r.name} className={styles.shapeCard}>
                <div className={styles.shapeDemo} style={{ borderRadius: r.val }} />
                <div className={styles.shapeName}>{r.name}</div>
                <div className={styles.shapeVal}>{r.use}</div>
              </div>
            ))}
          </div>

          <p className={styles.subhead}>Sombras</p>
          <div className={styles.shapeGrid}>
            {SHADOWS.map((s) => (
              <div key={s.name} className={styles.shapeCard}>
                <div className={styles.shadowDemo} style={{ boxShadow: s.css }} />
                <div className={styles.shapeName}>{s.name}</div>
                <div className={styles.shapeVal}>{s.use}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 05 ICONOGRAFÍA */}
        <section id="iconografia" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>05</span>
            <h2 className={styles.sectionTitle}>Iconografía</h2>
          </div>
          <p className={styles.sectionIntro}>
            <strong>SVG inline</strong> (cumple cruce TEC-OU1 del kickoff). Trazo 1.6,
            lineJoin/lineCap round, herencia de <span className={styles.mono}>currentColor</span>.
            Sin emojis Unicode. Viewbox 0 0 20 20.
          </p>
          <div className={styles.iconGrid}>
            {[
              { El: IconArrow, name: "arrow", use: "Dirección, chips" },
              { El: IconRefresh, name: "refresh", use: "Reiniciar ronda" },
              { El: IconSwap, name: "swap", use: "Cambiar dirección" },
              { El: IconInfo, name: "info", use: "Acerca de" },
              { El: IconCheck, name: "check", use: "Acerté" },
              { El: IconCross, name: "cross", use: "Fallé, cerrar" },
              { El: IconEye, name: "eye", use: "Mostrar traducción, ver resumen" },
              { El: IconPlay, name: "play", use: "Empezar, continuar" },
              { El: IconComplete, name: "complete", use: "Mark de fin de ronda" },
            ].map(({ El, name, use }) => (
              <div key={name} className={styles.iconCard}>
                <span className={styles.iconArt}>
                  <El />
                </span>
                <div className={styles.iconMeta}>
                  <span className={styles.iconName}>{name}</span>
                  <span className={styles.iconUse}>{use}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 BOTONES */}
        <section id="botones" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>06</span>
            <h2 className={styles.sectionTitle}>Botones</h2>
          </div>
          <p className={styles.sectionIntro}>
            Cinco variantes principales. Hovers y active reales — pasa el cursor por encima para
            verlos. Estados <span className={styles.mono}>disabled</span> mantienen layout exacto
            (opacity 0.35).
          </p>

          <div className={styles.demoGrid}>
            <span className={styles.demoLabel}>primary</span>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
              Continuar
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} disabled>
              Continuar
            </button>
          </div>
          <div className={styles.demoGrid}>
            <span className={styles.demoLabel}>ghost</span>
            <button type="button" className={`${styles.btn} ${styles.btnGhost}`}>
              Cancelar
            </button>
            <button type="button" className={`${styles.btn} ${styles.btnGhost}`} disabled>
              Cancelar
            </button>
          </div>
          <div className={styles.demoGrid}>
            <span className={styles.demoLabel}>reveal</span>
            <button type="button" className={`${styles.btn} ${styles.btnReveal}`}>
              <IconEye size={16} />
              Mostrar traducción
              <kbd className={styles.kbd}>espacio</kbd>
            </button>
          </div>
          <div className={styles.demoGrid}>
            <span className={styles.demoLabel}>eval / success</span>
            <button type="button" className={`${styles.btn} ${styles.btnEval} ${styles.btnSuccess}`}>
              <span className={styles.evalIcon}>
                <IconCheck size={14} strokeWidth={1.8} />
              </span>
              Acerté <kbd className={styles.kbd}>→</kbd>
            </button>
          </div>
          <div className={styles.demoGrid}>
            <span className={styles.demoLabel}>eval / danger</span>
            <button type="button" className={`${styles.btn} ${styles.btnEval} ${styles.btnDanger}`}>
              <span className={styles.evalIcon}>
                <IconCross size={14} strokeWidth={1.8} />
              </span>
              Fallé <kbd className={styles.kbd}>←</kbd>
            </button>
          </div>
          <div className={styles.demoGrid}>
            <span className={styles.demoLabel}>danger solid</span>
            <button type="button" className={`${styles.btn} ${styles.btnDanger}`}>
              <IconRefresh size={14} />
              Sí, reiniciar
            </button>
          </div>
          <div className={styles.demoGrid}>
            <span className={styles.demoLabel}>icon-only</span>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnIconOnly}`}
              aria-label="Acerca de"
            >
              <IconInfo size={18} />
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnIconOnly}`}
              aria-label="Reiniciar"
            >
              <IconRefresh size={18} />
            </button>
          </div>
        </section>

        {/* 07 INPUTS */}
        <section id="inputs" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>07</span>
            <h2 className={styles.sectionTitle}>Inputs y forms</h2>
          </div>
          <p className={styles.sectionIntro}>
            El MVP de vocab-1000 <strong>no usa formularios</strong> (sin login, sin búsqueda, sin
            texto libre — toda la entrada es por <span className={styles.mono}>click</span> o
            teclado en botones). Esta sección queda intencionalmente vacía hasta que un proyecto
            del arnés churrerIA necesite estos componentes.
          </p>
          <div className={styles.emptyState}>Sin componentes en este momento.</div>
        </section>

        {/* 08 COMPONENTES */}
        <section id="componentes" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>08</span>
            <h2 className={styles.sectionTitle}>Componentes del producto</h2>
          </div>
          <p className={styles.sectionIntro}>
            Componentes propios de vocab-1000. Las previsualizaciones son HTML real renderizado en
            esta página — los hovers funcionan.
          </p>

          {/* Header */}
          <div className={styles.comp}>
            <div className={styles.compName}>Header</div>
            <div className={`${styles.compFrame} ${styles.compFrameTight}`}>
              <div className={styles.previewHeader}>
                <div className={styles.phBrand}>
                  <span className={styles.phMark}>
                    <IconMenu />
                  </span>
                  vocab<span className={styles.phNum}>·1000</span>
                </div>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnIconOnly}`}
                  aria-label="Acerca de"
                >
                  <IconInfo size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* DirectionCard */}
          <div className={styles.comp}>
            <div className={styles.compName}>DirectionCard · estado activo</div>
            <div className={`${styles.compFrame} ${styles.compFrameCentered}`}>
              <article className={styles.dirCard}>
                <div className={styles.dirPair}>
                  <span className={styles.dirFrom}>ES</span>
                  <span className={styles.dirArrow}>
                    <ArrowLong />
                  </span>
                  <span className={styles.dirTo}>EN</span>
                </div>
                <div className={styles.dirLangs}>Español → Inglés</div>
                <div className={styles.dirStats}>
                  <div>
                    <div className={styles.statNum}>
                      <span>247</span>
                      <span className={styles.statSep}>/</span>
                      <span className={styles.statTot}>1000</span>
                    </div>
                    <div className={styles.statLabel}>acertadas</div>
                  </div>
                  <div>
                    <div className={styles.statNum}>
                      <span>341</span>
                    </div>
                    <div className={styles.statLabel}>turnos</div>
                  </div>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} />
                </div>
                <div className={styles.dirActions}>
                  <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
                    <IconPlay size={14} />
                    Continuar
                  </button>
                  <button type="button" className={`${styles.btn} ${styles.btnGhost}`}>
                    <IconRefresh size={14} />
                    Reiniciar
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* WordDisplay length=1 */}
          <div className={styles.comp}>
            <div className={styles.compName}>WordDisplay · acepciones length=1 (monosémico)</div>
            <div className={styles.compFrame}>
              <div className={styles.wordStage}>
                <div className={styles.promptLabel}>Traduce</div>
                <h3 className={styles.promptWord}>understand</h3>
                <div className={styles.promptRule} />
                <ul className={styles.acepciones}>
                  <li className={styles.acepcion}>entender</li>
                </ul>
                <div className={styles.pos}>
                  <span className={styles.posDot}>·</span>
                  <span className={styles.posAbbr}>v.</span>
                  <span>(verbo)</span>
                </div>
              </div>
            </div>
          </div>

          {/* WordDisplay length=2 */}
          <div className={styles.comp}>
            <div className={styles.compName}>WordDisplay · acepciones length=2 (inline)</div>
            <div className={styles.compFrame}>
              <div className={styles.wordStage}>
                <div className={styles.promptLabel}>Traduce</div>
                <h3 className={styles.promptWord}>bank</h3>
                <div className={styles.promptRule} />
                <ul className={`${styles.acepciones} ${styles.acepcionesTwo}`}>
                  <li className={styles.acepcion}>banco</li>
                  <li className={styles.acepcion}>ribera</li>
                </ul>
                <div className={styles.pos}>
                  <span className={styles.posDot}>·</span>
                  <span className={styles.posAbbr}>sust.</span>
                  <span>(sustantivo)</span>
                </div>
              </div>
            </div>
          </div>

          {/* WordDisplay length=3 */}
          <div className={styles.comp}>
            <div className={styles.compName}>WordDisplay · acepciones length=3 (vertical)</div>
            <div className={styles.compFrame}>
              <div className={styles.wordStage}>
                <div className={styles.promptLabel}>Traduce</div>
                <h3 className={styles.promptWord}>take</h3>
                <div className={styles.promptRule} />
                <ul className={`${styles.acepciones} ${styles.acepcionesThree}`}>
                  <li className={styles.acepcion}>agarrar</li>
                  <li className={styles.acepcion}>tomar</li>
                  <li className={styles.acepcion}>llevar</li>
                </ul>
                <div className={styles.pos}>
                  <span className={styles.posDot}>·</span>
                  <span className={styles.posAbbr}>v.</span>
                  <span>(verbo)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ProgressDual */}
          <div className={styles.comp}>
            <div className={styles.compName}>ProgressDual · chip + carril (Turno header)</div>
            <div className={styles.compFrame}>
              <div className={styles.progressDualRow}>
                <div className={styles.chipPair}>
                  <span className={styles.chipDir}>
                    EN <IconArrow size={10} /> ES
                  </span>
                  <span className={styles.chipCounters}>
                    <span>247</span>
                    <span className="slash">/</span>
                    <span>1000</span>
                    <span className="sep">·</span>
                    <span>341t</span>
                  </span>
                </div>
                <div className={styles.dualRail}>
                  <div className={styles.dualRailFill} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={styles.comp}>
            <div className={styles.compName}>Footer</div>
            <div className={`${styles.compFrame} ${styles.compFrameTight}`}>
              <div className={styles.footerPreview}>
                Vocabulario derivado de NGSL · CC BY-SA 4.0
              </div>
            </div>
          </div>
        </section>

        {/* 09 BANNERS */}
        <section id="banners" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>09</span>
            <h2 className={styles.sectionTitle}>Banners y estados</h2>
          </div>
          <p className={styles.sectionIntro}>
            Mensajes informativos persistentes (no toasts). Diseñados sobrios — bordes laterales
            3px, sin sombra. El <strong>warning</strong> es el que se usa para HU-010
            (memory-only).
          </p>

          <div className={`${styles.banner} ${styles.bannerWarning}`}>
            <IconWarningTri />
            <div>
              Este navegador no guardará tu progreso entre sesiones. Considera usar otro o
              abandonar el modo privado.
            </div>
          </div>
          <div className={`${styles.banner} ${styles.bannerInfo}`}>
            <span className={styles.bannerIcon}>
              <IconInfo size={18} />
            </span>
            <div>Has cambiado de dirección. El progreso de la anterior se conserva.</div>
          </div>
          <div className={`${styles.banner} ${styles.bannerSuccess}`}>
            <span className={styles.bannerIcon}>
              <IconCheck size={18} />
            </span>
            <div>Progreso guardado correctamente.</div>
          </div>
          <div className={`${styles.banner} ${styles.bannerDanger}`}>
            <span className={styles.bannerIcon}>
              <IconCross size={18} />
            </span>
            <div>No se ha podido cargar el catálogo. Recarga la página.</div>
          </div>
        </section>

        {/* 10 LAYOUT */}
        <section id="layout" className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>10</span>
            <h2 className={styles.sectionTitle}>Layout y breakpoints</h2>
          </div>
          <p className={styles.sectionIntro}>
            El rediseño respira mucho más que la versión anterior. Container max{" "}
            <span className={styles.mono}>1100px</span> en desktop, columna única en mobile, todo
            el espacio del Turno está concentrado verticalmente con la palabra en el centro
            óptico.
          </p>

          <p className={styles.subhead}>Breakpoints</p>
          <div className={styles.bpGrid}>
            <div className={styles.bpCard}>
              <div className={styles.bpName}>mobile</div>
              <div className={styles.bpRange}>&lt; 820px</div>
              <div className={styles.bpDesc}>
                DirectionCards apilan en una sola columna. Botones full-width. Stage del Turno con
                menor padding. Hero font-size baja a ~48px.
              </div>
            </div>
            <div className={styles.bpCard}>
              <div className={styles.bpName}>tablet/laptop</div>
              <div className={styles.bpRange}>820 – 1100px</div>
              <div className={styles.bpDesc}>
                DirectionCards en dos columnas. Stage centrado. Botones de evaluación lado a
                lado.
              </div>
            </div>
            <div className={styles.bpCard}>
              <div className={styles.bpName}>desktop</div>
              <div className={styles.bpRange}>&gt; 1100px</div>
              <div className={styles.bpDesc}>
                Container fijo de 1100px centrado. El aire alrededor refuerza el efecto editorial.
              </div>
            </div>
          </div>

          <p className={styles.subhead}>Containers</p>
          <ul className={styles.containersList}>
            <li>
              <span className={styles.mono}>.main</span> · max-width 1100px, padding lateral
              32–64px según breakpoint.
            </li>
            <li>
              <span className={styles.mono}>.home-hero</span> · max-width 820px, alineado a
              flex-start (no centrado).
            </li>
            <li>
              <span className={styles.mono}>.turno</span> · max-width 880px, centrado.
            </li>
            <li>
              <span className={styles.mono}>.fin</span> · max-width 720px, centrado, texto
              centrado.
            </li>
            <li>
              <span className={styles.mono}>.modal</span> · max-width 480px.
            </li>
          </ul>
        </section>

        <p className={styles.docFooter}>
          vocab·1000 · sistema de diseño v2 · rediseño editorial · 2026-05-26
        </p>
      </main>
    </div>
  );
}
