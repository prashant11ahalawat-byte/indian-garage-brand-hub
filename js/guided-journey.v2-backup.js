/**
 * THE INDIAN GARAGE CO. — GUIDED SCROLL JOURNEY CONTROLLER
 * Handles scroll-driven step tracking, store filtering, and franchise conversion
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollJourneyTracker();
  initStoreDirectoryFilter();
  initFranchiseFormHandler();
  initSmoothScrollLinks();
});

// ============================================================================
// 1. SCROLL-DRIVEN STEP TRACKER (Apple-Style Active Step Highlighting)
// ============================================================================
function initScrollJourneyTracker() {
  const sections = document.querySelectorAll('.journey-section');
  const stepButtons = document.querySelectorAll('.journey-step-btn');
  
  if (!sections.length || !stepButtons.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        stepButtons.forEach(btn => {
          const href = btn.getAttribute('href');
          if (href === `#${id}`) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

// ============================================================================
// 2. SMOOTH SCROLLING FOR ALL JOURNEY NAVIGATION
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
        }
      }
    });
  });
}

// ============================================================================
// 3. STORE DIRECTORY FILTERING (23 Live EBOs)
// ============================================================================
function initStoreDirectoryFilter() {
  const filterPills = document.querySelectorAll('.region-filter-pill');
  const storeCards = document.querySelectorAll('.store-compact-card');

  if (!filterPills.length || !storeCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Toggle active pill state
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-region');

      storeCards.forEach(card => {
        const region = card.getAttribute('data-region');
        if (filter === 'all' || region === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
        }
      });
    });
  });
}

// ============================================================================
// 4. FRANCHISE INQUIRY FORM & WHATSAPP DIRECT CONNECT
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

    // Configure WhatsApp Message Pre-fill
    const message = encodeURIComponent(
      `Hello Indian Garage Retail Directorate,\n\nI am interested in applying for a TIGC Franchise EBO:\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email}\n• City: ${city}\n• Proposed Space: ${location}\n• Investment Range: ${budget}\n\nPlease share the franchise prospectus and discovery schedule.`
    );

    if (whatsappBtn) {
      whatsappBtn.href = `https://api.whatsapp.com/send?phone=919880000000&text=${message}`;
    }

    // Transition to success card
    form.style.display = 'none';
    successState.style.display = 'block';

    // Auto-scroll slightly to focus on the success card
    successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
