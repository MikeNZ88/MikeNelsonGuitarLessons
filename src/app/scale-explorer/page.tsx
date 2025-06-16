'use client';

import { useEffect } from 'react';

export default function ScaleExplorerPage() {
  useEffect(() => {
    // Redirect to the standalone Scale Explorer
    window.location.replace('/scale-explorer/');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Redirecting to Scale Explorer...</p>
    </div>
  );
} 