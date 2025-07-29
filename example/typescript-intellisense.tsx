/**
 * TypeScript IntelliSense Example
 * 
 * This file demonstrates how to use auto-generated type definitions to get intelligent hints for color names.
 * 
 * 🚀 Usage Steps:
 * 1. Run `npm run generate-types` to generate type definitions
 * 2. View this file in VS Code to experience intelligent hints
 * 3. Enjoy auto-completion when typing color names in your code!
 */

import React from 'react';

// ============ Basic Inline Style Examples (with IntelliSense support) ============

function BasicExample() {
  // React style prop example - you'll get intelligent hints for color names here
  const cardStyle = {
    // Type backgroundColor: ' then press Ctrl+Space to see intelligent hints
    backgroundColor: '#F9FAFB', // If type generation is correct, this should suggest 'surface' and other color names
    color: '#111827',           // This should suggest 'text' and other color names
    border: '1px solid #E5E7EB', // This should suggest 'Gray/200' and other color names
    padding: '16px',
    borderRadius: '8px',
    margin: '8px 0'
  };

  const buttonStyle = {
    backgroundColor: '#3B82F6',  // This should suggest 'primary' and other color names
    color: '#F9FAFB',           // This should suggest 'Gray/50' and other color names
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '8px 0'
  };

  return (
    <div>
      <h2>🎨 Basic Inline Style Examples</h2>
      <p>After generating type definitions, you'll get intelligent hints when editing styles above!</p>
      
      <div style={cardStyle}>
        This is a card style created using intelligent hints
      </div>

      <button style={buttonStyle}>
        Button using intelligent hints
      </button>

      {/* Direct inline style example */}
      <div
        style={{
          backgroundColor: '#F3F4F6', // Should suggest 'Gray/100'
          color: '#1F2937',           // Should suggest 'Gray/800'
          padding: '8px 12px',
          borderRadius: '4px',
          margin: '8px 0'
        }}
      >
        Direct inline styles also support intelligent hints
      </div>
    </div>
  );
}

// ============ CSS-in-JS Example Instructions (in comment form) ============

function CSSInJSExamples() {
  return (
    <div>
      <h2>📝 CSS-in-JS Example Instructions</h2>
      <p>After installing related dependencies, the following code will support intelligent hints:</p>
      
      <pre style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
{`// styled-components example
import styled from 'styled-components';

const StyledButton = styled.button\`
  background-color: primary;        // ← Intelligent hints
  color: Gray/50;                  // ← Intelligent hints
  border: 1px solid Blue/500;      // ← Intelligent hints
  
  &:hover {
    background-color: Blue/600;    // ← Intelligent hints
  }
\`;

// MUI example
import { Box } from '@mui/material';

<Box
  sx={{
    backgroundColor: 'primary',     // ← Intelligent hints and type checking
    color: 'Gray/50',              // ← Intelligent hints and type checking
    borderColor: 'Blue/500',       // ← Intelligent hints and type checking
  }}
>
  Content
</Box>`}
      </pre>
    </div>
  );
}

// ============ Type Safety Examples ============

// This interface shows how to add type safety for color properties in your components
interface ColorfulComponentProps {
  // If type generation is correct, this should be limited to valid color names
  backgroundColor?: string; // In actual projects, this would be ColorName type
  textColor?: string;       // Similarly, this would be ColorName type
  borderColor?: string;     // Similarly, this would be ColorName type
}

function ColorfulComponent({ backgroundColor, textColor, borderColor }: ColorfulComponentProps) {
  return (
    <div
      style={{
        backgroundColor: backgroundColor || '#FFFFFF',
        color: textColor || '#000000',
        border: `1px solid ${borderColor || '#CCCCCC'}`,
        padding: '16px',
        borderRadius: '8px',
        margin: '8px 0'
      }}
    >
      This is a type-safe color component
    </div>
  );
}

// ============ Utility Functions Usage Examples ============

function UtilityFunctionsExample() {
  return (
    <div>
      <h2>🔧 Utility Functions Usage Examples</h2>
      <p>Generated utility functions can be used like this:</p>
      
      <pre style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
{`// Import generated utility functions
import { 
  colorMap, 
  validateColorName, 
  getColorValue,
  searchColors,
  getColorGroups 
} from '../types/color-utils';

// Validate color names
const isValid = validateColorName('primary'); // true
const isInvalid = validateColorName('invalid'); // false

// Get color values
const primaryColor = getColorValue('primary'); // '#3B82F6'

// Search colors
const grayColors = searchColors('Gray'); // All colors containing 'Gray'

// Get color groups
const groups = getColorGroups(); // Colors grouped by prefix
console.log(groups.Gray); // All colors starting with Gray`}
      </pre>
    </div>
  );
}

// ============ Main Component ============

export default function TypeScriptIntelliSenseDemo() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>🎨 TypeScript IntelliSense Demo</h1>
      
      <div style={{ backgroundColor: '#f0f9ff', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>📋 How to Experience IntelliSense:</h3>
        <ol>
          <li>Run <code>npm run generate-types</code> to generate type definitions</li>
          <li>Edit color-related code in VS Code</li>
          <li>Press <code>Ctrl+Space</code> when typing color properties to see auto-completion</li>
          <li>Enjoy type safety and intelligent hints!</li>
        </ol>
      </div>

      <BasicExample />
      <CSSInJSExamples />
      
      <div>
        <h2>🛡️ Type-Safe Component Examples</h2>
        <ColorfulComponent 
          backgroundColor="#3B82F6"  // In actual projects, this would have 'primary' intelligent hints
          textColor="#F9FAFB"       // In actual projects, this would have 'Gray/50' intelligent hints
          borderColor="#2563EB"     // In actual projects, this would have 'Blue/600' intelligent hints
        />
      </div>

      <UtilityFunctionsExample />

      <div style={{ backgroundColor: '#fef3c7', padding: '16px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>💡 Tips:</h3>
        <ul>
          <li>Type definitions are automatically generated based on your <code>colors.config.js</code></li>
          <li>Re-run <code>npm run generate-types</code> after modifying the configuration file</li>
          <li>Use <code>npm run generate-types:watch</code> to automatically monitor configuration changes</li>
          <li>In TypeScript projects, invalid color names will produce compilation errors</li>
        </ul>
      </div>
    </div>
  );
}

/*
🎯 IntelliSense Feature Description:

1. 🔧 Auto-generated Type Definitions
   - ColorName: Union type of all available color names
   - ColorValue: Union type of all color values  
   - ColorMap: Interface mapping color names to values

2. 💡 IntelliSense Supported Scenarios
   - React inline styles (style prop)
   - styled-components template strings
   - MUI sx prop object properties
   - Any place using color strings

3. 🚀 Advanced Features
   - Type safety: Prevent using non-existent color names
   - Auto-completion: Get color suggestions in the editor
   - Color preview: Display color previews with VS Code extensions
   - Utility functions: Runtime validation and color operations

4. 🔄 Stay in Sync
   - Automatically regenerate types when configuration files change
   - Support hot reload and watch mode
   - Integrate into build process

5. 🎨 Best Practices
   - Use semantic color naming
   - Organize colors by function or color family
   - Regularly review and update color configuration
*/ 