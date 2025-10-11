const fs = require('fs');
const path = require('path');

// Path to the Lottie animation file
const inputFile = path.join(__dirname, '../public/hero-animation.json');
const outputFile = path.join(__dirname, '../public/hero-animation.json');
const backupFile = path.join(__dirname, '../public/hero-animation.backup.json');

console.log('🎨 Removing background from Lottie animation...\n');

try {
  // Read the JSON file
  const jsonData = fs.readFileSync(inputFile, 'utf8');
  const animation = JSON.parse(jsonData);

  // Create backup
  fs.writeFileSync(backupFile, jsonData, 'utf8');
  console.log('✅ Backup created at: hero-animation.backup.json\n');

  // Remove background strategies:

  // Strategy 1: Remove large background images from assets (typically asset ID '0')
  let removedAssets = 0;
  const backgroundAssetIds = [];

  if (animation.assets && Array.isArray(animation.assets)) {
    const originalAssetCount = animation.assets.length;

    // Find large images that are likely backgrounds (first asset with large dimensions)
    animation.assets = animation.assets.filter((asset, index) => {
      // Check if this is a large image asset (background images are usually large)
      if (asset.p && asset.w && asset.h && (asset.w * asset.h > 500000 || index === 0)) {
        console.log(`🗑️  Removing background image asset ID: ${asset.id} (${asset.w}x${asset.h})`);
        backgroundAssetIds.push(asset.id);
        return false;
      }
      return true;
    });

    removedAssets = originalAssetCount - animation.assets.length;
  }

  // Strategy 2: Remove layers that reference the background assets
  if (animation.layers && Array.isArray(animation.layers)) {
    const originalLayerCount = animation.layers.length;

    animation.layers = animation.layers.filter(layer => {
      // Remove layers referencing background assets
      if (layer.refId && backgroundAssetIds.includes(layer.refId)) {
        console.log(`🗑️  Removing layer referencing background asset: ${layer.refId}`);
        return false;
      }

      // Remove solid color layers (background layers are typically solid colors)
      if (layer.ty === 1) {
        console.log(`🗑️  Removing solid color layer: ${layer.nm || 'Unnamed'}`);
        return false;
      }

      // Remove layers with "background" in the name (case insensitive)
      if (layer.nm && layer.nm.toLowerCase().includes('background')) {
        console.log(`🗑️  Removing background layer by name: ${layer.nm}`);
        return false;
      }

      // Remove layers with "bg" in the name (case insensitive)
      if (layer.nm && layer.nm.toLowerCase().includes('bg')) {
        console.log(`🗑️  Removing background layer by name: ${layer.nm}`);
        return false;
      }

      return true;
    });

    const removedLayers = originalLayerCount - animation.layers.length;
    console.log(`\n📊 Removed ${removedAssets} background asset(s)`);
    console.log(`📊 Removed ${removedLayers} background layer(s)`);
    console.log(`📊 Remaining layers: ${animation.layers.length}\n`);
  }

  // Strategy 3: Remove background color from root
  if (animation.bg) {
    console.log(`🗑️  Removing root background color: ${animation.bg}`);
    delete animation.bg;
  }

  // Save the modified animation
  fs.writeFileSync(outputFile, JSON.stringify(animation, null, 2), 'utf8');
  console.log('✅ Background removed successfully!');
  console.log(`📁 Saved to: ${outputFile}\n`);

  console.log('🎉 Done! Refresh your browser to see the changes.');
  console.log('💡 If you need to restore the original, use hero-animation.backup.json\n');

} catch (error) {
  console.error('❌ Error processing Lottie file:', error.message);
  process.exit(1);
}
