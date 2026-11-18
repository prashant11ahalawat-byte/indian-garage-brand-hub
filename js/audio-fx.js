/**
 * The Indian Garage Co. — Interactive Foley & Tactile Sound FX Engine
 * Procedural Web Audio API sound design (Zero external MP3 dependencies)
 * Inspired by Lusion.co and Active Theory
 */

class InteractiveSoundFX {
  constructor() {
    this.ctx = null;
    this.isEnabled = true;
    this.masterGain = null;
    this.rotationOsc = null;
    this.rotationFilter = null;
    this.rotationGain = null;
    this.isRotating = false;
    this.noiseBuffer = null;
  }

  init() {
    if (this.ctx) return true;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create 1-second white noise buffer for friction / air whooshes
      const bufferSize = this.ctx.sampleRate;
      this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = this.noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      return true;
    } catch (e) {
      console.warn("Web Audio not supported", e);
      return false;
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.ensureContext();
    this.isEnabled = !this.isEnabled;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isEnabled ? 0.7 : 0, this.ctx.currentTime);
    }
    return this.isEnabled;
  }

  // Visual audio pulse trigger for UI
  triggerWaveVisual() {
    const el = document.getElementById('sound-wave-indicator');
    if (el) {
      el.classList.remove('pulsing');
      void el.offsetWidth; // trigger reflow
      el.classList.add('pulsing');
    }
  }

  // 1. Subtle mechanical hover tick (like a Leica camera click or tactile microswitch)
  playHoverTick() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1800, t);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.015);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.015);
      this.triggerWaveVisual();
    } catch (e) {}
  }

  // 2. Solid tactile button click snap with warm bass thud
  playClickSnap() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;

      // Sub thud
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(140, t);
      sub.frequency.exponentialRampToValueAtTime(45, t + 0.06);
      subGain.gain.setValueAtTime(0.22, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      sub.connect(subGain);
      subGain.connect(this.masterGain);
      sub.start(t);
      sub.stop(t + 0.06);

      // Metallic click
      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      click.type = 'square';
      click.frequency.setValueAtTime(950, t);
      click.frequency.exponentialRampToValueAtTime(180, t + 0.02);
      clickGain.gain.setValueAtTime(0.08, t);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.02);

      click.connect(clickGain);
      clickGain.connect(this.masterGain);
      click.start(t);
      click.stop(t + 0.02);

      this.triggerWaveVisual();
    } catch (e) {}
  }

  // 3. Smooth pneumatic whoosh (for wash change, mode transitions)
  playWhoosh(pitch = 1.0) {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx || !this.noiseBuffer) return;

    try {
      const t = this.ctx.currentTime;
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(250 * pitch, t);
      filter.frequency.exponentialRampToValueAtTime(1400 * pitch, t + 0.12);
      filter.frequency.exponentialRampToValueAtTime(180 * pitch, t + 0.35);
      filter.Q.setValueAtTime(2.5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(t);
      noise.stop(t + 0.35);
      this.triggerWaveVisual();
    } catch (e) {}
  }

  // 4. Harmonic synthesizer chime for sliders & progress dials (pitch tracks 0.0 to 1.0)
  playSliderChime(progress = 0.5) {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pentatonic pitch scale
      const baseFreq = 220; // A3
      const freq = baseFreq * Math.pow(2, progress * 1.8);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.08);
      this.triggerWaveVisual();
    } catch (e) {}
  }

  // 5. Kinetic 3D Rotation Friction Audio (modulates frequency & gain with drag speed)
  startRotationLoop() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx || this.isRotating) return;

    try {
      this.isRotating = true;
      const t = this.ctx.currentTime;

      this.rotationOsc = this.ctx.createOscillator();
      this.rotationOsc.type = 'sawtooth';
      this.rotationOsc.frequency.setValueAtTime(65, t);

      this.rotationFilter = this.ctx.createBiquadFilter();
      this.rotationFilter.type = 'lowpass';
      this.rotationFilter.frequency.setValueAtTime(180, t);
      this.rotationFilter.Q.setValueAtTime(3.0, t);

      this.rotationGain = this.ctx.createGain();
      this.rotationGain.gain.setValueAtTime(0.0001, t);

      this.rotationOsc.connect(this.rotationFilter);
      this.rotationFilter.connect(this.rotationGain);
      this.rotationGain.connect(this.masterGain);

      this.rotationOsc.start(t);
    } catch (e) {}
  }

  updateRotationSpeed(velocity) {
    if (!this.isRotating || !this.rotationOsc || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const speed = Math.min(1.0, Math.abs(velocity) * 1.5);
      const freq = 65 + speed * 180;
      const cutoff = 180 + speed * 600;
      const vol = Math.min(0.16, speed * 0.18);

      this.rotationOsc.frequency.linearRampToValueAtTime(freq, t + 0.04);
      this.rotationFilter.frequency.linearRampToValueAtTime(cutoff, t + 0.04);
      this.rotationGain.gain.linearRampToValueAtTime(vol, t + 0.04);
      if (speed > 0.05) this.triggerWaveVisual();
    } catch (e) {}
  }

  stopRotationLoop() {
    if (!this.isRotating || !this.rotationGain || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      this.rotationGain.gain.linearRampToValueAtTime(0.0001, t + 0.15);
      setTimeout(() => {
        if (this.rotationOsc) {
          try { this.rotationOsc.stop(); } catch (e) {}
          this.rotationOsc = null;
        }
        this.isRotating = false;
      }, 160);
    } catch (e) {
      this.isRotating = false;
    }
  }

  // 6. Kinetic 3D Emblem Resonant Shimmer (Futuristic titanium resonance for G-unit emblem)
  playEmblemTone(intensity = 0.5) {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Dual titanium ring frequencies
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, t); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, t + 0.15); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1174.66, t); // D6
      osc2.frequency.exponentialRampToValueAtTime(1760, t + 0.15);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200 + intensity * 800, t);
      filter.Q.setValueAtTime(4.0, t);

      const vol = Math.min(0.12, 0.04 + intensity * 0.08);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.28);
      osc2.stop(t + 0.28);
      this.triggerWaveVisual();
    } catch (e) {}
  }

  // 6. Mechanical Explosion / Disassembly Sound
  playAnatomyExplode() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      // Low hydraulic thump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.25);

      this.playWhoosh(1.4);
    } catch (e) {}
  }

  // 7. Mechanical Snap Collapse Sound
  playAnatomyCollapse() {
    if (!this.isEnabled) return;
    this.playClickSnap();
    setTimeout(() => this.playClickSnap(), 40);
  }

  // 8. 3D Journey Game: Jump Hop Sound (Smooth energetic synth hop)
  playJumpSound() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(740, t + 0.14);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.15);
      this.triggerWaveVisual();
    } catch (e) {}
  }

  // 9. 3D Journey Game: Milestone Portal Pass Chime (Major Triad Uplift)
  playMilestoneChime() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.055;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.32);
      });
      this.triggerWaveVisual();
    } catch (e) {}
  }

  // 10. 3D Journey Game: Obstacle Bump / Crash Sound
  playCrashSound() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.22);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.22);
      this.triggerWaveVisual();
    } catch (e) {}
  }
}

window.soundFX = new InteractiveSoundFX();

// Auto-unlock AudioContext on first user interaction anywhere
['pointerdown', 'keydown', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, () => {
    if (window.soundFX && window.soundFX.ensureContext) {
      window.soundFX.ensureContext();
    }
  }, { once: true, passive: true });
});
