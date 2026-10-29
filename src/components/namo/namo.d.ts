export type NamoState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'sleepy' | 'error';
export type NamoMood = 'friendly' | 'happy' | 'calm' | 'curious' | 'caring' | 'confident';
export type NamoEmote = 'wave' | 'dance' | 'cheer' | 'love' | 'shy' | 'zap' | 'stretch' | 'info' | 'process' | 'namaste' | 'sorry' | 'calendar' | 'pin' | 'pay' | 'phone' | 'clock' | 'check' | 'search' | 'chart' | 'chat' | 'idea' | 'jump' | 'doublejump' | 'pointR' | 'pointL' | 'present' | 'nod' | 'shake' | 'shrug' | 'clap' | 'look';
export interface NamoOptions {
  mood?: NamoMood;
  /** Falls asleep after 60s of idle. Default true. */
  autoSleep?: boolean;
  /** Eyes follow the pointer. Default true. */
  followPointer?: boolean;
  /** Tap, tickle and drag. Default true. */
  interactive?: boolean;
  /** Tapping empty space makes Namo walk or run there. Default false. */
  tapToWalk?: boolean;
  /** Soft floor shadow under the character. Default true. */
  shadow?: boolean;
  /** Small UI sounds (boops). Default false. */
  sound?: boolean;
  /** Accessible label. */
  label?: string;
}
export interface NamoInstance {
  element: SVGSVGElement;
  setState(s: NamoState): void;
  getState(): string;
  /** 0..1 loudness. Call at least every ~250ms while the agent is speaking. */
  setLevel(v: number): void;
  setMood(m: NamoMood): void;
  react(name: 'surprised' | 'happy' | 'laugh', ms?: number): void;
  emote(name: NamoEmote): void;
  /** Walk to x (-58..58, 0 = centre). speed > 150 runs. Resolves on arrival. */
  walkTo(x: number, speed?: number): Promise<void>;
  run(x: number): Promise<void>;
  hopTo(x: number): Promise<void>;
  stopWalk(): void;
  getPosition(): number;
  jump(double?: boolean): void;
  point(dir: 'left' | 'right'): void;
  /** Lip-syncs text. speak:true also uses the browser voice. */
  say(text: string, o?: { mood?: NamoMood; speak?: boolean; onEnd?: () => void }): void;
  stop(): void;
  /** Point the eyes manually, -1..1 on each axis. lookAt(null) releases. */
  lookAt(x: number | null, y?: number): void;
  destroy(): void;
}
export function createNamo(container: HTMLElement, opts?: NamoOptions): NamoInstance;
export const states: NamoState[];
export const emotes: NamoEmote[];
export const moods: NamoMood[];
