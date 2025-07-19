import React, { useState } from 'react';

interface KeySignatureBuilderProps {
  className?: string;
}

const KeySignatureBuilder: React.FC<KeySignatureBuilderProps> = ({ className = '' }) => {
  const [selectedKey, setSelectedKey] = useState<string>('C');

  // Order of sharps: F C G D A E B
  const sharpOrder = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
  const sharpMnemonics = ['Father', 'Charles', 'Goes', 'Down', 'And', 'Ends', 'Battle'];
  
  // Order of flats: B E A D G C F
  const flatOrder = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
  const flatMnemonics = ['Battle', 'Ends', 'And', 'Down', 'Goes', 'Charles', 'Father'];

  // Keys that use sharps (in order of increasing sharps)
  const sharpKeys = [
    { key: 'C', sharps: 0, name: 'C Major' },
    { key: 'G', sharps: 1, name: 'G Major' },
    { key: 'D', sharps: 2, name: 'D Major' },
    { key: 'A', sharps: 3, name: 'A Major' },
    { key: 'E', sharps: 4, name: 'E Major' },
    { key: 'B', sharps: 5, name: 'B Major' },
    { key: 'F#', sharps: 6, name: 'F♯ Major' },
    { key: 'C#', sharps: 7, name: 'C♯ Major' }
  ];

  // Keys that use flats (in order of increasing flats)
  const flatKeys = [
    { key: 'C', flats: 0, name: 'C Major' },
    { key: 'F', flats: 1, name: 'F Major' },
    { key: 'Bb', flats: 2, name: 'B♭ Major' },
    { key: 'Eb', flats: 3, name: 'E♭ Major' },
    { key: 'Ab', flats: 4, name: 'A♭ Major' },
    { key: 'Db', flats: 5, name: 'D♭ Major' },
    { key: 'Gb', flats: 6, name: 'G♭ Major' },
    { key: 'Cb', flats: 7, name: 'C♭ Major' }
  ];

  const getCurrentSharps = () => {
    const key = sharpKeys.find(k => k.key === selectedKey);
    return key ? sharpOrder.slice(0, key.sharps) : [];
  };

  const getCurrentFlats = () => {
    const key = flatKeys.find(k => k.key === selectedKey);
    return key ? flatOrder.slice(0, key.flats) : [];
  };

  const isSharpKey = sharpKeys.some(k => k.key === selectedKey);
  const isFlatKey = flatKeys.some(k => k.key === selectedKey);

  return (
    <div className={`bg-amber-50 border-2 border-amber-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-amber-900 mb-4 text-center">
        How to Remember Key Signatures
      </h3>
      
      <div className="mb-6">
        <p className="text-amber-800 mb-4 text-center">
          Select a key to see how its sharps or flats build up progressively:
        </p>
        
        {/* Key Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {sharpKeys.map((key) => (
            <button
              key={`sharp-${key.key}`}
              onClick={() => setSelectedKey(key.key)}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                selectedKey === key.key
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
              }`}
            >
              {key.name}
            </button>
          ))}
          {flatKeys.slice(1).map((key) => (
            <button
              key={`flat-${key.key}`}
              onClick={() => setSelectedKey(key.key)}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                selectedKey === key.key
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
              }`}
            >
              {key.name}
            </button>
          ))}
        </div>
      </div>

      {/* Current Key Display */}
      <div className="bg-white border-2 border-amber-300 rounded-lg p-4 mb-6">
        <h4 className="text-xl font-bold text-amber-900 mb-3 text-center">
          {selectedKey === 'C' ? 'C Major' : 
           selectedKey === 'F#' ? 'F♯ Major' :
           selectedKey === 'C#' ? 'C♯ Major' :
           selectedKey === 'Bb' ? 'B♭ Major' :
           selectedKey === 'Eb' ? 'E♭ Major' :
           selectedKey === 'Ab' ? 'A♭ Major' :
           selectedKey === 'Db' ? 'D♭ Major' :
           selectedKey === 'Gb' ? 'G♭ Major' :
           selectedKey === 'Cb' ? 'C♭ Major' :
           `${selectedKey} Major`}
        </h4>
        
        {selectedKey === 'C' ? (
          <p className="text-amber-800 text-center">No sharps or flats</p>
        ) : isSharpKey ? (
          <div>
            <p className="text-amber-800 mb-3 text-center">
              Uses {getCurrentSharps().length} sharp{getCurrentSharps().length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {getCurrentSharps().map((note, index) => (
                <div
                  key={note}
                  className="bg-amber-100 border-2 border-amber-400 rounded-lg px-3 py-2 text-center"
                >
                  <div className="font-bold text-amber-900">{note}♯</div>
                  <div className="text-sm text-amber-700">{sharpMnemonics[index]}</div>
                </div>
              ))}
            </div>
          </div>
        ) : isFlatKey ? (
          <div>
            <p className="text-amber-800 mb-3 text-center">
              Uses {getCurrentFlats().length} flat{getCurrentFlats().length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {getCurrentFlats().map((note, index) => (
                <div
                  key={note}
                  className="bg-amber-100 border-2 border-amber-400 rounded-lg px-3 py-2 text-center"
                >
                  <div className="font-bold text-amber-900">{note}♭</div>
                  <div className="text-sm text-amber-700">{flatMnemonics[index]}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Memory Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-amber-300 rounded-lg p-4">
          <h5 className="text-lg font-bold text-amber-900 mb-3">Sharps Order</h5>
          <p className="text-amber-800 mb-3">
            <strong>F C G D A E B</strong>
          </p>
          <p className="text-sm text-amber-700 mb-2">
            <strong>Mnemonic:</strong> Father Charles Goes Down And Ends Battle
          </p>
          <p className="text-sm text-amber-700">
            Each new sharp key adds one more sharp in this order.
          </p>
        </div>
        
        <div className="bg-white border-2 border-amber-300 rounded-lg p-4">
          <h5 className="text-lg font-bold text-amber-900 mb-3">Flats Order</h5>
          <p className="text-amber-800 mb-3">
            <strong>B E A D G C F</strong>
          </p>
          <p className="text-sm text-amber-700 mb-2">
            <strong>Mnemonic:</strong> Battle Ends And Down Goes Charles Father
          </p>
          <p className="text-sm text-amber-700">
            Each new flat key adds one more flat in this order.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-6 bg-white border-2 border-amber-300 rounded-lg p-4">
        <h5 className="text-lg font-bold text-amber-900 mb-3">How It Works</h5>
        <div className="text-sm text-amber-800 space-y-2">
          <p>
            <strong>Sharps:</strong> Start with C (no sharps), then each key going clockwise around the circle of fifths adds one sharp in the order F-C-G-D-A-E-B.
          </p>
          <p>
            <strong>Flats:</strong> Start with C (no flats), then each key going counterclockwise around the circle of fifths adds one flat in the order B-E-A-D-G-C-F.
          </p>
          <p>
            <strong>Why this order?</strong> The sharps and flats are added in the order they appear in the circle of fifths, making it easy to remember once you understand the pattern.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeySignatureBuilder; 