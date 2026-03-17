'use client';
import React, { useState, useEffect } from 'react';
import styles from './ValueProposition.module.scss';
import allContent from '../../utils/all_content.json';
import { useLanguage } from '../../context/LanguageContext';
import Image from 'next/image';

const ValueProposition: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [hasMounted, setHasMounted] = useState(false); // New state for hydration

  useEffect(() => {
    // This effect runs only after the component has mounted on the client-side
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <section className={`${styles.valueProposition} container-fluid`}>
        <div className="container">
          <h2 className={styles.section_title}>Loading valueProposition...</h2>
          <p className={styles.valuePropositionSubDescription}></p>
        </div>
      </section>
    );
  }

  const languageContent = (allContent as any)[currentLanguage];
  const section = languageContent?.sections?.find(
    (sec: any) => sec.id === 'value-proposition'
  );
  // Updated check: Ensure 'section' and 'keyBenefits' exist
  if (!section || !section.keyBenefits || !Array.isArray(section.keyBenefits)) {
    console.error(
      `Error: 'value-proposition' section or its 'keyBenefits' are missing or invalid for language: ${currentLanguage}`
    );
    return null;
  }
  // Directly access the benefit blocks by index
  const authorityBlock = section.keyBenefits[0];
  const licenseesBlock = section.keyBenefits[1];
  const cpdProvidersBlock = section.keyBenefits[2];
  return (
    <>
      <section className={`${styles.valueProposition} container-fluid`}>
        <div className="container">
          <h2 className={styles.section_title}>{section.title}</h2>

          <p className={styles.valuePropositionSubDescription}>
            {section.subDescription}
          </p>
          {/* Desktop Version */}
          <div className="container">
            <div
              className={`${styles.valuePropositionGraph} ${styles.hideOnMobile}`}
            >
              <div className={styles.pointers}>
                <div className={styles.pointerAuthority}>
                  <div className={styles.pointerAuthorityLink}>
                    <div className={styles.svgLinkContainer}>
                      <svg
                        width="279"
                        height="151"
                        viewBox="0 0 279 151"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          id="Ellipse 78-fill"
                          cx="262.5"
                          cy="16.5"
                          r="14"
                          fill="#FFFFFF"
                          fillOpacity="1.000000"
                          className={styles.hideOnMobile}
                        />
                        <circle
                          id="Ellipse 78-stroke"
                          cx="262.5"
                          cy="16.5"
                          r="14"
                          stroke="currentColor"
                          strokeOpacity="1.000000"
                          strokeWidth="5.000000"
                          className={`${styles.changeStrokeOnHover} `}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M134.736 53.08L137.657 52.2023C123.942 25.0056 92.2978 10.7288 62.1151 19.8001C28.2647 29.9737 9.07082 65.6622 19.2444 99.5127C25.5132 120.371 41.4695 135.664 60.7141 141.951L59.6494 138.408C42.2039 132.036 27.8746 117.805 22.1175 98.6492C12.4208 66.3855 30.7149 32.3698 62.9786 22.6731C91.5697 14.0802 121.537 27.4683 134.736 53.08Z"
                          fill="#283540"
                          className={`${styles.changeOnHover} `}
                        />
                        <path
                          d="M134.687 52.8088L246.878 19.5993"
                          stroke="currentColor"
                          strokeWidth="3"
                          className={`${styles.changeOnHover} `}
                        />
                        <circle
                          cx="80.5356"
                          cy="81.0917"
                          r="56"
                          transform="rotate(163.272 80.5356 81.0917)"
                          fill="#283540"
                          className={`${styles.changeOnHover} `}
                        />
                        <circle
                          cx="80.2008"
                          cy="81.7144"
                          r="44.5"
                          transform="rotate(163.272 80.2008 81.7144)"
                          fill="white"
                        />
                        <path
                          d="M66.0237 70.3337V68.8337H64.8353L64.5635 69.9907L66.0237 70.3337ZM81.0002 98.6673L80.6855 100.134L81.0002 100.201L81.315 100.134L81.0002 98.6673ZM95.9769 70.3337L97.4372 69.9907L97.1654 68.8337H95.9769V70.3337ZM81.0003 63.8337C77.6495 63.8337 75.0386 65.2874 72.7867 66.5173C70.4596 67.7883 68.4938 68.8337 66.0237 68.8337V71.8337C69.3668 71.8337 71.9743 70.3792 74.2247 69.1502C76.5503 67.88 78.5211 66.8337 81.0003 66.8337V63.8337ZM81.315 97.2007C70.6711 94.9166 64.3019 84.223 67.484 70.6768L64.5635 69.9907C61.0899 84.7779 68.0295 97.418 80.6855 100.134L81.315 97.2007ZM81.0003 66.8337C83.4916 66.8337 85.4649 67.8808 87.7866 69.1499C90.034 70.3785 92.6364 71.8337 95.9769 71.8337V68.8337C93.5107 68.8337 91.5515 67.789 89.2256 66.5176C86.974 65.2867 84.3624 63.8337 81.0003 63.8337V66.8337ZM81.315 100.134C93.971 97.418 100.911 84.7779 97.4372 69.9907L94.5167 70.6768C97.6988 84.2229 91.3294 94.9166 80.6855 97.2007L81.315 100.134Z"
                          fill="#283540"
                        />
                        <path
                          d="M72.8037 84.9172C72.8037 84.9172 74.5537 84.9172 76.887 89.0006C76.887 89.0006 83.3723 78.3061 89.137 76.1672"
                          stroke="#283540"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div className={styles.ValueGraphicText}>
                        <h4>{authorityBlock.title}</h4>
                        <ul>
                          {authorityBlock.items.map(
                            (item: string, itemIndex: number) => (
                              <li key={`auth-${itemIndex}`}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.pointerLciensees}>
                  <div className={styles.pointerLcienseesLink}>
                    <div className={styles.svgLinkContainer}>
                      <svg
                        width="120.000000"
                        height="215.984863"
                        viewBox="0 0 120 215.985"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <defs>
                          <clipPath id="clip483_2616">
                            <rect
                              id="validation-approval"
                              rx="0.000000"
                              width="40.793579"
                              height="40.793579"
                              transform="translate(44.332031 131.500244)"
                              fill="white"
                              fillOpacity="0"
                            />
                          </clipPath>
                        </defs>
                        <circle
                          id="Ellipse 78-fill"
                          cx="53.332031"
                          cy="16.500000"
                          r="16.500000"
                          fill="#FFFFFF"
                          fillOpacity="1.000000"
                          className={``}
                        />
                        <circle
                          id="Ellipse 78-stroke"
                          cx="53.332031"
                          cy="16.500000"
                          r="14.000000"
                          stroke="currentColor"
                          strokeOpacity="1.000000"
                          strokeWidth="5.000000"
                          className={`${styles.changeStrokeOnHover} `}
                        />
                        <path
                          id="Subtract"
                          d="M52.7744 92.0156L52.7744 88.9661C22.7803 94.2727 0 120.469 0 151.985C0 187.331 28.6533 215.985 64 215.985C85.7793 215.985 105.019 205.105 116.578 188.485L112.879 188.485C101.755 203.358 84.002 212.985 64 212.985C30.3105 212.985 3 185.674 3 151.985C3 122.13 24.4463 97.2852 52.7744 92.0156Z"
                          clipRule="evenodd"
                          fill="#283540"
                          fillOpacity="1.000000"
                          fillRule="evenodd"
                          className={`${styles.changeOnHover} `}
                        />
                        <path
                          id="Line 9"
                          d="M52.5 91.98L52.83 33"
                          stroke="currentColor"
                          strokeOpacity="1.000000"
                          strokeWidth="3.000000"
                          className={`${styles.changeOnHover} `}
                        />
                        <circle
                          id="Ellipse 83"
                          r="56.000000"
                          transform="matrix(0 1 -1 0 64 151.985)"
                          fill="#283540"
                          fillOpacity="1.000000"
                          className={`${styles.changeOnHover} `}
                        />
                        <circle
                          id="Ellipse 84"
                          r="44.500000"
                          transform="matrix(0 1 -1 0 64.5 152.485)"
                          fill="#FFFFFF"
                          fillOpacity="1.000000"
                        />

                        <g clipPath="url(#clip483_2616)">
                          <path
                            id="Vector 6891"
                            d="M77.32 145.13C77.32 140.21 77.32 137.74 75.79 136.21C74.26 134.68 71.8 134.68 66.87 134.68L61.65 134.68C56.73 134.68 54.26 134.68 52.73 136.21C51.2 137.74 51.2 140.21 51.2 145.13L51.2 159.06C51.2 163.99 51.2 166.45 52.73 167.98C54.26 169.51 72.4 168.64 77.32 168.64C77.32 160.14 77.32 145.13 77.32 145.13Z"
                            stroke="#283540"
                            strokeOpacity="1.000000"
                            strokeWidth="3.000000"
                          />
                          <path
                            id="Vector 6663"
                            d="M59.91 146.29C59.91 146.29 61 146.29 62.09 148.61C62.09 148.61 65.54 142.81 68.62 141.65"
                            stroke="#283540"
                            strokeOpacity="1.000000"
                            strokeWidth="2.000000"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                          <path
                            id="Vector 6892"
                            d="M58.17 155.58L65.13 155.58"
                            stroke="#283540"
                            strokeOpacity="1.000000"
                            strokeWidth="2.000000"
                            strokeLinecap="round"
                          />
                          <path
                            id="Vector 6893"
                            d="M58.17 160.8L65.13 160.8"
                            stroke="#283540"
                            strokeOpacity="1.000000"
                            strokeWidth="2.000000"
                            strokeLinecap="round"
                          />
                        </g>
                      </svg>

                      <div className={styles.ValueGraphicText}>
                        <h4>{licenseesBlock.title}</h4>
                        <ul>
                          {licenseesBlock.items.map(
                            (item: string, itemIndex: number) => (
                              <li key={`lic-${itemIndex}`}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.pointerCe}>
                  <div className={styles.pointerCeLink}>
                    <div className={styles.svgLinkContainer}>
                      <svg
                        width="296"
                        height="120"
                        viewBox="0 0 296 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          id="Ellipse 78-fill"
                          cx="16.4951"
                          cy="68.5"
                          r="14"
                          fill="#FFFFFF"
                          fillOpacity="1.000000"
                          className={``}
                        />
                        <circle
                          id="Ellipse 78-stroke"
                          cx="16.4951"
                          cy="68.5"
                          r="14"
                          stroke="#283540"
                          strokeOpacity="1.000000"
                          strokeWidth="5.000000"
                          className={`${styles.changeStrokeOnHover} `}
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M172.026 67.2263H168.977C174.283 97.2196 200.479 120 231.995 120C267.342 120 295.995 91.3466 295.995 56.0003C295.995 34.2207 285.116 14.9819 268.495 3.42212V7.12101C283.368 18.2452 292.995 35.9986 292.995 56.0003C292.995 89.6897 265.685 117 231.995 117C202.141 117 177.296 95.5535 172.026 67.2263Z"
                          fill="#283540"
                          className={`${styles.changeOnHover} `}
                        />
                        <path
                          d="M171.995 67.5002L27.9951 67.5002"
                          stroke="currentColor"
                          strokeWidth="3"
                          className={`${styles.changeOnHover} `}
                        />
                        <circle
                          cx="231.995"
                          cy="56.0002"
                          r="56"
                          fill="#283540"
                          className={`${styles.changeOnHover} `}
                        />
                        <circle
                          cx="232.495"
                          cy="55.5002"
                          r="44.5"
                          fill="white"
                        />
                        <path
                          d="M211.939 66.7388C211.354 67.3246 211.354 68.2744 211.939 68.8602C212.525 69.4459 213.475 69.4459 214.061 68.8602L211.939 66.7388ZM227.055 58.5245L226.118 59.6958L226.118 59.6958L227.055 58.5245ZM231.082 61.746L230.145 62.9173L230.145 62.9173L231.082 61.746ZM236.296 61.3033L235.175 60.3067L235.175 60.3067L236.296 61.3033ZM250.22 47.8967C250.77 47.2776 250.715 46.3294 250.095 45.7791C249.476 45.2287 248.528 45.2845 247.978 45.9036L250.22 47.8967ZM233.838 63.2823L233.965 64.7769L233.965 64.7769L233.838 63.2823ZM224.436 57.0488L224.519 58.5465L224.519 58.5465L224.436 57.0488ZM243.399 43.5002C242.571 43.5002 241.899 44.1718 241.899 45.0002C241.899 45.8287 242.571 46.5002 243.399 46.5002V43.5002ZM249.499 52.6C249.499 53.4284 250.17 54.1 250.999 54.1C251.827 54.1 252.499 53.4284 252.499 52.6H249.499ZM250.442 45.5567L251.503 44.4961L251.503 44.4961L250.442 45.5567ZM218.7 47.3001C217.871 47.3001 217.2 47.9717 217.2 48.8001C217.2 49.6285 217.871 50.3001 218.7 50.3001V47.3001ZM230.099 50.3001C230.928 50.3001 231.599 49.6285 231.599 48.8001C231.599 47.9717 230.928 47.3001 230.099 47.3001V50.3001ZM214.061 68.8602L223.055 59.8654L220.934 57.7441L211.939 66.7388L214.061 68.8602ZM226.118 59.6958L230.145 62.9173L232.019 60.5747L227.992 57.3532L226.118 59.6958ZM237.417 62.2998L250.22 47.8967L247.978 45.9036L235.175 60.3067L237.417 62.2998ZM230.145 62.9173C230.78 63.425 231.369 63.9002 231.901 64.2219C232.47 64.566 233.148 64.8463 233.965 64.7769L233.712 61.7877C233.773 61.7825 233.74 61.8281 233.453 61.6547C233.13 61.459 232.718 61.1339 232.019 60.5747L230.145 62.9173ZM235.175 60.3067C234.58 60.9758 234.23 61.3655 233.944 61.6131C233.69 61.8324 233.65 61.7929 233.711 61.7877L233.965 64.7769C234.782 64.7076 235.404 64.3169 235.906 63.8818C236.377 63.475 236.877 62.9073 237.417 62.2998L235.175 60.3067ZM223.055 59.8654C223.656 59.2653 224.007 58.9184 224.289 58.6998C224.538 58.5073 224.576 58.5433 224.519 58.5465L224.353 55.551C223.571 55.5944 222.959 55.9364 222.455 56.3259C221.985 56.6893 221.478 57.2003 220.934 57.7441L223.055 59.8654ZM227.992 57.3532C227.392 56.8728 226.832 56.4209 226.324 56.1116C225.78 55.7802 225.135 55.5077 224.353 55.551L224.519 58.5465C224.461 58.5496 224.494 58.5098 224.763 58.6736C225.068 58.8596 225.456 59.1656 226.118 59.6958L227.992 57.3532ZM243.399 46.5002H247.199V43.5002H243.399V46.5002ZM249.499 48.8001V52.6H252.499V48.8001H249.499ZM247.199 46.5002C248.137 46.5002 248.69 46.5034 249.084 46.5564C249.435 46.6036 249.429 46.6643 249.382 46.6174L251.503 44.4961C250.9 43.8927 250.167 43.6751 249.483 43.5832C248.843 43.4971 248.052 43.5002 247.199 43.5002V46.5002ZM252.499 48.8001C252.499 47.9469 252.502 47.1561 252.416 46.5155C252.324 45.8318 252.106 45.0995 251.503 44.4961L249.382 46.6174C249.335 46.5705 249.395 46.5642 249.443 46.9152C249.496 47.3094 249.499 47.8621 249.499 48.8001H252.499ZM218.7 50.3001H230.099V47.3001H218.7V50.3001Z"
                          fill="#283540"
                        />
                      </svg>

                      <div className={styles.ValueGraphicText}>
                        <h4>{cpdProvidersBlock.title}</h4>
                        <ul>
                          {cpdProvidersBlock.items.map(
                            (item: string, itemIndex: number) => (
                              <li key={`cpd-${itemIndex}`}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.circleGraph}>
                <div className={`${styles.circle}  ${styles['circle-large']}`}>
                  <div
                    className={`${styles.circle}  ${styles['circle-medium']}`}
                  >
                    <div
                      className={`${styles.circle} ${styles['circle-small']}`}
                    >
                      <Image
                        src="/assets/images/cme-hub-logo.svg"
                        alt="CME Hub Logo"
                        width={207}
                        height={55}
                        className={styles.logoValue}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div
            className={` ${styles.valuePropositionMobile}  ${styles.hideOnDesktop}`}
          >
            <div className={styles.mobileVLogo}>
              <Image
                src="/assets/images/cme-hub-logo.svg"
                alt="CME Hub Logo"
                width={207}
                height={55}
              />
            </div>
            <div className={styles.valuePropositionListMobile}>
              <div className={styles.valuePropositionListMobileList}>
                <div className={styles.valuePropositionListMobileImg}>
                  <Image
                    src="/assets/images/icons/authority-icon.svg"
                    alt="AUTHORITY Icon"
                    width={80}
                    height={80}
                  />
                </div>
                <div className={styles.valuePropositionListMobileText}>
                  <h4>{authorityBlock.title}</h4>
                  <ul>
                    {authorityBlock.items.map(
                      (item: string, itemIndex: number) => (
                        <li key={`auth-${itemIndex}`}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className={styles.valuePropositionListMobileList}>
                <div className={styles.valuePropositionListMobileImg}>
                  <Image
                    src="/assets/images/icons/lciensees-icon.svg"
                    alt="LCIENSEES Icon"
                    width={80}
                    height={80}
                  />
                </div>
                <div className={styles.valuePropositionListMobileText}>
                  <h4>{licenseesBlock.title}</h4>
                  <ul>
                    {licenseesBlock.items.map(
                      (item: string, itemIndex: number) => (
                        <li key={`lic-${itemIndex}`}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className={styles.valuePropositionListMobileList}>
                <div className={styles.valuePropositionListMobileImg}>
                  <Image
                    src="/assets/images/icons/ce-providers-icon.svg"
                    alt="CE PROVIDERS Icon"
                    width={80}
                    height={80}
                  />
                </div>
                <div className={styles.valuePropositionListMobileText}>
                  <h4>{cpdProvidersBlock.title}</h4>
                  <ul>
                    {cpdProvidersBlock.items.map(
                      (item: string, itemIndex: number) => (
                        <li key={`cpd-${itemIndex}`}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ValueProposition;
