'use client';
import { useEffect, useRef } from 'react';

const scriptsToLoad = [
  '/wp-includes/js/dist/hooks.minaf5f.js?ver=dd5603f07f9220ed27f1',
  '/wp-includes/js/dist/i18n.min1cde.js?ver=c26c3dc7bed366793375',
  '/wp-content/plugins/contact-form-7/includes/swv/js/index1b46.js?ver=6.1.4',
  '/wp-content/plugins/contact-form-7/includes/js/index1b46.js?ver=6.1.4',
  '/wp-content/themes/avista/assets/js/bootstrap-min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/swiper.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/lenis.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/wow-min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/odometer.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/nice-select.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/jquery.marquee.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/magnific-popup.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/SplitText.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/gsap.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/customEase.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/appear67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/scrollTrigger.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/pixi.min67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/cursor67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/touchspin67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/avista-custom67b1.js?ver=6.9.5',
  '/wp-content/themes/avista/assets/js/avista-corea780.js?ver=1785262555',
  '/wp-includes/js/jquery/ui/core.minb37e.js?ver=1.13.3',
  '/wp-content/plugins/avista-core/assets/js/elh-elementa780.js?ver=1785262555'
];

export default function BootstrapScripts() {
  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    
    setTimeout(() => {
      // Add inline scripts that were in the HTML
      const inline1 = document.createElement('script');
      inline1.innerHTML = `
        const lazyloadRunObserver = () => {
            const lazyloadBackgrounds = document.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
            const lazyloadBackgroundObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let lazyloadBackground = entry.target;
                        if (lazyloadBackground) {
                            lazyloadBackground.classList.add('e-lazyloaded');
                        }
                        lazyloadBackgroundObserver.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '200px 0px 200px 0px' });
            lazyloadBackgrounds.forEach((lazyloadBackground) => {
                lazyloadBackgroundObserver.observe(lazyloadBackground);
            });
        };
        const events = ['DOMContentLoaded', 'elementor/lazyload/observe'];
        events.forEach((event) => {
            document.addEventListener(event, lazyloadRunObserver);
        });
        // Fallback for SPA
        lazyloadRunObserver();
      `;
      document.body.appendChild(inline1);

      const inline2 = document.createElement('script');
      inline2.innerHTML = `
        (function () {
            var c = document.body.className;
            c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
            document.body.className = c;
        })();
      `;
      document.body.appendChild(inline2);

      scriptsToLoad.forEach(src => {
        if (document.querySelector(`script[src='\${src}']`)) return;
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // Ensure sequential execution
        document.body.appendChild(script);
      });

      // Run trigger for resize/scroll in case animations need it
      setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('load'));
          document.dispatchEvent(new Event('DOMContentLoaded'));
          if (typeof window !== 'undefined' && (window as any).jQuery) {
              (window as any).jQuery(window).trigger('load');
              (window as any).jQuery(document).trigger('ready');
          }
      }, 1000);
    }, 300); // Wait for React hydration
  }, []);

  return null;
}
