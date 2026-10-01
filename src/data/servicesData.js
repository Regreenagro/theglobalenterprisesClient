import {
  Shield,
  Tv,
  Flame,
  Server,
  Armchair,
  Boxes
} from 'lucide-react';

export const servicesData = [
  {
    id: 'security_monitoring',
    title: 'Security & Monitoring Systems',
    shortTitle: 'Security & Monitoring',
    icon: Shield,
    image: '/images/cctv.webp',
    headline: "Let's Make Your Place Safer, Together.",
    subHeadline: 'Surveillance & Monitoring Systems Installed for Your Protection and Convenience',
    intro: "Imagine feeling completely secure, no matter where you are. We make that happen. We're your friendly professionals for security and safety installations, so you can relax knowing your workplace is protected.",
    closingBadge: 'EXPERT INSTALLATION & AMC SUPPORT',
    closingHeadline: 'Peace of mind starts here. Expert security and monitoring installations.',
    closingCta: 'Get Started',
    coreOfferings: [
      {
        name: 'Complete Corporate Surveillance & Monitoring Solutions',
        subtitle: 'Professional CCTV camera installation services',
        points: [
          'Strategic Camera Placement: With thorough site assessments to determine optimal camera locations, we give complete and clear surveillance coverage.',
          'Expert System Configuration: We configure your recording system for seamless operation and easy retrieval of recorded footage.',
          'Remote Viewing Setup: Sleep peacefully with remote access to your live camera feeds via your mobile or computer. Monitor your office property from anywhere.'
        ],
        subgroupTitle: 'Supported CCTV Systems:',
        subgroups: [
          {
            title: 'IP-based CCTV Systems',
            desc: 'Network-connected, ultra high-resolution digital video with remote access.'
          },
          {
            title: 'HD-based CCTV Systems',
            desc: 'Analog, high-definition video over precision coaxial cabling.'
          },
          {
            title: 'Standalone CCTV Systems',
            desc: 'Independent, localized recording systems configured for secure local storage.'
          }
        ],
        integrationNote: 'We install and integrate all three: We understand your needs, strategically place and configure the chosen system, set up networks and remote access for IP, run proper coaxial cabling for HD, and configure Standalone systems for local recording — or combine systems for optimal coverage.',
        tagTitle: 'Popular CCTV Cameras in the Market:',
        tags: [
          'Bullet Cameras (Perimeter / Outdoor)',
          'Dome Cameras (Vandal-Proof / Indoor)',
          'PTZ Pan-Tilt-Zoom (360° Tracking)',
          'Turret / Eyeball Cameras (Zero IR Glare)',
          'Starlight / Full-Color Night Vision'
        ]
      },
      {
        name: 'Body-Worn Cameras',
        points: [
          "If you need body cameras, we'll show your team how to use them, so they're comfortable and confident.",
          "We'll also handle storing all that video, keeping it safe and sound with secure encrypted archival."
        ]
      },
      {
        name: 'Access Control Systems',
        points: [
          "We'll put in card readers so only the right people can get in.",
          "Want something super secure? We can set up fingerprint or face recognition terminals.",
          "We can even help you keep track of visitors, making sure everyone's accounted for."
        ]
      },
      {
        name: 'Public Access & Attendance Systems',
        points: [
          'Effortless Time Tracking: We offer digital systems for streamlined, accurate attendance.',
          'Implement controlled access via turnstiles, enhancing security and preventing unauthorized entry.',
          'Real-time video monitoring and communication for corporate entrances, enhancing security and visitor management with mobile integration.'
        ]
      },
      {
        name: 'Smart Door Locks',
        points: [
          'Enterprise Smart Door Lock Systems: Keyless entry, remote management, and audit logs for enhanced security and efficiency.',
          'Smart Lock Integration: Professional deployment into existing infrastructure, optimizing security protocols.',
          'Remote Access Configuration: Robust remote access for flexible premises management.',
          'Integrated Video Doorbell & Mobile Communication: Real-time video and mobile access for advanced visitor management.'
        ]
      }
    ],
    benefitsTitle: 'How Global Enterprises Make Your Life Easier',
    benefits: [
      'Your place will be super secure, allowing you to relax.',
      'You can avoid accidents and stay safe.',
      'Your day-to-day operations will be smoother.',
      'You\'ll have peace of mind knowing you\'re protected.',
      'A plan tailored just for you will be created.',
      'All installation and support will be handled, so you don\'t have to worry.'
    ],
    ctaText: 'Schedule a Meeting'
  },
  {
    id: 'audio_video',
    title: 'Audio & Video Solutions',
    shortTitle: 'Audio & Video Solutions',
    icon: Tv,
    image: '/images/av_room.webp',
    headline: 'Leading Audio & Video Solutions Provider in India',
    subHeadline: 'Driving Productivity Through Seamless Connectivity & Immersive Experiences',
    introTitle: 'Communication: Effortless Connection & Collaboration',
    intro: 'Consider audio-visual (AV) solutions as means to assist businesses to communicate and connect more effectively. They range from video conferencing, digital signage, and sound systems. To any business, these solutions make meetings easier to understand, presentations more captivating, and customer experiences more memorable. Whether a small office requiring an effective video calling system or a big retail store desiring to display offers, AV solutions enable effective transmission of information. We offer integrated solutions that allow for effective and clear communication, whether in the same room or on different continents.',
    closingBadge: 'PREMIER AUDIO-VISUAL INTEGRATION',
    closingHeadline: "India's Premier Audio-Visual Solutions. Powering Productivity & Immersive Experiences.",
    closingCta: 'Get Started',
    coreOfferings: [
      {
        name: 'Video Conferencing Systems & Display Presentation',
        points: [
          'Video Conferencing Systems: Allow for face-to-face meetings over distance, encourage collaboration, and save on travel expenses. We create and deploy systems that deliver high-definition video and audio, providing a seamless and productive experience.'
        ],
        subgroupTitle: 'Display & Presentation Solutions:',
        subgroups: [
          {
            title: 'Large Displays or Projectors',
            desc: 'High-definition commercial displays and high-lumen projectors for impactful visuals.'
          },
          {
            title: 'Wireless Presentation Systems',
            desc: 'Wireless presentation systems for easy, cable-free content sharing from any device.'
          },
          {
            title: 'Interactive Whiteboards & Touchscreens',
            desc: 'Interactive whiteboards or touchscreens for real-time digital collaboration.'
          }
        ],
        tagTitle: 'Key Video Collaboration Capabilities:',
        tags: [
          'Face-to-Face HD Video',
          'Large Displays & Projectors',
          'Wireless Content Sharing',
          'Interactive Touchscreens'
        ]
      },
      {
        name: 'Audio Conferencing Systems & Public Address Systems',
        points: [
          'Audio Conferencing Systems: Enable easy audio communication for group meetings and discussions. We have a variety of solutions, ranging from basic speakerphones to sophisticated audio processing systems, so that everyone can hear and be heard. It includes Microphones (array microphones, tabletop microphones, etc.) with noise cancellation.',
          'Public Address Systems: Provide a clear and audible voice in any setting. We install and design PA systems for a variety of uses, ranging from a small office space to a huge auditorium.'
        ]
      },
      {
        name: 'Conference Hall Integration & E-Classrooms',
        points: [
          'Conference Hall Integration: Conference hall integration is to configure all the technology in a meeting room to be easy to leverage by employees or learners. That means setting up LCD/LED screens, projectors, microphones and speakers for clear audio and visual for all. We also have video conferencing for people who are joining from other areas, and we have simple controls that manage all of this.',
          'E-Classrooms: Improve the teaching experience with innovative and interactive e-classroom solutions. Our installations assist with remote learning, multimedia presentations, and group work. It includes interactive touchscreens, advanced audio-visual (AV) systems, and software that facilitates digital learning.'
        ]
      },
      {
        name: 'Presentation Systems & Digital Signage',
        points: [
          'Presentation Systems: Make engaging presentations with our sophisticated presentation systems. Our solutions range from projectors, displays, and control systems to make sure your message stands out and fascinates the audience.',
          'Digital Signage: Blending hardware like various display screens (LCD, LED, video walls, touchscreens) with software like content management systems for easy content creation and scheduling. These solutions also include installation and maintenance. Businesses can find both ready-made and custom-designed systems, with a growing trend towards interactive displays and cloud-based management, catering to diverse sectors from retail to transportation.'
        ]
      },
      {
        name: 'Board Rooms & Meeting Rooms',
        points: [
          'Board Rooms & Meeting Rooms: To make meetings easier, board room and meeting room conferencing solutions offer simple controls and automatic adjustments for things like lights and equipment. Strong internet connections and easy room booking keep things tidy.',
          "Hybrid Meeting Solutions: Plus, we install special features for hybrid meetings, like cameras that focus on whoever's talking and tools to share documents easily. All of this helps everyone, whether they're in the room or joining from somewhere else, have a fair and productive meeting."
        ]
      },
      {
        name: 'EPABX: Streamlined Call Handling',
        points: [
          'EPABX Installation and Setup: Create a dependable and effective telephone communication system with our EPABX installation and setup services. We customise solutions to suit your unique business requirements.',
          'Call Routing and Management: Maximise call handling with our sophisticated call routing and management capabilities. We offer systems that enable you to route calls to the right staff, control call queues, and monitor call activity.'
        ]
      }
    ],
    benefitsTitle: 'Comprehensive Solutions for Diverse Needs',
    benefitsSubtitle: 'We provide end-to-end solutions for:',
    benefits: [
      'Large Corporations',
      'Small to Medium-sized Businesses (SMBs)',
      'Hotels and Hospitality',
      'Healthcare Facilities',
      'Government buildings',
      'Auditoriums'
    ],
    ctaText: 'Schedule a Meeting'
  },
  {
    id: 'fire_safety_rodent',
    title: 'Fire Safety, Leakage & Rodent Management',
    shortTitle: 'Fire Safety & Leakage',
    icon: Flame,
    image: '/images/firesafety.webp',
    headline: 'Comprehensive Protection Against Fire, Water, and Rodent',
    subHeadline: 'Protecting Your Assets and Ensuring Business Continuity',
    introTitle: 'Fire Detection, Water Leakage Systems & Rodent Control',
    intro: "Protecting your assets and ensuring business continuity. Secure your company's future for the long run with real, unmatched foresight. We deploy cutting-edge alarm panels, automated fire suppression, sensor-based leak detection, and corporate rodent management to eliminate operational downtime and safeguard critical infrastructure.",
    closingBadge: 'CERTIFIED FIRE SAFETY & RISK MANAGEMENT',
    closingHeadline: 'Ensure long-term resilience. Consult our experts for a complete risk management plan.',
    closingCta: 'Get Started',
    coreOfferings: [
      {
        name: 'Fire Alarm Systems',
        subtitle: 'Protecting Your Assets and Ensuring Business Continuity',
        points: [
          'Advanced Early Warning Systems: We deploy cutting-edge alarm panels and highly sensitive smoke detectors designed for rapid detection in large corporate environments. This minimizes downtime and protects critical infrastructure, ensuring uninterrupted operations.',
          'Automated Fire Suppression for Maximum Protection: Our strategically installed sprinkler systems provide automated, immediate fire suppression, limiting damage to valuable equipment, data centres, and office spaces. This is essential for maintaining business continuity and lowering financial losses.',
          'Strategic Fire Extinguisher Deployment and Training: We provide and strategically position industry-grade fire extinguishers throughout your facilities, coupled with comprehensive training programs for your staff. This empowers your team to respond effectively in emergencies, minimizing risk and ensuring compliance with safety regulations.'
        ],
        subgroupTitle: 'Specialized Alarm Architectures:',
        subgroups: [
          {
            title: 'Conventional Fire Alarm Systems',
            badge: 'COST-EFFECTIVE & ROBUST',
            desc: 'Designed specifically for Indian building power conditions, SMB offices, residential complexes, and educational institutions to reduce false alarms cost-effectively.'
          },
          {
            title: 'Addressable Fire Alarm Systems',
            badge: 'HIGH-PRECISION PINPOINT',
            desc: 'Pinpoint location identification of fire alarm signals for hospitals, industrial plants, high-rises, and complex commercial facilities.'
          }
        ],
        integrationNote: 'Certified Compliance: All systems adhere to highest Indian and international standards (NBC 2016), with site evaluation, custom engineering, and Building Management System (BMS) integration.',
        tagTitle: 'Standards & Compliance:',
        tags: [
          'National Building Code (NBC 2016)',
          'Addressable Pinpoint Location',
          'Automated Sprinkler Suppression',
          'BMS & Emergency Relay Linkage'
        ]
      },
      {
        name: 'Water Leakage System & Rodent Control',
        subtitle: 'Safeguarding Operational Integrity and Preventing Costly Disruptions',
        points: [
          'Leak Detection System Installation: Our sensor-based water leakage detection systems offer continuous monitoring of sensitive areas, such as server rooms, data centres, and utility spaces. This proactive approach prevents water damage that can disrupt operations, compromise data integrity, and lead to significant financial losses.',
          'Rodent Management for a Hygienic and Productive Workplace: As a company that specialises in managing pests in corporate settings specifically rodents control facilities; our services include setting up modern rodent nets and implementing efficient eradication plans to keep your environment clean and free of pests. It safeguards your brand image and promotes a conducive work environment while preventing severe damage to electrical wiring and fiber optic cables.'
        ],
        tagTitle: 'Infrastructure Protection:',
        tags: [
          'Continuous Water Leak Sensing Cables',
          'Server Room & Data Centre Monitoring',
          'Heavy-Duty Conduits & Rodent Netting',
          'Preventative Eradication Protocols'
        ]
      }
    ],
    benefitsTitle: 'What Sets Us Apart & Why Choose Us',
    benefits: [
      'Real, unmatched foresight: Thorough risk assessments to find specific answers for extinguishing fires, lessening water damage, and managing pests in a coordinated way.',
      'Continuous, proactive excellence: Client-centric approach with constant dedication to consistently exceeding safety expectations.',
      'Full compliance with statutory safety regulations, National Building Code (NBC), and local fire safety codes.',
      'Seamless integration with your building management systems (BMS) and central control panels.'
    ],
    ctaText: 'Schedule a Meeting'
  },
  {
    id: 'network_connectivity',
    title: 'Network & Connectivity Services',
    shortTitle: 'Network & Connectivity',
    icon: Server,
    image: '/images/headquarters.webp',
    headline: 'Smooth Network & Connectivity Services, Everywhere.',
    subHeadline: 'Expert wireless network planning and deployment for seamless, high-speed connectivity across your entire workspace.',
    introTitle: 'High-Velocity Connectivity, Seamlessly Delivered.',
    intro: "These days, if your internet's down, your business is down. It's not just about having a connection; it's about having a reliable one. Everything runs through it – your data, your tools, how you talk to customers. You need a network that lets you move around, handle a lot of traffic, and just works, all the time. No one wants to deal with constant outages. That's where we come in. We're really good at building networks. We set up everything right, making sure it's running smoothly. Frankly, it's about making sure your team can get stuff done and your clients are happy. Because at the end of the day, that's what matters, right?",
    closingBadge: 'ENTERPRISE IT & CONNECTIVITY',
    closingHeadline: 'Fast, Reliable, and Efficient. IT Solutions That Ensure Success.',
    closingCta: 'Get Started',
    coreOfferings: [
      {
        name: 'Core Network Services',
        subtitle: 'Strategic Network Planning, Expert Deployment & Optimised Configuration',
        points: [
          'Strategic Network Planning: We design robust IP addressing and wireless networks for seamless connectivity and scalability.',
          'Expert Deployment: Our certified engineers handle all aspects of implementation, ensuring minimal disruption.',
          'Optimised Configuration: Switches, patch panels, DVR integration, and access points are configured for peak performance and stable uptime.'
        ],
        subgroupTitle: 'Core Network Infrastructure:',
        subgroups: [
          {
            title: 'Switches & Patch Panels',
            desc: 'Layer 2/3 managed switches, patch panel termination, and structured rack wire dressing for peak throughput.'
          },
          {
            title: 'Wi-Fi & Wireless Access Points',
            desc: 'Seamless roaming high-speed Wi-Fi access points, subnet planning, and coverage across all office floors.'
          },
          {
            title: 'DVR & Wire Connections',
            desc: 'Clean structured cabling, patch cords, and reliable network connectivity for DVR, NVR, and workplace hardware.'
          }
        ],
        tagTitle: 'Network Standards:',
        tags: [
          'Enterprise Wi-Fi 6/6E Planning',
          'VLAN & QoS Segmentation',
          'Layer 2/3 Managed Switching',
          'Patch Panels & DVR Cabling'
        ]
      },
      {
        name: 'Communication & Connectivity',
        subtitle: 'VOIP, Wireless P2P Links, Advanced EPABX & Server Room Infrastructure',
        points: [
          'VOIP Implementation: Cost-effective voice solutions for enhanced communication.',
          'Reliable Point-to-Point Links: High-bandwidth wireless connections for remote locations.',
          'Advanced EPABX Systems: Streamlined call management and communication tools.',
          'Infrastructure Support: Server room design, rack wire dressing, and implementation for optimal performance.'
        ],
        tagTitle: 'Voice & Remote Connectivity:',
        tags: [
          'Cost-Effective VOIP Telephony',
          'High-Bandwidth Wireless P2P Bridges',
          'Advanced EPABX Call Management',
          'Server Room Rack Dressing & PDUs'
        ]
      }
    ],
    benefitsTitle: 'How Global Enterprises Help Businesses',
    benefits: [
      'Making things run faster: We build systems that work together seamlessly, boosting productivity without any frustrating delays.',
      'Cutting down on those communication costs: We implement cost-effective smartphone and internet solutions, optimising your budget.',
      'Clean & organized wire connections: We provide structured patch panel dressing and stable cabling to eliminate signal drops and clutter.',
      'Staying consistently connected: We develop reliable networks that minimise downtime and maintain uninterrupted online access.',
      'Tech that grows with your business: Our solutions are designed to scale, adapting to your evolving needs without holding you back.',
      'Focus on what you do best: Spend less time worrying about IT and more time dedicated to your core business goals.'
    ],
    ctaText: 'Schedule a Meeting'
  },
  {
    id: 'fitout_leasehold',
    title: 'Fit-out & Leasehold Improvement Services',
    shortTitle: 'Fit-out & Interiors',
    icon: Armchair,
    image: '/images/workspace.webp',
    headline: 'Building Offices That Inspire. Your Office, Our Expertise',
    subHeadline: 'Office Finishings, Fit-out & Leasehold Improvement Services',
    introTitle: 'Comprehensive Office Space Planning & Infrastructure Services',
    intro: "Ever walked into an office and just felt good? We believe your workspace should be a place where you and your team can grow, be productive, and actually enjoy being there. That's why we're here to take the stress out of creating the most positive office environment. We are your friendly office makeover team. We'll handle all the nitty-gritty details, so you can focus on what you do best – running your business.",
    closingBadge: 'OFFICE INTERIORS & LEASEHOLD FIT-OUT',
    closingHeadline: 'Maximise Productivity with Office Interior, Fit-Out, and Leasehold Services.',
    closingCta: 'Get Started',
    coreOfferings: [
      {
        name: 'Physical Space Solutions: Structural & Interior Finishing',
        subtitle: 'Designing Productive Physical Environments',
        points: [
          'Structural Modifications: Adding or removing walls and partitions to create new rooms, modify layouts, adapt ceilings, and optimize door/window placements.',
          'Interior Finishing: Installing new flooring (commercial carpet tiles, hardwood, vitrified tiles, vinyl), commercial painting, wallpapering, and acoustic ceiling tiles.'
        ],
        subgroupTitle: 'Architectural & Space Modifications:',
        subgroups: [
          {
            title: 'Partitions & Drywalls',
            desc: 'Demountable glass partitions, acoustic drywalls, and flexible layout restructuring.'
          },
          {
            title: 'Flooring & Ceilings',
            desc: 'Commercial carpet tiles, hardwood, vitrified tiles, acoustic baffles, and suspended ceilings.'
          },
          {
            title: 'Doors, Windows & Paint',
            desc: 'High-end commercial paint finishes, wallpapering, and optimized natural lighting.'
          }
        ],
        tagTitle: 'Interior Finishing Specs:',
        tags: [
          'Demountable Glass Partitions',
          'Carpet Tiles & Hardwood Flooring',
          'Acoustic Wall Panels & Ceilings',
          'Commercial Painting & Wallpapers'
        ]
      },
      {
        name: 'Electrical, Lighting & Plumbing (MEP Services)',
        subtitle: 'Infrastructure, Power & Sanitary Upgrades',
        points: [
          'Electrical and Lighting: Upgrading or installing new lighting fixtures, adding or modifying electrical outlets, raceways, wiring, and specialized electrical systems.',
          'Plumbing: Installing or modifying plumbing fixtures (cafeteria sinks, restrooms, toilets) and adding or relocating plumbing lines.'
        ],
        tagTitle: 'MEP & Utilities:',
        tags: [
          'Architectural LED Fixtures',
          'Power Raceways & Outlets',
          'Pantry & Cafeteria Plumbing',
          'Sanitary Restroom Fixtures'
        ]
      },
      {
        name: 'Furniture, Modular Workstations & IT Integration',
        subtitle: 'Ergonomic Workstations, IT Cabling & Certified Fire/Security',
        points: [
          'Furniture and Modular Workstations: Modular workstations (panels, partitions, work surfaces), ergonomic office chairs, desks, filing cabinets, bookcases, conference tables, and lounge furniture.',
          'Technology and Communication: Installing structured cabling for internet and phone systems, and setting up server rooms or data centers.',
          'Security and Safety: Installing integrated security access systems and certified fire suppression systems.'
        ],
        tagTitle: 'Workplace Amenities:',
        tags: [
          'Ergonomic Modular Workstations',
          'Executive Conference Tables',
          'Structured Voice & Data Cabling',
          'Integrated Security & Fire Suppression'
        ]
      }
    ],
    benefitsTitle: 'Global Enterprises Difference',
    benefits: [
      'Comprehensive Space Solutions: End-to-end design, architectural space planning, and turnkey project delivery.',
      'Expert, Efficient Execution: Minimizing workplace disruption with disciplined, on-time project management.',
      'Quality & Precision Focused: Commercial-grade materials, ergonomic craftsmanship, and certified safety standards.',
      'Collaborative Client Approach: Tailored layouts designed around your unique team workflow and culture.'
    ],
    ctaText: 'Schedule a Meeting'
  },
  {
    id: 'injection_moulding',
    title: 'Injection Moulding Solutions',
    shortTitle: 'Injection Moulding',
    icon: Boxes,
    image: '/images/injection_moulding.webp',
    headline: 'Injection Moulding Solutions',
    subHeadline: 'Precise Work for Professional Environments',
    introTitle: 'Experts who keep moulds running at their best',
    intro: "Whether you're a Fortune 500 company, a growing SMB, or a government facility, we understand the unique demands of professional environments. Our injection moulding expertise can help you meet compliance requirements, improve operational efficiency, and maintain the professional standards your organization requires.",
    closingBadge: 'PRECISION PLASTICS & MANUFACTURING',
    closingHeadline: "We're Nice to Work With. Manufacturing shouldn't be a headache. We're responsive, flexible, and genuinely care about your project's success.",
    closingCta: 'Get Started',
    coreOfferings: [
      {
        name: 'What We Can Do For You',
        subtitle: 'Job Work Services & Custom End-to-End Product Manufacturing',
        points: [
          "Running Your Moulds (Job Work Services): Whether it's a few parts or a huge production run, we'll take great care in using your existing moulds. We work with all sorts of plastics, keep a close eye on quality, and can even turn things around quickly if you're up against a deadline.",
          "Creating Custom Products From Scratch: We can help you tweak your design to make it perfect for manufacturing, build prototypes to see how it works, and design the ideal mould for exactly what you need. We'll also help you pick the right materials to balance how it performs and what it costs. Then, when you're ready to go big, we'll smoothly ramp up to full production."
        ],
        subgroupTitle: 'Manufacturing Capabilities:',
        subgroups: [
          {
            title: 'Existing Mould Job Work',
            desc: 'High-precision production runs using your existing tooling with rapid turnarounds.'
          },
          {
            title: 'Design & Prototyping',
            desc: 'Design optimization for manufacturing (DFM), rapid prototyping, and mould development.'
          },
          {
            title: 'Material Engineering',
            desc: 'Expert thermoplastic selection balancing structural performance, thermal resistance, and cost.'
          }
        ],
        tagTitle: 'Plastics & Tooling Technologies:',
        tags: [
          'Engineering Grade Thermoplastics',
          'Custom Tooling & Die Design',
          'Rapid Prototyping & DFM',
          'High-Volume Precision Runs'
        ]
      },
      {
        name: 'Who We Work With',
        subtitle: 'Tailored Production for Diverse Professional Environments',
        points: [
          'Large Corporations: Custom components engineered for enterprise operations and high-volume consistency.',
          'Small to Medium-sized Businesses (SMBs): Scalable, agile moulding solutions for growing companies and rapid market rollout.'
        ],
        tagTitle: 'Client Sectors:',
        tags: [
          'Fortune 500 Enterprises',
          'Growing SMB Innovators',
          'Commercial OEM Components',
          'High-Volume Batch Production'
        ]
      }
    ],
    benefitsTitle: 'Why People Choose Us',
    benefits: [
      "Quality: We're serious about quality – that's why we're registered and certified. Every step from raw material to finished product gets our full attention.",
      'Smart Solutions: Our team knows plastics inside and out. We love solving tricky problems and finding better ways to make your parts.',
      'Modern Equipment: We are constantly upgrading our machines and technology. Better equipment means better parts for you.',
      "We're Nice to Work With: Manufacturing shouldn't be a headache. We're responsive, flexible, and genuinely care about your project's success."
    ],
    ctaText: 'Schedule a Meeting'
  }
];
