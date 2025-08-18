import React, { useEffect, useMemo, useRef, useState } from 'react';
import { amberDarkTheme, IChordRenderTheme } from '@/theme/chordRenderTheme';

// Mirror chord data model used in the main builder (trimmed to essentials for v1)
export interface ChordData {
  name: string;
  fretNumber: number;
  fingerPositions: Array<{ string: number; fret: number; finger?: number | 'T' }>;
  openStrings: number[];
  mutedStrings: number[];
  showFiveFrets?: boolean;
}

export type CarouselSlide = {
  id: string;
  title: string; // per-slide legacy; will be overridden when a global title is passed
  subtitle?: string;
  // Layout: support up to 3 rows
  numRows: 1 | 2 | 3;
  rowSizes: number[]; // length === numRows, each 2..10
  chords: (ChordData | null)[]; // length === sum(rowSizes)
  chordTexts?: string[]; // optional per-chord labels
  labelXOffset?: number;
  customText: string;
  showLegends: boolean;
  centerLegendText: boolean;
  legendOffset: number;
  patternsOffset: number;
  customTextOffset: number;
  brandAlign?: 'left' | 'center' | 'right';
  brandOffsetX?: number;
  brandOffsetY?: number;
  brandScale?: number;
};

type Props = {
  slides: CarouselSlide[];
  setSlides: (updater: (prev: CarouselSlide[]) => CarouselSlide[]) => void;
  textScale?: number;
  externalCopiedChord?: ChordData | null;
  setExternalCopiedChord?: (chord: ChordData | null) => void;
  globalTitle?: string;
  showNoteNames?: boolean;
  theme?: IChordRenderTheme;
};

const createEmptyChord = (): ChordData => ({
  name: 'Chord',
  fretNumber: 1,
  fingerPositions: [],
  openStrings: [],
  mutedStrings: [],
  showFiveFrets: false
});

const createSlide = (): CarouselSlide => ({
  id: crypto.randomUUID(),
  title: 'Slide',
  numRows: 1,
  rowSizes: [4],
  chords: Array(4).fill(null),
  chordTexts: Array(4).fill(''),
  labelXOffset: 0,
  customText: '',
  showLegends: true,
  centerLegendText: true,
  legendOffset: 0,
  patternsOffset: 0,
  customTextOffset: 0,
  brandAlign: 'center',
  brandOffsetX: 0,
  brandOffsetY: 0,
  brandScale: 1.0,
});

