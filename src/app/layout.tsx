import { primary_font } from './fonts';
import { RequestDemoProvider } from '@/context/RequestDemoContext';
import { LanguageProvider } from '../context/LanguageContext';
import HeaderWrapper from '@/components/HeaderWrapper';
import '../styles/globals.scss';

export const metadata = {
  title: 'CME Hub - Empowering Continuing Medical Education',
  description:
    'CME Hub streamlines accreditation, licensing, and compliance for healthcare professionals, ensuring seamless continuing education management.',
  keywords:
    'CME, CPD, healthcare education, accreditation, licensing, compliance, continuing medical education, learning platform, medical certification',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={primary_font.variable}>
      <body>
        <LanguageProvider>
          <RequestDemoProvider>
            <div className="page-wrapper">
              <header className="header">
                <HeaderWrapper />
              </header>
              <main className="container">{children}</main>
            </div>
          </RequestDemoProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
