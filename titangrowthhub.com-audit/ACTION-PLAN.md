# SEO Action Plan: titangrowthhub.com
**Date:** 2026-08-07  
**Strategy:** Comprehensive Technical, Schema, Content, and Performance Optimization

---

## 📅 Roadmap Overview

| Phase | Title | Timeframe | Primary Focus |
|---|---|---|---|
| **Phase 1** | **Critical Technical Fixes** | Week 1 | Duplicate canonical tags, viewport tags, metadata |
| **Phase 2** | **Schema & Brand Consolidation**| Weeks 2-3 | LocalBusiness merged, missing Service/Review schemas |
| **Phase 3** | **Content Depth & E-E-A-T** | Month 2 | Author bios, FAQ consolidation, Page-type consistency |
| **Phase 4** | **Performance & Mobile INP** | Ongoing | Dynamic scripts deferring, CSS optimization, layout shifts |

---

## 🚨 Phase 1: Critical Technical Fixes (Week 1)

### 1. Remove Duplicate Relative Canonical Tag
- **Severity:** CRITICAL
- **Issue:** The site renders two canonical tags: `https://titangrowthhub.com` (absolute) and `/` (relative). Relative canonicals confuse crawlers and can cause indexation drops.
- **Action:** Delete `<link rel="canonical" href="/"/>` from public template headers. Ensure *only* the absolute URL schema is used.
- **Location:** Check `app/(public)/layout.tsx` and the underlying `template-head.html` content source.

### 2. Remove Duplicate Viewport Meta Tag
- **Severity:** HIGH
- **Issue:** Viewport declaration is rendered twice in `<head>` (detected by visual & technical scanners). It interrupts mobile rendering engine pre-parsing.
- **Action:** Delete one copy of `<meta name="viewport" content="width=device-width, initial-scale=1"/>` from target layout templates.

### 3. Inject Missing Meta Description
- **Severity:** HIGH
- **Issue:** Meta description was initially absent or incomplete.
- **Action:** Ensure the Next.js `generateMetadata` function has fallback descriptions always available.
```html
<meta name="description" content="Titan Growth Hub is Pakistan's leading SEO & digital marketing agency. Expert web design, SEO, branding, and app development. Scale your business today.">
```

---

## ⚠️ Phase 2: Schema & Brand Consolidation (Weeks 2-3)

### 4. Merge Duplicate LocalBusiness Schemas
- **Severity:** HIGH
- **Issue:** Two differing LocalBusiness JSON-LD markup blocks exist showing matching `#localbusiness` IDs but containing conflicting data (one has Karachi location details, the other doesn't).
- **Action:** Consolidate them into a single block:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://titangrowthhub.com/#localbusiness",
  "name": "Titan Growth Hub",
  "image": "https://titangrowthhub.com/wp-content/uploads/2025/11/fevicon-1.webp",
  "url": "https://titangrowthhub.com",
  "telephone": "+92-311-2345678",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "DHA Phase 6",
    "addressLocality": "Karachi",
    "addressRegion": "Sindh",
    "postalCode": "75500",
    "addressCountry": "PK"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ]
}
```

### 5. Deploy Missing Service & Review Schemas
- **Severity:** HIGH
- **Issue:** The site lists 4 service categories and claims a "4.9 star rating" from reviews, but lacks corresponding schemas.
- **Action:** Add Service schema mappings and an `AggregateRating` schema to support stars in SERPs:
```json
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "@id": "https://titangrowthhub.com/#localbusiness"
  },
  "ratingValue": "4.9",
  "ratingCount": "1500",
  "bestRating": "5"
}
```

---

## ✍️ Phase 3: Content Depth & E-E-A-T (Month 2)

### 6. Correct "Sharah Alena" Team Data Bug
- **Severity:** HIGH
- **Issue:** All 4 team member cards display the placeholder name "Sharah Alena" and identical designs.
- **Action:** Fetch actual member details from CMS/Supabase data and populate names & individual roles dynamically.

### 7. Clean up Duplicate FAQ Sections
- **Severity:** HIGH
- **Issue:** Identical FAQ sections are rendered 3 times on the page.
- **Action:** In components rendering FAQs, keep only a single block.

### 8. Resolve Branding Inconsistency
- **Severity:** MEDIUM
- **Issue:** Site header says "Titan Growth Hub" while footer says "Avista Digital Agency".
- **Action:** Unify branding naming rules.

---

## ⚡ Phase 4: Performance & Mobile INP (Ongoing)

### 9. Optimize Mobile INP Animators
- **Severity:** MEDIUM
- **Issue:** Touch animations (Wow.js, swipers, text-marquee, tilt) can cause page interactions to lag on mobile.
- **Action:** Check inputs inside `public/wp-content/themes/avista/assets/js/avista-custom67b1.js` and use CSS styling / pointer-events: none where matching features don't require touch engagement.

### 10. Clean up Elementor Remnant Tags
- **Severity:** LOW
- **Issue:** Leftover WordPress plugins tags (WooCommerce hooks, oEmbed endpoints, rss links).
- **Action:** Filter output headers so unnecessary WordPress tags are omitted.
