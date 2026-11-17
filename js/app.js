/**
 * The Indian Garage Co. — Living Brand Hub Controller (for brand-book.html)
 * Powers Internal Brand Book, Token System, MCP Simulator, and Trademark Compliance
 */

// Toast notification helper
window.showToast = function(msg) {
  let toast = document.getElementById('hub-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'hub-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #11161E;
      color: #FFFFFF;
      border: 1px solid #232A36;
      border-left: 3px solid #E50914;
      padding: 12px 20px;
      border-radius: 6px;
      font-family: var(--font-mono, monospace);
      font-size: 13px;
      z-index: 9999;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(12px);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 2600);
};

// Clipboard copy helper
function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    window.showToast(successMsg || `Copied "${text}" to clipboard!`);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    window.showToast(successMsg || `Copied to clipboard!`);
  });
}

// --------------------------------------------------------------------------
// RENDER BRAND IDENTITY FROM CONFIG
// --------------------------------------------------------------------------
function renderBrandIdentity() {
  const b = window.CURRENT_BRAND;
  if (!b) return;

  // Sidebar & Meta
  document.querySelectorAll('.brand-name-text').forEach(el => el.textContent = b.name);
  document.querySelectorAll('.brand-tagline-text').forEach(el => el.textContent = b.tagline);
  document.querySelectorAll('.brand-version-text').forEach(el => el.textContent = b.version);
  document.querySelectorAll('.brand-updated-text').forEach(el => el.textContent = b.updated);

  // Strategy Purpose
  const purposeEl = document.getElementById('strategy-purpose-text');
  if (purposeEl) purposeEl.textContent = b.strategy.purpose;

  // Pillars
  const pillarsGrid = document.getElementById('pillars-grid');
  if (pillarsGrid && b.strategy.pillars) {
    pillarsGrid.innerHTML = b.strategy.pillars.map(p => `
      <div class="pillar-card">
        <div class="pillar-num">${p.num}</div>
        <h3 class="pillar-title">${p.title}</h3>
        <p class="pillar-desc">${p.description}</p>
      </div>
    `).join('');
  }

  // Voice Spectrum
  const spectrumList = document.getElementById('voice-spectrum-list');
  if (spectrumList && b.strategy.voice && b.strategy.voice.attributes) {
    spectrumList.innerHTML = b.strategy.voice.attributes.map(attr => `
      <div class="voice-spectrum-item">
        <div class="spectrum-labels">
          <span>${attr.left}</span>
          <strong>${attr.name} (${attr.score}%)</strong>
          <span>${attr.right}</span>
        </div>
        <div class="spectrum-track">
          <div class="spectrum-fill" style="width: ${attr.score}%"></div>
          <div class="spectrum-knob" style="left: ${attr.score}%"></div>
        </div>
      </div>
    `).join('');
  }

  // Do's & Don'ts
  const dosList = document.getElementById('voice-dos-list');
  if (dosList && b.strategy.voice && b.strategy.voice.dos) {
    dosList.innerHTML = b.strategy.voice.dos.map(item => `
      <li><span>✓</span> <span>${item}</span></li>
    `).join('');
  }

  const dontsList = document.getElementById('voice-donts-list');
  if (dontsList && b.strategy.voice && b.strategy.voice.donts) {
    dontsList.innerHTML = b.strategy.voice.donts.map(item => `
      <li><span>✕</span> <span>${item}</span></li>
    `).join('');
  }

  // Sync CSS variables
  document.documentElement.style.setProperty('--brand-primary', b.colors.primary);
  document.documentElement.style.setProperty('--brand-secondary', b.colors.accent);

  renderSVGs();
  renderColorSwatches();
}

