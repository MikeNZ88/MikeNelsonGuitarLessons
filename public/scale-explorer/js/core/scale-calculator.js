// Scale calculation functions for music theory
// Depends on: constants.js

// Note spelling functions
function getProperNoteSpelling(noteIndex, key, scaleType = 'major') {
    return getChromatic(noteIndex, key, scaleType);
}

// Main scale calculation functions
function calculateScale(root, formula, scaleType = 'major') {
    // Debug logging for diminished scales
    if (scaleType && scaleType.includes('diminished')) {
        console.log('calculateScale called with:', { root, formula, scaleType });
    }
    
    if (!formula || !Array.isArray(formula)) {
        console.error('Invalid formula provided to calculateScale:', formula);
        return [];
    }
    
    return calculateScaleWithDegrees(root, formula, scaleType);
}

function calculateScaleWithDegrees(root, formula, scaleType = 'major') {
    // Define the note names in order for proper scale degree calculation
    const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    // Debug logging for mixolydian scales
    if (scaleType === 'mixolydian') {
        console.log('calculateScaleWithDegrees called with:', { root, formula, scaleType });
    }
    
    // Enhanced noteToIndex function that handles double accidentals
    const noteToIndex = (note) => {
        // Handle double accidentals first
        if (note.includes('bb')) {
            const naturalNote = note.replace('bb', '');
            const naturalIndex = {
                'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
            }[naturalNote];
            return naturalIndex !== undefined ? (naturalIndex - 2 + 12) % 12 : undefined;
        } else if (note.includes('##')) {
            const naturalNote = note.replace('##', '');
            const naturalIndex = {
                'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11
            }[naturalNote];
            return naturalIndex !== undefined ? (naturalIndex + 2) % 12 : undefined;
        } else {
            // Single accidental or natural
            const singleAccidentalMap = {
                'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
                'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
                'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10,
                'B#': 0, 'Cb': 11, 'E#': 5, 'Fb': 4
            };
            return singleAccidentalMap[note];
        }
    };
    
    // Find the root note's position in the note names array
    const rootNoteName = root.charAt(0);
    const rootNoteIndex = noteNames.indexOf(rootNoteName);
    if (rootNoteIndex === -1) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    // Get the chromatic index of the root
    const rootChromaticIndex = noteToIndex(root);
    if (rootChromaticIndex === undefined) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    // Handle special scale types with predefined degree mappings
    if (scaleType === 'chromatic') {
        return calculateChromaticScale(root);
    }
    
    if (scaleType === 'pentatonic-major' || scaleType === 'pentatonic') {
        return calculatePentatonicScale(root, formula, rootNoteIndex, rootChromaticIndex, noteNames, noteToIndex, scaleType);
    }
    
    if (scaleType === 'blues') {
        return calculateBluesScale(root, formula, rootNoteIndex, rootChromaticIndex, noteNames, noteToIndex);
    }
    
    if (scaleType === 'augmented') {
        return calculateAugmentedScale(root, formula, rootChromaticIndex, noteToIndex);
    }
    
    if (scaleType === 'wh-diminished' || scaleType === 'hw-diminished') {
        return calculateDiminishedScale(root, formula, scaleType, rootNoteIndex, rootChromaticIndex, noteNames, noteToIndex);
    }
    
    if (scaleType === 'whole-tone') {
        return calculateWholeToneScale(root, formula, rootChromaticIndex);
    }
    
    // Special handling for altered scale - use chromatic spelling to allow practical enharmonics
    if (scaleType === 'super-locrian') {
        return calculateAlteredScale(root, formula, rootChromaticIndex);
    }
    
    // Calculate scale notes based on scale degrees for regular scales
    const scale = [root]; // Start with the root
    let currentChromaticIndex = rootChromaticIndex;
    
    for (let i = 0; i < formula.length - 1; i++) {
        // Move to the next chromatic position
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        
        // Calculate which scale degree this should be (2nd, 3rd, 4th, etc.)
        const scaleDegreeIndex = (rootNoteIndex + i + 1) % 7;
        const baseNoteName = noteNames[scaleDegreeIndex];
        const baseNoteChromatic = noteToIndex(baseNoteName);
        
        // Debug logging for mixolydian scales
        if (scaleType === 'mixolydian') {
            console.log(`Step ${i + 1}: chromatic=${currentChromaticIndex}, scaleDegree=${scaleDegreeIndex}, baseName=${baseNoteName}, baseChromaticIndex=${baseNoteChromatic}`);
        }
        
        // Calculate the difference between where we are and where the base note is
        const chromaticDifference = (currentChromaticIndex - baseNoteChromatic + 12) % 12;
        
        let noteName;
        if (chromaticDifference === 0) {
            // Perfect match - use the natural note
            noteName = baseNoteName;
        } else if (chromaticDifference === 1) {
            // One semitone up - use sharp
            noteName = baseNoteName + '#';
        } else if (chromaticDifference === 11) {
            // One semitone down - use flat
            noteName = baseNoteName + 'b';
        } else if (chromaticDifference === 2) {
            // Two semitones up - use double sharp (very rare)
            noteName = baseNoteName + '##';
        } else if (chromaticDifference === 10) {
            // Two semitones down - use double flat (very rare)
            noteName = baseNoteName + 'bb';
        } else {
            // This shouldn't happen in normal scales, fallback to chromatic
            noteName = getChromatic(currentChromaticIndex, root, scaleType);
        }
        
        if (scaleType === 'mixolydian') {
            console.log(`  -> noteName: ${noteName}`);
        }
        
        scale.push(noteName);
    }
    
    // Post-process for readability in specific scale types
    if (scaleType === 'melodic-minor' || scaleType === 'dorian-b2' || scaleType === 'lydian-augmented' || 
        scaleType === 'lydian-dominant' || scaleType === 'mixolydian-b6' || scaleType === 'locrian-natural-2' ||
        scaleType === 'harmonic-minor' || scaleType === 'locrian-natural-6' || scaleType === 'ionian-sharp-5' || 
        scaleType === 'dorian-sharp-4' || scaleType === 'phrygian-dominant' || scaleType === 'lydian-sharp-2' || 
        scaleType === 'altered-dominant') {
        // For melodic minor, harmonic minor and their modes, convert problematic double accidentals to readable enharmonics
        for (let i = 0; i < scale.length; i++) {
            const note = scale[i];
            
            // Convert double sharps to more readable enharmonics
            if (note.includes('##')) {
                const enharmonicMap = {
                    'C##': 'D', 'D##': 'E', 'E##': 'F#', 'F##': 'G', 'G##': 'A', 'A##': 'B', 'B##': 'C#'
                };
                if (enharmonicMap[note]) {
                    scale[i] = enharmonicMap[note];
                }
            }
            
            // Convert double flats to more readable enharmonics (major fix for harmonic minor)
            if (note.includes('bb')) {
                const enharmonicMap = {
                    'Cbb': 'Bb', 'Dbb': 'C', 'Ebb': 'D', 'Fbb': 'Eb', 'Gbb': 'F', 'Abb': 'G', 'Bbb': 'A'
                };
                if (enharmonicMap[note]) {
                    scale[i] = enharmonicMap[note];
                }
            }
            
            // Convert problematic enharmonic equivalents to natural notes
            if (note === 'B#') {
                scale[i] = 'C';
            }
            if (note === 'E#') {
                scale[i] = 'F';
            }
            if (note === 'Cb') {
                scale[i] = 'B';
            }
            if (note === 'Fb') {
                scale[i] = 'E';
            }
            
            // For specific cases, prefer flats over sharps for minor scale readability
            // But preserve F# for F# keys and other sharp keys
            const sharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
            if (!sharpKeys.includes(root) && note === 'A#') {
                scale[i] = 'Bb';
            }
        }
    }

    if (scaleType === 'mixolydian') {
        console.log('Final scale:', scale);
    }
    
    return scale;
}

