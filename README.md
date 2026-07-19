# Mashal Equipment — site vitrine B2B

Site web pour **Mashal Equipment** (Cotonou, Bénin) : catalogue machines, pièces, SAV et logistique export.

**Domaine cible :** [https://mashal.equipment](https://mashal.equipment)

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion

## Local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Domain & email

Canonical : **mashal.equipment** (`NEXT_PUBLIC_SITE_URL=https://mashal.equipment`).

### Boîte mail `contact@mashal.equipment`

1. Chez le registrar / Cloudflare du domaine → **Email Routing** (ou Google Workspace).
2. Créer `contact@mashal.equipment` (forward Gmail ou boîte complète).
3. Soumettre une fois le formulaire du site pour activer FormSubmit, puis confirmer l’e-mail reçu.

Optionnel : `FORMSPREE_ID` / `NEXT_PUBLIC_FORMSPREE_ID` (voir `.env.example`).

## SEO

- Titles / descriptions FR orientés équipements lourds, pièces, SAV, export Afrique
- Canonical + Open Graph
- `sitemap.xml` (App Router) + `robots.txt`
- Pages métier : `/machines`, `/pieces`, `/sav`, `/logistique`, `/articles`, `/a-propos`

Après déploiement : soumettre `https://mashal.equipment/sitemap.xml` dans [Google Search Console](https://search.google.com/search-console).

## Scripts

- `npm run build` — production build
- `npm run lint` — ESLint
- `node scripts/convert-machine-photos.mjs` — convertit les `.jpg` machines en `.webp`

## Images machines

1. Déposer `public/images/machines/{id-machine}.jpg`
2. Lancer `node scripts/convert-machine-photos.mjs`
3. Les cartes catalogue lisent les `.webp` (overrides famille dans `src/lib/machine-images.ts`)

## Deploy

Vercel (repo GitHub). Définir en production :

```bash
NEXT_PUBLIC_SITE_URL=https://mashal.equipment
```

Optionnel :

```bash
FORMSPREE_ID=xxxxxxxx
```
