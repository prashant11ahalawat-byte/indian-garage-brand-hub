/**
 * Generative 3D Brand Object Studio
 * Inspired by Nonstop HQ's Bloom Object Studio.
 * Real-time 3D parametric voxel & dot-matrix asset generator.
 */

class ObjectStudio {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // Config state
    this.modelName = 'bridge';
    this.viewMode = '3/4'; // 'front', '3/4', 'side', 'hero'
    this.isAnimating = true;
    this.rotX = 0.35;
    this.rotY = 0.85;
    this.rotZ = 0.0;
    this.zoom = 1.0;
    
    // Sliders
    this.cellSize = 5;
    this.cellMargin = 0.15;
    this.banding = 1;
    this.levels = 0.5;
    this.l1Start = 0.12;
    this.l2Start = 0.35;
    this.l3Start = 0.60;
    this.l4Start = 0.82;
    this.contactAO = 0.55;
    
    // Palette
    this.highlightColor = '#FF4D26';
    this.bgColor = '#FEFCEC';
    this.markerStyle = 'cross'; // 'square', 'cross', 'circle'
    
    // Mouse drag
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    // Undo/Redo history
    this.history = [];
    this.historyIndex = -1;

    this.initCanvasSize();
    this.bindEvents();
    this.buildGeometry();
    this.saveState();
    this.startLoop();
  }

  initCanvasSize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width || 800;
    const h = rect.height || 500;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.ctx.scale(dpr, dpr);
    this.cssWidth = w;
    this.cssHeight = h;
  }

  saveState() {
    const snap = {
      modelName: this.modelName,
      viewMode: this.viewMode,
      cellSize: this.cellSize,
      cellMargin: this.cellMargin,
      banding: this.banding,
      levels: this.levels,
      highlightColor: this.highlightColor,
      bgColor: this.bgColor,
      markerStyle: this.markerStyle,
      rotX: this.rotX,
      rotY: this.rotY
    };
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(snap);
    this.historyIndex++;
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.loadState(this.history[this.historyIndex]);
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.loadState(this.history[this.historyIndex]);
    }
  }

  loadState(s) {
    this.modelName = s.modelName;
    this.viewMode = s.viewMode;
    this.cellSize = s.cellSize;
    this.cellMargin = s.cellMargin;
    this.banding = s.banding;
    this.levels = s.levels;
    this.highlightColor = s.highlightColor;
    this.bgColor = s.bgColor;
    this.markerStyle = s.markerStyle;
    this.rotX = s.rotX;
    this.rotY = s.rotY;
    this.syncUIControls();
    this.buildGeometry();
  }

  syncUIControls() {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) {
        el.value = val;
        const valDisplay = document.getElementById(id + '-val');
        if (valDisplay) valDisplay.textContent = typeof val === 'number' ? val.toFixed(2) : val;
      }
    };
    setVal('ctl-cell-size', this.cellSize);
    setVal('ctl-margin', this.cellMargin);
    setVal('ctl-levels', this.levels);
    setVal('ctl-banding', this.banding);
    setVal('ctl-highlight-color', this.highlightColor);
    setVal('ctl-bg-color', this.bgColor);
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.isAnimating = (mode === 'hero');
    if (mode === 'front') {
      this.rotX = 0;
      this.rotY = 0;
    } else if (mode === '3/4') {
      this.rotX = 0.35;
      this.rotY = 0.85;
    } else if (mode === 'side') {
      this.rotX = 0;
      this.rotY = Math.PI / 2;
    } else if (mode === 'hero') {
      this.rotX = 0.4;
      this.rotY = 0.7;
    }
    this.saveState();
  }

  setModel(model) {
    this.modelName = model;
    this.buildGeometry();
    this.saveState();
  }

  buildGeometry() {
    this.voxels = [];
    const pushVoxel = (x, y, z, val = 1.0, isAccent = false) => {
      this.voxels.push({ x, y, z, val, isAccent });
    };

    if (this.modelName === 'bridge') {
      // Golden Gate Style Suspension Bridge (as in the video!)
      const length = 56;
      const towerHeight = 22;
      const deckY = 4;
      const tower1X = 14;
      const tower2X = 42;

      // Roadway deck
      for (let x = 0; x <= length; x++) {
        for (let z = -2; z <= 2; z++) {
          pushVoxel(x - length / 2, deckY, z, 0.95);
          if (x % 2 === 0) pushVoxel(x - length / 2, deckY - 1, z, 0.7);
        }
      }

      // Two Main Towers
      [tower1X, tower2X].forEach(tx => {
        const cx = tx - length / 2;
        for (let y = -4; y <= towerHeight; y++) {
          [-2, 2].forEach(cz => {
            pushVoxel(cx - 1, y, cz, 1.0, true);
            pushVoxel(cx, y, cz, 1.0, true);
            pushVoxel(cx + 1, y, cz, 1.0, true);
          });
          // Cross-bracing
          if (y === 8 || y === 14 || y === 20) {
            for (let cz = -2; cz <= 2; cz++) {
              pushVoxel(cx, y, cz, 0.9);
            }
          }
        }
      });

      // Suspension Cables (Parabola between towers)
      for (let x = 0; x <= length; x++) {
        const cx = x - length / 2;
        let cableY;
        if (x < tower1X) {
          const t = x / tower1X;
          cableY = 0 + (towerHeight - 0) * (t * t);
        } else if (x <= tower2X) {
          const mid = (tower1X + tower2X) / 2;
          const dist = Math.abs(x - mid);
          const maxDist = (tower2X - tower1X) / 2;
          const norm = dist / maxDist;
          cableY = (deckY + 1) + (towerHeight - (deckY + 1)) * (norm * norm);
        } else {
          const t = (length - x) / (length - tower2X);
          cableY = 0 + (towerHeight - 0) * (t * t);
        }

        [-2, 2].forEach(cz => {
          pushVoxel(cx, Math.round(cableY), cz, 0.9);
          // Vertical suspender wires
          if (x % 2 === 0 && Math.round(cableY) > deckY) {
            for (let vy = deckY + 1; vy < Math.round(cableY); vy++) {
              pushVoxel(cx, vy, cz, 0.5);
            }
          }
        });
      }
    } else if (this.modelName === 'prism') {
      // Brutalist Monolith / Hex-Tower
      const radius = 12;
      const height = 30;
      for (let y = -height / 2; y <= height / 2; y++) {
        const progress = (y + height / 2) / height;
        const curR = radius * (1 - progress * 0.4);
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
          const vx = Math.cos(angle) * curR;
          const vz = Math.sin(angle) * curR;
          pushVoxel(vx, y, vz, 0.95);
          if (Math.abs(y % 4) === 0) {
            pushVoxel(vx * 0.7, y, vz * 0.7, 0.6);
          }
        }
      }
    } else if (this.modelName === 'cube') {
      // Whop-Slash / Dynamic Slanted Slices
      [-8, 0, 8].forEach((offsetX, idx) => {
        for (let t = -12; t <= 12; t++) {
          const vx = offsetX + t * 0.5;
          const vy = t;
          for (let vz = -4; vz <= 4; vz++) {
            pushVoxel(vx, vy, vz, 1.0 - idx * 0.15, idx === 0);
          }
        }
      });
    } else if (this.modelName === 'helix') {
      // Neural DNA Helix
      const height = 36;
      for (let y = -height / 2; y <= height / 2; y += 1) {
        const angle = y * 0.35;
        const r = 10;
        const x1 = Math.cos(angle) * r;
        const z1 = Math.sin(angle) * r;
        const x2 = Math.cos(angle + Math.PI) * r;
        const z2 = Math.sin(angle + Math.PI) * r;
        pushVoxel(x1, y, z1, 1.0, true);
        pushVoxel(x2, y, z2, 0.9);
        // Connect rungs
        if (Math.abs(Math.round(y) % 3) === 0) {
          for (let step = -5; step <= 5; step++) {
            const factor = step / 5;
            pushVoxel(x1 * factor, y, z1 * factor, 0.5);
          }
        }
      }
    } else if (this.modelName === 'logo') {
      // Official Indian Garage Co. G-Unit Monogram (from STACK-03.svg)
      // Vector-exact 3D voxelization via high-precision canvas sampling
      try {
        const offCanvas = document.createElement('canvas');
        const gw = 38;
        const gh = 44;
        offCanvas.width = gw;
        offCanvas.height = gh;
        const octx = offCanvas.getContext('2d', { willReadFrequently: true });

        const emblemSvgPaths = [
          "M1207.66,1140.2c-.17,31.44-28.4,55.96-59.93,55.96h-59.22s-.04-.02-.04-.04v-45.84s.02-.05.04-.05h52.3c11.46,0,20.76-9.26,20.76-20.7v-33.99s-.03-.05-.05-.05h-54.43s-.04-.02-.04-.04v-45.66s.02-.05.04-.05h100.59v90.48Z",
          "M1207.76,1015.53h-45.96s-.05-.02-.05-.04v-6.22c0-11.29-9.52-20.44-21.25-20.44h-51.98s-.04-.02-.04-.04v-46.01s.02-.04.04-.04h57.51c32.58,0,61.64,25.34,61.74,56.67l.05,16.09s-.03.04-.05.04",
          "M953.21,1140.21c.17,31.44,28.4,55.96,59.93,55.96h59.22s.04-.02.04-.04v-45.84s-.02-.05-.04-.05h-52.3c-11.46,0-20.76-9.26-20.76-20.7v-33.99s.03-.05.05-.05h54.43s.04-.02.04-.04v-45.66s-.02-.05-.04-.05h-100.59v90.48Z",
          "M953.12,1015.53h45.96s.05-.02.05-.04v-6.22c0-11.29,9.52-20.44,21.25-20.44h51.98s.04-.02.04-.04v-46.02s-.02-.04-.04-.04h-57.51c-32.58,0-61.64,25.34-61.74,56.67l-.05,16.09s.03.04.05.04"
        ];

        octx.clearRect(0, 0, gw, gh);
        octx.save();
        const padding = 3;
        const scale = (gw - padding * 2) / 255;
        octx.translate(padding, padding);
        octx.scale(scale, scale);
        octx.translate(-953, -890);
        octx.fillStyle = '#DB2128';

        emblemSvgPaths.forEach(pathStr => {
          if (typeof Path2D !== 'undefined') {
            octx.fill(new Path2D(pathStr));
          }
        });
        octx.restore();

        const imgData = octx.getImageData(0, 0, gw, gh).data;
        const depth = 3;
        let count = 0;

        for (let py = 0; py < gh; py++) {
          for (let px = 0; px < gw; px++) {
            const alpha = imgData[(py * gw + px) * 4 + 3];
            if (alpha > 70) {
              const vx = (px - gw / 2) * 0.72;
              const vy = -(py - gh / 2) * 0.72; // invert so top is top
              for (let z = -depth; z <= depth; z++) {
                const isEdge = Math.abs(z) === depth;
                pushVoxel(vx, vy, z, isEdge ? 1.0 : 0.88, true);
                count++;
              }
            }
          }
        }

        // Procedural fallback if offscreen canvas was blank
        if (count === 0) {
          throw new Error("Canvas raster produced 0 voxels, running procedural fallback");
        }
      } catch (e) {
        // High-precision geometric fallback for G-Unit emblem
        const w = 11;
        const h = 13;
        for (let z = -3; z <= 3; z++) {
          for (let y = -h; y <= h; y++) {
            // Left bracket
            pushVoxel(-w, y, z, 1.0, true);
            pushVoxel(-w + 1, y, z, 0.95, true);
            // Right bracket
            pushVoxel(w, y, z, 1.0, true);
            pushVoxel(w - 1, y, z, 0.95, true);
          }
          for (let x = -w; x <= -2; x++) {
            pushVoxel(x, h, z, 1.0, true);
            pushVoxel(x, -h, z, 1.0, true);
          }
          for (let x = 2; x <= w; x++) {
            pushVoxel(x, h, z, 1.0, true);
            pushVoxel(x, -h, z, 1.0, true);
          }
          // Center horizontal crossbars
          for (let x = 1; x <= w - 3; x++) {
            pushVoxel(x, 0, z, 1.0, true);
          }
          for (let x = -w + 3; x <= -1; x++) {
            pushVoxel(x, 0, z, 1.0, true);
          }
        }
      }
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.initCanvasSize());

    // Mouse drag rotation
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.isAnimating = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.rotY += dx * 0.01;
      this.rotX += dy * 0.01;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.saveState();
      }
    });

    // Keyboard shortcuts matching the video:
    // 'E' for PNG, 'G' for GIF/SVG, 'R' for Reset, 'Space' for Play/Pause, ⌘Z for Undo
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.isAnimating = !this.isAnimating;
        const btn = document.getElementById('btn-play-pause');
        if (btn) btn.textContent = this.isAnimating ? '⏸ PAUSE' : '▶ PLAY';
      } else if (e.key === 'e' || e.key === 'E') {
        this.exportPNG();
      } else if (e.key === 'r' || e.key === 'R') {
        this.resetDefaults();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) this.redo();
        else this.undo();
      }
    });
  }

  resetDefaults() {
    const cur = window.CURRENT_BRAND ? window.CURRENT_BRAND.objectStudio : {};
    this.cellSize = cur.defaultCellSize || 5;
    this.cellMargin = cur.defaultMargin || 0.15;
    this.banding = cur.defaultBanding || 1;
    this.levels = 0.5;
    this.highlightColor = cur.defaultHighlight || '#FF4D26';
    this.bgColor = cur.defaultBackground || '#FEFCEC';
    this.modelName = cur.defaultModel || 'bridge';
    this.viewMode = '3/4';
    this.rotX = 0.35;
    this.rotY = 0.85;
    this.isAnimating = true;
    this.syncUIControls();
    this.buildGeometry();
    this.saveState();
  }

  startLoop() {
    const loop = () => {
      this.render();
      if (this.isAnimating && !this.isDragging) {
        this.rotY += 0.008;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  render() {
    const ctx = this.ctx;
    const w = this.cssWidth;
    const h = this.cssHeight;

    // Fill background
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, w, h);

    // Compute 3D rotation & projection
    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);

    const projected = [];
    const scale = 14 * this.zoom;
    const centerX = w / 2;
    const centerY = h / 2 + 10;

    for (let i = 0; i < this.voxels.length; i++) {
      const v = this.voxels[i];
      // Rotate Y
      const x1 = v.x * cosY + v.z * sinY;
      const z1 = -v.x * sinY + v.z * cosY;
      // Rotate X
      const y2 = v.y * cosX - z1 * sinX;
      const z2 = v.y * sinX + z1 * cosX;

      // Weak perspective
      const fov = 160;
      const pScale = fov / (fov + z2 * 1.5);
      const px = centerX + x1 * scale * pScale;
      const py = centerY - y2 * scale * pScale;

      projected.push({
        x: px,
        y: py,
        depth: z2,
        val: v.val,
        isAccent: v.isAccent,
        rawY: v.y
      });
    }

    // Sort by depth for correct occlusion
    projected.sort((a, b) => a.depth - b.depth);

    // Contact Ambient Occlusion shadow at bottom
    if (this.contactAO > 0.05) {
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(centerX, centerY + 80, 10, centerX, centerY + 80, 180);
      shadowGrad.addColorStop(0, `rgba(0,0,0,${this.contactAO * 0.22})`);
      shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shadowGrad;
      ctx.scale(1, 0.35);
      ctx.beginPath();
      ctx.arc(centerX, (centerY + 80) / 0.35, 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Grid Rasterizer Settings
    const step = this.cellSize;
    const pad = step * this.cellMargin;
    const effectiveSize = Math.max(1, step - pad * 2);

    // Render cells / crosses / halftones
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];

      // Quantize to cell grid
      const qx = Math.round(p.x / step) * step;
      const qy = Math.round(p.y / step) * step;

      // Banding filter
      if (this.banding > 1 && (Math.round(qy / step) % this.banding !== 0)) {
        continue;
      }

      // Shading color calculation
      let color = this.highlightColor;
      const depthFactor = (p.depth + 40) / 80; // 0 to 1

      // Level gating
      if (depthFactor < this.levels * 0.3) {
        continue;
      }

      // Alternate markers: use '+' or 'x' for subtle wireframe/dots like Nonstop Studio
      const useCross = (i % 3 === 0) || (depthFactor < this.l2Start);
      
      ctx.save();
      if (p.isAccent) {
        ctx.fillStyle = this.highlightColor;
        ctx.strokeStyle = this.highlightColor;
      } else {
        // Shaded highlight
        ctx.fillStyle = this.highlightColor;
        ctx.strokeStyle = this.highlightColor;
        ctx.globalAlpha = Math.min(1.0, Math.max(0.2, 1.0 - depthFactor * 0.65));
      }

      if (this.markerStyle === 'cross' && useCross) {
        // Draw crisp pixel cross '+' or 'x'
        const arm = effectiveSize * 0.7;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(qx - arm, qy);
        ctx.lineTo(qx + arm, qy);
        ctx.moveTo(qx, qy - arm);
        ctx.lineTo(qx, qy + arm);
        ctx.stroke();
      } else if (this.markerStyle === 'circle') {
        ctx.beginPath();
        ctx.arc(qx, qy, effectiveSize / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Standard square voxel cell
        ctx.fillRect(qx - effectiveSize / 2, qy - effectiveSize / 2, effectiveSize, effectiveSize);
      }
      ctx.restore();
    }
  }

  exportPNG() {
    const link = document.createElement('a');
    link.download = `${this.modelName}-voxel-asset-${Date.now()}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
    if (window.showToast) window.showToast('Asset exported as high-resolution PNG!');
  }

  exportSVG() {
    // Generate clean vector SVG of current frame
    const w = this.cssWidth;
    const h = this.cssHeight;
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n`;
    svgContent += `  <rect width="100%" height="100%" fill="${this.bgColor}" />\n`;
    svgContent += `  <g fill="${this.highlightColor}">\n`;

    // Render snapshot
    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);
    const scale = 14 * this.zoom;
    const centerX = w / 2;
    const centerY = h / 2 + 10;
    const step = this.cellSize;
    const effectiveSize = Math.max(1, step - step * this.cellMargin * 2);

    this.voxels.forEach(v => {
      const x1 = v.x * cosY + v.z * sinY;
      const z1 = -v.x * sinY + v.z * cosY;
      const y2 = v.y * cosX - z1 * sinX;
      const z2 = v.y * sinX + z1 * cosX;
      const pScale = 160 / (160 + z2 * 1.5);
      const px = centerX + x1 * scale * pScale;
      const py = centerY - y2 * scale * pScale;
      const qx = Math.round(px / step) * step;
      const qy = Math.round(py / step) * step;
      svgContent += `    <rect x="${(qx - effectiveSize/2).toFixed(1)}" y="${(qy - effectiveSize/2).toFixed(1)}" width="${effectiveSize.toFixed(1)}" height="${effectiveSize.toFixed(1)}" rx="0.5" />\n`;
    });

    svgContent += `  </g>\n</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${this.modelName}-voxel-vector-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    if (window.showToast) window.showToast('Vector asset exported as SVG!');
  }
}

window.ObjectStudio = ObjectStudio;
