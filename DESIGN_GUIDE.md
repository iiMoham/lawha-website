# Lawha (لوحة) Website: Design and UX Guide

This is the handover document for anyone (human or agent) who continues work on the Lawha marketing site.
It describes what the site is for, how it looks, how every section behaves, and the rules that keep it consistent.
Read it fully before changing anything. Where this guide and the code disagree, the code is the current truth;
update this guide in the same change.

---

## 1. Product and audience

- **What Lawha is:** a digital-signage service for cafés and restaurants in Saudi Arabia and the Gulf.
  The owner controls the TV menu screens in the shop from their phone: pick a menu, publish, and the screens change in seconds.
- **Who the site is for:** café and restaurant owners and managers. They are not technical. They care about:
  "does it work with my TV", "what does it cost for my number of screens", "what happens if the internet drops".
- **The one job of the page:** get the visitor to start. Every "Start" button opens the «ابدأ مع لوحة» form (`/start/`, `/en/start/`, see §7.10); the team then calls them.
- **Languages:** Arabic is primary (`/`, `dir="rtl"`), English is secondary (`/en/`, `dir="ltr"`).
  Both pages are the same components fed by different copy.

## 2. Design direction

**Tech and simple.** A clean SaaS look: cool off-white ground, near-black text, one electric-blue accent,
one sans-serif family, rounded panels, real product interface shown as the illustration.

The owner explicitly rejected an earlier "nature / café" theme (cream, sand, saffron, mint, calligraphic serif).
Do not reintroduce warm earthy colours or a serif display face.

Principles, in priority order:

1. **Show the product working, not talk about it.** Every section has a piece of real interface
   (the phone app, the TV screens, a timeline, notifications) instead of icons or long paragraphs.
2. **Little text.** The owner asked twice for less talk. Titles carry the message; supporting lines are short and optional.
   Never add paragraphs to cards.
3. **Organized.** Every section uses the same header pattern, the same 12-column grid and the same spacing.
   Nothing floats or overlaps.
4. **Arabic first.** Design and check in Arabic first, then English. Arabic typography rules (§4) are not optional.

## 3. Colour

All colours are CSS custom properties in `src/styles/global.css` (`:root`). Components use tokens only;
the few literal values allowed are listed below.

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#f7f8fa` | Page background (cool off-white) |
| `--surface` | `#eceff3` | Panels: demo stage, calculator bar, pairing panel, inactive bits |
| `--ink` | `#0a0d14` | Main text, dark buttons |
| `--muted` | `#535b6b` | Secondary text only (notes, captions, meta). Not for body copy |
| `--accent` | `#2453ff` | Electric blue: primary buttons, highlights, active states, the blue card, footer |
| `--accent-strong` | `#1a3fd1` | Hover/pressed accent |
| `--accent-ink` | `#ffffff` | Text on accent |
| `--accent-soft` | `#e4eaff` | Light blue tint: selected list rows, tick circles, "fits you" chip |
| `--night` | `#0a0d14` | Dark fields: closing section, dark cards, popular plan |
| `--night-2` | `#141925` | Inner wells inside dark cards |
| `--night-ink` | `#f7f8fa` | Text on night |
| `--signal` | `#8ea7ff` | Accent text on dark TV screens (menu titles, pairing code) |
| `--warn` | `#f5a524` | Offline / queued states only |
| `--live` | `#22c55e` | Live / online / "ready" dots only |
| `--tv` | `#05070b` | TV bezel |
| `--tv-screen` | `#0e1119` | TV screen background |
| `--tv-ink` / `--tv-muted` | `#f5f7fb` / `#9aa3b5` | Text on TV screens |

Allowed literals: white `#ffffff` for cards and inner rows, `#e3e6ec` card outline, `#dfe3ea` inactive timeline
segment, `#ef4444` "screen down" dot, two avatar colours in the team card (`#7c5cff`, `#0e8f8e`).

Rules:
- One accent. Blue is the only saturated colour on the page apart from the status dots.
- No gradients, except the photo scrim at the bottom of the hero TV picture (for caption legibility).
- No shadows at rest. Only the open mobile menu (a real overlay) and the flying "packet" dot have one.
- The nav is the one dark element that floats over everything (see §7.1).
- Section colour rhythm: light page → grey stage → light → black + blue + white feature cards → white/black plan cards
  → light FAQ → black closing section → blue footer.

## 4. Typography

**Family:** Wafeq only (400 Regular, 500 Medium, 700 Bold), bundled from `src/assets/fonts/wafeq-*.woff2` via `@font-face`. It replaced Thmanyah at the owner's request (Nov 2026).
Fallbacks: IBM Plex Sans Arabic, Geeza Pro, system-ui. Headings use weight 700 (there is no 900).
`font-size-adjust: from-font` is set on `body` so fallbacks do not shift layout.

