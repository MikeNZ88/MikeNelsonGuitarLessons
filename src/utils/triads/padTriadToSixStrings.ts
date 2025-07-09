// Utility to map 3-string triad frets/fingers to a 6-string array for the selected string set
export function padTriadToSixStrings(frets3: number[], fingers3: number[], stringSet: string) {
  // E A D G B E
  const sixFrets = [-1, -1, -1, -1, -1, -1];
  const sixFingers = ['', '', '', '', '', ''];
  let idxs;
  if (stringSet === '1_3') idxs = [5, 4, 3]; // E B G
  else if (stringSet === '2_4') idxs = [4, 3, 2]; // B G D
  else if (stringSet === '3_5') idxs = [3, 2, 1]; // G D A
  else if (stringSet === '4_6') idxs = [2, 1, 0]; // D A E
  else idxs = [5, 4, 3];
  for (let i = 0; i < 3; i++) {
    sixFrets[idxs[i]] = frets3[i];
    sixFingers[idxs[i]] = fingers3[i] === 0 ? '' : fingers3[i]?.toString() || '';
  }
  return { sixFrets, sixFingers };
} 