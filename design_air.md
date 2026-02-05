# 디자인 시스템 가이드

> Extreme Minimalism과 Content First 원칙을 기반으로 한 범용 랜딩페이지 디자인 시스템

---

## 📐 디자인 철학

### 핵심 원칙

1. **Extreme Minimalism (극단적 미니멀리즘)**
   - 불필요한 장식 제거 (Border, 강한 Shadow, Gradient 최소화)
   - 깔끔하고 단순한 인터페이스
   - 콘텐츠에 집중

2. **Content First (콘텐츠 우선)**
   - 콘텐츠가 UI보다 강조되어야 함
   - 텍스트는 크고 굵게, 이미지는 시원하게 배치
   - 정보의 위계는 색상보다 '크기'와 '두께'로 구분

3. **Super Ellipse (슈퍼 타원)**
   - 모든 모서리는 둥글게 처리 (24px 라운딩 기본)
   - 부드럽고 현대적인 인상

4. **Interaction (인터랙션)**
   - 사용자의 행동에 즉각적이고 부드럽게 반응
   - 클릭 시 축소 효과 (`active:scale-[0.96]`)
   - Framer Motion을 활용한 자연스러운 애니메이션

---

## 🎨 컬러 시스템

### 컬러 구조

디자인 시스템은 **브랜드 컬러**와 **기능적 컬러**로 구성됩니다. 브랜드 컬러는 프로젝트에 맞게 커스터마이징 가능합니다.

### Primary Colors (주요 색상)

| 역할 | 설명 | Tailwind Class 패턴 | 사용처 |
|------|------|---------------------|--------|
| **Brand Primary** | 브랜드 메인 컬러 | `bg-brand-primary`, `text-brand-primary` | 주요 버튼, 활성화 상태, 링크, 강조 텍스트 |
| **Brand Primary Light** | 브랜드 컬러의 연한 버전 | `bg-brand-primary-light` | 보조 버튼 배경, 선택된 아이템 배경, 아이콘 배경 |

**예시 (기본값):**
- Brand Primary: `#5542F6` (보라색)
- Brand Primary Light: `#E8E5FF` (연한 보라색)

**커스터마이징:**
`tailwind.config.ts`에서 브랜드 컬러를 변경하여 프로젝트에 맞게 조정 가능합니다.

### Background Colors (배경 색상)

| 역할 | Hex | Tailwind Class | 사용처 |
|------|-----|----------------|--------|
| **Base** | `#F2F4F6` | `bg-bg-base` | 전체 앱 배경, 섹션 배경 (교차 배경) |
| **Surface** | `#FFFFFF` | `bg-bg-surface`, `bg-white` | 카드, 모달, 콘텐츠 영역 배경 |
| **Input Background** | `#F9FAFB` | `bg-bg-input` | 입력창 배경 |

### Text Colors (텍스트 색상)

| 역할 | Hex | Tailwind Class | 사용처 |
|------|-----|----------------|--------|
| **Text Primary** | `#191F28` | `text-text-primary` | 제목, 중요 본문 (완전한 검정이 아님) |
| **Text Secondary** | `#4E5968` | `text-text-secondary` | 부가 설명, 서브 텍스트, 네비게이션 링크 |
| **Text Tertiary** | `#8B95A1` | `text-text-tertiary` | 비활성 텍스트, 플레이스홀더, 캡션 |
| **Text White** | `#FFFFFF` | `text-text-white`, `text-white` | 유색 버튼 위 텍스트 |

### Semantic Colors (의미론적 색상)

| 역할 | Hex | Tailwind Class | 사용처 |
|------|-----|----------------|--------|
| **Error** | `#F04452` | `text-semantic-error`, `bg-semantic-error` | 에러 메시지, 경고 |
| **Success** | `#5542F6` | `text-semantic-success` | 성공 메시지 (기본값은 브랜드 컬러) |

### 그라데이션 패턴

**이미지 프레임용 그라데이션:**
```css
linear-gradient(135deg, [Brand Primary Light] 0%, #FFFFFF 100%)
```

**아이콘 배경용 그라데이션:**
- 각 기능/카테고리별로 다른 색상 적용 가능
- `bg-gradient-to-br` 사용

---

## 📝 타이포그래피

### 폰트 패밀리

```css
font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif;
```

- **기본 폰트**: Pretendard (CDN 로드 권장)
- **폴백**: Apple SD Gothic Neo, 시스템 폰트

