"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import CTAModal from "@/components/ui/CTAModal";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const router = useRouter();
  const [isCTAModalOpen, setIsCTAModalOpen] = useState(false);

  const handleCTAClick = () => setIsCTAModalOpen(true);
  const handleMemberClick = () => {
    window.open("https://miso-powered-jsa.vercel.app/login", "_blank");
    setIsCTAModalOpen(false);
  };
  const handleNewUserClick = () => {
    setIsCTAModalOpen(false);
    router.push("/form");
  };

  return (
    <main className="min-h-screen bg-bg-base">
      <NavigationBar onCTAClick={handleCTAClick} />
      <CTAModal
        isOpen={isCTAModalOpen}
        onClose={() => setIsCTAModalOpen(false)}
        onMemberClick={handleMemberClick}
        onNewUserClick={handleNewUserClick}
      />
      <div className="pt-[54px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-text-secondary">
              문의사항이 있으시면 언제든지 연락주세요
            </p>
          </div>

          {/* Two Column Layout: Company Info Card (Left) + Google Maps (Right) */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left: Company Info Card */}
            <div className="bg-bg-surface rounded-card shadow-sm p-8 md:p-12">
            {/* Contact Information */}
            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-blue-light rounded-input flex items-center justify-center">
                  <Mail className="w-4 h-4 text-brand-blue" strokeWidth={2} />
                </div>
                <a
                  href="mailto:jhshim@gs.co.kr"
                  className="text-lg font-medium text-brand-blue hover:underline transition-colors"
                >
                  jhshim@gs.co.kr
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-blue-light rounded-input flex items-center justify-center mt-0.5">
                  <MapPin className="w-4 h-4 text-brand-blue" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-text-primary mb-3">
                    서울특별시 강남구 논현로 508 GS강남타워 25층
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-text-secondary mb-1.5">지하철</p>
                      <p className="text-sm text-text-tertiary">
                        2호선 역삼역 7번 출구 지하 GS타워 연결통로 이용
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-secondary mb-1.5">버스</p>
                      <div className="space-y-1">
                        <p className="text-sm text-text-tertiary">
                          간선/순환 : 146, 147, 341, 360, 740, 41
                        </p>
                        <p className="text-sm text-text-tertiary">
                          직행/급행 : 1100, 1700, 2000, 7007, 8001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 소개 자료 다운로드 버튼 */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button
                variant="primary"
                className="w-full !py-4 text-[18px] flex items-center justify-center gap-2 whitespace-nowrap"
                onClick={() => {
                  window.open(
                    "https://drive.google.com/file/d/12ok68i_OztN7172ZKhl7-8LeYf5ITkYJ/view?usp=drive_link",
                    "_blank"
                  );
                }}
              >
                <Image
                  src="/air-logo 1_white.png"
                  alt="AIR"
                  width={24}
                  height={24}
                  className="h-6 w-auto flex-shrink-0"
                  quality={100}
                  unoptimized
                />
                <span>소개 자료 다운로드</span>
              </Button>
            </div>
            </div>

            {/* Right: Google Maps */}
            <div className="bg-bg-surface rounded-card shadow-sm overflow-hidden h-full min-h-[500px]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent("서울특별시 강남구 논현로 508 GS강남타워")}&output=embed&hl=ko&zoom=16`}
                width="100%"
                height="100%"
                style={{ minHeight: "500px", border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="회사 위치"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-bg-input rounded-card p-6 md:p-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              문의 안내
            </h2>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-brand-blue mt-1">•</span>
                <span>제품 문의, 데모 신청, 기술 지원 등 다양한 문의사항을 접수받고 있습니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-blue mt-1">•</span>
                <span>이메일로 연락주시면 빠른 시일 내에 답변드리겠습니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-blue mt-1">•</span>
                <span>방문 상담을 원하시는 경우 사전에 연락주시면 더욱 원활한 상담이 가능합니다.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

