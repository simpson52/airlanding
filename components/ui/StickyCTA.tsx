"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import { X } from "lucide-react";

interface StickyCTAProps {
  readonly onCTAClick?: () => void;
}

export default function StickyCTA({ onCTAClick }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 300px 이상 내려가면 표시
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleCTAClick = () => {
    onCTAClick?.();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-100"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* 모바일: 텍스트 영역 전체 너비 사용 → 정상 줄바꿈 / 데스크톱: 가로 배치 */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
              <p className="text-[14px] sm:text-[16px] font-semibold text-text-primary whitespace-normal break-keep">
                GS가 만든 AI기반 위험성 평가서 솔루션
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <Image
                  src="/air-logo.png"
                  alt="AIR"
                  width={80}
                  height={24}
                  className="h-5 sm:h-6 w-auto flex-shrink-0"
                  quality={100}
                  unoptimized
                />
                <p className="text-[14px] sm:text-[16px] font-semibold text-text-primary whitespace-normal break-keep">
                  지금 바로 시작하세요!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                variant="primary"
                onClick={handleCTAClick}
                className="!px-6 !py-3 text-[16px] flex items-center justify-center gap-2"
              >
                <Image
                  src="/air-logo 1_white.png"
                  alt="AIR"
                  width={20}
                  height={20}
                  className="h-5 w-auto"
                  quality={100}
                  unoptimized
                />
                위험성 평가하기
              </Button>
              <button
                onClick={handleDismiss}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-[0.96]"
                aria-label="닫기"
              >
                <X className="w-5 h-5 text-text-secondary" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
