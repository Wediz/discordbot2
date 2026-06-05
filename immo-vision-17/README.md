# Immo Vision 17 — Site Immobilier Ultra Premium

> Consultant Immobilier Premium en Charente-Maritime · Partenaire Efficity

## 🎯 Objectifs

1. **Générer des demandes d’estimation** via un formulaire multi-étapes intelligent
2. **Obtenir des mandats exclusifs** via la mise en avant de la promesse media premium
3. **Différencier** l’agent avec drone, 360°, vidéo cinématique inclus sans supplément
4. **Transformer chaque visiteur en prospect** via des CTA stratégiques
5. **SEO local** sur Royan, Rochefort, Saintes, La Rochelle, Charente-Maritime

---

## 🛠️ Stack Technique

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom design system |
| Animations | Framer Motion |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js (Google + Credentials) |
| Email | Resend |
| Storage | Cloudinary |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Charts | Recharts |
| PWA | Next.js manifest + service worker |

---

## 📁 Architecture

```
immo-vision-17/
├── app/                          # Next.js App Router
│   ├── page.tsx                   # Homepage
│   ├── estimation/               # Formulaire d’estimation
│   ├── biens/                    # Catalogue + fiches bien
│   ├── contact/                  # Page contact
│   ├── blog/                     # Blog SEO
│   ├── crm/                      # CRM Kanban
│   ├── espace-vendeur/           # Dashboard vendeur
│   ├── espace-acheteur/          # Portal acheteur
│   ├── immobilier-[city]/        # Pages SEO locales
│   ├── auth/                     # Login page
│   ├── api/                      # API routes
│   ├── sitemap.ts                # Sitemap automatique
│   └── robots.ts                 # Robots.txt
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── home/                     # Hero, Stats, Services, Promise...
│   ├── biens/                    # PropertyCard, Gallery, Filters...
│   ├── estimation/               # EstimationForm (4 steps)
│   ├── contact/                  # ContactForm
│   ├── crm/                      # CRMPipeline (Kanban drag&drop)
│   └── dashboard/                # VendeurDashboard, AcheteurDashboard
├── lib/
│   ├── utils.ts                  # Fonctions utilitaires
│   ├── types.ts                  # TypeScript types
│   └── constants.ts              # Constantes app
├── prisma/
│   └── schema.prisma             # Modèles DB complets
├── public/
│   ├── videos/drone-hero.mp4    # Vidéo hero (drone)
│   ├── images/                   # Images statiques
│   └── manifest.json             # PWA manifest
├── next.config.js
├── tailwind.config.ts
└── .env.example
```

---

## 🚀 Installation

```bash
# 1. Cloner et naviguer
cd immo-vision-17

# 2. Installer les dépendances
npm install

# 3. Copier les variables d'environnement
cp .env.example .env.local
# Remplir les valeurs dans .env.local

# 4. Initialiser la base de données
npx prisma db push

# 5. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 🔑 Variables d’environnement

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL PostgreSQL |
| `NEXTAUTH_SECRET` | Clé secrète NextAuth |
| `NEXTAUTH_URL` | URL du site |
| `RESEND_API_KEY` | Clé API Resend (emails) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary (images/vidéos) |
| `GOOGLE_CLIENT_ID` | Google OAuth |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps |

---

## 📊 Pages & Fonctionnalités

### Pages Publiques
| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Hero drone, stats, services, CTA |
| Estimation | `/estimation` | Formulaire 4 étapes + lead capture |
| Catalogue | `/biens` | Filtres, grille, carte |
| Fiche bien | `/biens/[slug]` | Gallery HD, VR, vidéo, calculateur |
| Contact | `/contact` | Formulaire + coordonnées |
| Blog | `/blog` | Articles SEO |
| SEO local | `/immobilier-royan` | Pages par ville |

### Espaces Privés
| Espace | URL | Description |
|--------|-----|-------------|
| Vendeur | `/espace-vendeur` | Stats, vues, contacts, visites |
| Acheteur | `/espace-acheteur` | Favoris, alertes, historique |
| CRM | `/crm` | Pipeline Kanban drag & drop |

---

## 🎨 Design System

**Couleurs principales :**
- `--gold: #C9A84C` — Accent premium
- `--dark: #0A0A0A` — Fond principal
- `--dark-100: #141414` — Surfaces

**Typographie :**
- Titres : Playfair Display (serif)
- Corps : Inter (sans-serif)

**Composants :**
- `.glass` — Glassmorphism
- `.glass-gold` — Glassmorphism doré
- `.btn-gold` — Bouton CTA principal
- `.btn-outline` — Bouton secondaire
- `.input-premium` — Champs formulaire
- `.property-card` — Carte bien avec hover
- `.text-gold-gradient` — Texte doré animé

---

## 📧 Automatisations à configurer

### Emails (Resend)
- [ ] Notification nouveau lead estimation
- [ ] Confirmation client
- [ ] Notification demande de visite
- [ ] Alerte nouvelle recherche sauvegardée

### Réseaux sociaux
- [ ] Publication automatique Facebook/Instagram via API
- [ ] Génération Reels/Stories depuis photos bien
- [ ] Reporting analytics hebdomadaire

### CRM
- [ ] Pipeline auto : estimation → nouveau dossier
- [ ] Rappels automatiques (no-response 48h)
- [ ] Compte-rendu visite par email

---

## 📱 Mobile

Le site est **Mobile First** avec :
- Responsive breakpoints Tailwind
- PWA installable (manifest.json)
- Navigation mobile avec menu drawer
- Formulaires optimisés tactile

---

## 🔍 SEO

Pages locales générées pour :
- Immobilier Royan
- Immobilier Rochefort  
- Immobilier Saintes
- Immobilier La Rochelle
- Immobilier Charente-Maritime
- + toutes communes de zone

Schema.org `RealEstateAgent` injecté en layout.
Sitemap XML auto-généré via `sitemap.ts`.

---

## 💻 Déploiement

**Recommandé : Vercel**
```bash
npx vercel --prod
```

Ou **Coolify / Railway** avec PostgreSQL inclus.

---

*Immo Vision 17 — Partenaire Efficity · Charente-Maritime*
