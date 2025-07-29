# Installation & Usage Guide

This guide will help you quickly install and use `nextjs-color-replacer-plugin`.

## 📦 Installation Methods

### NPM (Recommended)

```bash
npm install nextjs-color-replacer-plugin
```

### Yarn

```bash
yarn add nextjs-color-replacer-plugin
```

### PNPM

```bash
pnpm add nextjs-color-replacer-plugin
```

### Local Installation (Development Testing)

If you want to test the local development version:

```bash
# Download source code
git clone https://github.com/yourusername/nextjs-color-replacer-plugin.git
cd nextjs-color-replacer-plugin

# Install dependencies
npm install

# Create local package
npm run pack:local

# Install in your project
cd /path/to/your/nextjs-project
npm install /path/to/nextjs-color-replacer-plugin-1.0.0.tgz
```

## 🚀 Quick Setup

### 1. Configure Next.js

In your `next.config.js` file:

```javascript
// next.config.js
const withColorReplacer = require('nextjs-color-replacer-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // ... your other configurations
};

// Wrap configuration with plugin
module.exports = withColorReplacer(nextConfig);
```

### 2. Create Color Configuration File

Create `colors.config.js` in your project root:

```javascript
// colors.config.js
module.exports = {
  // Nested structure
  Gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  },
  
  Blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8'
  },
  
  // Flat structure
  primary: '#3B82F6',
  secondary: '#6B7280',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B'
};
```

### 3. Use in Your Code

Now you can use color names in various files:

#### CSS Files

```css
/* styles/globals.css */
.header {
  background-color: Gray/800;
  color: Gray/50;
}

.button {
  background: primary;
  border: 1px solid Blue/500;
}
```

#### CSS-in-JS (styled-components)

```javascript
// components/Button.js
import styled from 'styled-components';

const Button = styled.button`
  background-color: primary;
  color: Gray/50;
  border: 1px solid Blue/500;
  
  &:hover {
    background-color: Blue/600;
  }
`;
```

#### MUI/Material-UI

```jsx
// components/MyComponent.jsx
import { Box, Button } from '@mui/material';

function MyComponent() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary',
        color: 'Gray/50',
        padding: 2
      }}
    >
      <Button
        sx={{
          backgroundColor: 'secondary',
          '&:hover': {
            backgroundColor: 'Gray/600'
          }
        }}
      >
        Click me
      </Button>
    </Box>
  );
}
```

#### React Inline Styles

```jsx
// components/Card.jsx
function Card() {
  return (
    <div
      style={{
        backgroundColor: 'surface',
        color: 'text',
        border: '1px solid Gray/200'
      }}
    >
      Card content
    </div>
  );
}
```

## ⚙️ Advanced Configuration

### Plugin Options

```javascript
// next.config.js
const withColorReplacer = require('nextjs-color-replacer-plugin');

module.exports = withColorReplacer({
  // Next.js configuration
  reactStrictMode: true,
}, {
  // Plugin options
  rootDir: process.cwd(),          // Configuration file search path
  verbose: false,                  // Whether to show detailed logs
  colorConfig: {                   // Directly provide color configuration (higher priority)
    brand: '#FF6B6B'
  }
});
```

### TypeScript Support

The plugin includes complete TypeScript type definitions:

```typescript
// next.config.ts
import withColorReplacer from 'nextjs-color-replacer-plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withColorReplacer(nextConfig, {
  rootDir: process.cwd(),
  verbose: true
});
```

## 🧪 Verify Installation

### 1. Check if Plugin is Working

Start the development server:

```bash
npm run dev
```

Look for plugin logs in the console:
```
[nextjs-color-replacer-plugin] Successfully loaded color configuration with X color definitions
[nextjs-color-replacer-plugin] Plugin activated, loaded X color definitions
```

### 2. Test Color Replacement

Create a test file:

```css
/* test.css */
.test {
  color: primary;
  background: Gray/800;
}
```

Check if the compiled output contains actual color values instead of names.

### 3. Check All File Types

Test different file types to ensure they all work properly:
- ✅ CSS files (`.css`, `.scss`, `.sass`, `.less`)
- ✅ JavaScript files (`.js`, `.jsx`)
- ✅ TypeScript files (`.ts`, `.tsx`)
- ✅ HTML files (`.html`)

## 🔧 Troubleshooting

### Common Issues

1. **Colors are not being replaced**
   - Check if `colors.config.js` is in the project root directory
   - Confirm color names are spelled correctly (case-sensitive)
   - Check console for error logs

2. **Build fails**
   - Ensure Next.js version >= 12.0.0
   - Check Node.js version >= 14.0.0
   - Try clearing `.next` directory and rebuilding

3. **TypeScript errors**
   - Make sure `@types/node` is installed
   - Restart TypeScript server

### Debug Mode

Enable verbose logging:

```javascript
module.exports = withColorReplacer(nextConfig, {
  verbose: true  // Show detailed replacement information
});
```

## 📚 More Resources

- 📖 [Complete Documentation](README.md)
- 🐛 [Issue Reporting](https://github.com/yourusername/nextjs-color-replacer-plugin/issues)
- 💡 [Feature Suggestions](https://github.com/yourusername/nextjs-color-replacer-plugin/discussions)
- 🤝 [Contributing Guide](CONTRIBUTING.md)

---

You have now successfully installed and configured the plugin! 🎉 