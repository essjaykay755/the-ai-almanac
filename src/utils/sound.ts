// Audio management with preloaded real recordings & Web Audio synthesis fallback

let audioCtx: AudioContext | null = null;
let pageFlipBuffer: AudioBuffer | null = null;
let pageFlipEncoded: ArrayBuffer | null = null;
let bufferLoadPromise: Promise<void> | null = null;
let unlockPromise: Promise<boolean> | null = null;
let unlockHandler: ((event: Event) => void) | null = null;
let pageFlipAudio: HTMLAudioElement | null = null;
let paperTearAudio: HTMLAudioElement | null = null;

function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\/+/, '')}`;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  if (audioCtx?.state === 'closed') {
    audioCtx = null;
  }

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  return audioCtx;
}

function isWebAudioReady(): boolean {
  return Boolean(audioCtx && audioCtx.state === 'running');
}

async function decodePageFlipBuffer(): Promise<void> {
  const ctx = audioCtx;
  if (!ctx || ctx.state !== 'running' || !pageFlipEncoded || pageFlipBuffer) return;

  try {
    // decodeAudioData may consume/detach its input in some implementations.
    pageFlipBuffer = await ctx.decodeAudioData(pageFlipEncoded.slice(0));
  } catch (err) {
    console.debug('Failed to decode page flip audio buffer', err);
  }
}

function removeUnlockListeners() {
  if (typeof window === 'undefined' || !unlockHandler) return;
  window.removeEventListener('pointerdown', unlockHandler, true);
  window.removeEventListener('touchstart', unlockHandler, true);
  window.removeEventListener('keydown', unlockHandler, true);
  unlockHandler = null;
}

function unlockAudio(): Promise<boolean> {
  const ctx = getAudioContext();
  if (!ctx) return Promise.resolve(false);

  if (ctx.state === 'running') {
    removeUnlockListeners();
    void decodePageFlipBuffer();
    return Promise.resolve(true);
  }

  if (unlockPromise) return unlockPromise;

  unlockPromise = (async () => {
    try {
      await ctx.resume();
    } catch (err) {
      console.debug('Unable to resume audio context', err);
    }

    const running = ctx.state === 'running';
    if (running) {
      removeUnlockListeners();
      void decodePageFlipBuffer();
    }
    return running;
  })().finally(() => {
    unlockPromise = null;
  });

  return unlockPromise;
}

function installUnlockListeners() {
  if (typeof window === 'undefined' || unlockHandler || isWebAudioReady()) return;

  unlockHandler = () => {
    // Resume synchronously from the first genuine user gesture. Playback helpers
    // never queue sources while suspended, so a missed cue cannot flush later.
    void unlockAudio();
  };

  window.addEventListener('pointerdown', unlockHandler, true);
  window.addEventListener('touchstart', unlockHandler, true);
  window.addEventListener('keydown', unlockHandler, true);
}

function prepareAudioElement(url: string): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  try {
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.load();
    return audio;
  } catch {
    return null;
  }
}

export function preloadAudio() {
  if (typeof window === 'undefined') return;

  installUnlockListeners();

  if (!pageFlipAudio) {
    pageFlipAudio = prepareAudioElement(assetUrl('sounds/page-flip.mp3'));
  }
  if (!paperTearAudio) {
    paperTearAudio = prepareAudioElement(assetUrl('sounds/paper-tear.mp3'));
  }

  if (pageFlipBuffer || pageFlipEncoded || bufferLoadPromise) return;

  bufferLoadPromise = fetch(assetUrl('sounds/page-flip.mp3'), { cache: 'force-cache' })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Audio preload failed with ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then((arrayBuffer) => {
      pageFlipEncoded = arrayBuffer;
      return decodePageFlipBuffer();
    })
    .catch((err) => {
      console.debug('Failed to preload page flip audio', err);
    })
    .finally(() => {
      bufferLoadPromise = null;
    });
}

function playBuffer(buffer: AudioBuffer, volume = 0.65) {
  const ctx = audioCtx;
  if (!ctx || ctx.state !== 'running' || !buffer) return false;

  try {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    src.connect(gainNode);
    gainNode.connect(ctx.destination);
    src.start(ctx.currentTime);
    return true;
  } catch (err) {
    console.debug('Error playing buffer', err);
    return false;
  }
}

function playPreparedAudio(
  audio: HTMLAudioElement | null,
  volume: number,
  fallback: () => void
) {
  if (!audio) {
    fallback();
    return;
  }

  try {
    // Reuse one element per effect. Resetting it prevents repeated interactions
    // from stacking several copies that can later sound like a burst.
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch(() => {
      // Prime Web Audio for the *next* cue, but never replay this missed cue late.
      void unlockAudio();
      fallback();
    });
  } catch {
    fallback();
  }
}

function noiseBurst(
  duration = 0.12,
  filterFreq = 1600,
  gainVal = 0.035,
  filterType: BiquadFilterType = 'bandpass'
) {
  const ctx = audioCtx;

  // Critical: do not call start() on a suspended AudioContext. Browsers retain
  // those sources and can release all of them together after a later gesture.
  if (!ctx || ctx.state !== 'running') return false;

  try {
    const len = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const progress = i / len;
      const envelope = Math.sin(progress * Math.PI);
      d[i] = (Math.random() * 2 - 1) * envelope;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.85;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(gainVal, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    src.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    src.start(ctx.currentTime);
    return true;
  } catch (err) {
    console.debug('Audio error', err);
    return false;
  }
}

function playSyntheticPageTurn() {
  if (!isWebAudioReady()) return;

  noiseBurst(0.28, 750, 0.045, 'bandpass');
  window.setTimeout(() => noiseBurst(0.18, 1400, 0.025, 'bandpass'), 120);
  window.setTimeout(() => noiseBurst(0.14, 2100, 0.015, 'highpass'), 320);
}

export function playPageTurnSound() {
  preloadAudio();

  if (pageFlipBuffer && playBuffer(pageFlipBuffer, 0.65)) {
    return;
  }

  playPreparedAudio(pageFlipAudio, 0.65, playSyntheticPageTurn);
}

export function playPaperTearSound() {
  preloadAudio();
  playPreparedAudio(paperTearAudio, 0.42, () => {
    noiseBurst(0.16, 1900, 0.025, 'highpass');
  });
}

export function playRiffleSound() {
  if (!isWebAudioReady()) return;
  noiseBurst(0.12, 900, 0.02, 'bandpass');
  window.setTimeout(() => noiseBurst(0.1, 1500, 0.014, 'bandpass'), 90);
}

export function playPaperSmallSound() {
  noiseBurst(0.08, 1700, 0.018, 'highpass');
}

export function playStampSound() {
  noiseBurst(0.06, 520, 0.024, 'lowpass');
}

// Start asset preloading immediately, but defer AudioContext creation/resume to
// a real user gesture so mobile browsers do not accumulate suspended sources.
if (typeof window !== 'undefined') {
  preloadAudio();
}
