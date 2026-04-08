const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'audit-shots-v2');
const BASE = 'http://localhost:3005';

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true });

  async function snap(page, name) {
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('  OK ' + name);
  }

  // === A - just check home header ===
  console.log('VERSION A - home header fix');
  const a = await ctx.newPage();
  await a.goto(BASE + '/#a', { waitUntil: 'networkidle' });
  await a.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(a, 'A-home-fixed');
  await a.close();

  // === C - check all tabs ===
  console.log('VERSION C - tab navigation + clipping fix');
  const c = await ctx.newPage();
  await c.goto(BASE + '/#c', { waitUntil: 'networkidle' });
  await c.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(c, 'C-explore');

  // Click Ofertas tab in bottom bar
  const tabButtons = c.locator('.shrink-0 button');
  // Tabs order: Explorar(0), Ofertas(1), DC(2), Puntos(3), Wallet(4)
  await tabButtons.nth(1).click();
  await snap(c, 'C-deals-tab');

  // Puntos tab
  await tabButtons.nth(3).click();
  await snap(c, 'C-rewards-tab');

  // Wallet tab
  await tabButtons.nth(4).click();
  await snap(c, 'C-wallet-tab');

  // Account modal
  await c.locator('button', { hasText: '👤' }).click();
  await snap(c, 'C-account-modal');

  await c.close();
  await browser.close();
  console.log(`Done: ${fs.readdirSync(OUT).length} screenshots`);
})();
