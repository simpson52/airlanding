"use client";

import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  items: ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  hideLeftArrowOnFirst?: boolean;
  hideRightArrowOnLast?: boolean;
}

export default function Slider({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  hideLeftArrowOnFirst = false,
  hideRightArrowOnLast = false,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const currentIndexRef = useRef(currentIndex);

  // currentIndex가 변경될 때마다 ref 업데이트
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndexRef.current ? 1 : -1);
    setCurrentIndex(index);
  }, []);

  const goToPrevious = () => {
    if (currentIndex === 0) return; // 첫 번째 슬라이드에서는 이전으로 이동 불가
    const newIndex = currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    if (currentIndex === items.length - 1) return; // 마지막 슬라이드에서는 다음으로 이동 불가
    const newIndex = currentIndex + 1;
    goToSlide(newIndex);
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (currentIndexRef.current > 0) {
          goToSlide(currentIndexRef.current - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (currentIndexRef.current < items.length - 1) {
          goToSlide(currentIndexRef.current + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, goToSlide]);

  // 자동 재생
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      const newIndex = currentIndexRef.current === items.length - 1 ? 0 : currentIndexRef.current + 1;
      goToSlide(newIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length, goToSlide]);

  // 스와이프 제스처 (모바일) 및 드래그 (데스크톱)
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);
  const [mouseEnd, setMouseEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 터치 이벤트 (모바일)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < items.length - 1) {
      goToNext();
    } else if (isRightSwipe && currentIndex > 0) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // 마우스 드래그 이벤트 (데스크톱)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const distance = mouseStart - mouseEnd;
    const isLeftDrag = distance > 50;
    const isRightDrag = distance < -50;

    if (isLeftDrag && currentIndex < items.length - 1) {
      goToNext();
    } else if (isRightDrag && currentIndex > 0) {
      goToPrevious();
    }

    setIsDragging(false);
    setMouseStart(0);
    setMouseEnd(0);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // 화살표 표시 여부 결정
  const showLeftArrow = showArrows && items.length > 1 && !(hideLeftArrowOnFirst && currentIndex === 0);
  const showRightArrow = showArrows && items.length > 1 && !(hideRightArrowOnLast && currentIndex === items.length - 1);

  return (
    <div className="relative w-full">
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showLeftArrow && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-bg-surface rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-[0.96]"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="w-6 h-6 text-text-primary" strokeWidth={2.5} />
        </button>
      )}
      {showRightArrow && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-bg-surface rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow active:scale-[0.96]"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="w-6 h-6 text-text-primary" strokeWidth={2.5} />
        </button>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all active:scale-[0.96] ${
                index === currentIndex
                  ? "bg-brand-blue w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-2"
              }`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
