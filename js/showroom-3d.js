/**
 * The Indian Garage Co. — 3D Kinetic Multi-Category Showroom & Hero Engine
 * Built with Three.js, GSAP & Web Audio Procedural Foley
 * Inspired by Lusion.co, Active Theory & Bruno Simon
 */

class TIGCShowroomEngine {
  constructor() {
    this.heroContainer = document.getElementById('hero-3d-canvas-container');
    this.showroomContainer = document.getElementById('showroom-3d-stage') || document.getElementById('denim-3d-stage');
    
    // Three.js Scenes
    this.heroScene = null;
    this.heroCamera = null;
    this.heroRenderer = null;
    this.heroMonogram = null;
    this.heroParticles = null;
    
    this.showroomScene = null;
    this.showroomCamera = null;
    this.showroomRenderer = null;
    this.showroomGroup = null;
    this.activeGarmentGroup = null;

    // Garment Models & Categories
    this.garments = {};
    this.activeCategory = 'denim'; // 'denim', 'shirt', 'polo', 'jacket'
    this.activeWash = 'raw';
    this.viewMode = 'surface'; // 'surface', 'wireframe', 'xray'
    this.isExploded = false;

    // Interaction State
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.heroDrag = {
      isDragging: false,
      lastX: 0,
      lastY: 0,
      rotX: 0,
      rotY: 0,
      targetRotX: 0,
      targetRotY: 0
    };
    this.drag = {
      isDragging: false,
      lastX: 0,
      lastY: 0,
      rotVelX: 0,
      rotVelY: 0,
      targetRotX: 0.1,
      targetRotY: 0.35,
      currentRotX: 0.1,
      currentRotY: 0.35
    };

    // Textures Cache
    this.textures = {};

    // Dynamic Time-Adaptive Atmosphere
    this.timeTheme = 'midnight'; // 'daylight', 'dusk', 'midnight'
    this.autoTimeSync = true;

    // Multi-Category Catalog Database
    this.catalogData = {
      denim: {
        title: "13.5oz Ring-Spun Comfort Stretch Denim",
        subtitle: "High-Velocity Bottomwear",
        badge: "2.8M+ Pairs Sold Annually",
        description: "Engineered specifically for the South Asian morphological contour. Features an anti-gap lumbar rise, dual-tone copper chain-stitching, 14-point reinforced bartacks, and 2% memory elastane that guarantees 98.4% shape retention across 200+ washes.",
        specs: [
          { label: "Fabric Weight", val: "13.5 oz / yd² Heavy Warp" },
          { label: "Weave Structure", val: "3x1 Right-Hand Ring-Spun Twill" },
          { label: "Tensile Resilience", val: "2% Lycra Memory Snapback" },
          { label: "Construction", val: "14-Point Military Bartack Anchors" },
          { label: "Sell-Through Velocity", val: "88% in 45 Days (Fast-Fashion Record)" },
          { label: "Pricing Segment", val: "₹1,199 – ₹1,899 (High-Volume Sweetspot)" }
        ],
        washes: {
          raw: { name: "Raw Dark Indigo", color: 0x152238, roughness: 0.72, metalness: 0.08 },
          sunken: { name: "Sun-Washed Mid Blue", color: 0x2b4c7e, roughness: 0.78, metalness: 0.05 },
          acid: { name: "Vintage Acid Wash", color: 0x546e8e, roughness: 0.84, metalness: 0.02 },
          selvedge: { name: "Obsidian Black Selvedge", color: 0x141619, roughness: 0.68, metalness: 0.12 }
        }
      },
      shirt: {
        title: "Tailored Solid Oxford Casuals",
        subtitle: "450+ Monthly Active Styles",
        badge: "1.9M+ Units Produced",
        description: "Our signature top-wear powerhouse. Crafted from 60s compact combed cotton and airy French linen blends, finished with a velvet peach enzyme wash. Designed with reinforced collar bands, curved hem ergonomics, and high-density lock stitching.",
        specs: [
          { label: "Fabric Construction", val: "60s Compact Combed Cotton / Linen Blend" },
          { label: "Finish Treatment", val: "Velvet Peach Enzyme Soft-Wash" },
          { label: "Collar Geometry", val: "Camp Cuban / Reinforced Button-Down" },
          { label: "Buttons & Fasteners", val: "Cross-Stitched High-Durability Pearl Trocas" },
          { label: "Turnaround Velocity", val: "14 Days Concept-to-Rack" },
          { label: "Pricing Segment", val: "₹899 – ₹1,399 (Mass Everyday Luxury)" }
        ],
        washes: {
          raw: { name: "Signature Crimson Plaid", color: 0x9e1b21, roughness: 0.82, metalness: 0.02 },
          sunken: { name: "Tuscan Sage Linen", color: 0x58705a, roughness: 0.88, metalness: 0.01 },
          acid: { name: "Deep Cobalt Oxford", color: 0x223c6b, roughness: 0.80, metalness: 0.03 },
          selvedge: { name: "Midnight Obsidian Silk", color: 0x16181f, roughness: 0.60, metalness: 0.15 }
        }
      },
      polo: {
        title: "Polo-licious 320 GSM Heavyweight Knits",
        subtitle: "Elevated Smart Casuals",
        badge: "Top-Rated Across Platforms",
        description: "Indian Garage's breakthrough luxury knitwear. Custom-developed 320 GSM honeycomb waffle and double-pique cotton that provides structural drape, zero clinginess in humid climates, and micro-ribbed cuffs that never lose tension.",
        specs: [
          { label: "Yarn Density", val: "300 – 320 GSM Ultra-Heavyweight Knit" },
          { label: "Knit Texture", val: "Honeycomb Waffle & Combed Double Pique" },
          { label: "Shrinkage Rate", val: "< 1.5% Guaranteed Post-Sanforization" },
          { label: "Placket Engineering", val: "Fused 3-Button Collar with Zero Roll" },
          { label: "Climate Resistance", val: "Anti-Microbial & High Wicking Ventilation" },
          { label: "Pricing Segment", val: "₹799 – ₹1,299" }
        ],
        washes: {
          raw: { name: "Deep Navy Waffle", color: 0x1b2845, roughness: 0.85, metalness: 0.02 },
          sunken: { name: "Forest Moss Pique", color: 0x2f4838, roughness: 0.86, metalness: 0.02 },
          acid: { name: "Sandstone Ecru", color: 0xd4cbb9, roughness: 0.90, metalness: 0.01 },
          selvedge: { name: "Jet Carbon Black", color: 0x181a1d, roughness: 0.80, metalness: 0.05 }
        }
      },
      jacket: {
        title: "All-Terrain Denim Truckers & Utility Overshirts",
        subtitle: "Heavyweight All-Weather Outerwear",
        badge: "High-Density Hardware",
        description: "Heavy-duty outerwear engineered for trans-seasonal layered styling. Constructed with 14.5oz rigid broken-twill denim, anti-corrosive gunmetal shank buttons, reinforced chest bellows pockets, and adjustable waist cinches.",
        specs: [
          { label: "Outer Shell", val: "14.5 oz Rigid Broken-Twill Denim" },
          { label: "Hardware Suite", val: "Die-Cast Matte Gunmetal Shank Buttons" },
          { label: "Seam Construction", val: "Triple-Needle Felled Armhole & Side Seams" },
          { label: "Storage Capacity", val: "4-Pocket Modular Utility Architecture" },
          { label: "Abrasion Rating", val: "50,000+ Martindale Rub Endurance" },
          { label: "Pricing Segment", val: "₹1,899 – ₹2,699" }
        ],
        washes: {
          raw: { name: "Vintage Acid Washed Trucker", color: 0x4a6a96, roughness: 0.74, metalness: 0.08 },
          sunken: { name: "Desert Khaki Canvas", color: 0x8a7759, roughness: 0.82, metalness: 0.04 },
          acid: { name: "Garage Crimson Workwear", color: 0xa81c22, roughness: 0.76, metalness: 0.05 },
          selvedge: { name: "Stealth Obsidian Denim", color: 0x151619, roughness: 0.68, metalness: 0.12 }
        }
      }
    };
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  init() {
    if (this.isInitialized) return;
    if (typeof THREE === 'undefined') {
      console.warn("Three.js is not loaded.");
      return;
    }
    this.isInitialized = true;

    // Resolve containers from live DOM
    this.heroContainer = document.getElementById('hero-3d-podium-canvas') || document.getElementById('hero-3d-canvas-container');
    this.showroomContainer = document.getElementById('showroom-3d-stage') || document.getElementById('denim-3d-stage');

    this.initProceduralTextures();
    this.initHeroScene();
    this.initShowroomScene();
    this.initTimeAdaptiveTheme();
    this.bindEvents();
    this.animate();
  }

  // ==========================================================================
  // PROCEDURAL PBR TEXTURES (Authentic Cloth Twill & Waffle Normal Maps)
  // ==========================================================================
  initProceduralTextures() {
    // 1. Denim Twill Normal Map (Diagonal 3x1 Weave)
    const twillCanvas = document.createElement('canvas');
    twillCanvas.width = 256;
    twillCanvas.height = 256;
    const tCtx = twillCanvas.getContext('2d');
    const tImg = tCtx.createImageData(256, 256);
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const idx = (y * 256 + x) * 4;
        const rib = Math.sin(((x * 2 + y * 2) / 256) * Math.PI * 32);
        const cross = Math.cos((x / 256) * Math.PI * 64) * 0.25;
        const nx = 128 + rib * 40;
        const ny = 128 + cross * 25;
        tImg.data[idx] = nx;
        tImg.data[idx + 1] = ny;
        tImg.data[idx + 2] = 245;
        tImg.data[idx + 3] = 255;
      }
    }
    tCtx.putImageData(tImg, 0, 0);
    this.textures.twillNormal = new THREE.CanvasTexture(twillCanvas);
    this.textures.twillNormal.wrapS = THREE.RepeatWrapping;
    this.textures.twillNormal.wrapT = THREE.RepeatWrapping;
    this.textures.twillNormal.repeat.set(16, 16);

