# Bug Report & Optimization Spec — profileravi Portfolio
**Repository:** https://github.com/ravikumar-3481/profileravi  
**Live site:** https://profileravi.netlify.app/  
**Stack:** React 19 + Vite 8 + Framer Motion 12 + pure CSS  
**Date:** 2026-09-22  
**Goal for Antigravity:** Fix all listed bugs, modernize Hero section (especially mobile breakpoints), clean dead CSS, and improve overall visual polish so the site stands out in 2025–2026.

---

## 1. Critical / High Priority Bugs

### BUG-01 — Dead legacy CSS conflicts with modern Hero (High)
**File:** `src/styles/style1.css` (approx. lines 1820–2105)

**Problem:** Large blocks of obsolete media-query CSS still target classes that no longer exist in the JSX:
- `.left1`, `.right1`
- `.btn-container`
- `.role`
- `.name span`, `.bra`, `.intro`
- Old `.hero-title` width / flex rules
- Duplicate rules that force `.lastname { display: none }` on small screens

These rules override or fight the modern `.hero-container` / `.hero-content` / `.hero-title` styles and produce inconsistent mobile layout.

**Fix:**
1. Delete or comment-out every rule that references `.left1`, `.right1`, `.btn-container`, `.role`, `.name`, `.bra`, `.intro`.
2. Remove the rule that hides `.lastname` on `max-width: 480px`.
3. Keep only the modern Hero rules that start around line 849 (`.hero { ... }`).

### BUG-02 — Last name hidden on mobile (High)
**File:** `src/styles/style1.css`

**Current (bad):**
```css
@media (max-width: 480px) {
  .lastname {
    display: none;
  }
}
```

**Required:** Always show full name “Ravi Vishwakarma” on every breakpoint. Adjust line-height / clamp size if needed so it still fits.

### BUG-03 — Inconsistent email addresses (Medium-High)
**Locations:**
- `src/components/Hero.jsx` → `mailto:ravivish517+portfolio@gmail.com`
- `src/components/Contact.jsx` → `ravivish968@gmail.com`
- `index.html` schema → `ravivish968@gmail.com`

**Fix:** Standardize on one primary email everywhere (recommend `ravivish968@gmail.com` unless the +portfolio alias is intentional). Update Hero CTA, Contact, schema, and any other occurrences.

### BUG-04 — Broken Twitter / Open Graph image path (Medium)
**File:** `index.html`

```html
<meta property="twitter:image" content="/assets/public/og.webp">
```

This path does not exist.  
**Fix:** Point to an existing file, e.g. `/og/img.webp` or `/og/file_000000007d9871fa94e4f30440d3bc3e.webp`.

### BUG-05 — Schema.org project URLs point to wrong domain (Medium)
**File:** `index.html` (JSON-LD)

Project URLs use `https://profileravi.vercel.app/...` while the live site is on Netlify.  
**Fix:** Change all schema project URLs to `https://profileravi.netlify.app/...` (or the canonical domain you want).

---

## 2. Hero Section — Mobile Breakpoints & Modernization

### Current breakpoints (inconsistent)
- 480 px, 769 px, 992 px, 1200 px mixed with legacy rules.

### Required modern breakpoint system
Use these consistently for the Hero (and preferably the whole site):

| Breakpoint | Target | Hero layout |
|------------|--------|-------------|
| ≤ 480 px | Small phones | Column, centered, smaller profile, full-width CTAs stacked |
| 481–767 px | Large phones | Same as above, slightly larger type |
| 768–991 px | Tablets | Still stacked or soft two-column if space allows |
| ≥ 992 px | Desktop | Row (text left, visual right) – keep current |

### Specific Hero improvements to implement

1. **Profile image size on mobile**
   ```css
   .image-wrapper {
     width: clamp(180px, 55vw, 260px);
     height: clamp(180px, 55vw, 260px);
   }
   /* desktop keeps clamp(250px, 40vw, 400px) */
   ```

2. **Keep full name visible**
   - Never hide `.lastname`.
   - Use tighter `line-height: 1.05–1.15` and `clamp(2.1rem, 8vw, 4.5rem)` for the title.

3. **CTA group on mobile**
   ```css
   @media (max-width: 480px) {
     .hero-cta-group {
       flex-direction: column;
       width: 100%;
       gap: 0.9rem;
     }
     .cta-primary,
     .cta-secondary {
       width: 100%;
       justify-content: center;
     }
   }
   ```

