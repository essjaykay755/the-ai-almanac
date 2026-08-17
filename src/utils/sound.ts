// Audio synthesis using Web Audio API for realistic paper, riffle, and stamp sound effects

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function noiseBurst(duration = 0.12, filterFreq = 1600, gainVal = 0.035) {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const len = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.7;
    const gainNode = ctx.createGain();
    gainNode.gain.value = gainVal;

    src.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    src.start();
  } catch (err) {
    console.debug('Audio error', err);
  }
}

export function playPageTurnSound() {
  noiseBurst(0.22, 900, 0.05);
  setTimeout(() => noiseBurst(0.11, 1700, 0.022), 280);
}

export function playRiffleSound() {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => noiseBurst(0.065, 1200 + i * 90, 0.025), i * 75);
  }
}

export function playPaperSmallSound() {
  noiseBurst(0.11, 1300, 0.025);
}

export function playStampSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(105, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.07);
    g.gain.setValueAtTime(0.045, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (err) {
    console.debug('Audio error', err);
  }
}
