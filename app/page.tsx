"use client";

import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import {
  HeroVideoSection,
  UserFlowSection,
  FeaturesShowcaseSection,
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
        {currentView === "miso" ? (
          <TabletFrame>
            <iframe
              src="https://www.miso.gs"
              className="w-full h-full border-0"
              title="About MISO"
              allow="fullscreen"
              style={{ minHeight: "600px" }}
            />
          </TabletFrame>
        ) : currentView === "52g" ? (
          <TabletFrame>
            <iframe
              src="https://52g.gs"
              className="w-full h-full border-0"
              title="52g"
              allow="fullscreen"
              style={{ minHeight: "600px" }}
            />
          </TabletFrame>
        ) : (
          <>
            <HeroVideoSection />
            <UserFlowSection />
            <FeaturesShowcaseSection />
            <FAQContactSection />
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
