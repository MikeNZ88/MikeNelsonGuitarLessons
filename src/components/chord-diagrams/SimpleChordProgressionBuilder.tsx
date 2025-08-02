'use client'

import React, { useState, useRef } from 'react';

interface ChordData {
  name: string;
  fretNumber: number;
  fingerPositions: Array<{ string: number; fret: number; finger?: number | 'T' }>;
  openStrings: number[];
  mutedStrings: number[];
}

const SimpleChordProgressionBuilder: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [progressionTitle, setProgressionTitle] = useState<string>('My Chord Progression');
  const [chords, setChords] = useState<(ChordData | null)[]>(Array(4).fill(null));
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [globalShowFingering, setGlobalShowFingering] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize empty chord
  const createEmptyChord = (): ChordData => ({
    name: 'Chord',
    fretNumber: 1,
    fingerPositions: [],
    openStrings: [],
    mutedStrings: []
  });

  // Handle grid size change
  const handleGridSizeChange = (newSize: number) => {
    setGridSize(newSize);
    const newChords = Array(newSize).fill(null);
    // Copy existing chords if they fit
    for (let i = 0; i < Math.min(chords.length, newSize); i++) {
      newChords[i] = chords[i];
    }
    setChords(newChords);
    setEditingIndex(null);
  };

  // Start editing a chord
  const startEditing = (index: number) => {
    if (!chords[index]) {
      const newChords = [...chords];
      newChords[index] = createEmptyChord();
      setChords(newChords);
    }
    setEditingIndex(index);
  };

  // Update chord data
  const updateChord = (index: number, chord: ChordData) => {
    const newChords = [...chords];
    newChords[index] = chord;
    setChords(newChords);
  };

  // Clear a chord
  const clearChord = (index: number) => {
    const newChords = [...chords];
    newChords[index] = null;
    setChords(newChords);
    setEditingIndex(null);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newChords = [...chords];
    const draggedChord = newChords[draggedIndex];
    const targetChord = newChords[dropIndex];
    
    // Swap the chords
    newChords[draggedIndex] = targetChord;
    newChords[dropIndex] = draggedChord;
    
    setChords(newChords);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Save/Load functionality
  const saveProgression = () => {
    const progressionData = {
      title: progressionTitle,
      gridSize,
      chords,
      showFingering: globalShowFingering,
      savedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(progressionData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const filename = `${progressionTitle.replace(/\s+/g, '_')}_progression.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
  };

  const loadProgression = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const progressionData = JSON.parse(result);
        
        // Validate the data structure
        if (progressionData.title && progressionData.chords && progressionData.gridSize) {
          setProgressionTitle(progressionData.title);
          setGridSize(progressionData.gridSize);
          setChords(progressionData.chords);
          if (progressionData.showFingering !== undefined) {
            setGlobalShowFingering(progressionData.showFingering);
          }
          
          // Update chord array size if needed
          const newSize = progressionData.gridSize;
          if (progressionData.chords.length !== newSize) {
            const newChords = Array(newSize).fill(null);
            progressionData.chords.forEach((chord: ChordData | null, index: number) => {
              if (index < newSize) {
                newChords[index] = chord;
              }
            });
            setChords(newChords);
          }
          
          alert(`Loaded progression: ${progressionData.title}`);
        } else {
          alert('Invalid progression file format');
        }
      } catch (error) {
        alert('Error loading progression file');
      }
    };
    
    reader.readAsText(file);
    // Reset the input so the same file can be loaded again
    event.target.value = '';
  };

  const createNewProgression = () => {
    if (chords.some(chord => chord !== null)) {
      const confirmed = confirm('This will clear your current progression. Continue?');
      if (!confirmed) return;
    }
    
    setProgressionTitle('My Chord Progression');
    setGridSize(4);
    setChords(Array(4).fill(null));
    setGlobalShowFingering(false);
    setEditingIndex(null);
  };

  // Export as image
  const exportAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define row layouts based on grid size
    let rowLayouts: number[] = [];
    switch (gridSize) {
      case 4: rowLayouts = [4]; break;
      case 5: rowLayouts = [3, 2]; break;
      case 6: rowLayouts = [3, 3]; break;
      case 7: rowLayouts = [4, 3]; break;
      case 8: rowLayouts = [4, 4]; break;
      case 9: rowLayouts = [3, 3, 3]; break;
      case 10: rowLayouts = [4, 3, 3]; break;
      default: rowLayouts = [4]; break;
    }

    // Fixed canvas dimensions based on 10-chord layout for consistent social media sizing
    const canvasWidth = 1200;
    const diagramSize = 260;
    const spacing = 35;
    
    // Use fixed dimensions based on 10-chord layout [4, 3, 3] = 3 rows
    const titleAreaHeight = 200; // Space for title and progression text
    const maxRows = 3; // Maximum rows from 10-chord layout
    const diagramsHeight = maxRows * (diagramSize + 100); // Height for maximum diagram rows
    const brandingHeight = 120; // Space for branding footer
    const paddingHeight = 100; // Extra padding
    
    const canvasHeight = titleAreaHeight + diagramsHeight + brandingHeight + paddingHeight;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#F59E0B'); // Amber
    gradient.addColorStop(1, '#D97706'); // Dark amber
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Use the diagram size and spacing already defined above
    const maxRowWidth = Math.max(...rowLayouts) * diagramSize + (Math.max(...rowLayouts) - 1) * spacing;
    
    // Calculate positioning with title higher up
    const titleY = 120; // Fixed position higher up on the page
    const progressionY = titleY + 80; // Increased space after title
    
    // Position diagrams to maintain their current good positioning
    const diagramsStartY = 280; // Keep diagrams where they look good

    // Draw title (same color as chord diagram circles)
    ctx.font = 'bold italic 42px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#7C2D12'; // Same as finger position circles
    ctx.fillText(progressionTitle, canvasWidth / 2, titleY);

    // Draw chord names progression with dynamic line wrapping
    const filledChords = chords.filter(chord => chord !== null) as ChordData[];
    if (filledChords.length > 0) {
      ctx.font = 'italic 32px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#FEF3C7';
      const chordNames = filledChords.map(c => c.name).join(' → ');
      
      // Check if text fits on one line (90% of canvas width for margins)
      const maxLineWidth = canvasWidth * 0.9;
      const textWidth = ctx.measureText(chordNames).width;
      
      if (textWidth <= maxLineWidth) {
        // Single line
        ctx.fillText(chordNames, canvasWidth / 2, progressionY);
      } else {
        // Split into two lines - find a good break point
        const chordArray = filledChords.map(c => c.name);
        const midPoint = Math.ceil(chordArray.length / 2);
        
        const firstLine = chordArray.slice(0, midPoint).join(' → ');
        const secondLine = chordArray.slice(midPoint).join(' → ');
        
        // Draw two lines with spacing
        const lineSpacing = 40;
        ctx.fillText(firstLine, canvasWidth / 2, progressionY - lineSpacing / 2);
        ctx.fillText(secondLine, canvasWidth / 2, progressionY + lineSpacing / 2);
      }
    }

    // Draw each chord diagram using custom row layouts
    let currentIndex = 0;
    rowLayouts.forEach((rowCount, rowIndex) => {
      const rowWidth = rowCount * diagramSize + (rowCount - 1) * spacing;
      const rowStartX = (canvasWidth - rowWidth) / 2;
      const rowY = diagramsStartY + rowIndex * (diagramSize + 100);
      
      for (let col = 0; col < rowCount && currentIndex < chords.length; col++) {
        const chord = chords[currentIndex];
        const x = rowStartX + col * (diagramSize + spacing);
        const y = rowY;

        if (chord) {
          drawChordDiagram(ctx, chord, x, y, diagramSize);
        } else {
          // Draw empty placeholder
          drawEmptyDiagram(ctx, x, y, diagramSize, `Chord ${currentIndex + 1}`);
        }
        currentIndex++;
      }
    });

    // Draw branding footer
    const footerY = canvasHeight - 70;
    
    // Draw "Mike Nelson Guitar Lessons"
    ctx.font = 'bold italic 24px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('Mike Nelson Guitar Lessons', canvasWidth / 2, footerY);
    
    // Draw website URL
    ctx.font = 'italic 18px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = '#FEF3C7';
    ctx.fillText('mikenelsonguitarlessons.co.nz', canvasWidth / 2, footerY + 30);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${progressionTitle.replace(/\s+/g, '_')}_chords.png`;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  // Calculate barre lines for a chord
  const getBarreLinesForChord = (chord: ChordData) => {
    const barreLines: Array<{ 
      fret: number; 
      finger: number | 'T'; 
      startString: number; 
      endString: number; 
    }> = [];

    if (!globalShowFingering) return barreLines;

    // Group finger positions by finger and fret
    const fingerGroups: { [key: string]: Array<{ string: number; fret: number; finger?: number | 'T' }> } = {};
    
    chord.fingerPositions.forEach(pos => {
      if (pos.finger) {
        const key = `${pos.finger}-${pos.fret}`;
        if (!fingerGroups[key]) {
          fingerGroups[key] = [];
        }
        fingerGroups[key].push(pos);
      }
    });

    // Create barre lines for groups with 2 or more positions on the same fret
    Object.entries(fingerGroups).forEach(([key, positions]) => {
      if (positions.length >= 2) {
        const [finger, fret] = key.split('-');
        const strings = positions.map(p => p.string).sort((a, b) => a - b);
        const startString = strings[0];
        const endString = strings[strings.length - 1];
        
        barreLines.push({
          fret: parseInt(fret),
          finger: finger === 'T' ? 'T' : parseInt(finger),
          startString,
          endString
        });
      }
    });

    return barreLines;
  };

  // Draw chord diagram on canvas
  const drawChordDiagram = (ctx: CanvasRenderingContext2D, chord: ChordData, x: number, y: number, size: number) => {
    const fretSpacing = size / 6;
    const stringSpacing = size / 8;
    const diagramStartX = x + stringSpacing;
    const diagramStartY = y + 60;

    // Draw chord name (centered above the diagram) - same color as diagrams
    ctx.font = 'bold italic 28px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    const diagramCenterX = diagramStartX + (5 * stringSpacing) / 2; // Center of the 6-string diagram
    ctx.fillStyle = '#7C2D12'; // Same color as finger positions
    ctx.fillText(chord.name, diagramCenterX, y + 20); // Moved higher to avoid overlap with open/muted strings

    // Draw fret number (only if greater than 1) to the left of first fret
    if (chord.fretNumber > 1) {
      ctx.font = 'italic 22px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      ctx.textAlign = 'right';
      // Draw stroke first (thicker and darker amber)
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 3;
      ctx.strokeText(chord.fretNumber.toString(), diagramStartX - 15, diagramStartY + fretSpacing * 0.5);
      // Draw fill on top
      ctx.fillStyle = '#7C2D12';
      ctx.fillText(chord.fretNumber.toString(), diagramStartX - 15, diagramStartY + fretSpacing * 0.5);
      ctx.textAlign = 'center'; // Reset text align
    }

    // Draw fret lines
    ctx.strokeStyle = '#92400E';
    ctx.lineWidth = 3;
    for (let fret = 0; fret <= 4; fret++) {
      const fretY = diagramStartY + fret * fretSpacing;
      ctx.beginPath();
      ctx.moveTo(diagramStartX, fretY);
      ctx.lineTo(diagramStartX + 5 * stringSpacing, fretY);
      ctx.stroke();
    }

    // Draw string lines
    ctx.lineWidth = 2;
    for (let string = 0; string < 6; string++) {
      const stringX = diagramStartX + string * stringSpacing;
      ctx.beginPath();
      ctx.moveTo(stringX, diagramStartY);
      ctx.lineTo(stringX, diagramStartY + 4 * fretSpacing);
      ctx.stroke();
    }

    // Draw barre lines first (behind finger circles)
    if (globalShowFingering) {
      const barreLines = getBarreLinesForChord(chord);
      ctx.strokeStyle = '#7C2D12';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      
      barreLines.forEach(barre => {
        const startX = diagramStartX + (barre.startString - 1) * stringSpacing;
        const endX = diagramStartX + (barre.endString - 1) * stringSpacing;
        const y = diagramStartY + (barre.fret - chord.fretNumber + 0.5) * fretSpacing;
        
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      });
    }

    // Draw finger positions
    ctx.fillStyle = '#7C2D12';
    chord.fingerPositions.forEach(pos => {
      const fingerX = diagramStartX + (pos.string - 1) * stringSpacing;
      const fingerY = diagramStartY + (pos.fret - chord.fretNumber + 0.5) * fretSpacing; // Centered between fret lines
      
      ctx.beginPath();
      ctx.arc(fingerX, fingerY, 12, 0, 2 * Math.PI); // Increased from 8 to 12
      ctx.fill();
      
      // Draw finger number if fingering is enabled
      if (globalShowFingering && pos.finger) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pos.finger.toString(), fingerX, fingerY + 4);
        ctx.fillStyle = '#7C2D12'; // Reset color for next circle
      }
    });

    // Draw open and muted strings
    ctx.font = 'bold 18px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    for (let string = 1; string <= 6; string++) {
      const stringX = diagramStartX + (string - 1) * stringSpacing;
      const stringY = diagramStartY - 15;
      
      if (chord.openStrings.includes(string)) {
        ctx.fillStyle = '#7C2D12'; // Same color as finger positions
        ctx.fillText('O', stringX, stringY);
      } else if (chord.mutedStrings.includes(string)) {
        ctx.fillStyle = '#7F1D1D';
        ctx.fillText('X', stringX, stringY);
      }
    }
  };

  // Draw empty diagram placeholder
  const drawEmptyDiagram = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, placeholder: string) => {
    const fretSpacing = size / 6;
    const stringSpacing = size / 8;
    const diagramStartX = x + stringSpacing;
    const diagramStartY = y + 60;

    // Draw placeholder text (centered above the diagram)
    ctx.fillStyle = '#7C2D12';
    ctx.font = 'italic 24px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    const diagramCenterX = diagramStartX + (5 * stringSpacing) / 2; // Center of the 6-string diagram
    ctx.fillText(placeholder, diagramCenterX, y + 20); // Moved higher to match chord names

    // Draw light fret lines
    ctx.strokeStyle = '#FEF3C7';
    ctx.lineWidth = 1;
    for (let fret = 0; fret <= 4; fret++) {
      const fretY = diagramStartY + fret * fretSpacing;
      ctx.beginPath();
      ctx.moveTo(diagramStartX, fretY);
      ctx.lineTo(diagramStartX + 5 * stringSpacing, fretY);
      ctx.stroke();
    }

    // Draw light string lines
    for (let string = 0; string < 6; string++) {
      const stringX = diagramStartX + string * stringSpacing;
      ctx.beginPath();
      ctx.moveTo(stringX, diagramStartY);
      ctx.lineTo(stringX, diagramStartY + 4 * fretSpacing);
      ctx.stroke();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white font-sans">
      <h1 className="text-3xl font-bold italic text-center mb-8" style={{ fontFamily: '"Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>Simple Chord Progression Builder</h1>
      
      {/* Controls */}
      <div className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Progression Title:</label>
          <input
            type="text"
            value={progressionTitle}
            onChange={(e) => setProgressionTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
            placeholder="Enter progression title"
          />
        </div>
        
                  <div>
            <label className="block text-sm font-medium mb-2">Number of Chords (4-10):</label>
            <div className="flex gap-2 flex-wrap">
              {[4, 5, 6, 7, 8, 9, 10].map(size => (
                <button
                  key={size}
                  onClick={() => handleGridSizeChange(size)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    gridSize === size
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
      </div>

      {/* Chord Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Click to edit, drag to reorder:</h2>
        <div className="space-y-4 max-w-6xl mx-auto">
          {(() => {
            // Define UI row layouts based on grid size (same as canvas)
            let uiRowLayouts: number[] = [];
            switch (gridSize) {
              case 4: uiRowLayouts = [4]; break;
              case 5: uiRowLayouts = [3, 2]; break;
              case 6: uiRowLayouts = [3, 3]; break;
              case 7: uiRowLayouts = [4, 3]; break;
              case 8: uiRowLayouts = [4, 4]; break;
              case 9: uiRowLayouts = [3, 3, 3]; break;
              case 10: uiRowLayouts = [4, 3, 3]; break;
              default: uiRowLayouts = [4]; break;
            }
            
            let currentIndex = 0;
            return uiRowLayouts.map((rowCount, rowIndex) => (
              <div key={rowIndex} className={`grid gap-4 justify-center`} style={{ gridTemplateColumns: `repeat(${rowCount}, 1fr)`, maxWidth: `${rowCount * 200}px`, margin: '0 auto' }}>
                {Array.from({ length: rowCount }, (_, colIndex) => {
                  if (currentIndex >= chords.length) return null;
                  const chord = chords[currentIndex];
                  const index = currentIndex++;
                  
                  return (
                    <div key={index} className="text-center">
                      <div
                        className={`bg-gray-800 border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          dragOverIndex === index 
                            ? 'border-amber-300 bg-amber-900/20' 
                            : draggedIndex === index
                            ? 'border-amber-500 opacity-50'
                            : 'border-gray-600 hover:border-amber-500'
                        }`}
                        draggable={chord !== null}
                        onClick={() => startEditing(index)}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        style={{ cursor: chord ? 'grab' : 'pointer' }}
                      >
                        <ChordDiagramPreview chord={chord} index={index + 1} />
                      </div>
                      {chord && (
                        <button
                          onClick={() => clearChord(index)}
                          className="mt-2 px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ));
          })()}
        </div>
      </div>

      {/* Chord Editor */}
      {editingIndex !== null && chords[editingIndex] && (
        <ChordEditor
          chord={chords[editingIndex]!}
          onUpdate={(chord) => updateChord(editingIndex, chord)}
          onClose={() => setEditingIndex(null)}
          globalShowFingering={globalShowFingering}
          setGlobalShowFingering={setGlobalShowFingering}
        />
      )}

      {/* Save/Load Controls */}
      <div className="text-center mb-6">
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={createNewProgression}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            New Progression
          </button>
          
          <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer">
            Load Progression
            <input
              type="file"
              accept=".json"
              onChange={loadProgression}
              className="hidden"
            />
          </label>
          
          <button
            onClick={saveProgression}
            disabled={chords.every(chord => chord === null)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Save Progression
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Save your chord progressions as JSON files and load them later for editing
        </p>
      </div>

      {/* Global Fingering Control */}
      <div className="text-center mb-6">
        <button
          onClick={() => setGlobalShowFingering(!globalShowFingering)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            globalShowFingering 
              ? 'bg-amber-600 hover:bg-amber-700 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          {globalShowFingering ? 'Hide Fingering in Export' : 'Show Fingering in Export'}
        </button>
        {globalShowFingering && (
          <p className="text-gray-400 text-sm mt-2">
            Fingering numbers and barre lines will be included in exported images
          </p>
        )}
      </div>

      {/* Export */}
      <div className="text-center">
        <button
          onClick={exportAsImage}
          disabled={chords.every(chord => chord === null)}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg"
        >
          Export as Image
        </button>
      </div>

      {/* Hidden canvas for export */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

// Chord diagram preview component
const ChordDiagramPreview: React.FC<{ chord: ChordData | null; index: number }> = ({ chord, index }) => {
  if (!chord) {
    return (
      <div className="h-32 flex flex-col items-center justify-center text-gray-400">
        <div className="text-sm mb-2">Chord {index}</div>
        <div className="text-xs">Click to edit</div>
      </div>
    );
  }

  return (
    <div className="h-32">
      <div className="text-sm font-semibold italic mb-1" style={{ 
        textShadow: '0 0 3px #F59E0B, 0 0 6px #F59E0B', 
        color: 'white' 
      }}>{chord.name}</div>
      <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto">
        {/* Fret lines */}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={`fret-${i}`}
            x1="10"
            y1={15 + i * 12}
            x2="70"
            y2={15 + i * 12}
            stroke="#374151"
            strokeWidth="2"
          />
        ))}
        
        {/* String lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`string-${i}`}
            x1={10 + i * 12}
            y1="15"
            x2={10 + i * 12}
            y2="63"
            stroke="#374151"
            strokeWidth="1"
          />
        ))}
        
        {/* Fret number (if > 1) */}
        {chord.fretNumber > 1 && (
          <text x="-2" y="21" textAnchor="start" fontSize="6" fill="white" stroke="#F59E0B" strokeWidth="0.3" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" fontWeight="bold" fontStyle="italic">
            {chord.fretNumber}
          </text>
        )}
        
        {/* Finger positions */}
        {chord.fingerPositions.map((pos, i) => (
          <circle
            key={i}
            cx={10 + (pos.string - 1) * 12}
            cy={15 + (pos.fret - chord.fretNumber + 0.5) * 12}
            r="4"
            fill="#F59E0B"
          />
        ))}
        
        {/* Open/muted strings */}
        {Array.from({ length: 6 }, (_, i) => {
          const string = i + 1;
          const x = 10 + i * 12;
          if (chord.openStrings.includes(string)) {
            return <text key={`open-${i}`} x={x} y="10" textAnchor="middle" fontSize="8" fill="#F59E0B" stroke="white" strokeWidth="0.5" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" fontWeight="bold" fontStyle="italic">O</text>;
          } else if (chord.mutedStrings.includes(string)) {
            return <text key={`muted-${i}`} x={x} y="10" textAnchor="middle" fontSize="8" fill="#EF4444" stroke="white" strokeWidth="0.5" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" fontWeight="bold" fontStyle="italic">X</text>;
          }
          return null;
        })}
      </svg>
    </div>
  );
};

// Inline chord editor component
const ChordEditor: React.FC<{
  chord: ChordData;
  onUpdate: (chord: ChordData) => void;
  onClose: () => void;
  globalShowFingering: boolean;
  setGlobalShowFingering: (show: boolean) => void;
}> = ({ chord, onUpdate, onClose, globalShowFingering, setGlobalShowFingering }) => {
  const [editChord, setEditChord] = useState<ChordData>({ ...chord });
  const [selectedFinger, setSelectedFinger] = useState<number | 'T'>(1);
  
  // Use global fingering state
  const showFingering = globalShowFingering;
  const setShowFingering = setGlobalShowFingering;

  const handleFretboardClick = (string: number, fret: number) => {
    const newChord = { ...editChord };
    
    // Remove existing finger on this string
    newChord.fingerPositions = newChord.fingerPositions.filter(pos => pos.string !== string);
    
    // Add new finger position
    if (fret > 0) {
      newChord.fingerPositions.push({ 
        string, 
        fret: fret + newChord.fretNumber - 1,
        finger: showFingering ? selectedFinger : undefined
      });
    }
    
    // Remove from open/muted if placing finger
    newChord.openStrings = newChord.openStrings.filter(s => s !== string);
    newChord.mutedStrings = newChord.mutedStrings.filter(s => s !== string);
    
    setEditChord(newChord);
  };

  const handleStringStateClick = (string: number) => {
    const newChord = { ...editChord };
    
    // Remove any finger positions on this string
    newChord.fingerPositions = newChord.fingerPositions.filter(pos => pos.string !== string);
    
    // Cycle through states: Normal -> Open -> Muted -> Normal
    if (newChord.openStrings.includes(string)) {
      // Open -> Muted
      newChord.openStrings = newChord.openStrings.filter(s => s !== string);
      newChord.mutedStrings.push(string);
    } else if (newChord.mutedStrings.includes(string)) {
      // Muted -> Normal
      newChord.mutedStrings = newChord.mutedStrings.filter(s => s !== string);
    } else {
      // Normal -> Open
      newChord.openStrings.push(string);
    }
    
    setEditChord(newChord);
  };

  // Calculate barre lines - group positions by finger and fret
  const getBarreLines = () => {
    const barreLines: Array<{ 
      fret: number; 
      finger: number | 'T'; 
      startString: number; 
      endString: number; 
    }> = [];

    if (!showFingering) return barreLines;

    // Group finger positions by finger and fret
    const fingerGroups: { [key: string]: Array<{ string: number; fret: number; finger?: number | 'T' }> } = {};
    
    editChord.fingerPositions.forEach(pos => {
      if (pos.finger) {
        const key = `${pos.finger}-${pos.fret}`;
        if (!fingerGroups[key]) {
          fingerGroups[key] = [];
        }
        fingerGroups[key].push(pos);
      }
    });

    // Create barre lines for groups with 2 or more positions on the same fret
    Object.entries(fingerGroups).forEach(([key, positions]) => {
      if (positions.length >= 2) {
        const [finger, fret] = key.split('-');
        const strings = positions.map(p => p.string).sort((a, b) => a - b);
        const startString = strings[0];
        const endString = strings[strings.length - 1];
        
        barreLines.push({
          fret: parseInt(fret),
          finger: finger === 'T' ? 'T' : parseInt(finger),
          startString,
          endString
        });
      }
    });

    return barreLines;
  };

  const handleSave = () => {
    onUpdate(editChord);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold italic mb-4" style={{ 
          textShadow: '0 0 4px #D97706, 0 0 8px #D97706',
          color: '#D97706'
        }}>Edit Chord</h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Chord Name:</label>
            <input
              type="text"
              value={editChord.name}
              onChange={(e) => setEditChord({ ...editChord, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Starting Fret:</label>
            <input
              type="number"
              min="1"
              max="12"
              value={editChord.fretNumber}
              onChange={(e) => setEditChord({ ...editChord, fretNumber: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Click to place fingers, click above strings to set Open(O)/Muted(X):</div>
          <div className="bg-gray-900 p-4 rounded">
            <svg width="240" height="160" viewBox="0 0 240 160" className="mx-auto">
              {/* String state buttons */}
              {Array.from({ length: 6 }, (_, i) => {
                const string = i + 1;
                const x = 30 + i * 30;
                const isOpen = editChord.openStrings.includes(string);
                const isMuted = editChord.mutedStrings.includes(string);
                
                return (
                  <g key={`string-state-${i}`}>
                    <circle
                      cx={x}
                      cy="20"
                      r="10"
                      fill={isOpen ? "#F59E0B" : isMuted ? "#EF4444" : "#374151"}
                      className="cursor-pointer"
                      onClick={() => handleStringStateClick(string)}
                    />
                    <text
                      x={x}
                      y="25"
                      textAnchor="middle"
                      fontSize="12"
                      fill="white"
                      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                      fontWeight="bold"
                      fontStyle="italic"
                      className="cursor-pointer pointer-events-none"
                    >
                      {isOpen ? "O" : isMuted ? "X" : "•"}
                    </text>
                  </g>
                );
              })}
              
              {/* Fret lines */}
              {Array.from({ length: 5 }, (_, i) => (
                <line
                  key={`fret-${i}`}
                  x1="30"
                  y1={50 + i * 20}
                  x2="180"
                  y2={50 + i * 20}
                  stroke="#666"
                  strokeWidth="2"
                />
              ))}
              
              {/* String lines */}
              {Array.from({ length: 6 }, (_, i) => (
                <line
                  key={`string-${i}`}
                  x1={30 + i * 30}
                  y1="50"
                  x2={30 + i * 30}
                  y2="130"
                  stroke="#666"
                  strokeWidth="1"
                />
              ))}
              
              {/* Fret number (if > 1) */}
              {editChord.fretNumber > 1 && (
                <text 
                  x="15" 
                  y="60" 
                  textAnchor="end" 
                  fontSize="12" 
                  fill="white" 
                  stroke="#F59E0B" 
                  strokeWidth="0.5"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                  fontWeight="bold"
                  fontStyle="italic"
                >
                  {editChord.fretNumber}
                </text>
              )}
              
              {/* Clickable fret areas */}
              {Array.from({ length: 4 }, (_, fret) =>
                Array.from({ length: 6 }, (_, string) => (
                  <rect
                    key={`click-${fret}-${string}`}
                    x={30 + string * 30 - 10}
                    y={50 + fret * 20}
                    width="20"
                    height="20"
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => handleFretboardClick(string + 1, fret + 1)}
                  />
                ))
              )}
              
              {/* Barre lines */}
              {getBarreLines().map((barre, index) => {
                const startX = 30 + (barre.startString - 1) * 30;
                const endX = 30 + (barre.endString - 1) * 30;
                const y = 50 + (barre.fret - editChord.fretNumber + 0.5) * 20;
                
                return (
                  <line
                    key={`barre-${index}`}
                    x1={startX}
                    y1={y}
                    x2={endX}
                    y2={y}
                    stroke="#F59E0B"
                    strokeWidth="6"
                  />
                );
              })}
              
              {/* Finger positions */}
              {editChord.fingerPositions.map((pos, i) => (
                <g key={i}>
                  <circle
                    cx={30 + (pos.string - 1) * 30}
                    cy={50 + (pos.fret - editChord.fretNumber + 0.5) * 20}
                    r="8"
                    fill="#F59E0B"
                  />
                  {/* Finger number */}
                  {showFingering && pos.finger && (
                    <text
                      x={30 + (pos.string - 1) * 30}
                      y={50 + (pos.fret - editChord.fretNumber + 0.5) * 20 + 3}
                      textAnchor="middle"
                      fontSize="10"
                      fill="black"
                      fontWeight="bold"
                    >
                      {pos.finger}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Fingering Controls */}
        <div className="mb-4">
          <div className="flex justify-center mb-3">
            <button
              onClick={() => setShowFingering(!showFingering)}
              className={`px-4 py-2 rounded transition-colors ${
                showFingering 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              {showFingering ? 'Hide Fingering' : 'Show Fingering'}
            </button>
          </div>
          
          {showFingering && (
            <div className="flex justify-center gap-2">
              <span className="text-white text-sm self-center mr-2">Selected finger:</span>
              {([1, 2, 3, 4, 'T'] as const).map((finger) => (
                <button
                  key={finger}
                  onClick={() => setSelectedFinger(finger)}
                  className={`w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                    selectedFinger === finger
                      ? 'bg-amber-500 text-black'
                      : 'bg-gray-600 hover:bg-gray-500 text-white'
                  }`}
                >
                  {finger}
                </button>
              ))}
            </div>
          )}
          
          {showFingering && (
            <div className="text-center text-xs text-gray-400 mt-2">
              Same finger on same fret creates automatic barre lines
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleChordProgressionBuilder; 