/**
 * Music Theory Accuracy Test Suite
 * Tests all aspects of the Scale Explorer for theoretical accuracy
 */

class MusicTheoryTester {
    constructor() {
        this.results = [];
        this.testCount = 0;
        this.passCount = 0;
        this.failCount = 0;
        
        // Get scale formulas from MusicConstants (if available) or define them
        this.scaleFormulas = window.MusicConstants?.scaleFormulas || {
            'major': [2, 2, 1, 2, 2, 2, 1],
            'dorian': [2, 1, 2, 2, 2, 1, 2],
            'phrygian': [1, 2, 2, 2, 1, 2, 2],
            'lydian': [2, 2, 2, 1, 2, 2, 1],
            'mixolydian': [2, 2, 1, 2, 2, 1, 2],
            'aeolian': [2, 1, 2, 2, 1, 2, 2],
            'locrian': [1, 2, 2, 1, 2, 2, 2],
            'ionian': [2, 2, 1, 2, 2, 2, 1], // same as major
            'harmonic-minor': [2, 1, 2, 2, 1, 3, 1],
            'melodic-minor': [2, 1, 2, 2, 2, 2, 1]
        };
    }

    // Helper method to log test results
    assert(condition, testName, expected, actual) {
        this.testCount++;
        if (condition) {
            this.passCount++;
            console.log(`✅ PASS: ${testName}`);
            this.results.push({ test: testName, status: 'PASS', expected, actual });
        } else {
            this.failCount++;
            console.error(`❌ FAIL: ${testName}`);
            console.error(`   Expected: ${JSON.stringify(expected)}`);
            console.error(`   Actual: ${JSON.stringify(actual)}`);
            this.results.push({ test: testName, status: 'FAIL', expected, actual });
        }
    }

