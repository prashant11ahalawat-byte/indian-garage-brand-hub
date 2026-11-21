/**
 * THE INDIAN GARAGE CO. — MULTI-AUDIENCE BRAND HUB CONTROLLER
 * GPU-Composited Apple Scroll-Linked Motion, Dynamic Audience Switching & Partner Portals
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initScrollRevealObserver();
  initAudienceSwitcher();
  initPartnerTabSwitcher();
  initStoreDirectoryFilter();
  initFranchiseFormHandler();
  initVendorFormHandler();
  initSmoothScrollLinks();
});

// ============================================================================
// 1. APPLE SCROLL READING PROGRESS BAR & HEADER SCROLL COMPRESSION
// ============================================================================
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const header = document.querySelector('.journey-header');
  
  if (!progressBar && !header) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

        if (progressBar) {
          progressBar.style.transform = `scaleX(${progress})`;
        }

        if (header) {
          if (scrollTop > 40) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ============================================================================
// 2. GPU-COMPOSITED SCROLL REVEAL OBSERVER (Transform & Opacity Only)
// ============================================================================
function initScrollRevealObserver() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  // Accessibility Check: Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target); // Reveal once for optimal 60fps performance
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================================================
// 3. MULTI-AUDIENCE MODE SWITCHER (Brand, Vendors, Franchise)
// ============================================================================
function initAudienceSwitcher() {
  const audienceButtons = document.querySelectorAll('.audience-mode-btn');
  const sections = document.querySelectorAll('.journey-section');
  
  if (!audienceButtons.length) return;

  // Click handler on audience pills
  audienceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = btn.getAttribute('data-target');
      const targetElement = document.querySelector(targetSelector);

      audienceButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll sync: highlight active audience pill as user traverses sections
  const sectionAudienceMap = {
    'brand-story': '#brand-story',
    'brand-hook': '#brand-story',
    'manufacturing-categories': '#manufacturing-categories',
    'retail-network': '#retail-network',
    'store-footprint': '#retail-network',
    'partner-portal': '#partner-portal',
    'franchise-opportunity': '#partner-portal'
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const targetHash = sectionAudienceMap[id] || `#${id}`;

        audienceButtons.forEach(btn => {
          if (btn.getAttribute('data-target') === targetHash) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
          } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
          }
        });
      }
    });
  }, {
    rootMargin: '-25% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(sec => navObserver.observe(sec));
}

// ============================================================================
// 4. DUAL-TAB PARTNER PORTAL (Franchise vs. Vendor Sourcing)
// ============================================================================
function initPartnerTabSwitcher() {
  const tabButtons = document.querySelectorAll('.partner-tab-btn');
  const panels = document.querySelectorAll('.partner-panel');

  if (!tabButtons.length || !panels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

// ============================================================================
// 5. STORE DIRECTORY FILTERING (24 Live Outlets Across 8 States)
// ============================================================================
function initStoreDirectoryFilter() {
  const filterPills = document.querySelectorAll('.region-filter-pill');
  const storeCards = document.querySelectorAll('.store-compact-card');

  if (!filterPills.length || !storeCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-region');

      storeCards.forEach(card => {
        const region = card.getAttribute('data-region');
        if (filter === 'all' || region === filter) {
          card.style.display = 'flex';
          window.requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translate3d(0, 0, 0)';
          });
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translate3d(0, 10px, 0)';
        }
      });
    });
  });
}

// ============================================================================
// 6. FRANCHISE INQUIRY FORM & WHATSAPP DIRECT CONNECT
// ============================================================================
function initFranchiseFormHandler() {
  const form = document.getElementById('franchise-inquiry-form');
  const successState = document.getElementById('form-success-box');
  const whatsappBtn = document.getElementById('btn-whatsapp-connect');

  if (!form || !successState) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('applicant-name')?.value.trim() || '';
    const phone = document.getElementById('applicant-phone')?.value.trim() || '';
    const email = document.getElementById('applicant-email')?.value.trim() || '';
    const city = document.getElementById('applicant-city')?.value.trim() || '';
    const location = document.getElementById('applicant-location')?.value.trim() || '';
    const budget = document.getElementById('applicant-budget')?.value || '';

    if (!name || !phone || !city) {
      alert('Please fill in your name, contact phone number, and proposed city.');
      return;
    }

    const message = encodeURIComponent(
      `Hello Indian Garage Retail Directorate,\n\nI am interested in applying for a TIGC Franchise EBO:\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email}\n• City: ${city}\n• Proposed Space: ${location}\n• Investment Range: ${budget}\n\nPlease share the franchise prospectus and discovery schedule.`
    );

    if (whatsappBtn) {
      whatsappBtn.href = `https://api.whatsapp.com/send?phone=919880000000&text=${message}`;
    }

    form.style.display = 'none';
    successState.style.display = 'block';
    successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ============================================================================
// 7. VENDOR & MANUFACTURING REGISTRATION FORM HANDLER
// ============================================================================
function initVendorFormHandler() {
  const vendorForm = document.getElementById('vendor-inquiry-form');
  const vendorSuccess = document.getElementById('vendor-success-box');
  const vendorWhatsAppBtn = document.getElementById('btn-vendor-whatsapp-connect');

  if (!vendorForm || !vendorSuccess) return;

  vendorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const factory = document.getElementById('vendor-company-name')?.value.trim() || '';
    const contact = document.getElementById('vendor-contact-name')?.value.trim() || '';
    const phone = document.getElementById('vendor-phone')?.value.trim() || '';
    const city = document.getElementById('vendor-city')?.value.trim() || '';
    const category = document.getElementById('vendor-category')?.value || '';
    const capacity = document.getElementById('vendor-capacity')?.value || '';

    if (!factory || !contact || !phone) {
      alert('Please provide your manufacturing firm name, contact person, and phone number.');
      return;
    }

    const message = encodeURIComponent(
      `Hello Indian Garage Sourcing & Manufacturing Directorate,\n\nWe would like to register as a TIGC Manufacturing Partner:\n• Facility/Firm: ${factory}\n• Contact Person: ${contact}\n• Phone: ${phone}\n• Manufacturing Location: ${city}\n• Product Category: ${category}\n• Monthly Capacity: ${capacity}\n\nPlease share vendor onboarding compliance parameters and sample specifications.`
    );

    if (vendorWhatsAppBtn) {
      vendorWhatsAppBtn.href = `https://api.whatsapp.com/send?phone=919880000000&text=${message}`;
    }

    vendorForm.style.display = 'none';
    vendorSuccess.style.display = 'block';
    vendorSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// ============================================================================
// 8. SMOOTH SCROLLING FOR ALL NAVIGATION & AUDIENCE ANCHORS
// ============================================================================
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      }
    });
  });
}
