export type VoiceKind = "auto" | "boy" | "girl" | "woman" | "man" | "child";

export type SpeakOpts = {
  rate: number;
  volume: number;
  voice: VoiceKind;
  pitch?: number;
};

function pitchFor(kind: VoiceKind) {
  if (kind === "boy") return 0.82;
  if (kind === "girl") return 1.28;
  if (kind === "child") return 1.4;
  if (kind === "man") return 0.72;
  if (kind === "woman") return 1.08;
  return 1;
}

function pickVoice(kind: VoiceKind) {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const de = voices.filter((v) => v.lang.toLowerCase().startsWith("de"));
  const pool = de.length > 0 ? de : voices;
  const female = /female|frau|anna|katja|helena|petra|google deutsch.*female/i;
  const male = /male|mann|markus|stefan|hans|yannick/i;
  if (kind === "woman" || kind === "girl" || kind === "child") {
    return pool.find((v) => female.test(v.name)) ?? pool[0] ?? null;
  }
  if (kind === "man" || kind === "boy") {
    return pool.find((v) => male.test(v.name) && !female.test(v.name)) ?? pool[0] ?? null;
  }
  return pool.find((v) => v.lang.toLowerCase().startsWith("de")) ?? pool[0] ?? null;
}

export function speakGerman(text: string, opts: SpeakOpts) {
  return new Promise<void>((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "de-DE";
    utter.rate = opts.rate;
    utter.volume = opts.volume;
    utter.pitch = opts.pitch ?? pitchFor(opts.voice);
    const voice = pickVoice(opts.voice);
    if (voice) utter.voice = voice;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    window.speechSynthesis.speak(utter);
  });
}

export async function speakLines(
  lines: { text: string; pitch: number }[],
  opts: SpeakOpts,
  stopped: { current: boolean },
) {
  for (const line of lines) {
    if (stopped.current) return;
    await speakGerman(line.text, { ...opts, pitch: line.pitch });
    if (stopped.current) return;
    await new Promise((r) => setTimeout(r, 280));
  }
}

export function playMark(kind: "ok" | "no", volume: number) {
  if (typeof window === "undefined") return;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  const level = Math.max(0.001, 0.22 * volume);
  if (kind === "ok") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(523, now);
    osc.frequency.setValueAtTime(659, now + 0.1);
    osc.frequency.setValueAtTime(784, now + 0.2);
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    osc.start(now);
    osc.stop(now + 0.44);
  } else {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(196, now);
    osc.frequency.exponentialRampToValueAtTime(98, now + 0.28);
    gain.gain.setValueAtTime(level, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    osc.start(now);
    osc.stop(now + 0.34);
  }
  osc.onended = () => void ctx.close();
}
