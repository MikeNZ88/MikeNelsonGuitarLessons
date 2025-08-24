// Corrected Augmented Triad data based on user's table.
const AUGMENTED_TRIADS_DATA = {
  C: {
    '1_3': [
      { frets: [4, 5, 5], label: 'Root Position', fingers: ['1', '2', '2'] },
      { frets: [8, 9, 9], label: '1st Inversion', fingers: ['1', '2', '2'] },
      { frets: [0, 1, 1], label: '2nd Inversion', fingers: ['0', '1', '1'] },
    ],
    '2_4': [
      { frets: [9, 9, 10], label: 'Root Position', fingers: ['1', '1', '2'] },
      { frets: [1, 1, 2], label: '1st Inversion', fingers: ['1', '1', '2'] },
      { frets: [5, 5, 6], label: '2nd Inversion', fingers: ['1', '1', '2'] },
    ],
    '3_5': [
      { frets: [1, 2, 3], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [5, 6, 7], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [9, 10, 11], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
    '4_6': [
      { frets: [6, 7, 8], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [10, 11, 12], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [2, 3, 4], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
  },
  D: {
    '1_3': [
      { frets: [6, 7, 7], label: 'Root Position', fingers: ['1', '2', '2'] },
      { frets: [10, 11, 11], label: '1st Inversion', fingers: ['1', '2', '2'] },
      { frets: [2, 3, 3], label: '2nd Inversion', fingers: ['1', '2', '2'] },
    ],
    '2_4': [
      { frets: [11, 11, 12], label: 'Root Position', fingers: ['1', '1', '2'] },
      { frets: [3, 3, 4], label: '1st Inversion', fingers: ['1', '1', '2'] },
      { frets: [7, 7, 8], label: '2nd Inversion', fingers: ['1', '1', '2'] },
    ],
    '3_5': [
      { frets: [3, 4, 5], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [7, 8, 9], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [11, 12, 13], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
    '4_6': [
      { frets: [8, 9, 10], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [12, 13, 14], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [4, 5, 6], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
  },
  E: {
    '1_3': [
      { frets: [8, 9, 9], label: 'Root Position', fingers: ['1', '2', '2'] },
      { frets: [0, 1, 1], label: '1st Inversion', fingers: ['0', '1', '1'] },
      { frets: [4, 5, 5], label: '2nd Inversion', fingers: ['1', '2', '2'] },
    ],
    '2_4': [
      { frets: [1, 1, 2], label: 'Root Position', fingers: ['1', '1', '2'] },
      { frets: [5, 5, 6], label: '1st Inversion', fingers: ['1', '1', '2'] },
      { frets: [9, 9, 10], label: '2nd Inversion', fingers: ['1', '1', '2'] },
    ],
    '3_5': [
      { frets: [5, 6, 7], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [9, 10, 11], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [1, 2, 3], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
    '4_6': [
      { frets: [10, 11, 12], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [2, 3, 4], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [6, 7, 8], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
  },
  F: {
    '1_3': [
      { frets: [9, 10, 10], label: 'Root Position', fingers: ['1', '2', '2'] },
      { frets: [1, 2, 2], label: '1st Inversion', fingers: ['1', '2', '2'] },
      { frets: [5, 6, 6], label: '2nd Inversion', fingers: ['1', '2', '2'] },
    ],
    '2_4': [
      { frets: [2, 2, 3], label: 'Root Position', fingers: ['1', '1', '2'] },
      { frets: [6, 6, 7], label: '1st Inversion', fingers: ['1', '1', '2'] },
      { frets: [10, 10, 11], label: '2nd Inversion', fingers: ['1', '1', '2'] },
    ],
    '3_5': [
      { frets: [6, 7, 8], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [10, 11, 12], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [2, 3, 4], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
    '4_6': [
      { frets: [11, 12, 13], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [3, 4, 5], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [7, 8, 9], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
  },
  G: {
    '1_3': [
      { frets: [11, 12, 12], label: 'Root Position', fingers: ['1', '2', '2'] },
      { frets: [3, 4, 4], label: '1st Inversion', fingers: ['1', '2', '2'] },
      { frets: [7, 8, 8], label: '2nd Inversion', fingers: ['1', '2', '2'] },
    ],
    '2_4': [
      { frets: [4, 4, 5], label: 'Root Position', fingers: ['1', '1', '2'] },
      { frets: [8, 8, 9], label: '1st Inversion', fingers: ['1', '1', '2'] },
      { frets: [0, 0, 1], label: '2nd Inversion', fingers: ['0', '0', '1'] },
    ],
    '3_5': [
      { frets: [8, 9, 10], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [0, 1, 2], label: '1st Inversion', fingers: ['0', '1', '2'] },
      { frets: [4, 5, 6], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
    '4_6': [
      { frets: [1, 2, 3], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [5, 6, 7], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [9, 10, 11], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
  },
  A: {
    '1_3': [
      { frets: [1, 2, 2], label: 'Root Position', fingers: ['1', '2', '2'] },
      { frets: [5, 6, 6], label: '1st Inversion', fingers: ['1', '2', '2'] },
      { frets: [9, 10, 10], label: '2nd Inversion', fingers: ['1', '2', '2'] },
    ],
    '2_4': [
      { frets: [6, 6, 7], label: 'Root Position', fingers: ['1', '1', '2'] },
      { frets: [10, 10, 11], label: '1st Inversion', fingers: ['1', '1', '2'] },
      { frets: [2, 2, 3], label: '2nd Inversion', fingers: ['1', '1', '2'] },
    ],
    '3_5': [
      { frets: [10, 11, 12], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [2, 3, 4], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [6, 7, 8], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
    '4_6': [
      { frets: [3, 4, 5], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [7, 8, 9], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [11, 12, 13], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
  },
  B: {
    '1_3': [
      { frets: [3, 4, 4], label: 'Root Position', fingers: ['1', '2', '2'] },
      { frets: [7, 8, 8], label: '1st Inversion', fingers: ['1', '2', '2'] },
      { frets: [11, 12, 12], label: '2nd Inversion', fingers: ['1', '2', '2'] },
    ],
    '2_4': [
      { frets: [8, 8, 9], label: 'Root Position', fingers: ['1', '1', '2'] },
      { frets: [0, 0, 1], label: '1st Inversion', fingers: ['0', '0', '1'] },
      { frets: [4, 4, 5], label: '2nd Inversion', fingers: ['1', '1', '2'] },
    ],
    '3_5': [
      { frets: [0, 1, 2], label: 'Root Position', fingers: ['0', '1', '2'] },
      { frets: [4, 5, 6], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [8, 9, 10], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
    '4_6': [
      { frets: [5, 6, 7], label: 'Root Position', fingers: ['1', '2', '3'] },
      { frets: [9, 10, 11], label: '1st Inversion', fingers: ['1', '2', '3'] },
      { frets: [1, 2, 3], label: '2nd Inversion', fingers: ['1', '2', '3'] },
    ],
  },
};

export default AUGMENTED_TRIADS_DATA; 