function calculatePentatonicScale(root, formula, rootNoteIndex, rootChromaticIndex, noteNames, noteToIndex, scaleType) {
    // Simpler approach: Just use the formula directly with proper key signature spelling
    const scale = [root];
    let currentChromaticIndex = rootChromaticIndex;
    
    // Determine spelling convention based on the root note and scale type
    const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];
    const sharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
    
    let spellingConvention;
    
    // Special handling for blues scales - always prefer flats for altered notes
    if (formula.length === 6 || scaleType === 'blues' || scaleType.includes('blues')) {
        spellingConvention = 'flat';
    } else if (flatKeys.includes(root)) {
        spellingConvention = 'flat';
    } else if (sharpKeys.includes(root)) {
        spellingConvention = 'sharp';
    } else {
        // For C and enharmonic equivalents, default to sharp for pentatonic, flat for blues
        spellingConvention = (formula.length === 6) ? 'flat' : 'sharp';
    }
    
    // Chromatic scales with consistent spelling
    const sharpChromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const flatChromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    const chromatic = spellingConvention === 'flat' ? flatChromatic : sharpChromatic;
    
    // Calculate each note using the formula
    for (let i = 0; i < formula.length - 1; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        let noteName = chromatic[currentChromaticIndex];
        
        // Additional cleanup for problematic enharmonic spellings
        if (noteName === 'B#') noteName = 'C';
        if (noteName === 'E#') noteName = 'F';
        if (noteName === 'Cb') noteName = 'B';
        if (noteName === 'Fb') noteName = 'E';
        
        scale.push(noteName);
    }
    
    return scale;
}

