// // CustomArrows.tsx

// import React from 'react';
// import styles from './SuccessStories.module.scss';
// interface ArrowProps {
//   onClick?: () => void;
//   className?: string;
//   style?: React.CSSProperties;
//   disabled?: boolean; // Add disabled prop
// }

// export const NextArrow: React.FC<ArrowProps> = ({
//   onClick,
//   className,
//   style,
// }) => {
//   return (
//     <button
//       className={`${styles.next} ${className}`}
//       onClick={onClick}
//       style={{
//         ...style,
//         display: 'block !important',
//         position: 'absolute',
//       }}
//     >
//       <svg
//         stroke="#FF0000" // Temporary bright red color
//         width="60.000000"
//         height="49.230957"
//         viewBox="0 0 60 49.231"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <clipPath id="clip419_3465">
//             <rect
//               id="arrow-right-02-round"
//               rx="0.000000"
//               width="34.923077"
//               height="34.923077"
//               transform="translate(13.308105 7.153809)"
//               fill="white"
//               fillOpacity="0"
//             />
//           </clipPath>
//         </defs>
//         <rect
//           id="Rectangle 17856"
//           x="1.000000"
//           y="1.000000"
//           rx="10.000000"
//           width="58.000000"
//           height="47.230770"
//           stroke="#161C22"
//           strokeOpacity="1.000000"
//           strokeWidth="2.000000"
//         />
//         <g clipPath="url(#clip419_3465)">
//           <path
//             id="Vector"
//             d="M43.07 24.61L18.46 24.61"
//             stroke="#141B34"
//             strokeOpacity="1.000000"
//             strokeWidth="2.000000"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//           <path
//             id="Vector"
//             d="M35.38 16.92C35.38 16.92 43.07 22.58 43.07 24.61C43.07 26.64 35.38 32.3 35.38 32.3"
//             stroke="#141B34"
//             strokeOpacity="1.000000"
//             strokeWidth="2.000000"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         </g>
//       </svg>
//     </button>
//   );
// };
// export const PrevArrow: React.FC<ArrowProps> = ({
//   onClick,
//   className,
//   style,
// }) => {
//   return (
//     <button
//       className={`${styles.prev} ${className}`}
//       onClick={onClick}
//       style={{
//         ...style,
//         display: 'block !important',
//         position: 'absolute',
//       }}
//     >
//       <svg
//         stroke="#FF0000" // Temporary bright red color
//         width="60.000000"
//         height="49.230957"
//         viewBox="0 0 60 49.231"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <clipPath id="clip419_3462">
//             <rect
//               id="arrow-left-02-round"
//               rx="0.000000"
//               width="34.923077"
//               height="34.923077"
//               transform="translate(13.307617 7.153809)"
//               fill="white"
//               fillOpacity="0"
//             />
//           </clipPath>
//         </defs>
//         <rect
//           id="Rectangle 17857"
//           x="1.000000"
//           y="1.000000"
//           rx="10.000000"
//           width="58.000000"
//           height="47.230770"
//           stroke="#161C22"
//           strokeOpacity="1.000000"
//           strokeWidth="2.000000"
//         />
//         <g clipPath="url(#clip419_3462)">
//           <path
//             id="Vector"
//             d="M18.46 24.61L43.07 24.61"
//             stroke="#141B34"
//             strokeOpacity="1.000000"
//             strokeWidth="2.000000"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//           <path
//             id="Vector"
//             d="M26.15 16.92C26.15 16.92 18.46 22.58 18.46 24.61C18.46 26.64 26.15 32.3 26.15 32.3"
//             stroke="#141B34"
//             strokeOpacity="1.000000"
//             strokeWidth="2.000000"
//             strokeLinejoin="round"
//             strokeLinecap="round"
//           />
//         </g>
//       </svg>
//     </button>
//   );
// };
