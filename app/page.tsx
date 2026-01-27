"use client";

import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/ui/StickyCTA";
import {
  HeroSection,
  UserFlowSection,
  FeaturesShowcaseSection,
  PressSection,
  FAQContactSection,
} from "@/sections";
export default function Home() {
  return (
    <main className="min-h-screen bg-bg-base">
      <NavigationBar />
      <div className="pt-[54px]">
        <HeroSection />
        <UserFlowSection />
        <FeaturesShowcaseSection />
        <PressSection />
        <FAQContactSection />
      </div>
      <Footer />
      <StickyCTA />
    </main>
  );
}
