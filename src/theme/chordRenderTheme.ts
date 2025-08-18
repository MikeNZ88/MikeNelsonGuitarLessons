export interface ChordRenderTheme {
  background: { start: string; end: string };
  colors: {
    title: string;
    subtitle: string;
    chordName: string;
    fingerFill: string;
    fingerInnerTextPrimary: string;
    fingerInnerTextSecondary: string;
    openMutedText: string;
    mutedX: string;
    gridStroke: string;
    accentStroke: string;
    placeholderText: string;
    footerTitle: string;
    footerSubtitle: string;
  };
}

export const amberDarkTheme: ChordRenderTheme = {
  background: { start: '#F59E0B', end: '#D97706' },
  colors: {
    title: '#7C2D12',
    subtitle: '#7C2D12',
    chordName: '#7C2D12',
    fingerFill: '#7C2D12',
    fingerInnerTextPrimary: '#FEF3C7',
    fingerInnerTextSecondary: '#FEF3C7',
    openMutedText: '#7C2D12',
    mutedX: '#7F1D1D',
    gridStroke: '#92400E',
    accentStroke: '#D97706',
    placeholderText: '#FEF3C7',
    footerTitle: '#7C2D12',
    footerSubtitle: '#7C2D12',
  },
};

export type { ChordRenderTheme as IChordRenderTheme };

export const plainLightTheme: ChordRenderTheme = {
  background: { start: '#FFFFFF', end: '#FFFFFF' },
  colors: {
    title: '#111827',
    subtitle: '#374151',
    chordName: '#7C2D12',
    fingerFill: '#7C2D12',
    fingerInnerTextPrimary: '#FFFFFF',
    fingerInnerTextSecondary: '#FFFFFF',
    openMutedText: '#7C2D12',
    mutedX: '#7F1D1D',
    gridStroke: '#6B7280',
    accentStroke: '#374151',
    placeholderText: '#374151',
    footerTitle: '#111827',
    footerSubtitle: '#374151',
  },
};

// Solid brand card amber (Tailwind amber-800 from business card: #92400E)
export const cardAmberTheme: ChordRenderTheme = {
  background: { start: '#92400E', end: '#92400E' },
  colors: {
    title: '#FFFFFF',
    subtitle: '#F3F4F6',
    chordName: '#FFFFFF',
    fingerFill: '#FFFFFF',
    fingerInnerTextPrimary: '#111827',
    fingerInnerTextSecondary: '#111827',
    openMutedText: '#FFFFFF',
    mutedX: '#FEE2E2',
    gridStroke: '#F3F4F6',
    accentStroke: '#FFFFFF',
    placeholderText: '#F3F4F6',
    footerTitle: '#FFFFFF',
    footerSubtitle: '#F3F4F6',
  },
};

// High-contrast dark theme (charcoal background)
export const darkTheme: ChordRenderTheme = {
  background: { start: '#0B0F19', end: '#111827' },
  colors: {
    title: '#F9FAFB',
    subtitle: '#D1D5DB',
    chordName: '#F9FAFB',
    fingerFill: '#F9FAFB',
    fingerInnerTextPrimary: '#1F2937',
    fingerInnerTextSecondary: '#111827',
    openMutedText: '#F9FAFB',
    mutedX: '#FCA5A5',
    gridStroke: '#9CA3AF',
    accentStroke: '#F59E0B',
    placeholderText: '#D1D5DB',
    footerTitle: '#F9FAFB',
    footerSubtitle: '#D1D5DB',
  },
};

