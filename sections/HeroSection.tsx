"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function HeroSection() {
  const handleCTAClick = () => {
    // CTA 클릭 핸들러 (향후 구현 예정)
    console.log("CTA 클릭");
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 좌측: 텍스트 영역 */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-left"
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
              AI 기반 위험성 평가서,
              <br />
              이제 1분이면 충분합니다
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
                className="!px-8 !py-4 text-[18px]"
                fullWidth={false}
              >
                AIR로 위험성평가하기
              </Button>
              <Button
                variant="ghost"
                onClick={handleSecondaryCTAClick}
                className="!px-8 !py-4 text-[18px]"
                fullWidth={false}
              >
                더 알아보기
              </Button>
            </div>
          </motion.div>

          {/* 우측: 시각적 요소 (데스크탑 화면 미리보기) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative w-full"
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
              {/* 화면 내부 */}
              <div className="relative w-full aspect-video bg-white rounded-[16px] md:rounded-[20px] overflow-hidden">
                {/* 임시 플레이스홀더 - 나중에 실제 대시보드 스크린샷으로 교체 */}
                <div className="w-full h-full bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-brand-blue/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-brand-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-[16px] text-text-secondary font-medium">
                      AIR 대시보드 미리보기
                    </p>
                    <p className="text-[14px] text-text-tertiary mt-2">
                      (실제 화면 동영상으로 교체 예정)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
