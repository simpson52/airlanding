"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import MisoLogo from "@/components/ui/MisoLogo";
import { Menu, X } from "lucide-react";
import { useContentView } from "@/contexts/ContentViewContext";

interface NavLink {
  label: string;
  href: string;
  is52g?: boolean;
  isMiso?: boolean;
}

const navLinks: NavLink[] = [
  { label: "with 52g", href: "#52g", is52g: true },
  { label: "About MISO", href: "#miso", isMiso: true },
  { label: "Contact Us", href: "/page/contact" },
];

export default function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentView, setCurrentView } = useContentView();
  const router = useRouter();

  const handleHomeClick = () => {
    setCurrentView("landing");
    router.push("/");
  };

  const handleMisoClick = () => {
    setCurrentView("miso");
    router.push("/");
  };

  const handle52gClick = () => {
    setCurrentView("52g");
    router.push("/");
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
              <MisoLogo
                height="h-[24px] md:h-[27px]"
                alt="MISO Platform"
                fallbackText="MISO Platform"
                className="flex-shrink-0"
              />
              <span className="text-[15px] md:text-[16px] font-semibold text-text-secondary leading-tight whitespace-nowrap">
                AI 위험성 평가서 <span className="font-bold text-text-primary">AIR</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={handleHomeClick}
              className={`text-[14px] font-medium transition-colors ${
                currentView === "landing"
                  ? "text-brand-blue"
                  : "text-text-secondary hover:text-brand-blue"
              }`}
            >
              HOME
            </button>
            {navLinks.map((link) => {
              if (link.isMiso) {
                return (
                  <button
                    key={link.href}
                    onClick={handleMisoClick}
                    className={`text-[14px] font-medium transition-colors ${
                      currentView === "miso"
                        ? "text-brand-blue"
                        : "text-text-secondary hover:text-brand-blue"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }
              if (link.is52g) {
                return (
                  <button
                    key={link.href}
                    onClick={handle52gClick}
                    className={`text-[14px] font-medium transition-colors ${
                      currentView === "52g"
                        ? "text-brand-blue"
                        : "text-text-secondary hover:text-brand-blue"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setCurrentView("landing")}
                  className="text-[14px] font-medium text-text-secondary hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <Button 
              variant="primary" 
              className="ml-5 !px-4 !py-1.5 text-[14px] !h-auto"
            >
              시작하기
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
            <button
              onClick={() => {
                handleHomeClick();
                setIsMobileMenuOpen(false);
              }}
              className={`block py-2.5 text-[14px] font-medium transition-colors w-full text-left ${
                currentView === "landing"
                  ? "text-brand-blue"
                  : "text-text-secondary hover:text-brand-blue"
              }`}
            >
              HOME
            </button>
            {navLinks.map((link) => {
              if (link.isMiso) {
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      handleMisoClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block py-2.5 text-[14px] font-medium transition-colors w-full text-left ${
                      currentView === "miso"
                        ? "text-brand-blue"
                        : "text-text-secondary hover:text-brand-blue"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }
              if (link.is52g) {
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      handle52gClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block py-2.5 text-[14px] font-medium transition-colors w-full text-left ${
                      currentView === "52g"
                        ? "text-brand-blue"
                        : "text-text-secondary hover:text-brand-blue"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setCurrentView("landing");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block py-2.5 text-[14px] font-medium text-text-secondary hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4">
              <Button variant="primary" fullWidth>
                시작하기
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