### Letter Spacing

- **기본**: `-0.02em` ~ `-0.03em` (좁게 설정)
- Tailwind: `tracking-tight`, `tracking-tighter`

### 타이포그래피 스케일

| 역할 | 모바일 | 태블릿 | 데스크탑 | Weight | Tailwind Class | 사용처 |
|------|--------|--------|----------|--------|----------------|--------|
| **H1 (Display)** | 36px | 48px | 56px | Bold (700) | `text-[36px] md:text-[48px] lg:text-[56px] font-bold` | 메인 헤드라인 |
| **H2 (Title)** | 28px | 36px | 40px | Bold (700) | `text-[28px] md:text-[36px] lg:text-[40px] font-bold` | 섹션 타이틀 |
| **H3 (Subtitle)** | 20px | 22px | 24px | SemiBold (600) | `text-[20px] md:text-[22px] font-semibold` | 카드 내부 타이틀, 부제목 |
| **Body (Main)** | 17px | 18px | 18px | Medium (500) | `text-[17px] md:text-[18px] font-medium` | 일반 본문 |
| **Body Small** | 15px | 16px | 16px | Medium (500) | `text-[15px] md:text-[16px] font-medium` | 부가 설명 |
| **Caption** | 13px | 14px | 14px | Regular (400) | `text-[13px] md:text-[14px]` | 설명 문구, 날짜, 플레이스홀더 |

### Line Height

- **Tight**: `leading-tight` (헤드라인)
- **Snug**: `leading-snug` (제목)
- **Relaxed**: `leading-relaxed` (본문)

---

## 🧩 컴포넌트 시스템

### 1. Button (버튼)

#### Primary Button
```tsx
<Button variant="primary" className="!px-8 !py-4 text-[18px]">
  주요 액션
</Button>
```

**스타일:**
- 배경: `bg-brand-primary` (브랜드 컬러)
- 텍스트: `text-text-white` (`#FFFFFF`)
- 라운딩: `rounded-[18px]`
- 패딩: `py-4` (기본), 커스텀 가능
- 인터랙션: `active:scale-[0.96]`
- 폰트: `font-bold text-[17px]` (기본)

**사용처:**
- 주요 CTA 버튼
- 네비게이션 바 CTA
- 고정 CTA 바
- 폼 제출 버튼

#### Secondary Button
```tsx
<Button variant="secondary">
  보조 액션
</Button>
```

**스타일:**
- 배경: `bg-brand-primary-light` (브랜드 컬러 연한 버전)
- 텍스트: `text-brand-primary` (브랜드 컬러)
- 라운딩: `rounded-[16px]`
- 패딩: `py-3 px-5`
- 폰트: `font-semibold`

**사용처:**
- 보조 액션 버튼
- 취소 버튼
- 보조 CTA

#### Ghost Button
```tsx
<Button variant="ghost">
  텍스트 링크
</Button>
```

**스타일:**
- 배경: 없음
- 텍스트: `text-text-secondary` (`#4E5968`)
- 언더라인: `hover:underline underline-offset-4`
- 인터랙션: `active:scale-[0.96]`

**사용처:**
- 보조 CTA
- 텍스트 링크 스타일 버튼
- "더 알아보기" 버튼

---

### 2. Card (카드)

```tsx
<Card className="h-full" interactive={true}>
  {/* 콘텐츠 */}
</Card>
```

**스타일:**
- 배경: `bg-bg-surface` (`#FFFFFF`)
- 라운딩: `rounded-[24px]`
- 패딩: `p-6` (24px)
- 그림자: `shadow-sm`
- 인터랙티브: `interactive` prop으로 `hover:shadow-md`, `active:scale-[0.98]` 적용 가능

**사용처:**
- 기능 소개 카드
- FAQ 카드
- 뉴스/기사 카드
- 제품 카드
- 특징 카드

---

### 3. Navigation Bar (네비게이션 바)

**스타일:**
- 높이: `h-[54px]` (고정)
- 배경: `bg-white/95 backdrop-blur-lg` (스크롤 시), `bg-white/90 backdrop-blur-md` (기본)
- 그림자: `shadow-md` (스크롤 시), `shadow-sm` (기본)
- 위치: `fixed top-0 left-0 right-0 z-50`
- 컨테이너: `max-w-7xl mx-auto px-4 md:px-8`

