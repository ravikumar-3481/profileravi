<div align="center">

<p align="center">
  <img src="public/readme/banner.svg" alt="Ravi Kumar Vishwakarma Portfolio Banner" width="100%" />
</p>

# ✦ Intelligent Systems & Editorial Web Engineering ✦

<p align="center">
  <strong>A modern, motion-first personal portfolio web application built with React 19, TanStack Start &amp; Router, Framer Motion, and Tailwind CSS.</strong>
</p>

<p align="center">
  <a href="https://profileravi.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Production-profileravi.vercel.app-7c8f45?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Production URL" />
  </a>
  <a href="https://github.com/ravikumar3481/profileravi">
    <img src="https://img.shields.io/badge/Test%20Suite-100%25%20Passing-brightgreen?style=for-the-badge&logo=vitest&logoColor=white" alt="Test Status" />
  </a>
  <a href="#-license">
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript_5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TanStack_Router_v1-FF4154?style=flat-square&logo=reacttable&logoColor=white" alt="TanStack Router" />
  <img src="https://img.shields.io/badge/Framer_Motion_v14-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white" alt="Radix UI" />
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node Version" />
</p>

<br />

<!-- Animated Motion Graphic SVG Showcase -->
<p align="center">
  <img src="public/readme/motion-graphic.svg" alt="Reactive Motion Graphic" width="100%" />
</p>

</div>

---

## ✦ System Architecture & Topologies

<div align="center">
  <img src="public/readme/architecture.svg" alt="Portfolio Architecture Stack" width="100%" />
</div>

<br />

The application is engineered as a high-performance Single Page Application leveraging **TanStack Router / TanStack Start** for file-based type-safe routing, client-side caching, and dynamic metadata injection.

```mermaid
flowchart LR
    subgraph Client ["Client Browser"]
        KB[Keyboard Listener<br/>Shortcuts &amp; Skip Link]
        UI[User Interaction<br/>Tabs, Modals, Forms]
    end

    subgraph RouterCore ["TanStack Router Core"]
        RL[File Routes: /about, /projects, /skills...]
        SEO[Dynamic SEO &amp; JSON-LD Meta]
        Shell[SiteShell Layout &amp; Pill Nav]
    end

    subgraph MotionLayer ["Motion &amp; Interaction"]
        AP[AnimatePresence Page Transitions]
        VR[ViewportReveal Observers]
        AC[Animated Tabular Counters]
    end

    subgraph Security ["Security &amp; Privacy"]
        RLimiter[Local Rate Limiter]
        HP[Honeypot Shield]
        Cookie[Cookie Preferences]
    end

    Client --> RouterCore
    RouterCore --> MotionLayer
    Client --> Security
```

---

## ✦ Execution Flowcharts

### 1. Client Action & Viewport Lifecycle Flowchart

<div align="center">
  <img src="public/readme/runtime-flowchart.svg" alt="Execution Runtime Flowchart" width="100%" />
</div>

<br />

### 2. Keyboard Navigation Event Loop Flowchart

```mermaid
flowchart TD
    A([User Presses Key]) --> B{Is Target Element an Input?}
    B -- Yes: input, textarea, select, contenteditable --> C[Ignore &amp; Allow Normal Typing]
    B -- No --> D{Modifier Keys Pressed?}

    D -- Ctrl / Cmd + K --> E[Open Keyboard Shortcuts Dialog]
    D -- Other Modifier: Alt / Shift combos --> F[Default Browser Action]
    D -- No Modifiers --> G{Match Single-Key Shortcut}

    G -- H or 1 --> H1[Navigate / Home]
    G -- A or 2 --> H2[Navigate /about]
    G -- P or 3 --> H3[Navigate /projects Archive]
    G -- J or 4 --> H4[Navigate /experience Journey]
    G -- S or 5 --> H5[Navigate /skills]
    G -- W or 6 --> H6[Navigate /blog Writing]
    G -- C or 7 --> H7[Navigate /contact]
    G -- T --> H8[Toggle Dark / Light Theme]
    G -- R --> H9[Open Resume Preview Modal]
    G -- ? --> H10[Toggle Shortcuts Dialog]
    G -- Esc --> H11[Close Active Modal / Drawer]
    G -- Unmatched Key --> H12[No-op]
```

<br />

