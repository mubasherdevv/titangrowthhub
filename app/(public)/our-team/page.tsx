import React from 'react';
import { getPageMeta } from '@/lib/getPageMeta';
import { teamPageSchema } from '@/lib/pageSchemas';
import { getSiteSettings } from '@/lib/getSiteSettings';
import { injectDynamicSettings } from '@/lib/htmlHelper';

export async function generateMetadata() {
    const { title, description } = await getPageMeta(
        'our-team',
        'Our Team – Titan Growth Hub',
        'Meet the experts behind Titan Growth Hub — a team of dedicated SEO specialists and digital marketers.'
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
                                            <img src="/wp-content/uploads/2025/11/fevicon-1.webp"
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
                <div class="menu-main-menu-container"><ul id="main-nav" class="nav navbar-nav menu_1_split"><li id="menu-item-2588" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home dropdown menu-item-2588"><a href="/">Home</a>
<ul class="dropdown-menu clearfix">
	<li id="menu-item-2865" class="menu-item menu-item-type-custom menu-item-object-custom dropdown menu-item-2865"><a href="#0">Multipage</a>
	<ul class="dropdown-menu clearfix">
		<li id="menu-item-2604" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-2604"><a href="/">Home 01</a></li>
		<li id="menu-item-2595" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2595"><a href="../home-02/index.html">Home 02</a></li>
		<li id="menu-item-2596" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2596"><a href="../home-03/index.html">Home 03</a></li>
		<li id="menu-item-2597" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2597"><a href="../home-04/index.html">Home 04</a></li>
	</ul>
</li>
	<li id="menu-item-2866" class="menu-item menu-item-type-custom menu-item-object-custom dropdown menu-item-2866"><a href="#0">Onepage</a>
	<ul class="dropdown-menu clearfix">
		<li id="menu-item-2924" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2924"><a href="../home-01-onepage/index.html">Home 01 Onepage</a></li>
		<li id="menu-item-2919" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2919"><a href="../home-02-onepage/index.html">Home 02 Onepage</a></li>
		<li id="menu-item-2920" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2920"><a href="../home-03-onepage/index.html">Home 03 Onepage</a></li>
		<li id="menu-item-2921" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2921"><a href="../home-04-onepage/index.html">Home 04 Onepage</a></li>
	</ul>
</li>
	<li id="menu-item-2864" class="menu-item menu-item-type-custom menu-item-object-custom dropdown menu-item-2864"><a href="#0">Darkpage</a>
	<ul class="dropdown-menu clearfix">
		<li id="menu-item-2870" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2870"><a href="../home-01-dark/index.html">Home 01 Dark</a></li>
		<li id="menu-item-2869" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2869"><a href="../home-02-dark/index.html">Home 02 Dark</a></li>
		<li id="menu-item-2868" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2868"><a href="../home-03-dark/index.html">Home 03 Dark</a></li>
		<li id="menu-item-2867" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2867"><a href="../home-04-dark/index.html">Home 04 Dark</a></li>
	</ul>
</li>
</ul>
</li>
<li id="menu-item-2590" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2590"><a href="/about">About</a></li>
<li id="menu-item-2599" class="menu-item menu-item-type-post_type menu-item-object-page dropdown menu-item-2599"><a href="/our-services">Services</a>
<ul class="dropdown-menu clearfix">
	<li id="menu-item-2613" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2613"><a href="/our-services">Services</a></li>
	<li id="menu-item-2609" class="menu-item menu-item-type-post_type menu-item-object-services menu-item-2609"><a href="../services/smart-schedule-control/index.html">Service Details</a></li>
</ul>
</li>
<li id="menu-item-2605" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent dropdown menu-item-2605"><a href="#0">Pages</a>
<ul class="dropdown-menu clearfix">
	<li id="menu-item-2600" class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-27 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor dropdown menu-item-2600"><a href="/" aria-current="page">Team</a>
	<ul class="dropdown-menu clearfix">
		<li id="menu-item-2606" class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-27 current_page_item menu-item-2606"><a href="/" aria-current="page">Team</a></li>
		<li id="menu-item-2610" class="menu-item menu-item-type-post_type menu-item-object-teams menu-item-2610"><a href="../teams/melissa-lee/index.html">Team Details</a></li>
	</ul>
</li>
	<li id="menu-item-2594" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2594"><a href="/faqs">Faqs</a></li>
	<li id="menu-item-2603" class="menu-item menu-item-type-post_type menu-item-object-page dropdown menu-item-2603"><a href="../shop/index.html">Shop</a>
	<ul class="dropdown-menu clearfix">
		<li id="menu-item-2612" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2612"><a href="../shop/index.html">Shop</a></li>
		<li id="menu-item-2611" class="menu-item menu-item-type-post_type menu-item-object-product menu-item-2611"><a href="../product/black-headphone/index.html">Shop Details</a></li>
		<li id="menu-item-2591" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2591"><a href="../cart/index.html">Cart</a></li>
		<li id="menu-item-2592" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2592"><a href="../checkout/index.html">Checkout</a></li>
	</ul>
</li>
	<li id="menu-item-2601" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2601"><a href="../pricing/index.html">Pricing</a></li>
	<li id="menu-item-2589" class="menu-item menu-item-type-post_type menu-item-object-page dropdown menu-item-2589"><a href="/blog">Blog</a>
	<ul class="dropdown-menu clearfix">
		<li id="menu-item-2608" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2608"><a href="/blog">Blog</a></li>
		<li id="menu-item-2607" class="menu-item menu-item-type-post_type menu-item-object-post menu-item-2607"><a href="../how-businesses-can-leverage-data-for-smarter-decisions/index.html">Blog Details</a></li>
	</ul>
</li>
	<li id="menu-item-2593" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2593"><a href="/contact-us">Contact us</a></li>
</ul>
</li>
</ul></div>            </nav>

            <div class="as-header-1-menu-toggle-btn">
                <span></span>
                <span></span>
            </div>

            <!-- action-link -->
            <div class="as-header-1-action-link">

                                <a href="/contact-us"
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
    <a href="/" aria-label="fevicon-1" class="as-header-1-logo">
                <img src="/wp-content/uploads/2025/10/h1-favicon-shape.webp" alt="h1-favicon-shape" class="bg-shape">
        
                <img src="/wp-content/uploads/2025/10/fevicon-1.webp"
        alt="fevicon-1">
            </a>
</header>
<div class="wa-offcanvas-area offcanvas_box_active lenis lenis-smooth ">
    <div class="wa-offcanvas-wrap ">
        <!-- top -->
        <div class="wa-offcanvas-top">
                        <a href="/" class="tx-logo wa-offcanvas-top-logo" aria-label="Site Logo"  >
                <img src="/wp-content/uploads/2025/11/logo-1.webp" alt="logo-1">
            </a>
            
            <!-- close-btn -->
            <button class="wa-offcanvas-close offcanvas_box_close" aria-label="name">
                <span></span>
                <span></span>
            </button>
        </div>

        <!-- mobile-menu-list -->
                <nav class="mobile-main-navigation mb-50 d-block d-lg-block">
            <div class="menu-main-menu-container"><ul id="m-main-nav" class="nav navbar-nav clearfix list-unstyled"><li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home dropdown menu-item-2588"><a href="/">Home</a>
<ul class="dropdown-menu">
	<li class="menu-item menu-item-type-custom menu-item-object-custom dropdown menu-item-2865"><a href="#0">Multipage</a>
	<ul class="dropdown-menu">
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-2604"><a href="/">Home 01</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2595"><a href="../home-02/index.html">Home 02</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2596"><a href="../home-03/index.html">Home 03</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2597"><a href="../home-04/index.html">Home 04</a></li>
	</ul>
</li>
	<li class="menu-item menu-item-type-custom menu-item-object-custom dropdown menu-item-2866"><a href="#0">Onepage</a>
	<ul class="dropdown-menu">
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2924"><a href="../home-01-onepage/index.html">Home 01 Onepage</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2919"><a href="../home-02-onepage/index.html">Home 02 Onepage</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2920"><a href="../home-03-onepage/index.html">Home 03 Onepage</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2921"><a href="../home-04-onepage/index.html">Home 04 Onepage</a></li>
	</ul>
</li>
	<li class="menu-item menu-item-type-custom menu-item-object-custom dropdown menu-item-2864"><a href="#0">Darkpage</a>
	<ul class="dropdown-menu">
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2870"><a href="../home-01-dark/index.html">Home 01 Dark</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2869"><a href="../home-02-dark/index.html">Home 02 Dark</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2868"><a href="../home-03-dark/index.html">Home 03 Dark</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2867"><a href="../home-04-dark/index.html">Home 04 Dark</a></li>
	</ul>
</li>
</ul>
</li>
<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2590"><a href="/about">About</a></li>
<li class="menu-item menu-item-type-post_type menu-item-object-page dropdown menu-item-2599"><a href="/our-services">Services</a>
<ul class="dropdown-menu">
	<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2613"><a href="/our-services">Services</a></li>
	<li class="menu-item menu-item-type-post_type menu-item-object-services menu-item-2609"><a href="../services/smart-schedule-control/index.html">Service Details</a></li>
</ul>
</li>
<li class="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent dropdown menu-item-2605"><a href="#0">Pages</a>
<ul class="dropdown-menu">
	<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-27 current_page_item current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor dropdown menu-item-2600"><a href="/" aria-current="page">Team</a>
	<ul class="dropdown-menu">
		<li class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-27 current_page_item menu-item-2606"><a href="/" aria-current="page">Team</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-teams menu-item-2610"><a href="../teams/melissa-lee/index.html">Team Details</a></li>
	</ul>
</li>
	<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2594"><a href="/faqs">Faqs</a></li>
	<li class="menu-item menu-item-type-post_type menu-item-object-page dropdown menu-item-2603"><a href="../shop/index.html">Shop</a>
	<ul class="dropdown-menu">
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2612"><a href="../shop/index.html">Shop</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-product menu-item-2611"><a href="../product/black-headphone/index.html">Shop Details</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2591"><a href="../cart/index.html">Cart</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2592"><a href="../checkout/index.html">Checkout</a></li>
	</ul>
</li>
	<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2601"><a href="../pricing/index.html">Pricing</a></li>
	<li class="menu-item menu-item-type-post_type menu-item-object-page dropdown menu-item-2589"><a href="/blog">Blog</a>
	<ul class="dropdown-menu">
		<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2608"><a href="/blog">Blog</a></li>
		<li class="menu-item menu-item-type-post_type menu-item-object-post menu-item-2607"><a href="../how-businesses-can-leverage-data-for-smarter-decisions/index.html">Blog Details</a></li>
	</ul>
</li>
	<li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2593"><a href="/contact-us">Contact us</a></li>
</ul>
</li>
</ul></div>        </nav>
        
                <div class="wa-offcanvas-gallery">
                        <h6 class="wa-offcanvas-gallery-title as-h-1">Stay Inspired with Instagram</h6>
            
            <div class="wa-offcanvas-gallery-grid">
                                <a href="/wp-content/uploads/2025/10/p1-img-1.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img src="/wp-content/uploads/2025/10/p1-img-1.webp" alt="">
                </a>
                                <a href="/wp-content/uploads/2025/10/p1-img-2.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img src="/wp-content/uploads/2025/10/p1-img-2.webp" alt="">
                </a>
                                <a href="/wp-content/uploads/2025/10/p1-img-4.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img src="/wp-content/uploads/2025/10/p1-img-4.webp" alt="">
                </a>
                                <a href="/wp-content/uploads/2025/10/p1-img-3.webp"
                aria-label="" class="popup-img wa-offcanvas-gallery-item wa-img-cover wa-fix">
                    <img src="/wp-content/uploads/2025/10/p1-img-3.webp" alt="">
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
        <div class="as-breadcrumb-area wa-p-relative wa-bg-default tx-breadcrumb " data-background="https://themexriver.com/wp/avista/wp-content/uploads/2025/11/tx-bg-img.webp">
            <div class="container as-container-2">
                <div class="as-breadcrumb-wrap">
                    <h1 class="as-breadcrumb-title">Our Team</h1>
                                        <div class="as-breadcrumb-list">
                                                <span class="tx-breadIcon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-inside-1_23214_336" fill="white">
                            <path d="M20.5153 9.7288L13.0153 2.65255C13.0116 2.64935 13.0082 2.6459 13.005 2.64223C12.7289 2.39111 12.369 2.25195 11.9958 2.25195C11.6225 2.25195 11.2627 2.39111 10.9866 2.64223L10.9763 2.65255L3.48469 9.7288C3.33187 9.86932 3.20989 10.04 3.12646 10.2301C3.04303 10.4202 2.99997 10.6256 3 10.8332V19.5004C3 19.8982 3.15804 20.2797 3.43934 20.561C3.72064 20.8423 4.10218 21.0004 4.5 21.0004H9C9.39782 21.0004 9.77936 20.8423 10.0607 20.561C10.342 20.2797 10.5 19.8982 10.5 19.5004V15.0004H13.5V19.5004C13.5 19.8982 13.658 20.2797 13.9393 20.561C14.2206 20.8423 14.6022 21.0004 15 21.0004H19.5C19.8978 21.0004 20.2794 20.8423 20.5607 20.561C20.842 20.2797 21 19.8982 21 19.5004V10.8332C21 10.6256 20.957 10.4202 20.8735 10.2301C20.7901 10.04 20.6681 9.86932 20.5153 9.7288ZM19.5 19.5004H15V15.0004C15 14.6025 14.842 14.221 14.5607 13.9397C14.2794 13.6584 13.8978 13.5004 13.5 13.5004H10.5C10.1022 13.5004 9.72064 13.6584 9.43934 13.9397C9.15804 14.221 9 14.6025 9 15.0004V19.5004H4.5V10.8332L4.51031 10.8238L12 3.75036L19.4906 10.8219L19.5009 10.8313L19.5 19.5004Z"/>
                            </mask>
                            <path d="M20.5153 9.7288L13.0153 2.65255C13.0116 2.64935 13.0082 2.6459 13.005 2.64223C12.7289 2.39111 12.369 2.25195 11.9958 2.25195C11.6225 2.25195 11.2627 2.39111 10.9866 2.64223L10.9763 2.65255L3.48469 9.7288C3.33187 9.86932 3.20989 10.04 3.12646 10.2301C3.04303 10.4202 2.99997 10.6256 3 10.8332V19.5004C3 19.8982 3.15804 20.2797 3.43934 20.561C3.72064 20.8423 4.10218 21.0004 4.5 21.0004H9C9.39782 21.0004 9.77936 20.8423 10.0607 20.561C10.342 20.2797 10.5 19.8982 10.5 19.5004V15.0004H13.5V19.5004C13.5 19.8982 13.658 20.2797 13.9393 20.561C14.2206 20.8423 14.6022 21.0004 15 21.0004H19.5C19.8978 21.0004 20.2794 20.8423 20.5607 20.561C20.842 20.2797 21 19.8982 21 19.5004V10.8332C21 10.6256 20.957 10.4202 20.8735 10.2301C20.7901 10.04 20.6681 9.86932 20.5153 9.7288ZM19.5 19.5004H15V15.0004C15 14.6025 14.842 14.221 14.5607 13.9397C14.2794 13.6584 13.8978 13.5004 13.5 13.5004H10.5C10.1022 13.5004 9.72064 13.6584 9.43934 13.9397C9.15804 14.221 9 14.6025 9 15.0004V19.5004H4.5V10.8332L4.51031 10.8238L12 3.75036L19.4906 10.8219L19.5009 10.8313L19.5 19.5004Z" fill="#FB0D1F"/>
                            <path d="M20.5153 9.7288L19.1428 11.1835L19.1521 11.1923L19.1616 11.201L20.5153 9.7288ZM13.0153 2.65255L14.3878 1.19783L14.3593 1.17092L14.3297 1.14514L13.0153 2.65255ZM13.005 2.64223L14.5124 1.32781L14.4363 1.24052L14.3506 1.16261L13.005 2.64223ZM11.9958 2.25195L11.9958 0.251953L11.9958 2.25195ZM10.9866 2.64223L9.64094 1.16261L9.60587 1.1945L9.57235 1.22802L10.9866 2.64223ZM10.9763 2.65255L12.3496 4.10649L12.3703 4.08691L12.3905 4.06676L10.9763 2.65255ZM3.48469 9.7288L4.83844 11.201L4.84829 11.1919L4.85803 11.1827L3.48469 9.7288ZM3 10.8332L5 10.8332L5 10.8329L3 10.8332ZM3 19.5004L1 19.5004L3 19.5004ZM10.5 15.0004V13.0004H8.5V15.0004H10.5ZM13.5 15.0004H15.5V13.0004H13.5V15.0004ZM21 10.8332L19 10.8329V10.8332H21ZM19.5 19.5004V21.5004H21.4998L21.5 19.5006L19.5 19.5004ZM15 19.5004H13V21.5004H15V19.5004ZM9 19.5004V21.5004H11V19.5004H9ZM4.5 19.5004H2.5V21.5004H4.5V19.5004ZM4.5 10.8332L3.15461 9.35333L2.5 9.94846V10.8332H4.5ZM4.51031 10.8238L5.8557 12.3036L5.86974 12.2909L5.88354 12.2778L4.51031 10.8238ZM12 3.75036L13.3729 2.29605L11.9997 0.999658L10.6268 2.29632L12 3.75036ZM19.4906 10.8219L18.1177 12.2762L18.1314 12.2892L18.1453 12.3018L19.4906 10.8219ZM19.5009 10.8313L21.5009 10.8315L21.501 9.94663L20.8463 9.3514L19.5009 10.8313ZM20.5153 9.7288L21.8878 8.27408L14.3878 1.19783L13.0153 2.65255L11.6428 4.10726L19.1428 11.1835L20.5153 9.7288ZM13.0153 2.65255L14.3297 1.14514C14.3947 1.2018 14.4557 1.26283 14.5124 1.32781L13.005 2.64223L11.4976 3.95666C11.5606 4.02898 11.6286 4.0969 11.7009 4.15996L13.0153 2.65255ZM13.005 2.64223L14.3506 1.16261C13.7063 0.576649 12.8667 0.251953 11.9958 0.251953L11.9958 2.25195L11.9958 4.25195C11.8714 4.25195 11.7514 4.20557 11.6594 4.12186L13.005 2.64223ZM11.9958 2.25195L11.9958 0.251953C11.1249 0.251953 10.2852 0.576649 9.64094 1.16261L10.9866 2.64223L12.3322 4.12186C12.2401 4.20557 12.1202 4.25195 11.9958 4.25195L11.9958 2.25195ZM10.9866 2.64223L9.57235 1.22802L9.56204 1.23833L10.9763 2.65255L12.3905 4.06676L12.4008 4.05645L10.9866 2.64223ZM10.9763 2.65255L9.60291 1.19861L2.11135 8.27486L3.48469 9.7288L4.85803 11.1827L12.3496 4.10649L10.9763 2.65255ZM3.48469 9.7288L2.13094 8.2566C1.77437 8.58448 1.48974 8.98281 1.29508 9.42637L3.12646 10.2301L4.95785 11.0339C4.93004 11.0972 4.88938 11.1541 4.83844 11.201L3.48469 9.7288ZM3.12646 10.2301L1.29508 9.42637C1.1004 9.86993 0.999926 10.3491 1 10.8335L3 10.8332L5 10.8329C5.00001 10.9021 4.98566 10.9705 4.95785 11.0339L3.12646 10.2301ZM3 10.8332H1V19.5004H3H5V10.8332H3ZM3 19.5004L1 19.5004C1 20.4286 1.36875 21.3189 2.02513 21.9752L3.43934 20.561L4.85355 19.1468C4.94732 19.2406 5 19.3677 5 19.5004L3 19.5004ZM3.43934 20.561L2.02513 21.9752C2.6815 22.6316 3.57174 23.0004 4.5 23.0004V21.0004V19.0004C4.63261 19.0004 4.75979 19.053 4.85355 19.1468L3.43934 20.561ZM4.5 21.0004V23.0004H9V21.0004V19.0004H4.5V21.0004ZM9 21.0004V23.0004C9.92826 23.0004 10.8185 22.6316 11.4749 21.9752L10.0607 20.561L8.64645 19.1468C8.74021 19.053 8.86739 19.0004 9 19.0004V21.0004ZM10.0607 20.561L11.4749 21.9752C12.1312 21.3189 12.5 20.4286 12.5 19.5004H10.5H8.5C8.5 19.3677 8.55268 19.2406 8.64645 19.1468L10.0607 20.561ZM10.5 19.5004H12.5V15.0004H10.5H8.5V19.5004H10.5ZM10.5 15.0004V17.0004H13.5V15.0004V13.0004H10.5V15.0004ZM13.5 15.0004H11.5V19.5004H13.5H15.5V15.0004H13.5ZM13.5 19.5004H11.5C11.5 20.4286 11.8688 21.3189 12.5251 21.9752L13.9393 20.561L15.3536 19.1468C15.4473 19.2406 15.5 19.3677 15.5 19.5004H13.5ZM13.9393 20.561L12.5251 21.9752C13.1815 22.6316 14.0717 23.0004 15 23.0004V21.0004V19.0004C15.1326 19.0004 15.2598 19.053 15.3536 19.1468L13.9393 20.561ZM15 21.0004V23.0004H19.5V21.0004V19.0004H15V21.0004ZM19.5 21.0004V23.0004C20.4283 23.0004 21.3185 22.6316 21.9749 21.9752L20.5607 20.561L19.1464 19.1468C19.2402 19.053 19.3674 19.0004 19.5 19.0004V21.0004ZM20.5607 20.561L21.9749 21.9752C22.6312 21.3189 23 20.4286 23 19.5004H21H19C19 19.3677 19.0527 19.2406 19.1464 19.1468L20.5607 20.561ZM21 19.5004H23V10.8332H21H19V19.5004H21ZM21 10.8332L23 10.8335C23.0001 10.3491 22.8996 9.86993 22.7049 9.42637L20.8735 10.2301L19.0422 11.0339C19.0143 10.9705 19 10.9021 19 10.8329L21 10.8332ZM20.8735 10.2301L22.7049 9.42637C22.5103 8.9828 22.2256 8.58448 21.8691 8.2566L20.5153 9.7288L19.1616 11.201C19.1106 11.1542 19.07 11.0972 19.0422 11.0339L20.8735 10.2301ZM19.5 19.5004V17.5004H15V19.5004V21.5004H19.5V19.5004ZM15 19.5004H17V15.0004H15H13V19.5004H15ZM15 15.0004H17C17 14.0721 16.6312 13.1819 15.9749 12.5255L14.5607 13.9397L13.1464 15.3539C13.0527 15.2601 13 15.133 13 15.0004H15ZM14.5607 13.9397L15.9749 12.5255C15.3185 11.8691 14.4283 11.5004 13.5 11.5004V13.5004V15.5004C13.3674 15.5004 13.2402 15.4477 13.1464 15.3539L14.5607 13.9397ZM13.5 13.5004V11.5004H10.5V13.5004V15.5004H13.5V13.5004ZM10.5 13.5004V11.5004C9.57174 11.5004 8.6815 11.8691 8.02513 12.5255L9.43934 13.9397L10.8536 15.3539C10.7598 15.4477 10.6326 15.5004 10.5 15.5004V13.5004ZM9.43934 13.9397L8.02513 12.5255C7.36875 13.1819 7 14.0721 7 15.0004H9H11C11 15.133 10.9473 15.2601 10.8536 15.3539L9.43934 13.9397ZM9 15.0004H7V19.5004H9H11V15.0004H9ZM9 19.5004V17.5004H4.5V19.5004V21.5004H9V19.5004ZM4.5 19.5004H6.5V10.8332H4.5H2.5V19.5004H4.5ZM4.5 10.8332L5.84539 12.313L5.8557 12.3036L4.51031 10.8238L3.16493 9.34395L3.15461 9.35333L4.5 10.8332ZM4.51031 10.8238L5.88354 12.2778L13.3732 5.2044L12 3.75036L10.6268 2.29632L3.13708 9.36975L4.51031 10.8238ZM12 3.75036L10.6271 5.20467L18.1177 12.2762L19.4906 10.8219L20.8636 9.36761L13.3729 2.29605L12 3.75036ZM19.4906 10.8219L18.1453 12.3018L18.1556 12.3112L19.5009 10.8313L20.8463 9.3514L20.836 9.34203L19.4906 10.8219ZM19.5009 10.8313L17.5009 10.8311L17.5 19.5001L19.5 19.5004L21.5 19.5006L21.5009 10.8315L19.5009 10.8313Z" fill="#FB0D1F" mask="url(#path-1-inside-1_23214_336)"/>
                        </svg></span>
                                                <nav aria-label="Breadcrumbs" class="tx-breadcrumb__wrapper"><ul class="bread-crumb clearfix list-unstyled d-flex flex-wrap m-0" itemscope itemtype="http://schema.org/BreadcrumbList"><li itemprop="item ListElement" itemscope itemtype="http://schema.org/ListItem" class="item taBcrumb-begin"><a href="/" rel="home" itemprop="item"><span itemprop="name">Home</span></a><meta itemprop="position" content="1" /></li><li class="item taBcrumb-end"><span>Our Team</span></li></ul></nav>                    </div>
                                    </div>
            </div>
        </div>
        <!-- breadcrumb-end -->
        		<div data-elementor-type="wp-page" data-elementor-id="27" class="elementor elementor-27">
				<div class="elementor-element elementor-element-31e2505 e-con-full e-flex e-con e-parent" data-id="31e2505" data-element_type="container">
				<div class="elementor-element elementor-element-32c2603 elementor-widget elementor-widget-tx_team_lists elh-el tx_team_lists" data-id="32c2603" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_team_lists.default">
				<div class="elementor-widget-container">
					<section class="as-team-1-area pt-30 tx-section  no-transform">
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
                <div class="as-team-1-member ">
                    <div class="member-img wa-fix wa-img-cover wa-p-relative">
                                                <img decoding="async" class="wa_magnetic_1_elm" src="/wp-content/uploads/2025/10/t1-img-1.webp"
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
                <div class="as-team-1-member ">
                    <div class="member-img wa-fix wa-img-cover wa-p-relative">
                                                <img decoding="async" class="wa_magnetic_1_elm" src="/wp-content/uploads/2025/10/t1-img-2.webp"
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
                <div class="as-team-1-member ">
                    <div class="member-img wa-fix wa-img-cover wa-p-relative">
                                                <img decoding="async" class="wa_magnetic_1_elm" src="/wp-content/uploads/2025/10/t1-img-3.webp"
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
                <div class="as-team-1-member ">
                    <div class="member-img wa-fix wa-img-cover wa-p-relative">
                                                <img decoding="async" class="wa_magnetic_1_elm" src="/wp-content/uploads/2025/10/t1-img-4.webp"
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
		<div class="elementor-element elementor-element-ad2eed0 e-con-full e-flex e-con e-parent" data-id="ad2eed0" data-element_type="container">
				<div class="elementor-element elementor-element-305448f elementor-widget elementor-widget-tx_moving_text elh-el tx_moving_text" data-id="305448f" data-element_type="widget" data-settings="{&quot;design_style&quot;:&quot;style_1&quot;}" data-widget_type="tx_moving_text.default">
				<div class="elementor-widget-container">
					<section class="as-marquee-text-1-area wa-fix ">
    <div class="as-marquee-text-1-wrap-1">
        <div class="wa_marquee_left_nopause d-inline-block">
            <div class="as-marquee-text-1-content">
                                                        <h6 class="as-h-1 text-elm">
                        Apps Design                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Seo                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Digital Marketing                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Branding                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Web Design                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Website Marketing                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Apps Design                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Seo                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Digital Marketing                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Web Design                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                                            <h6 class="as-h-1 text-elm">
                        Website Marketing                    </h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                                                </div>
        </div>
    </div>

        <div class="as-marquee-text-1-wrap-2">
        <div class="wa_marquee_right_nopause d-inline-block">
            <div class="as-marquee-text-1-content">
                                                        <h6 class="as-h-1 text-elm">Apps Design</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Seo</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Digital Marketing</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Branding</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Web Design</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Website Marketing</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Apps Design</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Seo</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Digital Marketing</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Branding</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
                                                        <h6 class="as-h-1 text-elm">Website Marketing</h6>
                    
                                        <img decoding="async" src="/wp-content/uploads/2025/10/star.webp"
                    alt="star">
                    
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
                            
<div class="wpcf7 no-js" id="wpcf7-f2678-o1" lang="en-US" dir="ltr" data-wpcf7-id="2678">
<div class="screen-reader-response"><p role="status" aria-live="polite" aria-atomic="true"></p> <ul></ul></div>
<form action="https://themexriver.com/wp/avista/our-team/#wpcf7-f2678-o1" method="post" class="wpcf7-form init" aria-label="Contact form" novalidate="novalidate" data-status="init">
<fieldset class="hidden-fields-container"><input type="hidden" name="_wpcf7" value="2678" /><input type="hidden" name="_wpcf7_version" value="6.1.4" /><input type="hidden" name="_wpcf7_locale" value="en_US" /><input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f2678-o1" /><input type="hidden" name="_wpcf7_container_post" value="0" /><input type="hidden" name="_wpcf7_posted_data_hash" value="" />
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
                            <a href="/about"
                            target="_self"
                            rel="">
                                                                About us                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="/about"
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
                            <a href="/about"
                            target="_self"
                            rel="">
                                                                Testimonial                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="/faqs"
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
                            <a href="/"
                            target="_self"
                            rel="">
                                                                Home                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="/contact-us"
                            target="_self"
                            rel="">
                                                                Contact                            </a>
                        </li>
                                                <li class="as-p-1">
                            <a href="/blog"
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
                        <a href="https://themexriver.com/cdn-cgi/l/email-protection#224b4c444d62454f434b4e0c414d4f" target="_self" rel="" aria-label="info@gmail.com" class="as-footer-1-big-email as-p-1 ">
                            <span class="text wa_magnetic_btn_1">
                                <span class="__cf_email__" data-cfemail="c6afa8a0a986a1aba7afaae8a5a9ab">[email&#160;protected]</span>                            </span>
                        </a>
                    </div>
                </div>
                
            </div>

            <!-- logo -->
                        <div class="text-center mb-30">
                <a href="https://themexriver.com/wp/avista" class="as-footer-1-logo wa-fix tx-logo">
                    <img class="wow bounceInUp" src="/wp-content/uploads/2025/11/logo-5.svg"
                    alt="logo-5">
                </a>
            </div>
            
            <!-- footer-bottom -->
            <div class="as-footer-1-bottom">
                                <p class="as-footer-1-copyright as-p-1">
                    © All rights reserved <span class="copyright-year"></span>                </p>
                
                             
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
{"prefetch":[{"source":"document","where":{"and":[{"href_matches":"/wp/avista/*"},{"not":{"href_matches":["/wp/avista/wp-*.php","/wp/avista/wp-admin/*","/wp/avista/wp-content/uploads/*","/wp/avista/wp-content/*","/wp/avista/wp-content/plugins/*","/wp/avista/wp-content/themes/avista/*","/wp/avista/*\\\\?(.+)"]}},{"not":{"selector_matches":"a[rel~=\\"nofollow\\"]"}},{"not":{"selector_matches":".no-prefetch, .no-prefetch a"}}]},"eagerness":"conservative"}]}
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
<link rel='stylesheet' id='elementor-icons-shared-2-css' href='../wp-content/plugins/avista-core/assets/css/flaticon-avista5b3f.css?ver=1785262580' media='all' />
<link rel='stylesheet' id='elementor-icons-element-helper-flaticon-css' href='../wp-content/plugins/avista-core/assets/css/flaticon-avista5b3f.css?ver=1785262580' media='all' />
<script src="/wp-includes/js/dist/hooks.minaf5f.js?ver=dd5603f07f9220ed27f1" id="wp-hooks-js"></script>
<script src="/wp-includes/js/dist/i18n.min1cde.js?ver=c26c3dc7bed366793375" id="wp-i18n-js"></script>
<script id="wp-i18n-js-after">
wp.i18n.setLocaleData( { 'text direction\\u0004ltr': [ 'ltr' ] } );
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
<script src="/wp-content/themes/avista/assets/js/avista-core5b3f.js?ver=1785262580" id="avista-core-js"></script>
<script src="/wp-content/plugins/woocommerce/assets/js/sourcebuster/sourcebuster.min278d.js?ver=10.4.2" id="sourcebuster-js-js"></script>
<script id="wc-order-attribution-js-extra">
var wc_order_attribution = {"params":{"lifetime":1.0e-5,"session":30,"base64":false,"ajaxurl":"https://themexriver.com/wp/avista/wp-admin/admin-ajax.php","prefix":"wc_order_attribution_","allowTracking":true},"fields":{"source_type":"current.typ","referrer":"current_add.rf","utm_campaign":"current.cmp","utm_source":"current.src","utm_medium":"current.mdm","utm_content":"current.cnt","utm_id":"current.id","utm_term":"current.trm","utm_source_platform":"current.plt","utm_creative_format":"current.fmt","utm_marketing_tactic":"current.tct","session_entry":"current_add.ep","session_start_time":"current_add.fd","session_pages":"session.pgs","session_count":"udata.vst","user_agent":"udata.uag"}};
//# sourceURL=wc-order-attribution-js-extra
</script>
<script src="/wp-content/plugins/woocommerce/assets/js/frontend/order-attribution.min278d.js?ver=10.4.2" id="wc-order-attribution-js"></script>
<script src="/wp-content/plugins/elementor/assets/js/webpack.runtime.min37de.js?ver=3.33.4" id="elementor-webpack-runtime-js"></script>
<script src="/wp-content/plugins/elementor/assets/js/frontend-modules.min37de.js?ver=3.33.4" id="elementor-frontend-modules-js"></script>
<script src="/wp-includes/js/jquery/ui/core.minb37e.js?ver=1.13.3" id="jquery-ui-core-js"></script>
<script id="elementor-frontend-js-before">
var elementorFrontendConfig = {"environmentMode":{"edit":false,"wpPreview":false,"isScriptDebug":false},"i18n":{"shareOnFacebook":"Share on Facebook","shareOnTwitter":"Share on Twitter","pinIt":"Pin it","download":"Download","downloadImage":"Download image","fullscreen":"Fullscreen","zoom":"Zoom","share":"Share","playVideo":"Play Video","previous":"Previous","next":"Next","close":"Close","a11yCarouselPrevSlideMessage":"Previous slide","a11yCarouselNextSlideMessage":"Next slide","a11yCarouselFirstSlideMessage":"This is the first slide","a11yCarouselLastSlideMessage":"This is the last slide","a11yCarouselPaginationBulletMessage":"Go to slide"},"is_rtl":false,"breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},"responsive":{"breakpoints":{"mobile":{"label":"Mobile Portrait","value":767,"default_value":767,"direction":"max","is_enabled":true},"mobile_extra":{"label":"Mobile Landscape","value":880,"default_value":880,"direction":"max","is_enabled":false},"tablet":{"label":"Tablet Portrait","value":1024,"default_value":1024,"direction":"max","is_enabled":true},"tablet_extra":{"label":"Tablet Landscape","value":1200,"default_value":1200,"direction":"max","is_enabled":false},"laptop":{"label":"Laptop","value":1366,"default_value":1366,"direction":"max","is_enabled":false},"widescreen":{"label":"Widescreen","value":2400,"default_value":2400,"direction":"min","is_enabled":false}},"hasCustomBreakpoints":false},"version":"3.33.4","is_static":false,"experimentalFeatures":{"additional_custom_breakpoints":true,"container":true,"e_optimized_markup":true,"e_pro_free_trial_popup":true,"nested-elements":true,"home_screen":true,"global_classes_should_enforce_capabilities":true,"e_variables":true,"cloud-library":true,"e_opt_in_v4_page":true,"import-export-customization":true},"urls":{"assets":"https:\\/\\/themexriver.com\\/wp\\/avista\\/wp-content\\/plugins\\/elementor\\/assets\\/","ajaxurl":"https:\\/\\/themexriver.com\\/wp\\/avista\\/wp-admin\\/admin-ajax.php","uploadUrl":"https:\\/\\/themexriver.com\\/wp\\/avista\\/wp-content\\/uploads"},"nonces":{"floatingButtonsClickTracking":"1401e7d743"},"swiperClass":"swiper","settings":{"page":[],"editorPreferences":[]},"kit":{"active_breakpoints":["viewport_mobile","viewport_tablet"],"global_image_lightbox":"yes","lightbox_enable_counter":"yes","lightbox_enable_fullscreen":"yes","lightbox_enable_zoom":"yes","lightbox_enable_share":"yes","lightbox_title_src":"title","lightbox_description_src":"description"},"post":{"id":27,"title":"Our%20Team%20%E2%80%93%20Avista","excerpt":"","featuredImage":false}};
//# sourceURL=elementor-frontend-js-before
</script>
<script src="/wp-content/plugins/elementor/assets/js/frontend.min37de.js?ver=3.33.4" id="elementor-frontend-js"></script>
<script src="/wp-content/plugins/avista-core/assets/js/elh-element5b3f.js?ver=1785262580" id="elh-element-helper-js"></script>
<script id="wp-emoji-settings" type="application/json">
{"baseUrl":"https://s.w.org/images/core/emoji/17.0.2/72x72/","ext":".png","svgUrl":"https://s.w.org/images/core/emoji/17.0.2/svg/","svgExt":".svg","source":{"concatemoji":"https://themexriver.com/wp/avista/wp-includes/js/wp-emoji-release.min.js?ver=6.9.5"}}
</script>
<script type="module">
/*! This file is auto-generated */
const a=JSON.parse(document.getElementById("wp-emoji-settings").textContent),o=(window._wpemojiSettings=a,"wpEmojiSettingsSupports"),s=["flag","emoji"];function i(e){try{var t={supportTests:e,timestamp:(new Date).valueOf()};sessionStorage.setItem(o,JSON.stringify(t))}catch(e){}}function c(e,t,n){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);t=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data);e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(n,0,0);const a=new Uint32Array(e.getImageData(0,0,e.canvas.width,e.canvas.height).data);return t.every((e,t)=>e===a[t])}function p(e,t){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillText(t,0,0);var n=e.getImageData(16,16,1,1);for(let e=0;e<n.data.length;e++)if(0!==n.data[e])return!1;return!0}function u(e,t,n,a){switch(t){case"flag":return n(e,"\\ud83c\\udff3\\ufe0f\\u200d\\u26a7\\ufe0f","\\ud83c\\udff3\\ufe0f\\u200b\\u26a7\\ufe0f")?!1:!n(e,"\\ud83c\\udde8\\ud83c\\uddf6","\\ud83c\\udde8\\u200b\\ud83c\\uddf6")&&!n(e,"\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40\\udc65\\udb40\\udc6e\\udb40\\udc67\\udb40\\udc7f","\\ud83c\\udff4\\u200b\\udb40\\udc67\\u200b\\udb40\\udc62\\u200b\\udb40\\udc65\\u200b\\udb40\\udc6e\\u200b\\udb40\\udc67\\u200b\\udb40\\udc7f");case"emoji":return!a(e,"\\ud83e\\u1fac8")}return!1}function f(e,t,n,a){let r;const o=(r="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?new OffscreenCanvas(300,150):document.createElement("canvas")).getContext("2d",{willReadFrequently:!0}),s=(o.textBaseline="top",o.font="600 32px Arial",{});return e.forEach(e=>{s[e]=t(o,e,n,a)}),s}function r(e){var t=document.createElement("script");t.src=e,t.defer=!0,document.head.appendChild(t)}a.supports={everything:!0,everythingExceptFlag:!0},new Promise(t=>{let n=function(){try{var e=JSON.parse(sessionStorage.getItem(o));if("object"==typeof e&&"number"==typeof e.timestamp&&(new Date).valueOf()<e.timestamp+604800&&"object"==typeof e.supportTests)return e.supportTests}catch(e){}return null}();if(!n){if("undefined"!=typeof Worker&&"undefined"!=typeof OffscreenCanvas&&"undefined"!=typeof URL&&URL.createObjectURL&&"undefined"!=typeof Blob)try{var e="postMessage("+f.toString()+"("+[JSON.stringify(s),u.toString(),c.toString(),p.toString()].join(",")+"));",a=new Blob([e],{type:"text/javascript"});const r=new Worker(URL.createObjectURL(a),{name:"wpTestEmojiSupports"});return void(r.onmessage=e=>{i(n=e.data),r.terminate(),t(n)})}catch(e){}i(n=f(s,u,c,p))}t(n)}).then(e=>{for(const n in e)a.supports[n]=e[n],a.supports.everything=a.supports.everything&&a.supports[n],"flag"!==n&&(a.supports.everythingExceptFlag=a.supports.everythingExceptFlag&&a.supports[n]);var t;a.supports.everythingExceptFlag=a.supports.everythingExceptFlag&&!a.supports.flag,a.supports.everything||((t=a.source||{}).concatemoji?r(t.concatemoji):t.wpemoji&&t.twemoji&&(r(t.twemoji),r(t.wpemoji)))});
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(teamPageSchema) }}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `document.body.className = "wp-singular page-template page-template-elementor_header_footer page page-id-27 wp-embed-responsive wp-theme-avista theme-avista woocommerce-no-js no-sidebar elementor-default elementor-template-full-width elementor-kit-7 elementor-page elementor-page-27";`,
                }}
            />
            <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
        </>
    );
}
