'use client';

import { useEffect } from 'react';

/**
 * PerformanceOptimizer Component
 * 
 * This component implements various performance optimizations:
 * 1. Resource Hints (preconnect, prefetch, preload)
 * 2. Lazy loading of non-critical resources
 * 3. Image optimization
 * 4. Font optimization
 * 5. Performance monitoring
 */
export function PerformanceOptimizer() {
  useEffect(() => {
    // Only run in production and browser environment
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;
    
    // 1. Add resource hints for external domains
    addResourceHints();
    
    // 2. Implement lazy loading for non-critical resources
    setupLazyLoading();
    
    // 3. Monitor and report performance metrics
    monitorPerformance();
    
    // 4. Clean up event listeners on unmount
    return () => {
      window.removeEventListener('load', reportPerformanceMetrics);
    };
  }, []);
  
  return null; // This component doesn't render anything
}

/**
 * Adds resource hints to improve connection times to external domains
 */
function addResourceHints() {
  const hints = [
    // Preconnect to domains we'll need resources from
    { rel: 'preconnect', href: 'https://raw.githubusercontent.com', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://cdn.buymeacoffee.com', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://api.github.com', crossOrigin: 'anonymous' },
    
    // DNS-prefetch as fallback for browsers that don't support preconnect
    { rel: 'dns-prefetch', href: 'https://raw.githubusercontent.com' },
    { rel: 'dns-prefetch', href: 'https://cdn.buymeacoffee.com' },
    { rel: 'dns-prefetch', href: 'https://api.github.com' },
  ];
  
  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
    document.head.appendChild(link);
  });
}

/**
 * Sets up lazy loading for non-critical resources
 */
function setupLazyLoading() {
  // Use Intersection Observer to lazy load images and iframes
  if ('IntersectionObserver' in window) {
    const lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.tagName === 'IMG' && element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }
          
          lazyLoadObserver.unobserve(element);
        }
      });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      lazyLoadObserver.observe(img);
    });
  }
}

/**
 * Monitors and reports performance metrics
 */
function monitorPerformance() {
  // Add load event listener to report metrics when page is fully loaded
  window.addEventListener('load', reportPerformanceMetrics);
  
  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      // Monitor long tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log long tasks that might cause jank
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name
            });
          }
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        // Store LCP for reporting
        window.lcpTime = lastEntry.startTime + lastEntry.duration;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstInput = entries[0];
        // Store FID for reporting
        window.fidTime = firstInput.processingStart - firstInput.startTime;
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      
      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      let clsEntries = [];
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });
        // Store CLS for reporting
        window.clsValue = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.error('Performance monitoring error:', e);
    }
  }
}

/**
 * Reports collected performance metrics
 */
function reportPerformanceMetrics() {
  // Wait a bit to ensure metrics are collected
  setTimeout(() => {
    // Collect navigation timing metrics
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const navStart = timing.navigationStart;
      
      const metrics = {
        // Navigation Timing API metrics
        pageLoadTime: timing.loadEventEnd - navStart,
        domContentLoaded: timing.domContentLoadedEventEnd - navStart,
        firstPaint: window.firstPaint || 0,
        
        // Core Web Vitals
        lcp: window.lcpTime || 0,  // Largest Contentful Paint
        fid: window.fidTime || 0,  // First Input Delay
        cls: window.clsValue || 0,  // Cumulative Layout Shift
        
        // Resource timing
        resourceCount: window.performance.getEntriesByType('resource').length,
        
        // User agent and connection info
        userAgent: navigator.userAgent,
        connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown'
      };
      
      // Store in localStorage for analytics
      try {
        const performanceData = JSON.parse(localStorage.getItem('performance_metrics') || '[]');
        performanceData.push({
          timestamp: new Date().toISOString(),
          metrics
        });
        
        // Keep only the last 10 entries
        if (performanceData.length > 10) {
          performanceData.shift();
        }
        
        localStorage.setItem('performance_metrics', JSON.stringify(performanceData));
        
        // Log metrics to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance metrics:', metrics);
        }
        
        // Send to analytics in production
        if (process.env.NODE_ENV === 'production' && window.readmeGeneratorAnalytics) {
          window.readmeGeneratorAnalytics.trackPerformance(metrics);
        }
      } catch (e) {
        console.error('Error storing performance metrics:', e);
      }
    }
  }, 1000);
}