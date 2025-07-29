const { replaceColors } = require('../lib/color-replacer');
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

// Test CSS
const testCSS = `
.header {
  background-color: Gray/800;
  color: Gray/50;
  border: 1px solid primary;
}

.button {
  background: Blue/500;
  color: secondary;
}

.alert {
  background: success;
  border-color: Blue/600;
}
`;

// Execute tests
console.log('=== Color Configuration Test ===');
console.log('Original configuration:', JSON.stringify(testColorConfig, null, 2));
console.log('\nFlattened configuration:', JSON.stringify(flattenedConfig, null, 2));

console.log('\n=== CSS Replacement Test ===');
console.log('Original CSS:');
console.log(testCSS);

console.log('\nReplaced CSS:');
const result = replaceColors(testCSS, flattenedConfig);
console.log(result);

console.log('\n=== Test Completed ===');
console.log('Number of colors replaced:', Object.keys(flattenedConfig).length);

// Verify replacement results
const expectedReplacements = [
  ['Gray/800', '#1F2937'],
  ['Gray/50', '#F9FAFB'],
  ['primary', '#3B82F6'],
  ['Blue/500', '#3B82F6'],
  ['secondary', '#6B7280'],
  ['success', '#22C55E'],
  ['Blue/600', '#2563EB']
];

console.log('\n=== Verify Replacement Results ===');
let allTestsPassed = true;

expectedReplacements.forEach(([colorName, expectedValue]) => {
  const wasReplaced = result.includes(expectedValue) && !result.includes(colorName);
  console.log(`${colorName} -> ${expectedValue}: ${wasReplaced ? '✅ PASSED' : '❌ FAILED'}`);
  if (!wasReplaced) {
    allTestsPassed = false;
  }
});

console.log(`\nOverall test result: ${allTestsPassed ? '✅ All tests passed' : '❌ Some tests failed'}`); 