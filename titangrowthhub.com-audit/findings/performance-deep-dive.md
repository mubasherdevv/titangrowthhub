# Performance Deep Dive - titangrowthhub.com

**Audit Date:** August 5, 2026
**Architecture:** WordPress 6.9.5 + Elementor 3.33.4 + WooCommerce 10.4.2

---

## Core Web Vitals Estimates

| Metric | Estimated | Status | Target |
|--------|-----------|--------|--------|
| **Performance Score** | 25-35/100 | 🔴 Poor | >90 |
| **LCP** | 4.5-6.0s | 🔴 Poor | <2.5s |
| **INP** | 250-400ms | 🟡 Needs Improvement | <200ms |
| **CLS** | 0.3-0.5 | 🔴 Poor | <0.1 |
| **FCP** | 2.5-3.5s | 🟡 Needs Improvement | <1.8s |
| **TBT** | 1200-2000ms | 🔴 Poor | <200ms |

---

## Critical Performance Issues

### 1. LCP (Largest Contentful Paint) - CRITICAL

**Problems:**
- **34 render-blocking JavaScript files** loading synchronously
  - jQuery core + jQuery Migrate (blocking)
  - GSAP, ScrollTrigger, pixi.js, swiper (heavy animation libs)
  - 24+ theme/plugin JS files - none deferred
  
- **33 render-blocking CSS files**
  - WooCommerce CSS loaded on all pages (unnecessary on homepage)
  - 3+ Google Font families (Inter, Geist Mono, Mona Sans, Roboto, Roboto Slab)
  - Duplicate CSS: avista-custom.css loaded twice, flaticon loaded twice
  
- **Hero images lacking preload**
  - LCP candidates (p1-img-1.webp, h1-man.webp) not prioritized
  - ALL images marked `loading="lazy"` including above-fold hero

**Expected Impact:** LCP >4.0s (Poor)

**Fix:**
```html
<!-- Add to <head> -->
<link rel="preload" as="image" href="/wp-content/uploads/2025/10/h1-man.webp" fetchpriority="high">

<!-- Remove lazy loading from first 3-4 images -->
<img src="hero.webp" width="800" height="600" fetchpriority="high">

<!-- Defer all non-critical JavaScript -->
<script src="theme.js" defer></script>
```

---

### 2. CLS (Cumulative Layout Shift) - CRITICAL

**Problems:**
- **ALL images missing width/height dimensions**
- Layout shifts guaranteed as images load
- Multiple font families with `display=swap` cause text shift

**Expected Impact:** CLS >0.25 (Poor)

**Fix:**
```html
<!-- Before (causes layout shift) -->
<img src="hero.webp" alt="Hero">

<!-- After (reserves space) -->
<img src="hero.webp" alt="Hero" width="1200" height="800">
```

```css
/* CSS alternative */
img {
  aspect-ratio: attr(width) / attr(height);
}
```

---

### 3. INP (Interaction to Next Paint) - HIGH

**Problems:**
- Heavy JavaScript execution: GSAP + ScrollTrigger + pixi.js
- Multiple animation libraries (wow.js, lenis, swiper)
- Elementor frontend JS
- All loading synchronously, blocking main thread

**Expected Impact:** INP 250-400ms (Needs Improvement)

