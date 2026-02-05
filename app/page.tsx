"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/ui/StickyCTA";
import CTAModal from "@/components/ui/CTAModal";
import {
  HeroSection,
  UserFlowSection,
  FeaturesShowcaseSection,
  PressSection,
} from "@/sections";

export default function Home() {
  const router = useRouter();
  const [isCTAModalOpen, setIsCTAModalOpen] = useState(false);

  const handleCTAClick = () => {
    setIsCTAModalOpen(true);
  };

  const handleMemberClick = () => {
    window.open("https://miso-powered-jsa.vercel.app/login", "_blank");
    setIsCTAModalOpen(false);
  };

  const handleNewUserClick = () => {
    setIsCTAModalOpen(false);
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
      <CTAModal
        isOpen={isCTAModalOpen}
        onClose={() => setIsCTAModalOpen(false)}
        onMemberClick={handleMemberClick}
        onNewUserClick={handleNewUserClick}
      />
    </main>
  );
}
