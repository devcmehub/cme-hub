'use client';

// src/components/ProductOfferings.tsx
import React, { useEffect } from 'react';
import styles from './ProductOfferings.module.scss';

// Import the content JSON
import content from '../../utils/all_content.json';

// Import the useLanguage hook
import { useLanguage } from '../../context/LanguageContext'; // Adjust path as needed

interface OfferingProps {
  title: string;
  description: string;
  imageUrl?: string;
}

interface SectionProps {
  id: string;
  title: string;
  offerings: OfferingProps[];
}

const ProductOfferings: React.FC = () => {
  // Use the useLanguage hook to get the current language
  const { currentLanguage } = useLanguage();

  // Access the content for the current language
  // Ensure the content.json structure matches this access
  const languageContent = (content as any)[currentLanguage];

  const section = languageContent.sections.find(
    (sec: SectionProps) => sec.id === 'product-offerings'
  ) as SectionProps | undefined;

  if (!section || !section.offerings) return null;

  // Function to create markup for dangerouslySetInnerHTML
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  useEffect(() => {
    const handleContactLinkClick = (e: Event) => {
      // Ensure the link is within the current component's context if necessary
      if ((e.target as HTMLElement).classList.contains('contact-us')) {
        e.preventDefault();

        // Find the contact section by ID
        const contactSection = document.getElementById('contact-us');

        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    const contactLinks = document.querySelectorAll('.contact-us');
    contactLinks.forEach((link) => {
      link.addEventListener('click', handleContactLinkClick);
    });

    return () => {
      contactLinks.forEach((link) => {
        link.removeEventListener('click', handleContactLinkClick);
      });
    };
  }, [currentLanguage]); // Re-run effect if language changes, though for event listeners, it might not be strictly necessary if links stay consistent. Including it for robustness.

  return (
    <section className={`${styles.productOfferings} container-fluid`}>
      <div className="container">
        <h2 className={styles.section_title}>{section.title}</h2>
        <div className={styles.offeringsGrid}>
          {section.offerings.map((offering, index) => (
            <div key={index} className={styles.offeringCard}>
              {offering.imageUrl && (
                <img src={offering.imageUrl} alt={offering.title} />
              )}
              <h3 className={styles.offeringTitle}>{offering.title}</h3>
              <div className={styles.offeringDescription}>
                <div
                  dangerouslySetInnerHTML={createMarkup(offering.description)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductOfferings;
