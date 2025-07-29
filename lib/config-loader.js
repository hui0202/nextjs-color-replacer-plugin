const path = require('path');
const fs = require('fs');

/**
 * Load color configuration file
 * @param {string} rootDir - Project root directory
 * @returns {Object} Color configuration object
 */
function loadColorConfig(rootDir) {
  const configPath = path.join(rootDir, 'colors.config.js');
  
  try {
    // Check if configuration file exists
    if (!fs.existsSync(configPath)) {
      console.warn(`[nextjs-color-replacer-plugin] Warning: Color configuration file not found ${configPath}`);
      return {};
    }

    // Clear require cache to ensure latest configuration is loaded
    delete require.cache[require.resolve(configPath)];
    
    // Load configuration file
    const config = require(configPath);
    
    // Validate configuration format
    if (typeof config !== 'object' || config === null) {
      console.error(`[nextjs-color-replacer-plugin] Error: Configuration file must export an object`);
      return {};
    }

    console.log(`[nextjs-color-replacer-plugin] Successfully loaded color configuration with ${Object.keys(config).length} color definitions`);
    return config;
    
  } catch (error) {
    console.error(`[nextjs-color-replacer-plugin] Failed to load configuration file:`, error.message);
    return {};
  }
}

/**
 * Flatten nested color configuration
 * Example: { Gray: { 800: '#E0E0E0' } } -> { 'Gray/800': '#E0E0E0' }
 * @param {Object} config - Original configuration object
 * @param {string} prefix - Prefix
 * @returns {Object} Flattened configuration
 */
function flattenColorConfig(config, prefix = '') {
  const flattened = {};
  
  for (const [key, value] of Object.entries(config)) {
    const currentKey = prefix ? `${prefix}/${key}` : key;
    
    if (typeof value === 'string') {
      // If it's a string, consider it as a color value
      flattened[currentKey] = value;
    } else if (typeof value === 'object' && value !== null) {
      // If it's an object, process recursively
      Object.assign(flattened, flattenColorConfig(value, currentKey));
    }
  }
  
  return flattened;
}

module.exports = {
  loadColorConfig,
  flattenColorConfig
}; 