"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInUpStagger } from "@/utils/animations";
import Card from "@/components/ui/Card";
import { Shield, FileCheck, CheckSquare, LucideProps } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Compliance",
    subtitle: "한국산업안전보건공단 지침 준수",
    shortDescription: "한국산업안전보건공단 지침을 완벽히 준수하는 위험성평가서를 자동 생성하여 법규 준수 부담을 제로로 만듭니다",
    icon: FileCheck,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "JSA & KRAS",
    subtitle: "JSA 및 KRAS 기법 기반 위험성평가",
    shortDescription: "JSA(작업안전분석)와 KRAS(위험성 평가) 기법을 결합하여 체계적이고 정확한 위험성평가를 수행합니다",
    icon: Shield,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 3,
    title: "Checklist",
    subtitle: "현장 작업 맞춤형 체크리스트 생성",
    shortDescription: "평가된 위험요인을 기반으로 현장 작업에 맞는 체크리스트를 자동 생성하여 즉시 실행 가능한 안전 계획을 수립합니다",
    icon: CheckSquare,
    color: "from-green-500 to-green-600",
  },
];

export default function FeaturesShowcaseSection() {
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
                <Card className="h-full">
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
                    <p className="text-[17px] font-medium text-text-secondary">
                      {feature.shortDescription}
                    </p>
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
