"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface FormData {
  name: string;
  company: string;
  position: string;
  email: string;
  phone: string;
  purpose: string;
  interest: string[];
  inquiry: string;
}

export default function FormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    purpose: "",
    interest: [],
    inquiry: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 에러 초기화
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      interest: prev.interest.includes(value)
        ? prev.interest.filter((item) => item !== value)
        : [...prev.interest, value],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }
    if (!formData.company.trim()) {
      newErrors.company = "회사명을 입력해주세요";
    }
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요";
    }
    if (!formData.purpose) {
      newErrors.purpose = "참가 목적을 선택해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // API 호출 예정
    console.log("Form submitted:", formData);
    
    // 임시: 제출 후 감사 페이지로 이동
    setTimeout(() => {
      router.push("/form/thank-you");
    }, 500);
  };

  return (
    <main className="min-h-screen bg-bg-base">
      <NavigationBar />
      <div className="pt-[54px]">
        <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-12"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-text-secondary hover:text-brand-blue transition-colors mb-6 active:scale-[0.96]"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
              <span className="text-[15px] font-medium">돌아가기</span>
            </button>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Image
                  src="/gs_ci.png"
                  alt="GS"
                  width={120}
                  height={40}
                  className="h-10 md:h-12 w-auto"
                  unoptimized
                />
              </div>
              <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary mb-3 leading-tight">
                참가 신청
              </h1>
              <p className="text-[17px] md:text-[18px] font-medium text-text-secondary">
                AIR 서비스에 대한 관심을 가져주셔서 감사합니다
                <br />
                아래 정보를 입력해주시면 빠르게 연락드리겠습니다
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-bg-surface rounded-[24px] p-6 md:p-8 lg:p-10 shadow-sm"
          >
            <div className="space-y-8">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="block text-[18px] font-semibold text-text-primary mb-3">
                  이름 <span className="text-semantic-error">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="홍길동"
                  className={`w-full bg-bg-input text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${
                    errors.name ? "ring-2 ring-semantic-error" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 text-[14px] text-semantic-error">
                    {errors.name}
                  </p>
                )}
              </div>

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
                  className={`w-full bg-bg-input text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${
                    errors.company ? "ring-2 ring-semantic-error" : ""
                  }`}
                />
                {errors.company && (
                  <p className="mt-2 text-[14px] text-semantic-error">
                    {errors.company}
                  </p>
                )}
              </div>

              {/* 직책 */}
              <div>
                <label htmlFor="position" className="block text-[18px] font-semibold text-text-primary mb-3">
                  직책/부서
                </label>
                <input
                  id="position"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="예: 안전관리팀 팀장"
                  className="w-full bg-bg-input text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="block text-[18px] font-semibold text-text-primary mb-3">
                  이메일 <span className="text-semantic-error">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@company.com"
                  className={`w-full bg-bg-input text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${
                    errors.email ? "ring-2 ring-semantic-error" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-[14px] text-semantic-error">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* 전화번호 */}
              <div>
                <label htmlFor="phone" className="block text-[18px] font-semibold text-text-primary mb-3">
                  전화번호 <span className="text-semantic-error">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-1234-5678"
                  className={`w-full bg-bg-input text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all ${
                    errors.phone ? "ring-2 ring-semantic-error" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="mt-2 text-[14px] text-semantic-error">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* 참가 목적 */}
              <div>
                <div className="block text-[18px] font-semibold text-text-primary mb-3">
                  참가 목적 <span className="text-semantic-error">*</span>
                </div>
                <div className="space-y-3">
                  {[
                    "위험성 평가 업무 효율화",
                    "안전 관리 표준화",
                    "체크리스트 자동화",
                    "기타",
                  ].map((purpose) => (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, purpose }));
                        if (errors.purpose) {
                          setErrors((prev) => ({ ...prev, purpose: undefined }));
                        }
                      }}
                      className={`w-full text-left rounded-[16px] px-5 py-4 text-[17px] font-medium transition-all active:scale-[0.98] ${
                        formData.purpose === purpose
                          ? "bg-brand-blue-light text-brand-blue"
                          : "bg-bg-input text-text-primary hover:bg-brand-blue-light/50"
                      }`}
                    >
                      {purpose}
                    </button>
                  ))}
                </div>
                {errors.purpose && (
                  <p className="mt-2 text-[14px] text-semantic-error">
                    {errors.purpose}
                  </p>
                )}
              </div>

              {/* 관심사항 (다중 선택) */}
              <div>
                <div className="block text-[18px] font-semibold text-text-primary mb-3">
                  관심사항 (복수 선택 가능)
                </div>
                <div className="space-y-3">
                  {[
                    "JSA 기법 기반 위험성 평가",
                    "KRAS 기법 기반 위험성 평가",
                    "SIF 사례 기반 안전대책",
                    "체크리스트 자동 생성",
                    "현장 맞춤형 솔루션",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleCheckboxChange(item)}
                      className={`w-full text-left rounded-[16px] px-5 py-4 text-[17px] font-medium transition-all active:scale-[0.98] ${
                        formData.interest.includes(item)
                          ? "bg-brand-blue-light text-brand-blue"
                          : "bg-bg-input text-text-primary hover:bg-brand-blue-light/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            formData.interest.includes(item)
                              ? "bg-brand-blue"
                              : "bg-white border-2 border-text-tertiary"
                          }`}
                        >
                          {formData.interest.includes(item) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span>{item}</span>
                      </div>
                    </button>
                  ))}
                </div>
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
                  className="w-full bg-bg-input text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10 pt-8 border-t border-gray-100">
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
      <Footer />
    </main>
  );
}
