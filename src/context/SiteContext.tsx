import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FileCheck, Users, Calendar, Globe2, Building2, Shield, Award, Clock } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  details?: string[];
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  comment: string;
  rating: number;
}

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface AboutPage {
  stats: Array<{
    icon: keyof typeof icons;
    value: string;
    label: string;
  }>;
  ceo: {
    name: string;
    title: string;
    image: string;
    bio: string;
    email: string;
    linkedin: string;
  };
  education: Array<{
    year: string;
    degree: string;
    institution: string;
    location: string;
  }>;
  experience: Array<{
    year: string;
    role: string;
    company: string;
    description: string;
  }>;
  achievements: string[];
  mission: string;
  vision: string;
}

interface SiteSettings {
  general: {
    title: string;
    metaDescription: string;
    favicon: string;
  };
  contact: {
    phones: string[];
    emails: string[];
    address: string;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  services: Service[];
  testimonials: Testimonial[];
  heroSlides: HeroSlide[];
  about: AboutPage;
}

const icons = {
  FileCheck,
  Users,
  Calendar,
  Globe2,
  Building2,
  Shield,
  Award,
  Clock
};

interface SiteContextType {
  settings: SiteSettings;
  updateGeneralSettings: (settings: Partial<SiteSettings['general']>) => void;
  updateContactInfo: (contact: Partial<SiteSettings['contact']>) => void;
  updateTheme: (theme: Partial<SiteSettings['theme']>) => void;
  updateServices: (services: Service[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateHeroSlides: (slides: HeroSlide[]) => void;
  updateAbout: (about: Partial<AboutPage>) => void;
  icons: typeof icons;
}

const defaultSettings: SiteSettings = {
  general: {
    title: 'NRI Services',
    metaDescription: 'Comprehensive NRI services for all your needs',
    favicon: '/favicon.ico',
  },
  contact: {
    phones: ['+1 (555) 123-4567', '+91 98765-43210'],
    emails: ['contact@nriservices.com', 'support@nriservices.com'],
    address: '123 Business Hub,\nSector 17-C,\nChandigarh, Punjab 160017\nIndia',
  },
  theme: {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff',
  },
  about: {
    stats: [
      { icon: 'Users', value: '5000+', label: 'Happy Clients' },
      { icon: 'Clock', value: '15+', label: 'Years Experience' },
      { icon: 'Award', value: '50+', label: 'Awards Won' },
      { icon: 'Shield', value: '100%', label: 'Success Rate' },
    ],
    ceo: {
      name: 'Rajesh Kumar',
      title: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      bio: 'With over 15 years of experience in international business and technology, Rajesh Kumar has revolutionized the way NRI services are delivered.',
      email: 'rajesh@nriservices.com',
      linkedin: 'linkedin.com/in/rajesh-kumar'
    },
    education: [
      {
        year: '2005',
        degree: 'Master of Business Administration (MBA)',
        institution: 'Harvard Business School',
        location: 'Cambridge, USA'
      },
      {
        year: '2003',
        degree: 'Bachelor of Technology in Computer Science',
        institution: 'Indian Institute of Technology (IIT) Delhi',
        location: 'New Delhi, India'
      }
    ],
    experience: [
      {
        year: '2015 - Present',
        role: 'CEO & Founder',
        company: 'NRI Services',
        description: 'Founded and scaled NRI Services to become a leading provider of comprehensive services for Non-Resident Indians.'
      },
      {
        year: '2010 - 2015',
        role: 'Director of Operations',
        company: 'Global Indian Solutions',
        description: 'Led a team of 200+ professionals, managing international client relationships and service delivery.'
      }
    ],
    achievements: [
      'Forbes 30 Under 30 - Asia (2012)',
      'Excellence in Business Leadership Award (2018)',
      'Digital Innovation in Services Award (2020)',
      'Featured in Economic Times "40 Under 40" (2021)'
    ],
    mission: 'To provide exceptional services to NRIs, ensuring their peace of mind while managing their affairs in India.',
    vision: 'To become the most trusted and comprehensive service provider for NRIs worldwide.'
  },
  heroSlides: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      title: 'Document Services',
      description: 'Professional assistance with all your documentation needs'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      title: 'Family Care',
      description: 'Taking care of your loved ones back home'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      title: 'Event Management',
      description: 'Making your special occasions memorable'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      title: 'Property Management',
      description: 'Secure and efficient property management services'
    }
  ],
  services: [
    {
      id: 1,
      title: 'Document Services',
      description: 'Assistance with Punjab government documentation, Apostille services, and legal paperwork processing.',
      icon: 'FileCheck',
      details: ['Passport Services', 'Visa Assistance', 'Document Authentication', 'Power of Attorney']
    },
    {
      id: 2,
      title: 'Family Care',
      description: 'Comprehensive family support services for your loved ones in India.',
      icon: 'Users',
      details: ['Elder Care', 'Medical Assistance', 'Education Support', 'Emergency Services']
    },
    {
      id: 3,
      title: 'Event Organization',
      description: 'Professional event planning and execution services for all occasions.',
      icon: 'Calendar',
      details: ['Wedding Planning', 'Religious Ceremonies', 'Corporate Events', 'Family Functions']
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'Rajesh Patel',
      location: 'San Francisco, USA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      comment: 'NRI Services made managing my property in India completely hassle-free. Their professional approach and regular updates gave me peace of mind.',
      rating: 5
    },
    {
      id: 2,
      name: 'Priya Singh',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      comment: 'Excellent service! They helped me with all my documentation needs and their team was always responsive and helpful.',
      rating: 5
    }
  ]
};

const SiteContext = createContext<SiteContextType | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  const updateGeneralSettings = (newSettings: Partial<SiteSettings['general']>) => {
    setSettings(prev => ({
      ...prev,
      general: { ...prev.general, ...newSettings },
    }));
  };

  const updateContactInfo = (newContact: Partial<SiteSettings['contact']>) => {
    setSettings(prev => ({
      ...prev,
      contact: { ...prev.contact, ...newContact },
    }));
  };

  const updateTheme = (newTheme: Partial<SiteSettings['theme']>) => {
    setSettings(prev => ({
      ...prev,
      theme: { ...prev.theme, ...newTheme },
    }));
  };

  const updateServices = (newServices: Service[]) => {
    setSettings(prev => ({
      ...prev,
      services: newServices,
    }));
  };

  const updateTestimonials = (newTestimonials: Testimonial[]) => {
    setSettings(prev => ({
      ...prev,
      testimonials: newTestimonials,
    }));
  };

  const updateHeroSlides = (newSlides: HeroSlide[]) => {
    setSettings(prev => ({
      ...prev,
      heroSlides: newSlides,
    }));
  };

  const updateAbout = (newAbout: Partial<AboutPage>) => {
    setSettings(prev => ({
      ...prev,
      about: { ...prev.about, ...newAbout },
    }));
  };

  return (
    <SiteContext.Provider
      value={{
        settings,
        updateGeneralSettings,
        updateContactInfo,
        updateTheme,
        updateServices,
        updateTestimonials,
        updateHeroSlides,
        updateAbout,
        icons
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}