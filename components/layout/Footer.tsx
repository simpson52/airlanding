"use client";

import { Globe, Youtube, Mail } from "lucide-react";
import MisoLogo from "@/components/ui/MisoLogo";

export default function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-gray-100 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <MisoLogo
                height="h-[28px] md:h-[32px]"
                alt="MISO Platform"
                fallbackText="MISO Platform"
                className="flex-shrink-0"
              />
              <span className="text-[18px] md:text-[19px] font-semibold text-text-secondary leading-tight whitespace-nowrap">
                AI 위험성 평가서 <span className="font-bold text-text-primary">AIR</span>
              </span>
            </div>
            <p className="text-[17px] font-medium text-text-secondary">
              GS그룹이 만든<br />
              MISO AI기반 위험성 평가 솔루션
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[18px] font-semibold text-text-primary mb-6">
              소셜 미디어
            </h4>
            <div className="flex gap-4">
              <a
                href="https://miso.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-bg-input rounded-full flex items-center justify-center text-text-secondary hover:text-brand-blue hover:bg-brand-blue-light transition-colors"
                aria-label="공식 홈페이지"
              >
                <Globe className="w-5 h-5" strokeWidth={2.5} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-bg-input rounded-full flex items-center justify-center text-text-secondary hover:text-brand-blue hover:bg-brand-blue-light transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" strokeWidth={2.5} />
              </a>
              <a
                href="mailto:contact@miso.ai"
                className="w-12 h-12 bg-bg-input rounded-full flex items-center justify-center text-text-secondary hover:text-brand-blue hover:bg-brand-blue-light transition-colors"
                aria-label="이메일"
              >
                <Mail className="w-5 h-5" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[14px] text-text-tertiary">© {new Date().getFullYear()}</span>
            <MisoLogo
              height="h-[16px]"
              alt="MISO Platform"
              fallbackText="MISO Platform"
              className="inline-block"
            />
            <span className="text-[14px] text-text-tertiary">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
