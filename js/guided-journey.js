/**
 * THE INDIAN GARAGE CO. — "BUILT IN LAYERS" EXPERIENTIAL CONTROLLER
 * Bagel-Stacking 3D Layer Mechanics, Natural Scroll/Click Stepper & Store Directory
 */

document.addEventListener('DOMContentLoaded', () => {
  initLayeredStepper();
  initStoreDirectoryDrawer();
  initAnchorDeepLinks();
});

let currentLayer = 1;
const TOTAL_LAYERS = 4;
let isThrottled = false;

// ============================================================================
// 1. LAYERED JOURNEY STEPPER CONTROLLER
// ============================================================================
function initLayeredStepper() {
  const prevBtn = document.getElementById('btn-layer-prev');
  const nextBtn = document.getElementById('btn-layer-next');
  const dots = document.querySelectorAll('.stepper-dot');
  const navPills = document.querySelectorAll('.layer-nav-btn');

  // Next / Prev button events
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentLayer > 1) {
        setLayer(currentLayer - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentLayer < TOTAL_LAYERS) {
        setLayer(currentLayer + 1);
      }
    });
  }

  // Stepper dots click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetStep = parseInt(dot.getAttribute('data-step'), 10);
      if (targetStep >= 1 && targetStep <= TOTAL_LAYERS) {
        setLayer(targetStep);
      }
    });
  });

  // Top header nav pills click
  navPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const targetStep = parseInt(pill.getAttribute('data-step'), 10);
      if (targetStep >= 1 && targetStep <= TOTAL_LAYERS) {
        setLayer(targetStep);
      }
    });
  });

  // Keyboard navigation (Arrow keys & Space)
  window.addEventListener('keydown', (e) => {
    // If a modal is open or user is in an input field, do not hijack
    if (document.querySelector('.stores-drawer-overlay.active')) {
      if (e.key === 'Escape') {
        closeStoresDrawer();
      }
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (currentLayer < TOTAL_LAYERS) {
        e.preventDefault();
        setLayer(currentLayer + 1);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (currentLayer > 1) {
        e.preventDefault();
        setLayer(currentLayer - 1);
      }
    }
  });

  // Natural Wheel / Scroll-based Layer Stacking
  window.addEventListener('wheel', (e) => {
    // Do not hijack scroll if drawer is open
    if (document.querySelector('.stores-drawer-overlay.active')) return;

    if (Math.abs(e.deltaY) < 30) return; // ignore subtle trackpad jitter

    if (!isThrottled) {
      if (e.deltaY > 0 && currentLayer < TOTAL_LAYERS) {
        setLayer(currentLayer + 1);
        throttleWheel(700);
      } else if (e.deltaY < 0 && currentLayer > 1) {
        setLayer(currentLayer - 1);
        throttleWheel(700);
      }
    }
  }, { passive: true });

  // Touch swipe support on mobile
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (document.querySelector('.stores-drawer-overlay.active')) return;
    if (!e.changedTouches.length) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 45 && !isThrottled) {
      if (diff > 0 && currentLayer < TOTAL_LAYERS) {
        setLayer(currentLayer + 1);
        throttleWheel(600);
      } else if (diff < 0 && currentLayer > 1) {
        setLayer(currentLayer - 1);
        throttleWheel(600);
      }
    }
  }, { passive: true });

  // Initialize Layer 1
  setLayer(1);
}

function throttleWheel(duration = 700) {
  isThrottled = true;
  setTimeout(() => {
    isThrottled = false;
  }, duration);
}

// Set Active Layer & Trigger Stacking Physics
function setLayer(layerIndex) {
  currentLayer = Math.min(Math.max(layerIndex, 1), TOTAL_LAYERS);

  // 1. Update Body Attribute (Triggers 3D CSS Stacking & Ambient Glow)
  document.body.setAttribute('data-active-layer', currentLayer);

  // 2. Update Left-Side Story Panels
  const storyPanels = document.querySelectorAll('.story-panel');
  storyPanels.forEach(panel => {
    const step = parseInt(panel.getAttribute('data-step'), 10);
    if (step === currentLayer) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // 3. Update Stepper Dots
  const dots = document.querySelectorAll('.stepper-dot');
  dots.forEach(dot => {
    const step = parseInt(dot.getAttribute('data-step'), 10);
    if (step === currentLayer) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // 4. Update Header Nav Pills
  const navPills = document.querySelectorAll('.layer-nav-btn');
  navPills.forEach(pill => {
    const step = parseInt(pill.getAttribute('data-step'), 10);
    if (step === currentLayer) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  // 5. Update Stepper Counter Text
  const counterCurrent = document.querySelector('.current-step');
  if (counterCurrent) {
    counterCurrent.textContent = `0${currentLayer}`;
  }

  // 6. Update Arrow Buttons Disabled State
  const prevBtn = document.getElementById('btn-layer-prev');
  const nextBtn = document.getElementById('btn-layer-next');
  if (prevBtn) prevBtn.disabled = currentLayer === 1;
  if (nextBtn) nextBtn.disabled = currentLayer === TOTAL_LAYERS;
}

// ============================================================================
// 2. STORES DIRECTORY MODAL / DRAWER CONTROLLER
// ============================================================================
function initStoreDirectoryDrawer() {
  const drawerOverlay = document.getElementById('store-directory-drawer');
  const openButtons = document.querySelectorAll('.btn-open-stores-drawer');
  const closeBtn = document.getElementById('btn-close-stores-drawer');

  if (!drawerOverlay) return;

  // Open drawer
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openStoresDrawer();
    });
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeStoresDrawer();
    });
  }

  // Close on outside click
  drawerOverlay.addEventListener('click', (e) => {
    if (e.target === drawerOverlay) {
      closeStoresDrawer();
    }
  });

  // Region filtering inside drawer
  const filterPills = document.querySelectorAll('.region-filter-pill');
  const storeCards = document.querySelectorAll('.store-compact-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-region');

      storeCards.forEach(card => {
        const region = card.getAttribute('data-region');
        if (filter === 'all' || region === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

function openStoresDrawer() {
  const drawer = document.getElementById('store-directory-drawer');
  if (drawer) {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeStoresDrawer() {
  const drawer = document.getElementById('store-directory-drawer');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ============================================================================
// 3. ANCHOR & DEEP LINK HANDLER (#retail-network)
// ============================================================================
function initAnchorDeepLinks() {
  const hash = window.location.hash;

  if (hash === '#retail-network' || hash === '#store-footprint') {
    // Jump to Layer 2 (Retail Network)
    setTimeout(() => {
      setLayer(2);
    }, 150);
  } else if (hash === '#craft' || hash === '#velocity') {
    setTimeout(() => {
      setLayer(3);
    }, 150);
  } else if (hash === '#vision' || hash === '#journey') {
    setTimeout(() => {
      setLayer(4);
    }, 150);
  }

  // Intercept anchor clicks on page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#retail-network' || href === '#store-footprint') {
        e.preventDefault();
        setLayer(2);
        if (history.pushState) history.pushState(null, null, '#retail-network');
      } else if (href === '#brand-story' || href === '#foundation') {
        e.preventDefault();
        setLayer(1);
      } else if (href === '#craft' || href === '#velocity') {
        e.preventDefault();
        setLayer(3);
      } else if (href === '#vision' || href === '#journey') {
        e.preventDefault();
        setLayer(4);
      }
    });
  });
}
