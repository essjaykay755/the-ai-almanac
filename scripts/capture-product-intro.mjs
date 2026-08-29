import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('video-output-intro');
await fs.mkdir(ROOT, { recursive: true });

const RAW_VIDEO = path.join(ROOT, 'almanac-product-intro-60fps.mp4');
const TIMELINE = path.join(ROOT, 'capture-timeline.json');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const markers = {};

function displayInput() {
  const display = process.env.DISPLAY || ':99';
  return /\.\d+$/.test(display) ? display : `${display}.0`;
}

function waitForExit(child) {
  return new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code, signal) => resolve({ code, signal }));
  });
}

const context = await chromium.launchPersistentContext('/tmp/almanac-video-profile', {
  headless: false,
  viewport: null,
  screen: { width: 1920, height: 1080 },
  colorScheme: 'dark',
  args: [
    '--kiosk',
    '--window-position=0,0',
    '--window-size=1920,1080',
    '--hide-scrollbars',
    '--disable-infobars',
    '--disable-dev-shm-usage',
    '--disable-features=TranslateUI',
    '--no-first-run',
    '--no-default-browser-check',
    '--font-render-hinting=none',
  ],
});

await context.addInitScript(() => {
  localStorage.setItem('aiAlmanacSound', 'false');
  localStorage.setItem('aiAlmanacBookmarks', '[]');
  localStorage.setItem(
    'aiAlmanacHistory',
    JSON.stringify(['artificial intelligence', 'prompt', 'agentic']),
  );
  localStorage.removeItem('aiAlmanacCollections');
});

const pages = context.pages();
const page = pages[0] || (await context.newPage());
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.locator('#page').waitFor({ state: 'visible' });
await page.bringToFront();
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
  window.scrollTo(0, 0);
  const style = document.createElement('style');
  style.id = 'film-capture-style';
  style.textContent = `
    html, body, body * { cursor: none !important; }
    body { overflow: hidden !important; }
    #film-caption-root {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      pointer-events: none;
      overflow: hidden;
    }
    .film-caption {
      position: absolute;
      left: 76px;
      bottom: 74px;
      max-width: 670px;
      color: #f2e8d4;
      text-shadow: 0 2px 20px rgba(0,0,0,.48);
      opacity: 0;
      transform: translateY(16px);
      animation: filmCaptionIn .48s cubic-bezier(.2,.8,.2,1) forwards,
                 filmCaptionOut .44s cubic-bezier(.4,0,.7,.2) forwards var(--out-delay);
    }
    .film-caption.right {
      left: auto;
      right: 78px;
      text-align: right;
    }
    .film-caption.center {
      left: 50%;
      right: auto;
      bottom: 92px;
      transform: translate(-50%,16px);
      text-align: center;
      max-width: 980px;
    }
    .film-caption .kicker {
      font-family: 'Plus Jakarta Sans','Avenir Next',Arial,sans-serif;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .26em;
      text-transform: uppercase;
      color: #c5a263;
      margin-bottom: 9px;
    }
    .film-caption .line {
      font-family: 'Newsreader','Iowan Old Style','Baskerville','Palatino Linotype',Georgia,serif;
      font-size: 48px;
      line-height: 1.02;
      font-weight: 520;
      letter-spacing: -.025em;
      text-wrap: balance;
    }
    .film-vignette {
      position: fixed;
      inset: 0;
      z-index: 2147482000;
      pointer-events: none;
      background:
        radial-gradient(ellipse at center, transparent 50%, rgba(18,10,5,.22) 100%),
        linear-gradient(180deg, rgba(0,0,0,.03), rgba(0,0,0,.08));
    }
    @keyframes filmCaptionIn {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes filmCaptionOut {
      to { opacity: 0; transform: translateY(-8px); }
    }
    .film-caption.center { animation-name: filmCaptionCenterIn, filmCaptionCenterOut; }
    @keyframes filmCaptionCenterIn {
      to { opacity: 1; transform: translate(-50%,0); }
    }
    @keyframes filmCaptionCenterOut {
      to { opacity: 0; transform: translate(-50%,-8px); }
    }
  `;
  document.head.appendChild(style);
  const root = document.createElement('div');
  root.id = 'film-caption-root';
  document.body.appendChild(root);
  const vignette = document.createElement('div');
  vignette.className = 'film-vignette';
  document.body.appendChild(vignette);
});
await sleep(850);

