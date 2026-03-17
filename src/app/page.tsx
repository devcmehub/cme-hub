// src/app/page.tsx

import ValueProposition from '@/components/ValueProposition';
import ProductOfferings from '@/components/ProductOfferings';
import PlatformCapabilities from '@/components/PlatformCapabilities';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import RequestDemo from '@/components/RequestDemo';

export default function Home() {
  return (
    <>
      <section id="value-proposition">
        <ValueProposition />
      </section>
      <section id="product-offerings">
        <ProductOfferings />
      </section>
      <section id="features">
        <PlatformCapabilities />
      </section>
      <RequestDemo />
      <section id="contact">
        <ContactUs />
      </section>
      <Footer />

      <BackToTop />
    </>
  );
}