**Licence:** confirm the Wafeq font licence allows web embedding before launch, and keep the files out of any public download link.

**Scale** (all fluid with `clamp()`, rem-based, and max ≤ 2.5 × min so 200% zoom still works):

| Role | Token / value | Where |
| --- | --- | --- |
| Small | `--step-small` 14–15px | Labels, meta, chips, footer |
| Body | `--step-body` 17–19px | Paragraphs, lists |
| Lead | `--step-lead` 20–24px | Hero lead, calculator question, plan currency |
| Card title | `clamp(1.25rem, 1.05rem + 0.6vw, 1.625rem)` | Feature cards, FAQ questions (1.25–1.75rem) |
| Section title | `.sec-title` `clamp(2rem, 1.2rem + 2.4vw, 3.5rem)` | Every section heading |
| Hero title | AR `clamp(3.25rem, 1.2rem + 4.8vw, 5rem)`, EN `clamp(2.25rem, 0.9rem + 3.9vw, 4.25rem)`, then capped so line 1 fits (§7.2) | Hero only (minimums keep the longest rotating word on one line at 360px) |
| Closing title | `clamp(3rem, 1.2rem + 5vw, 6.5rem)` | Closing section, footer e-mail |
| Price | `clamp(3rem, 2.2rem + 2.2vw, 4.5rem)` | Plan prices |

`--step-head` and `--step-display` still exist in the tokens but sections no longer use them; prefer the values above.

**Arabic rules (must keep):**
- Never apply `letter-spacing` to Arabic. It breaks the letter joins. Negative tracking is English-only (`--track-display` on `:root[lang="en"]`).
- Arabic needs taller lines: display 1.25, headings 1.3, text 1.75. English: 1.02 / 1.06 / 1.55. These are set as `--lh-*` tokens per language.
- Latin words inside Arabic text (HDMI, Android TV, Google TV, K7Q 4MP, phone numbers, e-mail) are wrapped in `.ltr` or `dir="ltr"` so they keep their own direction.
- Numbers use Western digits (0–9) in both languages, with `.nums` (`tabular-nums`) wherever they change or align.
- The riyal: Arabic copy uses `ر.س`, English uses `SAR`. Wafeq has no riyal ligature and no U+20C1 glyph, so «ر.س» shows as plain letters. To show the official riyal sign, use an inline SVG of it, not a font.
- Arabic number agreement in generated text: 1 → «شاشة واحدة», 2 → «شاشتان», 3–10 → «N شاشات», 11+ → «N شاشة» (see the pricing script).
- Headings: `text-wrap: balance`; paragraphs and list items: `text-wrap: pretty`; paragraphs are capped at `62ch`.
- Every heading must fit in **two lines or fewer at every width** (1440, 768, 390). Cut words before shrinking type.
  The one exception is the hero headline on phones, which is three lines (see §7.2).

## 5. Layout and spacing

- **Page gutter:** `.wrap` applies `padding-inline: var(--margin)` (16px on phones → 36px on desktop).
- **Grid:** 12 columns, `column-gap: var(--gutter)`, used by the hero intro, section headers, How it works and FAQ.
- **Section rhythm:** `--section` = `clamp(4.5rem, 9vw, 8.5rem)`. Sections generally have **no top padding and `--section` bottom padding**,
  so the space between two sections is a single `--section`. Do not add top and bottom padding to neighbours (it doubles the gap).
- **Section header (`.sec-head`)**, defined in `global.css`, the same on every section:
  - `h2.sec-title` in columns 1–7; optional `p.sec-sub` (muted, ≤ 40ch) in columns 8–12, aligned to the bottom.
  - Below `54rem` they stack.
- **Radii:** `--radius` 12px for small things; `calc(var(--radius) * 1.5)` (18px) for panels and cards; `* 1.75` (21px) for plan cards; `--pill` for buttons, chips and toggles.
- **Breakpoints:** `64rem` (tablet: grids collapse to 2 columns or stack), `54rem` (phone layout), `40rem` (single column for card grids).
  The nav does not use a breakpoint (see §7.1).
- Nothing overlaps anything. The page must never scroll sideways at any width (`overflow-x: clip` on `body` and the hero).

## 6. Shared components and controls

- **Logo (`Logo.astro`, `public/favicon.svg`):** designed by the owner (source file `~/Desktop/Selection.svg`).
  A blue rounded tile (`#2453FF`) with three white arcs, like a signal going out to the screens. Always next to the word «لوحة» / "Lawha" in Wafeq Bold.
  - Use the mark exactly as supplied. Don't redraw, recolour, add an outline or rotate the arcs. (The source's 1px black outline was an export leftover and is dropped.)
  - On blue backgrounds (the footer) use `<Logo inverse />`: a white tile with blue arcs, because the blue tile disappears on blue.
  - In the navbar use the three arcs alone (`<Signal class="logo" />`, the same shape as `<Logo arcs />`), no tile, in the text colour (white on the dark capsule). The tile version is the app icon, not the navbar logo.
    The brand sits 1.5rem (1rem on phones) in from the capsule's start edge.
  - The favicon is the same mark; the arcs stay readable at 16px.
