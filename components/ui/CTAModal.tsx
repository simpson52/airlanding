"use client";

import Modal from "./Modal";
import Button from "./Button";
import { X } from "lucide-react";

interface CTAModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onMemberClick: () => void;
  readonly onNewUserClick: () => void;
}

export default function CTAModal({
  isOpen,
  onClose,
  onMemberClick,
  onNewUserClick,
}: CTAModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="py-6 md:py-8 px-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-[0.96]"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-text-secondary" strokeWidth={2.5} />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[32px] md:text-[40px]">👋</span>
            <h2 className="text-[28px] md:text-[32px] font-bold text-text-primary">
              반가워요!
            </h2>
          </div>
          <p className="text-[17px] md:text-[18px] font-medium text-text-secondary mb-6">
            서비스 이용을 위해 현재 상태를 선택해 주세요.
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-3 px-4 max-w-[85%] mx-auto">
            <Button
              variant="primary"
              onClick={onMemberClick}
              className="!py-4 !text-[18px] !flex-1 !w-0 !min-w-0 !px-0"
            >
              이미 회원이에요
            </Button>
            <Button
              variant="secondary"
              onClick={onNewUserClick}
              className="!py-4 !text-[18px] !flex-1 !w-0 !min-w-0 !px-0"
            >
              처음이에요
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
