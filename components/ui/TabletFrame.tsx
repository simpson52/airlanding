"use client";

import { ReactNode } from "react";

interface TabletFrameProps {
  children: ReactNode;
  title?: string;
}

/**
 * MISO 브랜드 태블릿 프레임 컴포넌트
 * iframe을 표시할 때 사용하는 MISO 브랜드 전용 프레임 스타일
 */
export default function TabletFrame({ children, title }: TabletFrameProps) {
  return (
    <div className="w-full py-12 md:py-16 px-4 md:px-8 bg-bg-base" style={{ minHeight: "calc(100vh - 54px)" }}>
      <div className="max-w-7xl mx-auto">
        {/* 태블릿 프레임 컨테이너 */}
        <div className="relative mx-auto" style={{ maxWidth: "1200px" }}>
          {/* 태블릿 프레임 */}
          <div
            className="relative bg-bg-surface rounded-[32px] shadow-2xl overflow-hidden"
            style={{
              padding: "12px",
              background: "linear-gradient(135deg, #E8E5FF 0%, #FFFFFF 100%)",
              boxShadow: "0 20px 60px rgba(85, 66, 246, 0.15), 0 0 0 1px rgba(85, 66, 246, 0.1)",
            }}
          >
            {/* 상단 베젤 */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-brand-blue/10 to-transparent z-10 pointer-events-none" />

            {/* iframe 영역 */}
            <div
              className="relative rounded-[24px] overflow-hidden bg-white"
              style={{
                aspectRatio: "16/9",
                minHeight: "600px",
                boxShadow: "inset 0 0 0 1px rgba(85, 66, 246, 0.1)",
              }}
            >
              {children}
            </div>

            {/* 하단 베젤 */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-brand-blue/10 to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
