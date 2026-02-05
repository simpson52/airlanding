"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Image from "next/image";
import { X } from "lucide-react";

interface FormData {
  company: string;
  locationProvince: string;
  locationCity: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  inquiry: string;
  privacyAgreement: boolean;
}

interface FormErrors {
  company?: string;
  locationProvince?: string;
  locationCity?: string;
  name?: string;
  position?: string;
  email?: string;
  phone?: string;
  inquiry?: string;
  privacyAgreement?: string;
}

export default function FormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    company: "",
    locationProvince: "",
    locationCity: "",
    name: "",
    position: "",
    email: "",
    phone: "",
    inquiry: "",
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
    
    // 시/도가 변경되면 시/군/구 초기화
    if (name === "locationProvince") {
      setFormData((prev) => ({ ...prev, locationProvince: value, locationCity: "" }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // 에러 초기화
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = "회사명을 입력해주세요";
    }
    if (!formData.locationProvince) {
      newErrors.locationProvince = "시/도를 선택해주세요";
    }
    if (!formData.locationCity) {
      newErrors.locationCity = "시/군/구를 선택해주세요";
    }
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요";
    }
    if (!formData.privacyAgreement) {
      newErrors.privacyAgreement = "개인정보 수집 및 처리방침에 동의해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const koreanProvinces = [
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "광주광역시",
    "대전광역시",
    "울산광역시",
    "세종특별자치시",
    "경기도",
    "강원특별자치도",
    "충청북도",
    "충청남도",
    "전북특별자치도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주특별자치도",
  ];

  const koreanCities: Record<string, string[]> = {
    "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    "부산광역시": ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
    "대구광역시": ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
    "인천광역시": ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],
    "광주광역시": ["광산구", "남구", "동구", "북구", "서구"],
    "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
    "울산광역시": ["남구", "동구", "북구", "울주군", "중구"],
    "세종특별자치시": ["세종시"],
    "경기도": ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
    "강원특별자치도": ["강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],
    "충청북도": ["괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "증평군", "진천군", "청주시", "충주시"],
    "충청남도": ["계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군"],
    "전북특별자치도": ["고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시", "정읍시", "진안군"],
    "전라남도": ["강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
    "경상북도": ["경산시", "경주시", "고령군", "구미시", "군위군", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시"],
    "경상남도": ["거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시", "통영시", "하동군", "함안군", "함양군", "합천군"],
    "제주특별자치도": ["서귀포시", "제주시"],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Image
                  src="/air-logo.png"
                  alt="AIR"
                  width={120}
                  height={40}
                  className="h-10 md:h-12 w-auto"
                  quality={100}
                  unoptimized
                />
                <h1 className="text-[32px] md:text-[40px] font-bold text-text-primary leading-tight">
                  서비스 가입 신청하기
                </h1>
              </div>
              <p className="text-[17px] md:text-[18px] font-medium text-text-secondary">
                서비스에 대한 관심을 가져주셔서 감사합니다
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

              {/* 소재지: 시/도 + 시/군/구 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label htmlFor="locationProvince" className="block text-[18px] font-semibold text-text-primary mb-3">
                    소재지 (시/도) <span className="text-semantic-error">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="locationProvince"
                      name="locationProvince"
                      value={formData.locationProvince}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 pr-12 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all appearance-none ${
                        errors.locationProvince ? "border-semantic-error bg-red-50" : ""
                      }`}
                    >
                      <option value="">시/도를 선택하세요</option>
                      {koreanProvinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.locationProvince && (
                    <p className="mt-2 text-[14px] text-semantic-error">
                      {errors.locationProvince}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="locationCity" className="block text-[18px] font-semibold text-text-primary mb-3">
                    소재지 (시/군/구) <span className="text-semantic-error">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="locationCity"
                      name="locationCity"
                      value={formData.locationCity}
                      onChange={handleInputChange}
                      disabled={!formData.locationProvince}
                      className={`w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 pr-12 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all appearance-none ${
                        !formData.locationProvince ? "opacity-50 cursor-not-allowed" : ""
                      } ${
                        errors.locationCity ? "border-semantic-error bg-red-50" : ""
                      }`}
                    >
                      <option value="">시/군/구를 선택하세요</option>
                      {formData.locationProvince && koreanCities[formData.locationProvince]?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.locationCity && (
                    <p className="mt-2 text-[14px] text-semantic-error">
                      {errors.locationCity}
                    </p>
                  )}
                </div>
              </div>

              {/* 이름 + 담당 업무 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                    className={`w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all ${
                      errors.name ? "border-semantic-error bg-red-50" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-2 text-[14px] text-semantic-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="position" className="block text-[18px] font-semibold text-text-primary mb-3">
                    담당 업무
                  </label>
                  <input
                    id="position"
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="예: 안전관리, 위험성 평가"
                    className="w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* 이메일 + 전화번호 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                    className={`w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all ${
                      errors.phone ? "border-semantic-error bg-red-50" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-[14px] text-semantic-error">
                      {errors.phone}
                    </p>
                  )}
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
                  className="w-full bg-gray-50 text-text-primary rounded-[16px] px-5 py-4 text-[17px] font-medium border-2 border-gray-300 focus:outline-none focus:border-brand-blue focus:bg-white focus:shadow-sm transition-all resize-none"
                />
              </div>

              {/* 개인정보 수집 및 처리방침 동의 */}
              <div className="mt-8">
                <div className="bg-gray-50 rounded-[16px] p-6 border-2 border-gray-200">
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
                        개인정보 수집 및 처리방침에 동의합니다{" "}
                        <span className="text-semantic-error">*</span>
                      </label>
                      <p className="mt-2 text-[15px] text-text-secondary leading-relaxed">
                        귀하께서는 개인정보 수집 및 처리방침에 동의하지 아니할수 있지만 이 경우 가입 신청이 불가능합니다.
                      </p>
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
                  <>
                    <Image
                      src="/air-logo 1_white.png"
                      alt="AIR"
                      width={24}
                      height={24}
                      className="h-6 w-auto flex-shrink-0"
                      quality={100}
                      unoptimized
                    />
                    <span>신청하기</span>
                  </>
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
              개인정보 수집 및 처리방침
            </h2>
            <div className="space-y-6 text-[15px] md:text-[16px] text-text-secondary leading-relaxed">
              <div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  [개인정보 수집 및 처리방침]
                </h3>
                <p>
                  귀하께서는 개인정보 수집 및 처리방침에 동의하지 아니할수 있지만 이 경우 가입 신청이 불가능합니다.
                  <br />
                  &apos;동의함&apos; 선택 후 진행 요청드립니다.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  [개인정보 수집 및 처리 안내]
                </h3>
                <p>
                  다음의 목적을 위해 정보통신망 이용 촉진 및 정보보호 등에 대한 법률 및 개인정보보호법에 의해 가입 신청자(이하 &quot;신청자&quot;)로부터 개인 정보를 수집하고 있으며, 신청자 개인정보는 아래 목적과 같이 &apos;(주)GS&apos;에서 활용합니다.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  [개인정보 수집 및 이용 목적]
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>AIR 서비스 가입 신청 처리</li>
                  <li>서비스 안내 및 연락</li>
                  <li>가입 신청자와의 소통 및 문의 응대</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  [개인정보 수집항목]
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>이름</li>
                  <li>회사명</li>
                  <li>소재지 (시/도, 시/군/구)</li>
                  <li>담당 업무</li>
                  <li>연락처 (휴대전화, 이메일)</li>
                  <li>기타 문의사항 (선택사항)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  [개인정보 보유 및 이용 기간]
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>가입 신청일로부터 서비스 제공 완료 시까지</li>
                  <li>단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관</li>
                  <li>고객의 삭제 요청 시 지체없이 파기</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  [개인정보 처리 거부 권리]
                </h3>
                <p>
                  신청자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 동의를 거부하실 경우 AIR 서비스 가입 신청이 불가능합니다.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  [개인정보 처리 위탁]
                </h3>
                <p>
                  현재 &apos;(주)GS&apos;는 개인정보 처리 업무를 외부에 위탁하지 않습니다. 향후 위탁이 필요한 경우, 관련 법령에 따라 사전에 고지하고 동의를 받겠습니다.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-3">
                  [개인정보 보호책임자]
                </h3>
                <p>
                  개인정보 처리와 관련한 문의사항이 있으시면 아래로 연락주시기 바랍니다.
                  <br />
                  이메일: jhshim@gs.co.kr
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Footer />
    </main>
  );
}
