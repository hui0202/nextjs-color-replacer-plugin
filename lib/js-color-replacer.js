/**
 * JavaScript/TypeScript color replacement processor
 * Supports CSS-in-JS, inline styles, MUI and other scenarios
 */

/**
 * Replace color names in JavaScript code
 * @param {string} jsContent - JavaScript/TypeScript content
 * @param {Object} colorConfig - Color configuration mapping
 * @returns {string} Content after replacement
 */
function replaceJSColors(jsContent, colorConfig) {
  if (!jsContent || Object.keys(colorConfig).length === 0) {
    return jsContent;
  }

  let result = jsContent;
  let hasChanges = false;

  // Sort by key length, prioritize longer keys
  const sortedKeys = Object.keys(colorConfig).sort((a, b) => b.length - a.length);

  for (const colorName of sortedKeys) {
    const colorValue = colorConfig[colorName];
    const originalResult = result;

    // 1. Handle colors in CSS-in-JS (like styled-components)
    result = replaceCSSInJS(result, colorName, colorValue);

    // 2. Handle color properties in object literals
    result = replaceObjectLiterals(result, colorName, colorValue);

    // 3. Handle MUI themes and sx prop
    result = replaceMUIColors(result, colorName, colorValue);

    // 4. Handle colors in template strings
    result = replaceTemplateStrings(result, colorName, colorValue);

    // 5. Handle inline style strings
    result = replaceInlineStyleStrings(result, colorName, colorValue);

    if (result !== originalResult) {
      hasChanges = true;
      console.log(`[nextjs-color-replacer-plugin] JS color replacement: ${colorName} -> ${colorValue}`);
    }
  }

  return result;
}

/**
 * Replace colors in CSS-in-JS (like styled-components, emotion, etc.)
 * @param {string} content - Content
 * @param {string} colorName - Color name
 * @param {string} colorValue - Color value
 * @returns {string} Content after replacement
 */
function replaceCSSInJS(content, colorName, colorValue) {
  // Match CSS properties in template strings
  const cssInJSPatterns = [
    // styled-components: styled.div`color: primary;`
    new RegExp('(\\`[^`]*?)\\b' + escapeRegex(colorName) + '\\b([^`]*?\\`)', 'g'),
    // css`` template strings: css`color: primary;`
    new RegExp('(css\\`[^`]*?)\\b' + escapeRegex(colorName) + '\\b([^`]*?\\`)', 'g'),
  ];

  let result = content;
  cssInJSPatterns.forEach(pattern => {
    result = result.replace(pattern, `$1${colorValue}$2`);
  });

  return result;
}

/**
 * Replace color properties in object literals
 * @param {string} content - Content
 * @param {string} colorName - Color name
 * @param {string} colorValue - Color value
 * @returns {string} Content after replacement
 */
function replaceObjectLiterals(content, colorName, colorValue) {
  // Match color property values in objects
  const patterns = [
    // { color: 'primary' } or { color: "primary" }
    new RegExp(`(color\\s*:\\s*)['"]${escapeRegex(colorName)}['"]`, 'g'),
    // { backgroundColor: 'primary' }
    new RegExp(`(backgroundColor\\s*:\\s*)['"]${escapeRegex(colorName)}['"]`, 'g'),
    // { borderColor: 'primary' }
    new RegExp(`(borderColor\\s*:\\s*)['"]${escapeRegex(colorName)}['"]`, 'g'),
    // Generic CSS property matching
    new RegExp(`([a-zA-Z-]+Color\\s*:\\s*)['"]${escapeRegex(colorName)}['"]`, 'g'),
  ];

  let result = content;
  patterns.forEach(pattern => {
    result = result.replace(pattern, `$1'${colorValue}'`);
  });

  return result;
}

/**
 * Replace MUI-related color references
 * @param {string} content - Content
 * @param {string} colorName - Color name
 * @param {string} colorValue - Color value
 * @returns {string} Content after replacement
 */
function replaceMUIColors(content, colorName, colorValue) {
  const patterns = [
    // MUI sx prop: sx={{ color: 'primary' }}
    new RegExp(`(sx\\s*=\\s*\\{\\{[^}]*?color\\s*:\\s*)['"]${escapeRegex(colorName)}['"]`, 'g'),
    // MUI theme.palette: theme.palette.primary
    new RegExp(`(theme\\.palette\\.)${escapeRegex(colorName)}(?!\\w)`, 'g'),
    // MUI styled: styled(Button)(({ theme }) => ({ color: theme.palette.primary }))
    new RegExp(`(theme\\.palette\\.)${escapeRegex(colorName)}(?=\\s*[,})])`, 'g'),
    // Color definitions in createTheme
    new RegExp(`(palette\\s*:\\s*\\{[^}]*?)(['"]${escapeRegex(colorName)}['"]\\s*:\\s*)`, 'g'),
  ];

  let result = content;
  patterns.forEach((pattern, index) => {
    if (index === 1 || index === 2) {
      // Special handling for theme.palette cases
      result = result.replace(pattern, `$1${colorValue.replace('#', '')}`);
    } else {
      result = result.replace(pattern, `$1'${colorValue}'`);
    }
  });

  return result;
}

/**
 * Replace color references in template strings
 * @param {string} content - Content
 * @param {string} colorName - Color name
 * @param {string} colorValue - Color value
 * @returns {string} Content after replacement
 */
function replaceTemplateStrings(content, colorName, colorValue) {
  // Match ${colorName} format in template strings
  const patterns = [
    new RegExp('\\$\\{\\s*' + escapeRegex(colorName) + '\\s*\\}', 'g'),
    // Direct color names in template strings
    new RegExp('(\\`[^`]*?)\\b' + escapeRegex(colorName) + '\\b([^`]*?\\`)', 'g'),
  ];

  let result = content;
  patterns.forEach((pattern, index) => {
    if (index === 0) {
      result = result.replace(pattern, colorValue);
    } else {
      result = result.replace(pattern, `$1${colorValue}$2`);
    }
  });

  return result;
}

/**
 * Replace colors in inline style strings
 * @param {string} content - Content
 * @param {string} colorName - Color name
 * @param {string} colorValue - Color value
 * @returns {string} Content after replacement
 */
function replaceInlineStyleStrings(content, colorName, colorValue) {
  // Match style attribute strings
  const patterns = [
    // style="color: primary;"
    new RegExp(`(style\\s*=\\s*['"][^'"]*?)\\b${escapeRegex(colorName)}\\b([^'"]*?['"])`, 'g'),
    // React style prop: style={{color: 'primary'}}
    new RegExp(`(style\\s*=\\s*\\{\\{[^}]*?)['"]${escapeRegex(colorName)}['"]([^}]*?\\}\\})`, 'g'),
  ];

  let result = content;
  patterns.forEach(pattern => {
    result = result.replace(pattern, `$1${colorValue}$2`);
  });

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
 * Check if file is a JavaScript/TypeScript file
 * @param {string} filename - Filename
 * @returns {boolean} Whether it's a JS/TS file
 */
function isJSFile(filename) {
  return /\.(js|jsx|ts|tsx)$/i.test(filename);
}

/**
 * Check if file is an HTML file
 * @param {string} filename - Filename
 * @returns {boolean} Whether it's an HTML file
 */
function isHTMLFile(filename) {
  return /\.(html|htm)$/i.test(filename);
}

module.exports = {
  replaceJSColors,
  isJSFile,
  isHTMLFile,
  replaceCSSInJS,
  replaceObjectLiterals,
  replaceMUIColors,
  replaceTemplateStrings,
  replaceInlineStyleStrings
}; 