function calculateBluesScale(root, formula, rootNoteIndex, rootChromaticIndex, noteNames, noteToIndex) {
    // Blues scales should share the same note collection with consistent spelling
    // Blues Major: 1, 2, b3, 3, 5, 6 
    // Blues Minor: 1, b3, 4, b5, 5, b7 (from the 6th degree of blues major)
    
    const scale = [root];
    let currentChromaticIndex = rootChromaticIndex;
    
    // First, determine if this is blues major or minor based on the formula
    const intervalsFromRoot = [0];
    let tempIndex = rootChromaticIndex;
    for (let i = 0; i < formula.length - 1; i++) {
        tempIndex = (tempIndex + formula[i]) % 12;
        intervalsFromRoot.push((tempIndex - rootChromaticIndex + 12) % 12);
    }
    
    // Check for major blues pattern: [0, 2, 3, 4, 7, 9]
    const majorBluesIntervals = [0, 2, 3, 4, 7, 9];
    const isBluesMajor = JSON.stringify(intervalsFromRoot.sort((a,b) => a-b)) === JSON.stringify(majorBluesIntervals);
    
    if (isBluesMajor) {
        // For blues major, calculate normally with flat-friendly spelling
        const flatChromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
        
        for (let i = 0; i < formula.length - 1; i++) {
            currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
            let noteName = flatChromatic[currentChromaticIndex];
            
            // Clean up problematic enharmonic spellings
            if (noteName === 'B#') noteName = 'C';
            if (noteName === 'E#') noteName = 'F';
            if (noteName === 'Cb') noteName = 'B';
            if (noteName === 'Fb') noteName = 'E';
            
            scale.push(noteName);
        }
    } else {
        // For blues minor, we need to inherit spelling from the parent blues major
        // Find the parent blues major scale (blues minor is 9 semitones up from blues major)
        
        // Calculate what the blues major root would be (9 semitones down = 3 semitones up from blues minor root)
        const bluesMajorRootIndex = (rootChromaticIndex + 3) % 12;
        const bluesMajorFormula = [2, 1, 1, 3, 2, 3]; // Blues major formula
        
        // Calculate the full blues major scale with consistent flat spelling
        const flatChromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
        const bluesMajorNotes = [flatChromatic[bluesMajorRootIndex]];
        
        let bluesMajorIndex = bluesMajorRootIndex;
        for (let i = 0; i < bluesMajorFormula.length - 1; i++) {
            bluesMajorIndex = (bluesMajorIndex + bluesMajorFormula[i]) % 12;
            let noteName = flatChromatic[bluesMajorIndex];
            
            // Clean up problematic enharmonic spellings
            if (noteName === 'B#') noteName = 'C';
            if (noteName === 'E#') noteName = 'F';
            if (noteName === 'Cb') noteName = 'B';
            if (noteName === 'Fb') noteName = 'E';
            
            bluesMajorNotes.push(noteName);
        }
        
        // Now extract the blues minor notes starting from the 6th degree (index 5) of blues major
        // Blues minor uses: 6th, 1st, 2nd, 3rd, 4th, 5th degrees of blues major
        const bluesMinorIndices = [5, 0, 1, 2, 3, 4]; // Indices in blues major scale
        
        for (let i = 0; i < bluesMinorIndices.length; i++) {
            const noteIndex = bluesMinorIndices[i];
            if (i === 0) {
                // First note should be the root we were given
                scale[0] = root;
            } else {
                scale.push(bluesMajorNotes[noteIndex]);
            }
        }
    }
    
    return scale;
}

