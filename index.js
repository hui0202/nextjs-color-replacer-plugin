const path = require('path');
const { loadColorConfig, flattenColorConfig } = require('./lib/config-loader');
const SimpleTypeGenerator = require('./lib/simple-type-generator');

/**
 * Next.js color replacement plugin
 * @param {Object} nextConfig - Next.js configuration object
 * @param {Object} pluginOptions - Plugin options
 * @returns {Object} Modified Next.js configuration
 */
function withColorReplacer(nextConfig = {}, pluginOptions = {}) {
  return {
    ...nextConfig,
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
      // Get project root directory
      const rootDir = pluginOptions.rootDir || process.cwd();
      
      // Load color configuration
      const rawColorConfig = loadColorConfig(rootDir);
      const colorConfig = flattenColorConfig(rawColorConfig);
      
      // If no color configuration found, skip processing
      if (Object.keys(colorConfig).length === 0) {
        console.warn('[nextjs-color-replacer-plugin] No valid color configuration found, skipping processing');
        return typeof nextConfig.webpack === 'function' 
          ? nextConfig.webpack(config, { buildId, dev, isServer, defaultLoaders, webpack })
          : config;
      }

      // Optional: Generate simple color type definitions (only in dev mode when explicitly enabled)
      if (dev && pluginOptions.generateTypes === true) {
        try {
          const simpleTypeGenerator = new SimpleTypeGenerator(rootDir);
          simpleTypeGenerator.generateTypes();
          console.log('[nextjs-color-replacer-plugin] 💡 Simple type definitions generated: colors.d.ts');
        } catch (error) {
          console.warn('[nextjs-color-replacer-plugin] Type generation failed, does not affect main functionality:', error.message);
        }
      }

      // Get color replacement loader paths
      const colorReplacerLoaderPath = path.resolve(__dirname, 'lib/color-replacer-loader.js');
      const jsColorReplacerLoaderPath = path.resolve(__dirname, 'lib/js-color-replacer-loader.js');

      // Modify webpack configuration, add CSS color replacement loader
      config.module.rules.push({
        test: /\.(css|scss|sass|less|styl|stylus)$/,
        use: [
          {
            loader: colorReplacerLoaderPath,
            options: {
              colorConfig,
              rootDir
            }
          }
        ]
      });

      // Add JavaScript/TypeScript color replacement loader
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: jsColorReplacerLoaderPath,
            options: {
              colorConfig,
              rootDir
            }
          }
        ]
      });

      // Add HTML file color replacement loader
      config.module.rules.push({
        test: /\.(html|htm)$/,
        use: [
          {
            loader: jsColorReplacerLoaderPath,
            options: {
              colorConfig,
              rootDir
            }
          }
        ]
      });

      // In development mode, watch for configuration file changes
      if (dev) {
        const configPath = path.join(rootDir, 'colors.config.js');
        if (config.watchOptions) {
          config.watchOptions.ignored = config.watchOptions.ignored || [];
          // Ensure configuration file is not ignored
          if (Array.isArray(config.watchOptions.ignored)) {
            config.watchOptions.ignored = config.watchOptions.ignored.filter(
              pattern => !configPath.includes(pattern)
            );
          }
        }
      }

      console.log(`[nextjs-color-replacer-plugin] Plugin activated, loaded ${Object.keys(colorConfig).length} color definitions`);

      // Call original webpack configuration function (if exists)
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, { buildId, dev, isServer, defaultLoaders, webpack });
      }

      return config;
    }
  };
}

// Export plugin function
module.exports = withColorReplacer; 