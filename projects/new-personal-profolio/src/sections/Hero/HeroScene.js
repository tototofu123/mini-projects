/**
 * Hero Section — Space Station Hologram
 * 
 * A Three.js scene showing:
 * - White space station interior (curved walls, glass window)
 * - Space background via NASA APOD API
 * - Holographic photo display in the center
 * - Revolving control panels on left/right
 * - Glitch effect on hover/click cycling through photo modes
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import gsap from 'gsap';
import { HolographicMaterial } from '../../three/materials/HolographicMaterial.js';
import { GlitchPass } from '../../three/shaders/GlitchPass.js';
import { assetUrl } from '../../utils/assetUrl';

export class HeroScene {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.mouse = new THREE.Vector2();
    this.targetMouse = new THREE.Vector2();
    this.photoMode = 0; // 0=real, 1=formal, 2=ascii, 3=pixel, 4=hologram
    this.photoModes = ['real', 'formal', 'ascii', 'pixel', 'hologram'];
    this.isHovering = false;
    this.glitchIntensity = 0;
    this.hologramMesh = null;
    this.controlPanels = [];
    this.spaceTexture = null;

    this.init();
  }

  async init() {
    this.setupRenderer();
    this.setupScene();
    this.setupCamera();
    this.setupLights();
    this.loadSpaceBackground();
    this.buildSpaceStation();
    this.buildHologramDisplay();
    this.buildControlPanels();
    this.setupPostProcessing();
    this.setupEventListeners();
    this.animate();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.8;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0F172A, 0.02);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1.6, 5);
    this.camera.lookAt(0, 1.2, 0);
  }

  setupLights() {
    // Ambient fill
    const ambient = new THREE.AmbientLight(0xF8FAFC, 0.4);
    this.scene.add(ambient);

    // Main directional (sun-like from window)
    const sun = new THREE.DirectionalLight(0xF8FAFC, 1.2);
    sun.position.set(5, 8, -3);
    this.scene.add(sun);

    // Hologram glow light
    const holoLight = new THREE.PointLight(0x00d5ff, 2, 8);
    holoLight.position.set(0, 1.5, 1);
    this.scene.add(holoLight);
    this.holoLight = holoLight;

    // Rim lights for station interior
    const rim1 = new THREE.SpotLight(0x38BDF8, 1.5, 15, Math.PI / 6);
    rim1.position.set(-4, 3, 2);
    rim1.target.position.set(0, 1, 0);
    this.scene.add(rim1, rim1.target);

    const rim2 = new THREE.SpotLight(0xA78BFA, 1.5, 15, Math.PI / 6);
    rim2.position.set(4, 3, 2);
    rim2.target.position.set(0, 1, 0);
    this.scene.add(rim2, rim2.target);
  }

  loadSpaceBackground() {
    // Procedural starfield — no external API needed
    const spaceGeo = new THREE.SphereGeometry(50, 64, 64);
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Deep space gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, '#000011');
    grad.addColorStop(0.3, '#0a0a2e');
    grad.addColorStop(0.6, '#0f172a');
    grad.addColorStop(1, '#000011');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Stars — 3000 of varying sizes and brightness
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const r = Math.random() * 2.5;
      const brightness = 0.3 + Math.random() * 0.7;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(248, 250, 252, ${brightness})`;
      ctx.fill();
    }

    // Brighter stars with glow
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 6);
      grad.addColorStop(0, 'rgba(248, 250, 252, 1)');
      grad.addColorStop(0.5, 'rgba(248, 250, 252, 0.3)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(x - 6, y - 6, 12, 12);
    }

    // Nebula blobs
    const nebulaColors = [
      'rgba(56, 189, 248, 0.06)',
      'rgba(167, 139, 250, 0.05)',
      'rgba(249, 115, 22, 0.04)',
      'rgba(74, 222, 128, 0.03)',
      'rgba(248, 113, 113, 0.03)',
    ];
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const radius = 80 + Math.random() * 250;
      const nebGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      nebGrad.addColorStop(0, nebulaColors[i % nebulaColors.length]);
      nebGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebGrad;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    const spaceMat = new THREE.MeshBasicMaterial({
      map: tex,
      side: THREE.BackSide
    });

    const spaceMesh = new THREE.Mesh(spaceGeo, spaceMat);
    this.scene.add(spaceMesh);
    this.spaceMesh = spaceMesh;
  }

  buildSpaceStation() {
    const stationGroup = new THREE.Group();

    // Floor — white tiles
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC,
      roughness: 0.3,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    stationGroup.add(floor);

    // Tile grid lines
    const gridHelper = new THREE.GridHelper(20, 40, 0xcbd5e1, 0xe2e8f0);
    gridHelper.position.y = 0.01;
    stationGroup.add(gridHelper);

    // Back wall with window
    const wallGeo = new THREE.PlaneGeometry(20, 8);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.5,
      metalness: 0.05
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 4, -5);
    stationGroup.add(backWall);

    // Glass window (large, showing space)
    const windowGeo = new THREE.PlaneGeometry(12, 5);
    const windowMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      roughness: 0,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.1,
      envMapIntensity: 1
    });
    const glassWindow = new THREE.Mesh(windowGeo, windowMat);
    glassWindow.position.set(0, 3.5, -4.9);
    stationGroup.add(glassWindow);

    // Window frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
    const frameThickness = 0.1;
    const framePositions = [
      { pos: [0, 6.05, -4.85], scale: [12.2, frameThickness, frameThickness] }, // top
      { pos: [0, 0.95, -4.85], scale: [12.2, frameThickness, frameThickness] }, // bottom
      { pos: [-6.05, 3.5, -4.85], scale: [frameThickness, 5.2, frameThickness] }, // left
      { pos: [6.05, 3.5, -4.85], scale: [frameThickness, 5.2, frameThickness] }, // right
    ];
    framePositions.forEach(({ pos, scale }) => {
      const frameGeo = new THREE.BoxGeometry(...scale);
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.set(...pos);
      stationGroup.add(frame);
    });

    // Side walls (curved feel via angled planes)
    const sideWallGeo = new THREE.PlaneGeometry(10, 8);
    const sideWallMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.6,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    const leftWall = new THREE.Mesh(sideWallGeo, sideWallMat);
    leftWall.position.set(-5, 4, 0);
    leftWall.rotation.y = Math.PI / 2;
    stationGroup.add(leftWall);

    const rightWall = new THREE.Mesh(sideWallGeo, sideWallMat);
    rightWall.position.set(5, 4, 0);
    rightWall.rotation.y = -Math.PI / 2;
    stationGroup.add(rightWall);

    // Ceiling with dome hint
    const ceilingGeo = new THREE.PlaneGeometry(20, 20);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC,
      roughness: 0.4,
      metalness: 0.05
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 8;
    stationGroup.add(ceiling);

    // Hologram pedestal
    const pedestalGeo = new THREE.CylinderGeometry(0.8, 1, 0.3, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.1
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(0, 0.15, 0);
    stationGroup.add(pedestal);

    // Pedestal glow ring
    const ringGeo = new THREE.TorusGeometry(0.9, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00d5ff });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.31;
    stationGroup.add(ring);

    this.scene.add(stationGroup);
    this.station = stationGroup;
  }

  buildHologramDisplay() {
    // Photo plane — will show your photo as hologram
    const photoAspect = 3 / 4; // portrait
    const photoHeight = 2;
    const photoWidth = photoHeight * photoAspect;

    const photoGeo = new THREE.PlaneGeometry(photoWidth, photoHeight, 32, 32);

    // Load the real photo
    const loader = new THREE.TextureLoader();
    const photoTex = loader.load(assetUrl('/images/hero-real.jpeg'));
    photoTex.colorSpace = THREE.SRGBColorSpace;

    // Holographic material
    this.holoMaterial = new HolographicMaterial({
      hologramColor: new THREE.Color(0x00d5ff),
      fresnelAmount: 0.7,
      scanlineSize: 3.7,
      signalSpeed: 0.18,
      hologramOpacity: 0.7,
      hologramBrightness: 1.6,
      map: photoTex,
      transparent: true,
      side: THREE.DoubleSide
    });

    this.hologramMesh = new THREE.Mesh(photoGeo, this.holoMaterial);
    this.hologramMesh.position.set(0, 1.8, 0);
    this.scene.add(this.hologramMesh);

    // Store photo textures for mode switching
    this.photoTextures = {
      real: photoTex,
      formal: loader.load(assetUrl('/images/hero-formal.png')),
      ascii: this.createAsciiTexture(photoTex),
      pixel: this.createPixelTexture(photoTex),
      hologram: photoTex // uses same texture but with different material params
    };
  }

  createAsciiTexture(sourceTex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 682;
    const ctx = canvas.getContext('2d');

    // Create a simple colored placeholder if image not loaded yet
    const img = sourceTex.image;
    if (!img || !img.complete || img.width === 0) {
      // Return a placeholder texture
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, 512, 682);
      ctx.fillStyle = '#00d5ff';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ASCII MODE', 256, 341);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    // Draw source image to a temp canvas to get pixel data
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 128;
    tempCanvas.height = 170;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(img, 0, 0, 128, 170);
    const imageData = tempCtx.getImageData(0, 0, 128, 170);

    const chars = ' .:-=+*#%@';
    const charWidth = 4;
    const charHeight = 4;

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 512, 682);
    ctx.fillStyle = '#00d5ff';
    ctx.font = '4px monospace';

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const i = (y * imageData.width + x) * 4;
        const brightness = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
        ctx.fillText(chars[charIndex], x * charWidth, y * charHeight);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  createPixelTexture(sourceTex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 682;
    const ctx = canvas.getContext('2d');

    const img = sourceTex.image;
    if (!img || !img.complete || img.width === 0) {
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, 512, 682);
      ctx.fillStyle = '#00d5ff';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PIXEL MODE', 256, 341);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    const smallCanvas = document.createElement('canvas');
    smallCanvas.width = 32;
    smallCanvas.height = 42;
    const smallCtx = smallCanvas.getContext('2d');
    smallCtx.drawImage(img, 0, 0, 32, 42);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(smallCanvas, 0, 0, 512, 682);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  buildControlPanels() {
    // Left and right revolving control panels
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.3
    });

    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x00d5ff,
      transparent: true,
      opacity: 0.6
    });

    [-1, 1].forEach((side) => {
      const panelGroup = new THREE.Group();

      // Main console body
      const consoleGeo = new THREE.BoxGeometry(1.2, 0.8, 0.6);
      const consoleMesh = new THREE.Mesh(consoleGeo, panelMat);
      panelGroup.add(consoleMesh);

      // Screen
      const screenGeo = new THREE.PlaneGeometry(1, 0.5);
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, 0.1, 0.31);
      panelGroup.add(screen);

      // HUD elements (small floating indicators)
      for (let i = 0; i < 5; i++) {
        const hudGeo = new THREE.SphereGeometry(0.02, 8, 8);
        const hudMat = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.5 ? 0x00d5ff : 0x4ade80,
          transparent: true,
          opacity: 0.8
        });
        const hud = new THREE.Mesh(hudGeo, hudMat);
        hud.position.set(
          (Math.random() - 0.5) * 0.8,
          0.3 + Math.random() * 0.2,
          0.31
        );
        panelGroup.add(hud);
      }

      panelGroup.position.set(side * 3, 1, 1);
      panelGroup.rotation.y = side * -Math.PI / 4;

      this.scene.add(panelGroup);
      this.controlPanels.push(panelGroup);
    });
  }

  setupPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    // Bloom for hologram glow
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    this.composer.addPass(bloomPass);
    this.bloomPass = bloomPass;

    // Custom glitch pass
    this.glitchPass = new GlitchPass();
    this.composer.addPass(this.glitchPass);
  }

  setupEventListeners() {
    this._onResize = this.onResize.bind(this);
    this._onMouseMove = this.onMouseMove.bind(this);
    this._onClick = this.onClick.bind(this);

    window.addEventListener('resize', this._onResize);
    this.container.addEventListener('mousemove', this._onMouseMove);
    this.container.addEventListener('click', this._onClick);
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(e) {
    this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Check if hovering over hologram area (rough bounds)
    const hologramScreenPos = new THREE.Vector3(0, 1.8, 0).project(this.camera);
    const dx = this.targetMouse.x - hologramScreenPos.x;
    const dy = this.targetMouse.y - hologramScreenPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    this.isHovering = dist < 0.4;

    if (this.isHovering) {
      // Random glitch on hover
      if (Math.random() < 0.05) {
        this.glitchIntensity = 0.3 + Math.random() * 0.5;
        this.glitchPass.intensity = this.glitchIntensity;

        // Randomly switch photo mode on hover
        if (Math.random() < 0.02) {
          this.cyclePhotoMode();
        }
      }
    }
  }

  onClick(e) {
    if (this.isHovering) {
      this.cyclePhotoMode();
      // Strong glitch on click
      this.glitchIntensity = 1;
      this.glitchPass.intensity = 1;
      gsap.to(this.glitchPass, {
        intensity: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }

  cyclePhotoMode() {
    this.photoMode = (this.photoMode + 1) % this.photoModes.length;
    const mode = this.photoModes[this.photoMode];

    // Animate transition
    gsap.to(this.hologramMesh.scale, {
      x: 0.01,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        // Switch texture/material
        if (mode === 'hologram') {
          this.holoMaterial.uniforms.hologramOpacity.value = 0.9;
          this.holoMaterial.uniforms.hologramBrightness.value = 2;
          this.hologramMesh.material = this.holoMaterial;
        } else {
          const tex = this.photoTextures[mode];
          const mat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            side: THREE.DoubleSide
          });
          this.hologramMesh.material = mat;
        }

        gsap.to(this.hologramMesh.scale, {
          x: 1,
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
      }
    });
  }

  animate() {
    this._animationId = requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // Smooth mouse follow
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Camera subtle parallax
    this.camera.position.x += (this.mouse.x * 0.3 - this.camera.position.x) * 0.02;
    this.camera.position.y += (1.6 + this.mouse.y * 0.1 - this.camera.position.y) * 0.02;
    this.camera.lookAt(0, 1.2, 0);

    // Hologram levitation
    if (this.hologramMesh) {
      this.hologramMesh.position.y = 1.8 + Math.sin(elapsed * 0.8) * 0.05;
      this.hologramMesh.rotation.y = Math.sin(elapsed * 0.3) * 0.05;
    }

    // Hologram material update
    if (this.holoMaterial && this.holoMaterial.update) {
      this.holoMaterial.update();
    }

    // Control panel rotation
    this.controlPanels.forEach((panel, i) => {
      panel.rotation.y += delta * 0.2 * (i === 0 ? 1 : -1);
    });

    // Hologram light pulse
    if (this.holoLight) {
      this.holoLight.intensity = 2 + Math.sin(elapsed * 2) * 0.5;
    }

    // Space background slow rotation
    if (this.spaceMesh) {
      this.spaceMesh.rotation.y += delta * 0.01;
    }

    // Glitch decay
    this.glitchIntensity *= 0.95;
    this.glitchPass.intensity = this.glitchIntensity;

    this.composer.render();
  }

  dispose() {
    // Stop animation loop
    if (this._animationId) {
      cancelAnimationFrame(this._animationId);
      this._animationId = null;
    }

    // Guard: scene might not be fully initialized
    if (!this.renderer) return;

    // Dispose Three.js resources
    try { this.renderer.dispose(); } catch (_e) { /* ignore */ }
    try { if (this.composer) this.composer.dispose(); } catch (_e) { /* ignore */ }

    // Remove event listeners
    try {
      window.removeEventListener('resize', this._onResize);
      this.container?.removeEventListener('mousemove', this._onMouseMove);
      this.container?.removeEventListener('click', this._onClick);
    } catch (_e) { /* ignore */ }

    // Clear scene
    if (this.scene) {
      this.scene.traverse((obj) => {
        try {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach(m => { try { m.dispose(); } catch (_e) {} });
            } else {
              try { obj.material.dispose(); } catch (_e) {}
            }
          }
        } catch (_e) { /* ignore */ }
      });
    }
  }
}