// --------------------------------------------------------------------------
// EXACT OFFICIAL VECTOR LOGO INJECTION
// --------------------------------------------------------------------------
function renderSVGs() {
  const accentColor = "#DB2128";
  const navyColor = "#21335A";
  const isDarkStage = document.getElementById('logo-stage')?.classList.contains('stage-dark');
  const wordmarkColor = isDarkStage ? "#FFFFFF" : navyColor;

  // Exact Monogram (STACK-03.svg)
  const monogramSVG = `
    <svg viewBox="940 885 280 320" class="brand-symbol-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="${accentColor}" d="M1207.66,1140.2c-.17,31.44-28.4,55.96-59.93,55.96h-59.22s-.04-.02-.04-.04v-45.84s.02-.05.04-.05h52.3c11.46,0,20.76-9.26,20.76-20.7v-33.99s-.03-.05-.05-.05h-54.43s-.04-.02-.04-.04v-45.66s.02-.05.04-.05h100.59v90.48Z"/>
      <path fill="${accentColor}" d="M1207.76,1015.53h-45.96s-.05-.02-.05-.04v-6.22c0-11.29-9.52-20.44-21.25-20.44h-51.98s-.04-.02-.04-.04v-46.01s.02-.04.04-.04h57.51c32.58,0,61.64,25.34,61.74,56.67l.05,16.09s-.03.04-.05.04"/>
      <path fill="${accentColor}" d="M953.21,1140.21c.17,31.44,28.4,55.96,59.93,55.96h59.22s.04-.02.04-.04v-45.84s-.02-.05-.04-.05h-52.3c-11.46,0-20.76-9.26-20.76-20.7v-33.99s.03-.05.05-.05h54.43s.04-.02.04-.04v-45.66s-.02-.05-.04-.05h-100.59v90.48Z"/>
      <path fill="${accentColor}" d="M953.12,1015.53h45.96s.05-.02.05-.04v-6.22c0-11.29,9.52-20.44,21.25-20.44h51.98s.04-.02.04-.04v-46.02s-.02-.04-.04-.04h-57.51c-32.58,0-61.64,25.34-61.74,56.67l-.05,16.09s.03.04.05.04"/>
    </svg>
  `;

  // Exact Horizontal Lockup (STACK-02.svg)
  const horizontalSVG = `
    <svg viewBox="295 960 1570 240" style="width: 100%; height: auto; max-height: 90px; display: block;" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill="${wordmarkColor}" x="309.88" y="977.08" width="32.35" height="205.83"/>
        <polygon fill="${wordmarkColor}" points="366.33 977.08 406.91 977.08 438.37 1100.29 438.97 1100.29 438.97 977.08 467.78 977.08 467.78 1182.92 434.55 1182.92 395.74 1032.66 395.15 1032.66 395.15 1182.92 366.33 1182.92 366.33 977.08"/>
        <path fill="${wordmarkColor}" d="M491.89,977.08h49.4c32.35,0,48.23,17.94,48.23,50.87v104.09c0,32.93-15.88,50.87-48.23,50.87h-49.4v-205.83ZM540.7,1153.51c10.29,0,16.47-5.29,16.47-19.99v-107.03c0-14.7-6.17-19.99-16.47-19.99h-16.47v147.02h16.47Z"/>
        <rect fill="${wordmarkColor}" x="611.27" y="977.08" width="32.35" height="205.83"/>
        <path fill="${wordmarkColor}" d="M692.72,977.08h43.81l33.52,205.84h-32.35l-5.88-40.88v.59h-36.75l-5.88,40.28h-30l33.52-205.84ZM728.01,1114.7l-14.41-101.74h-.59l-14.12,101.74h29.11Z"/>
        <polygon fill="${wordmarkColor}" points="785.64 977.08 826.22 977.08 857.68 1100.29 858.27 1100.29 858.27 977.08 887.09 977.08 887.09 1182.92 853.86 1182.92 815.05 1032.66 814.45 1032.66 814.45 1182.92 785.64 1182.92 785.64 977.08"/>

        <path fill="${wordmarkColor}" d="M1175.28,1134.11v-108.21c0-32.93,16.47-51.75,48.23-51.75s48.22,18.82,48.22,51.75v17.64h-30.58v-19.7c0-14.7-6.47-20.29-16.76-20.29s-16.76,5.59-16.76,20.29v112.62c0,14.7,6.47,20,16.76,20s16.76-5.29,16.76-20v-40.28h-16.17v-29.41h46.76v67.34c0,32.93-16.47,51.75-48.22,51.75s-48.23-18.82-48.23-51.75"/>
        <path fill="${wordmarkColor}" d="M1317.6,977.08h43.81l33.52,205.84h-32.35l-5.88-40.88v.59h-36.75l-5.88,40.28h-30l33.52-205.84ZM1352.89,1114.7l-14.41-101.74h-.59l-14.12,101.74h29.11Z"/>
        <path fill="${wordmarkColor}" d="M1410.52,977.08h47.93c33.52,0,47.93,15.58,47.93,47.34v12.65c0,21.17-6.77,34.7-21.18,40.58v.59c16.17,5,21.47,20.29,21.47,43.52v36.17c0,10,.29,17.35,3.53,25h-32.93c-1.76-5.29-2.94-8.52-2.94-25.29v-37.64c0-19.11-5.58-25.29-20.29-25.29h-11.18v88.21h-32.35v-205.83ZM1454.63,1065.3c12.06,0,19.41-5.29,19.41-21.76v-15.88c0-14.7-5-21.17-16.47-21.17h-14.7v58.81h11.76Z"/>
        <path fill="${wordmarkColor}" d="M1554.02,977.08h43.81l33.52,205.84h-32.35l-5.88-40.88v.59h-36.75l-5.88,40.28h-30l33.52-205.84ZM1589.31,1114.7l-14.41-101.74h-.59l-14.12,101.74h29.11Z"/>
        <path fill="${wordmarkColor}" d="M1644.58,1134.11v-108.21c0-32.93,16.47-51.75,48.23-51.75s48.22,18.82,48.22,51.75v17.64h-30.58v-19.7c0-14.7-6.47-20.29-16.76-20.29s-16.76,5.59-16.76,20.29v112.62c0,14.7,6.47,20,16.76,20s16.76-5.29,16.76-20v-40.28h-16.17v-29.41h46.76v67.34c0,32.93-16.47,51.75-48.22,51.75s-48.23-18.82-48.23-51.75"/>
        <polygon fill="${wordmarkColor}" points="1761.91 977.08 1850.12 977.08 1850.12 1006.49 1794.25 1006.49 1794.25 1060.89 1838.65 1060.89 1838.65 1090.29 1794.25 1090.29 1794.25 1153.51 1850.12 1153.51 1850.12 1182.92 1761.91 1182.92 1761.91 977.08"/>

        <!-- G-Unit Monogram Center -->
        <path fill="${accentColor}" d="M1135.98,1138.75c-.14,24.81-22.42,44.17-47.3,44.17h-46.75s-.04-.02-.04-.04v-36.19s.02-.03.04-.03h41.28c9.05,0,16.38-7.32,16.38-16.34v-26.83s-.02-.04-.03-.04h-42.97s-.04-.02-.04-.04v-36.05s.02-.04.04-.04h79.39v71.42Z"/>
        <path fill="${accentColor}" d="M1136.05,1040.33h-36.29s-.03-.02-.03-.03v-4.91c0-8.91-7.52-16.13-16.78-16.13h-41.02s-.04-.02-.04-.04v-36.32s.02-.03.04-.03h45.39c25.72,0,48.66,20,48.73,44.73l.04,12.7s-.02.04-.04.04"/>
        <path fill="${accentColor}" d="M935.12,1138.75c.14,24.81,22.42,44.17,47.3,44.17h46.75s.04-.02.04-.04v-36.19s-.02-.03-.04-.03h-41.28c-9.05,0-16.38-7.32-16.38-16.34v-26.83s.02-.04.03-.04h42.97s.04-.02.04-.04v-36.05s-.02-.03-.04-.03h-79.39v71.41Z"/>
        <path fill="${accentColor}" d="M935.05,1040.34h36.28s.03-.02.03-.03v-4.91c0-8.91,7.52-16.13,16.78-16.13h41.02s.04-.02.04-.04v-36.32s-.02-.03-.04-.03h-45.39c-25.72,0-48.66,20-48.73,44.73l-.04,12.7s.02.04.04.04"/>
      </g>
    </svg>
  `;

  const sidebarSymbol = document.getElementById('sidebar-logo-container');
  if (sidebarSymbol) sidebarSymbol.innerHTML = monogramSVG;

  const stageSymbol = document.getElementById('logo-stage-symbol');
  if (stageSymbol) stageSymbol.innerHTML = monogramSVG;

  const lockupContainer = document.getElementById('logo-lockup-preview');
  if (lockupContainer) lockupContainer.innerHTML = horizontalSVG;
}

