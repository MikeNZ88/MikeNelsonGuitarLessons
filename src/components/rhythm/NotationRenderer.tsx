'use client';

import { useEffect, useRef } from 'react';
import { RhythmPattern } from '../../utils/audio/rhythmEngine';

interface NotationRendererProps {
  pattern: RhythmPattern;
  width: number;
  height?: number;
}

export default function NotationRenderer({ pattern, width, height = 120 }: NotationRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add timeout to ensure DOM element is fully mounted
    const timeoutId = setTimeout(() => {
      const loadVexFlow = async () => {
        try {
          // Ensure container is available and is a proper HTMLDivElement
          if (!containerRef.current || !(containerRef.current instanceof HTMLDivElement)) {
            console.warn('Container not ready for VexFlow rendering');
            return;
          }

          // Clear previous content
          containerRef.current.innerHTML = '';
          
          // Dynamically import VexFlow
          const { Renderer, Stave, StaveNote, Voice, Formatter, Beam, Tuplet, Dot } = await import('vexflow');
          
          // Calculate dimensions with extra space for complex patterns
          let adjustedWidth = width;
          let adjustedHeight = height;
          
          // Extra height for 16th note patterns to prevent cutoff
          if (pattern.subdivision.name === 'Sixteenth Notes' || pattern.subdivision.name === 'Mixed Notes') {
            adjustedWidth = Math.max(500, width); // Minimum 500px for 16th notes
            adjustedHeight = Math.max(140, height);
          } else if (pattern.subdivision.name === 'Eighth Notes' || pattern.subdivision.name === 'Eighth Triplets') {
            adjustedWidth = Math.max(480, width); // Minimum 480px for 8th notes
            adjustedHeight = Math.max(140, height);
          }
          
          // Verify container is still valid before creating renderer
          if (!containerRef.current || !(containerRef.current instanceof HTMLDivElement)) {
            console.warn('Container became invalid during VexFlow setup');
            return;
          }
          
          // Create renderer with proper error handling
          const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
          renderer.resize(adjustedWidth, adjustedHeight);
          const context = renderer.getContext();

          // Create stave with appropriate width
          const staveWidth = adjustedWidth - 80; // Leave more padding on both sides
          const stave = new Stave(20, 10, staveWidth);
          
          // Add time signature
          stave.addTimeSignature(pattern.timeSignature.label);
          
          // Draw the stave
          stave.setContext(context).draw();

          // Create notes based on the pattern
          const { notes, beams, tuplets } = createNotesForMeasure(pattern, StaveNote, Beam, Tuplet, Dot);
          
          if (notes.length > 0) {
            // Create a voice and add the notes
            const voice = new Voice({ 
              numBeats: pattern.timeSignature.beats, 
              beatValue: pattern.timeSignature.beatType 
            });
            voice.addTickables(notes);

            // Format and draw with more space for complex patterns
            const formatterWidth = staveWidth - 80; // Leave more space for time signature and notes
            new Formatter().joinVoices([voice]).format([voice], formatterWidth);
            voice.draw(context, stave);

            // Draw beams for connected notes
            beams.forEach(beam => beam.setContext(context).draw());
            
            // Draw tuplets for triplet patterns
            tuplets.forEach(tuplet => tuplet.setContext(context).draw());
          }

        } catch (error) {
          console.error('Error rendering notation:', error);
          // Fallback message
          if (containerRef.current) {
            containerRef.current.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Musical notation temporarily unavailable</div>';
          }
        }
      };

      loadVexFlow();
    }, 100); // 100ms delay to ensure DOM is ready

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [pattern, width, height]);

  return (
    <div 
      ref={containerRef} 
      className="notation-container border border-gray-200 rounded-lg bg-white p-4 overflow-x-auto"
      style={{ minHeight: height, minWidth: '100%' }}
    />
  );
}