**구성 요소:**
- 로고: 브랜드 로고 이미지
- 브랜드 텍스트: `text-[15px] md:text-[16px] font-semibold text-text-secondary`
- 네비게이션 링크: `text-[14px] font-medium text-text-secondary hover:text-brand-primary`
- CTA 버튼: Primary 버튼 스타일

**베스트 프랙티스:**
- 스크롤 시 배경 투명도와 그림자 강도 조정
- 모바일 메뉴는 햄버거 아이콘으로 토글
- 활성 링크는 브랜드 컬러로 표시

---

### 4. Footer (푸터)

**스타일:**
- 배경: `bg-bg-surface` (`#FFFFFF`)
- 상단 테두리: `border-t border-gray-100`
- 패딩: `py-16 px-4 md:px-8`
- 컨테이너: `max-w-7xl mx-auto`

**구성 요소:**
- 브랜드 영역: 로고 + 브랜드 텍스트
- 연락처 정보: 아이콘 + 텍스트 (이메일, 전화번호, 주소)
- 저작권: 하단 중앙 정렬

**베스트 프랙티스:**
- 연락처 정보는 아이콘과 함께 명확하게 표시
- 소셜 미디어 링크 (선택사항)
- 저작권 정보는 작은 텍스트로 표시

---

### 5. Sticky CTA (고정 CTA)

**스타일:**
- 위치: `fixed bottom-0 left-0 right-0 z-50`
- 배경: `bg-white/95 backdrop-blur-lg`
- 그림자: `shadow-lg`
- 상단 테두리: `border-t border-gray-100`
- 패딩: `p-4`
- 애니메이션: Framer Motion (`y: 100 → 0`, `opacity: 0 → 1`)

**표시 조건:**
- 스크롤 특정 거리 이상 시 표시 (예: 300px)
- 닫기 버튼으로 숨김 가능

**베스트 프랙티스:**
- 중요한 CTA만 고정 CTA로 사용
- 사용자가 닫을 수 있는 옵션 제공
- 모바일에서도 잘 보이도록 크기 조정

---

## 📐 레이아웃 시스템

### Container (컨테이너)

```tsx
<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
  {/* 콘텐츠 */}
</div>
```

- **최대 너비**: `max-w-7xl` (1280px)
- **중앙 정렬**: `mx-auto`
- **패딩**: 
  - 모바일: `px-4` (16px)
  - 태블릿: `md:px-6` (24px)
  - 데스크탑: `lg:px-8` (32px)

### Section Spacing (섹션 간격)

```tsx
<section className="py-16 md:py-20 lg:py-24">
  {/* 섹션 콘텐츠 */}
</section>
```

- **수직 패딩**:
  - 모바일: `py-16` (64px)
  - 태블릿: `md:py-20` (80px)
  - 데스크탑: `lg:py-24` (96px)

### Grid System (그리드 시스템)

#### 2-Column Grid (2열 그리드)
```tsx
<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
  {/* 콘텐츠 */}
</div>
```

- **브레이크포인트**: `lg:` (1024px 이상)
- **간격**: `gap-12` (48px), `lg:gap-16` (64px)
- **정렬**: `items-center` (수직 중앙 정렬)

**사용처:**
- 히어로 섹션 (텍스트 + 이미지)
- 기능 소개 (이미지 + 설명)
- 프로세스 단계 (이미지 + 텍스트)

#### 3-Column Grid (3열 그리드)
```tsx
<div className="grid md:grid-cols-3 gap-6 lg:gap-8">
  {/* 콘텐츠 */}
</div>
```

- **브레이크포인트**: `md:` (768px 이상)
- **간격**: `gap-6` (24px), `lg:gap-8` (32px)

**사용처:**
- 기능 카드 그리드
- 특징 소개
- 가격 플랜
- 팀 멤버 소개

---

## 🎬 애니메이션 시스템

### Framer Motion 애니메이션

#### fadeInUp (기본 페이드 인 업)
```tsx
import { fadeInUp } from "@/utils/animations";

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
>
  {/* 콘텐츠 */}
</motion.div>
```

**효과:**
- 초기: `opacity: 0`, `y: 20`
- 애니메이션: `opacity: 1`, `y: 0`
- 지속 시간: `duration: 0.6s`
- 이징: `ease-out`

#### Scroll-triggered Animation (스크롤 트리거 애니메이션)
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={fadeInUp}
>
  {/* 콘텐츠 */}
