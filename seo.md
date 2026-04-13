# SEO 실행 계획 (2·3·4)

구글 검색 노출을 위해 **기술 SEO(2)**, **콘텐츠·키워드(3)**, **링크·신뢰(4)** 중심으로 정리한 실행 계획입니다.

## 전제

- **목표 키워드·타겟**을 한 줄로 정함 (예: “AI 위험성평가”, “JSA KRAS”, “중소기업 PSM” 등).
- **정식 도메인(URL)** 하나를 기준으로 Search Console·사이트맵·canonical을 맞춤.

---

## 2. 기술 SEO — 계획 (약 2~4주, 우선순위 순)

| 단계 | 할 일 | 산출물 / 완료 기준 |
|------|--------|---------------------|
| 2-1 | **HTTPS·도메인 확정** (www vs non-www, 리다이렉트 일관) | 브라우저·curl로 최종 URL 하나로 모임 |
| 2-2 | **`robots.txt`** — 전체 허용, 사이트맵 URL 명시 | `/robots.txt` 배포 후 200 응답 |
| 2-3 | **`sitemap.xml`** — 홈, `/form`, `/contact`, 기타 공개 페이지만 | Search Console에 사이트맵 제출 |
| 2-4 | **페이지별 `metadata`** — `title`·`description` 고유화, `/form` 등 하위 경로에 `layout` 또는 `page`에서 export | 각 URL이 고유 제목·설명 |
| 2-5 | **Open Graph / Twitter 카드** — 공유·SNS 시 노출용 `og:title`, `og:description`, `og:image`(1200×630 권장) | Facebook Sharing Debugger 등으로 미리보기 확인 |
| 2-6 | **canonical** — 중복 URL(쿼리스트링, 미리보기) 정리 | `metadata.alternates.canonical` 등으로 대표 URL 고정 |
| 2-7 | **성능·모바일** — Lighthouse 모바일 점수, LCP, 폰트·이미지 최적화 | 핵심 페이지 LCP 개선 기록 |
| 2-8 | **구조화 데이터(선택)** — `Organization` / `WebSite`(검색창은 선택) / 서비스 소개에 맞는 `SoftwareApplication` 등 JSON-LD | Rich Results Test 통과 |

**마일스톤 예시**: 1주차 2-1~2-3, 2주차 2-4~2-6, 3주차 2-7, 여유 시 2-8.

**코드베이스 참고**: 루트 `app/layout.tsx`에 기본 `metadata`와 GA가 있음. 전용 `sitemap` / `robots` 라우트는 추가 시 이 문서의 2-2·2-3과 연동.

### 코드 반영 현황 (기술 SEO 일부)

| 단계 | 상태 | 구현 요약 |
|------|--------|-----------|
| 2-2 `robots.txt` | ✅ | `app/robots.ts` — 전역 허용, `sitemap` URL은 `getSiteOrigin()` 기준 |
| 2-3 `sitemap.xml` | ✅ | `app/sitemap.ts` — `/`, `/form`, `/page/contact`, `/page/miso` |
| 2-4 페이지별 메타 | ✅ | 경로별 `layout.tsx`에서 `title`·`description` (홈은 `app/(home)/layout.tsx`) |
| 2-5 OG / Twitter | ✅ | 각 레이아웃에 `openGraph`·`twitter` (이미지 없음 → `summary` 카드) |
| 2-6 canonical | ✅ | 공개 페이지 레이아웃에 `alternates.canonical` |
| 2-7 성능·모바일 | ⏳ | 별도 측정·최적화 과제 |
| 2-8 구조화 데이터 | ✅ | `components/seo/SiteJsonLd.tsx` — WebSite, Organization, SoftwareApplication |

**환경 변수**: 프로덕션·미리보기에서 canonical/sitemap 도메인을 고정하려면 `NEXT_PUBLIC_SITE_URL` 설정 (`.env.local.example` 참고). 미설정 시 Vercel은 `VERCEL_URL`, 로컬은 `http://localhost:3000`을 사용합니다.

