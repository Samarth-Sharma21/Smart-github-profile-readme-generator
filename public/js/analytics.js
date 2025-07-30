// Google Analytics 4 implementation
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // Replace with your actual Google Analytics measurement ID

// Set page title for better analytics tracking
gtag('set', 'page_title', 'GitHub Profile README Generator');

// Track page load timing for Core Web Vitals
window.addEventListener('load', function() {
  if (window.performance) {
    const pageLoadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    gtag('event', 'timing_complete', {
      'name': 'page_load',
      'value': pageLoadTime,
      'event_category': 'Page Load Performance'
    });
  }
});

// Track important user interactions
document.addEventListener('DOMContentLoaded', function() {
  // Track README generation events - using more reliable selectors
  document.addEventListener('click', function(e) {
    // Track preview button clicks
    if (e.target && (e.target.textContent.includes('Preview') || e.target.textContent.includes('Generate'))) {
      gtag('event', 'generate_readme', {
        'event_category': 'engagement',
        'event_label': 'README Preview Generated'
      });
    }
    
    // Track copy markdown button clicks
    if (e.target && e.target.textContent.includes('Copy')) {
      gtag('event', 'copy_markdown', {
        'event_category': 'engagement',
        'event_label': 'Markdown Copied'
      });
    }
    
    // Track social links added
    if (e.target && e.target.closest('form') && (e.target.textContent.includes('Add') || e.target.textContent.includes('Social'))) {
      gtag('event', 'add_social_link', {
        'event_category': 'engagement',
        'event_label': 'Social Link Added'
      });
    }
    
    // Track technology selections
    if (e.target && e.target.closest('[data-tech]')) {
      const tech = e.target.closest('[data-tech]').getAttribute('data-tech') || 'unknown';
      gtag('event', 'select_technology', {
        'event_category': 'engagement',
        'event_label': tech
      });
    }
  });
  
  // Track form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': 'Form Submitted'
      });
    });
  });
  
  // Track outbound links
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.hostname !== window.location.hostname) {
      gtag('event', 'outbound_link', {
        'event_category': 'engagement',
        'event_label': e.target.href
      });
    }
  });
});