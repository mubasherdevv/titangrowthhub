#!/usr/bin/env python3
"""Visual and Mobile Analysis Script for titangrowthhub.com"""

import asyncio
import json
import os
from playwright.async_api import async_playwright

# Configuration
URL = "https://titangrowthhub.com/"
OUTPUT_DIR = "C:/Users/Khadija/OneDrive/Desktop/GAME/backend/titangrowthhub.com-audit/screenshots"
FINDINGS_DIR = "C:/Users/Khadija/OneDrive/Desktop/GAME/backend/titangrowthhub.com-audit/findings"

# Viewports to test
VIEWPORTS = {
    "desktop": {"width": 1920, "height": 1080},
    "laptop": {"width": 1366, "height": 768},
    "tablet": {"width": 768, "height": 1024},
    "mobile": {"width": 375, "height": 812},
}

async def capture_screenshots_and_analyze():
    """Capture screenshots at multiple viewports and analyze the page."""

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(FINDINGS_DIR, exist_ok=True)

    findings = {
        "visual": {
            "above_the_fold": [],
            "mobile_responsiveness": [],
            "layout_issues": [],
            "accessibility_tree": [],
            "recommendations": []
        }
    }

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        # Navigate to the page
        print(f"Navigating to {URL}...")
        await page.goto(URL, wait_until="networkidle", timeout=60000)
        await page.wait_for_timeout(2000)  # Allow animations to settle

        # Get page title and meta info
        title = await page.title()
        print(f"Page title: {title}")

        # Check viewport meta tag
        viewport_meta = await page.query_selector('meta[name="viewport"]')
        viewport_content = await viewport_meta.get_attribute("content") if viewport_meta else None
        print(f"Viewport meta: {viewport_content}")

        # Analyze for each viewport
        for device_name, viewport in VIEWPORTS.items():
            print(f"\nAnalyzing {device_name} ({viewport['width']}x{viewport['height']})...")

            await page.set_viewport_size(viewport)
            await page.wait_for_timeout(1000)  # Allow responsive adjustments

            # Capture screenshot
            screenshot_path = os.path.join(OUTPUT_DIR, f"{device_name}.png")
            await page.screenshot(path=screenshot_path, full_page=False)
            print(f"  Screenshot saved: {screenshot_path}")

            # Above-the-fold analysis (only for desktop and mobile)
            if device_name in ["desktop", "mobile"]:
                await analyze_above_fold(page, device_name, viewport, findings)

        # Get accessibility tree
        print("\nCapturing accessibility tree...")
        try:
            a11y_tree = await page.accessibility.snapshot()
            if a11y_tree:
                a11y_path = os.path.join(OUTPUT_DIR, "accessibility-tree.json")
                with open(a11y_path, "w", encoding="utf-8") as f:
                    json.dump(a11y_tree, f, indent=2)
                print(f"  Accessibility tree saved: {a11y_path}")

                # Analyze accessibility tree for issues
                analyze_a11y_tree(a11y_tree, findings)
        except Exception as e:
            print(f"  Warning: Could not capture accessibility tree: {e}")

        # Get page metrics
        print("\nGathering page metrics...")
        metrics = await page.evaluate("""() => {
            return {
                documentHeight: document.documentElement.scrollHeight,
                viewportHeight: window.innerHeight,
                viewportWidth: window.innerWidth,
                fontSize: window.getComputedStyle(document.body).fontSize,
                h1Count: document.querySelectorAll('h1').length,
                h1Text: Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim()),
                buttons: Array.from(document.querySelectorAll('button, a[role="button"], input[type="submit"]')).length,
                links: document.querySelectorAll('a').length,
                images: document.querySelectorAll('img').length,
                imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
                fontSize16Plus: Array.from(document.querySelectorAll('*')).filter(el => {
                    const style = window.getComputedStyle(el);
                    return parseFloat(style.fontSize) >= 16;
                }).length,
                touchTargetsSmall: Array.from(document.querySelectorAll('a, button, input, select, textarea')).filter(el => {
                    const rect = el.getBoundingClientRect();
                    return rect.width < 48 || rect.height < 48;
                }).length
            };
        }""")

        print(f"  Document height: {metrics['documentHeight']}px")
        print(f"  Viewport: {metrics['viewportWidth']}x{metrics['viewportHeight']}")
        print(f"  Base font size: {metrics['fontSize']}")
        print(f"  H1 count: {metrics['h1Count']}")
        print(f"  Buttons: {metrics['buttons']}")
        print(f"  Images: {metrics['images']} ({metrics['imagesWithoutAlt']} without alt)")
        print(f"  Small touch targets: {metrics['touchTargetsSmall']}")

        # Add metrics to findings
        findings["visual"]["page_metrics"] = metrics

        # Check for common mobile issues
        await check_mobile_issues(page, findings)

        await browser.close()

    # Save findings
    findings_path = os.path.join(FINDINGS_DIR, "visual-findings.json")
    with open(findings_path, "w", encoding="utf-8") as f:
        json.dump(findings, f, indent=2)
    print(f"\nFindings saved to: {findings_path}")

    return findings

