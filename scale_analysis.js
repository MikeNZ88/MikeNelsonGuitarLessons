// Comprehensive Scale Analysis Script
// This will generate all scale spellings for every mode in every key

// Import the scale calculator (simulated for analysis)
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
    
    // Pentatonic scales
    'major-pentatonic': [2, 2, 3, 2, 3],
    'suspended-pentatonic': [2, 3, 2, 3, 2],
    'man-gong': [3, 2, 3, 2, 2],
    'ritusen': [2, 3, 2, 2, 3],
    'minor-pentatonic': [3, 2, 2, 3, 2],
    
    // Blues scales
    'blues-major': [2, 1, 1, 3, 2, 3],
    'blues-minor': [3, 2, 1, 1, 3, 2],
    
    // Diminished modes
    'wh-diminished': [2, 1, 2, 1, 2, 1, 2, 1],
    'hw-diminished': [1, 2, 1, 2, 1, 2, 1, 2],
    
    // Whole tone scales
    'whole-tone-1': [2, 2, 2, 2, 2, 2],
    'whole-tone-2': [2, 2, 2, 2, 2, 2],
    'whole-tone-3': [2, 2, 2, 2, 2, 2],
    'whole-tone-4': [2, 2, 2, 2, 2, 2],
    'whole-tone-5': [2, 2, 2, 2, 2, 2],
    'whole-tone-6': [2, 2, 2, 2, 2, 2],
    
    // Chromatic
    'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
};

// All 12 root notes
const allRoots = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Simplified scale calculation (scale degree logic)
function calculateScaleSpelling(root, formula, scaleType = 'major') {
    const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    const noteToIndex = (note) => {
        const map = {
            'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
            'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
            'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10,
            'B#': 0, 'Cb': 11, 'E#': 5, 'Fb': 4
        };
        return map[note];
    };

    const rootNoteName = root.charAt(0);
    const rootNoteIndex = noteNames.indexOf(rootNoteName);
    const rootChromaticIndex = noteToIndex(root);
    
    if (rootNoteIndex === -1 || rootChromaticIndex === undefined) {
        return [`ERROR: Invalid root ${root}`];
    }

    const scale = [root];
    let currentChromaticIndex = rootChromaticIndex;
    
    for (let i = 0; i < formula.length - 1; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        
        const scaleDegreeIndex = (rootNoteIndex + i + 1) % 7;
        const baseNoteName = noteNames[scaleDegreeIndex];
        const baseNoteChromatic = noteToIndex(baseNoteName);
        
        const chromaticDifference = (currentChromaticIndex - baseNoteChromatic + 12) % 12;
        
        let noteName;
        if (chromaticDifference === 0) {
            noteName = baseNoteName;
        } else if (chromaticDifference === 1) {
            noteName = baseNoteName + '#';
        } else if (chromaticDifference === 11) {
            noteName = baseNoteName + 'b';
        } else if (chromaticDifference === 2) {
            noteName = baseNoteName + '##';
        } else if (chromaticDifference === 10) {
            noteName = baseNoteName + 'bb';
        } else {
            // Fallback for extreme cases
            const chromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
            noteName = chromatic[currentChromaticIndex] + '(!)';
        }
        
        scale.push(noteName);
    }
    
    // Apply post-processing for melodic minor modes
    if (['melodic-minor', 'dorian-b2', 'lydian-augmented', 'lydian-dominant', 'mixolydian-b6', 'locrian-natural-2'].includes(scaleType)) {
        for (let i = 0; i < scale.length; i++) {
            const note = scale[i];
            
            // Convert problematic enharmonics
            if (note === 'B#') scale[i] = 'C';
            if (note === 'E#') scale[i] = 'F';
            if (note === 'Cb') scale[i] = 'B';
            if (note === 'Fb') scale[i] = 'E';
            
            // Convert double sharps
            const doubleSharpMap = {
                'C##': 'D', 'D##': 'E', 'E##': 'F#', 'F##': 'G', 'G##': 'A', 'A##': 'B', 'B##': 'C#'
            };
            if (doubleSharpMap[note]) {
                scale[i] = doubleSharpMap[note];
            }
            
            // Prefer flats for melodic minor readability
            if (root !== 'F#' && note === 'A#') {
                scale[i] = 'Bb';
            }
        }
    }
    
    return scale;
}