### 3. Contact Form Security & Anti-Spam Pipeline Flowchart

```mermaid
flowchart TD
    S([User Submits Contact Form]) --> H{Honeypot Field Filled?}
    H -- Yes: Bot Detected --> H_Silent[Fake Success Feedback &amp; Reset Form]
    H -- No: Legitimate Human --> R{Check Rate Limit State}

    R -- Blocked Until > Now --> BL[Trigger Rate Limit Error Banner &amp; Start Timer]
    R -- Recent Submissions >= 3 in 10m --> BL2[Set 10m Cooldown &amp; Block Further Submissions]
    R -- Allowed Within Limit --> SEND[Set Status: Sending]

    SEND --> POST[Fetch Formspree POST JSON Payload]
    POST --> RES{HTTP 200 OK?}
    RES -- Yes --> SC[Record Timestamp &amp; Set 60s Local Cooldown]
    SC --> SUCC[Show Accessible Success Banner &amp; Reset Fields]
    RES -- No / Error --> ERR[Display Error Feedback &amp; Allow Email Direct Fallback]
```

---

## ✦ Core Feature Highlights

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>⚡ Motion-First Interaction Engine</h3>
      <ul>
        <li><b>Dynamic Viewport Reveals:</b> Re-triggering scroll reveal animations using Framer Motion with custom thresholds.</li>
        <li><b>Tabular Animated Counters:</b> Numeric count-up animations for key statistics using requestAnimationFrame and cubic bezier easing.</li>
        <li><b>Seamless Route Transitions:</b> Coordinated page entrance and exit transitions with zero layout shift.</li>
        <li><b>Ambient SVG Physics:</b> Generative topographic contours and linework with pulse frequencies.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>⌨️ Deep Keyboard Accessibility</h3>
      <ul>
        <li><b>Global Shortcuts:</b> Single-key jumps (<kbd>H</kbd>, <kbd>A</kbd>, <kbd>P</kbd>, <kbd>J</kbd>, <kbd>S</kbd>, <kbd>W</kbd>, <kbd>C</kbd>) plus theme (<kbd>T</kbd>) and resume (<kbd>R</kbd>).</li>
        <li><b>Accessible Skip Link:</b> Instantly focusable on initial <kbd>Tab</kbd> press to bypass navigation header.</li>
        <li><b>Arrow-Key Navigation:</b> Cycle navigation pills, project category filter tabs, and image sliders.</li>
        <li><b>Smart Input Shielding:</b> Automatically silences shortcuts when typing in form fields or editable areas.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🎨 Bespoke Editorial Design System</h3>
      <ul>
        <li><b>OKLCH Color Palette:</b> Tailored high-gamut color spaces with adaptive dark and light mode tokens.</li>
        <li><b>Borderless Modern Surfaces:</b> Elevation and depth conveyed via glassmorphism and soft ambient borders.</li>
        <li><b>Hidden Global Scrollbars:</b> Native scroll physics preserved while hiding distracting default scrollbars.</li>
        <li><b>Fluid Typography:</b> Scaled typography with custom Google serif and sans-serif pairings.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🛡️ Privacy, Security &amp; Anti-Spam</h3>
      <ul>
        <li><b>Client-Side Rate Limiter:</b> Local cooldown enforcement with countdown timers preventing automated spam.</li>
        <li><b>Invisible Honeypot:</b> Bot detection trap field filtering spam bots silently.</li>
        <li><b>Granular Cookie Banner:</b> GDPR-compliant consent manager with customizable preference categories.</li>
        <li><b>SEO &amp; JSON-LD:</b> Search engine indexing with semantic schemas for Person and WebSite.</li>
      </ul>
    </td>
  </tr>
</table>

---

## ✦ Reusable SVG & Badge Components Library

The application features a dedicated, modular React SVG component suite located in `src/components/svg/`:

<table width="100%">
  <tr>
    <td width="33%" valign="top">
      <h4>🛠️ Tech Stack SVG Icons</h4>
      <code>src/components/svg/tech-icons.jsx</code>
      <ul>
        <li><code>&lt;ReactIcon /&gt;</code></li>
        <li><code>&lt;TypeScriptIcon /&gt;</code></li>
        <li><code>&lt;PythonIcon /&gt;</code></li>
        <li><code>&lt;PyTorchIcon /&gt;</code></li>
        <li><code>&lt;TanStackIcon /&gt;</code></li>
        <li><code>&lt;TailwindIcon /&gt;</code></li>
        <li><code>&lt;ViteIcon /&gt;</code></li>
        <li><code>&lt;DockerIcon /&gt;</code></li>
        <li><code>&lt;FastApiIcon /&gt;</code></li>
        <li><code>&lt;PostgreSQLIcon /&gt;</code></li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h4>🏷️ Visual Badges</h4>
      <code>src/components/svg/visual-badges.jsx</code>
      <ul>
        <li><code>&lt;LivePulseBadge /&gt;</code><br/>Animated live pulse status indicator</li>
        <li><code>&lt;VerifiedBadge /&gt;</code><br/>Verification checkmark emblem</li>
        <li><code>&lt;EditorialPillBadge /&gt;</code><br/>Icon pill badge with counters</li>
        <li><code>&lt;CodeMetricBadge /&gt;</code><br/>Monospace numeric stat card</li>
        <li><code>&lt;KeyboardKeyBadge /&gt;</code><br/>Accessible styled key badge</li>
      </ul>
    </td>
    <td width="34%" valign="top">
      <h4>🌊 Ambient Visuals</h4>
      <code>src/components/svg/ambient-visuals.jsx</code>
      <ul>
        <li><code>&lt;ContourGraphic /&gt;</code><br/>Topographic vector contours</li>
        <li><code>&lt;SignalWaveform /&gt;</code><br/>Harmonic waveform bars</li>
        <li><code>&lt;GeometricMatrix /&gt;</code><br/>Developer grid dot matrix</li>
        <li><code>&lt;AbstractSparkle /&gt;</code><br/>Geometric 4-point accent star</li>
      </ul>
    </td>
  </tr>
</table>

```javascript
// Clean barrel import example
import { ReactIcon, LivePulseBadge, ContourGraphic } from "@/components/svg";
```

---

## ✦ Complete Keyboard Shortcuts Matrix

| Key / Combination                              | Scope                 | Description                                                    |
| ---------------------------------------------- | --------------------- | -------------------------------------------------------------- |
| <kbd>H</kbd> / <kbd>1</kbd>                    | Global                | Navigate to Home (`/`)                                         |
| <kbd>A</kbd> / <kbd>2</kbd>                    | Global                | Navigate to About (`/about`)                                   |
| <kbd>P</kbd> / <kbd>3</kbd>                    | Global                | Navigate to Projects Archive (`/projects`)                     |
| <kbd>J</kbd> / <kbd>4</kbd>                    | Global                | Navigate to Journey &amp; Education (`/experience`)            |
| <kbd>S</kbd> / <kbd>5</kbd>                    | Global                | Navigate to Skills &amp; Toolbox (`/skills`)                   |
| <kbd>W</kbd> / <kbd>6</kbd>                    | Global                | Navigate to Writing &amp; Blog (`/blog`)                       |
| <kbd>C</kbd> / <kbd>7</kbd>                    | Global                | Navigate to Contact (`/contact`)                               |
| <kbd>T</kbd>                                   | Global                | Toggle Dark / Light Theme                                      |
| <kbd>R</kbd>                                   | Global                | Open Interactive Resume Modal                                  |
| <kbd>?</kbd> or <kbd>Ctrl</kbd> + <kbd>K</kbd> | Global                | Open Keyboard Navigation Guide dialog                          |
| <kbd>←</kbd> / <kbd>→</kbd>                    | Navigation &amp; Tabs | Cycle header navigation links, filter tabs, or gallery slides  |
| <kbd>Z</kbd>                                   | Image Viewer          | Toggle high-resolution zoom                                    |
| <kbd>Home</kbd> / <kbd>End</kbd>               | Image Viewer          | Jump to the first or last gallery screenshot                   |
| <kbd>Esc</kbd>                                 | Modals                | Close active dialog, image viewer, or mobile navigation drawer |
| <kbd>Tab</kbd>                                 | Accessibility         | Move focus to next element (Triggers Skip Link on first press) |

---

## ✦ Project Directory Layout

