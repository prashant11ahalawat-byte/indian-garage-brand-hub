/**
 * The Indian Garage Co. — 3D Kinetic Multi-Category Showroom & Side-Scroller Journey Engine
 * Powered by WGSN 3D Fashion Asset Library, Three.js, Web Audio Procedural Foley & GSAP
 * Inspired by Lusion.co, Active Theory & Bruno Simon
 */

class TIGCShowroomEngine {
  constructor() {
    this.heroContainer = null;
    this.showroomContainer = null;
    this.isInitialized = false;

    // Three.js Hero Scene (Playable Journey Runner & Monogram)
    this.heroScene = null;
    this.heroCamera = null;
    this.heroRenderer = null;
    this.heroMonogram = null;
    this.heroParticles = null;
    this.heroTrack = null;

    // Three.js Showroom Scene (Ambient Studio Environment)
    this.showroomScene = null;
    this.showroomCamera = null;
    this.showroomRenderer = null;
    this.showroomPedestal = null;
    this.showroomParticles = null;

    // Active Category & Garment State
    this.activeCategory = 'denim'; // 'denim', 'shirt', 'polo', 'jacket', 'carpenter'
    this.activeWash = 'raw';
    this.isExploded = false;

    // WGSN 3D Turntable State (36 frames per category, 360-degree rotation)
    this.wgsnCategories = ['denim', 'shirt', 'polo', 'jacket', 'carpenter'];
    this.turntableFrames = {
      denim: [],
      shirt: [],
      polo: [],
      jacket: [],
      carpenter: []
    };
    this.currentFrame = 0;
    this.turntableAngle = 0;
    this.turntableTargetAngle = 0;
    this.isTurntableDragging = false;
    this.turntableStartX = 0;
    this.turntableVelocity = 0;

    // Hero Drag & Parallax State (for Free 3D Orbit View)
    this.mouse = { x: 0, y: 0 };
    this.heroDrag = {
      isDragging: false,
      lastX: 0,
      lastY: 0,
      rotX: 0,
      rotY: 0,
      targetRotX: 0,
      targetRotY: 0
    };

    // Playable 3D Side-Scroller Journey Runner Engine (Left to Right, Dino/Flappy Bird Style)
    this.game = {
      mode: 'orbit', // 'orbit', 'playing', 'paused', 'gameover'
      score: 0,
      units: 10000,
      currentYearIndex: 0,
      years: [
        {
          year: "2012",
          title: "Indore Garage Bootstrap",
          desc: "Founded in an Indore garage with ₹10 Lakh seed capital by Anant Tanted. A tight 4-person pod set out with a relentless vision: eliminate unfair brand taxes and deliver world-class trendwear to young India.",
          highlight: "₹10 Lakh Seed Capital",
          unitsGain: 25000
        },
        {
          year: "2015",
          title: "E-Commerce Velocity Surge",
          desc: "Scaled explosive marketplace dominance across Myntra and AJIO. Emerged as the #1 external brand on AJIO and a permanent Top 10 fixture on Myntra, proving massive national product-market fit.",
          highlight: "#1 External Brand on AJIO",
          unitsGain: 180000
        },
        {
          year: "2020",
          title: "14-Day Micro-Batch Engine",
          desc: "Pioneered decentralized, asset-light 14-day concept-to-rack manufacturing across 100+ specialized factory pods. Sold over 2.8 Million pairs of denim annually with an industry-record 88% sell-through in 45 days.",
          highlight: "2.8M Pairs Denim Sold",
          unitsGain: 2800000
        },
        {
          year: "2023",
          title: "Aditya Birla Group (TMRW) Alliance",
          desc: "Joined forces with Aditya Birla Group's digital House of Brands venture TMRW in a landmark ₹155 Crore Series B partnership. Unlocked institutional capital, ERP integration, and disciplined corporate governance.",
          highlight: "₹155 Cr Series B Backing",
          unitsGain: 4500000
        },
        {
          year: "2025",
          title: "₹204 Cr Revenue & 25 Retail Stores",
          desc: "Doubled top-line revenue year-over-year from ₹101 Cr to ₹204 Cr (FY25). Moving 550,000+ units monthly, expanding our omnichannel footprint to ~25 live Exclusive Brand Outlets, and crossing ₹100 Cr on D2C.",
          highlight: "Doubled YoY to ₹204 Cr",
          unitsGain: 6500000
        },
        {
          year: "2027",
          title: "The ₹1,000 Crore Horizon",
          desc: "Targeting ₹1,000 Crore GMV and a nationwide network of 100 Exclusive Brand Outlets. Setting the standard as India's premier high-velocity, trend-first fashion house.",
          highlight: "100 EBOs • ₹1,000 Cr Target",
          unitsGain: 12000000
        }
      ],
      lap: 1,
      speed: 0.17, // Balanced side-scroller scroll speed
      playerX: -5.2, // Left side of stage
      playerY: 0,
      playerVelY: 0,
      isJumping: false,
      gravity: -0.016,
      jumpForce: 0.38,
      obstacles: [],
      milestones: [],
      obstacleSpawnTimer: 0,
      milestoneSpawnTimer: 0,
      isMilestonePaused: false,
      milestoneCountdown: 7,
      milestoneTimerId: null
    };

    // Dynamic Time-Adaptive Atmosphere
    this.timeTheme = 'midnight';
    this.autoTimeSync = true;

    // Multi-Category Catalog Database (Linked to WGSN 3D Library)
    this.catalogData = {
      denim: {
        title: "13.5oz Ring-Spun Comfort Stretch Denim",
        subtitle: "High-Velocity Bottomwear • WGSN Aged Appeal",
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
          raw: { name: "Raw Dark Indigo", filter: "brightness(1.0) contrast(1.06) saturate(1.15)" },
          sunken: { name: "Sun-Washed Mid Blue", filter: "brightness(1.16) contrast(0.98) saturate(1.22) hue-rotate(6deg)" },
          acid: { name: "Vintage Acid Wash", filter: "brightness(1.22) contrast(1.14) saturate(0.70) hue-rotate(12deg)" },
          selvedge: { name: "Obsidian Black Selvedge", filter: "brightness(0.65) contrast(1.30) saturate(0.25)" }
        }
      },
      shirt: {
        title: "Tailored Solid Oxford Casuals & Resort Tops",
        subtitle: "450+ Monthly Active Styles • Fluid Knit Drape",
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
          raw: { name: "Signature Resort Crimson", filter: "brightness(1.0) contrast(1.05) saturate(1.1)" },
          sunken: { name: "Tuscan Sage Linen", filter: "brightness(1.12) contrast(0.95) saturate(0.9) hue-rotate(60deg)" },
          acid: { name: "Deep Cobalt Oxford", filter: "brightness(0.95) contrast(1.1) saturate(1.2) hue-rotate(200deg)" },
          selvedge: { name: "Midnight Obsidian Silk", filter: "brightness(0.68) contrast(1.25) saturate(0.2)" }
        }
      },
      polo: {
        title: "Polo-licious 320 GSM Heavyweight Knits",
        subtitle: "Elevated Smart Casuals • WGSN Honeycomb Waffle",
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
          raw: { name: "Deep Navy Waffle", filter: "brightness(1.0) contrast(1.05) saturate(1.1)" },
          sunken: { name: "Forest Moss Pique", filter: "brightness(1.05) contrast(1.0) saturate(0.95) hue-rotate(85deg)" },
          acid: { name: "Sandstone Ecru", filter: "brightness(1.28) contrast(0.9) saturate(0.5) hue-rotate(25deg)" },
          selvedge: { name: "Jet Carbon Black", filter: "brightness(0.64) contrast(1.3) saturate(0.2)" }
        }
      },
      jacket: {
        title: "All-Terrain Denim Truckers & Utility Overshirts",
        subtitle: "Heavyweight All-Weather Outerwear • WGSN Denim Suite",
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
          raw: { name: "Vintage Acid Washed Trucker", filter: "brightness(1.0) contrast(1.05) saturate(1.1)" },
          sunken: { name: "Desert Khaki Canvas", filter: "brightness(1.15) contrast(0.95) saturate(0.9) hue-rotate(35deg)" },
          acid: { name: "Garage Crimson Workwear", filter: "brightness(1.05) contrast(1.1) saturate(1.4) hue-rotate(-30deg)" },
          selvedge: { name: "Stealth Obsidian Denim", filter: "brightness(0.65) contrast(1.3) saturate(0.2)" }
        }
      },
      carpenter: {
        title: "All-Weather Heavyweight Utility Carpenter Trousers",
        subtitle: "Multi-Pocket Modular Workwear • WGSN Trend 2026",
        badge: "High-Yield Utility",
        description: "Engineered from 100% heavy compact twill with hammer loop, modular utility patch pockets, double-layer reinforced knee panels, and articulated ergonomic patterning for all-day comfort.",
        specs: [
          { label: "Fabric Construction", val: "12.5 oz Heavyweight Cotton Canvas Twill" },
          { label: "Pocket Suite", val: "7-Pocket Modular Carpenter Utility Layout" },
          { label: "Structural Reinforcement", val: "Dual-Layer Knee Pockets & Heavy Bar-Tacks" },
          { label: "Hardware Suite", val: "Anti-Corrosive Gunmetal Rivets & Heavy Zipper" },
          { label: "Sell-Through Velocity", val: "91% in 30 Days" },
          { label: "Pricing Segment", val: "₹1,499 – ₹2,299" }
        ],
        washes: {
          raw: { name: "Raw Umber Earth", filter: "brightness(1.0) contrast(1.05) saturate(1.1)" },
          sunken: { name: "Washed Khaki Olive", filter: "brightness(1.12) contrast(0.96) saturate(0.9) hue-rotate(50deg)" },
          acid: { name: "Distressed Stone Gray", filter: "brightness(1.22) contrast(1.08) saturate(0.55)" },
          selvedge: { name: "Carbon Utility Black", filter: "brightness(0.66) contrast(1.28) saturate(0.2)" }
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
      console.warn("Three.js not loaded.");
      return;
    }
    this.isInitialized = true;

    this.heroContainer = document.getElementById('hero-3d-podium-canvas') || document.getElementById('hero-3d-canvas-container');
    this.showroomContainer = document.getElementById('showroom-3d-stage');

    this.initWGSNTurntable();
    this.initHeroScene();
    this.initShowroomScene();
    this.initTimeAdaptiveTheme();
    this.bindEvents();
    this.animate();
  }

  // ==========================================================================
  // PRELOAD WGSN 3D TURNTABLE FRAMES (36 FRAMES PER CATEGORY)
  // ==========================================================================
  initWGSNTurntable() {
    this.wgsnCategories.forEach(cat => {
      this.turntableFrames[cat] = [];
      for (let i = 0; i < 36; i++) {
        const frameNum = String(i).padStart(2, '0');
        const img = new Image();
        img.src = `assets/wgsn_3d/${cat}_frames/frame_${frameNum}.webp`;
        this.turntableFrames[cat].push(img);
      }
    });
  }

  // ==========================================================================
  // SCENE 1: HERO G-UNIT MONOGRAM & SIDE-SCROLLER JOURNEY RUNNER
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

    // Studio Illumination
    this.heroAmbientLight = new THREE.AmbientLight(0xffffff, 0.55);
    this.heroScene.add(this.heroAmbientLight);

    this.heroKeyLight = new THREE.DirectionalLight(0xff3344, 1.6);
    this.heroKeyLight.position.set(10, 14, 14);
    this.heroScene.add(this.heroKeyLight);

    this.heroRimLight = new THREE.DirectionalLight(0x4080ff, 0.95);
    this.heroRimLight.position.set(-12, -8, 10);
    this.heroScene.add(this.heroRimLight);

    // Side-Scroller Game World Group
    this.game.worldGroup = new THREE.Group();
    this.heroScene.add(this.game.worldGroup);

    // Horizontal Track Platform (Extending along X from -30 to +30)
    const trackGroup = new THREE.Group();
    const floorGeo = new THREE.BoxGeometry(70, 0.35, 8);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.5,
      metalness: 0.8
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(0, -3.2, 0);
    trackGroup.add(floor);

    // Neon Edge Rails
    const railMat = new THREE.MeshStandardMaterial({
      color: 0xff1e27,
      emissive: 0xff0011,
      emissiveIntensity: 0.9
    });
    const railFront = new THREE.Mesh(new THREE.BoxGeometry(70, 0.1, 0.2), railMat);
    railFront.position.set(0, -3.0, 3.8);
    trackGroup.add(railFront);

    const railBack = new THREE.Mesh(new THREE.BoxGeometry(70, 0.1, 0.2), railMat);
    railBack.position.set(0, -3.0, -3.8);
    trackGroup.add(railBack);

    trackGroup.visible = false;
    this.game.trackGroup = trackGroup;
    this.game.worldGroup.add(trackGroup);

    // Official Symmetrical Indian Garage G-Unit Monogram (Adobe Illustrator Exact Vectors)
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

    // Orbit Pedestal Ring for Free 3D view
    const ringGeo = new THREE.TorusGeometry(4.8, 0.05, 16, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xff2a35, roughness: 0.3, metalness: 0.8 });
    this.heroOrbitRing = new THREE.Mesh(ringGeo, ringMat);
    this.heroOrbitRing.position.y = -4.2;
    this.heroScene.add(this.heroOrbitRing);

    // Ambient Stardust Dust Particles
    const particleCount = 160;
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
  }

  // ==========================================================================
  // SCENE 2: INTERACTIVE 3D MULTI-CATEGORY WGSN APPAREL STUDIO
  // ==========================================================================
  initShowroomScene() {
    if (!this.showroomContainer) return;
    this.showroomContainer.innerHTML = '';

    // Create Stage Structure: Three.js ambient background + high-res 360 WGSN canvas
    const w = this.showroomContainer.clientWidth || 650;
    const h = this.showroomContainer.clientHeight || 520;

    // 1. Interactive 360 Turntable Frame Canvas
    const canvasWrap = document.createElement('div');
    canvasWrap.id = 'wgsn-turntable-wrapper';
    canvasWrap.className = 'wgsn-turntable-stage-wrapper';
    canvasWrap.style.cssText = `
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
      cursor: grab;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
    `;

    const imgEl = document.createElement('img');
    imgEl.id = 'wgsn-turntable-img';
    imgEl.className = 'wgsn-turntable-frame-img';
    imgEl.alt = 'Indian Garage 3D Apparel Model';
    imgEl.src = `assets/wgsn_3d/${this.activeCategory}_frames/frame_00.webp`;
    imgEl.style.cssText = `
      max-width: 90%;
      max-height: 88%;
      object-fit: contain;
      pointer-events: none;
      filter: drop-shadow(0 20px 45px rgba(0,0,0,0.55));
      transition: filter 0.3s ease, transform 0.2s ease;
      will-change: transform, filter;
    `;
    canvasWrap.appendChild(imgEl);

    // Exploded Blueprint Overlay Pins (Shown when Explode 3D is toggled)
    const pinsOverlay = document.createElement('div');
    pinsOverlay.id = 'wgsn-anatomy-pins';
    pinsOverlay.className = 'wgsn-anatomy-pins-layer';
    pinsOverlay.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: none;
      z-index: 8;
    `;
    pinsOverlay.innerHTML = `
      <div class="blueprint-pin" style="top: 22%; left: 32%;">
        <span class="pin-dot"></span>
        <div class="pin-card">14.5oz Rigid Broken-Twill Denim</div>
      </div>
      <div class="blueprint-pin" style="top: 45%; right: 28%;">
        <span class="pin-dot"></span>
        <div class="pin-card">14-Point Military Bartack Reinforcements</div>
      </div>
      <div class="blueprint-pin" style="bottom: 25%; left: 38%;">
        <span class="pin-dot"></span>
        <div class="pin-card">Anti-Gap Lumbar Contour & Dual Chain-Stitch</div>
      </div>
    `;
    canvasWrap.appendChild(pinsOverlay);
    this.showroomContainer.appendChild(canvasWrap);

    // 2. Three.js Ambient 3D Studio Pedestal & Floating Lighting Behind Garment
    this.showroomScene = new THREE.Scene();
    this.showroomCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    this.showroomCamera.position.set(0, 0, 18);

    this.showroomRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.showroomRenderer.setSize(w, h);
    this.showroomRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.showroomRenderer.domElement.style.cssText = `
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
    `;
    this.showroomContainer.appendChild(this.showroomRenderer.domElement);

    // Studio Lights
    this.studioAmbient = new THREE.AmbientLight(0xffffff, 0.5);
    this.showroomScene.add(this.studioAmbient);

    this.studioKey = new THREE.DirectionalLight(0xfff8f0, 1.4);
    this.studioKey.position.set(8, 14, 12);
    this.showroomScene.add(this.studioKey);

    this.studioFill = new THREE.DirectionalLight(0x7090d0, 0.6);
    this.studioFill.position.set(-10, -4, -6);
    this.showroomScene.add(this.studioFill);

    // Glowing Circular Glass Pedestal Floor
    const pedGeo = new THREE.CylinderGeometry(5.2, 5.5, 0.35, 48);
    const pedMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      roughness: 0.3,
      metalness: 0.85
    });
    this.showroomPedestal = new THREE.Mesh(pedGeo, pedMat);
    this.showroomPedestal.position.set(0, -4.2, 0);
    this.showroomScene.add(this.showroomPedestal);

    // Pedestal Rim Halo
    const pedHaloGeo = new THREE.TorusGeometry(5.4, 0.05, 16, 64);
    pedHaloGeo.rotateX(Math.PI / 2);
    const pedHaloMat = new THREE.MeshStandardMaterial({
      color: 0xe50914,
      emissive: 0xff0011,
      emissiveIntensity: 0.8
    });
    const pedHalo = new THREE.Mesh(pedHaloGeo, pedHaloMat);
    pedHalo.position.set(0, -4.0, 0);
    this.showroomScene.add(pedHalo);

    // Ambient floating sparks
    const spCount = 70;
    const spGeo = new THREE.BufferGeometry();
    const spPos = new Float32Array(spCount * 3);
    for (let i = 0; i < spCount * 3; i += 3) {
      spPos[i] = (Math.random() - 0.5) * 22;
      spPos[i + 1] = (Math.random() - 0.5) * 16;
      spPos[i + 2] = (Math.random() - 0.5) * 12;
    }
    spGeo.setAttribute('position', new THREE.BufferAttribute(spPos, 3));
    const spMat = new THREE.PointsMaterial({
      color: 0xff4d54,
      size: 0.12,
      transparent: true,
      opacity: 0.6
    });
    this.showroomParticles = new THREE.Points(spGeo, spMat);
    this.showroomScene.add(this.showroomParticles);

    // Initialize UI for Default Category
    this.setCategory('denim', true);
  }

  // ==========================================================================
  // WGSN 3D TURNTABLE CONTROLLER (Smooth 360° Drag & Camera Presets)
  // ==========================================================================
  setTurntableFrame(index) {
    this.currentFrame = ((index % 36) + 36) % 36;
    const imgEl = document.getElementById('wgsn-turntable-img');
    if (imgEl) {
      const frameNum = String(this.currentFrame).padStart(2, '0');
      imgEl.src = `assets/wgsn_3d/${this.activeCategory}_frames/frame_${frameNum}.webp`;
    }
  }

  setCameraPreset(preset) {
    let targetFrame = 0;
    if (preset === 'front') targetFrame = 0;
    else if (preset === 'three-quarter' || preset === 'threequarter') targetFrame = 5;
    else if (preset === 'side') targetFrame = 9;
    else if (preset === 'back') targetFrame = 18;

    this.turntableTargetAngle = (targetFrame / 36) * Math.PI * 2;
    this.setTurntableFrame(targetFrame);

    document.querySelectorAll('.cam-preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cam') === preset);
    });

    if (window.soundFX && window.soundFX.playClickSnap) {
      window.soundFX.playClickSnap();
    }
  }

  setCategory(catKey, immediate = false) {
    if (!this.catalogData[catKey]) return;
    this.activeCategory = catKey;
    const data = this.catalogData[catKey];

    // Reset frame to Front
    this.setTurntableFrame(0);
    this.turntableAngle = 0;
    this.turntableTargetAngle = 0;

    // Reset Explode Anatomy
    this.isExploded = false;
    const explodeBtn = document.getElementById('btn-explode-anatomy');
    if (explodeBtn) explodeBtn.textContent = 'EXPLODE 3D ANATOMY';
    const pins = document.getElementById('wgsn-anatomy-pins');
    if (pins) pins.style.display = 'none';

    // Update UI Content
    this.updateShowroomUI(data);

    if (!immediate && window.soundFX && window.soundFX.playClickSnap) {
      window.soundFX.playClickSnap();
    }
  }

  setWash(washKey, immediate = false) {
    // Wash filters disabled per brand specifications to preserve 100% photorealistic CLO 3D color accuracy
    this.activeWash = washKey;
  }

  toggleExplode() {
    this.isExploded = !this.isExploded;
    const explodeBtn = document.getElementById('btn-explode-anatomy');
    const pins = document.getElementById('wgsn-anatomy-pins');
    const imgEl = document.getElementById('wgsn-turntable-img');

    if (explodeBtn) {
      explodeBtn.textContent = this.isExploded ? 'COLLAPSE 3D ANATOMY' : 'EXPLODE 3D ANATOMY';
    }

    if (pins) {
      pins.style.display = this.isExploded ? 'block' : 'none';
    }

    if (imgEl) {
      imgEl.style.transform = this.isExploded ? 'scale(1.08)' : 'scale(1.0)';
    }

    if (window.soundFX) {
      if (this.isExploded && window.soundFX.playAnatomyExplode) window.soundFX.playAnatomyExplode();
      else if (!this.isExploded && window.soundFX.playAnatomyCollapse) window.soundFX.playAnatomyCollapse();
    }
  }

  updateShowroomUI(data) {
    const titleEl = document.getElementById('showroom-garment-title');
    const subEl = document.getElementById('showroom-garment-sub');
    const badgeEl = document.getElementById('showroom-garment-badge');
    const descEl = document.getElementById('showroom-garment-desc');
    const specsContainer = document.getElementById('showroom-specs-container');
    const washesContainer = document.getElementById('showroom-washes-container');
    const tagEl = document.getElementById('real-product-hud-tag');

    if (titleEl) titleEl.textContent = data.title;
    if (subEl) subEl.textContent = data.subtitle;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (descEl) descEl.textContent = data.description;
    if (tagEl) tagEl.textContent = `WGSN 3D CLO RENDER • ${data.title.toUpperCase()}`;

    if (specsContainer) {
      specsContainer.innerHTML = data.specs.map(s => `
        <div class="denim-spec-card">
          <div class="spec-card-num">${s.label}</div>
          <div class="spec-card-title">${s.val}</div>
        </div>
      `).join('');
    }



    // Update Category Pills
    document.querySelectorAll('.category-tab-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-category') === this.activeCategory);
    });
  }

  // ==========================================================================
  // PLAYABLE 3D SIDE-SCROLLER JOURNEY RUNNER ENGINE (Left to Right, Dino/Flappy)
  // ==========================================================================
  startJourneyGame() {
    this.game.mode = 'playing';
    this.game.score = 0;
    this.game.units = 10000;
    this.game.currentYearIndex = 0;
    this.game.lap = 1;
    this.game.playerX = -5.2; // Anchored on the left
    this.game.playerY = 0;
    this.game.playerVelY = 0;
    this.game.isJumping = false;
    this.game.isMilestonePaused = false;
    this.game.obstacleSpawnTimer = 0;
    this.game.milestoneSpawnTimer = 0;

    // Show Game HUD Top Bar
    const hudTop = document.getElementById('game-hud-top');
    if (hudTop) hudTop.style.display = 'flex';
    const overOverlay = document.getElementById('game-over-overlay');
    if (overOverlay) overOverlay.style.display = 'none';
    const milestoneModal = document.getElementById('game-milestone-modal');
    if (milestoneModal) milestoneModal.style.display = 'none';

    // Update Dock Button Text
    const label = document.getElementById('game-btn-label');
    if (label) label.textContent = 'EXIT TO 3D ORBIT ↺';

    // Show Horizontal Side-Scroller Runway Track
    if (this.game.trackGroup) this.game.trackGroup.visible = true;
    if (this.heroOrbitRing) this.heroOrbitRing.visible = false;

    // Position Player on Left Side in Side Profile
    if (this.heroMonogram) {
      this.heroMonogram.scale.set(0.55, 0.55, 0.55);
      this.heroMonogram.position.set(this.game.playerX, -1.8, 0);
      this.heroMonogram.rotation.set(0, 0.35, 0);
    }

    // Set Camera for Side-Scroller View (Side perspective looking rightwards)
    if (this.heroCamera) {
      if (typeof gsap !== 'undefined') {
        gsap.to(this.heroCamera.position, { x: 0, y: 0.2, z: 18, duration: 0.8, ease: "power2.out" });
      } else {
        this.heroCamera.position.set(0, 0.2, 18);
      }
    }

    this.clearGameObjects();
    this.updateGameHUD();

    // Spawn first milestone ahead on the right
    this.spawnGameMilestone(this.game.years[0], 18);

    if (window.soundFX && window.soundFX.playMilestoneChime) {
      window.soundFX.playMilestoneChime();
    }
  }

  jumpHero() {
    if (this.game.mode !== 'playing') return;

    // If game is paused at a milestone, jumping or tapping immediately resumes the run!
    if (this.game.isMilestonePaused) {
      this.resumeFromMilestone();
      return;
    }

    if (this.game.isJumping) return;
    this.game.isJumping = true;
    this.game.playerVelY = this.game.jumpForce;
    if (window.soundFX && window.soundFX.playJumpSound) {
      window.soundFX.playJumpSound();
    }
  }

  spawnGameObstacle() {
    if (!this.game.worldGroup) return;
    const obsGroup = new THREE.Group();

    // Dark titanium bottleneck monolith
    const barrierGeo = new THREE.BoxGeometry(1.6, 2.2, 1.2);
    const barrierMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.85
    });
    const barrier = new THREE.Mesh(barrierGeo, barrierMat);
    barrier.position.y = 1.1;
    obsGroup.add(barrier);

    // Glowing Crimson Warning Stripe
    const stripeGeo = new THREE.BoxGeometry(1.65, 0.25, 1.25);
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0xff1e27,
      emissive: 0xff0011,
      emissiveIntensity: 0.95
    });
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.position.y = 2.1;
    obsGroup.add(stripe);

    // Spawns on the far right (x = 20) and travels left toward the player
    obsGroup.position.set(20, -3.2, 0);
    this.game.worldGroup.add(obsGroup);
    this.game.obstacles.push(obsGroup);
  }

  spawnGameMilestone(yearData, startX = 26) {
    if (!this.game.worldGroup) return;
    const msGroup = new THREE.Group();

    // Golden Triumphal Archway Portal
    const archGeo = new THREE.TorusGeometry(3.0, 0.14, 16, 48);
    archGeo.rotateY(Math.PI / 2);
    const archMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffa500,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.9
    });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.y = 2.2;
    msGroup.add(arch);

    // Golden Gate Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.12, 0.12, 5.2, 16);
    const pillarMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    const p1 = new THREE.Mesh(pillarGeo, pillarMat);
    p1.position.set(0, 1.0, 3.0);
    msGroup.add(p1);
    const p2 = new THREE.Mesh(pillarGeo, pillarMat);
    p2.position.set(0, 1.0, -3.0);
    msGroup.add(p2);

    msGroup.position.set(startX, -3.2, 0);
    msGroup.userData = { yearData: yearData, passed: false };
    this.game.worldGroup.add(msGroup);
    this.game.milestones.push(msGroup);
  }

  clearGameObjects() {
    if (!this.game.worldGroup) return;
    this.game.obstacles.forEach(obs => this.game.worldGroup.remove(obs));
    this.game.obstacles = [];
    this.game.milestones.forEach(ms => this.game.worldGroup.remove(ms));
    this.game.milestones = [];
  }

  showMilestoneModal(yearData) {
    this.game.isMilestonePaused = true;

    const modal = document.getElementById('game-milestone-modal');
    const yearEl = document.getElementById('milestone-modal-year');
    const titleEl = document.getElementById('milestone-modal-title');
    const descEl = document.getElementById('milestone-modal-desc');
    const unitsEl = document.getElementById('milestone-modal-units');
    const hlEl = document.getElementById('milestone-modal-highlight');
    const countdownEl = document.getElementById('milestone-countdown');

    if (yearEl) yearEl.textContent = yearData.year;
    if (titleEl) titleEl.textContent = yearData.title;
    if (descEl) descEl.textContent = yearData.desc;
    if (unitsEl) unitsEl.textContent = `+${yearData.unitsGain.toLocaleString()} Units`;
    if (hlEl) hlEl.textContent = yearData.highlight;

    if (modal) modal.style.display = 'flex';

    // 7-second countdown before auto-resume (gives ample time to read)
    this.game.milestoneCountdown = 7;
    if (countdownEl) countdownEl.textContent = `(Space / Tap or ${this.game.milestoneCountdown}s)`;

    if (this.game.milestoneTimerId) clearInterval(this.game.milestoneTimerId);
    this.game.milestoneTimerId = setInterval(() => {
      this.game.milestoneCountdown -= 1;
      if (countdownEl) countdownEl.textContent = `(Space / Tap or ${this.game.milestoneCountdown}s)`;
      if (this.game.milestoneCountdown <= 0) {
        this.resumeFromMilestone();
      }
    }, 1000);
  }

  resumeFromMilestone() {
    if (this.game.milestoneTimerId) {
      clearInterval(this.game.milestoneTimerId);
      this.game.milestoneTimerId = null;
    }
    const modal = document.getElementById('game-milestone-modal');
    if (modal) modal.style.display = 'none';

    this.game.isMilestonePaused = false;
  }

  gameOver() {
    this.game.mode = 'gameover';
    if (window.soundFX && window.soundFX.playCrashSound) {
      window.soundFX.playCrashSound();
    }

    const currentYear = this.game.years[this.game.currentYearIndex];
    const maxYearEl = document.getElementById('game-over-max-year');
    if (maxYearEl) maxYearEl.textContent = currentYear.year;

    const finalUnitsEl = document.getElementById('game-over-final-units');
    if (finalUnitsEl) finalUnitsEl.textContent = Math.floor(this.game.units).toLocaleString() + ' Units';

    const overlay = document.getElementById('game-over-overlay');
    if (overlay) overlay.style.display = 'flex';
  }

  restartJourneyGame() {
    const overlay = document.getElementById('game-over-overlay');
    if (overlay) overlay.style.display = 'none';
    this.startJourneyGame();
  }

  setFreeInspectMode() {
    this.game.mode = 'orbit';

    const hudTop = document.getElementById('game-hud-top');
    if (hudTop) hudTop.style.display = 'none';
    const overOverlay = document.getElementById('game-over-overlay');
    if (overOverlay) overOverlay.style.display = 'none';
    const milestoneModal = document.getElementById('game-milestone-modal');
    if (milestoneModal) milestoneModal.style.display = 'none';

    if (this.game.milestoneTimerId) {
      clearInterval(this.game.milestoneTimerId);
      this.game.milestoneTimerId = null;
    }

    if (this.game.trackGroup) this.game.trackGroup.visible = false;
    if (this.heroOrbitRing) this.heroOrbitRing.visible = true;
    this.clearGameObjects();

    if (this.heroMonogram) {
      this.heroMonogram.scale.set(1, 1, 1);
      this.heroMonogram.position.set(0, 0, 0);
      this.heroMonogram.rotation.set(0, 0, 0);
    }

    if (this.heroCamera) {
      if (typeof gsap !== 'undefined') {
        gsap.to(this.heroCamera.position, { x: 0, y: 0, z: 22, duration: 0.8, ease: "power2.out" });
      } else {
        this.heroCamera.position.set(0, 0, 22);
      }
    }

    const label = document.getElementById('game-btn-label');
    if (label) label.textContent = 'PLAY JOURNEY RUN (SPACE TO JUMP)';
  }

  updateGameHUD() {
    const yearEl = document.getElementById('game-disp-year');
    const unitsEl = document.getElementById('game-disp-units');
    const scoreEl = document.getElementById('game-disp-score');

    if (yearEl) yearEl.textContent = `YEAR: ${this.game.years[this.game.currentYearIndex].year}`;
    if (unitsEl) unitsEl.textContent = Math.floor(this.game.units).toLocaleString();
    if (scoreEl) scoreEl.textContent = Math.floor(this.game.score);
  }

  // ==========================================================================
  // DYNAMIC TIME-ADAPTIVE ATMOSPHERE (Apple macOS / iOS Live Wallpaper)
  // ==========================================================================
  initTimeAdaptiveTheme() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

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
    if (hour >= 6 && hour < 17) theme = 'daylight';
    else if (hour >= 17 && hour < 20) theme = 'dusk';
    else theme = 'midnight';
    this.applyTheme(theme);
  }

  applyTheme(themeName) {
    this.timeTheme = themeName;
    document.documentElement.setAttribute('data-time-theme', themeName);

    if (this.studioAmbient && this.studioKey && this.studioFill) {
      if (themeName === 'daylight') {
        this.studioAmbient.intensity = 0.55;
        this.studioKey.intensity = 1.30;
        this.studioKey.color.setHex(0xfffaf0);
        this.studioFill.intensity = 0.55;
        this.studioFill.color.setHex(0xb0c8f8);
        if (this.heroAmbientLight) this.heroAmbientLight.intensity = 0.55;
      } else if (themeName === 'dusk') {
        this.studioAmbient.intensity = 0.44;
        this.studioKey.intensity = 1.25;
        this.studioKey.color.setHex(0xff9944);
        this.studioFill.intensity = 0.60;
        this.studioFill.color.setHex(0x9d4edd);
        if (this.heroAmbientLight) this.heroAmbientLight.intensity = 0.50;
      } else {
        this.studioAmbient.intensity = 0.40;
        this.studioKey.intensity = 1.20;
        this.studioKey.color.setHex(0xffffff);
        this.studioFill.intensity = 0.65;
        this.studioFill.color.setHex(0x5271ff);
        if (this.heroAmbientLight) this.heroAmbientLight.intensity = 0.45;
      }
    }
  }

  // ==========================================================================
  // EVENT BINDINGS (Consolidated Mouse, Touch, Keyboard & Responsive Controls)
  // ==========================================================================
  bindEvents() {
    // 1. WGSN 3D Turntable Drag & Horizontal Swipe (Mouse & Touch)
    const turntableWrap = document.getElementById('wgsn-turntable-wrapper');
    if (turntableWrap) {
      const startDrag = (clientX) => {
        this.isTurntableDragging = true;
        this.turntableStartX = clientX;
        turntableWrap.style.cursor = 'grabbing';
        if (window.soundFX && window.soundFX.startRotationLoop) {
          window.soundFX.startRotationLoop();
        }
      };

      const moveDrag = (clientX) => {
        if (!this.isTurntableDragging) return;
        const dx = clientX - this.turntableStartX;
        this.turntableStartX = clientX;

        // Scrub frames smoothly through 360 degrees
        this.turntableAngle = (this.turntableAngle - dx * 0.014 + Math.PI * 2) % (Math.PI * 2);
        const frameIdx = Math.floor((this.turntableAngle / (Math.PI * 2)) * 36) % 36;
        this.setTurntableFrame(frameIdx);

        if (window.soundFX && window.soundFX.updateRotationSpeed) {
          window.soundFX.updateRotationSpeed(Math.abs(dx) * 0.08);
        }
      };

      const endDrag = () => {
        if (this.isTurntableDragging) {
          this.isTurntableDragging = false;
          turntableWrap.style.cursor = 'grab';
          if (window.soundFX && window.soundFX.stopRotationLoop) {
            window.soundFX.stopRotationLoop();
          }
        }
      };

      // Mouse
      turntableWrap.addEventListener('mousedown', (e) => startDrag(e.clientX));
      window.addEventListener('mousemove', (e) => moveDrag(e.clientX));
      window.addEventListener('mouseup', endDrag);

      // Touch (Pan-y allows page to scroll vertically while dragging rotates 3D horizontally)
      turntableWrap.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) startDrag(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (this.isTurntableDragging && e.touches.length === 1) moveDrag(e.touches[0].clientX);
      }, { passive: true });
      window.addEventListener('touchend', endDrag);
    }

    // 2. Camera Preset Angle Buttons
    document.querySelectorAll('.cam-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const mode = btn.getAttribute('data-cam');
        if (mode) this.setCameraPreset(mode);
      });
    });

    // 3. Category Switcher Tabs (Denim, Shirt, Polo, Jacket, Carpenter)
    document.querySelectorAll('.category-tab-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        if (cat) this.setCategory(cat);
      });
    });

    // 4. Explode Anatomy Button
    const explodeBtn = document.getElementById('btn-explode-anatomy');
    if (explodeBtn) {
      explodeBtn.addEventListener('click', () => this.toggleExplode());
    }

    // 5. Hero Canvas Interactions (Jump in Game Mode / Orbit in 3D View)
    if (this.heroContainer) {
      // Mouse down / Touch start on Hero Stage
      const handleHeroAction = (e, clientX, clientY) => {
        if (this.game.mode === 'playing') {
          e.preventDefault();
          this.jumpHero();
          return;
        }
        this.heroDrag.isDragging = true;
        this.heroDrag.lastX = clientX;
        this.heroDrag.lastY = clientY;
        if (window.soundFX && window.soundFX.playEmblemTone) {
          window.soundFX.playEmblemTone(0.65);
        }
      };

      this.heroContainer.addEventListener('mousedown', (e) => handleHeroAction(e, e.clientX, e.clientY));
      this.heroContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) handleHeroAction(e, e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: false });

      window.addEventListener('mouseup', () => { this.heroDrag.isDragging = false; });
      window.addEventListener('touchend', () => { this.heroDrag.isDragging = false; });

      window.addEventListener('mousemove', (e) => {
        if (!this.heroDrag.isDragging || this.game.mode === 'playing') return;
        const dx = e.clientX - this.heroDrag.lastX;
        const dy = e.clientY - this.heroDrag.lastY;
        this.heroDrag.lastX = e.clientX;
        this.heroDrag.lastY = e.clientY;
        this.heroDrag.targetRotY += dx * 0.01;
        this.heroDrag.targetRotX += dy * 0.008;
      });

      window.addEventListener('touchmove', (e) => {
        if (!this.heroDrag.isDragging || this.game.mode === 'playing' || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - this.heroDrag.lastX;
        const dy = e.touches[0].clientY - this.heroDrag.lastY;
        this.heroDrag.lastX = e.touches[0].clientX;
        this.heroDrag.lastY = e.touches[0].clientY;
        this.heroDrag.targetRotY += dx * 0.012;
        this.heroDrag.targetRotX += dy * 0.01;
      }, { passive: true });
    }

    // 6. Playable Game Control Buttons
    const gameToggleBtn = document.getElementById('btn-toggle-journey-game');
    if (gameToggleBtn) {
      gameToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.game.mode === 'playing') {
          this.setFreeInspectMode();
        } else {
          this.startJourneyGame();
        }
      });
    }

    const restartGameBtn = document.getElementById('btn-restart-game');
    if (restartGameBtn) {
      restartGameBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.restartJourneyGame();
      });
    }

    const inspectModeBtn = document.getElementById('btn-mode-inspect');
    if (inspectModeBtn) {
      inspectModeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.setFreeInspectMode();
      });
    }

    const continueBtn = document.getElementById('btn-milestone-continue');
    if (continueBtn) {
      continueBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.resumeFromMilestone();
      });
    }

    // Spacebar Jump & Continue
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (this.game.mode === 'playing') {
          if (this.game.isMilestonePaused) {
            this.resumeFromMilestone();
          } else {
            this.jumpHero();
          }
        } else if (this.game.mode === 'gameover') {
          this.restartJourneyGame();
        }
      }
    });

    // 7. Window Resize
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

    // 1. Hero Stage: Playable Side-Scroller Runner or Free 3D Orbit
    if (this.game.mode === 'playing') {
      if (!this.game.isMilestonePaused) {
        // Player Jump Physics
        if (this.game.isJumping) {
          this.game.playerVelY += this.game.gravity;
          this.game.playerY += this.game.playerVelY;
          if (this.game.playerY <= 0) {
            this.game.playerY = 0;
            this.game.playerVelY = 0;
            this.game.isJumping = false;
          }
        }

        // Gallop running stride bobbing
        const strideBounce = this.game.isJumping ? 0 : Math.sin(t * 14) * 0.12;
        if (this.heroMonogram) {
          this.heroMonogram.position.set(this.game.playerX, -1.8 + this.game.playerY + strideBounce, 0);
          this.heroMonogram.rotation.z = this.game.isJumping ? this.game.playerVelY * 2.2 : Math.sin(t * 12) * 0.08;
          this.heroMonogram.rotation.y = 0.35 + Math.sin(t * 4) * 0.1;
        }

        // Spawners
        this.game.obstacleSpawnTimer += 1;
        if (this.game.obstacleSpawnTimer > 150) {
          this.spawnGameObstacle();
          this.game.obstacleSpawnTimer = 0;
        }

        this.game.milestoneSpawnTimer += 1;
        if (this.game.milestoneSpawnTimer > 360) {
          const nextIdx = (this.game.currentYearIndex + 1) % this.game.years.length;
          this.spawnGameMilestone(this.game.years[nextIdx], 24);
          this.game.milestoneSpawnTimer = 0;
        }

        // Move Obstacles Leftward
        for (let i = this.game.obstacles.length - 1; i >= 0; i--) {
          const obs = this.game.obstacles[i];
          obs.position.x -= this.game.speed;

          // Collision check against player (at x = -5.2)
          if (Math.abs(obs.position.x - this.game.playerX) < 1.35) {
            if (this.game.playerY < 1.1) {
              this.gameOver();
              return;
            }
          }

          if (obs.position.x < -20) {
            this.game.worldGroup.remove(obs);
            this.game.obstacles.splice(i, 1);
          }
        }

        // Move Milestones Leftward
        for (let j = this.game.milestones.length - 1; j >= 0; j--) {
          const ms = this.game.milestones[j];
          ms.position.x -= this.game.speed;

          // Reached Player
          if (!ms.userData.passed && ms.position.x <= this.game.playerX) {
            ms.userData.passed = true;
            const yData = ms.userData.yearData;
            this.game.currentYearIndex = this.game.years.findIndex(y => y.year === yData.year);
            this.game.units += yData.unitsGain;

            if (window.soundFX && window.soundFX.playMilestoneChime) {
              window.soundFX.playMilestoneChime();
            }

            // Display Readable Milestone Modal & Pause Movement
            this.showMilestoneModal(yData);
          }

          if (ms.position.x < -22) {
            this.game.worldGroup.remove(ms);
            this.game.milestones.splice(j, 1);
          }
        }

        this.game.score += 0.25;
        this.game.units += 4;
        this.updateGameHUD();
      }
    } else if (this.game.mode === 'orbit') {
      // Free 3D View: Interactive Drag Damping & Idle Orbit
      this.heroDrag.rotX += (this.heroDrag.targetRotX - this.heroDrag.rotX) * 0.08;
      this.heroDrag.rotY += (this.heroDrag.targetRotY - this.heroDrag.rotY) * 0.08;
      if (!this.heroDrag.isDragging) {
        this.heroDrag.targetRotY += 0.003;
      }

      if (this.heroMonogram) {
        this.heroMonogram.rotation.y = this.heroDrag.rotY + Math.sin(t * 0.6) * 0.12;
        this.heroMonogram.rotation.x = this.heroDrag.rotX + Math.cos(t * 0.5) * 0.10;
        this.heroMonogram.position.y = Math.sin(t * 1.2) * 0.28;
      }
    }

    if (this.heroParticles) {
      this.heroParticles.rotation.y = t * 0.04;
    }

    if (this.heroRenderer && this.heroScene && this.heroCamera) {
      this.heroRenderer.render(this.heroScene, this.heroCamera);
    }

    // 2. Showroom Studio Background Render
    if (this.showroomPedestal) {
      this.showroomPedestal.rotation.y = t * 0.06;
    }
    if (this.showroomParticles) {
      this.showroomParticles.rotation.y = t * 0.02;
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
