let context = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return null;
  try {
    if (!context) context = new AudioContextCtor();
    return context;
  } catch {
    return null;
  }
}

export function unlockCompanionAudio() {
  const audio = getAudioContext();
  if (!audio) return;
  if (audio.state === "suspended") audio.resume().catch(() => {});
}

export function playCurtainSwish(direction = "closing") {
  const audio = getAudioContext();
  if (!audio || audio.state !== "running") return;

  const duration = 0.68;
  const frameCount = Math.max(1, Math.floor(audio.sampleRate * duration));
  const buffer = audio.createBuffer(1, frameCount, audio.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < frameCount; index += 1) {
    const t = index / frameCount;
    const envelope = Math.sin(Math.PI * t) ** 1.65;
    samples[index] = (Math.random() * 2 - 1) * envelope;
  }

  const source = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const gain = audio.createGain();
  source.buffer = buffer;
  filter.type = "bandpass";
  filter.Q.value = 0.7;

  const now = audio.currentTime;
  const startFrequency = direction === "closing" ? 1500 : 620;
  const endFrequency = direction === "closing" ? 560 : 1450;
  filter.frequency.setValueAtTime(startFrequency, now);
  filter.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.018, now + 0.11);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  source.start(now);
  source.stop(now + duration + 0.02);
}

export function playSoftLanding() {
  const audio = getAudioContext();
  if (!audio || audio.state !== "running") return;

  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(105, audio.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(72, audio.currentTime + 0.075);

  gain.gain.setValueAtTime(0.0001, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.012, audio.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.085);

  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.09);
}
