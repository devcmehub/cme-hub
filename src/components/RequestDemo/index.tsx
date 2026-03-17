'use client';

import React, { useState, useEffect } from 'react';
import styles from './RequestDemo.module.scss';
import allContent from '../../utils/all_content.json';
import { useLanguage } from '../../context/LanguageContext';
import DemoFormModal from '../../components/DemoFormModal';

const RequestDemo: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div>Loading page...</div>;
  }

  const languageContent = (allContent as any)[currentLanguage];
  const requestDemoSection = languageContent?.sections?.find(
    (sec: any) => sec.id === 'request-demo'
  );

  if (!requestDemoSection) {
    return <div>Request Demo section not found for current language.</div>;
  }

  return (
    <section className={`${styles.requestDemo} container-fluid`}>
      <div className={styles.triggerSection}>
        <div className="container d-flex justify-content-center flex-column align-items-center">
          <h2 className={styles.section_title}>{requestDemoSection.title}</h2>
          <button
            className={styles.outlinedButton}
            onClick={() => setIsFormOpen(true)}
          >
            {requestDemoSection?.buttonText || 'Request Demo'}
          </button>
        </div>

        <DemoFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          section={requestDemoSection}
        />
      </div>
    </section>
  );
};

export default RequestDemo;