async def analyze_above_fold(page, device_name, viewport, findings):
    """Analyze above-the-fold content visibility."""

    above_fold = await page.evaluate("""(viewportHeight) => {
        const results = {
            h1Visible: false,
            h1Position: null,
            primaryCTAs: [],
            heroContent: [],
            navVisible: false,
            logoVisible: false,
            scrollPosition: window.scrollY
        };

        // Check H1 visibility
        const h1 = document.querySelector('h1');
        if (h1) {
            const rect = h1.getBoundingClientRect();
            results.h1Visible = rect.top < viewportHeight;
            results.h1Position = Math.round(rect.top);
        }

        // Check for primary CTAs (buttons/links with action text)
        const ctaPatterns = ['get started', 'sign up', 'contact', 'learn more', 'book', 'schedule', 'free', 'try', 'start'];
        const ctas = document.querySelectorAll('a, button');
        ctas.forEach(cta => {
            const text = cta.textContent.toLowerCase();
            const rect = cta.getBoundingClientRect();
            if (rect.top < viewportHeight && ctaPatterns.some(p => text.includes(p))) {
                results.primaryCTAs.push({
                    text: cta.textContent.trim().substring(0, 50),
                    visible: rect.top < viewportHeight,
                    position: Math.round(rect.top)
                });
            }
        });

        // Check navigation
        const nav = document.querySelector('nav, [role="navigation"], header nav');
        if (nav) {
            const rect = nav.getBoundingClientRect();
            results.navVisible = rect.top < viewportHeight && rect.bottom > 0;
        }

        // Check logo
        const logo = document.querySelector('img[alt*="logo"], .logo, [class*="logo"]');
        if (logo) {
            const rect = logo.getBoundingClientRect();
            results.logoVisible = rect.top < viewportHeight;
        }

        // Check hero section
        const hero = document.querySelector('[class*="hero"], #hero, .hero-section, [data-section="hero"]');
        if (hero) {
            const rect = hero.getBoundingClientRect();
            results.heroContent.push({
                visible: rect.top < viewportHeight,
                height: Math.round(rect.height),
                topPosition: Math.round(rect.top)
            });
        }

        return results;
    }""", viewport["height"])

    findings["visual"]["above_the_fold"].append({
        "device": device_name,
        "viewport": f"{viewport['width']}x{viewport['height']}",
        "analysis": above_fold
    })

    print(f"  H1 visible: {above_fold['h1Visible']} (position: {above_fold['h1Position']}px)")
    print(f"  Primary CTAs found: {len(above_fold['primaryCTAs'])}")
    print(f"  Navigation visible: {above_fold['navVisible']}")

