const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const OUT = path.join(__dirname, 'audit-v4');
const BASE = 'http://localhost:3006';
(async () => {
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
  fs.mkdirSync(OUT);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  async function snap(p, n) { await p.waitForTimeout(800); await p.screenshot({ path: path.join(OUT, n+'.png') }); console.log('  OK '+n); }
  const a = await ctx.newPage();
  await a.goto(BASE+'/#a', { waitUntil: 'networkidle' });
  await a.locator('button', { hasText: 'Continuar con Apple' }).click();
  await snap(a, 'A-home');
  await a.close();
  await browser.close();
  console.log('Done');
})();