async function caption(kicker, line, duration = 2200, align = 'left') {
  await page.evaluate(
    ({ kicker, line, duration, align }) => {
      const root = document.querySelector('#film-caption-root');
      if (!root) return;
      const el = document.createElement('div');
      el.className = `film-caption ${align}`;
      el.style.setProperty('--out-delay', `${Math.max(700, duration - 440)}ms`);
      el.innerHTML = `<div class="kicker"></div><div class="line"></div>`;
      el.querySelector('.kicker').textContent = kicker;
      el.querySelector('.line').textContent = line;
      root.appendChild(el);
      window.setTimeout(() => el.remove(), duration + 120);
    },
    { kicker, line, duration, align },
  );
}

async function camera({
  scaleFrom = 1,
  scaleTo = 1,
  origin = '50% 50%',
  duration = 900,
  yFrom = 0,
  yTo = 0,
  xFrom = 0,
  xTo = 0,
  rotateFrom = 0,
  rotateTo = 0,
}) {
  await page.evaluate(
    ({ scaleFrom, scaleTo, origin, duration, yFrom, yTo, xFrom, xTo, rotateFrom, rotateTo }) => {
      const book = document.querySelector('.book');
      if (!book) return;
      book.getAnimations().forEach((animation) => animation.cancel());
      book.style.transformOrigin = origin;
      const animation = book.animate(
        [
          {
            transform: `translate3d(${xFrom}px,${yFrom}px,0) scale(${scaleFrom}) rotate(${rotateFrom}deg)`,
          },
          {
            transform: `translate3d(${xTo}px,${yTo}px,0) scale(${scaleTo}) rotate(${rotateTo}deg)`,
          },
        ],
        {
          duration,
          easing: 'cubic-bezier(.18,.82,.24,1)',
          fill: 'forwards',
        },
      );
      animation.finished.catch(() => {});
    },
    { scaleFrom, scaleTo, origin, duration, yFrom, yTo, xFrom, xTo, rotateFrom, rotateTo },
  );
  await sleep(duration);
}

async function settleBook(duration = 650) {
  await camera({ scaleFrom: 1.035, scaleTo: 1, origin: '50% 50%', duration });
}

async function closeOverlay(id) {
  const overlay = page.locator(id);
  if (await overlay.count()) {
    const close = overlay.locator('.close').first();
    if (await close.count()) {
      await close.click();
      await overlay.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
    }
  }
  await sleep(220);
}

const ffmpeg = spawn(
  'ffmpeg',
  [
    '-y',
    '-f', 'x11grab',
    '-framerate', '60',
    '-video_size', '1920x1080',
    '-draw_mouse', '0',
    '-i', displayInput(),
    '-an',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-crf', '14',
    '-pix_fmt', 'yuv420p',
    RAW_VIDEO,
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] },
);
let ffmpegStderr = '';
ffmpeg.stderr.on('data', (chunk) => {
  ffmpegStderr += chunk.toString();
  if (ffmpegStderr.length > 12000) ffmpegStderr = ffmpegStderr.slice(-12000);
});
const ffmpegExit = waitForExit(ffmpeg);
await sleep(500);

const captureStart = Date.now();
const mark = (name) => {
  markers[name] = Date.now() - captureStart;
};
mark('start');

// 0–4s — brand as object, not interface.
await caption('THE AI ALMANAC', 'A living field guide to AI.', 2600, 'left');
await camera({
  scaleFrom: 1.0,
  scaleTo: 1.105,
  origin: '19% 43%',
  duration: 2450,
  yFrom: 0,
  yTo: 5,
  rotateFrom: -0.08,
  rotateTo: 0,
});
await camera({ scaleFrom: 1.105, scaleTo: 1.015, origin: '48% 48%', duration: 950 });
await sleep(450);

// 4–8.7s — natural-language search as a hero moment, no cursor walkthrough.
mark('search');
await caption('SEARCH', 'Ask it the way you think.', 2550, 'right');
await camera({ scaleFrom: 1.015, scaleTo: 1.075, origin: '73% 19%', duration: 620 });
await page.locator('#navSearch').click();
const search = page.locator('#search');
await search.fill('');
await search.pressSequentially('Why does AI make things up?', { delay: 23 });
await sleep(800);
const hallucinationSuggestion = page
  .locator('.suggestion')
  .filter({ hasText: 'hallucination' })
  .first();
