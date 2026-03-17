import { Montserrat } from 'next/font/google';

export const primary_font = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary',
  weight: ['400', '500', '600', '700', '800', '900'],
});
