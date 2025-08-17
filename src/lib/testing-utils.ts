// Testing and optimization utilities

// Accessibility testing helpers
export function checkAccessibility() {
  if (typeof window === 'undefined') return;

  const issues: string[] = [];

  // Check for missing alt text on images
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push(`Image ${index + 1} missing alt text`);
    }
  });

  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (index === 0 && level !== 1) {
      issues.push('Page should start with h1');
    }
    if (level > lastLevel + 1) {
      issues.push(`Heading level jumps from h${lastLevel} to h${level}`);
    }
    lastLevel = level;
  });

  // Check for missing form labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((input, index) => {
    const id = input.id;
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = input.getAttribute('aria-label');
    const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push(`Form input ${index + 1} missing label`);
    }
  });

  // Check color contrast (basic check)
  const elements = document.querySelectorAll('*');
  elements.forEach((element) => {
    const styles = window.getComputedStyle(element);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;
    
    // This is a simplified check - in production, use a proper contrast checker
    if (color === backgroundColor) {
      issues.push(`Element has same text and background color: ${element.tagName}`);
    }
  });

  return issues;
}

// Performance testing
export function checkPerformance() {
  if (typeof window === 'undefined' || !window.performance) return {};

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  
  const metrics = {
    // Core Web Vitals approximations
    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    
    // Resource timing
    totalResources: performance.getEntriesByType('resource').length,
    slowResources: performance.getEntriesByType('resource').filter(
      (resource: any) => resource.duration > 1000
    ).length,
    
    // Memory usage (if available)
    memoryUsage: (performance as any).memory ? {
      used: Math.round((performance as any).memory.usedJSHeapSize / 1048576),
      total: Math.round((performance as any).memory.totalJSHeapSize / 1048576),
      limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1048576)
    } : null
  };

  return metrics;
}

// Responsive design testing
export function checkResponsiveDesign() {
  if (typeof window === 'undefined') return {};

  const breakpoints = {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  };

  const currentWidth = window.innerWidth;
  const currentDevice = currentWidth < breakpoints.mobile ? 'mobile' :
                       currentWidth < breakpoints.tablet ? 'tablet' : 'desktop';

  // Check for horizontal scrolling
  const hasHorizontalScroll = document.body.scrollWidth > window.innerWidth;

  // Check for elements that might overflow
  const overflowingElements: Element[] = [];
  document.querySelectorAll('*').forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      overflowingElements.push(element);
    }
  });

  return {
    currentDevice,
    currentWidth,
    hasHorizontalScroll,
    overflowingElements: overflowingElements.length,
    breakpoints
  };
}

// SEO testing
export function checkSEO() {
  if (typeof document === 'undefined') return {};

  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check meta tags
  const title = document.querySelector('title');
  const metaDescription = document.querySelector('meta[name="description"]');
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  const canonicalLink = document.querySelector('link[rel="canonical"]');

  if (!title || title.textContent!.length < 30) {
    issues.push('Title tag missing or too short (should be 30-60 characters)');
  }

  if (!metaDescription || metaDescription.getAttribute('content')!.length < 120) {
    issues.push('Meta description missing or too short (should be 120-160 characters)');
  }

  if (!canonicalLink) {
    recommendations.push('Consider adding a canonical link');
  }

  // Check heading structure
  const h1s = document.querySelectorAll('h1');
  if (h1s.length === 0) {
    issues.push('No H1 tag found');
  } else if (h1s.length > 1) {
    issues.push('Multiple H1 tags found (should be only one)');
  }

  // Check images
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    issues.push(`${imagesWithoutAlt.length} images missing alt text`);
  }

  // Check internal links
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  
  externalLinks.forEach(link => {
    if (!link.getAttribute('rel')?.includes('noopener')) {
      recommendations.push('External links should include rel="noopener" for security');
    }
  });

  return {
    issues,
    recommendations,
    stats: {
      internalLinks: internalLinks.length,
      externalLinks: externalLinks.length,
      totalImages: document.querySelectorAll('img').length,
      imagesWithAlt: document.querySelectorAll('img[alt]').length
    }
  };
}

// Cross-browser compatibility checks
export function checkBrowserCompatibility() {
  if (typeof window === 'undefined') return {};

  const features = {
    // CSS features
    cssGrid: CSS.supports('display', 'grid'),
    cssFlexbox: CSS.supports('display', 'flex'),
    cssCustomProperties: CSS.supports('color', 'var(--test)'),
    cssBackdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
    
    // JavaScript features
    intersectionObserver: 'IntersectionObserver' in window,
    webAnimations: 'animate' in document.createElement('div'),
    fetch: 'fetch' in window,
    promises: 'Promise' in window,
    
    // Browser info
    userAgent: navigator.userAgent,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    
    // Viewport
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1
  };

  return features;
}

// Bundle size analysis (development only)
export function analyzeBundleSize() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return null;
  }

  // This would integrate with webpack-bundle-analyzer in a real implementation
  const scripts = document.querySelectorAll('script[src]');
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
  return {
    scriptCount: scripts.length,
    stylesheetCount: stylesheets.length,
    // In a real implementation, you'd calculate actual sizes
    estimatedJSSize: scripts.length * 50, // Rough estimate in KB
    estimatedCSSSize: stylesheets.length * 20 // Rough estimate in KB
  };
}

// Comprehensive site audit
export function runSiteAudit() {
  const audit = {
    timestamp: new Date().toISOString(),
    accessibility: checkAccessibility(),
    performance: checkPerformance(),
    responsive: checkResponsiveDesign(),
    seo: checkSEO(),
    browserCompatibility: checkBrowserCompatibility(),
    bundleSize: analyzeBundleSize()
  };

  // Log results in development
  if (process.env.NODE_ENV === 'development') {
    console.group('🔍 Site Audit Results');
    console.log('Accessibility Issues:', audit.accessibility);
    console.log('Performance Metrics:', audit.performance);
    console.log('Responsive Design:', audit.responsive);
    console.log('SEO Analysis:', audit.seo);
    console.log('Browser Compatibility:', audit.browserCompatibility);
    console.groupEnd();
  }

  return audit;
}

// Automated testing runner
export function runAutomatedTests() {
  if (typeof window === 'undefined') return;

  // Run tests after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      runSiteAudit();
    }, 1000);
  });

  // Run responsive tests on resize
  let resizeTimeout: NodeJS.Timeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log('Responsive Check:', checkResponsiveDesign());
    }, 500);
  });
}

// Performance monitoring
export function startPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task observer not supported
    }
  }

  // Monitor memory usage
  if ((performance as any).memory) {
    setInterval(() => {
      const memory = (performance as any).memory;
      const used = Math.round(memory.usedJSHeapSize / 1048576);
      const total = Math.round(memory.totalJSHeapSize / 1048576);
      
      if (used / total > 0.9) {
        console.warn('High memory usage detected:', { used, total });
      }
    }, 30000); // Check every 30 seconds
  }
}