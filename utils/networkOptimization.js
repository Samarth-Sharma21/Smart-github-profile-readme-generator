/**
 * Network Optimization Utilities
 * 
 * This module provides utilities for optimizing network requests and resource loading.
 */

/**
 * Creates a simple in-memory cache for API responses.
 * 
 * @param {number} maxSize - Maximum number of items to store in cache
 * @param {number} defaultTTL - Default time-to-live in milliseconds
 * @returns {Object} - Cache object with get, set, and clear methods
 */
export function createApiCache(maxSize = 100, defaultTTL = 60 * 60 * 1000) {
  const cache = new Map();
  
  return {
    /**
     * Gets an item from the cache.
     * 
     * @param {string} key - The cache key
     * @returns {*} - The cached value or undefined if not found or expired
     */
    get(key) {
      if (!cache.has(key)) return undefined;
      
      const { value, expiry } = cache.get(key);
      
      // Check if the item has expired
      if (expiry && Date.now() > expiry) {
        cache.delete(key);
        return undefined;
      }
      
      return value;
    },
    
    /**
     * Sets an item in the cache.
     * 
     * @param {string} key - The cache key
     * @param {*} value - The value to cache
     * @param {number} ttl - Time-to-live in milliseconds (optional)
     */
    set(key, value, ttl = defaultTTL) {
      // If cache is at max size, remove the oldest item
      if (cache.size >= maxSize) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
      
      const expiry = ttl ? Date.now() + ttl : null;
      cache.set(key, { value, expiry });
    },
    
    /**
     * Clears the entire cache or a specific item.
     * 
     * @param {string} key - The specific key to clear (optional)
     */
    clear(key) {
      if (key) {
        cache.delete(key);
      } else {
        cache.clear();
      }
    }
  };
}

/**
 * Creates a fetch wrapper with caching, retries, and timeout.
 * 
 * @param {Object} options - Fetch options
 * @param {Object} options.cache - Cache object with get and set methods
 * @param {number} options.retries - Number of retry attempts
 * @param {number} options.retryDelay - Delay between retries in milliseconds
 * @param {number} options.timeout - Request timeout in milliseconds
 * @returns {Function} - Enhanced fetch function
 */
export function createEnhancedFetch({
  cache = createApiCache(),
  retries = 3,
  retryDelay = 1000,
  timeout = 5000
} = {}) {
  /**
   * Enhanced fetch function with caching, retries, and timeout.
   * 
   * @param {string} url - The URL to fetch
   * @param {Object} options - Fetch options
   * @param {boolean} options.useCache - Whether to use cache for this request
   * @param {number} options.cacheTTL - Cache TTL for this request
   * @returns {Promise} - Promise resolving to the fetch response
   */
  return async function enhancedFetch(url, options = {}) {
    const {
      useCache = true,
      cacheTTL,
      ...fetchOptions
    } = options;
    
    // Generate a cache key based on the URL and fetch options
    const cacheKey = `${url}-${JSON.stringify(fetchOptions)}`;
    
    // Check cache first if enabled
    if (useCache) {
      const cachedResponse = cache.get(cacheKey);
      if (cachedResponse) {
        return Promise.resolve(cachedResponse);
      }
    }
    
    // Create a promise that rejects after the timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeout);
    });
    
    // Function to perform a fetch attempt with retry logic
    const fetchWithRetry = async (attemptsLeft) => {
      try {
        // Race the fetch against the timeout
        const response = await Promise.race([
          fetch(url, fetchOptions),
          timeoutPromise
        ]);
        
        // Clone the response before reading its body
        const clonedResponse = response.clone();
        
        // Parse the response based on content type
        let data;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
        
        // Cache the successful response if caching is enabled
        if (useCache) {
          cache.set(cacheKey, data, cacheTTL);
        }
        
        return data;
      } catch (error) {
        // If no more retry attempts, throw the error
        if (attemptsLeft <= 1) {
          throw error;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        // Retry with one less attempt
        return fetchWithRetry(attemptsLeft - 1);
      }
    };
    
    // Start the fetch process with the specified number of retries
    return fetchWithRetry(retries);
  };
}

/**
 * Prefetches a URL to improve load time of subsequent requests.
 * 
 * @param {string} url - The URL to prefetch
 * @param {string} as - The resource type (e.g., 'image', 'script', 'style', 'font')
 * @param {boolean} highPriority - Whether to use high priority preload instead of prefetch
 */
export function prefetchResource(url, as = '', highPriority = false) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = highPriority ? 'preload' : 'prefetch';
  
  if (as) {
    link.as = as;
  }
  
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Preconnects to a domain to reduce connection time for subsequent requests.
 * 
 * @param {string} url - The URL to preconnect to
 * @param {boolean} crossOrigin - Whether to include credentials for cross-origin requests
 */
export function preconnect(url, crossOrigin = true) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  
  if (crossOrigin) {
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
}

/**
 * Performs DNS prefetching for a domain.
 * 
 * @param {string} url - The URL to prefetch DNS for
 */
export function dnsPrefetch(url) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = url;
  document.head.appendChild(link);
}