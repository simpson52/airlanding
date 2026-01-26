"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { Accordion, AccordionItem } from "@/components/ui";
import Button from "@/components/ui/Button";
import Link from "next/link";

const faqs = [
  {
    id: 1,
    question: "데이터 보안은 어떻게 보장되나요?",
    answer:
      "DB Kernel 레벨의 RLS(Row Level Security)를 적용하여 고객사별 데이터를 완벽하게 격리합니다. 모든 데이터 전송은 SSL/TLS로 암호화되며, AWS의 글로벌 표준 보안 인프라를 사용합니다.",
  },
  {
    id: 2,
    question: "구현까지 얼마나 걸리나요?",
    answer:
      "기본 설정 및 데이터 마이그레이션은 약 2-4주 소요됩니다. 고객사의 기존 시스템과의 연동 복잡도에 따라 기간이 달라질 수 있으며, 상세 일정은 무료 데모 신청 시 맞춤형으로 제안드립니다.",
  },
  {
    id: 3,
    question: "기존 안전관리 시스템과 연동이 가능한가요?",
    answer:
      "네, 가능합니다. AIR는 RESTful API를 제공하여 기존 시스템과의 연동을 지원합니다. 구체적인 연동 방안은 기술 컨설팅을 통해 확인하실 수 있습니다.",
  },
  {
    id: 4,
    question: "주니어 사원 비율 증가에 대응하는 기능이 있나요?",
    answer:
      "네, AIR는 주니어 사원 비율 증가('21년 23% → '24년 36%)에 맞춰 현실적이고 객관적인 위험성평가를 제공합니다. JSA, KRAS, SIF를 결합한 국내 유일의 시스템으로, 경험 부족한 사원도 쉽게 사용할 수 있습니다.",
  },
];

export default function FAQContactSection() {
  return (
    <>
      <section className="py-24 px-4 md:px-8 bg-bg-base">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary mb-6">
              자주 묻는 질문
            </h2>
            <p className="text-[17px] md:text-[18px] font-medium text-text-secondary">
              AIR에 대해 궁금하신 점을 확인하세요
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </Accordion>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <Link href="/demo-request">
              <Button variant="primary" className="w-full max-w-4xl mx-auto text-[18px] py-4">
                시작하기
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Banner Image - Full Width */}
      <section className="bg-bg-base pt-0 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full"
        >
          <img
            src="/banner.png"
            alt="MISO와 함께 내 업무에 AI를 적용해보세요!"
            className="w-full h-auto object-contain"
            onError={(e) => {
              // 이미지가 없을 경우를 대비한 fallback
              console.warn("Banner image not found at /banner.png");
            }}
          />
        </motion.div>
      </section>
    </>
  );
}
