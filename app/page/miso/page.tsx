"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/ui/StickyCTA";
import { extractYouTubeVideoId } from "@/utils/youtube";
import { useState, useEffect } from "react";
import { Monitor, RefreshCw, MessageCircle } from "lucide-react";

interface CaseStudy {
  id: number;
  title: string;
  thumbnail: string;
  thumbnailText: string;
  company: string;
  description: string;
  detailsLink: string;
}

export default function MisoPage() {
  const youtubeUrl = "https://youtu.be/67MlM2dUlN8?si=KPubguI5xsmJy1jY";
  const videoId = extractYouTubeVideoId(youtubeUrl) || "67MlM2dUlN8";

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([
    {
      id: 1,
      title: "파르나스 AI 디자이너, 파카소",
      thumbnail: "",
      thumbnailText: "클릭 몇 번이면 누구나 피카소! 브랜드에 딱 맞는 이미지 제작",
      company: "파르나스 호텔",
      description:
        "파르나스 호텔에서 브랜드에 맞는 이미지를 빠르게 제작하기 위해 MISO의 AI 디자인 도구를 활용했습니다. 복잡한 디자인 작업을 간단한 클릭 몇 번으로 완성할 수 있게 되었습니다.",
      detailsLink: "https://misoblog.oopy.io/1f3f800b-d1c1-80c9-a199-e235307ac7e3",
    },
    {
      id: 2,
      title: "안전을 위한 필수 절차를 손쉽게",
      thumbnail: "",
      thumbnailText: "AI로 위험성 평가서는 3분만에 현장은 더 안전하게",
      company: "GS파워",
      description:
        "GS파워에서 위험성 평가서 작성 시간을 대폭 단축하고 안전 관리 효율을 높이기 위해 MISO의 AI 기반 위험성 평가 도구를 도입했습니다. 복잡한 절차를 간소화하여 현장 안전을 더욱 강화했습니다.",
      detailsLink: "https://misoblog.oopy.io/1cdf800b-d1c1-81cf-9c19-dd5b3ea4d4ea",
    },
    {
      id: 3,
      title: "무역의 기본 백투백 계약서",
      thumbnail: "",
      thumbnailText: "'틀린 그림 찾기'보다 어려운 백투백 계약서 비교",
      company: "GS글로벌",
      description:
        "GS글로벌에서 복잡한 백투백 계약서를 효율적으로 비교하고 분석하기 위해 MISO의 AI 문서 분석 도구를 활용했습니다. 수작업으로는 불가능했던 대량의 계약서 검토를 자동화했습니다.",
      detailsLink: "https://misoblog.oopy.io/1cdf800b-d1c1-811d-b814-db1f5c0f41e5",
    },
  ]);

  // 각 케이스 스터디의 미리보기 이미지 가져오기
  useEffect(() => {
    const fetchThumbnails = async () => {
      const initialStudies = [
        {
          id: 1,
          title: "파르나스 AI 디자이너, 파카소",
          thumbnail: "",
          thumbnailText: "클릭 몇 번이면 누구나 피카소! 브랜드에 딱 맞는 이미지 제작",
          company: "파르나스 호텔",
          description:
            "파르나스 호텔에서 브랜드에 맞는 이미지를 빠르게 제작하기 위해 MISO의 AI 디자인 도구를 활용했습니다. 복잡한 디자인 작업을 간단한 클릭 몇 번으로 완성할 수 있게 되었습니다.",
          detailsLink: "https://misoblog.oopy.io/1f3f800b-d1c1-80c9-a199-e235307ac7e3",
        },
        {
          id: 2,
          title: "안전을 위한 필수 절차를 손쉽게",
          thumbnail: "",
          thumbnailText: "AI로 위험성 평가서는 3분만에 현장은 더 안전하게",
          company: "GS파워",
          description:
            "GS파워에서 위험성 평가서 작성 시간을 대폭 단축하고 안전 관리 효율을 높이기 위해 MISO의 AI 기반 위험성 평가 도구를 도입했습니다. 복잡한 절차를 간소화하여 현장 안전을 더욱 강화했습니다.",
          detailsLink: "https://misoblog.oopy.io/1cdf800b-d1c1-81cf-9c19-dd5b3ea4d4ea",
        },
        {
          id: 3,
          title: "무역의 기본 백투백 계약서",
          thumbnail: "",
          thumbnailText: "'틀린 그림 찾기'보다 어려운 백투백 계약서 비교",
          company: "GS글로벌",
          description:
            "GS글로벌에서 복잡한 백투백 계약서를 효율적으로 비교하고 분석하기 위해 MISO의 AI 문서 분석 도구를 활용했습니다. 수작업으로는 불가능했던 대량의 계약서 검토를 자동화했습니다.",
          detailsLink: "https://misoblog.oopy.io/1cdf800b-d1c1-811d-b814-db1f5c0f41e5",
        },
      ];

      const updatedStudies = await Promise.all(
        initialStudies.map(async (study) => {
          if (study.thumbnail) return study; // 이미 썸네일이 있으면 스킵

          try {
            const response = await fetch(
              `/api/case-study-preview?url=${encodeURIComponent(study.detailsLink)}`
            );
            if (response.ok) {
              const data = await response.json();
              if (data.imageUrl) {
                return { ...study, thumbnail: data.imageUrl };
              }
            }
          } catch (error) {
            console.error(`Failed to fetch thumbnail for ${study.title}:`, error);
          }
          return study;
        })
      );
      setCaseStudies(updatedStudies);
    };

    fetchThumbnails();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <NavigationBar />
      <div className="pt-[54px]">
        {/* 섹션 1: 상단 도입 섹션 (Hero) */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 좌측: 텍스트 콘텐츠 */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="space-y-6"
            >
              {/* 메인 헤드라인 */}
              <div>
                <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold text-text-primary mb-4 leading-tight">
                  우리 회사를 위한
                  <br />
                  AI PlayGround
                  <br />
                  <Image
                    src="/miso-logo.svg"
                    alt="MISO"
                    width={156}
                    height={52}
                    className="h-[42px] md:h-[52px] lg:h-[62px] w-auto inline-block mt-2"
                  />
                </h1>
              </div>

              {/* 부제목 */}
              <p className="text-[20px] md:text-[24px] font-semibold text-text-primary">
                함께 만드는 진짜 AI Transformation
              </p>

              {/* 설명 텍스트 */}
              <p className="text-[17px] md:text-[18px] font-medium text-text-secondary leading-relaxed">
                GS그룹이 만든 비개발자를 위한 현장 맞춤형 AI 플랫폼
              </p>

              {/* CTA 버튼 */}
              <div className="pt-4">
                <Button
                  variant="primary"
                  className="!px-8 !py-4 text-[18px] !bg-text-primary hover:!bg-text-primary/90"
                  fullWidth={false}
                >
                  미소 소개 자료 신청 &gt;
                </Button>
              </div>
            </motion.div>

            {/* 우측: YouTube 비디오 */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative w-full"
            >
              {/* YouTube 비디오 임베드 */}
              <div className="relative w-full aspect-video rounded-[20px] overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/20 shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?si=KPubguI5xsmJy1jY`}
                  title="[52g] MISO를 소개합니다."
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 구분선 */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="border-t border-gray-200 w-full max-w-3xl mx-auto" />
        </div>

        {/* 섹션 2: 중간 팀 업무 활용 섹션 */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center space-y-6"
          >
            {/* 제목 */}
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-brand-blue leading-tight">
              우리 팀 업무에도 GenAI를 활용할 수 있을까요?
            </h2>

            {/* 설명 텍스트 */}
            <p className="text-[18px] md:text-[20px] font-medium text-text-primary">
              보고서 요약, 계약서 분석, 회의록 정리, 반복되는 수작업
            </p>

            {/* 강조 텍스트 */}
            <p className="text-[20px] md:text-[24px] font-semibold text-brand-blue">
              MISO와 함께 일하는 방식을 바꿔보세요.
            </p>
          </motion.div>
        </section>

        {/* 구분선 */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="border-t border-gray-200 w-full max-w-3xl mx-auto" />
        </div>

        {/* 섹션 3: 미소 앱 유형 */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-12"
          >
            {/* 섹션 제목 */}
            <div className="text-center space-y-4">
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold bg-gradient-to-r from-brand-blue to-brand-blue/70 bg-clip-text text-transparent">
                미소 앱 유형
              </h2>
              <div className="space-y-2">
                <p className="text-[17px] md:text-[18px] font-medium text-text-primary">
                  목적에 맞는 AI 앱을 선택하세요
                </p>
              </div>
            </div>

            {/* 앱 유형 카드 그리드 */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* 에이전트 앱 */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* 상단 빨간색 액센트 라인 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-red-500" />
                
                {/* 번호 (좌측 상단) */}
                <div className="absolute top-6 left-6 text-[72px] md:text-[96px] font-bold text-gray-100 leading-none z-0">
                  01
                </div>
                
                {/* 아이콘 (우측 상단) */}
                <div className="relative z-10 flex justify-end mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-red-500" strokeWidth={2.5} />
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="text-[22px] md:text-[24px] font-bold text-text-primary mb-2">
                      에이전트 앱
                    </h3>
                    <p className="text-[16px] md:text-[17px] font-medium text-text-secondary">
                      대화형 AI 비서
                    </p>
                  </div>

                  <p className="text-[15px] md:text-[16px] font-medium text-text-secondary leading-relaxed">
                    클릭 몇 번으로 나만의 AI 비서를 만듭니다. 질문에 답하고, 문서를 요약하고, 아이디어를 제안합니다.
                  </p>
                </div>

                {/* 일러스트레이션 영역 (하단) */}
                <div className="relative z-10 mt-6 h-[166px] rounded-[16px] overflow-hidden">
                  <Image
                    src="/agent-app.png"
                    alt="에이전트 앱 일러스트레이션"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </motion.div>

              {/* 워크플로우 앱 */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* 상단 초록색 액센트 라인 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-500" />
                
                {/* 번호 (좌측 상단) */}
                <div className="absolute top-6 left-6 text-[72px] md:text-[96px] font-bold text-gray-100 leading-none z-0">
                  02
                </div>
                
                {/* 아이콘 (우측 상단) */}
                <div className="relative z-10 flex justify-end mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-green-500" strokeWidth={2.5} />
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="text-[22px] md:text-[24px] font-bold text-text-primary mb-2">
                      워크플로우 앱
                    </h3>
                    <p className="text-[16px] md:text-[17px] font-medium text-text-secondary">
                      자동화된 업무 파이프라인
                    </p>
                  </div>

                  <p className="text-[15px] md:text-[16px] font-medium text-text-secondary leading-relaxed">
                    여러 작업을 하나로 연결합니다. 트리거 한 번이면 수집, 분석, 리포트까지 자동으로 완료됩니다.
                  </p>
                </div>

                {/* 일러스트레이션 영역 (하단) */}
                <div className="relative z-10 mt-6 h-[166px] rounded-[16px] overflow-hidden">
                  <Image
                    src="/workflow-app.png"
                    alt="워크플로우 앱 일러스트레이션"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </motion.div>

              {/* 챗플로우 앱 */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* 상단 파란색 액센트 라인 */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
                
                {/* 번호 (좌측 상단) */}
                <div className="absolute top-6 left-6 text-[72px] md:text-[96px] font-bold text-gray-100 leading-none z-0">
                  03
                </div>
                
                {/* 아이콘 (우측 상단) */}
                <div className="relative z-10 flex justify-end mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-500" strokeWidth={2.5} />
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="text-[22px] md:text-[24px] font-bold text-text-primary mb-2">
                      챗플로우 앱
                    </h3>
                    <p className="text-[16px] md:text-[17px] font-medium text-text-secondary">
                      대화로 진행하는 워크플로우
                    </p>
                  </div>

                  <p className="text-[15px] md:text-[16px] font-medium text-text-secondary leading-relaxed">
                    복잡한 절차도 대화하듯 진행합니다. 단계별 질문과 선택으로 자연스럽게 업무를 완료합니다.
                  </p>
                </div>

                {/* 일러스트레이션 영역 (하단) */}
                <div className="relative z-10 mt-6 h-[166px] rounded-[16px] overflow-hidden">
                  <Image
                    src="/chatflow-app.png"
                    alt="챗플로우 앱 일러스트레이션"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 구분선 */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="border-t border-gray-200 w-full max-w-3xl mx-auto" />
        </div>

        {/* 섹션 4: 하단 성공 사례 섹션 (Case Study) */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-12"
          >
            {/* 섹션 제목 */}
            <div className="text-center space-y-4">
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold bg-gradient-to-r from-brand-blue to-brand-blue/70 bg-clip-text text-transparent">
                Case Study
              </h2>
              <div className="space-y-2">
                <p className="text-[17px] md:text-[18px] font-medium text-text-primary">
                  문제 발굴부터 프로토타입 제작, 다양한 AI 도구 활용까지
                </p>
                <p className="text-[17px] md:text-[18px] font-medium text-text-secondary">
                  현장 구성원들이 스스로 AI를 업무에 적용하는 과정에서의 고민과 배움을 나눕니다.
                </p>
              </div>
            </div>

            {/* 성공 사례 카드 그리드 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* 썸네일 이미지 */}
                  <div className="relative w-full aspect-video bg-gradient-to-br from-brand-blue/20 to-brand-blue-light/30 overflow-hidden">
                    {/* 실제 이미지 */}
                    {study.thumbnail ? (
                      <Image
                        src={study.thumbnail}
                        alt={study.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      /* 플레이스홀더 배경 */
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-blue-light/30" />
                    )}
                    
                    {/* MISO 로고 위치 (하단 오른쪽) */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <div className="bg-black/30 backdrop-blur-sm rounded-md p-1.5">
                        <Image
                          src="/miso-logo.svg"
                          alt="MISO"
                          width={40}
                          height={20}
                          className="opacity-90"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 카드 내용 */}
                  <div className="p-6 space-y-4">
                    {/* 제목 */}
                    <h3 className="text-[20px] md:text-[22px] font-bold text-text-primary leading-tight">
                      {study.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-[15px] md:text-[16px] font-medium text-text-secondary leading-relaxed line-clamp-3">
                      {study.description}
                    </p>

                    {/* See Details 링크 */}
                    <Link
                      href={study.detailsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[15px] font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors"
                    >
                      See Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
      <StickyCTA />
    </main>
  );
}