async def check_mobile_issues(page, findings):
    """Check for common mobile-specific issues."""

    print("\nChecking mobile-specific issues...")

    # Switch to mobile viewport for checks
    await page.set_viewport_size({"width": 375, "height": 812})
    await page.wait_for_timeout(500)

    mobile_issues = await page.evaluate("""() => {
        const issues = [];

        // Check for horizontal scroll
        const hasHorizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
        if (hasHorizontalScroll) {
            issues.push({
                type: "horizontal_scroll",
                severity: "high",
                message: "Page has horizontal scroll on mobile",
                scrollWidth: document.documentElement.scrollWidth,
                viewportWidth: window.innerWidth
            });
        }

        // Check for small touch targets
        const smallTargets = [];
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
        interactiveElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if ((rect.width < 48 || rect.height < 48) && rect.width > 0 && rect.height > 0) {
                smallTargets.push({
                    tag: el.tagName,
                    text: el.textContent.trim().substring(0, 30),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                });
            }
        });

        if (smallTargets.length > 0) {
            issues.push({
                type: "small_touch_targets",
                severity: "medium",
                message: `${smallTargets.length} interactive elements have touch targets smaller than 48x48px`,
                elements: smallTargets.slice(0, 10)  // Limit to first 10
            });
        }

        // Check for fixed elements that might obstruct content
        const fixedElements = document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');
        if (fixedElements.length > 2) {
            issues.push({
                type: "multiple_fixed_elements",
                severity: "low",
                message: `${fixedElements.length} fixed-position elements found`,
                count: fixedElements.length
            });
        }

        // Check text size
        const smallText = [];
        document.querySelectorAll('p, span, a, li, h2, h3, h4, h5, h6').forEach(el => {
            const style = window.getComputedStyle(el);
            const fontSize = parseFloat(style.fontSize);
            if (fontSize < 16 && fontSize > 0) {
                smallText.push({
                    tag: el.tagName,
                    fontSize: fontSize,
                    text: el.textContent.trim().substring(0, 30)
                });
            }
        });

        if (smallText.length > 5) {
            issues.push({
                type: "small_text",
                severity: "medium",
                message: `${smallText.length} text elements have font size below 16px`,
                examples: smallText.slice(0, 5)
            });
        }

        // Check for hamburger menu on mobile
        const hamburger = document.querySelector('[class*="hamburger"], [class*="menu-toggle"], [aria-label*="menu"], [aria-label*="navigation"]');
        issues.push({
            type: "mobile_navigation",
            severity: "info",
            message: "Mobile navigation check",
            hasHamburgerMenu: !!hamburger,
            hamburgerVisible: hamburger ? hamburger.getBoundingClientRect().width > 0 : false
        });

        return issues;
    }""")

    findings["visual"]["mobile_responsiveness"] = mobile_issues

    for issue in mobile_issues:
        print(f"  [{issue['severity'].upper()}] {issue['message']}")

def analyze_a11y_tree(a11y_tree, findings):
    """Analyze accessibility tree for issues."""

    issues = []

    def traverse_tree(node, depth=0):
        if not node:
            return

        # Check for missing labels
        if node.get("role") in ["button", "link"] and not node.get("name"):
            issues.append({
                type: "missing_accessible_name",
                role: node.get("role"),
                message: f"{node.get('role', 'element')} missing accessible name"
            })

        # Check for images without alt text
        if node.get("role") == "img" and not node.get("name"):
            issues.append({
                type: "image_missing_alt",
                message: "Image missing alternative text"
            })

        # Traverse children
        for child in node.get("children", []):
            traverse_tree(child, depth + 1)

    traverse_tree(a11y_tree)

    findings["visual"]["accessibility_tree"] = issues
    print(f"  Found {len(issues)} accessibility tree issues")

async def main():
    try:
        findings = await capture_screenshots_and_analyze()
        print("\n" + "="*60)
        print("VISUAL ANALYSIS COMPLETE")
        print("="*60)

        # Summary
        metrics = findings["visual"].get("page_metrics", {})
        print(f"\nPage Metrics Summary:")
        print(f"  H1 elements: {metrics.get('h1Count', 'N/A')}")
        print(f"  H1 text: {metrics.get('h1Text', [])}")
        print(f"  Total images: {metrics.get('images', 'N/A')}")
        print(f"  Images without alt: {metrics.get('imagesWithoutAlt', 'N/A')}")
        print(f"  Small touch targets: {metrics.get('touchTargetsSmall', 'N/A')}")

        # Above-fold summary
        print(f"\nAbove-the-Fold Analysis:")
        for item in findings["visual"]["above_the_fold"]:
            analysis = item["analysis"]
            print(f"  {item['device'].upper()}: H1 visible={analysis['h1Visible']}, CTAs={len(analysis['primaryCTAs'])}")

        # Mobile issues summary
        print(f"\nMobile Issues:")
        for issue in findings["visual"]["mobile_responsiveness"]:
            print(f"  [{issue['severity']}] {issue['type']}: {issue['message']}")

        return findings

    except Exception as e:
        print(f"Error during analysis: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    asyncio.run(main())
