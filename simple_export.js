// Simple Scale Export Script - Generates comprehensive scale spelling report
// Run with: node simple_export.js > scale_report.txt

// All 12 root notes
const allRoots = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Scale formulas from your constants
const scaleFormulas = {
    // Major modes
    'major': [2, 2, 1, 2, 2, 2, 1],
    'dorian': [2, 1, 2, 2, 2, 1, 2],
    'phrygian': [1, 2, 2, 2, 1, 2, 2],
    'lydian': [2, 2, 2, 1, 2, 2, 1],
    'mixolydian': [2, 2, 1, 2, 2, 1, 2],
    'aeolian': [2, 1, 2, 2, 1, 2, 2],
    'locrian': [1, 2, 2, 1, 2, 2, 2],
    
    // Harmonic Minor modes
    'harmonic-minor': [2, 1, 2, 2, 1, 3, 1],
    'locrian-natural-6': [1, 2, 2, 1, 3, 1, 2],
    'ionian-sharp-5': [2, 2, 1, 3, 1, 2, 1],
    'dorian-sharp-4': [2, 1, 3, 1, 2, 1, 2],
    'phrygian-dominant': [1, 3, 1, 2, 1, 2, 2],
    'lydian-sharp-2': [3, 1, 2, 1, 2, 2, 1],
    'altered-dominant': [1, 2, 1, 2, 2, 1, 3],
    
    // Melodic Minor modes
    'melodic-minor': [2, 1, 2, 2, 2, 2, 1],
    'dorian-b2': [1, 2, 2, 2, 2, 1, 2],
    'lydian-augmented': [2, 2, 2, 2, 1, 2, 1],
    'lydian-dominant': [2, 2, 2, 1, 2, 1, 2],
    'mixolydian-b6': [2, 2, 1, 2, 1, 2, 2],
    'locrian-natural-2': [2, 1, 2, 1, 2, 2, 2],
    'super-locrian': [1, 2, 1, 2, 2, 2, 2],
    
    // Diminished modes
    'wh-diminished': [2, 1, 2, 1, 2, 1, 2, 1],
    'hw-diminished': [1, 2, 1, 2, 1, 2, 1, 2],
    
    // Pentatonic scales
    'major-pentatonic': [2, 2, 3, 2, 3],
    'suspended-pentatonic': [2, 3, 2, 3, 2],
    'man-gong': [3, 2, 3, 2, 2],
    'ritusen': [2, 3, 2, 2, 3],
    'minor-pentatonic': [3, 2, 2, 3, 2],
    
    // Whole tone scales
    'whole-tone-1': [2, 2, 2, 2, 2, 2],
    'whole-tone-2': [2, 2, 2, 2, 2, 2],
    'whole-tone-3': [2, 2, 2, 2, 2, 2],
    'whole-tone-4': [2, 2, 2, 2, 2, 2],
    'whole-tone-5': [2, 2, 2, 2, 2, 2],
    'whole-tone-6': [2, 2, 2, 2, 2, 2],
    
    // Blues scales
    'blues-major': [2, 1, 1, 3, 2, 3],
    'blues-minor': [3, 2, 1, 1, 3, 2],
    
    // Other scales
    'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
};

// Scale categories
const scaleCategories = {
    'major-modes': {
        name: 'Major',
        description: 'The seven modes of the major scale',
        modes: ['major', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']
    },
    'harmonic-minor-modes': {
        name: 'Harmonic Minor',
        description: 'The seven modes of the harmonic minor scale',
        modes: ['harmonic-minor', 'locrian-natural-6', 'ionian-sharp-5', 'dorian-sharp-4', 'phrygian-dominant', 'lydian-sharp-2', 'altered-dominant']
    },
    'melodic-minor-modes': {
        name: 'Melodic Minor',
        description: 'The seven modes of the melodic minor scale',
        modes: ['melodic-minor', 'dorian-b2', 'lydian-augmented', 'lydian-dominant', 'mixolydian-b6', 'locrian-natural-2', 'super-locrian']
    },
    'diminished-modes': {
        name: 'Octatonic/Diminished',
        description: 'Two complementary eight-note symmetrical scales',
        modes: ['wh-diminished', 'hw-diminished']
    },
    'pentatonic': {
        name: 'Pentatonic',
        description: 'The five modes of the major pentatonic scale',
        modes: ['major-pentatonic', 'suspended-pentatonic', 'man-gong', 'ritusen', 'minor-pentatonic']
    },
    'whole-tone': {
        name: 'Whole Tone',
        description: 'Six-note scale of equal whole steps',
        modes: ['whole-tone-1', 'whole-tone-2', 'whole-tone-3', 'whole-tone-4', 'whole-tone-5', 'whole-tone-6']
    },
    'blues-scales': {
        name: 'Blues',
        description: 'Six-note blues scales with added chromatic notes',
        modes: ['blues-major', 'blues-minor']
    },
    'chromatic-scale': {
        name: 'Chromatic',
        description: 'All twelve notes in western music',
        modes: ['chromatic']
    }
};

// Simple scale calculation function
function calculateScale(rootNote, formula, scaleType) {
    const chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const letterNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    const rootIndex = chromaticScale.indexOf(rootNote);
    const rootLetterIndex = letterNames.indexOf(rootNote[0]);
    
    let scale = [rootNote];
    let currentChromaticIndex = rootIndex;
    
    // Apply formula
    for (let i = 0; i < formula.length - 1; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        const targetLetterIndex = (rootLetterIndex + i + 1) % 7;
        const targetLetter = letterNames[targetLetterIndex];
        
        // Find the chromatic note that matches the target letter
        let noteName = targetLetter;
        const letterToChromatic = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11};
        const naturalChromaticIndex = letterToChromatic[targetLetter];
        const diff = (currentChromaticIndex - naturalChromaticIndex + 12) % 12;
        
        if (diff === 0) {
            noteName = targetLetter;
        } else if (diff === 1) {
            noteName = targetLetter + '#';
        } else if (diff === 11) {
            noteName = targetLetter + 'b';
        } else if (diff === 2) {
            noteName = targetLetter + '##';
        } else if (diff === 10) {
            noteName = targetLetter + 'bb';
        } else {
            // Fallback to chromatic
            noteName = chromaticScale[currentChromaticIndex];
        }
        
        scale.push(noteName);
    }
    
    // Apply post-processing for specific scale types
    if (['melodic-minor', 'dorian-b2', 'lydian-augmented', 'lydian-dominant', 
         'mixolydian-b6', 'locrian-natural-2', 'harmonic-minor', 'locrian-natural-6',
         'ionian-sharp-5', 'dorian-sharp-4', 'phrygian-dominant', 'lydian-sharp-2', 
         'altered-dominant'].includes(scaleType)) {
        scale = scale.map(note => {
            if (note.includes('##')) {
                const enharmonics = {'C##': 'D', 'D##': 'E', 'E##': 'F#', 'F##': 'G', 'G##': 'A', 'A##': 'B', 'B##': 'C#'};
                return enharmonics[note] || note;
            }
            if (note.includes('bb')) {
                const enharmonics = {'Dbb': 'C', 'Ebb': 'D', 'Fbb': 'Eb', 'Gbb': 'F', 'Abb': 'G', 'Bbb': 'A', 'Cbb': 'Bb'};
                return enharmonics[note] || note;
            }
            if (note === 'B#') return 'C';
            if (note === 'E#') return 'F';
            if (note === 'Cb') return 'B';
            if (note === 'Fb') return 'E';
            return note;
        });
    }
    
    return scale;
}

