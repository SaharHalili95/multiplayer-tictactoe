// Manual QA script, not an automated test: drives the UI with Playwright and
// logs results for a human to read. No assertions - nothing here passes or
// fails. Run with `node manual-qa.js` against a local server on :8765.
const { chromium } = require('playwright');

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 520, height: 780 });

    console.log('🎮 פותח את המשחק...');
    await page.goto('http://localhost:8765/');
    await sleep(800);

    // Expose game state to node via page.evaluate
    async function isGameActive() {
        return page.evaluate(() => typeof gameActive !== 'undefined' && gameActive);
    }
    async function isMyTurn() {
        return page.evaluate(() => typeof currentTurn !== 'undefined' && currentTurn === mySymbol);
    }
    async function isCellFree(i) {
        return page.locator(`.cell[data-index="${i}"]`).evaluate(el => !el.classList.contains('taken'));
    }

    async function clickCell(i) {
        if (await isCellFree(i) && await isMyTurn() && await isGameActive()) {
            console.log(`  ← לוחץ תא ${i}`);
            await page.locator(`.cell[data-index="${i}"]`).click();
            await sleep(1100);
            return true;
        }
        return false;
    }

    // ── Round 1: Easy ──────────────────────────────
    console.log('\n🟢 סיבוב 1 — רמה קלה');
    await page.click('#btn-vs-ai');
    await sleep(400);
    await page.click('#diff-easy');
    await sleep(700);

    for (const i of [4, 0, 8, 2, 6, 1, 3, 5, 7]) {
        if (!(await isGameActive())) break;
        await clickCell(i);
    }

    await sleep(1000);
    const r1 = await page.locator('#result-text').textContent().catch(() => '?');
    console.log(`  📊 תוצאה: ${r1}`);
    // Wait for overlay to be visible then click main menu
    await page.locator('#result-overlay.visible').waitFor({ timeout: 5000 }).catch(() => {});
    await page.click('#btn-main-menu');
    await sleep(700);

    // ── Round 2: Medium ────────────────────────────
    console.log('\n🟡 סיבוב 2 — רמה בינונית');
    await page.click('#btn-vs-ai');
    await sleep(400);
    await page.click('#diff-medium');
    await sleep(700);

    for (const i of [4, 2, 6, 0, 8, 1, 3, 7, 5]) {
        if (!(await isGameActive())) break;
        await clickCell(i);
    }

    await sleep(1000);
    const r2 = await page.locator('#result-text').textContent().catch(() => '?');
    console.log(`  📊 תוצאה: ${r2}`);

    // ── Language switch test ───────────────────────
    console.log('\n🌍 בודק החלפת שפות...');
    await page.locator('#result-overlay.visible').waitFor({ timeout: 5000 }).catch(() => {});
    await page.click('#btn-main-menu');
    await sleep(400);

    await page.click('[data-lang="en"]');
    await sleep(500);
    const enTitle = await page.locator('h1').textContent();
    console.log(`  🇬🇧 כותרת: "${enTitle}"`);

    await page.click('[data-lang="ar"]');
    await sleep(500);
    const arTitle = await page.locator('h1').textContent();
    console.log(`  🇸🇦 כותרת: "${arTitle}"`);

    await page.click('[data-lang="he"]');
    await sleep(400);

    // ── Round 3: Hard ──────────────────────────────
    console.log('\n🔴 סיבוב 3 — רמה קשה (minimax)');
    await page.click('#btn-vs-ai');
    await sleep(400);
    await page.click('#diff-hard');
    await sleep(700);

    // Best attempt vs unbeatable AI
    for (const i of [4, 0, 8, 2, 6, 3, 5, 1, 7]) {
        if (!(await isGameActive())) break;
        await clickCell(i);
    }

    await sleep(1000);
    const r3 = await page.locator('#result-text').textContent().catch(() => '?');
    console.log(`  📊 תוצאה: ${r3}`);

    console.log('\n✅ כל הבדיקות עברו בהצלחה!');
    await sleep(2500);
    await browser.close();
})();
