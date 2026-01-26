"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Image from "next/image";
import Slider, { SliderRef } from "@/components/ui/Slider";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  publisher: string;
  content: string;
  imageUrl?: string;
  articleUrl: string;
  date: string;
}

export default function PressSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<SliderRef>(null);

  // API에서 기사 데이터 가져오기
  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/articles", {
          cache: "no-store", // 캐시 사용 안 함
        });
        
        if (response.ok) {
          const data = await response.json();
          // 유효한 기사만 필터링 (제목과 내용이 있는 것만)
          if (data.articles && Array.isArray(data.articles)) {
            const validArticles = data.articles.filter(
              (article: NewsArticle) => 
                article.title && 
                article.title.length > 3 &&
                article.title !== "기사 제목" &&
                article.content && 
                article.content.length > 20 &&
                !article.content.includes("기사 내용을 불러올 수 없습니다")
            );
            
            if (validArticles.length > 0) {
              setArticles(validArticles);
            } else {
              console.warn("No valid articles found");
              setArticles([]);
            }
          }
        } else {
          console.error("API response not OK:", response.status);
          setArticles([]);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
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
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* 섹션 헤더 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary mb-3 leading-tight">
            AIR가 주목받고 있습니다
          </h2>
          <p className="text-[16px] md:text-[17px] font-medium text-text-secondary max-w-2xl mx-auto">
            언론에서 본 AIR의 혁신
          </p>
        </motion.div>

        {/* 로딩 상태 */}
        {isLoading ? (
          <div className="bg-bg-surface rounded-card p-12 md:p-16 text-center">
            <div className="inline-block w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[15px] md:text-[16px] font-medium text-text-secondary">
              기사를 불러오는 중...
            </p>
          </div>
        ) : sortedArticles.length === 0 ? (
          <div className="bg-bg-surface rounded-card p-12 md:p-16 text-center">
            <p className="text-[15px] md:text-[16px] font-medium text-text-secondary">
              기사를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
            </p>
          </div>
        ) : articleSlides.length === 0 ? (
          <div className="bg-bg-surface rounded-card p-12 md:p-16 text-center">
            <p className="text-[15px] md:text-[16px] font-medium text-text-secondary">
              표시할 기사가 없습니다.
            </p>
          </div>
        ) : (
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
            <div className={articleSlides.length > 1 ? "pt-14" : ""}>
              <Slider
                ref={sliderRef}
                items={articleSlides.map((slideArticles, slideIndex) => (
                  <div key={slideIndex} className="w-full">
                    <div className="bg-bg-surface rounded-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-0 divide-x-0 md:divide-x divide-bg-input">
                      {slideArticles.map((article, articleIndex) => (
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
                        <div className="w-full h-40 md:h-48 rounded-[12px] overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-blue-light/20 relative mb-4">
                          {article.imageUrl ? (
                            <Image
                              src={article.imageUrl}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              unoptimized
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const parent = target.parentElement;
                                if (parent) {
                                  target.style.display = "none";
                                  if (!parent.querySelector(".placeholder")) {
                                    const placeholder = document.createElement("div");
                                    placeholder.className = "placeholder absolute inset-0 w-full h-full flex items-center justify-center";
                                    placeholder.innerHTML = `
                                      <div class="text-center p-4">
                                        <div class="w-16 h-16 mx-auto mb-2 bg-brand-blue/20 rounded-full flex items-center justify-center">
                                          <span class="text-[24px]">📰</span>
                                        </div>
                                        <p class="text-[12px] text-text-tertiary">${article.publisher}</p>
                                      </div>
                                    `;
                                    parent.appendChild(placeholder);
                                  }
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center p-4">
                                <div className="w-16 h-16 mx-auto mb-2 bg-brand-blue/20 rounded-full flex items-center justify-center">
                                  <span className="text-[24px]">📰</span>
                                </div>
                                <p className="text-[12px] text-text-tertiary">{article.publisher}</p>
                              </div>
                            </div>
                          )}
                        </div>

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
                            {article.date.replace(/-/g, ". ")}
                          </span>
                        </div>
                      </motion.a>
                      ))}
                    </div>
                  </div>
                ))}
                autoPlay={false}
                showIndicators={true}
                showArrows={false}
                onSlideChange={setCurrentSlideIndex}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
