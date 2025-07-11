// Music Theory Constants
const chromaticScale = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const musicTheoryKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];

// Scale Formulas
const scaleFormulas = {
    // Major modes
    major: [2, 2, 1, 2, 2, 2, 1],
    dorian: [2, 1, 2, 2, 2, 1, 2],
    phrygian: [1, 2, 2, 2, 1, 2, 2],
    lydian: [2, 2, 2, 1, 2, 2, 1],
    mixolydian: [2, 2, 1, 2, 2, 1, 2],
    aeolian: [2, 1, 2, 2, 1, 2, 2],
    locrian: [1, 2, 2, 1, 2, 2, 2],
    
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
            'wh-diminished': [2, 1, 2, 1, 2, 1, 2, 1],  // W-H pattern
    'hw-diminished': [1, 2, 1, 2, 1, 2, 1, 2],   // H-W pattern
    
    // Pentatonic scales
    'major-pentatonic': [2, 2, 3, 2, 3],
    'suspended-pentatonic': [2, 3, 2, 3, 2],
    'man-gong': [3, 2, 3, 2, 2],
    'ritusen': [2, 3, 2, 2, 3],
    'minor-pentatonic': [3, 2, 2, 3, 2],
    
    // Whole tone scales
            'whole-tone-1': [2, 2, 2, 2, 2, 2],  // Rotation 1
            'whole-tone-2': [2, 2, 2, 2, 2, 2],  // Rotation 2
            'whole-tone-3': [2, 2, 2, 2, 2, 2],  // Rotation 3
            'whole-tone-4': [2, 2, 2, 2, 2, 2],  // Rotation 4
            'whole-tone-5': [2, 2, 2, 2, 2, 2],  // Rotation 5
    'whole-tone-6': [2, 2, 2, 2, 2, 2],  // Rotation 6
    
    // Blues scales
    'blues-major': [2, 1, 1, 3, 2, 3],
    'blues-minor': [3, 2, 1, 1, 3, 2],
    
    // Other scales
    'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
};

// Scale Degree Weights for Color Calculation
const scaleDegreeWeights = {
    1: 10,   // Tonic - most stable
    5: 8,    // Dominant - very stable
    3: 6,    // Mediant - moderately stable
    4: 4,    // Subdominant - mild tension
    6: 4,    // Submediant - mild tension
    2: 3,    // Supertonic - more tension
    7: 2     // Leading tone - most tension
};

// Interval Color Mappings
const intervalColors = {
    // Stable Intervals (Consonant)
    '1': '#FFFFFF',  // Root/Unison - changed to white for dark backgrounds
    'P1': '#FFFFFF', // Perfect Unison
    'P8': '#FFFFFF', // Perfect Octave (same as root)
    '3': '#F4D03F',   // Major Third - Warm golden yellow (happiness, brightness)
    '5': '#5DADE2',   // Perfect Fifth - Soft blue (stability, consonance)
    
    // MILD TENSION (Medium Tension) - Earth tones
    '2': '#E67E22',   // Major Second - Warm orange (movement, gentle tension)
    'b2': '#D35400',  // Minor Second - Burnt orange (mild tension, spice)
    '6': '#58D68D',   // Major Sixth - Soft green (yearning, natural)
    'b6': '#85929E',  // Minor Sixth - Muted blue-gray (melancholy, contemplative)
    
    // STRONG TENSION (High Tension) - Deeper, richer colors
    '4': '#E74C3C',   // Perfect Fourth - Rich red (suspension, strength)
    '7': '#C0392B',   // Major Seventh - Deep red (leading tone tension)
    'b7': '#CD6155',  // Minor Seventh - Rose red (bluesy, soulful)
    'b3': '#8E44AD',  // Minor Third - Rich purple (minor quality, depth)
    
    // EXTREME TENSION (Maximum Tension) - Dark, intense colors
    '#4': '#922B21',  // Tritone (Aug 4th) - Dark crimson (devil's interval)
    'b5': '#922B21',  // Tritone (Dim 5th) - Dark crimson (instability)
    
    // ENHARMONIC EQUIVALENTS - Consistent colors for same pitches
    '#5': '#85929E',  // Augmented Fifth = b6 (same pitch, same color)
    '#1': '#D35400',  // Augmented Unison = b2 (same pitch, same color)
    'bb7': '#58D68D', // Diminished Seventh = 6 (same pitch, same color)
    'b4': '#F4D03F',  // Diminished Fourth = 3 (same pitch, same color)
    'bb4': '#F4D03F', // Double flat 4 = 3 (same pitch, same color)
    '#7': '#FFF5E6',  // Augmented Seventh = 1 (same pitch, same color)
    '#2': '#8E44AD',  // Augmented Second = b3 (same pitch, same color)
    'bb3': '#E67E22', // Diminished Third = 2 (same pitch, same color)
    '#6': '#CD6155'   // Augmented Sixth = b7 (same pitch, same color)
};