// Generate intervals from scale
function calculateIntervals(rootNote, scaleNotes) {
    const chromaticMap = {
        'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'E#': 5, 'Fb': 4,
        'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10,
        'B': 11, 'B#': 0, 'Cb': 11
    };
    
    const rootChromatic = chromaticMap[rootNote];
    const intervals = [];
    
    for (const note of scaleNotes) {
        const noteChromatic = chromaticMap[note] || 0;
        const interval = (noteChromatic - rootChromatic + 12) % 12;
        intervals.push(interval);
    }
    
    return intervals;
}

// Generate analysis for all scales
function generateCompleteAnalysis() {
    const results = {};
    
    for (const scaleType of Object.keys(scaleFormulas)) {
        results[scaleType] = {};
        
        for (const root of allRoots) {
            const formula = scaleFormulas[scaleType];
            const scale = calculateScaleSpelling(root, formula, scaleType);
            const intervals = calculateIntervals(root, scale);
            
            results[scaleType][root] = {
                notes: scale,
                intervals: intervals,
                formula: formula
            };
        }
    }
    
    return results;
}

// Format output for analysis
function formatAnalysisOutput() {
    const analysis = generateCompleteAnalysis();
    let output = "COMPREHENSIVE SCALE SPELLING ANALYSIS\n";
    output += "=====================================\n\n";
    
    // Group by scale categories
    const categories = {
        'Major Modes': ['major', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'],
        'Harmonic Minor Modes': ['harmonic-minor', 'locrian-natural-6', 'ionian-sharp-5', 'dorian-sharp-4', 'phrygian-dominant', 'lydian-sharp-2', 'altered-dominant'],
        'Melodic Minor Modes': ['melodic-minor', 'dorian-b2', 'lydian-augmented', 'lydian-dominant', 'mixolydian-b6', 'locrian-natural-2', 'super-locrian'],
        'Pentatonic Modes': ['major-pentatonic', 'suspended-pentatonic', 'man-gong', 'ritusen', 'minor-pentatonic'],
        'Blues Scales': ['blues-major', 'blues-minor'],
        'Diminished Modes': ['wh-diminished', 'hw-diminished'],
        'Whole Tone': ['whole-tone-1', 'whole-tone-2', 'whole-tone-3', 'whole-tone-4', 'whole-tone-5', 'whole-tone-6'],
        'Chromatic': ['chromatic']
    };
    
    for (const [categoryName, scales] of Object.entries(categories)) {
        output += `\n${categoryName.toUpperCase()}\n`;
        output += "=".repeat(categoryName.length) + "\n\n";
        
        for (const scaleType of scales) {
            if (!analysis[scaleType]) continue;
            
            output += `${scaleType.toUpperCase()}\n`;
            output += "-".repeat(scaleType.length) + "\n";
            
            for (const root of allRoots) {
                const data = analysis[scaleType][root];
                const notesStr = data.notes.join(', ');
                const intervalsStr = data.intervals.join(', ');
                
                // Flag problematic spellings
                const hasDoubleAccidentals = data.notes.some(note => note.includes('##') || note.includes('bb'));
                const hasProblematicEnharmonics = data.notes.some(note => ['B#', 'E#', 'Cb', 'Fb'].includes(note));
                const hasErrors = data.notes.some(note => note.includes('(!)'));
                
                let flag = '';
                if (hasErrors) flag = ' ❌ ERROR';
                else if (hasDoubleAccidentals) flag = ' ⚠️ DOUBLE';
                else if (hasProblematicEnharmonics) flag = ' ⚠️ ENHARMONIC';
                
                output += `${root.padEnd(3)}: ${notesStr}${flag}\n`;
                output += `     Intervals: ${intervalsStr}\n`;
            }
            output += "\n";
        }
    }
    
    return output;
}

// Run the analysis
console.log(formatAnalysisOutput()); 