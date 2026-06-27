import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import HeroSection from "../sections/HeroSection";
import ServicesSection from "../sections/ServicesSection";
import DashboardPreview from "../sections/DashboardPreview";
import Testimonials from "../sections/Testimonials";
import CTASection from "../sections/CTASection";

function Home() {
  return (
    <>
      <Navbar />

      <HeroSection />
      <ServicesSection />
      <DashboardPreview />
      <Testimonials />
      <CTASection />

      <Footer />
    </>
  );
}

export default Home;