'use client';

// src/components/PlatformCapabilities.tsx
import React, { useState, useEffect } from 'react';
import styles from './PlatformCapabilities.module.scss';
import content from '../../utils/all_content.json';
import { useLanguage } from '../../context/LanguageContext';

const PlatformCapabilities: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [hasMounted, setHasMounted] = useState(false); // New state for hydration

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Return a loading state or null to match SSR output
    return (
      <section className={`${styles.platformCapabilities} container-fluid`}>
        <div className="container">
          <h2 className={styles.section_title}>Loading Capabilities...</h2>
          <p className={styles.platformCapabilitiesDescription}></p>
          <div className="grid-auto-fill">
            {/* You could add skeleton loaders for cards here if desired */}
          </div>
        </div>
      </section>
    );
  }
  const languageContent = (content as any)[currentLanguage];
  const section = languageContent?.sections?.find(
    (sec: any) => sec.id === 'platform-capabilities'
  );
  if (!section || !section.capabilities) {
    console.error(
      `Error: 'platform-capabilities' section or its capabilities are missing for language: ${currentLanguage}`
    );
    return null; // Render nothing or a fallback error message if content is not found
  }

  return (
    <section className={`${styles.platformCapabilities}  container-fluid`}>
      <div className="container">
        <h2 className={styles.section_title}>{section.title}</h2>
        <p className={styles.platformCapabilitiesDescription}>
          {section.description}
        </p>
        <div className="grid-auto-fill">
          {section.capabilities.map((capability: any, index: number) => (
            <div key={index} className={styles.capabilityCard}>
              <div
                className={`d-flex justify-content-between align-items-center flex-row-reverse ${styles.flexRowReverse}`}
              >
                {capability.imageUrl && (
                  <img
                    src={capability.imageUrl}
                    alt={capability.title}
                    className={styles.capabilityIcon}
                  />
                )}
                <h3 className={styles.capabilityTitle}>{capability.title}</h3>
              </div>
              <p className={styles.capabilityDescription}>
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformCapabilities;
