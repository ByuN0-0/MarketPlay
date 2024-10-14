// src/@types/instascan.d.ts
declare module 'instascan' {
  export class Scanner {
    constructor(options?: any);
    start(video: HTMLVideoElement): Promise<void>;
    stop(): void;
    addListener(event: string, callback: (result: string) => void): void;
    removeListener(event: string, callback: (result: string) => void): void;
  }
}
