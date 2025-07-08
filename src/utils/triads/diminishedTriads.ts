// Diminished triad shapes by key and string set, with three shapes per set, correct inversion, and standard string order (lowest string left)

export interface DiminishedShape {
  key: string;
  stringSet: string;
  inversion: 'Root Position' | '1st Inversion' | '2nd Inversion';
  frets: [number, number, number]; // [lowest, middle, highest string in set]
  fingers: [number, number, number];
  open: boolean;
  startFret: number;
}

// Helper: for each key/string set, provide three shapes, using open if available, else movable
export const DIMINISHED_SHAPES: DiminishedShape[] = [
  // C° authoritative shapes (corrected string order)
  // 1_2_3 (E-B-G): [E, B, G]
  { key: 'C', stringSet: '1_2_3', inversion: 'Root Position', frets: [2,4,5], fingers: [1,3,4], open: false, startFret: 2 },
  { key: 'C', stringSet: '1_2_3', inversion: '1st Inversion', frets: [8,7,8], fingers: [3,1,2], open: false, startFret: 7 },
  { key: 'C', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [11,13,11], fingers: [1,4,1], open: false, startFret: 11 },
  // 2_3_4 (B-G-D): [B, G, D]
  { key: 'C', stringSet: '2_3_4', inversion: 'Root Position', frets: [7,8,10], fingers: [1,2,4], open: false, startFret: 7 },
  { key: 'C', stringSet: '2_3_4', inversion: '1st Inversion', frets: [13,11,13], fingers: [4,1,3], open: false, startFret: 11 },
  { key: 'C', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [4,5,4], fingers: [2,3,1], open: false, startFret: 4 },
  // 3_4_5 (G-D-A): [A, D, G] (lowest to highest)
  { key: 'C', stringSet: '3_4_5', inversion: 'Root Position', frets: [11,13,15], fingers: [1,2,4], open: false, startFret: 11 },
  { key: 'C', stringSet: '3_4_5', inversion: '1st Inversion', frets: [5,4,6], fingers: [2,1,3], open: false, startFret: 4 },
  { key: 'C', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [8,10,9], fingers: [1,3,2], open: false, startFret: 8 },
  // 4_5_6 (D-A-E): [E, A, D]
  { key: 'C', stringSet: '4_5_6', inversion: 'Root Position', frets: [4,6,8], fingers: [1,2,4], open: false, startFret: 4 },
  { key: 'C', stringSet: '4_5_6', inversion: '1st Inversion', frets: [10,9,11], fingers: [2,1,4], open: false, startFret: 9 },
  { key: 'C', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [1,3,2], fingers: [1,3,2], open: false, startFret: 1 },
  // D° authoritative shapes (corrected string order)
  // 1_2_3 (E-B-G): [E, B, G]
  { key: 'D', stringSet: '1_2_3', inversion: 'Root Position', frets: [4,6,7], fingers: [1,2,4], open: false, startFret: 4 },
  { key: 'D', stringSet: '1_2_3', inversion: '1st Inversion', frets: [10,9,10], fingers: [3,2,4], open: false, startFret: 9 },
  { key: 'D', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [1,3,1], fingers: [1,3,1], open: false, startFret: 1 },
  // 2_3_4 (B-G-D): [B, G, D]
  { key: 'D', stringSet: '2_3_4', inversion: 'Root Position', frets: [9,10,12], fingers: [1,2,4], open: false, startFret: 9 },
  { key: 'D', stringSet: '2_3_4', inversion: '1st Inversion', frets: [3,1,3], fingers: [2,1,3], open: false, startFret: 1 },
  { key: 'D', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [6,7,6], fingers: [1,2,1], open: false, startFret: 6 },
  // 3_4_5 (G-D-A): [A, D, G]
  { key: 'D', stringSet: '3_4_5', inversion: 'Root Position', frets: [1,3,5], fingers: [1,2,4], open: false, startFret: 1 },
  { key: 'D', stringSet: '3_4_5', inversion: '1st Inversion', frets: [7,6,8], fingers: [2,1,4], open: false, startFret: 6 },
  { key: 'D', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [10,12,11], fingers: [3,4,2], open: false, startFret: 10 },
  // 4_5_6 (D-A-E): [E, A, D]
  { key: 'D', stringSet: '4_5_6', inversion: 'Root Position', frets: [6,8,10], fingers: [1,2,4], open: false, startFret: 6 },
  { key: 'D', stringSet: '4_5_6', inversion: '1st Inversion', frets: [12,11,13], fingers: [3,2,4], open: false, startFret: 11 },
  { key: 'D', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [3,5,4], fingers: [1,3,2], open: false, startFret: 3 },
  // E°
  { key: 'E', stringSet: '1_2_3', inversion: 'Root Position', frets: [6,8,9], fingers: [1,2,4], open: false, startFret: 6 },
  { key: 'E', stringSet: '1_2_3', inversion: '1st Inversion', frets: [12,11,12], fingers: [3,2,4], open: false, startFret: 11 },
  { key: 'E', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [3,5,3], fingers: [1,3,1], open: false, startFret: 3 },
  { key: 'E', stringSet: '2_3_4', inversion: 'Root Position', frets: [11,12,14], fingers: [1,2,4], open: false, startFret: 11 },
  { key: 'E', stringSet: '2_3_4', inversion: '1st Inversion', frets: [5,3,5], fingers: [2,1,3], open: false, startFret: 3 },
  { key: 'E', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [8,9,8], fingers: [2,3,1], open: false, startFret: 8 },
  { key: 'E', stringSet: '3_4_5', inversion: 'Root Position', frets: [3,5,7], fingers: [1,2,4], open: false, startFret: 3 },
  { key: 'E', stringSet: '3_4_5', inversion: '1st Inversion', frets: [9,8,10], fingers: [2,1,4], open: false, startFret: 8 },
  { key: 'E', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [0,2,1], fingers: [0,2,1], open: true, startFret: 0 },
  { key: 'E', stringSet: '4_5_6', inversion: 'Root Position', frets: [8,10,12], fingers: [1,2,4], open: false, startFret: 8 },
  { key: 'E', stringSet: '4_5_6', inversion: '1st Inversion', frets: [2,1,3], fingers: [2,1,3], open: false, startFret: 1 },
  { key: 'E', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [5,7,6], fingers: [2,4,3], open: false, startFret: 5 },
  // F°
  { key: 'F', stringSet: '1_2_3', inversion: 'Root Position', frets: [7,9,10], fingers: [1,2,4], open: false, startFret: 7 },
  { key: 'F', stringSet: '1_2_3', inversion: '1st Inversion', frets: [1,0,1], fingers: [2,0,1], open: true, startFret: 0 },
  { key: 'F', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [4,6,4], fingers: [1,3,1], open: false, startFret: 4 },
  { key: 'F', stringSet: '2_3_4', inversion: 'Root Position', frets: [0,1,3], fingers: [0,1,3], open: true, startFret: 0 },
  { key: 'F', stringSet: '2_3_4', inversion: '1st Inversion', frets: [6,4,6], fingers: [2,1,3], open: false, startFret: 4 },
  { key: 'F', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [9,10,9], fingers: [3,4,2], open: false, startFret: 9 },
  { key: 'F', stringSet: '3_4_5', inversion: 'Root Position', frets: [4,6,8], fingers: [1,2,4], open: false, startFret: 4 },
  { key: 'F', stringSet: '3_4_5', inversion: '1st Inversion', frets: [10,9,11], fingers: [2,1,4], open: false, startFret: 9 },
  { key: 'F', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [1,3,2], fingers: [1,3,2], open: false, startFret: 1 },
  { key: 'F', stringSet: '4_5_6', inversion: 'Root Position', frets: [9,11,13], fingers: [1,2,4], open: false, startFret: 9 },
  { key: 'F', stringSet: '4_5_6', inversion: '1st Inversion', frets: [3,2,4], fingers: [2,1,4], open: false, startFret: 2 },
  { key: 'F', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [6,8,7], fingers: [2,4,3], open: false, startFret: 6 },
  // G°
  { key: 'G', stringSet: '1_2_3', inversion: 'Root Position', frets: [9,11,12], fingers: [1,2,4], open: false, startFret: 9 },
  { key: 'G', stringSet: '1_2_3', inversion: '1st Inversion', frets: [3,2,3], fingers: [2,1,3], open: false, startFret: 2 },
  { key: 'G', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [6,8,6], fingers: [1,3,1], open: false, startFret: 6 },
  { key: 'G', stringSet: '2_3_4', inversion: 'Root Position', frets: [2,3,5], fingers: [1,2,4], open: false, startFret: 2 },
  { key: 'G', stringSet: '2_3_4', inversion: '1st Inversion', frets: [8,6,8], fingers: [2,1,3], open: false, startFret: 6 },
  { key: 'G', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [11,12,11], fingers: [3,4,2], open: false, startFret: 11 },
  { key: 'G', stringSet: '3_4_5', inversion: 'Root Position', frets: [6,8,10], fingers: [1,2,4], open: false, startFret: 6 },
  { key: 'G', stringSet: '3_4_5', inversion: '1st Inversion', frets: [12,11,13], fingers: [2,1,4], open: false, startFret: 11 },
  { key: 'G', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [3,5,4], fingers: [1,3,2], open: false, startFret: 3 },
  { key: 'G', stringSet: '4_5_6', inversion: 'Root Position', frets: [11,13,15], fingers: [1,2,4], open: false, startFret: 11 },
  { key: 'G', stringSet: '4_5_6', inversion: '1st Inversion', frets: [5,4,6], fingers: [2,1,4], open: false, startFret: 4 },
  { key: 'G', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [8,10,9], fingers: [2,4,3], open: false, startFret: 8 },
  // A°
  { key: 'A', stringSet: '1_2_3', inversion: 'Root Position', frets: [11,13,14], fingers: [1,2,4], open: false, startFret: 11 },
  { key: 'A', stringSet: '1_2_3', inversion: '1st Inversion', frets: [5,4,5], fingers: [2,1,3], open: false, startFret: 4 },
  { key: 'A', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [8,10,8], fingers: [1,3,1], open: false, startFret: 8 },
  { key: 'A', stringSet: '2_3_4', inversion: 'Root Position', frets: [4,5,7], fingers: [1,2,4], open: false, startFret: 4 },
  { key: 'A', stringSet: '2_3_4', inversion: '1st Inversion', frets: [10,8,10], fingers: [2,1,3], open: false, startFret: 8 },
  { key: 'A', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [1,2,1], fingers: [1,2,1], open: false, startFret: 1 },
  { key: 'A', stringSet: '3_4_5', inversion: 'Root Position', frets: [8,10,12], fingers: [1,2,4], open: false, startFret: 8 },
  { key: 'A', stringSet: '3_4_5', inversion: '1st Inversion', frets: [2,1,3], fingers: [1,2,4], open: false, startFret: 1 },
  { key: 'A', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [5,7,6], fingers: [2,4,3], open: false, startFret: 5 },
  { key: 'A', stringSet: '4_5_6', inversion: 'Root Position', frets: [1,3,5], fingers: [1,2,4], open: false, startFret: 1 },
  { key: 'A', stringSet: '4_5_6', inversion: '1st Inversion', frets: [7,6,8], fingers: [2,1,3], open: false, startFret: 6 },
  { key: 'A', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [10,12,11], fingers: [3,4,2], open: false, startFret: 10 },
  // B°
  { key: 'B', stringSet: '1_2_3', inversion: 'Root Position', frets: [1,3,4], fingers: [1,2,4], open: false, startFret: 1 },
  { key: 'B', stringSet: '1_2_3', inversion: '1st Inversion', frets: [7,6,7], fingers: [2,1,3], open: false, startFret: 6 },
  { key: 'B', stringSet: '1_2_3', inversion: '2nd Inversion', frets: [10,12,10], fingers: [1,3,1], open: false, startFret: 10 },
  { key: 'B', stringSet: '2_3_4', inversion: 'Root Position', frets: [6,7,9], fingers: [1,2,4], open: false, startFret: 6 },
  { key: 'B', stringSet: '2_3_4', inversion: '1st Inversion', frets: [12,10,12], fingers: [2,1,3], open: false, startFret: 10 },
  { key: 'B', stringSet: '2_3_4', inversion: '2nd Inversion', frets: [3,4,3], fingers: [1,2,1], open: false, startFret: 3 },
  { key: 'B', stringSet: '3_4_5', inversion: 'Root Position', frets: [10,12,14], fingers: [1,2,4], open: false, startFret: 10 },
  { key: 'B', stringSet: '3_4_5', inversion: '1st Inversion', frets: [4,3,5], fingers: [2,1,3], open: false, startFret: 3 },
  { key: 'B', stringSet: '3_4_5', inversion: '2nd Inversion', frets: [7,9,8], fingers: [2,4,3], open: false, startFret: 7 },
  { key: 'B', stringSet: '4_5_6', inversion: 'Root Position', frets: [3,5,7], fingers: [1,2,4], open: false, startFret: 3 },
  { key: 'B', stringSet: '4_5_6', inversion: '1st Inversion', frets: [9,8,10], fingers: [2,1,3], open: false, startFret: 8 },
  { key: 'B', stringSet: '4_5_6', inversion: '2nd Inversion', frets: [0,2,1], fingers: [0,2,1], open: true, startFret: 0 },
];

export function getDiminishedShapes(key: string, stringSet: string): DiminishedShape[] {
  return DIMINISHED_SHAPES.filter(s => s.key === key && s.stringSet === stringSet);
} 