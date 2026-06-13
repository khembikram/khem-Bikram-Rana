# Favicon + OG icon set — install

A new brand mark: bold **K.** on ink, with an electric-tangerine accent dot and
corner wedge — matches the redesigned site (ink #16130E · tangerine #FF5B23 · paper #F2EDE4).

## Where the files go
Drop **everything from the `assets/` folder into your CRA `public/` folder.**
They sit at the domain root after build, which is exactly what the `index.html`
links and the OG tags expect.

```
public/
├─ favicon.ico            ← multi-size (16/32/48/64) browser tab icon
├─ favicon.svg            ← crisp scalable version (modern browsers)
├─ favicon-16x16.png
├─ favicon-32x32.png
├─ favicon-48x48.png
├─ apple-touch-icon.png   ← 180×180, iOS home screen (full-bleed)
├─ logo192.png            ← PWA / Android
├─ logo512.png            ← PWA / Android
├─ maskable-512.png       ← PWA maskable (safe-area filled)
├─ manifest.json          ← replaces your old one (new icons + brand colors)
├─ og-image.jpg           ← 1200×630 social share card (use this one)
└─ og-image.png           ← same card as PNG (optional backup)
```
You can delete the old `logo192.png` / `logo512.png` / `favicon.ico` — these replace them.
`favicon-180x180.png` is just a spare; `apple-touch-icon.png` is the one that's wired up.

## index.html
Use the provided `index.html` (already wired to all the above). It links the
ICO + SVG + PNG favicons and the apple-touch icon, and points OG/Twitter at
`og-image.jpg`.

## manifest.json
The provided `manifest.json` replaces the default CRA one — new icon list,
`theme_color: #16130E`, `background_color: #F2EDE4`, app name set to your title.

## Verify after deploy
1. **Tab icon:** hard-refresh (Ctrl/Cmd+Shift+R) — browsers cache favicons hard.
2. **Link preview:** paste your URL into
   - LinkedIn Post Inspector → https://www.linkedin.com/post-inspector/
   - X Card Validator, or just paste in a WhatsApp chat to yourself
   These also force-refresh the OG cache so the new card shows.
3. **OG image must be an absolute URL** (it is: `https://khembikram.com.np/og-image.jpg`)
   — relative paths don't work for social scrapers.

## Want to tweak the mark or OG card?
Re-run `gen_icons.py` (needs Python + Pillow). Colors are constants at the top;
the OG layout text is in `make_og()`. Everything regenerates in one pass.
