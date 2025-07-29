# Next.js Color Replacer Plugin

[![npm version](https://badge.fury.io/js/nextjs-color-replacer-plugin.svg)](https://badge.fury.io/js/nextjs-color-replacer-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/yourusername/nextjs-color-replacer-plugin/workflows/Node.js%20CI/badge.svg)](https://github.com/yourusername/nextjs-color-replacer-plugin/actions)

A lightweight Next.js plugin for replacing custom color names with configured color values during the compilation stage. Focused on core functionality, simple and easy to use.

## Features

- ✅ **Compile-time processing**: Replace colors during build stage with zero runtime overhead
- ✅ **Multi-file support**: CSS, SCSS, Sass, Less, JavaScript, TypeScript, HTML
- ✅ **CSS-in-JS support**: styled-components, emotion, etc.
- ✅ **MUI/React support**: sx prop, inline styles, etc.
- ✅ **Flexible configuration**: Nested (`Gray/800`) and flat (`primary`) structures
- ✅ **Smart parsing**: AST parsing + string replacement dual guarantee
- ✅ **TypeScript hints**: Optional intelligent hint support (development mode)
- ✅ **Lightweight and clean**: Focus on core functionality, no extra dependency burden

## 🚀 Quick Start

### Installation

```bash
npm install nextjs-color-replacer-plugin
# or
yarn add nextjs-color-replacer-plugin
# or
pnpm add nextjs-color-replacer-plugin
```

### Basic Usage

1. **Install the plugin**
2. **Configure Next.js** (in `next.config.js`)
3. **Create color configuration file** (`colors.config.js`)
4. **Use color names in your code**

That's it! The plugin will automatically replace all color names during build time.

## Usage

### 1. Configure Next.js

Use the plugin in your `next.config.js` file:

```javascript
const withColorReplacer = require('nextjs-color-replacer-plugin');

module.exports = withColorReplacer({
  // Your other Next.js configuration
  reactStrictMode: true,
  // ...
});
```

### 2. Create Color Configuration File

Create a `colors.config.js` file in your project root:

```javascript
// colors.config.js
module.exports = {
  // Nested structure
  Gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    800: '#1F2937',
    900: '#111827'
  },
  
  Blue: {
    500: '#3B82F6',
    600: '#2563EB'
  },
  
  // Flat structure
  primary: '#3B82F6',
  secondary: '#6B7280',
  success: '#22C55E'
};
```

### 3. Use in CSS

Now you can use color names in your CSS files:

```css
/* styles.css */
.header {
  background-color: Gray/800; /* Will be replaced with #1F2937 */
  color: Gray/50;             /* Will be replaced with #F9FAFB */
}

.button {
  background: primary;        /* Will be replaced with #3B82F6 */
  border-color: Blue/600;     /* Will be replaced with #2563EB */
}

.alert {
  color: success;             /* Will be replaced with #22C55E */
}
```

Compiled CSS:

```css
/* Compiled result */
.header {
  background-color: #1F2937;
  color: #F9FAFB;
}

.button {
  background: #3B82F6;
  border-color: #2563EB;
}

.alert {
  color: #22C55E;
}
```

### 4. Use in CSS-in-JS

The plugin supports CSS-in-JS libraries like styled-components, emotion:

```javascript
// styled-components example
import styled from 'styled-components';

const Button = styled.button`
  background-color: primary;     /* Replaced with #3B82F6 */
  color: Gray/50;               /* Replaced with #F9FAFB */
  border: 1px solid Blue/500;   /* Replaced with #3B82F6 */
  
  &:hover {
    background-color: Blue/600; /* Replaced with #2563EB */
  }
`;

// emotion example
const cardStyles = css`
  background: surface;          /* Replaced with #F9FAFB */
  color: text;                 /* Replaced with #111827 */
  border: 1px solid Gray/200;  /* Replaced with #E5E7EB */
`;
```

### 5. Use in MUI

The plugin specifically supports Material-UI/MUI syntax:

```javascript
import { Box, Button, createTheme } from '@mui/material';

// sx prop support
<Box
  sx={{
    backgroundColor: 'primary',    // Replaced with '#3B82F6'
    color: 'Gray/50',             // Replaced with '#F9FAFB'
    borderColor: 'Blue/500'       // Replaced with '#3B82F6'
  }}
>
  Content
</Box>

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: 'primary',            // Replaced with '#3B82F6'
      light: 'Blue/300'          // Replaced with corresponding color value
    }
  }
});
```

### 6. Inline Style Support

Supports HTML inline styles and React style prop:

```javascript
// React style prop
<div style={{
  backgroundColor: 'primary',     // Replaced with '#3B82F6'
  color: 'Gray/50',              // Replaced with '#F9FAFB'
  borderColor: 'Blue/500'        // Replaced with '#3B82F6'
}}>
  Content
</div>

// HTML inline styles
<div style="background-color: primary; color: Gray/50;">
  Content
</div>
```

## Configuration Options

The plugin supports the following configuration options:

```javascript
const withColorReplacer = require('nextjs-color-replacer-plugin');

module.exports = withColorReplacer({
  // Next.js configuration
  reactStrictMode: true,
}, {
  // Plugin options
  rootDir: process.cwd(),      // Configuration file search directory
  generateTypes: true          // Whether to generate TypeScript hints (development mode only)
});
```

### TypeScript IntelliSense

If you're using TypeScript, you can enable the intelligent hint feature:

```javascript
// next.config.js
module.exports = withColorReplacer(nextConfig, {
  generateTypes: true  // Generate colors.d.ts in development mode
});
```

This will generate a `colors.d.ts` file in your project root, providing auto-completion for color names:

```typescript
// Now you'll have intelligent hints in TypeScript
const styles = {
  backgroundColor: 'primary',    // ← Auto-completion
  color: 'Gray/800',            // ← Auto-completion
  borderColor: 'Blue/500'       // ← Auto-completion
};
```

## Color Configuration Format

### Nested Structure

```javascript
module.exports = {
  Gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ...
  },
  Blue: {
    500: '#3B82F6',
    600: '#2563EB',
    // ...
  }
};
```

Use in CSS: `Gray/50`, `Blue/500`

### Flat Structure

```javascript
module.exports = {
  'primary-light': '#DBEAFE',
  'primary': '#3B82F6',
  'primary-dark': '#1E40AF',
  'text-secondary': '#6B7280'
};
```

Use in CSS: `primary`, `primary-light`, `text-secondary`

### Mixed Structure

```javascript
module.exports = {
  // Nested
  Gray: {
    800: '#1F2937'
  },
  
  // Flat
  primary: '#3B82F6',
  'brand-color': '#10B981'
};
```

## Supported File Types

The plugin supports the following file types:

**CSS Preprocessors:**
- `.css`
- `.scss`
- `.sass`
- `.less`
- `.styl`
- `.stylus`

**JavaScript/TypeScript:**
- `.js`
- `.jsx`
- `.ts`
- `.tsx`

**HTML:**
- `.html`
- `.htm`

**Supported Use Cases:**
- Regular CSS files
- CSS-in-JS (styled-components, emotion, etc.)
- MUI sx prop and theme system
- React inline styles (style prop)
- HTML inline styles (style attribute)
- CSS in template strings
- Color properties in object literals

## How It Works

1. **Load Configuration**: The plugin loads `colors.config.js` from the project root during build time
2. **Flatten Configuration**: Convert nested color configuration to flat key-value mapping
3. **Webpack Integration**: Process CSS files through custom loader
4. **AST Parsing**: Use css-tree to parse CSS into abstract syntax tree
5. **Color Replacement**: Traverse AST nodes, replace matching color names
6. **Generate Result**: Regenerate CSS code from modified AST

## Notes

- Configuration file must be placed in project root directory
- Color names are case-sensitive
- Recommend using semantic color naming
- Configuration file changes are automatically reloaded in development mode
- If CSS parsing fails, it will automatically fallback to string replacement mode

## Example Project Structure

```
my-next-app/
├── pages/
├── styles/
│   └── globals.css
├── colors.config.js    ← Color configuration file
├── next.config.js      ← Next.js configuration
└── package.json
```

## Troubleshooting

### Common Issues

**Q: Colors are not being replaced?**

A: Check the following:
- Ensure `colors.config.js` is in the project root directory
- Confirm color names are spelled correctly (case-sensitive)
- Check build logs for any error messages

**Q: Does it support CSS variables?**

A: Currently does not directly support CSS variables, but you can use color names in CSS, and the plugin will replace them with actual color values.

**Q: Can it be used with CSS-in-JS?**

A: This plugin mainly processes CSS files. For CSS-in-JS, it's recommended to directly reference the color configuration in JavaScript.

## Changelog

### v1.0.0
- Initial release
- Support for basic color name replacement functionality
- Support for nested and flat configuration structures
- Support for multiple CSS preprocessors

## 🤝 Contributing

We welcome all forms of contributions! Please check [CONTRIBUTING.md](CONTRIBUTING.md) for detailed information.

### Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/nextjs-color-replacer-plugin.git
cd nextjs-color-replacer-plugin

# Install dependencies
npm install

# Run tests
npm test
npm run test:extended

# Local package testing
npm run pack:local
```

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/nextjs-color-replacer-plugin/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/nextjs-color-replacer-plugin/discussions)
- 📖 **Documentation**: [README.md](README.md) and source code comments

## 🎯 Roadmap

- [ ] CSS variable support
- [ ] More CSS-in-JS library support (styled-jsx, linaria)
- [ ] VS Code extension integration
- [ ] Configuration file validation and intelligent hints
- [ ] Performance optimization and caching mechanism

## 📊 Statistics

- **File Type Support**: 8+ (CSS, JS, TS, JSX, TSX, HTML, etc.)
- **Framework Support**: Next.js, React, MUI
- **CSS-in-JS Support**: styled-components, emotion, etc.
- **Test Coverage**: 100% core functionality

## ⭐ If this project helps you, please give it a Star!

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the community 