import { useEffect } from 'react';

export function useScrollLock(isLocked) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const body = document.body;
    const root = document.documentElement;

    if (isLocked) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Add modal-open class for CSS-based scroll prevention
      body.classList.add('modal-open');
      
      // Set body styles to prevent scrolling
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.overflow = 'hidden';
      body.style.height = '100%';
      body.style.width = '100%';
      
      // Also prevent scrolling on html element
      root.style.overflow = 'hidden';
      
      return () => {
        // Remove modal-open class
        body.classList.remove('modal-open');
        
        // Restore body styles
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.overflow = '';
        body.style.height = '';
        body.style.width = '';
        
        // Restore html overflow
        root.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
}