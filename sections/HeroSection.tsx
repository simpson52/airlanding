"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { extractYouTubeVideoId } from "@/utils/youtube";

interface HeroSectionProps {
  readonly onCTAClick?: () => void;
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const youtubeUrl = "https://youtu.be/Ga-k1RN6Wgo";
  const videoId = extractYouTubeVideoId(youtubeUrl) || "VbCzkWyFTmU";

  const handleCTAClick = () => {
    onCTAClick?.();
  };

  const handleSecondaryCTAClick = () => {
    // User Flow Section으로 스크롤
    const userFlowSection = document.getElementById("user-flow");
    if (userFlowSection) {
      userFlowSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center">
          {/* 좌측: 텍스트 영역 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-left order-2 lg:order-none"
          >
            {/* AIR 로고 + 별표 */}
            <div className="mb-0 flex items-center gap-1">
              <Image
                src="/air-logo.png"
                alt="AIR"
                width={148}
                height={45}
                className="h-[32px] md:h-[40px] lg:h-[45px] w-auto"
              />
              <sup className="text-[16px] md:text-[20px] text-brand-blue">*</sup>
            </div>
            {/* 설명 텍스트 */}
            <p className="text-[14px] md:text-[15px] text-text-tertiary mb-0 mt-0">
              <sup>*</sup>AI Risk Assessment
            </p>
            {/* 헤드라인 */}
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-text-primary mb-6 leading-tight">
              현장 위험성 평가서,
              <br />
              이제 검토만 하세요.
            </h1>

            {/* 부제목 */}
            <div className="mb-4">
              <p className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold text-brand-blue leading-relaxed">
                4,400개 사례<sup className="text-[14px] md:text-[16px]">*</sup> 기반 AI가 자동으로 작성하는
                <br />
                현장 맞춤형 위험성 평가서
              </p>
              <p className="text-[13px] md:text-[14px] text-text-tertiary mt-2">
                <sup>*</sup>고용노동부 제공 고위험요인(SIF) 사례
              </p>
            </div>

            {/* 본문: 3가지 핵심 이점 */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-blue-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-[17px] md:text-[18px] font-medium text-text-secondary">
                  한국산업안전보건공단 지침 준수
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-blue-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-[17px] md:text-[18px] font-medium text-text-secondary">
                  JSA 및 KRAS 기법 기반 위험성평가
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-blue-light flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-[17px] md:text-[18px] font-medium text-text-secondary">
                  현장 작업 맞춤형 체크리스트 생성
                </p>
              </div>
            </div>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                onClick={handleCTAClick}
                className="!px-8 !py-4 text-[18px] whitespace-nowrap"
                fullWidth={false}
              >
                <span className="whitespace-nowrap">신청하기</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleSecondaryCTAClick}
                className="!px-8 !py-4 text-[18px] whitespace-nowrap"
                fullWidth={false}
              >
                더 알아보기
              </Button>
            </div>
          </motion.div>

          {/* 우측: YouTube 비디오 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative w-full order-first lg:order-none"
          >
            {/* 데스크탑 화면 프레임 */}
            <div
              className="relative rounded-[20px] md:rounded-[24px] overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #E8E5FF 0%, #FFFFFF 100%)",
                padding: "8px",
                boxShadow: "0 20px 60px rgba(85, 66, 246, 0.15), 0 0 0 1px rgba(85, 66, 246, 0.1)",
              }}
            >
              {/* YouTube 비디오 임베드 */}
              <div className="relative w-full aspect-[16/11] md:aspect-[16/10] lg:aspect-[16/9] bg-white rounded-[16px] md:rounded-[20px] overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&controls=1&rel=0`}
                  title="AIR 소개 영상"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
