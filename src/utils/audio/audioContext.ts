let audioContext: AudioContext | null = null;
let toneStarted = false;

export const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export const initializeTone = async (): Promise<void> => {
  if (!toneStarted) {
    const { start } = await import('tone');
    await start();
    toneStarted = true;
  }
};

export const isAudioContextSupported = (): boolean => {
  return !!(window.AudioContext || (window as any).webkitAudioContext);
}; 
 