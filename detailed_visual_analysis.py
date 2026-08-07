#!/usr/bin/env python3
"""Detailed Visual Analysis with specific checks for UX and mobile issues."""

import asyncio
import json
import sys
import io
from playwright.async_api import async_playwright

# Fix Windows console encoding
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

async def detailed_visual_analysis():
    """Perform detailed visual analysis on titangrowthhub.com"""

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Navigate to the page
        print("[MOBILE] Detailed Visual Analysis for https://titangrowthhub.com/")
        print("="*70)
        await page.goto("https://titangrowthhub.com/", wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(3000)

        # 1. Check for H1 tag (critical issue)
        print("\n[1] HEADING STRUCTURE ANALYSIS")
        print("-"*40)

        h1_count = await page.evaluate("""() => {
            return document.querySelectorAll('h1').length;
        }""")

        if h1_count == 0:
            print("CRITICAL: No H1 tag found on the homepage")
            print("   - This is essential for SEO and page hierarchy")
            print("   - Page title shows: 'Titan Growth Hub  SEO & Digital Marketing Agency'")

            # Check what's being used as the main heading
            headings = await page.evaluate("""() => {
                const hTags = {};
                for (let i = 1; i <= 6; i++) {
                    const tags = document.querySelectorAll('h' + i);
                    hTags['h' + i] = tags.length;
                    if (tags.length > 0) {
                        console.log(`H${i} count: ${tags.length}`);
                        tags.forEach((tag, idx) => {
                            console.log(`  H${i}-${idx + 1}: "${tag.textContent.substring(0, 50)}..."`);
                        });
                    }
                }
                return hTags;
            }""")

            print(f"   - Heading distribution: {json.dumps(headings, indent=2)}")
        else:
            print(f"Found {h1_count} H1 tag(s)")

        # 2. Check viewport configuration
        print("\n[2] VIEWPORT & MOBILE CONFIGURATION")
        print("-"*40)

        viewport_meta = await page.query_selector('meta[name="viewport"]')
        if viewport_meta:
            content = await viewport_meta.get_attribute("content")
            print(f"Viewport meta tag: {content}")
            if "width=device-width, initial-scale=1" in content:
                print("   - Proper mobile-first viewport configuration")
        else:
            print("No viewport meta tag found")

        # 3. Check mobile navigation
        print("\n[3] MOBILE NAVIGATION")
        print("-"*40)

        # Check for hamburger menu
        hamburger_selectors = [
            '[class*="hamburger"]',
            '[class*="menu-toggle"]',
            '[aria-label*="menu"]',
            '[aria-label*="navigation"]',
            'button:has(svg)',
            '[data-menu-button]'
        ]

        hamburger_found = False
        for selector in hamburger_selectors:
            element = await page.query_selector(selector)
            if element:
                is_visible = await page.evaluate("""(el) => {
                    const rect = el.getBoundingClientRect();
                    return rect.width > 0 && rect.height > 0;
                }""", element)
                if is_visible:
                    hamburger_found = True
                    print(f"Hamburger menu found with selector: {selector}")
                    break

        if not hamburger_found:
            print("No visible hamburger menu found - check mobile navigation layout")

        # 4. Analyze button/CTA prominence
        print("\n[4] BUTTON & CTA ANALYSIS")
        print("-"*40)

        cta_analysis = await page.evaluate("""() => {
            const results = {
                aboveFold: [],
                mobileOptimized: [],
                tooSmall: [],
                contrastIssues: []
            };

            // Get all interactive elements
            const elements = document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]');

            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);

                // Check if above fold
                const aboveFold = rect.top < window.innerHeight;

                // Check size
                const isSmall = rect.width < 48 || rect.height < 48;

                // Check contrast (simplified)
                const bgColor = style.backgroundColor;
                const textColor = style.color;

                // Primary CTA detection based on text
                const text = el.textContent.toLowerCase().trim();
                const isPrimaryCTA = [
                    'get started', 'sign up', 'contact', 'book', 'schedule',
                    'free', 'try', 'start', 'learn more', 'download'
                ].some(keyword => text.includes(keyword));

                if (aboveFold && isPrimaryCTA) {
                    results.aboveFold.push({
                        text: el.textContent.trim().substring(0, 30),
                        size: `${Math.round(rect.width)}x${Math.round(rect.height)}px`,
                        position: `${Math.round(rect.top)}px from top`
                    });
                }

                if (isSmall && rect.width > 0 && rect.height > 0) {
                    results.tooSmall.push({
                        text: el.textContent.trim().substring(0, 30) || el.outerHTML.substring(0, 30),
                        size: `${Math.round(rect.width)}x${Math.round(rect.height)}px`
                    });
                }
            });

            return results;
        }""")

        print(f"   Primary CTAs above fold: {len(cta_analysis['aboveFold'])}")
        if cta_analysis['aboveFold']:
            print("   - Top CTAs:")
            for cta in cta_analysis['aboveFold'][:3]:
                print(f"     '{cta['text']}' - {cta['size']} - {cta['position']}")

        print(f"   Touch targets too small: {len(cta_analysis['tooSmall'])}")
        if cta_analysis['tooSmall']:
            print("   - Examples of small touch targets:")
            for target in cta_analysis['tooSmall'][:3]:
                print(f"     '{target['text']}' - {target['size']}")

        # 5. Text readability analysis
        print("\n[5] TEXT READABILITY ANALYSIS")
        print("-"*40)

        readability = await page.evaluate("""() => {
            const results = {
                smallTextElements: 0,
                lineHeightIssues: 0,
                contrastIssues: 0,
                fontSizeDistribution: {}
            };

            // Check body text elements
            const textElements = document.querySelectorAll('p, span, li, h2, h3, h4, h5, h6, div');

            textElements.forEach(el => {
                const style = window.getComputedStyle(el);
                const fontSize = parseFloat(style.fontSize);

                // Track font size distribution
                const sizeKey = fontSize < 12 ? 'tiny' :
                               fontSize < 16 ? 'small' :
                               fontSize < 20 ? 'medium' :
                               fontSize < 24 ? 'large' : 'xlarge';

                results.fontSizeDistribution[sizeKey] = (results.fontSizeDistribution[sizeKey] || 0) + 1;

                // Check for small text
                if (fontSize < 16 && fontSize > 0) {
                    results.smallTextElements++;
                }

                // Check line height
                const lineHeight = parseFloat(style.lineHeight);
                if (lineHeight < 1.2) {
                    results.lineHeightIssues++;
                }
            });

            return results;
        }""")

        print(f"   Text elements with font size <16px: {readability['smallTextElements']}")
        print(f"   Font size distribution: {json.dumps(readability['fontSizeDistribution'], indent=2)}")

        # 6. Image quality and rendering analysis
        print("\n[6] IMAGE RENDERING ANALYSIS")
        print("-"*40)

        image_analysis = await page.evaluate("""() => {
            const results = {
                totalImages: 0,
                imagesAboveFold: 0,
                lazyLoaded: 0,
                responsiveImages: 0,
                highResImages: 0
            };

            const images = document.querySelectorAll('img');
            results.totalImages = images.length;

            images.forEach(img => {
                const rect = img.getBoundingClientRect();
                const style = window.getComputedStyle(img);

                // Check if above fold
                if (rect.top < window.innerHeight) {
                    results.imagesAboveFold++;
                }

                // Check for lazy loading
                if (img.loading === 'lazy' || img.hasAttribute('data-lazy')) {
                    results.lazyLoaded++;
                }

                // Check for responsive attributes
                if (img.hasAttribute('srcset') || style.maxWidth === '100%') {
                    results.responsiveImages++;
                }

                // Check image dimensions vs displayed size
                const naturalWidth = img.naturalWidth;
                const displayWidth = rect.width;
                if (naturalWidth > displayWidth * 2) {
                    results.highResImages++;
                }
            });

            return results;
        }""")

        print(f"   Total images: {image_analysis['totalImages']}")
        print(f"   Images above fold: {image_analysis['imagesAboveFold']}")
        print(f"   Responsive images: {image_analysis['responsiveImages']}")
        print(f"   Lazy-loaded images: {image_analysis['lazyLoaded']}")
        print(f"   High-res images: {image_analysis['highResImages']}")

        # 7. Check for common visual issues
        print("\n[7] VISUAL LAYOUT ISSUES")
        print("-"*40)

        layout_issues = await page.evaluate("""() => {
            const issues = [];

            // Check for horizontal scroll
            const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
            if (hasHorizontalScroll) {
                issues.push({
                    type: 'horizontal_scroll',
                    severity: 'high',
                    message: `Page has horizontal scroll (${document.documentElement.scrollWidth}px > ${window.innerWidth}px)`
                });
            }

            // Check for fixed elements that might block content
            const fixedElements = document.querySelectorAll('[style*="position: fixed"]');
            if (fixedElements.length > 2) {
                issues.push({
                    type: 'too_many_fixed_elements',
                    severity: 'low',
                    message: `${fixedElements.length} fixed-position elements found`
                });
            }

            return issues;
        }""")

        if layout_issues:
            print(f"   Found {len(layout_issues)} layout issues:")
            for issue in layout_issues:
                print(f"     [{issue['severity'].upper()}] {issue['message']}")
        else:
            print("   No major layout issues detected")

        # 8. Responsive design check
        print("\n[8] RESPONSIVE DESIGN TESTING")
        print("-"*40)

        # Test multiple breakpoints
        breakpoints = [
            {"name": "Desktop", "width": 1920, "height": 1080},
            {"name": "Laptop", "width": 1366, "height": 768},
            {"name": "Tablet", "width": 768, "height": 1024},
            {"name": "Mobile", "width": 375, "height": 812}
        ]

        for bp in breakpoints:
            await page.set_viewport_size(bp)
            await page.wait_for_timeout(500)

            issues = await page.evaluate(f"""(bpName) => {{
                const width = {bp['width']};
                const issues = [];

                // Check for text overflow
                const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
                textElements.forEach(el => {{
                    if (el.scrollWidth > el.clientWidth && el.clientWidth > 0) {{
                        issues.push(`Text overflow detected at ${bpName}`);
                    }}
                }});

                // Check for images exceeding container
                const images = document.querySelectorAll('img');
                images.forEach(img => {{
                    if (img.naturalWidth > width && !img.style.maxWidth) {{
                        issues.push(`Large image may not be responsive at ${bpName}`);
                    }}
                }});

                return issues;
            }}""", bp['name'])

            if issues:
                print(f"   Issues at {bp['name']} ({bp['width']}x{bp['height']}):")
                for issue in issues[:2]:
                    print(f"     - {issue}")
            else:
                print(f"   {bp['name']} ({bp['width']}x{bp['height']}): No issues")

        await browser.close()

        # Summary
        print("\n" + "="*70)
        print("VISUAL ANALYSIS SUMMARY")
        print("="*70)

        critical_issues = []
        if h1_count == 0:
            critical_issues.append("No H1 heading")
        if readability['smallTextElements'] > 50:
            critical_issues.append(f"{readability['smallTextElements']} text elements too small (<16px)")
        if len(cta_analysis['tooSmall']) > 30:
            critical_issues.append(f"{len(cta_analysis['tooSmall'])} small touch targets")

        if critical_issues:
            print("CRITICAL ISSUES:")
            for issue in critical_issues:
                print(f"   - {issue}")
        else:
            print("No critical visual issues detected")

        print(f"\nRECOMMENDATIONS:")
        if h1_count == 0:
            print("1. Add a proper H1 heading for SEO and accessibility")
        if readability['smallTextElements'] > 50:
            print("2. Increase font sizes for better mobile readability")
        if len(cta_analysis['tooSmall']) > 30:
            print("3. Increase touch target sizes to at least 48x48px for mobile")

        print("\nACTION ITEMS:")
        print("1. Add H1 heading with main page message")
        print("2. Audit all touch targets for mobile compliance")
        print("3. Test font sizes across all breakpoints")
        print("4. Verify hamburger menu is properly implemented on mobile")

async def main():
    try:
        await detailed_visual_analysis()
    except Exception as e:
        print(f"Error during analysis: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main())