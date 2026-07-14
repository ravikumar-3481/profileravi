# Rebuild Prompt: Activities & Testimonials Sections

## 0. Context for the builder
- Stack: React 19 + Vite + Framer Motion 12 (already installed — no new dependencies needed)
- Files affected: `src/components/Activities.jsx`, `src/components/Testimonials.jsx`, and the related blocks in `src/styles/style2.css` (`.activity-card`, `.t-card`, `.testimonials-marquee-*`)
- Data sources stay unchanged:
  - `/assets/data/activities.json` — only the `title` field is rendered going forward; other fields (`icon`, `institute`, `description`, `duration`) can remain in the JSON, just aren't displayed
  - Google Sheet testimonial feed — `name`, `role`, `institute`, `rating`, `feedback` unchanged

---

## 1. Why the current sections feel generic (diagnosis)

Both `.activity-card` and `.t-card` follow the identical formula:

> black background → 1px `rgba(145,36,255,x)` border → border-radius → padding → hover `translateY` → box-shadow glow

This exact combination (dark card / purple border / lift-on-hover / glow-on-hover) is one of the most reused patterns in AI-generated portfolio templates. That repetition — not the color itself — is what reads as generic.

Two more specific problems:
- **Activities** cram four data points (icon, institute, title, description, duration) into a boxed card, when the actual intent is just the name.
- **Testimonials** use a fixed-size card with a hard `substring(0, 130)` cut plus a "Read More" modal — a workaround for a layout that can't handle variable-length content, not an actual fix.
- Motion in both is limited to a single spring fade-up on scroll. No depth, no physics-driven interaction, no 3D.

---

## 2. Activities section — rebuild brief

### Remove entirely
- The `.activity-card` box: no background fill, no border, no border-radius, no box-shadow, no hover lift/glow.
- Icon, institute label, description paragraph, duration row — all gone from the rendered UI.

### New concept: kinetic typography field
Replace the card grid with a **typography-led layout** — the activity names *are* the visual content, not text inside a container.

Pick one approach, or blend:

- **Staggered 3D name list**: each activity name renders as a large heading (`clamp(1.4rem, 3vw, 2.2rem)`), full width, separated by a thin 1px hairline rule (not a border-box — just a horizontal divider). On scroll into view, animate each name in with `rotateX` from ~40° → 0° combined with a Y-translate and opacity fade:
  ```
  initial={{ opacity: 0, y: 24, rotateX: 40 }}
  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
  viewport={{ once: false, amount: 0.6 }}
  transition={{ type: "spring", stiffness: 120, damping: 18 }}
  ```
  Stagger via the parent with `staggerChildren: 0.08`, and set `style={{ transformPerspective: 800 }}` on the parent so the rotation reads as genuine 3D depth, not a 2D slide.

- **Scroll-linked parallax depth**: use `useScroll({ target: sectionRef, offset: ["start end", "end start"] })` + `useTransform` to map scroll progress to subtle per-item scale/opacity/translate differences, so names drift past at slightly different depths — a lightweight illusion of 3D without a WebGL layer.

- **Idle micro-motion instead of hover**: since hover is off the table, give each name a slow continuous breathing motion (`animate={{ opacity: [0.85, 1, 0.85] }}`, 4–6s loop, staggered delay per item) so the section feels alive at rest — this replaces the payoff hover used to provide, and works on touch devices too.

- **Optional accent**: a thin underline that draws itself (`scaleX` 0 → 1) beneath each name on reveal, using the existing accent (`#9124ff`) sparingly — one line, never a background or border.

### Layout
Single column on mobile; can break into two columns on desktop via flex-wrap or CSS columns for rhythm — but no card boundary anywhere. Generous vertical whitespace (≥1.5rem between items) does the separating work borders used to do.

### Explicitly avoid
- Any purple-bordered rounded rectangle.
- Box-shadow "glow" on hover or on scroll reveal.
- Icons as decoration — they're not needed since only the name matters now.

---

## 3. Testimonials section — rebuild brief

### Fix the root cause of overflow first
- Drop the fixed `height: 285px`. Use `min-height` instead, let the card grow with content up to a max, then apply:
  ```css
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  ```
  on the feedback paragraph. This clips with a soft fade instead of an abrupt cut mid-sentence, and guarantees text can never spill outside the card regardless of length.
- Keep `flex-direction: column; justify-content: space-between;` plus `overflow: hidden` on the outer card as a hard safety net — belt and braces, not the primary fix.
- Remove the manual `substring(0, 130)` JS truncation entirely. Let CSS line-clamp handle it — it adapts automatically to different font sizes and screen widths, which the JS version can't.
- **Stress-test with the longest real feedback string in the sheet**, not just the average one, before calling this done.

### New concept: 3D coverflow / depth carousel
Replace the flat horizontal marquee with a genuine perspective carousel:

- Wrap the track in a container with `perspective: 1200px`.
- Map horizontal position to `rotateY`, `scale`, and `opacity` per card via `useTransform` (driven by `useScroll` or a `drag="x"` motion value with `dragConstraints`), so the centered testimonial sits flat at full scale while side cards tilt away in 3D and recede/shrink slightly.
- Drive continuous auto-advance with an `animate` + `transition={{ repeat: Infinity, ease: "linear" }}` motion value rather than a CSS `@keyframes` marquee, so pausing/resuming (e.g. on user interaction) is a smooth `useAnimationControls` call instead of toggling a `.paused` class.
- Star ratings: stagger a quick `scale`/`opacity` pop-in per star (`staggerChildren: 0.05` across the 5) instead of rendering statically.
- Quote mark: animate a soft fade + scale in as a low-opacity background watermark — not a decorative sticker fixed in a corner.

### Remove entirely
- The `rgba(145,36,255,0.2)` border + hover `translateY(-5px)` + box-shadow glow combo on `.t-card`.
- Fixed pixel width/height — replace with responsive `clamp()`-based sizing.
- The "Read More" modal, if the line-clamp + fade approach makes it unnecessary for realistic content lengths — cleaner without it. Keep only if genuinely needed for outlier-length reviews.

### Explicitly avoid
- Purple-glow box-shadow on hover.
- A static flat 2D marquee as the *only* motion.
- Any container where text can silently overflow — verify, don't assume.

---

## 4. Cross-cutting "elite, not generic" checklist

- [ ] No repeated "dark card + 1px purple border + border-radius + hover lift + box-shadow glow" formula anywhere in either section.
- [ ] Motion has real depth (3D transforms, perspective, scroll-linked z-depth) — not just fade + translateY.
- [ ] Nothing depends on `:hover` to look finished — most visitors are on mobile/touch with no hover state at all.
- [ ] Typography carries the visual weight in Activities — the name *is* the design, not text inside a box.
- [ ] Every text container has been stress-tested with unusually long content and doesn't overflow, clip abruptly, or break the grid.
- [ ] `prefers-reduced-motion` is respected — fancier animations fall back to a simple opacity fade for users who've requested it.
- [ ] The existing accent color (`#9124ff`) is used sparingly as a signature touch, not as a border on every element.

---

## 5. Deliverable expectations
- Updated `Activities.jsx` (renders `title` only, new motion structure) and updated styles — old `.activity-card` rules removed, not left dead in the CSS.
- Updated `Testimonials.jsx` (coverflow/carousel structure, line-clamp overflow fix) and updated styles.
- Both sections work with the existing JSON/Sheet data shape unchanged — no backend or data-format changes required.
- Explicitly test at 375px mobile width, since the current marquee/card sizing was tuned for desktop.
