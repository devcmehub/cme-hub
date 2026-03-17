'use client';

import React, { useEffect, useState } from 'react';
import styles from './BackToTop.module.scss';
import Image from 'next/image';

const ToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibilityChange = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleVisibilityChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleVisibilityChange);
    };
  }, []);

  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`${styles.toTop} ${visible ? styles.visible : styles.hidden}`}
      onClick={clickHandler}
    >
      <svg
        className={styles.goToTopIcon}
        width="50"
        height="30"
        viewBox="0 0 60 49.231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="clip419_3465">
            <rect
              id="arrow-right-02-round"
              rx="0.000000"
              width="34.923077"
              height="34.923077"
              transform="translate(13.308105 7.153809)"
              fill="white"
              fillOpacity="0"
            />
          </clipPath>
        </defs>
        <rect
          id="Rectangle 17856"
          x="1.000000"
          y="1.000000"
          rx="10.000000"
          width="58.000000"
          height="47.230770"
          stroke="#fff"
          strokeOpacity="1.000000"
          strokeWidth="3.000000"
        />
        <g clipPath="url(#clip419_3465)">
          <path
            id="Vector"
            d="M43.07 24.61L18.46 24.61"
            stroke="#fff"
            strokeOpacity="1.000000"
            strokeWidth="3.000000"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            id="Vector"
            d="M35.38 16.92C35.38 16.92 43.07 22.58 43.07 24.61C43.07 26.64 35.38 32.3 35.38 32.3"
            stroke="#fff"
            strokeOpacity="1.000000"
            strokeWidth="3.000000"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </button>
  );
};

export default ToTopButton;
