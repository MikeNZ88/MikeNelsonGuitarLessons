export interface StrumNote {
  frequency: number;
  startTime: number;
  velocity: number;
}

export interface StrumPattern {
  id: string;
  name: string;
  strokes: Array<{
    type: 'down' | 'up';
    time: number; // Beat position (0, 0.5, 1, 1.5, etc.)
    label: string; // Display label like "1", "&", "2", etc.
  }>;
  beatsPerMeasure: number;
  description: string;
}

export type SoundMode = 'guitar' | 'percussion';

export class GuitarStrumEngine {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;
  private soundMode: SoundMode = 'guitar';
  
  // Em chord frequencies (low to high) - lower and fuller sound
  private readonly emChordFreqs = [164.81, 196, 246.94, 329.63, 392, 493.88]; // E3, G3, B3, E4, G4, B4
  
  constructor() {
    // Don't initialize audio context in constructor - wait for user interaction
  }

  private initializeAudioContext(): void {
    if (this.isInitialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.8;
      this.masterGain.connect(this.audioContext.destination);
      this.isInitialized = true;
      console.log('Audio context initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      throw error;
    }
  }

  async ensureStarted(): Promise<void> {
    if (!this.isInitialized) {
      this.initializeAudioContext();
    }
    
    if (!this.audioContext) {
      throw new Error('Audio context not available');
    }

    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
        console.log('Audio context resumed successfully');
      } catch (error) {
        console.error('Failed to resume audio context:', error);
        throw error;
      }
    }
  }

  private createStrumSound(frequencies: number[], isUpstroke: boolean, startTime: number): void {
    if (!this.audioContext || !this.masterGain) {
      console.error('Audio context not initialized');
      return;
    }

    try {
      const now = this.audioContext.currentTime + startTime;
      const releaseTime = isUpstroke ? 1.2 : 2.0; // Longer decay for wooden sound
      
      frequencies.forEach((freq, index) => {
        const stringDelay = isUpstroke 
          ? (frequencies.length - 1 - index) * 0.008 // Slightly slower roll for realism
          : index * 0.008; // Downstroke: low to high
        
        const stringStart = now + stringDelay;
        
        // Create fundamental and harmonics for wooden sound
        this.createWoodenString(freq, stringStart, releaseTime, isUpstroke, index);
      });
    } catch (error) {
      console.error('Error creating strum sound:', error);
    }
  }

  private createWoodenString(freq: number, startTime: number, releaseTime: number, isUpstroke: boolean, stringIndex: number): void {
    if (!this.audioContext || !this.masterGain) return;

    // Create multiple harmonics for wooden guitar body resonance
    const harmonics = [
      { freq: freq, gain: 1.0 },           // Fundamental
      { freq: freq * 2, gain: 0.3 },       // 2nd harmonic
      { freq: freq * 3, gain: 0.15 },      // 3rd harmonic
      { freq: freq * 4, gain: 0.08 },      // 4th harmonic
      { freq: freq * 5, gain: 0.04 },      // 5th harmonic
    ];

    harmonics.forEach((harmonic, hIndex) => {
      // Main oscillator
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      const filter = this.audioContext!.createBiquadFilter();
      const bodyFilter = this.audioContext!.createBiquadFilter(); // Body resonance
      
      // Use different waveforms for different harmonics to create woody timbre
      osc.type = hIndex === 0 ? 'triangle' : 'sine'; // Fundamental is triangle, harmonics are sine
      osc.frequency.value = harmonic.freq;
      
      // Add slight detuning for realism
      const detune = (Math.random() - 0.5) * 4; // ±2 cents
      osc.detune.value = detune;
      
      // Set up body resonance filter (simulates wooden guitar body)
      bodyFilter.type = 'bandpass';
      bodyFilter.frequency.value = 100 + (stringIndex * 30); // Different body resonance per string
      bodyFilter.Q.value = 4.0;
      
      // Set up main filter for tone shaping
      filter.type = 'lowpass';
      filter.frequency.value = isUpstroke ? 3500 : 2800;
      filter.Q.value = 1.2;
      
      // More natural attack and decay for wooden sound
      const baseGain = isUpstroke ? 0.4 : 0.6;
      const stringGain = (baseGain * harmonic.gain) * (0.9 + stringIndex * 0.08);
      
      // Wooden guitar envelope: quick attack, slow decay
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(stringGain, startTime + 0.005); // Quick attack
      gain.gain.exponentialRampToValueAtTime(stringGain * 0.6, startTime + 0.1); // Sustain
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + releaseTime); // Slow wooden decay
      
      // Connect the chain: osc -> bodyFilter -> filter -> gain -> master
      osc.connect(bodyFilter);
      bodyFilter.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);
      
      // Start and stop
      osc.start(startTime);
      osc.stop(startTime + releaseTime);
    });

    // Add subtle pick noise for realism
    this.addPickNoise(startTime, isUpstroke, stringIndex);
  }

  private createKickSound(startTime: number): void {
    if (!this.audioContext || !this.masterGain) return;

    // Enhanced kick drum with multiple layers for punch and depth
    
    // Layer 1: Sub-bass fundamental (20-40Hz)
    const subOsc = this.audioContext.createOscillator();
    const subGain = this.audioContext.createGain();
    const subFilter = this.audioContext.createBiquadFilter();
    
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(40, startTime);
    subOsc.frequency.exponentialRampToValueAtTime(20, startTime + 0.15);
    
    subFilter.type = 'lowpass';
    subFilter.frequency.value = 80;
    subFilter.Q.value = 2;
    
    subGain.gain.setValueAtTime(0.9, startTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
    
    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(this.masterGain);
    
    subOsc.start(startTime);
    subOsc.stop(startTime + 0.3);

    // Layer 2: Main thump (60-30Hz) with more aggressive envelope
    const mainOsc = this.audioContext.createOscillator();
    const mainGain = this.audioContext.createGain();
    const mainFilter = this.audioContext.createBiquadFilter();
    
    mainOsc.type = 'sine';
    mainOsc.frequency.setValueAtTime(65, startTime);
    mainOsc.frequency.exponentialRampToValueAtTime(28, startTime + 0.08);
    
    mainFilter.type = 'lowpass';
    mainFilter.frequency.value = 120;
    mainFilter.Q.value = 1.5;
    
    // More punchy envelope
    mainGain.gain.setValueAtTime(1.3, startTime);
    mainGain.gain.exponentialRampToValueAtTime(0.5, startTime + 0.03);
    mainGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
    
    mainOsc.connect(mainFilter);
    mainFilter.connect(mainGain);
    mainGain.connect(this.masterGain);
    
    mainOsc.start(startTime);
    mainOsc.stop(startTime + 0.2);

    // Layer 3: Click/attack layer for punch (200-800Hz)
    const clickOsc = this.audioContext.createOscillator();
    const clickGain = this.audioContext.createGain();
    const clickFilter = this.audioContext.createBiquadFilter();
    
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(400, startTime);
    clickOsc.frequency.exponentialRampToValueAtTime(200, startTime + 0.02);
    
    clickFilter.type = 'bandpass';
    clickFilter.frequency.value = 500;
    clickFilter.Q.value = 3;
    
    // Very short, punchy click
    clickGain.gain.setValueAtTime(0.4, startTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);
    
    clickOsc.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(this.masterGain);
    
    clickOsc.start(startTime);
    clickOsc.stop(startTime + 0.03);

    // Layer 4: Noise burst for realistic texture
    const noiseBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.05, this.audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.1;
    }
    
    const noiseSource = this.audioContext.createBufferSource();
    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();
    
    noiseSource.buffer = noiseBuffer;
    
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 100;
    noiseFilter.Q.value = 0.5;
    
    noiseGain.gain.setValueAtTime(0.25, startTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.02);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    noiseSource.start(startTime);
    noiseSource.stop(startTime + 0.05);
  }

  private createSnareSound(startTime: number): void {
    if (!this.audioContext || !this.masterGain) return;

    // Enhanced snare drum with multiple frequency layers for realistic sound
    
    // Layer 1: High-frequency crack (3-8kHz) - the "snap"
    const crackBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.03, this.audioContext.sampleRate);
    const crackData = crackBuffer.getChannelData(0);
    
    for (let i = 0; i < crackData.length; i++) {
      crackData[i] = (Math.random() * 2 - 1) * 0.4;
    }
    
    const crackSource = this.audioContext.createBufferSource();
    const crackGain = this.audioContext.createGain();
    const crackFilter = this.audioContext.createBiquadFilter();
    
    crackSource.buffer = crackBuffer;
    
    crackFilter.type = 'bandpass';
    crackFilter.frequency.value = 5000;
    crackFilter.Q.value = 2;
    
    crackGain.gain.setValueAtTime(1.2, startTime);
    crackGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);
    
    crackSource.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(this.masterGain);
    
    crackSource.start(startTime);
    crackSource.stop(startTime + 0.03);

    // Layer 2: Mid-range body (800-2500Hz) - snare wire buzz
    const bodyBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate);
    const bodyData = bodyBuffer.getChannelData(0);
    
    for (let i = 0; i < bodyData.length; i++) {
      bodyData[i] = (Math.random() * 2 - 1) * 0.5;
    }
    
    const bodySource = this.audioContext.createBufferSource();
    const bodyGain = this.audioContext.createGain();
    const bodyFilter = this.audioContext.createBiquadFilter();
    
    bodySource.buffer = bodyBuffer;
    
    bodyFilter.type = 'bandpass';
    bodyFilter.frequency.value = 1500;
    bodyFilter.Q.value = 1.5;
    
    bodyGain.gain.setValueAtTime(1.0, startTime);
    bodyGain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.02);
    bodyGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
    
    bodySource.connect(bodyFilter);
    bodyFilter.connect(bodyGain);
    bodyGain.connect(this.masterGain);
    
    bodySource.start(startTime);
    bodySource.stop(startTime + 0.12);

    // Layer 3: Fundamental tone (150-250Hz) - drum shell resonance
    const fundOsc = this.audioContext.createOscillator();
    const fundGain = this.audioContext.createGain();
    const fundFilter = this.audioContext.createBiquadFilter();
    
    fundOsc.type = 'triangle';
    fundOsc.frequency.setValueAtTime(220, startTime);
    fundOsc.frequency.exponentialRampToValueAtTime(180, startTime + 0.05);
    
    fundFilter.type = 'bandpass';
    fundFilter.frequency.value = 200;
    fundFilter.Q.value = 2;
    
    fundGain.gain.setValueAtTime(0.6, startTime);
    fundGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
    
    fundOsc.connect(fundFilter);
    fundFilter.connect(fundGain);
    fundGain.connect(this.masterGain);
    
    fundOsc.start(startTime);
    fundOsc.stop(startTime + 0.08);

    // Layer 4: Attack click (1-3kHz) - stick contact
    const attackOsc = this.audioContext.createOscillator();
    const attackGain = this.audioContext.createGain();
    const attackFilter = this.audioContext.createBiquadFilter();
    
    attackOsc.type = 'square';
    attackOsc.frequency.setValueAtTime(2000, startTime);
    attackOsc.frequency.exponentialRampToValueAtTime(800, startTime + 0.005);
    
    attackFilter.type = 'bandpass';
    attackFilter.frequency.value = 1800;
    attackFilter.Q.value = 4;
    
    // Very quick attack for stick hit
    attackGain.gain.setValueAtTime(0.8, startTime);
    attackGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.01);
    
    attackOsc.connect(attackFilter);
    attackFilter.connect(attackGain);
    attackGain.connect(this.masterGain);
    
    attackOsc.start(startTime);
    attackOsc.stop(startTime + 0.01);

    // Layer 5: Low-frequency thump (60-150Hz) - body resonance
    const thumpOsc = this.audioContext.createOscillator();
    const thumpGain = this.audioContext.createGain();
    const thumpFilter = this.audioContext.createBiquadFilter();
    
    thumpOsc.type = 'sine';
    thumpOsc.frequency.setValueAtTime(120, startTime);
    thumpOsc.frequency.exponentialRampToValueAtTime(80, startTime + 0.04);
    
    thumpFilter.type = 'lowpass';
    thumpFilter.frequency.value = 200;
    thumpFilter.Q.value = 1;
    
    thumpGain.gain.setValueAtTime(0.5, startTime);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);
    
    thumpOsc.connect(thumpFilter);
    thumpFilter.connect(thumpGain);
    thumpGain.connect(this.masterGain);
    
    thumpOsc.start(startTime);
    thumpOsc.stop(startTime + 0.06);
  }

  private createPercussionSound(isDownstroke: boolean, startTime: number): void {
    if (!this.audioContext || !this.masterGain) {
      console.error('Audio context not initialized');
      return;
    }

    try {
      const now = this.audioContext.currentTime + startTime;
      
      if (isDownstroke) {
        this.createKickSound(now);
      } else {
        this.createSnareSound(now);
      }
    } catch (error) {
      console.error('Error creating percussion sound:', error);
    }
  }

  private addPickNoise(startTime: number, isUpstroke: boolean, stringIndex: number): void {
    if (!this.audioContext || !this.masterGain) return;

    // Create brief noise burst to simulate pick attack
    const noise = this.audioContext.createBufferSource();
    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();
    
    // Create short noise buffer
    const bufferSize = this.audioContext.sampleRate * 0.01; // 10ms of noise
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1; // Quiet noise
    }
    
    noise.buffer = buffer;
    
    // Filter the noise for pick-like sound
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 2000 + (stringIndex * 500);
    noiseFilter.Q.value = 0.5;
    
    // Quick envelope for pick noise
    const noiseLevel = isUpstroke ? 0.02 : 0.04;
    noiseGain.gain.setValueAtTime(noiseLevel, startTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.01);
    
    // Connect noise chain
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain!);
    
    // Start noise
    noise.start(startTime);
    noise.stop(startTime + 0.01);
  }

  playDownstroke(delay: number = 0): void {
    this.createStrumSound(this.emChordFreqs, false, delay);
  }

  playUpstroke(delay: number = 0): void {
    this.createStrumSound(this.emChordFreqs, true, delay);
  }

  setSoundMode(mode: SoundMode): void {
    this.soundMode = mode;
  }

  getSoundMode(): SoundMode {
    return this.soundMode;
  }

  playDownstrokePercussion(delay: number = 0): void {
    this.createPercussionSound(true, delay);
  }

  playUpstrokePercussion(delay: number = 0): void {
    this.createPercussionSound(false, delay);
  }

  playPattern(pattern: StrumPattern, bpm: number, metronomeEnabled: boolean = false, offsetBeats: number = 0): void {
    const beatDuration = 60 / bpm;
    
    // Play metronome clicks if enabled
    if (metronomeEnabled) {
      for (let beat = 0; beat < pattern.beatsPerMeasure; beat++) {
        const delay = (beat + offsetBeats) * beatDuration;
        this.playMetronomeClick(delay, beat === 0); // Accent first beat
      }
    }
    
    pattern.strokes.forEach(stroke => {
      const delay = (stroke.time + offsetBeats) * beatDuration;
      
      if (this.soundMode === 'percussion') {
        if (stroke.type === 'down') {
          this.playDownstrokePercussion(delay);
        } else {
          this.playUpstrokePercussion(delay);
        }
      } else {
        if (stroke.type === 'down') {
          this.playDownstroke(delay);
        } else {
          this.playUpstroke(delay);
        }
      }
    });
  }

  playCountIn(bpm: number): void {
    const beatDuration = 60 / bpm;
    
    // Play 4 count-in beats
    for (let i = 0; i < 4; i++) {
      const delay = i * beatDuration;
      this.playMetronomeClick(delay, i === 0); // Accent first beat
    }
  }

  playMetronomeClick(delay: number, isAccent: boolean = false): void {
    if (!this.audioContext || !this.masterGain) return;

    const startTime = this.audioContext.currentTime + delay;
    
    // Create wooden block sound using noise and tone
    const noise = this.audioContext.createBufferSource();
    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();
    
    // Generate short noise burst for wooden attack
    const bufferSize = this.audioContext.sampleRate * 0.02; // 20ms of noise
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3; // Controlled noise level
    }
    
    noise.buffer = buffer;
    
    // Filter noise for wooden block character
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = isAccent ? 800 : 600; // Different pitch for accent
    noiseFilter.Q.value = 8.0; // Sharp resonance for woody sound
    
    // Add tonal component for musical wooden block
    const tone = this.audioContext.createOscillator();
    const toneGain = this.audioContext.createGain();
    
    tone.type = 'triangle';
    tone.frequency.value = isAccent ? 400 : 300; // Lower fundamental for wood
    
    // Envelope for wooden block - quick attack, quick decay
    const noiseVolume = isAccent ? 0.4 : 0.3;
    const toneVolume = isAccent ? 0.2 : 0.15;
    
    // Noise envelope (the "knock" sound) - immediate attack for perfect sync
    noiseGain.gain.setValueAtTime(0, startTime);
    noiseGain.gain.linearRampToValueAtTime(noiseVolume, startTime + 0.001); // Faster attack
    noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
    
    // Tone envelope (the resonance) - immediate attack for perfect sync
    toneGain.gain.setValueAtTime(0, startTime);
    toneGain.gain.linearRampToValueAtTime(toneVolume, startTime + 0.001); // Faster attack
    toneGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
    
    // Connect audio chain
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    tone.connect(toneGain);
    toneGain.connect(this.masterGain);
    
    // Start and stop sounds
    noise.start(startTime);
    noise.stop(startTime + 0.08);
    
    tone.start(startTime);
    tone.stop(startTime + 0.12);
  }

  static readonly PATTERNS: StrumPattern[] = [
    {
      id: 'all-down',
      name: 'All Downstrokes',
      beatsPerMeasure: 4,
      description: 'The foundation pattern - steady downstrokes on every beat',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        { type: 'down', time: 1, label: '2' },
        { type: 'down', time: 2, label: '3' },
        { type: 'down', time: 3, label: '4' },
      ]
    },
    {
      id: 'alternating',
      name: 'Basic Alternating',
      beatsPerMeasure: 4,
      description: 'Down-up pattern on every eighth note',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        { type: 'up', time: 0.5, label: '&' },
        { type: 'down', time: 1, label: '2' },
        { type: 'up', time: 1.5, label: '&' },
        { type: 'down', time: 2, label: '3' },
        { type: 'up', time: 2.5, label: '&' },
        { type: 'down', time: 3, label: '4' },
        { type: 'up', time: 3.5, label: '&' },
      ]
    },
    {
      id: 'folk',
      name: 'Folk Pattern',
      beatsPerMeasure: 4,
      description: 'Classic folk/country pattern',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        { type: 'down', time: 1, label: '2' },
        { type: 'up', time: 1.5, label: '&' },
        { type: 'down', time: 2, label: '3' },
        { type: 'down', time: 3, label: '4' },
        { type: 'up', time: 3.5, label: '&' },
      ]
    },
    {
      id: 'popular',
      name: 'Popular/Rock',
      beatsPerMeasure: 4,
      description: 'Common pop and rock pattern',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        { type: 'down', time: 1, label: '2' },
        { type: 'up', time: 1.5, label: '&' },
        { type: 'up', time: 2.5, label: '&' },
        { type: 'down', time: 3, label: '3' },
        { type: 'up', time: 3.5, label: '&' },
      ]
    },
    {
      id: 'sixteenth',
      name: '16th Note Pattern',
      beatsPerMeasure: 4,
      description: 'Advanced pattern with ghost strums - hand moves continuously but only hits strings on specific beats',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        // Skip e, &, a for beat 1
        { type: 'down', time: 1, label: '2' },
        // Skip e for beat 2
        { type: 'down', time: 1.5, label: '&' },
        { type: 'up', time: 1.75, label: 'a' },
        // Skip beat 3
        { type: 'up', time: 2.25, label: 'e' },
        { type: 'down', time: 2.5, label: '&' },
        // Skip a for beat 3
        { type: 'down', time: 3, label: '4' },
        { type: 'up', time: 3.25, label: 'e' },
        { type: 'down', time: 3.5, label: '&' },
        { type: 'up', time: 3.75, label: 'a' },
      ]
    },
    {
      id: 'skip-pattern',
      name: 'Skip the Down',
      beatsPerMeasure: 4,
      description: 'Down-up pattern with a skipped downstroke on beat 2',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        { type: 'up', time: 0.5, label: '&' },
        // Skip beat 2 (ghost down)
        { type: 'up', time: 1.5, label: '&' },
        { type: 'down', time: 2, label: '3' },
        { type: 'up', time: 2.5, label: '&' },
        { type: 'down', time: 3, label: '4' },
        { type: 'up', time: 3.5, label: '&' },
      ]
    },
    {
      id: 'pattern-6',
      name: 'Pattern 6',
      beatsPerMeasure: 4,
      description: 'Strong downbeat emphasis with syncopated ending',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        // Skip 1&
        { type: 'down', time: 1, label: '2' },
        // Skip 2&, 3
        { type: 'up', time: 2.5, label: '&' },
        { type: 'down', time: 3, label: '4' },
        { type: 'up', time: 3.5, label: '&' },
      ]
    },
    {
      id: 'pattern-7',
      name: 'Pattern 7',
      beatsPerMeasure: 4,
      description: 'Syncopated pattern with upstroke emphasis',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        { type: 'up', time: 0.5, label: '&' },
        // Skip 2
        { type: 'up', time: 1.5, label: '&' },
        // Skip 3
        { type: 'up', time: 2.5, label: '&' },
        { type: 'down', time: 3, label: '4' },
        { type: 'up', time: 3.5, label: '&' },
      ]
    },
    {
      id: 'skank',
      name: 'Skank Pattern',
      beatsPerMeasure: 4,
      description: 'Classic skank rhythm - emphasizes beats 2 and 4 with their off-beats',
      strokes: [
        // Skip beat 1 and 1&
        { type: 'down', time: 1, label: '2' },
        { type: 'up', time: 1.5, label: '&' },
        // Skip beat 3 and 3&
        { type: 'down', time: 3, label: '4' },
        { type: 'up', time: 3.5, label: '&' },
      ]
    },
    {
      id: 'funk-sixteenth',
      name: 'Funk 16th Note Pattern',
      beatsPerMeasure: 4,
      description: 'Syncopated funk pattern with 16th note subdivisions and strategic ghost strums',
      strokes: [
        { type: 'down', time: 0, label: '1' },
        // Skip 1e (ghost up)
        { type: 'down', time: 0.5, label: '&' },
        { type: 'up', time: 0.75, label: 'a' },
        { type: 'down', time: 1, label: '2' },
        { type: 'up', time: 1.25, label: 'e' },
        { type: 'down', time: 1.5, label: '&' },
        { type: 'up', time: 1.75, label: 'a' },
        // Skip 3 (ghost down)
        { type: 'up', time: 2.25, label: 'e' },
        { type: 'down', time: 2.5, label: '&' },
        // Skip 3a (ghost up)
        { type: 'down', time: 3, label: '4' },
        { type: 'up', time: 3.25, label: 'e' },
        { type: 'down', time: 3.5, label: '&' },
        { type: 'up', time: 3.75, label: 'a' },
      ]
    }
  ];
} 