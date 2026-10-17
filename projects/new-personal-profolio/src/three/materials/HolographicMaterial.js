/**
 * HolographicMaterial — Custom Three.js shader material
 * Based on ektogamat/threejs-vanilla-holographic-material
 * 
 * Features:
 * - Fresnel-based edge glow
 * - Scanline pattern
 * - Signal wave animation
 * - Blinking/flicker effect
 * - Glitch vertex displacement
 */

import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uGlitchIntensity;
  uniform float uSignalSpeed;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  // Simplex-like noise
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - (modelMatrix * vec4(position, 1.0)).xyz);

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Glitch displacement
    float glitch = random(vec2(floor(uTime * 10.0), floor(position.y * 5.0)));
    if (glitch > 0.95) {
      modelPosition.x += (random(vec2(uTime, position.y)) - 0.5) * uGlitchIntensity * 0.1;
      modelPosition.y += (random(vec2(uTime + 1.0, position.x)) - 0.5) * uGlitchIntensity * 0.05;
    }

    // Signal wave
    float wave = sin(position.y * 20.0 - uTime * uSignalSpeed * 10.0) * 0.5 + 0.5;
    modelPosition.z += wave * 0.02 * uSignalSpeed;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uHologramColor;
  uniform float uFresnelAmount;
  uniform float uFresnelOpacity;
  uniform float uScanlineSize;
  uniform float uSignalSpeed;
  uniform float uHologramOpacity;
  uniform float uHologramBrightness;
  uniform float uTime;
  uniform bool uBlinkFresnelOnly;
  uniform bool uEnableBlinking;
  uniform sampler2D uMap;
  uniform bool uHasMap;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    // Base color from texture or hologram color
    vec4 baseColor = uHasMap ? texture2D(uMap, vUv) : vec4(uHologramColor, 1.0);

    // Fresnel effect
    float fresnel = pow(1.0 - max(dot(vViewDir, vNormal), 0.0), 2.0);
    fresnel = fresnel * uFresnelAmount;

    // Scanlines
    float scanline = sin(vUv.y * uScanlineSize * 50.0 + uTime * 5.0) * 0.5 + 0.5;
    scanline = smoothstep(0.3, 0.7, scanline);

    // Signal wave
    float signal = sin(vUv.y * 30.0 - uTime * uSignalSpeed * 15.0) * 0.5 + 0.5;
    signal = smoothstep(0.4, 0.6, signal);

    // Blinking
    float blink = 1.0;
    if (uEnableBlinking) {
      blink = sin(uTime * 8.0) * 0.5 + 0.5;
      blink = step(0.97, blink);
    }

    // Noise grain
    float noise = random(vUv + fract(uTime)) * 0.1;

    // Combine
    vec3 color = baseColor.rgb * uHologramBrightness;
    color += uHologramColor * fresnel * uFresnelOpacity;
    color *= (0.8 + scanline * 0.2);
    color += signal * uHologramColor * 0.15;
    color += noise;

    float alpha = uHologramOpacity;
    if (uBlinkFresnelOnly) {
      alpha = mix(alpha, alpha * blink, fresnel);
    } else {
      alpha *= blink;
    }

    // Edge fade
    float edgeFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
    edgeFade *= smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
    alpha *= edgeFade;

    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export class HolographicMaterial extends THREE.ShaderMaterial {
  constructor(options = {}) {
    const uniforms = {
      uTime: { value: 0 },
      uGlitchIntensity: { value: 0 },
      uHologramColor: { value: options.hologramColor || new THREE.Color(0x00d5ff) },
      uFresnelAmount: { value: options.fresnelAmount ?? 0.7 },
      uFresnelOpacity: { value: options.fresnelOpacity ?? 1.0 },
      uScanlineSize: { value: options.scanlineSize ?? 3.7 },
      uSignalSpeed: { value: options.signalSpeed ?? 0.18 },
      uHologramOpacity: { value: options.hologramOpacity ?? 0.7 },
      uHologramBrightness: { value: options.hologramBrightness ?? 1.6 },
      uBlinkFresnelOnly: { value: options.blinkFresnelOnly ?? true },
      uEnableBlinking: { value: options.enableBlinking ?? true },
      uMap: { value: options.map || null },
      uHasMap: { value: options.map ? 1.0 : 0.0 }
    };

    super({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: options.depthTest ?? true,
      blending: options.blendMode ?? THREE.NormalBlending
    });

    this.clock = new THREE.Clock();
  }

  update() {
    this.uniforms.uTime.value = this.clock.getElapsedTime();
  }

  set glitchIntensity(v) {
    this.uniforms.uGlitchIntensity.value = v;
  }

  get glitchIntensity() {
    return this.uniforms.uGlitchIntensity.value;
  }
}
