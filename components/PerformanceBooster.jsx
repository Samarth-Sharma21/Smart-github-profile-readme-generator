'use client';

import { useEffect, useRef } from 'react';
import { injectCriticalCSS, getCriticalCSS } from '../utils/cssOptimization';
import { executeWhenIdle, deferExecution } from '../utils/scriptOptimization';
import { preconnect, dnsPrefetch } from '../utils/networkOptimization';

/**
 * PerformanceBooster Component
 * 
 * This component implements various performance optimizations:
 * - Injects critical CSS
 * - Sets up resource hints (preconnect, dns-prefetch)
 * - Defers non-critical operations
 * - Monitors and reports performance metrics
 */
const PerformanceBooster = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Only run once
    if (initialized.current) return;
    initialized.current = true;

    // 1. Inject critical CSS
    injectCriticalCSS(getCriticalCSS());

    // 2. Set up resource hints for external domains
    // GitHub resources
    preconnect('https://github.com');
    preconnect('https://api.github.com');
    dnsPrefetch('https://github.githubassets.com');
    
    // CDN resources
    preconnect('https://cdn.jsdelivr.net');
    dnsPrefetch('https://cdn.jsdelivr.net');
    
    // Font resources
    preconnect('https://fonts.googleapis.com');
    preconnect('https://fonts.gstatic.com', true);
    
    // Buy Me a Coffee
    dnsPrefetch('https://www.buymeacoffee.com');

    // 3. Set up performance monitoring
    setupPerformanceMonitoring();

    // 4. Defer non-critical operations
    deferExecution(() => {
      // Register event listeners for user interaction tracking
      registerInteractionTracking();
      
      // Prefetch resources that might be needed later
      prefetchLikelyResources();
    });

  }, []);

  // No visible UI - this is a utility component
  return null;
};

/**
 * Sets up performance monitoring for key metrics
 */
function setupPerformanceMonitoring() {
  // Only run in the browser
  if (typeof window === 'undefined') return;

  // Monitor Core Web Vitals and other performance metrics
  if ('PerformanceObserver' in window) {
    // 1. Monitor Largest Contentful Paint (LCP)
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Report LCP
        if (lastEntry && window.readmeGeneratorAnalytics) {
          executeWhenIdle(() => {
            window.readmeGeneratorAnalytics.trackPerformance({
              metric: 'LCP',
              value: lastEntry.startTime,
              element: lastEntry.element ? lastEntry.element.tagName : 'unknown'
            });
          });
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP monitoring not supported', e);
    }

    // 2. Monitor First Input Delay (FID) / Interaction to Next Paint (INP)
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          // Report interaction metrics
          if (window.readmeGeneratorAnalytics) {
            executeWhenIdle(() => {
              window.readmeGeneratorAnalytics.trackPerformance({
                metric: 'Interaction',
                value: entry.duration,
                name: entry.name
              });
            });
          }
        });
      }).observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID monitoring not supported', e);
    }

    // 3. Monitor Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      let clsEntries = [];
      
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach(entry => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });

        // Report CLS periodically
        if (clsValue > 0 && window.readmeGeneratorAnalytics) {
          executeWhenIdle(() => {
            window.readmeGeneratorAnalytics.trackPerformance({
              metric: 'CLS',
              value: clsValue
            });
          });
        }
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS monitoring not supported', e);
    }

    // 4. Monitor long tasks
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach(entry => {
          // Report long tasks (tasks that block the main thread for more than 50ms)
          if (window.readmeGeneratorAnalytics) {
            executeWhenIdle(() => {
              window.readmeGeneratorAnalytics.trackPerformance({
                metric: 'LongTask',
                value: entry.duration,
                attribution: entry.attribution.length > 0 ? 
                  entry.attribution[0].name : 'unknown'
              });
            });
          }
        });
      }).observe({ type: 'longtask', buffered: true });
    } catch (e) {
      console.warn('Long Task monitoring not supported', e);
    }
  }

  // Report navigation timing metrics
  window.addEventListener('load', () => {
    executeWhenIdle(() => {
      if (window.performance && window.performance.timing && window.readmeGeneratorAnalytics) {
        const timing = window.performance.timing;
        
        // Calculate key timing metrics
        const navigationStart = timing.navigationStart;
        const responseEnd = timing.responseEnd;
        const domComplete = timing.domComplete;
        const loadEventEnd = timing.loadEventEnd;
        
        // Time to First Byte (TTFB)
        const ttfb = timing.responseStart - timing.navigationStart;
        
        // DOM Content Loaded
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        // Load Time
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        // Report these metrics
        window.readmeGeneratorAnalytics.trackPerformance({
          metric: 'TTFB',
          value: ttfb
        });
        
        window.readmeGeneratorAnalytics.trackPerformance({
          metric: 'DOMContentLoaded',
          value: domContentLoaded
        });
        
        window.readmeGeneratorAnalytics.trackPerformance({
          metric: 'LoadTime',
          value: loadTime
        });
      }
    });
  });
}

/**
 * Registers event listeners for tracking user interactions
 */
function registerInteractionTracking() {
  // Only run in the browser
  if (typeof window === 'undefined' || !window.readmeGeneratorAnalytics) return;

  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    window.readmeGeneratorAnalytics.trackEvent({
      category: 'Visibility',
      action: document.visibilityState === 'visible' ? 'visible' : 'hidden',
      label: window.location.pathname
    });
  });

  // Track when users copy content (likely copying the README)
  document.addEventListener('copy', (e) => {
    const selection = document.getSelection()?.toString() || '';
    if (selection.length > 20) { // Only track meaningful copies
      window.readmeGeneratorAnalytics.trackEvent({
        category: 'Interaction',
        action: 'Copy',
        label: `Length: ${selection.length}`
      });
    }
  });
}

/**
 * Prefetches resources that are likely to be needed soon
 */
function prefetchLikelyResources() {
  // This would prefetch resources based on user behavior patterns
  // For example, if users often go from the editor to preview, we could prefetch
  // resources needed for the preview when they're on the editor
  
  // This is a simplified implementation
  if (typeof window === 'undefined') return;
  
  // Determine current view
  const isCreateView = window.location.pathname === '/' && 
    document.querySelector('[data-view="create"]');
  
  // If on create view, prefetch preview resources
  if (isCreateView) {
    // Prefetch GitHub API resources that might be needed for preview
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'https://api.github.com/rate_limit';
    document.head.appendChild(link);
  }
}

export default PerformanceBooster;