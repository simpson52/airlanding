"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { X } from "lucide-react";

interface FormData {
  company: string;
  email: string;
  inquiry: string;
  under100Workplace: "" | "yes" | "no";
  privacyAgreement: boolean;
}

interface FormErrors {
  company?: string;
  email?: string;
  inquiry?: string;
  under100Workplace?: string;
  privacyAgreement?: string;
}

export default function FormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    company: "",
    email: "",
    inquiry: "",
    under100Workplace: "",
    privacyAgreement: false,
  });
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = "회사명을 입력해주세요";
    }
    if (!formData.email.trim()) {
      newErrors.email = "회사 이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 회사 이메일 형식을 입력해주세요";
    }
    if (formData.under100Workplace !== "yes" && formData.under100Workplace !== "no") {
      newErrors.under100Workplace = "예 또는 아니오를 선택해주세요";
    }
    if (!formData.privacyAgreement) {
      newErrors.privacyAgreement = "개인정보 수집 및 처리방침에 동의해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        under100Workplace: formData.under100Workplace === "yes",
      };
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "제출에 실패했습니다. 다시 시도해주세요.");
      }

      // 성공 시 감사 페이지로 이동
      router.push("/form/thank-you");
    } catch (error) {
      console.error("제출 오류:", error);
      alert(error instanceof Error ? error.message : "제출에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <NavigationBar />
      <div className="pt-[54px]">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-16"
          >
            <div className="mb-12 text-center">
              <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary leading-tight mb-6">
                사용 신청하기
              </h1>
              <div className="space-y-4">
                <p className="text-[16px] md:text-[17px] font-semibold text-text-primary leading-relaxed">
                  본 서비스는 (주)GS가 상생 협력의 가치를 담아,
                  <br />
                  중소기업의 AI 기반 안전관리를 보다 체계적으로 구축할 수 있도록 돕는 사회공헌활동입니다.
                </p>
                <div className="w-full max-w-xl mx-auto rounded-[20px] bg-white border-2 border-[#5541f6] p-5 md:p-6 text-center">
                  <p className="text-[15px] md:text-[16px] font-bold text-text-primary">
                    [무상 배포 대상]
                  </p>
                  <p className="mt-2 text-[16px] md:text-[17px] font-semibold text-text-primary leading-relaxed">
                    공정안전관리(PSM) S/M 등급 중{" "}
                    <span className="font-bold text-[#5541f6]">100인 이하 사업장</span>
                    <br />
                    <span className="text-[14px] md:text-[15px] font-medium text-text-tertiary">
                      (중부지방고용노동청
                      <br />
                      수도권 중대산업사고예방센터 관할 사업장)
                    </span>
                    <br />
                    <span className="text-[14px] md:text-[15px] font-medium text-text-tertiary">(무상 배포 기간 : 2026. 02. 24 ~ 12.31)</span>
                  </p>
                </div>
                <p className="text-[16px] md:text-[17px] font-medium text-text-primary leading-relaxed">
                  한정된 자원으로 인해 이번 차수에는 위 대상을 우선 선정하여 무상 보급합니다.
                </p>
                <p className="text-[16px] md:text-[17px] font-medium text-text-primary leading-relaxed">
                  당장 지원 대상에 해당하지 않더라도 신청서를 남겨주시면,
                  <br />
                  귀사 환경에 최적화된 솔루션 제안 및 상담을 우선적으로 진행해 드리겠습니다.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="w-full"
          >
            <div className="space-y-8">
              {/* 회사명 */}
              <div>
                <label htmlFor="company" className="block text-[18px] font-semibold text-text-primary mb-3">
                  회사명 <span className="text-semantic-error">*</span>
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="(주)회사명"
                  className={`w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all ${
                    errors.company ? "border-semantic-error bg-red-50" : ""
                  }`}
                />
                {errors.company && (
                  <p className="mt-2 text-[14px] text-semantic-error">
                    {errors.company}
                  </p>
                )}
              </div>

              {/* 회사 이메일 */}
              <div>
                <label htmlFor="email" className="block text-[18px] font-semibold text-text-primary mb-1">
                  회사 이메일 <span className="text-semantic-error">*</span>
                </label>
                <p className="text-[14px] text-text-secondary mb-3">
                  서비스 이용을 위해 연락이 가능한 담당자 이메일을 입력해주세요!
                </p>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@company.com"
                  className={`w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all ${
                    errors.email ? "border-semantic-error bg-red-50" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-[14px] text-semantic-error">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* 기타 문의사항 */}
              <div>
                <label htmlFor="inquiry" className="block text-[18px] font-semibold text-text-primary mb-3">
                  기타 문의사항
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleInputChange}
                  placeholder="추가로 궁금한 점이나 요청사항이 있으시면 자유롭게 작성해주세요"
                  rows={5}
                  className="w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all resize-none"
                />
              </div>

              {/* 필수 동의 (100인 이하 사업장 + 개인정보) */}
              <div className="mt-8">
                <div className="bg-gray-50 rounded-[16px] p-6 border-2 border-gray-200 space-y-6">
                  {/* 100인 이하 사업장 여부 (예/아니오) */}
                  <div>
                    <p className="block text-[17px] font-semibold text-text-primary mb-3">
                      귀 사는 100인 이하 사업장이 맞습니까? <span className="text-semantic-error">*</span>
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-3 p-4 bg-white rounded-[16px] border-2 border-gray-300 hover:border-brand-blue/50 focus-within:border-brand-blue cursor-pointer transition-all flex-1 min-w-[120px] has-[:checked]:border-brand-blue has-[:checked]:ring-2 has-[:checked]:ring-brand-blue/20">
                        <input
                          type="radio"
                          name="under100Workplace"
                          value="yes"
                          checked={formData.under100Workplace === "yes"}
                          onChange={handleInputChange}
                          className="w-5 h-5 border-2 border-gray-300 text-brand-blue focus:ring-2 focus:ring-brand-blue/20 cursor-pointer"
                        />
                        <span className="text-[17px] font-medium text-text-primary">예</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-white rounded-[16px] border-2 border-gray-300 hover:border-brand-blue/50 focus-within:border-brand-blue cursor-pointer transition-all flex-1 min-w-[120px] has-[:checked]:border-brand-blue has-[:checked]:ring-2 has-[:checked]:ring-brand-blue/20">
                        <input
                          type="radio"
                          name="under100Workplace"
                          value="no"
                          checked={formData.under100Workplace === "no"}
                          onChange={handleInputChange}
                          className="w-5 h-5 border-2 border-gray-300 text-brand-blue focus:ring-2 focus:ring-brand-blue/20 cursor-pointer"
                        />
                        <span className="text-[17px] font-medium text-text-primary">아니오</span>
                      </label>
                    </div>
                    {errors.under100Workplace && (
                      <p className="mt-3 text-[14px] text-semantic-error">
                        {errors.under100Workplace}
                      </p>
                    )}
                    {formData.under100Workplace === "no" && (
                      <div className="mt-4 w-full rounded-[20px] bg-brand-blue-light border-l-4 border-[#5541f6] p-5 md:p-6 text-left">
                        <p className="text-[16px] md:text-[17px] font-semibold text-text-primary leading-relaxed">
                          이 서비스는 100인 이하 사업장을 대상으로 무료로 제공하고 있습니다.
                        </p>
                        <p className="mt-3 text-[16px] md:text-[17px] font-bold text-[#5541f6] leading-relaxed">
                          100인 이하 사업장이 아니신 경우는 담당자 배정 후 별도 연락을 드리도록 하겠습니다.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 개인정보 수집 및 이용 동의 */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-start gap-4">
                      <input
                        id="privacyAgreement"
                        name="privacyAgreement"
                        type="checkbox"
                        checked={formData.privacyAgreement}
                        onChange={handleInputChange}
                        className={`mt-1 w-5 h-5 rounded border-2 border-gray-300 text-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all cursor-pointer ${
                          errors.privacyAgreement ? "border-semantic-error" : ""
                        }`}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="privacyAgreement"
                          className="block text-[17px] font-semibold text-text-primary cursor-pointer"
                        >
                          개인정보 수집 및 이용에 동의합니다 <span className="text-semantic-error">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowPrivacyModal(true)}
                          className="mt-3 text-[15px] text-brand-blue font-medium hover:underline underline-offset-2"
                        >
                          전체 내용 보기
                        </button>
                      </div>
                    </div>
                    {errors.privacyAgreement && (
                      <p className="mt-3 text-[14px] text-semantic-error">
                        {errors.privacyAgreement}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                className="!py-4 text-[18px] flex items-center justify-center gap-2 whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>제출 중...</span>
                  </>
                ) : (
                  <span>신청하기</span>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* 개인정보 수집 및 처리방침 모달 */}
      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)}>
        <div className="py-6 md:py-8 px-0 max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setShowPrivacyModal(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-[0.96]"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-text-secondary" strokeWidth={2.5} />
          </button>
          <div className="px-6 md:px-8">
            <h2 className="text-[28px] md:text-[32px] font-bold text-text-primary mb-6">
              개인정보 수집 및 이용 동의 (필수)
            </h2>
            <div className="space-y-5 text-[15px] md:text-[16px] text-text-secondary leading-relaxed">
              <ol className="list-decimal list-inside space-y-3 ml-0 pl-0">
                <li>
                  <span className="font-semibold text-text-primary">수집 및 이용 목적:</span> 서비스 이용 신청에 대한 답변 및 안내, 서비스 제공을 위한 연락
                </li>
                <li>
                  <span className="font-semibold text-text-primary">수집하는 항목:</span> 회사명, 회사 이메일 주소
                </li>
                <li>
                  <span className="font-semibold text-text-primary">보유 및 이용 기간:</span> 1년 (단, 관계 법령에 따라 보존이 필요한 경우 해당 기간까지 보관)
                </li>
                <li>
                  <span className="font-semibold text-text-primary">동의 거부 권리 및 불이익:</span> 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 동의 거부 시 서비스 이용 신청이 불가능합니다.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </Modal>

      <Footer />
    </main>
  );
}
