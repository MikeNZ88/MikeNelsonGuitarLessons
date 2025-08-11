'use client'

import React, { useState, useRef, useEffect } from 'react';

interface ScaleData {
  name: string;
  rootFret: number;
  scaleNotes: Array<{ string: number; fret: number; isRoot: boolean; noteType: 'root' | 'scale' | 'blues'; color?: string }>;
  fretRange: [number, number]; // [startFret, endFret] - 5 fret range
}

// Scale Editor Component Props
interface ScaleEditorProps {
  editingIndex: number | string | null;
  scales: (ScaleData | null)[];
  compareRows: Array<{ title: string; scales: (ScaleData | null)[] }>;
  compareMode: boolean;
  onUpdateScale: (index: number, scale: ScaleData) => void;
  onUpdateCompareScale: (rowIndex: number, scaleIndex: number, scale: ScaleData) => void;
  onClose: () => void;
}

// Horizontal Scale Editor Component
const ScaleEditor: React.FC<ScaleEditorProps> = ({
  editingIndex,
  scales,
  compareRows,
  compareMode,
  onUpdateScale,
  onUpdateCompareScale,
  onClose
}) => {
  const [scaleName, setScaleName] = useState('');
  const [rootFret, setRootFret] = useState(3);
  const [scaleNotes, setScaleNotes] = useState<Array<{ string: number; fret: number; isRoot: boolean; noteType: 'root' | 'scale' | 'blues'; color?: string }>>([]);
  const [selectedNoteType, setSelectedNoteType] = useState<'root' | 'scale' | 'blues'>('scale');
  const [selectedColor, setSelectedColor] = useState<string>('#7C2D12'); // Default to dark amber
  useEffect(() => {
    // Track colors used in diagrams so the legend editor can load them
    const collectColors = () => {
      const colors = new Set<string>();
      scales.forEach(scale => scale?.scaleNotes.forEach(n => n.color && colors.add(n.color)));
      try {
        localStorage.setItem('scaleDiagramUsedColors', JSON.stringify(Array.from(colors)));
      } catch {}
    };
    collectColors();
  }, [scales]);

  // Get current scale data
  const getCurrentScale = (): ScaleData | null => {
    if (typeof editingIndex === 'number') {
      return scales[editingIndex];
    } else if (typeof editingIndex === 'string') {
      const [rowIndex, scaleIndex] = editingIndex.split('-').map(Number);
      return compareRows[rowIndex]?.scales[scaleIndex] || null;
    }
    return null;
  };

  // Initialize editor with current scale data
  React.useEffect(() => {
    const currentScale = getCurrentScale();
    if (currentScale) {
      setScaleName(currentScale.name);
      setRootFret(currentScale.rootFret);
      setScaleNotes(currentScale.scaleNotes);
    } else {
      setScaleName('Scale');
      setRootFret(3);
      setScaleNotes([]);
    }
  }, [editingIndex]);

  // Calculate fret range based on root fret
  const fretRange: [number, number] = [rootFret, rootFret + 4];

  // Handle fretboard click
  const handleFretboardClick = (string: number, fret: number) => {
    const noteIndex = scaleNotes.findIndex(note => note.string === string && note.fret === fret);
    
    if (noteIndex >= 0) {
      // Remove note if it exists
      setScaleNotes(scaleNotes.filter((_, index) => index !== noteIndex));
    } else {
      // Add new note
      const newNote = {
        string,
        fret,
        isRoot: selectedNoteType === 'root',
        noteType: selectedNoteType,
        color: selectedColor
      };
      setScaleNotes([...scaleNotes, newNote]);
    }
  };

  // Save scale
  const saveScale = () => {
    const scaleData: ScaleData = {
      name: scaleName,
      rootFret,
      scaleNotes,
      fretRange
    };

    if (typeof editingIndex === 'number') {
      onUpdateScale(editingIndex, scaleData);
    } else if (typeof editingIndex === 'string') {
      const [rowIndex, scaleIndex] = editingIndex.split('-').map(Number);
      onUpdateCompareScale(rowIndex, scaleIndex, scaleData);
    }
    onClose();
  };

  // Clear all notes
  const clearAllNotes = () => {
    setScaleNotes([]);
  };

  // Render horizontal fretboard
  const renderHorizontalFretboard = () => {
    const strings = ['E', 'B', 'G', 'D', 'A', 'E']; // High E to Low E
    const frets = Array.from({ length: 5 }, (_, i) => rootFret + i);

    return (
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <div className="relative">
          {/* String labels */}
          <div className="absolute left-0 top-0 flex flex-col justify-between h-full py-4">
            {strings.map((string, stringIndex) => (
              <div key={string} className="text-sm font-bold text-gray-300 w-6 text-center">
                {string}
              </div>
            ))}
          </div>

          {/* Fretboard */}
          <div className="ml-8 relative">
            {/* Fret numbers */}
            <div className="flex justify-between mb-2">
              {frets.map(fret => (
                <div key={fret} className="text-xs text-gray-400 text-center w-16">
                  {fret}
                </div>
              ))}
            </div>

            {/* Strings and frets */}
            <div className="space-y-4">
              {strings.map((string, stringIndex) => (
                <div key={string} className="flex items-center relative">
                  {/* String line */}
                  <div className="absolute inset-0 bg-gray-500 h-0.5 z-0"></div>
                  
                  {/* Fret positions */}
                  <div className="flex justify-between w-full relative z-10">
                    {frets.map((fret, fretIndex) => {
                      const hasNote = scaleNotes.find(note => 
                        note.string === stringIndex && note.fret === fret
                      );
                      
                      return (
                        <div key={fret} className="relative">
                          <button
                            onClick={() => handleFretboardClick(stringIndex, fret)}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                              hasNote
                                ? 'border-gray-300 text-white'
                                : 'bg-gray-600 border-gray-500 hover:bg-gray-500'
                            }`}
                            style={hasNote ? { backgroundColor: hasNote.color || '#7C2D12' } : {}}
                          >
                            {hasNote && (
                              <span className="text-xs font-bold">
                                {hasNote.noteType === 'root' ? '●' : hasNote.noteType === 'blues' ? '♭' : '●'}
                              </span>
                            )}
                          </button>
                          
                          {/* Fret line */}
                          {fretIndex < frets.length - 1 && (
                            <div className="absolute left-8 top-0 w-8 h-8 border-r border-gray-600"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Scale Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Scale Name
          </label>
          <input
            type="text"
            value={scaleName}
            onChange={(e) => setScaleName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="Enter scale name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Root Fret (Start Position)
          </label>
          <select
            value={rootFret}
            onChange={(e) => setRootFret(Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map(fret => (
              <option key={fret} value={fret}>Fret {fret}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Note Type
          </label>
          <select
            value={selectedNoteType}
            onChange={(e) => setSelectedNoteType(e.target.value as 'root' | 'scale' | 'blues')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="root">Root Note</option>
            <option value="scale">Scale Note</option>
            <option value="blues">Blues Note</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Note Color
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { color: '#7C2D12', name: 'Dark Amber' },
              { color: '#A16207', name: 'Light Amber' },
              { color: '#92400E', name: 'Medium Amber' },
              { color: '#DC2626', name: 'Red' },
              { color: '#2563EB', name: 'Blue' },
              { color: '#16A34A', name: 'Green' },
              { color: '#9333EA', name: 'Purple' },
              { color: '#EA580C', name: 'Orange' }
            ].map(({ color, name }) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color 
                    ? 'border-white ring-2 ring-amber-400' 
                    : 'border-gray-400 hover:border-white'
                }`}
                style={{ backgroundColor: color }}
                title={name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <h3 className="text-blue-300 font-semibold mb-2">How to Use:</h3>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• Click on the fretboard to place/remove scale notes</li>
          <li>• Select note type and color before clicking to place notes</li>
          <li>• Use different colors to distinguish note functions (roots, chord tones, etc.)</li>
          <li>• The diagram covers a 5-fret range starting from your chosen root fret</li>
        </ul>
      </div>

      {/* Horizontal Fretboard */}
      {renderHorizontalFretboard()}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="space-x-3">
          <button
            onClick={clearAllNotes}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Clear All Notes
          </button>
        </div>
        
        <div className="space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={saveScale}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold"
          >
            Save Scale
          </button>
        </div>
      </div>
    </div>
  );
};

const ScaleDiagramBuilder: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [progressionTitle, setProgressionTitle] = useState<string>('My Scale Progression');
  const [scales, setScales] = useState<(ScaleData | null)[]>(Array(4).fill(null));
  const [editingIndex, setEditingIndex] = useState<number | string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareRowSize, setCompareRowSize] = useState(4);
  const [customText, setCustomText] = useState('');
  const [compareSubtitle, setCompareSubtitle] = useState<string[]>(['', '', '', '']); // Subtitle with 4 scale slots
  const [compareRows, setCompareRows] = useState<Array<{
    title: string;
    scales: (ScaleData | null)[];
  }>>([
    { title: 'Position 1', scales: Array(4).fill(null) },
    { title: 'Position 2', scales: Array(4).fill(null) }
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize empty scale
  const createEmptyScale = (): ScaleData => ({
    name: 'Scale',
    rootFret: 3,
    scaleNotes: [],
    fretRange: [3, 7] // Default 5-fret range starting at fret 3
  });

  // Handle grid size change
  const handleGridSizeChange = (newSize: number) => {
    setGridSize(newSize);
    const newScales = Array(newSize).fill(null);
    // Copy existing scales if they fit
    for (let i = 0; i < Math.min(scales.length, newSize); i++) {
      newScales[i] = scales[i];
    }
    setScales(newScales);
    setEditingIndex(null);
  };

  // Start editing a scale
  const startEditing = (index: number) => {
    if (!scales[index]) {
      const newScales = [...scales];
      newScales[index] = createEmptyScale();
      setScales(newScales);
    }
    setEditingIndex(index);
  };

  // Update scale data
  const updateScale = (index: number, scale: ScaleData) => {
    const newScales = [...scales];
    newScales[index] = scale;
    setScales(newScales);
  };

  // Clear a scale
  const clearScale = (index: number) => {
    const newScales = [...scales];
    newScales[index] = null;
    setScales(newScales);
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

    const newScales = [...scales];
    const draggedScale = newScales[draggedIndex];
    newScales[draggedIndex] = newScales[dropIndex];
    newScales[dropIndex] = draggedScale;
    
    setScales(newScales);
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
      scales,
      compareMode,
      compareRowSize,
      compareRows,
      compareSubtitle,
      customText,
      savedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(progressionData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const filename = `${progressionTitle.replace(/\s+/g, '_')}_scales.json`;
    
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
        if (progressionData.title && progressionData.scales && progressionData.gridSize) {
          setProgressionTitle(progressionData.title);
          setGridSize(progressionData.gridSize);
          setScales(progressionData.scales);
          if (progressionData.compareMode !== undefined) {
            setCompareMode(progressionData.compareMode);
          }
          if (progressionData.compareRows) {
            setCompareRows(progressionData.compareRows);
          }
          if (progressionData.compareRowSize !== undefined) {
            setCompareRowSize(progressionData.compareRowSize);
          }
          if (progressionData.customText) {
            setCustomText(progressionData.customText);
          }
          if (progressionData.compareSubtitle) {
            setCompareSubtitle(progressionData.compareSubtitle);
          }
          
          // Update scale array size if needed
          const targetSize = compareMode ? compareRowSize : progressionData.gridSize;
          if (scales.length !== targetSize) {
            const newScales = Array(targetSize).fill(null);
            for (let i = 0; i < Math.min(progressionData.scales.length, targetSize); i++) {
              newScales[i] = progressionData.scales[i];
            }
            setScales(newScales);
          }
          
          setEditingIndex(null);
          
          // Clear the file input
          event.target.value = '';
        } else {
          alert('Invalid scale progression file format');
        }
      } catch (error) {
        alert('Error reading scale progression file');
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  const createNewProgression = () => {
    if (scales.some(scale => scale !== null) || (compareMode && compareRows.some(row => row.scales.some(scale => scale !== null)))) {
      const confirmed = confirm('This will clear your current progression. Continue?');
      if (!confirmed) return;
    }
    
    setProgressionTitle('My Scale Progression');
    setGridSize(4);
    setScales(Array(4).fill(null));
    setCompareRows([
      { title: 'Position 1', scales: Array(compareRowSize).fill(null) },
      { title: 'Position 2', scales: Array(compareRowSize).fill(null) }
    ]);
    setCustomText('');
    setCompareSubtitle(['', '', '', '']);
    setEditingIndex(null);
  };

  // Compare mode functions
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setEditingIndex(null);
  };

  const updateCompareRow = (rowIndex: number, scaleIndex: number, scale: ScaleData) => {
    const newRows = [...compareRows];
    if (!newRows[rowIndex].scales[scaleIndex]) {
      newRows[rowIndex].scales[scaleIndex] = scale;
    } else {
      newRows[rowIndex].scales[scaleIndex] = scale;
    }
    setCompareRows(newRows);
  };

  const updateCompareRowTitle = (rowIndex: number, title: string) => {
    const newRows = [...compareRows];
    newRows[rowIndex].title = title;
    setCompareRows(newRows);
  };

  const addCompareRow = () => {
    setCompareRows([...compareRows, { 
      title: `Position ${compareRows.length + 1}`, 
      scales: Array(compareRowSize).fill(null) 
    }]);
  };

  const removeCompareRow = (rowIndex: number) => {
    if (compareRows.length > 1) {
      const newRows = compareRows.filter((_, index) => index !== rowIndex);
      setCompareRows(newRows);
    }
  };

  const clearCompareScale = (rowIndex: number, scaleIndex: number) => {
    const newRows = [...compareRows];
    newRows[rowIndex].scales[scaleIndex] = null;
    setCompareRows(newRows);
    setEditingIndex(null);
  };

  const updateCompareRowSize = (newSize: number) => {
    setCompareRowSize(newSize);
    const newRows = compareRows.map(row => {
      const newScales = Array(newSize).fill(null);
      for (let i = 0; i < Math.min(row.scales.length, newSize); i++) {
        newScales[i] = row.scales[i];
      }
      return { ...row, scales: newScales };
    });
    setCompareRows(newRows);
  };

  // Draw custom text with intelligent wrapping
  const drawCustomText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + ' ' + word;
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    // Draw each line
    lines.forEach((line, index) => {
      const lineY = y + (index * lineHeight);
      ctx.fillText(line, x, lineY);
    });
    
    return lines.length * lineHeight + 20; // Return total height with minimal padding
  };

  // Draw horizontal scale diagram
  const drawScaleDiagram = (ctx: CanvasRenderingContext2D, scale: ScaleData, x: number, y: number, width: number, height: number) => {
    const strings = ['E', 'B', 'G', 'D', 'A', 'E']; // High E to Low E
    const frets = Array.from({ length: 5 }, (_, i) => scale.rootFret + i);
    
    // Calculate dimensions with tighter fit
    const stringSpacing = height / 7; // 6 strings + minimal spacing
    const fretSpacing = width / 6; // 5 frets + minimal margins
    const startY = y + stringSpacing * 1.8; // More room for scale name
    const startX = x + fretSpacing * 0.2; // Less margin
    const diagramWidth = fretSpacing * 5.6; // Use more available width
    
    // Draw scale name (moved much higher to prevent overlap with fret numbers)
    ctx.font = 'bold italic 24px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = '#7C2D12';
    ctx.textAlign = 'center';
    ctx.fillText(scale.name, x + width / 2, y - 5);
    
    // Draw fret numbers
    ctx.font = 'bold 16px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = '#7C2D12';
    ctx.textAlign = 'center';
    frets.forEach((fret, fretIndex) => {
      const fretX = startX + (fretIndex + 0.5) * (diagramWidth / 5); // Center in fret space
      ctx.fillText(fret.toString(), fretX, startY - 15); // Moved higher
    });
    
    // Draw string labels
    ctx.font = 'bold 16px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = '#7C2D12';
    ctx.textAlign = 'center';
    strings.forEach((string, stringIndex) => {
      const stringY = startY + stringIndex * stringSpacing;
      ctx.fillText(string, startX - 20, stringY + 5);
    });
    
    // Draw strings (horizontal lines)
    ctx.strokeStyle = '#8B5CF6'; // Purple strings
    ctx.lineWidth = 2;
    strings.forEach((_, stringIndex) => {
      const stringY = startY + stringIndex * stringSpacing;
      ctx.beginPath();
      ctx.moveTo(startX, stringY);
      ctx.lineTo(startX + diagramWidth, stringY);
      ctx.stroke();
    });
    
    // Draw frets (vertical lines)
    ctx.strokeStyle = '#6B7280'; // Gray frets
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const fretX = startX + i * (diagramWidth / 5);
      ctx.beginPath();
      ctx.moveTo(fretX, startY);
      ctx.lineTo(fretX, startY + stringSpacing * 5);
      ctx.stroke();
    }
    
    // Draw scale notes
    scale.scaleNotes.forEach(note => {
      const stringY = startY + note.string * stringSpacing;
      // Position notes between fret lines (in the fret spaces)
      const fretX = startX + (note.fret - scale.rootFret + 0.5) * (diagramWidth / 5);
      
      // Set color - use custom color if specified, otherwise default based on note type
      if (note.color) {
        ctx.fillStyle = note.color; // Use custom color
      } else if (note.noteType === 'root') {
        ctx.fillStyle = '#7C2D12'; // Dark amber for root notes (same as chord diagrams)
      } else if (note.noteType === 'blues') {
        ctx.fillStyle = '#92400E'; // Medium amber for blues notes
      } else {
        ctx.fillStyle = '#A16207'; // Light amber for scale notes
      }
      
      // Draw note circle (bigger)
      ctx.beginPath();
      ctx.arc(fretX, stringY, 10, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw note symbol
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      ctx.textAlign = 'center';
      const symbol = note.noteType === 'root' ? '●' : note.noteType === 'blues' ? '♭' : '●';
      ctx.fillText(symbol, fretX, stringY + 4);
    });
  };

  // Draw empty scale diagram placeholder
  const drawEmptyScaleDiagram = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, placeholder: string) => {
    // Draw border
    ctx.strokeStyle = '#6B7280';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(x + 10, y + 10, width - 20, height - 20);
    ctx.setLineDash([]);
    
    // Draw placeholder text
    ctx.font = 'italic 20px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.fillStyle = '#9CA3AF';
    ctx.textAlign = 'center';
    ctx.fillText(placeholder, x + width / 2, y + height / 2);
  };

  // Export as image function
  const exportAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxCanvasWidth = 1080; // Optimal for Instagram/social media - same as chord builder
    const diagramWidth = compareMode ? 200 : 230; // Slightly smaller to allow more spacing
    const diagramHeight = compareMode ? 140 : 160; // Height for horizontal layout
    const spacing = compareMode ? 12 : 18; // More spacing to prevent string label overlap
    
    let canvasWidth: number;
    let canvasHeight: number;
    
    if (compareMode) {
      // Calculate required width for the largest row
      const maxRowScales = Math.max(...compareRows.map(row => row.scales.length));
      const requiredWidth = maxRowScales * diagramWidth + (maxRowScales - 1) * spacing + 80; // 80 for margins
      canvasWidth = Math.min(maxCanvasWidth, Math.max(800, requiredWidth)); // Minimum 800px
      
      // Dynamic height for compare mode based on number of rows
      const titleAreaHeight = 210; // Increased to accommodate subtitle
      const rowHeight = diagramHeight + 80; // Include space for row title
      const diagramsHeight = compareRows.length * rowHeight;
      const customTextHeight = customText.trim() ? 60 : 0; // Reduced estimate for clean text
      const brandingHeight = 120;
      const paddingHeight = 100;
      canvasHeight = titleAreaHeight + diagramsHeight + customTextHeight + brandingHeight + paddingHeight;
    } else {
      // Calculate required width for normal mode
      const rowLayouts = (() => {
        switch (gridSize) {
          case 2: return [2];
          case 3: return [3];
          case 4: return [4];
          case 5: return [3, 2];
          case 6: return [3, 3];
          case 7: return [4, 3];
          case 8: return [4, 4];
          case 9: return [3, 3, 3];
          case 10: return [4, 3, 3];
          default: return [4];
        }
      })();
      const maxRowScales = Math.max(...rowLayouts);
      const requiredWidth = maxRowScales * diagramWidth + (maxRowScales - 1) * spacing + 80; // 80 for margins
      canvasWidth = Math.min(maxCanvasWidth, Math.max(800, requiredWidth)); // Minimum 800px
      
      // Fixed dimensions for normal mode
      const titleAreaHeight = 200;
      const maxRows = Math.max(1, rowLayouts.length);
      const diagramsHeight = maxRows * (diagramHeight + 100);
      const customTextHeight = customText.trim() ? 60 : 0; // Reduced estimate for clean text
      const brandingHeight = 120;
      const paddingHeight = 100;
      canvasHeight = titleAreaHeight + diagramsHeight + customTextHeight + brandingHeight + paddingHeight;
    }
    
    // Ensure height is at least equal to width (never landscape)
    canvasHeight = Math.max(canvasHeight, canvasWidth);
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Create gradient background - same as chord builder
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#F59E0B'); // Amber
    gradient.addColorStop(1, '#D97706'); // Dark amber
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Calculate positioning - same as chord builder
    const titleY = compareMode ? 80 : 120;
    const subtitleY = titleY + 60; // New subtitle position for compare mode
    const progressionY = compareMode ? subtitleY + 60 : titleY + 80;
    const diagramsStartY = compareMode ? 240 : 280; // Adjusted for subtitle space

    // Draw title with dynamic sizing to prevent cut-off - same as chord builder
    ctx.textAlign = 'center';
    ctx.fillStyle = '#7C2D12';
    
    // Start with base font size and reduce if text is too wide
    let titleFontSize = 42;
    let titleFont = `bold italic ${titleFontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.font = titleFont;
    
    const maxTitleWidth = canvasWidth * 0.9; // Allow 90% of canvas width
    while (ctx.measureText(progressionTitle).width > maxTitleWidth && titleFontSize > 24) {
      titleFontSize -= 2;
      titleFont = `bold italic ${titleFontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      ctx.font = titleFont;
    }
    
    ctx.fillText(progressionTitle, canvasWidth / 2, titleY);

    // Draw subtitle for compare mode
    if (compareMode) {
      const filledSubtitle = compareSubtitle.filter(scale => scale.trim() !== '');
      if (filledSubtitle.length > 0) {
        ctx.font = 'italic 28px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.fillStyle = '#FEF3C7';
        const subtitleText = filledSubtitle.join(' → ');
        ctx.fillText(subtitleText, canvasWidth / 2, subtitleY);
      }
    }

    if (compareMode) {
      // Compare mode: Draw rows with titles
      compareRows.forEach((row, rowIndex) => {
        const rowY = diagramsStartY + rowIndex * (diagramHeight + 80);
        
        // Draw row title
        ctx.font = 'bold italic 32px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.fillStyle = '#FEF3C7';
        ctx.fillText(row.title, canvasWidth / 2, rowY - 20);
        
        // Draw scale diagrams in this row
        const rowWidth = compareRowSize * diagramWidth + (compareRowSize - 1) * spacing;
        const rowStartX = (canvasWidth - rowWidth) / 2;
        
        for (let scaleIndex = 0; scaleIndex < compareRowSize; scaleIndex++) {
          const scale = row.scales[scaleIndex];
          const x = rowStartX + scaleIndex * (diagramWidth + spacing);
          const y = rowY;
          
          if (scale) {
            drawScaleDiagram(ctx, scale, x, y, diagramWidth, diagramHeight);
          } else {
            drawEmptyScaleDiagram(ctx, x, y, diagramWidth, diagramHeight, `Scale ${scaleIndex + 1}`);
          }
        }
      });

      // Below-diagram Y baseline
      const textY = diagramsStartY + compareRows.length * (diagramHeight + 80) + 20;
      // Draw custom text (centered)
      if (customText.trim()) {
        ctx.font = '18px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.fillStyle = '#7C2D12';
        ctx.textAlign = 'center';
        drawCustomText(ctx, customText, canvasWidth / 2, textY, canvasWidth * 0.9, 24);
      }

      // Draw colour legend (key) on the left below the diagrams (no shading)
      try {
        const rawLegend = localStorage.getItem('scaleLegend');
        if (rawLegend) {
          const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
          if (Array.isArray(items) && items.length > 0) {
            const swatchSize = 16;
            const gap = 10;
            const xLeft = 30;
            // Position legend below custom text to avoid overlap
            const legendY = textY + (customText.trim() ? 80 : 20);
            let yCursor = legendY;
            ctx.textAlign = 'left';
            ctx.font = '18px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
            ctx.fillStyle = '#7C2D12'; // Match custom text colour
            items.forEach((it) => {
              // swatch
              ctx.fillStyle = it.color || '#FFFFFF';
              ctx.fillRect(xLeft, yCursor, swatchSize, swatchSize);
              // label
              ctx.fillStyle = '#7C2D12'; // Match custom text colour
              const labelX = xLeft + swatchSize + 10;
              const text = (it.label || '').toString();
              const maxWidth = canvasWidth * 0.35; // left column width
              let display = text;
              while (ctx.measureText(display).width > maxWidth && display.length > 3) {
                display = display.slice(0, -2);
              }
              if (display !== text) display += '…';
              ctx.fillText(display, labelX, yCursor + swatchSize - 4);
              yCursor += swatchSize + gap;
            });
          }
        }
      } catch {}
    } else {
      // Normal mode: Scale progression text removed - not relevant for scale diagrams

      // Draw diagrams using grid layout
      const rowLayouts = (() => {
        switch (gridSize) {
          case 2: return [2];
          case 3: return [3];
          case 4: return [4];
          case 5: return [3, 2];
          case 6: return [3, 3];
          case 7: return [4, 3];
          case 8: return [4, 4];
          case 9: return [3, 3, 3];
          case 10: return [4, 3, 3];
          default: return [4];
        }
      })();

      let currentIndex = 0;
      rowLayouts.forEach((rowCount, rowIndex) => {
        const rowWidth = rowCount * diagramWidth + (rowCount - 1) * spacing;
        const rowStartX = (canvasWidth - rowWidth) / 2;
        const rowY = diagramsStartY + rowIndex * (diagramHeight + 100);
        
        for (let col = 0; col < rowCount && currentIndex < scales.length; col++) {
          const scale = scales[currentIndex];
          const x = rowStartX + col * (diagramWidth + spacing);
          const y = rowY;

          if (scale) {
            drawScaleDiagram(ctx, scale, x, y, diagramWidth, diagramHeight);
          } else {
            drawEmptyScaleDiagram(ctx, x, y, diagramWidth, diagramHeight, `Scale ${currentIndex + 1}`);
          }
          currentIndex++;
        }
      });

      // Below-diagram Y baseline
      const textY = diagramsStartY + rowLayouts.length * (diagramHeight + 100) + 20;
      // Draw custom text (centered)
      if (customText.trim()) {
        ctx.font = '18px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.fillStyle = '#7C2D12';
        ctx.textAlign = 'center';
        drawCustomText(ctx, customText, canvasWidth / 2, textY, canvasWidth * 0.9, 24);
      }

      // Draw colour legend (key) on the left below the diagrams (no shading)
      try {
        const rawLegend = localStorage.getItem('scaleLegend');
        if (rawLegend) {
          const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
          if (Array.isArray(items) && items.length > 0) {
            const swatchSize = 16;
            const gap = 10;
            const xLeft = 30;
            // Position legend below custom text to avoid overlap
            const legendY = textY + (customText.trim() ? 80 : 20);
            let yCursor = legendY;
            ctx.textAlign = 'left';
            ctx.font = '18px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
            ctx.fillStyle = '#7C2D12'; // Match custom text colour
            items.forEach((it) => {
              ctx.fillStyle = it.color || '#FFFFFF';
              ctx.fillRect(xLeft, yCursor, swatchSize, swatchSize);
              ctx.fillStyle = '#7C2D12'; // Match custom text colour
              const labelX = xLeft + swatchSize + 10;
              const text = (it.label || '').toString();
              const maxWidth = canvasWidth * 0.35;
              let display = text;
              while (ctx.measureText(display).width > maxWidth && display.length > 3) {
                display = display.slice(0, -2);
              }
              if (display !== text) display += '…';
              ctx.fillText(display, labelX, yCursor + swatchSize - 4);
              yCursor += swatchSize + gap;
            });
          }
        }
      } catch {}
    }

    // Draw branding footer - same as chord builder
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

    // (legend drawing moved into branches above; no shaded panel)

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${progressionTitle.replace(/\s+/g, '_')}_scales.png`;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Scale Progression Title
        </label>
        <input
          type="text"
          value={progressionTitle}
          onChange={(e) => setProgressionTitle(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
          placeholder="Enter progression title"
        />
      </div>

      {/* Custom Text */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Custom Description Text
        </label>
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
          placeholder="Add descriptive text to your scale progression (e.g., 'Five positions of the G major pentatonic scale')"
          rows={3}
          maxLength={400}
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">
            Appears below the scale diagrams in exported image
          </span>
          <span className={`text-xs ${customText.length > 360 ? 'text-amber-400' : 'text-gray-500'}`}>
            {customText.length}/400
          </span>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="text-center">
        <button
          onClick={toggleCompareMode}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          {compareMode ? 'Switch to Normal Mode' : 'Switch to Compare Mode'}
        </button>
        <p className="text-sm text-gray-400 mt-2">
          {compareMode 
            ? 'Compare mode: Show multiple scale positions with custom row titles'
            : 'Normal mode: Create a single scale progression'
          }
        </p>
      </div>

      {/* Normal Mode Controls */}
      {!compareMode && (
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Scales
            </label>
            <select
              value={gridSize}
              onChange={(e) => handleGridSizeChange(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                <option key={size} value={size}>{size} scales</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Compare Mode Controls */}
      {compareMode && (
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scales per Row
            </label>
            <select
              value={compareRowSize}
              onChange={(e) => updateCompareRowSize(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              {[1, 2, 3, 4].map(size => (
                <option key={size} value={size}>{size} scale{size > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <button
            onClick={addCompareRow}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Add Row
          </button>
        </div>
      )}

      {/* Compare Mode UI */}
      {compareMode && (
        <div className="mb-8">
          {/* Subtitle Input for Compare Mode */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">Scale Progression Subtitle</h3>
            <p className="text-sm text-gray-400 mb-3">Add scale names or positions (e.g., G Major Pentatonic, Position 1, Position 2, Position 3)</p>
            <div className="grid grid-cols-4 gap-3">
              {compareSubtitle.map((scale, index) => (
                <div key={index} className="text-center">
                  <input
                    type="text"
                    value={scale}
                    onChange={(e) => {
                      const newSubtitle = [...compareSubtitle];
                      newSubtitle[index] = e.target.value;
                      setCompareSubtitle(newSubtitle);
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-center placeholder-gray-500"
                    placeholder={`Scale ${index + 1}`}
                  />
                  <div className="text-xs text-gray-500 mt-1">Position {index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {compareRows.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-8 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={row.title}
                  onChange={(e) => updateCompareRowTitle(rowIndex, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Row title"
                />
                {compareRows.length > 1 && (
                  <button
                    onClick={() => removeCompareRow(rowIndex)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${compareRowSize}, 1fr)` }}>
                {Array.from({ length: compareRowSize }, (_, scaleIndex) => {
                  const scale = row.scales[scaleIndex];
                  const globalIndex = `${rowIndex}-${scaleIndex}`;
                  
                  return (
                    <div key={scaleIndex} className="text-center">
                      <div
                        className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 cursor-pointer hover:border-amber-500 transition-colors h-32 flex items-center justify-center"
                        onClick={() => setEditingIndex(globalIndex)}
                      >
                        {scale ? (
                          <div className="text-center">
                            <div className="font-semibold text-amber-400">{scale.name}</div>
                            <div className="text-xs text-gray-400 mt-1">Fret {scale.rootFret}</div>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm">Scale {scaleIndex + 1}</div>
                        )}
                      </div>
                      {scale && (
                        <button
                          onClick={() => clearCompareScale(rowIndex, scaleIndex)}
                          className="mt-2 px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Normal Mode UI */}
      {!compareMode && (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(gridSize, 4)}, 1fr)`, maxWidth: `${gridSize * 200}px`, margin: '0 auto' }}>
          {scales.map((scale, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-200 ${
                dragOverIndex === index ? 'scale-105 bg-amber-900/20' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div
                className="bg-gray-800 border-2 border-gray-600 rounded-lg p-4 cursor-pointer hover:border-amber-500 transition-colors h-32 flex items-center justify-center"
                onClick={() => startEditing(index)}
              >
                {scale ? (
                  <div className="text-center">
                    <div className="font-semibold text-amber-400">{scale.name}</div>
                    <div className="text-xs text-gray-400 mt-1">Fret {scale.rootFret}</div>
                  </div>
                ) : (
                  <div className="text-gray-500">Scale {index + 1}</div>
                )}
              </div>
              {scale && (
                <button
                  onClick={() => clearScale(index)}
                  className="mt-2 px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                >
                  Clear
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* File Operations */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={createNewProgression}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          New Progression
        </button>
        <label className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer">
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
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
        >
          Save Progression
        </button>
        <button
          onClick={exportAsImage}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold"
        >
          Export as Image
        </button>
      </div>

      {/* Scale Editor Modal (placeholder) */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-400">Edit Scale Diagram</h2>
              <button
                onClick={() => setEditingIndex(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Horizontal Scale Editor */}
            <ScaleEditor
              editingIndex={editingIndex}
              scales={scales}
              compareRows={compareRows}
              compareMode={compareMode}
              onUpdateScale={updateScale}
              onUpdateCompareScale={updateCompareRow}
              onClose={() => setEditingIndex(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleDiagramBuilder; 