```text
├── public/                 # Static assets, sitemap.xml, robots.txt
│   └── readme/             # Visual banners, flowcharts & motion graphics
│       ├── banner.svg      # Hero branding SVG
│       ├── motion-graphic.svg # Animated keyframe motion graphic
│       ├── architecture.svg# Layered stack diagram
│       └── runtime-flowchart.svg # Client execution flowchart
├── src/
│   ├── components/
│   │   ├── animated-counter.jsx    # Viewport-triggered numeric counter
│   │   ├── cookie-consent.jsx      # Privacy cookie banner & preferences
│   │   ├── extras.jsx              # Sliders, GitHub widgets, modals, timelines
│   │   ├── keyboard-shortcuts.jsx  # Keyboard hook & shortcuts dialog
│   │   ├── portrait-hero.jsx       # Hero linework & visual presentation
│   │   ├── portfolio.jsx           # Core page sections, shells & layouts
│   │   ├── svg/                    # Reusable React SVG components & badges
│   │   │   ├── tech-icons.jsx      # Tech stack logos & icons
│   │   │   ├── visual-badges.jsx   # Live pulse, verified, key badges
│   │   │   ├── ambient-visuals.jsx # Contours, waveforms, geometric grids
│   │   │   └── index.js            # Unified barrel export
│   │   ├── ui/                     # Radix-based UI primitives (dialog, button, etc.)
│   │   └── viewport-reveal.jsx     # Framer motion scroll reveal wrapper
│   ├── data/
│   │   ├── portfolio.js            # Profile configuration, SEO helpers
│   │   └── *.json                  # Experience, education, skills, articles
│   ├── routes/                     # TanStack Router file-based route definitions
│   │   ├── __root.tsx              # Root layout, meta, canonical & JSON-LD
│   │   ├── index.tsx               # Home route
│   │   ├── about.tsx               # About route
│   │   ├── projects.index.tsx      # Projects archive route
│   │   ├── projects.$slug.tsx      # Project detail dynamic route
│   │   ├── experience.tsx          # Experience & education route
│   │   ├── skills.tsx              # Skills & tools route
│   │   ├── blog.tsx                # Writing & articles route
│   │   ├── contact.tsx             # Contact route
│   │   └── ...                     # Additional routes & legal views
│   ├── test/                       # Vitest route & component tests
│   ├── main.tsx                    # Application entry point
│   └── styles.css                  # Core design tokens, global themes & layout rules
├── package.json                    # Dependencies and npm scripts
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build configuration & plugins
```

---

## ✦ Getting Started Locally

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ravikumar3481/profileravi.git
   cd profileravi
   ```

2. **Install project dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## ✦ Development Scripts

| Command              | Purpose                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| `npm run dev`        | Starts the Vite development server on `localhost:8080`.                 |
| `npm run build`      | Compiles TypeScript and creates optimized production bundle in `dist/`. |
| `npm run preview`    | Serves the production build locally for verification.                   |
| `npm run test`       | Executes the Vitest test suite once.                                    |
| `npm run test:watch` | Runs Vitest in interactive watch mode for TDD.                          |
| `npm run lint`       | Runs ESLint across all TypeScript and React files.                      |
| `npm run format`     | Enforces code formatting via Prettier.                                  |

---

## ✦ Production Deployment

The portfolio is continuously deployed to **Vercel** with zero-configuration build pipelines:

```text
git push origin main ──> Vercel CI ──> Vite Production Build ──> Edge CDN Deployment
```

1. Connect the repository in the Vercel Dashboard.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Automatic preview and production deployments are generated per commit.

---

## ✦ Author & Connect

**Ravi Kumar Vishwakarma**  
AI Engineer &amp; Data Scientist

<p>
  <a href="https://profileravi.vercel.app">
    <img src="https://img.shields.io/badge/Website-profileravi.vercel.app-7c8f45?style=flat-square&logo=googlechrome&logoColor=white" alt="Website" />
  </a>
  <a href="https://www.linkedin.com/in/ravikumar3481/">
    <img src="https://img.shields.io/badge/LinkedIn-Ravi_Kumar_Vishwakarma-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/ravikumar3481">
    <img src="https://img.shields.io/badge/GitHub-@ravikumar3481-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="mailto:ravikumar34810@gmail.com">
    <img src="https://img.shields.io/badge/Email-ravikumar34810@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

---

<div id="-license"></div>

## ✦ License

This project is licensed under the [MIT License](LICENSE).
