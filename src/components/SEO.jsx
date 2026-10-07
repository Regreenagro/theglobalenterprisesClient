import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://www.theglobalenterprises.in';

const staticSEOMap = {
  '/': {
    title: 'Global Enterprises | Commercial CCTV, Access Control & Office Fit-Out Delhi NCR',
    description: 'Premier Delhi NCR contractor for 4K CCTV surveillance, biometric access control, certified fire alarms, boardroom AV, and turnkey commercial office fit-outs. Free site audit.',
    keywords: 'CCTV surveillance Delhi NCR, office fit-outs Delhi, access control systems, biometric attendance, fire alarm systems NBC 2016, boardroom audio visual, turnkey security contractors, Global Enterprises CR Park, South Delhi',
    image: '/images/headquarters.webp',
    type: 'website',
    isIndexable: true,
    pageName: 'Home'
  },
  '/about': {
    title: 'About Global Enterprises | Workplace Infrastructure Leaders Since 2012',
    description: 'Established in 2012 in CR Park, New Delhi, Global Enterprises delivers enterprise security systems, smart access control, and turnkey office fit-outs across India.',
    keywords: 'Global Enterprises Sachin Arora, Vasu Arora, security contractors Delhi, turnkey office contractors CR Park, technology infrastructure company India, commercial fitouts history',
    image: '/images/headquarters.webp',
    type: 'article',
    isIndexable: true,
    pageName: 'About Us'
  },
  '/services': {
    title: 'Turnkey Commercial Services | CCTV, Fire Safety, AV & Fit-Out Delhi NCR',
    description: 'Explore our 6 specialized infrastructure domains: 4K CCTV surveillance, access control, boardroom AV, certified fire alarms, enterprise networking, and office fit-outs.',
    keywords: 'commercial CCTV installation Delhi, biometric access control, boardroom automation, corporate fire safety, structured IT cabling, commercial office interiors, Dorset smart locks Delhi NCR',
    image: '/images/cctv.webp',
    type: 'website',
    isIndexable: true,
    pageName: 'Services'
  },
  '/capabilities': {
    title: 'Security Hardware & Systems Matrix | Global Enterprises CR Park',
    description: 'Technical specifications for enterprise 4K CCTV cameras, speed gates, fire alarm panels, boardroom display matrix, and Dorset digital locks across India.',
    keywords: 'speed gates Delhi, 4K CCTV specs, Dorset digital locks, addressable fire alarm panel, boardroom display matrix, commercial security hardware specs',
    image: '/images/speedgates.webp',
    type: 'website',
    isIndexable: true,
    pageName: 'Hardware Matrix'
  },
  '/values': {
    title: 'Core Operating Values & Corporate Ethics | Global Enterprises',
    description: 'Discover the 5 core operating principles guiding Global Enterprises: Quality, Timeliness, Fair Value, Dedication, and Honest Integrity in every turnkey project.',
    keywords: 'corporate integrity values, ethical contractors Delhi, quality workspace engineering, client dedication principles',
    image: '/images/workspace.webp',
    type: 'article',
    isIndexable: true,
    pageName: 'Core Values'
  },
  '/mission': {
    title: 'Mission & Strategic Vision | Global Enterprises CR Park New Delhi',
    description: 'Our mission is engineering safe, smart, and sustainable workspaces across India through cutting-edge security systems and turnkey infrastructure delivery.',
    keywords: 'workspace vision, technology infrastructure mission, corporate engineering goals, sustainable office design Delhi',
    image: '/images/hero_bg.webp',
    type: 'article',
    isIndexable: true,
    pageName: 'Mission & Vision'
  },
  '/clients': {
    title: 'Corporate Clients & Partner Portfolio | Global Enterprises',
    description: 'Trusted by Indigo Airlines, FedEx, Air India, Cosmo First, and government agencies across India for turnkey security infrastructure and workspace fit-outs.',
    keywords: 'Global Enterprises clients, Indigo airlines security contractor, Air India contractor, FedEx contractor, corporate facility clients Delhi NCR',
    image: '/images/firesafety.webp',
    type: 'website',
    isIndexable: true,
    pageName: 'Client Trust'
  },
  '/contact': {
    title: 'Contact Global Enterprises | Free Site Survey & BOQ Delhi NCR',
    description: 'Contact our CR Park, New Delhi team for free site audits, turnkey BOQ estimates, and emergency support. Call +91-98999-33768 or visit us in South Delhi.',
    keywords: 'contact Global Enterprises, CR Park office address, security site audit Delhi, turnkey consultation phone number, globalenterprises010',
    image: '/images/headquarters.webp',
    type: 'website',
    isIndexable: true,
    pageName: 'Contact & Quote'
  },
  '/admin': {
    title: 'Admin Dashboard | Global Enterprises CRM',
    description: 'Administrative CRM portal for Global Enterprises team members.',
    keywords: 'admin dashboard, internal crm',
    image: '/images/headquarters.webp',
    type: 'website',
    isIndexable: false,
    pageName: 'Admin Dashboard'
  },
  '/admin/login': {
    title: 'Admin Portal Login | Global Enterprises CRM',
    description: 'Secure administrative authentication portal for Global Enterprises team members.',
    keywords: 'admin login, internal crm portal',
    image: '/images/headquarters.webp',
    type: 'website',
    isIndexable: false,
    pageName: 'Admin Login'
  },
  '/admin-login': {
    title: 'Admin Portal Login | Global Enterprises CRM',
    description: 'Secure administrative authentication portal for Global Enterprises team members.',
    keywords: 'admin login, internal crm portal',
    image: '/images/headquarters.webp',
    type: 'website',
    isIndexable: false,
    pageName: 'Admin Login'
  }
};

