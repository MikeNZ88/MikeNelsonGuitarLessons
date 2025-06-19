// Scale Export Script - Generates comprehensive scale spelling report
// Run with: node export_scales.js > scale_report.txt

const fs = require('fs');
const path = require('path');

// Mock window object for Node.js compatibility
global.window = {};
global.document = {};

// Load the scale calculator from your project
const scaleCalculatorPath = path.join(__dirname, 'public/scale-explorer/js/core/scale-calculator.js');
const constantsPath = path.join(__dirname, 'public/scale-explorer/js/core/constants.js');

// Read and evaluate the constants file
const constantsContent = fs.readFileSync(constantsPath, 'utf8');
eval(constantsContent);

// Read and evaluate the scale calculator (strip problematic browser code)
let calculatorContent = fs.readFileSync(scaleCalculatorPath, 'utf8');
// Remove or comment out browser-specific code
calculatorContent = calculatorContent.replace(/console\.log/g, '// console.log');
calculatorContent = calculatorContent.replace(/window\./g, 'global.');
eval(calculatorContent);

// All 12 root notes
const allRoots = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Simple scale calculation function based on your logic
function calculateScaleSimple(rootNote, formula, scaleType) {
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
        const naturalIndex = chromaticScale.indexOf(targetLetter);
        
        if (naturalIndex === -1) {
            // Handle cases where the letter isn't in our chromatic scale
            const letterToChromatic = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11};
            const naturalChromaticIndex = letterToChromatic[targetLetter];
            const diff = currentChromaticIndex - naturalChromaticIndex;
            
            if (diff === 1 || diff === -11) noteName = targetLetter + '#';
            else if (diff === -1 || diff === 11) noteName = targetLetter + 'b';
            else if (diff === 2 || diff === -10) noteName = targetLetter + '##';
            else if (diff === -2 || diff === 10) noteName = targetLetter + 'bb';
            else noteName = chromaticScale[currentChromaticIndex];
        } else if (naturalIndex !== currentChromaticIndex) {
            const diff = currentChromaticIndex - naturalIndex;
            if (diff === 1 || diff === -11) noteName = targetLetter + '#';
            else if (diff === -1 || diff === 11) noteName = targetLetter + 'b';
            else if (diff === 2 || diff === -10) noteName = targetLetter + '##';
            else if (diff === -2 || diff === 10) noteName = targetLetter + 'bb';
            else noteName = chromaticScale[currentChromaticIndex];
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
Each scale shows: Root, Scale Notes, and Intervals.

`;

    // Process each scale category
    Object.entries(scaleCategories).forEach(([categoryKey, category]) => {
        report += `\n${'='.repeat(60)}\n`;
        report += `${category.name.toUpperCase()} - ${category.description}\n`;
        report += `${'='.repeat(60)}\n`;

        // Process each mode in the category
        category.modes.forEach(scaleType => {
            report += `\n${'-'.repeat(40)}\n`;
            report += `${scaleType.toUpperCase().replace(/-/g, ' ')}\n`;
            report += `${'-'.repeat(40)}\n`;

            // Process each root note
            allRoots.forEach(root => {
                try {
                    const scaleResult = calculateScaleSimple(root, scaleFormulas[scaleType], scaleType);
                    const intervals = generateIntervals(scaleResult, root);
                    
                    report += `${root.padEnd(3)} | ${scaleResult.join(' - ').padEnd(35)} | ${intervals.join(' ')}\n`;
                } catch (error) {
                    report += `${root.padEnd(3)} | ERROR: ${error.message}\n`;
                }
            });
        });
    });

    // Add summary section
    report += `\n\n${'='.repeat(60)}\n`;
    report += `SUMMARY\n`;
    report += `${'='.repeat(60)}\n`;
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