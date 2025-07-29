// colors.config.js - Example color configuration file
// This file should be placed in the root directory of your Next.js project

module.exports = {
  // Gray series
  Gray: {
    50: '#F9FAFB',
    100: '#F3F4F6', 
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937', // Changed from #E0E0E0 to a more reasonable dark gray
    900: '#111827'
  },

  // Blue series  
  Blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A'
  },

  // Red series
  Red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D'
  },

  // Green series
  Green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D'
  },

  // Brand colors (flat structure example)
  primary: '#3B82F6',
  secondary: '#6B7280',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Special colors
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  'text-secondary': '#6B7280'
};

// Usage examples:
// In CSS, you can use them like this:
// .my-class {
//   color: Gray/800;           /* Will be replaced with #1F2937 */
//   background: Blue/500;       /* Will be replaced with #3B82F6 */
//   border-color: primary;      /* Will be replaced with #3B82F6 */
// } 