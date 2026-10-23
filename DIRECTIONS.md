# Home page header + tabs: five directions

Run `npm run dev` and open `/explore`. Each direction is at `/explore/a` … `/explore/e`. The pill in the bottom-left switches between them and cycles System / Light / Dark. **Replay intro** reruns the sequence. With reduced motion on, each page opens on the final state and Replay plays the cross-fade version.

Shared across all five (in `src/app/explore/_kit/`):
- **One content file:** `src/app/explore/_data/content.ts`. Only the two case studies are real. Every sample shows a dashed "Sample" tag, the DCA image is tagged "Placeholder media", and the contact email is `links.email` (`[YOUR EMAIL]`), tagged "Placeholder".
- **One card family:** `cards.tsx`, the same components in the noise (compact) and in the tabs (full). Each direction restyles it completely.
- **`HeroLoop`:** fixed 2:1 window on the painted scene, with `final-still` as the poster. It uses hard cuts only (the `header-sequence.json` flip-book), loops with a 5.2s hold, and has a pause button (WCAG 2.2.2). The crop and the paintings are exported by `scripts/export-hero-loop.mjs` to `public/explore/loop/` as AVIF/WebP at 640w and 1280w (`srcset` for 2× screens). Source PNGs are untouched. On a 2× screen it loads about 275 KB as AVIF or about 455 KB as WebP, both under the 600 KB budget. I built it as a sprite flip-book rather than a `<video>`: there is no encoder on this machine, and the flip-book keeps the hard cuts exact.
- **No layout shift:** the noise is an absolutely positioned layer over a page that already has its final layout. Measured CLS is ≤ 0.045 at every size; E is highest, from its display font swapping in.
- **Tabs:** a real tablist (Left/Right wrap, Home/End, roving tabindex) with a Framer `layoutId` indicator that slides. It cross-fades under reduced motion.
- **Deep links:** a URL hash (`#work`) opens on the final state.

**Missing docs.** `claude/home-page-brief.md`, *Tokens and value*, `claude/motion-measurements.md` and `claude/header-kit-qa.md` aren't in the repo. As agreed, the code stood in for them: `tailwind.config.js`, `src/lib/motion.ts`, `header-sequence.json` and `HeaderScene.tsx`. Anything from those docs that the code doesn't carry (the contrast table, the exact budget rules) was inferred. Check it against the docs when you find them.

---

## A · House Style (baseline)
- **Why it suits a UX designer:** this is the site you already have, made to do the job. It shows what the sequence costs and earns with no new visual language.
- **Cards:** rounded 20px, image inset at the top, a question headline in Space Grotesk, and a hairline cover-sheet strip. Calm and familiar.
- **Cleanup (revised 2026-10-22, borrowed from C):** the affinity-mapping checklist, set in A's own type with accent ticks: *Group similar ideas → Name the themes → Dot-vote what matters → Clear the rest*. Each line is visible on the stage: the cards tidy into four piles (The work, Side projects & awards, Requests, Everything else); the piles get plain names with counts (desktop only); the two case studies get an accent vote and fan out of their pile; then requests and chatter drop away while side projects, awards and About rise toward the tabs that hold them. On phones the checklist is a 2×2 grid so it fits within the headline's height. Replaces the earlier buzzword status line, which the critique found read as a loader. Retimed to about 4s (18 cards in ~0.9s, steps 650/600/600/550ms; measured ~3.6s of motion on desktop, ~3.1s on phone), under the 5s WCAG 2.2.2 line, so A has no Skip: the control shows only "Replay intro" once resolved.
- **Layout:** loop above the text, top-left. On desktop the tabs sit beside the hero, so the work is in the first screen.
- **Loop:** plays after the cleanup, so the calm arrives with the signal.
- **New tokens:** dark-theme values only. Text and surfaces reuse the foundation scale (900, 800, 700, 100, 300/400). **NEW:** `accent.warm` dark `#e8843a`, `accent.subtle` dark `#3a2a1a`, stage band light `foundation-100` / dark `#231f1d`.

