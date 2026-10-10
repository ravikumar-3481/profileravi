<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep portfolio presentation in JavaScript React modules and route definitions in TanStack TypeScript files to honor the JavaScript UI preference while preserving typed routing.
- Keep portfolio content in local data modules sourced from the original repository; never fetch or seed content on page load.
- Use separate content routes and per-route metadata for shareable sections so navigation and search indexing remain reliable.
- Serve imported original media through asset pointers and explicitly label unavailable original images instead of inventing replacements.
- Preserve the original Formspree contact endpoint and report real success or failure; no new backend is needed for the existing public form.
- Share viewport-entry motion through a browser-safe JavaScript wrapper so reveal and pop timing stay consistent and respect reduced motion.
- Derive the SVG favicon from the portfolio wordmark and keep its root head reference synchronized to avoid stale branding.
- Keep the portrait-led hero in a dedicated JavaScript module; use spring-driven pointer transforms and SVG contour motion gated by viewport visibility and reduced-motion preferences to isolate interaction from content sections.
