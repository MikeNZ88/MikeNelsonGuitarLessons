import { Metadata } from 'next';
import PatternGenerator from '@/components/rhythm/PatternGenerator';

export const metadata: Metadata = {
  title: 'Strumming Pattern Generator | Create Custom Guitar Patterns',
  description: 'Interactive tool to create custom guitar strumming patterns. Choose 8th or 16th note grids and click to build your own patterns with automatic down/up stroke detection.',
  keywords: 'strumming pattern generator, custom guitar patterns, guitar rhythm tool, pattern creator, guitar strumming, rhythm generator',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/tools/pattern-generator',
  },
  openGraph: {
    title: 'Strumming Pattern Generator | Create Custom Guitar Patterns',
    description: 'Interactive tool to create custom guitar strumming patterns. Choose 8th or 16th note grids and click to build your own patterns with automatic down/up stroke detection.',
    url: 'https://mikenelsonguitarlessons.co.nz/tools/pattern-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strumming Pattern Generator | Create Custom Guitar Patterns',
    description: 'Interactive tool to create custom guitar strumming patterns. Choose 8th or 16th note grids and click to build your own patterns with automatic down/up stroke detection.',
  },
};

export default function PatternGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Strumming Pattern Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Create your own custom strumming patterns with our interactive generator. 
              Choose between 8th note or 16th note grids and click to build patterns. 
              Down and up strokes are automatically assigned based on traditional strumming rules.
            </p>
          </div>

          {/* Pattern Generator Component */}
          <PatternGenerator />

          {/* How to Use Guide */}
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the Pattern Generator</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                    <span>Choose your grid type: 8th notes (simpler) or 16th notes (more complex)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                    <span>Click on grid squares where you want strokes to occur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                    <span>Down (D) and Up (U) strokes are automatically assigned</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                    <span>Click the Play button to hear your pattern</span>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stroke Rules</h3>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <h4 className="font-medium text-gray-900">8th Note Patterns:</h4>
                    <p className="text-sm">• Beats (1, 2, 3, 4) = Down strokes</p>
                    <p className="text-sm">• Off-beats (&) = Up strokes</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">16th Note Patterns:</h4>
                    <p className="text-sm">• Beats (1, 2, 3, 4) = Down strokes</p>
                    <p className="text-sm">• & positions = Down strokes</p>
                    <p className="text-sm">• e and a positions = Up strokes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-semibold text-amber-900 mb-2">💡 Pro Tip</h4>
              <p className="text-amber-800 text-sm">
                Start with the preset patterns to understand common strumming patterns, 
                then modify them or create your own. Remember that your hand should always 
                maintain a steady up-down motion - the grid just shows where to make contact with the strings!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 