**색인 제외**: `/form/thank-you`, `/page/form`, `/page/form/thank-you` — `robots: { index: false, follow: false }`.

**추가 권장**: `public/og.png`(1200×630) 추가 후 루트·주요 `openGraph.images`·Twitter `summary_large_image` 연동 (`seo.md` 2-5).

---

## 3. 콘텐츠·키워드 — 계획 (지속, 첫 달 집중)

| 단계 | 할 일 | 산출물 / 완료 기준 |
|------|--------|---------------------|
| 3-1 | **검색 의도별 키워드 목록** — 정보형(“위험성평가란”), 제품형(“AI JSA”), 지역·산업 결합(선택) | 스프레드시트 20~40개 |
| 3-2 | **페이지–키워드 매핑** — 한 URL에 1개 주 키워드 | 표로 “URL ↔ 주제 ↔ 보조 키워드” |
| 3-3 | **랜딩 카피 정렬** — H1·상단 문단에 주제·혜택·차별점을 자연스럽게 (나열식 키워드 스터핑 금지) | 메인·주요 섹션 문구 개정안 |
| 3-4 | **텍스트 자산 추가** — FAQ, “서비스 소개” 긴 글, 보도 요약+원문 링크, 이용 신청 안내 등 **인덱싱될 만한 고유 텍스트** | 최소 2~3개 정적 페이지 또는 섹션 |
| 3-5 | **월 1회 리뷰** — Search Console “검색 실적”에서 노출·클릭 상위 쿼리 확인 후 카피 보강 | 월간 메모 1페이지 |

**마일스톤 예시**: 2주 내 3-1~3-3, 4주 내 3-4 첫 배치, 이후 3-5 반복.

---

## 4. 링크·신뢰 — 계획 (분기 단위)

| 단계 | 할 일 | 산출물 / 완료 기준 |
|------|--------|---------------------|
| 4-1 | **내부 링크** — 메인에서 `/form`, 소개·연락처·법적 페이지로 문맥 있는 앵커 텍스트 | “신청하기”만이 아니라 설명형 링크도 섞기 |
| 4-2 | **외부 노출 목록** — 보도자료 배포처, 파트너·고객 사이트, 행사 페이지, 협회 디렉터리 등 | 후보 10곳 + 우선순위 |
| 4-3 | **백링크 실행** — 보도·인터뷰·세미나 자료에 **공식 URL** 고정, 가능하면 follow 링크 | 분기별 1~3건 성사 목표(현실적) |
| 4-4 | **브랜드 검색** — “AIR”, “MISO”, 회사명 등으로 검색 시 대표 URL이 1위에 가깝게 | Search Console 브랜드 쿼리 모니터링 |
| 4-5 | **E-E-A-T 보강(선택)** — 팀·회사 소개, 연락처, 법적 고지로 신뢰 신호 | About / Legal 정리 |

**마일스톤 예시**: 4-1은 기술 SEO와 같이 2주 내, 4-2~4-3은 분기 플랜으로 운영.

---

## 추천 실행 순서 (한눈에)

1. **2-1 → 2-3** (도메인 + robots + sitemap)
2. **2-4 → 2-6** (메타·OG·canonical)
3. **3-1 → 3-4** (키워드·카피·텍스트 페이지)
4. **4-1** (내부 링크) 병행
5. **2-7**, **4-2~4-3** (성능 + 외부 링크)
6. **2-8**, **4-5** (여유 시)

---

## 다음 구현 단계 (선택)

- 프로덕션 도메인 확정 후 Vercel·Search Console에 **`NEXT_PUBLIC_SITE_URL`** 과 동일한 URL 사용
- **`public/og.png`** (1200×630) 및 메타 `openGraph.images` 연동
- Lighthouse 기반 **2-7** 성능 개선

---

## 참고 링크

- [Google Search Console](https://search.google.com/search-console)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (OG 미리보기)
