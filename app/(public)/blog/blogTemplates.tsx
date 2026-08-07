import React from 'react';
import { supabase } from '@/lib/supabase';

export const metadata = {
    title: 'Blog – Avista',
};

export const topHtml = `

<div class="page-wrapper">

    <!-- preloader start -->
        <div class="as-preloader ">
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
                        <a href="/" class="tx-logo wa-offcanvas-top-logo" aria-label="Site Logo"  >
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
                                <a href="/wp-content/uploads/2025/10/p1-img-1.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img loading="lazy" src="/wp-content/uploads/2025/10/p1-img-1.webp" alt="Titan Growth Hub Image">
                </a>
                                <a href="/wp-content/uploads/2025/10/p1-img-2.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img loading="lazy" src="/wp-content/uploads/2025/10/p1-img-2.webp" alt="Titan Growth Hub Image">
                </a>
                                <a href="/wp-content/uploads/2025/10/p1-img-4.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img loading="lazy" src="/wp-content/uploads/2025/10/p1-img-4.webp" alt="Titan Growth Hub Image">
                </a>
                                <a href="/wp-content/uploads/2025/10/p1-img-3.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img loading="lazy" src="/wp-content/uploads/2025/10/p1-img-3.webp" alt="Titan Growth Hub Image">
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
        <div class="as-breadcrumb-area wa-p-relative wa-bg-default tx-breadcrumb " data-background="/website_assets/tx-bg-img.webp" style="background-image: url('/website_assets/tx-bg-img.webp');">
            <div class="container as-container-2">
                <div class="as-breadcrumb-wrap">
                    <h1 class="as-breadcrumb-title">Blog</h1>
                                        <div class="as-breadcrumb-list">
                                                <span class="tx-breadIcon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_23214_336" fill="white">
                            <path d="M20.5153 9.7288L13.0153 2.65255C13.0116 2.64935 13.0082 2.6459 13.005 2.64223C12.7289 2.39111 12.369 2.25195 11.9958 2.25195C11.6225 2.25195 11.2627 2.39111 10.9866 2.64223L10.9763 2.65255L3.48469 9.7288C3.33187 9.86932 3.20989 10.04 3.12646 10.2301C3.04303 10.4202 2.99997 10.6256 3 10.8332V19.5004C3 19.8982 3.15804 20.2797 3.43934 20.561C3.72064 20.8423 4.10218 21.0004 4.5 21.0004H9C9.39782 21.0004 9.77936 20.8423 10.0607 20.561C10.342 20.2797 10.5 19.8982 10.5 19.5004V15.0004H13.5V19.5004C13.5 19.8982 13.658 20.2797 13.9393 20.561C14.2206 20.8423 14.6022 21.0004 15 21.0004H19.5C19.8978 21.0004 20.2794 20.8423 20.5607 20.561C20.842 20.2797 21 19.8982 21 19.5004V10.8332C21 10.6256 20.957 10.4202 20.8735 10.2301C20.7901 10.04 20.6681 9.86932 20.5153 9.7288ZM19.5 19.5004H15V15.0004C15 14.6025 14.842 14.221 14.5607 13.9397C14.2794 13.6584 13.8978 13.5004 13.5 13.5004H10.5C10.1022 13.5004 9.72064 13.6584 9.43934 13.9397C9.15804 14.221 9 14.6025 9 15.0004V19.5004H4.5V10.8332L4.51031 10.8238L12 3.75036L19.4906 10.8219L19.5009 10.8313L19.5 19.5004Z"/>
                            </mask>
                            <path d="M20.5153 9.7288L13.0153 2.65255C13.0116 2.64935 13.0082 2.6459 13.005 2.64223C12.7289 2.39111 12.369 2.25195 11.9958 2.25195C11.6225 2.25195 11.2627 2.39111 10.9866 2.64223L10.9763 2.65255L3.48469 9.7288C3.33187 9.86932 3.20989 10.04 3.12646 10.2301C3.04303 10.4202 2.99997 10.6256 3 10.8332V19.5004C3 19.8982 3.15804 20.2797 3.43934 20.561C3.72064 20.8423 4.10218 21.0004 4.5 21.0004H9C9.39782 21.0004 9.77936 20.8423 10.0607 20.561C10.342 20.2797 10.5 19.8982 10.5 19.5004V15.0004H13.5V19.5004C13.5 19.8982 13.658 20.2797 13.9393 20.561C14.2206 20.8423 14.6022 21.0004 15 21.0004H19.5C19.8978 21.0004 20.2794 20.8423 20.5607 20.561C20.842 20.2797 21 19.8982 21 19.5004V10.8332C21 10.6256 20.957 10.4202 20.8735 10.2301C20.7901 10.04 20.6681 9.86932 20.5153 9.7288ZM19.5 19.5004H15V15.0004C15 14.6025 14.842 14.221 14.5607 13.9397C14.2794 13.6584 13.8978 13.5004 13.5 13.5004H10.5C10.1022 13.5004 9.72064 13.6584 9.43934 13.9397C9.15804 14.221 9 14.6025 9 15.0004V19.5004H4.5V10.8332L4.51031 10.8238L12 3.75036L19.4906 10.8219L19.5009 10.8313L19.5 19.5004Z" fill="#FB0D1F"/>
                            <path d="M20.5153 9.7288L19.1428 11.1835L19.1521 11.1923L19.1616 11.201L20.5153 9.7288ZM13.0153 2.65255L14.3878 1.19783L14.3593 1.17092L14.3297 1.14514L13.0153 2.65255ZM13.005 2.64223L14.5124 1.32781L14.4363 1.24052L14.3506 1.16261L13.005 2.64223ZM11.9958 2.25195L11.9958 0.251953L11.9958 2.25195ZM10.9866 2.64223L9.64094 1.16261L9.60587 1.1945L9.57235 1.22802L10.9866 2.64223ZM10.9763 2.65255L12.3496 4.10649L12.3703 4.08691L12.3905 4.06676L10.9763 2.65255ZM3.48469 9.7288L4.83844 11.201L4.84829 11.1919L4.85803 11.1827L3.48469 9.7288ZM3 10.8332L5 10.8332L5 10.8329L3 10.8332ZM3 19.5004L1 19.5004L3 19.5004ZM10.5 15.0004V13.0004H8.5V15.0004H10.5ZM13.5 15.0004H15.5V13.0004H13.5V15.0004ZM21 10.8332L19 10.8329V10.8332H21ZM19.5 19.5004V21.5004H21.4998L21.5 19.5006L19.5 19.5004ZM15 19.5004H13V21.5004H15V19.5004ZM9 19.5004V21.5004H11V19.5004H9ZM4.5 19.5004H2.5V21.5004H4.5V19.5004ZM4.5 10.8332L3.15461 9.35333L2.5 9.94846V10.8332H4.5ZM4.51031 10.8238L5.8557 12.3036L5.86974 12.2909L5.88354 12.2778L4.51031 10.8238ZM12 3.75036L13.3729 2.29605L11.9997 0.999658L10.6268 2.29632L12 3.75036ZM19.4906 10.8219L18.1177 12.2762L18.1314 12.2892L18.1453 12.3018L19.4906 10.8219ZM19.5009 10.8313L21.5009 10.8315L21.501 9.94663L20.8463 9.3514L19.5009 10.8313ZM20.5153 9.7288L21.8878 8.27408L14.3878 1.19783L13.0153 2.65255L11.6428 4.10726L19.1428 11.1835L20.5153 9.7288ZM13.0153 2.65255L14.3297 1.14514C14.3947 1.2018 14.4557 1.26283 14.5124 1.32781L13.005 2.64223L11.4976 3.95666C11.5606 4.02898 11.6286 4.0969 11.7009 4.15996L13.0153 2.65255ZM13.005 2.64223L14.3506 1.16261C13.7063 0.576649 12.8667 0.251953 11.9958 0.251953L11.9958 2.25195L11.9958 4.25195C11.8714 4.25195 11.7514 4.20557 11.6594 4.12186L13.005 2.64223ZM11.9958 2.25195L11.9958 0.251953C11.1249 0.251953 10.2852 0.576649 9.64094 1.16261L10.9866 2.64223L12.3322 4.12186C12.2401 4.20557 12.1202 4.25195 11.9958 4.25195L11.9958 2.25195ZM10.9866 2.64223L9.57235 1.22802L9.56204 1.23833L10.9763 2.65255L12.3905 4.06676L12.4008 4.05645L10.9866 2.64223ZM10.9763 2.65255L9.60291 1.19861L2.11135 8.27486L3.48469 9.7288L4.85803 11.1827L12.3496 4.10649L10.9763 2.65255ZM3.48469 9.7288L2.13094 8.2566C1.77437 8.58448 1.48974 8.98281 1.29508 9.42637L3.12646 10.2301L4.95785 11.0339C4.93004 11.0972 4.88938 11.1541 4.83844 11.201L3.48469 9.7288ZM3.12646 10.2301L1.29508 9.42637C1.1004 9.86993 0.999926 10.3491 1 10.8335L3 10.8332L5 10.8329C5.00001 10.9021 4.98566 10.9705 4.95785 11.0339L3.12646 10.2301ZM3 10.8332H1V19.5004H3H5V10.8332H3ZM3 19.5004L1 19.5004C1 20.4286 1.36875 21.3189 2.02513 21.9752L3.43934 20.561L4.85355 19.1468C4.94732 19.2406 5 19.3677 5 19.5004L3 19.5004ZM3.43934 20.561L2.02513 21.9752C2.6815 22.6316 3.57174 23.0004 4.5 23.0004V21.0004V19.0004C4.63261 19.0004 4.75979 19.053 4.85355 19.1468L3.43934 20.561ZM4.5 21.0004V23.0004H9V21.0004V19.0004H4.5V21.0004ZM9 21.0004V23.0004C9.92826 23.0004 10.8185 22.6316 11.4749 21.9752L10.0607 20.561L8.64645 19.1468C8.74021 19.053 8.86739 19.0004 9 19.0004V21.0004ZM10.0607 20.561L11.4749 21.9752C12.1312 21.3189 12.5 20.4286 12.5 19.5004H10.5H8.5C8.5 19.3677 8.55268 19.2406 8.64645 19.1468L10.0607 20.561ZM10.5 19.5004H12.5V15.0004H10.5H8.5V19.5004H10.5ZM10.5 15.0004V17.0004H13.5V15.0004V13.0004H10.5V15.0004ZM13.5 15.0004H11.5V19.5004H13.5H15.5V15.0004H13.5ZM13.5 19.5004H11.5C11.5 20.4286 11.8688 21.3189 12.5251 21.9752L13.9393 20.561L15.3536 19.1468C15.4473 19.2406 15.5 19.3677 15.5 19.5004H13.5ZM13.9393 20.561L12.5251 21.9752C13.1815 22.6316 14.0717 23.0004 15 23.0004V21.0004V19.0004C15.1326 19.0004 15.2598 19.053 15.3536 19.1468L13.9393 20.561ZM15 21.0004V23.0004H19.5V21.0004V19.0004H15V21.0004ZM19.5 21.0004V23.0004C20.4283 23.0004 21.3185 22.6316 21.9749 21.9752L20.5607 20.561L19.1464 19.1468C19.2402 19.053 19.3674 19.0004 19.5 19.0004V21.0004ZM20.5607 20.561L21.9749 21.9752C22.6312 21.3189 23 20.4286 23 19.5004H21H19C19 19.3677 19.0527 19.2406 19.1464 19.1468L20.5607 20.561ZM21 19.5004H23V10.8332H21H19V19.5004H21ZM21 10.8332L23 10.8335C23.0001 10.3491 22.8996 9.86993 22.7049 9.42637L20.8735 10.2301L19.0422 11.0339C19.0143 10.9705 19 10.9021 19 10.8329L21 10.8332ZM20.8735 10.2301L22.7049 9.42637C22.5103 8.9828 22.2256 8.58448 21.8691 8.2566L20.5153 9.7288L19.1616 11.201C19.1106 11.1542 19.07 11.0972 19.0422 11.0339L20.8735 10.2301ZM19.5 19.5004V17.5004H15V19.5004V21.5004H19.5V19.5004ZM15 19.5004H17V15.0004H15H13V19.5004H15ZM15 15.0004H17C17 14.0721 16.6312 13.1819 15.9749 12.5255L14.5607 13.9397L13.1464 15.3539C13.0527 15.2601 13 15.133 13 15.0004H15ZM14.5607 13.9397L15.9749 12.5255C15.3185 11.8691 14.4283 11.5004 13.5 11.5004V13.5004V15.5004C13.3674 15.5004 13.2402 15.4477 13.1464 15.3539L14.5607 13.9397ZM13.5 13.5004V11.5004H10.5V13.5004V15.5004H13.5V13.5004ZM10.5 13.5004V11.5004C9.57174 11.5004 8.6815 11.8691 8.02513 12.5255L9.43934 13.9397L10.8536 15.3539C10.7598 15.4477 10.6326 15.5004 10.5 15.5004V13.5004ZM9.43934 13.9397L8.02513 12.5255C7.36875 13.1819 7 14.0721 7 15.0004H9H11C11 15.133 10.9473 15.2601 10.8536 15.3539L9.43934 13.9397ZM9 15.0004H7V19.5004H9H11V15.0004H9ZM9 19.5004V17.5004H4.5V19.5004V21.5004H9V19.5004ZM4.5 19.5004H6.5V10.8332H4.5H2.5V19.5004H4.5ZM4.5 10.8332L5.84539 12.313L5.8557 12.3036L4.51031 10.8238L3.16493 9.34395L3.15461 9.35333L4.5 10.8332ZM4.51031 10.8238L5.88354 12.2778L13.3732 5.2044L12 3.75036L10.6268 2.29632L3.13708 9.36975L4.51031 10.8238ZM12 3.75036L10.6271 5.20467L18.1177 12.2762L19.4906 10.8219L20.8636 9.36761L13.3729 2.29605L12 3.75036ZM19.4906 10.8219L18.1453 12.3018L18.1556 12.3112L19.5009 10.8313L20.8463 9.3514L20.836 9.34203L19.4906 10.8219ZM19.5009 10.8313L17.5009 10.8311L17.5 19.5001L19.5 19.5004L21.5 19.5006L21.5009 10.8315L19.5009 10.8313Z" fill="#FB0D1F" mask="url(#path-1-inside-1_23214_336)"/>
                        </svg></span>
                                                <nav aria-label="Breadcrumbs" class="tx-breadcrumb__wrapper"><ul class="bread-crumb clearfix list-unstyled d-flex flex-wrap m-0" itemscope itemtype="http://schema.org/BreadcrumbList"><li itemprop="item ListElement" itemscope itemtype="http://schema.org/ListItem" class="item taBcrumb-begin"><a href="/" rel="home" itemprop="item"><span itemprop="name">Home</span></a><meta itemprop="position" content="1" /></li><li class="item taBcrumb-end"><span>Blog</span></li></ul></nav>                    </div>
                                    </div>
            </div>
        </div>
        <!-- breadcrumb-end -->
        
<div class="tx-blog-area tz-blog-list-sec pt-110 pb-120 fix">
	<div class="container lbt-container-2">
        <div class="row">
			<div class="col-xxl-8 col-xl-8 col-lg-8">
				<div class="blog__wrapper blog-list-content mt-none-30">`;
