#!/usr/bin/env python
"""Capture screenshots of a website for visual analysis."""

from playwright.sync_api import sync_playwright
import os

URL = "https://titangrowthhub.com/"
OUTPUT_DIR = r"C:\Users\Khadija\OneDrive\Desktop\GAME\backend\screenshots"

def capture_screenshots():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()

        # Desktop viewport (1920x1080)
        print("Capturing desktop screenshot (1920x1080)...")
        page = context.new_page()
        page.set_viewport_size({"width": 1920, "height": 1080})
        page.goto(URL, wait_until="networkidle", timeout=30000)
        page.screenshot(path=os.path.join(OUTPUT_DIR, "desktop.png"), full_page=False)
        print(f"Desktop screenshot saved")

        # Get page content for analysis
        h1_text = page.locator("h1").first.text_content() if page.locator("h1").count() > 0 else "No H1 found"
        print(f"H1 content: {h1_text}")

        # Check for main CTA buttons
        cta_selectors = ["a[href*='contact']", "a.btn", "button", ".cta", ".hero-cta"]
        ctas_found = []
        for sel in cta_selectors:
            if page.locator(sel).count() > 0:
                ctas_found.append(sel)
        print(f"CTA elements found: {ctas_found}")

        # Check navigation
        nav_exists = page.locator("nav").count() > 0 or page.locator("header").count() > 0
        print(f"Navigation present: {nav_exists}")

        # Mobile viewport (375x812 - iPhone)
        print("\nCapturing mobile screenshot (375x812)...")
        page.set_viewport_size({"width": 375, "height": 812})
        page.reload(wait_until="networkidle")
        page.screenshot(path=os.path.join(OUTPUT_DIR, "mobile.png"), full_page=False)
        print(f"Mobile screenshot saved")

        # Check mobile nav (hamburger menu)
        mobile_nav = page.locator(".hamburger, .menu-toggle, [class*='menu']").count() > 0
        print(f"Mobile menu toggle present: {mobile_nav}")

        # Check for horizontal scroll issues
        scroll_width = page.evaluate("document.body.scrollWidth")
        client_width = page.evaluate("document.documentElement.clientWidth")
        has_horizontal_scroll = scroll_width > client_width
        print(f"Horizontal scroll issue: {has_horizontal_scroll} (scrollWidth={scroll_width}, clientWidth={client_width})")

        # Check viewport meta tag
        viewport_meta = page.locator("meta[name='viewport']").count() > 0
        print(f"Viewport meta tag present: {viewport_meta}")

        # Check for lazy-loaded images above fold
        lazy_images = page.locator("img[loading='lazy']").count()
        print(f"Lazy-loaded images: {lazy_images}")

        # Check for render-blocking resources
        sync_scripts = page.locator("script:not([async]):not([defer])").count()
        print(f"Synchronous scripts (potential render blockers): {sync_scripts}")

        # Get accessibility tree for mobile
        print("\n--- Accessibility Tree (Mobile) ---")
        a11y = page.evaluate("""() => {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
            const items = [];
            let node;
            let count = 0;
            while (node = walker.nextNode()) {
                if (count++ > 50) break;
                const role = node.getAttribute?.('role') || node.tagName.toLowerCase();
                const text = node.textContent?.substring(0, 50) || '';
                const aria = node.getAttribute('aria-label') || '';
                if (role && (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE')) {
                    items.push({role, text: text.trim(), aria});
                }
            }
            return items.slice(0, 30);
        }""")
        for item in a11y[:15]:
            print(f"  {item['role']}: {item['text'][:40]} [{item['aria']}]")

        browser.close()
        print("\nScreenshots captured successfully!")

if __name__ == "__main__":
    capture_screenshots()