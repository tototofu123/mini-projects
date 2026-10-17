/**
 * About Scene — Plasma gun + projectile system
 * Abstract placeholder for the plasma gun with firing mechanics
 */

import * as THREE from 'three';
import gsap from 'gsap';

export class AboutScene {
  constructor(container, onBoxMelt) {
    this.container = container;
    this.onBoxMelt = onBoxMelt;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.projectiles = [];

    this.setupRenderer();
    this.setupScene();
    this.setupCamera();
    this.setupLights();
    this.buildGun();
    this.setupEventListeners();
    this.animate();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.container.appendChild(this.renderer.domElement);
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 2, 6);
    this.camera.lookAt(0, 1, 0);
  }

  setupLights() {
    const ambient = new THREE.AmbientLight(0xF8FAFC, 0.3);
    this.scene.add(ambient);

    const main = new THREE.DirectionalLight(0xF8FAFC, 0.8);
    main.position.set(2, 4, 3);
    this.scene.add(main);

    const glow = new THREE.PointLight(0xF97316, 1.5, 10);
    glow.position.set(0, 1.5, 2);
    this.scene.add(glow);
  }

  buildGun() {
    this.gunGroup = new THREE.Group();

    // Core energy sphere
    const coreGeo = new THREE.SphereGeometry(0.3, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xF97316,
      transparent: true,
      opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    this.gunGroup.add(core);

    // Outer glow sphere
    const glowGeo = new THREE.SphereGeometry(0.45, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xF97316,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    this.gunGroup.add(glow);

    // Energy rings
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.TorusGeometry(0.5 + i * 0.15, 0.02, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xF97316,
        transparent: true,
        opacity: 0.5 - i * 0.1
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      ring.rotation.y = (Math.random() - 0.5) * 0.3;
      this.gunGroup.add(ring);
    }

    // Barrel
    const barrelGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.2, 16);
    const barrelMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      metalness: 0.9,
      roughness: 0.2
    });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.position.z = -0.8;
    barrel.rotation.x = Math.PI / 2;
    this.gunGroup.add(barrel);

    // Barrel glow tip
    const tipGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const tipMat = new THREE.MeshBasicMaterial({
      color: 0xFCD34D,
      transparent: true,
      opacity: 0.8
    });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.z = -1.4;
    this.gunGroup.add(tip);

    this.gunGroup.position.set(0, 1.5, 2);
    this.scene.add(this.gunGroup);

    // Plasma material for projectiles
    this.plasmaMat = new THREE.MeshBasicMaterial({
      color: 0xF97316,
      transparent: true,
      opacity: 0.9
    });
  }

  fireAtPosition(boxIndex) {
    const geo = new THREE.SphereGeometry(0.08, 16, 16);
    const mat = this.plasmaMat.clone();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(this.gunGroup.position);
    mesh.position.z -= 1.5;
    this.scene.add(mesh);

    const boxPositions = [
      new THREE.Vector3(-2, 2.5, 0),
      new THREE.Vector3(-2, 1.5, 0),
      new THREE.Vector3(-2, 0.5, 0),
      new THREE.Vector3(-2, -0.5, 0),
    ];

    const target = boxPositions[boxIndex] || boxPositions[0];
    const direction = target.clone().sub(mesh.position).normalize();

    this.projectiles.push({
      mesh,
      velocity: direction.multiplyScalar(8),
      life: 2,
      targetBox: boxIndex
    });

    // Gun recoil
    gsap.to(this.gunGroup.position, {
      z: 2.3,
      duration: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(this.gunGroup.position, {
          z: 2,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    });

    // Muzzle flash
    const flashGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const flashMat = new THREE.MeshBasicMaterial({
      color: 0xFCD34D,
      transparent: true,
      opacity: 1
    });
    const flash = new THREE.Mesh(flashGeo, flashMat);
    flash.position.copy(mesh.position);
    this.scene.add(flash);

    gsap.to(flashMat, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        this.scene.remove(flash);
        flashGeo.dispose();
        flashMat.dispose();
      }
    });
  }

  setupEventListeners() {
    this.container.addEventListener('click', this.onClick.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onClick(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const boxIndex = Math.floor(Math.random() * 4);
    this.fireAtPosition(boxIndex);
  }

  onResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // Gun idle drift
    this.gunGroup.position.x = Math.sin(elapsed * 0.5) * 0.3;
    this.gunGroup.position.y = 1.5 + Math.sin(elapsed * 0.7) * 0.1;
    this.gunGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.2;
    this.gunGroup.rotation.x = Math.cos(elapsed * 0.4) * 0.1;

    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.mesh.position.add(p.velocity.clone().multiplyScalar(delta));
      p.life -= delta;

      const scale = 1 + Math.sin(elapsed * 20) * 0.2;
      p.mesh.scale.setScalar(scale);

      if (p.mesh.position.x < -1 || p.life <= 0) {
        this.createImpact(p.mesh.position.clone(), p.targetBox);
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.projectiles.splice(i, 1);
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  createImpact(position, boxIndex) {
    for (let i = 0; i < 12; i++) {
      const geo = new THREE.SphereGeometry(0.03, 8, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0xF97316 : 0xFCD34D,
        transparent: true,
        opacity: 1
      });
      const particle = new THREE.Mesh(geo, mat);
      particle.position.copy(position);
      this.scene.add(particle);

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();

      gsap.to(particle.position, {
        x: position.x + dir.x * 1.5,
        y: position.y + dir.y * 1.5,
        z: position.z + dir.z * 1.5,
        duration: 0.5 + Math.random() * 0.3,
        ease: 'power2.out'
      });

      gsap.to(mat, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        onComplete: () => {
          this.scene.remove(particle);
          geo.dispose();
          mat.dispose();
        }
      });
    }

    this.onBoxMelt(boxIndex);
  }

  dispose() {
    this.renderer.dispose();
    this.container.removeEventListener('click', this.onClick);
    window.removeEventListener('resize', this.onResize);
  }
}
