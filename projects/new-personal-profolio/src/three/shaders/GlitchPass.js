/**
 * GlitchPass — Custom post-processing pass for glitch/distortion effects
 */

import * as THREE from 'three';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';

const glitchVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glitchFragmentShader = /* glsl */ `
  uniform sampler2D tDiffuse;
  uniform float uIntensity;
  uniform float uTime;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    float intensity = uIntensity;

    if (intensity <= 0.0) {
      gl_FragColor = texture2D(tDiffuse, uv);
      return;
    }

    float rgbSplit = intensity * 0.02;
    float r = texture2D(tDiffuse, uv + vec2(rgbSplit, 0.0)).r;
    float g = texture2D(tDiffuse, uv).g;
    float b = texture2D(tDiffuse, uv - vec2(rgbSplit, 0.0)).b;

    float blockSize = 0.05;
    float blockY = floor(uv.y / blockSize);
    float blockRandom = random(vec2(blockY, floor(uTime * 20.0)));
    if (blockRandom > 0.9) {
      float shift = (random(vec2(uTime, blockY)) - 0.5) * intensity * 0.1;
      uv.x += shift;
    }

    float scanline = sin(uv.y * 200.0 + uTime * 50.0) * 0.5 + 0.5;
    scanline = step(0.98, scanline) * intensity * 0.3;

    vec4 color = texture2D(tDiffuse, uv);
    color.r = mix(color.r, r, intensity);
    color.g = mix(color.g, g, intensity);
    color.b = mix(color.b, b, intensity);
    color.rgb += scanline;

    float noise = random(uv + fract(uTime)) * intensity * 0.15;
    color.rgb += noise;

    gl_FragColor = color;
  }
`;

export class GlitchPass extends Pass {
  constructor() {
    super();

    this.uniforms = {
      tDiffuse: { value: null },
      uIntensity: { value: 0 },
      uTime: { value: 0 }
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader: glitchVertexShader,
      fragmentShader: glitchFragmentShader,
      uniforms: this.uniforms
    });

    // FullScreenQuad may be at different paths depending on three.js version
    if (THREE.Pass && THREE.Pass.FullScreenQuad) {
      this.fsQuad = new THREE.Pass.FullScreenQuad(this.material);
    } else {
      // Fallback: create a simple fullscreen quad manually
      const quadGeo = new THREE.PlaneGeometry(2, 2);
      this.fsQuad = new THREE.Mesh(quadGeo, this.material);
      this.fsQuad.frustumCulled = false;
    }

    this.clock = new THREE.Clock();
  }

  render(renderer, writeBuffer, readBuffer) {
    this.uniforms.tDiffuse.value = readBuffer.texture;
    this.uniforms.uTime.value = this.clock.getElapsedTime();

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
    } else {
      renderer.setRenderTarget(writeBuffer);
    }

    if (this.fsQuad.render) {
      this.fsQuad.render(renderer);
    } else {
      // Fallback: render manually
      const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const scene = new THREE.Scene();
      scene.add(this.fsQuad);
      renderer.render(scene, cam);
    }
  }

  set intensity(v) {
    this.uniforms.uIntensity.value = v;
  }

  get intensity() {
    return this.uniforms.uIntensity.value;
  }
}
