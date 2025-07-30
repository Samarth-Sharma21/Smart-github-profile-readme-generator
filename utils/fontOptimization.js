/**
 * Font Optimization Utilities
 * 
 * This module provides utilities for optimizing font loading performance.
 */

/**
 * Generates the font-display CSS property with the specified strategy.
 * 
 * @param {string} strategy - The font-display strategy to use ('swap', 'optional', 'fallback', 'block', or 'auto')
 * @returns {string} - The CSS font-display property
 */
export function getFontDisplayProperty(strategy = 'swap') {
  const validStrategies = ['swap', 'optional', 'fallback', 'block', 'auto'];
  if (!validStrategies.includes(strategy)) {
    console.warn(`Invalid font-display strategy: ${strategy}. Using 'swap' instead.`);
    strategy = 'swap';
  }
  return `font-display: ${strategy};`;
}

/**
 * Generates a preload link for a font file.
 * 
 * @param {Object} options - Font preload options
 * @param {string} options.href - The URL of the font file
 * @param {string} options.type - The MIME type of the font file (e.g., 'font/woff2')
 * @param {string} options.crossOrigin - The crossorigin attribute value
 * @returns {string} - The HTML link tag for preloading the font
 */
export function generateFontPreloadLink({ href, type, crossOrigin = 'anonymous' }) {
  return `<link rel="preload" href="${href}" as="font" type="${type}" crossorigin="${crossOrigin}">`;
}

/**
 * Generates CSS for optimized font loading with system font fallbacks.
 * 
 * @param {Object} options - Font options
 * @param {string} options.fontFamily - The primary font family name
 * @param {string} options.fontDisplay - The font-display strategy
 * @returns {string} - The CSS for optimized font loading
 */
export function generateOptimizedFontCSS({ fontFamily, fontDisplay = 'swap' }) {
  // System font stacks by OS
  const systemFonts = {
    apple: '-apple-system, BlinkMacSystemFont',
    windows: '"Segoe UI"',
    android: 'Roboto',
    linux: '"Noto Sans"',
    fallback: 'sans-serif'
  };
  
  // Create a comprehensive system font fallback stack
  const systemFontStack = Object.values(systemFonts).join(', ');
  
  // Generate the CSS with the custom font first, followed by system fonts
  return `
    /* Optimized font loading CSS */
    body {
      font-family: ${fontFamily}, ${systemFontStack};
      ${getFontDisplayProperty(fontDisplay)}
    }
  `;
}

/**
 * Generates a font loading script that uses the Font Loading API.
 * 
 * @param {Object} options - Font loading options
 * @param {string} options.fontFamily - The font family name
 * @param {Array<string>} options.variants - The font variants to load (e.g., ['400', '700', '400italic'])
 * @returns {string} - The JavaScript code for loading fonts
 */
export function generateFontLoadingScript({ fontFamily, variants = ['400', '700'] }) {
  return `
    // Font Loading API script
    (function() {
      if ('fonts' in document) {
        // Load each font variant
        Promise.all([
          ${variants.map(variant => `
            document.fonts.load('${variant} 1em ${fontFamily}')
          `).join(',')}
        ])
        .then(() => {
          // Mark fonts as loaded in sessionStorage to avoid re-loading on subsequent page views
          sessionStorage.setItem('fontsLoaded', 'true');
          // Add a class to the document to indicate fonts are loaded
          document.documentElement.classList.add('fonts-loaded');
        })
        .catch(err => {
          console.error('Error loading fonts:', err);
        });
      }
    })();
  `;
}