// Function to generate intervals from scale notes
function generateIntervals(scaleNotes, rootNote) {
    const chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const rootIndex = chromaticScale.indexOf(rootNote);
    const intervals = [];
    
    for (let note of scaleNotes) {
        let noteIndex = chromaticScale.indexOf(note);
        if (noteIndex === -1) {
            // Handle enharmonic equivalents
            const enharmonics = {
                'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
                'B#': 'C', 'E#': 'F', 'Cb': 'B', 'Fb': 'E'
            };
            if (enharmonics[note]) {
                noteIndex = chromaticScale.indexOf(enharmonics[note]);
            }
        }
        
        if (noteIndex !== -1) {
            let interval = (noteIndex - rootIndex + 12) % 12;
            const intervalNames = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
            intervals.push(intervalNames[interval]);
        } else {
            intervals.push('?');
        }
    }
    
    return intervals;
}

// Generate comprehensive report
function generateCompleteReport() {
    let report = `COMPREHENSIVE SCALE SPELLING REPORT
Generated: ${new Date().toLocaleString()}
=====================================

This report contains all scale spellings and their related modes across all 12 keys.
Each scale shows: Root | Scale Notes | Intervals

`;

    // Process each scale category
    Object.entries(scaleCategories).forEach(([categoryKey, category]) => {
        report += `\n${'='.repeat(70)}\n`;
        report += `${category.name.toUpperCase()} - ${category.description}\n`;
        report += `${'='.repeat(70)}\n`;

        // Process each mode in the category
        category.modes.forEach(scaleType => {
            report += `\n${'-'.repeat(50)}\n`;
            report += `${scaleType.toUpperCase().replace(/-/g, ' ')}\n`;
            report += `${'-'.repeat(50)}\n`;

            // Process each root note
            allRoots.forEach(root => {
                try {
                    const scaleResult = calculateScale(root, scaleFormulas[scaleType], scaleType);
                    const intervals = generateIntervals(scaleResult, root);
                    
                    report += `${root.padEnd(3)} | ${scaleResult.join(' - ').padEnd(40)} | ${intervals.join(' ')}\n`;
                } catch (error) {
                    report += `${root.padEnd(3)} | ERROR: ${error.message}\n`;
                }
            });
        });
    });

    // Add summary section
    report += `\n\n${'='.repeat(70)}\n`;
    report += `SUMMARY\n`;
    report += `${'='.repeat(70)}\n`;
    report += `Total Scale Categories: ${Object.keys(scaleCategories).length}\n`;
    report += `Total Scale Types: ${Object.values(scaleCategories).reduce((sum, cat) => sum + cat.modes.length, 0)}\n`;
    report += `Total Combinations: ${Object.values(scaleCategories).reduce((sum, cat) => sum + cat.modes.length, 0) * 12}\n`;

    // Add category breakdown
    report += `\nCategory Breakdown:\n`;
    Object.entries(scaleCategories).forEach(([key, category]) => {
        report += `  ${category.name}: ${category.modes.length} modes\n`;
    });

    report += `\nNote: This report shows the current spelling logic implementation.\n`;
    report += `Look for any unusual double accidentals or awkward enharmonic spellings.\n`;
    report += `Scales with post-processing applied: Harmonic Minor and Melodic Minor modes.\n`;

    return report;
}

// Generate and output the report
try {
    const report = generateCompleteReport();
    console.log(report);
} catch (error) {
    console.error('Error generating report:', error);
    process.exit(1);
} 