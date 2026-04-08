const { chromium } = require('playwright');
const path = require('path');

const OUTDIR = path.join(__dirname, 'audit-shots');
const BASE = 'http://localhost:3001';

(async () => {
  const fs = require('fs');
  if (!fs.existsSync(OUTDIR)) fs.mkdirSync(OUTDIR, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  async function shot(page, name, delay = 500) {
    await page.waitForTimeout(delay);
    await page.screenshot({ path: path.join(OUTDIR, `${name}.png`), fullPage: false });
    console.log(`  ✓ ${name}`);
  }

  // ────── VERSION A ──────
  console.log('\n=== VERSION A ===');
  const pA = await ctx.newPage();
  await pA.goto(`${BASE}/#a`);
  await shot(pA, 'A-01-login', 1000);

  // Login
  await pA.click('text=Continuar con Apple');
  await shot(pA, 'A-02-home', 800);

  // Click a deal
  const dealCards = pA.locator('button:has(img)').first();
  if (await dealCards.isVisible()) {
    await dealCards.click();
    await shot(pA, 'A-03-deal-detail', 500);

    // QR
    const canjear = pA.locator('text=Canjear descuento');
    if (await canjear.isVisible()) {
      await canjear.click();
      await shot(pA, 'A-04-qr-modal', 500);
      await pA.click('text=Cerrar');
    }
    // Back
    await pA.click('button:has-text("←")');
    await shot(pA, 'A-05-back-to-home', 300);
  }

  // Map tab
  await pA.click('text=Mapa');
  await shot(pA, 'A-06-map', 1000);

  // Card tab
  await pA.click('text=Tarjeta');
  await shot(pA, 'A-07-card', 500);

  // Profile tab
  await pA.click('text=Perfil');
  await shot(pA, 'A-08-profile', 500);

  // Logout
  await pA.click('text=Cerrar sesión');
  await shot(pA, 'A-09-back-to-login', 500);
  await pA.close();

  // ────── VERSION B ──────
  console.log('\n=== VERSION B ===');
  const pB = await ctx.newPage();
  await pB.goto(`${BASE}/#b`);
  await shot(pB, 'B-01-login', 1000);

  await pB.click('text=Continuar con Apple');
  await shot(pB, 'B-02-overview', 800);

  // Click a deal in overview
  const bDeal = pB.locator('button:has(img)').first();
  if (await bDeal.isVisible()) {
    await bDeal.click();
    await shot(pB, 'B-03-deal-detail', 500);
    // QR
    const bCanjear = pB.locator('text=Canjear descuento');
    if (await bCanjear.isVisible()) {
      await bCanjear.click();
      await shot(pB, 'B-04-qr-modal', 500);
      await pB.click('text=Cerrar');
    }
    await pB.click('button:has-text("←")');
    await pB.waitForTimeout(300);
  }

  // Membership card
  await pB.click('text=Tarjeta de Membresía');
  await shot(pB, 'B-05-membership-card', 500);
  await pB.click('text=✕');
  await pB.waitForTimeout(200);

  // Benefits tab
  await pB.click('text=Beneficios');
  await shot(pB, 'B-06-benefits', 500);

  // Mi Cuenta tab
  await pB.click('text=Mi Cuenta');
  await shot(pB, 'B-07-account-profile', 500);

  // Favorites sub-tab
  await pB.click('text=Favoritos');
  await shot(pB, 'B-08-account-favorites', 500);

  // Communications sub-tab
  await pB.click('text=Comunicaciones');
  await shot(pB, 'B-09-account-comms', 500);

  // Soporte tab
  await pB.click('text=Soporte');
  await shot(pB, 'B-10-support', 500);

  // Logout via ✕ header
  await pB.click('text=Overview');
  await pB.waitForTimeout(300);
  // Find the ✕ button in header
  const closeBtn = pB.locator('button:has-text("✕")').first();
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
    await shot(pB, 'B-11-back-to-login', 500);
  }
  await pB.close();

  // ────── VERSION C ──────
  console.log('\n=== VERSION C ===');
  const pC = await ctx.newPage();
  await pC.goto(`${BASE}/#c`);
  await shot(pC, 'C-01-login', 1000);

  await pC.click('text=Continuar con Apple');
  await shot(pC, 'C-02-explore', 800);

  // Click a deal
  const cDeal = pC.locator('button:has(img)').first();
  if (await cDeal.isVisible()) {
    await cDeal.click();
    await shot(pC, 'C-03-deal-detail', 500);
    // QR
    const cCanjear = pC.locator('text=Canjear descuento');
    if (await cCanjear.isVisible()) {
      await cCanjear.click();
      await shot(pC, 'C-04-qr-modal', 500);
      await pC.click('text=Cerrar');
    }
    await pC.click('button:has-text("←")');
    await pC.waitForTimeout(300);
  }

  // Deals tab (🏷)
  await pC.click('text=Ofertas');
  await shot(pC, 'C-05-deals', 500);

  // Center DC button
  await pC.click('text=DC');
  await shot(pC, 'C-06-qr-card-modal', 500);
  await pC.click('text=Cerrar');
  await pC.waitForTimeout(200);

  // Rewards tab
  await pC.click('text=Puntos');
  await shot(pC, 'C-07-rewards', 500);

  // Wallet tab
  await pC.click('text=Wallet');
  await shot(pC, 'C-08-wallet', 500);

  // Account modal via 👤
  await pC.click('text=👤');
  await shot(pC, 'C-09-account-modal', 500);

  // Logout
  await pC.click('text=Cerrar sesión');
  await shot(pC, 'C-10-back-to-login', 500);
  await pC.close();

  await browser.close();
  console.log(`\nDone! ${fs.readdirSync(OUTDIR).length} screenshots in audit-shots/`);
})();