export const bottomHtml = `</div>
			</div>

						<div class="col-xxl-4 col-xl-4 col-lg-4 mt-30 mt-lg-0">
				<div class="tx-sidebarWrapper tz-ser-sidebar">
					
<div id="search-2" class="tx-blog-widget widget tz-sidebar-widget headline widget_search"><h4 class="widget-title">Search</h4><div class="search-widget"><form class="tx-search-widget tx-input-field bs-sidebar-search" action="https://themexriver.com/wp/avista/" method="get">
                <input type="search" value="" required name="s" placeholder="Search..." class="bs-sidebar-search-input">
                <button type="submit" aria-label="search" class="bs-sidebar-search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
		    </form></div></div><div id="tc-latest-posts-2" class="tx-blog-widget widget tz-sidebar-widget headline widget_tc-latest-posts">		<h4 class="widget-title">						Recent Posts					</h4>							<div class="recent-post-widget">
										<div class="tz-rcw-item has-thumbnail" id="post-1881">
												<div class="item-img">
							<img loading="lazy" width="1824" height="839" src="/wp-content/uploads/2025/11/p2-img-3.webp" class="sidebar-post-img wp-post-image" alt="Titan Growth Hub Image" decoding="async" srcset="https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-3.webp 1824w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-3-600x276.webp 600w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-3-300x138.webp 300w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-3-1024x471.webp 1024w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-3-768x353.webp 768w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-3-1536x707.webp 1536w" sizes="(max-width: 1824px) 100vw, 1824px" />						</div>
						
						<div class="item-text headline">
							<div class="item-meta">
								<a href="../how-businesses-can-leverage-data-for-smarter-decisions/index.html">
									<i class="fa-regular fa-calendar"></i>
									May 17, 2025</a>

								<a href="../how-businesses-can-leverage-data-for-smarter-decisions/index.html">
									<i class="fa-regular fa-user"></i>
									By									avista								</a>
							</div>
							<h3>
								<a aria-label="How Businesses Can Leverage Data for Smarter Decisions" href="../how-businesses-can-leverage-data-for-smarter-decisions/index.html">
									How Businesses Can Leverage Data for Smarter Decisions								</a>
							</h3>
						</div>
					</div>
										<div class="tz-rcw-item has-thumbnail" id="post-1879">
												<div class="item-img">
							<img loading="lazy" width="1824" height="839" src="/wp-content/uploads/2025/11/p2-img-2.webp" class="sidebar-post-img wp-post-image" alt="Titan Growth Hub Image" decoding="async" srcset="https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-2.webp 1824w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-2-600x276.webp 600w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-2-300x138.webp 300w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-2-1024x471.webp 1024w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-2-768x353.webp 768w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p2-img-2-1536x707.webp 1536w" sizes="(max-width: 1824px) 100vw, 1824px" />						</div>
						
						<div class="item-text headline">
							<div class="item-meta">
								<a href="../it-industry-key-strategies-for-business-growth/index.html">
									<i class="fa-regular fa-calendar"></i>
									May 17, 2025</a>

								<a href="../it-industry-key-strategies-for-business-growth/index.html">
									<i class="fa-regular fa-user"></i>
									By									avista								</a>
							</div>
							<h3>
								<a aria-label="IT Industry Key Strategies for Business Growth" href="../it-industry-key-strategies-for-business-growth/index.html">
									IT Industry Key Strategies for Business Growth								</a>
							</h3>
						</div>
					</div>
										<div class="tz-rcw-item has-thumbnail" id="post-1181">
												<div class="item-img">
							<img loading="lazy" width="1920" height="940" src="/wp-content/uploads/2025/11/h2-img-3.webp" class="sidebar-post-img wp-post-image" alt="Titan Growth Hub Image" decoding="async" srcset="https://themexriver.com/wp/avista/wp-content/uploads/2025/11/h2-img-3.webp 1920w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/h2-img-3-600x294.webp 600w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/h2-img-3-300x147.webp 300w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/h2-img-3-1024x501.webp 1024w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/h2-img-3-768x376.webp 768w, https://themexriver.com/wp/avista/wp-content/uploads/2025/11/h2-img-3-1536x752.webp 1536w" sizes="(max-width: 1920px) 100vw, 1920px" />						</div>
						
						<div class="item-text headline">
							<div class="item-meta">
								<a href="../get-the-most-out-og-the-creativity/index.html">
									<i class="fa-regular fa-calendar"></i>
									January 10, 2024</a>

								<a href="../get-the-most-out-og-the-creativity/index.html">
									<i class="fa-regular fa-user"></i>
									By									avista								</a>
							</div>
							<h3>
								<a aria-label="Get The Most Out Og The Creativity" href="../get-the-most-out-og-the-creativity/index.html">
									Get The Most Out Og The Creativity								</a>
							</h3>
						</div>
					</div>
										
			</div>

		</div>
		<div id="custom_cat_widget-2" class="tx-blog-widget widget tz-sidebar-widget headline tx-cat-widget"><h4 class="widget-title">Category</h4><div class="tx-cat-widget category-widget ul-li-block"><ul class="tx-cat-list bs-sidebar-categories"><li><a href="../category/brand-design-identity/index.html"><span class="text">Brand Design Identity</span><span class="number">(3)</span></a></li><li><a href="../category/clock-fly-strategy/index.html"><span class="text">Clock Fly Strategy</span><span class="number">(2)</span></a></li><li><a href="../category/digital-marketing/index.html"><span class="text">Digital Marketing</span><span class="number">(4)</span></a></li><li><a href="../category/digital-strategy/index.html"><span class="text">Digital Strategy</span><span class="number">(1)</span></a></li><li><a href="../category/web-development/index.html"><span class="text">Web Development</span><span class="number">(1)</span></a></li></ul></div></div><div id="tag_cloud-2" class="tx-blog-widget widget tz-sidebar-widget headline widget_tag_cloud"><h4 class="widget-title">Popular Tags</h4><div class="tagcloud"><a href="../tag/agency/index.html" class="tag-cloud-link tag-link-20 tag-link-position-1" style="font-size: 8pt;" aria-label="Agency (1 item)">Agency</a>
<a href="../tag/business/index.html" class="tag-cloud-link tag-link-29 tag-link-position-2" style="font-size: 8pt;" aria-label="Business (1 item)">Business</a>
<a href="../tag/digital/index.html" class="tag-cloud-link tag-link-24 tag-link-position-3" style="font-size: 8pt;" aria-label="Digital (1 item)">Digital</a>
<a href="../tag/digital-agency/index.html" class="tag-cloud-link tag-link-22 tag-link-position-4" style="font-size: 8pt;" aria-label="Digital Agency (1 item)">Digital Agency</a>
<a href="../tag/marketing/index.html" class="tag-cloud-link tag-link-18 tag-link-position-5" style="font-size: 22pt;" aria-label="Marketing (4 items)">Marketing</a>
<a href="../tag/product/index.html" class="tag-cloud-link tag-link-26 tag-link-position-6" style="font-size: 8pt;" aria-label="Product (1 item)">Product</a>
<a href="../tag/startup/index.html" class="tag-cloud-link tag-link-27 tag-link-position-7" style="font-size: 8pt;" aria-label="Startup (1 item)">Startup</a>
<a href="../tag/technology/index.html" class="tag-cloud-link tag-link-19 tag-link-position-8" style="font-size: 18.5pt;" aria-label="Technology (3 items)">Technology</a>
<a href="../tag/trendy/index.html" class="tag-cloud-link tag-link-30 tag-link-position-9" style="font-size: 8pt;" aria-label="Trendy (1 item)">Trendy</a></div>
</div>				</div>
			</div>
			        </div>
    </div>
</div>

											<div data-elementor-type="wp-post" data-elementor-id="2686" class="elementor elementor-2686">
				<div class="elementor-element elementor-element-4024d54 e-con-full e-flex e-con e-parent" data-id="4024d54" data-element_type="container">
				<div class="elementor-element elementor-element-fdd45c3 elementor-widget elementor-widget-tx_footers elh-el tx_footers" data-id="fdd45c3" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_footers.default">
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
                    <img loading="lazy" src="/website_assets/footer-logo.webp" alt="Titan Growth Hub">
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
</footer>				</div>
				</div>
				</div>
				</div>
						<script type="speculationrules">
{"prefetch":[{"source":"document","where":{"and":[{"href_matches":"/wp/avista/*"},{"not":{"href_matches":["/wp/avista/wp-*.php","/wp/avista/wp-admin/*","/wp/avista/wp-content/uploads/*","/wp/avista/wp-content/*","/wp/avista/wp-content/plugins/*","/wp/avista/wp-content/themes/avista/*","/wp/avista/*\\\\\\\\?(.+)"]}},{"not":{"selector_matches":"a[rel~=\\\\"nofollow\\\\"]"}},{"not":{"selector_matches":".no-prefetch, .no-prefetch a"}}]},"eagerness":"conservative"}]}
</script>
			
				
	<link rel='stylesheet' id='wc-blocks-style-css' href='/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks6dd8.css?ver=wc-10.4.2' media='all' />
<link rel='stylesheet' id='elementor-frontend-css' href='/wp-content/plugins/elementor/assets/css/frontend.min37de.css?ver=3.33.4' media='all' />
<link rel='stylesheet' id='elementor-post-2582-css' href='/wp-content/uploads/elementor/css/post-258288fa.css?ver=1776695811' media='all' />
<link rel='stylesheet' id='elementor-post-2686-css' href='/wp-content/uploads/elementor/css/post-268688fa.css?ver=1776695811' media='all' />
<link rel='stylesheet' id='elementor-icons-css' href='/wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.mine085.css?ver=5.44.0' media='all' />
<link rel='stylesheet' id='elementor-post-7-css' href='/wp-content/uploads/elementor/css/post-788fa.css?ver=1776695811' media='all' />
<link rel='stylesheet' id='elementor-gf-roboto-css' href='https://fonts.googleapis.com/css?family=Roboto:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&amp;display=swap' media='all' />
<link rel='stylesheet' id='elementor-gf-robotoslab-css' href='https://fonts.googleapis.com/css?family=Roboto+Slab:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&amp;display=swap' media='all' />
<link rel='stylesheet' id='elementor-icons-shared-2-css' href='/wp-content/plugins/avista-core/assets/css/flaticon-avista139e.css?ver=1785262585' media='all' />
<link rel='stylesheet' id='elementor-icons-element-helper-flaticon-css' href='/wp-content/plugins/avista-core/assets/css/flaticon-avista139e.css?ver=1785262585' media='all' />
<script src="/wp-includes/js/dist/hooks.minaf5f.js?ver=dd5603f07f9220ed27f1" id="wp-hooks-js"></script>
<script src="/wp-includes/js/dist/i18n.min1cde.js?ver=c26c3dc7bed366793375" id="wp-i18n-js"></script>
<script id="wp-i18n-js-after">
wp.i18n.setLocaleData( { 'text direction\\\\u0004ltr': [ 'ltr' ] } );
//# sourceURL=wp-i18n-js-after
</script>
<script src="/wp-content/plugins/contact-form-7/includes/swv/js/index1b46.js?ver=6.1.4" id="swv-js"></script>
<script id="contact-form-7-js-before">
var wpcf7 = {
    "api": {
        "root": "https:\\\\/\\\\/themexriver.com\\\\/wp\\\\/avista\\\\/wp-json\\\\/",
        "namespace": "contact-form-7\\\\/v1"
    }
};
//# sourceURL=contact-form-7-js-before
</script>
<script src="/wp-content/plugins/contact-form-7/includes/js/index1b46.js?ver=6.1.4" id="contact-form-7-js"></script>
<script src="/wp-content/themes/avista/assets/js/bootstrap-min67b1.js?ver=6.9.5" id="bootstrap-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/swiper.min67b1.js?ver=6.9.5" id="swiper-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/lenis.min67b1.js?ver=6.9.5" id="lenis-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/wow-min67b1.js?ver=6.9.5" id="wow-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/odometer.min67b1.js?ver=6.9.5" id="odometer-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/nice-select.min67b1.js?ver=6.9.5" id="nice-select-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/jquery.marquee.min67b1.js?ver=6.9.5" id="jquery-marquee-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/magnific-popup.min67b1.js?ver=6.9.5" id="magnific-popup-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/SplitText.min67b1.js?ver=6.9.5" id="SplitText-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/gsap.min67b1.js?ver=6.9.5" id="gsap-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/customEase.min67b1.js?ver=6.9.5" id="customEase-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/appear67b1.js?ver=6.9.5" id="appear-js"></script>
<script src="/wp-content/themes/avista/assets/js/scrollTrigger.min67b1.js?ver=6.9.5" id="scrollTrigger-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/pixi.min67b1.js?ver=6.9.5" id="pixi-min-js"></script>
<script src="/wp-content/themes/avista/assets/js/cursor67b1.js?ver=6.9.5" id="cursor-js"></script>
<script src="/wp-content/themes/avista/assets/js/touchspin67b1.js?ver=6.9.5" id="touchspin-js"></script>
<script src="/wp-content/themes/avista/assets/js/avista-custom67b1.js?ver=6.9.5" id="avista-custom-js"></script>
<script src="/wp-content/themes/avista/assets/js/avista-core139e.js?ver=1785262585" id="avista-core-js"></script>
<script src="/wp-content/plugins/woocommerce/assets/js/sourcebuster/sourcebuster.min278d.js?ver=10.4.2" id="sourcebuster-js-js"></script>


<script src="/wp-content/plugins/elementor/assets/js/webpack.runtime.min37de.js?ver=3.33.4" id="elementor-webpack-runtime-js"></script>
<script src="/wp-content/plugins/elementor/assets/js/frontend-modules.min37de.js?ver=3.33.4" id="elementor-frontend-modules-js"></script>
<script src="/wp-includes/js/jquery/ui/core.minb37e.js?ver=1.13.3" id="jquery-ui-core-js"></script>
<script id="elementor-frontend-js-before">
var elementorFrontendConfig = {"environmentMode":{"edit":false,"wpPreview":false,"isScriptDebug":false},"i18n":{"shareOnFacebook":"Share on Facebook","shareOnTwitter":"Share on Twitter","pinIt":"Pin it","download":"Download","downloadImage":"Download image","fullscreen":"Fullscreen","zoom":"Zoom","share":"Share","playVideo":"Play Video","previous":"Previous","next":"Next","close":"Close","a11yCarouselPrevSlideMessage":"Previous slide","a11yCarouselNextSlideMessage":"Next slide","a11yCarouselFirstSlideMessage":"This is the first slide","a11yCarouselLastSlideMessage":"This is the last slide","a11yCarouselPaginationBulletMessage":"Go to slide"},"is_rtl":false,"breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},"responsive":{"breakpoints":{"mobile":{"label":"Mobile Portrait","value":767,"default_value":767,"direction":"max","is_enabled":true},"mobile_extra":{"label":"Mobile Landscape","value":880,"default_value":880,"direction":"max","is_enabled":false},"tablet":{"label":"Tablet Portrait","value":1024,"default_value":1024,"direction":"max","is_enabled":true},"tablet_extra":{"label":"Tablet Landscape","value":1200,"default_value":1200,"direction":"max","is_enabled":false},"laptop":{"label":"Laptop","value":1366,"default_value":1366,"direction":"max","is_enabled":false},"widescreen":{"label":"Widescreen","value":2400,"default_value":2400,"direction":"min","is_enabled":false}},"hasCustomBreakpoints":false},"version":"3.33.4","is_static":false,"experimentalFeatures":{"additional_custom_breakpoints":true,"container":true,"e_optimized_markup":true,"e_pro_free_trial_popup":true,"nested-elements":true,"home_screen":true,"global_classes_should_enforce_capabilities":true,"e_variables":true,"cloud-library":true,"e_opt_in_v4_page":true,"import-export-customization":true},"urls":{"assets":"https:\\\\/\\\\/themexriver.com\\\\/wp\\\\/avista\\\\/wp-content\\\\/plugins\\\\/elementor\\\\/assets\\\\/","ajaxurl":"https:\\\\/\\\\/themexriver.com\\\\/wp\\\\/avista\\\\/wp-admin\\\\/admin-ajax.php","uploadUrl":"https:\\\\/\\\\/themexriver.com\\\\/wp\\\\/avista\\\\/wp-content\\\\/uploads"},"nonces":{"floatingButtonsClickTracking":"1401e7d743"},"swiperClass":"swiper","settings":{"editorPreferences":[]},"kit":{"active_breakpoints":["viewport_mobile","viewport_tablet"],"global_image_lightbox":"yes","lightbox_enable_counter":"yes","lightbox_enable_fullscreen":"yes","lightbox_enable_zoom":"yes","lightbox_enable_share":"yes","lightbox_title_src":"title","lightbox_description_src":"description"},"post":{"id":0,"title":"Blog &#8211; Avista","excerpt":""}};
//# sourceURL=elementor-frontend-js-before
</script>
<script src="/wp-content/plugins/elementor/assets/js/frontend.min37de.js?ver=3.33.4" id="elementor-frontend-js"></script>
<script src="/wp-content/plugins/avista-core/assets/js/elh-element139e.js?ver=1785262585" id="elh-element-helper-js"></script>
<script id="wp-emoji-settings" type="application/json">
{"baseUrl":"https://s.w.org/images/core/emoji/17.0.2/72x72/","ext":".png","svgUrl":"https://s.w.org/images/core/emoji/17.0.2/svg/","svgExt":".svg","source":{"concatemoji":"https://themexriver.com/wp/avista/wp-includes/js/wp-emoji-release.min.js?ver=6.9.5"}}
</script>
<script type="module">
/*! This file is auto-generated */
const a=JSON.parse(document.getElementById("wp-emoji-settings").textContent),o=(window._wpemojiSettings=a,"wpEmojiSettingsSupports"),s=["flag","emoji"];function i(e){try{var t={supportTests:e,timestamp:(new Date).valueOf()};sessionStorage.setItem(o,JSON.stringify(t))}catch(e){}}function c(e,t,n){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);t=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data);e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(n,0,0);const a=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data);return t.every((e,t)=>e===a[t])}function p(e,t){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);var n=e.getImageData(16,16,1,1);for(let e=0;e<n.data.length;e++)if(0!==n.data[e])return!1;return!0}function u(e,t,n,a){switch(t){case"flag":return n(e,"\\\\ud83c\\\\udff3\\\\ufe0f\\\\u200d\\\\u26a7\\\\ufe0f","\\\\ud83c\\\\udff3\\\\ufe0f\\\\u200b\\\\u26a7\\\\ufe0f")?!1:!n(e,"\\\\ud83c\\\\udde8\\\\ud83c\\\\uddf6","\\\\ud83c\\\\udde8\\\\u200b\\\\ud83c\\\\uddf6")&&!n(e,"\\\\ud83c\\\\udff4\\\\udb40\\\\udc67\\\\udb40\\\\udc62\\\\udb40\\\\udc65\\\\udb40\\\\udc6e\\\\udb40\\\\udc67\\\\udb40\\\\udc7f","\\\\ud83c\\\\udff4\\\\u200b\\\\udb40\\\\udc67\\\\u200b\\\\udb40\\\\udc62\\\\u200b\\\\udb40\\\\udc65\\\\u200b\\\\udb40\\\\udc6e\\\\u200b\\\\udb40\\\\udc67\\\\u200b\\\\udb40\\\\udc7f");case"emoji":return!a(e,"\\\\ud83e\\\\u1fac8")}return!1}function f(e,t,n,a){let r;const o=(r="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?new OffscreenCanvas(300,150):document.createElement("canvas")).getContext("2d",{willReadFrequently:!0}),s=(o.textBaseline="top",o.font="600 32px Arial",{});return e.forEach(e=>{s[e]=t(o,e,n,a)}),s}function r(e){var t=document.createElement("script");t.src=e,t.defer=!0,document.head.appendChild(t)}a.supports={everything:!0,everythingExceptFlag:!0},new Promise(t=>{let n=function(){try{var e=JSON.parse(sessionStorage.getItem(o));if("object"==typeof e&&"number"==typeof e.timestamp&&(new Date).valueOf()<e.timestamp+604800&&"object"==typeof e.supportTests)return e.supportTests}catch(e){}return null}();if(!n){if("undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof URL&&URL.createObjectURL&&"undefined"!=typeof Blob)try{var e="postMessage("+f.toString()+"("+[JSON.stringify(s),u.toString(),c.toString(),p.toString()].join(",")+"));",a=new Blob([e],{type:"text/javascript"});const r=new Worker(URL.createObjectURL(a),{name:"wpTestEmojiSupports"});return void(r.onmessage=e=>{i(n=e.data),r.terminate(),t(n)})}catch(e){}i(n=f(s,u,c,p))}t(n)}).then(e=>{for(const n in e)a.supports[n]=e[n],a.supports.everything=a.supports.everything&&a.supports[n],"flag"!==n&&(a.supports.everythingExceptFlag=a.supports.everythingExceptFlag&&a.supports[n]);var t;a.supports.everythingExceptFlag=a.supports.everythingExceptFlag&&!a.supports.flag,a.supports.everything||((t=a.source||{}).concatemoji?r(t.concatemoji):t.wpemoji&&t.twemoji&&(r(t.twemoji),r(t.wpemoji)))});
//# sourceURL=https://themexriver.com/wp/avista/wp-includes/js/wp-emoji-loader.min.js
</script>
        </div>
    <script type="module" src="https://static.cloudflareinsights.com/beacon.min.js/v4513226cdae34746b4dedf0b4dfa099e1781791509496" integrity="sha512-ZE9pZaUXND66v380QUtch/5sE9tPFh2zg45pR2PB0CVkCtOREv2AJKkSidISWkysEuQ0EH8faUU5du78bx87UQ==" data-cf-beacon='{"version":"2024.11.0","token":"daf30b97c9e94fec9725b4f69e8dd5ef","r":1}' crossorigin="anonymous"></script>
`;

