/**
 * Vercel Speed Insights
 * Tracks and reports web performance metrics
 * 
 * This script initializes the Speed Insights queue and loads the tracking script.
 * The actual tracking happens automatically when deployed to Vercel.
 */
(function() {
  // Initialize Speed Insights queue
  window.si = window.si || function () { 
    (window.siq = window.siq || []).push(arguments); 
  };
  
  // Load the Speed Insights script from Vercel's CDN when deployed
  // This path is automatically configured by Vercel during deployment
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/speed-insights/script.js';
    document.head.appendChild(script);
  }
})();
