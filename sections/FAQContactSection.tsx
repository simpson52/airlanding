"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

// 간단한 마크다운 파싱 함수 (Bold 처리)
const parseMarkdown = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const boldRegex = /\*\*(.*?)\*\*/g;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Bold 이전의 일반 텍스트
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Bold 텍스트
    parts.push(
      <strong key={match.index} className="font-bold text-text-primary">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  // 마지막 일반 텍스트
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "service",
    name: "서비스",
    faqs: [
      {
        id: 1,
        question: "이 서비스는 어떤 문제를 해결하나요?",
        answer: "현장에서는 위험성평가 문서를 \"해야 하는데\" 시간이 부족하거나, 작성자마다 방식이 달라 품질이 들쑥날쑥해지는 일이 많습니다. 이 서비스는 작업 내용을 바탕으로 위험요인과 안전대책을 빠르게 정리해 **문서 작성 부담을 줄이고, 작성 품질을 일정하게 유지**하도록 돕습니다.",
      },
      {
        id: 2,
        question: "기존 엑셀/수기 방식과 무엇이 다른가요?",
        answer: "엑셀·수기 방식은 경험이 많은 사람의 '머릿속 기준'에 의존하기 쉽고, 반복 작성에 시간이 많이 듭니다. 이 서비스는 입력한 작업 정보를 기반으로 초안을 자동 구성해 **누락을 줄이고, 반복 작업을 최소화**합니다. 결과물은 기존 프로세스에 맞춰 파일로 활용할 수 있어 전환 장벽도 낮습니다.",
      },
      {
        id: 3,
        question: "어떤 팀이 도입하면 효과가 큰가요?",
        answer: "안전/환경(EHS) 조직뿐 아니라, 현장 관리자와 협력사 관리 담당자처럼 **작성·검토·승인을 반복하는 팀**에서 효과가 큽니다. 특히 작업 유형이 많고 현장 인력 교체가 잦은 조직에서는 문서 표준화가 곧 운영 안정성으로 이어집니다.",
      },
    ],
  },
  {
    id: "feature",
    name: "기능",
    faqs: [
      {
        id: 1,
        question: "사용은 얼마나 복잡한가요?",
        answer: "기본 흐름은 단순합니다. 작업 내용을 입력하면 서비스가 위험요인과 안전대책 초안을 제안하고, 사용자는 현장에 맞는 항목만 선택·수정해 문서를 완성합니다. 처음 쓰는 분도 \"무엇부터 써야 할지\" 막히지 않도록 단계별로 안내하는 방식입니다.",
      },
      {
        id: 2,
        question: "결과 품질을 높이려면 무엇을 입력해야 하나요?",
        answer: "작업 공정(순서), 사용 장비/도구, 작업 장소, 인원 구성, 주변 위험 요소(고소·화기·중량물 등)처럼 **현장 맥락이 드러나는 정보**가 중요합니다. 입력이 구체적일수록 추천 항목이 더 실제와 가까워지고, 수정 시간도 줄어듭니다.",
      },
      {
        id: 3,
        question: "추천된 위험요인/대책은 마음대로 조정할 수 있나요?",
        answer: "가능합니다. 서비스는 \"정답을 강요\"하지 않고 **현장 판단을 돕는 초안**을 제공합니다. 불필요한 항목은 빼고, 필요한 항목은 추가하거나 표현을 정리해 내부 기준에 맞춘 최종본으로 확정할 수 있습니다.",
      },
    ],
  },
  {
    id: "document",
    name: "문서",
    faqs: [
      {
        id: 1,
        question: "산출물(문서)은 어떤 형태로 나오나요?",
        answer: "작업 단계별로 위험요인과 안전대책이 정리된 형태로 제공되어, \"현장에서 읽히는 문서\"를 목표로 합니다. 필요한 경우 내부 표기 방식(용어/표현)을 조직 기준에 맞춰 정리해 사용할 수 있습니다.",
      },
      {
        id: 2,
        question: "파일로 내려받아 기존 양식에 붙여도 되나요?",
        answer: "네. 결과물은 조직의 기존 결재·보관 흐름에 맞게 **파일로 활용**할 수 있도록 설계되어 있습니다. 이미 쓰고 있는 양식이 있다면, 동일한 항목 구조로 복사/편집해 자연스럽게 적용할 수 있습니다.",
      },
      {
        id: 3,
        question: "현장에서 출력·비치해서 쓰는 것도 가능한가요?",
        answer: "가능합니다. 작업허가서 첨부, 현장 비치, 협력사 공유처럼 \"인쇄 기반 운영\"이 필요한 현장도 고려했습니다. 현장 운영 방식에 따라 출력본을 사용하고, 내부 보관은 파일로 관리하는 식의 혼합 운영도 가능합니다.",
      },
    ],
  },
  {
    id: "operation",
    name: "운영",
    faqs: [
      {
        id: 1,
        question: "우리 회사에 맞는지 가장 빠르게 확인하는 방법은 뭔가요?",
        answer: "가장 자주 하는 작업 1~3개를 선정해 실제 문서를 만들어보는 것이 가장 빠릅니다. 그 다음을 확인하면 됩니다.\n\n- 내부 검토 기준(필수 항목/표현)에 맞게 수정 가능한가\n- 출력·보관 방식이 현재 프로세스에 자연스럽게 붙는가\n- 현장 사용자들이 입력을 부담 없이 할 수 있는가",
      },
      {
        id: 2,
        question: "도입은 어떻게 시작하는 게 좋나요?",
        answer: "\"전사 도입\"보다 **작게 시작해 확산**하는 방식이 안전합니다. 대표 작업으로 운영해보면서 입력 가이드(예: 작업명 표준, 필수 입력 항목)와 최소 운영 규칙(작성/검토 책임)을 정리하면, 이후 현장 확대가 훨씬 수월해집니다.",
      },
      {
        id: 3,
        question: "모바일/태블릿 사용도 고려할 수 있나요?",
        answer: "현장 상황에 따라 충분히 고려할 수 있습니다. 다만 일부 사업장은 안전·보안 규정으로 현장 내 기기 사용이 제한될 수 있으므로, 실제 운영에서는 \"현장 작성\"과 \"휴게공간/사무공간 작성\" 중 어떤 방식이 적합한지부터 정하는 것을 권장합니다.",
      },
    ],
  },
  {
    id: "security",
    name: "보안",
    faqs: [
      {
        id: 1,
        question: "우리 회사 데이터를 맡겨도 괜찮을까요?",
        answer: "서비스는 AWS 기반 환경에서 운영되며, 고객 데이터 보호를 최우선 원칙으로 설계·운영합니다. 기업 환경에서 안심하고 사용할 수 있도록 접근 권한과 운영 통제를 강화하는 방향으로 보안 체계를 유지합니다.",
      },
      {
        id: 2,
        question: "데이터는 어떻게 보호되나요?",
        answer: "데이터는 저장되거나 이동하는 과정에서 암호화되어 보호되도록 설계되어 있습니다. 또한 승인된 사용자만 필요한 범위에서 접근할 수 있도록 권한을 엄격히 관리합니다.",
      },
      {
        id: 3,
        question: "우리 회사 보안 기준에 맞춰 운영할 수 있나요?",
        answer: "가능합니다. 조직의 보안 정책에 맞춰 \"어떤 정보를 입력해도 되는지\", \"누가 작성/열람/공유할 수 있는지\", \"결과물을 어디에 보관할지\"를 기준으로 운영 가이드를 정리해 적용할 수 있습니다.",
      },
    ],
  },
];

export default function FAQContactSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("service");
  
  const currentCategory = faqCategories.find((cat) => cat.id === selectedCategory) || faqCategories[0];

  return (
    <section id="faq" className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary mb-0">
              자주 묻는 질문
            </h2>
          </motion.div>

          {/* Category Tags */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-12 md:mb-16"
          >
            <div className="flex flex-wrap justify-center gap-3 px-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-all active:scale-[0.96] ${
                    selectedCategory === category.id
                      ? "bg-brand-blue text-white shadow-md"
                      : "bg-bg-input text-text-secondary hover:bg-brand-blue-light hover:text-brand-blue"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ List - Always Visible */}
          <motion.div
            key={selectedCategory}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-0 space-y-6"
          >
            {currentCategory.faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-bg-surface rounded-card p-6 md:p-8 shadow-sm"
              >
                <h3 className="text-[18px] md:text-[20px] font-semibold text-text-primary mb-4">
                  {faq.question}
                </h3>
                <div className="text-[16px] md:text-[17px] font-medium text-text-secondary leading-relaxed whitespace-pre-line">
                  {parseMarkdown(faq.answer)}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
  );
}
