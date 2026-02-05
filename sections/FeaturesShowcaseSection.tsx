"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInUpStagger } from "@/utils/animations";
import Card from "@/components/ui/Card";
import Image from "next/image";

interface Feature {
  id: number;
  title: string;
  shortDescription: string | React.ReactNode;
  iconImage: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "안전관리 업무 효율화",
    shortDescription: (
      <>
        위험성 평가 시간을 기존 대비 83%로 단축하고 품질은 향상시킵니다.
        <br />
        <span className="text-[13px] md:text-[14px] text-text-tertiary mt-2 block">
          *PSM S,M등급 29개 사업장 대상 설문조사 결과
        </span>
      </>
    ),
    iconImage: "/time.png",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "전문 평가기법 기반 표준화",
    shortDescription: (
      <>
        JSA·KRAS·빈도-강도법 등 AI기반의 위험성 평가 표준화로 숙련도에 따른 편차를 줄입니다.
      </>
    ),
    iconImage: "/legal.png",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 3,
    title: "현장 맞춤형 체크리스트",
    shortDescription: (
      <>
        위험성 평가 결과를 간단한 클릭으로 체크리스트로 변환, 즉시 실행 가능한 안전 계획을 수립합니다.
      </>
    ),
    iconImage: "/checklist.png",
    color: "from-green-500 to-green-600",
  },
];

export default function FeaturesShowcaseSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary mb-12 flex items-center justify-center gap-2 flex-wrap">
            왜{" "}
            <Image
              src="/air-logo.png"
              alt="AIR"
              width={106}
              height={32}
              className="h-8 md:h-9 w-auto"
            />
            인가요?
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
            return (
              <motion.div key={feature.id} variants={fadeInUp}>
                <Card className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6">
                      <Image
                        src={feature.iconImage}
                        alt={feature.title}
                        width={128}
                        height={128}
                        className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain"
                      />
                    </div>
                    <h3 className="text-[20px] font-semibold text-text-primary mb-4">
                      {feature.title}
                    </h3>
                    <div className="text-[17px] font-medium text-text-secondary">
                      {feature.shortDescription}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
