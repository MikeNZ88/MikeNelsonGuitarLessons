export interface TimeSignature {
  beats: number;
  beatType: number;
  label: string;
}

export interface Subdivision {
  name: string;
  value: number;
  isTriplet: boolean;
  unitsPerNote: number;
}

export interface RhythmNote {
  startPosition: number; // Position in base units (0-based)
  duration: number; // Duration in base units
  velocity: number; // 0-1
}

export interface RhythmPattern {
  timeSignature: TimeSignature;
  subdivision: Subdivision;
  notes: RhythmNote[];
  totalUnits: number;
}

export class RhythmEngine {
  private static readonly BASE_UNITS_PER_QUARTER = 48; // LCM of common subdivisions

  static readonly TIME_SIGNATURES: TimeSignature[] = [
    { beats: 4, beatType: 4, label: "4/4" },
    { beats: 3, beatType: 4, label: "3/4" },
    { beats: 6, beatType: 8, label: "6/8" },
    { beats: 5, beatType: 4, label: "5/4" },
    { beats: 7, beatType: 8, label: "7/8" },
    { beats: 9, beatType: 8, label: "9/8" },
  ];

  static readonly SUBDIVISIONS: Subdivision[] = [
    { name: "Quarter Notes", value: 4, isTriplet: false, unitsPerNote: 48 },
    { name: "Eighth Notes", value: 8, isTriplet: false, unitsPerNote: 24 },
    { name: "Eighth Triplets", value: 8, isTriplet: true, unitsPerNote: 16 },
    { name: "Sixteenth Notes", value: 16, isTriplet: false, unitsPerNote: 12 },
    { name: "Sixteenth Triplets", value: 16, isTriplet: true, unitsPerNote: 8 },
  ];

  static calculateTotalUnits(timeSignature: TimeSignature): number {
    // Convert time signature to quarter note equivalents, then to base units
    const quarterNoteEquivalents = (timeSignature.beats * 4) / timeSignature.beatType;
    return quarterNoteEquivalents * this.BASE_UNITS_PER_QUARTER;
  }

  static calculateGridCells(timeSignature: TimeSignature, subdivision: Subdivision): number {
    const totalUnits = this.calculateTotalUnits(timeSignature);
    return totalUnits / subdivision.unitsPerNote;
  }

  static getBeatDivisionLines(timeSignature: TimeSignature, subdivision: Subdivision): number[] {
    const totalCells = this.calculateGridCells(timeSignature, subdivision);
    const cellsPerBeat = totalCells / timeSignature.beats;
    
    const lines: number[] = [];
    for (let beat = 1; beat < timeSignature.beats; beat++) {
      lines.push(beat * cellsPerBeat);
    }
    return lines;
  }

  static getSubdivisionLines(timeSignature: TimeSignature, subdivision: Subdivision): number[] {
    const totalCells = this.calculateGridCells(timeSignature, subdivision);
    const cellsPerBeat = totalCells / timeSignature.beats;
    
    const lines: number[] = [];
    
    if (subdivision.isTriplet) {
      // For triplets, divide each beat into 3 parts
      for (let beat = 0; beat < timeSignature.beats; beat++) {
        const beatStart = beat * cellsPerBeat;
        for (let triplet = 1; triplet < 3; triplet++) {
          lines.push(beatStart + (triplet * cellsPerBeat / 3));
        }
      }
    } else {
      // For straight subdivisions, mark regular intervals
      const subdivisionCells = subdivision.value === 4 ? cellsPerBeat : cellsPerBeat / 2;
      for (let i = subdivisionCells; i < totalCells; i += subdivisionCells) {
        if (!this.getBeatDivisionLines(timeSignature, subdivision).includes(i)) {
          lines.push(i);
        }
      }
    }
    
    return lines;
  }

  static createEmptyPattern(timeSignature: TimeSignature, subdivision: Subdivision): RhythmPattern {
    return {
      timeSignature,
      subdivision,
      notes: [],
      totalUnits: this.calculateTotalUnits(timeSignature),
    };
  }

  static addNote(pattern: RhythmPattern, cellIndex: number, duration: number = 1): RhythmPattern {
    const startPosition = cellIndex * pattern.subdivision.unitsPerNote;
    const noteDuration = duration * pattern.subdivision.unitsPerNote;
    
    // Remove any existing notes that overlap with this position
    const filteredNotes = pattern.notes.filter(note => {
      const noteEnd = note.startPosition + note.duration;
      const newNoteEnd = startPosition + noteDuration;
      return !(note.startPosition < newNoteEnd && noteEnd > startPosition);
    });

    const newNote: RhythmNote = {
      startPosition,
      duration: noteDuration,
      velocity: 0.8,
    };

    return {
      ...pattern,
      notes: [...filteredNotes, newNote].sort((a, b) => a.startPosition - b.startPosition),
    };
  }

  static removeNote(pattern: RhythmPattern, cellIndex: number): RhythmPattern {
    const position = cellIndex * pattern.subdivision.unitsPerNote;
    
    return {
      ...pattern,
      notes: pattern.notes.filter(note => note.startPosition !== position),
    };
  }

  static toggleNote(pattern: RhythmPattern, cellIndex: number, duration: number = 1): RhythmPattern {
    const position = cellIndex * pattern.subdivision.unitsPerNote;
    const existingNote = pattern.notes.find(note => note.startPosition === position);
    
    if (existingNote) {
      return this.removeNote(pattern, cellIndex);
    } else {
      return this.addNote(pattern, cellIndex, duration);
    }
  }
} 
 