## B · Canvas (product-native)
- **Why:** it speaks the tool hiring managers know you live in. The cleanup *is* the work: select, decide, delete, auto-layout.
- **Cards:** app frames with a 6px radius, edge-to-edge images, the cover sheet as an inspector panel, layer names in mono above each frame, and stakeholder notes as comment pins.
- **Cleanup:** a marquee drag sweeps the canvas and every layer is selected (handles). Each gets a verdict tag: *Keep / Merge / Remove*. The removes delete instantly, the repeats stack and go, and the work auto-layouts in a row. The status bar narrates in the tool's words: "Selecting 24 layers", "Removed 13 layers that add noise", "Auto layout · 3 frames, 24 gap".
- **Layout:** loop beside the text, as two frames; tabs in a frame below.
- **Loop:** plays from the start. It's the one live prototype on the canvas.
- **NEW tokens:** canvas `#efefec`/`#1b1b1d`, dot `#c9c9c4`/`#34343a`, frame `#ffffff`/`#26262a`, frame-2 `#f6f6f4`/`#2f2f34`, line `#e2e2de`/`#3a3a40`, ink `#18181b`/`#f4f4f5`, ink-2 `#3f3f46`/`#d4d4d8`, ink-3 `#5f5f68`/`#a1a1aa`, ink-large `#76767f`/`#8b8b94`, selection (the only accent) `#0b6bde`/`#4c9dff`. Fonts: **Rethink Sans** (UI) and **Red Hat Mono** (layer names, values). Motion ease `cubic-bezier(.2,0,0,1)`, about 90–380ms.

## C · Affinity Wall (tactile / playful)
- **Why:** affinity mapping is the UX ritual of turning chaos into themes, so the page acts out the exact skill it claims.
- **Cards:** index cards with taped photo prints and ruled lines. Sticky notes come in five colours by type (notifications yellow, feedback pink, stats orange, events blue, accolades mint), and the cover sheet is a row of hand-circled tags.
- **Cleanup:** notes slide into four clusters, which get marker headings on masking tape (*The work, Side quests + wins, Asks, Chatter*). The work is dot-voted, and the unvoted notes peel off the wall. A marker checklist on the index card ticks through *Group similar ideas, Name the themes, Dot-vote what matters, Clear the wall*. The tabs become tape labels.
- **Layout:** a polaroid of the loop with the index card pinned under it, collage-style. On desktop the tabs sit beside it.
- **Loop:** plays after the cleanup.
- **NEW tokens:** wall `#cddcec`/`#172231`, wall ink `#1d2733`/`#e6edf5`, paper `#fffdf8`/`#e9e6dc`. Paper ink `#1f2328` stays dark in both themes. Notes: yellow `#ffe27a`, pink `#ffb8cb`, mint `#bfeedd`, blue `#bcd7ff`, orange `#ffc58a`, lime `#d6f0a6`, each dimmed about 10% in dark. Marker red `#c8262f` (dark wall `#ff7b7b`). Fonts: **Bricolage Grotesque** (display, opsz/wdth) and **Kalam** (marker). Ease `cubic-bezier(.25,.8,.3,1)`, peel `cubic-bezier(.55,0,.9,.5)`.

## D · Grid System (technical)
- **Why:** it makes the invisible craft visible: alignment, consistency and heuristics. Simplicity becomes something you can measure.
- **Cards:** specimen sheets with square corners, a 2px ink top rule, the cover sheet as a three-column table with mono labels, and accolades as table rows.
- **Cleanup:** a heuristic review table (Nielsen numbering): *H4 Consistency and standards → H6 Recognition rather than recall → H8 Aesthetic and minimalist design → H1 Visibility of system status*. Each row says what it's doing ("Aligning to the grid"). Meanwhile the cards snap to columns (their redlines flip from "+13 x −2 y" to "col 5"), sort into four lists, lose the non-essential, and drop into the Work columns.
- **Layout:** loop in columns 1–4, the name/headline at display size across columns 5–12, and tabs as a full-width table header.
- **Loop:** plays after the cleanup.
- **NEW tokens:** paper `#f7f7f4`/`#0e0f11`, surface `#ffffff`/`#16171a`, ink `#0f0f0f`/`#f1f1ec`, ink-3 `#585852`/`#9d9d96`, cobalt (the only accent and the redline colour) `#2443d6`/`#8aa0ff`, grid tint at 6% and edge at 18%. Fonts: **Archivo** (wdth axis, 106% stretch for display) and **JetBrains Mono** (measurements only). Ease `cubic-bezier(.65,0,.35,1)`. Headline reveals use a clip-path wipe.

