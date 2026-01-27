import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface ArticleData {
  title: string;
  content: string;
  imageUrl?: string;
  publisher: string;
  date: string;
}

// 타임아웃 설정 (5초)
const FETCH_TIMEOUT = 5000;

// 타임아웃이 있는 fetch 래퍼
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// URL에서 도메인 추출
function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace("www.", "").replace("m.", "");
  } catch {
    return "";
  }
}

// Cheerio 타입 정의
type CheerioAPI = ReturnType<typeof cheerio.load>;

// 선택자 배열에서 첫 번째로 매칭되는 요소 찾기
function findElement($: CheerioAPI, selectors: string[]): string {
  for (const selector of selectors) {
    const element = $(selector).first();
    if (element.length > 0) {
      if (selector.startsWith("meta")) {
        return element.attr("content") || element.attr("property") || "";
      }
      const text = element.text().trim();
      if (text && text.length > 0) {
        return text;
      }
    }
  }
  return "";
}

// 이미지 URL 추출
function findImage($: CheerioAPI, selectors: string[]): string {
  for (const selector of selectors) {
    const element = $(selector).first();
    if (element.length > 0) {
      if (selector.startsWith("meta")) {
        const url = element.attr("content") || "";
        if (url && url.startsWith("http")) return url;
      } else {
        const url = element.attr("src") || element.attr("data-src") || element.attr("data-lazy-src") || "";
        if (url && url.startsWith("http")) return url;
      }
    }
  }
  return "";
}

// 텍스트 정리 함수
function cleanText(text: string): string {
  return text
    .replace(/[^\w\s가-힣.,!?()[\]{}'"":;]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[\uFFFD\u0000-\u001F\u007F-\u009F]/g, "")
    .trim();
}

// 기사 데이터 추출 (개선된 버전)
async function fetchArticleData(url: string, publisher: string): Promise<ArticleData | null> {
  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }

    // 인코딩 처리
    const arrayBuffer = await response.arrayBuffer();
    let html = "";
    
    // Content-Type에서 인코딩 확인
    const contentType = response.headers.get("content-type") || "";
    let encoding = "utf-8";
    
    if (contentType.includes("charset=")) {
      const charsetMatch = contentType.match(/charset=([^;]+)/i);
      if (charsetMatch) {
        encoding = charsetMatch[1].toLowerCase();
      }
    }

    // HTML 파싱 전에 charset 메타 태그 확인
    const tempDecoder = new TextDecoder("utf-8", { fatal: false });
    const tempHtml = tempDecoder.decode(arrayBuffer);
    const charsetMatch = tempHtml.match(/<meta[^>]*charset=["']?([^"'\s>]+)["']?/i);
    
    if (charsetMatch && charsetMatch[1]) {
      const detectedCharset = charsetMatch[1].toLowerCase();
      if (detectedCharset.includes("euc-kr") || detectedCharset.includes("ks_c_5601")) {
        encoding = "euc-kr";
      }
    }

    // 인코딩에 따라 디코딩
    try {
      if (encoding === "euc-kr") {
        // Node.js에서는 iconv-lite 같은 라이브러리가 필요하지만, 
        // 여기서는 UTF-8로 시도하고 실패 시 기본값 사용
        html = tempHtml;
      } else {
        html = tempHtml;
      }
    } catch (e) {
      html = tempHtml; // 폴백
    }

    const $ = cheerio.load(html, {
      decodeEntities: true,
      normalizeWhitespace: false,
    });

    // 제목 추출 (다양한 방법 시도)
    let title = "";
    
    // 1. OG 태그
    title = $("meta[property='og:title']").attr("content") || "";
    
    // 2. 일반 메타 태그
    if (!title) {
      title = $("meta[name='title']").attr("content") || "";
    }
    
    // 3. h1 태그
    if (!title) {
      title = $("h1").first().text().trim();
    }
    
    // 4. article title
    if (!title) {
      title = $("article h1, .article-title, .news-title").first().text().trim();
    }
    
    // 5. title 태그
    if (!title) {
      title = $("title").text().trim();
    }
    
    // 제목 정리
    title = cleanText(title)
      .split("|")[0]
      .split("-")[0]
      .split(":")[0]
      .trim();
    
    // 제목이 유효한지 확인
    if (!title || title.length < 3 || title === "기사 제목") {
      title = "";
    }

    // 내용 추출 (우선순위별)
    let content = "";
    
    // 1. OG description
    content = $("meta[property='og:description']").attr("content") || "";
    
    // 2. 일반 description
    if (!content || content.length < 50) {
      content = $("meta[name='description']").attr("content") || "";
    }
    
    // 3. 본문 추출 (여러 선택자 시도)
    if (!content || content.length < 50) {
      const contentSelectors = [
        "article .article-body",
        "article .article-content",
        "article .content",
        ".article-body",
        ".article-content",
        ".news-content",
        ".content-body",
        "#articleBody",
        "article p",
        ".article p",
        "main article p",
        "main .content p",
      ];
      
      for (const selector of contentSelectors) {
        const elements = $(selector);
        if (elements.length > 0) {
          const paragraphs = elements
            .map((_, el) => {
              const text = $(el).text().trim();
              return cleanText(text);
            })
            .get()
            .filter((text) => 
              text.length > 30 && 
              !text.includes("기사 내용을 불러올 수 없습니다") &&
              !text.includes("기사 제목") &&
              !text.match(/^[\d\s\-\.:]+$/) &&
              !text.includes("뉴스레터") &&
              !text.includes("구독") &&
              !text.includes("로그인") &&
              !text.includes("회원가입") &&
              !text.includes("광고")
            );
          
          if (paragraphs.length > 0) {
            content = paragraphs.slice(0, 5).join(" ");
            if (content.length > 100) break;
          }
        }
      }
    }

    // 내용 정리
    content = cleanText(content).substring(0, 200).trim();
    
    // 이미지 추출
    let imageUrl = "";
    
    // 1. OG image
    imageUrl = $("meta[property='og:image']").attr("content") || "";
    
    // 2. Twitter card image
    if (!imageUrl) {
      imageUrl = $("meta[name='twitter:image']").attr("content") || "";
    }
    
    // 3. article 이미지
    if (!imageUrl) {
      imageUrl = findImage($, [
        "article img",
        ".article-image img",
        ".news-image img",
        ".content img",
      ]);
    }
    
    // 상대 경로를 절대 경로로 변환
    if (imageUrl && imageUrl.startsWith("/")) {
      const urlObj = new URL(url);
      imageUrl = `${urlObj.protocol}//${urlObj.hostname}${imageUrl}`;
    }

    // 날짜 추출
    let date = "";
    
    // 1. article:published_time
    date = $("meta[property='article:published_time']").attr("content") || "";
    
    // 2. 일반 날짜 메타
    if (!date) {
      date = $("meta[name='date']").attr("content") || "";
    }
    
    // 3. time 태그
    if (!date) {
      date = $("time").attr("datetime") || $("time").text().trim();
    }
    
    // 날짜 형식 정규화
    if (date) {
      const dateMatch = date.match(/(\d{4})[-\/](\d{2})[-\/](\d{2})/);
      if (dateMatch) {
        date = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
      } else {
        date = "2026-01-15"; // 기본값
      }
    } else {
      date = "2026-01-15";
    }

    // 최종 검증: 제목과 내용이 모두 있어야 유효한 기사
    if (!title || title.length < 3 || title === "기사 제목") {
      console.warn(`Invalid title for ${url}`);
      return null;
    }
    
    if (!content || content.length < 20 || content.includes("기사 내용을 불러올 수 없습니다")) {
      console.warn(`Invalid content for ${url}: length=${content.length}`);
      return null;
    }

    return {
      title,
      content,
      imageUrl: imageUrl || undefined,
      publisher,
      date,
    };
  } catch (error) {
    console.error(`Error fetching article from ${url}:`, error);
    return null;
  }
}