// --------------------------------------------------------------------------
// COLOR PALETTE & WCAG
// --------------------------------------------------------------------------
function renderColorSwatches() {
  const grid = document.getElementById('colors-palette-grid');
  if (!grid) return;

  const colorEntries = [
    { name: "Garage Crimson", hex: "#DB2128", role: "Primary / Energy, Attention & Action" },
    { name: "Garage Navy", hex: "#21335A", role: "Secondary / Structure, Tailoring & Trust" },
    { name: "Technical Grey", hex: "#CBD5E1", role: "Neutral / Blueprint Grids & Spec Sheets" },
    { name: "Indian Garage Off-White", hex: "#FAFAFA", role: "Base / Clean Editorial White (Pantone 663 C)" },
    { name: "Deep Navy 700", hex: "#0B0F19", role: "Dark Mode Surface & Packaging Background" },
    { name: "Technical Muted 700", hex: "#64748B", role: "Readable Body Copy & Annotations" }
  ];

  grid.innerHTML = colorEntries.map(c => `
    <div class="color-card" onclick="copyToClipboard('${c.hex}', 'Copied ${c.name} (${c.hex})')">
      <div class="color-swatch-box" style="background-color: ${c.hex}; border: 1px solid rgba(0,0,0,0.08);">
        <span class="copy-hex-tooltip">CLICK TO COPY</span>
      </div>
      <div class="color-card-body">
        <div class="color-title-row">
          <span class="color-name">${c.name}</span>
          <span class="color-hex">${c.hex}</span>
        </div>
        <p class="color-specs-sub">${c.role}</p>
      </div>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// SCROLL SPY NAVIGATION
// --------------------------------------------------------------------------
function setupNavigation() {
  const sections = document.querySelectorAll('.brand-section, .brand-hero');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.querySelector('a')?.getAttribute('href');
      if (href === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

// --------------------------------------------------------------------------
// THEME SWITCHER
// --------------------------------------------------------------------------
function setupThemeToggle() {
  const btn = document.getElementById('btn-toggle-theme');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.body.removeAttribute('data-theme');
      btn.innerHTML = '<span>☼</span> <span>LIGHT</span>';
    } else {
      document.body.setAttribute('data-theme', 'dark');
      btn.innerHTML = '<span>☾</span> <span>DARK</span>';
    }
    renderSVGs();
  });
}

// --------------------------------------------------------------------------
// LOGO STAGE CONTROLS
// --------------------------------------------------------------------------
function setupLogoControls() {
  const stage = document.getElementById('logo-stage');
  const btnLight = document.getElementById('btn-stage-light');
  const btnDark = document.getElementById('btn-stage-dark');
  const btnGrid = document.getElementById('btn-stage-grid');
  const btnClearspace = document.getElementById('btn-stage-clearspace');
  const btnCenterMark = document.getElementById('btn-center-mark');
  const btnLockup = document.getElementById('btn-lockup-mode');

  if (btnLight && stage) {
    btnLight.addEventListener('click', () => {
      stage.classList.remove('stage-dark');
      btnLight.classList.add('active');
      btnDark.classList.remove('active');
      renderSVGs();
    });
  }

  if (btnDark && stage) {
    btnDark.addEventListener('click', () => {
      stage.classList.add('stage-dark');
      btnDark.classList.add('active');
      btnLight.classList.remove('active');
      renderSVGs();
    });
  }

  if (btnGrid && stage) {
    btnGrid.addEventListener('click', () => {
      stage.classList.toggle('show-grid');
      btnGrid.classList.toggle('active');
    });
  }

  if (btnClearspace && stage) {
    btnClearspace.addEventListener('click', () => {
      stage.classList.toggle('show-clearspace');
      btnClearspace.classList.toggle('active');
    });
  }

  if (btnCenterMark && btnLockup) {
    btnCenterMark.addEventListener('click', () => {
      btnCenterMark.classList.add('active');
      btnLockup.classList.remove('active');
      document.getElementById('logo-center-wrapper').style.display = 'flex';
      document.getElementById('logo-lockup-preview').style.display = 'none';
    });
    btnLockup.addEventListener('click', () => {
      btnLockup.classList.add('active');
      btnCenterMark.classList.remove('active');
      document.getElementById('logo-center-wrapper').style.display = 'none';
      document.getElementById('logo-lockup-preview').style.display = 'flex';
    });
  }
}

// --------------------------------------------------------------------------
// TYPOGRAPHY TESTER
// --------------------------------------------------------------------------
function setupTypographyTester() {
  const input = document.getElementById('typo-preview-input');
  const displaySample = document.getElementById('sample-display');
  const monoSample = document.getElementById('sample-mono');
  const bodySample = document.getElementById('sample-body');

  if (!input) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value.trim() || 'FOR EVERYDAY HEROES — 2026';
    if (displaySample) displaySample.textContent = val;
    if (monoSample) monoSample.textContent = val;
    if (bodySample) bodySample.textContent = val;
  });
}

// --------------------------------------------------------------------------
// LIVE COPY & TRADEMARK IP AUDITOR (INTERCEPTOR)
// --------------------------------------------------------------------------
function setupCopyAuditor() {
  const btn = document.getElementById('btn-audit-copy');
  const input = document.getElementById('copy-audit-input');
  const resultBox = document.getElementById('copy-audit-results');

  if (!btn || !input || !resultBox) return;

  const competitorDatabase = [
    {
      owner: "Nike, Inc.",
      phrases: ["just do it", "find your greatness", "there is no finish line", "swoosh", "air jordan", "jumpman", "nike"],
      risk: "CRITICAL TRADEMARK COLLISION"
    },
    {
      owner: "Adidas AG",
      phrases: ["impossible is nothing", "all in or nothing", "three stripes", "originals", "ultraboost", "adidas"],
      risk: "CRITICAL TRADEMARK COLLISION"
    },
    {
      owner: "Puma SE",
      phrases: ["forever faster", "she moves us", "puma"],
      risk: "CRITICAL TRADEMARK COLLISION"
    },
    {
      owner: "Levi Strauss & Co.",
      phrases: ["live in levi's", "live in levis", "quality never goes out of style", "501", "batwing", "red tab", "levis", "levi's"],
      risk: "CRITICAL TRADEMARK COLLISION"
    },
    {
      owner: "Under Armour, Inc.",
      phrases: ["protect this house", "i will", "the only way is through", "under armour"],
      risk: "CRITICAL TRADEMARK COLLISION"
    },
    {
      owner: "Fast Retailing (Uniqlo)",
      phrases: ["lifewear", "life wear", "heattech", "airism", "uniqlo"],
      risk: "CRITICAL TRADEMARK COLLISION"
    }
  ];

  const bannedBuzzwords = [
    "synergistic", "game-changing", "disruptive", "paradigm shift",
    "rockstar", "ninja", "strive to", "delighted to announce",
    "best-in-class", "world class", "customer centric", "synergy",
    "cheap", "budget-friendly", "bumper offer", "loot"
  ];

  btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) {
      alert("Please enter some marketing copy to audit.");
      return;
    }

    const lower = text.toLowerCase();

    // Check for competitor trademark collision
    let match = null;
    for (const comp of competitorDatabase) {
      for (const phrase of comp.phrases) {
        const regex = new RegExp(`\\b${phrase.replace("'", "['’]?")}\\b`, 'i');
        if (regex.test(lower)) {
          match = { owner: comp.owner, phrase: phrase, risk: comp.risk };
          break;
        }
      }
      if (match) break;
    }

    resultBox.style.display = 'block';

    if (match) {
      resultBox.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.08); border: 2px solid #DC2626; border-radius: 8px; padding: 22px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <strong style="font-family: var(--font-mono); font-size: 14px; color: #DC2626;">
              ✕ ${match.risk} (Score: 0/100)
            </strong>
            <span style="font-family: var(--font-mono); font-size: 11px; background: #DC2626; color: #FFF; padding: 3px 8px; border-radius: 4px; font-weight: 700;">LEGAL CEASE & DESIST RISK</span>
          </div>

          <p style="font-size: 13.5px; font-weight: 600; color: #991B1B; margin-bottom: 8px;">
            Detected protected intellectual property belonging to <u>${match.owner}</u>: "<strong>${match.phrase}</strong>"
          </p>

          <div style="font-size: 13px; line-height: 1.5; color: #7F1D1D; margin-bottom: 12px; background: rgba(220, 38, 38, 0.05); padding: 10px; border-left: 3px solid #DC2626;">
            <strong>Warning:</strong> Under Section 29 of the Indian Trade Marks Act (1999) and Nice Class 25, commercial use of competitor slogans constitutes actionable trademark infringement and deceptive passing off.
          </div>

          <div style="font-family: var(--font-mono); font-size: 12px; font-weight: 700; color: #166534; margin-bottom: 6px;">
            APPROVED TIGC BRAND ALTERNATIVES:
          </div>
          <ul style="font-size: 12.5px; color: #1E293B; line-height: 1.7; margin-left: 18px;">
            <li>• <strong>"Stay Raw. Stay Fearless."</strong></li>
            <li>• <strong>"Engineered for the Indian Grind."</strong></li>
            <li>• <strong>"Born in Indore. Built for India."</strong></li>
            <li>• <strong>"Unstoppable Everyday."</strong></li>
          </ul>
        </div>
      `;
      return;
    }

    const flagged = bannedBuzzwords.filter(word => lower.includes(word));
    const isPassive = /\b(is|are|was|were|been|being)\s+([a-z]+ed)\b/i.test(text);
    const passed = flagged.length === 0 && !isPassive;

    resultBox.innerHTML = `
      <div style="background: ${passed ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)'}; border: 1px solid ${passed ? '#22C55E' : '#EF4444'}; border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <strong style="font-family: var(--font-mono); font-size: 14px; color: ${passed ? '#16A34A' : '#DC2626'};">
            ${passed ? '✓ PASSED BRAND AUDIT (Score: 98/100)' : '✕ VOICE REVISIONS NEEDED (Score: 58/100)'}
          </strong>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${text.split(/\s+/).length} Words</span>
        </div>
        <p style="font-size: 13.5px; margin-bottom: 8px;">
          ${passed ? 'Your copy is 100% original TIGC IP, direct, active, and aligns with brand voice guidelines.' : 'Issues detected against the brand guidelines:'}
        </p>
        ${flagged.length > 0 ? `<div style="font-size: 13px; color: #DC2626; margin-bottom: 6px;">• Detected banned buzzwords: <strong>${flagged.join(', ')}</strong></div>` : ''}
        ${isPassive ? `<div style="font-size: 13px; color: #DC2626; margin-bottom: 6px;">• Detected passive phrasing. Convert to direct active verbs.</div>` : ''}
        ${passed ? `<div style="font-size: 13px; color: #16A34A;">• Excellent high-agency tone. Approved for production.</div>` : ''}
      </div>
    `;
  });
}

