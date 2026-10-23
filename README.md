# Chinar Mineral Water — Website

React + Vite one-page site for **Chinar Mineral Water Trading LLC** (Dubai).

## Edit content
All business details (phone, WhatsApp, email, license no.) are in the `BIZ` object at the top of `src/App.jsx`.

**Chinar tree photo (optional):** save a landscape photo as `public/chinar.jpg` (~1800px wide) and it replaces the animated green Chinar canopy in the "Our Story" section automatically.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
**Option A — CLI (fastest)**
```bash
npm i -g vercel
vercel          # first time: log in + link to your existing Vercel project
vercel --prod
```

**Option B — GitHub**
Push this folder to a GitHub repo → Vercel → Add New Project → Import the repo.
Framework preset: **Vite** (auto-detected). Build: `npm run build`. Output: `dist`.

## Contact form
Messages are sent through FormSubmit (free, no backend) to `chinarwater2025@gmail.com`.
**The very first form submission sends an activation email to that inbox — click "Activate Form" once**, after that all messages arrive normally.
