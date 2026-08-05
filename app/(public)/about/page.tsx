import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';
import { aboutPageSchema } from '@/lib/pageSchemas';
import { getSiteSettings } from '@/lib/getSiteSettings';
import { injectDynamicSettings } from '@/lib/htmlHelper';

export async function generateMetadata() {
    const { title, description } = await getPageMeta(
        'about',
        'About Us – Titan Growth Hub',
        'Learn about our team, mission, and how we drive measurable SEO results for clients worldwide.'
    );
    return { title, description };
}

const pageHtml = `
<div class="page-wrapper">

    <!-- preloader start -->
        <div class="as-preloader ">
        <div class="as-preloader-wrap">
            <div class="loader as-h-1">
                <span class="loader_letter">L</span>
                <span class="loader_letter">
                                            <img src="../wp-content/uploads/2025/11/fevicon-1.webp"
                        alt="fevicon-1">
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
                <img src="../wp-content/uploads/2025/10/h1-favicon-shape.webp" alt="h1-favicon-shape" class="bg-shape">
        
                <img src="../wp-content/uploads/2025/10/fevicon-1.webp"
        alt="fevicon-1">
            </a>
</header>
<div class="wa-offcanvas-area offcanvas_box_active lenis lenis-smooth ">
    <div class="wa-offcanvas-wrap ">
        <!-- top -->
        <div class="wa-offcanvas-top">
                        <a href="../index.html" class="tx-logo wa-offcanvas-top-logo" aria-label="Site Logo"  >
                <img src="../wp-content/uploads/2025/11/logo-1.webp" alt="logo-1">
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
                                <a href="../wp-content/uploads/2025/10/p1-img-1.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img src="../wp-content/uploads/2025/10/p1-img-1.webp" alt="">
                </a>
                                <a href="../wp-content/uploads/2025/10/p1-img-2.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img src="../wp-content/uploads/2025/10/p1-img-2.webp" alt="">
                </a>
                                <a href="../wp-content/uploads/2025/10/p1-img-4.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img src="../wp-content/uploads/2025/10/p1-img-4.webp" alt="">
                </a>
                                <a href="../wp-content/uploads/2025/10/p1-img-3.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img src="../wp-content/uploads/2025/10/p1-img-3.webp" alt="">
                </a>
                            </div>
        </div>
        
        <!-- social -->
                <div class="wa-offcanvas-social">
                        <h6 class="wa-offcanvas-social-title as-h-1">
                We're on social media:            </h6>
            
            <div class="wa-offcanvas-social-flex d-flex flex-wrap">
                                <a class="wa-offcanvas-social-link"
                    href="#"
                    target="_self"
                    rel=""
                    aria-label="name">
                    <i aria-hidden="true" class="fab fa-linkedin-in"></i>                </a>
                                <a class="wa-offcanvas-social-link"
                    href="#"
                    target="_self"
                    rel=""
                    aria-label="name">
                    <i aria-hidden="true" class="fab fa-facebook-f"></i>                </a>
                                <a class="wa-offcanvas-social-link"
                    href="#"
                    target="_self"
                    rel=""
                    aria-label="name">
                    <i aria-hidden="true" class="fab fa-x-twitter"></i>                </a>
                                <a class="wa-offcanvas-social-link"
                    href="#"
                    target="_self"
                    rel=""
                    aria-label="name">
                    <i aria-hidden="true" class="fab fa-instagram"></i>                </a>
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
            <!-- breadcrumb-start -->
        <div class="as-breadcrumb-area wa-p-relative wa-bg-default tx-breadcrumb " data-background="/website_assets/tx-bg-img.webp">
            <div class="container as-container-2">
                <div class="as-breadcrumb-wrap">
                    <h1 class="as-breadcrumb-title">About</h1>
                                        <div class="as-breadcrumb-list">
                                                <span class="tx-breadIcon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_23214_336" fill="white">
                            <path d="M20.5153 9.7288L13.0153 2.65255C13.0116 2.64935 13.0082 2.6459 13.005 2.64223C12.7289 2.39111 12.369 2.25195 11.9958 2.25195C11.6225 2.25195 11.2627 2.39111 10.9866 2.64223L10.9763 2.65255L3.48469 9.7288C3.33187 9.86932 3.20989 10.04 3.12646 10.2301C3.04303 10.4202 2.99997 10.6256 3 10.8332V19.5004C3 19.8982 3.15804 20.2797 3.43934 20.561C3.72064 20.8423 4.10218 21.0004 4.5 21.0004H9C9.39782 21.0004 9.77936 20.8423 10.0607 20.561C10.342 20.2797 10.5 19.8982 10.5 19.5004V15.0004H13.5V19.5004C13.5 19.8982 13.658 20.2797 13.9393 20.561C14.2206 20.8423 14.6022 21.0004 15 21.0004H19.5C19.8978 21.0004 20.2794 20.8423 20.5607 20.561C20.842 20.2797 21 19.8982 21 19.5004V10.8332C21 10.6256 20.957 10.4202 20.8735 10.2301C20.7901 10.04 20.6681 9.86932 20.5153 9.7288ZM19.5 19.5004H15V15.0004C15 14.6025 14.842 14.221 14.5607 13.9397C14.2794 13.6584 13.8978 13.5004 13.5 13.5004H10.5C10.1022 13.5004 9.72064 13.6584 9.43934 13.9397C9.15804 14.221 9 14.6025 9 15.0004V19.5004H4.5V10.8332L4.51031 10.8238L12 3.75036L19.4906 10.8219L19.5009 10.8313L19.5 19.5004Z"/>
                            </mask>
                            <path d="M20.5153 9.7288L13.0153 2.65255C13.0116 2.64935 13.0082 2.6459 13.005 2.64223C12.7289 2.39111 12.369 2.25195 11.9958 2.25195C11.6225 2.25195 11.2627 2.39111 10.9866 2.64223L10.9763 2.65255L3.48469 9.7288C3.33187 9.86932 3.20989 10.04 3.12646 10.2301C3.04303 10.4202 2.99997 10.6256 3 10.8332V19.5004C3 19.8982 3.15804 20.2797 3.43934 20.561C3.72064 20.8423 4.10218 21.0004 4.5 21.0004H9C9.39782 21.0004 9.77936 20.8423 10.0607 20.561C10.342 20.2797 10.5 19.8982 10.5 19.5004V15.0004H13.5V19.5004C13.5 19.8982 13.658 20.2797 13.9393 20.561C14.2206 20.8423 14.6022 21.0004 15 21.0004H19.5C19.8978 21.0004 20.2794 20.8423 20.5607 20.561C20.842 20.2797 21 19.8982 21 19.5004V10.8332C21 10.6256 20.957 10.4202 20.8735 10.2301C20.7901 10.04 20.6681 9.86932 20.5153 9.7288ZM19.5 19.5004H15V15.0004C15 14.6025 14.842 14.221 14.5607 13.9397C14.2794 13.6584 13.8978 13.5004 13.5 13.5004H10.5C10.1022 13.5004 9.72064 13.6584 9.43934 13.9397C9.15804 14.221 9 14.6025 9 15.0004V19.5004H4.5V10.8332L4.51031 10.8238L12 3.75036L19.4906 10.8219L19.5009 10.8313L19.5 19.5004Z" fill="#FB0D1F"/>
                            <path d="M20.5153 9.7288L19.1428 11.1835L19.1521 11.1923L19.1616 11.201L20.5153 9.7288ZM13.0153 2.65255L14.3878 1.19783L14.3593 1.17092L14.3297 1.14514L13.0153 2.65255ZM13.005 2.64223L14.5124 1.32781L14.4363 1.24052L14.3506 1.16261L13.005 2.64223ZM11.9958 2.25195L11.9958 0.251953L11.9958 2.25195ZM10.9866 2.64223L9.64094 1.16261L9.60587 1.1945L9.57235 1.22802L10.9866 2.64223ZM10.9763 2.65255L12.3496 4.10649L12.3703 4.08691L12.3905 4.06676L10.9763 2.65255ZM3.48469 9.7288L4.83844 11.201L4.84829 11.1919L4.85803 11.1827L3.48469 9.7288ZM3 10.8332L5 10.8332L5 10.8329L3 10.8332ZM3 19.5004L1 19.5004L3 19.5004ZM10.5 15.0004V13.0004H8.5V15.0004H10.5ZM13.5 15.0004H15.5V13.0004H13.5V15.0004ZM21 10.8332L19 10.8329V10.8332H21ZM19.5 19.5004V21.5004H21.4998L21.5 19.5006L19.5 19.5004ZM15 19.5004H13V21.5004H15V19.5004ZM9 19.5004V21.5004H11V19.5004H9ZM4.5 19.5004H2.5V21.5004H4.5V19.5004ZM4.5 10.8332L3.15461 9.35333L2.5 9.94846V10.8332H4.5ZM4.51031 10.8238L5.8557 12.3036L5.86974 12.2909L5.88354 12.2778L4.51031 10.8238ZM12 3.75036L13.3729 2.29605L11.9997 0.999658L10.6268 2.29632L12 3.75036ZM19.4906 10.8219L18.1177 12.2762L18.1314 12.2892L18.1453 12.3018L19.4906 10.8219ZM19.5009 10.8313L21.5009 10.8315L21.501 9.94663L20.8463 9.3514L19.5009 10.8313ZM20.5153 9.7288L21.8878 8.27408L14.3878 1.19783L13.0153 2.65255L11.6428 4.10726L19.1428 11.1835L20.5153 9.7288ZM13.0153 2.65255L14.3297 1.14514C14.3947 1.2018 14.4557 1.26283 14.5124 1.32781L13.005 2.64223L11.4976 3.95666C11.5606 4.02898 11.6286 4.0969 11.7009 4.15996L13.0153 2.65255ZM13.005 2.64223L14.3506 1.16261C13.7063 0.576649 12.8667 0.251953 11.9958 0.251953L11.9958 2.25195L11.9958 4.25195C11.8714 4.25195 11.7514 4.20557 11.6594 4.12186L13.005 2.64223ZM11.9958 2.25195L11.9958 0.251953C11.1249 0.251953 10.2852 0.576649 9.64094 1.16261L10.9866 2.64223L12.3322 4.12186C12.2401 4.20557 12.1202 4.25195 11.9958 4.25195L11.9958 2.25195ZM10.9866 2.64223L9.57235 1.22802L9.56204 1.23833L10.9763 2.65255L12.3905 4.06676L12.4008 4.05645L10.9866 2.64223ZM10.9763 2.65255L9.60291 1.19861L2.11135 8.27486L3.48469 9.7288L4.85803 11.1827L12.3496 4.10649L10.9763 2.65255ZM3.48469 9.7288L2.13094 8.2566C1.77437 8.58448 1.48974 8.98281 1.29508 9.42637L3.12646 10.2301L4.95785 11.0339C4.93004 11.0972 4.88938 11.1541 4.83844 11.201L3.48469 9.7288ZM3.12646 10.2301L1.29508 9.42637C1.1004 9.86993 0.999926 10.3491 1 10.8335L3 10.8332L5 10.8329C5.00001 10.9021 4.98566 10.9705 4.95785 11.0339L3.12646 10.2301ZM3 10.8332H1V19.5004H3H5V10.8332H3ZM3 19.5004L1 19.5004C1 20.4286 1.36875 21.3189 2.02513 21.9752L3.43934 20.561L4.85355 19.1468C4.94732 19.2406 5 19.3677 5 19.5004L3 19.5004ZM3.43934 20.561L2.02513 21.9752C2.6815 22.6316 3.57174 23.0004 4.5 23.0004V21.0004V19.0004C4.63261 19.0004 4.75979 19.053 4.85355 19.1468L3.43934 20.561ZM4.5 21.0004V23.0004H9V21.0004V19.0004H4.5V21.0004ZM9 21.0004V23.0004C9.92826 23.0004 10.8185 22.6316 11.4749 21.9752L10.0607 20.561L8.64645 19.1468C8.74021 19.053 8.86739 19.0004 9 19.0004V21.0004ZM10.0607 20.561L11.4749 21.9752C12.1312 21.3189 12.5 20.4286 12.5 19.5004H10.5H8.5C8.5 19.3677 8.55268 19.2406 8.64645 19.1468L10.0607 20.561ZM10.5 19.5004H12.5V15.0004H10.5H8.5V19.5004H10.5ZM10.5 15.0004V17.0004H13.5V15.0004V13.0004H10.5V15.0004ZM13.5 15.0004H11.5V19.5004H13.5H15.5V15.0004H13.5ZM13.5 19.5004H11.5C11.5 20.4286 11.8688 21.3189 12.5251 21.9752L13.9393 20.561L15.3536 19.1468C15.4473 19.2406 15.5 19.3677 15.5 19.5004H13.5ZM13.9393 20.561L12.5251 21.9752C13.1815 22.6316 14.0717 23.0004 15 23.0004V21.0004V19.0004C15.1326 19.0004 15.2598 19.053 15.3536 19.1468L13.9393 20.561ZM15 21.0004V23.0004H19.5V21.0004V19.0004H15V21.0004ZM19.5 21.0004V23.0004C20.4283 23.0004 21.3185 22.6316 21.9749 21.9752L20.5607 20.561L19.1464 19.1468C19.2402 19.053 19.3674 19.0004 19.5 19.0004V21.0004ZM20.5607 20.561L21.9749 21.9752C22.6312 21.3189 23 20.4286 23 19.5004H21H19C19 19.3677 19.0527 19.2406 19.1464 19.1468L20.5607 20.561ZM21 19.5004H23V10.8332H21H19V19.5004H21ZM21 10.8332L23 10.8335C23.0001 10.3491 22.8996 9.86993 22.7049 9.42637L20.8735 10.2301L19.0422 11.0339C19.0143 10.9705 19 10.9021 19 10.8329L21 10.8332ZM20.8735 10.2301L22.7049 9.42637C22.5103 8.9828 22.2256 8.58448 21.8691 8.2566L20.5153 9.7288L19.1616 11.201C19.1106 11.1542 19.07 11.0972 19.0422 11.0339L20.8735 10.2301ZM19.5 19.5004V17.5004H15V19.5004V21.5004H19.5V19.5004ZM15 19.5004H17V15.0004H15H13V19.5004H15ZM15 15.0004H17C17 14.0721 16.6312 13.1819 15.9749 12.5255L14.5607 13.9397L13.1464 15.3539C13.0527 15.2601 13 15.133 13 15.0004H15ZM14.5607 13.9397L15.9749 12.5255C15.3185 11.8691 14.4283 11.5004 13.5 11.5004V13.5004V15.5004C13.3674 15.5004 13.2402 15.4477 13.1464 15.3539L14.5607 13.9397ZM13.5 13.5004V11.5004H10.5V13.5004V15.5004H13.5V13.5004ZM10.5 13.5004V11.5004C9.57174 11.5004 8.6815 11.8691 8.02513 12.5255L9.43934 13.9397L10.8536 15.3539C10.7598 15.4477 10.6326 15.5004 10.5 15.5004V13.5004ZM9.43934 13.9397L8.02513 12.5255C7.36875 13.1819 7 14.0721 7 15.0004H9H11C11 15.133 10.9473 15.2601 10.8536 15.3539L9.43934 13.9397ZM9 15.0004H7V19.5004H9H11V15.0004H9ZM9 19.5004V17.5004H4.5V19.5004V21.5004H9V19.5004ZM4.5 19.5004H6.5V10.8332H4.5H2.5V19.5004H4.5ZM4.5 10.8332L5.84539 12.313L5.8557 12.3036L4.51031 10.8238L3.16493 9.34395L3.15461 9.35333L4.5 10.8332ZM4.51031 10.8238L5.88354 12.2778L13.3732 5.2044L12 3.75036L10.6268 2.29632L3.13708 9.36975L4.51031 10.8238ZM12 3.75036L10.6271 5.20467L18.1177 12.2762L19.4906 10.8219L20.8636 9.36761L13.3729 2.29605L12 3.75036ZM19.4906 10.8219L18.1453 12.3018L18.1556 12.3112L19.5009 10.8313L20.8463 9.3514L20.836 9.34203L19.4906 10.8219ZM19.5009 10.8313L17.5009 10.8311L17.5 19.5001L19.5 19.5004L21.5 19.5006L21.5009 10.8315L19.5009 10.8313Z" fill="#FB0D1F" mask="url(#path-1-inside-1_23214_336)"/>
                        </svg></span>
                                                <nav aria-label="Breadcrumbs" class="tx-breadcrumb__wrapper"><ul class="bread-crumb clearfix list-unstyled d-flex flex-wrap m-0" itemscope itemtype="http://schema.org/BreadcrumbList"><li itemprop="item ListElement" itemscope itemtype="http://schema.org/ListItem" class="item taBcrumb-begin"><a href="../index.html" rel="home" itemprop="item"><span itemprop="name">Home</span></a><meta itemprop="position" content="1" /></li><li class="item taBcrumb-end"><span>About</span></li></ul></nav>                    </div>
                                    </div>
            </div>
        </div>
        <!-- breadcrumb-end -->
        		<div data-elementor-type="wp-page" data-elementor-id="23" class="elementor elementor-23">
				<div class="elementor-element elementor-element-277153f e-con-full e-flex e-con e-parent" data-id="277153f" data-element_type="container">
		<div class="elementor-element elementor-element-f1acc78 e-con-full e-flex e-con e-child" data-id="f1acc78" data-element_type="container">
				<div class="elementor-element elementor-element-4950673 elementor-widget elementor-widget-tx_about elh-el tx_about" data-id="4950673" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_about.default">
				<div class="elementor-widget-container">
					<section class="as-about-1-area pt-100 pb-50 t1_ani_trigger tx-section ">
    <div class="container as-container-1">
        <div class="as-about-1-wrap">
            <!-- left-content -->
            <div class="as-about-1-content">
                                <h6 class="as-subtitle-1 tx-subTitle">
                    <span class="icon">
                        {<i aria-hidden="true" class="fas fa-star"></i>}                    </span>
                    About US                </h6>
                                <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">Our process is simple,
                                purposeful, and adaptable.</h2>
                                <div class="hr-line"></div>
                
                                <p class="as-p-1 sec-disc wow fadeInUp2 tx-description">
                    Avista Digital Agency is a creative and strategy-driven firm dedicated to helping brands thrive
                                in the digital world. We specialize in web design, branding, digital marketing, and performance
                                driven solutions that connect businesses with their audiences. With a focus on innovation
                                Avista empowers companies to grow faster.                </p>
                                <div class="as-about-1-testimonial">
                                        <div class="as-author-1">
                                                <img decoding="async" src="../wp-content/uploads/2025/10/a1-shape-1.webp" alt="a1-shape-1" class="bg-shape-1">
                        
                                                <img decoding="async" src="../wp-content/uploads/2025/10/a1-shape-2.webp" alt="a1-shape-2" class="bg-shape-2">
                        
                                                <div class="as-author-1-img wa-fix wa-img-cover wow fadeInRight2" data-wow-delay="0s">
                            <img decoding="async" src="../wp-content/uploads/2025/10/author-1.webp" alt="">
                        </div>
                                                <div class="as-author-1-img wa-fix wa-img-cover wow fadeInRight2" data-wow-delay=".1s">
                            <img decoding="async" src="../wp-content/uploads/2025/10/author-2.webp" alt="">
                        </div>
                                                <div class="as-author-1-img wa-fix wa-img-cover wow fadeInRight2" data-wow-delay=".2s">
                            <img decoding="async" src="../wp-content/uploads/2025/10/author-3.webp" alt="">
                        </div>
                                                <div class="as-author-1-img wa-fix wa-img-cover wow fadeInRight2" data-wow-delay=".3s">
                            <img decoding="async" src="../wp-content/uploads/2025/10/author-4.webp" alt="">
                        </div>
                                            </div>
                    
                                        <div class="right">
                        <div class="as-rating-1">
                            <div class="icon">
                                <i class="fa-solid fa-star wow fadeIn" data-wow-delay=".1s"></i><i class="fa-solid fa-star wow fadeIn" data-wow-delay=".2s"></i><i class="fa-solid fa-star wow fadeIn" data-wow-delay=".3s"></i><i class="fa-solid fa-star wow fadeIn" data-wow-delay=".4s"></i><i class="fa-solid fa-star wow fadeIn" data-wow-delay=".5s"></i>                            </div>
                                                        <p class="as-h-1 text wow fadeInRight2">4.9 Rating</p>
                                                    </div>
                                                <p class="as-p-1 disc wow fadeInUp2" data-wow-delay=".3s">Depends on 1.5 k positive feedback by our clients</p>
                                            </div>
                    
                </div>
            </div>

            <!-- middle -->
            <div class="as-about-1-middle">
                                <h3 class="as-h-1 middle-title">
                    Our Values                </h3>
                
                <!-- faqs-accordion -->
                                <div class="as-about-1-features">
                                        <div class="as-about-1-features-single wow fadeInUp2" data-wow-delay=".1s">
                                                <h3 class="item-title as-h-1 wa_magnetic_btn_1">
                            <a href="../services/smart-schedule-control/index.html"
                            target="_self"
                            rel=""
                            aria-label="Customer-Centric Mind">
                                Customer-Centric Mind                            </a>
                        </h3>
                        
                                                <p class="as-p-1 item-disc">
                            We put our clients at the heart of everything we do. By understanding their needs, goals, and challenges, we create personalized strategies and solutions that deliver real value.                        </p>
                                            </div>
                                        <div class="as-about-1-features-single wow fadeInUp2" data-wow-delay=".2s">
                                                <h3 class="item-title as-h-1 wa_magnetic_btn_1">
                            <a href="../services/smart-schedule-control/index.html"
                            target="_self"
                            rel=""
                            aria-label="Results-Driven">
                                Results-Driven                            </a>
                        </h3>
                        
                                                <p class="as-p-1 item-disc">
                            Every solution is designed to create measurable business impact.                        </p>
                                            </div>
                                        <div class="as-about-1-features-single wow fadeInUp2" data-wow-delay=".3s">
                                                <h3 class="item-title as-h-1 wa_magnetic_btn_1">
                            <a href="../services/smart-schedule-control/index.html"
                            target="_self"
                            rel=""
                            aria-label="Collaboration">
                                Collaboration                            </a>
                        </h3>
                        
                                                <p class="as-p-1 item-disc">
                            We work closely with clients as partners to achieve shared success.                        </p>
                                            </div>
                                    </div>
                            </div>

            <!-- right-title -->
                        <div class="as-about-1-right">
                <h3 class="as-h-1 right-title">
                    Expert Team                </h3>
            </div>
                    </div>
    </div>
</section>				</div>
				</div>
				</div>
		<div class="elementor-element elementor-element-7b561d8 e-con-full e-flex e-con e-child" data-id="7b561d8" data-element_type="container">
				<div class="elementor-element elementor-element-2bf8303 elementor-widget elementor-widget-tx_team_lists elh-el tx_team_lists" data-id="2bf8303" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_team_lists.default">
				<div class="elementor-widget-container">
					<section class="as-team-1-area pt-30 tx-section  ">
    <div class="container as-container-1">
        <!-- section-title -->
        <div class="as-team-1-sec-title text-center mb-30">
                        <h6 class="as-subtitle-1 tx-subTitle">
                <span class="icon">
                    {<i aria-hidden="true" class="fas fa-circle"></i>}                </span>
                Team Members            </h6>
            
            <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">Experts Who Care About Your Growth</h2>
                    </div>

        <div class="as-team-1-wrap">
                        <div class="as-team-1-member-ani">
                <div class="as-team-1-member wa_magnetic_1_trigger">
                    <div class="member-img wa-fix wa-img-cover wa-p-relative">
                                                <img decoding="async" class="wa_magnetic_1_elm" src="../wp-content/uploads/2025/10/t1-img-1.webp"
                            alt="t1-img-1">
                        
                        <div class="content-wrap">
                                                        <h5 class="as-h-1 member-name">
                                <a
                                href="../teams/melissa-lee/index.html"
                                target="_self"
                                rel="">
                                    Sharah Alena                                </a>
                            </h5>
                                                                                    <p class="as-p-1 member-dg">CEO &amp; Founder</p>
                                                    </div>
                    </div>

                                        <div class="member-social">
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-linkedin-in"></i>                        </a>
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-instagram"></i>                        </a>
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-x-twitter"></i>                        </a>
                                            </div>
                                    </div>
            </div>
                        <div class="as-team-1-member-ani">
                <div class="as-team-1-member wa_magnetic_1_trigger">
                    <div class="member-img wa-fix wa-img-cover wa-p-relative">
                                                <img decoding="async" class="wa_magnetic_1_elm" src="../wp-content/uploads/2025/10/t1-img-2.webp"
                            alt="t1-img-2">
                        
                        <div class="content-wrap">
                                                        <h5 class="as-h-1 member-name">
                                <a
                                href="../teams/melissa-lee/index.html"
                                target="_self"
                                rel="">
                                    Sharah Alena                                </a>
                            </h5>
                                                                                    <p class="as-p-1 member-dg">CEO &amp; Founder</p>
                                                    </div>
                    </div>

                                        <div class="member-social">
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-linkedin-in"></i>                        </a>
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-instagram"></i>                        </a>
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-x-twitter"></i>                        </a>
                                            </div>
                                    </div>
            </div>
                        <div class="as-team-1-member-ani">
                <div class="as-team-1-member wa_magnetic_1_trigger">
                    <div class="member-img wa-fix wa-img-cover wa-p-relative">
                                                <img decoding="async" class="wa_magnetic_1_elm" src="../wp-content/uploads/2025/10/t1-img-3.webp"
                            alt="t1-img-3">
                        
                        <div class="content-wrap">
                                                        <h5 class="as-h-1 member-name">
                                <a
                                href="../teams/melissa-lee/index.html"
                                target="_self"
                                rel="">
                                    Sharah Alena                                </a>
                            </h5>
                                                                                    <p class="as-p-1 member-dg">CEO &amp; Founder</p>
                                                    </div>
                    </div>

                                        <div class="member-social">
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-linkedin-in"></i>                        </a>
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-instagram"></i>                        </a>
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-x-twitter"></i>                        </a>
                                            </div>
                                    </div>
            </div>
                        <div class="as-team-1-member-ani">
                <div class="as-team-1-member wa_magnetic_1_trigger">
                    <div class="member-img wa-fix wa-img-cover wa-p-relative">
                                                <img decoding="async" class="wa_magnetic_1_elm" src="../wp-content/uploads/2025/10/t1-img-4.webp"
                            alt="t1-img-4">
                        
                        <div class="content-wrap">
                                                        <h5 class="as-h-1 member-name">
                                <a
                                href="../teams/melissa-lee/index.html"
                                target="_self"
                                rel="">
                                    Sharah Alena                                </a>
                            </h5>
                                                                                    <p class="as-p-1 member-dg">CEO &amp; Founder</p>
                                                    </div>
                    </div>

                                        <div class="member-social">
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-linkedin-in"></i>                        </a>
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-instagram"></i>                        </a>
                                                <a class="link-elm" href="#0"
                        target="_self"
                        rel="" aria-label="name">
                            <i aria-hidden="true" class="fab fa-x-twitter"></i>                        </a>
                                            </div>
                                    </div>
            </div>
                    </div>
    </div>
</section>				</div>
				</div>
				</div>
				</div>
		<div class="elementor-element elementor-element-f4fa521 e-con-full e-flex e-con e-parent" data-id="f4fa521" data-element_type="container">
				<div class="elementor-element elementor-element-265d35c elementor-widget elementor-widget-tx_cta elh-el tx_cta" data-id="265d35c" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_2&quot;}" data-widget_type="tx_cta.default">
				<div class="elementor-widget-container">
					<section class="as-cta-2-area pt-90 tx-section ">
    <div class="container as-container-1">
        <div class="as-cta-2-wrap">

            <!-- left-content -->
            <div class="as-cta-2-left">
                                <div class="as-cta-2-left-top">

                    <div class="as-cta-2-booking">
                                                <h4 class="as-h-1 title wa_title_spilt_1">
                            Need more assistance?                        </h4>
                        
                                                <p class="as-p-1 disc wow fadeInUp2" data-wow-delay=".2s">
                            Book a personalized call                        </p>
                        
                        <div class="btn-x-mail wow fadeInUp2" data-wow-delay=".3s" >
                                                        <a href="../contact-us/index.html"
                            target="_self"
                            rel=""
                            aria-label="Schedule a call" class="as-pr-btn-1-v2">
                                <span class="text">
                                    Schedule a call                                </span>

                                                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860" height="100" viewBox="0 0 100 100" width="100"><g><circle cx="90.5" cy="50" r="4.5"></circle><circle cx="77" cy="50" r="4.5"></circle><circle cx="77" cy="63.5" r="4.5"></circle><circle cx="77" cy="36.5" r="4.5"></circle><circle cx="63.5" cy="50" r="4.5"></circle><circle cx="50" cy="50" r="4.5"></circle><circle cx="36.5" cy="50" r="4.5"></circle><circle cx="23" cy="50" r="4.5"></circle><circle cx="9.5" cy="50" r="4.5"></circle><circle cx="63.5" cy="77" r="4.5"></circle><circle cx="63.5" cy="23" r="4.5"></circle></g></svg>                                </span>
                                                            </a>
                            
                                                        <div class="as-p-1 mail">
                                <p>or email us at <a href="#" aria-label="name"><span class="__cf_email__" data-cfemail="81e8efe7eec1e6ece0e8edafe2eeec">[email&#160;protected]</span></a></p>                            </div>
                                                    </div>
                    </div>

                    <div class="as-cta-2-manager">
                                                <div class="img-elm wa-fix wa-img-cover">
                            <img decoding="async" src="../wp-content/uploads/2025/10/author-7.webp" alt="author-7">
                        </div>
                        
                        <h4 class="as-h-1 text-elm">
                            Hi                                                        <img decoding="async" src="../wp-content/uploads/2025/10/hy-icon.gif" alt="hy-icon">                             I’m Lisa, Customer Manager                        </h4>
                    </div>
                </div>
                
                <!-- projects -->
                                <div class="as-cta-2-projects">
                    <div class="title-x-btn">
                                                <h4 class="as-h-1 title wa_title_spilt_1">
                            Check Our Projects                        </h4>
                        
                        <!-- pr-btn -->
                                                <a href="../contact-us/index.html"
                        target="_self"
                        rel=""
                        aria-label="Get started" class="as-pr-btn-1 wa_btn_split_1 wa_magnetic_btn_1 wow fadeInRight2" data-wow-delay=".2s">
                            <span class="text">
                                Get started                            </span>

                                                        <span class="icon">
                                <span class="icon-fix wa-fix">
                                    <i aria-hidden="true" class="flaticon flaticon-dot-arrow-1"></i>                                    <i aria-hidden="true" class="flaticon flaticon-next"></i>                                </span>
                            </span>
                                                    </a>
                                            </div>
                    <div class="as-cta-2-projects-ss">
                                                <div class="ss-elm">
                            <img decoding="async" src="../wp-content/uploads/2025/10/cta2-mockup.webp" alt="cta2-mockup">
                        </div>
                        
                                                <div class="ss-elm wa-fix">
                            <img decoding="async" class="wow slideInLeft" src="../wp-content/uploads/2025/10/cta2-ss-1.webp" alt="cta2-ss-1">
                        </div>
                        
                                                <div class="ss-elm wa-fix">
                            <img decoding="async" class="wow slideInLeft" data-wow-delay=".1s" src="../wp-content/uploads/2025/10/cta2-ss-2.webp" alt="cta2-ss-2">
                        </div>
                        
                                                <div class="ss-elm wa-fix">
                            <img decoding="async" class="wow slideInLeft" data-wow-delay=".2s" src="../wp-content/uploads/2025/10/cta2-ss-3.webp" alt="cta2-ss-3">
                        </div>
                        
                    </div>
                </div>
                            </div>

            <!-- right-form -->
            <div class="as-cta-2-form-wrap">
                <div class="as-cta-2-form-content">
                                        <p class="as-p-1 subtitle"><span class="dot"></span>
                        Response time: 1 hours                    </p>
                    
                                        <h3 class="as-h-1 title">
                        Tell details about your project                    </h3>
                                    </div>
                <div class="tx-form">
                    
<div class="wpcf7 no-js" id="wpcf7-f6-p23-o1" lang="en-US" dir="ltr" data-wpcf7-id="6">
<div class="screen-reader-response"><p role="status" aria-live="polite" aria-atomic="true"></p> <ul></ul></div>
<form action="https://themexriver.com/wp/avista/about/#wpcf7-f6-p23-o1" method="post" class="wpcf7-form init" aria-label="Contact form" novalidate="novalidate" data-status="init">
<fieldset class="hidden-fields-container"><input type="hidden" name="_wpcf7" value="6" /><input type="hidden" name="_wpcf7_version" value="6.1.4" /><input type="hidden" name="_wpcf7_locale" value="en_US" /><input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f6-p23-o1" /><input type="hidden" name="_wpcf7_container_post" value="23" /><input type="hidden" name="_wpcf7_posted_data_hash" value="" />
</fieldset>
<div class="as-cta-2-form">
    <span class="wpcf7-form-control-wrap" data-name="text-60"><input size="40" maxlength="400" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required as-cta-2-form-input as-p-1 wa_placeholder" aria-required="true" aria-invalid="false" placeholder="Full name *" value="" type="text" name="text-60" /></span>
    <span class="wpcf7-form-control-wrap" data-name="email-60"><input size="40" maxlength="400" class="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email as-cta-2-form-input as-p-1 wa_placeholder" aria-required="true" aria-invalid="false" placeholder="Your email *" value="" type="email" name="email-60" /></span>
    <div class="input-box">
        <div class="nice-select as-cta-2-form-selector">
            <span class="wpcf7-form-control-wrap" data-name="select-715"><select class="wpcf7-form-control wpcf7-select" aria-invalid="false" name="select-715"><option value="">Budget *</option><option value="1000$ - 1500$">1000$ - 1500$</option><option value="1500$ - 2000$">1500$ - 2000$</option><option value="2000$ - 2500$">2000$ - 2500$</option><option value="2500$ - 3000$">2500$ - 3000$</option></select></span>                   
        </div>
        <div class="nice-select as-cta-2-form-selector">
            <span class="wpcf7-form-control-wrap" data-name="select-716"><select class="wpcf7-form-control wpcf7-select" aria-invalid="false" name="select-716"><option value="">I’m interested in...</option><option value="UI/UX Design">UI/UX Design</option><option value="App Development">App Development</option><option value="Website Development">Website Development</option><option value="Digital Marketing">Digital Marketing</option></select></span>                     
        </div>
    </div>
    <span class="wpcf7-form-control-wrap" data-name="textarea-60"><textarea cols="40" rows="10" maxlength="2000" class="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required as-cta-2-form-input as-p-1 wa_placeholder" aria-required="true" aria-invalid="false" placeholder="Your message" name="textarea-60"></textarea></span>
    <div class="form-checkbox">
        <input id="checkbox" type="checkbox">
        <label class="checkbox-label as-p-1" for="checkbox">Subscribe to Newsletter</label>
    </div>
    <div class="button-x-author" >
        <div class="author">
            <div class="author-img wa-img-cover wa-fix">
                <img decoding="async" src="../wp-content/uploads/2025/10/author-5.webp" alt="">
            </div>
            <div class="content">
                <h4 class="as-h-1 author-name">Liven Geo</h4>
                <p class="as-p-1 author-dg">Support Developer</p>
            </div>
        </div>
        <button type="submit" class="as-pr-btn-1 wa_btn_split_1 wa_magnetic_btn_1">
            <span class="text">Submit Now</span>
            <span class="icon">
                <span class="icon-fix wa-fix">
                    <i class="flaticon-dot-arrow-1 flaticon"></i>
                    <i class="flaticon-next flaticon"></i>
                </span>
            </span>
        </button>                                 
    </div>
</div><div class="wpcf7-response-output" aria-hidden="true"></div>
</form>
</div>
                </div>
            </div>
        </div>
    </div>
</section>				</div>
				</div>
				</div>
		<div class="elementor-element elementor-element-26cf66b e-con-full e-flex e-con e-parent" data-id="26cf66b" data-element_type="container">
				<div class="elementor-element elementor-element-00c9907 elementor-widget elementor-widget-tx_post_grid elh-el tx_post_grid" data-id="00c9907" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_post_grid.default">
				<div class="elementor-widget-container">
					<section class="as-blog-1-area pt-90 pb-105 tx-section ">
    <div class="container as-container-1">

        <!-- section-title -->
        <div class="as-blog-1-sec-title mb-40">
            <div class="left">
                                <h6 class="as-subtitle-1 tx-subTitle">
                    <span class="icon">
                        {<i aria-hidden="true" class="fas fa-circle"></i>}                    </span>
                    Press Release                </h6>
                                <h2 class="tx-title as-sec-title-1 wa_title_spilt_1">A Peek at What We've Been Working on</h2>            </div>

            <div class="right">
                                <p class="as-p-1 sec-disc wow fadeInRight2 tx-description" data-wow-delay=".2s">
                    At Avista Digital Agency, we provide a full range of digital solutions designed
                                to help businesses grow, connect, and succeed.                </p>
                
                                <div class="btn-wrap wow fadeInLeft2" data-wow-delay=".3s">
                    <a href="../blog/index.html"
                    target="_self"
                    rel=""
                    aria-label="More Blog" class="as-pr-btn-1-v2 tx-button">
                        <span class="text">More Blog</span>
                                                <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860" height="100" viewBox="0 0 100 100" width="100"><g><circle cx="90.5" cy="50" r="4.5"></circle><circle cx="77" cy="50" r="4.5"></circle><circle cx="77" cy="63.5" r="4.5"></circle><circle cx="77" cy="36.5" r="4.5"></circle><circle cx="63.5" cy="50" r="4.5"></circle><circle cx="50" cy="50" r="4.5"></circle><circle cx="36.5" cy="50" r="4.5"></circle><circle cx="23" cy="50" r="4.5"></circle><circle cx="9.5" cy="50" r="4.5"></circle><circle cx="63.5" cy="77" r="4.5"></circle><circle cx="63.5" cy="23" r="4.5"></circle></g></svg>                        </span>
                                            </a>
                </div>
                            </div>
        </div>

        <div class="as-blog-1-wrap">

            <!-- left -->
            <div class="as-blog-1-left wa-fix wa_magnetic_1_trigger wa-fix">
                                <div class="logo-elm">
                    <img decoding="async" class="wow fadeInUp2" src="../wp-content/uploads/2025/10/logo-1.webp"
                    alt="logo-1">
                </div>
                
                                <h4 class="as-h-1 title wa_title_spilt_1">
                    Best Creative Agency WordPress <span>Themes</span>                </h4>
                
                                <svg class="as-blog-1-left-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="475px" height="447px">
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M48.999,244.0 C50.656,244.0 51.999,245.342 51.999,247.0 C51.999,248.657 50.656,249.999 48.999,249.999 C47.343,249.999 46.0,248.657 46.0,247.0 C46.0,245.342 47.343,244.0 48.999,244.0 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M285.0,147.999 C286.656,147.999 288.0,149.343 288.0,151.0 C288.0,152.656 286.656,154.0 285.0,154.0 C283.343,154.0 281.999,152.656 281.999,151.0 C281.999,149.343 283.343,147.999 285.0,147.999 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M158.945,296.109 C159.467,296.109 159.890,296.532 159.890,297.54 C159.890,297.576 159.467,297.999 158.945,297.999 C158.423,297.999 158.0,297.576 158.0,297.54 C158.0,296.532 158.423,296.109 158.945,296.109 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M184.968,111.62 C186.56,111.62 186.937,111.943 186.937,113.30 C186.937,114.118 186.56,114.999 184.968,114.999 C183.881,114.999 183.0,114.118 183.0,113.30 C183.0,111.943 183.881,111.62 184.968,111.62 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M252.999,382.0 C254.656,382.0 256.0,383.342 256.0,385.0 C256.0,386.657 254.656,387.999 252.999,387.999 C251.343,387.999 250.0,386.657 250.0,385.0 C250.0,383.342 251.343,382.0 252.999,382.0 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M168.0,213.0 C169.656,213.0 170.999,214.342 170.999,216.0 C170.999,217.657 169.656,218.999 168.0,218.999 C166.343,218.999 165.0,217.657 165.0,216.0 C165.0,214.342 166.343,213.0 168.0,213.0 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M293.945,267.109 C294.467,267.109 294.890,267.532 294.890,268.54 C294.890,268.576 294.467,268.999 293.945,268.999 C293.423,268.999 293.0,268.576 293.0,268.54 C293.0,267.532 293.423,267.109 293.945,267.109 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M61.968,129.62 C63.56,129.62 63.937,129.944 63.937,131.31 C63.937,132.118 63.56,132.999 61.968,132.999 C60.881,132.999 60.0,132.118 60.0,131.31 C60.0,129.944 60.881,129.62 61.968,129.62 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M110.874,327.999 C109.218,327.999 107.875,329.343 107.875,330.999 C107.875,332.656 109.218,334.0 110.874,334.0 C112.531,334.0 113.874,332.656 113.874,330.999 C113.874,329.343 112.531,327.999 110.874,327.999 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M256.875,87.999 C255.218,87.999 253.874,89.343 253.874,91.0 C253.874,92.656 255.218,94.0 256.875,94.0 C258.531,94.0 259.875,92.656 259.875,91.0 C259.875,89.343 258.531,87.999 256.875,87.999 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M0.929,380.109 C0.407,380.109 0.15,380.532 0.15,381.55 C0.15,381.577 0.407,382.0 0.929,382.0 C1.451,382.0 1.875,381.577 1.875,381.55 C1.875,380.532 1.451,380.109 0.929,380.109 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M207.906,443.62 C206.818,443.62 205.937,443.943 205.937,445.30 C205.937,446.118 206.818,446.999 207.906,446.999 C208.993,446.999 209.874,446.118 209.874,445.30 C209.874,443.943 208.993,443.62 207.906,443.62 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M409.875,300.999 C408.218,300.999 406.875,302.343 406.875,304.0 C406.875,305.656 408.218,307.0 409.875,307.0 C411.531,307.0 412.874,305.656 412.874,304.0 C412.874,302.343 411.531,300.999 409.875,300.999 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M471.874,169.0 C470.218,169.0 468.875,170.342 468.875,172.0 C468.875,173.657 470.218,174.999 471.874,174.999 C473.531,174.999 474.875,173.657 474.875,172.0 C474.875,170.342 473.531,169.0 471.874,169.0 Z"/>
                    <path fill-rule="evenodd"  fill="rgb(253, 63, 0)"
                    d="M130.906,0.62 C129.818,0.62 128.937,0.943 128.937,2.31 C128.937,3.118 129.818,4.0 130.906,4.0 C131.993,4.0 132.874,3.118 132.874,2.31 C132.874,0.943 131.993,0.62 130.906,0.62 Z"/>
                </svg>
                
                                <div class="as-blog-1-left-bg-img">
                    <div class="wa_magnetic_1_elm w-100 h-100">
                        <img decoding="async" class="wow fadeInRight2" src="../wp-content/uploads/2025/10/b1-illus-1.webp"
                    alt="b1-illus-1">
                    </div>
                </div>
                            </div>

            <!-- right -->
            <div class="as-blog-1-right">

                                <div class="as-blog-1-item wa_magnetic_1_trigger ">
                                        <div class="item-img wa-fix wa-img-cover">
                        <img decoding="async" class="wa_magnetic_1_elm" src="../wp-content/uploads/2025/10/b1-img-1.webp"
                        alt="b1-img-1">
                    </div>
                    
                    <div class="content-wrap">
                                                <h6 class="as-p-1 categories">
                            <a href="../category/brand-design-identity/index.html" aria-label="Brand Design Identity">
                                Brand Design Identity                            </a>
                        </h6>
                        
                        <h4 class="as-h-1 title wa_magnetic_btn_1">
                            <a class="wa-line-limit has-line-2" href="../how-businesses-can-leverage-data-for-smarter-decisions/index.html" aria-label="How Great Design Translates into Business Success">
                                How Great Design Translates into Business Success                            </a>
                        </h4>

                                                <p class="as-p-1 disc wa-line-limit has-line-3">
                            Great design is more than just aesthetics—it’s a
                                        powerful business tool. In today’s competitive
                                        marketplace, design directly influences.                        </p>
                        

                                                <div class="btn-wrap">
                            <a href="../how-businesses-can-leverage-data-for-smarter-decisions/index.html" aria-label="name" class="as-pr-btn-1-v2">
                                <span class="text">Read More</span>
                                                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860" height="100" viewBox="0 0 100 100" width="100"><g><circle cx="90.5" cy="50" r="4.5"></circle><circle cx="77" cy="50" r="4.5"></circle><circle cx="77" cy="63.5" r="4.5"></circle><circle cx="77" cy="36.5" r="4.5"></circle><circle cx="63.5" cy="50" r="4.5"></circle><circle cx="50" cy="50" r="4.5"></circle><circle cx="36.5" cy="50" r="4.5"></circle><circle cx="23" cy="50" r="4.5"></circle><circle cx="9.5" cy="50" r="4.5"></circle><circle cx="63.5" cy="77" r="4.5"></circle><circle cx="63.5" cy="23" r="4.5"></circle></g></svg>                                </span>
                                                            </a>
                        </div>
                                            </div>
                </div>
                                <div class="as-blog-1-item wa_magnetic_1_trigger ">
                                        <div class="item-img wa-fix wa-img-cover">
                        <img decoding="async" class="wa_magnetic_1_elm" src="../wp-content/uploads/2025/10/b1-img-2.webp"
                        alt="b1-img-2">
                    </div>
                    
                    <div class="content-wrap">
                                                <h6 class="as-p-1 categories">
                            <a href="../category/brand-design-identity/index.html" aria-label="Brand Design Identity">
                                Brand Design Identity                            </a>
                        </h6>
                        
                        <h4 class="as-h-1 title wa_magnetic_btn_1">
                            <a class="wa-line-limit has-line-2" href="../it-industry-key-strategies-for-business-growth/index.html" aria-label="How Great Design Translates into Business Success">
                                How Great Design Translates into Business Success                            </a>
                        </h4>

                                                <p class="as-p-1 disc wa-line-limit has-line-3">
                            Great design is more than just aesthetics—it’s a
                                        powerful business tool. In today’s competitive
                                        marketplace, design directly influences.                        </p>
                        

                                                <div class="btn-wrap">
                            <a href="../it-industry-key-strategies-for-business-growth/index.html" aria-label="name" class="as-pr-btn-1-v2">
                                <span class="text">Read More</span>
                                                                <span class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="fi_12116860" height="100" viewBox="0 0 100 100" width="100"><g><circle cx="90.5" cy="50" r="4.5"></circle><circle cx="77" cy="50" r="4.5"></circle><circle cx="77" cy="63.5" r="4.5"></circle><circle cx="77" cy="36.5" r="4.5"></circle><circle cx="63.5" cy="50" r="4.5"></circle><circle cx="50" cy="50" r="4.5"></circle><circle cx="36.5" cy="50" r="4.5"></circle><circle cx="23" cy="50" r="4.5"></circle><circle cx="9.5" cy="50" r="4.5"></circle><circle cx="63.5" cy="77" r="4.5"></circle><circle cx="63.5" cy="23" r="4.5"></circle></g></svg>                                </span>
                                                            </a>
                        </div>
                                            </div>
                </div>
                            </div>
        </div>
    </div>
</section>				</div>
				</div>
				</div>
				</div>
													<div data-elementor-type="wp-post" data-elementor-id="2686" class="elementor elementor-2686">
				<div class="elementor-element elementor-element-4024d54 e-con-full e-flex e-con e-parent" data-id="4024d54" data-element_type="container">
				<div class="elementor-element elementor-element-fdd45c3 elementor-widget elementor-widget-tx_footers elh-el tx_footers" data-id="fdd45c3" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_footers.default">
				<div class="elementor-widget-container">
					<footer class="as-footer-1-area wa-bg-default pt-95 pb-120 tx-section" data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/11/f1-bg-img.webp">
    <div class="container as-container-1">
        <div class="as-footer-1-container">

            <div class="as-footer-1-wrap mb-90">

                <!-- single-widget -->
                                <div class="as-footer-1-widget">
                    <div class="as-footer-1-newsletter">
                                                <h4 class="as-h-1 title">
                            <i aria-hidden="true" class="flaticon flaticon-notification"></i>                            Newsletter                        </h4>
                        
                                                <p class="as-p-1 disc">Keep up out latest update subscribe our newsletter!</p>
                        
                                                <div class="tx-contactForm">
                            
<div class="wpcf7 no-js" id="wpcf7-f2678-o2" lang="en-US" dir="ltr" data-wpcf7-id="2678">
<div class="screen-reader-response"><p role="status" aria-live="polite" aria-atomic="true"></p> <ul></ul></div>
<form action="https://themexriver.com/wp/avista/about/#wpcf7-f2678-o2" method="post" class="wpcf7-form init" aria-label="Contact form" novalidate="novalidate" data-status="init">
<fieldset class="hidden-fields-container"><input type="hidden" name="_wpcf7" value="2678" /><input type="hidden" name="_wpcf7_version" value="6.1.4" /><input type="hidden" name="_wpcf7_locale" value="en_US" /><input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f2678-o2" /><input type="hidden" name="_wpcf7_container_post" value="0" /><input type="hidden" name="_wpcf7_posted_data_hash" value="" />
</fieldset>
<div class="as-footer-1-newsletter-form wa-p-relative">
    <span class="wpcf7-form-control-wrap" data-name="email-650"><input size="40" maxlength="400" class="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email as-footer-1-newsletter-form-input wa_placeholder" aria-required="true" aria-invalid="false" placeholder="Email Address" value="" type="email" name="email-650" /></span>
    <button type="submit" class="as-footer-1-newsletter-form-btn as-pr-btn-1 wa_btn_split_1 wa_magnetic_btn_1" >
        <span class="text wa-fix">Subscribe</span>
    </button>
</div><div class="wpcf7-response-output" aria-hidden="true"></div>
</form>
</div>
                        </div>
                        
                    </div>
                </div>
                
                <!-- single-widget -->
                                <div class="as-footer-1-widget">
                                        <h3 class="as-footer-1-widget-title as-h-1">Quick Navigation</h3>
                                        <ul class="wa-ul as-footer-1-menu">
                                                <li class="as-p-1">
                            <a href="index.html"
                            target="_self"
                            rel="">
                                                                About us                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="index.html"
                            target="_self"
                            rel="">
                                                                Features                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="../pricing/index.html"
                            target="_self"
                            rel="">
                                                                Pricing                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="index.html"
                            target="_self"
                            rel="">
                                                                Testimonial                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="../faqs/index.html"
                            target="_self"
                            rel="">
                                                                FAQ's                            </a>
                        </li>
                                            </ul>
                </div>
                
                <!-- single-widget -->
                                <div class="as-footer-1-widget">
                                        <h3 class="as-footer-1-widget-title as-h-1">All Page</h3>
                                        <ul class="wa-ul as-footer-1-menu">
                                                <li class="as-p-1">
                            <a href="../index.html"
                            target="_self"
                            rel="">
                                                                Home                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="../contact-us/index.html"
                            target="_self"
                            rel="">
                                                                Contact                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="../blog/index.html"
                            target="_self"
                            rel="">
                                                                Blogs                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="#"
                            target="_self"
                            rel="">
                                                                Privacy Policy                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="#"
                            target="_self"
                            rel="">
                                                                404                            </a>
                        </li>
                                            </ul>
                </div>
                
                <!-- single-widget -->
                                <div class="as-footer-1-widget">
                                        <h3 class="as-footer-1-widget-title as-h-1">Social Media</h3>
                                        <ul class="wa-ul as-footer-1-menu">
                                                <li class="as-p-1">
                            <a href="#"
                            target="_self"
                            rel="">
                                                                Facebook                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="#"
                            target="_self"
                            rel="">
                                                                Instagram                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="#"
                            target="_self"
                            rel="">
                                                                Twitter                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="#"
                            target="_self"
                            rel="">
                                                                linkedin                            </a>
                        </li>
                                            </ul>
                </div>
                
                <!-- single-widget -->
                                <div class="as-footer-1-widget">
                    <div class="wow backInUp2">
                        <a href="https://themexriver.com/cdn-cgi/l/email-protection#bed7d0d8d1fed9d3dfd7d290ddd1d3" target="_self" rel="" aria-label="info@gmail.com" class="as-footer-1-big-email as-p-1 ">
                            <span class="text wa_magnetic_btn_1">
                                <span class="__cf_email__" data-cfemail="066f68606946616b676f6a2865696b">[email&#160;protected]</span>                            </span>
                        </a>
                    </div>
                </div>
                
            </div>

            <!-- logo -->
                        <div class="text-center mb-30">
                <a href="https://themexriver.com/wp/avista" class="as-footer-1-logo wa-fix tx-logo">
                    <img class="wow bounceInUp" src="../wp-content/uploads/2025/11/logo-5.svg"
                    alt="logo-5">
                </a>
            </div>
            
            <!-- footer-bottom -->
            <div class="as-footer-1-bottom">
                                <p class="as-footer-1-copyright as-p-1">
                    © All rights reserved <span class="copyright-year"></span>                </p>
                
                                <p class="as-footer-1-make as-p-1">
                    make with <i class="fa-solid fa-heart"></i> by <a href="#" aria-label="Themexriver">Themexriver</a>                </p>
                
                                <div class="as-footer-1-bottom-link">
                                        <a class="link-elm as-p-1" href="#"
                    target="_self"
                    rel="">
                                                Privacy Policy                    </a>
                                    </div>
                            </div>
        </div>
    </div>
</footer>				</div>
				</div>
				</div>
				</div>
						<script data-cfasync="false" src="../../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script type="speculationrules">
{"prefetch":[{"source":"document","where":{"and":[{"href_matches":"/wp/avista/*"},{"not":{"href_matches":["/wp/avista/wp-*.php","/wp/avista/wp-admin/*","/wp/avista/wp-content/uploads/*","/wp/avista/wp-content/*","/wp/avista/wp-content/plugins/*","/wp/avista/wp-content/themes/avista/*","/wp/avista/*\\?(.+)"]}},{"not":{"selector_matches":"a[rel~=\"nofollow\"]"}},{"not":{"selector_matches":".no-prefetch, .no-prefetch a"}}]},"eagerness":"conservative"}]}
</script>
			<script>
				const lazyloadRunObserver = () => {
					const lazyloadBackgrounds = document.querySelectorAll( \`.e-con.e-parent:not(.e-lazyloaded)\` );
					const lazyloadBackgroundObserver = new IntersectionObserver( ( entries ) => {
						entries.forEach( ( entry ) => {
							if ( entry.isIntersecting ) {
								let lazyloadBackground = entry.target;
								if( lazyloadBackground ) {
									lazyloadBackground.classList.add( 'e-lazyloaded' );
								}
								lazyloadBackgroundObserver.unobserve( entry.target );
							}
						});
					}, { rootMargin: '200px 0px 200px 0px' } );
					lazyloadBackgrounds.forEach( ( lazyloadBackground ) => {
						lazyloadBackgroundObserver.observe( lazyloadBackground );
					} );
				};
				const events = [
					'DOMContentLoaded',
					'elementor/lazyload/observe',
				];
				events.forEach( ( event ) => {
					document.addEventListener( event, lazyloadRunObserver );
				} );
			</script>
				<script>
		(function () {
			var c = document.body.className;
			c = c.replace(/woocommerce-no-js/, 'woocommerce-js');
			document.body.className = c;
		})();
	</script>
	<link rel='stylesheet' id='wc-blocks-style-css' href='../wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks6dd8.css?ver=wc-10.4.2' media='all' />
<link rel='stylesheet' id='elementor-post-2582-css' href='../wp-content/uploads/elementor/css/post-258288fa.css?ver=1776695811' media='all' />
<link rel='stylesheet' id='elementor-post-2686-css' href='../wp-content/uploads/elementor/css/post-268688fa.css?ver=1776695811' media='all' />
<script src="../wp-includes/js/dist/hooks.minaf5f.js?ver=dd5603f07f9220ed27f1" id="wp-hooks-js"></script>
<script src="../wp-includes/js/dist/i18n.min1cde.js?ver=c26c3dc7bed366793375" id="wp-i18n-js"></script>
<script id="wp-i18n-js-after">
wp.i18n.setLocaleData( { 'text direction\u0004ltr': [ 'ltr' ] } );
//# sourceURL=wp-i18n-js-after
</script>
<script src="../wp-content/plugins/contact-form-7/includes/swv/js/index1b46.js?ver=6.1.4" id="swv-js"></script>
<script id="contact-form-7-js-before">
var wpcf7 = {
    "api": {
        "root": "https:\/\/themexriver.com\/wp\/avista\/wp-json\/",
        "namespace": "contact-form-7\/v1"
    }
};
//# sourceURL=contact-form-7-js-before
</script>
<script src="../wp-content/plugins/contact-form-7/includes/js/index1b46.js?ver=6.1.4" id="contact-form-7-js"></script>
<script src="../wp-content/themes/avista/assets/js/bootstrap-min67b1.js?ver=6.9.5" id="bootstrap-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/swiper.min67b1.js?ver=6.9.5" id="swiper-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/lenis.min67b1.js?ver=6.9.5" id="lenis-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/wow-min67b1.js?ver=6.9.5" id="wow-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/odometer.min67b1.js?ver=6.9.5" id="odometer-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/nice-select.min67b1.js?ver=6.9.5" id="nice-select-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/jquery.marquee.min67b1.js?ver=6.9.5" id="jquery-marquee-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/magnific-popup.min67b1.js?ver=6.9.5" id="magnific-popup-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/SplitText.min67b1.js?ver=6.9.5" id="SplitText-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/gsap.min67b1.js?ver=6.9.5" id="gsap-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/customEase.min67b1.js?ver=6.9.5" id="customEase-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/appear67b1.js?ver=6.9.5" id="appear-js"></script>
<script src="../wp-content/themes/avista/assets/js/scrollTrigger.min67b1.js?ver=6.9.5" id="scrollTrigger-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/pixi.min67b1.js?ver=6.9.5" id="pixi-min-js"></script>
<script src="../wp-content/themes/avista/assets/js/cursor67b1.js?ver=6.9.5" id="cursor-js"></script>
<script src="../wp-content/themes/avista/assets/js/touchspin67b1.js?ver=6.9.5" id="touchspin-js"></script>
<script src="../wp-content/themes/avista/assets/js/avista-custom67b1.js?ver=6.9.5" id="avista-custom-js"></script>
<script src="../wp-content/themes/avista/assets/js/avista-core3311.js?ver=1785262577" id="avista-core-js"></script>
<script src="../wp-content/plugins/woocommerce/assets/js/sourcebuster/sourcebuster.min278d.js?ver=10.4.2" id="sourcebuster-js-js"></script>
<script id="wc-order-attribution-js-extra">
var wc_order_attribution = {"params":{"lifetime":1.0e-5,"session":30,"base64":false,"ajaxurl":"https://themexriver.com/wp/avista/wp-admin/admin-ajax.php","prefix":"wc_order_attribution_","allowTracking":true},"fields":{"source_type":"current.typ","referrer":"current_add.rf","utm_campaign":"current.cmp","utm_source":"current.src","utm_medium":"current.mdm","utm_content":"current.cnt","utm_id":"current.id","utm_term":"current.trm","utm_source_platform":"current.plt","utm_creative_format":"current.fmt","utm_marketing_tactic":"current.tct","session_entry":"current_add.ep","session_start_time":"current_add.fd","session_pages":"session.pgs","session_count":"udata.vst","user_agent":"udata.uag"}};
//# sourceURL=wc-order-attribution-js-extra
</script>
<script src="../wp-content/plugins/woocommerce/assets/js/frontend/order-attribution.min278d.js?ver=10.4.2" id="wc-order-attribution-js"></script>
<script src="../wp-content/plugins/elementor/assets/js/webpack.runtime.min37de.js?ver=3.33.4" id="elementor-webpack-runtime-js"></script>
<script src="../wp-content/plugins/elementor/assets/js/frontend-modules.min37de.js?ver=3.33.4" id="elementor-frontend-modules-js"></script>
<script src="../wp-includes/js/jquery/ui/core.minb37e.js?ver=1.13.3" id="jquery-ui-core-js"></script>
<script id="elementor-frontend-js-before">
var elementorFrontendConfig = {"environmentMode":{"edit":false,"wpPreview":false,"isScriptDebug":false},"i18n":{"shareOnFacebook":"Share on Facebook","shareOnTwitter":"Share on Twitter","pinIt":"Pin it","download":"Download","downloadImage":"Download image","fullscreen":"Fullscreen","zoom":"Zoom","share":"Share","playVideo":"Play Video","previous":"Previous","next":"Next","close":"Close","a11yCarouselPrevSlideMessage":"Previous slide","a11yCarouselNextSlideMessage":"Next slide","a11yCarouselFirstSlideMessage":"This is the first slide","a11yCarouselLastSlideMessage":"This is the last slide","a11yCarouselPaginationBulletMessage":"Go to slide"},"is_rtl":false,"breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},"responsive":{"breakpoints":{"mobile":{"label":"Mobile Portrait","value":767,"default_value":767,"direction":"max","is_enabled":true},"mobile_extra":{"label":"Mobile Landscape","value":880,"default_value":880,"direction":"max","is_enabled":false},"tablet":{"label":"Tablet Portrait","value":1024,"default_value":1024,"direction":"max","is_enabled":true},"tablet_extra":{"label":"Tablet Landscape","value":1200,"default_value":1200,"direction":"max","is_enabled":false},"laptop":{"label":"Laptop","value":1366,"default_value":1366,"direction":"max","is_enabled":false},"widescreen":{"label":"Widescreen","value":2400,"default_value":2400,"direction":"min","is_enabled":false}},"hasCustomBreakpoints":false},"version":"3.33.4","is_static":false,"experimentalFeatures":{"additional_custom_breakpoints":true,"container":true,"e_optimized_markup":true,"e_pro_free_trial_popup":true,"nested-elements":true,"home_screen":true,"global_classes_should_enforce_capabilities":true,"e_variables":true,"cloud-library":true,"e_opt_in_v4_page":true,"import-export-customization":true},"urls":{"assets":"https:\/\/themexriver.com\/wp\/avista\/wp-content\/plugins\/elementor\/assets\/","ajaxurl":"https:\/\/themexriver.com\/wp\/avista\/wp-admin\/admin-ajax.php","uploadUrl":"https:\/\/themexriver.com\/wp\/avista\/wp-content\/uploads"},"nonces":{"floatingButtonsClickTracking":"1401e7d743"},"swiperClass":"swiper","settings":{"page":[],"editorPreferences":[]},"kit":{"active_breakpoints":["viewport_mobile","viewport_tablet"],"global_image_lightbox":"yes","lightbox_enable_counter":"yes","lightbox_enable_fullscreen":"yes","lightbox_enable_zoom":"yes","lightbox_enable_share":"yes","lightbox_title_src":"title","lightbox_description_src":"description"},"post":{"id":23,"title":"About%20%E2%80%93%20Avista","excerpt":"","featuredImage":false}};
//# sourceURL=elementor-frontend-js-before
</script>
<script src="../wp-content/plugins/elementor/assets/js/frontend.min37de.js?ver=3.33.4" id="elementor-frontend-js"></script>
<script src="../wp-content/plugins/avista-core/assets/js/elh-element3311.js?ver=1785262577" id="elh-element-helper-js"></script>
<script id="wp-emoji-settings" type="application/json">
{"baseUrl":"https://s.w.org/images/core/emoji/17.0.2/72x72/","ext":".png","svgUrl":"https://s.w.org/images/core/emoji/17.0.2/svg/","svgExt":".svg","source":{"concatemoji":"https://themexriver.com/wp/avista/wp-includes/js/wp-emoji-release.min.js?ver=6.9.5"}}
</script>
<script type="module">
/*! This file is auto-generated */
const a=JSON.parse(document.getElementById("wp-emoji-settings").textContent),o=(window._wpemojiSettings=a,"wpEmojiSettingsSupports"),s=["flag","emoji"];function i(e){try{var t={supportTests:e,timestamp:(new Date).valueOf()};sessionStorage.setItem(o,JSON.stringify(t))}catch(e){}}function c(e,t,n){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);t=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data);e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(n,0,0);const a=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data);return t.every((e,t)=>e===a[t])}function p(e,t){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);var n=e.getImageData(16,16,1,1);for(let e=0;e<n.data.length;e++)if(0!==n.data[e])return!1;return!0}function u(e,t,n,a){switch(t){case"flag":return n(e,"\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f","\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f")?!1:!n(e,"\ud83c\udde8\ud83c\uddf6","\ud83c\udde8\u200b\ud83c\uddf6")&&!n(e,"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f","\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f");case"emoji":return!a(e,"\ud83e\u1fac8")}return!1}function f(e,t,n,a){let r;const o=(r="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?new OffscreenCanvas(300,150):document.createElement("canvas")).getContext("2d",{willReadFrequently:!0}),s=(o.textBaseline="top",o.font="600 32px Arial",{});return e.forEach(e=>{s[e]=t(o,e,n,a)}),s}function r(e){var t=document.createElement("script");t.src=e,t.defer=!0,document.head.appendChild(t)}a.supports={everything:!0,everythingExceptFlag:!0},new Promise(t=>{let n=function(){try{var e=JSON.parse(sessionStorage.getItem(o));if("object"==typeof e&&"number"==typeof e.timestamp&&(new Date).valueOf()<e.timestamp+604800&&"object"==typeof e.supportTests)return e.supportTests}catch(e){}return null}();if(!n){if("undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof URL&&URL.createObjectURL&&"undefined"!=typeof Blob)try{var e="postMessage("+f.toString()+"("+[JSON.stringify(s),u.toString(),c.toString(),p.toString()].join(",")+"));",a=new Blob([e],{type:"text/javascript"});const r=new Worker(URL.createObjectURL(a),{name:"wpTestEmojiSupports"});return void(r.onmessage=e=>{i(n=e.data),r.terminate(),t(n)})}catch(e){}i(n=f(s,u,c,p))}t(n)}).then(e=>{for(const n in e)a.supports[n]=e[n],a.supports.everything=a.supports.everything&&a.supports[n],"flag"!==n&&(a.supports.everythingExceptFlag=a.supports.everythingExceptFlag&&a.supports[n]);var t;a.supports.everythingExceptFlag=a.supports.everythingExceptFlag&&!a.supports.flag,a.supports.everything||((t=a.source||{}).concatemoji?r(t.concatemoji):t.wpemoji&&t.twemoji&&(r(t.twemoji),r(t.wpemoji)))});
//# sourceURL=https://themexriver.com/wp/avista/wp-includes/js/wp-emoji-loader.min.js
</script>
        </div>
    <script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/v4513226cdae34746b4dedf0b4dfa099e1781791509496" integrity="sha512-ZE9pZaUXND66v380QUtch/5sE9tPFh2zg45pR2PB0CVkCtOREv2AJKkSidISWkysEuQ0EH8faUU5du78bx87UQ==" data-cf-beacon='{"version":"2024.11.0","token":"daf30b97c9e94fec9725b4f69e8dd5ef","r":1}' crossorigin="anonymous"></script>
`;

export default async function Page() {
    const settings = await getSiteSettings();
    const finalHtml = injectDynamicSettings(pageHtml, settings);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `document.body.className = "wp-singular page-template page-template-elementor_header_footer page page-id-23 wp-embed-responsive wp-theme-avista theme-avista woocommerce-no-js no-sidebar elementor-default elementor-template-full-width elementor-kit-7 elementor-page elementor-page-23";`,
                }}
            />
            <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
        </>
    );
}