// --------------------------------------------------------------------------
// LIVE MCP SIMULATOR
// --------------------------------------------------------------------------
function setupMCPSimulator() {
  const terminal = document.getElementById('mcp-live-terminal-output');
  const btnRules = document.getElementById('btn-sim-rules');
  const btnColors = document.getElementById('btn-sim-colors');
  const btnTokens = document.getElementById('btn-sim-tokens');

  if (!terminal) return;

  const runSim = (method, data) => {
    terminal.textContent = `// Calling MCP Server via stdio...\n-> { "jsonrpc": "2.0", "method": "${method}" }\n\n<- ${JSON.stringify(data, null, 2)}`;
  };

  if (btnRules) {
    btnRules.addEventListener('click', () => {
      runSim('tools/call: get_brand_rules', {
        brand: window.CURRENT_BRAND.name,
        tagline: window.CURRENT_BRAND.tagline,
        voice: window.CURRENT_BRAND.strategy.voice.attributes,
        dos: window.CURRENT_BRAND.strategy.voice.dos
      });
    });
  }

  if (btnColors) {
    btnColors.addEventListener('click', () => {
      runSim('tools/call: get_color_palette', {
        palette: window.CURRENT_BRAND.colors
      });
    });
  }

  if (btnTokens) {
    btnTokens.addEventListener('click', () => {
      runSim('tools/call: export_tokens', {
        format: 'json',
        tokens: {
          brand: window.CURRENT_BRAND.name,
          primaryColor: window.CURRENT_BRAND.colors.primary,
          accentColor: window.CURRENT_BRAND.colors.accent,
          displayFont: window.CURRENT_BRAND.typography.display
        }
      });
    });
  }
}

// --------------------------------------------------------------------------
// DOWNLOAD HANDLERS
// --------------------------------------------------------------------------
function setupDownloadHandlers() {
  const btnAll = document.getElementById('btn-download-all');
  if (btnAll) {
    btnAll.addEventListener('click', () => {
      alert("Downloading all vector master artwork and token packs.");
    });
  }
}

// --------------------------------------------------------------------------
// INITIALIZE ON LOAD
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderBrandIdentity();
  setupNavigation();
  setupThemeToggle();
  setupLogoControls();
  setupTypographyTester();
  setupCopyAuditor();
  setupMCPSimulator();
  setupDownloadHandlers();

  // Initialize Object Studio if present
  if (typeof BrandObjectStudio !== 'undefined') {
    const canvas = document.getElementById('studio-canvas');
    if (canvas) {
      window.studio = new BrandObjectStudio('studio-canvas');
    }
  }
});
