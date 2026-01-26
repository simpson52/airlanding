"use client";

import { useState } from "react";
import TabletFrame from "@/components/ui/TabletFrame";

export default function HeroVideoSection() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="relative w-full bg-bg-base py-8 md:py-12 lg:py-16 overflow-hidden">
      <TabletFrame>
        <iframe
          src="https://www.youtube.com/embed/BX4_raNiCw0?si=vgpj60Hg0mij6LZP&autoplay=1&mute=1&loop=1&playlist=BX4_raNiCw0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full border-0 absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          onLoad={() => setIsLoading(false)}
        />
        {/* Loading Placeholder */}
        {isLoading && (
          <div className="absolute inset-0 w-full h-full bg-bg-base/80 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-brand-blue-light border-t-brand-blue rounded-full animate-spin" />
              <p className="text-[16px] text-text-secondary">비디오 로딩 중...</p>
            </div>
          </div>
        )}
      </TabletFrame>
    </section>
  );
}
