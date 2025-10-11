const fs = require('fs');
const path = require('path');
const https = require('https');

const inputFile = path.join(__dirname, '../public/hero-animation.json');
const outputFile = path.join(__dirname, '../public/hero-animation.json');
const backupFile = path.join(__dirname, '../public/hero-animation-backup4.json');

console.log('🖼️  Adding placeholder images to iPhone screens...\n');

// Function to download and convert image to base64
function downloadImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString('base64');
        resolve(`data:image/png;base64,${base64}`);
      });
      response.on('error', reject);
    });
  });
}

async function main() {
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

    // Define placeholder images for each screen
    // Using placeholder.com with dimensions matching the original assets
    const placeholders = [
      {
        id: imageAssets[0].id,
        width: imageAssets[0].w,
        height: imageAssets[0].h,
        url: `https://via.placeholder.com/${imageAssets[0].w}x${imageAssets[0].h}/8F3985/FFFFFF?text=MentorMatch+App`
      },
      {
        id: imageAssets[1].id,
        width: imageAssets[1].w,
        height: imageAssets[1].h,
        url: `https://via.placeholder.com/${imageAssets[1].w}x${imageAssets[1].h}/07BEB8/FFFFFF?text=Find+Mentors`
      },
      {
        id: imageAssets[2].id,
        width: imageAssets[2].w,
        height: imageAssets[2].h,
        url: `https://via.placeholder.com/${imageAssets[2].w}x${imageAssets[2].h}/98DFEA/25283D?text=Profile+View`
      },
      {
        id: imageAssets[3].id,
        width: imageAssets[3].w,
        height: imageAssets[3].h,
        url: `https://via.placeholder.com/${imageAssets[3].w}x${imageAssets[3].h}/25283D/98DFEA?text=Messages`
      }
    ];

    console.log('📥 Downloading placeholder images...\n');

    for (let i = 0; i < placeholders.length; i++) {
      const placeholder = placeholders[i];
      console.log(`Downloading: ${placeholder.width}x${placeholder.height} for asset ${placeholder.id}...`);

      try {
        const base64Data = await downloadImageAsBase64(placeholder.url);

        // Find and update the asset in the animation
        const assetIndex = animation.assets.findIndex(a => a.id === placeholder.id);
        if (assetIndex !== -1) {
          animation.assets[assetIndex].p = base64Data;
          animation.assets[assetIndex].e = 1; // Mark as embedded
          console.log(`✅ Updated asset ${placeholder.id}`);
        }
      } catch (error) {
        console.error(`❌ Failed to download for asset ${placeholder.id}:`, error.message);
      }
    }

    // Save the modified animation
    fs.writeFileSync(outputFile, JSON.stringify(animation, null, 2), 'utf8');
    console.log('\n✅ Placeholder images added successfully!');
    console.log(`📁 Saved to: ${outputFile}\n`);

    console.log('🎉 Done! Refresh your browser to see the placeholder images.');
    console.log('💡 If you need to restore the original, use hero-animation-backup4.json\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
