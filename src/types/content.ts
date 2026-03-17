// src/types/content.ts

// Navigation types
export interface NavLink {
  text: string;
  url: string;
}

export interface Navbar {
  links: NavLink[];
}

// Hero section types
export interface Hero {
  title: string;
  description: string;
  buttonText1: string;
  buttonText2: string;
}

// Generic section interface
export interface Section {
  id: string;
  title?: string;
  description?: string;
  content?: string;
  buttonText?: string;
  items?: any[];
  fields?: FormField[];
  [key: string]: any; // Allow additional properties
}

// Form field types (for demo forms, contact forms, etc.)
export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

// What is CME Hub section
export interface WhatIsCMEHub {
  title: string;
  description: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  buttonText?: string;
}

// Value proposition section
export interface ValueProposition {
  title: string;
  description: string;
  benefits?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

// Testimonials section
export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface Testimonials {
  title: string;
  description?: string;
  items: Testimonial[];
}
export interface About {
  id: string;
  title: string;
  description: string;
}

// FAQ section
export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  description?: string;
  items: FAQ[];
}

// Pricing section
export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export interface Pricing {
  title: string;
  description?: string;
  plans: PricingPlan[];
}

// Contact section
export interface Contact {
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
}

// Footer section
export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface Footer {
  logo?: string;
  description?: string;
  sections: FooterSection[];
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
  copyright: string;
}

// Main content structure
export interface ContentStructure {
  // Main sections
  navbar: {
    imageUrl: string;
    links: Array<{ text: string; url: string }>;
  };
  hero: {
    title: string;
    description: string;
    buttonText1: string;
    buttonText2: string;
  };
  about: About; // Make this required, not optional
  sections: Array<{
    id: string;
    title: string;
    subDescription?: string | string[];
    imageUrl?: string;
    // other properties
  }>;

  // Specific sections (optional - may be in sections array or separate)
  whatIsCMEHub?: WhatIsCMEHub;
  valueProposition?: ValueProposition;
  testimonials?: Testimonials;

  faq?: FAQSection;
  pricing?: Pricing;
  contact?: Contact;
  footer?: Footer;

  // Allow additional sections
  [key: string]: any;
}

// Language type
export type Language = 'EN' | 'FR';

// Props interfaces for components
export interface NavbarProps {
  onLanguageChange: (lang: Language) => void;
  currentLanguage?: Language;
}

export interface HeroProps {
  content: ContentStructure;
  // onLanguageChange: (lang: Language) => void;
  // currentLanguage: Language;
  hero: {
    title: string;
    description: string;
    buttonText1: string;
    buttonText2: string;
  };
  onLanguageChange: (lang: 'EN' | 'FR') => void;
  currentLanguage: 'EN' | 'FR';
}

export interface SectionProps {
  content: ContentStructure;
}

// Modal props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface DemoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: Section;
}

// Graph badge props (for hero section)
export interface GraphBadgeProps {
  title: string;
  percentage: string;
  subtitle: string;
}