export default async function Page() {
    let blogs: any[] = [];
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('status', 'Published')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) blogs = data;
    } catch (err) {
        console.error('Error fetching blogs from Supabase:', err);
    }

    const blogsListHtml = blogs.length > 0
        ? blogs.map((blog) => {
            const dateObj = new Date(blog.created_at);
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            const slug = blog.slug.startsWith('/') ? blog.slug : `/blog/${blog.slug.replace(/^\/blog\//, '')}`;
            const desc = blog.metaDesc || (blog.content ? blog.content.substring(0, 150) + '...' : '');

            return `
          <article class="tx-blog-box mt-30">
            <div class="tz-blog-item list-view-item">
              <div class="item-img">
                <img loading="lazy" width="1824" height="839" src="/wp-content/uploads/2025/11/p2-img-3.webp" class="img-responsive w-100 wp-post-image" alt="Titan Growth Hub Image" />
              </div>
              <div class="item-text headline pera-content">
                <div class="item-meta" style="margin-bottom: 10px; display: flex; gap: 15px; font-size: 13px; color: #fd3f00;">
                  <span><i class="fa-regular fa-calendar"></i> ${formattedDate}</span>
                  <span><i class="fa-regular fa-user"></i> avista</span>
                  <span><i class="fa-solid fa-tags"></i> ${blog.category || 'SEO Strategy'}</span>
                </div>
                <h3 class="blog_title" style="font-size: 22px; font-weight: 800; line-height: 1.4; margin-bottom: 15px;">
                  <a href="${slug}">
                    ${blog.title}
                  </a>
                </h3>
                <p style="margin-bottom: 15px; color: #666; line-height: 1.6;">
                  ${desc}
                </p>
                <a class="read_more" href="${slug}">Read More <i class="fa-solid fa-angles-right"></i></a>
              </div>
            </div>
          </article>
        `;
        }).join('\n')
        : `<div class="mt-30 text-center" style="padding: 40px; background: #fff; border-radius: 20px;"><h3>No blog posts published yet.</h3></div>`;

    const finalHtml = `${topHtml}${blogsListHtml}${bottomHtml}`;

    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: `document.body.className = "blog";`,
                }}
            />
            <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
        </>
    );
}