- **`.button`:** pill, min-height 3.25rem (52px), accent background, white text, weight 500. Pressed `scale(0.97)`; hover `--accent-strong`.
  Buttons that continue somewhere end with `<span class="arrow">→</span>`; in RTL the arrow is mirrored automatically.
- **`.link`:** underlined text link; underline colour fades in on hover.
- **Switch:** a real `<input type="checkbox" role="switch" class="switch">`, styled with `appearance: none` (track plus `::after` knob).
  In RTL the knob travels the other way. Forced-colours fallback included.
- **Segmented choice** (billing period, announcement duration): real `<input type="radio" class="ghost-input">` inside `<label>`s.
  The checked label gets the ink background via `label:has(:checked)`. Focus ring via `label:has(> .ghost-input:focus-visible)`.
- **The signal (`Signal.astro`): the logo is the product's status mark.** The three arcs draw a signal going from the phone to the screens, so wherever the site sends, receives or loses something, it uses them instead of a dot or an emoji. Arcs are `.a1` (inner, the source) → `.a3` (outer); `Logo.astro`'s arcs carry the same classes.
  - States: `full` (connected, live, received) · `send` (arcs light one after another outwards, looping: publishing, sending) · `weak` (inner arc only: offline, the screen plays what it saved) · `level="1|2|3"` (how far the signal reaches). Unlit arcs stay at `--sig-faint` (0.22). Keyframes `sig-send`, `sig-rx` (light once, inner first) and `sig-wave` (dip and return) live in `global.css`.
  - Colour follows meaning: `--accent` while sending, `--live` when live, `--warn` when offline, white on blue fields.
  - Where it is used, and why there:
    - Navbar logo: switches on (inner arc first) when the page opens; a wave on hover.
    - Hero demo: pressing Publish sends the logo itself, on a blue disc, along a curve to the TVs, turned to face its direction of travel; each TV then lights the arcs in its corner. The phone's status line uses the mark (sending → live; amber and weak when queued offline), as does "3 screens connected".
    - How it works: in step 1 the TV boots on the logo and its arcs light up; in step 4 the arcs beside the screen's name go out just before the menu lands.
    - Features: the offline card's internet switch and TV badge fall to the inner arc when the internet is cut; each branch in "publish to every branch" shows its arcs going out, then full.
    - Pricing: each plan's name carries 1, 2 or 3 lit arcs (one branch → three → all); the calculator's mark follows the slider.
    - Start form: the submit arrow becomes the sending arcs; the thank-you panel shows the logo tile, its arcs lighting as the request "arrives".
    - Footer: "Back to top" uses the arcs as its arrow (they already point up).
  - Not in the closing section: a large version there was tried and removed by the owner.
  - Don't use it as decoration with no signal meaning (no backgrounds, no bullets, no dividers), and never rotate it except while it is travelling in the hero.
- **Status dots:** 0.5rem circles where the signal doesn't fit; `--live` green = live/online/ready, `--warn` amber = offline/queued, red `#ef4444` = screen down.
- **Tick:** a 1.375rem circle with a check SVG; light blue on light cards, solid blue on the dark popular card.
- **Hit targets:** every interactive control is at least 44×44px (2.75rem).
- **Focus:** always visible, `outline: 3px solid var(--accent); outline-offset: 3px` (light outline on dark/blue fields). Never remove it.
- **Hover effects** are wrapped in `@media (hover: hover) and (pointer: fine)` so touch devices don't get stuck hover states.
- **`data-ui`:** marks interface fragments (TV screens, phone, timeline, notifications). They may use small fixed font sizes and their own borders. Never put an `h1` inside one.

## 7. Sections, in page order

`src/components/Page.astro` assembles: Nav → Hero → Steps → Announce → Features → Pricing → Faq → Cta → Footer.
All copy lives in `src/i18n.ts` (`content.ar`, `content.en`; the `Content` type is derived from the Arabic object, so add every new key to both).

### 7.1 Nav (`Nav.astro`)
- A **floating dark capsule** (`--night`, pill radius, faint white outline so it still reads over the black closing section). It sits in a sticky, transparent header with 0.75rem around it, so the page scrolls behind it.
  - Inside: the white arcs logo + «لوحة», then the links in an inner `--night-2` pill, a round language chip («EN» / «ع», full name in `aria-label`), and the blue "Start now" button with an arrow.
- **Sliding pill:** a white pill slides under the hovered or focused link (its text turns ink).
  - With no hover, it rests on the section being read (scroll spy over `#how`, `#features`, `#pricing`, `#faq`, the band 30–35% from the top). In the hero, no pill shows.
  - The pill moves with `translate` and `inline-size` (the one place width animates; it is a tiny element).
