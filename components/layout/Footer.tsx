"use client";

import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-gray-100 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/miso-logo.svg"
                alt="MISO"
                width={120}
                height={32}
                className="h-[28px] md:h-[32px] w-auto flex-shrink-0"
                priority
                unoptimized
              />
              <Image
                src="/air-logo.png"
                alt="AIR"
                width={108}
                height={29}
                className="h-[25px] md:h-[29px] w-auto flex-shrink-0"
                priority
              />
              <span className="text-[18px] md:text-[19px] font-semibold text-text-secondary leading-tight whitespace-nowrap">
                AI기반 위험성 평가 솔루션
              </span>
            </div>
            <p className="text-[17px] font-medium text-text-secondary">
              GS가 만든<br />
              MISO AI기반 위험성 평가 솔루션
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-[18px] font-semibold text-text-primary mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-blue-light rounded-input flex items-center justify-center">
                  <Mail className="w-4 h-4 text-brand-blue" strokeWidth={2} />
                </div>
                <a
                  href="mailto:jhshim@gs.co.kr"
                  className="text-[15px] font-medium text-brand-blue hover:underline transition-colors"
                >
                  jhshim@gs.co.kr
                </a>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-blue-light rounded-input flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-brand-blue" strokeWidth={2} />
                </div>
                <p className="text-[15px] font-medium text-text-primary">
                  서울특별시 강남구 논현로 508 GS강남타워 25층
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="mb-8">
          <a href="https://miso.gs" target="_blank" rel="noopener noreferrer" className="block cursor-pointer hover:opacity-90 transition-opacity">
            <img
              src="/banner.png"
              alt="MISO와 함께 내 업무에 AI를 적용해보세요!"
              className="w-full h-auto object-contain block"
              onError={(e) => {
                // 이미지가 없을 경우를 대비한 fallback
                console.warn("Banner image not found at /banner.png");
              }}
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[14px] text-text-tertiary">© {new Date().getFullYear()}</span>
            <Image
              src="/miso-logo.svg"
              alt="MISO"
              width={80}
              height={16}
              className="h-[16px] w-auto inline-block"
              unoptimized
            />
            <span className="text-[14px] text-text-tertiary">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