// Scale Categories and Metadata
const scaleCategories = {
    'major-modes': {
        name: 'Major',
        description: 'The seven modes of the major scale',
        modes: ['major', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'],
        formulas: {
            'major': [2, 2, 1, 2, 2, 2, 1],
            'dorian': [2, 1, 2, 2, 2, 1, 2],
            'phrygian': [1, 2, 2, 2, 1, 2, 2],
            'lydian': [2, 2, 2, 1, 2, 2, 1],
            'mixolydian': [2, 2, 1, 2, 2, 1, 2],
            'aeolian': [2, 1, 2, 2, 1, 2, 2],
            'locrian': [1, 2, 2, 1, 2, 2, 2]
        }
    },
    'pentatonic': {
        name: 'Pentatonic',
        description: 'The five modes of the major pentatonic scale',
        modes: ['major-pentatonic', 'suspended-pentatonic', 'man-gong', 'ritusen', 'minor-pentatonic'],
        formulas: {
            'major-pentatonic': [2, 2, 3, 2, 3],
            'suspended-pentatonic': [2, 3, 2, 3, 2],
            'man-gong': [3, 2, 3, 2, 2],
            'ritusen': [2, 3, 2, 2, 3],
            'minor-pentatonic': [3, 2, 2, 3, 2]
        }
    },
    'blues-scales': {
        name: 'Blues',
        description: 'Six-note blues scales with added chromatic notes',
        modes: ['blues-major', 'blues-minor'],
        formulas: {
            'blues-major': [2, 1, 1, 3, 2, 3],
            'blues-minor': [3, 2, 1, 1, 3, 2]
        }
    },
    'harmonic-minor-modes': {
        name: 'Harmonic Minor',
        description: 'The seven modes of the harmonic minor scale',
        modes: ['harmonic-minor', 'locrian-natural-6', 'ionian-sharp-5', 'dorian-sharp-4', 'phrygian-dominant', 'lydian-sharp-2', 'altered-dominant'],
        formulas: {
            'harmonic-minor': [2, 1, 2, 2, 1, 3, 1],
            'locrian-natural-6': [1, 2, 2, 1, 3, 1, 2],
            'ionian-sharp-5': [2, 2, 1, 3, 1, 2, 1],
            'dorian-sharp-4': [2, 1, 3, 1, 2, 1, 2],
            'phrygian-dominant': [1, 3, 1, 2, 1, 2, 2],
            'lydian-sharp-2': [3, 1, 2, 1, 2, 2, 1],
            'altered-dominant': [1, 2, 1, 2, 2, 1, 3]
        }
    },
    'melodic-minor-modes': {
        name: 'Melodic Minor',
        description: 'The seven modes of the melodic minor scale',
        modes: ['melodic-minor', 'dorian-b2', 'lydian-augmented', 'lydian-dominant', 'mixolydian-b6', 'locrian-natural-2', 'super-locrian'],
        formulas: {
            'melodic-minor': [2, 1, 2, 2, 2, 2, 1],
            'dorian-b2': [1, 2, 2, 2, 2, 1, 2],
            'lydian-augmented': [2, 2, 2, 2, 1, 2, 1],
            'lydian-dominant': [2, 2, 2, 1, 2, 1, 2],
            'mixolydian-b6': [2, 2, 1, 2, 1, 2, 2],
            'locrian-natural-2': [2, 1, 2, 1, 2, 2, 2],
            'super-locrian': [1, 2, 1, 2, 2, 2, 2]
        }
    },
    'diminished-modes': {
        name: 'Octatonic/Diminished',
        description: 'Two complementary eight-note symmetrical scales with 4 rotations each (only 2 unique transpositions)',
        modes: ['wh-diminished', 'hw-diminished'],
        formulas: {
            'wh-diminished': [2, 1, 2, 1, 2, 1, 2, 1],  // W-H pattern
            'hw-diminished': [1, 2, 1, 2, 1, 2, 1, 2]   // H-W pattern
        }
    },
    'whole-tone': {
        name: 'Whole Tone',
        description: 'Six-note scale of equal whole steps (6 rotations, only 2 unique transpositions)',
        modes: ['whole-tone-1', 'whole-tone-2', 'whole-tone-3', 'whole-tone-4', 'whole-tone-5', 'whole-tone-6'],
        formulas: {
            'whole-tone-1': [2, 2, 2, 2, 2, 2],  // Rotation 1
            'whole-tone-2': [2, 2, 2, 2, 2, 2],  // Rotation 2
            'whole-tone-3': [2, 2, 2, 2, 2, 2],  // Rotation 3
            'whole-tone-4': [2, 2, 2, 2, 2, 2],  // Rotation 4
            'whole-tone-5': [2, 2, 2, 2, 2, 2],  // Rotation 5
            'whole-tone-6': [2, 2, 2, 2, 2, 2]   // Rotation 6
        }
    },
    'chromatic-scale': {
        name: 'Chromatic',
        description: 'All twelve notes (in western music)',
        modes: ['chromatic'],
        formulas: {
            'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        }
    }
};

// Mode Metadata
const modeMetadata = {
    // Major modes (Church Modes)
    major: { 
        mood: 'Bright', 
        description: 'Bright, stable, and foundational. The most familiar sound in Western music. Happy, optimistic, resolved, and uplifting.', 
        applications: ['Pop', 'rock', 'country', 'classical', 'folk'] 
    },
    dorian: { 
        mood: 'Sophisticated', 
        description: 'Sophisticated minor with a brighter edge due to the natural 6th. Contemplative, bittersweet, smooth, and hopeful melancholy.', 
        applications: ['Jazz', 'Celtic music', 'progressive rock', 'blues'] 
    },
    phrygian: { 
        mood: 'Exotic', 
        description: 'Dark and exotic with distinctive ♭2 half-step descent. Mysterious, dramatic, intense, and exotic.', 
        applications: ['Flamenco', 'metal', 'Spanish music', 'Middle Eastern'] 
    },
    lydian: { 
        mood: 'Dreamy', 
        description: 'Dreamy and floating with the characteristic ♯4 "lift." Ethereal, magical, expansive, and otherworldly.', 
        applications: ['Film scores', 'jazz', 'progressive music', 'ambient'] 
    },
    mixolydian: { 
        mood: 'Bluesy', 
        description: 'Bluesy and rock-oriented with dominant chord foundation. Relaxed, confident, groove-oriented, and earthy.', 
        applications: ['Blues', 'rock', 'country', 'folk'] 
    },
    aeolian: { 
        mood: 'Melancholy', 
        description: 'The most common minor scale in Western music. Sad, introspective, dramatic, and deeply emotional. Creates profound melancholy and introspective beauty.', 
        applications: ['Classical', 'pop ballads', 'emotional songs', 'minor key harmony'] 
    },
    locrian: { 
        mood: 'Unstable', 
        description: 'Highly unstable due to diminished 5th, rarely used as tonal center. Unsettled, tense, angular, and unresolved.', 
        applications: ['Jazz over half-diminished chords', 'metal', 'experimental music'] 
    },
    
    // Harmonic minor modes
    'harmonic-minor': { 
        mood: 'Dramatic', 
        description: 'Classical minor with raised 7th creating strong leading tone and augmented 2nd interval. Dramatic, exotic, tension-filled, and classical.', 
        applications: ['Classical composition', 'traditional Jewish music', 'jazz minor harmony'] 
    },
    'locrian-natural-6': { 
        mood: 'Dark', 
        description: 'A more stable alternative to regular Locrian, with the natural 6th providing harmonic relief. Dark and mysterious but actually usable as a tonal center.', 
        applications: ['Jazz over half-diminished chords', 'alternative to regular Locrian'] 
    },
    'ionian-sharp-5': { 
        mood: 'Elevated', 
        description: 'Major scale with augmented 5th creating sophisticated tension. Bright but unsettled, sophisticated, and surreal.', 
        applications: ['Jazz over major 7♯5 chords', 'sophisticated pop harmony'] 
    },
    'dorian-sharp-4': { 
        mood: 'Folk', 
        description: 'Dorian with an exotic ♯4 tritone, creating distinctive folk character. Mysterious, rustic, and hauntingly beautiful with ancient folk traditions.', 
        applications: ['Eastern European folk', 'world music', 'jazz for exotic colors'] 
    },
    'phrygian-dominant': { 
        mood: 'Exotic', 
        description: 'Highly exotic with major 3rd over Phrygian ♭2, creates dominant function. Intensely exotic, passionate, fiery, and dramatic.', 
        applications: ['Flamenco', 'Middle Eastern music', 'klezmer', 'metal', 'jazz altered dominants'] 
    },
    'lydian-sharp-2': { 
        mood: 'Exotic', 
        description: 'Extremely bright and ethereal with both ♯2 and ♯4. Otherworldly, transcendent, floating, and mystical.', 
        applications: ['Film scoring', 'ambient music', 'progressive compositions'] 
    },
    'altered-dominant': { 
        mood: 'Jazzy', 
        description: 'The ultimate altered dominant with maximum harmonic tension and instability. Chaotic, intensely dissonant, and creates overwhelming need for resolution.', 
        applications: ['Experimental music', 'extreme tension effects'] 
    },
    
    // Melodic minor modes (Jazz Minor System)
    'melodic-minor': { 
        mood: 'Ascending', 
        description: 'Sophisticated minor combining minor 3rd with major scale upper structure. Complex, bittersweet, sophisticated, and jazzy.', 
        applications: ['Jazz over minor-major 7th chords', 'sophisticated minor harmony'] 
    },
    'dorian-b2': { 
        mood: 'Brooding', 
        description: 'Dark and mysterious with a distinctive ♭2 half-step descent, but softened by the natural 6th. Brooding, exotic, and sophisticated.', 
        applications: ['Jazz over suspended ♭9 chords', 'exotic minor passages'] 
    },
    'lydian-augmented': { 
        mood: 'Ethereal', 
        description: 'Maximum brightness combining Lydian ♯4 with augmented 5th. Brilliant, floating, highly sophisticated, and unstable.', 
        applications: ['Jazz over major 7♯5♯11 chords', 'sophisticated harmony'] 
    },
    'lydian-dominant': { 
        mood: 'Floating', 
        description: 'Bright and ethereal like Lydian, but with a grounded, bluesy character. Sophisticated, floating, yet confidently functional and groove-oriented.', 
        applications: ['Jazz over dominant 7♯11 chords', 'tritone substitutions', 'non-resolving dominants'] 
    },
    'mixolydian-b6': { 
        mood: 'Hindu', 
        description: 'Dominant character with an exotic ♭6 creating distinctive harmonic color. Groovy yet mysterious, sophisticated with an edge of tension.', 
        applications: ['Jazz over dominant 7♭13 chords', 'Indian classical influences', 'minor key dominants'] 
    },
    'locrian-natural-2': { 
        mood: 'Melancholy', 
        description: 'A sophisticated, melancholy mode with distinctive harmonic tension. Dark and introspective, yet surprisingly stable and usable.', 
        applications: ['Jazz over minor 7♭5 chords', 'preferred alternative to standard Locrian'] 
    },
    'super-locrian': { 
        mood: 'Unstable', 
        description: 'Also known as Super Locrian, this is commonly called the altered scale. The ultimate altered sound with maximum harmonic instability and tension. Chaotic, intensely unstable, and creates overwhelming urgency for resolution.', 
        applications: ['Jazz over altered dominant chords', 'maximum tension before resolution'] 
    },
    
    // Diminished modes
    'wh-diminished': { mood: 'Mysterious', description: 'Eight-note symmetrical scale creating mysterious, otherworldly suspension. Atmospheric, supernatural, and hauntingly beautiful with floating, timeless quality.', applications: ['Jazz', 'classical', 'metal'] },
    'hw-diminished': { mood: 'Intense', description: 'Eight-note symmetrical scale generating maximum harmonic tension and forward momentum. Intensely dramatic, sophisticated, and urgently demanding resolution.', applications: ['Jazz', 'classical', 'experimental'] },
    
    // Pentatonic scales
    'major-pentatonic': { mood: 'Joyful', description: 'Five perfect notes creating universal appeal and instant accessibility. Joyful, bright, optimistic, and works beautifully in any musical context.', applications: ['Rock', 'country', 'pop', 'world'] },
    'suspended-pentatonic': { mood: 'Ancient', description: 'Suspended pentatonic creating ancient, mystical atmosphere. Timeless, spiritual, and meditative with primitive yet sophisticated character.', applications: ['World music', 'ambient'] },
    'man-gong': { mood: 'Contemplative', description: 'Third mode of major pentatonic with contemplative, reflective character. Meditative, introspective, and deeply thoughtful with Eastern philosophical depth.', applications: ['Blues', 'rock', 'world music'] },
    'ritusen': { mood: 'Pastoral', description: 'Fourth mode of major pentatonic with pastoral, folk-like character. Peaceful, rustic, and naturally beautiful with countryside simplicity.', applications: ['Country', 'folk', 'world music'] },
    'minor-pentatonic': { mood: 'Soulful', description: 'The classic minor pentatonic with deep emotional resonance. Soulful, bluesy, expressive, and profoundly moving - the voice of human emotion.', applications: ['Blues', 'rock', 'jazz'] },
    
    // Blues scales
    'blues-major': { mood: 'Country', description: 'Six-note blues scale adding the ♭3 "blue note" for authentic country flavor. Earthy, down-home, and genuinely American with rustic charm.', applications: ['Blues', 'country', 'rock'] },
    'blues-minor': { mood: 'Soulful', description: 'Six-note blues scale adding the ♭5 "blue note" for authentic blues expression. Deeply soulful, emotionally raw, and profoundly expressive.', applications: ['Blues', 'rock', 'jazz'] },
    
    // Whole tone scales
    'whole-tone-1': { mood: 'Dreamy', description: 'Six-note whole tone scale creating ethereal, floating ambiguity. Dreamy, impressionistic, and otherworldly - like music floating on clouds.', applications: ['Impressionist', 'jazz', 'film'] },
    'whole-tone-2': { mood: 'Dreamy', description: 'Six-note whole tone scale creating ethereal, floating ambiguity. Dreamy, impressionistic, and otherworldly - like music floating on clouds.', applications: ['Impressionist', 'jazz', 'film'] },
    'whole-tone-3': { mood: 'Dreamy', description: 'Six-note whole tone scale creating ethereal, floating ambiguity. Dreamy, impressionistic, and otherworldly - like music floating on clouds.', applications: ['Impressionist', 'jazz', 'film'] },
    'whole-tone-4': { mood: 'Dreamy', description: 'Six-note whole tone scale creating ethereal, floating ambiguity. Dreamy, impressionistic, and otherworldly - like music floating on clouds.', applications: ['Impressionist', 'jazz', 'film'] },
    'whole-tone-5': { mood: 'Dreamy', description: 'Six-note whole tone scale creating ethereal, floating ambiguity. Dreamy, impressionistic, and otherworldly - like music floating on clouds.', applications: ['Impressionist', 'jazz', 'film'] },
    'whole-tone-6': { mood: 'Dreamy', description: 'Six-note whole tone scale creating ethereal, floating ambiguity. Dreamy, impressionistic, and otherworldly - like music floating on clouds.', applications: ['Impressionist', 'jazz', 'film'] },
    
    // Other scales
    'chromatic': { mood: 'Chromatic', description: 'All twelve notes of Western music creating ultimate harmonic complexity. Chromatic, intensely colorful, and capable of infinite emotional expression.', applications: ['Jazz', 'classical', 'experimental'] }
};

// Mode Numbers and Names
const modeNumbers = {
    // Major modes
    'major': { number: 1, properName: 'Ionian (Major)' },
    'dorian': { number: 2, properName: 'Dorian' },
    'phrygian': { number: 3, properName: 'Phrygian' },
    'lydian': { number: 4, properName: 'Lydian' },
    'mixolydian': { number: 5, properName: 'Mixolydian' },
    'aeolian': { number: 6, properName: 'Aeolian (Natural Minor)' },
    'locrian': { number: 7, properName: 'Locrian' },
    
    // Harmonic Minor modes
    'harmonic-minor': { number: 1, properName: 'Harmonic Minor' },
    'locrian-natural-6': { number: 2, properName: 'Locrian ♮6' },
    'ionian-sharp-5': { number: 3, properName: 'Ionian #5' },
    'dorian-sharp-4': { number: 4, properName: 'Dorian #4' },
    'phrygian-dominant': { number: 5, properName: 'Phrygian Dominant' },
    'lydian-sharp-2': { number: 6, properName: 'Lydian #2' },
    'altered-dominant': { number: 7, properName: 'Altered Dominant' },
    
    // Melodic Minor modes
    'melodic-minor': { number: 1, properName: 'Melodic Minor' },
    'dorian-b2': { number: 2, properName: 'Dorian ♭2' },
    'lydian-augmented': { number: 3, properName: 'Lydian Augmented' },
    'lydian-dominant': { number: 4, properName: 'Lydian Dominant' },
    'mixolydian-b6': { number: 5, properName: 'Mixolydian ♭6' },
    'locrian-natural-2': { number: 6, properName: 'Locrian ♮2' },
    'super-locrian': { number: 7, properName: 'Altered' },
    
    // Diminished modes
    'wh-diminished': { number: 1, properName: 'WH Diminished' },
    'hw-diminished': { number: 2, properName: 'HW Diminished' },
    
    // Pentatonic scales
    'major-pentatonic': { number: 1, properName: 'Major Pentatonic' },
    'suspended-pentatonic': { number: 2, properName: 'Suspended Pentatonic' },
    'man-gong': { number: 3, properName: 'Man Gong' },
    'ritusen': { number: 4, properName: 'Ritusen' },
    'minor-pentatonic': { number: 5, properName: 'Minor Pentatonic' },
    
    // Blues scales
    'blues-major': { number: 1, properName: 'Blues Major' },
    'blues-minor': { number: 2, properName: 'Blues Minor' },
    
    // Whole tone scales
    'whole-tone-1': { number: 1, properName: 'Whole Tone' },
    'whole-tone-2': { number: 2, properName: 'Whole Tone' },
    'whole-tone-3': { number: 3, properName: 'Whole Tone' },
    'whole-tone-4': { number: 4, properName: 'Whole Tone' },
    'whole-tone-5': { number: 5, properName: 'Whole Tone' },
    'whole-tone-6': { number: 6, properName: 'Whole Tone' },
    
    // Other scales
    'chromatic': { number: 1, properName: 'Chromatic' }
};

// Export all constants
window.MusicConstants = {
    chromaticScale,
    musicTheoryKeys,
    scaleFormulas,
    scaleDegreeWeights,
    intervalColors,
    scaleCategories,
    modeMetadata,
    modeNumbers
}; 