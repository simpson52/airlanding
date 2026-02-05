"use client";

import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {

  return (
    <main className="min-h-screen bg-bg-base">
      <NavigationBar />
      <div className="pt-[54px]">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="bg-bg-surface rounded-[24px] p-8 md:p-12 lg:p-16 shadow-sm text-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-brand-blue-light rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-brand-blue" strokeWidth={2.5} />
            </div>
            <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-4">
              신청이 완료되었습니다
            </h1>
            <p className="text-[17px] md:text-[18px] font-medium text-text-secondary leading-relaxed">
              참가 신청이 정상적으로 접수되었습니다.
              <br />
              <br />
              빠른 시일 내에 담당자가 연락드리겠습니다.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
