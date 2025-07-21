'use client';

import { useState, useRef, useEffect } from 'react';
import { AlphaTabApi, Settings } from '@coderline/alphatab';
import Head from 'next/head';

interface AlphaTabPlayerProps {
  filePath?: string;
  alphaTex?: string;
  title?: string;
  showControls?: boolean;
  autoLoad?: boolean;
  className?: string;
  zoom?: number;
}

export default function AlphaTabPlayer({
  filePath,
  alphaTex,
  title,
  showControls = true,
  autoLoad = true,
  className = '',
  zoom: zoomProp,
}: AlphaTabPlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [songInfo, setSongInfo] = useState<{ title: string; artist: string } | null>(null);
  const [alphaTabReady, setAlphaTabReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [minWidth, setMinWidth] = useState(800);
  const [zoom, setZoom] = useState(zoomProp ?? 1.2);
  
  const alphaTabRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<AlphaTabApi | null>(null);

  useEffect(() => {
    // Load the font CSS
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = '/fonts/alphatab.css';
    document.head.appendChild(fontLink);

    return () => {
      // Cleanup font link when component unmounts
      document.head.removeChild(fontLink);
    };
  }, []);

  useEffect(() => {
    // Initialize AlphaTab with basic settings
    if (alphaTabRef.current && !apiRef.current) {
      try {
        console.log('Initializing AlphaTab...');
        
        // Create basic settings
        const settings = new Settings();
        settings.core.engine = 'html5';
        settings.core.logLevel = 1;
        settings.core.fontDirectory = '/fonts/';
        settings.core.file = '';
        settings.player.enablePlayer = false; // Disable player for now to avoid worker issues
        settings.display.resources.copyrightFont.family = 'Arial';
        settings.display.resources.effectFont.family = 'Arial';
        settings.display.resources.fretboardNumberFont.family = 'Arial';
        settings.display.resources.graceFont.family = 'Arial';
        settings.display.resources.markerFont.family = 'Arial';
        settings.display.resources.titleFont.family = 'Arial';
        settings.display.resources.subTitleFont.family = 'Arial';
        settings.display.resources.wordsFont.family = 'Arial';
        
        const api = new AlphaTabApi(alphaTabRef.current, settings);
        apiRef.current = api;

        // Event listeners
        api.scoreLoaded.on((score) => {
          console.log('Score loaded:', score.title);
          setIsLoading(false);
          setError('');
          setSongInfo({
            title: score.title || title || 'Untitled',
            artist: score.artist || 'Unknown'
          });
        });

        api.renderFinished.on(() => {
          console.log('Render finished');
          setIsLoading(false);
        });

        api.error.on((error) => {
          console.error('AlphaTab error:', error);
          setIsLoading(false);
          setError(`Error: ${error.message || error}`);
        });

        if (showControls) {
          api.playerStateChanged.on((state) => {
            setIsPlaying(state.state === 1); // 1 = playing
          });
        }

        setAlphaTabReady(true);
        console.log('AlphaTab initialized successfully');

      } catch (err) {
        console.error('Failed to initialize AlphaTab:', err);
        setError(`Failed to initialize: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  }, [showControls, title]);

  useEffect(() => {
    // Auto-load content when ready
    if (alphaTabReady && autoLoad && apiRef.current) {
      if (filePath) {
        loadFile(filePath);
      } else if (alphaTex) {
        loadAlphaTex(alphaTex);
      }
    }
  }, [alphaTabReady, autoLoad, filePath, alphaTex]);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 768) {
        setMinWidth(600);
        setZoom(zoomProp ?? 1.05);
      } else {
        setMinWidth(800);
        setZoom(zoomProp ?? 1.2);
      }
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [zoomProp]);

  const loadFile = async (path: string) => {
    if (!apiRef.current) return;
    
    try {
      console.log('Loading file:', path);
      setIsLoading(true);
      setError('');
      setSongInfo(null);
      
      // Fetch the file and load it
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load file: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      apiRef.current.load(arrayBuffer);
      
    } catch (err) {
      console.error('Error loading file:', err);
      setIsLoading(false);
      setError(`File error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const loadAlphaTex = (tex: string) => {
    if (!apiRef.current) return;
    
    try {
      console.log('Loading AlphaTex...');
      setIsLoading(true);
      setError('');
      setSongInfo(null);
      
      apiRef.current.tex(tex);
      
    } catch (err) {
      console.error('Error loading AlphaTex:', err);
      setIsLoading(false);
      setError(`AlphaTex error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const play = () => {
    if (apiRef.current && apiRef.current.playPause) {
      apiRef.current.playPause();
    }
  };

  const stop = () => {
    if (apiRef.current && apiRef.current.stop) {
      apiRef.current.stop();
    }
  };

  return (
    <div className={`alphatab-player ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      )}

      {!alphaTabReady && (
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
          <span className="text-gray-600">Initializing AlphaTab...</span>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {songInfo && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <div className="font-semibold">{songInfo.title}</div>
          {songInfo.artist !== 'Unknown' && (
            <div className="text-sm text-gray-600">{songInfo.artist}</div>
          )}
        </div>
      )}

      {false && showControls && alphaTabReady && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={play}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>
          <button
            onClick={stop}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            disabled={isLoading}
          >
            ⏹️ Stop
          </button>
        </div>
      )}

      <div className="alphatab-container relative w-full overflow-x-auto">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <div className="flex items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <span>Loading...</span>
            </div>
          </div>
        )}
        <div ref={alphaTabRef} className="alphatab border rounded min-h-[200px]" style={{ minWidth }}></div>
      </div>
    </div>
  );
} 