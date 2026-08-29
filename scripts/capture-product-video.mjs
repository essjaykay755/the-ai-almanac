import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('video-output');
const RAW_DIR = path.join(ROOT, 'raw');
await fs.mkdir(RAW_DIR, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const markers = {};

const browser = await chromium.launch({
  headless: true,
  args: [
    '--hide-scrollbars',
    '--disable-dev-shm-usage',
    '--font-render-hinting=none',
  ],
});

const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  screen: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  colorScheme: 'dark',
  recordVideo: {
    dir: RAW_DIR,
    size: { width: 1920, height: 1080 },
  },
});

await context.addInitScript(() => {
  localStorage.setItem('aiAlmanacSound', 'false');
  localStorage.setItem('aiAlmanacBookmarks', '[]');
  localStorage.setItem('aiAlmanacHistory', JSON.stringify(['artificial intelligence']));
  localStorage.removeItem('aiAlmanacCollections');
});

const recordingStartedAt = Date.now();
const page = await context.newPage();
const recordedVideo = page.video();

const mark = (name, captureStart) => {
  markers[name] = Date.now() - captureStart;
};

async function animateBook(scaleFrom, scaleTo, origin = '70% 45%', duration = 650) {
  await page.evaluate(
    ({ scaleFrom, scaleTo, origin, duration }) => {
      const book = document.querySelector('.book');
      if (!book) return;
      book.getAnimations().forEach((animation) => animation.cancel());
      book.style.transformOrigin = origin;
      const animation = book.animate(
        [
          { transform: `scale(${scaleFrom}) translateZ(0)` },
          { transform: `scale(${scaleTo}) translateZ(0)` },
        ],
        {
          duration,
          easing: 'cubic-bezier(.22,.8,.25,1)',
          fill: 'forwards',
        },
      );
      animation.finished.catch(() => {});
    },
    { scaleFrom, scaleTo, origin, duration },
  );
  await sleep(duration);
}

async function resetBook(duration = 500) {
  await page.evaluate((duration) => {
    const book = document.querySelector('.book');
    if (!book) return;
    const current = getComputedStyle(book).transform;
    book.getAnimations().forEach((animation) => animation.cancel());
    const animation = book.animate(
      [
        { transform: current === 'none' ? 'scale(1.04)' : current },
        { transform: 'scale(1) translateZ(0)' },
      ],
      {
        duration,
        easing: 'cubic-bezier(.22,.8,.25,1)',
        fill: 'forwards',
      },
    );
    animation.finished.catch(() => {});
  }, duration);
  await sleep(duration);
}

await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.locator('#page').waitFor({ state: 'visible' });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
  window.scrollTo(0, 0);
});
await sleep(350);

const captureStart = Date.now();
markers.captureStart = 0;

// Establish the actual tactile book UI.
await page.evaluate(() => {
  const book = document.querySelector('.book');
  if (!book) return;
  book.style.transformOrigin = '50% 50%';
  book.animate(
    [
      { opacity: 0.25, transform: 'scale(.968) translateY(10px)' },
      { opacity: 1, transform: 'scale(1) translateY(0)' },
    ],
    {
      duration: 900,
      easing: 'cubic-bezier(.18,.82,.25,1)',
      fill: 'forwards',
    },
  );
});
await sleep(1550);

// Use the real search component and real semantic suggestion engine.
mark('searchFocus', captureStart);
await page.locator('#navSearch').click();
await sleep(220);
await animateBook(1, 1.045, '73% 20%', 420);
const search = page.locator('#search');
await search.fill('');
await search.pressSequentially('Why does AI make things up?', { delay: 54 });
await sleep(650);
mark('searchTyped', captureStart);

const hallucinationSuggestion = page
  .locator('.suggestion')
  .filter({ hasText: 'hallucination' })
  .first();
await hallucinationSuggestion.waitFor({ state: 'visible' });
mark('termTurn', captureStart);
await hallucinationSuggestion.click();
await page.locator('.word').filter({ hasText: /^hallucination$/ }).waitFor({ state: 'visible' });
await sleep(1250); // includes the app's real ~940ms page-turn animation.

// Settle on the entry and show the real explanation modes.
await animateBook(1.045, 1.075, '72% 48%', 400);
mark('dictionary', captureStart);
await sleep(650);

await page.locator('#mode-tab-plain').click();
mark('plain', captureStart);
await sleep(1050);

await page.locator('#mode-tab-technical').click();
mark('technical', captureStart);
await sleep(1050);

await page.locator('#mode-tab-vibe').click();
mark('vibe', captureStart);
await sleep(1050);

// Return to the canonical definition for the save interaction.
await page.locator('#mode-tab-dictionary').click();
await sleep(520);
mark('bookmark', captureStart);
await page.locator('#bookmarkBtn').click();
await sleep(750);

// Briefly show a real secondary product surface.
await resetBook(450);
mark('indexOpen', captureStart);
await page.locator('#navIndex').click();
await page.locator('#indexOverlay').waitFor({ state: 'visible' });
await sleep(1200);
await page.locator('#indexOverlay .close').click();
await page.locator('#indexOverlay').waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
await sleep(320);

// Use the app's real solid-cover page transition into About.
mark('aboutTurn', captureStart);
await page.locator('#navAbout').click();
await page.locator('.about-page').waitFor({ state: 'visible' });
await sleep(1050);
await page.evaluate(() => {
  const about = document.querySelector('.about-page');
  if (!about) return;
  about.animate(
    [
      { transform: 'scale(1)', filter: 'brightness(1)' },
      { transform: 'scale(1.025)', filter: 'brightness(1.035)' },
    ],
    {
      duration: 1200,
      easing: 'cubic-bezier(.2,.75,.3,1)',
      fill: 'forwards',
    },
  );
});
await sleep(1550);

const captureEnd = Date.now();
markers.captureEnd = captureEnd - captureStart;

await context.close();
const sourceVideoPath = await recordedVideo.path();
const rawOutput = path.join(ROOT, 'almanac-real-ui.webm');
await fs.copyFile(sourceVideoPath, rawOutput);
await browser.close();

const metadata = {
  videoStartedAtEpochMs: recordingStartedAt,
  captureStartOffsetMs: captureStart - recordingStartedAt,
  captureDurationMs: captureEnd - captureStart,
  markers,
  source: 'The AI Almanac v1.1.2 React/Vite application',
  generatedImagery: false,
  viewport: '1920x1080',
};
await fs.writeFile(path.join(ROOT, 'capture-timeline.json'), JSON.stringify(metadata, null, 2));

console.log(JSON.stringify(metadata, null, 2));
console.log(`Raw UI recording: ${rawOutput}`);
