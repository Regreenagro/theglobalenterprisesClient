import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://theglobalenterprises.vercel.app';

const pageSEOMap = {
  '/': {
    title: 'Global Enterprises | Integrated Workspace & Security Solutions | Delhi NCR',
    description: 'Global Enterprises is an ISO certified single-window partner providing 4K CCTV surveillance, Dorset smart door locks, access control, boardroom AV, fire safety, and turnkey office fit-outs across Delhi NCR and India.',
    keywords: 'CCTV surveillance Delhi NCR, office fit-outs India, Dorset smart locks, access control systems, biometric attendance, fire alarm systems, boardroom audio visual, IT network cabling, turnkey security contractors, Global Enterprises CR Park',
    image: '/images/headquarters.jpg',
    type: 'website',
    isIndexable: true,
    pageName: 'Home'
  },
  '/about': {
    title: 'About Global Enterprises | Turnkey Workspace & Security Leaders Since 2012',
    description: 'Founded in 2012 by Sachin and Rajni Arora, Global Enterprises delivers turnkey technology integration, security infrastructure, and office environments from CR Park, New Delhi.',
    keywords: 'Global Enterprises Sachin Arora, security contractors Delhi, turnkey office contractors CR Park, technology infrastructure company India, commercial fitouts history',
    image: '/images/headquarters.jpg',
    type: 'article',
    isIndexable: true,
    pageName: 'About Us'
  },
  '/services': {
    title: 'Workspace, Security & IT Infrastructure Services | Global Enterprises',
    description: 'Explore our 6 core services: 4K CCTV Security & Surveillance, Boardroom Audio & Video Solutions, Fire Safety & Rodent Management, Network & Connectivity, Office Fit-outs, and Precision Moulding.',
    keywords: 'commercial CCTV installation, biometric access control, boardroom automation, corporate fire safety, structured IT cabling, commercial office interiors, Dorset smart locks Delhi',
    image: '/images/cctv.jpg',
    type: 'website',
    isIndexable: true,
    pageName: 'Services'
  },
  '/capabilities': {
    title: 'Security Hardware & Systems Matrix | Global Enterprises',
    description: 'Specifications for commercial 4K CCTV cameras, optical speed gates, addressable fire alarm panels, boardroom display systems, Dorset smart locks, and ergonomic modular workstations.',
    keywords: 'speed gates Delhi, 4K CCTV specs, Dorset digital locks, addressable fire alarm panel, boardroom display matrix, commercial security hardware specs',
    image: '/images/speedgates.jpg',
    type: 'website',
    isIndexable: true,
    pageName: 'Hardware & Systems Matrix'
  },
  '/values': {
    title: 'Our Core Operating Values & Ethics | Global Enterprises',
    description: 'The five operating principles that guide our everyday client work: Quality, Timeliness, Fair Value, Dedication, and Honest Integrity in every turnkey project.',
    keywords: 'corporate integrity values, ethical contractors Delhi, quality workspace engineering, client dedication principles',
    image: '/images/workspace.jpg',
    type: 'article',
    isIndexable: true,
    pageName: 'Core Values'
  },
  '/mission': {
    title: 'Our Mission & Strategic Vision | Global Enterprises',
    description: 'Building long-term client partnerships through turnkey project execution, reliable ongoing maintenance, and sustainable workspace engineering across India.',
    keywords: 'workspace vision, technology infrastructure mission, corporate engineering goals, sustainable office design Delhi',
    image: '/images/hero_bg.jpg',
    type: 'article',
    isIndexable: true,
    pageName: 'Mission & Vision'
  },
  '/clients': {
    title: 'Our Community of Corporate Clients | Global Enterprises',
    description: 'See the airlines, corporations, logistics providers, and public institutions across India that trust Global Enterprises for workspace infrastructure and security.',
    keywords: 'Global Enterprises clients, Indigo airlines security contractor, Air India contractor, corporate facility clients Delhi NCR',
    image: '/images/firesafety.jpg',
    type: 'website',
    isIndexable: true,
    pageName: 'Clients'
  },
  '/contact': {
    title: 'Contact Global Enterprises | Site Audit & Turnkey Consultation | CR Park New Delhi',
    description: 'Get in touch with our engineering and project teams in CR Park, New Delhi for technical site assessments, service inquiries, BOQ estimates, and project consultations.',
    keywords: 'contact Global Enterprises, CR Park office address, security site audit Delhi, turnkey consultation phone number, globalenterprises010',
    image: '/images/headquarters.jpg',
    type: 'website',
    isIndexable: true,
    pageName: 'Contact Us'
  },
  '/admin': {
    title: 'Admin Dashboard | Global Enterprises CRM',
    description: 'Administrative CRM portal for Global Enterprises team members.',
    keywords: 'admin dashboard, internal crm',
    image: '/images/headquarters.jpg',
    type: 'website',
    isIndexable: false,
    pageName: 'Admin Dashboard'
  },
  '/admin/login': {
    title: 'Admin Portal Login | Global Enterprises CRM',
    description: 'Secure administrative authentication portal for Global Enterprises team members.',
    keywords: 'admin login, internal crm portal',
    image: '/images/headquarters.jpg',
    type: 'website',
    isIndexable: false,
    pageName: 'Admin Login'
  },
  '/admin-login': {
    title: 'Admin Portal Login | Global Enterprises CRM',
    description: 'Secure administrative authentication portal for Global Enterprises team members.',
    keywords: 'admin login, internal crm portal',
    image: '/images/headquarters.jpg',
    type: 'website',
    isIndexable: false,
    pageName: 'Admin Login'
  }
};

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = pageSEOMap[pathname] || pageSEOMap['/'];
    const currentUrl = pathname === '/' ? BASE_URL : `${BASE_URL}/#${pathname}`;
    const imageUrl = `${BASE_URL}${seo.image}`;

    // 1. Update Title
    document.title = seo.title;

    // 2. Helper for meta tag updates
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Primary Meta Tags
    setMetaTag('name', 'description', seo.description);
    setMetaTag('name', 'keywords', seo.keywords || '');
    setMetaTag('name', 'author', 'Global Enterprises');
    setMetaTag('name', 'revisit-after', '7 days');

    // Robots directive based on indexability
    if (seo.isIndexable) {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    } else {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    }

    // 4. Open Graph Meta Tags
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:type', seo.type);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:site_name', 'Global Enterprises');
    setMetaTag('property', 'og:locale', 'en_IN');

    // 5. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', imageUrl);

    // 6. Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 7. Dynamic WebPage & BreadcrumbList JSON-LD Schema
    const graphItems = [
      {
        '@type': 'WebPage',
        '@id': `${currentUrl}#webpage`,
        'url': currentUrl,
        'name': seo.title,
        'description': seo.description,
        'isPartOf': {
          '@id': `${BASE_URL}/#website`
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': BASE_URL
          },
          ...(pathname !== '/' ? [{
            '@type': 'ListItem',
            'position': 2,
            'name': seo.pageName,
            'item': currentUrl
          }] : [])
        ]
      }
    ];

    // FAQPage schema on home page for Google Rich Snippets
    if (pathname === '/') {
      graphItems.push({
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/#faq`,
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What turnkey infrastructure solutions does Global Enterprises provide?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Global Enterprises provides end-to-end turnkey infrastructure including 4K Starlight CCTV surveillance, Dorset smart door locks, biometric access control, optical speed gates, fire alarms, boardroom audio-video integration, structured IT networking, and ergonomic modular office fit-outs across Delhi NCR and India.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Does Global Enterprises provide on-site technical audits and BOQ estimates?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, our certified engineering team conducts technical site audits across Delhi NCR, Haryana, and Uttar Pradesh. We prepare detailed Bill of Quantities (BOQ), itemized proposals, and turnkey budget estimations based on your facility square footage.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Is Global Enterprises an authorized partner for Dorset smart locks and security hardware?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, Global Enterprises is an authorized distributor and deployment partner for Dorset digital locks, high-definition CCTV systems, and commercial safety hardware, ensuring genuine OEM warranties and certified installation.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Where is Global Enterprises located and how can I contact support?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Our corporate office is located at 52/21 Basement, Pocket 52, CR Park, New Delhi 110019. You can reach our technical consultation team at +91-98999-33768 or email globalenterprises010@gmail.com.'
            }
          }
        ]
      });
    }

    const pageSchema = {
      '@context': 'https://schema.org',
      '@graph': graphItems
    };

    let scriptElement = document.getElementById('dynamic-page-schema');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'dynamic-page-schema';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(pageSchema);

  }, [pathname]);

  return null;
}
