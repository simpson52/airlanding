"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

export default function ServiceIntroCardSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto rounded-[20px] bg-white p-8 md:p-10 text-center"
        >
          <div className="text-[15px] md:text-[32px] font-bold text-text-primary leading-relaxed break-keep">
            <span className="block">본 서비스는 (주)GS가 <span className="text-brand-blue">상생 협력의 가치</span>를 담아,</span>
            <span className="block mt-1 md:mt-0">중소기업의 <span className="text-brand-blue font-semibold">AI 기반 안전관리</span>를 보다 체계적으로 구축할 수 있도록 돕는 사회공헌활동입니다.</span>
            <span className="block mt-6 md:mt-8 text-[14px] md:text-[30px] font-medium">한정된 자원으로 인해 이번 차수에는</span>
            <span className="block mt-1 md:mt-0 text-[14px] md:text-[30px] font-medium"><span className="font-bold text-text-primary">일부 사업장을 우선 선정</span>하여 <span className="font-bold text-brand-blue">무상 보급</span>하고 있습니다.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