**Fix:**
```javascript
// Lazy load animation libraries
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      import('./gsap-animations.js');
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

---

## Resource Analysis

**HTML Size:** 686 KB uncompressed → 2.5 KB compressed (Brotli ✅)

**Third-Party Domains:**
- fonts.googleapis.com (3 font families)
- static.cloudflareinsights.com (analytics)
- themexriver.com (theme references)

**Critical Issues:**
- Mixed content: References to "http://localhost:3000" in canonical URLs
- Duplicate resources: Several CSS files loaded 2x
- Unused features: Contact Form 7, WooCommerce loaded globally

---

## Prioritized Fix Plan

### Phase 1: Quick Wins (Highest ROI)

**1. Add Image Dimensions (2 hours)**
```bash
# Find all images without dimensions
grep -r '<img' --include="*.php" | grep -v 'width=' | grep -v 'height='
```
Add width/height to ALL `<img>` tags.

**Expected: LCP -1.5s, CLS -0.2**

---

**2. Fix Hero Image Loading (30 mins)**
```html
<!-- First hero image -->
<link rel="preload" as="image" href="h1-man.webp" fetchpriority="high">
<img src="h1-man.webp" width="800" height="600" fetchpriority="high">
```
Remove `loading="lazy"` from first 4 images.

**Expected: LCP -1.0s**

---

**3. Defer JavaScript (1 hour)**
Add `defer` to all script tags:
```bash
# WordPress - add to functions.php
function defer_scripts($tag, $handle, $src) {
    if (is_admin()) return $tag;
    return str_replace(' src', ' defer src', $tag);
}
add_filter('script_loader_tag', 'defer_scripts', 10, 3);
```

**Expected: TBT -800ms, INP -100ms**

---

### Phase 2: CSS Optimization (4-6 hours)

**4. Inline Critical CSS**
```bash
# Generate critical CSS
npx critical https://titangrowthhub.com/ --inline --minify > critical.css
```

**5. Defer Non-Critical CSS**
```html
<link rel="stylesheet" href="style.css" media="print" onload="this.media='all'">
```

**6. Consolidate Fonts**
Reduce from 5 fonts to 2:
```html
<!-- Before -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Roboto:wght@400;700&family=Roboto+Slab&family=Geist+Mono&family=Mona+Sans&display=swap">

<!-- After -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="preload" as="style">
```

**Expected: LCP -1.0s, FCP -0.8s**

---

### Phase 3: Conditional Loading (3-4 hours)

**7. Load WooCommerce Conditionally**
```php
// functions.php
add_action('wp_enqueue_scripts', function() {
    if (!is_woocommerce() && !is_cart() && !is_checkout()) {
        wp_dequeue_style('woocommerce-general');
        wp_dequeue_style('woocommerce-layout');
        wp_dequeue_style('woocommerce-smallscreen');
    }
}, 100);
```

**8. Lazy Load Animation Libraries**
Only load GSAP when scrolling near animated sections.

**Expected: TBT -400ms, page weight -200KB**

---

### Phase 4: Advanced Optimization (6-8 hours)

**9. Self-Host Google Fonts**
```bash
# Download fonts locally
npx google-webfonts-helper download -f inter
```

**10. Implement Responsive Images**
```html
<img 
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  src="hero-800.webp"
  width="800" height="600"
  alt="Hero">
```

**Expected: LCP -0.5s, bandwidth savings**

---

## Before/After Estimates

| Metric | Before | After (All Phases) | Improvement |
|--------|--------|-------------------|-------------|
| Performance | 25-35 | 75-85 | +50-60 |
| LCP | 4.5-6.0s | 1.8-2.2s | -3.0s |
| INP | 250-400ms | 100-180ms | -150ms |
| CLS | 0.3-0.5 | <0.1 | -0.3 |
| TBT | 1200-2000ms | 200-400ms | -1000ms |

---

## What's Already Working

✅ **Brotli compression** (686KB → 2.5KB)
✅ **CDN caching** (s-maxage=31536000)
✅ **WebP images** (modern format)
✅ **Hostinger CDN** with edge caching

---

## Verification Commands

After implementing fixes:

```bash
# PageSpeed Insights
"$HOME/.claude/skills/seo/bin/claude-seo" run pagespeed_check.py https://titangrowthhub.com/

# Local Lighthouse
npx lighthouse https://titangrowthhub.com/ --output html --preset=desktop

# Web Vitals monitoring
npm install web-vitals
```

---

## Summary

The site has solid infrastructure but is severely hampered by **WordPress/Elementor bloat**:
- 34 synchronous scripts
- 33 blocking stylesheets
- Zero image dimensions

**Priority:** Fix Phase 1 (image dimensions + defer JS + preload hero) for 50-70% improvement in all Core Web Vitals.

**Total Effort:** 15-25 hours for complete optimization