/**
 * 기사 데이터 수집 스크립트
 * 
 * 각 기사 URL에서 실제 제목, 내용, 이미지를 수집하기 위한 스크립트입니다.
 * Node.js 환경에서 실행하거나, 브라우저 콘솔에서 실행할 수 있습니다.
 * 
 * 사용법:
 * 1. 각 URL을 브라우저에서 열기
 * 2. 개발자 도구 콘솔에서 아래 코드 실행
 * 3. 수집된 데이터를 PressSection.tsx에 업데이트
 */

const articleUrls = [
  "https://biz.newdaily.co.kr/site/data/html/2026/01/15/2026011500059.html",
  "https://www.electimes.com/news/articleView.html?idxno=364082",
  "https://www.munhwa.com/article/11561252",
  "https://www.yna.co.kr/view/AKR20260115053500003",
  "https://m.newsprime.co.kr/section_view.html?no=720311&menu=index",
  "https://www.busan.com/view/busan/view.php?code=2026011511303367914",
  "https://v.daum.net/v/20260115103732117",
  "https://biz.heraldcorp.com/article/10655893",
  "https://www.ikoreadaily.co.kr/news/articleView.html?idxno=834993",
  "https://news.nate.com/view/20260115n06518",
  "https://www.ajunews.com/view/20260115135109364",
];

// 브라우저 콘솔에서 실행할 함수
function extractArticleData() {
  const data = {
    title: "",
    content: "",
    imageUrl: "",
    publisher: "",
    date: "",
  };

  // 제목 추출 (일반적인 선택자들)
  const titleSelectors = [
    "h1",
    ".article-title",
    ".title",
    "article h1",
    ".news-title",
    "h2.title",
  ];
  
  for (const selector of titleSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      data.title = element.textContent.trim();
      break;
    }
  }

  // 내용 추출
  const contentSelectors = [
    ".article-content",
    ".article-body",
    ".news-content",
    "article .content",
    ".article_text",
    "#articleBody",
  ];
  
  for (const selector of contentSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      data.content = element.textContent.trim().substring(0, 200); // 처음 200자
      break;
    }
  }

  // 이미지 추출
  const imageSelectors = [
    "article img",
    ".article-content img",
    ".news-image img",
    "meta[property='og:image']",
  ];
  
  for (const selector of imageSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      data.imageUrl = element.src || element.content || "";
      if (data.imageUrl) break;
    }
  }

  // 언론사 추출
  const publisherSelectors = [
    ".publisher",
    ".press-name",
    "meta[property='article:publisher']",
  ];
  
  for (const selector of publisherSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      data.publisher = element.textContent?.trim() || element.content || "";
      if (data.publisher) break;
    }
  }

  // 날짜 추출
  const dateSelectors = [
    ".date",
    ".article-date",
    "time",
    "meta[property='article:published_time']",
  ];
  
  for (const selector of dateSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      data.date = element.textContent?.trim() || element.content || element.datetime || "";
      if (data.date) break;
    }
  }

  console.log("수집된 데이터:", JSON.stringify(data, null, 2));
  return data;
}

// Node.js 환경에서 사용할 경우 (puppeteer 등 필요)
async function fetchArticleWithPuppeteer(url) {
  // Puppeteer를 사용한 스크래핑 로직
  // 실제 구현 시 puppeteer 패키지 필요
  console.log("Puppeteer를 사용한 스크래핑은 별도 구현 필요");
}

module.exports = { extractArticleData, articleUrls };
