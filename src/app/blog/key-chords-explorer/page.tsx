'use client';

import React, { useState, useMemo } from 'react';
import { Metadata } from 'next';

const KeyChordsExplorer = () => {
  const [keyType, setKeyType] = useState('major');
  const [selectedKey, setSelectedKey] = useState('C');

  // Commonly used keys in chromatic order
  type KeyType = 'major' | 'minor';

  const commonKeys: { [key in KeyType]: string[] } = {
    major: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
    minor: ['Cm', 'C#m', 'Dm', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm']
  };

  // Key signatures with correct enharmonic spelling
  const keySignatures: { [key: string]: string[] } = {
    // Major keys
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    // Add missing key signatures for the complete chromatic set
    'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
    
    // Minor keys (natural minor scales)
    'Am': ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    'Bbm': ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
    'Bm': ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
    'Cm': ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    'C#m': ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
    'Dm': ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    'Ebm': ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'],
    'Em': ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    'Fm': ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
    'F#m': ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
    'Gm': ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
    'G#m': ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#']
  };

  // Chord qualities for each scale degree
  const chordQualities: { [key in KeyType]: string[] } = {
    major: ['major', 'minor', 'minor', 'major', 'major', 'minor', 'diminished'],
    minor: ['minor', 'diminished', 'major', 'minor', 'minor', 'major', 'major']
  };

  const romanNumerals: { [key in KeyType]: string[] } = {
    major: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
    minor: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']
  };

  // Calculate chord notes using proper interval relationships
  const getChordNotes = (rootNote: string, quality: string, scaleNotes: string[]): string[] => {
    const rootIndex = scaleNotes.indexOf(rootNote);
    
    if (rootIndex === -1) return [];
    
    if (quality === 'major' || quality === 'minor') {
      // For major and minor chords, use scale degrees directly
      // The scale already has the correct notes for the key
      return [
        scaleNotes[rootIndex],
        scaleNotes[(rootIndex + 2) % 7], // 3rd
        scaleNotes[(rootIndex + 4) % 7]  // 5th
      ];
    } else if (quality === 'diminished') {
      // Diminished: Root + Minor 3rd + Diminished 5th
      const root = scaleNotes[rootIndex];
      const chromaticFromRoot = getChromaticFromRoot(root);
      
      if (chromaticFromRoot.length === 0) return [];
      
      const minorThird = chromaticFromRoot[3]; // 3 semitones = minor 3rd
      const diminishedFifth = chromaticFromRoot[6]; // 6 semitones = diminished 5th
      
      return [root, minorThird, diminishedFifth];
    }
    return [];
  };

  // Helper to get chromatic scale starting from a specific root
  const getChromaticFromRoot = (rootNote: string): string[] => {
    // Determine if we should use sharps or flats based on the key
    const useFlats = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fm', 'Bbm', 'Ebm', 'Cm', 'Gm', 'Dm'].includes(selectedKey);
    
    const chromaticSharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const chromaticFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    const chromatic = useFlats ? chromaticFlats : chromaticSharps;
    
    // Handle enharmonic equivalents for rare notes
    let searchNote = rootNote;
    if (rootNote === 'E#') searchNote = 'F';
    if (rootNote === 'B#') searchNote = 'C';
    if (rootNote === 'Cb') searchNote = 'B';
    if (rootNote === 'Fb') searchNote = 'E';
    
    const rootIndex = chromatic.indexOf(searchNote);
    
    if (rootIndex === -1) return []; // fallback for unhandled cases
    
    // Return chromatic scale starting from root
    const result = [];
    for (let i = 0; i < 12; i++) {
      result.push(chromatic[(rootIndex + i) % 12]);
    }
    return result;
  };

  // Get available keys for the selected key type (already in chromatic order)
  const availableKeys = useMemo(() => {
    return commonKeys[keyType as KeyType];
  }, [keyType]);

  // Calculate all chords in the selected key
  const keyChords = useMemo(() => {
    const scaleNotes = keySignatures[selectedKey];
    if (!scaleNotes) return [];
    
    const qualities = chordQualities[keyType as KeyType];
    const numerals = romanNumerals[keyType as KeyType];
    
    return scaleNotes.map((note: string, index: number) => {
      const quality = qualities[index];
      const chordNotes = getChordNotes(note, quality, scaleNotes);
      const romanNumeral = numerals[index];
      
      return {
        scaleDegree: index + 1,
        romanNumeral,
        rootNote: note,
        quality,
        notes: chordNotes,
        chordName: `${note}${quality === 'minor' ? 'm' : quality === 'diminished' ? '°' : ''}`
      };
    });
  }, [selectedKey, keyType]);

  // Get chords to display in main section
  const mainChords = useMemo(() => {
    if (keyType === 'major') {
      return keyChords.slice(0, 6); // I, ii, iii, IV, V, vi
    } else {
      // For minor keys, skip the ii° chord (index 1)
      return [0, 2, 3, 4, 5, 6].map((index: number) => keyChords[index]);
    }
  }, [keyChords, keyType]);

  // Get advanced chord (7th chord for major, ii° for minor)
  const advancedChord = useMemo(() => {
    return keyType === 'major' ? keyChords[6] : keyChords[1];
  }, [keyChords, keyType]);

  // Reset selected key when changing key type
  const handleKeyTypeChange = (newKeyType: KeyType) => {
    setKeyType(newKeyType);
    setSelectedKey(newKeyType === 'major' ? 'C' : 'Cm');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-amber-600 mb-4">Chords in Every Key</h2>
        <p className="text-gray-600 mb-6">
          Explore all the chords that naturally occur in any major or minor key. Every key contains the same pattern of chord relationships.
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Key Type Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Type
            </label>
            <div className="flex border border-amber-300 rounded-lg overflow-hidden">
              <button
                onClick={() => handleKeyTypeChange('major')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  keyType === 'major'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-amber-800 hover:bg-amber-50'
                }`}
              >
                Major Keys
              </button>
              <button
                onClick={() => handleKeyTypeChange('minor')}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  keyType === 'minor'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-amber-800 hover:bg-amber-50'
                }`}
              >
                Minor Keys
              </button>
            </div>
          </div>

          {/* Key Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Key
            </label>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              {availableKeys.map((key: string) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Information */}
      <div className="mb-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="text-xl font-semibold text-amber-900 mb-2">
          Key of {selectedKey}
        </h3>
        <p className="text-amber-800 text-sm">
          Scale notes: {keySignatures[selectedKey]?.join(' - ') || 'Not found'}
        </p>
        <p className="text-sm mt-1">
          <span className="text-amber-800 font-semibold">Scale used:</span> <span className="text-amber-900 font-bold">{keyType === 'major' ? `${selectedKey} Major scale` : `${selectedKey.replace(/m$/, '')} Natural Minor scale`}</span>
        </p>
        <p className="mt-2 text-sm">
          <span className="text-amber-800 font-semibold">Tonic ("Home chord") of Key: </span><span className="text-amber-900 font-bold">{keyChords[0]?.chordName}</span>
        </p>
      </div>

      {/* Relative Key Section */}
      <div className="mb-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">
          Relative Key
        </h3>
        <p className="text-amber-800 text-sm mb-3">
          {keyType === 'major' 
            ? `Every major key has a relative minor key that shares the same notes. The relative minor is built on the 6th scale degree of the major scale.`
            : `Every minor key has a relative major key that shares the same notes. The relative major is built on the 3rd scale degree of the minor scale.`
          }
        </p>
        <button
          onClick={() => {
            if (keyType === 'major') {
              // Find relative minor (6th scale degree)
              const scaleNotes = keySignatures[selectedKey];
              const relativeMinorNote = scaleNotes[5]; // 6th scale degree (index 5)
              setKeyType('minor');
              setSelectedKey(`${relativeMinorNote}m`);
            } else {
              // Find relative major (3rd scale degree)
              const scaleNotes = keySignatures[selectedKey];
              const relativeMajorNote = scaleNotes[2]; // 3rd scale degree (index 2)
              setKeyType('major');
              setSelectedKey(relativeMajorNote);
            }
          }}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
        >
          {keyType === 'major' 
            ? `Go to Relative Minor (${keySignatures[selectedKey]?.[5]}m)`
            : `Go to Relative Major (${keySignatures[selectedKey]?.[2]})`
          }
        </button>
      </div>

      {/* Main Chords */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          The {keyType === 'major' ? '6 Main Chords' : '6 Main Chords'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainChords.map((chord: any, index: number) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                chord.quality === 'major'
                  ? 'bg-amber-100 border-amber-300 hover:border-amber-400'
                  : chord.quality === 'minor'
                  ? 'bg-amber-50 border-amber-200 hover:border-amber-300'
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-800">
                    {chord.chordName}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded text-white font-medium ${
                    chord.quality === 'major' 
                      ? 'bg-amber-600' 
                      : chord.quality === 'minor'
                      ? 'bg-amber-500'
                      : 'bg-gray-500'
                  }`}>
                    {chord.quality}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {chord.romanNumeral}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                Scale degree: {chord.scaleDegree}
              </div>
              
              <div className="text-sm">
                <span className="font-medium text-gray-700">Notes: </span>
                <span className="font-mono bg-white px-2 py-1 rounded border">
                  {chord.notes.join(' - ')}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Minor key V chord note */}
        {keyType === 'minor' && keyChords.length >= 5 && (
          <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <span className="text-amber-800 font-semibold">Note:</span> <span className="text-amber-700">{keyChords[4]?.chordName?.replace(/m$/, '')} is often used instead of {keyChords[4]?.chordName} for stronger resolution to the tonic chord, {keyChords[0]?.chordName}.</span>
          </div>
        )}
      </div>

      {/* Advanced Chords */}
      {advancedChord && (
        <div className="mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              The Diminished Chord
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {keyType === 'major' 
                ? `The vii° chord is diminished and built from the 7th scale degree. It's rarely used in beginner music.`
                : `The ii° chord is diminished and built from the 2nd scale degree. It's rarely used in beginner music. Most beginners focus on the other 6 chords.`
              }
            </p>
            
            <div className="p-3 bg-white rounded border border-gray-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-md font-bold text-gray-700">
                  {advancedChord.chordName}
                </span>
                <span className={`text-xs px-2 py-1 rounded text-white font-medium ${
                  advancedChord.quality === 'major' 
                    ? 'bg-amber-500' 
                    : advancedChord.quality === 'minor'
                    ? 'bg-amber-400'
                    : 'bg-gray-400'
                }`}>
                  {advancedChord.quality}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {advancedChord.romanNumeral}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-600">Notes: </span>
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                  {advancedChord.notes.join(' - ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Educational Notes */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Understanding These Chords
        </h3>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            {keyType === 'major' ? (
              <>
                <p><strong>Major chords (I, IV, V):</strong> Bright, happy sound</p>
                <p><strong>Minor chords (ii, iii, vi):</strong> Sad, emotional sound</p>
                <p><strong>Most popular progression:</strong> I-V-vi-IV</p>
              </>
            ) : (
              <>
                <p><strong>Minor chords (i, iv, v):</strong> Dark, emotional sound</p>
                <p><strong>Major chords (III, VI, VII):</strong> Bright contrast</p>
                <p><strong>Popular progression:</strong> i-VII-VI-VII</p>
              </>
            )}
          </div>
          <div className="space-y-2">
            {keyType === 'major' ? (
              <>
                <p><strong>Most popular progression:</strong> I-V-vi-IV</p>
                <p><strong>In the key of {selectedKey} major that's:</strong> {keyChords[0]?.chordName}-{keyChords[4]?.chordName}-{keyChords[5]?.chordName}-{keyChords[3]?.chordName}</p>
              </>
            ) : (
              <>
                <p><strong>Popular progression:</strong> i-VII-VI-VII</p>
                <p><strong>In the key of {selectedKey} that's:</strong> {keyChords[0]?.chordName}-{keyChords[6]?.chordName}-{keyChords[5]?.chordName}-{keyChords[6]?.chordName}</p>
              </>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Understanding the Pattern */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Understanding the Pattern
        </h3>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">The Chord Sequence</h4>
              <div>
                <div className="mb-2">
                  <span className="font-medium text-amber-800">Major Key Pattern:</span>
                  <div className="flex flex-row flex-wrap gap-2 mt-1 mb-1">
                    {[1,2,3,4,5,6,7].map(n => (
                      <span key={n} className="w-12 text-center text-xs text-gray-500 font-semibold">{n}</span>
                    ))}
                  </div>
                  <div className="flex flex-row flex-wrap gap-2 mt-0">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-semibold w-12 text-center">Maj</span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold w-12 text-center">Min</span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold w-12 text-center">Min</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-semibold w-12 text-center">Maj</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-semibold w-12 text-center">Maj</span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold w-12 text-center">Min</span>
                    <span className="px-3 py-1 rounded-full bg-gray-400 text-white font-semibold w-12 text-center">Dim</span>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-amber-800">Minor Key Pattern:</span>
                  <div className="flex flex-row flex-wrap gap-2 mt-1 mb-1">
                    {[1,2,3,4,5,6,7].map(n => (
                      <span key={n} className="w-12 text-center text-xs text-gray-500 font-semibold">{n}</span>
                    ))}
                  </div>
                  <div className="flex flex-row flex-wrap gap-2 mt-0">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold w-12 text-center">Min</span>
                    <span className="px-3 py-1 rounded-full bg-gray-400 text-white font-semibold w-12 text-center">Dim</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-semibold w-12 text-center">Maj</span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold w-12 text-center">Min</span>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold w-12 text-center">Min</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-semibold w-12 text-center">Maj</span>
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-semibold w-12 text-center">Maj</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-2">These are part of the same sequence loop - just starting from different positions!</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Memory Tricks</h4>
              <div className="space-y-2">
                <p><strong>Rule 1:</strong> In major keys, chords 1, 4, and 5 are Major chords</p>
                <p><strong>Rule 2:</strong> In minor keys, chords 1, 4, and 5 are minor chords (although sometimes we change 5 to a major chord)</p>
                <p><strong>Rule 3:</strong> The diminished chord is always in the same position: 7th in sequence for major keys, 2nd in sequence for minor keys</p>
                <p><strong>Rule 4:</strong> The remaining chords are the opposite type to the 1, 4, and 5 chord</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Major Key Example</h4>
              <p>Since the 1 chord (C) is major:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Chords 1, 4, 5 are major (C, F, G)</li>
                <li>7th chord is diminished (B°)</li>
                <li>Remaining chords 2, 3, 6 are minor (Dm, Em, Am)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Minor Key Example</h4>
              <p>Since the 1 chord (Cm) is minor:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Chords 1, 4, 5 are minor (Cm, Fm, Gm)</li>
                <li>2nd chord is diminished (D°)</li>
                <li>Remaining chords 3, 6, 7 are major (Eb, Ab, Bb)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Roman Numeral Legend */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Understanding Roman Numerals
        </h3>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Major Keys</h4>
              <div className="space-y-1 text-gray-600">
                <p><strong>I, IV, V:</strong> Uppercase = Major chords</p>
                <p><strong>ii, iii, vi:</strong> Lowercase = Minor chords</p>
                <p><strong>vii°:</strong> Lowercase + ° = Diminished chord</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Minor Keys (Natural Minor)</h4>
              <div className="space-y-1 text-gray-600">
                <p><strong>i, iv, v:</strong> Lowercase = Minor chords</p>
                <p><strong>III, VI, VII:</strong> Uppercase = Major chords</p>
                <p><strong>ii°:</strong> Lowercase + ° = Diminished chord</p>
                <p className="text-xs text-gray-500 mt-2">Note: Can also be written as bIII, bVI, bVII to show relationship to parallel major key</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Chords Section */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Other Chords
        </h3>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-gray-700 mb-4">
            You can make lots more chords than just the ones above. For example, "Seventh" chords add a fourth note called a seventh (7th) to the three-note chords shown above.
          </p>
          <p className="text-gray-700 mb-3">
            For more chord and scale diagrams see:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong><a href="/blog/scale-explorer-tool" className="text-amber-700 hover:text-amber-800 underline">Scale Explorer:</a></strong> Shows many types of chords built from different scales with fretboard diagrams
            </li>
            <li>
              <strong><a href="/blog/moveable-guitar-chord-shapes" className="text-amber-700 hover:text-amber-800 underline">Moveable Chord Shapes Library:</a></strong> Includes moveable chord shapes for major, minor, diminished, seventh chords, extended chords, suspended chords and altered chords
            </li>
            <li>
              <strong><a href="/blog/open-chord-library" className="text-amber-700 hover:text-amber-800 underline">Open Chord Library:</a></strong> Good for beginners - includes more chord progressions for a selection of keys that can be played with only open chords
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KeyChordsExplorer;