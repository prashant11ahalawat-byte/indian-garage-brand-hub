/**
 * Main Brand Hub Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Studio
  window.studio = new ObjectStudio('object-studio-canvas');

  // Initialize UI with Current Brand
  renderBrandIdentity();
  setupNavigation();
  setupThemeToggle();
  setupLogoControls();
  setupTypographyTester();
  setupColorsAndContrast();
  setupCopyAuditor();
  setupMCPSimulator();
  setupCustomizerDrawer();
  setupStudioUI();
  setupDownloadHandlers();
});

// Toast notification helper
window.showToast = function(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span> <span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2600);
};

// Clipboard copy helper
function copyToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    window.showToast(successMsg || `Copied "${text}" to clipboard!`);
  }).catch(() => {
    // Fallback
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

  // Strategy
  const purposeEl = document.getElementById('strategy-purpose-text');
  if (purposeEl) purposeEl.textContent = b.strategy.purpose;

  const missionEl = document.getElementById('strategy-mission-text');
  if (missionEl) missionEl.textContent = b.strategy.mission;

  const visionEl = document.getElementById('strategy-vision-text');
  if (visionEl) visionEl.textContent = b.strategy.vision;

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
  if (dosList && b.strategy.voice.dos) {
    dosList.innerHTML = b.strategy.voice.dos.map(item => `
      <li><span>✓</span> <span>${item}</span></li>
    `).join('');
  }

  const dontsList = document.getElementById('voice-donts-list');
  if (dontsList && b.strategy.voice.donts) {
    dontsList.innerHTML = b.strategy.voice.donts.map(item => `
      <li><span>✕</span> <span>${item}</span></li>
    `).join('');
  }

  // Colors CSS variables
  document.documentElement.style.setProperty('--brand-primary', b.colors.primary);
  document.documentElement.style.setProperty('--brand-accent', b.colors.accent);
  document.documentElement.style.setProperty('--brand-secondary', b.colors.accentSecondary);

  // Render SVG Logos
  renderSVGs();

  // Render Color Cards
  renderColorSwatches();
}

// --------------------------------------------------------------------------
// DYNAMIC SVG LOGO GENERATOR
// --------------------------------------------------------------------------
function renderSVGs() {
  const b = window.CURRENT_BRAND;
  const isDarkStage = document.getElementById('logo-stage')?.classList.contains('stage-dark');
  const fillColor = isDarkStage ? '#FFFFFF' : b.colors.primary;
  const accentColor = b.colors.accentSecondary || b.colors.accent;

  // Generate Hexagonal / Geometric Mark based on brand
  let markSVG = '';
  if (b.id === 'indian_garage') {
    // Official Indian Garage G-Unit Monogram (Brand Book Page 14)
    markSVG = `
      <svg viewBox="0 0 120 120" class="brand-symbol-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Top Left Curve Segment -->
        <path d="M54 18H36C26.0589 18 18 26.0589 18 36V54H34V36C34 34.8954 34.8954 34 36 34H54V18Z" fill="${accentColor}"/>
        <!-- Top Right Curve Segment -->
        <path d="M66 18H84C93.9411 18 102 26.0589 102 36V54H86V36C86 34.8954 85.1046 34 84 34H66V18Z" fill="${accentColor}"/>
        <!-- Bottom Left G Segment -->
        <path d="M18 66V84C18 93.9411 26.0589 102 36 102H54V86H36C34.8954 86 34 85.1046 34 84V66H18Z" fill="${accentColor}"/>
        <!-- Bottom Right G Central Bar -->
        <path d="M86 66H66V50H102V84C102 93.9411 93.9411 102 84 102H66V86H84C85.1046 86 86 85.1046 86 84V66Z" fill="${accentColor}"/>
      </svg>
    `;
  } else if (b.id === 'bloom') {
    markSVG = `
      <svg viewBox="0 0 100 100" class="brand-symbol-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="${fillColor}" stroke-width="8" stroke-linejoin="round"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="${accentColor}" stroke-width="6" stroke-linecap="round"/>
        <line x1="15" y1="30" x2="85" y2="70" stroke="${fillColor}" stroke-width="6" stroke-linecap="round"/>
        <line x1="15" y1="70" x2="85" y2="30" stroke="${fillColor}" stroke-width="6" stroke-linecap="round"/>
        <circle cx="50" cy="50" r="10" fill="${accentColor}"/>
      </svg>
    `;
  } else if (b.id === 'whop') {
    markSVG = `
      <svg viewBox="0 0 100 100" class="brand-symbol-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 80L45 20H35L15 80H25Z" fill="${accentColor}"/>
        <path d="M45 80L65 20H55L35 80H45Z" fill="${fillColor}"/>
        <path d="M65 80L85 20H75L55 80H65Z" fill="${accentColor}"/>
      </svg>
    `;
  } else {
    markSVG = `
      <svg viewBox="0 0 100 100" class="brand-symbol-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" stroke="${fillColor}" stroke-width="8" rx="8"/>
        <rect x="36" y="36" width="28" height="28" fill="${accentColor}"/>
      </svg>
    `;
  }

  // Update in sidebar
  const sidebarSymbol = document.getElementById('sidebar-logo-container');
  if (sidebarSymbol) sidebarSymbol.innerHTML = markSVG;

  // Update in stage
  const stageSymbol = document.getElementById('logo-stage-symbol');
  if (stageSymbol) stageSymbol.innerHTML = markSVG;

  // Render Horizontal Lockup
  const lockupContainer = document.getElementById('logo-lockup-preview');
  if (lockupContainer) {
    if (b.id === 'indian_garage') {
      lockupContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 14px; font-family: 'Bebas Neue', sans-serif; font-size: 38px; letter-spacing: 0.06em; color: ${fillColor}; text-transform: uppercase;">
          <span>INDIAN</span>
          <div style="width: 44px; height: 44px;">${markSVG}</div>
          <span>GARAGE</span>
        </div>
      `;
    } else {
      lockupContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="width: 48px; height: 48px;">${markSVG}</div>
          <div style="font-family: var(--font-display); font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: ${fillColor}; text-transform: uppercase;">
            ${b.name}
          </div>
        </div>
      `;
    }
  }

  // Render Monospaced Stacked
  const monoStacked = document.getElementById('logo-mono-preview');
  if (monoStacked) {
    monoStacked.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 20px; font-weight: 700; color: ${fillColor}; letter-spacing: 0.15em; text-transform: uppercase;">
        [ ${b.name} ]
      </div>
    `;
  }
}

// --------------------------------------------------------------------------
// COLOR PALETTE & CONTRAST
// --------------------------------------------------------------------------
function renderColorSwatches() {
  const b = window.CURRENT_BRAND;
  const grid = document.getElementById('colors-palette-grid');
  if (!grid || !b.colors) return;

  let colorEntries = [];
  if (b.id === 'indian_garage') {
    colorEntries = [
      { name: "Garage Red (Primary)", hex: "#D20000", role: "Primary / Energy, Attention & Action" },
      { name: "Garage Navy", hex: "#1E2637", role: "Secondary / Strength, Structure & Trust" },
      { name: "Technical Grey", hex: "#DCDCDC", role: "Neutral / Blueprint Grids, Specs & Support" },
      { name: "Indian Garage Off-White", hex: "#FAFAFA", role: "Base / Clean Editorial White (Pantone 663 C)" },
      { name: "Deep Navy 700", hex: "#0D1118", role: "Dark Mode Surface & Packaging Background" },
      { name: "Deep Red 700", hex: "#991E14", role: "Tonal Depth & Heavy Hang Tag Backing" },
      { name: "Technical Muted 700", hex: "#676A70", role: "Readable Body Copy & Annotations" },
      { name: "Border Neutral 200", hex: "#E6E7E9", role: "Subtle Blueprint Dividing Lines" }
    ];
  } else {
    colorEntries = [
      { name: "Primary Brand Obsidian", hex: b.colors.primary, role: "Core structural anchors & headers" },
      { name: "Brand Accent Lime", hex: b.colors.accent, role: "High-visibility interactions & calls to action" },
      { name: "Secondary Coral", hex: b.colors.accentSecondary, role: "Generative assets & expressive highlights" },
      { name: "Background Light", hex: b.colors.background, role: "Page canvases & editorial whitespace" },
      { name: "Surface Card Light", hex: b.colors.surface, role: "Raised cards & UI containers" },
      { name: "Surface Dark", hex: b.colors.surfaceDark, role: "Terminal modules & dark surfaces" },
      { name: "Text Secondary Muted", hex: b.colors.textMuted, role: "Readable body copy & labels" },
      { name: "Border Muted", hex: b.colors.border, role: "Subtle hairline grid dividers" }
    ];
  }

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
// NAVIGATION & SCROLL SPY
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
// THEME SWITCHER (Dark / Light)
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
      btn.innerHTML = '<span>☽</span> <span>DARK</span>';
    }
    renderSVGs();
  });
}

// --------------------------------------------------------------------------
// LOGO STAGE CONTROLS (Backgrounds & Clearspace)
// --------------------------------------------------------------------------
function setupLogoControls() {
  const stage = document.getElementById('logo-stage');
  const overlay = document.getElementById('logo-clearspace-overlay');

  document.querySelectorAll('[data-stage-bg]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-stage-bg]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const bg = btn.getAttribute('data-stage-bg');
      stage.className = 'logo-display-stage';
      if (bg === 'dark') stage.classList.add('stage-dark');
      if (bg === 'accent') stage.classList.add('stage-accent');
      if (bg === 'grid') stage.classList.add('stage-grid');
      renderSVGs();
    });
  });

  const clearspaceBtn = document.getElementById('btn-toggle-clearspace');
  if (clearspaceBtn) {
    clearspaceBtn.addEventListener('click', () => {
      overlay.classList.toggle('active');
      clearspaceBtn.classList.toggle('active');
    });
  }
}

// --------------------------------------------------------------------------
// TYPOGRAPHY INTERACTIVE TESTER
// --------------------------------------------------------------------------
function setupTypographyTester() {
  const input = document.getElementById('type-tester-input');
  const sizeSlider = document.getElementById('type-size-slider');
  const weightSlider = document.getElementById('type-weight-slider');
  const lhSlider = document.getElementById('type-lh-slider');

  if (sizeSlider && input) {
    sizeSlider.addEventListener('input', (e) => {
      input.style.fontSize = `${e.target.value}px`;
      document.getElementById('type-size-val').textContent = `${e.target.value}px`;
    });
  }

  if (weightSlider && input) {
    weightSlider.addEventListener('input', (e) => {
      input.style.fontWeight = e.target.value;
      document.getElementById('type-weight-val').textContent = e.target.value;
    });
  }

  if (lhSlider && input) {
    lhSlider.addEventListener('input', (e) => {
      input.style.lineHeight = e.target.value;
      document.getElementById('type-lh-val').textContent = e.target.value;
    });
  }
}

// --------------------------------------------------------------------------
// CONTRAST & WCAG
// --------------------------------------------------------------------------
function setupColorsAndContrast() {
  // Built-in calculations are shown in HTML table
}

// --------------------------------------------------------------------------
// INTERACTIVE COPY AUDITOR
// --------------------------------------------------------------------------
function setupCopyAuditor() {
  const btn = document.getElementById('btn-audit-copy');
  const input = document.getElementById('copy-audit-input');
  const resultBox = document.getElementById('copy-audit-results');

  if (!btn || !input || !resultBox) return;

  btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) {
      alert("Please enter some marketing copy to audit.");
      return;
    }

    const b = window.CURRENT_BRAND;
    const lower = text.toLowerCase();
    const banned = (b.strategy.voice.donts || []).concat([
      "synergistic", "game-changing", "disruptive", "paradigm shift",
      "rockstar", "ninja", "strive to", "delighted to announce"
    ]);

    const flagged = banned.filter(word => lower.includes(word.toLowerCase()));
    const isPassive = /\b(is|are|was|were|been|being)\s+([a-z]+ed)\b/i.test(text);
    const passed = flagged.length === 0 && !isPassive;

    resultBox.style.display = 'block';
    resultBox.innerHTML = `
      <div style="background: ${passed ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)'}; border: 1px solid ${passed ? '#22C55E' : '#EF4444'}; border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <strong style="font-family: var(--font-mono); font-size: 14px; color: ${passed ? '#16A34A' : '#DC2626'};">
            ${passed ? '✓ PASSED BRAND AUDIT (Score: 96/100)' : '✕ VOICE REVISIONS NEEDED (Score: 58/100)'}
          </strong>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">${text.split(/\s+/).length} Words</span>
        </div>
        <p style="font-size: 14px; margin-bottom: 8px;">
          ${passed ? 'Your copy is direct, unvarnished, and aligns with brand voice guidelines.' : 'Issues detected against the brand guidelines:'}
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
      runSim('tools/call: export_design_tokens', {
        format: "css",
        sampleCSS: `:root { --brand-primary: ${window.CURRENT_BRAND.colors.primary}; --brand-accent: ${window.CURRENT_BRAND.colors.accent}; }`
      });
    });
  }
}

// --------------------------------------------------------------------------
// STUDIO UI CONTROLS & BINDINGS
// --------------------------------------------------------------------------
function setupStudioUI() {
  const s = window.studio;
  if (!s) return;

  // Model buttons
  document.querySelectorAll('[data-model]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-model]').forEach(b => b.classList.remove.call(b.classList, 'active'));
      btn.classList.add('active');
      s.setModel(btn.getAttribute('data-model'));
    });
  });

  // View angle buttons
  document.querySelectorAll('[data-angle]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-angle]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      s.setViewMode(btn.getAttribute('data-angle'));
    });
  });

  // Sliders
  const bindSlider = (id, prop, scale = 1, isInt = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', (e) => {
      let val = parseFloat(e.target.value);
      if (isInt) val = Math.round(val);
      s[prop] = val;
      const valDisplay = document.getElementById(id + '-val');
      if (valDisplay) valDisplay.textContent = isInt ? val : val.toFixed(2);
    });
  };

  bindSlider('ctl-cell-size', 'cellSize', 1, true);
  bindSlider('ctl-margin', 'cellMargin');
  bindSlider('ctl-levels', 'levels');
  bindSlider('ctl-banding', 'banding', 1, true);

  // Color inputs
  const highlightInput = document.getElementById('ctl-highlight-color');
  if (highlightInput) {
    highlightInput.addEventListener('input', (e) => {
      s.highlightColor = e.target.value;
    });
  }

  const bgInput = document.getElementById('ctl-bg-color');
  if (bgInput) {
    bgInput.addEventListener('input', (e) => {
      s.bgColor = e.target.value;
    });
  }

  // Play/Pause
  const playBtn = document.getElementById('btn-play-pause');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      s.isAnimating = !s.isAnimating;
      playBtn.textContent = s.isAnimating ? '⏸ PAUSE' : '▶ PLAY';
    });
  }

  // Reset
  const resetBtn = document.getElementById('btn-reset-studio');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => s.resetDefaults());
  }

  // Export buttons
  const exportPNGBtn = document.getElementById('btn-export-png');
  if (exportPNGBtn) exportPNGBtn.addEventListener('click', () => s.exportPNG());

  const exportSVGBtn = document.getElementById('btn-export-svg');
  if (exportSVGBtn) exportSVGBtn.addEventListener('click', () => s.exportSVG());
}

// --------------------------------------------------------------------------
// BRAND CUSTOMIZER DRAWER
// --------------------------------------------------------------------------
function setupCustomizerDrawer() {
  const drawer = document.getElementById('customizer-drawer');
  const btnOpen = document.getElementById('btn-open-customizer');
  const btnClose = document.getElementById('btn-close-customizer');
  const presetSelect = document.getElementById('preset-selector');

  if (btnOpen) btnOpen.addEventListener('click', () => drawer.classList.add('open'));
  if (btnClose) btnClose.addEventListener('click', () => drawer.classList.remove('open'));

  if (presetSelect) {
    presetSelect.addEventListener('change', (e) => {
      const presetId = e.target.value;
      if (window.BRAND_PRESETS[presetId]) {
        window.CURRENT_BRAND = JSON.parse(JSON.stringify(window.BRAND_PRESETS[presetId]));
        renderBrandIdentity();
        if (window.studio) window.studio.resetDefaults();
        window.showToast(`Switched brand to ${window.CURRENT_BRAND.name}!`);
      }
    });
  }

  const btnApplyCustom = document.getElementById('btn-apply-custom-brand');
  if (btnApplyCustom) {
    btnApplyCustom.addEventListener('click', () => {
      const name = document.getElementById('input-brand-name')?.value;
      const tagline = document.getElementById('input-brand-tagline')?.value;
      const primary = document.getElementById('input-brand-primary-color')?.value;
      const accent = document.getElementById('input-brand-accent-color')?.value;

      if (name) window.CURRENT_BRAND.name = name;
      if (tagline) window.CURRENT_BRAND.tagline = tagline;
      if (primary) window.CURRENT_BRAND.colors.primary = primary;
      if (accent) {
        window.CURRENT_BRAND.colors.accent = accent;
        window.CURRENT_BRAND.colors.accentSecondary = accent;
      }

      renderBrandIdentity();
      if (window.studio) {
        window.studio.highlightColor = accent || '#FF4D26';
        window.studio.resetDefaults();
      }
      drawer.classList.remove('open');
      window.showToast(`Custom brand "${window.CURRENT_BRAND.name}" applied!`);
    });
  }

  const btnExportConfig = document.getElementById('btn-export-config-json');
  if (btnExportConfig) {
    btnExportConfig.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.CURRENT_BRAND, null, 2));
      const link = document.createElement('a');
      link.href = dataStr;
      link.download = `${window.CURRENT_BRAND.name.toLowerCase().replace(/\s+/g, '-')}-brand.config.json`;
      link.click();
      window.showToast("Brand configuration downloaded!");
    });
  }
}

// --------------------------------------------------------------------------
// DOWNLOAD HANDLERS
// --------------------------------------------------------------------------
function setupDownloadHandlers() {
  const downloadAll = document.getElementById('btn-download-all');
  if (downloadAll) {
    downloadAll.addEventListener('click', (e) => {
      e.preventDefault();
      // Generate clean CSS tokens file and download
      const b = window.CURRENT_BRAND;
      let tokensCSS = `/* ${b.name} Design Tokens - Generated ${b.updated} */\n:root {\n`;
      for (const [k, v] of Object.entries(b.colors)) {
        tokensCSS += `  --color-${k}: ${v};\n`;
      }
      tokensCSS += `  --font-display: ${b.typography.display};\n`;
      tokensCSS += `  --font-mono: ${b.typography.mono};\n`;
      tokensCSS += `  --font-body: ${b.typography.body};\n`;
      tokensCSS += `}\n`;

      const blob = new Blob([tokensCSS], { type: 'text/css' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${b.name.toLowerCase().replace(/\s+/g, '-')}-tokens.css`;
      link.click();
      URL.revokeObjectURL(url);
      window.showToast("Downloaded Design Tokens CSS!");
    });
  }
}
