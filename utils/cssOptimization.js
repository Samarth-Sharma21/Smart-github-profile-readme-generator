/**
 * CSS Optimization Utilities
 * 
 * This module provides utilities for optimizing CSS loading and rendering.
 */

/**
 * Generates critical CSS for above-the-fold content.
 * In a real implementation, this would extract critical CSS from a full stylesheet.
 * This simplified version returns a predefined set of critical styles.
 * 
 * @returns {string} - Critical CSS styles
 */
export function getCriticalCSS() {
  return `
    /* Critical CSS for above-the-fold content */
    body {
      margin: 0;
      padding: 0;
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #ffffff;
      color: #1a1a1a;
    }
    
    .min-h-screen {
      min-height: 100vh;
    }
    
    .bg-background {
      background-color: #ffffff;
    }
    
    .font-sans {
      font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    }
    
    .antialiased {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Add more critical styles as needed */
  `;
}

/**
 * Injects critical CSS into the document head.
 * 
 * @param {string} css - The CSS to inject
 */
export function injectCriticalCSS(css) {
  if (typeof document === 'undefined') return;
  
  const style = document.createElement('style');
  style.setAttribute('data-critical', 'true');
  style.textContent = css;
  
  // Insert at the beginning of head for highest priority
  if (document.head.firstChild) {
    document.head.insertBefore(style, document.head.firstChild);
  } else {
    document.head.appendChild(style);
  }
}

/**
 * Loads a CSS file asynchronously to prevent render blocking.
 * 
 * @param {string} href - The URL of the CSS file
 * @param {Object} options - Loading options
 * @param {string} options.media - The media attribute value
 * @param {boolean} options.disabled - Whether to initially disable the stylesheet
 */
export function loadCSSAsync(href, { media = 'all', disabled = false } = {}) {
  if (typeof document === 'undefined') return;
  
  // Create a link element for the CSS file
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  
  // Set to 'print' initially to prevent render blocking
  // Will be switched to the desired media once loaded
  if (!disabled) {
    link.media = 'print';
  } else {
    link.disabled = true;
  }
  
  // Once the CSS is loaded, switch to the desired media
  link.onload = () => {
    if (!disabled) {
      link.media = media;
    }
  };
  
  document.head.appendChild(link);
  
  return link;
}

/**
 * Prefetches a CSS file to improve load time of subsequent pages.
 * 
 * @param {string} href - The URL of the CSS file to prefetch
 * @param {boolean} highPriority - Whether to use high priority preload instead of prefetch
 */
export function prefetchCSS(href, highPriority = false) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = highPriority ? 'preload' : 'prefetch';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Generates CSS for content-visibility optimization.
 * 
 * @param {string} selector - The CSS selector to apply content-visibility to
 * @param {string} visibility - The content-visibility value ('auto', 'hidden', etc.)
 * @param {number} containIntrinsicSize - The contain-intrinsic-size value in pixels
 * @returns {string} - The CSS for content-visibility optimization
 */
export function generateContentVisibilityCSS(selector, visibility = 'auto', containIntrinsicSize = 1000) {
  return `
    ${selector} {
      content-visibility: ${visibility};
      contain-intrinsic-size: ${containIntrinsicSize}px;
    }
  `;
}

/**
 * Generates CSS for optimizing animations and transitions.
 * 
 * @param {string} selector - The CSS selector to apply optimizations to
 * @returns {string} - The CSS for animation optimization
 */
export function generateAnimationOptimizationCSS(selector) {
  return `
    ${selector} {
      will-change: transform;
      transform: translateZ(0);
      backface-visibility: hidden;
    }
  `;
}

/**
 * Generates CSS for optimizing rendering performance.
 * 
 * @param {string} selector - The CSS selector to apply optimizations to
 * @returns {string} - The CSS for rendering optimization
 */
export function generateRenderOptimizationCSS(selector) {
  return `
    ${selector} {
      contain: content;
      isolation: isolate;
    }
  `;
}