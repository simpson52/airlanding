"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Slider from "@/components/ui/Slider";

const userFlowSteps = [
  {
    id: 1,
    title: "어떤 작업을 계획하고 계신가요?",
    description: "작업 내용, 사용 장비, 인원 등을 자유롭게 설명해주시면 MISO AI 기반으로 위험성평가서를 작성합니다",
    image: "/userflow-1.jpg",
  },
  {
    id: 2,
    title: "MISO AI 기반 위험요인 자동 식별",
    description: "MISO AI가 작업 내용을 기반으로 KOSHA Guide 기반 9가지 위험요인 중 적합한 위험요인을 선정합니다",
    image: "/userflow-2.jpg",
  },
  {
    id: 3,
    title: "고위험요인(SIF) 사례 기반 작성",
    description: "MISO AI가 작업 내용을 기반으로 고용노동부에서 제공한 고위험요인(SIF) 사례를 기반으로 유사 재해사례를 탐색해 위험성평가서에 반영합니다."
  },
  {
    id: 4,
    title: "AI 기반 위험성 평가서 작성",
    description: "MISO AI가 작성한 위험성평가를 검토하고 현장 상황에 맞게 보완하세요",
    image: "/userflow-4.jpg",
  },
  {
    id: 5,
    title: "체크리스트로 현장 안전성 강화",
    description: "MISO AI가 추천한 안전대책을 기반으로 현장에 맞는 체크리스트를 작성해 위험성을 낮추세요",
    image: "/userflow-5.jpg",
  },
];

export default function UserFlowSection() {
  const slides = userFlowSteps.map((step) => (
    <div key={step.id} className="w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative w-full aspect-video bg-bg-input rounded-[24px] overflow-hidden">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/20">
              <div className="text-center p-8">
                <div className="text-[48px] font-bold text-brand-blue mb-4">
                  {step.id}
                </div>
                <p className="text-[14px] text-text-tertiary">
                  {step.title}
                </p>
                <p className="text-[12px] text-text-tertiary mt-2">
                  (이미지 영역: 16:9 비율)
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="inline-block bg-brand-blue-light text-brand-blue text-[14px] font-semibold px-4 py-2 rounded-full mb-6">
              Step {step.id}
            </div>
            <h3 className="text-[28px] md:text-[36px] font-bold text-text-primary mb-6 flex items-center gap-2 flex-wrap">
              {step.id === 2 ? (
                <>
                  <Image
                    src="/miso-logo.svg"
                    alt="MISO"
                    width={120}
                    height={32}
                    className="inline-block"
                  />
                  <span>기반 위험요인 자동 식별</span>
                </>
              ) : (
                step.title
              )}
            </h3>
            <p className="text-[17px] md:text-[18px] font-medium text-text-secondary leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section className="py-16 px-4 md:px-8 bg-bg-base">
      <div className="max-w-7xl mx-auto">
        <Slider
          items={slides}
          autoPlay={false}
          showIndicators={true}
          showArrows={true}
          hideLeftArrowOnFirst={true}
          hideRightArrowOnLast={true}
        />
      </div>
    </section>
  );
}
