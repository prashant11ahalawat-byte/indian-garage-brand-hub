/**
 * The Indian Garage Co. — Brand Catalogue Master Interactive Controller
 * Foley Sound Interactivity, 14-Day Scrubber, 3D Card Tilts & Terminal Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initCatalogueSoundInteractions();
  initFastNavigation();
  initMobileNavigation();
  initLookbookFilter();
  initStoreFilter();
  initVelocityScrubber();
  initTriForceCardTilts();
  initPartnershipTerminal();
  initPartnershipModal();
  init3DStudio();
});

// ============================================================================
// 00. FAST HEADER NAVIGATION & MOBILE GLASS DRAWER
// ============================================================================
function initFastNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });

          const drawer = document.getElementById('mobile-nav-drawer');
          if (drawer) drawer.style.display = 'none';

          if (window.soundFX && window.soundFX.playClickSnap) {
            window.soundFX.playClickSnap();
          }
        }
      }
    });
  });
}

function initMobileNavigation() {
  const toggleBtn = document.getElementById('btn-mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('btn-mobile-drawer-close');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = drawer.style.display === 'flex';
      drawer.style.display = isVisible ? 'none' : 'flex';
      if (window.soundFX) window.soundFX.playClickSnap();
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.style.display = 'none';
      if (window.soundFX) window.soundFX.playClickSnap();
    });
  }

  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.style.display = 'none';
      }
    });
  }
}

// ============================================================================
// 01. SOUND DESIGN & FOLEY AUDIO INTERACTIONS
// ============================================================================
function initCatalogueSoundInteractions() {
  const soundToggleBtn = document.getElementById('btn-sound-toggle');
  const soundLabel = document.getElementById('sound-toggle-label');
  const waveBars = document.getElementById('sound-wave-bars');

  if (soundToggleBtn && window.soundFX) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isEnabled = window.soundFX.toggleSound();
      soundToggleBtn.classList.toggle('muted', !isEnabled);
      if (soundLabel) soundLabel.textContent = isEnabled ? 'FX: ON' : 'FX: OFF';
      if (waveBars) {
        waveBars.style.opacity = isEnabled ? '1' : '0.25';
      }
      if (isEnabled) {
        window.soundFX.playClickSnap();
      }
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
      stage: "Phase 01 • Marketplace Demand Intelligence",
      title: "Real-Time Search & Sell-Through Signal Tracking",
      desc: "Rather than guessing 6 months in advance, our merchandising desk tracks live search queries, cart additions, and category sell-through velocity across Myntra (#1 external brand), Ajio, and tigc.in to identify breakout styles immediately."
    },
    2: {
      stage: "Phase 02 • Rapid Design Sprints & Spec Sheets",
      title: "In-House Bengaluru & Indore Design Studios",
      desc: "Design pods rapidly translate breakout global silhouettes into South Asian ergonomic pattern blocks, generating precision CAD tech-packs with detailed seam, stitch, and wash parameters."
    },
    3: {
      stage: "Phase 03 • Pre-Committed Raw Fabric Allocation",
      title: "Direct Strategic Sourcing from Textile Hubs",
      desc: "Pre-tested, certified fabric inventory (13.5oz ring-spun denim, 60s combed cotton, 320 GSM waffle knits) is immediately allocated from partner mills in Surat, Tirupur, and Ahmedabad."
    },
    4: {
      stage: "Phase 04 • High-Yield CAD Marker Optimization",
      title: "94%+ Fabric Utilization with Minimal Waste",
      desc: "Digital marker engineering algorithms calculate high-density nesting across fabric rolls, ensuring maximum yield, optimal grain alignment, and minimal cutting room scrap."
    },
    5: {
      stage: "Phase 05 • Precision Multi-Ply Cutting Sprints",
      title: "Tight-Tolerance Pilot Micro-Batches",
      desc: "Dedicated cutting tables process pilot micro-batches of 500 to 1,000 units with strict dimensional tolerances and clean edge binding."
    },
    6: {
      stage: "Phase 06 • 100+ Decentralized Factory Pod Assembly",
      title: "Modular Sewing Pods in Indore, Surat & Tirupur",
      desc: "Our asset-light network of 100+ dedicated garment pods handles rapid stitching, integrating 14-point military-grade bartack reinforcements and dual-tone copper chain-stitching."
    },
    7: {
      stage: "Phase 07 • Industrial Enzyme & Specialty Finishing",
      title: "Authentic Hand-Feel & Controlled Abrasion",
      desc: "Denim and woven tops undergo precision enzyme washing, whiskering, and softening baths to achieve authentic vintage character with strict effluent compliance."
    },
    8: {
      stage: "Phase 08 • Sanforization & AQL 1.5 Quality Gates",
      title: "Dimensional Stability & Tensile Verification",
      desc: "Post-wash heat drying limits residual shrinkage to < 1.5%. Experienced QA inspectors conduct 100% seam integrity, tensile snapback, and colour-fastness audits."
    },
    9: {
      stage: "Phase 09 • Signature Hardware & Dual-Tone Labeling",
      title: "Die-Cast Matte Gunmetal Shanks & Rivets",
      desc: "Official Indian Garage branding elements, reinforced waistband patches, and premium gunmetal buttons are securely attached with pneumatic presses."
    },
    10: {
      stage: "Phase 10 • Barcoding & Increff WMS Serialization",
      title: "99.99% Inventory Accuracy & Smart Bagging",
      desc: "Every single piece is serialized and scanned into our Increff WMS/OMS inventory infrastructure, enabling real-time stock visibility across all fulfillment centers."
    },
    11: {
      stage: "Phase 11 • Central DC Hub Transit & Cross-Docking",
      title: "Rapid Dispatch via Dedicated Logistics Lines",
      desc: "Finished batches arrive at our Bengaluru central fulfillment hub for high-speed cross-dock sorting within 24 hours of factory gate dispatch."
    },
    12: {
      stage: "Phase 12 • Marketplace Dark Store & EBO Stocking",
      title: "Simultaneous Multi-Channel Ingestion",
      desc: "Micro-batch inventory is cross-docked simultaneously to Myntra, Ajio, Flipkart, and Amazon fulfillment dark stores, as well as 18+ live retail stores."
    },
    13: {
      stage: "Phase 13 • Digital Go-Live & Conversion Push",
      title: "Instant Merchandising on tigc.in & Marketplaces",
      desc: "Styles go live with rich product imagery, accurate size charts, and targeted digital acquisition campaigns, capturing early consumer demand instantly."
    },
    14: {
      stage: "Phase 14 • 48-Hour Sell-Through: Repeat or Kill",
      title: "88% Sell-Through Benchmark • Zero Dead Stock",
      desc: "48-hour sell-through telemetry determines next steps: high-demand winners trigger automated 10,000+ unit mass production runs, while slow movers are discontinued with zero trapped capital."
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

// ============================================================================
// 08. RETAIL STORES & EBO LOCATOR FILTER
// ============================================================================
function initStoreFilter() {
  const storeFilterBtns = document.querySelectorAll('.store-filter-pill');
  const storeCards = document.querySelectorAll('.store-location-card');

  storeFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      storeFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const city = btn.getAttribute('data-city');
      storeCards.forEach(card => {
        if (city === 'all' || card.getAttribute('data-city') === city) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.soundFX && window.soundFX.playClickSnap) {
        window.soundFX.playClickSnap();
      }
    });
  });
}
