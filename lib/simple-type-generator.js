const fs = require('fs');
const path = require('path');
const { loadColorConfig, flattenColorConfig } = require('./config-loader');

/**
 * Simplified type generator
 * Only generates basic color name type definitions for intelligent hints
 */
class SimpleTypeGenerator {
  constructor(rootDir = process.cwd()) {
    this.rootDir = rootDir;
    this.outputPath = path.join(rootDir, 'colors.d.ts');
  }

  /**
   * Generate simple TypeScript type definitions
   */
  generateTypes() {
    try {
      const rawConfig = loadColorConfig(this.rootDir);
      const flatConfig = flattenColorConfig(rawConfig);

      if (Object.keys(flatConfig).length === 0) {
        return;
      }

      const typeContent = this.generateSimpleTypeDefinition(flatConfig);
      fs.writeFileSync(this.outputPath, typeContent, 'utf8');
      
    } catch (error) {
      console.warn(`[nextjs-color-replacer-plugin] Type generation failed: ${error.message}`);
    }
  }

  /**
   * Generate simple type definition content
   */
  generateSimpleTypeDefinition(flatConfig) {
    const colorNames = Object.keys(flatConfig);
    const colorNameUnion = colorNames.map(name => `'${name}'`).join(' | ');

    return `/**
 * 🎨 Color name type definitions
 * Auto-generated from colors.config.js
 * 
 * Usage:
 * - CSS-in-JS: backgroundColor: 'primary'
 * - MUI sx: sx={{ color: 'Gray/800' }}
 * - Inline styles: style={{ color: 'Blue/500' }}
 */

// All available color names
export type ColorName = ${colorNameUnion};

// Declare in global scope for string literal hints
declare global {
  namespace CSS {
    interface Properties {
      color?: ColorName | string;
      backgroundColor?: ColorName | string;
      borderColor?: ColorName | string;
    }
  }
}`;
  }
}

module.exports = SimpleTypeGenerator; 