function calculateHybridBluesScale(root, formula, rootNoteIndex, rootChromaticIndex, noteNames, noteToIndex) {
    // Hybrid blues scale: 1, 2, b3, 3, 4, b5, 5, 6, b7 (9 notes)
    // Formula: [2, 1, 1, 1, 1, 1, 2, 1]
    
    const scale = [root];
    let currentChromaticIndex = rootChromaticIndex;
    
    // Blues-friendly chromatic scale (always use flats for altered notes)
    const bluesChromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    for (let i = 0; i < formula.length; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        
        // For hybrid blues scale, always use the blues-friendly chromatic scale
        // This ensures Gb instead of F# and Bb instead of B
        const noteName = bluesChromatic[currentChromaticIndex];
        scale.push(noteName);
    }
    
    return scale;
}

function calculateAugmentedScale(root, formula, rootChromaticIndex, noteToIndex) {
    // Augmented scale: 6-note symmetrical scale
    // Formula: [1, 3, 1, 3, 1, 3] or [3, 1, 3, 1, 3, 1]
    
    const scale = [root];
    let currentChromaticIndex = rootChromaticIndex;
    
    // Augmented scale uses flats for altered notes to maintain consistent spelling
    const augmentedChromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    for (let i = 0; i < formula.length - 1; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        
        // Use the augmented-friendly chromatic scale
        const noteName = augmentedChromatic[currentChromaticIndex];
        scale.push(noteName);
    }
    
    return scale;
}

function calculateAlteredScale(root, formula, rootChromaticIndex) {
    // Special handling for altered scale - use chromatic spelling for practical enharmonics
    // This allows both b3 and 3 to use the same letter (e.g., Bb and B for G altered)
    
    const scale = [root];
    let currentChromaticIndex = rootChromaticIndex;
    
    // Use chromatic spelling that prioritizes practical enharmonics
    // For altered scale, we want: 1, b2, b3, 3, b5, b6, b7
    // This translates to: Root, b9, #9, 3, #11, b13, b7 in jazz terms
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Calculate each note using the formula with chromatic spelling
    for (let i = 0; i < formula.length - 1; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        let noteName = chromaticScale[currentChromaticIndex];
        
        // For altered scale, convert sharps to flats for more readable jazz notation
        // But allow practical combinations like Bb and B natural
        const sharpToFlat = {
            'C#': 'Db',
            'D#': 'Eb', 
            'F#': 'Gb',
            'G#': 'Ab',
            'A#': 'Bb'
        };
        
        // Convert to flat notation for most altered tones, but keep naturals
        if (sharpToFlat[noteName]) {
            noteName = sharpToFlat[noteName];
        }
        
        scale.push(noteName);
    }
    
    return scale;
}

