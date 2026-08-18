// Audio management with preloaded real recordings & Web Audio synthesis fallback

let audioCtx: AudioContext | null = null;
let pageFlipBuffer: AudioBuffer | null = null;
let buffersLoading = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

async function loadAudioBuffer(url: string): Promise<AudioBuffer | null> {
  const ctx = getAudioContext();
  if (!ctx) return null;
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await ctx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.debug('Failed to load audio buffer', url, err);
    return null;
  }
}

export function preloadAudio() {
  if (typeof window === 'undefined' || buffersLoading) return;
  buffersLoading = true;
  loadAudioBuffer('/sounds/page-flip.mp3').then((buf) => {
    pageFlipBuffer = buf;
  });
}

// Auto-preload on first load
if (typeof window !== 'undefined') {
  const triggerPreload = () => {
    preloadAudio();
    window.removeEventListener('click', triggerPreload);
    window.removeEventListener('keydown', triggerPreload);
    window.removeEventListener('touchstart', triggerPreload);
  };
  window.addEventListener('click', triggerPreload, { once: true });
  window.addEventListener('keydown', triggerPreload, { once: true });
  window.addEventListener('touchstart', triggerPreload, { once: true });
  // Also try immediate preload
  preloadAudio();
}

function playBuffer(buffer: AudioBuffer, volume = 0.65) {
  const ctx = getAudioContext();
  if (!ctx || !buffer) return false;
  try {
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    src.connect(gainNode);
    gainNode.connect(ctx.destination);
    src.start();
    return true;
  } catch (err) {
    console.debug('Error playing buffer', err);
    return false;
  }
}

// Fallback synthetic noise burst
function noiseBurst(
  duration = 0.12,
  filterFreq = 1600,
  gainVal = 0.035,
  filterType: BiquadFilterType = 'bandpass'
) {
  const ctx = getAudioContext();
  if (!ctx) return;
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
    src.start();
  } catch (err) {
    console.debug('Audio error', err);
  }
}

export function playPageTurnSound() {
  if (pageFlipBuffer && playBuffer(pageFlipBuffer, 0.65)) {
    return;
  }
  try {
    const audio = new Audio('/sounds/page-flip.mp3');
    audio.volume = 0.65;
    audio.play().catch(() => {
      noiseBurst(0.28, 750, 0.045, 'bandpass');
      setTimeout(() => noiseBurst(0.18, 1400, 0.025, 'bandpass'), 120);
      setTimeout(() => noiseBurst(0.14, 2100, 0.015, 'highpass'), 320);
    });
  } catch {
    noiseBurst(0.28, 750, 0.045, 'bandpass');
  }
}

export function playPaperTearSound() {
  // Disabled per user request — only page turn sound is active
}

export function playRiffleSound() {
  // Disabled per user request — only page turn sound is active
}

export function playPaperSmallSound() {
  // Disabled per user request — only page turn sound is active
}

export function playStampSound() {
  // Disabled per user request — only page turn sound is active
}
