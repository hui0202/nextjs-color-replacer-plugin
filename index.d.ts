import { NextConfig } from 'next';

/**
 * Color configuration interface - supports nested and flat structures
 */
export interface ColorConfig {
  [key: string]: string | ColorConfig;
}

/**
 * Plugin options interface
 */
export interface PluginOptions {
  /**
   * Root directory path for configuration file
   * @default process.cwd()
   */
  rootDir?: string;
  
  /**
   * Whether to enable verbose logging
   * @default false
   */
  verbose?: boolean;
  
  /**
   * Custom color configuration (higher priority than config file)
   */
  colorConfig?: ColorConfig;
  
  /**
   * Whether to generate simple TypeScript type definitions (in development mode)
   * @default false
   */
  generateTypes?: boolean;
}

/**
 * Next.js color replacement plugin
 * 
 * @param nextConfig - Next.js configuration object
 * @param pluginOptions - Plugin options
 * @returns Modified Next.js configuration
 * 
 * @example
 * ```typescript
 * // next.config.js
 * const withColorReplacer = require('nextjs-color-replacer-plugin');
 * 
 * module.exports = withColorReplacer({
 *   reactStrictMode: true,
 * }, {
 *   rootDir: process.cwd(),
 *   verbose: true
 * });
 * ```
 */
declare function withColorReplacer(
  nextConfig?: NextConfig,
  pluginOptions?: PluginOptions
): NextConfig;

export default withColorReplacer; 