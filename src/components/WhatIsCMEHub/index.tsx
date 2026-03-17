// src/components/WhatIsCMEHub.tsx
'use client';

import React, { useState, useEffect } from 'react';
import styles from './WhatIsCMEHub.module.scss';
import allContent from '../../utils/all_content.json';
import { useLanguage } from '../../context/LanguageContext';

const WhatIsCMEHub: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [hasMounted, setHasMounted] = useState(false); // New state for hydration

  useEffect(() => {
    // This effect runs only after the component has mounted on the client-side
    setHasMounted(true);
  }, []);

  // During server-side rendering or initial client render before hydration,
  // we return a placeholder to prevent hydration mismatches.
  if (!hasMounted) {
    return (
      <section className={styles.whatIsCMEHub}>
        <h2 className={styles.whatIsCMEHubTitle}>Loading...</h2>{' '}
        {/* Or a more complex skeleton loader */}
        <p className={styles.whatIsCMEHubDescription}></p>
      </section>
    );
  }

  // Now that we are sure we are on the client and hydrated, safely access localized content
  const languageContent = (allContent as any)[currentLanguage];

  // Add a safety check for missing content, although it should be present if JSON is valid
  if (!languageContent || !languageContent.about) {
    console.error(`'about' section not found for language: ${currentLanguage}`);
    return null; // Or a fallback UI
  }

  const { title, description } = languageContent.about;

  return (
    <section className={styles.whatIsCMEHub}>
      <h2 className={styles.whatIsCMEHubTitle}>{title}</h2>
      <p className={styles.whatIsCMEHubDescription}>{description}</p>
    </section>
  );
};

export default WhatIsCMEHub;
