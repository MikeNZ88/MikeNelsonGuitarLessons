'use client'

import React, { useEffect, useRef, useState } from 'react';

// Simple internal tool: load a GP file from /public and export the rendered tab as PNG
export default function TabImageBuilderPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const [filePath, setFilePath] = useState<string>(
    "/GP Files/Scale Exercises/BLOG TABS/Dotted 8th Note Rhythm as a Riff.gp"
  );
  const [zoom, setZoom] = useState<number>(1.2);
  const [padding, setPadding] = useState<number>(24);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alphaTabApi: any = null;
    const init = async () => {
      if (!containerRef.current) return;
      setIsLoading(true);
      setError(null);

      try {
        // Dynamic import to avoid SSR issues
        const alphaTab = await import('@coderline/alphatab');

        // Reset container
        containerRef.current.innerHTML = '';

        // Inject loader div
        containerRef.current.innerHTML = `
          <div data-file="${filePath}" data-font-directory="/fonts/" data-enable-worker="false"></div>
        `;

        // Initialize API
        alphaTabApi = new alphaTab.AlphaTabApi(containerRef.current, {
          core: {
            fontDirectory: '/fonts/',
            useWorkers: false,
          },
          display: {
            scale: zoom,
            layoutMode: 'page', // match AlphaTab default visual
            showTitle: false,
            showSubtitle: false,
            showArtist: false,
            showAlbum: false,
            showWords: false,
            // keep defaults so export matches on-screen look
            showCopyright: false,
            showInstructions: false,
            showMetronome: false,
          },
          player: { enablePlayer: false },
        } as any);

        apiRef.current = alphaTabApi;

        alphaTabApi.renderFinished.on(() => {
          setIsLoading(false);
        });

        alphaTabApi.error.on((e: any) => {
          setError(e.error || 'Unknown AlphaTab error');
          setIsLoading(false);
        });

        // Load file
        alphaTabApi.load(filePath);
      } catch (err: any) {
        console.error(err);
        setError(String(err));
        setIsLoading(false);
      }
    };

    init();

    return () => {
      try { alphaTabApi?.destroy?.(); } catch {}
    };
  }, [filePath, zoom]);

  // Helper: load a font file as data URL to embed into SVG so export renders correctly
  async function loadFontDataUrl(path: string): Promise<string | null> {
    try {
      const res = await fetch(path);
      if (!res.ok) return null;
      const blob = await res.blob();
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(String(reader.result));
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }

  const handleExportPng = async () => {
    const container = containerRef.current;
    if (!container) return;

    // AlphaTab sometimes renders multiple SVGs (title, page, etc.).
    // Pick the largest SVG by area to ensure we export the actual page content, not the title line.
    const svgNodes = Array.from(container.querySelectorAll('svg')) as SVGSVGElement[];
    if (svgNodes.length === 0) {
      alert('No SVG found yet. Wait for render to finish.');
      return;
    }

    const pickSize = (svg: SVGSVGElement) => {
      const vb = svg.viewBox && (svg.viewBox as any).baseVal;
      const w = vb?.width || svg.clientWidth || svg.getBoundingClientRect().width || 0;
      const h = vb?.height || svg.clientHeight || svg.getBoundingClientRect().height || 0;
      return { w: Math.max(1, Math.floor(w)), h: Math.max(1, Math.floor(h)) };
    };

    let chosen = svgNodes[0];
    let chosenSize = pickSize(chosen);
    for (const svg of svgNodes.slice(1)) {
      const size = pickSize(svg);
      if (size.w * size.h > chosenSize.w * chosenSize.h) {
        chosen = svg;
        chosenSize = size;
      }
    }

    // Clone SVG and embed Bravura font so glyphs render instead of squares
    const clone = chosen.cloneNode(true) as SVGSVGElement;
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const style = document.createElement('style');
    const bravuraWoff2 = await loadFontDataUrl('/fonts/Bravura.woff2');
    const bravuraWoff = await loadFontDataUrl('/fonts/Bravura.woff');
    const bravuraOtf = await loadFontDataUrl('/fonts/Bravura.otf');
    const sources: string[] = [];
    if (bravuraWoff2) sources.push(`url('${bravuraWoff2}') format('woff2')`);
    if (bravuraWoff) sources.push(`url('${bravuraWoff}') format('woff')`);
    if (bravuraOtf) sources.push(`url('${bravuraOtf}') format('opentype')`);
    style.textContent = `@font-face { font-family: 'Bravura'; src: ${sources.join(', ')}; font-weight: normal; font-style: normal; }
      /* Ensure AlphaTab uses the embedded SMuFL font */
      .at, .at * { font-family: 'Bravura', 'Bravura Text', serif; }
    `;
    defs.appendChild(style);
    clone.insertBefore(defs, clone.firstChild);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clone);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // Draw full SVG to a base canvas
      const base = document.createElement('canvas');
      base.width = chosenSize.w;
      base.height = chosenSize.h;
      const bctx = base.getContext('2d');
      if (!bctx) return;
      bctx.fillStyle = '#ffffff';
      bctx.fillRect(0, 0, base.width, base.height);
      bctx.drawImage(img, 0, 0, base.width, base.height);

      // Auto-trim whitespace: find non-white bounds
      const imgData = bctx.getImageData(0, 0, base.width, base.height);
      const { data, width, height } = imgData;
      let minX = width, minY = height, maxX = 0, maxY = 0;
      const threshold = 250; // treat near-white as white
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a > 0 && (r < threshold || g < threshold || b < threshold)) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }

      // Fallback if nothing detected
      if (maxX <= minX || maxY <= minY) {
        minX = 0; minY = 0; maxX = width - 1; maxY = height - 1;
      }

      // Apply padding
      const pad = Math.max(0, Math.floor(padding));
      minX = Math.max(0, minX - pad);
      minY = Math.max(0, minY - pad);
      maxX = Math.min(width - 1, maxX + pad);
      maxY = Math.min(height - 1, maxY + pad);

      const outW = maxX - minX + 1;
      const outH = maxY - minY + 1;
      const out = document.createElement('canvas');
      out.width = outW;
      out.height = outH;
      const octx = out.getContext('2d');
      if (!octx) return;
      octx.fillStyle = '#ffffff';
      octx.fillRect(0, 0, out.width, out.height);
      octx.drawImage(base, minX, minY, outW, outH, 0, 0, outW, outH);

      URL.revokeObjectURL(url);

      const pngUrl = out.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `tab_image_${Date.now()}.png`;
      a.click();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert('Failed to render SVG to image.');
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Tab Image Builder (Internal)</h1>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
          <label className="block text-sm mb-2">Guitar Pro file path (from /public):</label>
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            className="w-full rounded bg-gray-900 border border-gray-700 px-3 py-2 text-sm"
            placeholder="/GP Files/Scale Exercises/BLOG TABS/Your File.gp"
          />

          <div className="mt-3 flex items-center gap-4">
            <label className="text-sm">Zoom: {zoom.toFixed(2)}</label>
            <input
              type="range"
              min={0.8}
              max={1.8}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />

            <label className="text-sm">Padding: {padding}px</label>
            <input
              type="range"
              min={0}
              max={64}
              step={1}
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
            />

            <button
              onClick={handleExportPng}
              className="ml-auto px-3 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white text-sm"
            >
              Export PNG
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-800 border border-red-300">
            Error: {error}
          </div>
        )}

        <div className="bg-white rounded-lg p-2 overflow-x-auto">
          <div
            ref={containerRef}
            className="alphatab-surface border border-gray-200 rounded"
            style={{ minWidth: 800 }}
          />
        </div>

        {isLoading && (
          <div className="text-sm text-gray-400 mt-2">Rendering…</div>
        )}
      </div>
    </div>
  );
}


