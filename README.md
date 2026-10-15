# Abraj Al Bahar Documents Typing & Copying

Static bilingual website for ABDT, a typing and documentation centre in Al Shuwaihean–Rolla, Sharjah.

## Requirements

- Node.js 20 or newer

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`.

## Production build

```bash
npm run build
```

The static files are written to `dist`. Preview them with:

```bash
npm run preview
```

## Contact form

Sending the form opens WhatsApp to +971 54 537 2505 with the customer’s name, mobile number, email if provided, service, and message already written. The customer presses send in WhatsApp. The site does not store the form.

The form does not ask for Emirates ID numbers, passport numbers, or copies of identity documents.

## Logo

The official mark is `public/assets/abdt-logo.png`. It is the supplied artwork, cropped, with only the flat black background removed. Do not recolor or redraw it.

`public/favicon.png` is the same mark on a white square so it stays visible in the browser tab.

To prepare a replacement file from a new black-background export:

```bash
node scripts/prepare-logo.mjs path/to/logo.png
```

## Social links

Edit `src/data/siteConfig.js`.

- WhatsApp uses `+971 54 537 2505`.
- `social.instagram`, `social.facebook`, and `social.linkedin` start empty.
- An icon is shown only after a real profile URL is added. Do not invent usernames.

Phone numbers, the email address, and the address are in the same file.

## Map

The location button opens a Google Maps search for Al Shuwaihean–Rolla, Sharjah. The site does not embed a pin, because the exact business listing has not been confirmed. When you have a Google Maps place link, replace `mapsUrl` in `src/data/siteConfig.js`. You can then add an iframe in `src/components/Location.jsx` if you want an embedded map.

## Languages

English is the default. The header switch sets Arabic and `dir="rtl"`. The choice is stored in the browser under `abdt-lang`. Copy lives in `src/data/translations.js`.

## Deploy

Upload the contents of `dist` to any static host.

- **Netlify:** `public/_redirects` is copied into the build so `/privacy` and unknown paths serve `index.html`.
- **Vercel:** `vercel.json` rewrites all routes to `index.html`.
- **Other hosts:** configure a single-page fallback to `index.html`, then run `npm run build` and publish `dist`.