</motion.div>
```

**설정:**
- `once: true`: 한 번만 애니메이션 실행
- `margin: "-100px"`: 뷰포트에서 100px 전에 트리거

**베스트 프랙티스:**
- 중요한 콘텐츠에만 애니메이션 적용
- 과도한 애니메이션은 피하기
- 성능을 고려하여 `once: true` 사용 권장

#### Stagger Animation (순차 애니메이션)
```tsx
import { fadeInUpStagger } from "@/utils/animations";

<motion.div
  initial="hidden"
  whileInView="visible"
  variants={fadeInUpStagger}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeInUp}>
      {/* 아이템 */}
    </motion.div>
  ))}
</motion.div>
```

**효과:**
- 각 자식 요소가 순차적으로 나타남
- 지연 시간: `0.1s` 간격

**사용처:**
- 카드 그리드
- 리스트 아이템
- 기능 목록

### 인터랙션 애니메이션

#### Click Feedback (클릭 피드백)
```tsx
className="active:scale-[0.96] transition-transform duration-200"
```

- **스케일**: `0.96` (4% 축소)
- **지속 시간**: `200ms`
- **적용 대상**: 모든 클릭 가능한 요소

#### Hover Effects (호버 효과)
```tsx
className="hover:bg-brand-primary-light hover:text-brand-primary transition-colors"
```

- **전환 시간**: 기본 `transition-colors` (150ms)
- **적용 대상**: 버튼, 링크, 카드 등

---

## 🖼️ 이미지 시스템

### 이미지 프레임 (데스크탑 화면 스타일)

```tsx
<div
  className="relative rounded-[20px] md:rounded-[24px] overflow-hidden"
  style={{
    padding: "6px",
    background: "linear-gradient(135deg, [Brand Primary Light] 0%, #FFFFFF 100%)",
    boxShadow: "0 8px 24px rgba([Brand Primary RGB], 0.08), 0 0 0 1px rgba([Brand Primary RGB], 0.06)",
  }}
>
  <div className="relative w-full aspect-video bg-white rounded-[16px] md:rounded-[20px] overflow-hidden">
    <Image src="/image.jpg" alt="..." fill className="object-cover" />
  </div>
</div>
```

**특징:**
- 외부 프레임: 그라데이션 배경 + 그림자
- 내부 프레임: 흰색 배경 + 라운딩
- 비율: `aspect-video` (16:9)

**사용처:**
- 제품 스크린샷
- 데모 비디오 썸네일
- 프로세스 단계 이미지

### Next.js Image 컴포넌트 사용

```tsx
import Image from "next/image";

<Image
  src="/logo.png"
  alt="로고"
  width={148}
  height={45}
  className="h-[32px] md:h-[40px] lg:h-[45px] w-auto"
  priority={isPriority}
/>
```

**최적화:**
- `priority`: 중요 이미지에 적용 (히어로 섹션 등)
- `sizes`: 반응형 이미지 크기 지정
- `quality`: 기본 75, 필요시 85-90
- `placeholder="blur"`: 블러 플레이스홀더 사용

**베스트 프랙티스:**
- 모든 이미지에 `alt` 속성 필수
- 로고는 `priority` 적용
- 큰 이미지는 lazy loading 사용

---

## 🎯 일반적인 랜딩페이지 패턴

### Hero Section (히어로 섹션)

**배경:**
- `bg-white` (흰색) 또는 `bg-bg-base` (회색)

**레이아웃:**
- 2열 그리드 (`lg:grid-cols-2`)
- 좌측: 텍스트 영역
- 우측: 시각적 요소 (이미지/비디오)

**구성 요소:**
- 브랜드 로고 + 설명 (선택사항)
- 메인 헤드라인 (H1)
- 부제목 또는 설명 텍스트
- 핵심 이점 리스트 (체크 아이콘 + 텍스트)
- CTA 버튼 (Primary + Ghost)

**베스트 프랙티스:**
- 메시지는 간결하고 명확하게
- CTA는 눈에 띄게 배치
- 이미지는 제품/서비스를 잘 보여주는 것 사용

---

### Features Section (기능 소개 섹션)

**배경:**
- `bg-white` (흰색)

**레이아웃:**
- 3열 그리드 (`md:grid-cols-3`)
- 중앙 정렬

**구성 요소:**
- 섹션 제목 (H2)
- 기능 카드 3개 이상:
  - 아이콘 (그라데이션 배경 원형)
  - 제목 (H3)
  - 설명 텍스트

**베스트 프랙티스:**
- 각 기능은 독립적으로 이해 가능해야 함
- 아이콘은 직관적이고 일관된 스타일 유지
- 설명은 간결하게 (2-3줄 권장)

---

### Process/Flow Section (프로세스/플로우 섹션)

**배경:**
- `bg-bg-base` (`#F2F4F6`) - 교차 배경

