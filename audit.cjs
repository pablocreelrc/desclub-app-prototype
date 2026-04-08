const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'audit-shots');
const BASE = 'http://localhost:3003';

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true });

  async function snap(page, name) {
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('  OK ' + name);
  }

  // === A ===
  console.log('VERSION A');
  const a = await ctx.newPage();
  await a.goto(BASE + '/#a', { waitUntil: 'networkidle' });
  await snap(a, 'A01-login');
  await a.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(a, 'A02-home');
  // click first deal card image
  await a.locator('.grid button').first().click().catch(() => {});
  await snap(a, 'A03-deal-detail');
  await a.locator('button', { hasText: 'Canjear descuento' }).click().catch(() => {});
  await snap(a, 'A04-qr');
  await a.locator('button', { hasText: 'Cerrar' }).click().catch(() => {});
  await a.locator('button:has-text("←")').click().catch(() => {});
  await snap(a, 'A05-back-home');
  // tabs
  await a.locator('button', { hasText: 'Mapa' }).click().catch(() => {});
  await a.waitForTimeout(1500);
  await snap(a, 'A06-map');
  await a.locator('button', { hasText: 'Tarjeta' }).click().catch(() => {});
  await snap(a, 'A07-card');
  await a.locator('button', { hasText: 'Perfil' }).click().catch(() => {});
  await snap(a, 'A08-profile');
  await a.locator('button', { hasText: 'Cerrar sesión' }).click().catch(() => {});
  await snap(a, 'A09-logout');
  await a.close();

  // === B ===
  console.log('VERSION B');
  const b = await ctx.newPage();
  await b.goto(BASE + '/#b', { waitUntil: 'networkidle' });
  await snap(b, 'B01-login');
  await b.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(b, 'B02-overview');
  // scroll down to see more
  await b.evaluate(() => document.querySelector('.overflow-y-auto')?.scrollBy(0, 400));
  await snap(b, 'B03-overview-scroll');
  // membership card
  await b.evaluate(() => document.querySelector('.overflow-y-auto')?.scrollTo(0, 0));
  await b.locator('button', { hasText: 'Tarjeta de Membresía' }).click().catch(() => {});
  await snap(b, 'B04-card-modal');
  // close modal - click outside
  await b.locator('.bg-black\\/80').click({ position: { x: 196, y: 100 } }).catch(() => {});
  await b.waitForTimeout(300);
  // Benefits
  await b.locator('button', { hasText: 'Beneficios' }).click().catch(() => {});
  await snap(b, 'B05-benefits');
  // Mi Cuenta
  await b.locator('button', { hasText: 'Mi Cuenta' }).click().catch(() => {});
  await snap(b, 'B06-account');
  await b.locator('button', { hasText: 'Favoritos' }).click().catch(() => {});
  await snap(b, 'B07-favorites');
  await b.locator('button', { hasText: 'Comunicaciones' }).click().catch(() => {});
  await snap(b, 'B08-comms');
  // Soporte
  await b.locator('button', { hasText: 'Soporte' }).click().catch(() => {});
  await snap(b, 'B09-support');
  // Deal click from overview
  await b.locator('button', { hasText: 'Overview' }).click();
  await b.waitForTimeout(300);
  await b.locator('button:has(img)').first().click().catch(() => {});
  await snap(b, 'B10-deal-detail');
  await b.locator('button', { hasText: 'Canjear descuento' }).click().catch(() => {});
  await snap(b, 'B11-qr');
  await b.locator('button', { hasText: 'Cerrar' }).click().catch(() => {});
  await b.locator('button:has-text("←")').click().catch(() => {});
  // Logout via X
  await b.locator('button:has-text("✕")').first().click().catch(() => {});
  await snap(b, 'B12-logout');
  await b.close();

  // === C ===
  console.log('VERSION C');
  const c = await ctx.newPage();
  await c.goto(BASE + '/#c', { waitUntil: 'networkidle' });
  await snap(c, 'C01-login');
  await c.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(c, 'C02-explore');
  // scroll
  await c.evaluate(() => document.querySelector('.overflow-y-auto')?.scrollBy(0, 400));
  await snap(c, 'C03-explore-scroll');
  // deal click
  await c.evaluate(() => document.querySelector('.overflow-y-auto')?.scrollTo(0, 0));
  await c.locator('button:has(img)').first().click().catch(() => {});
  await snap(c, 'C04-deal-detail');
  await c.locator('button', { hasText: 'Canjear descuento' }).click().catch(() => {});
  await snap(c, 'C05-qr');
  await c.locator('button', { hasText: 'Cerrar' }).click().catch(() => {});
  await c.locator('button:has-text("←")').click().catch(() => {});
  await c.waitForTimeout(300);
  // Ofertas tab
  await c.locator('button', { hasText: 'Ofertas' }).last().click().catch(() => {});
  await snap(c, 'C06-deals');
  // DC center button
  await c.locator('button:has-text("DC")').click().catch(() => {});
  await snap(c, 'C07-dc-qr');
  await c.locator('button', { hasText: 'Cerrar' }).click().catch(() => {});
  // Puntos
  await c.locator('button', { hasText: 'Puntos' }).last().click().catch(() => {});
  await snap(c, 'C08-rewards');
  // Wallet
  await c.locator('button', { hasText: 'Wallet' }).last().click().catch(() => {});
  await snap(c, 'C09-wallet');
  // Account modal
  await c.locator('button', { hasText: '👤' }).click().catch(() => {});
  await snap(c, 'C10-account');
  // Logout
  await c.locator('button', { hasText: 'Cerrar sesión' }).click().catch(() => {});
  await snap(c, 'C11-logout');
  await c.close();

  await browser.close();
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png'));
  console.log(`\nDone: ${files.length} screenshots in audit-shots/`);
})();
