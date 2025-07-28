const { createCanvas } = require('canvas');
const fs = require('fs');

// Create canvas
const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

// Background gradient (amber theme)
const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#92400e'); // amber-800
gradient.addColorStop(1, '#d97706'); // amber-600
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1200, 630);

// Text styling
ctx.fillStyle = 'white';
ctx.textAlign = 'center';

// Main title
ctx.font = 'bold 56px serif';
ctx.fillText('Mike Nelson Guitar Lessons', 600, 280);

// Tagline
ctx.font = '28px sans-serif';
ctx.fillText('Learn Guitar Theory, Scales, Chords & Techniques', 600, 350);
ctx.fillText('Wellington, New Zealand', 600, 390);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/social-media-default.png', buffer);

console.log('Social media image created: public/social-media-default.png');
