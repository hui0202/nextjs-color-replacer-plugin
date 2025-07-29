const { replaceJSColors } = require('../lib/js-color-replacer');
const { flattenColorConfig } = require('../lib/config-loader');

// Test color configuration
const testColorConfig = {
  Gray: {
    50: '#F9FAFB',
    800: '#1F2937',
    900: '#111827'
  },
  Blue: {
    500: '#3B82F6',
    600: '#2563EB'
  },
  primary: '#3B82F6',
  secondary: '#6B7280',
  success: '#22C55E'
};

// Flatten configuration
const flattenedConfig = flattenColorConfig(testColorConfig);

console.log('=== Extended Feature Test ===');
console.log('Color configuration:', JSON.stringify(flattenedConfig, null, 2));

// Test CSS-in-JS
console.log('\n=== CSS-in-JS Test ===');
const styledComponentsCode = `
import styled from 'styled-components';

const Button = styled.button\`
  background-color: primary;
  color: Gray/50;
  border: 1px solid Blue/500;
  
  &:hover {
    background-color: Blue/600;
  }
\`;

const Card = styled.div\`
  background: surface;
  color: text;
\`;
`;

console.log('Original code:');
console.log(styledComponentsCode);

console.log('\nAfter replacement:');
const styledResult = replaceJSColors(styledComponentsCode, flattenedConfig);
console.log(styledResult);

// Test object literals
console.log('\n=== Object Literal Test ===');
const objectLiteralCode = `
const styles = {
  button: {
    backgroundColor: 'primary',
    color: 'Gray/50',
    borderColor: 'Blue/500'
  },
  card: {
    background: 'secondary',
    textColor: 'text'
  }
};

const theme = {
  colors: {
    primary: 'primary',
    secondary: 'secondary'
  }
};
`;

console.log('Original code:');
console.log(objectLiteralCode);

console.log('\nAfter replacement:');
const objectResult = replaceJSColors(objectLiteralCode, flattenedConfig);
console.log(objectResult);

// Test MUI code
console.log('\n=== MUI Test ===');
const muiCode = `
import { Box, Button, Typography } from '@mui/material';

function MyComponent({ theme }) {
  return (
    <div>
      <Box 
        sx={{ 
          backgroundColor: 'primary',
          color: 'Gray/50',
          borderColor: 'Blue/500'
        }}
      >
        Content
      </Box>
      
      <Button 
        style={{
          backgroundColor: 'secondary',
          color: 'Gray/800'
        }}
      >
        Click me
      </Button>
      
      <Typography style={{ color: theme.palette.primary }}>
        Text with theme color
      </Typography>
    </div>
  );
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: 'primary'
    },
    secondary: {
      main: 'secondary'
    }
  }
});
`;

console.log('Original code:');
console.log(muiCode);

console.log('\nAfter replacement:');
const muiResult = replaceJSColors(muiCode, flattenedConfig);
console.log(muiResult);

// Test template strings
console.log('\n=== Template String Test ===');
const templateStringCode = `
const dynamicStyle = \`
  background-color: \${primary};
  color: \${Gray/50};
  border: 1px solid \${Blue/500};
\`;

const cssString = \`
  .header {
    background: primary;
    color: Gray/50;
  }
  
  .button {
    background: Blue/500;
    color: secondary;
  }
\`;
`;

console.log('Original code:');
console.log(templateStringCode);

console.log('\nAfter replacement:');
const templateResult = replaceJSColors(templateStringCode, flattenedConfig);
console.log(templateResult);

// Test inline styles
console.log('\n=== Inline Style Test ===');
const inlineStyleCode = `
function Component() {
  return (
    <div>
      <div style="background-color: primary; color: Gray/50;">
        HTML style attribute
      </div>
      
      <div style={{
        backgroundColor: 'secondary',
        color: 'Gray/800',
        borderColor: 'Blue/500'
      }}>
        React style prop
      </div>
    </div>
  );
}
`;

console.log('Original code:');
console.log(inlineStyleCode);

console.log('\nAfter replacement:');
const inlineResult = replaceJSColors(inlineStyleCode, flattenedConfig);
console.log(inlineResult);

// Verify replacement results
console.log('\n=== Verify Replacement Results ===');
const allResults = [styledResult, objectResult, muiResult, templateResult, inlineResult];
const expectedColors = Object.keys(flattenedConfig);
let totalReplacements = 0;

expectedColors.forEach(colorName => {
  const colorValue = flattenedConfig[colorName];
  let found = false;
  
  allResults.forEach(result => {
    // Correct verification logic: check if the result contains the color value
    if (result.includes(colorValue)) {
      found = true;
    }
  });
  
  if (found) {
    totalReplacements++;
  }
  
  console.log(`${colorName} -> ${colorValue}: ${found ? '✅ Replacement found' : '⚠️  Not found'}`);
});

console.log(`\nOverall test result: Processed ${totalReplacements} color replacements in total`);
console.log('Extended feature test completed!'); 