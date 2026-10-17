/// <reference types="vite/client" />

declare module 'three';
declare module 'three/examples/jsm/*';
declare module 'gsap';
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
