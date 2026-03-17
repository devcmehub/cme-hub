'use client';

import { useState } from 'react';
import styles from './Hero.module.scss';
import allContent from '../../utils/all_content.json'; // Changed to all_content.json

import Navbar from '../Navbar'; // Navbar is already a client component and consumes context
import Image from 'next/image';
import GraphBadge from '../GraphBadge';
import Link from 'next/link';
import Modal from '../Modal';
import RequestDemo from '../../components/RequestDemo'; // Unused in this snippet but kept for context
import DemoFormModal from '../DemoFormModal'; // This component will also need to be language-aware

// Import the useLanguage hook
import { useLanguage } from '../../context/LanguageContext'; // Adjust path as needed

const Hero: React.FC = () => {
  // Get the current language from the context
  const { currentLanguage } = useLanguage();

  // Access the language-specific content
  const content = (allContent as any)[currentLanguage];

  // Destructure content from the localized hero section
  const {
    title,
    description,
    buttonText1,
    buttonText2,
    videoButtonText, // New
    badge1Title, // New
    badge1Subtitle, // New
    badge2Title, // New
    badge2Subtitle, // New
  } = content.hero;

  const [isFormOpen, setIsFormOpen] = useState(false);
  // Get the section for the request demo from the localized content
  const section = content.sections.find(
    (sec: any) => sec.id === 'request-demo'
  );

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className={styles.hero}>
      {/* Navbar already consumes language context, so no prop needed here */}
      <Navbar />
      <div className={styles.heroContent}>
        {/* Text Section */}
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroDescription}>{description}</p>
          <div className={`d-flex ${styles.heroButtons}`}>
            <Link
              href={'#value-proposition'}
              className="button_primary margin-right-lg"
            >
              {buttonText1}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8891 4.1506L10.8891 4.15059C10.7292 4.00142 10.7292 3.77489 10.8891 3.62572C11.0688 3.45809 11.3736 3.45809 11.5532 3.62573L16.6301 8.36251C16.79 8.51174 16.79 8.73826 16.6301 8.8875L11.5532 13.6242L11.5532 13.6243C11.3735 13.7919 11.0688 13.7919 10.8891 13.6243L10.8891 13.6242C10.7293 13.4751 10.7292 13.2486 10.8891 13.0994L14.341 9.87872L15.2688 9.01314L13.9999 9.01314L1.70193 9.01314C1.41911 9.01314 1.25 8.80726 1.25 8.625C1.25 8.44274 1.41911 8.23686 1.70193 8.23686L13.9999 8.23686L15.2688 8.23687L14.341 7.37128L10.8891 4.1506Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </Link>
            <button
              onClick={() => setIsFormOpen(true)}
              className="button_outlined"
            >
              {buttonText2}
            </button>
            {section && (
              <DemoFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                section={section}
                // No need to pass currentLanguage if DemoFormModal also consumes the context
                // If it doesn't, you would pass it: currentLanguage={currentLanguage}
              />
            )}
          </div>
        </div>

        {/* Image Section with Cards */}
        <div className={styles.heroImages}>
          <div className={styles.heroImageContainer + ' ' + styles.user1}>
            <Image
              src="/assets/images/hero-img-1.webp"
              alt="User 1"
              width={318}
              height={420}
              className={styles.hero_img_1}
            />
            <div className={styles.badgeWrapper}>
              <GraphBadge
                title={badge1Title}
                percentage="70%"
                subtitle={badge1Subtitle}
              />
            </div>
            <button
              className={styles.playButton}
              onClick={() => setIsVideoOpen(true)}
            >
              <Image
                src="/assets/images/icons/play-icon.svg"
                alt="Play"
                width={40}
                height={40}
                className={styles.playIcon}
              />
              <span>{videoButtonText}</span>
            </button>
          </div>

          <div className={`${styles.heroImageContainer} ${styles.user2}`}>
            <Image
              src="/assets/images/hero-img-2.webp"
              alt="User 2"
              width={294}
              height={388}
              className={styles.hero_img_2}
            />
            <div className={styles.badgeWrapper}>
              <GraphBadge
                title={badge2Title}
                percentage="85%"
                subtitle={badge2Subtitle}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)}>
        <iframe
          className={styles.videoWrapper}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/0vhJ7MLiHYs?si=otCjMBGsTtfR1fBy"
          title="How it works video" // Consider localizing this title too if needed
          frameBorder="0"
          allowFullScreen
        />
        <div className={styles.iframeContainer}></div>
      </Modal>
    </section>
  );
};

export default Hero;
