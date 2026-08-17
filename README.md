# CFF Website

Static website for the **Children's Future Foundation (CFF)**, Timor-Leste.
Built as plain HTML / CSS / JS — no build step, no dependencies.

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About CFF |
| `programs.html` | Programs |
| `news.html` | News & Stories |
| `donate.html` | Support / Donate |
| `contact.html` | Contact |

## Structure
```
assets/
  css/styles.css   ← design system + all styles (brand tokens at top)
  js/main.js       ← mobile nav, scroll reveal, contact form
  img/             ← put real photos here
index.html ... contact.html
DESCRIPTION.md     ← content spec compiled from the brief
```

## Preview locally
Any static server works, e.g.:
```bash
cd "CFF Website"
python3 -m http.server 8000
# open http://localhost:8000
```

## Design
- **Palette** (brief): Midnight `#013D5A` (primary), Marigold `#F5A23B` (accent),
  Herb `#708C69` + Celeste `#BDD3C1` (support), Lionsmane cream background.
  All defined as CSS variables in `:root` of `styles.css`.
- **Type**: Fraunces (display) + Mulish (body), via Google Fonts.

## Replacing the placeholders
Grey/green boxes labelled e.g. "Mother & children…" are image placeholders
(`.ph`). To use a real photo, replace the `<div class="ph" ...></div>` with:
```html
<img src="assets/img/your-photo.jpg" alt="Describe the photo" />
```
Photos from the brief can be exported and dropped into `assets/img/`.

## Known v1 placeholders (to confirm with CFF)
- Phone number (`+670 …`)
- Leadership photos & bios (board / executive team)
- Real program photos
- Bank-transfer details (kept off the public page on purpose; shared on request)
- Online card donations — marked "coming soon"

## Next steps
- **Tetum translation** — the site is English-first; CSS already supports a
  language toggle (`html[lang="tet"]`) for when Tetum copy is ready.
- Wire the contact form to email / a form service.
- Verify exact HEX values for Herb & Marigold against the brand source file.
