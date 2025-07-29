const csstree = require('css-tree');

/**
 * Replace color names in CSS with actual color values
 * @param {string} cssContent - CSS content
 * @param {Object} colorConfig - Color configuration mapping
 * @returns {string} CSS content after replacement
 */
function replaceColors(cssContent, colorConfig) {
  if (!cssContent || Object.keys(colorConfig).length === 0) {
    return cssContent;
  }

  try {
    // First try string replacement for color names containing slashes
    let preprocessedCSS = replaceColorsSimple(cssContent, colorConfig);
    
    // Then use AST to handle remaining simple color names
    const ast = csstree.parse(preprocessedCSS);
    let hasChanges = false;

    // Walk through AST to find and replace color values
    csstree.walk(ast, function(node) {
      if (node.type === 'Identifier' || node.type === 'Raw') {
        const value = node.value || node.name;
        
        // Check if it matches a key in color configuration (exclude already preprocessed ones)
        if (colorConfig.hasOwnProperty(value) && !value.includes('/')) {
          const colorValue = colorConfig[value];
          
          // Replace node value
          if (node.type === 'Identifier') {
            node.name = colorValue;
          } else {
            node.value = colorValue;
          }
          
          hasChanges = true;
          console.log(`[nextjs-color-replacer-plugin] AST color replacement: ${value} -> ${colorValue}`);
        }
      }
      
      // Handle string type values (like in calc() functions)
      if (node.type === 'String') {
        let stringValue = node.value;
        let modified = false;
        
        // Remove quotes and check for replacement
        const unquoted = stringValue.replace(/^['"]|['"]$/g, '');
        if (colorConfig.hasOwnProperty(unquoted)) {
          stringValue = `"${colorConfig[unquoted]}"`;
          modified = true;
        }
        
        if (modified) {
          node.value = stringValue;
          hasChanges = true;
          console.log(`[nextjs-color-replacer-plugin] String color replacement: ${unquoted} -> ${colorConfig[unquoted]}`);
        }
      }
    });

    // If there are changes, regenerate CSS, otherwise return preprocessed CSS
    if (hasChanges) {
      return csstree.generate(ast);
    }
    
    return preprocessedCSS;
    
  } catch (error) {
    console.error(`[nextjs-color-replacer-plugin] CSS parsing error:`, error.message);
    // If parsing fails, use simple string replacement as fallback
    return replaceColorsSimple(cssContent, colorConfig);
  }
}

/**
 * Simple string replacement approach (fallback)
 * @param {string} cssContent - CSS content
 * @param {Object} colorConfig - Color configuration mapping
 * @returns {string} CSS content after replacement
 */
function replaceColorsSimple(cssContent, colorConfig) {
  let result = cssContent;
  
  // Sort by key length, prioritize longer keys (to avoid partial matching issues)
  const sortedKeys = Object.keys(colorConfig).sort((a, b) => b.length - a.length);
  
  for (const colorName of sortedKeys) {
    const colorValue = colorConfig[colorName];
    
    // For color names containing slashes, use special matching rules
    let regex;
    if (colorName.includes('/')) {
      // Match color names in CSS property values, use capture groups to preserve delimiters
      regex = new RegExp(`([:\\s;])${escapeRegex(colorName)}(?=[;\\s}])`, 'g');
      const originalResult = result;
      result = result.replace(regex, `$1${colorValue}`);
      
      if (result !== originalResult) {
        console.log(`[nextjs-color-replacer-plugin] Simple color replacement: ${colorName} -> ${colorValue}`);
      }
      continue; // Skip the general handling below
    } else {
      // Regular word boundary matching
      regex = new RegExp(`\\b${escapeRegex(colorName)}\\b`, 'g');
    }
    
    const originalResult = result;
    result = result.replace(regex, colorValue);
    
    if (result !== originalResult) {
      console.log(`[nextjs-color-replacer-plugin] Simple color replacement: ${colorName} -> ${colorValue}`);
    }
  }
  
  return result;
}

/**
 * Escape special characters in regular expressions
 * @param {string} string - String to escape
 * @returns {string} Escaped string
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Check if file is a CSS file
 * @param {string} filename - Filename
 * @returns {boolean} Whether it's a CSS file
 */
function isCSSFile(filename) {
  return /\.(css|scss|sass|less|styl|stylus)$/i.test(filename);
}

module.exports = {
  replaceColors,
  replaceColorsSimple,
  isCSSFile
}; 