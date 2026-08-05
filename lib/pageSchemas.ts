/**
 * Shared JSON-LD schema builders for individual pages.
 * Import and use in each page's generateMetadata or as a Script component.
 */

const SITE_URL = 'https://titangrowthhub.com';
const ORG_ID = `${SITE_URL}/#organization`;

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'Titan Growth Hub',
  url: SITE_URL,
  description: "Pakistan's #1 SEO & Digital Marketing Agency",
  image: `${SITE_URL}/wp-content/uploads/2025/11/fevicon-1.webp`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
  priceRange: '$$',
  openingHours: 'Mo-Fr 09:00-18:00',
  sameAs: [
    'https://www.facebook.com/titangrowthhub',
    'https://www.linkedin.com/company/titangrowthhub',
    'https://twitter.com/titangrowthhub',
  ],
};

export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about/#webpage`,
  url: `${SITE_URL}/about`,
  name: 'About Titan Growth Hub',
  description: 'Learn about our team, mission, and how we drive measurable SEO results.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': ORG_ID },
};

export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact-us/#webpage`,
  url: `${SITE_URL}/contact-us`,
  name: 'Contact Titan Growth Hub',
  description: 'Get in touch with our SEO and digital marketing experts.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': ORG_ID },
};

export const servicesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/our-services/#webpage`,
  url: `${SITE_URL}/our-services`,
  name: 'Our Services – Titan Growth Hub',
  description: 'Explore our full suite of digital marketing services.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': ORG_ID },
};

export const teamPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/our-team/#webpage`,
  url: `${SITE_URL}/our-team`,
  name: 'Our Team – Titan Growth Hub',
  description: 'Meet the experts behind Titan Growth Hub.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  publisher: { '@id': ORG_ID },
};

export const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog/#blog`,
  url: `${SITE_URL}/blog`,
  name: 'Titan Growth Hub Blog',
  description: 'SEO tips, digital marketing strategies, and growth hacks.',
  publisher: { '@id': ORG_ID },
};

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/faqs/#faqpage`,
  url: `${SITE_URL}/faqs`,
  name: 'FAQs – Titan Growth Hub',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Titan Growth Hub offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer SEO, PPC, content marketing, social media marketing, and web development services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does SEO take to show results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SEO typically shows significant results within 3-6 months, depending on competition and website authority.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we work with clients worldwide. Our team is experienced in global SEO strategies.',
      },
    },
  ],
};