function calculateDiminishedScale(root, formula, scaleType, rootNoteIndex, rootChromaticIndex, noteNames, noteToIndex) {
    console.log('calculateDiminishedScale called with:', { root, formula, scaleType });
    
    // Standardized diminished scale spellings (using flats for consistency)
    // Three unique diminished scales that cover all 12 chromatic notes
    const diminishedScaleSpellings = {
        // Scale 1: C, Db, Eb, E, Gb, G, A, Bb (and enharmonic equivalents)
        'C': { wh: ['C', 'D', 'Eb', 'F', 'Gb', 'Ab', 'A', 'B'], hw: ['C', 'Db', 'Eb', 'E', 'Gb', 'G', 'A', 'Bb'] },
        'Db': { wh: ['Db', 'Eb', 'E', 'Gb', 'G', 'A', 'Bb', 'C'], hw: ['Db', 'D', 'E', 'F', 'G', 'Ab', 'Bb', 'B'] },
        'D': { wh: ['D', 'E', 'F', 'G', 'Ab', 'Bb', 'B', 'Db'], hw: ['D', 'Eb', 'F', 'Gb', 'Ab', 'A', 'B', 'C'] },
        'Eb': { wh: ['Eb', 'F', 'Gb', 'Ab', 'A', 'B', 'C', 'D'], hw: ['Eb', 'E', 'Gb', 'G', 'A', 'Bb', 'C', 'Db'] },
        'E': { wh: ['E', 'Gb', 'G', 'A', 'Bb', 'C', 'Db', 'Eb'], hw: ['E', 'F', 'G', 'Ab', 'Bb', 'B', 'Db', 'D'] },
        'F': { wh: ['F', 'G', 'Ab', 'Bb', 'B', 'Db', 'D', 'E'], hw: ['F', 'Gb', 'Ab', 'A', 'B', 'C', 'D', 'Eb'] },
        
        // Scale 2: Gb, G, A, Bb, C, Db, Eb, E (and enharmonic equivalents)  
        'Gb': { wh: ['Gb', 'Ab', 'A', 'B', 'C', 'D', 'Eb', 'F'], hw: ['Gb', 'G', 'A', 'Bb', 'C', 'Db', 'Eb', 'E'] },
        'G': { wh: ['G', 'A', 'Bb', 'C', 'Db', 'Eb', 'E', 'Gb'], hw: ['G', 'Ab', 'Bb', 'B', 'Db', 'D', 'E', 'F'] },
        'Ab': { wh: ['Ab', 'Bb', 'B', 'Db', 'D', 'E', 'F', 'G'], hw: ['Ab', 'A', 'B', 'C', 'D', 'Eb', 'F', 'Gb'] },
        'A': { wh: ['A', 'B', 'C', 'D', 'Eb', 'F', 'Gb', 'Ab'], hw: ['A', 'Bb', 'C', 'Db', 'Eb', 'E', 'Gb', 'G'] },
        'Bb': { wh: ['Bb', 'C', 'Db', 'Eb', 'E', 'Gb', 'G', 'A'], hw: ['Bb', 'B', 'Db', 'D', 'E', 'F', 'G', 'Ab'] },
        'B': { wh: ['B', 'Db', 'D', 'E', 'F', 'G', 'Ab', 'Bb'], hw: ['B', 'C', 'D', 'Eb', 'F', 'Gb', 'Ab', 'A'] }
    };
    
    // Handle enharmonic equivalents
    let adjustedRoot = root;
    if (root === 'C#') adjustedRoot = 'Db';
    if (root === 'D#') adjustedRoot = 'Eb';
    if (root === 'F#') adjustedRoot = 'Gb';
    if (root === 'G#') adjustedRoot = 'Ab';
    if (root === 'A#') adjustedRoot = 'Bb';
    
    // Get the appropriate spelling
    const spellings = diminishedScaleSpellings[adjustedRoot];
    if (!spellings) {
        console.warn('No standardized spelling found for diminished root:', adjustedRoot);
        // Fallback to chromatic calculation
        return calculateDiminishedScaleFallback(root, formula, scaleType);
    }
    
    // Determine if this is W-H or H-W pattern
    const isWH = scaleType === 'wh-diminished' || formula[0] === 2;
    const scale = isWH ? [...spellings.wh] : [...spellings.hw];
    
    console.log('Generated standardized diminished scale:', scale);
    return scale;
}

// Fallback function for diminished scales if standardized spelling not found
function calculateDiminishedScaleFallback(root, formula, scaleType) {
    // Use flat-preferred chromatic spelling as fallback
    const flatChromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    const noteToIndex = (note) => {
        const map = {
            'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
            'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
            'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10
        };
        return map[note];
    };
    
    const scale = [root];
    let currentChromaticIndex = noteToIndex(root);
    
    for (let i = 0; i < formula.length - 1; i++) {
        currentChromaticIndex = (currentChromaticIndex + formula[i]) % 12;
        let noteName = flatChromatic[currentChromaticIndex];
        
        // Clean up problematic enharmonics
        if (noteName === 'B#') noteName = 'C';
        if (noteName === 'E#') noteName = 'F';
        if (noteName === 'Cb') noteName = 'B';
        if (noteName === 'Fb') noteName = 'E';
        
        scale.push(noteName);
    }
    
    return scale;
}

function calculateWholeToneScale(root, formula, rootChromaticIndex) {
    // There are only 2 unique whole tone scales in 12-tone equal temperament
    // Each contains 6 notes spaced 2 semitones apart
    // Scale 1: C D E F# G# A# (chromatic indices: 0 2 4 6 8 10)
    // Scale 2: Db Eb F G A B (chromatic indices: 1 3 5 7 9 11)
    
    const wholeTone1 = ['C', 'D', 'E', 'F#', 'G#', 'A#'];
    const wholeTone2 = ['Db', 'Eb', 'F', 'G', 'A', 'B'];
    
    // Determine which whole tone collection this root belongs to
    const wholeTone1Chromatic = [0, 2, 4, 6, 8, 10];
    const wholeTone2Chromatic = [1, 3, 5, 7, 9, 11];
    
    let targetScale, startIndex;
    
    if (wholeTone1Chromatic.includes(rootChromaticIndex)) {
        targetScale = wholeTone1;
        startIndex = wholeTone1Chromatic.indexOf(rootChromaticIndex);
    } else {
        targetScale = wholeTone2;
        startIndex = wholeTone2Chromatic.indexOf(rootChromaticIndex);
    }
    
    // Build the scale starting from the root
    const scale = [];
    for (let i = 0; i < 6; i++) {
        const noteIndex = (startIndex + i) % 6;
        scale.push(targetScale[noteIndex]);
    }
    
    console.log(`Generated whole tone scale for ${root}:`, scale);
    return scale;
}