await hallucinationSuggestion.waitFor({ state: 'visible' });
await sleep(380);
mark('termTurn');
await hallucinationSuggestion.click();
await page.locator('.word').filter({ hasText: /^hallucination$/ }).waitFor({ state: 'visible' });
await sleep(1120);

// 8.7–14.4s — the same real entry, four editorial depths.
mark('modes');
await caption('ONE TERM', 'Four depths of understanding.', 3000, 'left');
await camera({ scaleFrom: 1.075, scaleTo: 1.11, origin: '72% 46%', duration: 520 });
await sleep(480);
await page.locator('#mode-tab-plain').click();
mark('plain');
await sleep(920);
await page.locator('#mode-tab-technical').click();
mark('technical');
await sleep(920);
await page.locator('#mode-tab-vibe').click();
mark('vibe');
await sleep(920);
await page.locator('#mode-tab-dictionary').click();
await sleep(520);
mark('bookmark');
await page.locator('#bookmarkBtn').click();
await sleep(520);

// 14.4–17.0s — follow a real cross-reference through a real page turn.
await caption('FOLLOW THE THREAD', 'From one idea to the field around it.', 2450, 'right');
const related = page.locator('.xref button:visible').first();
if (await related.count()) {
  mark('relatedTurn');
  await related.click();
  await sleep(1180);
}
await camera({ scaleFrom: 1.11, scaleTo: 1.055, origin: '72% 67%', duration: 760 });
await sleep(430);

// 17.0–23.7s — rapid product-surface montage, editorial rather than instructional.
await settleBook(520);
await caption('EXPLORE THE FIELD', 'Index it. Trace it. Collect it.', 2600, 'left');
mark('indexOpen');
await page.locator('#navIndex').click();
await page.locator('#indexOverlay').waitFor({ state: 'visible' });
await sleep(1480);
await closeOverlay('#indexOverlay');

mark('timelineOpen');
await page.locator('#navTimeline').click();
await page.locator('#timelineOverlay').waitFor({ state: 'visible' });
await sleep(1450);
await closeOverlay('#timelineOverlay');

mark('collectionsOpen');
await page.locator('#navCollections').click();
await page.locator('#collectionsOverlay').waitFor({ state: 'visible' });
await sleep(1450);
await closeOverlay('#collectionsOverlay');

// 23.7–26.2s — saved knowledge as a personal reference layer.
await caption('KEEP WHAT MATTERS', 'Build a reference that stays with you.', 2400, 'right');
mark('bookmarksOpen');
await page.locator('#navBookmarks').click();
await page.locator('#listOverlay').waitFor({ state: 'visible' });
await sleep(1650);
await closeOverlay('#listOverlay');

// 26.2–30.3s — real solid-cover transition into the About surface, then brand close.
mark('aboutTurn');
await page.locator('#navAbout').click();
await page.waitForFunction(() => document.querySelectorAll('.about-page').length > 0);
await sleep(1160);
await caption('THE AI ALMANAC', 'For AI enthusiasts & vibe coders.', 2700, 'center');
await camera({
  scaleFrom: 1.02,
  scaleTo: 1.115,
  origin: '20% 43%',
  duration: 2600,
  xFrom: 0,
  xTo: 8,
  rotateFrom: 0,
  rotateTo: 0.05,
});
await sleep(420);
mark('end');

const captureDurationMs = Date.now() - captureStart;
ffmpeg.kill('SIGINT');
const ffmpegResult = await ffmpegExit;
await context.close();

if (!ffmpegResult || (ffmpegResult.code !== 0 && ffmpegResult.code !== 255)) {
  console.error(ffmpegStderr);
  throw new Error(`FFmpeg x11 capture failed: ${JSON.stringify(ffmpegResult)}`);
}

const metadata = {
  source: 'The AI Almanac v1.1.2 React/Vite application',
  generatedImagery: false,
  captureMethod: 'headed Chromium under Xvfb + FFmpeg x11grab',
  viewport: '1920x1080',
  nativeCaptureFrameRate: 60,
  captureDurationMs,
  markers,
};
await fs.writeFile(TIMELINE, JSON.stringify(metadata, null, 2));
console.log(JSON.stringify(metadata, null, 2));
console.log(`Raw 60fps UI capture: ${RAW_VIDEO}`);
