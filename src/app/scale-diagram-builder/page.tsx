'use client'

import React from 'react';
import ScaleDiagramBuilder from '@/components/scale-diagrams/ScaleDiagramBuilder';

export default function ScaleDiagramBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">Scale Diagram Builder</h1>
          <p className="text-gray-300 text-lg">Create beautiful scale diagrams with horizontal fretboard layouts</p>
        </div>
        <ScaleDiagramBuilder />
      </div>
    </div>
  );
} 