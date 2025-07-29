const { getOptions } = require('loader-utils');
const { replaceColors, isCSSFile } = require('./color-replacer');

/**
 * Webpack loader for replacing color names in CSS
 * @param {string} source - Source file content
 * @returns {string} Processed content
 */
function colorReplacerLoader(source) {
  // Get loader options
  const options = getOptions(this) || {};
  const { colorConfig = {}, filename = '' } = options;

  // Only process CSS-related files
  if (!isCSSFile(this.resourcePath)) {
    return source;
  }

  // Mark this loader as cacheable
  this.cacheable && this.cacheable();

  try {
    // Execute color replacement
    const result = replaceColors(source, colorConfig);
    
    if (result !== source) {
      console.log(`[nextjs-color-replacer-plugin] Processing file: ${this.resourcePath}`);
    }
    
    return result;
  } catch (error) {
    // Emit warning instead of error to ensure build can continue
    this.emitWarning(new Error(`Color replacement failed: ${error.message}`));
    return source;
  }
}

module.exports = colorReplacerLoader; 