## E · Contact Sheet (dark / cinematic): the impeccable roll's assigned direction
- **Why:** editing is choosing. A contact sheet is where you see everything at once and keep almost nothing, and that is the cleanup.
- **Cards:** prints. In the noise they're equal frames on film with yellow edge numbers. In the tabs, case studies are framed on sprocketed film, titles are condensed caps, and accolades read as left-aligned end credits.
- **Cleanup:** a chinagraph pencil. *Cut* (crossing out frames that don't serve the user), *Ring* (circling the selects: highlighting the primary path), *Hold* (the rest go to hatch: reducing to the essentials), *Print* (the selects print where the tabs will be: prioritising what matters). The slate counts "26 frames → 03 selects".
- **Layout:** one film strip, with frame 01 as the loop and frame 02 as the title card (beside on desktop, stacked on phones). Tabs are reel labels below.
- **Loop:** plays from the start, because the projector is running.
- **Themes:** dark is the editing desk; light is a lightbox. The film stays dark in both, and the pencil turns from yellow to red.
- **Raises from the roll's declined challengers:** *luxury-fashion-flagship* gave cuts not fades and a lot of negative space around frame 01. *tanaka-plane-portrait* gave nothing decorative: the edge numbers index real content. *signals-instruments-nixie-laboratory-counter* gave the count as a physical event (the slate). *operate-b-exposure-record-zone-sheets* gave rejects shown by hatching, not colour.
- **NEW tokens:** desk/lightbox `#0b0b0a`/`#ebeae4`, film `#151413`, on-film `#f1ede4`, on-film-2 `#9a958b`, print `#1b1a18`/`#ffffff`, ink `#f1ede4`/`#121110`, chinagraph `#f2c230` (dark) / `#c42a22` (light). Fonts: **Big Shoulders Display** (titles), **Hanken Grotesk** (body) and **Martian Mono** (edge print, labels). Ease `cubic-bezier(.3,0,0,1)`. Panel cards develop in three hard steps.

---

## What to check when comparing
1. **First three seconds:** do the name, the CTAs and Skip read at once, before the noise wins?
2. **The cleanup as an act of design:** watch it twice. Does it read as you deciding, or as a loading state?
3. **The resolved first screen:** at 1440×900 all five show the work in the first viewport. A and C put it beside the hero; B, D and E put it under. Which do you want a hiring manager to land on?
4. **Cards at rest:** open each tab. Do the case cards feel image-led and one-idea?
5. **Both themes:** C and E keep paper and film fixed while the ground changes. Is that charming or confusing?
6. **Phones (375/390):** the hero takes most of the screen, so the noise is lighter there (9–10 cards, mostly below the fold). Decide whether phones should skip straight to the resolved state.
7. **Reduced motion:** turn it on in your OS and confirm each page opens resolved and Replay cross-fades.

## Known gaps
- DCA media is a placeholder screenshot, tagged on the card.
- On phones the noise mostly sits below the fold (see check 6).
- The four brief docs weren't available. The contrast rules follow WCAG AA, with large-only greys used just for the headline's second half.
- Not yet run: impeccable's finish review and DESIGN.md. They come after you pick a direction, scoped to that one.
- Delete `src/app/explore/`, `public/explore/` and `scripts/export-hero-loop.mjs` once a direction is promoted. Nothing in the main pages was changed. `PRODUCT.md` is new, and `.impeccable/config.json` gained `"buildPath": "code"`.
