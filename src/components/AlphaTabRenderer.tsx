'use client';

import { useEffect, useRef, useState } from 'react';

export interface AlphaTabRendererProps {
  /** The alphaTex notation string (use either tex OR filePath, not both) */
  tex?: string;
  /** Path to external file (Guitar Pro, MusicXML, etc.) */
  filePath?: string;
  /** Width of the rendered tab (default: '100%') */
  width?: string;
  /** Height of the rendered tab (default: 'auto') */
  height?: string;
  /** Show play controls (default: true) */
  showControls?: boolean;
  /** Auto-play the tab when loaded (default: false) */
  autoPlay?: boolean;
  /** Tempo in BPM (overrides tempo in tex) */
  tempo?: number;
  /** Track index to display (default: 0) */
  trackIndex?: number;
  /** CSS class name for styling */
  className?: string;
  /** Show track selector for multi-track pieces */
  showTrackSelector?: boolean;
  /** Zoom level (default: 1.0) */
  zoom?: number;
}

export default function AlphaTabRenderer({
  tex,
  filePath,
  width = '100%',
  height = 'auto',
  showControls = true,
  autoPlay = false,
  tempo,
  trackIndex = 0,
  className = '',
  showTrackSelector = false,
  zoom = 1.0,
}: AlphaTabRendererProps) {
  const alphaTabRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState(trackIndex);
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    if (!alphaTabRef.current) return;

    let alphaTabApi: any = null;

    const initializeAlphaTab = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamic import to avoid SSR issues
        const alphaTab = await import('@coderline/alphatab');

        // Clear any existing content
        alphaTabRef.current!.innerHTML = '';

        // Use HTML-based approach instead of API
        if (tex) {
          alphaTabRef.current!.innerHTML = `
            <div data-tex="true" data-font-directory="/fonts/" data-enable-worker="false">
              ${tex}
            </div>
          `;
        } else if (filePath) {
          alphaTabRef.current!.innerHTML = `
            <div data-file="${filePath}" data-font-directory="/fonts/" data-enable-worker="false">
            </div>
          `;
        }

        // Initialize AlphaTab on the container
        alphaTabApi = new alphaTab.AlphaTabApi(alphaTabRef.current!, {
          core: {
            fontDirectory: '/fonts/'
          },
          display: {
            scale: zoom
          }
        });
        setApi(alphaTabApi);

        // Set up event listeners
        alphaTabApi.scoreLoaded.on((score: any) => {
          setTracks(score.tracks);
          setIsLoading(false);
          
          // Set tempo if provided
          if (tempo) {
            score.tempo = tempo;
          }

          // Auto-play if requested
          if (autoPlay && showControls) {
            setTimeout(() => {
              alphaTabApi.play();
            }, 1000);
          }
        });

        alphaTabApi.renderFinished.on(() => {
          setIsLoading(false);
        });

        alphaTabApi.playerStateChanged.on((e: any) => {
          setIsPlaying(e.state === 1); // 1 = playing
        });

        alphaTabApi.error.on((e: any) => {
          // Don't show font errors as critical - they're often just warnings
          if (e.error && e.error.includes('Font')) {
            console.warn('AlphaTab font warning:', e.error);
            // Continue loading even with font warnings
            return;
          }
          setError(`Error loading tab: ${e.error}`);
          setIsLoading(false);
        });

        // Load content based on what's provided
        if (tex) {
          alphaTabApi.tex(tex, [currentTrack]);
        } else if (filePath) {
          alphaTabApi.load(filePath, [currentTrack]);
        } else {
          setError('AlphaTabRenderer: Either tex or filePath must be provided');
          setIsLoading(false);
        }

      } catch (err) {
        setError(`Failed to initialize AlphaTab: ${err}`);
        setIsLoading(false);
      }
    };

    initializeAlphaTab();

    // Cleanup
    return () => {
      if (alphaTabApi) {
        try {
          alphaTabApi.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [tex, filePath, showControls, autoPlay, tempo, currentTrack, zoom]);

  const handlePlayPause = () => {
    if (!api) return;
    
    if (isPlaying) {
      api.pause();
    } else {
      api.play();
    }
  };

  const handleStop = () => {
    if (!api) return;
    api.stop();
  };

  const handleTrackChange = (trackIndex: number) => {
    if (!api) return;
    setCurrentTrack(trackIndex);
  };

  return (
    <div className={`alphatab-container ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
            <span className="text-gray-600">Loading tablature...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 text-red-500">⚠</div>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Track Selector */}
      {showTrackSelector && tracks.length > 1 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Track:
          </label>
          <select
            value={currentTrack}
            onChange={(e) => handleTrackChange(parseInt(e.target.value))}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          >
            {tracks.map((track, index) => (
              <option key={index} value={index}>
                {track.name || `Track ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Player Controls */}
      {showControls && !isLoading && !error && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlayPause}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              onClick={handleStop}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              ⏹ Stop
            </button>
          </div>
        </div>
      )}

      {/* AlphaTab Rendering Container */}
      <div
        ref={alphaTabRef}
        style={{ 
          width, 
          height: height === 'auto' ? undefined : height,
          minHeight: isLoading ? '200px' : undefined 
        }}
        className="alphatab-surface border border-gray-200 rounded-lg"
      />

      {/* Instructions */}
      {showControls && !isLoading && !error && (
        <div className="mt-2 text-sm text-gray-500">
          <p>Click on the notation to position playback. Use the controls above to play/pause.</p>
        </div>
      )}
    </div>
  );
} 