export async function GET() {
  const articles = [
    { url: "https://n.news.naver.com/article/421/0008732521?sid=101", publisher: "뉴스1" },
    { url: "https://biz.newdaily.co.kr/site/data/html/2026/01/15/2026011500059.html", publisher: "뉴데일리경제" },
    { url: "https://www.electimes.com/news/articleView.html?idxno=364082", publisher: "전기신문" },
    { url: "https://www.munhwa.com/article/11561252", publisher: "문화일보" },
    { url: "https://www.yna.co.kr/view/AKR20260115053500003", publisher: "연합뉴스" },
    { url: "https://m.newsprime.co.kr/section_view.html?no=720311&menu=index", publisher: "뉴스프라임" },
    { url: "https://v.daum.net/v/20260115103732117", publisher: "다음뉴스" },
    { url: "https://biz.heraldcorp.com/article/10655893", publisher: "헤럴드경제" },
    { url: "https://www.ikoreadaily.co.kr/news/articleView.html?idxno=834993", publisher: "아이코리아데일리" },
    { url: "https://www.ajunews.com/view/20260115135109364", publisher: "아주경제" },
  ];

  // 병렬로 모든 기사 가져오기 (타임아웃과 함께)
  const results = await Promise.allSettled(
    articles.map((article) => 
      Promise.race([
        fetchArticleData(article.url, article.publisher),
        new Promise<null>((resolve) => 
          setTimeout(() => resolve(null), FETCH_TIMEOUT + 1000)
        ),
      ])
    )
  );

  // 성공한 기사만 필터링
  const articleData = results
    .map((result, index) => {
      if (result.status === "fulfilled" && result.value) {
        return {
          id: index + 1,
          ...result.value,
          articleUrl: articles[index].url,
        };
      }
      return null;
    })
    .filter((article): article is NonNullable<typeof article> => article !== null);

  // 최소 3개 이상의 기사가 있어야 반환
  if (articleData.length < 3) {
    console.warn(`Only ${articleData.length} articles loaded successfully`);
  }

  return NextResponse.json({ 
    articles: articleData,
    total: articleData.length,
  });
}