function createNotesForMeasure(pattern: RhythmPattern, StaveNote: any, Beam: any, Tuplet: any, Dot: any): { notes: any[], beams: any[], tuplets: any[] } {
  try {
    const timeSignature = pattern.timeSignature;
    const notes: any[] = [];
    const beams: any[] = [];
    const tuplets: any[] = [];

    // Check if pattern contains rests (notes with velocity 0)
    const hasRests = pattern.notes.some(note => note.velocity === 0);
    
    if (hasRests) {
      // Handle patterns with rests
      const quarterNoteUnits = pattern.totalUnits / timeSignature.beats;
      
      for (const note of pattern.notes) {
        const duration = note.duration;
        const isRest = note.velocity === 0;
        
        if (duration >= quarterNoteUnits * 2) {
          // Half note or half rest (2 beats)
          if (isRest) {
            notes.push(new StaveNote({ keys: ['b/4'], duration: 'hr' }));
          } else {
            notes.push(new StaveNote({ keys: ['b/4'], duration: 'h' }));
          }
        } else if (duration >= quarterNoteUnits) {
          // Quarter note or quarter rest (1 beat)
          if (isRest) {
            notes.push(new StaveNote({ keys: ['b/4'], duration: 'qr' }));
          } else {
            notes.push(new StaveNote({ keys: ['b/4'], duration: 'q' }));
          }
        } else if (duration >= quarterNoteUnits / 2) {
          // Eighth note or eighth rest
          if (isRest) {
            notes.push(new StaveNote({ keys: ['b/4'], duration: '8r' }));
          } else {
            notes.push(new StaveNote({ keys: ['b/4'], duration: '8' }));
          }
        } else if (duration >= quarterNoteUnits / 4) {
          // Sixteenth note or sixteenth rest
          if (isRest) {
            notes.push(new StaveNote({ keys: ['b/4'], duration: '16r' }));
          } else {
            notes.push(new StaveNote({ keys: ['b/4'], duration: '16' }));
          }
        }
      }
      
      // Simple beaming for consecutive non-rest eighth and sixteenth notes
      createBeamsForConsecutiveNotes(notes, beams, Beam);
      
      return { notes, beams, tuplets };
    }

    // Special handling for different time signatures
    if (timeSignature.label === '6/8') {
      for (let i = 0; i < 6; i++) {
        notes.push(new StaveNote({ keys: ['b/4'], duration: '8' }));
      }
      // Beam in two groups of 3 (standard 6/8 beaming)
      if (notes.length >= 6) {
        beams.push(new Beam(notes.slice(0, 3)));
        beams.push(new Beam(notes.slice(3, 6)));
      }
      return { notes, beams, tuplets };
    }

    if (timeSignature.label === '7/8') {
      for (let i = 0; i < 7; i++) {
        notes.push(new StaveNote({ keys: ['b/4'], duration: '8' }));
      }
      // Beam in groups of 3+2+2 (common 7/8 beaming pattern)
      if (notes.length >= 7) {
        beams.push(new Beam(notes.slice(0, 3)));
        beams.push(new Beam(notes.slice(3, 5)));
        beams.push(new Beam(notes.slice(5, 7)));
      }
      return { notes, beams, tuplets };
    }

    if (timeSignature.label === '9/8') {
      for (let i = 0; i < 9; i++) {
        notes.push(new StaveNote({ keys: ['b/4'], duration: '8' }));
      }
      // Beam in three groups of 3 (standard 9/8 beaming)
      if (notes.length >= 9) {
        beams.push(new Beam(notes.slice(0, 3)));
        beams.push(new Beam(notes.slice(3, 6)));
        beams.push(new Beam(notes.slice(6, 9)));
      }
      return { notes, beams, tuplets };
    }

    // Handle different pattern types
    const quarterNoteUnits = pattern.totalUnits / timeSignature.beats;

    // Handle triplet patterns first
    if (pattern.subdivision.name === 'Eighth Note Triplets') {
      if (pattern.notes.length === 12) {
        // Pure eighth note triplets: 4 groups of 3
        for (let i = 0; i < 12; i++) {
          notes.push(new StaveNote({ keys: ['b/4'], duration: '8' }));
        }
        
        // Create triplet groups
        for (let i = 0; i < 12; i += 3) {
          const tripletNotes = notes.slice(i, i + 3);
          if (tripletNotes.length === 3) {
            const tuplet = new Tuplet(tripletNotes);
            tuplets.push(tuplet);
            const beam = new Beam(tripletNotes);
            beams.push(beam);
          }
        }
      }
      return { notes, beams, tuplets };
    }

    if (pattern.subdivision.name === 'Sixteenth Note Triplets' || pattern.subdivision.name === 'Sixteenth Triplets') {
      if (pattern.notes.length === 24) {
        // Pure sixteenth note triplets
        for (let i = 0; i < 24; i++) {
          notes.push(new StaveNote({ keys: ['b/4'], duration: '16' }));
        }
        
        // Create triplet groups of 3 sixteenth notes each
        for (let i = 0; i < 24; i += 3) {
          const tripletNotes = notes.slice(i, i + 3);
          if (tripletNotes.length === 3) {
            const tuplet = new Tuplet(tripletNotes);
            tuplets.push(tuplet);
            const beam = new Beam(tripletNotes);
            beams.push(beam);
          }
        }
      }
      return { notes, beams, tuplets };
    }

    // Handle mixed patterns that may contain triplets
    if (pattern.subdivision.name === 'Mixed') {
      // Check for "Quarter + Eighth Triplet" pattern
      if (pattern.notes.length === 6) {
        const firstNote = pattern.notes[0];
        
        if (firstNote.duration === 12) {
          // Add quarter note
          notes.push(new StaveNote({ keys: ['b/4'], duration: 'q' }));
          
          // Check if next 3 notes are triplets (duration 4 each)
          const tripletNotes = pattern.notes.slice(1, 4);
          if (tripletNotes.every(n => n.duration === 4)) {
            // Create triplet eighth notes  
            const tripletVFNotes = [];
            for (let i = 0; i < 3; i++) {
              const tripletNote = new StaveNote({ keys: ['b/4'], duration: '8' });
              tripletVFNotes.push(tripletNote);
              notes.push(tripletNote);
            }
            
            // Create the tuplet grouping and beam
            if (tripletVFNotes.length === 3) {
              const tuplet = new Tuplet(tripletVFNotes);
              tuplets.push(tuplet);
              const beam = new Beam(tripletVFNotes);
              beams.push(beam);
            }
            
            // Fill remaining beats with quarter notes
            notes.push(new StaveNote({ keys: ['b/4'], duration: 'q' }));
            notes.push(new StaveNote({ keys: ['b/4'], duration: 'q' }));
          }
        }
      }
      return { notes, beams, tuplets };
    }

    // Standard note creation for non-triplet patterns
    for (const note of pattern.notes) {
      const duration = note.duration;
      
      if (duration >= quarterNoteUnits * 4) {
        // Whole note
        notes.push(new StaveNote({ keys: ['b/4'], duration: 'w' }));
      } else if (duration >= quarterNoteUnits * 2) {
        // Half note
        notes.push(new StaveNote({ keys: ['b/4'], duration: 'h' }));
      } else if (duration >= quarterNoteUnits * 1.5) {
        // Dotted quarter note
        const dottedNote = new StaveNote({ keys: ['b/4'], duration: 'q' });
        Dot.buildAndAttach([dottedNote]);
        notes.push(dottedNote);
      } else if (duration >= quarterNoteUnits) {
        // Quarter note
        notes.push(new StaveNote({ keys: ['b/4'], duration: 'q' }));
      } else if (duration >= quarterNoteUnits / 2) {
        // Eighth note
        notes.push(new StaveNote({ keys: ['b/4'], duration: '8' }));
      } else if (duration >= quarterNoteUnits / 4) {
        // Sixteenth note
        notes.push(new StaveNote({ keys: ['b/4'], duration: '16' }));
      }
    }

    // Fill remaining duration with rests if needed
    const totalDuration = calculateNoteDuration(notes);
    const remaining = timeSignature.beats - totalDuration;
    
    if (remaining >= 2) {
      notes.push(new StaveNote({ keys: ['b/4'], duration: 'hr' }));
    } else if (remaining >= 1) {
      notes.push(new StaveNote({ keys: ['b/4'], duration: 'qr' }));
    } else if (remaining >= 0.5) {
      notes.push(new StaveNote({ keys: ['b/4'], duration: '8r' }));
    } else if (remaining > 0) {
      notes.push(new StaveNote({ keys: ['b/4'], duration: '16r' }));
    }

    // Create beams for consecutive eighth and sixteenth notes
    createBeamsForConsecutiveNotes(notes, beams, Beam);

    return { notes, beams, tuplets };

  } catch (error) {
    console.error('Error creating notes:', error);
    
    // Emergency fallback
    const notes: any[] = [];
    for (let i = 0; i < pattern.timeSignature.beats; i++) {
      notes.push(new StaveNote({ keys: ['b/4'], duration: 'qr' }));
    }
    return { notes, beams: [], tuplets: [] };
  }
}

