const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'audit-v3');
const BASE = 'http://localhost:3006';

(async () => {
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
  fs.mkdirSync(OUT);
  const browser = await chromium.launch();

  // Test on mobile viewport (like a real phone)
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  });

  async function snap(page, name) {
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('  OK ' + name);
  }

  // Version A — full journey on mobile
  console.log('=== VERSION A (mobile) ===');
  const a = await ctx.newPage();
  await a.goto(BASE + '/#a', { waitUntil: 'networkidle' });
  await snap(a, 'A1-login');
  await a.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(a, 'A2-home');
  // Scroll down
  await a.evaluate(() => document.querySelector('.overflow-y-auto')?.scrollBy(0, 300));
  await snap(a, 'A3-home-scroll');
  // Tab: Map
  await a.locator('button', { hasText: 'Mapa' }).click();
  await a.waitForTimeout(1500);
  await snap(a, 'A4-map');
  // Tab: Card
  await a.locator('button', { hasText: 'Tarjeta' }).click();
  await snap(a, 'A5-card');
  // Tab: Profile
  await a.locator('button', { hasText: 'Perfil' }).click();
  await snap(a, 'A6-profile');
  // Back to home
  await a.locator('button', { hasText: 'Inicio' }).click();
  await snap(a, 'A7-home-again');
  await a.close();

  // Version B — quick check
  console.log('=== VERSION B (mobile) ===');
  const b = await ctx.newPage();
  await b.goto(BASE + '/#b', { waitUntil: 'networkidle' });
  await snap(b, 'B1-login');
  await b.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(b, 'B2-overview');
  await b.close();

  // Version C — quick check
  console.log('=== VERSION C (mobile) ===');
  const c = await ctx.newPage();
  await c.goto(BASE + '/#c', { waitUntil: 'networkidle' });
  await snap(c, 'C1-login');
  await c.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(c, 'C2-explore');
  await c.close();

  await browser.close();
  console.log(`\nDone: ${fs.readdirSync(OUT).length} screenshots`);
})();
