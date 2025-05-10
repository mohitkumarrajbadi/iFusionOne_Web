// src/vite-plugin-pwa.d.ts
declare module 'virtual:pwa-register' {
  export function registerSW(options: any): (() => void) | undefined;
}
