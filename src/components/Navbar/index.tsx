'use client';

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import content from '../../utils/all_content.json';
import Image from 'next/image';
import Link from 'next/link';

// Import the useLanguage hook
import { useLanguage } from '../../context/LanguageContext'; // Adjust path as needed

const Navbar: React.FC = () => {
  // Use the useLanguage hook to get the current language and the setter
  const { currentLanguage, setLanguage } = useLanguage();

  // Access the content for the current language
  // Ensure the content.json structure matches this access
  const languageContent = (content as any)[currentLanguage];

  // Get links from the language-specific content
  const links = languageContent.navbar.links;
  const imageUrl = languageContent.navbar.imageUrl; // Also get image URL for current language if it changes per lang

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSelectLanguage = (langCode: 'en' | 'fr') => {
    setLanguage(langCode); // Use the setLanguage from context
    setDropdownOpen(false);
  };

  // The handleLanguageChange for select element is likely not needed
  // if you're using buttons for EN/FR selection. I'll remove it.

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // close menu after click
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image
          src={imageUrl} // Use the localized image URL
          alt="CME Hub Logo"
          width={190}
          height={50}
          className={styles.logo}
        />
      </Link>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg width="30" height="30" fill="white" viewBox="0 0 100 80">
          <rect width="100" height="10" />
          <rect y="30" width="100" height="10" />
          <rect y="60" width="100" height="10" />
        </svg>
      </button>

      <div className={`${styles.menuWrapper} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.navList} role="list">
          {links.map((link: { text: string; url: string }, index: number) => (
            <li key={index} className={styles.navItem}>
              <a
                href={link.url}
                onClick={(event) => scrollToSection(event, link.url.slice(1))}
                className={styles.navLink}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.languageSelector}>
          <button className={styles.languageButton} onClick={toggleDropdown}>
            <Image
              src="/assets/images/icons/language-circle.svg" // Assuming this icon is language-agnostic
              alt="Language Icon"
              width={24}
              height={24}
              className={styles.languageIcon}
            />
            {/* Display the current language, e.g., 'EN' or 'FR' */}
            <span className={styles.languageText}>
              {currentLanguage.toUpperCase()}
            </span>
          </button>
          {dropdownOpen && (
            <ul className={styles.dropdown}>
              <li onClick={() => handleSelectLanguage('en')}>EN</li>
              <li onClick={() => handleSelectLanguage('fr')}>FR</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