const homeFaqs = [
  {
    q: 'What are the components of a good security system?',
    a: 'A comprehensive security system majorly includes elements like access control, surveillance (CCTV), intrusion detection, fire detection, and emergency response plans, supported by proper network configuration.'
  },
  {
    q: 'How can I learn more or get a demo?',
    a: 'You can book a demo by calling/emailing us directly at +91-98999-33768 or globalenterprises010@gmail.com, or using the Schedule a meeting button on our website.'
  },
  {
    q: 'What are the benefits of using a single vendor for multiple solutions?',
    a: 'Using a single vendor eliminates finger-pointing between separate subcontractors, reduces procurement overhead, ensures unified system integration, and delivers a single point of accountability with faster SLA response.'
  }
];

const servicesFaqs = [
  {
    q: 'What are the components of a complete security system?',
    a: 'A complete security system includes access control, video surveillance (CCTV), intrusion detection, fire alarms, and emergency egress protocols, supported by proper network configuration.'
  },
  {
    q: 'How can I schedule a consultation or site audit?',
    a: 'You can schedule a consultation by calling or emailing us directly at +91-98999-33768, or using the Schedule a meeting button on our website.'
  },
  {
    q: 'What are the benefits of using a single vendor for multiple infrastructure needs?',
    a: 'Using a single vendor simplifies project coordination, eliminates finger-pointing between contractors, and ensures smooth integration across security, IT, and interior fit-outs.'
  },
  {
    q: 'What is included in a Global Enterprises Turnkey AMC contract?',
    a: 'Our Turnkey AMC includes scheduled preventative maintenance, sensor calibration, optical lens cleaning, emergency technician dispatch within 4 hours, and dedicated account management.'
  },
  {
    q: 'Are your fire safety installations certified according to safety codes?',
    a: 'Yes. All fire safety installations, control panels, smoke detectors, and emergency linkages comply with statutory safety guidelines and National Building Code (NBC 2016) standards.'
  }
];

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Resolve current page SEO metadata
    let seo = staticSEOMap[pathname] || staticSEOMap['/'];

    let breadcrumbElements = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': BASE_URL
      }
    ];

    if (pathname !== '/') {
      breadcrumbElements.push({
        '@type': 'ListItem',
        'position': 2,
        'name': seo.pageName,
        'item': `${BASE_URL}${pathname}`
      });
    }

    const currentUrl = pathname === '/' ? BASE_URL : `${BASE_URL}${pathname}`;
    const imageUrl = seo.image.startsWith('http') ? seo.image : `${BASE_URL}${seo.image}`;

    // 2. Set Document Title
    document.title = seo.title;

    // Helper for Meta Tags
    const setMetaTag = (attrName, attrValue, content) => {
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Primary Meta Tags
    setMetaTag('name', 'description', seo.description);
    if (seo.keywords) {
      setMetaTag('name', 'keywords', seo.keywords);
    }
    setMetaTag('name', 'robots', seo.isIndexable ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow');

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', imageUrl);
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '675');
    setMetaTag('property', 'og:image:alt', `${seo.title} - Global Enterprises`);
    setMetaTag('property', 'og:type', seo.type || 'website');
    setMetaTag('property', 'og:locale', 'en_IN');
    setMetaTag('property', 'og:site_name', 'Global Enterprises');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', imageUrl);
    setMetaTag('name', 'twitter:image:alt', `${seo.title} - Global Enterprises`);

    // 6. Set Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 7. Inject Structured Data (Schema.org Graph)
    // Note: Core static schemas (WebSite, Corporation, LocalBusiness with single AggregateRating, OfferCatalog, and Home FAQPage)
    // are declared canonically in index.html to guarantee instantaneous, error-free search engine indexing.
    // Dynamic page-specific schemas (BreadcrumbList, Service on /services, and Service FAQs) are injected here.
    const graphItems = [
      {
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}#breadcrumb`,
        'itemListElement': breadcrumbElements
      }
    ];

    // Comprehensive Service Schema on Services page
    if (pathname === '/services') {
      graphItems.push({
        '@type': 'Service',
        '@id': `${BASE_URL}/services#service`,
        'name': 'Commercial Workspace & Security Infrastructure Solutions',
        'serviceType': 'Turnkey Commercial Engineering & Contracting',
        'description': 'Comprehensive corporate security, 4K CCTV surveillance, smart access control, certified fire alarms, boardroom AV, structured IT cabling, and turnkey office fit-outs in Delhi NCR.',
        'provider': {
          '@id': `${BASE_URL}/#localbusiness`
        },
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name': 'Delhi NCR'
        },
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Global Enterprises Specialized Service Domains',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Security & Monitoring Systems',
                'description': 'Enterprise 4K optical surveillance, Starlight night-vision, NVR storage arrays, biometric speed gates, and authorized Dorset digital door locks.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Audio & Video Solutions',
                'description': 'High-definition video conference rooms, ceiling beamforming microphone arrays, interactive 4K display panels, and EPABX telephony.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Fire Safety, Leakage & Rodent Management',
                'description': 'NBC 2016 compliant addressable fire panels, optical thermal smoke detection, water leakage sensing cables, and ultrasonic rodent repellents.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Network & Connectivity Services',
                'description': 'Enterprise Wi-Fi 6 wireless architecture, Cat6A structured cabling, high-density server racks, and high-bandwidth wireless point-to-point links.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Fit-out & Leasehold Improvement Services',
                'description': 'Turnkey commercial interior contracting from bare shell to occupation: acoustic glass partitions, ergonomic workstations, MEP, and lighting.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Precision Injection Moulding Solutions',
                'description': 'Certified precision plastics engineering, client mould maintenance, design for manufacturing (DFM), and high-volume component fabrication.'
              }
            }
          ]
        }
      });
    }

    // FAQ Schema on Services page (Home FAQs are canonically defined in index.html)
    let activeFaqs = [];
    if (pathname === '/services') {
      activeFaqs = servicesFaqs;
    }

    if (activeFaqs.length > 0) {
      graphItems.push({
        '@type': 'FAQPage',
        '@id': `${currentUrl}#faq`,
        'mainEntity': activeFaqs.map(f => ({
          '@type': 'Question',
          'name': f.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.a
          }
        }))
      });
    }

    const dynamicSchema = {
      '@context': 'https://schema.org',
      '@graph': graphItems
    };

    let scriptEl = document.getElementById('dynamic-page-schema');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-page-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(dynamicSchema);

  }, [pathname]);

  return null;
}
