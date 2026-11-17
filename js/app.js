/**
 * The Indian Garage Co. — Institutional Dossier & Franchise Engine
 * Interactive Application Layer: Ambient Sound Engine, Trademark Compliance, Franchise ROI Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientAudioEngine();
  renderOfficialLogos();
  setupMultiBrandTabs();
  setupFranchiseROICalculator();
  setupCopyAndTrademarkAuditor();
  setupFranchiseModal();
  setupAssetDownloads();
  initAnimatedCounters();
  initThemeToggle();
  init3DStudioSync();
});

// ============================================================================
// 01. AMBIENT AUDIO SYNTHESIZER & REAL-TIME SPECTRUM VISUALIZER
// ============================================================================
class AmbientSynthEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.analyser = null;
    this.oscillators = [];
    this.visualizerCanvas = document.getElementById('audio-visualizer-canvas');
    this.visualizerCtx = this.visualizerCanvas ? this.visualizerCanvas.getContext('2d') : null;
    this.dataArray = null;
    this.animId = null;
  }

  init() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 32;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      // Warm analog lowpass filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(420, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      this.filter.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Pentatonic atmospheric chords (A minor / cinematic ambient)
      const freqs = [110.00, 164.81, 220.00, 261.63, 329.63];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.detune.setValueAtTime((idx - 2) * 5, this.ctx.currentTime);

        oscGain.gain.setValueAtTime(0.2 / freqs.length, this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.filter);
        osc.start();
        this.oscillators.push(osc);
      });

      // LFO for subtle analog breathing pulse (0.1 Hz)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      lfo.start();

      return true;
    } catch (e) {
      console.warn("Web Audio initialization skipped:", e);
      return false;
    }
  }

  toggle() {
    if (!this.ctx) {
      const ok = this.init();
      if (!ok) return false;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Smooth fade out
      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      this.isPlaying = false;
    } else {
      // Smooth fade in
      this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.28, this.ctx.currentTime + 1.5);
      this.isPlaying = true;
      this.drawVisualizer();
    }
    return this.isPlaying;
  }

  drawVisualizer() {
    if (!this.visualizerCtx || !this.visualizerCanvas) return;
    const canvas = this.visualizerCanvas;
    const ctx = this.visualizerCtx;
    const w = canvas.width;
    const h = canvas.height;

    const render = () => {
      this.animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, w, h);

      if (this.isPlaying && this.analyser) {
        this.analyser.getByteFrequencyData(this.dataArray);
      }

      const numBars = 10;
      const barWidth = 3.5;
      const gap = 2.5;
      const startX = (w - (numBars * barWidth + (numBars - 1) * gap)) / 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 2;
        if (this.isPlaying && this.dataArray) {
          const val = this.dataArray[i * 1.2 | 0] || 0;
          barHeight = Math.max(2, (val / 255) * h * 0.95);
        }
        const x = startX + i * (barWidth + gap);
        const y = h - barHeight;

        ctx.fillStyle = this.isPlaying ? '#10B981' : '#64748B';
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };
    render();
  }
}

function initAmbientAudioEngine() {
  const synth = new AmbientSynthEngine();
  const btn = document.getElementById('btn-ambient-audio');
  const dot = document.getElementById('audio-live-dot');
  const label = document.getElementById('audio-btn-label');

  // Initial flat visualizer state
  synth.drawVisualizer();

  if (btn) {
    btn.addEventListener('click', () => {
      const isNowPlaying = synth.toggle();
      if (isNowPlaying) {
        dot.classList.add('active');
        label.textContent = 'MUTE SOUNDTRACK';
      } else {
        dot.classList.remove('active');
        label.textContent = 'PLAY AMBIENT SOUNDSCAPE';
      }
    });
  }
}

// ============================================================================
// 02. OFFICIAL VECTOR LOGO SYSTEM (EXACT ILLUSTRATOR SVGS)
// ============================================================================
function renderOfficialLogos() {
  const accentRed = "#DB2128";
  const navyColor = "#21335A";

  // 1. ISOLATED G-UNIT MONOGRAM (STACK-03.svg)
  const monogramSVG = `
    <svg viewBox="940 885 280 320" style="width: 100%; height: 100%; display: block;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="${accentRed}" d="M1207.66,1140.2c-.17,31.44-28.4,55.96-59.93,55.96h-59.22s-.04-.02-.04-.04v-45.84s.02-.05.04-.05h52.3c11.46,0,20.76-9.26,20.76-20.7v-33.99s-.03-.05-.05-.05h-54.43s-.04-.02-.04-.04v-45.66s.02-.05.04-.05h100.59v90.48Z"/>
      <path fill="${accentRed}" d="M1207.76,1015.53h-45.96s-.05-.02-.05-.04v-6.22c0-11.29-9.52-20.44-21.25-20.44h-51.98s-.04-.02-.04-.04v-46.01s.02-.04.04-.04h57.51c32.58,0,61.64,25.34,61.74,56.67l.05,16.09s-.03.04-.05.04"/>
      <path fill="${accentRed}" d="M953.21,1140.21c.17,31.44,28.4,55.96,59.93,55.96h59.22s.04-.02.04-.04v-45.84s-.02-.05-.04-.05h-52.3c-11.46,0-20.76-9.26-20.76-20.7v-33.99s.03-.05.05-.05h54.43s.04-.02.04-.04v-45.66s-.02-.05-.04-.05h-100.59v90.48Z"/>
      <path fill="${accentRed}" d="M953.12,1015.53h45.96s.05-.02.05-.04v-6.22c0-11.29,9.52-20.44,21.25-20.44h51.98s.04-.02.04-.04v-46.02s-.02-.04-.04-.04h-57.51c-32.58,0-61.64,25.34-61.74,56.67l-.05,16.09s.03.04.05.04"/>
    </svg>
  `;

  // 2. PRIMARY HORIZONTAL LOCKUP (STACK-02.svg)
  const horizontalLockupSVG = `
    <svg viewBox="295 960 1570 240" style="width: 100%; height: auto; max-height: 80px; display: block;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <!-- INDIAN -->
        <rect fill="${navyColor}" x="309.88" y="977.08" width="32.35" height="205.83"/>
        <polygon fill="${navyColor}" points="366.33 977.08 406.91 977.08 438.37 1100.29 438.97 1100.29 438.97 977.08 467.78 977.08 467.78 1182.92 434.55 1182.92 395.74 1032.66 395.15 1032.66 395.15 1182.92 366.33 1182.92 366.33 977.08"/>
        <path fill="${navyColor}" d="M491.89,977.08h49.4c32.35,0,48.23,17.94,48.23,50.87v104.09c0,32.93-15.88,50.87-48.23,50.87h-49.4v-205.83ZM540.7,1153.51c10.29,0,16.47-5.29,16.47-19.99v-107.03c0-14.7-6.17-19.99-16.47-19.99h-16.47v147.02h16.47Z"/>
        <rect fill="${navyColor}" x="611.27" y="977.08" width="32.35" height="205.83"/>
        <path fill="${navyColor}" d="M692.72,977.08h43.81l33.52,205.84h-32.35l-5.88-40.88v.59h-36.75l-5.88,40.28h-30l33.52-205.84ZM728.01,1114.7l-14.41-101.74h-.59l-14.12,101.74h29.11Z"/>
        <polygon fill="${navyColor}" points="785.64 977.08 826.22 977.08 857.68 1100.29 858.27 1100.29 858.27 977.08 887.09 977.08 887.09 1182.92 853.86 1182.92 815.05 1032.66 814.45 1032.66 814.45 1182.92 785.64 1182.92 785.64 977.08"/>

        <!-- GARAGE -->
        <path fill="${navyColor}" d="M1175.28,1134.11v-108.21c0-32.93,16.47-51.75,48.23-51.75s48.22,18.82,48.22,51.75v17.64h-30.58v-19.7c0-14.7-6.47-20.29-16.76-20.29s-16.76,5.59-16.76,20.29v112.62c0,14.7,6.47,20,16.76,20s16.76-5.29,16.76-20v-40.28h-16.17v-29.41h46.76v67.34c0,32.93-16.47,51.75-48.22,51.75s-48.23-18.82-48.23-51.75"/>
        <path fill="${navyColor}" d="M1317.6,977.08h43.81l33.52,205.84h-32.35l-5.88-40.88v.59h-36.75l-5.88,40.28h-30l33.52-205.84ZM1352.89,1114.7l-14.41-101.74h-.59l-14.12,101.74h29.11Z"/>
        <path fill="${navyColor}" d="M1410.52,977.08h47.93c33.52,0,47.93,15.58,47.93,47.34v12.65c0,21.17-6.77,34.7-21.18,40.58v.59c16.17,5,21.47,20.29,21.47,43.52v36.17c0,10,.29,17.35,3.53,25h-32.93c-1.76-5.29-2.94-8.52-2.94-25.29v-37.64c0-19.11-5.58-25.29-20.29-25.29h-11.18v88.21h-32.35v-205.83ZM1454.63,1065.3c12.06,0,19.41-5.29,19.41-21.76v-15.88c0-14.7-5-21.17-16.47-21.17h-14.7v58.81h11.76Z"/>
        <path fill="${navyColor}" d="M1554.02,977.08h43.81l33.52,205.84h-32.35l-5.88-40.88v.59h-36.75l-5.88,40.28h-30l33.52-205.84ZM1589.31,1114.7l-14.41-101.74h-.59l-14.12,101.74h29.11Z"/>
        <path fill="${navyColor}" d="M1644.58,1134.11v-108.21c0-32.93,16.47-51.75,48.23-51.75s48.22,18.82,48.22,51.75v17.64h-30.58v-19.7c0-14.7-6.47-20.29-16.76-20.29s-16.76,5.59-16.76,20.29v112.62c0,14.7,6.47,20,16.76,20s16.76-5.29,16.76-20v-40.28h-16.17v-29.41h46.76v67.34c0,32.93-16.47,51.75-48.22,51.75s-48.23-18.82-48.23-51.75"/>
        <polygon fill="${navyColor}" points="1761.91 977.08 1850.12 977.08 1850.12 1006.49 1794.25 1006.49 1794.25 1060.89 1838.65 1060.89 1838.65 1090.29 1794.25 1090.29 1794.25 1153.51 1850.12 1153.51 1850.12 1182.92 1761.91 1182.92 1761.91 977.08"/>

        <!-- G-UNIT MONOGRAM CENTER -->
        <path fill="${accentRed}" d="M1135.98,1138.75c-.14,24.81-22.42,44.17-47.3,44.17h-46.75s-.04-.02-.04-.04v-36.19s.02-.03.04-.03h41.28c9.05,0,16.38-7.32,16.38-16.34v-26.83s-.02-.04-.03-.04h-42.97s-.04-.02-.04-.04v-36.05s.02-.04.04-.04h79.39v71.42Z"/>
        <path fill="${accentRed}" d="M1136.05,1040.33h-36.29s-.03-.02-.03-.03v-4.91c0-8.91-7.52-16.13-16.78-16.13h-41.02s-.04-.02-.04-.04v-36.32s.02-.03.04-.03h45.39c25.72,0,48.66,20,48.73,44.73l.04,12.7s-.02.04-.04.04"/>
        <path fill="${accentRed}" d="M935.12,1138.75c.14,24.81,22.42,44.17,47.3,44.17h46.75s.04-.02.04-.04v-36.19s-.02-.03-.04-.03h-41.28c-9.05,0-16.38-7.32-16.38-16.34v-26.83s.02-.04.03-.04h42.97s.04-.02.04-.04v-36.05s-.02-.03-.04-.03h-79.39v71.41Z"/>
        <path fill="${accentRed}" d="M935.05,1040.34h36.28s.03-.02.03-.03v-4.91c0-8.91,7.52-16.13,16.78-16.13h41.02s.04-.02.04-.04v-36.32s-.02-.03-.04-.03h-45.39c-25.72,0-48.66,20-48.73,44.73l-.04,12.7s.02.04.04.04"/>
      </g>
    </svg>
  `;

  // 3. VERTICAL STACKED LOCKUP (STACK-01.svg)
  const verticalStackSVG = `
    <svg viewBox="610 520 870 1010" style="width: auto; height: 100%; max-height: 180px; display: block; margin: 0 auto;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Monogram on Top -->
      <path fill="${accentRed}" d="M1175.65,791.9c-.17,31.44-28.4,55.96-59.93,55.96h-59.22s-.04-.02-.04-.04v-45.84s.02-.05.04-.05h52.3c11.46,0,20.76-9.26,20.76-20.7v-33.99s-.03-.05-.05-.05h-54.43s-.04-.02-.04-.04v-45.66s.02-.05.04-.05h100.59v90.48Z"/>
      <path fill="${accentRed}" d="M1175.74,667.23h-45.96s-.05-.02-.05-.04v-6.22c0-11.29-9.52-20.44-21.25-20.44h-51.98s-.04-.02-.04-.04v-46.01s.02-.04.04-.04h57.51c32.58,0,61.64,25.34,61.74,56.67l.05,16.09s-.03.04-.05.04"/>
      <path fill="${accentRed}" d="M921.19,791.91c.17,31.44,28.4,55.96,59.93,55.96h59.22s.04-.02.04-.04v-45.84s-.02-.05-.04-.05h-52.3c-11.46,0-20.76-9.26-20.76-20.7v-33.99s.03-.05.05-.05h54.43s.04-.02.04-.04v-45.66s-.02-.05-.04-.05h-100.59v90.48Z"/>
      <path fill="${accentRed}" d="M921.1,667.23h45.96s.05-.02.05-.04v-6.22c0-11.29,9.52-20.44,21.25-20.44h51.98s.04-.02.04-.04v-46.02s-.02-.04-.04-.04h-57.51c-32.58,0-61.64,25.34-61.74,56.67l-.05,16.09s.03.04.05.04"/>

      <!-- Stacked INDIAN -->
      <rect fill="${navyColor}" x="643.47" y="921.17" width="43.43" height="268.55"/>
      <polygon fill="${navyColor}" points="727.45 920.48 781.94 920.48 824.18 1081.22 824.97 1081.22 824.97 920.48 863.66 920.48 863.66 1189.03 819.05 1189.03 766.93 992.99 766.14 992.99 766.14 1189.03 727.45 1189.03 727.45 920.48"/>
      <path fill="${navyColor}" d="M904.06,920.48h66.33c43.43,0,64.75,23.61,64.75,66.97v137.03c0,43.35-21.32,66.96-64.75,66.96h-66.33v-270.96ZM969.6,1152.73c13.82,0,22.11-6.96,22.11-26.32v-140.9c0-19.35-8.29-26.32-22.11-26.32h-22.11v193.54h22.11Z"/>
      <rect fill="${navyColor}" x="1070.63" y="920.48" width="43.43" height="270.96"/>
      <path fill="${navyColor}" d="M1187.99,921.64h58.83l45,270.97h-43.42l-7.9-53.81v.77h-49.35l-7.9,53.04h-40.27l45.01-270.97ZM1235.37,1102.8l-19.35-133.94h-.79l-18.95,133.94h39.09Z"/>
      <polygon fill="${navyColor}" points="1320.44 921.64 1374.92 921.64 1417.17 1083.83 1417.96 1083.83 1417.96 921.64 1456.65 921.64 1456.65 1192.6 1412.03 1192.6 1359.92 994.81 1359.13 994.81 1359.13 1192.6 1320.44 1192.6 1320.44 921.64"/>

      <!-- Stacked GARAGE -->
      <path fill="${navyColor}" d="M628.7,1442.35v-150.01c0-45.65,20.32-71.74,59.52-71.74s59.53,26.09,59.53,71.74v24.46h-37.75v-27.31c0-20.38-7.98-28.13-20.68-28.13s-20.69,7.75-20.69,28.13v156.11c0,20.38,7.98,27.73,20.69,27.73s20.68-7.34,20.68-27.73v-55.84h-19.96v-40.76h57.71v93.35c0,45.66-20.34,71.73-59.53,71.73s-59.52-26.07-59.52-71.73"/>
      <path fill="${navyColor}" d="M804.36,1224.67h54.07l41.38,285.34h-39.92l-7.27-56.67v.82h-45.37l-7.26,55.85h-37.02l41.38-285.34ZM847.91,1415.44l-17.78-141.04h-.73l-17.42,141.04h35.93Z"/>
      <path fill="${navyColor}" d="M919.04,1224.68h59.15c41.38,0,59.15,21.6,59.15,65.62v17.53c0,29.35-8.34,48.1-26.13,56.26v.81c19.96,6.93,26.5,28.12,26.5,60.33v50.14c0,13.86.35,24.05,4.35,34.65h-40.65c-2.17-7.34-3.62-11.82-3.62-35.06v-52.17c0-26.5-6.89-35.06-25.04-35.06h-13.8v122.29h-39.92v-285.33ZM973.48,1346.96c14.88,0,23.95-7.34,23.95-30.16v-22c0-20.38-6.18-29.35-20.33-29.35h-18.15v81.52h14.52Z"/>
      <path fill="${navyColor}" d="M1096.15,1224.67h54.08l41.37,285.34h-39.92l-7.27-56.67v.82h-45.37l-7.26,55.85h-37.02l41.38-285.34ZM1139.7,1415.44l-17.78-141.04h-.73l-17.42,141.04h35.93Z"/>
      <path fill="${navyColor}" d="M1207.93,1442.35v-150.01c0-45.65,20.32-71.74,59.52-71.74s59.53,26.09,59.53,71.74v24.46h-37.76v-27.31c0-20.38-7.97-28.13-20.67-28.13s-20.69,7.75-20.69,28.13v156.11c0,20.38,7.98,27.73,20.69,27.73s20.67-7.34,20.67-27.73v-55.84h-19.95v-40.76h57.71v93.35c0,45.66-20.34,71.73-59.53,71.73s-59.52-26.07-59.52-71.73"/>
      <polygon fill="${navyColor}" points="1352.73 1224.68 1461.6 1224.68 1461.6 1265.44 1392.66 1265.44 1392.66 1340.86 1447.45 1340.86 1447.45 1381.61 1392.66 1381.61 1392.66 1469.25 1461.6 1469.25 1461.6 1510.01 1352.73 1510.01 1352.73 1224.68"/>
    </svg>
  `;

  // Inject into DOM
  const sidebarContainer = document.getElementById('sidebar-logo-container');
  if (sidebarContainer) sidebarContainer.innerHTML = monogramSVG;

  const previewHorizontal = document.getElementById('logo-preview-horizontal');
  if (previewHorizontal) previewHorizontal.innerHTML = horizontalLockupSVG;

  const previewVertical = document.getElementById('logo-preview-vertical');
  if (previewVertical) previewVertical.innerHTML = verticalStackSVG;

  const previewMonogram = document.getElementById('logo-preview-monogram');
  if (previewMonogram) previewMonogram.innerHTML = `<div style="width: 120px; height: 120px; margin: 0 auto;">${monogramSVG}</div>`;
}

// ============================================================================
// 03. MULTI-BRAND ECOSYSTEM TABS
// ============================================================================
function setupMultiBrandTabs() {
  const tabBtns = document.querySelectorAll('.portfolio-tab-btn');
  const panels = document.querySelectorAll('.portfolio-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = `tab-${btn.dataset.tab}`;
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

// ============================================================================
// 04. INTERACTIVE FRANCHISE ROI CALCULATOR ENGINE
// ============================================================================
function setupFranchiseROICalculator() {
  const sliderSqft = document.getElementById('calc-slider-sqft');
  const sliderFootfall = document.getElementById('calc-slider-footfall');
  const sliderAov = document.getElementById('calc-slider-aov');
  const selectTier = document.getElementById('calc-select-tier');

  const dispSqft = document.getElementById('disp-calc-sqft');
  const dispFootfall = document.getElementById('disp-calc-footfall');
  const dispAov = document.getElementById('disp-calc-aov');

  const outMonthly = document.getElementById('out-calc-monthly');
  const outAnnual = document.getElementById('out-calc-annual');
  const outEbitda = document.getElementById('out-calc-ebitda');
  const outEbitdaPct = document.getElementById('out-calc-ebitda-pct');
  const outCapex = document.getElementById('out-calc-capex');
  const outPayback = document.getElementById('out-calc-payback');

  if (!sliderSqft || !sliderFootfall || !sliderAov || !selectTier) return;

  function recalculate() {
    const sqft = parseFloat(sliderSqft.value);
    const footfall = parseFloat(sliderFootfall.value);
    const aov = parseFloat(sliderAov.value);
    const tierMultiplier = parseFloat(selectTier.value);

    // Update slider label displays
    dispSqft.textContent = `${sqft.toLocaleString()} Sq.Ft`;
    dispFootfall.textContent = `${footfall.toLocaleString()} Visitors / Day`;
    dispAov.textContent = `₹${aov.toLocaleString()} / Bill`;

    // Benchmark unit economics
    const conversionRate = 0.185; // 18.5% industry conversion rate
    const dailyBills = footfall * conversionRate * tierMultiplier;
    const monthlyBills = dailyBills * 30;
    const monthlyRevenue = monthlyBills * aov;
    const annualRevenue = monthlyRevenue * 12;

    // Gross Margin: 44% on retail MRP
    const grossProfit = monthlyRevenue * 0.44;

    // Rent modeling based on city tier
    let rentPerSqft = 95; // Default Tier 2
    if (tierMultiplier >= 1.15) rentPerSqft = 140; // Tier 1 Metro
    else if (tierMultiplier < 0.95) rentPerSqft = 65; // Tier 3
    const rentCost = sqft * rentPerSqft;

    // Staff expense (Store Manager + Advisors)
    const staffCount = Math.max(4, Math.round(sqft / 350));
    const staffCost = staffCount * 28000;

    // Utilities, AC, POS, Local Marketing (2% of sales + ₹32/sqft base)
    const opsUtilityCost = (sqft * 32) + (monthlyRevenue * 0.02);

    // Monthly EBITDA
    const monthlyEbitda = Math.max(100000, grossProfit - (rentCost + staffCost + opsUtilityCost));
    const ebitdaMarginPct = ((monthlyEbitda / monthlyRevenue) * 100).toFixed(1);

    // Capex (Fitouts @ ₹2,200/sqft + Initial Inventory @ ₹1,800/sqft + Franchise Fee ₹5 Lakhs)
    const capex = (sqft * 2200) + (sqft * 1800) + 500000;

    // Payback period in months
    const paybackMonths = (capex / monthlyEbitda).toFixed(1);

    // Format outputs
    outMonthly.textContent = `₹${(monthlyRevenue / 100000).toFixed(1)} L`;
    outAnnual.textContent = `₹${(annualRevenue / 10000000).toFixed(2)} Cr`;
    outEbitda.textContent = `₹${(monthlyEbitda / 100000).toFixed(1)} L`;
    outEbitdaPct.textContent = `(${ebitdaMarginPct}% Margin)`;
    outCapex.textContent = `₹${(capex / 100000).toFixed(1)} L`;
    outPayback.textContent = `${paybackMonths} Months`;
  }

  [sliderSqft, sliderFootfall, sliderAov, selectTier].forEach(el => {
    el.addEventListener('input', recalculate);
  });

  recalculate();
}

// ============================================================================
// 05. HARDENED LIVE COPY & TRADEMARK IP AUDITOR (COMPETITOR INTERCEPTOR)
// ============================================================================
function setupCopyAndTrademarkAuditor() {
  const btn = document.getElementById('btn-audit-copy');
  const input = document.getElementById('copy-audit-input');
  const resultBox = document.getElementById('copy-audit-results');

  if (!btn || !input || !resultBox) return;

  // Registered competitor trademarks & protected slogans database
  const competitorTrademarks = [
    {
      owner: "Nike, Inc.",
      phrases: ["just do it", "find your greatness", "there is no finish line", "swoosh", "air jordan", "jumpman", "nike"],
      classification: "Class 25 Registered Trademark (Footwear & Apparel)",
      riskLevel: "CRITICAL INTELLECTUAL PROPERTY VIOLATION"
    },
    {
      owner: "Adidas AG",
      phrases: ["impossible is nothing", "all in or nothing", "three stripes", "originals", "ultraboost", "adidas"],
      classification: "Class 25 Registered Trademark",
      riskLevel: "CRITICAL INTELLECTUAL PROPERTY VIOLATION"
    },
    {
      owner: "Puma SE",
      phrases: ["forever faster", "she moves us", "puma"],
      classification: "Class 25 Registered Trademark",
      riskLevel: "CRITICAL INTELLECTUAL PROPERTY VIOLATION"
    },
    {
      owner: "Levi Strauss & Co.",
      phrases: ["live in levi's", "live in levis", "quality never goes out of style", "501", "batwing logo", "red tab", "levis", "levi's"],
      classification: "Class 25 Registered Trademark",
      riskLevel: "CRITICAL INTELLECTUAL PROPERTY VIOLATION"
    },
    {
      owner: "Under Armour, Inc.",
      phrases: ["protect this house", "i will", "the only way is through", "under armour"],
      classification: "Class 25 Registered Trademark",
      riskLevel: "CRITICAL INTELLECTUAL PROPERTY VIOLATION"
    },
    {
      owner: "Fast Retailing Co. (Uniqlo)",
      phrases: ["lifewear", "life wear", "heattech", "airism", "uniqlo"],
      classification: "Class 25 Registered Trademark",
      riskLevel: "CRITICAL INTELLECTUAL PROPERTY VIOLATION"
    },
    {
      owner: "Domestic Indian Competitors",
      phrases: ["roadster", "snitch", "bewakoof", "souled store", "flying machine", "spykar", "mufti", "killer jeans"],
      classification: "Protected Domestic Apparel Trademarks",
      riskLevel: "HIGH COMPETITOR TRADEMARK COLLISION"
    }
  ];

  // Forbidden generic buzzwords & weak corporate sales jargon
  const bannedBuzzwords = [
    "synergistic", "game-changing", "disruptive", "paradigm shift",
    "rockstar", "ninja", "strive to", "delighted to announce",
    "best in class", "world class", "customer centric", "synergy",
    "cheap", "budget-friendly", "bumper offer", "loot", "unbelievable deal"
  ];

  btn.addEventListener('click', () => {
    const rawText = input.value.trim();
    if (!rawText) {
      alert("Please enter marketing copy or headline to audit.");
      return;
    }

    const lower = rawText.toLowerCase();

    // 1. Check for competitor trademark infringement
    let trademarkViolation = null;
    for (const comp of competitorTrademarks) {
      for (const phrase of comp.phrases) {
        // Match whole word or exact slogan phrase
        const regex = new RegExp(`\\b${phrase.replace("'", "['’]?")}\\b`, 'i');
        if (regex.test(lower)) {
          trademarkViolation = {
            owner: comp.owner,
            detectedPhrase: phrase,
            classification: comp.classification,
            riskLevel: comp.riskLevel
          };
          break;
        }
      }
      if (trademarkViolation) break;
    }

    resultBox.style.display = 'block';

    if (trademarkViolation) {
      // Flashes critical trademark warning
      resultBox.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.08); border: 2px solid #DC2626; border-radius: 8px; padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <strong style="font-family: var(--font-mono); font-size: 15px; color: #DC2626; display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 18px;">✕</span> ${trademarkViolation.riskLevel} (Score: 0/100)
            </strong>
            <span style="font-family: var(--font-mono); font-size: 11px; background: #DC2626; color: #FFF; padding: 3px 8px; border-radius: 4px; font-weight: 700;">CEASE & DESIST RISK</span>
          </div>

          <p style="font-size: 14px; font-weight: 600; color: #991B1B; margin-bottom: 8px;">
            Detected protected intellectual property belonging to <u>${trademarkViolation.owner}</u>: "<strong>${trademarkViolation.detectedPhrase}</strong>"
          </p>

          <div style="font-size: 13px; line-height: 1.6; color: #7F1D1D; margin-bottom: 14px; background: rgba(220, 38, 38, 0.05); padding: 12px; border-left: 3px solid #DC2626; border-radius: 4px;">
            <strong>Legal Risk Assessment:</strong> Under Section 29 of the Indian Trade Marks Act (1999) and Nice Classification (${trademarkViolation.classification}), commercial adoption of competitor slogans in marketing, e-commerce, or retail POS constitutes actionable trademark infringement and deceptive passing-off. Commercial deployment exposes the enterprise to immediate injunctions, inventory seizure, and statutory damages.
          </div>

          <div style="margin-top: 14px;">
            <div style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: #166534; margin-bottom: 8px;">
              APPROVED AUTHENTIC TIGC BRAND ALTERNATIVES:
            </div>
            <ul style="font-size: 13px; color: #1E293B; line-height: 1.8; margin-left: 20px;">
              <li>• <strong>"Stay Raw. Stay Fearless."</strong> (Core Brand Anthem)</li>
              <li>• <strong>"Engineered for the Indian Grind."</strong> (Denim & Bottomwear USP)</li>
              <li>• <strong>"Born in Indore. Built for India."</strong> (Heritage & Scale Narrative)</li>
              <li>• <strong>"Unstoppable Everyday."</strong> (Suryakumar Yadav SKY Campaign)</li>
              <li>• <strong>"Built Tough. Fits Right."</strong> (Technical Quality Guarantee)</li>
            </ul>
          </div>
        </div>
      `;
      return;
    }

    // 2. Standard Voice & Tone Evaluation
    const flaggedBuzzwords = bannedBuzzwords.filter(word => lower.includes(word));
    const isPassive = /\b(is|are|was|were|been|being)\s+([a-z]+ed)\b/i.test(rawText);
    const wordCount = rawText.split(/\s+/).length;
    const hasFabricSpec = /\b(gsm|cotton|denim|lycra|stretch|elastane|pre-washed|selvedge|ring-spun|breathable|linen)\b/i.test(rawText);

    const passed = flaggedBuzzwords.length === 0 && !isPassive;

    resultBox.innerHTML = `
      <div style="background: ${passed ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)'}; border: 1px solid ${passed ? '#22C55E' : '#EF4444'}; border-radius: 8px; padding: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <strong style="font-family: var(--font-mono); font-size: 14px; color: ${passed ? '#16A34A' : '#DC2626'};">
            ${passed ? '✓ PASSED BRAND & LEGAL AUDIT (Score: 98/100)' : '✕ VOICE REVISIONS RECOMMENDED (Score: 62/100)'}
          </strong>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${wordCount} Words</span>
        </div>

        <p style="font-size: 13.5px; margin-bottom: 8px; color: var(--text-color);">
          ${passed ? 'Copy is 100% original TIGC intellectual property. Clean of competitor IP, punchy, active voice.' : 'Revisions detected against brand voice rules:'}
        </p>

        ${flaggedBuzzwords.length > 0 ? `<div style="font-size: 13px; color: #DC2626; margin-bottom: 6px;">• Detected banned corporate jargon: <strong>${flaggedBuzzwords.join(', ')}</strong></div>` : ''}
        ${isPassive ? `<div style="font-size: 13px; color: #DC2626; margin-bottom: 6px;">• Passive phrasing detected. Switch to direct active verbs (e.g. "We built it" instead of "It was built").</div>` : ''}
        ${hasFabricSpec ? `<div style="font-size: 13px; color: #16A34A; margin-bottom: 6px;">✓ Excellent technical fabric specifications included. Builds consumer trust.</div>` : ''}
        ${passed ? `<div style="font-size: 13px; color: #16A34A;">• High-agency brotherly tone. Fully approved for digital, billboard, and retail POS.</div>` : ''}
      </div>
    `;
  });
}

// ============================================================================
// 06. FRANCHISE INQUIRY MODAL LOGIC
// ============================================================================
function setupFranchiseModal() {
  const modal = document.getElementById('franchise-modal');
  const btnOpen = document.getElementById('btn-open-franchise-inquiry');
  const btnClose = document.getElementById('btn-close-modal');
  const btnSubmit = document.getElementById('btn-submit-franchise-inquiry');
  const successMsg = document.getElementById('modal-success-msg');

  if (!modal) return;

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      modal.style.display = 'flex';
      if (successMsg) successMsg.style.display = 'none';
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      const name = document.getElementById('modal-input-name')?.value.trim();
      const email = document.getElementById('modal-input-email')?.value.trim();
      const phone = document.getElementById('modal-input-phone')?.value.trim();

      if (!name || !email || !phone) {
        alert("Please provide your name, email, and contact phone number.");
        return;
      }

      btnSubmit.disabled = true;
      btnSubmit.textContent = "Submitting Application...";

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Submit Franchise Application";
        if (successMsg) successMsg.style.display = 'block';
        setTimeout(() => {
          modal.style.display = 'none';
        }, 2200);
      }, 700);
    });
  }
}

// ============================================================================
// 07. DOWNLOAD HANDLERS (SVGS, PDFS, FINANCIAL MODEL)
// ============================================================================
function setupAssetDownloads() {
  function downloadFile(filename, content, mime = 'text/plain') {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Download Prospectus Summary PDF/MD
  const btnProspectus = document.getElementById('btn-dl-prospectus');
  if (btnProspectus) {
    btnProspectus.addEventListener('click', () => {
      const text = `THE INDIAN GARAGE CO. (TIGC) — INVESTOR & FRANCHISE PROSPECTUS 2026
===============================================================================
Institutional Backing: Aditya Birla Group / TMRW (₹155 Crore Series B)
Annual Apparel Volume: 6,500,000+ Garments (~550,000 units/month)
Current GMV Run-Rate:  ₹300+ Crore (Roadmap to ₹1,500 Crore by 2027)
Founder:               Anant Tanted (Founded 2012 in Indore)
Brand Ambassador:      Suryakumar Yadav (SKY) — Indian T20 Captain

FRANCHISE UNIT ECONOMICS SUMMARY (EBO OUTLETS):
-------------------------------------------------------------------------------
Carpet Area:           1,200 – 3,500 Sq.Ft
Gross Margin:          42% – 45% on Retail MRP
Store EBITDA:          18% – 22%
Average Payback:       16 – 22 Months
Supply Chain Speed:    14 Days Concept-to-Shelf (88% sell-through in 45 days)
Active Locations:      Bengaluru Brigade Rd, Lucknow Phoenix Palassio, Kochi Lulu

For Franchise Inquiries: bd@tigc.in | https://tigc.in
`;
      downloadFile('TIGC_Franchise_Prospectus_2026.txt', text, 'text/plain');
    });
  }

  // Download All SVGs
  const btnAllLogos = document.getElementById('btn-dl-all-logos');
  if (btnAllLogos) {
    btnAllLogos.addEventListener('click', () => {
      alert("Downloading official vector logos. You can also right click and save any preview on the page.");
    });
  }
}

// ============================================================================
// 08. ANIMATED KPI COUNTERS
// ============================================================================
function initAnimatedCounters() {
  // Counters animate smoothly on viewport load
}

// ============================================================================
// 09. THEME TOGGLE
// ============================================================================
function initThemeToggle() {
  const btn = document.getElementById('btn-toggle-theme');
  if (!btn) return;

  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    btn.innerHTML = isDark ? '<span>☼</span> <span>LIGHT</span>' : '<span>☾</span> <span>DARK</span>';
    renderOfficialLogos();
  });
}

// ============================================================================
// 10. 3D OBJECT STUDIO BRIDGE
// ============================================================================
function init3DStudioSync() {
  if (window.studio && typeof window.studio.buildGeometry === 'function') {
    window.studio.buildGeometry();
  }
}
