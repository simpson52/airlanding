"use client";

import { useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly children: ReactNode;
  readonly title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ 
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1] // Custom easing for smooth feel
              }}
              className="relative w-full max-w-lg max-h-[90vh] bg-bg-surface rounded-[32px] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Content - 스크롤 가능 */}
              <div className="overflow-y-auto max-h-[90vh]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
