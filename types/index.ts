/**
 * 공통 타입 정의
 */

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface RiskMatrixCell {
  level: number;
  category: "H" | "M" | "L";
  standard: string;
}