    // 2. Waffle Knit Normal Map (Honeycomb Pique)
    const waffleCanvas = document.createElement('canvas');
    waffleCanvas.width = 256;
    waffleCanvas.height = 256;
    const wCtx = waffleCanvas.getContext('2d');
    const wImg = wCtx.createImageData(256, 256);
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const idx = (y * 256 + x) * 4;
        const wx = Math.sin((x / 256) * Math.PI * 32);
        const wy = Math.sin((y / 256) * Math.PI * 32);
        const depth = wx * wy;
        wImg.data[idx] = 128 + wx * 35;
        wImg.data[idx + 1] = 128 + wy * 35;
        wImg.data[idx + 2] = 240 + depth * 15;
        wImg.data[idx + 3] = 255;
      }
    }
    wCtx.putImageData(wImg, 0, 0);
    this.textures.waffleNormal = new THREE.CanvasTexture(waffleCanvas);
    this.textures.waffleNormal.wrapS = THREE.RepeatWrapping;
    this.textures.waffleNormal.wrapT = THREE.RepeatWrapping;
    this.textures.waffleNormal.repeat.set(24, 24);
  }

  // ==========================================================================
  // SCENE 1: HERO SCULPTED G-UNIT MONOGRAM WITH AMBIENT PARTICLES
  // ==========================================================================
  initHeroScene() {
    if (!this.heroContainer) return;
    this.heroContainer.innerHTML = '';
    const w = this.heroContainer.clientWidth || 480;
    const h = this.heroContainer.clientHeight || 520;

    this.heroScene = new THREE.Scene();
    this.heroCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
    this.heroCamera.position.set(0, 0, 22);

    this.heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.heroRenderer.setSize(w, h);
    this.heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.heroRenderer.toneMappingExposure = 1.05;
    this.heroContainer.appendChild(this.heroRenderer.domElement);

    // Hero Luxury Studio Illumination (Apple Titanium & Ruby Speculars)
    this.heroAmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.heroScene.add(this.heroAmbientLight);

    this.heroKeyLight = new THREE.DirectionalLight(0xff3344, 1.6);
    this.heroKeyLight.position.set(10, 14, 14);
    this.heroScene.add(this.heroKeyLight);

    this.heroRimLight = new THREE.DirectionalLight(0x4080ff, 0.95);
    this.heroRimLight.position.set(-12, -8, 10);
    this.heroScene.add(this.heroRimLight);

    // Official Symmetrical Indian Garage G-Unit Monogram (Adobe Illustrator Exact Vectors)
    // Part 0: Right Bottom G-Bracket with Crossbar
    const s0 = new THREE.Shape();
    s0.moveTo(3.7455, -2.0829);
    s0.bezierCurveTo(3.7403, -3.0082, 2.9094, -3.7302, 1.9815, -3.7302);
    s0.lineTo(0.2379, -3.7302);
    s0.lineTo(0.2364, -2.3790);
    s0.lineTo(1.7775, -2.3779);
    s0.bezierCurveTo(2.1150, -2.3779, 2.3884, -2.1049, 2.3884, -1.7685);
    s0.lineTo(2.3884, -0.7679);
    s0.lineTo(0.7847, -0.7664);
    s0.lineTo(0.7832, 0.5796);
    s0.lineTo(3.7455, 0.5811);
    s0.lineTo(3.7455, -2.0825);
    s0.closePath();

    // Part 1: Right Top G-Hook
    const s1 = new THREE.Shape();
    s1.moveTo(3.7481, 1.5876);
    s1.lineTo(2.3947, 1.5876);
    s1.lineTo(2.3936, 1.7719);
    s1.bezierCurveTo(2.3936, 2.1042, 2.1131, 2.3734, 1.7678, 2.3734);
    s1.lineTo(0.2379, 2.3734);
    s1.lineTo(0.2364, 3.7295);
    s1.lineTo(1.9308, 3.7306);
    s1.bezierCurveTo(2.8900, 3.7306, 3.7455, 2.9847, 3.7481, 2.0624);
    s1.lineTo(3.7496, 1.5888);
    s1.closePath();

    // Part 2: Left Bottom G-Bracket with Crossbar
    const s2 = new THREE.Shape();
    s2.moveTo(-3.7455, -2.0829);
    s2.bezierCurveTo(-3.7403, -3.0082, -2.9094, -3.7302, -1.9815, -3.7302);
    s2.lineTo(-0.2379, -3.7302);
    s2.lineTo(-0.2364, -2.3790);
    s2.lineTo(-1.7775, -2.3779);
    s2.bezierCurveTo(-2.1150, -2.3779, -2.3884, -2.1049, -2.3884, -1.7685);
    s2.lineTo(-2.3884, -0.7679);
    s2.lineTo(-0.7847, -0.7664);
    s2.lineTo(-0.7832, 0.5796);
    s2.lineTo(-3.7455, 0.5807);
    s2.lineTo(-3.7455, -2.0825);
    s2.closePath();

    // Part 3: Left Top G-Hook
    const s3 = new THREE.Shape();
    s3.moveTo(-3.7481, 1.5873);
    s3.lineTo(-2.3951, 1.5873);
    s3.lineTo(-2.3940, 1.7715);
    s3.bezierCurveTo(-2.3940, 2.1038, -2.1135, 2.3731, -1.7682, 2.3731);
    s3.lineTo(-0.2383, 2.3731);
    s3.lineTo(-0.2368, 3.7291);
    s3.lineTo(-1.9311, 3.7302);
    s3.bezierCurveTo(-2.8904, 3.7302, -3.7459, 2.9843, -3.7485, 2.0620);
    s3.lineTo(-3.7500, 1.5884);
    s3.closePath();

    const extrudeSettings = {
      steps: 2,
      depth: 0.9,
      bevelEnabled: true,
      bevelThickness: 0.22,
      bevelSize: 0.18,
      bevelSegments: 4
    };

    const geometry = new THREE.ExtrudeGeometry([s0, s1, s2, s3], extrudeSettings);
    geometry.center();

    const material = new THREE.MeshStandardMaterial({
      color: 0xdb2128,
      roughness: 0.20,
      metalness: 0.88,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12
    });

    this.heroMonogram = new THREE.Mesh(geometry, material);
    this.heroScene.add(this.heroMonogram);

    // Sleek Orbit Pedestal Ring
    const ringGeo = new THREE.TorusGeometry(4.8, 0.05, 16, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xff2a35, roughness: 0.3, metalness: 0.8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = -4.2;
    this.heroScene.add(ring);

    // Ambient Stardust Dust Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 35;
      positions[i + 1] = (Math.random() - 0.5) * 28;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff4d54,
      size: 0.15,
      transparent: true,
      opacity: 0.65
    });
    this.heroParticles = new THREE.Points(particleGeo, particleMat);
    this.heroScene.add(this.heroParticles);

    // Hero Podium Container ResizeObserver
    if (window.ResizeObserver && this.heroContainer) {
      const roHero = new ResizeObserver(() => {
        if (this.heroContainer && this.heroRenderer && this.heroCamera) {
          const hw = this.heroContainer.clientWidth;
          const hh = this.heroContainer.clientHeight;
          if (hw > 0 && hh > 0) {
            this.heroCamera.aspect = hw / hh;
            this.heroCamera.updateProjectionMatrix();
            this.heroRenderer.setSize(hw, hh);
          }
        }
      });
      roHero.observe(this.heroContainer);
    }

    // Hero Podium Interactive Drag to Spin Monogram
    if (this.heroContainer) {
      this.heroContainer.addEventListener('mousedown', (e) => {
        this.heroDrag.isDragging = true;
        this.heroDrag.lastX = e.clientX;
        this.heroDrag.lastY = e.clientY;
        if (window.soundFX && window.soundFX.playHoverTick) window.soundFX.playHoverTick();
      });

      this.heroContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.heroDrag.isDragging = true;
          this.heroDrag.lastX = e.touches[0].clientX;
          this.heroDrag.lastY = e.touches[0].clientY;
        }
      }, { passive: true });

      window.addEventListener('mouseup', () => {
        this.heroDrag.isDragging = false;
      });

      window.addEventListener('touchend', () => {
        this.heroDrag.isDragging = false;
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.heroDrag.isDragging) return;
        const dx = e.clientX - this.heroDrag.lastX;
        const dy = e.clientY - this.heroDrag.lastY;
        this.heroDrag.lastX = e.clientX;
        this.heroDrag.lastY = e.clientY;
        this.heroDrag.targetRotY += dx * 0.01;
        this.heroDrag.targetRotX += dy * 0.008;
        this.heroDrag.targetRotX = Math.max(-0.8, Math.min(0.8, this.heroDrag.targetRotX));
      });

      window.addEventListener('touchmove', (e) => {
        if (!this.heroDrag.isDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - this.heroDrag.lastX;
        const dy = e.touches[0].clientY - this.heroDrag.lastY;
        this.heroDrag.lastX = e.touches[0].clientX;
        this.heroDrag.lastY = e.touches[0].clientY;
        this.heroDrag.targetRotY += dx * 0.01;
        this.heroDrag.targetRotX += dy * 0.008;
        this.heroDrag.targetRotX = Math.max(-0.8, Math.min(0.8, this.heroDrag.targetRotX));
      }, { passive: true });
    }
  }

  // ==========================================================================
  // SCENE 2: INTERACTIVE 3D MULTI-CATEGORY APPAREL SHOWROOM
  // ==========================================================================
  initShowroomScene() {
    if (!this.showroomContainer) return;
    this.showroomContainer.innerHTML = '';
    const w = this.showroomContainer.clientWidth || 650;
    const h = this.showroomContainer.clientHeight || 560;

    this.showroomScene = new THREE.Scene();
    this.showroomCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    this.showroomCamera.position.set(0, 0, 18);

    this.showroomRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.showroomRenderer.setSize(w, h);
    this.showroomRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.showroomRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.showroomRenderer.toneMappingExposure = 1.0;
    this.showroomContainer.appendChild(this.showroomRenderer.domElement);

    // Photographic Studio Illumination (Balanced Soft Light, Zero White Bleaching)
    this.studioAmbient = new THREE.AmbientLight(0xffffff, 0.45);
    this.showroomScene.add(this.studioAmbient);

    this.studioKey = new THREE.DirectionalLight(0xfff8f0, 1.35);
    this.studioKey.position.set(8, 14, 12);
    this.showroomScene.add(this.studioKey);

    this.studioFill = new THREE.DirectionalLight(0x7090d0, 0.6);
    this.studioFill.position.set(-10, -4, -6);
    this.showroomScene.add(this.studioFill);

    this.studioCrimsonRim = new THREE.DirectionalLight(0xe50914, 0.65);
    this.studioCrimsonRim.position.set(0, 10, -12);
    this.showroomScene.add(this.studioCrimsonRim);

    // Showroom Root Group
    this.showroomGroup = new THREE.Group();
    this.showroomScene.add(this.showroomGroup);

    // Build All 4 High-Fidelity 3D Garments
    this.buildDenimModel();
    this.buildShirtModel();
    this.buildPoloModel();
    this.buildJacketModel();

    // Set Default Active Garment
    this.setCategory('denim', true);

    // Setup ResizeObserver for adaptive container responsiveness
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        if (this.showroomContainer && this.showroomRenderer && this.showroomCamera) {
          const nw = this.showroomContainer.clientWidth;
          const nh = this.showroomContainer.clientHeight;
          if (nw > 0 && nh > 0) {
            this.showroomCamera.aspect = nw / nh;
            this.showroomCamera.updateProjectionMatrix();
            this.showroomRenderer.setSize(nw, nh);
          }
        }
      });
      ro.observe(this.showroomContainer);
    }
  }

  // --------------------------------------------------------------------------
  // MODEL 1: THE SIGNATURE SCULPTED SELVEDGE DENIM
  // --------------------------------------------------------------------------
  buildDenimModel() {
    const group = new THREE.Group();
    const parts = [];

    // Load authentic real Indian Garage denim product photo as texture map
    const texLoader = new THREE.TextureLoader();
    const realDenimTex = texLoader.load("assets/tigc_live/polo_01.jpg");
    realDenimTex.wrapS = THREE.RepeatWrapping;
    realDenimTex.wrapT = THREE.RepeatWrapping;
    realDenimTex.repeat.set(1.5, 1.5);

    // Realistic Ring-Spun Twill Material with Photographic Depth
    const mat = new THREE.MeshStandardMaterial({
      color: 0x1b2c48, // Deep Indigo
      roughness: 0.75,
      metalness: 0.05,
      map: realDenimTex,
      normalMap: this.textures.twillNormal,
      normalScale: new THREE.Vector2(0.6, 0.6)
    });

    // Golden-Copper Contrast Chain-Stitch Material
    const threadMat = new THREE.MeshStandardMaterial({
      color: 0xc88942,
      roughness: 0.5,
      metalness: 0.25
    });

    // Antique Brass Hardware
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.22
    });

    // 1. Contoured Waistband (SOLID CAPPED - Zero Hollow Funnel Gaping)
    const waistbandGeo = new THREE.CylinderGeometry(2.42, 2.42, 0.65, 36, 1, false);
    const waistband = new THREE.Mesh(waistbandGeo, mat);
    waistband.position.set(0, 3.25, 0);
    waistband.userData = {
      name: "Contoured Waistband with Interior Chambray Lining",
      explodedPos: new THREE.Vector3(0, 5.2, 0),
      originPos: new THREE.Vector3(0, 3.25, 0)
    };
    group.add(waistband);
    parts.push(waistband);

    // Dual-Needle Golden Top-Stitch Rings on Waistband
    const stitchRingTopGeo = new THREE.TorusGeometry(2.43, 0.018, 8, 48);
    stitchRingTopGeo.rotateX(Math.PI / 2);
    const stitchTop = new THREE.Mesh(stitchRingTopGeo, threadMat);
    stitchTop.position.set(0, 3.52, 0);
    waistband.add(stitchTop);

    const stitchRingBotGeo = new THREE.TorusGeometry(2.43, 0.018, 8, 48);
    stitchRingBotGeo.rotateX(Math.PI / 2);
    const stitchBot = new THREE.Mesh(stitchRingBotGeo, threadMat);
    stitchBot.position.set(0, 2.98, 0);
    waistband.add(stitchBot);

    // 5 Reinforced Belt Loops (Tightly flush against waistband)
    const loopPositions = [
      { angle: 0.38, r: 2.45 },
      { angle: -0.38, r: 2.45 },
      { angle: 1.57, r: 2.45 },
      { angle: -1.57, r: 2.45 },
      { angle: Math.PI, r: 2.45 }
    ];
    loopPositions.forEach(lp => {
      const loopGeo = new THREE.BoxGeometry(0.16, 0.72, 0.06);
      const loop = new THREE.Mesh(loopGeo, mat);
      const x = Math.sin(lp.angle) * lp.r;
      const z = Math.cos(lp.angle) * lp.r;
      loop.position.set(x, 3.25, z);
      loop.rotation.y = lp.angle;
      waistband.add(loop);
    });

    // Antique Brass Shank Button (Flush on Center Front)
    const buttonGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.08, 24);
    buttonGeo.rotateX(Math.PI / 2);
    const button = new THREE.Mesh(buttonGeo, brassMat);
    button.position.set(0, 3.25, 2.45);
    button.userData = {
      name: "Antique Brass Center Shank Button",
      explodedPos: new THREE.Vector3(0, 4.2, 3.8),
      originPos: new THREE.Vector3(0, 3.25, 2.45)
    };
    group.add(button);
    parts.push(button);

    // Genuine Saddle Leather Brand Patch (Flush against rear right curve)
    const leatherGeo = new THREE.BoxGeometry(0.92, 0.52, 0.04);
    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x8a4823, // Cognac Brown
      roughness: 0.65,
      metalness: 0.12
    });
    const leatherPatch = new THREE.Mesh(leatherGeo, leatherMat);
    leatherPatch.position.set(1.35, 3.25, -2.02);
    leatherPatch.rotation.y = Math.PI + 0.58;
    leatherPatch.userData = {
      name: "Embossed Full-Grain Leather Brand Patch",
      explodedPos: new THREE.Vector3(2.5, 4.2, -4.0),
      originPos: new THREE.Vector3(1.35, 3.25, -2.02)
    };
    group.add(leatherPatch);
    parts.push(leatherPatch);

    // 2. Pelvic Core & Seat Architecture (SOLID - Smoothly transitions into legs)
    const pelvisGeo = new THREE.CylinderGeometry(2.42, 2.58, 2.4, 36, 4, false);
    const pelvis = new THREE.Mesh(pelvisGeo, mat);
    pelvis.position.set(0, 1.85, 0);
    pelvis.userData = {
      name: "Ergonomic South Asian Pelvis Block & Saddle",
      explodedPos: new THREE.Vector3(0, 1.85, 0),
      originPos: new THREE.Vector3(0, 1.85, 0)
    };
    group.add(pelvis);
    parts.push(pelvis);

    // Front Fly Placket & Golden J-Stitch Seam
    const flyPlacketGeo = new THREE.BoxGeometry(0.38, 1.8, 0.04);
    const flyPlacket = new THREE.Mesh(flyPlacketGeo, mat);
    flyPlacket.position.set(0, 1.95, 2.55);
    group.add(flyPlacket);

    const jCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.20, 2.7, 2.56),
      new THREE.Vector3(0.22, 1.7, 2.56),
      new THREE.Vector3(0.16, 1.25, 2.56),
      new THREE.Vector3(0.0, 1.05, 2.56)
    ]);
    const jStitch = new THREE.Mesh(new THREE.TubeGeometry(jCurve, 20, 0.02, 8, false), threadMat);
    group.add(jStitch);

    // Rear Pockets (Flush against posterior surface)
    const backPocketGeo = new THREE.PlaneGeometry(1.05, 1.25);
    const backPocketL = new THREE.Mesh(backPocketGeo, mat);
    backPocketL.position.set(-1.18, 1.75, -2.25);
    backPocketL.rotation.y = Math.PI - 0.50;
    backPocketL.userData = {
      name: "Left Rear Pocket with Double Arcuate Stitch",
      explodedPos: new THREE.Vector3(-1.18, 1.75, -4.2),
      originPos: new THREE.Vector3(-1.18, 1.75, -2.25)
    };
    group.add(backPocketL);
    parts.push(backPocketL);

    const backPocketR = new THREE.Mesh(backPocketGeo, mat);
    backPocketR.position.set(1.18, 1.75, -2.25);
    backPocketR.rotation.y = Math.PI + 0.50;
    backPocketR.userData = {
      name: "Right Rear Pocket with Double Arcuate Stitch",
      explodedPos: new THREE.Vector3(1.18, 1.75, -4.2),
      originPos: new THREE.Vector3(1.18, 1.75, -2.25)
    };
    group.add(backPocketR);
    parts.push(backPocketR);

    // Front Scoop Pocket Curves (Flush along hip curve)
    const scoopLCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.1, 2.7, 2.35),
      new THREE.Vector3(-1.8, 2.3, 1.8),
      new THREE.Vector3(-2.2, 1.9, 1.2)
    ]);
    const scoopL = new THREE.Mesh(new THREE.TubeGeometry(scoopLCurve, 16, 0.03, 8, false), threadMat);
    scoopL.userData = {
      name: "Left Scoop Pocket Opening",
      explodedPos: new THREE.Vector3(-2.5, 2.3, 3.2),
      originPos: new THREE.Vector3(0, 0, 0)
    };
    group.add(scoopL);
    parts.push(scoopL);

    const scoopRCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.1, 2.7, 2.35),
      new THREE.Vector3(1.8, 2.3, 1.8),
      new THREE.Vector3(2.2, 1.9, 1.2)
    ]);
    const scoopR = new THREE.Mesh(new THREE.TubeGeometry(scoopRCurve, 16, 0.03, 8, false), threadMat);
    scoopR.userData = {
      name: "Right Scoop Pocket with Coin Insert",
      explodedPos: new THREE.Vector3(2.5, 2.3, 3.2),
      originPos: new THREE.Vector3(0, 0, 0)
    };
    group.add(scoopR);
    parts.push(scoopR);

    // 3. Ergonomic Inseam & Tapered Legs (Continuous South Asian Silhouette)
    const legCurveL = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.22, 1.1, 0),
      new THREE.Vector3(-1.24, 0.0, 0.05),
      new THREE.Vector3(-1.18, -1.3, 0.15),
      new THREE.Vector3(-1.10, -2.8, 0.05),
      new THREE.Vector3(-1.05, -4.4, 0)
    ]);
    const leftLeg = new THREE.Mesh(new THREE.TubeGeometry(legCurveL, 36, 1.15, 24, false), mat);
    leftLeg.userData = {
      name: "Left Leg: 13.5oz Ring-Spun Comfort Stretch Denim",
      explodedPos: new THREE.Vector3(-2.8, 0, 0),
      originPos: new THREE.Vector3(0, 0, 0)
    };
    group.add(leftLeg);
    parts.push(leftLeg);

    const legCurveR = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.22, 1.1, 0),
      new THREE.Vector3(1.24, 0.0, 0.05),
      new THREE.Vector3(1.18, -1.3, 0.15),
      new THREE.Vector3(1.10, -2.8, 0.05),
      new THREE.Vector3(1.05, -4.4, 0)
    ]);
    const rightLeg = new THREE.Mesh(new THREE.TubeGeometry(legCurveR, 36, 1.15, 24, false), mat);
    rightLeg.userData = {
      name: "Right Leg: 13.5oz Ring-Spun Comfort Stretch Denim",
      explodedPos: new THREE.Vector3(2.8, 0, 0),
      originPos: new THREE.Vector3(0, 0, 0)
    };
    group.add(rightLeg);
    parts.push(rightLeg);

    // 4. Ankle Turn-Up Cuffs with Selvedge Line
    const cuffGeo = new THREE.TorusGeometry(1.10, 0.08, 12, 32);
    cuffGeo.rotateX(Math.PI / 2);
    const cuffMat = new THREE.MeshStandardMaterial({ color: 0xa4bad9, roughness: 0.8 });
    const cuffL = new THREE.Mesh(cuffGeo, cuffMat);
    cuffL.position.set(-1.05, -4.38, 0);
    group.add(cuffL);

    const cuffR = new THREE.Mesh(cuffGeo, cuffMat);
    cuffR.position.set(1.05, -4.38, 0);
    group.add(cuffR);

    // Outseam Golden Chain-Stitching (Runs down the outer edge of both legs)
    const outseamLCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.45, 3.25, 0),
      new THREE.Vector3(-2.60, 1.85, 0),
      new THREE.Vector3(-2.38, 0.0, 0.05),
      new THREE.Vector3(-2.30, -1.3, 0.15),
      new THREE.Vector3(-2.18, -4.4, 0)
    ]);
    const outseamL = new THREE.Mesh(new THREE.TubeGeometry(outseamLCurve, 32, 0.02, 8, false), threadMat);
    group.add(outseamL);

    const outseamRCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2.45, 3.25, 0),
      new THREE.Vector3(2.60, 1.85, 0),
      new THREE.Vector3(2.38, 0.0, 0.05),
      new THREE.Vector3(2.30, -1.3, 0.15),
      new THREE.Vector3(2.18, -4.4, 0)
    ]);
    const outseamR = new THREE.Mesh(new THREE.TubeGeometry(outseamRCurve, 32, 0.02, 8, false), threadMat);
    group.add(outseamR);

    group.userData = { parts, material: mat };
    group.visible = false;
    this.showroomGroup.add(group);
    this.garments.denim = group;
  }
  buildShirtModel() {
    const group = new THREE.Group();
    const parts = [];

    const mat = new THREE.MeshStandardMaterial({
      color: 0x9e1b21,
      roughness: 0.82,
      metalness: 0.02,
      normalMap: this.textures.twillNormal,
      normalScale: new THREE.Vector2(0.4, 0.4)
    });

    // Torso Body
    const torsoGeo = new THREE.CylinderGeometry(2.4, 2.6, 6.2, 32, 2, true);
    const torso = new THREE.Mesh(torsoGeo, mat);
    torso.position.set(0, 0, 0);
    torso.userData = {
      name: "60s Combed Cotton Torso with Enzyme Velvet Soft-Finish",
      explodedPos: new THREE.Vector3(0, 0, -2.5),
      originPos: new THREE.Vector3(0, 0, 0)
    };
    group.add(torso);
    parts.push(torso);

    // Cuban Notch Lapel Collar (Folded open)
    const collarLeftGeo = new THREE.BoxGeometry(1.6, 0.9, 0.12);
    collarLeftGeo.rotateZ(0.35);
    const collarL = new THREE.Mesh(collarLeftGeo, mat);
    collarL.position.set(-1.1, 3.4, 2.2);
    group.add(collarL);

    const collarRightGeo = new THREE.BoxGeometry(1.6, 0.9, 0.12);
    collarRightGeo.rotateZ(-0.35);
    const collarR = new THREE.Mesh(collarRightGeo, mat);
    collarR.position.set(1.1, 3.4, 2.2);
    group.add(collarR);

    // Front Button Placket
    const placketGeo = new THREE.BoxGeometry(0.35, 6.0, 0.08);
    const placket = new THREE.Mesh(placketGeo, mat);
    placket.position.set(0, 0.1, 2.5);
    group.add(placket);

    // Trocas Pearl Buttons along Placket
    const pearlMat = new THREE.MeshStandardMaterial({ color: 0xf5f3ea, roughness: 0.18, metalness: 0.1 });
    for (let b = 0; b < 6; b++) {
      const btnGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.06, 16);
      btnGeo.rotateX(Math.PI / 2);
      const btnMesh = new THREE.Mesh(btnGeo, pearlMat);
      btnMesh.position.set(0, 2.4 - b * 0.95, 2.56);
      group.add(btnMesh);
    }

    // Chest Pocket
    const pocketGeo = new THREE.BoxGeometry(1.1, 1.3, 0.06);
    const pocket = new THREE.Mesh(pocketGeo, mat);
    pocket.position.set(-1.2, 1.2, 2.48);
    pocket.userData = {
      name: "Reinforced Chest Bellows Pocket with Pen Slot",
      explodedPos: new THREE.Vector3(-1.2, 1.2, 4.0),
      originPos: new THREE.Vector3(-1.2, 1.2, 2.48)
    };
    group.add(pocket);
    parts.push(pocket);

    // Short Sleeves with Cuffs
    const sleeveLGeo = new THREE.CylinderGeometry(1.1, 1.0, 2.6, 24);
    sleeveLGeo.rotateZ(0.65);
    const sleeveL = new THREE.Mesh(sleeveLGeo, mat);
    sleeveL.position.set(-3.2, 1.8, 0);
    sleeveL.userData = {
      name: "Left Armhole Felled Seam & Folded Cuff",
      explodedPos: new THREE.Vector3(-5.2, 1.8, 0),
      originPos: new THREE.Vector3(-3.2, 1.8, 0)
    };
    group.add(sleeveL);
    parts.push(sleeveL);

    const sleeveRGeo = new THREE.CylinderGeometry(1.1, 1.0, 2.6, 24);
    sleeveRGeo.rotateZ(-0.65);
    const sleeveR = new THREE.Mesh(sleeveRGeo, mat);
    sleeveR.position.set(3.2, 1.8, 0);
    sleeveR.userData = {
      name: "Right Armhole Felled Seam & Folded Cuff",
      explodedPos: new THREE.Vector3(5.2, 1.8, 0),
      originPos: new THREE.Vector3(3.2, 1.8, 0)
    };
    group.add(sleeveR);
    parts.push(sleeveR);

    group.userData = { parts, material: mat };
    group.visible = false;
    this.showroomGroup.add(group);
    this.garments.shirt = group;
  }

  // --------------------------------------------------------------------------
  // MODEL 3: POLO-LICIOUS 320 GSM WAFFLE KNIT POLO
  // --------------------------------------------------------------------------
  buildPoloModel() {
    const group = new THREE.Group();
    const parts = [];

    const mat = new THREE.MeshStandardMaterial({
      color: 0x1b2845,
      roughness: 0.85,
      metalness: 0.02,
      normalMap: this.textures.waffleNormal,
      normalScale: new THREE.Vector2(1.2, 1.2)
    });

    // Athletic Torso
    const torsoGeo = new THREE.CylinderGeometry(2.35, 2.45, 5.8, 32, 4, true);
    const torso = new THREE.Mesh(torsoGeo, mat);
    torso.position.set(0, -0.2, 0);
    torso.userData = {
      name: "320 GSM Heavyweight Honeycomb Waffle Pique Torso",
      explodedPos: new THREE.Vector3(0, -0.2, -2.5),
      originPos: new THREE.Vector3(0, -0.2, 0)
    };
    group.add(torso);
    parts.push(torso);

    // Ribbed Polo Collar (Structured Neckline)
    const collarGeo = new THREE.CylinderGeometry(1.45, 1.85, 0.9, 24, 1, true);
    const collarMat = new THREE.MeshStandardMaterial({ color: 0x141e33, roughness: 0.9 });
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.set(0, 3.1, 0.15);
    collar.userData = {
      name: "Zero-Roll Fused Knit Collar with Contrast Tipped Piping",
      explodedPos: new THREE.Vector3(0, 4.8, 0.15),
      originPos: new THREE.Vector3(0, 3.1, 0.15)
    };
    group.add(collar);
    parts.push(collar);

    // 3-Button Polo Placket
    const placketGeo = new THREE.BoxGeometry(0.42, 2.2, 0.09);
    const placket = new THREE.Mesh(placketGeo, collarMat);
    placket.position.set(0, 1.8, 2.38);
    group.add(placket);

    // Pearl Buttons (3)
    const btnMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2, metalness: 0.1 });
    for (let i = 0; i < 3; i++) {
      const bGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 16);
      bGeo.rotateX(Math.PI / 2);
      const btn = new THREE.Mesh(bGeo, btnMat);
      btn.position.set(0, 2.45 - i * 0.65, 2.44);
      group.add(btn);
    }

    // Ribbed Sleeves with Athletic Band
    const sleeveLGeo = new THREE.CylinderGeometry(1.05, 0.92, 2.8, 24);
    sleeveLGeo.rotateZ(0.55);
    const sleeveL = new THREE.Mesh(sleeveLGeo, mat);
    sleeveL.position.set(-2.9, 1.6, 0);
    sleeveL.userData = {
      name: "Left High-Tension Ribbed Cuff",
      explodedPos: new THREE.Vector3(-4.8, 1.6, 0),
      originPos: new THREE.Vector3(-2.9, 1.6, 0)
    };
    group.add(sleeveL);
    parts.push(sleeveL);

    const sleeveRGeo = new THREE.CylinderGeometry(1.05, 0.92, 2.8, 24);
    sleeveRGeo.rotateZ(-0.55);
    const sleeveR = new THREE.Mesh(sleeveRGeo, mat);
    sleeveR.position.set(2.9, 1.6, 0);
    sleeveR.userData = {
      name: "Right High-Tension Ribbed Cuff",
      explodedPos: new THREE.Vector3(4.8, 1.6, 0),
      originPos: new THREE.Vector3(2.9, 1.6, 0)
    };
    group.add(sleeveR);
    parts.push(sleeveR);

    group.userData = { parts, material: mat };
    group.visible = false;
    this.showroomGroup.add(group);
    this.garments.polo = group;
  }

  // --------------------------------------------------------------------------
  // MODEL 4: UTILITY TRUCKER JACKET & OVERSHIRT
  // --------------------------------------------------------------------------
  buildJacketModel() {
    const group = new THREE.Group();
    const parts = [];

    const mat = new THREE.MeshStandardMaterial({
      color: 0x4a6a96,
      roughness: 0.74,
      metalness: 0.08,
      normalMap: this.textures.twillNormal,
      normalScale: new THREE.Vector2(1.0, 1.0)
    });

    // Boxy Heavyweight Shell
    const shellGeo = new THREE.CylinderGeometry(2.65, 2.75, 6.4, 32, 2, true);
    const shell = new THREE.Mesh(shellGeo, mat);
    shell.position.set(0, 0, 0);
    shell.userData = {
      name: "14.5oz Broken-Twill Denim Rigid Outerwear Shell",
      explodedPos: new THREE.Vector3(0, 0, -2.8),
      originPos: new THREE.Vector3(0, 0, 0)
    };
    group.add(shell);
    parts.push(shell);

    // Heavy Trucker Collar
    const collarGeo = new THREE.BoxGeometry(3.6, 0.8, 0.16);
    const collar = new THREE.Mesh(collarGeo, mat);
    collar.position.set(0, 3.4, 1.8);
    collar.userData = {
      name: "Pointed Heavyweight Workwear Collar",
      explodedPos: new THREE.Vector3(0, 5.0, 1.8),
      originPos: new THREE.Vector3(0, 3.4, 1.8)
    };
    group.add(collar);
    parts.push(collar);

    // Dual Flap Bellows Chest Pockets with Brass Hardware
    const flapGeo = new THREE.BoxGeometry(1.2, 1.1, 0.12);
    const flapL = new THREE.Mesh(flapGeo, mat);
    flapL.position.set(-1.25, 1.6, 2.7);
    flapL.userData = {
      name: "Left Chest Flap Pocket with Gunmetal Shank Snap",
      explodedPos: new THREE.Vector3(-1.25, 1.6, 4.4),
      originPos: new THREE.Vector3(-1.25, 1.6, 2.7)
    };
    group.add(flapL);
    parts.push(flapL);

    const flapR = new THREE.Mesh(flapGeo, mat);
    flapR.position.set(1.25, 1.6, 2.7);
    flapR.userData = {
      name: "Right Chest Flap Pocket with Gunmetal Shank Snap",
      explodedPos: new THREE.Vector3(1.25, 1.6, 4.4),
      originPos: new THREE.Vector3(1.25, 1.6, 2.7)
    };
    group.add(flapR);
    parts.push(flapR);

    // Gunmetal Shank Buttons on Flaps
    const gunmetalMat = new THREE.MeshStandardMaterial({ color: 0x3a3d45, metalness: 0.95, roughness: 0.2 });
    const bL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), gunmetalMat);
    bL.rotateX(Math.PI / 2);
    bL.position.set(-1.25, 1.6, 2.8);
    group.add(bL);

    const bR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), gunmetalMat);
    bR.rotateX(Math.PI / 2);
    bR.position.set(1.25, 1.6, 2.8);
    group.add(bR);

    // Heavy Trucker Sleeves
    const sleeveLGeo = new THREE.CylinderGeometry(1.2, 0.95, 5.2, 24);
    sleeveLGeo.rotateZ(0.35);
    const sleeveL = new THREE.Mesh(sleeveLGeo, mat);
    sleeveL.position.set(-3.2, 0.4, 0);
    sleeveL.userData = {
      name: "Triple-Needle Felled Left Sleeve & Wrist Gauntlet",
      explodedPos: new THREE.Vector3(-5.6, 0.4, 0),
      originPos: new THREE.Vector3(-3.2, 0.4, 0)
    };
    group.add(sleeveL);
    parts.push(sleeveL);

    const sleeveRGeo = new THREE.CylinderGeometry(1.2, 0.95, 5.2, 24);
    sleeveRGeo.rotateZ(-0.35);
    const sleeveR = new THREE.Mesh(sleeveRGeo, mat);
    sleeveR.position.set(3.2, 0.4, 0);
    sleeveR.userData = {
      name: "Triple-Needle Felled Right Sleeve & Wrist Gauntlet",
      explodedPos: new THREE.Vector3(5.6, 0.4, 0),
      originPos: new THREE.Vector3(3.2, 0.4, 0)
    };
    group.add(sleeveR);
    parts.push(sleeveR);

    group.userData = { parts, material: mat };
    group.visible = false;
    this.showroomGroup.add(group);
    this.garments.jacket = group;
  }

  // ==========================================================================
  // CATEGORY & WASH TRANSITION CONTROLLER
  // ==========================================================================
  setCategory(categoryKey, immediate = false) {
    if (!this.garments[categoryKey]) return;
    this.activeCategory = categoryKey;
    const catData = this.catalogData[categoryKey];

    // Play Audio Feedback
    if (!immediate && window.soundFX) {
      if (window.soundFX.playWhoosh) window.soundFX.playWhoosh(1.2);
      if (window.soundFX.playClickSnap) window.soundFX.playClickSnap();
    }

    // Toggle 3D Models with GSAP
    Object.keys(this.garments).forEach(k => {
      const g = this.garments[k];
      if (k === categoryKey) {
        g.visible = true;
        this.activeGarmentGroup = g;
        if (!immediate && typeof gsap !== 'undefined') {
          g.scale.set(0.6, 0.6, 0.6);
          g.rotation.y += 0.8;
          gsap.to(g.scale, { x: 1, y: 1, z: 1, duration: 0.65, ease: "back.out(1.4)" });
          gsap.to(g.rotation, { y: this.drag.currentRotY, duration: 0.65, ease: "power2.out" });
        } else {
          g.scale.set(1, 1, 1);
        }
      } else {
        g.visible = false;
      }
    });

    // Reset Explode state on model swap
    this.isExploded = false;
    const explodeBtn = document.getElementById('btn-explode-anatomy');
    if (explodeBtn) explodeBtn.textContent = 'EXPLODE 3D ANATOMY';

    // Update UI Content Panels
    this.updateShowroomUI(catData);

    // Update 3D CAD Render Apparel Showcase
    const categoryPhotos = {
      denim: { src: "assets/renders_3d/denim_3d.jpg", tag: "3D CAD RENDER • 13.5oz RING-SPUN COMFORT STRETCH DENIM" },
      shirt: { src: "assets/renders_3d/shirt_3d.jpg", tag: "3D CAD RENDER • TAILORED SOLID OXFORD CASUAL SHIRT" },
      polo: { src: "assets/renders_3d/polo_3d.jpg", tag: "3D CAD RENDER • POLO-LICIOUS 320 GSM TEXTURED WAFFLE KNIT" },
      jacket: { src: "assets/renders_3d/jacket_3d.jpg", tag: "3D CAD RENDER • ALL-TERRAIN UTILITY TRUCKER JACKET" }
    };
    const photoEl = document.getElementById("real-product-hero-img");
    const tagEl = document.getElementById("real-product-hud-tag");
    if (photoEl && categoryPhotos[categoryKey]) {
      photoEl.src = categoryPhotos[categoryKey].src;
      if (tagEl) tagEl.textContent = categoryPhotos[categoryKey].tag;
    }

    // Apply default wash
    this.setWash(Object.keys(catData.washes)[0], true);
  }

  setWash(washKey, immediate = false) {
    const catData = this.catalogData[this.activeCategory];
    if (!catData || !catData.washes[washKey]) return;
    this.activeWash = washKey;
    const washConfig = catData.washes[washKey];

    const currentGarment = this.garments[this.activeCategory];
    if (!currentGarment || !currentGarment.userData.material) return;

    const mat = currentGarment.userData.material;
    const targetColor = new THREE.Color(washConfig.color);

    if (!immediate && typeof gsap !== 'undefined') {
      gsap.to(mat.color, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 0.45,
        ease: "power2.out"
      });
      gsap.to(mat, {
        roughness: washConfig.roughness,
        metalness: washConfig.metalness,
        duration: 0.45
      });
      if (window.soundFX && window.soundFX.playClickSnap) {
        window.soundFX.playClickSnap();
      }
    } else {
      mat.color.copy(targetColor);
      mat.roughness = washConfig.roughness;
      mat.metalness = washConfig.metalness;
    }

    // Update 3D CAD Render Tone Grading for Selected Wash
    const photoEl = document.getElementById("real-product-hero-img");
    if (photoEl) {
      const washFilters = {
        raw: 'drop-shadow(0 20px 45px rgba(0,0,0,0.55)) brightness(1) contrast(1.05) saturate(1.1)',
        sunken: 'drop-shadow(0 20px 45px rgba(0,0,0,0.55)) brightness(1.15) contrast(0.95) saturate(1.2) hue-rotate(8deg)',
        acid: 'drop-shadow(0 20px 45px rgba(0,0,0,0.55)) brightness(1.25) contrast(1.12) saturate(0.65) hue-rotate(15deg)',
        selvedge: 'drop-shadow(0 20px 45px rgba(0,0,0,0.55)) brightness(0.65) contrast(1.35) saturate(0.2)'
      };
      if (washFilters[washKey]) {
        photoEl.style.filter = washFilters[washKey];
      }
    }

    // Update Active Wash Pill UI
    document.querySelectorAll('.showroom-wash-pill, .denim-wash-pill').forEach(pill => {
      if (pill.getAttribute('data-wash') === washKey) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  toggleExplode() {
    const currentGarment = this.garments[this.activeCategory];
    if (!currentGarment || !currentGarment.userData.parts) return;

    this.isExploded = !this.isExploded;
    const parts = currentGarment.userData.parts;

    if (window.soundFX) {
      if (this.isExploded && window.soundFX.playAnatomyExplode) {
        window.soundFX.playAnatomyExplode();
      } else if (!this.isExploded && window.soundFX.playAnatomyCollapse) {
        window.soundFX.playAnatomyCollapse();
      }
    }

    parts.forEach((p, idx) => {
      const target = this.isExploded ? p.userData.explodedPos : p.userData.originPos;
      if (typeof gsap !== 'undefined') {
        gsap.to(p.position, {
          x: target.x,
          y: target.y,
          z: target.z,
          duration: 0.6,
          delay: idx * 0.04,
          ease: this.isExploded ? "power3.out" : "power2.inOut"
        });
      } else {
        p.position.copy(target);
      }
    });

    const explodeBtn = document.getElementById('btn-explode-anatomy');
    if (explodeBtn) {
      explodeBtn.textContent = this.isExploded ? 'COLLAPSE 3D ANATOMY' : 'EXPLODE 3D ANATOMY';
    }
  }

  // ==========================================================================
  // DYNAMIC UI UPDATE
  // ==========================================================================
  updateShowroomUI(data) {
    const titleEl = document.getElementById('showroom-garment-title');
    const subEl = document.getElementById('showroom-garment-sub');
    const badgeEl = document.getElementById('showroom-garment-badge');
    const descEl = document.getElementById('showroom-garment-desc');
    const specsContainer = document.getElementById('showroom-specs-container');
    const washesContainer = document.getElementById('showroom-washes-container');

    if (titleEl) titleEl.textContent = data.title;
    if (subEl) subEl.textContent = data.subtitle;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (descEl) descEl.textContent = data.description;

    if (specsContainer) {
      specsContainer.innerHTML = data.specs.map(s => `
        <div class="denim-spec-card">
          <div class="spec-card-num">${s.label}</div>
          <div class="spec-card-title">${s.val}</div>
        </div>
      `).join('');
    }

    if (washesContainer) {
      washesContainer.innerHTML = Object.keys(data.washes).map(k => {
        const hex = data.washes[k].color.toString(16).padStart(6, '0');
        return `
          <button class="denim-wash-pill ${k === this.activeWash ? 'active' : ''}" data-wash="${k}">
            <span class="wash-swatch-dot" style="background: #${hex};"></span>
            ${data.washes[k].name}
          </button>
        `;
      }).join('');

      // Wire click events to new wash buttons
      washesContainer.querySelectorAll('.denim-wash-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setWash(btn.getAttribute('data-wash'));
        });
      });
    }

    // Update active category tab pills
    document.querySelectorAll('.category-tab-pill').forEach(pill => {
      if (pill.getAttribute('data-category') === this.activeCategory) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // TIME-ADAPTIVE LIVE WALLPAPER & ATMOSPHERE ENGINE
  // ==========================================================================
  initTimeAdaptiveTheme() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Wire Time Theme Selector Buttons
    const themeButtons = document.querySelectorAll('[data-time-mode]');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-time-mode');
        if (mode === 'auto') {
          this.autoTimeSync = true;
          this.evaluateCurrentTime();
        } else {
          this.autoTimeSync = false;
          this.applyTheme(mode);
        }
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (window.soundFX && window.soundFX.playClickSnap) {
          window.soundFX.playClickSnap();
        }
      });
    });

    this.evaluateCurrentTime();
  }

  updateClock() {
    const clockEl = document.getElementById('live-time-ticker');
    if (!clockEl) return;
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hrs}:${mins}:${secs} IST`;

    if (this.autoTimeSync && now.getSeconds() === 0) {
      this.evaluateCurrentTime();
    }
  }

  evaluateCurrentTime() {
    if (!this.autoTimeSync) return;
    const hour = new Date().getHours();
    let theme = 'midnight';
    if (hour >= 6 && hour < 17) {
      theme = 'daylight';
    } else if (hour >= 17 && hour < 20) {
      theme = 'dusk';
    } else {
      theme = 'midnight';
    }
    this.applyTheme(theme);
  }

  applyTheme(themeName) {
    this.timeTheme = themeName;
    document.documentElement.setAttribute('data-time-theme', themeName);

    const themeBadge = document.getElementById('active-theme-label');
    if (themeBadge) {
      if (themeName === 'daylight') themeBadge.innerHTML = '☼ DAYLIGHT MODE';
      else if (themeName === 'dusk') themeBadge.innerHTML = '◑ DUSK / GOLDEN HOUR';
      else themeBadge.innerHTML = '☾ MIDNIGHT OBSIDIAN';
    }

    // Update Three.js lighting atmosphere (Balanced Luxury Studio)
    if (this.studioAmbient && this.studioKey && this.studioFill) {
      if (themeName === 'daylight') {
        this.studioAmbient.intensity = 0.52;
        this.studioKey.intensity = 1.30;
        this.studioKey.color.setHex(0xfffaf0);
        this.studioFill.intensity = 0.55;
        this.studioFill.color.setHex(0xb0c8f8);
        if (this.heroAmbientLight) this.heroAmbientLight.intensity = 0.55;
      } else if (themeName === 'dusk') {
        this.studioAmbient.intensity = 0.44;
        this.studioKey.intensity = 1.25;
        this.studioKey.color.setHex(0xff9944); // Sunset Amber
        this.studioFill.intensity = 0.60;
        this.studioFill.color.setHex(0x9d4edd); // Twilight Violet
        if (this.heroAmbientLight) this.heroAmbientLight.intensity = 0.50;
      } else {
        // Midnight Obsidian
        this.studioAmbient.intensity = 0.40;
        this.studioKey.intensity = 1.20;
        this.studioKey.color.setHex(0xffffff);
        this.studioFill.intensity = 0.65;
        this.studioFill.color.setHex(0x5271ff); // Deep Indigo
        if (this.heroAmbientLight) this.heroAmbientLight.intensity = 0.45;
      }
    }
  }

  // ==========================================================================
  // EVENT BINDINGS (Drag, Hover, Sound, Kinetic Rotation)
  // ==========================================================================
  bindEvents() {
    // 0. 3D Perspective Tilt on CAD Apparel Blueprint Stage
    const showroomViewport = document.getElementById("showroom-viewport") || document.getElementById("showroom-photo-stage");
    const photoCard = document.getElementById("real-product-card-3d");

    if (showroomViewport && photoCard) {
      showroomViewport.addEventListener("mousemove", (e) => {
        const rect = showroomViewport.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotY = (x / (rect.width / 2)) * 14;
        const rotX = -(y / (rect.height / 2)) * 14;
        photoCard.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;
      });

      showroomViewport.addEventListener("mouseleave", () => {
        photoCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      });
    }

    // 0B. Hero Kinetic G-Unit Monogram Interactive Drag & Spatial Audio Tones
    if (this.heroContainer) {
      this.heroContainer.addEventListener('mousedown', (e) => {
        this.heroDrag.isDragging = true;
        this.heroDrag.lastX = e.clientX;
        this.heroDrag.lastY = e.clientY;
        if (window.soundFX && window.soundFX.playEmblemTone) {
          window.soundFX.playEmblemTone(0.65);
        }
      });

      window.addEventListener('mouseup', () => {
        this.heroDrag.isDragging = false;
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.heroDrag.isDragging) return;
        const deltaX = e.clientX - this.heroDrag.lastX;
        const deltaY = e.clientY - this.heroDrag.lastY;
        this.heroDrag.lastX = e.clientX;
        this.heroDrag.lastY = e.clientY;

        this.heroDrag.targetRotY += deltaX * 0.01;
        this.heroDrag.targetRotX += deltaY * 0.008;

        const velocity = Math.hypot(deltaX, deltaY);
        if (window.soundFX && window.soundFX.playEmblemTone && velocity > 2) {
          window.soundFX.playEmblemTone(Math.min(1.0, velocity * 0.04));
        }
      });

      this.heroContainer.addEventListener('mouseenter', () => {
        if (window.soundFX && window.soundFX.playHoverTick) {
          window.soundFX.playHoverTick();
        }
        if (window.soundFX && window.soundFX.playEmblemTone) {
          window.soundFX.playEmblemTone(0.35);
        }
      });

      this.heroContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.heroDrag.isDragging = true;
          this.heroDrag.lastX = e.touches[0].clientX;
          this.heroDrag.lastY = e.touches[0].clientY;
          if (window.soundFX && window.soundFX.playEmblemTone) {
            window.soundFX.playEmblemTone(0.65);
          }
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        this.heroDrag.isDragging = false;
      });

      window.addEventListener('touchmove', (e) => {
        if (!this.heroDrag.isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - this.heroDrag.lastX;
        const deltaY = e.touches[0].clientY - this.heroDrag.lastY;
        this.heroDrag.lastX = e.touches[0].clientX;
        this.heroDrag.lastY = e.touches[0].clientY;

        this.heroDrag.targetRotY += deltaX * 0.012;
        this.heroDrag.targetRotX += deltaY * 0.01;

        const velocity = Math.hypot(deltaX, deltaY);
        if (window.soundFX && window.soundFX.playEmblemTone && velocity > 2) {
          window.soundFX.playEmblemTone(Math.min(1.0, velocity * 0.04));
        }
      }, { passive: true });
    }
    // 1. Category Switcher Tabs
    document.querySelectorAll('.category-tab-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        if (cat) this.setCategory(cat);
      });
    });

    // 2. Explode Anatomy Button
    const explodeBtn = document.getElementById('btn-explode-anatomy');
    if (explodeBtn) {
      explodeBtn.addEventListener('click', () => this.toggleExplode());
    }

    // 3. Sound FX Toggle
    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (window.soundFX) {
          const isEnabled = window.soundFX.toggleSound();
          soundBtn.classList.toggle('muted', !isEnabled);
          const label = document.getElementById('sound-toggle-label');
          if (label) label.textContent = isEnabled ? 'SOUND FX: ON' : 'SOUND FX: MUTED';
        }
      });
    }

    // 4. Mouse Move Tracking for Parallax
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // 5. 3D Showroom Drag to Rotate with Foley Velocity
    if (this.showroomContainer) {
      this.showroomContainer.addEventListener('mousedown', (e) => {
        this.drag.isDragging = true;
        this.drag.lastX = e.clientX;
        this.drag.lastY = e.clientY;
        if (window.soundFX && window.soundFX.startRotationLoop) {
          window.soundFX.startRotationLoop();
        }
      });

      window.addEventListener('mouseup', () => {
        if (this.drag.isDragging) {
          this.drag.isDragging = false;
          if (window.soundFX && window.soundFX.stopRotationLoop) {
            window.soundFX.stopRotationLoop();
          }
        }
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.drag.isDragging) return;
        const deltaX = e.clientX - this.drag.lastX;
        const deltaY = e.clientY - this.drag.lastY;
        this.drag.lastX = e.clientX;
        this.drag.lastY = e.clientY;

        this.drag.targetRotY += deltaX * 0.008;
        this.drag.targetRotX += deltaY * 0.006;
        this.drag.targetRotX = Math.max(-0.6, Math.min(0.6, this.drag.targetRotX));

        // Update velocity for audio modulation
        const velocity = Math.hypot(deltaX, deltaY);
        if (window.soundFX && window.soundFX.updateRotationSpeed) {
          window.soundFX.updateRotationSpeed(velocity * 0.04);
        }
      });

      // Touch Drag Support for Mobile
      this.showroomContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.drag.isDragging = true;
          this.drag.lastX = e.touches[0].clientX;
          this.drag.lastY = e.touches[0].clientY;
          if (window.soundFX && window.soundFX.startRotationLoop) {
            window.soundFX.startRotationLoop();
          }
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        if (this.drag.isDragging) {
          this.drag.isDragging = false;
          if (window.soundFX && window.soundFX.stopRotationLoop) {
            window.soundFX.stopRotationLoop();
          }
        }
      });

      window.addEventListener('touchmove', (e) => {
        if (!this.drag.isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - this.drag.lastX;
        const deltaY = e.touches[0].clientY - this.drag.lastY;
        this.drag.lastX = e.touches[0].clientX;
        this.drag.lastY = e.touches[0].clientY;

        this.drag.targetRotY += deltaX * 0.01;
        this.drag.targetRotX += deltaY * 0.008;
        this.drag.targetRotX = Math.max(-0.6, Math.min(0.6, this.drag.targetRotX));

        const velocity = Math.hypot(deltaX, deltaY);
        if (window.soundFX && window.soundFX.updateRotationSpeed) {
          window.soundFX.updateRotationSpeed(velocity * 0.05);
        }
      }, { passive: true });
    }

    // 6. Window Resize
    window.addEventListener('resize', () => {
      if (this.heroContainer && this.heroRenderer && this.heroCamera) {
        const w = this.heroContainer.clientWidth;
        const h = this.heroContainer.clientHeight;
        this.heroCamera.aspect = w / h;
        this.heroCamera.updateProjectionMatrix();
        this.heroRenderer.setSize(w, h);
      }
      if (this.showroomContainer && this.showroomRenderer && this.showroomCamera) {
        const w = this.showroomContainer.clientWidth;
        const h = this.showroomContainer.clientHeight;
        this.showroomCamera.aspect = w / h;
        this.showroomCamera.updateProjectionMatrix();
        this.showroomRenderer.setSize(w, h);
      }
    });
  }

  // ==========================================================================
  // RENDER ANIMATION LOOP
  // ==========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());

    const t = performance.now() * 0.001;

    // 1. Hero Monogram Interactive Drag, Damping & Gentle Idle Orbit
    this.heroDrag.rotX += (this.heroDrag.targetRotX - this.heroDrag.rotX) * 0.08;
    this.heroDrag.rotY += (this.heroDrag.targetRotY - this.heroDrag.rotY) * 0.08;
    if (!this.heroDrag.isDragging) {
      this.heroDrag.targetRotY += 0.003;
    }

    if (this.heroMonogram) {
      this.heroMonogram.rotation.y = this.heroDrag.rotY + Math.sin(t * 0.6) * 0.12 + this.mouse.x * 0.25;
      this.heroMonogram.rotation.x = this.heroDrag.rotX + Math.cos(t * 0.5) * 0.10 - this.mouse.y * 0.18;
      this.heroMonogram.position.y = Math.sin(t * 1.2) * 0.28;
    }

    if (this.heroParticles) {
      this.heroParticles.rotation.y = t * 0.04;
    }

    if (this.heroRenderer && this.heroScene && this.heroCamera) {
      this.heroRenderer.render(this.heroScene, this.heroCamera);
    }

    // 2. Showroom Smooth Inertial Rotation Damping
    this.drag.currentRotX += (this.drag.targetRotX - this.drag.currentRotX) * 0.08;
    this.drag.currentRotY += (this.drag.targetRotY - this.drag.currentRotY) * 0.08;

    // Gentle auto-orbit when idle
    if (!this.drag.isDragging) {
      this.drag.targetRotY += 0.002;
    }

    if (this.showroomGroup) {
      this.showroomGroup.rotation.x = this.drag.currentRotX;
      this.showroomGroup.rotation.y = this.drag.currentRotY;
    }

    if (this.showroomRenderer && this.showroomScene && this.showroomCamera) {
      this.showroomRenderer.render(this.showroomScene, this.showroomCamera);
    }
  }
}

// Instantiate and expose globally
window.tigcShowroom = new TIGCShowroomEngine();
window.tigc3D = window.tigcShowroom;
document.addEventListener('DOMContentLoaded', () => {
  window.tigcShowroom.init();
});
