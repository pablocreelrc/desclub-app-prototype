# DescluB App Prototype

Reference implementation for Eduardo's React Native team. Every screen, flow, and interaction is built and functional.

**Live:** https://prototype-six-blush.vercel.app

## Quick Start

```bash
npm install
npm run dev          # localhost:5173
npm run build        # production build → dist/
```

## Stack

- React 19 + Vite 8 + Tailwind CSS 4
- No router — `useState` navigation (maps to React Navigation in RN)
- No backend — hardcoded data in `src/data/`
- Deployed on Vercel

## Architecture

```
src/
  App.jsx                         # Root app with login, onboarding, tab routing
  context/
    AppContext.jsx                 # Global state: screen, tab, points, savedDeals
    ThemeContext.jsx               # CSS variable provider for theming
  data/
    deals.js                      # 30 deals with brand logos
    user.js                       # User profile (name, tier, points, savings)
    themes.js                     # Theme configs
    notifications.js              # Mock notifications
  components/
    layout/
      IPhoneFrame.jsx             # Device bezel (desktop) / full-screen (mobile)
      StatusBar.jsx               # Fake iOS status bar (desktop only)
      TabBar.jsx                  # 5-tab bottom nav
      Header.jsx                  # Points pill, tier progress, bell, avatar
    shared/                       # Reusable components (onboarding, search, QR, etc.)
  screens/
    tabs/                         # 4 tab screens: Home, Deals, Rewards, Wallet
    detail/                       # Deal detail + Map
    profile/                      # Profile bottom sheet
```

## Navigation Map

```
Login → Onboarding (3 steps) → Home

  Inicio    → deals feed → Deal Detail → Redeem (QR + countdown + success)
  Ofertas   → category filter → Deal Detail
  DC        → QR membership card modal
  Puntos    → points balance, tier, rewards, transfers
  Cartera   → membership card flip, savings, linked cards
  Bell      → Notifications panel
  Avatar    → Profile (settings, FAQ, logout)
  Map       → deal pins → Deal Detail
```

## Design Tokens

Extract from `src/index.css` for React Native:

| Token | Value | Use |
|-------|-------|-----|
| `--color-primary-500` | `#2196F3` | Primary blue |
| `--color-accent-500` | `#FF8C00` | Orange accent |
| `--color-surface` | `#F7F8F9` | Light background |
| `--color-text-primary` | `#1A1A26` | Body text |
| `--color-text-secondary` | `#666B78` | Muted text |

## Deal Data Format

Every deal in `src/data/deals.js`:

```js
{ id, brand, discount, detail, dist, rating, cat, catKey,
  lat, lng, image, description, expiry, redeemed, terms, logo, points }
```

Brand logos: `https://logo.clearbit.com/{domain}`

## Mobile Rendering

- Desktop: iPhone 15 Pro bezel (393x852)
- Mobile: full-screen, no bezel
- Safe areas: `pt-safe` for notch, `env(safe-area-inset-bottom)` for home indicator
- `IPhoneFrame.jsx` uses `items-stretch md:items-center` on inner wrapper

## How to Use This

1. Open the live URL on desktop and phone
2. Walk through every screen — this IS the spec
3. Extract design tokens from `index.css`
4. Study component props and state patterns in `src/`
5. Reference `src/data/deals.js` for API contract design
