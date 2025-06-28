import { RhythmPattern, RhythmEngine, TimeSignature, Subdivision } from './rhythmEngine';

export interface RhythmPreset {
  id: string;
  name: string;
  description: string;
  category: string;
  pattern: RhythmPattern;
}

export class RhythmPresets {
  private static readonly presets: RhythmPreset[] = [];

  static {
    this.initializePresets();
  }

  private static initializePresets() {
    const timeSignatures = RhythmEngine.TIME_SIGNATURES;
    const subdivisions = RhythmEngine.SUBDIVISIONS;

    // Find common signatures and subdivisions
    const fourFour = timeSignatures.find(ts => ts.label === "4/4")!;
    const threeFour = timeSignatures.find(ts => ts.label === "3/4")!;
    const fiveFour = timeSignatures.find(ts => ts.label === "5/4")!;
    const sevenEight = timeSignatures.find(ts => ts.label === "7/8")!;

    const quarters = subdivisions.find(sub => sub.name === "Quarter Notes")!;
    const eighths = subdivisions.find(sub => sub.name === "Eighth Notes")!;
    const sixteenths = subdivisions.find(sub => sub.name === "Sixteenth Notes")!;
    const eighthTriplets = subdivisions.find(sub => sub.name === "Eighth Triplets")!;

    // Basic patterns
    this.addPreset({
      id: "basic-quarter-44",
      name: "Basic Quarter Notes",
      description: "Four quarter notes in 4/4 time",
      category: "Basic",
      timeSignature: fourFour,
      subdivision: quarters,
      notePositions: [0, 1, 2, 3]
    });

    this.addPreset({
      id: "basic-eighth-44",
      name: "Eighth Note Pulse",
      description: "Steady eighth note pulse in 4/4",
      category: "Basic",
      timeSignature: fourFour,
      subdivision: eighths,
      notePositions: [0, 1, 2, 3, 4, 5, 6, 7]
    });

    // Rock patterns
    this.addPreset({
      id: "rock-basic-44",
      name: "Basic Rock Beat",
      description: "Kick on 1 & 3, snare on 2 & 4",
      category: "Rock",
      timeSignature: fourFour,
      subdivision: sixteenths,
      notePositions: [0, 4, 8, 12] // Simplified to just the main beats
    });

    this.addPreset({
      id: "rock-offbeat-44",
      name: "Rock with Offbeats",
      description: "Quarter notes with eighth note offbeats",
      category: "Rock",
      timeSignature: fourFour,
      subdivision: eighths,
      notePositions: [0, 1, 2, 4, 5, 6]
    });

    // Waltz patterns
    this.addPreset({
      id: "waltz-basic-34",
      name: "Basic Waltz",
      description: "Strong beat 1, light beats 2 & 3",
      category: "Classical",
      timeSignature: threeFour,
      subdivision: quarters,
      notePositions: [0, 1, 2]
    });

    this.addPreset({
      id: "waltz-eighth-34",
      name: "Flowing Waltz",
      description: "Eighth note waltz pattern",
      category: "Classical",
      timeSignature: threeFour,
      subdivision: eighths,
      notePositions: [0, 2, 4]
    });

    // Triplet patterns
    this.addPreset({
      id: "triplet-basic-44",
      name: "Basic Triplets",
      description: "Quarter note triplet feel",
      category: "Triplets",
      timeSignature: fourFour,
      subdivision: eighthTriplets,
      notePositions: [0, 2, 4, 6, 8, 10]
    });

    this.addPreset({
      id: "triplet-shuffle-44",
      name: "Shuffle Pattern",
      description: "Classic shuffle rhythm with triplets",
      category: "Triplets",
      timeSignature: fourFour,
      subdivision: eighthTriplets,
      notePositions: [0, 2, 6, 8]
    });

    // Complex time signatures
    this.addPreset({
      id: "prog-basic-54",
      name: "5/4 Progressive",
      description: "Basic 5/4 pattern (3+2 grouping)",
      category: "Odd Time",
      timeSignature: fiveFour,
      subdivision: quarters,
      notePositions: [0, 1, 2, 3, 4]
    });

    this.addPreset({
      id: "prog-grouped-54",
      name: "5/4 Grouped",
      description: "5/4 with 3+2 emphasis",
      category: "Odd Time",
      timeSignature: fiveFour,
      subdivision: eighths,
      notePositions: [0, 2, 4, 6, 8]
    });

    this.addPreset({
      id: "balkan-78",
      name: "Balkan 7/8",
      description: "Traditional 7/8 pattern (3+2+2)",
      category: "World",
      timeSignature: sevenEight,
      subdivision: eighths,
      notePositions: [0, 3, 5]
    });

    // Syncopated patterns
    this.addPreset({
      id: "syncopated-44",
      name: "Syncopated Rhythm",
      description: "Off-beat emphasis pattern",
      category: "Advanced",
      timeSignature: fourFour,
      subdivision: sixteenths,
      notePositions: [0, 3, 6, 10, 14]
    });

    // Educational examples
    this.addPreset({
      id: "dotted-quarters-44",
      name: "Dotted Quarter Notes",
      description: "Demonstrates dotted quarter note duration",
      category: "Educational",
      timeSignature: fourFour,
      subdivision: sixteenths,
      notePositions: [0, 6, 12], // Each note lasts 6 sixteenth units (dotted quarter)
      noteDurations: [6, 6, 4] // Last note is shorter to fit measure
    });

    this.addPreset({
      id: "mixed-durations-44",
      name: "Mixed Note Values",
      description: "Quarter, eighth, and sixteenth note mix",
      category: "Educational",
      timeSignature: fourFour,
      subdivision: sixteenths,
      notePositions: [0, 4, 6, 8, 10, 12],
      noteDurations: [4, 2, 2, 2, 2, 4] // Various durations
    });
  }

  private static addPreset(config: {
    id: string;
    name: string;
    description: string;
    category: string;
    timeSignature: TimeSignature;
    subdivision: Subdivision;
    notePositions: number[];
    noteDurations?: number[];
  }) {
    let pattern = RhythmEngine.createEmptyPattern(config.timeSignature, config.subdivision);
    
    config.notePositions.forEach((position, index) => {
      const duration = config.noteDurations?.[index] || 1;
      pattern = RhythmEngine.addNote(pattern, position, duration);
    });

    this.presets.push({
      id: config.id,
      name: config.name,
      description: config.description,
      category: config.category,
      pattern,
    });
  }

  static getAllPresets(): RhythmPreset[] {
    return [...this.presets];
  }

  static getPresetsByCategory(category: string): RhythmPreset[] {
    return this.presets.filter(preset => preset.category === category);
  }

  static getCategories(): string[] {
    const categories = new Set(this.presets.map(preset => preset.category));
    return Array.from(categories).sort();
  }

  static getPresetById(id: string): RhythmPreset | undefined {
    return this.presets.find(preset => preset.id === id);
  }

  static getPresetsForTimeSignature(timeSignature: TimeSignature): RhythmPreset[] {
    return this.presets.filter(preset => 
      preset.pattern.timeSignature.label === timeSignature.label
    );
  }

  static getPresetsForSubdivision(subdivision: Subdivision): RhythmPreset[] {
    return this.presets.filter(preset => 
      preset.pattern.subdivision.name === subdivision.name
    );
  }
} 