function calculateChromaticScale(root) {
    // Chromatic scale interval formula: 1 - ♭2 - 2 - ♭3 - 3 - 4 - ♭5 - 5 - ♭6 - 6 - ♭7 - 7 - 8
    // This creates a consistent flat-based spelling for all chromatic scales
    
    const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const noteToIndex = {
        'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
        'C#': 1, 'Db': 1, 'D#': 3, 'Eb': 3, 'F#': 6, 'Gb': 6,
        'G#': 8, 'Ab': 8, 'A#': 10, 'Bb': 10,
        'B#': 0, 'Cb': 11, 'E#': 5, 'Fb': 4
    };
    
    // Get root note information
    const rootNoteName = root.charAt(0);
    const rootNoteIndex = noteNames.indexOf(rootNoteName);
    const rootChromaticIndex = noteToIndex[root];
    
    if (rootNoteIndex === -1 || rootChromaticIndex === undefined) {
        console.warn('Invalid root note:', root);
        return [];
    }
    
    // Chromatic scale degree pattern (which scale degree each chromatic note represents)
    // 1, ♭2, 2, ♭3, 3, 4, ♭5, 5, ♭6, 6, ♭7, 7
    const chromaticDegreePattern = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6]; // 0-indexed scale degrees
    
    const scale = [root]; // Start with root
    
    for (let chromaticStep = 1; chromaticStep < 12; chromaticStep++) {
        // Calculate target chromatic position
        const targetChromaticIndex = (rootChromaticIndex + chromaticStep) % 12;
        
        // Get the scale degree this chromatic step represents
        const scaleDegreeIndex = chromaticDegreePattern[chromaticStep];
        const targetLetterIndex = (rootNoteIndex + scaleDegreeIndex) % 7;
        const targetLetter = noteNames[targetLetterIndex];
        
        // Get natural chromatic position of target letter
        const naturalChromaticIndex = noteToIndex[targetLetter];
        
        // Calculate accidental needed
        const chromaticDifference = (targetChromaticIndex - naturalChromaticIndex + 12) % 12;
        
        let noteName;
        if (chromaticDifference === 0) {
            noteName = targetLetter; // Natural
        } else if (chromaticDifference === 1) {
            noteName = targetLetter + '#'; // Sharp
        } else if (chromaticDifference === 11) {
            noteName = targetLetter + 'b'; // Flat
        } else {
            // This shouldn't happen with proper chromatic scale calculation
            console.warn('Unexpected chromatic difference:', chromaticDifference, 'for', targetLetter);
            noteName = targetLetter;
        }
        
        scale.push(noteName);
    }
    
    return scale;
}

// Helper function for chromatic fallback (improved version of getProperNoteSpelling)
function getChromatic(chromaticIndex, key, scaleType = 'major') {
    const normalizedIndex = ((chromaticIndex % 12) + 12) % 12;
    
    // Determine if this key uses sharps or flats
    const sharpKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
    const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'];
    
    const usesSharps = sharpKeys.includes(key);
    const usesFlats = flatKeys.includes(key);
    
    // Chromatic scale with proper enharmonics based on key signature
    let chromaticScale;
    if (scaleType === 'blues') {
        // Blues scales generally prefer flats for altered notes
        chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    } else if (usesSharps) {
        chromaticScale = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    } else if (usesFlats) {
        chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    } else {
        // Default for C and enharmonic roots
        chromaticScale = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    }
    
    return chromaticScale[normalizedIndex];
}

function getModeNotes(parentScale, modeIndex, parentFormula, scaleType = 'major') {
    if (!parentScale || !Array.isArray(parentScale) || modeIndex >= parentScale.length) {
        return [];
    }
    
    const modeRoot = parentScale[modeIndex];
    const modeFormula = [...parentFormula.slice(modeIndex), ...parentFormula.slice(0, modeIndex)];
    
    const modeNotes = calculateScale(modeRoot, modeFormula, scaleType);
    return modeNotes;
}

// Export all functions to global scope
window.ScaleCalculator = {
    getProperNoteSpelling,
    calculateScale,
    calculateScaleWithDegrees,
    calculatePentatonicScale,
    calculateBluesScale,
    calculateHybridBluesScale,
    calculateAugmentedScale,
    calculateAlteredScale,
    calculateDiminishedScale,
    calculateChromaticScale,
    getChromatic,
    getModeNotes
}; 