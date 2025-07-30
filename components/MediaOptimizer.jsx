'use client';

import { useEffect, useRef } from 'react';

/**
 * MediaOptimizer Component
 * 
 * This component implements various optimizations for media loading:
 * - Lazy loads images and videos that are off-screen
 * - Adds loading="lazy" to media elements
 * - Sets appropriate sizes and srcset attributes
 * - Optimizes video loading and playback
 */
const MediaOptimizer = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Only run once
    if (initialized.current) return;
    initialized.current = true;

    // Initialize optimizations when the component mounts
    initializeLazyLoading();
    optimizeVideos();
    optimizeImageAttributes();

    // Clean up when the component unmounts
    return () => {
      // Remove any event listeners or observers
      if (window.lazyLoadObserver) {
        window.lazyLoadObserver.disconnect();
      }
    };
  }, []);

  // No visible UI - this is a utility component
  return null;
};

/**
 * Initializes lazy loading for images and iframes using IntersectionObserver
 */
function initializeLazyLoading() {
  // Only run in the browser
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  // Create an observer instance
  window.lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Handle different element types
        if (element.tagName === 'IMG') {
          // For images, set the src from data-src
          if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }

          // For responsive images, set the srcset from data-srcset
          if (element.dataset.srcset) {
            element.srcset = element.dataset.srcset;
            element.removeAttribute('data-srcset');
          }
        } else if (element.tagName === 'IFRAME') {
          // For iframes, set the src from data-src
          if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }
        } else if (element.tagName === 'VIDEO') {
          // For videos, set the src from data-src
          if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }

          // Also handle source elements within video
          const sources = element.querySelectorAll('source[data-src]');
          sources.forEach(source => {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
          });

          // Load the video
          element.load();
        }

        // Stop observing the element
        window.lazyLoadObserver.unobserve(element);
      }
    });
  }, {
    rootMargin: '200px 0px', // Start loading when within 200px of viewport
    threshold: 0.01 // Trigger when at least 1% of the element is visible
  });

  // Select all media elements that should be lazy loaded
  const mediaElements = document.querySelectorAll('img[data-src], iframe[data-src], video[data-src]');
  mediaElements.forEach(element => {
    window.lazyLoadObserver.observe(element);
  });

  // Also add loading="lazy" to all images and iframes that don't already have it
  // This provides a fallback for browsers that support loading="lazy" but not IntersectionObserver
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  const iframes = document.querySelectorAll('iframe:not([loading])');
  iframes.forEach(iframe => {
    iframe.setAttribute('loading', 'lazy');
  });
}

/**
 * Optimizes video elements for better performance
 */
function optimizeVideos() {
  // Only run in the browser
  if (typeof window === 'undefined') return;

  // Find all video elements
  const videos = document.querySelectorAll('video');

  videos.forEach(video => {
    // Set preload="metadata" to only load metadata initially
    if (!video.hasAttribute('preload')) {
      video.setAttribute('preload', 'metadata');
    }

    // Add playsinline attribute for better mobile experience
    video.setAttribute('playsinline', '');

    // For videos without controls that are likely to be background videos
    if (!video.hasAttribute('controls')) {
      // Make them muted by default to allow autoplay
      video.muted = true;

      // Only autoplay when in viewport
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Play when in viewport, pause when out of viewport
          if (entry.isIntersecting) {
            // Try to play, but don't throw errors if it fails
            // (e.g., if the user hasn't interacted with the page yet)
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, {
        threshold: 0.2 // At least 20% of the video must be visible
      });

      videoObserver.observe(video);
    }
  });
}

/**
 * Optimizes image attributes for better performance and user experience
 */
function optimizeImageAttributes() {
  // Only run in the browser
  if (typeof window === 'undefined') return;

  // Find all image elements
  const images = document.querySelectorAll('img');

  images.forEach(img => {
    // Add decoding="async" to allow asynchronous image decoding
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }

    // Add alt text if missing (for accessibility)
    if (!img.hasAttribute('alt')) {
      // Try to generate a meaningful alt text from the context
      let altText = '';
      
      // Check if the image is inside a link
      const parentLink = img.closest('a');
      if (parentLink && parentLink.textContent.trim()) {
        altText = parentLink.textContent.trim();
      }
      
      // Check for nearby headings or captions
      if (!altText) {
        const parentFigure = img.closest('figure');
        if (parentFigure) {
          const figcaption = parentFigure.querySelector('figcaption');
          if (figcaption && figcaption.textContent.trim()) {
            altText = figcaption.textContent.trim();
          }
        }
      }
      
      // If we found a meaningful alt text, use it
      if (altText) {
        img.alt = altText;
      } else {
        // Otherwise, use an empty alt for decorative images
        img.alt = '';
      }
    }

    // If the image has dimensions in the HTML but not in CSS,
    // add a style to prevent layout shifts
    if (img.width && img.height && !img.style.aspectRatio) {
      const aspectRatio = img.width / img.height;
      img.style.aspectRatio = `${aspectRatio}`;
    }
  });
}

export default MediaOptimizer;