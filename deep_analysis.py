#!/usr/bin/env python
"""Deep visual analysis of a site."""

from playwright.sync_api import sync_playwright
import json
import os

URL = "https://titangrowthhub.com/"
OUTPUT_DIR = r"C:\Users\Khadija\OneDrive\Desktop\GAME\backend\screenshots"

def deep_analysis():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # ---- DESKTOP ANALYSIS ----
        print("=" * 60)
        print("DESKTOP ANALYSIS (1920x1080)")
        print("=" * 60)
        ctx_desktop = browser.new_context(viewport={"width": 1920, "height": 1080})
        desk = ctx_desktop.new_page()
        desk.goto(URL, wait_until="networkidle", timeout=30000)

        # Full-page desktop
        desk.screenshot(path=os.path.join(OUTPUT_DIR, "desktop_fullpage.png"), full_page=True)
        desk.set_viewport_size({"width": 1920, "height": 1080})
        desk.screenshot(path=os.path.join(OUTPUT_DIR, "desktop_atf.png"), full_page=False)
        print("Desktop screenshots captured")

        # H1 analysis
        h1_count = desk.locator("h1").count()
        print(f"\nH1 elements count: {h1_count}")
        for i in range(h1_count):
            el = desk.locator("h1").nth(i)
            try:
                bbox = el.bounding_box()
                text = el.text_content()
                print(f"  H1[{i}]: '{text.strip()[:80]}' | bbox: {bbox}")
                if bbox and bbox['y'] < 1080:
                    print(f"    -> VISIBLE above fold (y={bbox['y']:.0f})")
                elif bbox:
                    print(f"    -> BELOW fold (y={bbox['y']:.0f})")
            except Exception as e:
                print(f"  H1[{i}]: error - {e}")

        # Heading hierarchy
        print("\nHeading hierarchy (desktop):")
        for tag in ["h1", "h2", "h3"]:
            count = desk.locator(tag).count()
            if count > 0:
                for i in range(min(count, 3)):
                    try:
                        txt = desk.locator(tag).nth(i).text_content().strip()[:60]
                        print(f"  {tag.upper()}: {txt}")
                    except:
                        pass

        # Hero / above-fold section
        print("\nAbove-fold elements (desktop y < 1080):")
        atf_data = desk.evaluate("""() => {
            const foldY = 1080;
            const elements = document.querySelectorAll('h1, h2, h3, p, a.btn, .hero, .cta, img, .banner, [class*=hero], [class*=banner]');
            const results = [];
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < foldY && rect.width > 0) {
                    results.push({
                        tag: el.tagName,
                        class: el.className.substring(0, 40),
                        text: el.textContent?.trim().substring(0, 60) || '',
                        top: Math.round(rect.top),
                        left: Math.round(rect.left),
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                        src: el.src || el.href || ''
                    });
                }
            });
            return results;
        }""")
        for el in atf_data[:25]:
            print(f"  {el['tag']} [class={el['class']}] top={el['top']} | '{el['text'][:50]}'")

        # Navigation links
        print("\nNavigation links:")
        nav_links = desk.evaluate("""() => {
            const nav = document.querySelector('nav, header');
            if (!nav) return [];
            return Array.from(nav.querySelectorAll('a')).map(a => ({
                text: a.textContent.trim(),
                href: a.href
            })).slice(0, 15);
        }""")
        for link in nav_links:
            print(f"  {link['text']} -> {link['href']}")

        # CTA buttons
        print("\nCTA Buttons:")
        ctas = desk.evaluate("""() => {
            const els = document.querySelectorAll('a.btn, .btn, button, [class*=cta], a[href*=contact], a[href*=whatsapp]');
            return Array.from(els).slice(0, 10).map(el => ({
                tag: el.tagName,
                text: el.textContent.trim().substring(0, 50),
                class: el.className.substring(0, 50),
                href: el.href || ''
            }));
        }""")
        for cta in ctas:
            print(f"  {cta['tag']} [{cta['class']}]: '{cta['text']}' -> {cta['href']}")

        # Performance signals
        print("\nPerformance signals (desktop):")
        scripts = desk.evaluate("""() => {
            const scripts = document.querySelectorAll('script');
            let sync = 0, async_s = 0, defer_s = 0, total = scripts.length;
            scripts.forEach(s => {
                if (s.src) {
                    if (s.async) async_s++;
                    else if (s.defer) defer_s++;
                    else if (s.src) sync++;
                }
            });
            return { total, sync, async: async_s, defer: defer_s };
        }""")
        print(f"  Scripts: total={scripts['total']}, sync/blocking={scripts['sync']}, async={scripts['async']}, defer={scripts['defer']}")

        images = desk.evaluate("""() => {
            const imgs = document.querySelectorAll('img');
            let lazy = 0, eager = 0, noAlt = 0, oversized = 0;
            imgs.forEach(img => {
                if (img.loading === 'lazy') lazy++;
                else eager++;
                if (!img.alt) noAlt++;
                if (img.naturalWidth > img.clientWidth * 2) oversized++;
            });
            return { total: imgs.length, lazy, eager, noAlt, oversized };
        }""")
        print(f"  Images: total={images['total']}, lazy={images['lazy']}, eager(above fold risk)={images['eager']}, noAlt={images['noAlt']}")

        css_links = desk.evaluate("""() => {
            const links = document.querySelectorAll('link[rel=stylesheet]');
            return Array.from(links).map(l => l.href).slice(0, 10);
        }""")
        print(f"  CSS files: {len(css_links)}")
        for css in css_links[:5]:
            print(f"    {css}")

        ctx_desktop.close()

        # ---- MOBILE ANALYSIS ----
        print("\n" + "=" * 60)
        print("MOBILE ANALYSIS (375x812 - iPhone)")
        print("=" * 60)
        ctx_mobile = browser.new_context(
            viewport={"width": 375, "height": 812},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        )
        mob = ctx_mobile.new_page()
        mob.goto(URL, wait_until="networkidle", timeout=30000)

        mob.screenshot(path=os.path.join(OUTPUT_DIR, "mobile_atf.png"), full_page=False)
        mob.screenshot(path=os.path.join(OUTPUT_DIR, "mobile_fullpage.png"), full_page=True)
        print("Mobile screenshots captured")

        # H1 mobile
        h1_count_m = mob.locator("h1").count()
        print(f"\nH1 count on mobile: {h1_count_m}")
        for i in range(h1_count_m):
            el = mob.locator("h1").nth(i)
            try:
                bbox = el.bounding_box()
                text = el.text_content()
                print(f"  H1[{i}]: '{text.strip()[:80]}' | bbox: {bbox}")
                if bbox and bbox['y'] < 812:
                    print(f"    -> VISIBLE above fold on mobile (y={bbox['y']:.0f})")
                elif bbox:
                    print(f"    -> BELOW fold on mobile (y={bbox['y']:.0f})")
            except Exception as e:
                print(f"  H1[{i}]: error - {e}")

        # Mobile nav
        print("\nMobile navigation:")
        mob_nav = mob.evaluate("""() => {
            const togglers = document.querySelectorAll('.hamburger, .menu-toggle, [class*=menu-icon], [class*=nav-toggle], [aria-label*=menu], button[aria-expanded]');
            return Array.from(togglers).map(el => ({
                tag: el.tagName,
                class: el.className.substring(0, 50),
                aria: el.getAttribute('aria-label') || '',
                expanded: el.getAttribute('aria-expanded') || '',
                visible: el.getBoundingClientRect().width > 0
            }));
        }""")
        for nav in mob_nav[:5]:
            print(f"  {nav['tag']} [{nav['class']}] aria='{nav['aria']}' visible={nav['visible']}")

        # Tap target sizes on mobile
        print("\nSmall tap targets (< 48px):")
        small_targets = mob.evaluate("""() => {
            const interactive = document.querySelectorAll('a, button, [role=button], input, select');
            const small = [];
            interactive.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    if (rect.width < 48 || rect.height < 48) {
                        small.push({
                            tag: el.tagName,
                            text: el.textContent.trim().substring(0, 30),
                            w: Math.round(rect.width),
                            h: Math.round(rect.height)
                        });
                    }
                }
            });
            return small.slice(0, 15);
        }""")
        for target in small_targets:
            print(f"  {target['tag']}: '{target['text']}' w={target['w']} h={target['h']}")

        # Horizontal scroll check
        scroll_info = mob.evaluate("""() => ({
            bodyScrollWidth: document.body.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            hasHorizScroll: document.body.scrollWidth > document.documentElement.clientWidth
        })""")
        print(f"\nHorizontal scroll: {scroll_info}")

        # Font sizes
        print("\nText elements with font size < 16px (readability):")
        small_fonts = mob.evaluate("""() => {
            const els = document.querySelectorAll('body, p, span, li, a');
            const small = [];
            els.forEach(el => {
                const style = window.getComputedStyle(el);
                const size = parseFloat(style.fontSize);
                if (size < 16 && el.textContent.trim().length > 5) {
                    small.push({
                        tag: el.tagName,
                        text: el.textContent.trim().substring(0, 30),
                        fontSize: style.fontSize
                    });
                }
            });
            return small.slice(0, 10);
        }""")
        for item in small_fonts:
            print(f"  {item['tag']}: '{item['text']}' font-size={item['fontSize']}")

        # Above-fold mobile
        print("\nAbove-fold elements (mobile y < 812):")
        atf_mob = mob.evaluate("""() => {
            const foldY = 812;
            const elements = document.querySelectorAll('h1, h2, h3, .hero, .banner, [class*=hero], [class*=banner], img');
            const results = [];
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < foldY && rect.width > 0) {
                    results.push({
                        tag: el.tagName,
                        class: el.className.substring(0, 40),
                        text: el.textContent?.trim().substring(0, 60) || '',
                        top: Math.round(rect.top),
                        height: Math.round(rect.height)
                    });
                }
            });
            return results;
        }""")
        for el in atf_mob[:20]:
            print(f"  {el['tag']} top={el['top']} h={el['height']} | '{el['text'][:50]}'")

        ctx_mobile.close()

        # ---- TABLET ANALYSIS ----
        print("\n" + "=" * 60)
        print("TABLET ANALYSIS (768x1024)")
        print("=" * 60)
        ctx_tab = browser.new_context(viewport={"width": 768, "height": 1024})
        tab = ctx_tab.new_page()
        tab.goto(URL, wait_until="networkidle", timeout=30000)
        tab.screenshot(path=os.path.join(OUTPUT_DIR, "tablet_atf.png"), full_page=False)
        print("Tablet screenshot captured")

        # Check for hamburger at tablet
        tab_menu = tab.locator(".hamburger, .menu-toggle, [class*=menu-icon]").count()
        print(f"Hamburger/toggle menu at tablet: {tab_menu > 0}")

        ctx_tab.close()
        browser.close()

        print("\n" + "=" * 60)
        print("ANALYSIS COMPLETE")
        print(f"Screenshots saved to: {OUTPUT_DIR}")
        print("=" * 60)

if __name__ == "__main__":
    deep_analysis()
