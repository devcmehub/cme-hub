// 'use client';

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from 'react';

// interface LanguageContextType {
//   currentLanguage: 'en' | 'fr';
//   toggleLanguage: () => void;
//   setLanguage: (lang: 'en' | 'fr') => void;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(
//   undefined
// );

// interface LanguageProviderProps {
//   children: ReactNode;
// }

// export const LanguageProvider: React.FC<LanguageProviderProps> = ({
//   children,
// }) => {
//   const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr' | null>(
//     null
//   );

//   // Load from localStorage synchronously
//   useEffect(() => {
//     const storedLang = localStorage.getItem('lang') as 'en' | 'fr' | null;
//     setCurrentLanguage(storedLang === 'fr' ? 'fr' : 'en');
//   }, []);

//   // Save to localStorage when it changes
//   useEffect(() => {
//     if (currentLanguage) {
//       localStorage.setItem('lang', currentLanguage);
//     }
//   }, [currentLanguage]);

//   const toggleLanguage = () => {
//     setCurrentLanguage((prevLang) => (prevLang === 'en' ? 'fr' : 'en'));
//   };

//   const setLanguage = (lang: 'en' | 'fr') => {
//     setCurrentLanguage(lang);
//   };

//   // Prevent rendering until language is initialized
//   if (!currentLanguage) return null;

//   return (
//     <LanguageContext.Provider
//       value={{ currentLanguage, toggleLanguage, setLanguage }}
//     >
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface LanguageContextType {
  currentLanguage: 'en' | 'fr';
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'fr') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr' | null>(
    null
  );

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as 'en' | 'fr' | null;

    if (storedLang === 'en' || storedLang === 'fr') {
      setCurrentLanguage(storedLang);
    } else {
      // Detect from browser/OS
      const browserLang = navigator.language.slice(0, 2); // e.g. 'en', 'fr'
      const initialLang: 'en' | 'fr' = browserLang === 'fr' ? 'fr' : 'en';
      setCurrentLanguage(initialLang);
      localStorage.setItem('lang', initialLang);
    }
  }, []);

  useEffect(() => {
    if (currentLanguage) {
      localStorage.setItem('lang', currentLanguage);
    }
  }, [currentLanguage]);

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const setLanguage = (lang: 'en' | 'fr') => {
    setCurrentLanguage(lang);
  };

  if (!currentLanguage) return null;

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, toggleLanguage, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
