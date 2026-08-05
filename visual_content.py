#!/usr/bin/env python
"""Extract visual content for analysis."""

from playwright.sync_api import sync_playwright
import os

URL = "https://titangrowthhub.com/"
OUTPUT_DIR = r"C:\Users\Khadija\OneDrive\Desktop\GAME\backend\screenshots"

def extract_content():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = ctx.new_page()
        page.goto(URL, wait_until="domcontentloaded", timeout=60000)

        # Extract hero content
        print("=== HERO SECTION (Above Fold) ===")
        hero = page.evaluate("""() => {
            const hero = document.querySelector('.hero, .hero-section, [class*=hero], section:first-of-type');
            if (!hero) return null;
            return {
                tag: hero.tagName,
                class: hero.className.substring(0, 50),
                text: hero.textContent.trim().substring(0, 500),
                y: hero.getBoundingClientRect().top
            };
        }""")
        print(hero)

        # Check for main CTA visibility
        print("\n=== CTA BUTTONS VISIBILITY ===")
        ctas = page.evaluate("""() => {
            const btns = document.querySelectorAll('a.btn, a[href*=contact], a[href*=call]');
            return Array.from(btns).slice(0, 5).map(b => ({
                text: b.textContent.trim(),
                href: b.href,
                visible: b.offsetParent !== null,
                y: b.getBoundingClientRect().top,
                x: b.getBoundingClientRect().left,
                w: b.getBoundingClientRect().width,
                h: b.getBoundingClientRect().height
            }));
        }""")
        for cta in ctas:
            print(f"  '{cta['text']}' at ({cta['x']:.0f}, {cta['y']:.0f}) visible={cta['visible']}")

        # Check image optimization
        print("\n=== IMAGES ABOVE FOLD (y < 1080) ===")
        images = page.evaluate("""() => {
            const imgs = document.querySelectorAll('img');
            return Array.from(imgs).filter(img => {
                const r = img.getBoundingClientRect();
                return r.top < 1080 && r.width > 0 && r.height > 0;
            }).slice(0, 15).map(img => ({
                src: img.src,
                alt: img.alt,
                loading: img.loading,
                width: img.width,
                naturalWidth: img.naturalWidth,
                clientWidth: img.clientWidth,
                y: img.getBoundingClientRect().top
            }));
        }""")
        for img in images:
            print(f"  {img['src'][:80]}")
            print(f"    alt='{img['alt']}' loading={img['loading']}")
            print(f"    natural={img['naturalWidth']}x client={img['clientWidth']} y={img['y']}")

        # Check SEO claims - look for "#1 SEO Agency" text
        print("\n=== SEO CLAIMS VERIFICATION ===")
        claims = page.evaluate("""() => {
            const text = document.body.innerText.toLowerCase();
            const claims = {
                "#1": text.includes("#1") || text.includes("# 1") || text.includes("number one"),
                "seo agency": text.includes("seo agency"),
                "pakistan": text.includes("pakistan"),
                "award": text.includes("award") || text.includes("awards"),
                "best": text.includes("best")
            };
            // Find where the claim is
            const claimMatch = text.match(/(number\\s*one|best|top\\s*ranked|leading).*(seo|digital|marketing).*(agency|firm)/i);
            return {
                found: Object.values(claims).some(v => v),
                claims: claims,
                match: claimMatch ? claimMatch[0] : null
            };
        }""")
        print(f"SEO claims found: {claims}")

        # Check schema/markup for local business
        print("\n=== STRUCTURED DATA ===")
        schema = page.evaluate("""() => {
            const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
            return scripts.map(s => {
                try {
                    return JSON.parse(s.textContent);
                } catch { return null; }
            }).filter(Boolean);
        }""")
        print(f"Schema.org scripts: {len(schema)}")
        for s in schema[:3]:
            print(f"  Type: {s.get('@type', 'unknown')}")
            print(f"  Name: {s.get('name', 'N/A')}")

        # Accessibility tree summary
        print("\n=== ACCESSIBILITY SUMMARY ===")
        a11y = page.evaluate("""() => {
            const h1s = document.querySelectorAll('h1');
            const main = document.querySelector('main');
            const nav = document.querySelector('nav, [role=navigation]');
            const footer = document.querySelector('footer');
            return {
                h1_count: h1s.length,
                has_main: main !== null,
                has_navigation: nav !== null,
                has_footer: footer !== null
            };
        }""")
        print(f"H1 count: {a11y['h1_count']}")
        print(f"Has main: {a11y['has_main']}")
        print(f"Has nav: {a11y['has_navigation']}")
        print(f"Has footer: {a11y['has_footer']}")

        ctx.close()
        browser.close()

if __name__ == "__main__":
    extract_content()
