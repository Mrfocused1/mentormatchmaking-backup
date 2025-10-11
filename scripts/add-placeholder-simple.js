const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/hero-animation.json');
const outputFile = path.join(__dirname, '../public/hero-animation.json');
const backupFile = path.join(__dirname, '../public/hero-animation-backup4.json');

console.log('🖼️  Adding placeholder images to iPhone screens...\n');

// Function to create a simple SVG placeholder and convert to base64
function createPlaceholderSVG(width, height, bgColor, textColor, text) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text
    x="50%"
    y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="48"
    font-weight="bold"
    fill="${textColor}">
    ${text}
  </text>
</svg>`;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

try {
  const jsonData = fs.readFileSync(inputFile, 'utf8');
  const animation = JSON.parse(jsonData);

  // Create backup
  fs.writeFileSync(backupFile, jsonData, 'utf8');
  console.log('✅ Backup created at: hero-animation-backup4.json\n');

  // Get the first 4 image assets (the iPhone screens)
  const imageAssets = animation.assets.filter(asset =>
    asset.w && asset.h && asset.p
  ).slice(0, 4);

  console.log(`Found ${imageAssets.length} image assets to replace:\n`);

  // Define placeholder configurations for each screen
  const placeholders = [
    {
      id: imageAssets[0]?.id || '0',
      width: imageAssets[0]?.w || 892,
      height: imageAssets[0]?.h || 1808,
      bgColor: '#8F3985',
      textColor: '#FFFFFF',
      text: 'MentorMatch'
    },
    {
      id: imageAssets[1]?.id || '1',
      width: imageAssets[1]?.w || 1179,
      height: imageAssets[1]?.h || 2048,
      bgColor: '#07BEB8',
      textColor: '#FFFFFF',
      text: 'Find Mentors'
    },
    {
      id: imageAssets[2]?.id || '2',
      width: imageAssets[2]?.w || 786,
      height: imageAssets[2]?.h || 1704,
      bgColor: '#98DFEA',
      textColor: '#25283D',
      text: 'Profile'
    },
    {
      id: imageAssets[3]?.id || '3',
      width: imageAssets[3]?.w || 1179,
      height: imageAssets[3]?.h || 2048,
      bgColor: '#25283D',
      textColor: '#98DFEA',
      text: 'Messages'
    }
  ];

  console.log('🎨 Creating placeholder images...\n');

  for (let i = 0; i < placeholders.length; i++) {
    const placeholder = placeholders[i];
    console.log(`Creating: ${placeholder.width}x${placeholder.height} for asset ${placeholder.id}...`);

    const svgData = createPlaceholderSVG(
      placeholder.width,
      placeholder.height,
      placeholder.bgColor,
      placeholder.textColor,
      placeholder.text
    );

    // Find and update the asset in the animation
    const assetIndex = animation.assets.findIndex(a => a.id === placeholder.id);
    if (assetIndex !== -1) {
      animation.assets[assetIndex].p = svgData;
      animation.assets[assetIndex].e = 1; // Mark as embedded
      console.log(`✅ Updated asset ${placeholder.id}`);
    } else {
      console.log(`⚠️  Asset ${placeholder.id} not found`);
    }
  }

  // Save the modified animation
  fs.writeFileSync(outputFile, JSON.stringify(animation, null, 2), 'utf8');
  console.log('\n✅ Placeholder images added successfully!');
  console.log(`📁 Saved to: ${outputFile}\n`);

  console.log('🎉 Done! Refresh your browser to see the placeholder images.');
  console.log('💡 If you need to restore the original, use hero-animation-backup4.json\n');

  console.log('📝 Placeholder screens created:');
  placeholders.forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.text} (${p.bgColor})`);
  });

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
