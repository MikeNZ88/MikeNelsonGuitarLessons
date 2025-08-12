'use client'

import React, { useState, useRef } from 'react';

interface ChordData {
  name: string;
  fretNumber: number;
  fingerPositions: Array<{ string: number; fret: number; finger?: number | 'T' }>;
  openStrings: number[];
  mutedStrings: number[];
  showFiveFrets?: boolean; // when true, render 5-fret span instead of 4
  strummingPattern?: {
    beats: Array<'D' | 'U' | null>; // 16 positions for 1,&,2,&,3,&,4,& (x2 bars) to handle wrapping
    displayMode?: 'full' | 'beats-1-2' | 'beats-3-4' | 'custom' | 'full-bar'; // which beats to show
    customRange?: { start: number; end: number }; // e.g., { start: 0, end: 3 } for beats 1-1.5
    symbolSet?: 'strum' | 'pluck'; // 'strum' = D/U, 'pluck' = P/X
  };
}

const SimpleChordProgressionBuilder: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [progressionTitle, setProgressionTitle] = useState<string>('My Chord Progression');
  const [chords, setChords] = useState<(ChordData | null)[]>(Array(4).fill(null));
  const [editingIndex, setEditingIndex] = useState<number | string | null>(null);
  const [editingStrummingIndex, setEditingStrummingIndex] = useState<number | string | null>(null);
  const [globalShowFingering, setGlobalShowFingering] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  // Drag state for copying strumming patterns between slots
  const [draggedPatternIndex, setDraggedPatternIndex] = useState<number | null>(null);
  // Clipboard for copy/paste of full chords
  const [copiedChord, setCopiedChord] = useState<ChordData | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  // Removed compareRowSize - now using per-row chordsPerRow
  const [customText, setCustomText] = useState('');
  const [customStrummingLegendText, setCustomStrummingLegendText] = useState('Chords marked as 2 bars use strumming pattern twice');
  const [showLegends, setShowLegends] = useState<boolean>(true);
  const [showStrummingLegend, setShowStrummingLegend] = useState<boolean>(true);
  const [showStrumDirections, setShowStrumDirections] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<'square' | 'portrait'>('square');
  const [strictPortrait, setStrictPortrait] = useState<boolean>(false); // Enforce exact 2:3 by padding height
  const [adaptivePortrait, setAdaptivePortrait] = useState<boolean>(false); // Enforce exact 2:3 by expanding (or scaling) width
  const [pluckMode, setPluckMode] = useState<boolean>(false); // When on, show P/X instead of D/U
  const [compareSubtitles, setCompareSubtitles] = useState<{[rowIndex: number]: string[]}>({
    0: ['', '', '', ''],
    1: ['', '', '', '']
  }); // Per-row subtitles
  const [compareRows, setCompareRows] = useState<Array<{
    title: string;
    chords: (ChordData | null)[];
    chordsPerRow: number;
  }>>([
    { title: 'Variation 1', chords: Array(4).fill(null), chordsPerRow: 4 },
    { title: 'Variation 2', chords: Array(4).fill(null), chordsPerRow: 4 }
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Global shrink/scale factor for all text (user-controlled)
  const [textScale, setTextScale] = useState<number>(1.0); // 1.0 = 100%
  const scaleSize = (size: number) => Math.max(8, Math.round(size * textScale));
  // Branding alignment toggle
  const [brandAlignRight, setBrandAlignRight] = useState<boolean>(false);
  const [brandUnderTitle, setBrandUnderTitle] = useState<boolean>(false);

  // Initialize empty chord
  const createEmptyChord = (): ChordData => ({
    name: 'Chord',
    fretNumber: 1,
    fingerPositions: [],
    openStrings: [],
    mutedStrings: [],
    showFiveFrets: false
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

  // Update strumming pattern for a chord
  const updateStrummingPattern = (index: number | string, pattern: ChordData['strummingPattern']) => {
    if (typeof index === 'string') {
      // Compare mode chord
      const [rowIndex, chordIndex] = index.split('-').map(Number);
      const newRows = [...compareRows];
      if (newRows[rowIndex].chords[chordIndex]) {
        newRows[rowIndex].chords[chordIndex]!.strummingPattern = pattern;
        setCompareRows(newRows);
      }
    } else {
      // Normal mode chord
      const newChords = [...chords];
      if (newChords[index]) {
        newChords[index]!.strummingPattern = pattern;
        setChords(newChords);
      }
    }
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
    // If a pattern drag is active, copy that pattern instead of reordering
    if (e.dataTransfer.types.includes('application/x-pattern') && draggedPatternIndex !== null) {
      const sourceIndex = draggedPatternIndex;
      const sourcePattern = chords[sourceIndex]?.strummingPattern;
      if (sourcePattern) {
        const newChords = [...chords];
        const target = newChords[dropIndex] ?? createEmptyChord();
        // Deep copy to avoid shared refs
        target.strummingPattern = JSON.parse(JSON.stringify(sourcePattern));
        newChords[dropIndex] = target;
        setChords(newChords);
      }
      setDraggedPatternIndex(null);
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

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
    setDraggedPatternIndex(null);
  };

  // Pattern drag start from a chord slot
  const handlePatternDragStart = (e: React.DragEvent, index: number) => {
    setDraggedPatternIndex(index);
    e.dataTransfer.setData('application/x-pattern', '1');
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Copy/Paste helpers for full chord
  const handleCopyChord = (index: number) => {
    const chord = chords[index];
    if (!chord) return;
    setCopiedChord(JSON.parse(JSON.stringify(chord)));
  };

  const handlePasteChord = (index: number) => {
    if (!copiedChord) return;
    const newChords = [...chords];
    newChords[index] = JSON.parse(JSON.stringify(copiedChord));
    setChords(newChords);
  };

  // Save/Load functionality
  const saveProgression = () => {
    const progressionData = {
      title: progressionTitle,
      gridSize,
      chords,
      compareMode,
      compareRows,
      compareSubtitles,
      customText,
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
          if (progressionData.compareMode !== undefined) {
            setCompareMode(progressionData.compareMode);
          }
          if (progressionData.compareRows) {
            setCompareRows(progressionData.compareRows);
          }
          // compareRowSize no longer used - using per-row chordsPerRow
          if (progressionData.showFingering !== undefined) {
            setGlobalShowFingering(progressionData.showFingering);
          }
          if (progressionData.customText) {
            setCustomText(progressionData.customText);
          }
              if (progressionData.compareSubtitles) {
      setCompareSubtitles(progressionData.compareSubtitles);
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

  // Compute a fitted font size for a given text and max width constraint.
  const getFittedFontSize = (
    ctx: CanvasRenderingContext2D,
    text: string,
    baseSize: number,
    maxWidth: number,
    minSize: number = 12,
    fontFace: string = '"Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  ): number => {
    let size = baseSize;
    ctx.font = `bold italic ${size}px ${fontFace}`;
    while (ctx.measureText(text).width > maxWidth && size > minSize) {
      size -= 1;
      ctx.font = `bold italic ${size}px ${fontFace}`;
    }
    return size;
  };

  const createNewProgression = () => {
    if (chords.some(chord => chord !== null) || (compareMode && compareRows.some(row => row.chords.some(chord => chord !== null)))) {
      const confirmed = confirm('This will clear your current progression. Continue?');
      if (!confirmed) return;
    }
    
    setProgressionTitle('My Chord Progression');
    setGridSize(4);
    setChords(Array(4).fill(null));
    setCompareRows([
      { title: 'Variation 1', chords: Array(4).fill(null), chordsPerRow: 4 },
      { title: 'Variation 2', chords: Array(4).fill(null), chordsPerRow: 4 }
    ]);
    setGlobalShowFingering(false);
    setCustomText('');
    setCompareSubtitles({
      0: Array(4).fill(''),
      1: Array(4).fill('')
    });
    setEditingIndex(null);
  };

  // Compare mode functions
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setEditingIndex(null);
  };

  const updateCompareRow = (rowIndex: number, chordIndex: number, chord: ChordData) => {
    const newRows = [...compareRows];
    newRows[rowIndex].chords[chordIndex] = chord;
    setCompareRows(newRows);
  };

  const updateCompareRowTitle = (rowIndex: number, title: string) => {
    const newRows = [...compareRows];
    newRows[rowIndex].title = title;
    setCompareRows(newRows);
  };

  const addCompareRow = () => {
    if (compareRows.length < 6) { // Max 6 rows for practical purposes
      const newRowIndex = compareRows.length;
      setCompareRows([...compareRows, { 
        title: `Variation ${compareRows.length + 1}`, 
        chords: Array(4).fill(null),
        chordsPerRow: 4
      }]);
      
      // Initialize subtitle for the new row
      const newSubtitles = { ...compareSubtitles };
      newSubtitles[newRowIndex] = Array(4).fill('');
      setCompareSubtitles(newSubtitles);
    }
  };

  const removeCompareRow = (rowIndex: number) => {
    if (compareRows.length > 1) {
      const newRows = compareRows.filter((_, index) => index !== rowIndex);
      setCompareRows(newRows);
      
      // Remove subtitle for the deleted row and reindex remaining rows
      const newSubtitles: {[rowIndex: number]: string[]} = {};
      Object.keys(compareSubtitles).forEach(rowIndexStr => {
        const oldIndex = parseInt(rowIndexStr);
        if (oldIndex < rowIndex) {
          newSubtitles[oldIndex] = compareSubtitles[oldIndex];
        } else if (oldIndex > rowIndex) {
          newSubtitles[oldIndex - 1] = compareSubtitles[oldIndex];
        }
        // Skip the deleted row (oldIndex === rowIndex)
      });
      setCompareSubtitles(newSubtitles);
    }
  };

  const clearCompareChord = (rowIndex: number, chordIndex: number) => {
    const newRows = [...compareRows];
    newRows[rowIndex].chords[chordIndex] = null;
    setCompareRows(newRows);
    setEditingIndex(null);
  };

  const updateRowChordsCount = (rowIndex: number, newSize: number) => {
    const updatedRows = [...compareRows];
    const row = updatedRows[rowIndex];
    
    // Update the specific row
    const newChords = Array(newSize).fill(null);
    // Copy existing chords up to the new size
    for (let i = 0; i < Math.min(row.chords.length, newSize); i++) {
      newChords[i] = row.chords[i];
    }
    updatedRows[rowIndex] = { ...row, chords: newChords, chordsPerRow: newSize };
    setCompareRows(updatedRows);
    
    // Update subtitle for this specific row
    const updatedSubtitles = { ...compareSubtitles };
    const currentSubtitle = compareSubtitles[rowIndex] || [];
    const newSubtitle = Array(newSize).fill('');
    // Copy existing subtitle entries up to the new size
    for (let i = 0; i < Math.min(currentSubtitle.length, newSize); i++) {
      newSubtitle[i] = currentSubtitle[i];
    }
    updatedSubtitles[rowIndex] = newSubtitle;
    setCompareSubtitles(updatedSubtitles);
  };
  
  const updateRowSubtitle = (rowIndex: number, chordIndex: number, value: string) => {
    const newSubtitles = { ...compareSubtitles };
    const row = compareRows[rowIndex];
    if (!newSubtitles[rowIndex]) {
      newSubtitles[rowIndex] = Array(row.chordsPerRow).fill('');
    }
    newSubtitles[rowIndex][chordIndex] = value;
    setCompareSubtitles(newSubtitles);
  };

  // Check if any chords exist
  const hasAnyChords = () => {
    if (compareMode) {
      return compareRows.some(row => row.chords.some(chord => chord !== null));
    } else {
      return chords.some(chord => chord !== null);
    }
  };

  // Check if any chord has a strumming pattern
  const hasAnyStrummingPattern = () => {
    if (compareMode) {
      return compareRows.some(row => 
        row.chords.some(chord => 
          chord?.strummingPattern?.beats.some(beat => beat !== null)
        )
      );
    } else {
      return chords.some(chord => 
        chord?.strummingPattern?.beats.some(beat => beat !== null)
      );
    }
  };

  // Draw chord diagram legend
  const drawChordLegend = (ctx: CanvasRenderingContext2D, x: number, y: number, maxWidth?: number, hideHeading?: boolean) => {
    // Legend sizing (respect textScale and Adaptive 2:3 bump)
    const baseLegend = aspectRatio === 'portrait' ? 18 : 14;
    const bumpedLegend = adaptivePortrait ? Math.round(baseLegend * 1.15) : baseLegend;
    const fontSize = scaleSize(bumpedLegend);
    const lineSpacing = Math.round(fontSize * 1.33);
    
    ctx.font = `italic ${fontSize}px "Poppins", sans-serif`;
    ctx.fillStyle = '#7C2D12'; // Dark amber
    ctx.textAlign = 'left';
    
    // Check if progression uses thumb (T finger)
    const usesThumb = (() => {
      if (compareMode) {
        return compareRows.some(row =>
          row.chords.some(chord =>
            chord?.fingerPositions?.some(pos => pos.finger === 'T')
          )
        );
      } else {
        return chords.some(chord =>
          chord?.fingerPositions?.some(pos => pos.finger === 'T')
        );
      }
    })();

    // Check if progression uses higher frets (not starting at fret 1)
    const usesHigherFrets = (() => {
      if (compareMode) {
        return compareRows.some(row =>
          row.chords.some(chord => chord && chord.fretNumber > 1)
        );
      } else {
        return chords.some(chord => chord && chord.fretNumber > 1);
      }
    })();

    // Build legend text dynamically
    const legendText = [hideHeading ? '' : 'Chord Diagram Guide:'];
    
    // Finger numbers line - conditional thumb explanation
    if (usesThumb) {
      legendText.push('● = Finger numbers (1,2,3,4,T = thumb)');
    } else {
      legendText.push('● = Finger numbers (1,2,3,4)');
    }
    
    // Open/muted strings line
    legendText.push('O = Open string  •  X = Unplayed or muted string');
    
    // Fret number explanation on its own line (if higher frets are used)
    if (usesHigherFrets) {
      legendText.push('Fret number = Starting position');
    }
    
    // Process text with wrapping if maxWidth is provided
    const finalLines: string[] = [];
    legendText.forEach(line => {
      if (maxWidth) {
        // Wrap text to fit within maxWidth
        const words = line.split(' ');
        let currentLine = '';
        
        words.forEach(word => {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const testWidth = ctx.measureText(testLine).width;
          
          if (testWidth > maxWidth && currentLine !== '') {
            finalLines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });
        
        if (currentLine !== '') {
          finalLines.push(currentLine);
        }
      } else {
        finalLines.push(line);
      }
    });
    
    finalLines.forEach((line, index) => {
      const lineY = y + (index * lineSpacing);
      if (index === 0) {
        ctx.font = `bold italic ${fontSize}px "Poppins", sans-serif`;
        ctx.fillText(line, x, lineY);
        ctx.font = `italic ${fontSize}px "Poppins", sans-serif`;
      } else {
        ctx.fillText(line, x, lineY);
      }
    });

    // Return the height used by the legend for proper spacing
    return finalLines.length * lineSpacing;
  };

  // Draw strumming pattern legend
  const drawStrummingLegend = (ctx: CanvasRenderingContext2D, x: number, y: number, customTwoBarsText?: string, maxWidth?: number, hideHeading?: boolean) => {
    // Legend sizing (respect textScale and Adaptive 2:3 bump)
    const baseLegend2 = aspectRatio === 'portrait' ? 18 : 14;
    const bumpedLegend2 = adaptivePortrait ? Math.round(baseLegend2 * 1.15) : baseLegend2;
    const fontSize = scaleSize(bumpedLegend2);
    const lineSpacing = Math.round(fontSize * 1.33);
    
    ctx.fillStyle = '#92400E';
    ctx.textAlign = 'left';
    
    const baseLegendText: string[] = [
      hideHeading ? '' : 'Strumming Pattern Guide:',
      'A bar lasts for 4 beats',
      '1 & 2 & 3 & 4 & = Beat counting'
    ];
    if (showStrumDirections) {
      baseLegendText.push('D = Downstroke  •  U = Upstroke');
      baseLegendText.push('D/U symbols show strum timing');
    }
    
    // Add custom 2-bars text if provided
    const legendText = [...baseLegendText];
    if (customTwoBarsText && customTwoBarsText.trim()) {
      const lines = customTwoBarsText.split(/\s+/);
      const midpoint = Math.ceil(lines.length / 2);
      legendText.push(lines.slice(0, midpoint).join(' '));
      if (lines.length > midpoint) {
        legendText.push(lines.slice(midpoint).join(' '));
      }
    }
    
    // Process text with wrapping if maxWidth is provided
    const finalLines: string[] = [];
    legendText.forEach(line => {
      if (maxWidth) {
        // Wrap text to fit within maxWidth
        const words = line.split(' ');
        let currentLine = '';
        
        words.forEach(word => {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const testWidth = ctx.measureText(testLine).width;
          
          if (testWidth > maxWidth && currentLine !== '') {
            finalLines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });
        
        if (currentLine !== '') {
          finalLines.push(currentLine);
        }
      } else {
        finalLines.push(line);
      }
    });
    
    finalLines.forEach((line, index) => {
      const lineY = y + (index * lineSpacing);
      if (index === 0) {
        ctx.font = `bold italic ${fontSize}px "Poppins", sans-serif`;
        ctx.fillText(line, x, lineY);
        ctx.font = `italic ${fontSize}px "Poppins", sans-serif`;
      } else {
        ctx.fillText(line, x, lineY);
      }
    });
  };

  // Draw custom text with intelligent wrapping and bold formatting
  const drawCustomText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    if (!text.trim()) return 0; // Return 0 height if no text
    
    // Custom text uses same scheme as legends
    const baseLegend3 = aspectRatio === 'portrait' ? 18 : 14;
    const bumpedLegend3 = adaptivePortrait ? Math.round(baseLegend3 * 1.15) : baseLegend3;
    const fontSize = scaleSize(bumpedLegend3);
    
    // Define font styles
    const regularFont = `italic ${fontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    const boldFont = `bold italic ${fontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    
    // Parse text for bold formatting (**text**)
    const parseTextSegments = (inputText: string) => {
      const segments: Array<{ text: string; isBold: boolean }> = [];
      const parts = inputText.split(/(\*\*.*?\*\*)/);
      
      parts.forEach(part => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          // Bold text (remove the ** markers)
          segments.push({ text: part.slice(2, -2), isBold: true });
        } else if (part) {
          // Regular text
          segments.push({ text: part, isBold: false });
        }
      });
      
      return segments;
    };
    
    // Function to measure text width with formatting
    const measureSegments = (segments: Array<{ text: string; isBold: boolean }>) => {
      let totalWidth = 0;
      segments.forEach(segment => {
        ctx.font = segment.isBold ? boldFont : regularFont;
        totalWidth += ctx.measureText(segment.text).width;
      });
      return totalWidth;
    };
    
    // First split by line breaks, then handle word wrapping within each line
    const inputLines = text.split(/\r?\n/);
    const finalLines: Array<Array<{ text: string; isBold: boolean }>> = [];
    
    inputLines.forEach(inputLine => {
      if (!inputLine.trim()) {
        // Empty line - preserve line breaks
        finalLines.push([]);
        return;
      }
      
      const lineSegments = parseTextSegments(inputLine);
      const words: Array<{ text: string; isBold: boolean }> = [];
      
      // Break segments into words while preserving formatting
      lineSegments.forEach(segment => {
        const segmentWords = segment.text.split(' ');
        segmentWords.forEach((word, index) => {
          if (word) {
            words.push({ text: word, isBold: segment.isBold });
          }
          // Add space after word (except last word in segment)
          if (index < segmentWords.length - 1) {
            words.push({ text: ' ', isBold: segment.isBold });
          }
        });
        // Add space between segments if there are more segments
        if (lineSegments.indexOf(segment) < lineSegments.length - 1) {
          words.push({ text: ' ', isBold: segment.isBold });
        }
      });
      
      // Wrap words into lines
      let currentLine: Array<{ text: string; isBold: boolean }> = [];
      
      for (let word of words) {
        const testLine = [...currentLine, word];
        const testWidth = measureSegments(testLine);
        
        if (testWidth > maxWidth && currentLine.length > 0) {
          finalLines.push(currentLine);
          currentLine = [word];
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine.length > 0) {
        finalLines.push(currentLine);
      }
    });
    
    // Draw text with formatting
    ctx.textAlign = 'left';
    ctx.fillStyle = '#7C2D12'; // Dark amber text to match chord names
    
    finalLines.forEach((line, lineIndex) => {
      if (line.length === 0) return; // Skip empty lines
      
      const lineY = y + (lineIndex * lineHeight);
      
      // Use left alignment - start at x position
      let currentX = x;
      
      // Draw each segment with appropriate formatting
      line.forEach(segment => {
        ctx.font = segment.isBold ? boldFont : regularFont;
        ctx.textAlign = 'left';
        ctx.fillText(segment.text, currentX, lineY);
        currentX += ctx.measureText(segment.text).width;
      });
    });
    
    return finalLines.length * lineHeight + 20; // Return total height with minimal padding
  };

  // Calculate chord legend height dynamically
  const getChordLegendHeight = () => {
    if (!hasAnyChords()) return 0;
    
    // Check if progression uses thumb (T finger)
    const usesThumb = (() => {
      if (compareMode) {
        return compareRows.some(row =>
          row.chords.some(chord =>
            chord?.fingerPositions?.some(pos => pos.finger === 'T')
          )
        );
      } else {
        return chords.some(chord =>
          chord?.fingerPositions?.some(pos => pos.finger === 'T')
        );
      }
    })();

    // Check if progression uses higher frets (not starting at fret 1)
    const usesHigherFrets = (() => {
      if (compareMode) {
        return compareRows.some(row =>
          row.chords.some(chord => chord && chord.fretNumber > 1)
        );
      } else {
        return chords.some(chord => chord && chord.fretNumber > 1);
      }
    })();

    // Calculate lines: title + finger line + open/muted line + optional fret line
    let lineCount = 3; // Base lines: title, fingers, open/muted
    if (usesHigherFrets) {
      lineCount += 1; // Add fret explanation line
    }
    
    const lineSpacing = aspectRatio === 'portrait' ? 24 : 18;
    return lineCount * lineSpacing + (aspectRatio === 'portrait' ? 15 : 10); // More padding in portrait
  };

  // Export as image
  const exportAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxCanvasWidth = 1080; // Optimal for Instagram/social media
    // Spacing scaling: if there are exactly 3 compare rows and one is split (7 or 8 chords), reduce vertical spacing
    const rowSpacingScale = (compareMode && compareRows.length === 3 && compareRows.some(r => r.chordsPerRow === 7 || r.chordsPerRow === 8)) ? 0.8 : 1.0;
    
    // Adjust diagram sizes based on aspect ratio
    let diagramSize: number;
    let splitRowDiagramSize: number;
    let spacing: number;
    
    if (aspectRatio === 'portrait') {
      // Portrait mode: baseline sizes
      diagramSize = compareMode ? 140 : (gridSize === 5 ? 90 : 120);
      splitRowDiagramSize = 120;
      spacing = compareMode ? 15 : 10; // Close spacing
      // Adaptive 2:3: make everything a bit bigger
      if (adaptivePortrait) {
        diagramSize = Math.round(diagramSize * 1.15);
        splitRowDiagramSize = Math.round(splitRowDiagramSize * 1.15);
      }
    } else {
      // Square mode: Current compact sizing
      diagramSize = compareMode ? 160 : (gridSize === 5 ? 80 : 110);
      splitRowDiagramSize = 140;
      spacing = compareMode ? 20 : 12;
    }
    
    let canvasWidth: number;
    let canvasHeight: number;
    
    if (compareMode) {
      // Calculate required width considering split rows use smaller diagrams
      const maxRowChords = Math.max(...compareRows.map(row => Math.min(row.chordsPerRow, 4)));
      const hasEightChordRows = compareRows.some(row => row.chordsPerRow === 8);
      const effectiveDiagramSize = hasEightChordRows ? Math.max(diagramSize, splitRowDiagramSize) : diagramSize;
      const requiredWidth = maxRowChords * effectiveDiagramSize + (maxRowChords - 1) * spacing + (aspectRatio === 'portrait' ? 200 : 120); // More margins in portrait
      canvasWidth = adaptivePortrait
        ? Math.max(800, requiredWidth)
        : Math.min(maxCanvasWidth, Math.max(800, requiredWidth));
      
      // Dynamic height for compare mode based on number of rows
      const isThreeRowsOneSplit = compareRows.length === 3 && compareRows.some(r => r.chordsPerRow === 7 || r.chordsPerRow === 8);
      const rowSpacingScale = isThreeRowsOneSplit ? 0.8 : 1.0;
      const titleAreaHeight = aspectRatio === 'portrait' ? 150 : 120; // More space for title in portrait
      const normalRowHeight = diagramSize + ((aspectRatio === 'portrait' ? 120 : 100) * rowSpacingScale) + ((aspectRatio === 'portrait' ? 60 : 40) * rowSpacingScale); // Scaled spacing
      const splitRowHeight = splitRowDiagramSize + ((aspectRatio === 'portrait' ? 100 : 80) * rowSpacingScale) + ((aspectRatio === 'portrait' ? 50 : 30) * rowSpacingScale); // Scaled spacing
      // Calculate height based on row types
      const diagramsHeight = compareRows.reduce((totalHeight, row) => {
        if (row.chordsPerRow === 8) {
          return totalHeight + 2 * splitRowHeight; // Two split sub-rows
        } else {
          return totalHeight + normalRowHeight; // One normal row
        }
      }, 0);
      const customTextHeight = customText.trim() ? 60 : 0; // Reduced space
      const chordLegendHeight = showLegends ? getChordLegendHeight() : 0; // Dynamic legend height
      const strummingLegendHeight = hasAnyStrummingPattern() && showStrummingLegend ? 80 : 0; // Reduced legend space
      const brandingHeight = 80; // Reduced branding area
      const paddingHeight = 40; // Reduced padding
      canvasHeight = titleAreaHeight + diagramsHeight + customTextHeight + chordLegendHeight + strummingLegendHeight + brandingHeight + paddingHeight;
      
      // Apply aspect ratio
      if (aspectRatio === 'portrait') {
        // Portrait: 2:3 ratio (width:height)
        if (strictPortrait && !adaptivePortrait) {
          // Force exact 2:3 by padding height
          canvasHeight = Math.ceil((canvasWidth * 3) / 2);
        } else if (adaptivePortrait) {
          // Enforce exact 2:3 by expanding width to fit content height if needed
          const targetWidth = Math.ceil((canvasHeight * 2) / 3);
          canvasWidth = Math.max(canvasWidth, targetWidth);
          // Then lock height to exact 2:3 of new width
          canvasHeight = Math.ceil((canvasWidth * 3) / 2);
        } else {
          // Non-strict: minimum 2:3
          canvasHeight = Math.max(canvasHeight, (canvasWidth * 3) / 2);
        }
      } else {
        // Square: 1:1 ratio
        const maxDimension = Math.max(canvasWidth, canvasHeight);
        canvasWidth = maxDimension;
        canvasHeight = maxDimension;
      }
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
      const maxRowChords = Math.max(...rowLayouts);
      const requiredWidth = maxRowChords * diagramSize + (maxRowChords - 1) * spacing + (aspectRatio === 'portrait' ? 200 : 100); // More margins in portrait
      canvasWidth = adaptivePortrait
        ? Math.max(700, requiredWidth)
        : Math.min(800, Math.max(600, requiredWidth));
      
      // Fixed dimensions for normal mode
      const titleAreaHeight = aspectRatio === 'portrait' ? 150 : 120; // More space for title in portrait
      const maxRows = Math.max(1, rowLayouts.length);
      const diagramsHeight = maxRows * (diagramSize + (aspectRatio === 'portrait' ? 100 : 80) + (aspectRatio === 'portrait' ? 60 : 40)); // More spacing in portrait
      const customTextHeight = customText.trim() ? 40 : 0; // Reduced estimate for clean text
      const chordLegendHeight = showLegends ? getChordLegendHeight() : 0; // Dynamic legend height
      const strummingLegendHeight = hasAnyStrummingPattern() && showStrummingLegend ? 80 : 0; // Reduced legend space
      const brandingHeight = 80; // Reduced branding area
      const paddingHeight = 40; // Reduced padding
      canvasHeight = titleAreaHeight + diagramsHeight + customTextHeight + chordLegendHeight + strummingLegendHeight + brandingHeight + paddingHeight;
      
      // Apply aspect ratio
      if (aspectRatio === 'portrait') {
        // Portrait: 2:3 ratio (width:height)
        canvasHeight = Math.max(canvasHeight, (canvasWidth * 3) / 2);
      } else {
        // Square: 1:1 ratio
        canvasHeight = Math.max(canvasHeight, canvasWidth);
      }
    }
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#F59E0B'); // Amber
    gradient.addColorStop(1, '#D97706'); // Dark amber
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Calculate positioning
    // Move the title higher on the page (smaller Y). Previous defaults were 80/60 (compare) and 100/80 (normal).
    const titleY = compareMode ? (aspectRatio === 'portrait' ? 60 : 45) : (aspectRatio === 'portrait' ? 80 : 60);
    const subtitleY = titleY + (aspectRatio === 'portrait' ? 80 : 60); // More space in portrait
    const progressionY = compareMode ? subtitleY + (aspectRatio === 'portrait' ? 60 : 40) : titleY + (aspectRatio === 'portrait' ? 80 : 60);
    const diagramsStartY = compareMode ? (aspectRatio === 'portrait' ? 200 : 160) : (aspectRatio === 'portrait' ? 220 : 180); // More space in portrait

    // Draw title with dynamic sizing to prevent cut-off
    ctx.textAlign = 'center';
    ctx.fillStyle = '#7C2D12';
    
    // Start with base font size and reduce if text is too wide
    let titleFontSize = scaleSize(42);
    let titleFont = `bold italic ${titleFontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.font = titleFont;
    
    const maxTitleWidth = canvasWidth * 0.9; // Allow 90% of canvas width
    while (ctx.measureText(progressionTitle).width > maxTitleWidth && titleFontSize > 24) {
      titleFontSize = Math.max(scaleSize(12), titleFontSize - 2);
      titleFont = `bold italic ${titleFontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      ctx.font = titleFont;
    }
    
    ctx.fillText(progressionTitle, canvasWidth / 2, titleY);

    // Per-row subtitles are now drawn within each row section

    if (compareMode) {
      // Compare mode: Draw rows with titles
      let currentSubRowY = diagramsStartY;
      
      compareRows.forEach((row, rowIndex) => {
        const rowLift = rowIndex === 0 ? -40 : rowIndex === 1 ? -20 : 0;
        // If this is the third row, add a small downward offset to avoid overlap with previous row
        if (rowIndex === 2) {
          currentSubRowY += 30;
        }
        // Draw row title
        ctx.font = `bold italic ${scaleSize(28)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = '#FEF3C7';
        ctx.fillText(row.title, canvasWidth / 2, currentSubRowY + rowLift - 45);
        
        // Draw row subtitle if it exists
        const rowSubtitle = compareSubtitles[rowIndex];
        if (rowSubtitle) {
          const filledSubtitle = rowSubtitle.filter(chord => chord.trim() !== '');
          if (filledSubtitle.length > 0) {
            ctx.font = `italic ${scaleSize(20)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
            ctx.fillStyle = '#FEF3C7';
            const subtitleText = filledSubtitle.join(' → ');
            ctx.fillText(subtitleText, canvasWidth / 2, currentSubRowY + rowLift - 20);
          }
        }
        
        // Handle 8-chord rows by splitting into two sub-rows
        if (row.chordsPerRow === 8) {
          // First sub-row (chords 0-3) using smaller diagrams
          const firstRowWidth = 4 * splitRowDiagramSize + 3 * spacing;
          const firstRowStartX = (canvasWidth - firstRowWidth) / 2;
          
          for (let chordIndex = 0; chordIndex < 4; chordIndex++) {
            const chord = row.chords[chordIndex];
            const x = firstRowStartX + chordIndex * (splitRowDiagramSize + spacing);
            const y = currentSubRowY + rowLift;
            
            if (chord) {
              drawChordDiagram(ctx, chord, x, y, splitRowDiagramSize);
              if (chord.strummingPattern) {
                drawStrummingPattern(ctx, chord.strummingPattern, x, y, splitRowDiagramSize);
              }
            } else {
              drawEmptyDiagram(ctx, x, y, splitRowDiagramSize, `Chord ${chordIndex + 1}`);
            }
          }
          
          // Move to next sub-row with scaled spacing
          currentSubRowY += splitRowDiagramSize + (80 * rowSpacingScale) + (30 * rowSpacingScale);
          
          // Second sub-row (chords 4-7) using smaller diagrams
          const secondRowWidth = 4 * splitRowDiagramSize + 3 * spacing;
          const secondRowStartX = (canvasWidth - secondRowWidth) / 2;
          
          for (let chordIndex = 4; chordIndex < 8; chordIndex++) {
            const chord = row.chords[chordIndex];
            const x = secondRowStartX + (chordIndex - 4) * (splitRowDiagramSize + spacing);
            const y = currentSubRowY + rowLift;
            
            if (chord) {
              drawChordDiagram(ctx, chord, x, y, splitRowDiagramSize);
              if (chord.strummingPattern) {
                drawStrummingPattern(ctx, chord.strummingPattern, x, y, splitRowDiagramSize);
              }
            } else {
              drawEmptyDiagram(ctx, x, y, splitRowDiagramSize, `Chord ${chordIndex + 1}`);
            }
          }
        } else {
          // Normal row (1-7 chords). For 7, split 4 + 3 with smaller diagrams.
          if (row.chordsPerRow === 7) {
            const marginX = aspectRatio === 'portrait' ? 120 : 100;
            const availableWidth = canvasWidth - marginX;
            const small = Math.min(
              Math.floor(diagramSize * 0.9),
              Math.floor((availableWidth - 3 * spacing) / 4) // first sub-row
            );
            // First sub-row: 4
            const firstWidth = 4 * small + 3 * spacing;
            const firstStartX = (canvasWidth - firstWidth) / 2;
            for (let chordIndex = 0; chordIndex < 4; chordIndex++) {
              const chord = row.chords[chordIndex];
              const x = firstStartX + chordIndex * (small + spacing);
              const y = currentSubRowY + rowLift;
              if (chord) {
                drawChordDiagram(ctx, chord, x, y, small);
                if (chord.strummingPattern) drawStrummingPattern(ctx, chord.strummingPattern, x, y, small, !!chord.showFiveFrets);
              } else {
                drawEmptyDiagram(ctx, x, y, small, `Chord ${chordIndex + 1}`);
              }
            }
            // Next sub-row for remaining 3
            currentSubRowY += small + Math.round(70 * rowSpacingScale);
            const smallSecond = Math.min(
              small,
              Math.floor((availableWidth - 2 * spacing) / 3)
            );
            const secondWidth = 3 * smallSecond + 2 * spacing;
            const secondStartX = (canvasWidth - secondWidth) / 2;
            for (let chordIndex = 4; chordIndex < 7; chordIndex++) {
              const chord = row.chords[chordIndex];
              const x = secondStartX + (chordIndex - 4) * (smallSecond + spacing);
              const y = currentSubRowY + rowLift;
              if (chord) {
                drawChordDiagram(ctx, chord, x, y, smallSecond);
                if (chord.strummingPattern) drawStrummingPattern(ctx, chord.strummingPattern, x, y, smallSecond, !!chord.showFiveFrets);
              } else {
                drawEmptyDiagram(ctx, x, y, smallSecond, `Chord ${chordIndex + 1}`);
              }
            }
          } else {
            const marginX = aspectRatio === 'portrait' ? 120 : 100;
            const availableWidth = canvasWidth - marginX;
            const sizeForRow = Math.min(
              diagramSize,
              Math.floor((availableWidth - (row.chordsPerRow - 1) * spacing) / row.chordsPerRow)
            );
            const rowWidth = row.chordsPerRow * sizeForRow + (row.chordsPerRow - 1) * spacing;
            const rowStartX = Math.max((canvasWidth - rowWidth) / 2, 0);
            for (let chordIndex = 0; chordIndex < row.chordsPerRow; chordIndex++) {
              const chord = row.chords[chordIndex];
              const x = rowStartX + chordIndex * (sizeForRow + spacing);
              const y = currentSubRowY + rowLift;
              if (chord) {
                drawChordDiagram(ctx, chord, x, y, sizeForRow);
                if (chord.strummingPattern) drawStrummingPattern(ctx, chord.strummingPattern, x, y, sizeForRow, !!chord.showFiveFrets);
              } else {
                drawEmptyDiagram(ctx, x, y, sizeForRow, `Chord ${chordIndex + 1}`);
              }
            }
          }
        }
        
        // Move to next row (use appropriate spacing based on row type)
        if (row.chordsPerRow === 8) {
          currentSubRowY += splitRowDiagramSize + ((aspectRatio === 'portrait' ? 100 : 80) * rowSpacingScale) + ((aspectRatio === 'portrait' ? 50 : 30) * rowSpacingScale);
        } else if (row.chordsPerRow === 7) {
          const small = Math.floor(diagramSize * 0.9);
          currentSubRowY += small + ((aspectRatio === 'portrait' ? 100 : 80) * rowSpacingScale) + ((aspectRatio === 'portrait' ? 40 : 30) * rowSpacingScale);
        } else {
          currentSubRowY += diagramSize + ((aspectRatio === 'portrait' ? 120 : 100) * rowSpacingScale) + ((aspectRatio === 'portrait' ? 60 : 40) * rowSpacingScale);
        }
      });

      // Draw legends and custom text below diagrams in two-column layout
      // Start slightly below last row; nudge up a bit more as requested
      const baseY = currentSubRowY + 4;
      const textAreaY = baseY;
      
      // Calculate column positions and widths - use exact halfway point as boundary
      const leftColumnX = 60;
      const leftColumnWidth = (canvasWidth / 2) - 120; // Much smaller left column
      const rightColumnX = canvasWidth / 2 + 40; // Start further right of center
      const rightColumnWidth = (canvasWidth / 2) - 100; // Smaller right column
      
      // Draw legends in left column
      let currentY = textAreaY;
      
      // Draw a visual boundary line for debugging (temporary)
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, textAreaY - 20);
      ctx.lineTo(canvasWidth / 2, textAreaY + 200);
      ctx.stroke();
      
      // Draw legends if enabled
      if (showLegends && hasAnyChords()) {
        const legendHeight = drawChordLegend(ctx, leftColumnX, currentY, leftColumnWidth, true);
        currentY += legendHeight; // Remove extra gap before strumming legend
      }
      
      // Draw strumming legend below chord legend if any pattern exists
      if (showLegends && showStrummingLegend && hasAnyStrummingPattern()) {
        drawStrummingLegend(ctx, leftColumnX, currentY, customStrummingLegendText, leftColumnWidth, true);
      }
      
      // Draw custom text in right column
      if (customText.trim()) {
        drawCustomText(ctx, customText, rightColumnX, textAreaY, rightColumnWidth, 27);
      }
    } else {
      // Normal mode: Draw chord progression with arrow notation
      const filledChords = chords.filter(chord => chord !== null) as ChordData[];
      if (filledChords.length > 0) {
        ctx.font = 'italic 32px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        ctx.fillStyle = '#FEF3C7';
        const chordNames = filledChords.map(c => c.name).join(' → ');
        
        // Check if text fits on one line
        const maxLineWidth = canvasWidth * 0.9;
        const textWidth = ctx.measureText(chordNames).width;
        
        if (textWidth <= maxLineWidth) {
          ctx.fillText(chordNames, canvasWidth / 2, progressionY);
        } else {
          // Adaptive sizing: compute smallest required chord-name width and scale all names equally
          const chordArray = filledChords.map(c => c.name);
          const perNameBaseSize = scaleSize(24);
          const perNameMinSize = scaleSize(12);
          const perNameMaxWidth = (canvasWidth * 0.85) / chordArray.length; // equal share heuristic

          let fittedSize = perNameBaseSize;
          chordArray.forEach(name => {
            const size = getFittedFontSize(
              ctx,
              name,
              perNameBaseSize,
              perNameMaxWidth,
              perNameMinSize
            );
            fittedSize = Math.min(fittedSize, size);
          });
          ctx.font = `bold italic ${fittedSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

          // Split into two lines
          const midPoint = Math.ceil(chordArray.length / 2);
          
          const firstLine = chordArray.slice(0, midPoint).join(' → ');
          const secondLine = chordArray.slice(midPoint).join(' → ');
          
          const lineSpacing = 40;
          ctx.fillText(firstLine, canvasWidth / 2, progressionY - lineSpacing / 2);
          ctx.fillText(secondLine, canvasWidth / 2, progressionY + lineSpacing / 2);
        }
      }

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

      // Determine a uniform name font size across all visible chord names on this canvas
      const visibleChordNames: string[] = chords.filter(Boolean).map(c => (c as ChordData).name);
      let uniformNameFontSize = 28;
      if (visibleChordNames.length > 0) {
        const perDiagramMaxWidth = diagramSize; // restrict to diagram width
        visibleChordNames.forEach(name => {
          const fitted = getFittedFontSize(ctx, name, 28, perDiagramMaxWidth, 12);
          uniformNameFontSize = Math.min(uniformNameFontSize, fitted);
        });
      }
      rowLayouts.forEach((rowCount, rowIndex) => {
        const rowWidth = rowCount * diagramSize + (rowCount - 1) * spacing;
        const rowStartX = (canvasWidth - rowWidth) / 2;
        const rowY = diagramsStartY + rowIndex * (diagramSize + (aspectRatio === 'portrait' ? 100 : 80) + (aspectRatio === 'portrait' ? 60 : 40)); // More spacing in portrait
        
        for (let col = 0; col < rowCount && currentIndex < chords.length; col++) {
          const chord = chords[currentIndex];
          const x = rowStartX + col * (diagramSize + spacing);
          const y = rowY;

          if (chord) {
            drawChordDiagram(ctx, chord, x, y, diagramSize, uniformNameFontSize);
            // Draw strumming pattern below chord diagram
            if (chord.strummingPattern) {
              drawStrummingPattern(ctx, chord.strummingPattern, x, y, diagramSize, !!chord.showFiveFrets);
            }
          } else {
            drawEmptyDiagram(ctx, x, y, diagramSize, `Chord ${currentIndex + 1}`);
          }
          currentIndex++;
        }
      });

      // Draw legends and custom text below diagrams in two-column layout
      const baseY = diagramsStartY + rowLayouts.length * (diagramSize + (aspectRatio === 'portrait' ? 100 : 80) + (aspectRatio === 'portrait' ? 60 : 40)) + 10;
      const textAreaY = baseY;
      
      // Calculate column positions and widths - use exact halfway point as boundary
      const leftColumnX = 60;
      const leftColumnWidth = (canvasWidth / 2) - 120; // Much smaller left column
      const rightColumnX = canvasWidth / 2 + 40; // Start further right of center
      const rightColumnWidth = (canvasWidth / 2) - 100; // Smaller right column
      
      // Draw legends in left column
      let currentY = textAreaY;
      
      // Draw a visual boundary line for debugging (temporary)
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvasWidth / 2, textAreaY - 20);
      ctx.lineTo(canvasWidth / 2, textAreaY + 200);
      ctx.stroke();
      
      if (hasAnyChords()) {
        const legendHeight = drawChordLegend(ctx, leftColumnX, currentY, leftColumnWidth);
        currentY += legendHeight; // Remove extra gap before strumming legend
      }
      
      if (hasAnyStrummingPattern()) {
        drawStrummingLegend(ctx, leftColumnX, currentY, customStrummingLegendText, leftColumnWidth);
      }
      
      // Draw custom text in right column
      if (customText.trim()) {
        drawCustomText(ctx, customText, rightColumnX, textAreaY, rightColumnWidth, 27);
      }
    }

    // Branding placement: either under title or as footer
    const drawBranding = (x: number, y: number, align: CanvasTextAlign) => {
      ctx.font = 'bold italic 22px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      ctx.textAlign = align;
      ctx.fillStyle = 'white';
      ctx.fillText('Mike Nelson Guitar Lessons', x, y);
      ctx.font = 'italic 20px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      ctx.textAlign = align;
      ctx.fillStyle = '#FEF3C7';
      ctx.fillText('mikenelsonguitarlessons.co.nz', x, y + 25);
    };

    if (brandUnderTitle) {
      // Position centered directly under the main page title, well above the first progression heading
      const centerX = canvasWidth / 2;
      // Move branding up 2px under the title
      const underTitleY = titleY + titleFontSize + 0;
      drawBranding(centerX, underTitleY, 'center');
    } else {
      // Footer position (left or right)
      // Move footer branding up 2px
      const footerY = canvasHeight - 50;
      const brandX = brandAlignRight ? canvasWidth - 60 : 60;
      const textAlign: CanvasTextAlign = brandAlignRight ? 'right' : 'left';
      drawBranding(brandX, footerY, textAlign);
    }

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

  // Draw strumming pattern on canvas
  const drawStrummingPattern = (
    ctx: CanvasRenderingContext2D,
    pattern: ChordData['strummingPattern'],
    x: number,
    y: number,
    size: number,
    showFiveFrets: boolean = false
  ) => {
    if (!pattern || !pattern.beats.some(beat => beat !== null)) return; // Skip if no pattern or all beats are empty
    
    const patternHeight = 46;
    // Compute the actual bottom of the diagram based on fret count
    const fretCountForLayout = showFiveFrets ? 5 : 4;
    const diagramBottomY = (y + 60) + fretCountForLayout * (size / 6);
    const patternStartY = Math.round(diagramBottomY + 14); // slightly tighter but safe gap
    const diagramCenterX = x + size / 2; // Center the pattern under the diagram
    
    // Determine which beats to show based on displayMode
    let startBeat = 0;
    let endBeat = 8;
    let beatLabels = ['1', '&', '2', '&', '3', '&', '4', '&'];
    
    switch (pattern.displayMode) {
      case 'beats-1-2':
        startBeat = 0;
        endBeat = 4;
        beatLabels = ['1', '&', '2', '&'];
        break;
      case 'beats-3-4':
        startBeat = 4;
        endBeat = 8;
        beatLabels = ['3', '&', '4', '&'];
        break;
      case 'custom':
        if (pattern.customRange) {
          startBeat = pattern.customRange.start;
          endBeat = pattern.customRange.end;
          // Generate custom labels based on the range
          const allLabels = ['1', '&', '2', '&', '3', '&', '4', '&'];
          beatLabels = allLabels.slice(startBeat, endBeat);
        }
        break;
      case 'full-bar':
        if (pattern.customRange) {
          startBeat = pattern.customRange.start;
          endBeat = pattern.customRange.end;
          // Generate wrapped labels - cycle through beat labels starting from any position
          const allLabels = ['1', '&', '2', '&', '3', '&', '4', '&'];
          beatLabels = [];
          for (let i = 0; i < (endBeat - startBeat); i++) {
            const labelIndex = (startBeat + i) % 8;
            beatLabels.push(allLabels[labelIndex]);
          }
        } else {
          startBeat = 0;
          endBeat = 8;
          beatLabels = ['1', '&', '2', '&', '3', '&', '4', '&'];
        }
        break;
      default: // 'full'
        startBeat = 0;
        endBeat = 8;
        beatLabels = ['1', '&', '2', '&', '3', '&', '4', '&'];
        break;
    }
    
    const visibleBeats = pattern.beats.slice(startBeat, endBeat);
    const visibleLabels = beatLabels.slice(0, endBeat - startBeat);
    const cellWidth = Math.min(size / visibleBeats.length, 30); // Adaptive width, max 30px per cell
    const totalWidth = cellWidth * visibleBeats.length;
    const patternStartX = diagramCenterX - totalWidth / 2;
    
    // Draw border around the pattern
    ctx.strokeStyle = '#92400E';
    ctx.lineWidth = 2;
    ctx.strokeRect(patternStartX, patternStartY, totalWidth, patternHeight);
    
    // Draw beat labels row
    ctx.font = `bold ${scaleSize(12)}px "Poppins", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#7C2D12';
    
    for (let i = 0; i < visibleLabels.length; i++) {
      const cellX = patternStartX + i * cellWidth;
      const labelY = patternStartY + 12;
      
      // Draw vertical separator
      if (i > 0) {
        ctx.beginPath();
        ctx.moveTo(cellX, patternStartY);
        ctx.lineTo(cellX, patternStartY + patternHeight);
        ctx.stroke();
      }
      
      // Draw beat label
      ctx.fillText(visibleLabels[i], cellX + cellWidth / 2, labelY);
    }
    
    // Draw horizontal separator between labels and strums
    ctx.beginPath();
    ctx.moveTo(patternStartX, patternStartY + 16);
    ctx.lineTo(patternStartX + totalWidth, patternStartY + 16);
    ctx.stroke();
    
    // Draw strumming row
    ctx.font = `bold ${scaleSize(16)}px "Poppins", sans-serif`;
    ctx.fillStyle = '#FEF3C7'; // Light amber for strums
    
    for (let i = 0; i < visibleBeats.length; i++) {
      const beat = visibleBeats[i];
      if (beat) {
        const cellX = patternStartX + i * cellWidth;
        const strumY = patternStartY + 32;
        const usePluck = (pattern.symbolSet === 'pluck') || pluckMode;
        const symbol = usePluck ? (beat === 'D' ? 'P' : beat === 'U' ? 'X' : beat) : beat;
        ctx.fillText(symbol, cellX + cellWidth / 2, strumY);
      }
    }
  };

  // Draw chord diagram on canvas
  const drawChordDiagram = (
    ctx: CanvasRenderingContext2D,
    chord: ChordData,
    x: number,
    y: number,
    size: number,
    uniformNameFontSize?: number
  ) => {
    const fretCount = chord.showFiveFrets ? 5 : 4;
    const fretSpacing = size / 6;
    const stringSpacing = size / 8;
    const diagramStartX = x + stringSpacing;
    const diagramStartY = y + 60;

    // Draw chord name (centered above the diagram) with adaptive or uniform font size
    if (uniformNameFontSize) {
      ctx.font = `bold italic ${scaleSize(uniformNameFontSize)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    } else {
      const chordNameMaxWidth = size; // cap width roughly to diagram width
      const chordNameSize = getFittedFontSize(
        ctx,
        chord.name,
        scaleSize(28),
        chordNameMaxWidth,
        scaleSize(12)
      );
      ctx.font = `bold italic ${chordNameSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    }
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
    for (let fret = 0; fret <= fretCount; fret++) {
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
      ctx.lineTo(stringX, diagramStartY + fretCount * fretSpacing);
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
        {/* Text size controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">Text size:</span>
          <button
            onClick={() => setTextScale(s => Math.max(0.6, parseFloat((s - 0.05).toFixed(2))))}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            -
          </button>
          <span className="w-16 text-center text-gray-200">{Math.round(textScale * 100)}%</span>
          <button
            onClick={() => setTextScale(s => Math.min(1.4, parseFloat((s + 0.05).toFixed(2))))}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            +
          </button>
          <button
            onClick={() => setTextScale(1.0)}
            className="ml-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
        {/* Pluck mode toggle */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={pluckMode} onChange={(e) => setPluckMode(e.target.checked)} />
            <span className="text-sm">Pluck mode (use P/X instead of D/U)</span>
          </label>
        </div>
        {/* Branding alignment */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={brandAlignRight} onChange={(e) => setBrandAlignRight(e.target.checked)} />
            <span className="text-sm">Align branding (logo + URL) to right</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={brandUnderTitle} onChange={(e) => setBrandUnderTitle(e.target.checked)} />
            <span className="text-sm">Place branding under title</span>
          </label>
        </div>
        {/* Show/Hide Legends */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showLegends} onChange={(e) => setShowLegends(e.target.checked)} />
            <span className="text-sm">Show legends (Chord + Strumming)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showStrummingLegend} onChange={(e) => setShowStrummingLegend(e.target.checked)} />
            <span className="text-sm">Show strumming legend</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!showStrumDirections}
              onChange={(e) => setShowStrumDirections(!e.target.checked)}
            />
            <span className="text-sm">Hide D/U directions line</span>
          </label>
        </div>
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

        {/* Custom Text */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <span className="flex items-center gap-2">
              <span>Custom Text</span>
              <span className="text-amber-400 text-xs">(optional)</span>
            </span>
          </label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
            placeholder="Add descriptive text to your chord progression (e.g., 'A gentle progression perfect for ballads'). Use **text** for bold."
            rows={3}
            maxLength={500}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-500">
              Appears below the chord diagrams in exported image. Use **bold** for emphasis.
            </span>
            <span className={`text-xs ${customText.length > 450 ? 'text-amber-400' : 'text-gray-500'}`}>
              {customText.length}/500
            </span>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="text-center">
          <button
            onClick={toggleCompareMode}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              compareMode 
                ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {compareMode ? 'Switch to Normal Mode' : 'Switch to Compare Mode'}
          </button>
          <p className="text-gray-400 text-sm mt-2">
            {compareMode 
              ? 'Compare mode: Show multiple variations with custom row titles' 
              : 'Normal mode: Single chord progression with arrows'
            }
          </p>
        </div>
        
        {!compareMode && (
                  <div>
            <label className="block text-sm font-medium mb-2">Number of Chords (2-10):</label>
            <div className="flex gap-2 flex-wrap">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
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
        )}
        
        {compareMode && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Configure rows individually below</label>
              </div>
              <button
                onClick={addCompareRow}
                disabled={compareRows.length >= 6}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg"
              >
                Add Row
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Compare Mode UI */}
      {compareMode && (
        <div className="mb-8">
          {/* Per-row subtitles are now included within each row */}
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
              
              {/* Per-row chord count controls */}
              <div className="mb-4 p-3 bg-gray-700 rounded-lg border border-gray-600">
                <label className="block text-sm font-medium text-amber-400 mb-2">Chords in this row (1-8):</label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(size => (
                    <button
                      key={size}
                      onClick={() => updateRowChordsCount(rowIndex, size)}
                      className={`px-3 py-1 rounded font-semibold transition-colors ${
                        row.chordsPerRow === size
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Per-row subtitle input */}
              <div className="mb-4 p-3 bg-gray-800 rounded-lg border border-gray-600">
                <h4 className="text-sm font-medium text-amber-400 mb-2">Row Subtitle (optional)</h4>
                <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${row.chordsPerRow}, 1fr)` }}>
                  {Array.from({ length: row.chordsPerRow }, (_, chordIndex) => (
                    <input
                      key={chordIndex}
                      type="text"
                      value={compareSubtitles[rowIndex]?.[chordIndex] || ''}
                      onChange={(e) => updateRowSubtitle(rowIndex, chordIndex, e.target.value)}
                      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-center text-sm placeholder-gray-500"
                      placeholder={`Chord ${chordIndex + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${row.chordsPerRow}, 1fr)` }}>
                {Array.from({ length: row.chordsPerRow }, (_, chordIndex) => {
                  const chord = row.chords[chordIndex];
                  const globalIndex = `${rowIndex}-${chordIndex}`;
                  
                  return (
                    <div key={chordIndex} className="text-center">
                      <div
                        className={`bg-gray-800 border-2 rounded-lg p-3 cursor-pointer transition-colors h-32 flex items-center justify-center ${dragOverIndex === (rowIndex * 100 + chordIndex) ? 'border-amber-300 bg-amber-900/20' : 'border-gray-600 hover:border-amber-500'}`}
                        onClick={() => setEditingIndex(globalIndex)}
                        draggable={!!chord}
                        onDragStart={(e) => {
                          // start dragging a chord from compare mode; encode as row*100+col
                          setDraggedIndex(rowIndex * 100 + chordIndex);
                          e.dataTransfer.effectAllowed = 'move';
                        }}
                        onDragOver={(e) => { e.preventDefault(); setDragOverIndex(rowIndex * 100 + chordIndex); }}
                        onDragLeave={() => setDragOverIndex(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          // support pattern copy drop as well
                          if (e.dataTransfer.types.includes('application/x-pattern') && draggedPatternIndex !== null) {
                            // draggedPatternIndex is encoded as row*100+col for compare, or index for normal
                            const srcKey = draggedPatternIndex;
                            const srcRow = Math.floor(srcKey / 100);
                            const srcChord = srcKey % 100;
                            const source = srcRow < 0 ? null : compareRows[srcRow]?.chords[srcChord];
                            if (source?.strummingPattern) {
                              const newRows = [...compareRows];
                              const target = newRows[rowIndex].chords[chordIndex] ?? createEmptyChord();
                              target.strummingPattern = JSON.parse(JSON.stringify(source.strummingPattern));
                              newRows[rowIndex].chords[chordIndex] = target;
                              setCompareRows(newRows);
                            }
                            setDraggedPatternIndex(null);
                            setDragOverIndex(null);
                            return;
                          }
                          // chord move within compare mode (same row only for now)
                          const fromKey = draggedIndex;
                          if (fromKey !== null) {
                            const fromRow = Math.floor(fromKey / 100);
                            const fromCol = fromKey % 100;
                            const newRows = [...compareRows];
                            const temp = newRows[fromRow].chords[fromCol];
                            newRows[fromRow].chords[fromCol] = newRows[rowIndex].chords[chordIndex];
                            newRows[rowIndex].chords[chordIndex] = temp;
                            setCompareRows(newRows);
                            setDraggedIndex(null);
                            setDragOverIndex(null);
                          }
                        }}
                      >
                        {chord ? (
                          <div className="text-center">
                            <div className="font-semibold text-amber-400">{chord.name}</div>
                            <div className="text-xs text-gray-400 mt-1">Fret {chord.fretNumber}</div>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm">Chord {chordIndex + 1}</div>
                        )}
                      </div>
                      {chord && (
                        <div className="mt-2 flex gap-1 justify-center">
                          <button
                            onClick={() => setEditingStrummingIndex(globalIndex)}
                            className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded text-white"
                            draggable={!!chord?.strummingPattern}
                            onDragStart={(e) => {
                              setDraggedPatternIndex(rowIndex * 100 + chordIndex);
                              e.dataTransfer.setData('application/x-pattern', '1');
                            }}
                          >
                            Pattern
                          </button>
                          <button
                            onClick={() => clearCompareChord(rowIndex, chordIndex)}
                            className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => setCopiedChord(JSON.parse(JSON.stringify(chord)))}
                            className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 rounded text-white"
                          >
                            Copy
                          </button>
                          <button
                            onClick={() => {
                              if (!copiedChord) return;
                              const newRows = [...compareRows];
                              newRows[rowIndex].chords[chordIndex] = JSON.parse(JSON.stringify(copiedChord));
                              setCompareRows(newRows);
                            }}
                            className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 rounded text-white"
                            disabled={!copiedChord}
                          >
                            Paste
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Normal Mode Chord Grid */}
      {!compareMode && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Click to edit, drag to reorder:</h2>
          <div className="space-y-4 max-w-6xl mx-auto">
            {(() => {
              // Define UI row layouts based on grid size (same as canvas)
              let uiRowLayouts: number[] = [];
              switch (gridSize) {
                case 2: uiRowLayouts = [2]; break;
                case 3: uiRowLayouts = [3]; break;
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
                          <div className="mt-2 flex gap-1 justify-center">
                            <button
                              onClick={() => setEditingStrummingIndex(index)}
                              className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded text-white"
                              draggable={!!chord?.strummingPattern}
                              onDragStart={(e) => handlePatternDragStart(e, index)}
                            >
                              Pattern
                            </button>
                            <button
                              onClick={() => clearChord(index)}
                              className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                            >
                              Clear
                            </button>
                            <button
                              onClick={() => handleCopyChord(index)}
                              className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 rounded text-white"
                            >
                              Copy
                            </button>
                            <button
                              onClick={() => handlePasteChord(index)}
                              className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 rounded text-white"
                              disabled={!copiedChord}
                            >
                              Paste
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* Chord Editor */}
      {editingIndex !== null && (
        <ChordEditor
          chord={(() => {
            if (typeof editingIndex === 'number') {
              // Normal mode
              return chords[editingIndex] || createEmptyChord();
            } else {
              // Compare mode - editingIndex is "rowIndex-chordIndex"
              const [rowIndex, chordIndex] = editingIndex.split('-').map(Number);
              return compareRows[rowIndex]?.chords[chordIndex] || createEmptyChord();
            }
          })()}
          onUpdate={(chord) => {
            if (typeof editingIndex === 'number') {
              updateChord(editingIndex, chord);
            } else {
              const [rowIndex, chordIndex] = editingIndex.split('-').map(Number);
              updateCompareRow(rowIndex, chordIndex, chord);
            }
          }}
          onClose={() => setEditingIndex(null)}
          globalShowFingering={globalShowFingering}
          setGlobalShowFingering={setGlobalShowFingering}
        />
      )}

      {/* Strumming Pattern Editor */}
      {editingStrummingIndex !== null && (
        <StrummingPatternEditor
          pattern={(() => {
            if (typeof editingStrummingIndex === 'number') {
              // Normal mode
              return chords[editingStrummingIndex]?.strummingPattern;
            } else {
              // Compare mode - editingStrummingIndex is "rowIndex-chordIndex"
              const [rowIndex, chordIndex] = editingStrummingIndex.split('-').map(Number);
              return compareRows[rowIndex]?.chords[chordIndex]?.strummingPattern;
            }
          })()}
          onUpdate={(pattern) => {
            updateStrummingPattern(editingStrummingIndex!, pattern);
          }}
          onClose={() => setEditingStrummingIndex(null)}
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
            disabled={
              compareMode 
                ? compareRows.every(row => row.chords.every(chord => chord === null))
                : chords.every(chord => chord === null)
            }
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

        {/* Aspect Ratio Control */}
        <div className="text-center mb-6">
          <div className="flex gap-3 justify-center items-center">
            <span className="text-sm font-medium text-gray-300">Aspect Ratio:</span>
            <button
              onClick={() => setAspectRatio('square')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                aspectRatio === 'square'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              Square (1:1)
            </button>
            <button
              onClick={() => setAspectRatio('portrait')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                aspectRatio === 'portrait'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              Portrait (2:3)
            </button>
            {aspectRatio === 'portrait' && (
              <>
                <label className="ml-4 inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={strictPortrait} onChange={(e) => setStrictPortrait(e.target.checked)} />
                  Strict 2:3 (pad height)
                </label>
                <label className="ml-4 inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={adaptivePortrait} onChange={(e) => setAdaptivePortrait(e.target.checked)} />
                  Adaptive 2:3 (expand width)
                </label>
              </>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {aspectRatio === 'portrait' 
              ? 'Portrait mode: More vertical space for larger diagrams and text' 
              : 'Square mode: Balanced layout for social media'
            }
          </p>
        </div>

      {/* Export */}
      <div className="text-center">
        <button
          onClick={exportAsImage}
          disabled={
            compareMode 
              ? compareRows.every(row => row.chords.every(chord => chord === null))
              : chords.every(chord => chord === null)
          }
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg"
        >
          Export as Image
        </button>
      </div>

      {/* Hidden canvas for export */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {/* Expose pluck mode for child editor to read */}
      <script
        dangerouslySetInnerHTML={{ __html: `window.__MNGL_PLUCK_MODE__ = ${pluckMode ? 'true' : 'false'};` }}
      />

      {/* Custom Strumming Legend Text */}
      <div>
        <label className="block text-sm font-medium mb-2">
          <span className="flex items-center gap-2">
            <span>Strumming Legend Text</span>
            <span className="text-amber-400 text-xs">(optional)</span>
          </span>
        </label>
        <input
          type="text"
          value={customStrummingLegendText}
          onChange={(e) => setCustomStrummingLegendText(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          placeholder="Chords marked as 2 bars use strumming pattern twice"
          maxLength={100}
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">
            Additional text for strumming pattern legend. Leave empty to hide.
          </span>
          <span className={`text-xs ${customStrummingLegendText.length > 80 ? 'text-amber-400' : 'text-gray-500'}`}>
            {customStrummingLegendText.length}/100
          </span>
        </div>
      </div>
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
          <div className="flex items-center gap-2">
            <input
              id="fiveFretsToggle"
              type="checkbox"
              checked={editChord.showFiveFrets || false}
              onChange={(e) => setEditChord({ ...editChord, showFiveFrets: e.target.checked })}
            />
            <label htmlFor="fiveFretsToggle" className="text-sm">Show 5 frets</label>
          </div>
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
      <svg width="240" height="170" viewBox="0 0 240 170" className="mx-auto">
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
        {Array.from({ length: (editChord.showFiveFrets ? 6 : 5) }, (_, i) => (
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
            y2={50 + (editChord.showFiveFrets ? 5 : 4) * 20}
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
        {Array.from({ length: (editChord.showFiveFrets ? 5 : 4) }, (_, fret) =>
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

// Strumming Pattern Editor Component
const StrummingPatternEditor: React.FC<{
  pattern: ChordData['strummingPattern'];
  onUpdate: (pattern: ChordData['strummingPattern']) => void;
  onClose: () => void;
}> = ({ pattern, onUpdate, onClose }) => {
  // Access pluck mode from parent via window flag as a simple bridge
  const [isPluckMode, setIsPluckMode] = useState<boolean>(false);
  React.useEffect(() => {
    // Read from a global set by parent render path
    // Fallback to false if not present
    // @ts-ignore
    setIsPluckMode((window as any).__MNGL_PLUCK_MODE__ ?? false);
  }, []);
  const [editPattern, setEditPattern] = useState<{
    beats: Array<'D' | 'U' | null>;
    displayMode: 'full' | 'beats-1-2' | 'beats-3-4' | 'custom' | 'full-bar';
    customRange?: { start: number; end: number }; // e.g., { start: 0, end: 3 } for beats 1-1.5
    symbolSet: 'strum' | 'pluck';
  }>({
    beats: (() => {
      const existingBeats = pattern?.beats || [];
      const paddedBeats = [...existingBeats];
      // Ensure we always have 16 positions
      while (paddedBeats.length < 16) {
        paddedBeats.push(null);
      }
      return paddedBeats;
    })(),
    displayMode: pattern?.displayMode || 'full',
    customRange: pattern?.customRange,
    symbolSet: pattern?.symbolSet || 'strum'
  });

  const beatLabels = ['1', '&', '2', '&', '3', '&', '4', '&', '1', '&', '2', '&', '3', '&', '4', '&']; // 16 positions for wrapping

  const handleBeatClick = (index: number) => {
    console.log('Beat clicked:', index, 'Current beats length:', editPattern.beats.length);
    const newBeats = [...editPattern.beats];
    const currentBeat = newBeats[index];
    const isMainBeat = index % 2 === 0; // Main beats (1,2,3,4) vs off beats (&)
    const defaultStroke = isMainBeat ? 'D' : 'U'; // Default pattern
    const oppositeStroke = isMainBeat ? 'U' : 'D'; // Opposite of default
    
    if (currentBeat === null) {
      // 1st click: Set default stroke (D for main beats, U for off beats)
      newBeats[index] = defaultStroke;
    } else if (currentBeat === defaultStroke) {
      // 2nd click: Toggle to opposite stroke
      newBeats[index] = oppositeStroke;
    } else {
      // 3rd click: Remove stroke (back to null)
      newBeats[index] = null;
    }
    
    console.log('Updated beats:', newBeats);
    setEditPattern({ ...editPattern, beats: newBeats });
  };

  const handleSave = () => {
    onUpdate({
      beats: editPattern.beats,
      displayMode: editPattern.displayMode,
      customRange: editPattern.customRange,
      symbolSet: editPattern.symbolSet
    });
    onClose();
  };

  const getVisibleRange = () => {
    switch (editPattern.displayMode) {
      case 'beats-1-2':
        return { start: 0, end: 4 }; // Beats 1-2 (indices 0-3)
      case 'beats-3-4':
        return { start: 4, end: 8 }; // Beats 3-4 (indices 4-7)
      case 'custom':
        return editPattern.customRange || { start: 0, end: 8 };
      case 'full-bar':
        if (editPattern.customRange) {
          return { start: editPattern.customRange.start, end: editPattern.customRange.end };
        }
        return { start: 0, end: 8 }; // Default full cycle from beat 1
      default:
        return { start: 0, end: 8 }; // Full bar (beats 1-4, indices 0-7)
    }
  };

  const { start, end } = getVisibleRange();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Edit Strumming Pattern</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Display Mode Selection */}
        <div className="mb-4">
          <label className="text-white text-sm font-medium mb-2 block">Display Mode:</label>
          <div className="flex gap-2">
            {[
              { value: 'full', label: 'Full Bar (1-4)' },
              { value: 'beats-1-2', label: 'Beats 1-2' },
              { value: 'beats-3-4', label: 'Beats 3-4' },
              { value: 'custom', label: 'Custom' },
              { value: 'full-bar', label: 'Full Bar Range' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setEditPattern({ ...editPattern, displayMode: option.value as 'full' | 'beats-1-2' | 'beats-3-4' | 'custom' | 'full-bar' })}
                className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                  editPattern.displayMode === option.value
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-600 hover:bg-gray-500 text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Choose which beats to display. Full Bar Range = all 8 beats for chords that span across bars
          </p>
        </div>

        {/* Symbol Set (Strum vs Pluck) */}
        <div className="mb-4">
          <label className="text-white text-sm font-medium mb-2 block">Symbols:</label>
          <div className="flex gap-2">
            {[{ value: 'strum', label: 'Strum (D/U)' }, { value: 'pluck', label: 'Pluck (P/X)' }].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setEditPattern({ ...editPattern, symbolSet: opt.value as 'strum' | 'pluck' })}
                className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                  editPattern.symbolSet === opt.value
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-600 hover:bg-gray-500 text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">Choose how beats should render (D/U or P/X). Stored per chord.</p>
        </div>

        {/* Strumming Grid */}
        <div className="mb-4">
          <div className="border border-gray-600 rounded">
            {/* Beat labels row */}
            <div className={`grid border-b border-gray-600`} style={{ gridTemplateColumns: `repeat(${end - start}, 1fr)` }}>
              {beatLabels.slice(start, end).map((label, index) => {
                const actualIndex = start + index;
                const isNextBar = actualIndex >= 8;
                const displayLabel = isNextBar ? `${label}*` : label; // Add * for next bar
                return (
                  <div key={index} className="p-2 text-center text-white text-sm font-medium border-r border-gray-600 last:border-r-0">
                    {displayLabel}
                  </div>
                );
              })}
            </div>
            
            {/* Strumming pattern row */}
            <div className={`grid`} style={{ gridTemplateColumns: `repeat(${end - start}, 1fr)` }}>
              {editPattern.beats.slice(start, end).map((beat, index) => {
                const actualIndex = start + index;
                const isMainBeat = actualIndex % 2 === 0;
                return (
                  <button
                    key={actualIndex}
                    onClick={() => handleBeatClick(actualIndex)}
                    className={`p-3 text-center border-r border-gray-600 last:border-r-0 transition-colors ${
                      beat 
                        ? 'bg-amber-500 text-black font-bold' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                    }`}
                  >
                    {(() => {
                      const fallback = isMainBeat ? 'D' : 'U';
                      const sym = beat || fallback;
                      const usePluckSymbols = editPattern.symbolSet === 'pluck' || isPluckMode;
                      if (usePluckSymbols) return sym === 'D' ? 'P' : sym === 'U' ? 'X' : sym;
                      return sym;
                    })()}
                  </button>
                );
              })}
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mt-2">
            Click beats: 1st = Default pattern, 2nd = Toggle D↔U, 3rd = Remove stroke
          </p>
          
          {/* D/U Toggle Button */}
          <div className="mt-3">
            <button
              onClick={() => {
                const newBeats = editPattern.beats.map(beat => {
                  if (beat === 'D') return 'U';
                  if (beat === 'U') return 'D';
                  return beat;
                });
                setEditPattern({ ...editPattern, beats: newBeats });
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm font-medium transition-colors"
            >
              Swap All D ↔ U
            </button>
            <p className="text-xs text-gray-400 mt-1">
              Quickly swap all downstrokes and upstrokes
            </p>
          </div>
        </div>

        {editPattern.displayMode === 'custom' && (
          <div className="mb-4 bg-gray-800 p-3 rounded border border-gray-600">
            <label className="text-white text-sm font-medium mb-2 block">Custom Beat Range:</label>
            <div className="flex gap-2 items-center">
              <span className="text-white text-sm">From:</span>
              <select
                value={editPattern.customRange?.start || 0}
                onChange={(e) => setEditPattern({
                  ...editPattern,
                  customRange: {
                    start: parseInt(e.target.value),
                    end: editPattern.customRange?.end || 3
                  }
                })}
                className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <option key={i} value={i}>
                    {i === 0 ? '1' : i === 1 ? '1&' : i === 2 ? '2' : i === 3 ? '2&' : 
                     i === 4 ? '3' : i === 5 ? '3&' : i === 6 ? '4' : '4&'}
                  </option>
                ))}
              </select>
              <span className="text-white text-sm">To:</span>
              <select
                value={editPattern.customRange?.end || 3}
                onChange={(e) => setEditPattern({
                  ...editPattern,
                  customRange: {
                    start: editPattern.customRange?.start || 0,
                    end: parseInt(e.target.value)
                  }
                })}
                className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <option key={i} value={i}>
                    {i === 1 ? '1&' : i === 2 ? '2' : i === 3 ? '2&' : i === 4 ? '3' : 
                     i === 5 ? '3&' : i === 6 ? '4' : i === 7 ? '4&' : 'End'}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Example: From "1" to "2&" = 1.5 beats (1 beat + 1/2 beat)
            </p>
          </div>
        )}

        {editPattern.displayMode === 'full-bar' && (
          <div className="mb-4 bg-gray-800 p-3 rounded border border-gray-600">
            <label className="text-white text-sm font-medium mb-2 block">Full Cycle Range:</label>
            <div className="flex gap-2 items-center">
              <span className="text-white text-sm">From:</span>
              <select
                value={editPattern.customRange?.start || 0}
                onChange={(e) => setEditPattern({
                  ...editPattern,
                  customRange: {
                    start: parseInt(e.target.value),
                    end: editPattern.customRange?.end || 8
                  }
                })}
                className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <option key={i} value={i}>
                    {i === 0 ? '1' : i === 1 ? '1&' : i === 2 ? '2' : i === 3 ? '2&' : 
                     i === 4 ? '3' : i === 5 ? '3&' : i === 6 ? '4' : '4&'}
                  </option>
                ))}
              </select>
              <span className="text-white text-sm">To:</span>
              <select
                value={editPattern.customRange?.end || 8}
                onChange={(e) => setEditPattern({
                  ...editPattern,
                  customRange: {
                    start: editPattern.customRange?.start || 0,
                    end: parseInt(e.target.value)
                  }
                })}
                className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
              >
                {[8, 9, 10, 11, 12, 13, 14, 15].map(i => (
                  <option key={i} value={i}>
                    {i === 8 ? '1 (next)' : i === 9 ? '1& (next)' : i === 10 ? '2 (next)' : i === 11 ? '2& (next)' : 
                     i === 12 ? '3 (next)' : i === 13 ? '3& (next)' : i === 14 ? '4 (next)' : '4& (next)'}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Example: From "2&" to "2 (next)" = 2& in current bar to 2 in next bar
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded"
          >
            Save Pattern
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