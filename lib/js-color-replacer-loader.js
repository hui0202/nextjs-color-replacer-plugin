const { replaceJSColors, isJSFile, isHTMLFile } = require('./js-color-replacer');

/**
 * Webpack loader for replacing color names in JavaScript/TypeScript files
 * @param {string} source - Source file content
 * @returns {string} Processed content
 */
function jsColorReplacerLoader(source) {
  // Get loader options (webpack 5 compatible)
  const options = this.getOptions() || {};
  const { colorConfig = {}, filename = '' } = options;

  // Only process JavaScript/TypeScript/HTML related files
  if (!isJSFile(this.resourcePath) && !isHTMLFile(this.resourcePath)) {
    return source;
  }

  // Mark this loader as cacheable
  this.cacheable && this.cacheable();

  try {
    // Execute color replacement
    const result = replaceJSColors(source, colorConfig);
    
    if (result !== source) {
      console.log(`[nextjs-color-replacer-plugin] Processing JS file: ${this.resourcePath}`);
    }
    
    return result;
  } catch (error) {
    // Emit warning instead of error to ensure build can continue
    this.emitWarning(new Error(`JS color replacement failed: ${error.message}`));
    return source;
  }
}

module.exports = jsColorReplacerLoader; 