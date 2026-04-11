# DescluB — White-Label Loyalty App Prototype

Production-ready prototype for the DescluB loyalty/discount platform. Built as the reference implementation for Eduardo's React Native team.

**Live:** https://prototype-six-blush.vercel.app

## Quick Start

```bash
npm install
npm run dev          # localhost:5173
npm run build        # production build → dist/
```

Deploy: `npx vercel --yes --prod`

## Stack

- React 19 + Vite 8 + Tailwind CSS 4
- No router — useState navigation (maps to React Navigation in RN)
- No backend — hardcoded data in `src/data/`
- Deployed on Vercel

## Architecture

```
src/
  App.jsx                         # Root: ThemeProvider + AppProvider + screens
  context/
    AppContext.jsx                 # Global state: screen, tab, points, savedDeals
    ThemeContext.jsx               # CSS variable provider for white-label theming
  data/
    deals.js                      # 30 deals with Clearbit brand logos
    user.js                       # User profile (name, tier, points, savings)
    themes.js                     # White-label themes (DescluB, Disney, Scotiabank, TAMEX)
    notifications.js              # Mock notifications
  components/
    layout/
      IPhoneFrame.jsx             # Device bezel (desktop) / full-screen (mobile)
      StatusBar.jsx               # Fake iOS status bar (desktop only)
      TabBar.jsx                  # 5-tab bottom nav: Inicio, Ofertas, DC, Puntos, Cartera
      Header.jsx                  # Points pill, tier progress, bell, avatar
    shared/
      Onboarding.jsx              # 3-step: categories, location, welcome bonus
      RedemptionFlow.jsx          # QR + 15min countdown + confirm + success
      SearchBar.jsx               # Autocomplete search by brand/category
      NotificationsPanel.jsx      # Notification list overlay
      ThemeDemo.jsx               # White-label skin switcher
      WhatsAppButton.jsx          # WhatsApp CTA button
  screens/
    tabs/
      HomeScreen.jsx              # Inicio: search, categories, featured deals
      DealsScreen.jsx             # Ofertas: category filter + deal catalog
      RewardsScreen.jsx           # Puntos: balance, tier, experiences, transfers
      WalletScreen.jsx            # Cartera: card flip, savings, linked cards
    detail/
      DealDetailScreen.jsx        # Deal page: save, share, redeem, similar deals
      MapScreen.jsx               # Leaflet map with deal pins
    profile/
      ProfileSheet.jsx            # Settings, FAQ, notifications, logout
```

## Navigation

```
Login → Onboarding → Home (5 tabs)
  Inicio    → deals feed → Deal Detail → Redeem (QR + countdown + success)
  Ofertas   → category filter → Deal Detail
  DC        → QR membership card modal
  Puntos    → points, tier, rewards, transfers
  Cartera   → card flip, wallet, savings
  Bell      → Notifications panel
  Avatar    → Profile sheet (settings, FAQ, logout)
  Map       → deal pins → Deal Detail
```

## White-Label Theming

CSS variables swapped at runtime via ThemeContext:

```js
// src/data/themes.js
{ key: 'desclub', color: '#2196F3', accent: '#FF8C00', bg: '#000' }
{ key: 'disney',  color: '#6C3CE1', accent: '#FFD700', bg: '#0C0A1A' }
{ key: 'scotia',  color: '#EC111A', accent: '#FFFFFF', bg: '#1A0000' }
{ key: 'tamex',   color: '#00875A', accent: '#FFB800', bg: '#001A0F' }
```

Add a client: add entry to `themes.js`, it appears in the "Demo Clientes" theme switcher.

## Design Tokens

For React Native translation — extract from `src/index.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--color-primary-500` | `#2196F3` | Primary blue |
| `--color-accent-500` | `#FF8C00` | Orange accent |
| `--color-surface` | `#F7F8F9` | Light background |
| `--color-text-primary` | `#1A1A26` | Body text |
| `--color-text-secondary` | `#666B78` | Muted text |
| `--theme-primary` | Dynamic | White-label primary |
| `--theme-accent` | Dynamic | White-label accent |
| `--theme-bg` | Dynamic | White-label background |

## Brand Logos

All logos via Clearbit: `https://logo.clearbit.com/{domain}`

## Mobile Notes

- Desktop: iPhone 15 Pro bezel (393x852) with Dynamic Island
- Mobile: full-screen, no bezel
- Safe areas: `pt-safe` for notch, `env(safe-area-inset-bottom)` for home indicator
- IPhoneFrame uses `items-stretch md:items-center` (critical for mobile width)

## For Eduardo's Team

This is a visual and flow reference — not production code. Use it to:

1. See every screen at the live URL
2. Extract design tokens from `index.css`
3. Study component structure for React Native equivalents
4. Reference data format in `src/data/deals.js` for API design
5. Test white-label theming via "Demo Clientes" button
