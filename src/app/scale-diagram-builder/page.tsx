'use client'

import React, { useEffect, useState } from 'react';
import ScaleDiagramBuilder from '@/components/scale-diagrams/ScaleDiagramBuilder';

type LegendItem = { id: string; label: string; color: string };

function ColorLegendEditor() {
  const [items, setItems] = useState<LegendItem[]>([]);
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('#F59E0B');
  const [diagramColors, setDiagramColors] = useState<string[]>([]);
  const defaultPalette: Array<{ color: string; name: string }> = [
    { color: '#7C2D12', name: 'Dark Amber' },
    { color: '#A16207', name: 'Light Amber' },
    { color: '#92400E', name: 'Medium Amber' },
    { color: '#DC2626', name: 'Red' },
    { color: '#2563EB', name: 'Blue' },
    { color: '#16A34A', name: 'Green' },
    { color: '#9333EA', name: 'Purple' },
    { color: '#EA580C', name: 'Orange' }
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem('scaleLegend');
      if (raw) setItems(JSON.parse(raw));
      const used = localStorage.getItem('scaleDiagramUsedColors');
      if (used) setDiagramColors(JSON.parse(used));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('scaleLegend', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = () => {
    if (!label.trim()) return;
    setItems(prev => [...prev, { id: crypto.randomUUID(), label: label.trim(), color }]);
    setLabel('');
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const updateItem = (id: string, patch: Partial<LegendItem>) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, ...patch } : i)));
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    setItems(prev => {
      const index = prev.findIndex(i => i.id === id);
      if (index === -1) return prev;
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const [elem] = next.splice(index, 1);
      next.splice(target, 0, elem);
      return next;
    });
  };

  const combinedColors = Array.from(new Set([...
    defaultPalette.map(d => d.color),
    ...diagramColors
  ]));

  const handlePick = (hex: string) => {
    setColor(hex);
    const match = defaultPalette.find(d => d.color === hex);
    if (match) setLabel(l => (l.trim().length === 0 ? match.name : l));
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-amber-400 mb-2">Colour Legend</h2>
      <p className="text-sm text-gray-300 mb-4">Define swatches that will be shown on this page as a legend for your scale diagrams.</p>

      {/* Palette of defaults + used colours as clickable circles */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-3">
          {combinedColors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handlePick(c)}
              title={defaultPalette.find(d => d.color === c)?.name || c}
              className={`h-8 w-8 rounded-full border ${color === c ? 'ring-2 ring-amber-400 border-amber-400' : 'border-gray-600'}`}
              style={{ backgroundColor: c }}
            />
          ))}
          <button
            onClick={() => {
              try {
                const used = localStorage.getItem('scaleDiagramUsedColors');
                if (used) setDiagramColors(JSON.parse(used));
              } catch {}
            }}
            className="ml-2 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
            title="Refresh colours used in diagrams"
          >
            Refresh
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">Click a circle to select that colour. Defaults plus any colours used in your diagrams are shown.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <label className="text-sm">Label</label>
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="px-3 py-2 rounded bg-gray-900 border border-gray-600 text-white"
          placeholder="e.g. Root, 3rd, b7"
        />
        <label className="text-sm">Colour</label>
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          className="h-9 w-12 p-0 border-0 bg-transparent"
        />
        <button onClick={addItem} className="px-3 py-2 bg-amber-500 hover:bg-amber-600 rounded text-black font-semibold">Add</button>
      </div>

      {items.length > 0 ? (
        <ul className="grid md:grid-cols-2 gap-3">
          {items.map(item => (
            <li key={item.id} className="bg-gray-900 border border-gray-700 rounded px-3 py-2">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="color"
                  value={item.color}
                  onChange={e => updateItem(item.id, { color: e.target.value })}
                  className="h-7 w-10 p-0 border-0 bg-transparent"
                  aria-label="Legend colour"
                />
                <input
                  type="text"
                  value={item.label}
                  onChange={e => updateItem(item.id, { label: e.target.value })}
                  className="flex-1 px-3 py-1 rounded bg-gray-800 border border-gray-600 text-white"
                  placeholder="Legend label"
                  aria-label="Legend label"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => moveItem(item.id, 'up')} className="text-sm px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white" title="Move up">↑</button>
                <button onClick={() => moveItem(item.id, 'down')} className="text-sm px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white" title="Move down">↓</button>
                <button onClick={() => removeItem(item.id)} className="text-sm px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">No legend items yet.</p>
      )}

      {/* The separate "used colours" section is merged into the circle palette above */}
    </div>
  );
}

export default function ScaleDiagramBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">Scale Diagram Builder</h1>
          <p className="text-gray-300 text-lg">Create beautiful scale diagrams with horizontal fretboard layouts</p>
        </div>
        <ScaleDiagramBuilder />
        <div className="mt-10">
          <ColorLegendEditor />
        </div>
      </div>
    </div>
  );
} 