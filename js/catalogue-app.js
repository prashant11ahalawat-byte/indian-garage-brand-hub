/**
 * The Indian Garage Co. — Brand Catalogue Master Interactive Controller
 * Foley Sound Interactivity, 14-Day Scrubber, 3D Card Tilts & Terminal Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCatalogueSoundInteractions();
  initVelocityScrubber();
  initTriForceCardTilts();
  initFranchiseTerminal();
  initFranchiseModal();
  init3DStudio();
});

// ============================================================================
// 01. SOUND DESIGN & FOLEY AUDIO INTERACTIONS
// ============================================================================
function initCatalogueSoundInteractions() {
  const soundToggleBtn = document.getElementById('btn-sound-toggle');
  const soundLabel = document.getElementById('sound-toggle-label');
  const waveBars = document.getElementById('sound-wave-bars');

  if (soundToggleBtn && window.soundFX) {
    soundToggleBtn.addEventListener('click', () => {
      const isEnabled = window.soundFX.toggleSound();
      if (soundLabel) soundLabel.textContent = isEnabled ? 'SOUND FX: ON' : 'SOUND FX: OFF';
      if (waveBars) {
        waveBars.style.opacity = isEnabled ? '1' : '0.3';
      }
      if (isEnabled) window.soundFX.playClickSnap();
    });
  }

  // Attach hover & click sound triggers to all interactive elements
  const hoverTargets = document.querySelectorAll('.btn-catalogue-primary, .btn-catalogue-ghost, .denim-wash-pill, .btn-explode-control, .triforce-card, .denim-spec-card, .nav-link-pill, .switch-brandbook-btn');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (window.soundFX) window.soundFX.playHoverTick();
    });
    el.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClickSnap();
    });
  });
}

// ============================================================================
// 02. KINETIC 14-DAY VELOCITY MACHINE SCRUBBER
// ============================================================================
function initVelocityScrubber() {
  const scrubber = document.getElementById('velocity-scrubber');
  const dispDay = document.getElementById('velocity-disp-day');
  const dispStage = document.getElementById('velocity-disp-stage');
  const dispTitle = document.getElementById('velocity-disp-title');
  const dispDesc = document.getElementById('velocity-disp-desc');

  if (!scrubber || !dispDay) return;

  const velocityStages = [
    {
      day: "01",
      stage: "STAGE 01 // SOCIAL AI HARVESTING",
      title: "Algorithmic Runway & Streetwear Signal Detection",
      desc: "Our neural scrapers analyze over 2.4 Million social signals, runway drops, and Pinterest boards weekly to isolate breakout silhouettes and fabric weights before legacy brands notice."
    },
    {
      day: "03",
      stage: "STAGE 02 // 3D CAD MORPHOLOGICAL DRAFTING",
      title: "Virtual Pattern Grading & Indian Body Calibration",
      desc: "Digital 3D samples constructed on virtual South Asian avatar avatars, refining waist-rise tension and thigh contouring without cutting physical sample fabric."
    },
    {
      day: "06",
      stage: "STAGE 03 // LASER PRECISION & OZONE WASH",
      title: "300-Unit Micro-Batch Automated Production",
      desc: "Fabric digitally nested and cut by automated high-speed laser tables. Denim washes undergo eco-friendly ozone bleaching, eliminating chlorine and slashing water use by 65%."
    },
    {
      day: "09",
      stage: "STAGE 04 // AQL 1.5 INTEGRITY AUDIT",
      title: "14-Point Stress Testing & Bartack Reinforcement",
      desc: "Garments pass military-grade tensile pull tests, wash-shrinkage checks, and zipper cycle tests across 100+ vetted domestic manufacturing clusters."
    },
    {
      day: "12",
      stage: "STAGE 05 // FAST-TRACK METRO DEPLOYMENT",
      title: "EBO Flagship & E-Commerce Drop Synchronization",
      desc: "Micro-batch inventory arrives simultaneously at 20+ flagship EBO stores (Brigade Road Bengaluru, Lucknow, Kochi) and top e-commerce fulfillment hubs."
    },
    {
      day: "14",
      stage: "STAGE 06 // ALGORITHMIC SCALE OR KILL",
      title: "Real-Time Sell-Through Velocity Trigger",
      desc: "Our demand engine tracks 48-hour sell-through velocity. Top performers trigger automated mass-production repeat batches; sluggish styles are discontinued with zero dead-stock residue."
    }
  ];

  scrubber.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    const progress = (val - 1) / 13;
    const stageIdx = Math.min(velocityStages.length - 1, Math.floor(progress * velocityStages.length));
    const s = velocityStages[stageIdx];

    dispDay.textContent = `DAY ${s.day}`;
    dispStage.textContent = s.stage;
    dispTitle.textContent = s.title;
    dispDesc.textContent = s.desc;

    // Pitch-bending audio feedback
    if (window.soundFX) window.soundFX.playSliderChime(progress);
  });
}

// ============================================================================
// 03. TRI-FORCE 3D CARD PERSPECTIVE TILTS
// ============================================================================
function initTriForceCardTilts() {
  const cards = document.querySelectorAll('.triforce-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = ((y - centerY) / centerY) * -10;
      const rotY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}

// ============================================================================
// 04. FRANCHISE ROI TERMINAL ENGINE
// ============================================================================
function initFranchiseTerminal() {
  const sliderArea = document.getElementById('term-slider-area');
  const sliderFootfall = document.getElementById('term-slider-footfall');
  const sliderAov = document.getElementById('term-slider-aov');
  const selectTier = document.getElementById('term-select-tier');

  const dispArea = document.getElementById('term-disp-area');
  const dispFootfall = document.getElementById('term-disp-footfall');
  const dispAov = document.getElementById('term-disp-aov');

  const outPayback = document.getElementById('term-out-payback');
  const outMonthly = document.getElementById('term-out-monthly');
  const outAnnual = document.getElementById('term-out-annual');
  const outEbitda = document.getElementById('term-out-ebitda');
  const outCapex = document.getElementById('term-out-capex');

  if (!sliderArea || !sliderFootfall || !sliderAov || !selectTier) return;

  function recalculate() {
    const area = parseFloat(sliderArea.value);
    const footfall = parseFloat(sliderFootfall.value);
    const aov = parseFloat(sliderAov.value);
    const tier = parseFloat(selectTier.value);

    dispArea.textContent = `${area.toLocaleString()} SQ.FT`;
    dispFootfall.textContent = `${footfall.toLocaleString()} VISITORS / DAY`;
    dispAov.textContent = `₹${aov.toLocaleString()} / TICKET`;

    // Benchmark formulas
    const conversion = 0.185;
    const monthlyBills = footfall * 30 * conversion * tier;
    const monthlyRev = monthlyBills * aov;
    const annualRev = monthlyRev * 12;

    const grossMargin = monthlyRev * 0.44;
    const rentRate = tier >= 1.15 ? 140 : (tier < 0.95 ? 65 : 95);
    const rentCost = area * rentRate;
    const staffCost = Math.max(4, Math.round(area / 350)) * 28000;
    const opsCost = (area * 32) + (monthlyRev * 0.02);

    const monthlyEbitda = Math.max(120000, grossMargin - (rentCost + staffCost + opsCost));
    const capex = (area * 2200) + (area * 1800) + 500000;
    const paybackMonths = (capex / monthlyEbitda).toFixed(1);

    outPayback.textContent = `${paybackMonths} MO`;
    outMonthly.textContent = `₹${(monthlyRev / 100000).toFixed(1)} L`;
    outAnnual.textContent = `₹${(annualRev / 10000000).toFixed(2)} CR`;
    outEbitda.textContent = `₹${(monthlyEbitda / 100000).toFixed(1)} L`;
    outCapex.textContent = `₹${(capex / 100000).toFixed(1)} L`;
  }

  [sliderArea, sliderFootfall, sliderAov, selectTier].forEach(input => {
    input.addEventListener('input', () => {
      recalculate();
      if (window.soundFX) window.soundFX.playSliderChime(input.value / input.max);
    });
  });

  recalculate();
}

// ============================================================================
// 05. FRANCHISE INQUIRY MODAL
// ============================================================================
function initFranchiseModal() {
  const modal = document.getElementById('franchise-lead-modal');
  const btnOpen = document.getElementById('btn-open-franchise-lead');
  const btnClose = document.getElementById('btn-close-lead-modal');
  const btnSubmit = document.getElementById('btn-submit-lead');
  const msgSuccess = document.getElementById('lead-success-msg');

  if (!modal) return;

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      modal.style.display = 'flex';
      if (window.soundFX) window.soundFX.playClickSnap();
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      modal.style.display = 'none';
      if (window.soundFX) window.soundFX.playClickSnap();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      const name = document.getElementById('lead-name')?.value.trim();
      const phone = document.getElementById('lead-phone')?.value.trim();
      if (!name || !phone) {
        alert("Please enter your name and phone/WhatsApp number.");
        return;
      }

      btnSubmit.textContent = "TRANSMITTING APPLICATION...";
      btnSubmit.disabled = true;

      setTimeout(() => {
        if (msgSuccess) msgSuccess.style.display = 'block';
        if (window.soundFX) window.soundFX.playAnatomyCollapse();
        setTimeout(() => {
          modal.style.display = 'none';
          btnSubmit.textContent = "SUBMIT FRANCHISE APPLICATION";
          btnSubmit.disabled = false;
        }, 2200);
      }, 600);
    });
  }
}

// ============================================================================
// 06. INITIALIZE THREE.JS 3D STUDIO
// ============================================================================
function init3DStudio() {
  if (window.tigc3D && typeof window.tigc3D.init === 'function') {
    window.tigc3D.init();
  }
}
