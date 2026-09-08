import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks";
import WhyHomeFix from "@/components/WhyHomeFix";
import TrustedStats from "@/components/TrustedStats";
import TrustFeatures from "@/components/TrustFeatures";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <ServiceCategories />

        <HowItWorks />

        <WhyHomeFix />

        <TrustedStats />

        

        <CTA />

      </main>

      <Footer />
    </>
  );
}