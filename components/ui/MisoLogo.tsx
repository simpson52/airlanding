"use client";

import { useState } from "react";
import Image from "next/image";

interface MisoLogoProps {
  className?: string;
  height?: string;
  alt?: string;
  fallbackText?: string;
}

export default function MisoLogo({
  className = "",
  height = "h-[32px]",
  alt = "MISO Platform",
  fallbackText = "MISO Platform",
}: MisoLogoProps) {
  const [logoError, setLogoError] = useState(false);

  // 이미지 로드 실패 시 fallback 텍스트 표시
  if (logoError) {
    return (
      <span className={`text-[18px] md:text-[20px] font-bold text-text-primary ${className}`}>
        {fallbackText}
      </span>
    );
  }

  // 이미지 표시
  return (
    <Image
      src="/miso-logo.svg"
      alt={alt}
      width={120}
      height={32}
      className={`${height} w-auto object-contain ${className}`}
      onError={() => setLogoError(true)}
      priority
      unoptimized
    />
  );
}
