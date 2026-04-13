"use client";

import { useRouter } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/ui/StickyCTA";
import {
  HeroSection,
  UserFlowSection,
  FeaturesShowcaseSection,
  PressSection,
} from "@/sections";

export default function Home() {
  const router = useRouter();

  const handleCTAClick = () => {
    router.push("/form");
  };

  return (
    <main className="min-h-screen bg-bg-base">
      <NavigationBar onCTAClick={handleCTAClick} />
      <div className="pt-[54px]">
        <HeroSection onCTAClick={handleCTAClick} />
        <UserFlowSection />
        <FeaturesShowcaseSection />
        <PressSection />
      </div>
      <Footer />
      <StickyCTA onCTAClick={handleCTAClick} />
    </main>
  );
}
