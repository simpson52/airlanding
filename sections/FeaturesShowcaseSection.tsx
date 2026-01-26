"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInUpStagger } from "@/utils/animations";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { Shield, FileCheck, CheckSquare, X, LucideProps } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
  image: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "AI Expert",
    subtitle: "비틈없는 위험 발굴",
    shortDescription: "440개 사례 기반 AI가 적절한 위험성평가서를 추천하여 누락 없는 위험 발굴을 보장합니다",
    fullDescription:
      "440개 실제 사례를 기반으로 한 MISO AI가 작업 내용을 분석하여 누락 없는 위험 항목을 자동으로 발굴합니다. KOSHA Guide를 완벽히 준수하는 위험성평가서를 추천하여 전문가 수준의 평가를 가능하게 합니다. 경험이 부족한 주니어 사원도 전문가 수준의 위험성 평가를 수행할 수 있도록 지원합니다.",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
    image: "/feature-ai-expert.jpg",
  },
  {
    id: 2,
    title: "Compliance",
    subtitle: "법적 기준 완벽 준수",
    shortDescription: "KOSHA GUIDE를 완벽히 준수하는 보고서를 자동 생성하여 법규 준수 부담을 줄입니다",
    fullDescription:
      "KOSHA Guide를 완벽히 준수하여 법적 요구사항을 충족하는 위험성 평가서를 자동으로 생성합니다. 법규 준수 여부를 자동으로 검증하여 안전 관리 책임자의 부담을 크게 줄입니다. 감사나 검사 시 법적 기준을 완벽히 준수한 문서를 즉시 제출할 수 있어 안심하고 사용할 수 있습니다.",
    icon: FileCheck,
    color: "from-orange-500 to-orange-600",
    image: "/feature-compliance.jpg",
  },
  {
    id: 3,
    title: "Action Plan",
    subtitle: "실행 중심 체크리스트",
    shortDescription: "조치사항 체크리스트를 즉시 발행하여 현장에서 바로 실행 가능한 계획을 수립합니다",
    fullDescription:
      "MISO AI가 추천한 안전대책을 기반으로 현장에 맞는 체크리스트를 자동 생성합니다. 실행 가능한 조치사항을 체계적으로 관리하여 위험성을 효과적으로 낮출 수 있습니다. 현장 작업자들이 바로 사용할 수 있는 실용적인 체크리스트를 제공하여 안전 관리를 즉시 개선할 수 있습니다.",
    icon: CheckSquare,
    color: "from-green-500 to-green-600",
    image: "/feature-action-plan.jpg",
  },
];

export default function FeaturesShowcaseSection() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary mb-0">
            AIR의 핵심 강점
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpStagger}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 w-full overflow-hidden"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.id} variants={fadeInUp}>
                <Card
                  interactive
                  onClick={() => setSelectedFeature(feature)}
                  className="h-full"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[20px] font-semibold text-text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-[18px] font-semibold text-brand-blue mb-4">
                      {feature.subtitle}
                    </p>
                    <p className="text-[17px] font-medium text-text-secondary mb-4">
                      {feature.shortDescription}
                    </p>
                    <span className="text-[14px] text-brand-blue font-medium">
                      자세히 보기 →
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Feature Detail Modal */}
        <Modal
          isOpen={!!selectedFeature}
          onClose={() => setSelectedFeature(null)}
        >
          {selectedFeature && (
            <div className="relative">
              {/* Close Button - 우상단 고정 */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-bg-input hover:bg-bg-surface transition-colors active:scale-[0.96]"
                aria-label="닫기"
              >
                <X className="w-5 h-5 text-text-primary" strokeWidth={2.5} />
              </button>

              {/* Header Section - 제목과 부제목 */}
              <div className="px-8 pt-10 pb-6">
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${selectedFeature.color} rounded-[20px] flex items-center justify-center flex-shrink-0`}
                  >
                    {(() => {
                      const Icon = selectedFeature.icon;
                      return <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />;
                    })()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[28px] md:text-[32px] font-bold text-text-primary mb-2 leading-tight">
                      {selectedFeature.title}
                    </h3>
                    <p className="text-[20px] md:text-[22px] font-semibold text-brand-blue">
                      {selectedFeature.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* 16:9 Image Section */}
              <div className="relative w-full aspect-video bg-bg-input overflow-hidden">
                <div
                  className={`w-full h-full bg-gradient-to-br ${selectedFeature.color} flex items-center justify-center`}
                >
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {(() => {
                        const Icon = selectedFeature.icon;
                        return <Icon className="w-12 h-12 text-white" strokeWidth={2.5} />;
                      })()}
                    </div>
                    <p className="text-[14px] text-white/90 font-medium">
                      {selectedFeature.title} 상세 이미지
                    </p>
                    <p className="text-[12px] text-white/70 mt-1">
                      16:9 비율
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section - 상세 설명 */}
              <div className="px-8 pt-8 pb-10">
                <div className="max-w-3xl">
                  <p className="text-[18px] md:text-[19px] font-medium text-text-secondary leading-relaxed">
                    {selectedFeature.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
