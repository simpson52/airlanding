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
          <div className="text-[15px] md:text-[32px] font-bold text-text-primary leading-relaxed break-keep" />
        </motion.div>
      </div>
    </section>
  );
}
