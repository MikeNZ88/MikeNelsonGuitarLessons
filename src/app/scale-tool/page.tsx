'use client';

import { useEffect } from 'react';

export default function ScaleToolPage() {
  useEffect(() => {
    // Redirect to the standalone Scale Explorer
    window.location.href = '/scale-explorer/';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Redirecting to Scale Explorer...</p>
    </div>
  );
} 