    // Test 1: Note Spelling Accuracy
    testNoteSpelling() {
        console.log('\n=== TESTING NOTE SPELLING ===');
        
        // Test major scales with different key signatures
        const testCases = [
            { key: 'C', expected: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
            { key: 'G', expected: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'] },
            { key: 'D', expected: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'] },
            { key: 'A', expected: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'] },
            { key: 'E', expected: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'] },
            { key: 'B', expected: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'] },
            { key: 'F♯', expected: ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯'] },
            { key: 'C♯', expected: ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯'] },
            { key: 'F', expected: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E'] },
            { key: 'B♭', expected: ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'] },
            { key: 'E♭', expected: ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'] },
            { key: 'A♭', expected: ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G'] },
            { key: 'D♭', expected: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'] },
            { key: 'G♭', expected: ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F'] },
            { key: 'C♭', expected: ['C♭', 'D♭', 'E♭', 'F♭', 'G♭', 'A♭', 'B♭'] }
        ];

        testCases.forEach(testCase => {
            try {
                const scale = window.MusicTheory.calculateScale(testCase.key, this.scaleFormulas.major, 'major');
                this.assert(
                    JSON.stringify(scale) === JSON.stringify(testCase.expected),
                    `${testCase.key} Major Scale Note Spelling`,
                    testCase.expected,
                    scale
                );
            } catch (error) {
                this.assert(false, `${testCase.key} Major Scale (Error)`, testCase.expected, error.message);
            }
        });
    }

    // Test 2: Interval Spelling
    testIntervalSpelling() {
        console.log('\n=== TESTING INTERVAL SPELLING ===');
        
        const majorScaleIntervals = ['1', '2', '3', '4', '5', '6', '7'];
        const expectedIntervalNames = [
            'Perfect Unison', 'Major 2nd', 'Major 3rd', 'Perfect 4th', 
            'Perfect 5th', 'Major 6th', 'Major 7th'
        ];

        // Test C major intervals
        try {
            const cMajorScale = window.MusicTheory.calculateScale('C', this.scaleFormulas.major, 'major');
            
            if (window.IntervalUtils && window.IntervalUtils.getIntervals) {
                const intervals = window.IntervalUtils.getIntervals(cMajorScale, 'C', 'major');
                
                intervals.forEach((interval, index) => {
                    this.assert(
                        interval.name === expectedIntervalNames[index],
                        `C Major Interval ${index + 1} Name`,
                        expectedIntervalNames[index],
                        interval.name
                    );
                });
            } else {
                // If getIntervals function doesn't exist, test basic scale generation
                this.assert(
                    cMajorScale.length === 7,
                    'C Major Scale Length',
                    7,
                    cMajorScale.length
                );
                
                this.assert(
                    cMajorScale[0] === 'C',
                    'C Major Scale Root',
                    'C',
                    cMajorScale[0]
                );
            }
        } catch (error) {
            this.assert(false, 'C Major Interval Calculation', expectedIntervalNames, error.message);
        }
    }

    // Test 3: Mode Relationships and Spelling
    testModeRelationships() {
        console.log('\n=== TESTING MODE RELATIONSHIPS ===');
        
        const cMajorModes = [
            { mode: 'ionian', root: 'C', expected: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
            { mode: 'dorian', root: 'D', expected: ['D', 'E', 'F', 'G', 'A', 'B', 'C'] },
            { mode: 'phrygian', root: 'E', expected: ['E', 'F', 'G', 'A', 'B', 'C', 'D'] },
            { mode: 'lydian', root: 'F', expected: ['F', 'G', 'A', 'B', 'C', 'D', 'E'] },
            { mode: 'mixolydian', root: 'G', expected: ['G', 'A', 'B', 'C', 'D', 'E', 'F'] },
            { mode: 'aeolian', root: 'A', expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
            { mode: 'locrian', root: 'B', expected: ['B', 'C', 'D', 'E', 'F', 'G', 'A'] }
        ];

        cMajorModes.forEach(modeTest => {
            try {
                const formula = this.scaleFormulas[modeTest.mode];
                if (formula) {
                    const scale = window.MusicTheory.calculateScale(modeTest.root, formula, modeTest.mode);
                    this.assert(
                        JSON.stringify(scale) === JSON.stringify(modeTest.expected),
                        `${modeTest.root} ${modeTest.mode} Mode Spelling`,
                        modeTest.expected,
                        scale
                    );
                } else {
                    this.assert(false, `${modeTest.root} ${modeTest.mode} Mode (No Formula)`, modeTest.expected, 'Formula not found');
                }
            } catch (error) {
                this.assert(false, `${modeTest.root} ${modeTest.mode} Mode (Error)`, modeTest.expected, error.message);
            }
        });
    }

    // Test 4: Chord Spelling and Quality
    testChordSpelling() {
        console.log('\n=== TESTING CHORD SPELLING ===');
        
        const cMajorChords = [
            { degree: 1, expected: { name: 'C', notes: ['C', 'E', 'G'], quality: 'major' } },
            { degree: 2, expected: { name: 'Dm', notes: ['D', 'F', 'A'], quality: 'minor' } },
            { degree: 3, expected: { name: 'Em', notes: ['E', 'G', 'B'], quality: 'minor' } },
            { degree: 4, expected: { name: 'F', notes: ['F', 'A', 'C'], quality: 'major' } },
            { degree: 5, expected: { name: 'G', notes: ['G', 'B', 'D'], quality: 'major' } },
            { degree: 6, expected: { name: 'Am', notes: ['A', 'C', 'E'], quality: 'minor' } },
            { degree: 7, expected: { name: 'B°', notes: ['B', 'D', 'F'], quality: 'diminished' } }
        ];

        try {
            const cMajorScale = window.MusicTheory.calculateScale('C', this.scaleFormulas.major, 'major');
            
            if (window.MusicTheory.calculateTriads) {
                const triads = window.MusicTheory.calculateTriads(cMajorScale, 'major');
                
                cMajorChords.forEach((expectedChord, index) => {
                    if (triads[index]) {
                        const actualChord = triads[index];
                        
                        this.assert(
                            actualChord.name === expectedChord.expected.name,
                            `C Major Triad ${expectedChord.degree} Name`,
                            expectedChord.expected.name,
                            actualChord.name
                        );
                        
                        this.assert(
                            JSON.stringify(actualChord.notes) === JSON.stringify(expectedChord.expected.notes),
                            `C Major Triad ${expectedChord.degree} Notes`,
                            expectedChord.expected.notes,
                            actualChord.notes
                        );
                        
                        this.assert(
                            actualChord.quality.toLowerCase().includes(expectedChord.expected.quality),
                            `C Major Triad ${expectedChord.degree} Quality`,
                            expectedChord.expected.quality,
                            actualChord.quality
                        );
                    }
                });
            } else {
                this.assert(false, 'Triad calculation function not available', 'calculateTriads function', 'not found');
            }
        } catch (error) {
            this.assert(false, 'C Major Triads Calculation', cMajorChords, error.message);
        }
    }

    // Test 5: Seventh Chord Spelling
    testSeventhChords() {
        console.log('\n=== TESTING SEVENTH CHORD SPELLING ===');
        
        const cMajorSevenths = [
            { degree: 1, expected: { name: 'Cmaj7', notes: ['C', 'E', 'G', 'B'], quality: 'major 7' } },
            { degree: 2, expected: { name: 'Dm7', notes: ['D', 'F', 'A', 'C'], quality: 'minor 7' } },
            { degree: 3, expected: { name: 'Em7', notes: ['E', 'G', 'B', 'D'], quality: 'minor 7' } },
            { degree: 4, expected: { name: 'Fmaj7', notes: ['F', 'A', 'C', 'E'], quality: 'major 7' } },
            { degree: 5, expected: { name: 'G7', notes: ['G', 'B', 'D', 'F'], quality: 'dominant 7' } },
            { degree: 6, expected: { name: 'Am7', notes: ['A', 'C', 'E', 'G'], quality: 'minor 7' } },
            { degree: 7, expected: { name: 'Bm7♭5', notes: ['B', 'D', 'F', 'A'], quality: 'half-diminished' } }
        ];

        try {
            const cMajorScale = window.MusicTheory.calculateScale('C', this.scaleFormulas.major, 'major');
            
            if (window.MusicTheory.calculateSeventhChords) {
                const sevenths = window.MusicTheory.calculateSeventhChords(cMajorScale, 'major');
                
                cMajorSevenths.forEach((expectedChord, index) => {
                    if (sevenths[index]) {
                        const actualChord = sevenths[index];
                        
                        this.assert(
                            JSON.stringify(actualChord.notes) === JSON.stringify(expectedChord.expected.notes),
                            `C Major Seventh ${expectedChord.degree} Notes`,
                            expectedChord.expected.notes,
                            actualChord.notes
                        );
                    }
                });
            } else {
                this.assert(false, 'Seventh chord calculation function not available', 'calculateSeventhChords function', 'not found');
            }
        } catch (error) {
            this.assert(false, 'C Major Seventh Chords Calculation', cMajorSevenths, error.message);
        }
    }

    // Test 6: Enharmonic Equivalents
    testEnharmonicEquivalents() {
        console.log('\n=== TESTING ENHARMONIC EQUIVALENTS ===');
        
        const enharmonicPairs = [
            ['C♯', 'D♭'],
            ['D♯', 'E♭'],
            ['F♯', 'G♭'],
            ['G♯', 'A♭'],
            ['A♯', 'B♭']
        ];

        enharmonicPairs.forEach(pair => {
            try {
                if (window.IntervalUtils && window.IntervalUtils.areEnharmonicEquivalents) {
                    const areEquivalent = window.IntervalUtils.areEnharmonicEquivalents(pair[0], pair[1]);
                    this.assert(
                        areEquivalent,
                        `${pair[0]} and ${pair[1]} are enharmonic equivalents`,
                        true,
                        areEquivalent
                    );
                } else if (window.MusicTheory && window.MusicTheory.areEnharmonicEquivalents) {
                    const areEquivalent = window.MusicTheory.areEnharmonicEquivalents(pair[0], pair[1]);
                    this.assert(
                        areEquivalent,
                        `${pair[0]} and ${pair[1]} are enharmonic equivalents`,
                        true,
                        areEquivalent
                    );
                } else {
                    this.assert(false, `Enharmonic test ${pair[0]}/${pair[1]} (Function not found)`, true, 'Function not available');
                }
            } catch (error) {
                this.assert(false, `Enharmonic test ${pair[0]}/${pair[1]} (Error)`, true, error.message);
            }
        });
    }

    // Test 7: Roman Numeral Accuracy
    testRomanNumerals() {
        console.log('\n=== TESTING ROMAN NUMERALS ===');
        
        const expectedRomanNumerals = [
            { degree: 1, quality: 'major', expected: 'I' },
            { degree: 2, quality: 'minor', expected: 'ii' },
            { degree: 3, quality: 'minor', expected: 'iii' },
            { degree: 4, quality: 'major', expected: 'IV' },
            { degree: 5, quality: 'major', expected: 'V' },
            { degree: 6, quality: 'minor', expected: 'vi' },
            { degree: 7, quality: 'diminished', expected: 'vii°' }
        ];

        expectedRomanNumerals.forEach(test => {
            try {
                if (window.IntervalUtils && window.IntervalUtils.getRomanNumeral) {
                    const roman = window.IntervalUtils.getRomanNumeral(test.degree, test.quality);
                    this.assert(
                        roman === test.expected,
                        `Roman numeral for degree ${test.degree} ${test.quality}`,
                        test.expected,
                        roman
                    );
                } else {
                    this.assert(false, `Roman numeral test (Function not found)`, test.expected, 'Function not available');
                }
            } catch (error) {
                this.assert(false, `Roman numeral test (Error)`, test.expected, error.message);
            }
        });
    }

    // Run all tests
    runAllTests() {
        console.log('🎵 Starting Music Theory Accuracy Tests...\n');
        
        this.testNoteSpelling();
        this.testIntervalSpelling();
        this.testModeRelationships();
        this.testChordSpelling();
        this.testSeventhChords();
        this.testEnharmonicEquivalents();
        this.testRomanNumerals();
        
        this.printSummary();
        return this.results;
    }

    // Print test summary
    printSummary() {
        console.log('\n' + '='.repeat(50));
        console.log('🎵 MUSIC THEORY TEST SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total Tests: ${this.testCount}`);
        console.log(`✅ Passed: ${this.passCount}`);
        console.log(`❌ Failed: ${this.failCount}`);
        console.log(`Success Rate: ${((this.passCount / this.testCount) * 100).toFixed(1)}%`);
        
        if (this.failCount > 0) {
            console.log('\n❌ FAILED TESTS:');
            this.results.filter(r => r.status === 'FAIL').forEach(failure => {
                console.log(`   - ${failure.test}`);
            });
        }
        
        console.log('='.repeat(50));
    }

    // Export results to JSON for analysis
    exportResults() {
        return {
            summary: {
                total: this.testCount,
                passed: this.passCount,
                failed: this.failCount,
                successRate: (this.passCount / this.testCount) * 100
            },
            results: this.results,
            timestamp: new Date().toISOString()
        };
    }
}

// Usage: Run this in the browser console on your Scale Explorer page
// const tester = new MusicTheoryTester();
// const results = tester.runAllTests();
// console.log('Export results:', tester.exportResults()); 