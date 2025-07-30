/**
 * Script Optimization Utilities
 * 
 * This module provides utilities for optimizing JavaScript execution and loading.
 */

/**
 * Executes a function during browser idle time.
 * Falls back to setTimeout if requestIdleCallback is not available.
 * 
 * @param {Function} callback - The function to execute
 * @param {Object} options - Options for requestIdleCallback
 * @param {number} options.timeout - Timeout in milliseconds
 */
export function executeWhenIdle(callback, { timeout = 1000 } = {}) {
  if (typeof window === 'undefined') return;
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(callback, 1);
  }
}

/**
 * Defers non-critical JavaScript execution until after page load.
 * 
 * @param {Function} callback - The function to execute
 */
export function deferExecution(callback) {
  if (typeof window === 'undefined') return;
  
  if (document.readyState === 'complete') {
    executeWhenIdle(callback);
  } else {
    window.addEventListener('load', () => {
      executeWhenIdle(callback);
    });
  }
}

/**
 * Breaks long-running tasks into smaller chunks to avoid blocking the main thread.
 * 
 * @param {Array} items - The items to process
 * @param {Function} processor - The function to process each item
 * @param {Object} options - Chunking options
 * @param {number} options.chunkSize - Number of items to process per chunk
 * @param {number} options.delay - Delay between chunks in milliseconds
 * @returns {Promise} - Resolves when all items have been processed
 */
export function processInChunks(items, processor, { chunkSize = 5, delay = 0 } = {}) {
  return new Promise((resolve) => {
    if (!items.length) {
      resolve();
      return;
    }
    
    let index = 0;
    
    function processNextChunk() {
      const chunk = items.slice(index, index + chunkSize);
      index += chunkSize;
      
      // Process current chunk
      chunk.forEach(processor);
      
      // If there are more items to process, schedule the next chunk
      if (index < items.length) {
        setTimeout(processNextChunk, delay);
      } else {
        resolve();
      }
    }
    
    processNextChunk();
  });
}

/**
 * Prefetches a JavaScript resource to improve load time of subsequent pages.
 * 
 * @param {string} url - The URL of the script to prefetch
 * @param {boolean} highPriority - Whether to use high priority preload instead of prefetch
 */
export function prefetchScript(url, highPriority = false) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = highPriority ? 'preload' : 'prefetch';
  link.as = 'script';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Loads a script dynamically with configurable attributes.
 * 
 * @param {Object} options - Script loading options
 * @param {string} options.src - The script source URL
 * @param {boolean} options.async - Whether to load the script asynchronously
 * @param {boolean} options.defer - Whether to defer script execution
 * @param {string} options.integrity - The integrity hash for the script
 * @param {string} options.crossOrigin - The crossorigin attribute value
 * @returns {Promise} - Resolves when the script has loaded
 */
export function loadScriptDynamically({ 
  src, 
  async = true, 
  defer = true, 
  integrity = '', 
  crossOrigin = 'anonymous' 
} = {}) {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Document not available'));
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    
    if (integrity) {
      script.integrity = integrity;
    }
    
    if (crossOrigin) {
      script.crossOrigin = crossOrigin;
    }
    
    script.onload = () => resolve(script);
    script.onerror = (error) => reject(error);
    
    document.head.appendChild(script);
  });
}

/**
 * Measures the execution time of a function.
 * 
 * @param {Function} fn - The function to measure
 * @param {Array} args - Arguments to pass to the function
 * @returns {Object} - The result and execution time
 */
export function measureExecutionTime(fn, ...args) {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  
  return {
    result,
    executionTime: end - start
  };
}

/**
 * Creates a debounced version of a function that delays execution until after
 * a specified wait time has elapsed since the last time it was invoked.
 * 
 * @param {Function} fn - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} - The debounced function
 */
export function debounce(fn, wait = 100) {
  let timeout;
  
  return function(...args) {
    const context = this;
    
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

/**
 * Creates a throttled version of a function that only executes at most once
 * per every specified time period.
 * 
 * @param {Function} fn - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled function
 */
export function throttle(fn, limit = 100) {
  let inThrottle;
  
  return function(...args) {
    const context = this;
    
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}