// Helper function to create beams for consecutive eighth and sixteenth notes
function createBeamsForConsecutiveNotes(notes: any[], beams: any[], Beam: any) {
  let i = 0;
  while (i < notes.length) {
    const currentNote = notes[i];
    const currentDuration = currentNote.getDuration();
    
    // Look for consecutive beamable notes (eighth and sixteenth notes, not rests)
    if ((currentDuration === '8' || currentDuration === '16') && !currentDuration.includes('r')) {
      const beamGroup = [currentNote];
      let j = i + 1;
      
      // Collect consecutive beamable notes
      while (j < notes.length) {
        const nextNote = notes[j];
        const nextDuration = nextNote.getDuration();
        
        // Continue beam if it's an eighth or sixteenth note (not rest)
        if ((nextDuration === '8' || nextDuration === '16') && !nextDuration.includes('r')) {
          beamGroup.push(nextNote);
          j++;
        } else {
          break; // Quarter note, rest, or different duration breaks the beam
        }
      }
      
      // Only create beam if we have 2 or more notes
      if (beamGroup.length >= 2) {
        try {
          beams.push(new Beam(beamGroup));
        } catch (beamError) {
          console.error('Error creating beam:', beamError);
        }
      }
      
      i = j; // Skip the notes we just processed
    } else {
      i++; // Move to next note
    }
  }
}

// Helper function to calculate total duration of notes
function calculateNoteDuration(notes: any[]): number {
  return notes.reduce((sum, note) => {
    const dur = note.getDuration();
    // Check if note has dots
    const hasDots = note.getModifiers && note.getModifiers().some((mod: any) => mod.category === 'dots');
    
    if (dur === 'w') return sum + 4;
    if (dur === 'h') return sum + 2;
    if (dur === 'q' && hasDots) return sum + 1.5; // Dotted quarter
    if (dur === 'q') return sum + 1;
    if (dur === '8') return sum + 0.5;
    if (dur === '16') return sum + 0.25;
    return sum;
  }, 0);
}

 