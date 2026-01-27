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
import { useContentView } from "@/contexts/ContentViewContext";
import TabletFrame from "@/components/ui/TabletFrame";

export default function Home() {
  const { currentView } = useContentView();

  return (
    <main className="min-h-screen bg-bg-base">
      <NavigationBar />
      <div className="pt-[54px]">
        {currentView === "52g" ? (
          <TabletFrame>
            <iframe
              src="https://52g.gs"
              className="w-full h-full border-0 absolute inset-0"
              title="52g"
              allow="fullscreen"
              style={{
                width: "100%",
                height: "100%",
                minHeight: "200px",
              }}
            />
          </TabletFrame>
        ) : (
          <>
            <HeroSection />
            <UserFlowSection />
            <FeaturesShowcaseSection />
            <PressSection />
            <FAQContactSection />
          </>
        )}
      </div>
      <Footer />
      <StickyCTA />
    </main>
  );
}
