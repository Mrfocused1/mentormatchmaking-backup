const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/how-it-works-animation.json');
const backupFile = path.join(__dirname, '../public/how-it-works-animation-backup.json');

console.log('🔧 Fixing white background in How It Works animation...\n');

// Function to create a simple SVG placeholder with magenta background
function createPlaceholderSVG(width, height) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#8F3985"/>
</svg>`;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

try {
  const jsonData = fs.readFileSync(inputFile, 'utf8');
  const animation = JSON.parse(jsonData);

  // Create backup
  fs.writeFileSync(backupFile, jsonData, 'utf8');
  console.log('✅ Backup created at: how-it-works-animation-backup.json\n');

  // Find all image assets
  const imageAssets = animation.assets.filter(asset =>
    asset.w && asset.h && asset.p
  );

  console.log(`Found ${imageAssets.length} image assets to replace:\n`);

  // Replace each image asset with magenta placeholder
  for (let i = 0; i < imageAssets.length; i++) {
    const asset = imageAssets[i];
    console.log(`Replacing asset ${asset.id}: ${asset.w}x${asset.h}...`);

    const svgData = createPlaceholderSVG(asset.w, asset.h);

    // Find and update the asset in the animation
    const assetIndex = animation.assets.findIndex(a => a.id === asset.id);
    if (assetIndex !== -1) {
      animation.assets[assetIndex].p = svgData;
      animation.assets[assetIndex].e = 1; // Mark as embedded
      console.log(`✅ Updated asset ${asset.id}`);
    }
  }

  // Save the modified animation
  fs.writeFileSync(inputFile, JSON.stringify(animation, null, 2), 'utf8');
  console.log('\n✅ Background fixed successfully!');
  console.log(`📁 Saved to: ${inputFile}\n`);

  console.log('🎉 Done! Refresh your browser to see the changes.');
  console.log('💡 If you need to restore the original, use how-it-works-animation-backup.json\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