export const CarouselMode: React.FC<Props> = ({ slides, setSlides, textScale = 1.0, externalCopiedChord, setExternalCopiedChord, globalTitle, showNoteNames = false, theme }) => {
  const THEME = theme ?? amberDarkTheme;
  const [selected, setSelected] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copiedChord, setCopiedChord] = useState<ChordData | null>(null);

  const slide = slides[selected];

  const addSlide = () => setSlides((prev) => [...prev, createSlide()]);
  const duplicateSlide = (idx: number) => setSlides((prev) => {
    const s = prev[idx];
    if (!s) return prev;
    const copy: CarouselSlide = { ...s, id: crypto.randomUUID(), title: s.title + ' (copy)' };
    const next = [...prev];
    next.splice(idx + 1, 0, copy);
    return next;
  });
  const removeSlide = (idx: number) => setSlides((prev) => prev.filter((_, i) => i !== idx));
  const moveSlide = (idx: number, dir: -1 | 1) => setSlides((prev) => {
    const j = idx + dir;
    if (j < 0 || j >= prev.length) return prev;
    const next = [...prev];
    const [it] = next.splice(idx, 1);
    next.splice(j, 0, it);
    return next;
  });

  const updateSlide = (partial: Partial<CarouselSlide>) => setSlides((prev) => {
    const next = [...prev];
    next[selected] = { ...next[selected], ...partial } as CarouselSlide;
    return next;
  });

  const updateChord = (index: number, chord: ChordData) => setSlides(prev => {
    const next = [...prev];
    const s = { ...next[selected] };
    const arr = [...s.chords];
    arr[index] = chord;
    s.chords = arr;
    // keep chordTexts in sync length-wise
    const total = s.chords.length;
    const texts = (s.chordTexts && s.chordTexts.length ? s.chordTexts.slice(0, total) : Array(total).fill(''));
    while (texts.length < total) texts.push('');
    s.chordTexts = texts;
    next[selected] = s;
    return next;
  });

  const ensureChord = (index: number): ChordData => slide.chords[index] ?? createEmptyChord();
  const getPasteSource = (): ChordData | null => {
    return externalCopiedChord ?? copiedChord ?? null;
  };
  const putCopy = (ch: ChordData) => {
    setCopiedChord(JSON.parse(JSON.stringify(ch)));
    setExternalCopiedChord && setExternalCopiedChord(JSON.parse(JSON.stringify(ch)));
  };

  // Drawing helpers (self-contained copies)
  const drawChordDiagram = (
    ctx: CanvasRenderingContext2D,
    chord: ChordData,
    x: number,
    y: number,
    size: number
  ) => {
    const fretCount = chord.showFiveFrets ? 5 : 4;
    const fretSpacing = size / 6;
    const stringSpacing = size / 8;
    const diagramStartX = x + stringSpacing;
    const diagramStartY = y + 60;

    // Name
    ctx.font = `bold italic ${Math.max(12, Math.round(28 * textScale))}px "Poppins", sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = THEME.colors.chordName;
    const diagramCenterX = diagramStartX + (5 * stringSpacing) / 2;
    ctx.fillText(chord.name, diagramCenterX, y + 20);

    // Fret number (left of first fret)
    if (chord.fretNumber > 1) {
      ctx.font = `italic ${Math.max(10, Math.round(22 * textScale))}px "Poppins", sans-serif`;
      ctx.textAlign = 'right';
      ctx.strokeStyle = THEME.colors.accentStroke;
      ctx.lineWidth = 3;
      ctx.strokeText(String(chord.fretNumber), diagramStartX - 15, diagramStartY + fretSpacing * 0.5);
      ctx.fillStyle = THEME.colors.chordName;
      ctx.fillText(String(chord.fretNumber), diagramStartX - 15, diagramStartY + fretSpacing * 0.5);
      ctx.textAlign = 'center';
    }

    // Fret lines (including nut area)
    ctx.strokeStyle = THEME.colors.gridStroke;
    ctx.lineWidth = 3;
    for (let fret = 0; fret <= fretCount; fret++) {
      const fretY = diagramStartY + fret * fretSpacing;
      ctx.beginPath();
      ctx.moveTo(diagramStartX, fretY);
      ctx.lineTo(diagramStartX + 5 * stringSpacing, fretY);
      ctx.stroke();
    }

    // Strings
    ctx.lineWidth = 2;
    for (let string = 0; string < 6; string++) {
      const stringX = diagramStartX + string * stringSpacing;
      ctx.beginPath();
      ctx.moveTo(stringX, diagramStartY);
      ctx.lineTo(stringX, diagramStartY + fretCount * fretSpacing);
      ctx.stroke();
    }

    // Open/Muted markers above first fretline (nut area)
    ctx.font = `bold italic ${Math.max(10, Math.round(18 * textScale))}px "Poppins", sans-serif`;
    ctx.textAlign = 'center';
    for (let s = 1; s <= 6; s++) {
      const stringX = diagramStartX + (s - 1) * stringSpacing;
      if (chord.openStrings.includes(s)) {
        ctx.fillStyle = THEME.colors.openMutedText;
        ctx.fillText('O', stringX, diagramStartY - fretSpacing * 0.5);
      } else if (chord.mutedStrings.includes(s)) {
        ctx.fillStyle = THEME.colors.openMutedText;
        ctx.fillText('X', stringX, diagramStartY - fretSpacing * 0.5);
      }
    }

    // Helper to compute note names (C C# D ...)
    const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    const stringBaseSemitones = [4, 9, 2, 7, 11, 4]; // E A D G B E (low->high), if string 1 is low E
    const getNoteName = (stringIndex1based: number, absoluteFret: number): string => {
      const idx = Math.min(6, Math.max(1, stringIndex1based)) - 1;
      const base = stringBaseSemitones[idx];
      const note = (base + absoluteFret) % 12;
      return NOTE_NAMES[note];
    };

    // Finger dots (relative to starting fret like main builder)
    ctx.fillStyle = THEME.colors.fingerFill;
    chord.fingerPositions.forEach(pos => {
      const sIdx = pos.string - 1;
      const relFret = pos.fret - chord.fretNumber; // 0 => first displayed fret
      if (sIdx < 0 || sIdx > 5 || relFret < 0 || relFret > fretCount - 1) return;
      const cx = diagramStartX + sIdx * stringSpacing;
      const cy = diagramStartY + (relFret + 0.5) * fretSpacing;
      const r = Math.max(8, Math.round((stringSpacing / 2) * 0.9));
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      if (showNoteNames) {
        const note = getNoteName(pos.string, pos.fret);
        ctx.fillStyle = THEME.colors.fingerInnerTextPrimary;
        ctx.font = `bold ${Math.max(10, Math.round(13 * textScale))}px "Poppins", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(note, cx, cy + 4);
        ctx.fillStyle = THEME.colors.fingerFill;
      } else if (pos.finger) {
        ctx.fillStyle = THEME.colors.fingerInnerTextPrimary;
        ctx.font = `bold ${Math.max(10, Math.round(14 * textScale))}px "Poppins", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(String(pos.finger), cx, cy + 4);
        ctx.fillStyle = THEME.colors.fingerFill;
      }
    });
  };

  // 1:1 preview renderer with chord diagrams
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !slide) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 900; // preview/export size
    canvas.width = size;
    canvas.height = size;

    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, THEME.background.start);
    gradient.addColorStop(1, THEME.background.end);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const scale = (n: number) => Math.max(8, Math.round(n * textScale));

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = THEME.colors.title;
    ctx.font = `bold italic ${scale(42)}px "Poppins", sans-serif`;
    const titleText = (slide.title && slide.title.trim())
      ? (slide.title as string)
      : ((globalTitle && globalTitle.trim()) ? (globalTitle as string) : 'Slide');
    ctx.fillText(titleText, size / 2, 80);
    // Subtitle (optional) — larger and more space reserved
    const hasSubtitle = !!(slide.subtitle && slide.subtitle.trim());
    if (hasSubtitle) {
      ctx.font = `italic ${scale(28)}px "Poppins", sans-serif`;
      ctx.fillStyle = THEME.colors.subtitle;
      ctx.fillText(slide.subtitle as string, size / 2, 122);
      ctx.font = `bold italic ${scale(42)}px "Poppins", sans-serif`; // restore for later labels
      ctx.fillStyle = THEME.colors.title;
    }

    // Resolve layout rows (backward compat)
    const rows = (slide.rowSizes && slide.rowSizes.length ? slide.rowSizes : [/* fallback */ (slide as any).rowSize || 4]).slice(0, slide.numRows || 1);
    const n = rows.reduce((a,b)=>a+b,0);
    const paddingX = 40;
    const paddingTop = hasSubtitle ? 170 : 130; // more space when subtitle present
    const paddingBottom = rows.length === 3 ? 160 : 220; // more room for diagrams in 3-row layout
    const availableWidth = size - paddingX * 2;
    const availableHeight = Math.max(120, size - paddingTop - paddingBottom);
    const minGap = 16;
    const rowGapY = 10; // tight spacing between rows
    // Compute per-row height bound; width bound will be computed per row to avoid overshrinking 2-per-row layouts
    const perRowHeight = Math.floor((availableHeight - (rows.length > 1 ? rowGapY * (rows.length - 1) : 0)) / rows.length);
    const headerOverhead = rows.length === 3 ? 50 : 60;
    const heightBound = Math.floor(((perRowHeight - headerOverhead) * 6) / 5);
    const maxCap = 240;

    // Render each row
    let chordIndexOffset = 0;
    let rowTop = paddingTop;
    rows.forEach((count, rowIdx) => {
      // Compute best diagram size for this row independently so rows with 2 chords can be larger
      const widthBoundRow = Math.floor((availableWidth - minGap * (count - 1)) / count);
      const rowMaxCap = (rows.length === 3 && count <= 2) ? 280 : maxCap;
      const diagramSizeRow = Math.max(100, Math.min(widthBoundRow, heightBound, rowMaxCap));
      const leftover = availableWidth - diagramSizeRow * count;
      // For 2-chord rows (especially in 3-row layout), avoid inflating the gap with leftover width
      const gap = (count === 2 && rows.length === 3)
        ? minGap
        : Math.max(minGap, Math.floor(leftover / Math.max(1, count - 1)));
      const totalWidth = diagramSizeRow * count + gap * (count - 1);
      const startX = Math.max((size - totalWidth) / 2, paddingX);
      // Place this row starting at the accumulated top (stable spacing)
      const rowY = rowTop;
      for (let i = 0; i < count; i++) {
        const chord = slide.chords[chordIndexOffset + i] ?? null;
        const x = startX + i * (diagramSizeRow + gap);
        if (chord) {
          drawChordDiagram(ctx, chord, x, rowY, diagramSizeRow);
        } else {
          ctx.textAlign = 'center';
          ctx.fillStyle = THEME.colors.placeholderText;
          ctx.font = `italic ${scale(18)}px "Poppins", sans-serif`;
          ctx.fillText(`Chord ${chordIndexOffset + i + 1}`, x + diagramSizeRow / 2, rowY + 20);
        }
        // draw per-chord text label if present
        const label = (slide.chordTexts && slide.chordTexts[chordIndexOffset + i]) || '';
        if (label.trim()) {
          ctx.textAlign = 'center';
          ctx.fillStyle = THEME.colors.subtitle;
          ctx.font = `italic ${scale(18)}px "Poppins", sans-serif`;
          const labelY = rowY + 60 + ((chord && chord.showFiveFrets) ? 5 : 4) * (diagramSizeRow / 6) + 28;
          const labelOffsetX: number = (slide as any).labelXOffset ?? 0;
          const labelX = x + diagramSizeRow / 2 + labelOffsetX - 8;
          ctx.fillText(label, labelX, labelY);
        }
      }
      // Advance top for next row based on actual content height of this row
      const usesFiveFrets = slide.chords.slice(chordIndexOffset, chordIndexOffset + count).some(c => c && c.showFiveFrets);
      const contentHeight = 60 + Math.round(((usesFiveFrets ? 5 : 4) * diagramSizeRow) / 6) + 34;
      rowTop += contentHeight + rowGapY;
      chordIndexOffset += count;
    });

    // Custom text (bigger and slightly lower)
    if (slide.customText.trim()) {
      ctx.textAlign = 'center';
      ctx.fillStyle = THEME.colors.title;
      ctx.font = `italic ${scale(24)}px "Poppins", sans-serif`;
      const wrapWidth = Math.floor(size * 0.9);
      const lines: string[] = [];
      const words = slide.customText.split(/\s+/);
      let cur = '';
      words.forEach(w => {
        const test = cur ? cur + ' ' + w : w;
        if (ctx.measureText(test).width > wrapWidth) {
          if (cur) lines.push(cur);
          cur = w;
        } else {
          cur = test;
        }
      });
      if (cur) lines.push(cur);
      // Move lower by reducing the protected bottom margin; add a bit more line height for larger font
      const baseY = size - Math.max(120, paddingBottom - 80) + (slide.customTextOffset || 0);
      const lineHeight = 34;
      lines.forEach((ln, i) => ctx.fillText(ln, size / 2, baseY + i * lineHeight));
    }

    // Branding (logo + URL)
    const brandAlign = slide.brandAlign || 'center';
    const brandScale = slide.brandScale || 1.0;
    const brandOffsetX = slide.brandOffsetX || 0;
    const brandOffsetY = slide.brandOffsetY || 0;
    const footerY = size - 40;
    const brandX = brandAlign === 'center' ? size / 2 : brandAlign === 'right' ? size - 60 : 60;
    ctx.textAlign = brandAlign;
    ctx.fillStyle = THEME.colors.footerTitle;
    ctx.font = `bold italic ${Math.round(scale(22) * brandScale)}px "Poppins", sans-serif`;
    ctx.fillText('Mike Nelson Guitar Lessons', brandX + brandOffsetX, footerY + brandOffsetY);
    ctx.fillStyle = THEME.colors.footerSubtitle;
    ctx.font = `italic ${Math.round(scale(20) * brandScale)}px "Poppins", sans-serif`;
    ctx.fillText('mikenelsonguitarlessons.co.nz', brandX + brandOffsetX, footerY + 22 + brandOffsetY);
  }, [slides, selected, textScale]);

  const exportSlide = (s: CarouselSlide, index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const safeTitle = (s.title || 'Slide').replace(/\s+/g, '_');
      link.download = `${safeTitle}_Carousel_${String(index + 1).padStart(2, '0')}.png`;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="space-y-4">
      {/* Slide manager */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Carousel Slides (1:1)</h2>
          <button onClick={addSlide} className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white">Add Slide</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelected(i)}
              className={`px-3 py-2 rounded border ${i === selected ? 'border-amber-500 bg-gray-700' : 'border-gray-600 bg-gray-900 hover:bg-gray-800'} text-sm`}
            >
              {s.title || 'Slide'}
            </button>
          ))}
        </div>
        {slide && (
          <div className="flex items-center gap-2 mt-3">
            <button onClick={() => duplicateSlide(selected)} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">Duplicate</button>
            <button onClick={() => moveSlide(selected, -1)} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">Move Left</button>
            <button onClick={() => moveSlide(selected, 1)} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">Move Right</button>
            <button onClick={() => removeSlide(selected)} className="px-2 py-1 text-xs rounded bg-red-700 hover:bg-red-600">Remove</button>
            <button onClick={() => exportSlide(slide, selected)} className="ml-auto px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white">Export Slide</button>
          </div>
        )}
      </div>

      {/* Slide editor */}
      {slide && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Slide Title (override global)</label>
              <input
                value={slide.title}
                onChange={(e) => updateSlide({ title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="Leave empty to use the global title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slide Subtitle</label>
              <input
                value={slide.subtitle || ''}
                onChange={(e) => updateSlide({ subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
                placeholder="Optional subtitle (shown under the title)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rows & sizes</label>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-300">Rows:</span>
                {[1,2,3].map(r => (
                  <button key={r} onClick={() => {
                    const newNum = r as 1|2|3;
                    const currentSizes = (slide.rowSizes && slide.rowSizes.length ? slide.rowSizes : [4]).slice();
                    let newRowSizes = currentSizes.slice(0, newNum);
                    while (newRowSizes.length < newNum) newRowSizes.push(4);
                    // resize chords
                    const total = newRowSizes.reduce((a,b)=>a+b,0);
                    const newChords = Array(total).fill(null).map((_,i)=> slide.chords[i] || null);
                    updateSlide({ numRows: newNum, rowSizes: newRowSizes, chords: newChords });
                  }} className={`px-3 py-1 rounded ${slide.numRows===r?'bg-amber-600 text-white':'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}>{r}</button>
                ))}
              </div>
              {[...Array(slide.numRows || 1)].map((_,ri)=> {
                const safeSizes = (slide.rowSizes && slide.rowSizes.length ? slide.rowSizes : [4]);
                const currentSize = safeSizes[ri] ?? 4;
                return (
                  <div key={ri} className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-300">Row {ri+1}:</span>
                    {[2,3,4,5,6,7,8,9,10].map(n => (
                      <button key={n} onClick={() => {
                        const sizes = (slide.rowSizes && slide.rowSizes.length ? slide.rowSizes.slice() : [4]);
                        if (ri >= sizes.length) {
                          while (sizes.length <= ri) sizes.push(4);
                        }
                        sizes[ri] = n;
                        const total = sizes.reduce((a,b)=>a+b,0);
                        const newChords = Array(total).fill(null).map((_,i)=> slide.chords[i] || null);
                        updateSlide({ rowSizes: sizes, chords: newChords });
                      }} className={`px-3 py-1 rounded ${currentSize===n?'bg-amber-600 text-white':'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}>{n}</button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Chord Slots</label>
            {[...Array(slide.numRows || 1)].map((_,ri)=> {
              const sizesBase = (slide.rowSizes && slide.rowSizes.length ? slide.rowSizes : [4]);
              let sizes = (slide.numRows === 2 && sizesBase.length === 1) ? [sizesBase[0], 4] : sizesBase.slice();
              if (ri >= sizes.length) sizes = [...sizes, 4];
              const offset = sizes.slice(0,ri).reduce((a,b)=>a+b,0);
              return (
                <div key={ri} className="mb-2">
                  <div className="text-xs text-gray-400 mb-1">Row {ri+1}</div>
                  <div className="space-y-2">
                    {Array.from({ length: sizes[ri] }).map((_, i) => {
                      const idx = offset + i;
                      const chord = slide.chords[idx];
                      const chordText = (slide.chordTexts && slide.chordTexts[idx]) || '';
                      return (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded border border-gray-700 bg-gray-900">
                          <span className="text-sm text-gray-300">Chord {idx + 1}</span>
                          <button onClick={() => updateChord(idx, null as any)} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">Clear</button>
                          <button onClick={() => { const src = getPasteSource(); if (src) updateChord(idx, JSON.parse(JSON.stringify(src))); }} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600" disabled={!getPasteSource()}>Paste</button>
                          <button onClick={() => { if (chord) putCopy(chord); }} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600" disabled={!chord}>Copy</button>
                          <input
                            value={chordText}
                            onChange={(e)=>{
                              setSlides(prev=>{
                                const next=[...prev];
                                const s={...next[selected]};
                                const total = s.chords.length;
                                const texts=(s.chordTexts && s.chordTexts.length ? s.chordTexts.slice(0,total): Array(total).fill(''));
                                while (texts.length < total) texts.push('');
                                texts[idx]=e.target.value;
                                s.chordTexts=texts;
                                next[selected]=s;
                                return next;
                              });
                            }}
                            placeholder="Text"
                            className="ml-auto px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-white w-48"
                            maxLength={60}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-gray-500 mt-2">Tip: Use Copy on the main builder’s chord row, then Paste into these slots.</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Custom Text</label>
            <textarea
              value={slide.customText}
              onChange={(e) => updateSlide({ customText: e.target.value })}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white"
              rows={3}
              maxLength={600}
            />
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-gray-300">Custom text Y offset:</span>
              <button onClick={()=>updateSlide({ customTextOffset: (slide.customTextOffset || 0) - 10 })} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">-</button>
              <span className="text-xs text-gray-400 w-12 text-center">{(slide.customTextOffset || 0)}px</span>
              <button onClick={()=>updateSlide({ customTextOffset: (slide.customTextOffset || 0) + 10 })} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">+</button>
              <button onClick={()=>updateSlide({ customTextOffset: 0 })} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">Reset</button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm text-gray-300">Label X offset:</span>
              <button onClick={()=>updateSlide({ labelXOffset: ((slide as any).labelXOffset||0) - 4 })} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">-</button>
              <span className="text-xs text-gray-400 w-10 text-center">{((slide as any).labelXOffset||0)}px</span>
              <button onClick={()=>updateSlide({ labelXOffset: ((slide as any).labelXOffset||0) + 4 })} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">+</button>
              <button onClick={()=>updateSlide({ labelXOffset: 0 })} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-2">Preview (1:1)</div>
        <div className="flex justify-center">
          <canvas ref={canvasRef} style={{ width: 512, height: 512 }} />
        </div>
      </div>
    </div>
  );
};

export default CarouselMode;


