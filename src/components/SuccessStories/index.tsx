// // src/components/SuccessStories.tsx
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import styles from './SuccessStories.module.scss';
// import content from '../../utils/content.json';
// import Image from 'next/image';

// const SuccessStories: React.FC = () => {
//   const section = content.sections.find((sec) => sec.id === 'success-stories');
//   if (!section || !section.stories) return null;

//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [visibleSlides, setVisibleSlides] = useState(2); // default for desktop
//   const sliderRef = useRef<Slider>(null);

//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       if (width < 480) setVisibleSlides(1);
//       else if (width < 768) setVisibleSlides(2);
//       else if (width < 1024) setVisibleSlides(3);
//       else setVisibleSlides(2);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const goNext = () => sliderRef.current?.slickNext();
//   const goPrev = () => sliderRef.current?.slickPrev();

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: visibleSlides,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     variableWidth: true,
//     adaptiveHeight: false,
//     afterChange: (index: number) => setCurrentSlide(index),
//     nextArrow: (
//       <ArrowButton
//         direction="next"
//         onClick={goNext}
//         disabled={currentSlide >= section.stories.length - visibleSlides}
//       />
//     ),
//     prevArrow: (
//       <ArrowButton
//         direction="prev"
//         onClick={goPrev}
//         disabled={currentSlide === 0}
//       />
//     ),
//   };

//   return (
//     <section
//       className={`${styles.successStories} container-fluid responsive-section`}
//     >
//       <div className="container">
//         <h2 className={styles.section_title}>{section.title}</h2>
//         <p className={styles.successStoriesDescription}>
//           {section.description}
//         </p>

//         <div className={styles.successStoriesCards}>
//           <div className={styles.featuredBox}>
//             <h3>How Our Platform Transformed Businesses</h3>
//           </div>
//           <div className={styles.sliderContainer}>
//             <Slider
//               ref={sliderRef}
//               {...settings}
//               className={styles.customSlider}
//             >
//               {section.stories.map((story, index) => (
//                 <div
//                   key={index}
//                   className={styles.storySlide}
//                   style={{ width: 350 }}
//                 >
//                   <div className={styles.storyCard}>
//                     <blockquote className={styles.storyQuote}>
//                       {story.quote}
//                     </blockquote>
//                     <div className={styles.successStoriesUserInfo}>
//                       {story.imageUrl && (
//                         <img src={story.imageUrl} alt={story.author} />
//                       )}
//                       <div className="d-flex justify-content-between flex-column">
//                         <p className={styles.storyAuthor}>{story.author}</p>
//                         <p className={styles.storyPosition}>{story.position}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const ArrowButton = ({
//   direction,
//   onClick,
//   disabled,
// }: {
//   direction: 'prev' | 'next';
//   onClick: () => void;
//   disabled: boolean;
// }) => {
//   const isNext = direction === 'next';
//   return (
//     <button
//       className={`${styles.arrowButton} ${isNext ? styles.next : styles.prev}`}
//       onClick={onClick}
//       disabled={disabled}
//       style={{
//         display: 'block',
//         position: 'absolute',
//         top: '112%',
//         transform: 'translateY(-50%)',
//         // Dynamically assign 'left' or 'right' based on isNext
//         ...(isNext ? { left: '100px' } : { left: '10px' }),
//       }}
//     >
//       <Image
//         src={
//           isNext
//             ? '/assets/images/icons/button-right.svg'
//             : '/assets/images/icons/button-left.svg'
//         }
//         alt="Arrow icons"
//         width={50}
//         height={50}
//       />
//     </button>
//   );
// };

// export default SuccessStories;
