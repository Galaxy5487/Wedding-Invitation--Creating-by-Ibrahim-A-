// Audio Manager for Wedding Invitation
// Ensures "Wedding Nasheed.mp3" is ALWAYS ON by default, auto-playing seamlessly on load & user interaction.

class GlobalAudioController {
  private audio: HTMLAudioElement | null = null;
  private isMutedByUser: boolean = false;
  private isPlayingState: boolean = true;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private audioSrc: string = '/Wedding%20Nasheed.mp3';

  constructor() {
    if (typeof window !== 'undefined') {
      // Create HTMLAudioElement
      this.audio = new Audio(this.audioSrc);
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.85;

      // Event listeners to sync state
      this.audio.addEventListener('play', () => {
        this.isPlayingState = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        if (this.isMutedByUser) {
          this.isPlayingState = false;
          this.notify();
        }
      });

      // Global window interaction listener to unlock browser autoplay policies unconditionally
      const unlockAutoplay = () => {
        if (!this.isMutedByUser) {
          this.start();
        }
      };

      const events = ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown', 'scroll'];
      events.forEach((evt) => {
        window.addEventListener(evt, unlockAutoplay, { capture: true, passive: true });
      });

      // Immediate attempt on load
      this.start();
    }
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlayingState));
  }

  public async start(): Promise<boolean> {
    if (!this.audio) return false;
    this.isMutedByUser = false;
    this.isPlayingState = true;
    this.notify();

    try {
      if (this.audio.paused) {
        await this.audio.play();
      }
      return true;
    } catch (e) {
      // Browser autoplay policy will unlock on first user gesture
      return false;
    }
  }

  public stop() {
    this.isMutedByUser = true;
    this.isPlayingState = false;
    this.notify();

    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlayingState && !this.isMutedByUser) {
      this.stop();
      return false;
    } else {
      return await this.start();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingState;
  }
}

export const ambientSynth = new GlobalAudioController();
export default ambientSynth;
