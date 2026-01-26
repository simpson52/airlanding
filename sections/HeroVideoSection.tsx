"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TabletFrame from "@/components/ui/TabletFrame";

export default function HeroVideoSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 일정량 이상 내려가면 인디케이터 숨김
      if (window.scrollY > 200) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-bg-base">
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
            minHeight: "200px",
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

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.button
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-14 h-14 bg-bg-surface rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-brand-blue-light transition-all active:scale-[0.96]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          aria-label="아래로 스크롤"
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-8 h-8 text-brand-blue" strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
}
