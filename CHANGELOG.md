# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-29

### Added
- 🎉 Initial release of nextjs-color-replacer-plugin
- ✅ CSS color name replacement functionality
- ✅ Support for nested and flat color configuration structures (`Gray/800`, `primary`)
- ✅ Smart CSS AST parsing and string replacement fallback mechanism
- ✅ Support for multiple CSS preprocessors (CSS, SCSS, Sass, Less, Stylus)
- ✅ CSS-in-JS support (styled-components, emotion)
- ✅ MUI/Material-UI framework specific support (sx prop, theme system)
- ✅ Inline style processing (HTML `style` attribute, React `style` prop)
- ✅ JavaScript/TypeScript file color replacement
- ✅ Template string and object literal support
- ✅ Development mode configuration file hot reload
- ✅ TypeScript type definitions
- ✅ Complete test coverage

### Features
- **Compile-time processing**: Zero runtime performance impact
- **Multi-file type support**: CSS, JS, TS, JSX, TSX, HTML
- **Multiple use cases**: Regular CSS, CSS-in-JS, MUI, inline styles
- **Error tolerance**: Graceful fallback when configuration file is missing or parse errors occur
- **Detailed logging**: Display replacement details during build

### Documentation
- ✅ Complete README documentation
- ✅ Usage examples and best practices
- ✅ API documentation and TypeScript types
- ✅ Troubleshooting guide

## [Unreleased]

### Planned
- [ ] CSS variable support
- [ ] More CSS-in-JS library support (styled-jsx, linaria)
- [ ] VS Code extension integration
- [ ] Configuration file validation and error message optimization 