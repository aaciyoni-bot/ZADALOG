# ZADALOG

Site for **ZADALOG** — an Israeli logistics company: international freight forwarding,
an in-house container unloading crew, customs brokerage and managed logistics storage.
Domain: `zadalog.com`.

Zero dependencies and no build step. Plain HTML, CSS and browser JavaScript, plus a few
Vercel serverless functions for the back office.

## Layout

```
index.html            the public site
admin.html            back office (noindex)
content.json          everything the back office can edit
styles/main.css       design system + all components
styles/admin.css      back office only
scripts/data.js       ports, trade lanes, container specs, cargo presets
scripts/content.js    loads content.json and applies it to the page
scripts/i18n.js       Hebrew/English dictionary + RTL ⇄ LTR switching
scripts/worldmap.js   dot-matrix world map with animated trade lanes
scripts/planner.js    container load planner + isometric load renderer
scripts/tracking.js   track & trace demo
scripts/careers.js    open positions
scripts/admin.js      back office console
scripts/main.js       navigation, scroll scenes, ticker, carousel, forms
api/                  login / logout / session / save  (Vercel functions)
```

## Back office

`https://zadalog.com/admin` — log in and edit contact details, the headline figures and
the open positions. "Publish" writes `content.json` back to this repository through the
GitHub API; GitHub then triggers a Vercel rebuild and the change is live in about a minute.
No database to run, and every change is an ordinary commit with an author and a timestamp.

The password is never sent to the browser. It lives in Vercel environment variables and is
only ever compared server side; the browser gets a signed, HttpOnly session cookie that
expires after 8 hours.

### Required environment variables (Vercel → Settings → Environment Variables)

| Variable | Purpose |
| --- | --- |
| `ADMIN_USER` | Back office username. |
| `ADMIN_PASS` | Back office password. Use a long one — it is the only lock on the door. |
| `SESSION_SECRET` | Random string, 32+ characters. Signs the session cookie. |
| `GITHUB_TOKEN` | Fine-grained personal access token with **Contents: read and write** on this repository. Needed for "Publish". |
| `GITHUB_REPO` | `aaciyoni-bot/zadalog` |
| `GITHUB_BRANCH` | `main` (optional, this is the default) |
| `CONTENT_PATH` | `content.json` (optional, this is the default) |

Redeploy after changing any of them — functions read env vars at boot.

Without `GITHUB_TOKEN`/`GITHUB_REPO` the console still works and offers **Download JSON**,
so `content.json` can be committed by hand.

## What is real and what is demo

| Feature | Status |
| --- | --- |
| Container load planner | Real maths. Standard pallet counts follow accepted industry loading figures; everything else uses a two-strip guillotine packing estimate. Labelled as an estimate in the UI. |
| Back office | Real. Server-side auth, publishes through GitHub. |
| Careers | Real. Positions come from `content.json`; applications open the visitor's mail client. |
| Track & trace | **Demo.** Deterministic sample data generated from the tracking number. Needs a carrier or in-house API before launch. |
| Ops ticker | **Demo.** Random sample events, labelled as such in the UI. |
| Headline stats, transit times, testimonials | **Placeholders.** Replace with real figures. Stats are editable in the back office. |
| Quote form | Opens the visitor's mail client. Swap for a real endpoint or CRM when there is one. |

## Still to replace before launch

- Testimonials — `scripts/data.js`, `QUOTES`.
- Transit times and sailing frequencies — `scripts/data.js`, `LANES`.
- The founder section is a first draft written from a brief. **Moshe Zada should read and
  approve it** — `abP1`–`abP3` and `abQuote` in `scripts/i18n.js`.
- A real photograph in place of the monogram in the About card.

## Language

Hebrew is the default (RTL); English is one click away in the header and is remembered in
`localStorage`. Every string lives in `scripts/i18n.js` — add a key to both dictionaries and
reference it with `data-i18n="key"`. Layout uses logical CSS properties, so direction flips
correctly; Latin and numeric runs are bidi-isolated so container codes, dimensions and
tonnages never reverse inside Hebrew sentences.

## Local preview

```bash
npx http-server -p 4321 .
```

The back office needs the serverless functions, so it only works on a Vercel deployment
(or `vercel dev`), not from a plain static server.
