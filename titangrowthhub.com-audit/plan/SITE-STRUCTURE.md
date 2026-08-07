# Site Architecture & URL Hierarchy: titangrowthhub.com
**Strategy:** Crawler Efficiency & Siloed Pillar Structure

---

## 🏛️ Site Structure Map

```
/ (Home - Primary Landings & Brand)
├── /about-us (Agency Credentials, Years of Experience)
├── /our-services (Core Portfolio of Offerings)
│   ├── /services/seo (SEO Campaigns & Optimization)
│   ├── /services/web-design (Next.js & Custom Coding)
│   ├── /services/branding (Corporate Identity)
│   └── /services/digital-marketing (PPC, Lead Gen)
├── /our-team (Entity profiles, E-E-A-T signals)
├── /case-studies (Client metrics, results proof)
│   ├── /case-studies/lead-gen-growth-project
│   └── /case-studies/headless-migration-performance
├── /blog (Insight, Trends, Algorithm News)
│   ├── /blog/how-headless-improves-conversion
│   └── ...
├── /contact-us (Audit Request & Budget Selection)
├── /faqs (Single Accordion Q&A UI)
└── /llms.txt (AI Search parsing index)
```

---

## 🔗 Internal Linking Rules
1. **Vertical Siloing:** All sub-service pages must link back to `/our-services` or the parent category.
2. **Contextual Anchors:** Blog posts must contextually link to corresponding services using descriptive anchors (e.g. use "SEO Services" instead of "click here").
3. **Short Routing Cycles:** Keep user and search crawler crawl-hops under 3 clicks from homepage to any destination page.
