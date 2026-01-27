"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInUpStagger } from "@/utils/animations";
import Card from "@/components/ui/Card";
import { Shield, FileCheck, CheckSquare, LucideProps } from "lucide-react";
import Image from "next/image";

interface Feature {
  id: number;
  title: string;
  shortDescription: string | React.ReactNode;
  icon: React.ComponentType<LucideProps>;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "안전관리 업무 효율화",
    shortDescription: (
      <>
        위험성 평가서 작성 시간을 AI기반으로 5분 이하로 단축하면서 품질은 향상시킵니다. <strong className="font-bold text-text-primary">이제 검토만 하면 됩니다.</strong>
      </>
    ),
    icon: FileCheck,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "JSA·KRAS 기반 위험성평가 표준화",
    shortDescription: (
      <>
        검증된 평가 기법으로 위험성 평가 업무를 표준화해 <strong className="font-bold text-text-primary">숙련도에 따른 편차를 줄입니다.</strong>
      </>
    ),
    icon: Shield,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 3,
    title: "현장 맞춤형 체크리스트",
    shortDescription: (
      <>
        AI 기반 위험성 평가 결과를 현장에 바로 적용 가능한 체크리스트로 변환해 <strong className="font-bold text-text-primary">즉시 실행 가능한 안전 계획을 수립합니다.</strong>
      </>
    ),
    icon: CheckSquare,
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
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary mb-0 flex items-center justify-center gap-2 flex-wrap">
            <Image
              src="/air_logo.png"
              alt="AIR"
              width={106}
              height={32}
              className="h-8 md:h-9 w-auto"
            />
            <span>(AI Risk Assessment)의 핵심 강점</span>
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
                <Card className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mb-6`}
                    >
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
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
