# AlphaTab External Files Guide

This directory contains external tab files that can be used with the AlphaTab component.

## Supported File Formats

AlphaTab supports the following file formats:

1. **Guitar Pro Files** (.gp3, .gp4, .gp5, .gpx)
2. **MusicXML Files** (.xml, .musicxml)
3. **AlphaTex Notation** (text-based format)

## How to Use External Files

### Option 1: Guitar Pro Files (Recommended)

1. Create your tab in Guitar Pro
2. Export as .gp5 file
3. Place the file in this directory (e.g., `public/tabs/exercise.gp5`)
4. Use in your component:

```tsx
<AlphaTabRenderer
  filePath="/tabs/exercise.gp5"
  showControls={true}
  tempo={120}
  zoom={0.8}
/>
```

### Option 2: MusicXML Files

1. Export from Guitar Pro as MusicXML
2. Place the file in this directory
3. Use the same component syntax as above

### Option 3: AlphaTex Notation (Current Implementation)

The picking exercises blog post currently uses AlphaTex notation directly in the component:

```tsx
<AlphaTabRenderer
  tex={`\\title "Exercise"
\\tempo 80
\\clef guitar
\\time 4/4
\\key C
\\notes 4e4e4e4e | 4f4f4f4f
\\end`}
  showControls={true}
  tempo={80}
/>
```

## File Organization

- Place all tab files in this directory
- Use descriptive filenames (e.g., `basic-alternate-picking.gp5`)
- Keep file sizes reasonable for web loading

## Benefits of External Files

- **Professional Quality**: Guitar Pro files have better formatting
- **Complex Arrangements**: Support for multiple tracks, dynamics, articulations
- **Reusability**: Same file can be used across multiple blog posts
- **Easy Updates**: Modify in Guitar Pro and replace the file

## Current Implementation

The guitar picking exercises blog post uses AlphaTex notation for simplicity and immediate functionality. For more complex arrangements, consider using Guitar Pro files. 