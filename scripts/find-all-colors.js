const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/hero-animation.json');

console.log('🔍 Searching for all colors in Lottie animation...\n');

try {
  const jsonData = fs.readFileSync(inputFile, 'utf8');
  const animation = JSON.parse(jsonData);

  const allColors = [];

  // Recursive function to find all colors
  function findColors(obj, currentPath = 'root') {
    if (!obj || typeof obj !== 'object') return;

    // Check for solid color layer (ty: 1)
    if (obj.ty === 1 && obj.sc) {
      allColors.push({
        path: currentPath,
        type: 'Solid Color Layer',
        name: obj.nm || 'Unnamed',
        color: obj.sc
      });
    }

    // Check for fill shapes
    if (obj.ty === 'fl' && obj.c) {
      const color = obj.c.k || obj.c;
      allColors.push({
        path: currentPath,
        type: 'Fill',
        name: obj.nm || 'Unnamed',
        color: color
      });
    }

    // Check for stroke shapes
    if (obj.ty === 'st' && obj.c) {
      const color = obj.c.k || obj.c;
      allColors.push({
        path: currentPath,
        type: 'Stroke',
        name: obj.nm || 'Unnamed',
        color: color
      });
    }

    // Check for gradient fills
    if (obj.ty === 'gf' && obj.g) {
      allColors.push({
        path: currentPath,
        type: 'Gradient Fill',
        name: obj.nm || 'Unnamed',
        color: obj.g
      });
    }

    // Recursively search through object properties
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          const newPath = Array.isArray(obj)
            ? `${currentPath}[${key}]`
            : `${currentPath}.${key}`;
          findColors(value, newPath);
        }
      }
    }
  }

  findColors(animation);

  console.log(`Found ${allColors.length} color definitions:\n`);

  allColors.forEach((item, index) => {
    console.log(`\n[${index + 1}] ${item.type}: "${item.name}"`);
    console.log(`    Path: ${item.path}`);
    console.log(`    Color:`, item.color);

    // Analyze if it's purple/lavender
    if (Array.isArray(item.color) && item.color.length >= 3) {
      const [r, g, b] = item.color;
      const isPurplish = (r > 0.4 && r < 0.7) && (b > 0.4 && b < 0.8) && (g < 0.6);
      const isWhitish = r > 0.9 && g > 0.9 && b > 0.9;

      if (isPurplish) {
        console.log(`    ⚠️  PURPLE/LAVENDER DETECTED!`);
      }
      if (isWhitish) {
        console.log(`    ⚠️  WHITE DETECTED!`);
      }
    }
  });

  console.log('\n\n=== SUMMARY ===');
  console.log(`Total colors found: ${allColors.length}`);

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