4. **Floating icons**
   - Reduce size on mobile (`width/height: 38–42px`).
   - Move icons closer to the circle so they never clip the viewport edges (`left/right` percentages currently go to –15 %).
   - Only keep the 5 icons that are actually rendered in `Hero.jsx` (remove unused `.icon-2`, `.icon-3`, `.icon-5` CSS if desired).

5. **Typing effect stability**
   - Give `.hero-subtitle` a fixed `min-height` (e.g. `2.2em`) so the layout does not jump while text is typed/erased.

6. **Status badge polish**
   - Keep the green pulse animation.
   - Slightly increase horizontal padding on mobile so the text doesn’t feel cramped.

7. **Modern visual upgrades (2025–2026)**
   - Soft outer glow / glass ring on the profile image.
   - Subtle shimmer or gradient-border animation on `.cta-primary` on hover.
   - Optional very light CSS-only mesh or radial gradient behind the grid (keep performance high – no heavy canvas).
   - Ensure focus-visible styles on all interactive elements.

---

## 3. Medium / Low Priority Bugs & Cleanup

### BUG-06 — Global `user-select: none` (Medium)
**File:** `src/App.css`

```css
body {
  user-select: none;
}
```

Hurts accessibility (users cannot select email or text).  
**Fix:** Remove it or limit to decorative elements only.

### BUG-07 — Floating icon overflow risk (Medium)
Some positions use `left: -15%` / `right: -15%`. On narrow screens icons can be partially cut off.  
**Fix:** Clamp positions or switch to safer values on `max-width: 767px`.

### BUG-08 — Navbar “Blog” uses `alert()` (Low)
**File:** `src/components/Navbar.jsx`

Replace `alert('Blog coming soon!')` with a small toast, modal, or simply hide the link until the blog exists.

### BUG-09 — Contact form subject options (Low)
**File:** `src/components/Contact.jsx`

Options:
- “work with us”
- “for hire me”

**Fix:** Capitalize properly → “Work With Us”, “Hire Me”, etc.

### BUG-10 — CSS file order & duplication (Low)
**File:** `src/main.jsx`

```js
import './styles/style2.css'
import './styles/style1.css'
```

`style1.css` is very large and contains many overlapping media queries. After removing dead legacy code, consider consolidating shared variables (colors, radii, spacing) into CSS custom properties at the top of one file.

### BUG-11 — Resume popup UX (Low)
**File:** `src/components/ResumePopup.jsx`

- Currently shows a JPG of the resume.
- Download points to Google Drive.

**Suggestion:** Prefer a direct PDF download or embed a PDF viewer if possible. Keep the Drive link as fallback.

---

## 4. Acceptance Criteria (for Antigravity)

After the changes the following must be true:

- [ ] Full name “Ravi Vishwakarma” is visible on every screen size.
- [ ] No references to `.left1`, `.right1`, `.btn-container`, `.role`, `.bra`, `.intro` remain in CSS.
- [ ] Hero layout is clean and balanced on 375 px, 390 px, 414 px, 768 px, and 1440 px viewports.
- [ ] Both CTAs are fully usable and well-spaced on mobile (stacked full-width ≤480 px).
- [ ] Floating icons never clip the viewport edges.
- [ ] Email address is consistent across Hero, Contact, and schema.
- [ ] Twitter/OG image meta tags point to existing files.
- [ ] Schema project URLs use the correct domain.
- [ ] No layout shift from the typing animation.
- [ ] `user-select` is not globally disabled.
- [ ] Site still builds cleanly with `npm run build` and looks polished on the live Netlify/Vercel deployment.

---

## 5. Suggested Implementation Order

1. Clean dead CSS in `style1.css` (BUG-01, BUG-02).
2. Fix Hero mobile sizes, CTAs, floating icons, and min-height for typing (section 2).
3. Fix email, OG image, and schema (BUG-03, 04, 05).
4. Remove `user-select: none` and polish small UX items (BUG-06–11).
5. Visual polish (glow, CTA shimmer, status pulse) once layout is solid.
6. Test on real devices / Chrome DevTools device mode at the breakpoints listed above.

---

**End of report.**  
Hand this file to Antigravity so it can systematically fix bugs and optimize the overall look of the website, with special focus on the Hero section and mobile breakpoints.