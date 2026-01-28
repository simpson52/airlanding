"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { X } from "lucide-react";

export default function StickyCTA() {
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
    // TODO: 데모 신청 페이지로 이동 또는 모달 열기
    console.log("Sticky CTA 클릭");
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
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-[16px] font-semibold text-text-primary">
                지금 바로 시작하세요
              </p>
              <p className="text-[14px] text-text-secondary mt-1">
                무료 데모로 AIR를 체험해보세요
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                onClick={handleCTAClick}
                className="!px-6 !py-3 text-[16px]"
              >
                AIR로 위험성평가하기
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
