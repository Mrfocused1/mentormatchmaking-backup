const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/hero-animation.json');
const outputFile = path.join(__dirname, '../public/hero-animation.json');
const backupFile = path.join(__dirname, '../public/hero-animation-backup2.json');

console.log('🎨 Removing only purple background layer...\n');

try {
  const jsonData = fs.readFileSync(inputFile, 'utf8');
  const animation = JSON.parse(jsonData);

  // Create backup
  fs.writeFileSync(backupFile, jsonData, 'utf8');
  console.log('✅ Backup created\n');

  // Strategy: Remove only the FIRST asset (index 0) which is typically the background
  // Keep all other assets (the phone images)
  if (animation.assets && Array.isArray(animation.assets)) {
    console.log(`📊 Original assets: ${animation.assets.length}`);

    // Log all assets to see what we have
    animation.assets.forEach((asset, index) => {
      console.log(`Asset ${index}: ID=${asset.id}, Size=${asset.w}x${asset.h}`);
    });

    // Remove only asset with ID '0' (the background)
    const removedAssetId = '0';
    animation.assets = animation.assets.filter(asset => {
      if (asset.id === removedAssetId) {
        console.log(`\n🗑️  Removing background asset ID: ${asset.id} (${asset.w}x${asset.h})`);
        return false;
      }
      return true;
    });

    console.log(`\n📊 Remaining assets: ${animation.assets.length}\n`);

    // Remove any layers that reference this background asset
    if (animation.layers && Array.isArray(animation.layers)) {
      const originalLayerCount = animation.layers.length;

      animation.layers = animation.layers.filter(layer => {
        if (layer.refId === removedAssetId) {
          console.log(`🗑️  Removing layer referencing background asset ${removedAssetId}`);
          return false;
        }
        return true;
      });

      const removedLayers = originalLayerCount - animation.layers.length;
      console.log(`\n📊 Removed ${removedLayers} layer(s) referencing background`);
      console.log(`📊 Remaining layers: ${animation.layers.length}\n`);
    }
  }

  // Save
  fs.writeFileSync(outputFile, JSON.stringify(animation, null, 2), 'utf8');
  console.log('✅ Background removed successfully!');
  console.log('\n🎉 Done! Refresh your browser.\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