**레이아웃:**
- 슬라이더 기반 또는 정적 그리드
- 각 단계: 2열 그리드
- 좌측: 이미지 프레임
- 우측: 텍스트 콘텐츠

**구성 요소:**
- 섹션 제목 (H2)
- Step 배지 (`bg-brand-primary-light text-brand-primary`)
- 제목 (H3)
- 설명 텍스트
- 네비게이션 버튼 (슬라이더인 경우)

**베스트 프랙티스:**
- 단계는 명확하게 구분
- 각 단계의 목적과 결과를 명확히 설명
- 시각적 요소로 이해도 향상

---

### Testimonials/News Section (추천/뉴스 섹션)

**배경:**
- `bg-bg-base` (`#F2F4F6`) 또는 `bg-white`

**레이아웃:**
- 슬라이더 기반 또는 카드 그리드
- 카드 형태

**구성 요소:**
- 섹션 제목 (H2)
- 카드:
  - 이미지 (16:9 비율)
  - 제목
  - 발행처/작성자 + 날짜
  - 네비게이션 버튼 (슬라이더인 경우)

**베스트 프랙티스:**
- 신뢰할 수 있는 소스 표시
- 최신 정보 우선 표시
- 이미지는 관련성 있게 선택

---

### FAQ Section (FAQ 섹션)

**배경:**
- `bg-white` (흰색)

**레이아웃:**
- 카테고리별 그리드 또는 리스트

**구성 요소:**
- 섹션 제목 (H2)
- 카테고리 태그 버튼 (선택사항)
- FAQ 카드 (카테고리별)
- 연락처 배너 (선택사항)

**베스트 프랙티스:**
- 자주 묻는 질문 우선 배치
- 답변은 간결하고 명확하게
- 카테고리로 분류하여 찾기 쉽게

---

## 🎨 특수 스타일 패턴

### Badge (배지)

```tsx
<div className="inline-block bg-brand-primary-light text-brand-primary text-[14px] font-semibold px-4 py-2 rounded-full">
  라벨 텍스트
</div>
```

**스타일:**
- 배경: `bg-brand-primary-light`
- 텍스트: `text-brand-primary`
- 라운딩: `rounded-full`
- 폰트: `text-[14px] font-semibold`

**사용처:**
- Step 표시
- 카테고리 태그
- 상태 표시
- 뱃지/인증

### Icon Container (아이콘 컨테이너)

```tsx
<div className="w-6 h-6 rounded-full bg-brand-primary-light flex items-center justify-center">
  <CheckIcon className="w-4 h-4 text-brand-primary" strokeWidth={2.5} />
</div>
```

**스타일:**
- 크기: `w-6 h-6` (24px) 또는 `w-8 h-8` (32px)
- 배경: `bg-brand-primary-light`
- 라운딩: `rounded-full`
- 아이콘: `strokeWidth={2.5}` (Lucide React)

**사용처:**
- 체크리스트 아이템
- 기능 아이콘
- 상태 아이콘

### Divider (구분선)

```tsx
<div className="border-t border-gray-100"></div>
```

**사용처:**
- Footer 상단
- 섹션 구분
- 카드 내부 구분

---

## 📱 반응형 디자인

### 브레이크포인트

| 이름 | 크기 | Tailwind Prefix | 사용 예시 |
|------|------|----------------|-----------|
| **Mobile** | < 768px | 기본 (prefix 없음) | `text-[36px]` |
| **Tablet** | ≥ 768px | `md:` | `md:text-[48px]` |
| **Desktop** | ≥ 1024px | `lg:` | `lg:text-[56px]` |

### 반응형 패턴

#### 텍스트 크기
```tsx
className="text-[36px] md:text-[48px] lg:text-[56px]"
```

#### 패딩/마진
```tsx
className="px-4 md:px-6 lg:px-8"
className="py-16 md:py-20 lg:py-24"
```

