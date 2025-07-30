'use client';

import { lazy, Suspense } from 'react';

/**
 * Creates a dynamically imported component with proper loading state
 * 
 * @param {Function} importFunc - Dynamic import function (e.g., () => import('./Component'))
 * @param {JSX.Element} fallback - Component to show while loading
 * @param {Object} options - Additional options
 * @param {boolean} options.ssr - Whether to enable server-side rendering
 * @param {Function} options.onLoad - Callback when component is loaded
 * @returns {React.ComponentType} - The lazy-loaded component wrapped in Suspense
 */
export function createLazyComponent(importFunc, fallback, options = {}) {
  const { ssr = false, onLoad } = options;
  
  // Create lazy component
  const LazyComponent = lazy(() => {
    const promise = importFunc();
    
    // Add callback when component is loaded
    if (onLoad) {
      promise.then(module => {
        onLoad(module);
      });
    }
    
    return promise;
  });
  
  // Return a wrapper component that includes Suspense
  return function LazyLoadWrapper(props) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Prefetches a component to improve perceived performance
 * 
 * @param {string} componentPath - Path to the component to prefetch
 */
export function prefetchComponent(componentPath) {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  // Create a link prefetch tag
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = componentPath;
  link.as = 'script';
  document.head.appendChild(link);
}

/**
 * Preloads critical components when user hovers over a trigger element
 * 
 * @param {string} selector - CSS selector for trigger elements
 * @param {Function} importFunc - Dynamic import function to preload
 */
export function preloadOnHover(selector, importFunc) {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setupPreloading());
  } else {
    setupPreloading();
  }
  
  function setupPreloading() {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      let preloaded = false;
      
      // Preload on hover
      element.addEventListener('mouseenter', () => {
        if (!preloaded) {
          importFunc();
          preloaded = true;
        }
      });
      
      // Also preload on touch start for mobile
      element.addEventListener('touchstart', () => {
        if (!preloaded) {
          importFunc();
          preloaded = true;
        }
      }, { passive: true });
    });
  }
}

/**
 * Loads components in idle time using requestIdleCallback
 * 
 * @param {Array<Function>} importFuncs - Array of import functions to load during idle time
 */
export function loadDuringIdleTime(importFuncs) {
  // Only run in browser
  if (typeof window === 'undefined') return;
  
  // Use requestIdleCallback or setTimeout as fallback
  const requestIdle = window.requestIdleCallback || 
    ((cb) => setTimeout(cb, 1));
  
  requestIdle(() => {
    importFuncs.forEach(importFunc => {
      importFunc();
    });
  });
}