"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Image from "next/image";
import Slider, { SliderRef } from "@/components/ui/Slider";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  publisher: string;
  content: string;
  imageUrl?: string;
  articleUrl: string;
  date: string;
}

// 유효한 기사 필터링 함수
function isValidArticle(article: NewsArticle): boolean {
  return !!(
    article.title &&
    article.title.length > 3 &&
    article.title !== "기사 제목" &&
    article.content &&
    article.content.length > 20 &&
    !article.content.includes("기사 내용을 불러올 수 없습니다")
  );
}

// API에서 기사 데이터 가져오기
async function fetchArticlesData(): Promise<NewsArticle[]> {
  try {
    const response = await fetch("/api/articles", {
      cache: "no-store",
    });
    
    if (!response.ok) {
      console.error("API response not OK:", response.status);
      return [];
    }
    
    const data = await response.json();
    if (!data.articles || !Array.isArray(data.articles)) {
      return [];
    }
    
    const validArticles = data.articles.filter(isValidArticle);
    if (validArticles.length === 0) {
      console.warn("No valid articles found");
    }
    
    return validArticles;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

// 이미지 에러 핸들러
function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, publisher: string) {
  const target = e.target as HTMLImageElement;
  const parent = target.parentElement;
  if (!parent) return;
  
  target.style.display = "none";
  if (parent.querySelector(".placeholder")) return;
  
  const placeholder = document.createElement("div");
  placeholder.className = "placeholder absolute inset-0 w-full h-full flex items-center justify-center";
  placeholder.innerHTML = `
    <div class="text-center p-4">
      <div class="w-16 h-16 mx-auto mb-2 bg-brand-blue/20 rounded-full flex items-center justify-center">
        <span class="text-[24px]">📰</span>
      </div>
      <p class="text-[12px] text-text-tertiary">${publisher}</p>
    </div>
  `;
  parent.appendChild(placeholder);
}

// 기사 이미지 컴포넌트
interface ArticleImageProps {
  readonly article: NewsArticle;
}
function ArticleImage({ article }: ArticleImageProps) {
  const imageContainerClass = "w-full h-40 md:h-48 rounded-[12px] overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/20 relative mb-4";
  
  if (article.imageUrl) {
    return (
      <div className={imageContainerClass}>
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
          onError={(e) => handleImageError(e, article.publisher)}
        />
      </div>
    );
  }
  
  return (
    <div className={imageContainerClass}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-2 bg-brand-blue/20 rounded-full flex items-center justify-center">
            <span className="text-[24px]">📰</span>
          </div>
          <p className="text-[12px] text-text-tertiary">{article.publisher}</p>
        </div>
      </div>
    </div>
  );
}

// 기사 카드 컴포넌트
interface ArticleCardProps {
  readonly article: NewsArticle;
  readonly articleIndex: number;
}
function ArticleCard({ article, articleIndex }: ArticleCardProps) {
  return (
    <motion.a
      key={article.id}
      href={article.articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      transition={{ delay: articleIndex * 0.1 }}
      className="block px-4 md:px-6 py-4 hover:bg-bg-input/30 transition-colors active:scale-[0.99] group first:pl-0 last:pr-0"
    >
      {/* 첫 번째 줄: 사진 */}
      <ArticleImage article={article} />

      {/* 두 번째 줄: 타이틀 */}
      <h3 className="text-[16px] md:text-[18px] font-bold text-text-primary mb-3 group-hover:text-brand-blue transition-colors leading-snug line-clamp-2">
        {article.title}
      </h3>

      {/* 세 번째 줄: 내용 */}
      <p className="text-[14px] md:text-[15px] font-medium text-text-secondary leading-relaxed line-clamp-3 mb-4">
        {article.content}
      </p>

      {/* 네 번째 줄: 언론사와 날짜 */}
      <div className="flex items-center justify-between">
        <span className="text-[12px] md:text-[13px] font-medium text-text-secondary">
          {article.publisher}
        </span>
        <span className="text-[12px] md:text-[13px] text-text-tertiary">
          {article.date.replaceAll("-", ". ")}
        </span>
      </div>
    </motion.a>
  );
}

// 슬라이드 아이템 컴포넌트
interface SlideItemProps {
  readonly slideArticles: NewsArticle[];
  readonly slideIndex: number;
}
function SlideItem({ slideArticles, slideIndex }: SlideItemProps) {
  return (
    <div key={`slide-${slideIndex}-${slideArticles[0]?.id || slideIndex}`} className="w-full">
      <div className="bg-bg-surface rounded-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-0 divide-x-0 md:divide-x divide-bg-input">
        {slideArticles.map((article, articleIndex) => (
          <ArticleCard key={article.id} article={article} articleIndex={articleIndex} />
        ))}
      </div>
    </div>
  );
}

export default function PressSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<SliderRef>(null);

  // API에서 기사 데이터 가져오기
  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      const fetchedArticles = await fetchArticlesData();
      setArticles(fetchedArticles);
      setIsLoading(false);
    }

    fetchArticles();
  }, []);

  // 날짜 내림차순 정렬 (최신순)
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // 내림차순
    });
  }, [articles]);

  // 3개씩 그룹화하여 슬라이드 아이템 생성
  const articlesPerPage = 3;
  const articleSlides = useMemo(() => {
    const slides: NewsArticle[][] = [];
    for (let i = 0; i < sortedArticles.length; i += articlesPerPage) {
      slides.push(sortedArticles.slice(i, i + articlesPerPage));
    }
    return slides;
  }, [sortedArticles]);


  return (
    <section id="related-articles" className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* 섹션 헤더 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-0"
        >
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary mb-6 md:mb-8 leading-tight">
            NEWS
          </h2>
          
          {/* 고용노동부장관상 수상 강조 박스 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-blue/10 via-brand-blue-light/20 to-brand-blue/10 px-6 md:px-8 py-4 md:py-5 rounded-[20px] border-2 border-brand-blue/20 shadow-lg mb-0"
          >
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-brand-blue to-brand-blue/80 rounded-full flex items-center justify-center shadow-md">
              <Award className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <div className="text-[12px] md:text-[13px] font-semibold text-brand-blue mb-1">
                공정안전관리(PSM) 안전 문화 확산 우수사례
              </div>
              <div className="text-[18px] md:text-[22px] font-bold text-text-primary">
                고용노동부장관상 수상
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 로딩 상태 */}
        {(() => {
          if (isLoading) {
            return (
              <div className="bg-bg-surface rounded-card p-12 md:p-16 text-center">
                <div className="inline-block w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[15px] md:text-[16px] font-medium text-text-secondary">
                  기사를 불러오는 중...
                </p>
              </div>
            );
          }
          if (sortedArticles.length === 0) {
            return (
              <div className="bg-bg-surface rounded-card p-12 md:p-16 text-center">
                <p className="text-[15px] md:text-[16px] font-medium text-text-secondary">
                  기사를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
                </p>
              </div>
            );
          }
          if (articleSlides.length === 0) {
            return (
              <div className="bg-bg-surface rounded-card p-12 md:p-16 text-center">
                <p className="text-[15px] md:text-[16px] font-medium text-text-secondary">
                  표시할 기사가 없습니다.
                </p>
              </div>
            );
          }
          return (
          <div className="w-full overflow-hidden relative">
            {/* 우측 상단 네비게이션 버튼 (카드 외부) */}
            {articleSlides.length > 1 && (
              <div className="absolute top-0 right-0 z-10 flex items-center gap-2 mb-4">
                <button
                  onClick={() => sliderRef.current?.goToPrevious()}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white text-text-primary hover:bg-brand-blue-light hover:text-brand-blue shadow-sm hover:shadow-md active:scale-[0.96]"
                  aria-label="이전 기사"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => sliderRef.current?.goToNext()}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white text-text-primary hover:bg-brand-blue-light hover:text-brand-blue shadow-sm hover:shadow-md active:scale-[0.96]"
                  aria-label="다음 기사"
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            )}
            {/* 카드 섹션에 상단 패딩 추가 (버튼 영역 확보) */}
            <div className={articleSlides.length > 1 ? "pt-14 mt-0" : "mt-0"}>
              <Slider
                ref={sliderRef}
                items={articleSlides.map((slideArticles, slideIndex) => {
                  const slideKey = `slide-${slideIndex}-${slideArticles[0]?.id || slideIndex}`;
                  return <SlideItem key={slideKey} slideArticles={slideArticles} slideIndex={slideIndex} />;
                })}
                autoPlay={false}
                showIndicators={true}
                showArrows={false}
              />
            </div>
          </div>
          );
        })()}
      </div>
    </section>
  );
}
