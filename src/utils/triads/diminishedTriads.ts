// Diminished triad shapes by key and string set, with three shapes per set, correct inversion, and standard string order (lowest string left)

export interface DiminishedShape {
  key: string;
  stringSet: string;
  inversion: 'Root Position' | '1st Inversion' | '2nd Inversion';
  frets: [number, number, number]; // [lowest, middle, highest string in set]
  fingers: [number, number, number];
  open: boolean;
}

// Helper: for each key/string set, provide three shapes, using open if available, else movable
export const DIMINISHED_SHAPES: DiminishedShape[] = [
  // C° authoritative shapes
  { key: 'C', stringSet: '1_2_3', inversion: 'Root Position', frets: [2, 4, 5], fingers: [1, 2, 4], open: false },
  { key: 'C', stringSet: '1_2_3', inversion: '1st Inversion', frets: [8, 7, 8], fingers: [3, 2, 4], open: false },
  { key: 'C', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [11, 13, 11], fingers: [2, 4, 1], open: false },
  { key: 'C', stringSet: '2_3_4', inversion: 'Root Position', frets: [7, 8, 10], fingers: [1, 2, 4], open: false },
  { key: 'C', stringSet: '2_3_4', inversion: '1st Inversion', frets: [13, 11, 13], fingers: [3, 1, 4], open: false },
  { key: 'C', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [4, 5, 4], fingers: [1, 2, 1], open: false },
  { key: 'C', stringSet: '3_4_5', inversion: 'Root Position', frets: [11, 13, 15], fingers: [1, 2, 4], open: false },
  { key: 'C', stringSet: '3_4_5', inversion: '1st Inversion', frets: [5, 4, 6], fingers: [1, 2, 3], open: false },
  { key: 'C', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [8, 10, 9], fingers: [2, 4, 3], open: false },
  { key: 'C', stringSet: '4_5_6', inversion: 'Root Position', frets: [4, 6, 8], fingers: [1, 2, 4], open: false },
  { key: 'C', stringSet: '4_5_6', inversion: '1st Inversion', frets: [10, 9, 11], fingers: [2, 1, 4], open: false },
  { key: 'C', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [1, 3, 2], fingers: [1, 3, 2], open: false },
  // D°
  { key: 'D', stringSet: '1_2_3', inversion: 'Root Position', frets: [1, 3, 1], fingers: [1, 3, 1], open: false },
  { key: 'D', stringSet: '1_2_3', inversion: '1st Inversion', frets: [3, 1, 3], fingers: [3, 1, 4], open: false },
  { key: 'D', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [1, 3, 5], fingers: [1, 2, 4], open: false },
  { key: 'D', stringSet: '2_3_4', inversion: 'Root Position', frets: [3, 1, 3], fingers: [3, 1, 4], open: false },
  { key: 'D', stringSet: '2_3_4', inversion: '1st Inversion', frets: [1, 3, 5], fingers: [1, 2, 4], open: false },
  { key: 'D', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [3, 5, 4], fingers: [2, 4, 3], open: false },
  { key: 'D', stringSet: '3_4_5', inversion: 'Root Position', frets: [1, 3, 5], fingers: [1, 2, 4], open: false },
  { key: 'D', stringSet: '3_4_5', inversion: '1st Inversion', frets: [3, 5, 4], fingers: [2, 4, 3], open: false },
  { key: 'D', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [1, 3, 1], fingers: [1, 3, 1], open: false },
  { key: 'D', stringSet: '4_5_6', inversion: 'Root Position', frets: [3, 5, 4], fingers: [2, 4, 3], open: false },
  { key: 'D', stringSet: '4_5_6', inversion: '1st Inversion', frets: [1, 3, 1], fingers: [1, 3, 1], open: false },
  { key: 'D', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [3, 1, 3], fingers: [3, 1, 4], open: false },
  // E°
  { key: 'E', stringSet: '1_2_3', inversion: 'Root Position', frets: [3, 5, 3], fingers: [1, 3, 1], open: false },
  { key: 'E', stringSet: '1_2_3', inversion: '1st Inversion', frets: [5, 3, 5], fingers: [4, 1, 3], open: false },
  { key: 'E', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [0, 2, 1], fingers: [0, 2, 1], open: true }, // open G
  { key: 'E', stringSet: '2_3_4', inversion: 'Root Position', frets: [5, 3, 5], fingers: [4, 1, 3], open: false },
  { key: 'E', stringSet: '2_3_4', inversion: '1st Inversion', frets: [0, 2, 1], fingers: [0, 2, 1], open: true }, // open G
  { key: 'E', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [3, 5, 3], fingers: [1, 3, 1], open: false },
  { key: 'E', stringSet: '3_4_5', inversion: 'Root Position', frets: [0, 2, 1], fingers: [0, 2, 1], open: true }, // open G
  { key: 'E', stringSet: '3_4_5', inversion: '1st Inversion', frets: [3, 5, 3], fingers: [1, 3, 1], open: false },
  { key: 'E', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [5, 3, 5], fingers: [4, 1, 3], open: false },
  { key: 'E', stringSet: '4_5_6', inversion: 'Root Position', frets: [2, 1, 3], fingers: [2, 1, 4], open: false },
  { key: 'E', stringSet: '4_5_6', inversion: '1st Inversion', frets: [3, 5, 3], fingers: [1, 3, 1], open: false },
  { key: 'E', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [0, 2, 1], fingers: [0, 2, 1], open: true }, // open G
  // F°
  { key: 'F', stringSet: '1_2_3', inversion: '1st Inversion', frets: [1, 0, 1], fingers: [2, 0, 1], open: true }, // open B
  { key: 'F', stringSet: '2_3_4', inversion: 'Root Position', frets: [0, 1, 3], fingers: [0, 1, 4], open: true }, // open B
  { key: 'F', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [1, 3, 2], fingers: [1, 4, 2], open: false },
  { key: 'F', stringSet: '4_5_6', inversion: '1st Inversion', frets: [3, 2, 4], fingers: [2, 1, 4], open: false },
  // G°
  { key: 'G', stringSet: '1_2_3', inversion: '1st Inversion', frets: [3, 2, 3], fingers: [3, 1, 4], open: false },
  { key: 'G', stringSet: '2_3_4', inversion: 'Root Position', frets: [2, 3, 5], fingers: [1, 2, 4], open: false },
  { key: 'G', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [3, 5, 4], fingers: [2, 4, 3], open: false },
  { key: 'G', stringSet: '4_5_6', inversion: '1st Inversion', frets: [5, 4, 6], fingers: [2, 1, 4], open: false },
  // A°
  { key: 'A', stringSet: '1_2_3', inversion: '1st Inversion', frets: [5, 4, 5], fingers: [3, 1, 4], open: false },
  { key: 'A', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [1, 2, 1], fingers: [1, 2, 1], open: false },
  { key: 'A', stringSet: '3_4_5', inversion: '1st Inversion', frets: [2, 1, 3], fingers: [1, 2, 4], open: false },
  { key: 'A', stringSet: '4_5_6', inversion: 'Root Position', frets: [1, 3, 5], fingers: [1, 2, 4], open: false },
  // B°
  { key: 'B', stringSet: '1_2_3', inversion: 'Root Position', frets: [1, 3, 4], fingers: [1, 2, 4], open: false },
  { key: 'B', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [3, 4, 3], fingers: [2, 4, 1], open: false },
  { key: 'B', stringSet: '3_4_5', inversion: '1st Inversion', frets: [4, 3, 5], fingers: [2, 1, 4], open: false },
  { key: 'B', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [0, 2, 1], fingers: [0, 2, 1], open: true }, // open D
];

export function getDiminishedShapes(key: string, stringSet: string): DiminishedShape[] {
  return DIMINISHED_SHAPES.filter(s => s.key === key && s.stringSet === stringSet);
} 