/**
 * Image Optimization Utilities
 * 
 * This module provides utilities for optimizing image loading and processing.
 */

/**
 * Generates a srcset attribute for responsive images.
 * 
 * @param {string} baseUrl - The base URL of the image
 * @param {Array<number>} widths - Array of image widths to include in the srcset
 * @param {string} extension - The image file extension
 * @returns {string} - The srcset attribute value
 */
export function generateSrcSet(baseUrl, widths = [320, 640, 960, 1280, 1920], extension = 'webp') {
  // Remove file extension from baseUrl if present
  const basePath = baseUrl.replace(/\.[^/.]+$/, '');
  
  return widths
    .map(width => `${basePath}-${width}.${extension} ${width}w`)
    .join(', ');
}

/**
 * Generates sizes attribute for responsive images based on common breakpoints.
 * 
 * @param {Object} options - Size options
 * @param {string} options.mobile - Size for mobile devices (default: '100vw')
 * @param {string} options.tablet - Size for tablet devices (default: '100vw')
 * @param {string} options.desktop - Size for desktop devices (default: '100vw')
 * @returns {string} - The sizes attribute value
 */
export function generateSizes({ 
  mobile = '100vw', 
  tablet = '100vw', 
  desktop = '100vw' 
} = {}) {
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
}

/**
 * Calculates the aspect ratio for an image.
 * 
 * @param {number} width - The image width
 * @param {number} height - The image height
 * @returns {number} - The aspect ratio (width/height)
 */
export function calculateAspectRatio(width, height) {
  return width / height;
}

/**
 * Generates a CSS aspect ratio box for maintaining image proportions.
 * 
 * @param {number} width - The image width
 * @param {number} height - The image height
 * @returns {string} - CSS for maintaining aspect ratio
 */
export function generateAspectRatioCSS(width, height) {
  const ratio = calculateAspectRatio(width, height);
  return `
    position: relative;
    padding-top: ${(1 / ratio) * 100}%;
    overflow: hidden;
  `;
}

/**
 * Generates a low-quality image placeholder (LQIP) data URL.
 * This is a simplified version that returns a placeholder SVG.
 * In a real implementation, you would generate a true LQIP from the image.
 * 
 * @param {number} width - The image width
 * @param {number} height - The image height
 * @param {string} color - The background color of the placeholder
 * @returns {string} - Data URL for the placeholder image
 */
export function generatePlaceholder(width = 400, height = 300, color = '#f0f0f0') {
  // Create a simple SVG placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="${color}"/>
  </svg>`;
  
  // Convert to base64 data URL
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Determines if an image should be lazy loaded based on its position.
 * 
 * @param {number} position - The position of the image in the page (0 = first image)
 * @param {number} eagarLoadCount - Number of images to load eagerly (not lazy)
 * @returns {boolean} - Whether the image should be lazy loaded
 */
export function shouldLazyLoad(position, eagarLoadCount = 2) {
  return position >= eagarLoadCount;
}

/**
 * Generates the loading attribute value for an image.
 * 
 * @param {boolean} lazy - Whether to lazy load the image
 * @returns {string} - The loading attribute value ('lazy' or 'eager')
 */
export function getLoadingAttribute(lazy = true) {
  return lazy ? 'lazy' : 'eager';
}

/**
 * Generates the decoding attribute value for an image.
 * 
 * @param {boolean} async - Whether to decode the image asynchronously
 * @returns {string} - The decoding attribute value ('async' or 'sync')
 */
export function getDecodingAttribute(async = true) {
  return async ? 'async' : 'sync';
}