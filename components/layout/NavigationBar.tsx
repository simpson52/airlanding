"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  isScroll?: boolean;
  scrollToId?: string;
}

const navLinks: NavLink[] = [
  { label: "Contact Us", href: "/page/contact" },
];

interface NavigationBarProps {
  readonly onCTAClick?: () => void;
}

export default function NavigationBar({ onCTAClick }: NavigationBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleScrollClick = (id: string) => {
    // 이미 랜딩 페이지에 있으면 바로 스크롤
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    
    // 현재 경로가 랜딩 페이지가 아니면 랜딩 페이지로 이동 후 스크롤
    router.push("/");
    // 페이지 전환 후 스크롤
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-md"
          : "bg-white/90 backdrop-blur-md shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-[54px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={handleHomeClick}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/air-logo.png"
                alt="AIR"
                width={108}
                height={24}
                className="h-[22px] md:h-[24px] w-auto flex-shrink-0"
                priority
              />
              <span className="text-[15px] md:text-[16px] font-semibold text-text-secondary leading-tight whitespace-nowrap">
                AI기반 위험성 평가 솔루션
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              if (link.isScroll && link.scrollToId) {
                return (
                  <button
                    key={link.href}
                    onClick={() => handleScrollClick(link.scrollToId!)}
                    className="text-[14px] font-medium text-text-secondary hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] font-medium text-text-secondary hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <Button 
              variant="primary" 
              className="ml-5 !px-4 !py-1.5 text-[14px] !h-auto flex items-center justify-center gap-1.5"
              onClick={onCTAClick}
            >
              <Image
                src="/air-logo 1_white.png"
                alt="AIR"
                width={16}
                height={16}
                className="h-4 w-auto"
                quality={100}
                unoptimized
              />
              위험성 평가하기
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1.5 text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={2.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2.5} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-100"
          >
            {navLinks.map((link) => {
              if (link.isScroll && link.scrollToId) {
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      handleScrollClick(link.scrollToId!);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block py-2.5 text-[14px] font-medium text-text-secondary hover:text-brand-blue transition-colors w-full text-left"
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2.5 text-[14px] font-medium text-text-secondary hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4">
              <Button 
                variant="primary" 
                fullWidth 
                onClick={onCTAClick}
                className="flex items-center justify-center gap-2"
              >
                <Image
                  src="/air-logo 1_white.png"
                  alt="AIR"
                  width={20}
                  height={20}
                  className="h-5 w-auto"
                  quality={100}
                  unoptimized
                />
                위험성 평가하기
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
