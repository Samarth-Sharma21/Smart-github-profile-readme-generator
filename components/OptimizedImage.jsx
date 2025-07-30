'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component with additional optimizations:
 * 1. Lazy loading with IntersectionObserver
 * 2. Progressive loading with blur-up technique
 * 3. Proper handling of loading states
 * 4. Fallback for image errors
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {number} props.width - Image width
 * @param {number} props.height - Image height
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.fallbackSrc - Fallback image to use if main image fails to load
 * @param {boolean} props.priority - Whether to prioritize loading this image
 * @param {Function} props.onLoad - Callback function when image loads successfully
 * @param {Function} props.onError - Callback function when image fails to load
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackSrc = '/images/placeholder.svg',
  priority = false,
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  // Handle successful image load
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image load error
  const handleError = () => {
    setIsError(true);
    if (onError) onError();
  };

  // Set up intersection observer for lazy loading
  useEffect(() => {
    // Skip if image is prioritized
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading when image is 200px from viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect();
      }
    };
  }, [priority]);

  // Generate a tiny placeholder for blur-up effect
  const blurDataURL = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f0f0f0'/%3E%3C/svg%3E`;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Show placeholder while image is loading */}
      {!isLoaded && !isError && (
        <div
          className="absolute inset-0 bg-gray-100 animate-pulse"
          style={{ width, height }}
        />
      )}

      {/* Show actual image or fallback */}
      {(isVisible || priority) && (
        <Image
          src={isError ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority={priority}
          {...props}
        />
      )}
    </div>
  );
}