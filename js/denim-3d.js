/**
 * The Indian Garage Co. — 3D WebGL Denim Laboratory & Hero Scene
 * Powered by Three.js & Interactive Foley Audio
 * Inspired by Lusion.co and Active Theory
 */

class TIGC3DStudio {
  constructor() {
    this.heroContainer = document.getElementById('hero-3d-canvas-container');
    this.denimContainer = document.getElementById('denim-3d-stage');
    this.heroScene = null;
    this.heroCamera = null;
    this.heroRenderer = null;
    this.heroMesh = null;
    this.heroParticles = null;

    this.denimScene = null;
    this.denimCamera = null;
    this.denimRenderer = null;
    this.denimGroup = null;
    this.denimParts = [];
    this.isExploded = false;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.denimDrag = {
      isDragging: false,
      lastX: 0,
      lastY: 0,
      rotVelX: 0,
      rotVelY: 0,
      lastTime: 0
    };

    this.washPalettes = {
      raw: {
        color: 0x18243b,
        roughness: 0.72,
        metalness: 0.1,
        name: "RAW DARK INDIGO"
      },
      sunken: {
        color: 0x3b5f96,
        roughness: 0.82,
        metalness: 0.05,
        name: "SUNKEN BLUE WASH"
      },
      acid: {
        color: 0x6e88ab,
        roughness: 0.88,
        metalness: 0.02,
        name: "VINTAGE ACID BLEACH"
      },
      selvedge: {
        color: 0x14161a,
        roughness: 0.65,
        metalness: 0.15,
        name: "MIDNIGHT BLACK SELVEDGE"
      }
    };
    this.currentWash = 'raw';
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn("Three.js not loaded, skipping 3D initialization");
      return;
    }
    this.initHeroScene();
    this.initDenimLabScene();
    this.bindEvents();
    this.animate();
  }

  // ==========================================================================
  // SCENE 1: HERO SCULPTURAL G-UNIT MONOGRAM & AMBIENT DUST
  // ==========================================================================
  initHeroScene() {
    if (!this.heroContainer) return;
    const w = this.heroContainer.clientWidth || window.innerWidth;
    const h = this.heroContainer.clientHeight || window.innerHeight;

    this.heroScene = new THREE.Scene();
    this.heroCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    this.heroCamera.position.set(0, 0, 24);

    this.heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.heroRenderer.setSize(w, h);
    this.heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.heroRenderer.toneMappingExposure = 1.2;
    this.heroContainer.appendChild(this.heroRenderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.heroScene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x4e75ff, 2.5);
    rimLight.position.set(-15, 12, 10);
    this.heroScene.add(rimLight);

    const keyLight = new THREE.DirectionalLight(0xff2a35, 3.2);
    keyLight.position.set(15, -10, 12);
    this.heroScene.add(keyLight);

    const mouseLight = new THREE.PointLight(0xffffff, 2.0, 50);
    mouseLight.position.set(0, 0, 15);
    this.heroScene.add(mouseLight);
    this.heroMouseLight = mouseLight;

    // Build 3D Beveled G-Unit Monogram
    const shape = new THREE.Shape();
    // Symmetric geometric stylized G-Unit curves
    shape.moveTo(-3.5, 4.5);
    shape.lineTo(3.5, 4.5);
    shape.lineTo(3.5, 2.5);
    shape.lineTo(1.2, 2.5);
    shape.lineTo(1.2, 0.5);
    shape.lineTo(3.5, 0.5);
    shape.lineTo(3.5, -4.5);
    shape.lineTo(-3.5, -4.5);
    shape.lineTo(-3.5, -2.5);
    shape.lineTo(-1.2, -2.5);
    shape.lineTo(-1.2, -0.5);
    shape.lineTo(-3.5, -0.5);
    shape.closePath();

    const extrudeSettings = {
      steps: 2,
      depth: 1.4,
      bevelEnabled: true,
      bevelThickness: 0.4,
      bevelSize: 0.3,
      bevelOffset: 0,
      bevelSegments: 5
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    // Brushed Chrome & Crimson PBR Material
    const material = new THREE.MeshStandardMaterial({
      color: 0xdb2128,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2
    });

    this.heroMesh = new THREE.Mesh(geometry, material);
    this.heroScene.add(this.heroMesh);

    // Floating Kinetic Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 40;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xff4d55,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.heroParticles = new THREE.Points(particleGeo, particleMat);
    this.heroScene.add(this.heroParticles);
  }

  // ==========================================================================
  // SCENE 2: INTERACTIVE 3D DENIM LABORATORY
  // ==========================================================================
  initDenimLabScene() {
    if (!this.denimContainer) return;
    const w = this.denimContainer.clientWidth || 600;
    const h = this.denimContainer.clientHeight || 540;

    this.denimScene = new THREE.Scene();
    this.denimCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    this.denimCamera.position.set(0, 0, 18);

    this.denimRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.denimRenderer.setSize(w, h);
    this.denimRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.denimRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.denimContainer.appendChild(this.denimRenderer.domElement);

    // Studio Lighting
    const studioAmb = new THREE.AmbientLight(0xffffff, 0.85);
    this.denimScene.add(studioAmb);

    const keyTop = new THREE.DirectionalLight(0xffffff, 2.2);
    keyTop.position.set(10, 15, 12);
    this.denimScene.add(keyTop);

    const rimBlue = new THREE.DirectionalLight(0x7090ff, 1.8);
    rimBlue.position.set(-12, -8, -6);
    this.denimScene.add(rimBlue);

    this.build3DDenimGeometry();
  }

  build3DDenimGeometry() {
    this.denimGroup = new THREE.Group();
    this.denimParts = [];

    const initWash = this.washPalettes[this.currentWash];
    this.denimMaterial = new THREE.MeshStandardMaterial({
      color: initWash.color,
      roughness: initWash.roughness,
      metalness: initWash.metalness,
      wireframe: false
    });

    // Layer 1: Waistband & Yoke (Ergonomic Rise)
    const waistbandGeo = new THREE.CylinderGeometry(2.8, 2.7, 1.1, 32, 1, true);
    const waistband = new THREE.Mesh(waistbandGeo, this.denimMaterial);
    waistband.position.set(0, 3.2, 0);
    waistband.userData = {
      name: "Ergonomic Rise & Anti-Gaping Waistband",
      explodedPos: new THREE.Vector3(0, 5.0, 0),
      originPos: new THREE.Vector3(0, 3.2, 0)
    };
    this.denimGroup.add(waistband);
    this.denimParts.push(waistband);

    // Brass button rivet on waistband
    const buttonGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.1, 16);
    buttonGeo.rotateX(Math.PI / 2);
    const buttonMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.25 });
    const button = new THREE.Mesh(buttonGeo, buttonMat);
    button.position.set(0, 3.2, 2.75);
    this.denimGroup.add(button);

    // Layer 2: Left Leg (Tapered 13.5oz Ring-Spun Denim)
    const leftLegGeo = new THREE.CylinderGeometry(1.35, 0.95, 6.2, 32);
    const leftLeg = new THREE.Mesh(leftLegGeo, this.denimMaterial);
    leftLeg.position.set(-1.3, -0.6, 0);
    leftLeg.userData = {
      name: "Left Inseam: 13.5oz Ring-Spun Cotton Warp",
      explodedPos: new THREE.Vector3(-3.2, -0.6, 0),
      originPos: new THREE.Vector3(-1.3, -0.6, 0)
    };
    this.denimGroup.add(leftLeg);
    this.denimParts.push(leftLeg);

    // Layer 3: Right Leg (Tapered 13.5oz Ring-Spun Denim)
    const rightLegGeo = new THREE.CylinderGeometry(1.35, 0.95, 6.2, 32);
    const rightLeg = new THREE.Mesh(rightLegGeo, this.denimMaterial);
    rightLeg.position.set(1.3, -0.6, 0);
    rightLeg.userData = {
      name: "Right Inseam: 2% Lycra Memory Core Stretch",
      explodedPos: new THREE.Vector3(3.2, -0.6, 0),
      originPos: new THREE.Vector3(1.3, -0.6, 0)
    };
    this.denimGroup.add(rightLeg);
    this.denimParts.push(rightLeg);

    // Layer 4: Front Pockets & 14-Point Reinforced Bartacks
    const pocketGeo = new THREE.BoxGeometry(1.2, 1.4, 0.1);
    const pocket = new THREE.Mesh(pocketGeo, this.denimMaterial);
    pocket.position.set(-1.1, 2.1, 2.55);
    pocket.userData = {
      name: "14-Point Military Bartack Reinforcements",
      explodedPos: new THREE.Vector3(-1.1, 2.1, 4.2),
      originPos: new THREE.Vector3(-1.1, 2.1, 2.55)
    };
    this.denimGroup.add(pocket);
    this.denimParts.push(pocket);

    this.denimScene.add(this.denimGroup);
  }

  // ==========================================================================
  // INTERACTIONS & WASH SWITCHING
  // ==========================================================================
  setWash(washKey) {
    if (!this.washPalettes[washKey] || !this.denimMaterial) return;
    this.currentWash = washKey;
    const p = this.washPalettes[washKey];

    // Smooth color and roughness transition
    if (typeof gsap !== 'undefined') {
      const targetColor = new THREE.Color(p.color);
      gsap.to(this.denimMaterial.color, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(this.denimMaterial, {
        roughness: p.roughness,
        metalness: p.metalness,
        duration: 0.5
      });
    } else {
      this.denimMaterial.color.setHex(p.color);
      this.denimMaterial.roughness = p.roughness;
      this.denimMaterial.metalness = p.metalness;
    }

    if (window.soundFX) window.soundFX.playWhoosh(1.2);

    const titleEl = document.getElementById('current-wash-title');
    if (titleEl) titleEl.textContent = p.name;
  }

  toggleExplodeAnatomy() {
    this.isExploded = !this.isExploded;

    if (this.isExploded) {
      if (window.soundFX) window.soundFX.playAnatomyExplode();
    } else {
      if (window.soundFX) window.soundFX.playAnatomyCollapse();
    }

    this.denimParts.forEach(part => {
      const targetPos = this.isExploded ? part.userData.explodedPos : part.userData.originPos;
      if (typeof gsap !== 'undefined') {
        gsap.to(part.position, {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z,
          duration: 0.8,
          ease: this.isExploded ? "elastic.out(1, 0.7)" : "power3.inOut"
        });
      } else {
        part.position.copy(targetPos);
      }
    });

    const btn = document.getElementById('btn-explode-anatomy');
    const badge = document.getElementById('anatomy-exploded-badge');
    if (btn) {
      btn.textContent = this.isExploded ? "ASSEMBLE ANATOMY" : "EXPLODE 3D ANATOMY";
      btn.classList.toggle('active', this.isExploded);
    }
    if (badge) {
      badge.style.display = this.isExploded ? 'block' : 'none';
    }
  }

  bindEvents() {
    // Window Resize
    window.addEventListener('resize', () => {
      if (this.heroCamera && this.heroRenderer && this.heroContainer) {
        const hw = this.heroContainer.clientWidth || window.innerWidth;
        const hh = this.heroContainer.clientHeight || window.innerHeight;
        this.heroCamera.aspect = hw / hh;
        this.heroCamera.updateProjectionMatrix();
        this.heroRenderer.setSize(hw, hh);
      }
      if (this.denimCamera && this.denimRenderer && this.denimContainer) {
        const dw = this.denimContainer.clientWidth || 600;
        const dh = this.denimContainer.clientHeight || 540;
        this.denimCamera.aspect = dw / dh;
        this.denimCamera.updateProjectionMatrix();
        this.denimRenderer.setSize(dw, dh);
      }
    });

    // Mouse movement parallax for Hero
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // 3D Denim Drag-to-Rotate with Kinetic Sound FX
    if (this.denimContainer) {
      const el = this.denimContainer;

      const onStart = (clientX, clientY) => {
        this.denimDrag.isDragging = true;
        this.denimDrag.lastX = clientX;
        this.denimDrag.lastY = clientY;
        this.denimDrag.rotVelX = 0;
        this.denimDrag.rotVelY = 0;
        this.denimDrag.lastTime = performance.now();
        if (window.soundFX) window.soundFX.startRotationLoop();
      };

      const onMove = (clientX, clientY) => {
        if (!this.denimDrag.isDragging || !this.denimGroup) return;
        const now = performance.now();
        const dt = Math.max(1, now - this.denimDrag.lastTime);
        const dx = clientX - this.denimDrag.lastX;
        const dy = clientY - this.denimDrag.lastY;

        this.denimGroup.rotation.y += dx * 0.012;
        this.denimGroup.rotation.x += dy * 0.008;

        // Track velocity
        this.denimDrag.rotVelY = (dx / dt) * 12;
        this.denimDrag.rotVelX = (dy / dt) * 8;

        this.denimDrag.lastX = clientX;
        this.denimDrag.lastY = clientY;
        this.denimDrag.lastTime = now;

        // Modulate kinetic rotation sound
        if (window.soundFX) {
          window.soundFX.updateRotationSpeed(Math.abs(this.denimDrag.rotVelY) + Math.abs(this.denimDrag.rotVelX));
        }
      };

      const onEnd = () => {
        this.denimDrag.isDragging = false;
        if (window.soundFX) window.soundFX.stopRotationLoop();
      };

      el.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
      window.addEventListener('mousemove', (e) => {
        if (this.denimDrag.isDragging) onMove(e.clientX, e.clientY);
      });
      window.addEventListener('mouseup', onEnd);

      // Touch support
      el.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) onStart(e.touches[0].clientX, e.touches[0].clientY);
      }, { passive: true });
      window.addEventListener('touchmove', (e) => {
        if (this.denimDrag.isDragging && e.touches.length === 1) {
          onMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });
      window.addEventListener('touchend', onEnd);
    }

    // UI Buttons for Wash Selection
    const washBtns = document.querySelectorAll('.denim-wash-pill');
    washBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        washBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setWash(btn.dataset.wash);
      });
    });

    // Explode Anatomy Button
    const explodeBtn = document.getElementById('btn-explode-anatomy');
    if (explodeBtn) {
      explodeBtn.addEventListener('click', () => this.toggleExplodeAnatomy());
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // 1. Hero Scene Update
    if (this.heroMesh) {
      // Smooth mouse follow
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      this.heroMesh.rotation.y += 0.006;
      this.heroMesh.rotation.x = this.mouse.y * 0.35 + 0.15;
      this.heroMesh.rotation.z = -this.mouse.x * 0.2;

      if (this.heroMouseLight) {
        this.heroMouseLight.position.x = this.mouse.x * 12;
        this.heroMouseLight.position.y = this.mouse.y * 10;
      }
    }

    if (this.heroParticles) {
      this.heroParticles.rotation.y += 0.001;
      this.heroParticles.rotation.x += 0.0005;
    }

    if (this.heroRenderer && this.heroScene && this.heroCamera) {
      this.heroRenderer.render(this.heroScene, this.heroCamera);
    }

    // 2. Denim Lab Scene Update (with rotational inertia friction)
    if (this.denimGroup && !this.denimDrag.isDragging) {
      // Gentle auto-rotation
      this.denimGroup.rotation.y += 0.005 + (this.denimDrag.rotVelY * 0.02);
      this.denimGroup.rotation.x += (this.denimDrag.rotVelX * 0.01);

      // Inertia decay
      this.denimDrag.rotVelY *= 0.92;
      this.denimDrag.rotVelX *= 0.92;

      // Dampen x-tilt back toward neutral level
      this.denimGroup.rotation.x += (0 - this.denimGroup.rotation.x) * 0.02;
    }

    if (this.denimRenderer && this.denimScene && this.denimCamera) {
      this.denimRenderer.render(this.denimScene, this.denimCamera);
    }
  }
}

window.tigc3D = new TIGC3DStudio();