#### 그리드
```tsx
className="grid md:grid-cols-3 gap-6 lg:gap-8"
```

#### 표시/숨김
```tsx
className="hidden md:flex"  // 모바일 숨김, 태블릿 이상 표시
className="md:hidden"        // 모바일 표시, 태블릿 이상 숨김
```

**베스트 프랙티스:**
- 모바일 퍼스트 접근 방식
- 터치 타겟은 최소 44x44px
- 텍스트는 읽기 쉬운 크기 유지

---

## 🔧 유틸리티 클래스

### Spacing (간격)

- **간격**: `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16`
- **마진**: `mb-4`, `mb-6`, `mb-8`, `mb-12`
- **패딩**: `p-4`, `p-6`, `p-8`

### Flexbox (플렉스박스)

```tsx
className="flex items-center justify-between gap-4"
className="flex flex-col items-center text-center"
```

### Position (위치)

- **고정**: `fixed top-0 left-0 right-0 z-50`
- **상대**: `relative`
- **절대**: `absolute inset-0`

### Overflow (오버플로우)

```tsx
className="overflow-hidden"  // 이미지 프레임 등
className="overflow-x-auto"   // 가로 스크롤
```

---

## 🎯 접근성 (Accessibility)

### ARIA 레이블

```tsx
<button aria-label="메뉴 열기">...</button>
<button aria-label={isPaused ? "재생" : "일시정지"}>...</button>
```

**베스트 프랙티스:**
- 아이콘만 있는 버튼은 반드시 `aria-label` 추가
- 상태가 변경되는 요소는 현재 상태를 명확히 표시

### 키보드 네비게이션

- 모든 인터랙티브 요소는 키보드로 접근 가능
- 슬라이더: 화살표 키 지원
- 모달: ESC 키로 닫기
- 포커스 인디케이터 명확히 표시

### 색상 대비

- 텍스트와 배경의 대비율: WCAG AA 기준 준수
- 텍스트 Primary (`#191F28`) / 배경 White (`#FFFFFF`): ✅ 충분
- 텍스트 Secondary (`#4E5968`) / 배경 White (`#FFFFFF`): ✅ 충분

**베스트 프랙티스:**
- 색상만으로 정보를 전달하지 않기
- 포커스 상태 명확히 표시
- 키보드 네비게이션 테스트 필수

---

## 🚀 커스터마이징 가이드

### 브랜드 컬러 변경

`tailwind.config.ts`에서 브랜드 컬러를 변경:

```typescript
colors: {
  brand: {
    primary: "#YOUR_COLOR",        // 메인 브랜드 컬러
    "primary-light": "#LIGHT_COLOR", // 연한 버전
  },
}
```

### 폰트 변경

`tailwind.config.ts`에서 폰트 패밀리 변경:

```typescript
fontFamily: {
  sans: ["Your Font", "fallback", "fonts"],
}
```

### 컴포넌트 확장

기존 컴포넌트를 확장하여 새로운 variant 추가:

```tsx
// Button 컴포넌트에 새로운 variant 추가
const variantStyles = {
  primary: "...",
  secondary: "...",
  ghost: "...",
  outline: "border-2 border-brand-primary text-brand-primary", // 새 variant
};
```

---

## 📚 구현 가이드

### 프로젝트 구조

```
project/
├── components/
│   ├── ui/              # 재사용 가능한 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   └── layout/          # 레이아웃 컴포넌트
│       ├── NavigationBar.tsx
│       └── Footer.tsx
├── sections/            # 페이지 섹션 컴포넌트
│   ├── HeroSection.tsx
│   └── ...
├── utils/
│   └── animations.ts    # Framer Motion 애니메이션 variants
└── tailwind.config.ts   # Tailwind CSS 설정
```

### 컴포넌트 개발 원칙

1. **재사용성**: 가능한 한 재사용 가능하게 설계
2. **Props 인터페이스**: 명확한 타입 정의
3. **기본값**: 합리적인 기본값 제공
4. **확장성**: `className` prop으로 스타일 커스터마이징 가능

### 스타일링 원칙

1. **Tailwind 우선**: 가능한 한 Tailwind 클래스 사용
2. **일관성**: 디자인 시스템의 규칙 준수
3. **반응형**: 모바일 퍼스트 접근
4. **성능**: 불필요한 스타일 제거

---

**Last Updated**: 2026-01-26  
**Version**: 2.0.0 (범용 디자인 시스템)
