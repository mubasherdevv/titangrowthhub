import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';
import { localBusinessSchema } from '@/lib/pageSchemas';
import { getSiteSettings } from '@/lib/getSiteSettings';
import { injectDynamicSettings } from '@/lib/htmlHelper';

export async function generateMetadata() {

    const { title, description } = await getPageMeta(

        'home',

        'Titan Growth Hub – Pakistan\'s Leading SEO & Digital Marketing Agency',

        'Titan Growth Hub helps businesses scale with data-driven SEO, PPC, and content marketing strategies.'

    );

    return { title, description };


}



const pageHtml = `

    <div class="page-wrapper">

        <!-- preloader start -->
        <div class="as-preloader as-home-1">
            <div class="as-preloader-wrap">
                <div class="loader as-h-1">
                    <span class="loader_letter">L</span>
                                                 <img loading="lazy" src="../website_assets/favicon_io/android-chrome-192x192.png"
                        alt="Titan Growth Hub Favicon">
                                    </span>
                <span class="loader_letter">A</span>
                <span class="loader_letter">D</span>
                <span class="loader_letter">I</span>
                <span class="loader_letter">N</span>
                <span class="loader_letter">G</span>
                <span class="loader_letter">.</span>
                <span class="loader_letter">.</span>
                <span class="loader_letter">.</span>
            </div>
        </div>
    </div>
        <!-- preloader end -->

    <!-- back-to-top-button-start -->
        <div class="wa-back-to-top wa_backToTop">
        <i class="fa-solid fa-angle-up"></i>
    </div>
        <!-- back-to-top-button-end -->

    <!-- header start -->
    											<div data-elementor-type="wp-post" data-elementor-id="2582" class="elementor elementor-2582">
				<div class="elementor-element elementor-element-1c910d8 e-con-full e-flex e-con e-parent" data-id="1c910d8" data-element_type="container">
				<div class="elementor-element elementor-element-a98b99b elementor-widget elementor-widget-tx_headers elh-el tx_headers" data-id="a98b99b" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_headers.default">
				<div class="elementor-widget-container">
					
<header class="as-header-1-area tx-header  has-inner-page ">
    <div class="container as-container-1 text-right">
        <div class="as-header-1-wrap">

            <!-- menu -->
            <nav class="as-main-navigation as-header-1-menu d-none d-lg-block">
            <div class="menu-main-menu-container">
                <ul id="main-nav" class="nav navbar-nav menu_1_split">
                    <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/">Home</a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/about">About</a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page dropdown">
                        <a href="/our-services">Services</a>
                        <ul class="dropdown-menu clearfix">
                            <li class="menu-item"><a href="/our-services">Services</a></li>
                            <li class="menu-item"><a href="/services/smart-schedule-control">Service Details</a></li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/our-team">Team</a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page dropdown">
                        <a href="/blog">Blog</a>
                        <ul class="dropdown-menu clearfix">
                            <li class="menu-item"><a href="/blog">Blog</a></li>
                            <li class="menu-item"><a href="/blog/how-businesses-can-leverage-data-for-smarter-decisions">Blog Details</a></li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/contact-us">Contact</a></li>
                </ul>
            </div>
            </nav>

            <div class="as-header-1-menu-toggle-btn">
                <span></span>
                <span></span>
            </div>

            <!-- action-link -->
            <div class="as-header-1-action-link">

                                <a href="../contact-us/index.html"
                target="_self"
                rel=""
                aria-label="Get started" class="as-pr-btn-1 wa_btn_split_1 wa_magnetic_btn_1">
                    <span class="text">
                        Get started                                            </span>
                </a>
                
                <!-- offcanvas-btn -->
                <button type="button" aria-label="name" class="sr-offcanvas-btn-1 offcanvas_toggle d-xl-none d-inline-block">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>
        </div>
    </div>
    <a href="../index.html" aria-label="fevicon-1" class="as-header-1-logo">
                <img loading="lazy" src="../wp-content/uploads/2025/10/h1-favicon-shape.webp" alt="h1-favicon-shape" class="bg-shape">
        
                <img loading="lazy" src="../website_assets/favicon_io/android-chrome-192x192.png"
        alt="Titan Growth Hub Favicon">
            </a>
</header>
                        <div class="wa-offcanvas-area offcanvas_box_active lenis lenis-smooth ">
                            <div class="wa-offcanvas-wrap ">
                                <!-- top -->
                                <div class="wa-offcanvas-top">
                                    <a href="/" class="tx-logo wa-offcanvas-top-logo" aria-label="Site Logo">
                                        <img loading="lazy" src="/wp-content/uploads/2025/11/logo-1.webp" alt="Partner Logo">
                                    </a>

                                    <!-- close-btn -->
                                    <button class="wa-offcanvas-close offcanvas_box_close" aria-label="name">
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>

                                <!-- mobile-menu-list -->
                                <nav class="mobile-main-navigation mb-50 d-block d-lg-block">
            <div class="menu-main-menu-container">
                <ul id="m-main-nav" class="nav navbar-nav clearfix list-unstyled">
                    <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/">Home</a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/about">About</a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page dropdown">
                        <a href="/our-services">Services</a>
                        <ul class="dropdown-menu">
                            <li class="menu-item"><a href="/our-services">Services</a></li>
                            <li class="menu-item"><a href="/services/smart-schedule-control">Service Details</a></li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/our-team">Team</a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page dropdown">
                        <a href="/blog">Blog</a>
                        <ul class="dropdown-menu">
                            <li class="menu-item"><a href="/blog">Blog</a></li>
                            <li class="menu-item"><a href="/blog/how-businesses-can-leverage-data-for-smarter-decisions">Blog Details</a></li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="/contact-us">Contact</a></li>
                </ul>
            </div>
        </nav>

                                <div class="wa-offcanvas-gallery">
                                    <h6 class="wa-offcanvas-gallery-title as-h-1">Stay Inspired with Instagram</h6>

                                    <div class="wa-offcanvas-gallery-grid">
                                        <a href="/wp-content/uploads/2025/10/p1-img-1.webp" aria-label=""
                                            class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                                            <img loading="lazy" src="/wp-content/uploads/2025/10/p1-img-1.webp" alt="Titan Growth Hub Image">
                                        </a>
                                        <a href="/wp-content/uploads/2025/10/p1-img-2.webp" aria-label=""
                                            class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                                            <img loading="lazy" src="/wp-content/uploads/2025/10/p1-img-2.webp" alt="Titan Growth Hub Image">
                                        </a>
                                        <a href="/wp-content/uploads/2025/10/p1-img-4.webp" aria-label=""
                                            class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                                            <img loading="lazy" src="/wp-content/uploads/2025/10/p1-img-4.webp" alt="Titan Growth Hub Image">
                                        </a>
                                        <a href="/wp-content/uploads/2025/10/p1-img-3.webp" aria-label=""
                                            class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                                            <img loading="lazy" src="/wp-content/uploads/2025/10/p1-img-3.webp" alt="Titan Growth Hub Image">
                                        </a>
                                    </div>
                                </div>

                                <!-- social -->
                                <div class="wa-offcanvas-social">
                                    <h6 class="wa-offcanvas-social-title as-h-1">
                                        We're on social media: </h6>

                                    <div class="wa-offcanvas-social-flex d-flex flex-wrap">
                                        <a class="wa-offcanvas-social-link" href="#" target="_self" rel=""
                                            aria-label="name">
                                            <i aria-hidden="true" class="fab fa-linkedin-in"></i> </a>
                                        <a class="wa-offcanvas-social-link" href="#" target="_self" rel=""
                                            aria-label="name">
                                            <i aria-hidden="true" class="fab fa-facebook-f"></i> </a>
                                        <a class="wa-offcanvas-social-link" href="#" target="_self" rel=""
                                            aria-label="name">
                                            <i aria-hidden="true" class="fab fa-x-twitter"></i> </a>
                                        <a class="wa-offcanvas-social-link" href="#" target="_self" rel=""
                                            aria-label="name">
                                            <i aria-hidden="true" class="fab fa-instagram"></i> </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- header end -->

        <div class="wa-overly"></div>

        <!-- wrapper-box start -->
        <div data-elementor-type="wp-page" data-elementor-id="15" class="elementor elementor-15">
            <div class="elementor-element elementor-element-28d0117 e-con-full e-flex e-con e-parent" data-id="28d0117"
                data-element_type="container">
                <div class="elementor-element elementor-element-0026939 elementor-widget elementor-widget-tx_hero_section elh-el tx_hero_section"
                    data-id="0026939" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                    data-widget_type="tx_hero_section.default">
                    <div class="elementor-widget-container">
                        <section class="as-hero-1-area  wa-fix wa-p-relative wa_tilt "
                            data-heroImgUrl="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/h1-bg-noise-1.gif">
                            <div class="as-hero-1-bg-color"></div>
                            <!-- Noise Canvas Overlay -->
                            <canvas id="wa_cursor_noise"></canvas>

                            <div class="as-hero-1-active">
                                <p class="as-h-1 active-text">
                                    <i aria-hidden="true" class="fas fa-circle"></i> Available for New Projects
                                </p>
                                <img loading="lazy" decoding="async" class="bg-shape"
                                    src="/wp-content/uploads/2025/10/h1-active-bg.webp" alt="h1-active-bg">
                            </div>

                            <div class="container as-container-1">
                                <div class="as-hero-1-wrap">
                                    <!-- left-content -->
                                    <div class="as-hero-1-left">

                                        <!-- marquee-text -->
                                        <div class="as-hero-1-marquee">
                                            <div class="as-hero-1-marquee-wrap wa_marquee_down_top">
                                                <p class="as-p-1 text-elm">
                                                    Web Design <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    Web Development <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    SEO <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    Digital Marketing <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    Branding <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    Web Design <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    Web Development <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    SEO <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    Digital Marketing <span>*</span> </p>
                                                <p class="as-p-1 text-elm">
                                                    Branding <span>*</span> </p>
                                            </div>
                                        </div>

                                       

                                    </div>

                                    <!-- right-content -->
                                    <div class="as-hero-1-right">

                                        <div class="as-hero-1-content">
                                            <p class="as-p-1 hero-disc wa_title_split_2" data-delay="1.5">
                                                We craft smart digital business
                                                experiences that accelerate growth and boost conversions. </p>

                                            <h2 class="tx-title as-h-1 hero-title wa_title_spilt_1">High-quality <br>
                                                Work</h2>
                                            <div class="as-hero-1-content-inner">

                                                <!-- box-content -->
                                                <div class="as-hero-1-content-box wow zoomIn" data-wow-delay=".5s">
                                                    <h5 class="as-h-1 box-title">
                                                        Need team assistance? Book a personalized call </h5>

                                                    <!-- pr-btn -->
                                                    <a href="/contact-us" target="_self" rel=""
                                                        aria-label="Schedule a call" class="as-pr-btn-1-v2 tx-button">
                                                        <span class="text">Schedule a call</span>
                                                        <span class="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                                height="100" viewBox="0 0 100 100" width="100">
                                                                <g>
                                                                    <circle cx="90.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="63.5" r="4.5"></circle>
                                                                    <circle cx="77" cy="36.5" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="50" cy="50" r="4.5"></circle>
                                                                    <circle cx="36.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="23" cy="50" r="4.5"></circle>
                                                                    <circle cx="9.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="77" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="23" r="4.5"></circle>
                                                                </g>
                                                            </svg> </span>
                                                    </a>

                                                    <p class="as-p-1 box-address">
                                                        or email us at <a
                                                            href="https://themexriver.com/cdn-cgi/l/email-protection#442d2a222b0425322d3730256a272b29"
                                                            target="_self" rel="" aria-label="info@avista.com">
                                                            <span class="__cf_email__"
                                                                data-cfemail="3a53545c557a5b4c53494e5b14595557">[email&#160;protected]</span>
                                                        </a>
                                                    </p>
                                                </div>

                                                <h4 class="as-h-1 guaranteed wa_title_spilt_1" data-delay="1.3">
                                                    Guaranteed <i aria-hidden="true"
                                                        class="flaticon flaticon-security"></i> </h4>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- hero-img -->
                                    <div class="as-hero-1-img">
                                        <div id="wa_liquid_img" class="wa_tilt_elm">
                                            <img decoding="async" class="hero-main-img"
                                                src="/wp-content/uploads/2025/10/h1-man.webp" alt="h1-man">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="elementor-element elementor-element-061f69a e-con-full e-flex e-con e-parent" data-id="061f69a"
                data-element_type="container">
                <div class="elementor-element elementor-element-e6be79f e-con-full e-flex e-con e-child"
                    data-id="e6be79f" data-element_type="container">
                    <div class="elementor-element elementor-element-60e5673 elementor-widget elementor-widget-tx_about elh-el tx_about"
                        data-id="60e5673" data-element_type="widget"
                        data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                        data-widget_type="tx_about.default">
                        <div class="elementor-widget-container">
                            <section class="as-about-1-area pt-100 pb-50 t1_ani_trigger tx-section ">
                                <div class="container as-container-1">
                                    <div class="as-about-1-wrap">
                                        <!-- left-content -->
                                        <div class="as-about-1-content">
                                            <h6 class="as-subtitle-1 tx-subTitle">
                                                <span class="icon">
                                                    {<i aria-hidden="true" class="fas fa-star"></i>} </span>
                                                About US
                                            </h6>
                                            <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">Our process is simple,
                                                purposeful, and adaptable.</h2>
                                            <div class="hr-line"></div>

                                            <p class="as-p-1 sec-disc wow fadeInUp2 tx-description">
                                                Avista Digital Agency is a creative and strategy-driven firm dedicated
                                                to helping brands thrive
                                                in the digital world. We specialize in web design, branding, digital
                                                marketing, and performance
                                                driven solutions that connect businesses with their audiences. With a
                                                focus on innovation
                                                Avista empowers companies to grow faster. </p>
                                            <div class="as-about-1-testimonial">
                                                <div class="as-author-1">
                                                    <img loading="lazy" decoding="async"
                                                        src="/wp-content/uploads/2025/10/a1-shape-1.webp"
                                                        alt="Decorative Shape" class="bg-shape-1">

                                                    <img loading="lazy" decoding="async"
                                                        src="/wp-content/uploads/2025/10/a1-shape-2.webp"
                                                        alt="Decorative Shape" class="bg-shape-2">

                                                    <div class="as-author-1-img wa-fix wa-img-cover wow fadeInRight2"
                                                        data-wow-delay="0s">
                                                        <img loading="lazy" decoding="async"
                                                            src="/wp-content/uploads/2025/10/author-1.webp" alt="Titan Growth Hub Image">
                                                    </div>
                                                    <div class="as-author-1-img wa-fix wa-img-cover wow fadeInRight2"
                                                        data-wow-delay=".1s">
                                                        <img loading="lazy" decoding="async"
                                                            src="/wp-content/uploads/2025/10/author-2.webp" alt="Titan Growth Hub Image">
                                                    </div>
                                                    <div class="as-author-1-img wa-fix wa-img-cover wow fadeInRight2"
                                                        data-wow-delay=".2s">
                                                        <img loading="lazy" decoding="async"
                                                            src="/wp-content/uploads/2025/10/author-3.webp" alt="Titan Growth Hub Image">
                                                    </div>
                                                    <div class="as-author-1-img wa-fix wa-img-cover wow fadeInRight2"
                                                        data-wow-delay=".3s">
                                                        <img loading="lazy" decoding="async"
                                                            src="/wp-content/uploads/2025/10/author-4.webp" alt="Titan Growth Hub Image">
                                                    </div>
                                                </div>

                                                <div class="right">
                                                    <div class="as-rating-1">
                                                        <div class="icon">
                                                            <i class="fa-solid fa-star wow fadeIn"
                                                                data-wow-delay=".1s"></i><i
                                                                class="fa-solid fa-star wow fadeIn"
                                                                data-wow-delay=".2s"></i><i
                                                                class="fa-solid fa-star wow fadeIn"
                                                                data-wow-delay=".3s"></i><i
                                                                class="fa-solid fa-star wow fadeIn"
                                                                data-wow-delay=".4s"></i><i
                                                                class="fa-solid fa-star wow fadeIn"
                                                                data-wow-delay=".5s"></i>
                                                        </div>
                                                        <p class="as-h-1 text wow fadeInRight2">4.9 Rating</p>
                                                    </div>
                                                    <p class="as-p-1 disc wow fadeInUp2" data-wow-delay=".3s">Depends on
                                                        1.5 k positive feedback by our clients</p>
                                                </div>

                                            </div>
                                        </div>

                                        <!-- middle -->
                                        <div class="as-about-1-middle">
                                            <h3 class="as-h-1 middle-title">
                                                Our Values </h3>

                                            <!-- faqs-accordion -->
                                            <div class="as-about-1-features">
                                                <div class="as-about-1-features-single wow fadeInUp2"
                                                    data-wow-delay=".1s">
                                                    <h3 class="item-title as-h-1 wa_magnetic_btn_1">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="Customer-Centric Mind">
                                                            Customer-Centric Mind </a>
                                                    </h3>

                                                    <p class="as-p-1 item-disc">
                                                        We put our clients at the heart of everything we do. By
                                                        understanding their needs, goals, and challenges, we create
                                                        personalized strategies and solutions that deliver real value.
                                                    </p>
                                                </div>
                                                <div class="as-about-1-features-single wow fadeInUp2"
                                                    data-wow-delay=".2s">
                                                    <h3 class="item-title as-h-1 wa_magnetic_btn_1">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="Results-Driven">
                                                            Results-Driven </a>
                                                    </h3>

                                                    <p class="as-p-1 item-disc">
                                                        Every solution is designed to create measurable business impact.
                                                    </p>
                                                </div>
                                                <div class="as-about-1-features-single wow fadeInUp2"
                                                    data-wow-delay=".3s">
                                                    <h3 class="item-title as-h-1 wa_magnetic_btn_1">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="Collaboration">
                                                            Collaboration </a>
                                                    </h3>

                                                    <p class="as-p-1 item-disc">
                                                        We work closely with clients as partners to achieve shared
                                                        success. </p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- right-title -->
                                        <div class="as-about-1-right">
                                            <h3 class="as-h-1 right-title">
                                                Expert Team </h3>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                </div>
            <div class="elementor-element elementor-element-e0519fc e-con-full e-flex e-con e-parent" data-id="e0519fc"
                data-element_type="container">
                <div class="elementor-element elementor-element-1013a04 elementor-widget elementor-widget-tx_moving_text elh-el tx_moving_text"
                    data-id="1013a04" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                    data-widget_type="tx_moving_text.default">
                    <div class="elementor-widget-container">
                        <section class="as-marquee-text-1-area wa-fix ">
                            <div class="as-marquee-text-1-wrap-1">
                                <div class="wa_marquee_left_nopause d-inline-block">
                                    <div class="as-marquee-text-1-content">
                                        <h6 class="as-h-1 text-elm">
                                            Apps Design </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Seo </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Digital Marketing </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Branding </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Web Design </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Website Marketing </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Apps Design </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Seo </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Digital Marketing </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Web Design </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                        <h6 class="as-h-1 text-elm">
                                            Website Marketing </h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">
                                    </div>
                                </div>
                            </div>

                            <div class="as-marquee-text-1-wrap-2">
                                <div class="wa_marquee_right_nopause d-inline-block">
                                    <div class="as-marquee-text-1-content">
                                        <h6 class="as-h-1 text-elm">Apps Design</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Seo</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Digital Marketing</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Branding</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Web Design</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Website Marketing</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Apps Design</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Seo</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Digital Marketing</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Branding</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                        <h6 class="as-h-1 text-elm">Website Marketing</h6>

                                        <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/star.webp" alt="Star Icon">

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="elementor-element elementor-element-c690ca5 e-con-full e-flex e-con e-parent" data-id="c690ca5"
                data-element_type="container">
                <div class="elementor-element elementor-element-d26ca27 elementor-widget elementor-widget-tx_about elh-el tx_about"
                    data-id="d26ca27" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_2&quot;}" data-widget_type="tx_about.default">
                    <div class="elementor-widget-container">
                        <section class="as-features-1-area tx-section ">
                            <div class="container as-container-1">

                                <!-- section-title -->
                                <div class="as-features-1-sec-title text-center mb-40">
                                    <h6 class="as-subtitle-1 tx-subTitle">
                                        <span class="icon">
                                            {<i aria-hidden="true" class="fas fa-star"></i>} </span>
                                        Features
                                    </h6>
                                    <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">Why should You choose Avista
                                        Digital agency?</h2>
                                    <p class="as-p-1 sec-disc tx-description">We blend design, strategy, and technology
                                        to craft solutions that truly stand out.</p>
                                </div>

                                <div class="as-features-1-wrap">

                                    <div class="as-features-1-creative wa-bg-default"
                                        data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/f1-img-1.webp" style="background-image: url('https://themexriver.com/wp/avista/wp-content/uploads/2025/10/f1-img-1.webp');">
                                        <h4 class="as-h-1 title">
                                            24/7 Creativity </h4>

                                        <p class="as-p-1 disc">
                                            Our team never runs out of fresh ideas. </p>

                                        <div class="img-elm">
                                            <img loading="lazy" decoding="async" class="wow backInUp2"
                                                src="/wp-content/uploads/2025/10/f1-img-2.webp" alt="f1-img-2">
                                        </div>

                                    </div>

                                    <div class="as-features-1-wrap-inner">

                                        <div class="as-features-1-quality wa-p-relative">
                                            <h4 class="as-h-1 title">
                                                Best Quality Product Guaranteed </h4>

                                            <p class="as-p-1 disc">
                                                Customized strategies designed around each client’s unique needs. </p>

                                            <div class="img-elm">
                                                <img loading="lazy" decoding="async" class="wow fadeInUp2"
                                                    src="/wp-content/uploads/2025/10/f1-img-3.webp" alt="f1-img-3">
                                            </div>
                                        </div>

                                        <div class="as-features-1-rating">
                                            <div class="rating-icon">
                                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                                    class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                                    class="fa-solid fa-star"></i>
                                            </div>
                                            <div class="rating-counter">
                                                <h5 class="rating-number as-h-1">
                                                    <span class="odometer" data-count="1500">0000</span>+
                                                </h5>

                                                <h5 class="as-h-1 rating-disc">Satisfied Clients</h5>
                                            </div>

                                            <div class="rating-author">
                                                <div class="rating-author-img">
                                                    <div class="img-elm wa-fix wa-img-cover wow fadeInRight2"
                                                        data-wow-delay=".1ss">
                                                        <img loading="lazy" decoding="async"
                                                            src="/wp-content/uploads/2025/10/author-1.webp" alt="Titan Growth Hub Image">
                                                    </div>
                                                    <div class="img-elm wa-fix wa-img-cover wow fadeInRight2"
                                                        data-wow-delay=".2s">
                                                        <img loading="lazy" decoding="async"
                                                            src="/wp-content/uploads/2025/10/author-2.webp" alt="Titan Growth Hub Image">
                                                    </div>
                                                    <div class="img-elm wa-fix wa-img-cover wow fadeInRight2"
                                                        data-wow-delay=".3s">
                                                        <img loading="lazy" decoding="async"
                                                            src="/wp-content/uploads/2025/10/author-3.webp" alt="Titan Growth Hub Image">
                                                    </div>
                                                    <div class="img-elm wa-fix wa-img-cover wow fadeInRight2"
                                                        data-wow-delay=".4s">
                                                        <img loading="lazy" decoding="async"
                                                            src="/wp-content/uploads/2025/10/author-4.webp" alt="Titan Growth Hub Image">
                                                    </div>
                                                </div>

                                                <p class="as-p-1 rating-author-disc">
                                                    Join <b>12,135+</b> other loving customers </p>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="as-features-1-result wa-bg-default"
                                        data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/f1-img-4.webp" style="background-image: url('https://themexriver.com/wp/avista/wp-content/uploads/2025/10/f1-img-4.webp');">
                                        <h4 class="as-h-1 title">
                                            Result-Oriented Delivery </h4>

                                        <p class="as-p-1 disc">
                                            Focused on measurable outcomes and long-term success </p>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </div>
           
            <div class="elementor-element elementor-element-fe4abe9 e-con-full e-flex e-con e-parent" data-id="fe4abe9"
                data-element_type="container">
                <div class="elementor-element elementor-element-795eb14 elementor-widget elementor-widget-tx_service_section elh-el tx_service_section"
                    data-id="795eb14" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                    data-widget_type="tx_service_section.default">
                    <div class="elementor-widget-container">
                        <section class="as-services-1-area pt-70 pb-120 tx-section ">
                            <div class="container as-container-1">
                                <div class="as-services-1-container">
                                    <!-- section-title -->
                                    <div class="as-services-1-sec-title mb-50">
                                        <div class="left">
                                            <h6 class="as-subtitle-1 tx-subTitle">
                                                <span class="icon">
                                                    {<i aria-hidden="true" class="fas fa-circle"></i>} </span>
                                                Services
                                            </h6>
                                            <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">Driving Growth Through
                                                Digital Excellence</h2>
                                        </div>

                                        <div class="img-elm wow fadeInRight2">
                                            <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/s1-img-1.webp"
                                                alt="s1-img-1">
                                        </div>

                                        <div class="right">
                                            <p class="as-p-1 sec-disc wow fadeInRight2 tx-description">
                                                At Avista Digital Agency, we provide a full range of digital solutions
                                                designed
                                                to help businesses grow, connect, and succeed. </p>

                                            <div class="btn-wrap wow fadeInRight2">
                                                <a href="/our-services" target="_self" rel=""
                                                    aria-label="More Services" class="as-pr-btn-1-v2 tx-button">
                                                    <span class="text">More Services</span>
                                                    <span class="icon">
                                                        <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                            height="100" viewBox="0 0 100 100" width="100">
                                                            <g>
                                                                <circle cx="90.5" cy="50" r="4.5"></circle>
                                                                <circle cx="77" cy="50" r="4.5"></circle>
                                                                <circle cx="77" cy="63.5" r="4.5"></circle>
                                                                <circle cx="77" cy="36.5" r="4.5"></circle>
                                                                <circle cx="63.5" cy="50" r="4.5"></circle>
                                                                <circle cx="50" cy="50" r="4.5"></circle>
                                                                <circle cx="36.5" cy="50" r="4.5"></circle>
                                                                <circle cx="23" cy="50" r="4.5"></circle>
                                                                <circle cx="9.5" cy="50" r="4.5"></circle>
                                                                <circle cx="63.5" cy="77" r="4.5"></circle>
                                                                <circle cx="63.5" cy="23" r="4.5"></circle>
                                                            </g>
                                                        </svg> </span>
                                                </a>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="as-services-1-wrap">
                                        <div class="as-services-1-item wow fadeInUp2">

                                            <ul class="wa-ul item-tags">
                                                <li class="as-p-1">
                                                    Responsive Design </li>
                                                <li class="as-p-1">
                                                    Interaction Design </li>
                                                <li class="as-p-1">
                                                    SEO Optimization </li>
                                                <li class="as-p-1">
                                                    CMS Integration </li>
                                            </ul>

                                            <img loading="lazy" decoding="async" class="star-icon"
                                                src="/wp-content/uploads/2025/10/star-icon.webp" alt="Rating Star">

                                            <div class="icon-elm">
                                                <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/s1-logo-1.webp"
                                                    alt="Service Logo">
                                            </div>

                                            <img loading="lazy" decoding="async" class="star-icon"
                                                src="/wp-content/uploads/2025/10/star-icon.webp" alt="Rating Star">

                                            <div class="right-content wa-fix">
                                                <div class="right-content-bg-img wa-fix wa-img-cover">
                                                    <img loading="lazy" decoding="async"
                                                        src="/wp-content/uploads/2025/11/s1-card-img-1.webp"
                                                        alt="Service Details">
                                                </div>
                                                <div class="title-wrap">
                                                    <h4 class="as-h-1 title">
                                                        <a href="#"
                                                            target="_self" rel=""
                                                            aria-label="Web Design &amp; Development">
                                                            Web Design &amp; Development </a>
                                                    </h4>

                                                    <h4 class="as-h-1 title">
                                                        <a href="#"
                                                            target="_self" rel=""
                                                            aria-label="Web Design &amp; Development">
                                                            <img loading="lazy" decoding="async"
                                                                src="/wp-content/uploads/2025/10/right-up.webp"
                                                                alt="right-up">
                                                            Web Design &amp; Development </a>
                                                    </h4>
                                                </div>

                                                <p class="as-p-1 number">
                                                    {01} </p>
                                            </div>
                                        </div>
                                        <div class="as-services-1-item wow fadeInUp2">

                                            <ul class="wa-ul item-tags">
                                                <li class="as-p-1">
                                                    Interaction Design </li>
                                                <li class="as-p-1">
                                                    Market Research </li>
                                                <li class="as-p-1">
                                                    SEO </li>
                                                <li class="as-p-1">
                                                    Brand Promotion </li>
                                            </ul>

                                            <img loading="lazy" decoding="async" class="star-icon"
                                                src="/wp-content/uploads/2025/10/star-icon.webp" alt="Rating Star">

                                            <div class="icon-elm">
                                                <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/s1-logo-2.webp"
                                                    alt="Service Logo">
                                            </div>

                                            <img loading="lazy" decoding="async" class="star-icon"
                                                src="/wp-content/uploads/2025/10/star-icon.webp" alt="Rating Star">

                                            <div class="right-content wa-fix">
                                                <div class="right-content-bg-img wa-fix wa-img-cover">
                                                    <img loading="lazy" decoding="async"
                                                        src="/wp-content/uploads/2025/11/s1-card-img-2.webp"
                                                        alt="Service Details">
                                                </div>
                                                <div class="title-wrap">
                                                    <h4 class="as-h-1 title">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="Digital Marketing">
                                                            Digital Marketing </a>
                                                    </h4>

                                                    <h4 class="as-h-1 title">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="Digital Marketing">
                                                            <img loading="lazy" decoding="async"
                                                                src="/wp-content/uploads/2025/10/right-up.webp"
                                                                alt="right-up">
                                                            Digital Marketing </a>
                                                    </h4>
                                                </div>

                                                <p class="as-p-1 number">
                                                    {02} </p>
                                            </div>
                                        </div>
                                        <div class="as-services-1-item wow fadeInUp2">

                                            <ul class="wa-ul item-tags">
                                                <li class="as-p-1">
                                                    App Design </li>
                                                <li class="as-p-1">
                                                    App Development </li>
                                                <li class="as-p-1">
                                                    Enterprise App Solutions </li>
                                                <li class="as-p-1">
                                                    Android </li>
                                            </ul>

                                            <img loading="lazy" decoding="async" class="star-icon"
                                                src="/wp-content/uploads/2025/10/star-icon.webp" alt="Rating Star">

                                            <div class="icon-elm">
                                                <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/s1-logo-3.webp"
                                                    alt="Service Logo">
                                            </div>

                                            <img loading="lazy" decoding="async" class="star-icon"
                                                src="/wp-content/uploads/2025/10/star-icon.webp" alt="Rating Star">

                                            <div class="right-content wa-fix">
                                                <div class="right-content-bg-img wa-fix wa-img-cover">
                                                    <img loading="lazy" decoding="async"
                                                        src="/wp-content/uploads/2025/11/s1-card-img-3.webp"
                                                        alt="Service Details">
                                                </div>
                                                <div class="title-wrap">
                                                    <h4 class="as-h-1 title">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="App Design Support">
                                                            App Design Support </a>
                                                    </h4>

                                                    <h4 class="as-h-1 title">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="App Design Support">
                                                            <img loading="lazy" decoding="async"
                                                                src="/wp-content/uploads/2025/10/right-up.webp"
                                                                alt="right-up">
                                                            App Design Support </a>
                                                    </h4>
                                                </div>

                                                <p class="as-p-1 number">
                                                    {03} </p>
                                            </div>
                                        </div>
                                        <div class="as-services-1-item wow fadeInUp2">

                                            <ul class="wa-ul item-tags">
                                                <li class="as-p-1">
                                                    Logo Design </li>
                                                <li class="as-p-1">
                                                    Brand Strategy </li>
                                                <li class="as-p-1">
                                                    Visual Identity </li>
                                                <li class="as-p-1">
                                                    CMS Integration </li>
                                            </ul>

                                            <img loading="lazy" decoding="async" class="star-icon"
                                                src="/wp-content/uploads/2025/10/star-icon.webp" alt="Rating Star">

                                            <div class="icon-elm">
                                                <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/s1-logo-4.webp"
                                                    alt="Service Logo">
                                            </div>

                                            <img loading="lazy" decoding="async" class="star-icon"
                                                src="/wp-content/uploads/2025/10/star-icon.webp" alt="Rating Star">

                                            <div class="right-content wa-fix">
                                                <div class="right-content-bg-img wa-fix wa-img-cover">
                                                    <img loading="lazy" decoding="async"
                                                        src="/wp-content/uploads/2025/11/s1-card-img-4.webp"
                                                        alt="Service Details">
                                                </div>
                                                <div class="title-wrap">
                                                    <h4 class="as-h-1 title">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="Branding">
                                                            Branding </a>
                                                    </h4>

                                                    <h4 class="as-h-1 title">
                                                        <a href="#"
                                                            target="_self" rel="" aria-label="Branding">
                                                            <img loading="lazy" decoding="async"
                                                                src="/wp-content/uploads/2025/10/right-up.webp"
                                                                alt="right-up">
                                                            Branding </a>
                                                    </h4>
                                                </div>

                                                <p class="as-p-1 number">
                                                    {04} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
            <div class="elementor-element elementor-element-051322d e-con-full e-flex e-con e-parent" data-id="051322d"
                data-element_type="container">
                <div class="elementor-element elementor-element-07da7ef elementor-widget elementor-widget-tx_pricing_section elh-el tx_pricing_section"
                    data-id="07da7ef" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                    data-widget_type="tx_pricing_section.default">
                    <div class="elementor-widget-container">
                        <section class="as-price-1-area pt-50 tx-section ">
                            <div class="container as-container-1">

                             



                                <!-- section-title -->
                                <div class="as-price-1-sec-title text-center mb-40">
                                    <h6 class="as-subtitle-1 tx-subTitle">
                                        <span class="icon">
                                            {<i aria-hidden="true" class="fas fa-circle"></i>} </span>
                                        Pricing
                                    </h6>
                                    <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">Pricing Plans.</h2>
                                    <p class="as-p-1 sec-disc wow fadeInUp2" data-wow-delay=".3s">
                                        We offer flexible subscription-based design plans,
                                        giving you unlimited access to premium creative services. </p>
                                </div>

                                <div class="as-price-1-wrap">
                                    <!-- left-screenshot -->
                                    <div class="as-price-1-left">
                                        <div class="as-price-1-ss wa_marquee_down_top">
                                            <div class="as-price-1-ss-single wa-fix wa-img-cover">
                                                <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/p1-ss-1.webp"
                                                    alt="Platform Screenshot">
                                            </div>
                                            <div class="as-price-1-ss-single wa-fix wa-img-cover">
                                                <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/p1-ss-2.webp"
                                                    alt="Platform Screenshot">
                                            </div>
                                            <div class="as-price-1-ss-single wa-fix wa-img-cover">
                                                <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/p1-ss-3.webp"
                                                    alt="Platform Screenshot">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- right-price-table -->
                                    <div class="as-price-1-right">

                                        <div class="as-price-1-card"
                                            data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/p1-card-shape.webp" style="background-image: url('https://themexriver.com/wp/avista/wp-content/uploads/2025/10/p1-card-shape.webp');">
                                            <h3 class="as-h-1 plan-name">Starter Plan</h3>

                                            <p class="as-p-1 plan-disc">A smart choice for startups that value speed,
                                                clarity, and creativity.</p>

                                            <h4 class="as-h-1 plan-price">
                                                &#036;1500<span>/session</span>
                                            </h4>

                                            <ul class="wa-ul plan-list">
                                                <li class="as-p-1">
                                                    10 design request/month </li>
                                                <li class="as-p-1">
                                                    Social Media &amp; Marketing Assets </li>
                                                <li class="as-p-1">
                                                    Conceptual sketches and mood boards </li>
                                                <li class="as-p-1">
                                                    2 Revisions per request </li>
                                                <li class="as-p-1">
                                                    5-day turnaround per request </li>
                                                <li class="as-p-1">
                                                    Pause or cancel anytime </li>
                                            </ul>

                                            <a href="/contact-us" target="_self" rel=""
                                                aria-label="Get started"
                                                class="plan-btn as-p-1 wa_btn_split_1 wa_magnetic_btn_1">
                                                <span class="text wa-fix">Get started</span>
                                                <i aria-hidden="true" class=" fas fa-long-arrow-right"></i> </a>
                                        </div>
                                        <div class="as-price-1-card"
                                            data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/p1-card-shape.webp" style="background-image: url('https://themexriver.com/wp/avista/wp-content/uploads/2025/10/p1-card-shape.webp');">
                                            <h3 class="as-h-1 plan-name">Growth Plan</h3>

                                            <p class="as-p-1 plan-disc">A smart choice for startups that value speed,
                                                clarity, and creativity.</p>

                                            <h4 class="as-h-1 plan-price">
                                                &#036;1900<span>/session</span>
                                            </h4>

                                            <ul class="wa-ul plan-list">
                                                <li class="as-p-1">
                                                    Unlimited design requests </li>
                                                <li class="as-p-1">
                                                    Web &amp; UI/UX Design </li>
                                                <li class="as-p-1">
                                                    Motion Graphics &amp; Animations </li>
                                                <li class="as-p-1">
                                                    Priority Support </li>
                                                <li class="as-p-1">
                                                    3-day turnaround per request </li>
                                                <li class="as-p-1">
                                                    Pause or cancel anytime </li>
                                            </ul>

                                            <a href="/contact-us" target="_self" rel=""
                                                aria-label="Get started"
                                                class="plan-btn as-p-1 wa_btn_split_1 wa_magnetic_btn_1">
                                                <span class="text wa-fix">Get started</span>
                                                <i aria-hidden="true" class=" fas fa-long-arrow-right"></i> </a>
                                        </div>
                                        <div class="as-price-1-card"
                                            data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/p1-card-shape.webp" style="background-image: url('https://themexriver.com/wp/avista/wp-content/uploads/2025/10/p1-card-shape.webp');">
                                            <h3 class="as-h-1 plan-name">Premium Plan</h3>

                                            <p class="as-p-1 plan-disc">Crafted for businesses with high-demand, premium
                                                design needs.</p>

                                            <h4 class="as-h-1 plan-price">
                                                &#036;2900<span>/session</span>
                                            </h4>

                                            <ul class="wa-ul plan-list">
                                                <li class="as-p-1">
                                                    Unlimited design &amp; revisions </li>
                                                <li class="as-p-1">
                                                    Web, Branding &amp; Motion Design </li>
                                                <li class="as-p-1">
                                                    Custom Illustrations &amp; 3D Graphics </li>
                                                <li class="as-p-1">
                                                    1:1 Creative Strategy Sessions </li>
                                                <li class="as-p-1">
                                                    24-48 hour turnaround </li>
                                                <li class="as-p-1">
                                                    Suitable for Anyone </li>
                                                <li class="as-p-1">
                                                    Pause or cancel anytime </li>
                                            </ul>

                                            <a href="/contact-us" target="_self" rel=""
                                                aria-label="Get started"
                                                class="plan-btn as-p-1 wa_btn_split_1 wa_magnetic_btn_1">
                                                <span class="text wa-fix">Get started</span>
                                                <i aria-hidden="true" class=" fas fa-long-arrow-right"></i> </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="elementor-element elementor-element-ac3fa96 e-con-full e-flex e-con e-parent"
                    data-id="ac3fa96" data-element_type="container">
                    <div class="elementor-element elementor-element-329ed3c elementor-widget elementor-widget-tx_team_lists elh-el tx_team_lists"
                        data-id="329ed3c" data-element_type="widget"
                        data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                        data-widget_type="tx_team_lists.default">
                        <div class="elementor-widget-container">
                            <section class="as-team-1-area pt-30 tx-section  ">
                                <div class="container as-container-1">
                                    <!-- section-title -->
                                    <div class="as-team-1-sec-title text-center mb-30">
                                        <h6 class="as-subtitle-1 tx-subTitle">
                                            <span class="icon">
                                                {<i aria-hidden="true" class="fas fa-circle"></i>} </span>
                                            Team Members
                                        </h6>

                                        <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">Experts Who Care About Your
                                            Growth</h2>
                                    </div>

                                    <div class="as-team-1-wrap">
                                        <div class="as-team-1-member-ani">
                                            <div class="as-team-1-member wa_magnetic_1_trigger">
                                                <div class="member-img wa-fix wa-img-cover wa-p-relative" style="max-width: 80%; margin: 0 auto; border-radius: 20px; overflow: hidden;">
                                                    <img loading="lazy" decoding="async" class="wa_magnetic_1_elm"
                                                        src="/wp-content/uploads/2025/10/t1-img-1.webp" alt="Team Expert">

                                                    <div class="content-wrap">
                                                        <h5 class="as-h-1 member-name">
                                                            <a href="#" target="_self"
                                                                rel="">
                                                                Sharah Alena </a>
                                                        </h5>
                                                        <p class="as-p-1 member-dg">CEO &amp; Founder</p>
                                                    </div>
                                                </div>

                                                <div class="member-social">
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-linkedin-in"></i> </a>
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-instagram"></i> </a>
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-x-twitter"></i> </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="as-team-1-member-ani">
                                            <div class="as-team-1-member wa_magnetic_1_trigger">
                                                <div class="member-img wa-fix wa-img-cover wa-p-relative" style="max-width: 80%; margin: 0 auto; border-radius: 20px; overflow: hidden;">
                                                    <img loading="lazy" decoding="async" class="wa_magnetic_1_elm"
                                                        src="/wp-content/uploads/2025/10/t1-img-2.webp" alt="Team Expert">

                                                    <div class="content-wrap">
                                                        <h5 class="as-h-1 member-name">
                                                            <a href="#" target="_self"
                                                                rel="">
                                                                Sharah Alena </a>
                                                        </h5>
                                                        <p class="as-p-1 member-dg">CEO &amp; Founder</p>
                                                    </div>
                                                </div>

                                                <div class="member-social">
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-linkedin-in"></i> </a>
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-instagram"></i> </a>
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-x-twitter"></i> </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="as-team-1-member-ani">
                                            <div class="as-team-1-member wa_magnetic_1_trigger">
                                                <div class="member-img wa-fix wa-img-cover wa-p-relative" style="max-width: 80%; margin: 0 auto; border-radius: 20px; overflow: hidden;">
                                                    <img loading="lazy" decoding="async" class="wa_magnetic_1_elm"
                                                        src="/wp-content/uploads/2025/10/t1-img-3.webp" alt="Team Expert">

                                                    <div class="content-wrap">
                                                        <h5 class="as-h-1 member-name">
                                                            <a href="#" target="_self"
                                                                rel="">
                                                                Sharah Alena </a>
                                                        </h5>
                                                        <p class="as-p-1 member-dg">CEO &amp; Founder</p>
                                                    </div>
                                                </div>

                                                <div class="member-social">
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-linkedin-in"></i> </a>
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-instagram"></i> </a>
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-x-twitter"></i> </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="as-team-1-member-ani">
                                            <div class="as-team-1-member wa_magnetic_1_trigger">
                                                <div class="member-img wa-fix wa-img-cover wa-p-relative" style="max-width: 80%; margin: 0 auto; border-radius: 20px; overflow: hidden;">
                                                    <img loading="lazy" decoding="async" class="wa_magnetic_1_elm"
                                                        src="/wp-content/uploads/2025/10/t1-img-4.webp" alt="Team Expert">

                                                    <div class="content-wrap">
                                                        <h5 class="as-h-1 member-name">
                                                            <a href="#" target="_self"
                                                                rel="">
                                                                Sharah Alena </a>
                                                        </h5>
                                                        <p class="as-p-1 member-dg">CEO &amp; Founder</p>
                                                    </div>
                                                </div>

                                                <div class="member-social">
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-linkedin-in"></i> </a>
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-instagram"></i> </a>
                                                    <a class="link-elm" href="#0" target="_self" rel=""
                                                        aria-label="name">
                                                        <i aria-hidden="true" class="fab fa-x-twitter"></i> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            
            <div class="elementor-element elementor-element-622b583 e-con-full e-flex e-con e-parent" data-id="622b583"
                data-element_type="container">
                <div class="elementor-element elementor-element-945b262 elementor-widget elementor-widget-tx_service_section elh-el tx_service_section"
                    data-id="945b262" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_3&quot;}"
                    data-widget_type="tx_service_section.default">
                    <div class="elementor-widget-container">
                        <section class="as-process-1-area wa-fix pt-110 wa-p-relative p1_pin_elm_trigger tx-section ">
                            <div class="p1_pin_elm">
                                <div class="container as-container-1 ">
                                    <div class="as-process-1-wrap">
                                        <!-- section-title -->
                                        <div class="as-process-1-sec-title ">
                                            <div class="left">
                                                <h2 class="tx-title as-sec-title-1">Our Working <br> process</h2>
                                                <p class="as-p-1 sec-disc tx-description">
                                                    We begin by listening, gaining a deep understanding of your goals,
                                                    audience, and challenges through research and conversation. </p>
                                            </div>

                                            <h6 class="as-subtitle-1 tx-subTitle">
                                                [Process] </h6>
                                        </div>

                                        <!-- right -->
                                        <div class="as-process-1-right ">
                                            <div class="as-process-1-card wa-bg-default "
                                                data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/s1-card-shape-1.webp" style="background-image: url('https://themexriver.com/wp/avista/wp-content/uploads/2025/10/s1-card-shape-1.webp');">
                                                <div class="step-x-btn">
                                                    <h4 class="as-h-1 step">
                                                        Step 01 <i aria-hidden="true"
                                                            class="fa-solid fa-star" style="color: #f65022;"></i> </h4>
                                                    <!-- pr-btn -->

                                                    <a href="#" target="_self"
                                                        rel="" aria-label="Explore" class="as-pr-btn-1-v2 tx-button">
                                                        <span class="text">
                                                            Explore </span>
                                                        <span class="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                                height="100" viewBox="0 0 100 100" width="100">
                                                                <g>
                                                                    <circle cx="90.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="63.5" r="4.5"></circle>
                                                                    <circle cx="77" cy="36.5" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="50" cy="50" r="4.5"></circle>
                                                                    <circle cx="36.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="23" cy="50" r="4.5"></circle>
                                                                    <circle cx="9.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="77" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="23" r="4.5"></circle>
                                                                </g>
                                                            </svg> </span>
                                                    </a>
                                                </div>
                                                <h4 class="as-h-1 title">Strategy &amp; Analysis</h4>

                                                <p class="as-p-1 disc">We start by understanding your business, your
                                                    goals, and your market.</p>
                                            </div>
                                            <div class="as-process-1-card wa-bg-default p1_ani_elm"
                                                data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/s1-card-shape-1.webp" style="background-image: url('https://themexriver.com/wp/avista/wp-content/uploads/2025/10/s1-card-shape-1.webp');">
                                                <div class="step-x-btn">
                                                    <h4 class="as-h-1 step">
                                                        Step 02 <i aria-hidden="true"
                                                            class="fa-solid fa-star" style="color: #f65022;"></i> </h4>
                                                    <!-- pr-btn -->

                                                    <a href="#" target="_self"
                                                        rel="" aria-label="Explore" class="as-pr-btn-1-v2 tx-button">
                                                        <span class="text">
                                                            Explore </span>
                                                        <span class="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                                height="100" viewBox="0 0 100 100" width="100">
                                                                <g>
                                                                    <circle cx="90.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="63.5" r="4.5"></circle>
                                                                    <circle cx="77" cy="36.5" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="50" cy="50" r="4.5"></circle>
                                                                    <circle cx="36.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="23" cy="50" r="4.5"></circle>
                                                                    <circle cx="9.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="77" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="23" r="4.5"></circle>
                                                                </g>
                                                            </svg> </span>
                                                    </a>
                                                </div>
                                                <h4 class="as-h-1 title">Design &amp; Development</h4>

                                                <p class="as-p-1 disc">We breathe life into concepts, creating vibrant
                                                    experiences that captivate.</p>
                                            </div>
                                            <div class="as-process-1-card wa-bg-default p1_ani_elm"
                                                data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/10/s1-card-shape-1.webp" style="background-image: url('https://themexriver.com/wp/avista/wp-content/uploads/2025/10/s1-card-shape-1.webp');">
                                                <div class="step-x-btn">
                                                    <h4 class="as-h-1 step">
                                                        Step 03 <i aria-hidden="true"
                                                            class="fa-solid fa-star" style="color: #f65022;"></i> </h4>
                                                    <!-- pr-btn -->

                                                    <a href="#" target="_self"
                                                        rel="" aria-label="Explore" class="as-pr-btn-1-v2 tx-button">
                                                        <span class="text">
                                                            Explore </span>
                                                        <span class="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                                height="100" viewBox="0 0 100 100" width="100">
                                                                <g>
                                                                    <circle cx="90.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="63.5" r="4.5"></circle>
                                                                    <circle cx="77" cy="36.5" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="50" cy="50" r="4.5"></circle>
                                                                    <circle cx="36.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="23" cy="50" r="4.5"></circle>
                                                                    <circle cx="9.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="77" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="23" r="4.5"></circle>
                                                                </g>
                                                            </svg> </span>
                                                    </a>
                                                </div>
                                                <h4 class="as-h-1 title">Enhance &amp; Evolve</h4>

                                                <p class="as-p-1 disc">We breathe life into concepts, creating vibrant
                                                    experiences tha</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 class="as-process-1-big-title as-h-1 wa_title_spilt_1">
                                Steps </h2>
                        </section>
                    </div>
                </div>
            </div>
            <div class="elementor-element elementor-element-f6b46b3 e-con-full e-flex e-con e-parent" data-id="f6b46b3"
                data-element_type="container">
                <div class="elementor-element elementor-element-b5ec9ac elementor-widget elementor-widget-tx_tabs elh-el tx_tabs"
                    data-id="b5ec9ac" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_tabs.default">
                    <div class="elementor-widget-container">
                        <section class="as-faqs-1-area pt-100 pb-110 tx-section">
                            <div class="container as-container-1">
                                <div class="as-faqs-1-wrap">
                                    <!-- left-awards -->
                                    <div class="as-faqs-1-left">
                                        <!-- section-title -->
                                        <div class="as-faqs-1-left-sec-title text-center mb-60">
                                            <h6 class="as-subtitle-1 tx-subTitle">
                                                <span class="icon">
                                                    {<i aria-hidden="true" class="fas fa-circle"></i>} </span>
                                                Awards
                                            </h6>
                                            <h2 class="tx-title as-sec-title-1">Excellence and innovation drive
                                                everything we do</h2>
                                            <p class="tx-description">
                                            </p>
                                        </div>

                                        <!-- ================= New Custom Section Start ================= -->
                                        <section class="as-features-area pt-120 pb-120 wa-fix">
                                            <div class="container as-container-1">

                                                <!-- Section Header -->
                                                <div class="row justify-content-center text-center mb-60">
                                                    <div class="col-lg-8">
                                                        <p class="as-p-1 hero-disc wa_title_split_2" data-delay=".2">
                                                            Why Work With Us
                                                        </p>
                                                        <h2 class="tx-title as-h-1 hero-title wa_title_spilt_1">
                                                            Innovative Digital Solutions For Your Business
                                                        </h2>
                                                    </div>
                                                </div>

                                             

                                                  

                                               

                                            </div>
                                        </section>
                                        <!-- ================= New Custom Section End ================= -->


                                        <!-- awards-list -->
                                        <div class="as-faqs-1-awards">
                                            <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/faqs1-illus-1.webp"
                                                alt="faqs1-illus-1" class="bg-shape-1">

                                            <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/faqs1-illus-2.webp"
                                                alt="faqs1-illus-2" class="bg-shape-2">

                                            <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/faqs1-clr.webp"
                                                alt="faqs1-clr" class="bg-shape-3">

                                            <p class="as-faqs-1-awards-single as-p-1 wow backInUp2"
                                                data-wow-delay=".1s">
                                                Best Digital Agency of the Year </p>
                                            <p class="as-faqs-1-awards-single as-p-1 wow backInUp2"
                                                data-wow-delay=".1s">
                                                Best Business Award 2024 </p>
                                            <p class="as-faqs-1-awards-single as-p-1 wow backInUp2"
                                                data-wow-delay=".1s">
                                                Featured Author in Colorlib </p>

                                        </div>

                                    </div>


                                    <!-- right-faqs -->
                                    <div class="as-faqs-1-right">
                                        <!-- section-title -->
                                        <div class="as-faqs-1-right-sec-title text-center mb-40">
                                            <h6 class="as-subtitle-1 tx-subTitle">
                                                <span class="icon">
                                                    {<i aria-hidden="true" class="fas fa-circle"></i>} </span>
                                                FAQs
                                            </h6>
                                            <h2 class="tx-title as-sec-title-1">Learn more from FAQs</h2>
                                            <p class="tx-description">
                                            </p>
                                        </div>

                                        <!-- tabs-btn -->
                                        <div class="as-faqs-1-tabs-btn" role="tablist">
                                            <button class="nav-link as-h-1 active" id="projectTab-0_3855"
                                                data-bs-toggle="tab" data-bs-target="#tab-0_3855" type="button"
                                                role="tab" aria-controls="tab-0_3855" aria-selected="true">
                                                Ask </button>
                                            <button class="nav-link as-h-1 " id="projectTab-1_3855" data-bs-toggle="tab"
                                                data-bs-target="#tab-1_3855" type="button" role="tab"
                                                aria-controls="tab-1_3855" aria-selected="false">
                                                Job Career </button>
                                            <button class="nav-link as-h-1 " id="projectTab-2_3855" data-bs-toggle="tab"
                                                data-bs-target="#tab-2_3855" type="button" role="tab"
                                                aria-controls="tab-2_3855" aria-selected="false">
                                                Pricing &amp; Plan </button>
                                            <div class="as-faqs-1-tabs-btn-line"></div>
                                        </div>

                                        <!-- tabs-pane -->
                                        <div class="tab-content as-faqs-1-tabs-pane mt-50">
                                            <div class="tab-pane fade show active" id="tab-0_3855" role="tabpanel"
                                                aria-labelledby="projectTab-0_3855">
                                                <style>
                                                    .elementor-2141 .elementor-element.elementor-element-1c790c7 {
                                                        --display: flex;
                                                    }
                                                </style>
                                                <div data-elementor-type="section" data-elementor-id="2141"
                                                    class="elementor elementor-2141">
                                                    <div class="elementor-element elementor-element-1c790c7 e-flex e-con-boxed e-con e-parent"
                                                        data-id="1c790c7" data-element_type="container">
                                                        <div class="e-con-inner">
                                                            <div class="elementor-element elementor-element-924fed3 elementor-widget elementor-widget-tx_faq elh-el tx_faq"
                                                                data-id="924fed3" data-element_type="widget"
                                                                data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                                                                data-widget_type="tx_faq.default">
                                                                <div class="elementor-widget-container">
                                                                    <div class="as-faqs-1-tabs-pane-single">
                                                                        <div class="as-accordion"
                                                                            id="accordionExample_478">
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item active wow fadeInUp2">
                                                                                <button class="item-title as-h-1 "
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-478-0"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapse-478-0">
                                                                                    <span class="text">
                                                                                        01. </span>
                                                                                    What services do you offer? <span
                                                                                        class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-478-0"
                                                                                    class="accordion-collapse collapse show"
                                                                                    aria-labelledby="heading-478-0"
                                                                                    data-bs-parent="#accordionExample_478">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-478-1"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-478-1">
                                                                                    <span class="text">
                                                                                        02. </span>
                                                                                    How long does a website project
                                                                                    take? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-478-1"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-478-1"
                                                                                    data-bs-parent="#accordionExample_478">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-478-2"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-478-2">
                                                                                    <span class="text">
                                                                                        03. </span>
                                                                                    Do you work with international
                                                                                    clients? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-478-2"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-478-2"
                                                                                    data-bs-parent="#accordionExample_478">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-478-3"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-478-3">
                                                                                    <span class="text">
                                                                                        04. </span>
                                                                                    Can you redesign my existing
                                                                                    website? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-478-3"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-478-3"
                                                                                    data-bs-parent="#accordionExample_478">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-478-4"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-478-4">
                                                                                    <span class="text">
                                                                                        05. </span>
                                                                                    How do I get started? <span
                                                                                        class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-478-4"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-478-4"
                                                                                    data-bs-parent="#accordionExample_478">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade " id="tab-1_3855" role="tabpanel"
                                                aria-labelledby="projectTab-1_3855">
                                                <style>
                                                    .elementor-2141 .elementor-element.elementor-element-1c790c7 {
                                                        --display: flex;
                                                    }
                                                </style>
                                                <div data-elementor-type="section" data-elementor-id="2141"
                                                    class="elementor elementor-2141">
                                                    <div class="elementor-element elementor-element-1c790c7 e-flex e-con-boxed e-con e-parent"
                                                        data-id="1c790c7" data-element_type="container">
                                                        <div class="e-con-inner">
                                                            <div class="elementor-element elementor-element-924fed3 elementor-widget elementor-widget-tx_faq elh-el tx_faq"
                                                                data-id="924fed3" data-element_type="widget"
                                                                data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                                                                data-widget_type="tx_faq.default">
                                                                <div class="elementor-widget-container">
                                                                    <div class="as-faqs-1-tabs-pane-single">
                                                                        <div class="as-accordion"
                                                                            id="accordionExample_575">
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item active wow fadeInUp2">
                                                                                <button class="item-title as-h-1 "
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-575-0"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapse-575-0">
                                                                                    <span class="text">
                                                                                        01. </span>
                                                                                    What services do you offer? <span
                                                                                        class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-575-0"
                                                                                    class="accordion-collapse collapse show"
                                                                                    aria-labelledby="heading-575-0"
                                                                                    data-bs-parent="#accordionExample_575">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-575-1"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-575-1">
                                                                                    <span class="text">
                                                                                        02. </span>
                                                                                    How long does a website project
                                                                                    take? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-575-1"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-575-1"
                                                                                    data-bs-parent="#accordionExample_575">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-575-2"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-575-2">
                                                                                    <span class="text">
                                                                                        03. </span>
                                                                                    Do you work with international
                                                                                    clients? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-575-2"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-575-2"
                                                                                    data-bs-parent="#accordionExample_575">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-575-3"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-575-3">
                                                                                    <span class="text">
                                                                                        04. </span>
                                                                                    Can you redesign my existing
                                                                                    website? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-575-3"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-575-3"
                                                                                    data-bs-parent="#accordionExample_575">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-575-4"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-575-4">
                                                                                    <span class="text">
                                                                                        05. </span>
                                                                                    How do I get started? <span
                                                                                        class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-575-4"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-575-4"
                                                                                    data-bs-parent="#accordionExample_575">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade " id="tab-2_3855" role="tabpanel"
                                                aria-labelledby="projectTab-2_3855">
                                                <style>
                                                    .elementor-2141 .elementor-element.elementor-element-1c790c7 {
                                                        --display: flex;
                                                    }
                                                </style>
                                                <div data-elementor-type="section" data-elementor-id="2141"
                                                    class="elementor elementor-2141">
                                                    <div class="elementor-element elementor-element-1c790c7 e-flex e-con-boxed e-con e-parent"
                                                        data-id="1c790c7" data-element_type="container">
                                                        <div class="e-con-inner">
                                                            <div class="elementor-element elementor-element-924fed3 elementor-widget elementor-widget-tx_faq elh-el tx_faq"
                                                                data-id="924fed3" data-element_type="widget"
                                                                data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                                                                data-widget_type="tx_faq.default">
                                                                <div class="elementor-widget-container">
                                                                    <div class="as-faqs-1-tabs-pane-single">
                                                                        <div class="as-accordion"
                                                                            id="accordionExample_320">
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item active wow fadeInUp2">
                                                                                <button class="item-title as-h-1 "
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-320-0"
                                                                                    aria-expanded="true"
                                                                                    aria-controls="collapse-320-0">
                                                                                    <span class="text">
                                                                                        01. </span>
                                                                                    What services do you offer? <span
                                                                                        class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-320-0"
                                                                                    class="accordion-collapse collapse show"
                                                                                    aria-labelledby="heading-320-0"
                                                                                    data-bs-parent="#accordionExample_320">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-320-1"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-320-1">
                                                                                    <span class="text">
                                                                                        02. </span>
                                                                                    How long does a website project
                                                                                    take? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-320-1"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-320-1"
                                                                                    data-bs-parent="#accordionExample_320">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-320-2"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-320-2">
                                                                                    <span class="text">
                                                                                        03. </span>
                                                                                    Do you work with international
                                                                                    clients? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-320-2"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-320-2"
                                                                                    data-bs-parent="#accordionExample_320">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-320-3"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-320-3">
                                                                                    <span class="text">
                                                                                        04. </span>
                                                                                    Can you redesign my existing
                                                                                    website? <span class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-320-3"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-320-3"
                                                                                    data-bs-parent="#accordionExample_320">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="as-accordion-item  wa_accordion_item  wow fadeInUp2">
                                                                                <button
                                                                                    class="item-title as-h-1 collapsed"
                                                                                    type="button"
                                                                                    data-bs-toggle="collapse"
                                                                                    data-bs-target="#collapse-320-4"
                                                                                    aria-expanded="false"
                                                                                    aria-controls="collapse-320-4">
                                                                                    <span class="text">
                                                                                        05. </span>
                                                                                    How do I get started? <span
                                                                                        class="icon">
                                                                                        <i class="fa-solid fa-plus"></i>
                                                                                    </span>
                                                                                </button>
                                                                                <div id="collapse-320-4"
                                                                                    class="accordion-collapse collapse "
                                                                                    aria-labelledby="heading-320-4"
                                                                                    data-bs-parent="#accordionExample_320">
                                                                                    <p class="as-p-1 item-disc">
                                                                                        Simply <a href="#"
                                                                                            aria-label="name">contact
                                                                                            us</a>
                                                                                        or send us a message. We’ll
                                                                                        schedule a quick call to learn
                                                                                        more about your goals and get
                                                                                        started with a tailored plan.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="elementor-element elementor-element-3b24732 e-con-full e-flex e-con e-parent" data-id="3b24732"
                data-element_type="container">
                <div class="elementor-element elementor-element-16844f6 elementor-widget elementor-widget-tx_cta elh-el tx_cta"
                    data-id="16844f6" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_2&quot;}" data-widget_type="tx_cta.default">
                    <div class="elementor-widget-container">
                        <section class="as-cta-2-area pt-90 tx-section ">
                            <div class="container as-container-1">
                                <div class="as-cta-2-wrap">

                                    <!-- left-content -->
                                    <div class="as-cta-2-left">
                                        <div class="as-cta-2-left-top">

                                            <div class="as-cta-2-booking">
                                                <h4 class="as-h-1 title wa_title_spilt_1">
                                                    Need more assistance? </h4>

                                                <p class="as-p-1 disc wow fadeInUp2" data-wow-delay=".2s">
                                                    Book a personalized call </p>

                                                <div class="btn-x-mail wow fadeInUp2" data-wow-delay=".3s">
                                                    <a href="/contact-us" target="_self" rel=""
                                                        aria-label="Schedule a call" class="as-pr-btn-1-v2">
                                                        <span class="text">
                                                            Schedule a call </span>

                                                        <span class="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                                height="100" viewBox="0 0 100 100" width="100">
                                                                <g>
                                                                    <circle cx="90.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="63.5" r="4.5"></circle>
                                                                    <circle cx="77" cy="36.5" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="50" cy="50" r="4.5"></circle>
                                                                    <circle cx="36.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="23" cy="50" r="4.5"></circle>
                                                                    <circle cx="9.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="77" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="23" r="4.5"></circle>
                                                                </g>
                                                            </svg> </span>
                                                    </a>

                                                    <div class="as-p-1 mail">
                                                        <p>or email us at <a href="#" aria-label="name"><span
                                                                    class="__cf_email__"
                                                                    data-cfemail="3f565159507f58525e5653115c5052">[email&#160;protected]</span></a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="as-cta-2-manager">
                                                <div class="img-elm wa-fix wa-img-cover">
                                                    <img loading="lazy" decoding="async" src="/wp-content/uploads/2025/10/author-7.webp"
                                                        alt="Team Member">
                                                </div>

                                                <h4 class="as-h-1 text-elm">
                                                    Hi <img loading="lazy" decoding="async"
                                                        src="/wp-content/uploads/2025/10/hy-icon.gif" alt="hy-icon"> I’m
                                                    Lisa, Customer Manager </h4>
                                            </div>
                                        </div>

                                        <!-- projects -->
                                        <div class="as-cta-2-projects">
                                            <div class="title-x-btn">
                                                <h4 class="as-h-1 title wa_title_spilt_1">
                                                    Check Our Projects </h4>

                                                <!-- pr-btn -->
                                                <a href="/contact-us" target="_self" rel=""
                                                    aria-label="Get started"
                                                    class="as-pr-btn-1 wa_btn_split_1 wa_magnetic_btn_1 wow fadeInRight2"
                                                    data-wow-delay=".2s">
                                                    <span class="text">
                                                        Get started </span>

                                                    <span class="icon">
                                                        <span class="icon-fix wa-fix">
                                                            <i aria-hidden="true"
                                                                class="flaticon flaticon-dot-arrow-1"></i> <i
                                                                aria-hidden="true" class="flaticon flaticon-next"></i>
                                                        </span>
                                                    </span>
                                                </a>
                                            </div>
                                            <div class="as-cta-2-projects-ss">
                                                <div class="ss-elm">
                                                    <img loading="lazy" decoding="async"
                                                        src="/wp-content/uploads/2025/10/cta2-mockup.webp"
                                                        alt="cta2-mockup">
                                                </div>

                                                <div class="ss-elm wa-fix">
                                                    <img loading="lazy" decoding="async" class="wow slideInLeft"
                                                        src="/wp-content/uploads/2025/10/cta2-ss-1.webp" alt="cta2-ss-1">
                                                </div>

                                                <div class="ss-elm wa-fix">
                                                    <img loading="lazy" decoding="async" class="wow slideInLeft" data-wow-delay=".1s"
                                                        src="/wp-content/uploads/2025/10/cta2-ss-2.webp" alt="cta2-ss-2">
                                                </div>

                                                <div class="ss-elm wa-fix">
                                                    <img loading="lazy" decoding="async" class="wow slideInLeft" data-wow-delay=".2s"
                                                        src="/wp-content/uploads/2025/10/cta2-ss-3.webp" alt="cta2-ss-3">
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- right-form -->
                                    <div class="as-cta-2-form-wrap">
                                        <div class="as-cta-2-form-content">
                                            <p class="as-p-1 subtitle"><span class="dot"></span>
                                                Response time: 1 hours </p>

                                            <h3 class="as-h-1 title">
                                                Tell details about your project </h3>
                                        </div>
                                        <div class="tx-form">

                                            <div class="wpcf7 no-js" id="wpcf7-f6-p15-o1" lang="en-US" dir="ltr"
                                                data-wpcf7-id="6">
                                                <div class="screen-reader-response">
                                                    <p role="status" aria-live="polite" aria-atomic="true"></p>
                                                    <ul></ul>
                                                </div>
                                                <form action="https://themexriver.com/wp/avista/#wpcf7-f6-p15-o1"
                                                    method="post" class="wpcf7-form init" aria-label="Contact form"
                                                    novalidate="novalidate" data-status="init">
                                                    <fieldset class="hidden-fields-container"><input type="hidden"
                                                            name="_wpcf7" value="6" /><input type="hidden"
                                                            name="_wpcf7_version" value="6.1.4" /><input type="hidden"
                                                            name="_wpcf7_locale" value="en_US" /><input type="hidden"
                                                            name="_wpcf7_unit_tag" value="wpcf7-f6-p15-o1" /><input
                                                            type="hidden" name="_wpcf7_container_post"
                                                            value="15" /><input type="hidden"
                                                            name="_wpcf7_posted_data_hash" value="" />
                                                    </fieldset>
                                                    <div class="as-cta-2-form">
                                                        <span class="wpcf7-form-control-wrap" data-name="text-60"><input
                                                                size="40" maxlength="400"
                                                                class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required as-cta-2-form-input as-p-1 wa_placeholder"
                                                                aria-required="true" aria-invalid="false"
                                                                placeholder="Full name *" value="" type="text"
                                                                name="text-60" /></span>
                                                        <span class="wpcf7-form-control-wrap"
                                                            data-name="email-60"><input size="40" maxlength="400"
                                                                class="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email as-cta-2-form-input as-p-1 wa_placeholder"
                                                                aria-required="true" aria-invalid="false"
                                                                placeholder="Your email *" value="" type="email"
                                                                name="email-60" /></span>
                                                        <div class="input-box">
                                                            <div class="nice-select as-cta-2-form-selector">
                                                                <span class="wpcf7-form-control-wrap"
                                                                    data-name="select-715"><select
                                                                        class="wpcf7-form-control wpcf7-select"
                                                                        aria-invalid="false" name="select-715">
                                                                        <option value="">Budget *</option>
                                                                        <option value="1000\$ - 1500\$">1000\$ - 1500\$
                                                                        </option>
                                                                        <option value="1500\$ - 2000\$">1500\$ - 2000\$
                                                                        </option>
                                                                        <option value="2000\$ - 2500\$">2000\$ - 2500\$
                                                                        </option>
                                                                        <option value="2500\$ - 3000\$">2500\$ - 3000\$
                                                                        </option>
                                                                    </select></span>
                                                            </div>
                                                            <div class="nice-select as-cta-2-form-selector">
                                                                <span class="wpcf7-form-control-wrap"
                                                                    data-name="select-716"><select
                                                                        class="wpcf7-form-control wpcf7-select"
                                                                        aria-invalid="false" name="select-716">
                                                                        <option value="">I’m interested in...</option>
                                                                        <option value="UI/UX Design">UI/UX Design
                                                                        </option>
                                                                        <option value="App Development">App Development
                                                                        </option>
                                                                        <option value="Website Development">Website
                                                                            Development</option>
                                                                        <option value="Digital Marketing">Digital
                                                                            Marketing</option>
                                                                    </select></span>
                                                            </div>
                                                        </div>
                                                        <span class="wpcf7-form-control-wrap"
                                                            data-name="textarea-60"><textarea cols="40" rows="10"
                                                                maxlength="2000"
                                                                class="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required as-cta-2-form-input as-p-1 wa_placeholder"
                                                                aria-required="true" aria-invalid="false"
                                                                placeholder="Your message"
                                                                name="textarea-60"></textarea></span>
                                                        <div class="form-checkbox">
                                                            <input id="checkbox" type="checkbox">
                                                            <label class="checkbox-label as-p-1"
                                                                for="checkbox">Subscribe to Newsletter</label>
                                                        </div>
                                                        <div class="button-x-author">
                                                            <div class="author">
                                                                <div class="author-img wa-img-cover wa-fix">
                                                                    <img loading="lazy" decoding="async"
                                                                        src="/wp-content/uploads/2025/10/author-5.webp"
                                                                        alt="Titan Growth Hub Image">
                                                                </div>
                                                                <div class="content">
                                                                    <h4 class="as-h-1 author-name">Liven Geo</h4>
                                                                    <p class="as-p-1 author-dg">Support Developer</p>
                                                                </div>
                                                            </div>
                                                            <button type="submit"
                                                                class="as-pr-btn-1 wa_btn_split_1 wa_magnetic_btn_1">
                                                                <span class="text">Submit Now</span>
                                                                <span class="icon">
                                                                    <span class="icon-fix wa-fix">
                                                                        <i class="flaticon-dot-arrow-1 flaticon"></i>
                                                                        <i class="flaticon-next flaticon"></i>
                                                                    </span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="wpcf7-response-output" aria-hidden="true"></div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="elementor-element elementor-element-ecca917 e-con-full e-flex e-con e-parent" data-id="ecca917"
                data-element_type="container">
                <div class="elementor-element elementor-element-8ef68ef elementor-widget elementor-widget-tx_post_grid elh-el tx_post_grid"
                    data-id="8ef68ef" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                    data-widget_type="tx_post_grid.default">
                    <div class="elementor-widget-container">
                        <section class="as-blog-1-area pt-90 pb-105 tx-section ">
                            <div class="container as-container-1">

                                <!-- section-title -->
                                <div class="as-blog-1-sec-title mb-40">
                                    <div class="left">
                                        <h6 class="as-subtitle-1 tx-subTitle">
                                            <span class="icon">
                                                {<i aria-hidden="true" class="fas fa-circle"></i>} </span>
                                            Press Release
                                        </h6>
                                        <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">A Peek at What We've Been
                                            Working on</h2>
                                    </div>

                                    <div class="right">
                                        <p class="as-p-1 sec-disc wow fadeInRight2 tx-description" data-wow-delay=".2s">
                                            At Avista Digital Agency, we provide a full range of digital solutions
                                            designed
                                            to help businesses grow, connect, and succeed. </p>

                                        <div class="btn-wrap wow fadeInLeft2" data-wow-delay=".3s">
                                            <a href="/blog" target="_self" rel="" aria-label="More Blog"
                                                class="as-pr-btn-1-v2 tx-button">
                                                <span class="text">More Blog</span>
                                                <span class="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                        height="100" viewBox="0 0 100 100" width="100">
                                                        <g>
                                                            <circle cx="90.5" cy="50" r="4.5"></circle>
                                                            <circle cx="77" cy="50" r="4.5"></circle>
                                                            <circle cx="77" cy="63.5" r="4.5"></circle>
                                                            <circle cx="77" cy="36.5" r="4.5"></circle>
                                                            <circle cx="63.5" cy="50" r="4.5"></circle>
                                                            <circle cx="50" cy="50" r="4.5"></circle>
                                                            <circle cx="36.5" cy="50" r="4.5"></circle>
                                                            <circle cx="23" cy="50" r="4.5"></circle>
                                                            <circle cx="9.5" cy="50" r="4.5"></circle>
                                                            <circle cx="63.5" cy="77" r="4.5"></circle>
                                                            <circle cx="63.5" cy="23" r="4.5"></circle>
                                                        </g>
                                                    </svg> </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="as-blog-1-wrap">

                                    <!-- left -->
                                    <div class="as-blog-1-left wa-fix wa_magnetic_1_trigger wa-fix">
                                        <div class="logo-elm">
                                            <img loading="lazy" decoding="async" class="wow fadeInUp2"
                                                src="/wp-content/uploads/2025/10/logo-1.webp" alt="Partner Logo">
                                        </div>

                                        <h4 class="as-h-1 title wa_title_spilt_1">
                                            Best Creative Agency WordPress <span>Themes</span> </h4>

                                        <svg class="as-blog-1-left-svg" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" width="475px" height="447px">
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M48.999,244.0 C50.656,244.0 51.999,245.342 51.999,247.0 C51.999,248.657 50.656,249.999 48.999,249.999 C47.343,249.999 46.0,248.657 46.0,247.0 C46.0,245.342 47.343,244.0 48.999,244.0 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M285.0,147.999 C286.656,147.999 288.0,149.343 288.0,151.0 C288.0,152.656 286.656,154.0 285.0,154.0 C283.343,154.0 281.999,152.656 281.999,151.0 C281.999,149.343 283.343,147.999 285.0,147.999 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M158.945,296.109 C159.467,296.109 159.890,296.532 159.890,297.54 C159.890,297.576 159.467,297.999 158.945,297.999 C158.423,297.999 158.0,297.576 158.0,297.54 C158.0,296.532 158.423,296.109 158.945,296.109 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M184.968,111.62 C186.56,111.62 186.937,111.943 186.937,113.30 C186.937,114.118 186.56,114.999 184.968,114.999 C183.881,114.999 183.0,114.118 183.0,113.30 C183.0,111.943 183.881,111.62 184.968,111.62 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M252.999,382.0 C254.656,382.0 256.0,383.342 256.0,385.0 C256.0,386.657 254.656,387.999 252.999,387.999 C251.343,387.999 250.0,386.657 250.0,385.0 C250.0,383.342 251.343,382.0 252.999,382.0 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M168.0,213.0 C169.656,213.0 170.999,214.342 170.999,216.0 C170.999,217.657 169.656,218.999 168.0,218.999 C166.343,218.999 165.0,217.657 165.0,216.0 C165.0,214.342 166.343,213.0 168.0,213.0 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M293.945,267.109 C294.467,267.109 294.890,267.532 294.890,268.54 C294.890,268.576 294.467,268.999 293.945,268.999 C293.423,268.999 293.0,268.576 293.0,268.54 C293.0,267.532 293.423,267.109 293.945,267.109 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M61.968,129.62 C63.56,129.62 63.937,129.944 63.937,131.31 C63.937,132.118 63.56,132.999 61.968,132.999 C60.881,132.999 60.0,132.118 60.0,131.31 C60.0,129.944 60.881,129.62 61.968,129.62 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M110.874,327.999 C109.218,327.999 107.875,329.343 107.875,330.999 C107.875,332.656 109.218,334.0 110.874,334.0 C112.531,334.0 113.874,332.656 113.874,330.999 C113.874,329.343 112.531,327.999 110.874,327.999 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M256.875,87.999 C255.218,87.999 253.874,89.343 253.874,91.0 C253.874,92.656 255.218,94.0 256.875,94.0 C258.531,94.0 259.875,92.656 259.875,91.0 C259.875,89.343 258.531,87.999 256.875,87.999 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M0.929,380.109 C0.407,380.109 0.15,380.532 0.15,381.55 C0.15,381.577 0.407,382.0 0.929,382.0 C1.451,382.0 1.875,381.577 1.875,381.55 C1.875,380.532 1.451,380.109 0.929,380.109 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M207.906,443.62 C206.818,443.62 205.937,443.943 205.937,445.30 C205.937,446.118 206.818,446.999 207.906,446.999 C208.993,446.999 209.874,446.118 209.874,445.30 C209.874,443.943 208.993,443.62 207.906,443.62 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M409.875,300.999 C408.218,300.999 406.875,302.343 406.875,304.0 C406.875,305.656 408.218,307.0 409.875,307.0 C411.531,307.0 412.874,305.656 412.874,304.0 C412.874,302.343 411.531,300.999 409.875,300.999 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M471.874,169.0 C470.218,169.0 468.875,170.342 468.875,172.0 C468.875,173.657 470.218,174.999 471.874,174.999 C473.531,174.999 474.875,173.657 474.875,172.0 C474.875,170.342 473.531,169.0 471.874,169.0 Z" />
                                            <path fill-rule="evenodd" fill="rgb(253, 63, 0)"
                                                d="M130.906,0.62 C129.818,0.62 128.937,0.943 128.937,2.31 C128.937,3.118 129.818,4.0 130.906,4.0 C131.993,4.0 132.874,3.118 132.874,2.31 C132.874,0.943 131.993,0.62 130.906,0.62 Z" />
                                        </svg>

                                        <div class="as-blog-1-left-bg-img">
                                            <div class="wa_magnetic_1_elm w-100 h-100">
                                                <img loading="lazy" decoding="async" class="wow fadeInRight2"
                                                    src="/wp-content/uploads/2025/10/b1-illus-1.webp" alt="b1-illus-1">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- right -->
                                    <div class="as-blog-1-right">

                                        <div class="as-blog-1-item wa_magnetic_1_trigger ">
                                            <div class="item-img wa-fix wa-img-cover">
                                                <img loading="lazy" decoding="async" class="wa_magnetic_1_elm"
                                                    src="/wp-content/uploads/2025/10/b1-img-1.webp" alt="b1-img-1">
                                            </div>

                                            <div class="content-wrap">
                                                <h6 class="as-p-1 categories">
                                                    <a href="category/brand-design-identity/index.html"
                                                        aria-label="Brand Design Identity">
                                                        Brand Design Identity </a>
                                                </h6>

                                                <h4 class="as-h-1 title wa_magnetic_btn_1">
                                                    <a class="wa-line-limit has-line-2"
                                                        href="#"
                                                        aria-label="How Great Design Translates into Business Success">
                                                        How Great Design Translates into Business Success </a>
                                                </h4>

                                                <p class="as-p-1 disc wa-line-limit has-line-3">
                                                    Great design is more than just aesthetics—it’s a
                                                    powerful business tool. In today’s competitive
                                                    marketplace, design directly influences. </p>


                                                <div class="btn-wrap">
                                                    <a href="#"
                                                        aria-label="name" class="as-pr-btn-1-v2">
                                                        <span class="text">Read More</span>
                                                        <span class="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                                height="100" viewBox="0 0 100 100" width="100">
                                                                <g>
                                                                    <circle cx="90.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="63.5" r="4.5"></circle>
                                                                    <circle cx="77" cy="36.5" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="50" cy="50" r="4.5"></circle>
                                                                    <circle cx="36.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="23" cy="50" r="4.5"></circle>
                                                                    <circle cx="9.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="77" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="23" r="4.5"></circle>
                                                                </g>
                                                            </svg> </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="as-blog-1-item wa_magnetic_1_trigger ">
                                            <div class="item-img wa-fix wa-img-cover">
                                                <img loading="lazy" decoding="async" class="wa_magnetic_1_elm"
                                                    src="/wp-content/uploads/2025/10/b1-img-2.webp" alt="b1-img-2">
                                            </div>

                                            <div class="content-wrap">
                                                <h6 class="as-p-1 categories">
                                                    <a href="category/brand-design-identity/index.html"
                                                        aria-label="Brand Design Identity">
                                                        Brand Design Identity </a>
                                                </h6>

                                                <h4 class="as-h-1 title wa_magnetic_btn_1">
                                                    <a class="wa-line-limit has-line-2"
                                                        href="it-industry-key-strategies-for-business-growth/index.html"
                                                        aria-label="How Great Design Translates into Business Success">
                                                        How Great Design Translates into Business Success </a>
                                                </h4>

                                                <p class="as-p-1 disc wa-line-limit has-line-3">
                                                    Great design is more than just aesthetics—it’s a
                                                    powerful business tool. In today’s competitive
                                                    marketplace, design directly influences. </p>


                                                <div class="btn-wrap">
                                                    <a href="it-industry-key-strategies-for-business-growth/index.html"
                                                        aria-label="name" class="as-pr-btn-1-v2">
                                                        <span class="text">Read More</span>
                                                        <span class="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860"
                                                                height="100" viewBox="0 0 100 100" width="100">
                                                                <g>
                                                                    <circle cx="90.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="50" r="4.5"></circle>
                                                                    <circle cx="77" cy="63.5" r="4.5"></circle>
                                                                    <circle cx="77" cy="36.5" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="50" cy="50" r="4.5"></circle>
                                                                    <circle cx="36.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="23" cy="50" r="4.5"></circle>
                                                                    <circle cx="9.5" cy="50" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="77" r="4.5"></circle>
                                                                    <circle cx="63.5" cy="23" r="4.5"></circle>
                                                                </g>
                                                            </svg> </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        <div data-elementor-type="wp-post" data-elementor-id="2686" class="elementor elementor-2686">
            <div class="elementor-element elementor-element-4024d54 e-con-full e-flex e-con e-parent" data-id="4024d54"
                data-element_type="container">
                <div class="elementor-element elementor-element-fdd45c3 elementor-widget elementor-widget-tx_footers elh-el tx_footers"
                    data-id="fdd45c3" data-element_type="widget"
                    data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}"
                    data-widget_type="tx_footers.default">
                    <div class="elementor-widget-container">
                                                <footer class="custom-dark-footer-v2">
    <div class="custom-container">
        <div class="footer-grid">
            
            <!-- Navigation -->
            <div class="footer-col-nav">
                <h3 class="footer-heading">Quick Links</h3>
                <div class="heading-underline"></div>
                <ul class="footer-links">
                    <li><a href="/"><span class="arr">&gt;</span>Home</a></li>
                    <li><a href="/about"><span class="arr">&gt;</span> About Us</a></li>
                    <li><a href="/our-services"><span class="arr">&gt;</span> Services</a></li>
                    <li><a href="/blog"><span class="arr">&gt;</span> Blogs</a></li>
                    <li><a href="/contact-us"><span class="arr">&gt;</span> Contact</a></li>
                </ul>
            </div>

            <!-- Center Logo & Text -->
            <div class="footer-col-center">
                <a href="/" class="footer-logo">
                    <img loading="lazy" src="/website_assets/footer-logo.png" alt="Titan Growth Hub">
                </a>
                <p class="footer-desc">
                    We help businesses grow<br>with smart digital solutions.
                </p>
                <div class="footer-decorative-line">
                    <span></span>
                    <i class="dot"></i>
                    <span></span>
                </div>
            </div>

            <!-- Follow Us -->
            <div class="footer-col-social">
                <div class="social-wrapper">
                    <h3 class="footer-heading">Follow Us</h3>
                    <div class="heading-underline"></div>
                    <div class="social-icons">
                        <div class="social-row">
                            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
                            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <!-- Get in Touch -->
                    <div class="get-in-touch" style="margin-top: 35px; width: 100%;">
                        <h3 class="footer-heading" style="margin-bottom: 15px; font-size: 18px;">Get In Touch</h3>
                        <a href="mailto:info@titangrowthhub.com" class="email-btn" style="display: inline-block; background-color: transparent; border: 1px solid #FF6B00; color: #FF6B00; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-size: 15px; font-weight: 500; transition: all 0.3s ease;">
                            info@titangrowthhub.com
                        </a>
                    </div>
                </div>
            </div>

        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom-v2">
            <div class="copyright-area">
                <p>
                    <span class="highlight-orange">© 2026</span> Titan Growth Hub. All rights reserved.
                </p>
            </div>
            <div class="legal-links">
                <a href="#">Privacy Policy</a>
                <span class="separator">|</span>
                <a href="#">Terms of Service</a>
                <span class="separator">|</span>
                <a href="#">Cookie Policy</a>
            </div>
        </div>
    </div>
    
    <style>
        .custom-dark-footer-v2 {
            background-color: #000000; 
            padding: 80px 0 30px 0; 
            font-family: 'Inter', sans-serif;
        }
        .custom-dark-footer-v2 .custom-container {
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 0 20px;
        }
        .custom-dark-footer-v2 .footer-grid {
            display: flex; 
            justify-content: space-between; 
            align-items: flex-start; 
            flex-wrap: wrap; 
            gap: 40px; 
            margin-bottom: 60px;
        }
        
        .custom-dark-footer-v2 .footer-heading {
            color: #ffffff; 
            font-size: 20px; 
            font-weight: 600; 
            margin-bottom: 10px;
            font-family: 'Inter', sans-serif;
        }
        
        .custom-dark-footer-v2 .heading-underline {
            width: 30px;
            height: 2px;
            background-color: #FF6B00;
            margin-bottom: 25px;
        }
        
        /* Nav Column */
        .custom-dark-footer-v2 .footer-col-nav {
            flex: 1; 
            min-width: 250px;
        }
        .custom-dark-footer-v2 .footer-links {
            list-style: none; 
            padding: 0; 
            margin: 0; 
            display: flex; 
            flex-direction: column;
        }
        .custom-dark-footer-v2 .footer-links li {
            border-bottom: 1px solid #1a1a1a;
        }
        .custom-dark-footer-v2 .footer-links li:last-child {
            border-bottom: none;
        }
        .custom-dark-footer-v2 .footer-links li a {
            color: #a3a3a3; 
            text-decoration: none; 
            font-size: 15px; 
            transition: color 0.3s ease;
            display: block;
            padding: 12px 0;
        }
        .custom-dark-footer-v2 .footer-links li a .arr {
            color: #FF6B00;
            margin-right: 8px;
            font-weight: bold;
        }
        .custom-dark-footer-v2 .footer-links li a:hover {
            color: #ffffff;
        }

        /* Center Column */
        .custom-dark-footer-v2 .footer-col-center {
            flex: 1.5; 
            min-width: 300px; 
            text-align: center; 
            display: flex; 
            flex-direction: column; 
            align-items: center;
        }
        .custom-dark-footer-v2 .footer-logo {
            display: inline-block; 
            margin-bottom: 25px;
        }
        .custom-dark-footer-v2 .footer-logo img {
            max-width: 220px; 
            height: auto;
        }
        .custom-dark-footer-v2 .footer-desc {
            color: #a3a3a3; 
            font-size: 15px; 
            line-height: 1.6; 
            max-width: 280px; 
            margin: 0 auto 20px auto;
        }
        .custom-dark-footer-v2 .footer-decorative-line {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        .custom-dark-footer-v2 .footer-decorative-line span {
            width: 40px;
            height: 1px;
            background-color: #333333;
        }
        .custom-dark-footer-v2 .footer-decorative-line .dot {
            width: 6px;
            height: 6px;
            background-color: #FF6B00;
            border-radius: 50%;
        }

        /* Social Column */
        .custom-dark-footer-v2 .footer-col-social {
            flex: 1; 
            min-width: 200px; 
            display: flex; 
            flex-direction: column; 
            align-items: flex-end;
        }
        .custom-dark-footer-v2 .social-wrapper {
            width: 100%; 
            max-width: 200px;
        }
        .custom-dark-footer-v2 .social-icons {
            display: flex; 
            flex-direction: column;
            gap: 15px;
            margin-top: 10px;
        }
        .custom-dark-footer-v2 .social-row {
            display: flex;
            gap: 15px;
        }
        .custom-dark-footer-v2 .social-row.center-icon {
            justify-content: center;
        }
        .custom-dark-footer-v2 .social-icons a {
            display: flex; 
            align-items: center; 
            justify-content: center; 
            width: 44px; 
            height: 44px; 
            background-color: transparent;
            border: 1px solid #333333;
            color: #ffffff; 
            border-radius: 50%; 
            text-decoration: none; 
            font-size: 16px; 
            transition: all 0.3s ease;
        }
        .custom-dark-footer-v2 .social-icons a:hover {
            background-color: #FF6B00;
            border-color: #FF6B00;
            transform: translateY(-3px);
        }

        /* Bottom */
        .custom-dark-footer-v2 .footer-bottom-v2 {
            border-top: 1px solid #1a1a1a; 
            padding-top: 30px; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }
        .custom-dark-footer-v2 .copyright-area p {
            color: #a3a3a3; 
            font-size: 14px; 
            margin: 0;
        }
        .custom-dark-footer-v2 .highlight-orange {
            color: #FF6B00;
        }
        .custom-dark-footer-v2 .legal-links {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .custom-dark-footer-v2 .legal-links a {
            color: #a3a3a3;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;
        }
        .custom-dark-footer-v2 .legal-links a:hover {
            color: #ffffff;
        }
        .custom-dark-footer-v2 .legal-links .separator {
            color: #FF6B00;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .custom-dark-footer-v2 .footer-grid {
                flex-direction: column;
                align-items: center;
            }
            .custom-dark-footer-v2 .footer-col-nav,
            .custom-dark-footer-v2 .footer-col-center,
            .custom-dark-footer-v2 .footer-col-social {
                align-items: center;
                text-align: center;
            }
            .custom-dark-footer-v2 .heading-underline {
                margin: 0 auto 25px auto;
            }
            .custom-dark-footer-v2 .social-wrapper {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .custom-dark-footer-v2 .footer-bottom-v2 {
                flex-direction: column;
                justify-content: center;
                text-align: center;
            }
        }
    </style>
</footer>
                    </div>
                </div>
            </div>
        </div>
        <script data-cfasync="false"
            src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
        <script type="speculationrules">
{"prefetch":[{"source":"document","where":{"and":[{"href_matches":"/wp/avista/*"},{"not":{"href_matches":["/wp/avista/wp-*.php","/wp/avista/wp-admin/*","/wp/avista/wp-content/uploads/*","/wp/avista/wp-content/*","/wp/avista/wp-content/plugins/*","/wp/avista/wp-content/themes/avista/*","/wp/avista/*\\\\?(.+)"]}},{"not":{"selector_matches":"a[rel~=\\"nofollow\\"]"}},{"not":{"selector_matches":".no-prefetch, .no-prefetch a"}}]},"eagerness":"conservative"}]}
</script>
        <script>
            const lazyloadRunObserver = () => {
                const lazyloadBackgrounds = document.querySelectorAll(\`.e-con.e-parent:not(.e-lazyloaded)\`);
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
            const events = [
                'DOMContentLoaded',
                'elementor/lazyload/observe',
            ];
            events.forEach((event) => {
                document.addEventListener(event, lazyloadRunObserver);
            });
        </script>
        <script>
            (function () {
                var c = document.body.className;
                c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
                document.body.className = c;
            })();
        </script>
        <link rel='stylesheet' id='wc-blocks-style-css'
            href='wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks6dd8.css?ver=wc-10.4.2' media='all' />
        <link rel='stylesheet' id='elementor-post-2582-css'
            href='wp-content/uploads/elementor/css/post-258288fa.css?ver=1776695811' media='all' />
        <link rel='stylesheet' id='elementor-post-2141-css'
            href='wp-content/uploads/elementor/css/post-2141b54d.css?ver=1776695828' media='all' />
        <link rel='stylesheet' id='elementor-post-2686-css'
            href='wp-content/uploads/elementor/css/post-268688fa.css?ver=1776695811' media='all' />
        <script src="/wp-includes/js/dist/hooks.minaf5f.js?ver=dd5603f07f9220ed27f1" id="wp-hooks-js"></script>
        <script src="/wp-includes/js/dist/i18n.min1cde.js?ver=c26c3dc7bed366793375" id="wp-i18n-js"></script>
        <script id="wp-i18n-js-after">
            wp.i18n.setLocaleData({ 'text direction\\u0004ltr': ['ltr'] });
            //# sourceURL=wp-i18n-js-after
        </script>
        <script src="/wp-content/plugins/contact-form-7/includes/swv/js/index1b46.js?ver=6.1.4" id="swv-js"></script>
        <script id="contact-form-7-js-before">
            var wpcf7 = {
                "api": {
                    "root": "https:\\/\\/themexriver.com\\/wp\\/avista\\/wp-json\\/",
                    "namespace": "contact-form-7\\/v1"
                }
            };
            //# sourceURL=contact-form-7-js-before
        </script>
        <script src="/wp-content/plugins/contact-form-7/includes/js/index1b46.js?ver=6.1.4"
            id="contact-form-7-js"></script>
        <script src="/wp-content/themes/avista/assets/js/bootstrap-min67b1.js?ver=6.9.5" id="bootstrap-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/swiper.min67b1.js?ver=6.9.5" id="swiper-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/lenis.min67b1.js?ver=6.9.5" id="lenis-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/wow-min67b1.js?ver=6.9.5" id="wow-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/odometer.min67b1.js?ver=6.9.5" id="odometer-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/nice-select.min67b1.js?ver=6.9.5"
            id="nice-select-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/jquery.marquee.min67b1.js?ver=6.9.5"
            id="jquery-marquee-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/magnific-popup.min67b1.js?ver=6.9.5"
            id="magnific-popup-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/SplitText.min67b1.js?ver=6.9.5" id="SplitText-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/gsap.min67b1.js?ver=6.9.5" id="gsap-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/customEase.min67b1.js?ver=6.9.5"
            id="customEase-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/appear67b1.js?ver=6.9.5" id="appear-js"></script>
        <script src="/wp-content/themes/avista/assets/js/scrollTrigger.min67b1.js?ver=6.9.5"
            id="scrollTrigger-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/pixi.min67b1.js?ver=6.9.5" id="pixi-min-js"></script>
        <script src="/wp-content/themes/avista/assets/js/cursor67b1.js?ver=6.9.5" id="cursor-js"></script>
        <script src="/wp-content/themes/avista/assets/js/touchspin67b1.js?ver=6.9.5" id="touchspin-js"></script>
        <script src="/wp-content/themes/avista/assets/js/avista-custom67b1.js?ver=6.9.5" id="avista-custom-js"></script>
        <script src="/wp-content/themes/avista/assets/js/avista-corea780.js?ver=1785262555" id="avista-core-js"></script>
        <script src="/wp-content/plugins/woocommerce/assets/js/sourcebuster/sourcebuster.min278d.js?ver=10.4.2"
            id="sourcebuster-js-js"></script>
        <script id="wc-order-attribution-js-extra">
            var wc_order_attribution = { "params": { "lifetime": 1.0e-5, "session": 30, "base64": false, "ajaxurl": "https://themexriver.com/wp/avista/wp-admin/admin-ajax.php", "prefix": "wc_order_attribution_", "allowTracking": true }, "fields": { "source_type": "current.typ", "referrer": "current_add.rf", "utm_campaign": "current.cmp", "utm_source": "current.src", "utm_medium": "current.mdm", "utm_content": "current.cnt", "utm_id": "current.id", "utm_term": "current.trm", "utm_source_platform": "current.plt", "utm_creative_format": "current.fmt", "utm_marketing_tactic": "current.tct", "session_entry": "current_add.ep", "session_start_time": "current_add.fd", "session_pages": "session.pgs", "session_count": "udata.vst", "user_agent": "udata.uag" } };
            //# sourceURL=wc-order-attribution-js-extra
        </script>
        <script src="/wp-content/plugins/woocommerce/assets/js/frontend/order-attribution.min278d.js?ver=10.4.2"
            id="wc-order-attribution-js"></script>
        <script src="/wp-content/plugins/elementor/assets/js/webpack.runtime.min37de.js?ver=3.33.4"
            id="elementor-webpack-runtime-js"></script>
        <script src="/wp-content/plugins/elementor/assets/js/frontend-modules.min37de.js?ver=3.33.4"
            id="elementor-frontend-modules-js"></script>
        <script src="/wp-includes/js/jquery/ui/core.minb37e.js?ver=1.13.3" id="jquery-ui-core-js"></script>
        <script id="elementor-frontend-js-before">
            var elementorFrontendConfig = { "environmentMode": { "edit": false, "wpPreview": false, "isScriptDebug": false }, "i18n": { "shareOnFacebook": "Share on Facebook", "shareOnTwitter": "Share on Twitter", "pinIt": "Pin it", "download": "Download", "downloadImage": "Download image", "fullscreen": "Fullscreen", "zoom": "Zoom", "share": "Share", "playVideo": "Play Video", "previous": "Previous", "next": "Next", "close": "Close", "a11yCarouselPrevSlideMessage": "Previous slide", "a11yCarouselNextSlideMessage": "Next slide", "a11yCarouselFirstSlideMessage": "This is the first slide", "a11yCarouselLastSlideMessage": "This is the last slide", "a11yCarouselPaginationBulletMessage": "Go to slide" }, "is_rtl": false, "breakpoints": { "xs": 0, "sm": 480, "md": 768, "lg": 1025, "xl": 1440, "xxl": 1600 }, "responsive": { "breakpoints": { "mobile": { "label": "Mobile Portrait", "value": 767, "default_value": 767, "direction": "max", "is_enabled": true }, "mobile_extra": { "label": "Mobile Landscape", "value": 880, "default_value": 880, "direction": "max", "is_enabled": false }, "tablet": { "label": "Tablet Portrait", "value": 1024, "default_value": 1024, "direction": "max", "is_enabled": true }, "tablet_extra": { "label": "Tablet Landscape", "value": 1200, "default_value": 1200, "direction": "max", "is_enabled": false }, "laptop": { "label": "Laptop", "value": 1366, "default_value": 1366, "direction": "max", "is_enabled": false }, "widescreen": { "label": "Widescreen", "value": 2400, "default_value": 2400, "direction": "min", "is_enabled": false } }, "hasCustomBreakpoints": false }, "version": "3.33.4", "is_static": false, "experimentalFeatures": { "additional_custom_breakpoints": true, "container": true, "e_optimized_markup": true, "e_pro_free_trial_popup": true, "nested-elements": true, "home_screen": true, "global_classes_should_enforce_capabilities": true, "e_variables": true, "cloud-library": true, "e_opt_in_v4_page": true, "import-export-customization": true }, "urls": { "assets": "https:\\/\\/themexriver.com\\/wp\\/avista\\/wp-content\\/plugins\\/elementor\\/assets\\/", "ajaxurl": "https:\\/\\/themexriver.com\\/wp\\/avista\\/wp-admin\\/admin-ajax.php", "uploadUrl": "https:\\/\\/themexriver.com\\/wp\\/avista\\/wp-content\\/uploads" }, "nonces": { "floatingButtonsClickTracking": "1401e7d743" }, "swiperClass": "swiper", "settings": { "page": [], "editorPreferences": [] }, "kit": { "active_breakpoints": ["viewport_mobile", "viewport_tablet"], "global_image_lightbox": "yes", "lightbox_enable_counter": "yes", "lightbox_enable_fullscreen": "yes", "lightbox_enable_zoom": "yes", "lightbox_enable_share": "yes", "lightbox_title_src": "title", "lightbox_description_src": "description" }, "post": { "id": 15, "title": "Avista%20%E2%80%93%20Digital%20Agency%20%26%20Portfolio%20WordPress%20Theme", "excerpt": "", "featuredImage": false } };
            //# sourceURL=elementor-frontend-js-before
        </script>
        <script src="/wp-content/plugins/elementor/assets/js/frontend.min37de.js?ver=3.33.4"
            id="elementor-frontend-js"></script>
        <script src="/wp-content/plugins/avista-core/assets/js/elh-elementa780.js?ver=1785262555"
            id="elh-element-helper-js"></script>
        <script id="wp-emoji-settings" type="application/json">
{"baseUrl":"https://s.w.org/images/core/emoji/17.0.2/72x72/","ext":".png","svgUrl":"https://s.w.org/images/core/emoji/17.0.2/svg/","svgExt":".svg","source":{"concatemoji":"https://themexriver.com/wp/avista/wp-includes/js/wp-emoji-release.min.js?ver=6.9.5"}}
</script>
        <script type="module">
            /*! This file is auto-generated */
            const a = JSON.parse(document.getElementById("wp-emoji-settings").textContent), o = (window._wpemojiSettings = a, "wpEmojiSettingsSupports"), s = ["flag", "emoji"]; function i(e) { try { var t = { supportTests: e, timestamp: (new Date).valueOf() }; sessionStorage.setItem(o, JSON.stringify(t)) } catch (e) { } } function c(e, t, n) { e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.fillText(t, 0, 0); t = new Uint32Array(e.getImageData(0, 0, e.canvas.width, e.canvas.height).data); e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.fillText(n, 0, 0); const a = new Uint32Array(e.getImageData(0, 0, e.canvas.width, e.canvas.height).data); return t.every((e, t) => e === a[t]) } function p(e, t) { e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.fillText(t, 0, 0); var n = e.getImageData(16, 16, 1, 1); for (let e = 0; e < n.data.length; e++)if (0 !== n.data[e]) return !1; return !0 } function u(e, t, n, a) { switch (t) { case "flag": return n(e, "\\ud83c\\udff3\\ufe0f\\u200d\\u26a7\\ufe0f", "\\ud83c\\udff3\\ufe0f\\u200b\\u26a7\\ufe0f") ? !1 : !n(e, "\\ud83c\\udde8\\ud83c\\uddf6", "\\ud83c\\udde8\\u200b\\ud83c\\uddf6") && !n(e, "\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40\\udc65\\udb40\\udc6e\\udb40\\udc67\\udb40\\udc7f", "\\ud83c\\udff4\\u200b\\udb40\\udc67\\u200b\\udb40\\udc62\\u200b\\udb40\\udc65\\u200b\\udb40\\udc6e\\u200b\\udb40\\udc67\\u200b\\udb40\\udc7f"); case "emoji": return !a(e, "\\ud83e\\u1fac8") }return !1 } function f(e, t, n, a) { let r; const o = (r = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? new OffscreenCanvas(300, 150) : document.createElement("canvas")).getContext("2d", { willReadFrequently: !0 }), s = (o.textBaseline = "top", o.font = "600 32px Arial", {}); return e.forEach(e => { s[e] = t(o, e, n, a) }), s } function r(e) { var t = document.createElement("script"); t.src = e, t.defer = !0, document.head.appendChild(t) } a.supports = { everything: !0, everythingExceptFlag: !0 }, new Promise(t => { let n = function () { try { var e = JSON.parse(sessionStorage.getItem(o)); if ("object" == typeof e && "number" == typeof e.timestamp && (new Date).valueOf() < e.timestamp + 604800 && "object" == typeof e.supportTests) return e.supportTests } catch (e) { } return null }(); if (!n) { if ("undefined" != typeof Worker && "undefined" != typeof OffscreenCanvas && "undefined" != typeof URL && URL.createObjectURL && "undefined" != typeof Blob) try { var e = "postMessage(" + f.toString() + "(" + [JSON.stringify(s), u.toString(), c.toString(), p.toString()].join(",") + "));", a = new Blob([e], { type: "text/javascript" }); const r = new Worker(URL.createObjectURL(a), { name: "wpTestEmojiSupports" }); return void (r.onmessage = e => { i(n = e.data), r.terminate(), t(n) }) } catch (e) { } i(n = f(s, u, c, p)) } t(n) }).then(e => { for (const n in e) a.supports[n] = e[n], a.supports.everything = a.supports.everything && a.supports[n], "flag" !== n && (a.supports.everythingExceptFlag = a.supports.everythingExceptFlag && a.supports[n]); var t; a.supports.everythingExceptFlag = a.supports.everythingExceptFlag && !a.supports.flag, a.supports.everything || ((t = a.source || {}).concatemoji ? r(t.concatemoji) : t.wpemoji && t.twemoji && (r(t.twemoji), r(t.wpemoji))) });
            //# sourceURL=https://themexriver.com/wp/avista/wp-includes/js/wp-emoji-loader.min.js
        </script>
    </div>
    <script type="module"
        src="https://static.cloudflareinsights.com/beacon.min.js/v4513226cdae34746b4dedf0b4dfa099e1781791509496"
        integrity="sha512-ZE9pZaUXND66v380QUtch/5sE9tPFh2zg45pR2PB0CVkCtOREv2AJKkSidISWkysEuQ0EH8faUU5du78bx87UQ=="
        data-cf-beacon='{"version":"2024.11.0","token":"daf30b97c9e94fec9725b4f69e8dd5ef","r":1}'
        crossorigin="anonymous"></script>
`;

export default async function HomePage() {

    const settings = await getSiteSettings();

    const finalHtml = injectDynamicSettings(pageHtml, settings);



    return (

        <>

            < script

                type="application/ld+json"

                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }
                }
            />
            < script
                dangerouslySetInnerHTML={{

                    __html: `document.body.className = "home page-template page-template-elementor_header_footer page page-id-17 theme-avista elementor-default elementor-template-full-width elementor-kit-8 elementor-page elementor-page-17";`,


                }}
            />
            < div dangerouslySetInnerHTML={{ __html: finalHtml }} />
        </>
    );
}