- **Reading line:** a 2px blue line along the capsule's bottom edge fills with page scroll (`animation-timeline: scroll(root)`, longhands). It is decorative, off with reduced motion, and absent where unsupported.
- **Scrolled:** after 24px the header padding and bar height tighten (4rem → 3.5rem).
- One `<ul id="site-menu">` at every width. A `ResizeObserver` checks whether the row fits:
  - When it fits, the header gets `.is-wide` and the list is inline.
  - When it doesn't, the list becomes a native `popover="auto"`: a dark sheet under the bar (anchor positioned, fixed fallback `top: 5.25rem`) with large links, thin dividers and a forward arrow. The menu button's two lines turn into an ✕ while it is open.
  - The popover attribute is changed with `setAttribute`/`removeAttribute`, never the JS property. The `@oddbird/popover-polyfill` loads only if the browser lacks popover.
- Clicking a link in the open menu closes it. Below 30rem the "Menu" label is visually hidden (icon only, still named), and the button arrow is dropped.
- Hover details (fine pointers only): the logo tilts, the language chip turns white, the button arrow nudges.

### 7.2 Hero (`Hero.astro`, `Phone.astro`, `MenuBoard.astro`): the signature
- **Intro row:**
  - Start side (cols 1–8): headline on two lines (owner's request):
    - AR: «تحكّم في جميع شاشات» / «**مطعمك** من جوالك» (the rotating word opens line 2, `hero.wordLine: 2`). EN: "Control every **restaurant** screen" / "from your phone" (`wordLine: 1`).
    - The lines never wrap, so their size is capped to fit the widest one: `.tl` uses `min(1em, 100cqi / --fit)`, where `--fit` is that line's width in em (AR 11, for «أي نشاط عندك من جوالك»; EN 15.9). Re-measure `--fit` if the words change.
    - Phones (≤40rem): English goes back to three lines ("Control every" / "**restaurant** screen" / "from your phone"), because two lines would make the headline too small. Arabic keeps its two lines, sized to fit, since they can't split without breaking the sentence.
    - Lead (owner's wording): «حدّث قوائمك، غيّر أسعارك، وانشر عروضك على كل الشاشات خلال ثوانٍ.»
    - The blue word rotates every 2.6s: مطعمك → مقهاك → أي نشاط عندك (EN: restaurant → café → business). Copy: `hero.words`, `hero.wordAfter` in `i18n.ts`.
    - All words share one grid cell (`.rot`); the script sets the box width to the current word so the words after it follow smoothly. The old word slides up and fades, the new one rises in.
    - Only the first word is exposed to screen readers (the rest are `aria-hidden`). With reduced motion or no script, the first word stays.
    - Keep the longest word on one line at 360px; if you add a longer word, re-measure.
  - End side (cols 9–12), level with the headline's bottom: the one-sentence lead, then the "Start with Lawha" button and the "See pricing" link.
- **Demo stage:** a grey `--surface` panel (radius 18px) with a 2×2 grid:
  - Labels row: "Try it: pick a menu on the phone and publish." over the phone; "The screens above the café counter" over the board.
  - Phone column (17–21rem): the owner app (`Phone.astro`):
    - Café name and branch, and a live status line.
    - "What's on now?" as a native radio group of three playlists (thumbnail, name, meta).
    - A full-width "Publish to 3 screens" button and a status line (live, sending, or "queued until internet returns").
    - The "Café internet" switch.
  - Board column: `MenuBoard.astro`, three TVs. A large offer TV beside two stacked 16:9 menu-list TVs. The offer TV is a real menu-board combo screen: a professional dish photo on one half, a solid panel on the other with tag, combo name, what's included (+ items), price chip and struck-through old price, and the hours (`offer` in each playlist in `i18n.ts`). One offer per playlist: breakfast shakshuka combo, burger meal, latte and cake. No video and no phone snapshots: owner asked for studio-quality food photos. Under it, «يُعرض الآن: …» / "Now showing: …" updates on publish.
- **Behaviour:**
  1. On publish, a small blue dot flies along a curve from the button to the board (Web Animations API).
  2. The TVs then wipe to the new playlist one after another, 140ms apart.
  3. If the internet switch is off, publishing queues; the board shows an "Offline · playing saved" badge and keeps playing. Turning the internet back on sends the queued playlist.
  4. An auto-demo cycles playlists every 6.2s until the visitor touches or keys into the phone. It pauses when the board is off-screen or the tab is hidden.
  5. The video plays only when its layer is visible and on screen.
- **Phone layout (≤54rem):** intro stacks; stage becomes one column: label, phone, label, board (only the big picture TV, 16:9), so the screen change is visible right under the Publish button.
- The phone keeps its device frame on purpose (owner's request).

### 7.3 How it works (`Steps.astro`)
- Section header «كيف تعمل لوحة». The owner asked for the steps to be clearer, in order, each with a simple animation.
- Two columns:
  - Start side (cols 1–5): four **numbered** steps (1–4 in a circle). Each title is a real `<button>` inside the `h3`, with `aria-current="step"` on the active one.
    - Active: filled blue number, ink title, its note, and a thin progress bar that fills over the step's time.
    - Done: blue ring number. Upcoming: muted ring and title.
  - End side (cols 6–12): a grey panel with one **scene**: a TV with a player box and cable under it, and the owner's phone beside it. Each step plays its own scene:

    | Step | TV | Phone |
    | --- | --- | --- |
    | 1 Plug in | Box rises, cable draws, LED turns green, TV boots to "Lawha Player · Ready to pair" | Dimmed, app icon |
    | 2 Scan | Pairing code `K7Q 4MP` + real QR (built with `qrcode`), then a "Paired · Counter screen" check | Camera viewfinder over the QR with a scan line, then "Paired" |
    | 3 Upload | "Counter screen · Waiting for content" with three dashed slots that fill as files finish | Three files with progress bars, then green ticks |
    | 4 Publish | The breakfast photo wipes down over the screen, with caption and price chip | Publish button presses, "Published" |

- **Behaviour:** the steps advance 1 → 4 and loop, 5.6s each (`--dur` on `.how`). Clicking a step jumps to it and the timer restarts.
  It starts when the scene is 40% on screen, and pauses (progress bar too) when it leaves or the tab is hidden.
- Each scene is CSS keyframes keyed on `[data-step="n"]` with `animation-fill-mode: both`. The script removes and re-sets `data-step` so a step replays every time.
- **Reduced motion:** no autoplay and no travel. Every animation is cut to 1ms, so clicking a step shows its finished state.
- **Narrow screens:** at ≤64rem only the active step shows its note. At ≤54rem the scene sits above the list. At ≤40rem the phone column widens to 36%.
- Scene copy is in the component (`t` object). The scene is `data-ui` and `aria-hidden`.
- The earlier full-width row of four "ready to play" photos was removed at the owner's request (it added no value).

### 7.4 Announcements (`Announce.astro`)
- Section header «إعلان عاجل» with the sub line "Type an announcement for the screens".
- A large white text field (it is a real `<input>`, max 44 characters) with a blinking blue caret. Whatever is typed appears live on the TV banner below.
- Under it, two columns:
  - A TV (16:9, dark) whose dimmed menu sits above a blue announcement banner (tag, text, "menu returns in mm:ss" countdown).
  - On the other side, one sentence explaining it, and a duration choice (15 min / 30 min / 1 hour, radio inputs).
- A row of example announcements (links) fills the field when clicked.

### 7.5 Features (`Features.astro`)
- Section header «مزايا لوحة». A 6-column card grid:
  - Row 1: a wide card (span 4) and a dark card (span 2).
  - Row 2: three cards (span 2 each).
  - Tablet: 2 columns, the wide card spans both. Phone: 1 column.
- Each card is **a small working piece of the product the visitor can use**, plus a title. No description paragraphs.
- Emoji are plain characters (the owner asked for Apple emoji), so each platform draws its own: Apple's on iPhone/Mac.
  Never bundle Apple's emoji images; their licence does not allow it.

  | Card | Style | What the visitor does | What happens |
  | --- | --- | --- | --- |
  | تبديل تلقائي حسب وقت أنت تحدده | white, wide | Drags the handle on the day's timeline (a native range, 6 am–12 am, 10-minute steps) | The clock pill updates, the current block turns blue, and the mini TV wipes to that block's menu (🍳 breakfast, 🥗 lunch, 🌙 evening). Until touched, the day plays by itself (~10s per day, only while on screen) |
  | عروض مكمّلة حتى إذا انقطع النت | black | Flips the 📶 Internet switch | The badge turns amber «دون إنترنت · يعرض المحفوظ»; the TV keeps playing (a highlight walks the rows) |
  | نبّهني إذا توقفت شاشة | white | Presses «🔌 افصل شاشة الكاونتر» / «أعد توصيل الشاشة» | A notification slides in on top (📺 stopped, with a shake, or ✅ back). Older ones read «قبل قليل»; two are shown |
  | انشر على كل الفروع بلمسة | blue | Presses «🚀 انشر من جديد» (also runs once when first seen) | Each branch goes ⏳ → ✅ in turn while the counter climbs to 12/12 |
  | أعطِ كل مدير فرعه فقط | white | Picks a member (toggle buttons) | The four branch chips show ✅ or 🔒 for that person, with one line saying what they can run |

- Controls are native: range, `role="switch"` checkbox, buttons with `aria-pressed`. Results use `aria-live="polite"`. Decorative TVs are `aria-hidden`.
- The interface copy is in the component (`t` object), not in `i18n.ts`.
- Script hooks use card-specific names (`data-offline-card`, `data-feat-net`). Generic names like `data-off` or `data-net` already exist in the hero and would clash.
- Notes created by the alerts script copy the component's `data-astro-cid-*` attribute so Astro's scoped styles apply to them.
- **Reduced motion:** no auto-play, wipes or slides. Every control still works and switches instantly.

### 7.6 Pricing (`Pricing.astro`)
Yearly packages only (owner's prices, SAR, Nov 2026). No monthly billing, no screen calculator and no period toggle: each package names its screens.
- Section header «باقات سنوية حسب عدد شاشاتك», with the sub line about the 7-day free trial and yearly billing.
- **Four cards in a row** (2×2 under 72rem, one column on phones):

  | Package | Price | Screens | Card |
  | --- | --- | --- | --- |
  | التجربة المجانية / Free trial | «مجانًا», 7 days | 1 | grey (`--surface`), a way in rather than a fourth package |
  | الأساسية / Basic | 678 a year | 1 | white |
  | النمو / Growth | 1,870 a year | 3 | dark (night), «الأكثر طلبًا» |
  | VIP | 4,720 a year | 9 | white |

- Each card: name with the logo arcs (1, 1, 2, 3 lit), the screens under it, the big price with «سنويًا», a full-width button (trial: «ابدأ تجربتك المجانية»; others «ابدأ بباقة …»), then the features.
- Features are tiered, not repeated: Basic has the core (one branch, uploads from the phone, unlimited playlists, changes in seconds, offline playback, stopped-screen alert); Growth adds «كل ما في الأساسية», up to 3 branches, schedules, publish to all, timed announcements, remote control; VIP is «كل مزايا التطبيق»: unlimited branches, team roles and branch managers, screen groups, play log, media folders and tags, on-site installation. The first item of each list is bold. Features come from the app spec (`~/Desktop/myProject/Lawha/PROMPT.md` §3).
- Buttons open the start form with `?plan=trial|basic|growth|vip`, which preselects the package.
- **Reassurance row:** four ticked facts (7-day free trial, VAT included, pairing under a minute, works with any HDMI TV). Under it, the player-box note (199 SAR once, or use your own Android/Google TV).

### 7.7 FAQ (`Faq.astro`)
- Section header «أسئلة شائعة». A `<dl>`: question in cols 1–5 (bold, card-title size), answer in cols 6–12 in full ink. Everything is open, with no accordions.

### 7.8 Closing section (`Cta.astro`)
- A black field: a two-line title «لوحتك جاهزة، / وجوالك أيضًا.» ("Your board is set. / So is your phone."), one sentence, and a blue "Start with Lawha" button (full width on phones).

### 7.9 Footer (`Footer.astro`)
- Blue field:
  - Brand, short description, address and hours, phone (`dir="ltr"`), CR number, "Back to top".
  - The contact e-mail set very large as the visual anchor.
  - Bottom row: legal and social links, a `<details>` with the photo and video credits (from `src/assets/media/credits.json`), and the city/year.
- Phone (≤ 54rem): one grid with named areas (`.f-top` and `.notes` become `display: contents`).
  - Brand and "Back to top" share the first row; the line about Lawha sits under them; then the e-mail on two lines.
  - A hairline (`rgb(255 255 255 / 0.3)`) above the address and phone, and another above the links.
  - Credits and city share the last row. Opened credits take the full width and the city drops below them.
  - Links, "Back to top", credits and city have 0.75rem block padding, so each is about 44px tall to tap.
- Contact email is real: `contact@lawha.tech` (Titan Email; also the form's `LEADS_EMAIL`). Other contact details are placeholders (`+966 50 000 0000`, `CR 0000000000`, `#` links).

### 7.10 Start page (`Start.astro`, `pages/start/`, `pages/en/start/`)
- Where every "Start" button leads (`startHref(c, plan?)` in `i18n.ts`). The pricing cards add `?plan=trial|basic|growth|vip`, which preselects the package answer («أي باقة تناسبك؟»).
- Start side (cols 1–5): «خلّنا نجهّز شاشاتك» and one line on the promise (a call within one working day). Under it, «وش اللي بيصير بعدها؟» as a dark (night) panel: three steps, each with the logo's signal lighting one, two, then three arcs (the last on a blue tile), and «بلا عقود» as a pill. On phones the order is heading, form, then this panel, so what happens next comes after sending.
- End side (cols 7–12): a white card with the form. Required: name, mobile, business name, type of business (chips), package (chips matching the pricing cards, plus «ما أدري للحين»). Optional, and labelled «اختياري»: city, e-mail, notes.
- Mobile numbers: Arabic-Indic digits, spaces and `+966` / `00966` prefixes are accepted and tidied to `05xxxxxxxx`.
- Errors appear only after the first send attempt, under each field in red, with focus moved to the first one; they clear as the visitor types.
- Sending: JSON to `MAILER_URL` (`src/i18n.ts`), the `mailer/` Cloudflare Worker, or to `formsubmit.co/ajax/<LEADS_EMAIL>` while `MAILER_URL` is empty. The team e-mail always uses the Arabic labels. Success swaps the form for a thank-you panel with the number we will call; failure shows the phone number to call instead. Without script the form posts normally and the sender redirects back to `?sent=1`. A hidden `_honey` field catches bots.
- Confirmation e-mail (Worker only): when the visitor leaves an e-mail they get «وصلنا طلبك، شكرًا لك!» from `no-reply@lawha.tech`, in the page's language: the brand-blue header with the white logo tile, their number large, a summary, the three next steps and «بلا عقود». Replies go to `contact@lawha.tech`. Copy lives in `start.reply` in `i18n.ts`; the logo and fonts it loads are in `public/email/`.
- `mailer/` (its own pnpm root): `src/emails.ts` builds both e-mails (tables and inline styles, as mail clients need), `src/index.ts` checks origin, honeypot, a 3-a-minute per-IP limit and every field, then sends through Titan SMTP (`smtp.titan.email:465`) as `no-reply@lawha.tech`. A stranger's text is echoed to the visitor only if it can't carry a link. `pnpm test`, `pnpm check`, `pnpm run deploy`; the mailbox password is the `SMTP_PASS` secret (`wrangler secret put SMTP_PASS`).
- The navbar on this page has no "Start" button (the form is open); its section links lead back to the home page, and the language switch goes to the other language's form.

## 8. Motion

- **Tokens:** `--ease-out`, `--ease-in-out`; durations `--t-press` 140ms, `--t-hover` 180ms, `--t-ui` 240ms, `--t-reveal` 800ms.
- **Transform and opacity only** (plus `clip-path` for the TV wipe).
- **Entrances:** elements marked `data-reveal` (stagger with `style="--i:n"`) rise 28px and fade in as they scroll into view, using CSS scroll-driven animations (`animation-timeline: view()`) inside `@supports ((animation-timeline: view()) and (animation-range: entry))`.
  - Browsers without support get an IntersectionObserver fallback (`.no-sda` class set in `Base.astro`).
  - **Write the animation as longhands** (`animation-name`, `animation-timeline`, …). The CSS minifier folds them into an `animation` shorthand that Chrome rejects, and then nothing animates.
- Hero parts use `data-rise` (a load-time entrance, staggered 90ms).
- **Feedback:** buttons scale on press, cards lift on hover, arrows nudge on hover, switches slide, the TV wipes, and the publish packet flies.
- **`prefers-reduced-motion: reduce`:** all travel and loops are disabled; content is always visible without script.

## 9. Imagery

- Real, CC0 photographs and one CC0 clip of the café world: breakfast, coffee, iced drinks, dates, latte art.
  - Files: `src/assets/media/*.jpg` (offer photos: `shakshuka.jpg`, `burger-meal.jpg`, `coffee-cake.jpg`, all CC0 Unsplash shoots via Wikimedia Commons). Sources and licences: `src/assets/media/credits.json`.
  - The footer lists only media shown on the page (`onPage` in `Footer.astro`: the three offer photos).
    `coffee-tray`, `dates`, `hot-coffee` and `iced-black` are no longer used but are kept with their records. Add a file to `onPage` if you use it again.
- Images go through Astro `<Image>` (responsive `widths`/`sizes`, webp).
  - The hero's first TV image is the LCP: `loading="eager" fetchpriority="high"`.
  - Hidden playlist layers: `loading="lazy" fetchpriority="low"`.
  - The video has explicit `width`/`height`, a poster, and `preload="none"`.
- Everything else (TVs, phone, timeline, notifications, QR) is built in HTML/CSS/SVG, not images.
- Never present a stock photo as the customer's own shop or team. No fake logos, reviews, testimonials or statistics.

## 10. Accessibility checklist

- Semantic landmarks: `header`, `nav`, `main`, sections labelled by their `h2`, `footer`. One `h1` (hero).
- All controls are native (`button`, `a`, `input[type=radio|checkbox|range|text]`, `fieldset`/`legend`) with labels.
- Decorative interface fragments are `aria-hidden="true"`. Live results use `aria-live="polite"` (hero status, now-showing, calculator).
- Contrast: body text in `--ink`; `--muted` only for secondary notes. Text on blue/black uses white or `--night-ink`.
- `<meta name="text-scale" content="scale">` is set; the root font-size is never set. The page must survive 200% text zoom without clipping or sideways scroll.
- `hreflang` alternates link `/` ↔ `/en/`. `lang`/`dir` are set on `<html>`.

## 11. Tech and tooling

- Astro 7 static site; pnpm only, exact version pins, `minimumReleaseAge 1440`, `ignore-scripts`. Run `pnpm audit --audit-level=moderate` before any install.
- Commands (run in `site/`):
  - `pnpm dev` (http://127.0.0.1:4321)
  - `pnpm build`
  - `pnpm check` (astro check, TypeScript 6; must report 0 errors)
- Strict tsconfig (`astro/tsconfigs/strictest` plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, etc.).
- Optional design checks (if the design-taste skill is installed):
  - `node ~/.claude/skills/design-taste-frontend/scripts/lint.mjs src`
  - `node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs <url>`

  Accepted inspector flags:
  - `eyebrow`: the "Most popular" badge.
  - `icon-cards`: the three plan cards.
  - `headline-lines`: the inspector counts the hidden rotating words, and on phones the hero is three lines.
  - `covered-text`: the "Paired" overlay covers the pairing code in step 2 on purpose.
  - `emoji`: the features cards use emoji at the owner's request.

## 12. QA before you hand back

1. Look at both `/` and `/en/` at **1440, 768 and 390px**: take screenshots of every screen and actually look at them.
2. No horizontal scroll, no overlapping elements, no heading over two lines, no text under 13px outside `data-ui`.
3. Exercise every control:
   - Hero: the headline word rotates; pick, publish, internet off → publish → on.
  - How it works: let it run 1 → 4, click each step, scroll away and back (it pauses).
   - Announcement typing and durations.
   - Pricing: slider and billing period.
   - Nav: hover the links (pill slides), scroll through sections (pill follows), mobile menu open → link → close.
   - Language switch.

   Check the console has no errors.
4. Check with reduced motion on: nothing hidden, nothing moving.
5. `pnpm build` and `pnpm check` clean.

## 13. Do / Don't

| Do | Don't |
| --- | --- |
| Show a piece of real interface for a feature | Add icon-plus-paragraph feature cards |
| Keep titles short and let the UI explain | Add description paragraphs (the owner asked for less text) |
| Use tokens from `global.css` | Hard-code new colours, or bring back cream/sand/saffron/serif |
| Use `.sec-head` for every new section | Invent a new heading style per section |
| Use native inputs and buttons | Build fake controls from `div`s or `role` attributes |
| Test Arabic first, then English | Add `letter-spacing` to Arabic or let Latin runs flip direction |
| Use Western digits and `ر.س` in Arabic | Use Arabic-Indic digits in one place and Western in another |
| Keep space between sections as one `--section` | Stack top and bottom padding on neighbouring sections |

## 14. Open items

- Replace placeholders: prices and plan limits, contact details, CR number, social/legal links, domain (now `lawha.tech`; SITE comes from the Pages workflow), the sample café «بُن الحي», menus, branch and team names.
- Confirm the Wafeq font licence allows web embedding before launch.
- Form sending: create the `no-reply@lawha.tech` mailbox in Titan, deploy `mailer/` and set its `SMTP_PASS`, then put the Worker's URL in `MAILER_URL`. Until then the form uses FormSubmit, which needs its one-time activation e-mail clicked in `contact@lawha.tech`.
- Not yet set up from the owner's tooling rules: `oxlint`, `oxfmt`, `vitest` for the site (the `mailer/` has vitest tests).

## 15. File map

```
site/
  astro.config.mjs        site URL, trailing slash, build options
  DESIGN_GUIDE.md         this file
  public/
    favicon.svg           logo mark (owner-designed: blue tile, three white arcs)
  src/
    i18n.ts               all copy, ar + en (Content type = shape of ar)
    qrcode.d.ts           types for the build-time QR generator
    styles/global.css     tokens, fonts, reset, controls, section header, motion
    layouts/Base.astro    <head>, meta, hreflang, motion feature detection
    pages/index.astro     Arabic page
    pages/en/index.astro  English page
    pages/start/, pages/en/start/   «ابدأ مع لوحة» form pages
    components/
      Page.astro          section order
      Nav.astro           floating capsule header: sliding pill, scroll spy, reading line, popover menu
      Hero.astro          intro (rotating headline word) + demo stage + demo script
      Phone.astro         owner app mock-up (native radios + switch)
      MenuBoard.astro     the three TVs and their playlist layers
      Steps.astro         How it works: numbered steps + animated TV/phone scene
      Announce.astro      typed announcement → TV banner
      Features.astro      interactive feature cards (timeline, internet switch, alerts, publish, team)
      Pricing.astro       calculator, plans, reassurance
      Faq.astro           questions and answers
      Cta.astro           closing section
      Start.astro         the start form: fields, checks, sending to FormSubmit, thank-you panel
      Footer.astro        contact, links, credits
      Logo.astro          logo SVG (`arcs` = navbar logo, `inverse` = blue backgrounds)
      Signal.astro        the logo's arcs as a status mark: full / send / weak / level (§6)
    assets/fonts/         Wafeq woff2 (Regular, Medium, Bold)
    assets/media/         photos + credits.json
```
