import * as Tone from 'tone';

interface RhythmNote {
  startPosition: number;
  duration: number;
  velocity: number;
}

interface RhythmPattern {
  timeSignature: { beats: number; beatType: number; label: string };
  subdivision: { value: number; name: string; unitsPerNote: number; isTriplet: boolean };
  totalUnits: number;
  notes: RhythmNote[];
}

export class ToneManager {
  private static instance: ToneManager | null = null;
  private currentPattern: RhythmPattern | null = null;
  private currentPosition = 0;
  private isLooping = false;
  private currentBPM = 90;
  
  // B3 guitar sample setup using Tone.Player
  private b3Sample: Tone.Player | null = null;
  private guitarReverb: Tone.Reverb | null = null;
  private guitarFilter: Tone.Filter | null = null;
  private sequence: Tone.Sequence | null = null;
  private isInitialized = false;
  private sampleLoaded = false;

  static getInstance(): ToneManager {
    if (!ToneManager.instance) {
      ToneManager.instance = new ToneManager();
    }
    return ToneManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await Tone.start();
      await this.setupB3Player();
      await this.setupGuitarEffects();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize ToneManager:', error);
      throw error;
    }
  }

  private async setupB3Player(): Promise<void> {
    // Load the B3 sample using Tone.Player
    this.b3Sample = new Tone.Player({
      url: "/b3-sample.wav",
      onload: () => {
        this.sampleLoaded = true;
        console.log('B3 guitar sample loaded successfully');
      }
    });

    // Wait for sample to load
    return new Promise((resolve) => {
      const checkLoaded = () => {
        if (this.sampleLoaded) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
    });
  }

  private async setupGuitarEffects(): Promise<void> {
    if (!this.b3Sample) return;

    // Add a warmer low-pass filter
    this.guitarFilter = new Tone.Filter({
      frequency: 3500,         // Higher cutoff for brighter sound
      type: 'lowpass',
      Q: 0.5                   // Lower Q for smoother filtering
    });

    // Add a compressor for more consistent dynamics
    const compressor = new Tone.Compressor({
      threshold: -24,
      ratio: 3,
      attack: 0.003,
      release: 0.1
    });

    // Add subtle reverb for natural space
    this.guitarReverb = new Tone.Reverb({
      decay: 2.0,              // Longer decay for more natural reverb
      preDelay: 0.02,          // Slightly longer pre-delay
      wet: 0.15                // Less wet signal for subtlety
    });

    await this.guitarReverb.ready;

    // Connect B3 player to effects chain
    this.b3Sample.chain(compressor, this.guitarFilter, this.guitarReverb, Tone.Destination);
  }

  updatePattern(pattern: RhythmPattern): void {
    this.currentPattern = pattern;
    this.createSequence();
  }

  private createSequence(): void {
    if (!this.currentPattern) return;

    if (this.sequence) {
      this.sequence.dispose();
    }

    const totalCells = this.currentPattern.totalUnits / this.currentPattern.subdivision.unitsPerNote;

    // Create a sequence that tracks every subdivision
    this.sequence = new Tone.Sequence((time, step) => {
      this.currentPosition = step * this.currentPattern!.subdivision.unitsPerNote;
      
      // Check if there's a rhythm note at this position
      const note = this.currentPattern!.notes.find(n => n.startPosition === this.currentPosition);
      if (note && note.velocity > 0) {  // Only play sound if velocity > 0 (not a rest)
        this.playNote(note.velocity, note.duration, time);
      }

    }, Array.from({ length: totalCells }, (_, i) => i), this.getSubdivisionNote());

    this.sequence.loop = this.isLooping;
  }

  private getSubdivisionNote(): string {
    if (!this.currentPattern) return '16n';
    
    const subdivision = this.currentPattern.subdivision;
    
    if (subdivision.isTriplet) {
      if (subdivision.value === 8) return '8t'; // Eighth triplets
      if (subdivision.value === 16) return '16t'; // Sixteenth triplets
    } else {
      if (subdivision.value === 4) return '4n'; // Quarter notes
      if (subdivision.value === 8) return '8n'; // Eighth notes
      if (subdivision.value === 16) return '16n'; // Sixteenth notes
      if (subdivision.value === 32) return '32n'; // Thirty-second notes
    }
    
    return '16n'; // Default fallback
  }

  // Play different durations using the B3 player
  private playNote(velocity: number, noteDuration: number, time?: number) {
    if (!this.sampleLoaded || !this.b3Sample) {
      console.warn('B3 sample not loaded yet');
      return;
    }

    try {
      // Apply volume based on velocity
      const volume = Math.pow(velocity, 0.7) * 0.8;
      this.b3Sample.volume.value = Tone.gainToDb(volume);
      
      // Convert pattern duration to a reasonable playback duration
      // The issue was that quarter notes (12 units) were playing too short
      let playbackDuration;
      
      if (noteDuration >= 48) {
        // Whole note - play for 3 seconds
        playbackDuration = 3.0;
      } else if (noteDuration >= 24) {
        // Half note - play for 1.5 seconds  
        playbackDuration = 1.5;
      } else if (noteDuration >= 18) {
        // Dotted quarter - play for 1.2 seconds
        playbackDuration = 1.2;
      } else if (noteDuration >= 12) {
        // Quarter note - play for 1 second (this was the main issue)
        playbackDuration = 1.0;
      } else if (noteDuration >= 8) {
        // Dotted eighth or longer eighth - play for 0.7 seconds
        playbackDuration = 0.7;
      } else if (noteDuration >= 6) {
        // Eighth note - play for 0.5 seconds
        playbackDuration = 0.5;
      } else if (noteDuration >= 4) {
        // Triplet eighth - play for 0.4 seconds
        playbackDuration = 0.4;
      } else {
        // Sixteenth note or shorter - play for 0.3 seconds
        playbackDuration = 0.3;
      }

      // Start the sample
      this.b3Sample.start(time);
      
      // Stop the sample after the calculated duration
      this.b3Sample.stop((time || Tone.now()) + playbackDuration);
      
    } catch (error) {
      console.warn('Error playing note:', error);
    }
  }

  // Convert pattern duration units to Tone.js time notation
  private convertDurationToToneTime(patternDuration: number): string {
    if (!this.currentPattern) return '4n';
    
    const { totalUnits } = this.currentPattern;
    const quarterNoteUnits = totalUnits / 4; // Units per quarter note in 4/4 time
    
    // Calculate note value based on duration relative to quarter note
    const quarterNoteRatio = patternDuration / quarterNoteUnits;
    
    if (quarterNoteRatio >= 4) {
      return '1n';      // Whole note (4 quarter notes)
    } else if (quarterNoteRatio >= 3) {
      return '2n.';     // Dotted half note (3 quarter notes)
    } else if (quarterNoteRatio >= 2) {
      return '2n';      // Half note (2 quarter notes)
    } else if (quarterNoteRatio >= 1.5) {
      return '4n.';     // Dotted quarter note (1.5 quarter notes)
    } else if (quarterNoteRatio >= 1) {
      return '4n';      // Quarter note
    } else if (quarterNoteRatio >= 0.75) {
      return '8n.';     // Dotted eighth note
    } else if (quarterNoteRatio >= 0.5) {
      return '8n';      // Eighth note
    } else if (quarterNoteRatio >= 0.375) {
      return '16n.';    // Dotted sixteenth note
    } else if (quarterNoteRatio >= 0.25) {
      return '16n';     // Sixteenth note
    } else if (quarterNoteRatio >= 0.167) {
      return '8t';      // Eighth triplet
    } else if (quarterNoteRatio >= 0.125) {
      return '32n';     // Thirty-second note
    } else {
      return '16t';     // Sixteenth triplet
    }
  }

  play(): void {
    if (!this.isInitialized) {
      console.warn('ToneManager not initialized');
      return;
    }

    if (!this.sampleLoaded) {
      console.warn('B3 sample not loaded yet');
      return;
    }

    if (!this.currentPattern) {
      console.warn('No pattern set');
      return;
    }

    Tone.Transport.start();
    if (this.sequence) {
      this.sequence.start();
    }
  }

  pause(): void {
    Tone.Transport.pause();
  }

  stop(): void {
    try {
      Tone.Transport.stop();
      if (this.sequence) {
        this.sequence.stop();
      }
      this.currentPosition = 0;
    } catch (error) {
      console.warn('Error stopping sequence:', error);
      // Force stop by disposing and recreating if needed
      if (this.sequence) {
        try {
          this.sequence.dispose();
          this.sequence = null;
        } catch (disposeError) {
          console.warn('Error disposing sequence:', disposeError);
        }
      }
      this.currentPosition = 0;
    }
  }

  setBPM(bpm: number): void {
    this.currentBPM = bpm;
    Tone.Transport.bpm.value = bpm;
  }

  getBPM(): number {
    return Tone.Transport.bpm.value;
  }

  get isPlaying(): boolean {
    return Tone.Transport.state === 'started';
  }

  getCurrentPosition(): number {
    return this.currentPosition;
  }

  dispose(): void {
    this.stop();
    if (this.sequence) {
      this.sequence.dispose();
    }
    if (this.b3Sample) {
      this.b3Sample.dispose();
    }
    if (this.guitarFilter) {
      this.guitarFilter.dispose();
    }
    if (this.guitarReverb) {
      this.guitarReverb.dispose();
    }
    this.isInitialized = false;
    this.sampleLoaded = false;
  }

  setLooping(looping: boolean): void {
    this.isLooping = looping;
    if (this.sequence) {
      this.sequence.loop = looping;
    }
  }
} 