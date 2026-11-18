/**
 * The Indian Garage Co. — Brand Catalogue Master Interactive Controller
 * Foley Sound Interactivity, 14-Day Scrubber, 3D Card Tilts & Terminal Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCatalogueSoundInteractions();
  initLookbookFilter();
  initVelocityScrubber();
  initTriForceCardTilts();
  initPartnershipTerminal();
  initPartnershipModal();
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
  const hoverTargets = document.querySelectorAll('.btn-catalogue-primary, .btn-catalogue-ghost, .denim-wash-pill, .btn-explode-control, .triforce-card, .denim-spec-card, .nav-link-pill, .switch-brandbook-btn, .lookbook-filter-pill, .lookbook-card, .story-pillar-card, .story-timeline-card, .btn-inspect-3d, .btn-shop-tigc');
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
// 02. KINETIC 14-DAY VELOCITY MACHINE SCRUBBER (Complete 14-Day Micro-Batch Mapping)
// ============================================================================
function initVelocityScrubber() {
  const scrubber = document.getElementById('velocity-scrubber');
  const dispDay = document.getElementById('velocity-disp-day');
  const dispStage = document.getElementById('velocity-disp-stage');
  const dispTitle = document.getElementById('velocity-disp-title');
  const dispDesc = document.getElementById('velocity-disp-desc');

  if (!scrubber || !dispDay) return;

  const velocityStages = {
    1: {
      stage: "Phase 01 • Social AI Signal Harvesting",
      title: "2.4M Social Signals & Global Runway Scraping",
      desc: "Neural scrapers analyze over 2.4 Million social signals, street style drops, and Pinterest boards weekly to isolate breakout silhouettes and fabric weights before legacy brands notice."
    },
    2: {
      stage: "Phase 02 • Rapid Prototyping & Fabric Pairing",
      title: "Rapid Prototyping & Fabric Pairing",
      desc: "Design pods in Indore and Bengaluru map identified trends to proven South Asian morphological pattern blocks and allocate pre-tested raw fabric stock."
    },
    3: {
      stage: "Phase 03 • Virtual Pattern Calibration",
      title: "Virtual Pattern Grading & Indian Body Calibration",
      desc: "Digital 3D samples constructed on virtual South Asian avatars, locking waist-rise tension and thigh ease without cutting physical sample fabric."
    },
    4: {
      stage: "Phase 04 • Zero-Waste Digital Nesting",
      title: "Zero-Waste Fabric Optimization",
      desc: "Automated algorithmic pattern nesting achieves 94% textile utilization across ring-spun cotton and waffle-knit rolls, eliminating cutting waste."
    },
    5: {
      stage: "Phase 05 • High-Speed CNC Laser Cutting",
      title: "Automated Multi-Ply Precision Cutting",
      desc: "Computer-controlled laser cutting tables slice 300-unit test batches in under 45 minutes with microscopic edge precision and zero fraying."
    },
    6: {
      stage: "Phase 06 • Decentralized Factory Pod Assembly",
      title: "100+ Agile Factory Pods in Motion",
      desc: "Specialized modular manufacturing pods in Indore, Surat, and Tirupur stitch garments with 14-point military-grade bartack reinforcements."
    },
    7: {
      stage: "Phase 07 • Sustainable Waterless Ozone Wash",
      title: "Eco-Friendly Finishing & Water Reduction",
      desc: "Denim and casuals undergo waterless ozone bleaching and laser whiskering, slashing chemical and water use by 65% compared to conventional mills."
    },
    8: {
      stage: "Phase 08 • Heat Curing & Peach Soft-Finish",
      title: "Shrinkage Stabilization & Velvet Touch",
      desc: "Sanforization chambers lock shrinkage to under 1.5%, followed by an organic enzyme velvet wash for luxurious all-day skin comfort."
    },
    9: {
      stage: "Phase 09 • AQL 1.5 Integrity Audit",
      title: "Tensile Pull Tests & Laundry Stress Cycles",
      desc: "Garments pass military-grade tensile pull tests, wash-shrinkage checks, and zipper cycle endurance tests across 200+ simulated domestic laundry runs."
    },
    10: {
      stage: "Phase 10 • Digital RFID Serialization",
      title: "Smart Inventory Tracking & Packaging",
      desc: "Every single piece receives unique RFID serialization and barcode tracking for realtime shelf inventory reconciliation."
    },
    11: {
      stage: "Phase 11 • Central Hub Express Dispatch",
      title: "Automated Sorting & Fleet Allocation",
      desc: "Indore central logistics facility routes batches directly to express transit networks serving metro corridors within 24 hours."
    },
    12: {
      stage: "Phase 12 • Omnichannel Shelf Synchronization",
      title: "Simultaneous EBO & E-Commerce Dark Store Drop",
      desc: "Micro-batch inventory arrives simultaneously at 20+ flagship EBO stores (Bengaluru, Lucknow, Kochi) and top e-commerce fulfillment dark stores."
    },
    13: {
      stage: "Phase 13 • Performance Digital Drop",
      title: "Targeted Performance Ads & VIP Member Drop",
      desc: "Styles go live on tigc.in, Myntra, Flipkart, and Ajio with real-time conversion pixel tracking and instant push notifications."
    },
    14: {
      stage: "Phase 14 • 48-Hour Algorithmic Scale or Kill",
      title: "88% Sell-Through Trigger: Mass Scale or Discontinue",
      desc: "Our demand engine tracks 48-hour sell-through velocity. Top performers trigger automated mass-production repeat batches; sluggish styles are discontinued with zero dead-stock residue."
    }
  };

  scrubber.addEventListener('input', (e) => {
    const dayNum = parseInt(e.target.value, 10);
    const s = velocityStages[dayNum];
    if (!s) return;

    dispDay.textContent = `DAY ${String(dayNum).padStart(2, '0')}`;
    dispStage.textContent = s.stage;
    dispTitle.textContent = s.title;
    dispDesc.textContent = s.desc;

    const progress = (dayNum - 1) / 13;
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
// 04. STRATEGIC SOURCING & PARTNERSHIP SIMULATOR
// ============================================================================
function initPartnershipTerminal() {
  const sliderCapacity = document.getElementById('term-slider-capacity') || document.getElementById('term-slider-area');
  const sliderRate = document.getElementById('term-slider-rate') || document.getElementById('term-slider-aov');
  const selectCategory = document.getElementById('term-select-category') || document.getElementById('term-select-tier');

  const dispCapacity = document.getElementById('term-disp-capacity') || document.getElementById('term-disp-area');
  const dispRate = document.getElementById('term-disp-rate') || document.getElementById('term-disp-aov');

  const outAnnualUnits = document.getElementById('term-out-annual-units') || document.getElementById('term-out-payback');
  const outMonthlyVal = document.getElementById('term-out-monthly-val') || document.getElementById('term-out-monthly');
  const outAnnualVal = document.getElementById('term-out-annual-val') || document.getElementById('term-out-annual');
  const outPayment = document.getElementById('term-out-payment') || document.getElementById('term-out-ebitda');
  const outVelocity = document.getElementById('term-out-velocity') || document.getElementById('term-out-capex');

  if (!sliderCapacity || !sliderRate) return;

  function recalculate() {
    const monthlyUnits = parseFloat(sliderCapacity.value);
    const unitRate = parseFloat(sliderRate.value);
    const multiplier = selectCategory ? parseFloat(selectCategory.value) || 1.0 : 1.0;

    if (dispCapacity) dispCapacity.textContent = `${monthlyUnits.toLocaleString()} units / month`;
    if (dispRate) dispRate.textContent = `₹${unitRate.toLocaleString()} / piece`;

    const effectiveMonthlyUnits = Math.round(monthlyUnits * multiplier);
    const annualUnits = effectiveMonthlyUnits * 12;
    const monthlyVal = effectiveMonthlyUnits * unitRate;
    const annualVal = monthlyVal * 12;

    if (outAnnualUnits) outAnnualUnits.textContent = `${(annualUnits / 1000).toFixed(0)}K Units / Year`;
    if (outMonthlyVal) outMonthlyVal.textContent = `₹${(monthlyVal / 100000).toFixed(1)} L`;
    if (outAnnualVal) outAnnualVal.textContent = `₹${(annualVal / 10000000).toFixed(2)} CR`;
    if (outPayment) outPayment.textContent = `30–45 Days (TMRW)`;
    if (outVelocity) outVelocity.textContent = `14-Day Sprint`;
  }

  [sliderCapacity, sliderRate, selectCategory].filter(Boolean).forEach(input => {
    input.addEventListener('input', () => {
      recalculate();
      if (window.soundFX) window.soundFX.playSliderChime(input.value / (input.max || 100));
    });
  });

  recalculate();
}

// ============================================================================
// 05. SOURCING & PARTNERSHIP INQUIRY MODAL
// ============================================================================
function initPartnershipModal() {
  const modal = document.getElementById('partner-pitch-modal') || document.getElementById('franchise-lead-modal');
  const openButtons = document.querySelectorAll('.btn-open-partner-modal, #btn-open-partner-pitch, #btn-open-franchise-lead');
  const btnClose = document.getElementById('btn-close-partner-modal') || document.getElementById('btn-close-lead-modal');
  const btnSubmit = document.getElementById('btn-submit-partner-pitch') || document.getElementById('btn-submit-lead');
  const msgSuccess = document.getElementById('partner-success-msg') || document.getElementById('lead-success-msg');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
      if (window.soundFX) window.soundFX.playClickSnap();
    });
  });

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
      const name = document.getElementById('partner-name')?.value.trim() || document.getElementById('lead-name')?.value.trim();
      const phone = document.getElementById('partner-phone')?.value.trim() || document.getElementById('lead-phone')?.value.trim();
      if (!name || !phone) {
        alert("Please enter your name/entity and phone/WhatsApp number.");
        return;
      }

      btnSubmit.textContent = "TRANSMITTING PROPOSAL...";
      btnSubmit.disabled = true;

      setTimeout(() => {
        if (msgSuccess) msgSuccess.style.display = 'block';
        if (window.soundFX) window.soundFX.playAnatomyCollapse();
        setTimeout(() => {
          modal.style.display = 'none';
          btnSubmit.textContent = "SUBMIT PARTNERSHIP PROPOSAL";
          btnSubmit.disabled = false;
        }, 2400);
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

// ============================================================================
// 07. REAL PRODUCT LOOKBOOK FILTER & 3D INSPECT SYNC
// ============================================================================
function initLookbookFilter() {
  const filterBtns = document.querySelectorAll('.lookbook-filter-pill');
  const cards = document.querySelectorAll('.lookbook-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.soundFX) window.soundFX.playClickSnap();
    });
  });

  // Connect "Inspect 3D" buttons on lookbook cards to 3D Showroom category switcher
  const inspectBtns = document.querySelectorAll('.btn-inspect-3d');
  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetCat = btn.getAttribute('data-target-cat');
      if (targetCat && window.tigcShowroom) {
        window.tigcShowroom.setCategory(targetCat);
        const showroomSection = document.getElementById('showroom');
        if (showroomSection) {
          showroomSection.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.soundFX) window.soundFX.playAnatomyExpand();
      }
    });
  });
}
