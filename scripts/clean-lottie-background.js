const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/hero-animation.json');
const outputFile = path.join(__dirname, '../public/hero-animation.json');
const backupFile = path.join(__dirname, '../public/hero-animation-backup3.json');

console.log('🎨 Cleaning Lottie animation background...\n');

try {
  const jsonData = fs.readFileSync(inputFile, 'utf8');
  const animation = JSON.parse(jsonData);

  // Create backup
  fs.writeFileSync(backupFile, jsonData, 'utf8');
  console.log('✅ Backup created at: hero-animation-backup3.json\n');

  let removedLayers = 0;
  let modifiedLayers = 0;

  // Helper function to check if a color is white or off-white
  function isWhiteColor(color) {
    if (!color) return false;

    // Handle array format [r, g, b, a]
    if (Array.isArray(color)) {
      // Check if RGB values are all >= 0.9 (close to white)
      return color[0] >= 0.9 && color[1] >= 0.9 && color[2] >= 0.9;
    }

    // Handle hex format
    if (typeof color === 'string') {
      const hex = color.toLowerCase();
      return hex === '#ffffff' || hex === '#fff' || hex === 'white';
    }

    return false;
  }

  // Helper function to check if a layer has blur effects
  function hasBlurEffect(layer) {
    if (!layer.ef) return false;

    return layer.ef.some(effect => {
      const effectName = effect.nm ? effect.nm.toLowerCase() : '';
      return effectName.includes('blur') || effectName.includes('gaussian');
    });
  }

  // Helper function to recursively process layers
  function processLayers(layers) {
    if (!Array.isArray(layers)) return layers;

    return layers.filter(layer => {
      const layerName = (layer.nm || '').toLowerCase();

      // Check if layer name suggests it's a background
      if (layerName.includes('background') || layerName.includes('bg') ||
          layerName.includes('backdrop') || layerName.includes('blur')) {
        console.log(`🗑️  Removing layer by name: "${layer.nm}"`);
        removedLayers++;
        return false;
      }

      // Remove solid color layers (type 1) that are white or semi-transparent
      if (layer.ty === 1) {
        const solidColor = layer.sc;
        if (isWhiteColor(solidColor)) {
          console.log(`🗑️  Removing white solid color layer: "${layer.nm || 'Unnamed'}"`);
          removedLayers++;
          return false;
        }
      }

      // Remove layers with blur effects
      if (hasBlurEffect(layer)) {
        console.log(`🗑️  Removing layer with blur effect: "${layer.nm || 'Unnamed'}"`);
        removedLayers++;
        return false;
      }

      // Process shape layers (type 4)
      if (layer.ty === 4 && layer.shapes) {
        let hasWhiteBackground = false;

        // Check each shape for white fills
        layer.shapes = layer.shapes.filter(shape => {
          // Check if it's a fill shape
          if (shape.ty === 'fl') {
            const fillColor = shape.c ? shape.c.k : null;
            if (isWhiteColor(fillColor)) {
              console.log(`🗑️  Removing white fill from layer: "${layer.nm || 'Unnamed'}"`);
              hasWhiteBackground = true;
              return false;
            }
          }

          // Keep the shape if it's not a white fill
          return true;
        });

        // If the layer only had white backgrounds, remove it entirely
        if (hasWhiteBackground && layer.shapes.length === 0) {
          console.log(`🗑️  Removing empty layer after removing white fills: "${layer.nm || 'Unnamed'}"`);
          removedLayers++;
          return false;
        }
      }

      // Process precomposition layers (type 0) - recursively process their layers
      if (layer.ty === 0 && layer.layers) {
        layer.layers = processLayers(layer.layers);
        modifiedLayers++;
      }

      // Process group layers - recursively process nested items
      if (layer.it && Array.isArray(layer.it)) {
        layer.it = layer.it.filter(item => {
          if (item.ty === 'fl') {
            const fillColor = item.c ? item.c.k : null;
            if (isWhiteColor(fillColor)) {
              console.log(`🗑️  Removing white fill from group in: "${layer.nm || 'Unnamed'}"`);
              return false;
            }
          }
          return true;
        });
      }

      return true;
    });
  }

  // Process all layers
  if (animation.layers && Array.isArray(animation.layers)) {
    const originalLayerCount = animation.layers.length;
    console.log(`📊 Original layer count: ${originalLayerCount}\n`);

    animation.layers = processLayers(animation.layers);

    console.log(`\n📊 Removed ${removedLayers} layer(s)`);
    console.log(`📊 Modified ${modifiedLayers} layer(s)`);
    console.log(`📊 Remaining layers: ${animation.layers.length}\n`);
  }

  // Ensure root background is transparent
  if (animation.bg) {
    console.log(`🗑️  Removing root background color: ${animation.bg}`);
    delete animation.bg;
  }

  // Set background alpha to 0 if it exists
  if (animation.meta && animation.meta.bg) {
    console.log(`🗑️  Setting background alpha to 0`);
    delete animation.meta.bg;
  }

  // Save the cleaned animation
  fs.writeFileSync(outputFile, JSON.stringify(animation, null, 2), 'utf8');
  console.log('✅ Background layers removed successfully!');
  console.log(`📁 Saved to: ${outputFile}\n`);

  console.log('🎉 Done! Refresh your browser to see the changes.');
  console.log('💡 If you need to restore the original, use hero-animation-backup3.json\n');

} catch (error) {
  console.error('❌ Error processing Lottie file:', error.message);
  process.exit(1);
}
