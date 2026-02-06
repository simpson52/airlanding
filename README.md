# AIR Landing Page Project

> 현장 데이터 기반의 지능형 안전관리 솔루션 'AIR'의 고전환율 랜딩페이지 프로젝트

---

## 📋 프로젝트 개요

**프로젝트명**: AIR 랜딩페이지  
**목적**: 현장 데이터 기반의 지능형 안전관리 솔루션 'AIR'를 소개하는 고전환율 랜딩페이지 구축  
**타겟**: 산업 현장 안전 관리 담당자, 안전 관리자, 기업 의사결정자  
**핵심 가치 제안**: JSA + KRAS + SIF를 결합한 국내 유일의 현장 데이터 기반 지능형 안전관리 시스템  
**디자인 철학**: Toss 스타일의 Extreme Minimalism + Content First 원칙 적용

---

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Video**: HTML5 Video API
- **Form**: React Hook Form (설문조사용)
- **Validation**: Zod (폼 검증)
- **Font**: Pretendard (CDN 로드)
- **State Management**: React Context API (ContentViewContext)

---

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: `#5542F6` (MISO Brand Color - 보라색)
- **Primary Light**: `#E8E5FF`
- **Background**: `#F2F4F6` (Base), `#FFFFFF` (Surface)
- **Text**: `#191F28` (Primary), `#4E5968` (Secondary), `#8B95A1` (Tertiary)

### 타이포그래피
- **H1 (Display)**: 28px~36px, Bold (700)
- **H2 (Title)**: 22px~24px, Bold (700)
- **H3 (Subtitle)**: 18px~20px, SemiBold (600)
- **Body (Main)**: 16px~17px, Medium (500)
- **Caption**: 13px~14px, Regular (400)

### UI 컴포넌트 원칙
- **Cards**: 테두리 없음, 흰색 배경, `rounded-[24px]`
- **Buttons**: Primary (꽉찬 스타일), Secondary (연한 배경), Ghost (배경 없음)
- **Inputs**: 테두리 없이 배경색으로 구분, `rounded-[16px]`
- **Interaction**: `active:scale-[0.96]` 클릭 피드백 필수
- **Extreme Minimalism**: 불필요한 장식 제거
- **Content First**: 콘텐츠 중심 레이아웃
- **Super Ellipse**: 둥근 모서리 (`rounded-[24px]`)

---

## 📐 페이지 구조 (4개 섹션)

### Section 1: 소개 영상 (Hero Video)

**목적**: 첫 인상을 강하게 전달하고 서비스의 핵심 가치를 시각적으로 전달

**요구사항**:
- 전체 화면 비디오 배경 (16:9 비율)
- 텍스트 오버레이 없음 (순수 비디오만)
- 자동 재생, 무음, 반복 재생
- 모바일 대응: 비디오가 화면을 가득 채우도록 조정
- 로딩 상태 처리 (비디오 로딩 중 플레이스홀더)

**기술 사양**:
- YouTube 비디오 임베드 사용
- 환경 변수: `.env` 파일에 `NEXT_PUBLIC_YOUTUBE_URL`에 YouTube 링크 붙여넣기
  - 지원 형식: `https://www.youtube.com/watch?v=VIDEO_ID`, `https://youtu.be/VIDEO_ID` 등
  - 또는 비디오 ID만 입력 가능
- 자동 재생, 무음, 반복 재생 설정
- 전체 화면 배경으로 표시 (16:9 비율 유지)
- YouTube URL에서 자동으로 비디오 ID 추출

---

### Section 2: User Flow 갤러리 (작업 흐름)

**목적**: 사용자가 AIR를 사용하는 실제 작업 흐름을 단계별로 시각화

**요구사항**:
- 슬라이드/갤러리 형태로 여러 화면을 넘기며 볼 수 있음
- 각 슬라이드: AIR 대시보드 화면 캡처 또는 목업
- 좌우 네비게이션 화살표 또는 인디케이터
- 키보드 네비게이션 지원 (← →)
- 모바일: 스와이프 제스처 지원

**User Flow 단계**:
1. **작업 내용 입력**: 어떤 작업을 계획하고 계신가요? (작업 내용, 사용 장비, 인원 등을 자유롭게 설명해주시면 MISO AI 기반의 AIR가 위험성평가서를 작성합니다)
2. **MISO AI 기반 위험요인 자동 식별**: MISO AI가 작업 내용을 기반으로 KOSHA Guide 기반 위험요인을 선정합니다
3. **고위험요인(SIF) 사례 기반 작성**: 작업과 관련된 유사 재해 사례를 참조하여 위험성평가에 반영하세요. *고용노동부에서 제공한 고위험요인(SIF) 사례 자료
4. **MISO AI 기반 위험성 평가서 작성**: MISO AI가 작성한 위험성평가를 검토하고 현장 상황에 맞게 보완하세요
5. **체크리스트 간편 작성**: MISO AI가 추천한 안전대책을 기반으로 현장에 맞는 체크리스트를 작성해 위험성을 낮추세요

**기술 사항**:
- 각 단계별 화면 이미지 (16:9 비율)
- 이미지 최적화 (Next.js Image 컴포넌트, Lazy loading, Priority loading)
- 부드러운 전환 애니메이션
- 각 슬라이드에 단계 번호 및 간단한 설명
- 우측 상단 네비게이션 버튼 (< >)
- 자동 재생 (5초마다 자동 전환)
- 순환형 슬라이더 (첫 페이지 ↔ 마지막 페이지 순환)
- 드래그/스와이프 제스처 지원 (모바일 및 데스크톱)
- 키보드 네비게이션 (← →)
- iframe 스타일 프레임 디자인 (그라데이션 배경, rounded corners)

---

### Section 3: 시스템 강점 카드 섹션 (Features Showcase)

**목적**: AIR의 핵심 강점과 차별화 포인트를 시각적으로 강조

**요구사항**:
- 카드 그리드 레이아웃 (3열)
- 3가지 핵심 강점을 카드 형태로 표시 (비개발자/안전담당자 중심)
- 각 카드 클릭 시 모달로 상세 내용 표시
- 모달 내부: 16:9 비율 이미지 + 상세 텍스트 설명
- ESC 키 또는 배경 클릭으로 모달 닫기

**시스템 강점** (3가지 - 비개발자/안전담당자 중심):
1. **AI Expert**: 비틈없는 위험 발굴 - 440개 사례 기반 AI가 적절한 위험성평가서를 추천하여 누락 없는 위험 발굴을 보장
2. **Compliance**: 법적 기준 완벽 준수 - KOSHA GUIDE를 완벽히 준수하는 보고서를 자동 생성하여 법규 준수 부담을 줄임
3. **Action Plan**: 실행 중심 체크리스트 - 조치사항 체크리스트를 즉시 발행하여 현장에서 바로 실행 가능한 계획 수립

**기술 사항**:
- 카드 그리드: `md:grid-cols-3`
- 각 카드: 아이콘, 제목, 부제목, 짧은 설명
- 모달: 16:9 비율 이미지 영역 + 상세 텍스트
- Framer Motion 모달 애니메이션
- 접근성: 키보드 네비게이션 (ESC), ARIA labels

---

### Section 4: FAQ & 데모 신청 (Contact & Inquiry)

**목적**: 사용자의 궁금증 해소 및 데모 신청 유도

**요구사항**:
- FAQ 섹션 (Accordion 스타일)
- "시작하기" CTA 버튼 (버튼 크기 최적화: 세로 30% 축소, 가로 FAQ 섹션 너비에 맞춤)
- 버튼 클릭 시 설문조사 페이지로 이동 (`/demo-request`)
- 부드러운 페이지 전환 애니메이션

**FAQ 항목**:
1. 데이터 보안은 어떻게 보장되나요?
2. 구현까지 얼마나 걸리나요?
3. 기존 안전관리 시스템과 연동이 가능한가요?
4. 주니어 사원 비율 증가에 대응하는 기능이 있나요?

**데모 신청 설문조사**:
- 설문조사 내용은 `research.md` 파일에서 관리
- 설문조사 페이지는 별도 라우트로 구성 (`/demo-request`)
- 입력 필드: 이름, 이메일, 휴대폰번호 (필수)
- 추가 필드: 회사명, 부서, 문의사항 (선택)
- 제출 후 감사 메시지 표시

---

### Contact 페이지 (`/page/contact`)

**목적**: 회사 연락처 정보 및 위치 안내

**요구사항**:
- 좌우 2열 레이아웃 (데스크톱)
  - 좌측: 회사 연락처 정보 카드
  - 우측: Google Maps 지도
- 모바일: 세로로 쌓이는 레이아웃
- 연락처 정보: 이메일, 전화번호, 주소
- 오시는 길 정보: 지하철, 버스 노선 안내

**연락처 정보**:
- 이메일: contact@miso.ai
- 전화번호: 02-2000-0000
- 주소: 서울특별시 강남구 논현로 508 GS강남타워 25층
- 지하철: 2호선 역삼역 7번 출구 지하 GS타워 연결통로 이용
- 버스: 간선/순환 (146, 147, 341, 360, 740, 41), 직행/급행 (1100, 1700, 2000, 7007, 8001)

**기술 사항**:
- Google Maps iframe embed 사용
- 주소 검색: "서울특별시 강남구 논현로 508 GS강남타워" (건물 단위)
- 표시 주소: "서울특별시 강남구 논현로 508 GS강남타워 25층" (층수 포함)
- 아이콘 기반 연락처 정보 표시 (Mail, Phone, MapPin)
- 반응형 디자인 적용

---

## 📅 작업 계획 (마일스톤)

### Phase 1: 프로젝트 초기 설정 (Foundation) ✅
- [x] Next.js 프로젝트 초기화
- [x] Tailwind CSS 설정 및 디자인 시스템 변수 적용
- [x] Framer Motion 설치 및 기본 애니메이션 유틸리티 구성
- [x] 프로젝트 폴더 구조 설계 (components, sections, utils, types)
- [x] 기본 레이아웃 컴포넌트 생성 (NavigationBar, Footer)

### Phase 2: 공통 컴포넌트 개발 (Components) ✅
- [x] Navigation Bar 컴포넌트 (Sticky, Glassmorphism, MISO 로고, 높이 54px)
- [x] Button 컴포넌트 (Primary, Secondary, Ghost variants)
- [x] Card 컴포넌트 (Toss 스타일 적용)
- [x] Input 컴포넌트 (테두리 없는 스타일)
- [x] Accordion 컴포넌트 (FAQ용)
- [x] Icon 시스템 설정 (Lucide React)
- [x] Slider 컴포넌트 (슬라이드/갤러리, 키보드 네비게이션, 스와이프 제스처, 드래그 지원)
- [x] Modal 컴포넌트 (모달, ESC 키 지원, 배경 클릭 닫기, UX 개선)
- [x] MisoLogo 컴포넌트 (이미지 로드 실패 시 폴백 텍스트)
- [x] ContentViewContext (iframe 전환 기능)

### Phase 3: 섹션별 구현 (Sections) ✅
- [x] Section 1: 소개 영상 (YouTube 비디오 임베드 구현)
- [x] Section 2: User Flow 갤러리 구현 (슬라이드/갤러리, 실제 5단계, 드래그/스와이프 지원)
- [x] Section 3: 시스템 강점 카드 섹션 구현 (카드 그리드 + 모달, 3가지 강점, UX 개선)
- [x] Section 4: FAQ 및 데모 신청 버튼 (버튼 크기 최적화)
- [x] Navigation Bar 및 Footer (MISO 로고 통합, iframe 전환 기능)
  - [x] iframe 통합 (About MISO, with 52g 버튼 클릭 시 태블릿 프레임 스타일로 표시)

### Phase 4: 설문조사 페이지
- [ ] 설문조사 폼 구현 (`/demo-request`)
- [ ] React Hook Form + Zod 통합
- [ ] 폼 검증 및 제출 처리
- [ ] 감사 메시지 페이지 (`/demo-request/thank-you`)

### Phase 5: 애니메이션 및 인터랙션 ✅ (부분 완료)
- [x] Scroll-triggered animations (fade-in, slide-up) - 모든 섹션에 적용
- [x] 갤러리 슬라이드 애니메이션 - Slider 컴포넌트에 구현
- [x] 키보드 네비게이션 구현 - Slider 컴포넌트 (← →), Modal (ESC)
- [x] 모바일 스와이프 제스처 구현 - Slider 컴포넌트에 구현
- [x] 데스크톱 드래그 제스처 구현 - Slider 컴포넌트에 구현
- [ ] 페이지 전환 애니메이션 (설문조사 페이지 이동 시)

### Phase 6: 반응형 및 최적화
- [x] Desktop First 디자인 (PC 우선)
- [x] 모바일 반응형 디자인 적용 (iframe 반응형 개선)
- [ ] 비디오 최적화 (Lazy loading, 압축)
- [x] 이미지 최적화 (Next.js Image 컴포넌트, Priority/Lazy loading)
- [x] 성능 최적화 (Lazy loading, Code splitting)
- [x] GPU 가속 애니메이션 (transform, opacity)

### Phase 7: 접근성 및 SEO
- [ ] 키보드 네비게이션 (모든 인터랙티브 요소)
- [ ] ARIA Labels (스크린 리더 지원)
- [ ] 색상 대비 (WCAG AA 기준)
- [ ] 포커스 인디케이터
- [ ] Meta Tags (title, description)
- [ ] Open Graph (소셜 미디어 공유)
- [ ] Structured Data (Schema.org 마크업, 선택적)

### Phase 8: 테스트 및 배포
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 디바이스 테스트
- [ ] 성능 테스트 (Lighthouse)
- [ ] 접근성 테스트
- [ ] 배포 환경 설정 (Vercel 권장)
- [ ] 최종 SEO 최적화

---

## ✅ 액션아이템 (Action Items)

### 🔴 High Priority (우선순위 높음)
- [x] **A-001**: Next.js 프로젝트 초기화 및 기본 설정 ✅
- [x] **A-002**: Tailwind CSS 설정 및 디자인 시스템 컬러 변수 정의 ✅
- [x] **A-003**: Navigation Bar 컴포넌트 개발 (Glassmorphism 적용) ✅
- [x] **A-004**: Section 1 소개 영상 구현 (YouTube 비디오 임베드) ✅
- [x] **A-005**: Section 2 User Flow 갤러리 구현 (실제 5단계) ✅

### 🟡 Medium Priority (중간 우선순위)
- [x] **A-006**: Button 컴포넌트 시스템 구축 (Primary, Secondary, Ghost) ✅
- [x] **A-007**: Card 컴포넌트 개발 (Toss 스타일) ✅
- [x] **A-008**: Section 3 시스템 강점 카드 섹션 구현 (카드 그리드 + 모달) ✅
- [x] **A-009**: Section 4 FAQ 및 데모 신청 구현 ✅
- [ ] **A-010**: 설문조사 페이지 구현 (`/demo-request`)

### 🟢 Low Priority (우선순위 낮음)
- [x] **A-011**: FAQ Accordion 컴포넌트 개발 ✅
- [x] **A-012**: Footer 컴포넌트 구현 ✅
- [x] **A-013**: Scroll 애니메이션 유틸리티 개발 ✅
- [x] **A-014**: 키보드 네비게이션 구현 (Slider, Modal) ✅
- [x] **A-015**: 모바일 스와이프 제스처 구현 (Slider 컴포넌트) ✅

---

## 📝 진행 상황 추적

### 완료된 작업
- [x] 프로젝트 문서화 (README, Design System, Page Guide, Research)
- [x] 작업 계획 수립 및 문서 통합 (README.md + PRD.md)
- [x] **Phase 1 완료**: Next.js 프로젝트 초기 설정
  - [x] package.json, tsconfig.json, next.config.js 생성
  - [x] Tailwind CSS 설정 및 디자인 시스템 변수 적용
  - [x] 프로젝트 폴더 구조 생성 (app, components, sections, utils, types)
  - [x] 기본 레이아웃 컴포넌트 생성 (NavigationBar, Footer)
  - [x] 애니메이션 유틸리티 구성 (utils/animations.ts)
  - [x] YouTube 유틸리티 함수 생성 (utils/youtube.ts)
  - [x] .env.example 파일 생성
- [x] **Phase 2 완료**: 공통 컴포넌트 개발
  - [x] Button 컴포넌트 (Primary, Secondary, Ghost variants)
  - [x] Card 컴포넌트 (Toss 스타일, 인터랙티브 옵션)
  - [x] Input 컴포넌트 (테두리 없는 스타일)
  - [x] Accordion 컴포넌트 (FAQ용, Framer Motion 애니메이션)
  - [x] NavigationBar 컴포넌트 (Glassmorphism, Sticky, 모바일 메뉴)
  - [x] Footer 컴포넌트 (소셜 미디어, 링크, Copyright)
  - [x] Slider 컴포넌트 (슬라이드/갤러리, 키보드 네비게이션, 스와이프 제스처, 드래그 지원, forwardRef 지원, 순환형 슬라이더)
  - [x] Modal 컴포넌트 (모달, ESC 키, 배경 클릭 닫기, 스크롤 잠금, UX 개선)
  - [x] MisoLogo 컴포넌트 (이미지 로드 실패 시 폴백 텍스트, Next.js Image 컴포넌트 사용)
  - [x] TabletFrame 컴포넌트 (iframe용 태블릿 프레임, MISO 브랜드 스타일, 반응형 최적화)
  - [x] ContentViewContext (iframe 전환 기능)
  - [x] Lucide React 아이콘 시스템 통합
- [x] **Phase 3 완료**: 새로운 4개 섹션 구현
  - [x] Section 1: HeroVideoSection (YouTube 비디오 임베드, 전체 화면, URL 파싱 지원)
  - [x] Section 2: UserFlowSection (슬라이드 갤러리, 실제 5단계 User Flow, 드래그/스와이프 지원, 우측 상단 네비게이션 버튼, 자동 재생, 순환형 슬라이더, 이미지 최적화)
  - [x] Section 3: FeaturesShowcaseSection (카드 그리드, 3가지 강점, 모달 상세 뷰, UX 개선)
  - [x] Section 4: FAQContactSection (FAQ Accordion, 시작하기 버튼, 버튼 크기 최적화)
  - [x] NavigationBar 개선 (MISO 로고, 'AI 위험성 평가서 AIR' 텍스트, 높이 54px, 'About MISO', 'with 52g' 버튼, 항상 고정 표시)
  - [x] Footer 개선 (MISO 로고, 'AI 위험성 평가서 AIR' 텍스트, 설명 텍스트 변경, 빠른 링크 제거, 소셜 미디어 아이콘 변경)
  - [x] iframe 통합 (ContentViewContext, 'About MISO'와 'with 52g' 클릭 시 태블릿 프레임 스타일로 표시)
- [x] **Contact 페이지 구현** (`/page/contact`)
  - [x] Contact 페이지 생성 및 라우팅 설정
  - [x] 좌우 2열 레이아웃 (회사 정보 카드 + Google Maps)
  - [x] 연락처 정보 표시 (이메일, 전화번호, 주소)
  - [x] Google Maps 통합 (주소 검색 및 표시)
  - [x] 오시는 길 정보 추가 (지하철, 버스 노선)
  - [x] 반응형 디자인 적용
- [x] **Phase 5 부분 완료**: 애니메이션 및 인터랙션
  - [x] Scroll-triggered animations (모든 섹션 적용)
  - [x] 갤러리 슬라이드 애니메이션 (Framer Motion)
  - [x] 키보드 네비게이션 (Slider: ← →, Modal: ESC)
  - [x] 모바일 스와이프 제스처 (Slider 컴포넌트)
  - [x] 데스크톱 드래그 제스처 (Slider 컴포넌트)
  - [x] 모달 애니메이션 (Framer Motion, UX 개선)

### 진행 중인 작업
- 현재 없음

### 다음 작업
- **Phase 4**: 설문조사 페이지 구현 (`/demo-request`)
  - React Hook Form + Zod 통합
  - 폼 검증 및 제출 처리
  - 감사 메시지 페이지 (`/demo-request/thank-you`)
- **Phase 6**: 반응형 및 최적화
  - 이미지 최적화 (Next.js Image 컴포넌트)
  - 비디오 최적화
  - 성능 최적화 (Lazy loading, Code splitting)
- **Phase 7**: 접근성 및 SEO
  - Meta Tags 설정
  - Open Graph 설정
  - 접근성 개선

---

## 📁 프로젝트 구조

```
AIR_Landing/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃
│   ├── page.tsx                 # 메인 페이지
│   ├── page/                    # 추가 페이지
│   │   └── contact/            # Contact 페이지
│   │       └── page.tsx        # Contact 페이지 컴포넌트
│   └── globals.css              # 전역 스타일
├── components/                  # 재사용 가능한 컴포넌트
│   ├── layout/                 # 레이아웃 컴포넌트
│   │   ├── NavigationBar.tsx   # 네비게이션 바
│   │   └── Footer.tsx          # 푸터
│   ├── providers/              # Context Providers
│   │   └── ContentViewProvider.tsx # ContentView Context Provider
│   └── ui/                      # UI 컴포넌트
│       ├── Button.tsx          # 버튼 (Primary, Secondary, Ghost)
│       ├── Card.tsx            # 카드
│       ├── Input.tsx           # 입력 필드
│       ├── Accordion.tsx       # 아코디언
│       ├── Slider.tsx          # 슬라이드/갤러리
│       ├── Modal.tsx           # 모달
│       ├── MisoLogo.tsx        # MISO 로고 (폴백 지원)
│       ├── TabletFrame.tsx     # 태블릿 프레임 (iframe용)
│       └── index.ts            # Export
├── contexts/                    # React Context
│   └── ContentViewContext.tsx  # ContentView 상태 관리
├── sections/                     # 페이지 섹션 컴포넌트
│   ├── HeroVideoSection.tsx    # Section 1: 소개 영상
│   ├── UserFlowSection.tsx     # Section 2: User Flow 갤러리
│   ├── FeaturesShowcaseSection.tsx # Section 3: 시스템 강점 카드
│   ├── FAQContactSection.tsx   # Section 4: FAQ & 데모 신청
│   └── index.ts                # Export
├── utils/                        # 유틸리티 함수
│   ├── animations.ts           # Framer Motion 애니메이션
│   └── youtube.ts              # YouTube URL 파싱 유틸리티
├── types/                        # TypeScript 타입 정의
│   └── index.ts
├── .env.example                  # 환경 변수 예시 파일
├── research.md                   # 설문조사 관리 문서
├── package.json
├── tsconfig.json
├── tailwind.config.ts           # Tailwind CSS 설정 (디자인 시스템)
└── next.config.js
```

---

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. YouTube 비디오 설정
```bash
# .env 파일 생성
cp .env.example .env

# .env 파일 편집하여 YouTube 링크 붙여넣기
# NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인하세요.

---

## 📚 참고 문서

- **Survey Design**: `survey.md` - 설문조사 기능 설계 문서
- **Development Guide**: `guide.md` - 개발 환경 설정 가이드
- **Design System**: `.cursor/rules/design.mdc` - Toss 스타일 디자인 시스템 가이드
- **Page Guide**: `.cursor/rules/page.mdc` - 랜딩페이지 설계 가이드라인

---

## 🔄 업데이트 로그

### 2026-01-26 (브랜드 문구 통일: 시스템 → 솔루션)
- ✅ **텍스트 전역 변경**
  - "AI기반 위험성 평가 시스템" → "AI기반 위험성 평가 솔루션"
  - 적용: 페이지 타이틀(layout.tsx), NavigationBar, Footer(2곳)

### 2026-01-26 (SonarQube 코드 품질 개선 및 텍스트 변경)
- ✅ **SonarQube 코드 품질 이슈 수정 (8개)**
  - PressSection.tsx (5개 이슈)
    - 사용되지 않는 변수 제거 (`currentSlideIndex`)
    - 중첩된 삼항 연산자 리팩토링 (IIFE 패턴으로 변경)
    - Array index key 문제 해결 (고유 key 생성)
    - `replace()` → `replaceAll()` 변경
    - 함수 중첩 깊이 문제 해결 (컴포넌트 분리: `ArticleImage`, `ArticleCard`, `SlideItem`)
  - NavigationBar.tsx (1개 이슈)
    - 부정 조건 개선 (Early return 패턴 적용)
  - HeroSection.tsx (1개 이슈)
    - TODO 주석 처리 (일반 주석으로 변경)
  - UserFlowSection.tsx (1개 이슈)
    - 중첩된 삼항 연산자 리팩토링 (IIFE 패턴으로 변경)
- ✅ **텍스트 변경**
  - 모든 "News" → "NEWS"로 변경 (PressSection, NavigationBar)
- ✅ **코드 품질 개선 효과**
  - 함수 중첩 깊이 감소 (4단계 이하로 유지)
  - 가독성 향상 (중첩된 삼항 연산자 제거)
  - 재사용성 향상 (컴포넌트 분리)
  - 타입 안정성 향상 (Props interface 정의)
- 📝 **참고**: SonarQube 분석 결과 및 개선 가이드는 `sonar.md` 참조

### 2026-01-26 (코드 리팩토링 완료)
- ✅ **Phase 1: 사용되지 않는 컴포넌트 및 파일 제거**
  - `sections/HeroVideoSection.tsx` 제거 (사용되지 않음)
  - `components/ui/TabletFrame.tsx` 제거 (HeroVideoSection에서만 사용)
  - `components/ui/MisoLogo.tsx` 제거 (어디서도 사용되지 않음)
  - `components/ui/Input.tsx` 제거 (어디서도 사용되지 않음)
  - `scripts/fetch-articles.js` 제거 (개발용 스크립트, 미사용)
  - `sections/index.ts`, `components/ui/index.ts`에서 관련 export 제거
- ✅ **Phase 2: ContentViewContext 리팩토링**
  - `contexts/ContentViewContext.tsx` 제거 (불필요한 Context)
  - `components/providers/ContentViewProvider.tsx` 제거
  - `app/layout.tsx`에서 Providers 제거
  - NavigationBar 단순화 (Context 없이 라우팅만 사용)
  - 빈 폴더 정리 (`contexts/`, `components/providers/`)
- ✅ **Phase 4: Import/Export 정리**
  - `sections/HeroSection.tsx`: `fadeInUpStagger` import 제거 (사용되지 않음)
  - `types/index.ts` 제거 (사용되지 않는 타입 정의)
  - `utils/youtube.ts`: `getYouTubeVideoId()` 함수 제거 (사용되지 않음)
  - 빈 폴더 정리 (`types/`)
- ✅ **Phase 5: 코드 구조 최적화**
  - 사용되지 않는 유틸리티 함수 제거
  - 사용되지 않는 타입 정의 제거
  - 코드 가독성 향상
- ✅ **검증 결과**
  - 빌드 성공: `npm run build` 통과
  - Linter 오류 없음
  - 모든 페이지 정상 작동 확인
  - 번들 크기 최적화: `/page/miso` 6.82 kB → 6.02 kB
- 📝 **참고**: 리팩토링 계획 및 진행 상황은 `refac.md` 참조

### 2026-01-26 (CTA 버튼 및 네비게이션 텍스트 변경)
- ✅ **CTA 버튼 텍스트 통일**
  - 모든 '무료 데모 신청하기' → 'AIR로 위험성평가하기'로 변경
  - HeroSection, NavigationBar, StickyCTA 컴포넌트에 적용
- ✅ **네비게이션 텍스트 변경**
  - 모든 '보도자료' → 'News'로 변경
  - NavigationBar, PressSection에 적용
- ✅ **About MISO 페이지 개선**
  - 설명 텍스트 삭제: 'GS그룹이 만든 비개발자를 위한 현장 맞춤형 AI 플랫폼'
  - CTA 버튼 텍스트: '미소 소개 자료 신청 >' → '도입 문의'
  - CTA 버튼 색상: `#5542F6` (MISO CI 색상)로 변경

### 2026-01-26 (About MISO 페이지 헤드라인 개선)
- ✅ **About MISO 페이지 헤드라인 수정**
  - "우리 회사를 위한 GenAI PlayGround MISO" → "우리 회사를 위한(줄바꿈)AI PlayGround(줄바꿈)miso-logo.svg"
  - "GenAI" → "AI"로 변경
  - "MISO" 텍스트를 `miso-logo.svg` 이미지로 교체
  - 각 요소가 새 줄에 표시되도록 줄바꿈 구조 유지
- ✅ **MISO 로고 크기 조정**
  - miso-logo.svg 이미지 크기를 30% 증가
  - 높이: `h-[32px] md:h-[40px] lg:h-[48px]` → `h-[42px] md:h-[52px] lg:h-[62px]`
  - width: 120 → 156, height: 40 → 52

### 2026-01-26 (브랜드 색상 통일 및 디자인 시스템 업데이트)
- ✅ **브랜드 색상 통일**
  - 모든 버튼, 강조 색상을 MISO CI 색상 `#5542F6`로 통일
  - 기존 `#3182F6` 색상을 모두 `#5542F6`로 변경
  - `tailwind.config.ts`: 이미 `#5542F6`로 설정되어 있음 (자동 적용)
  - `design.mdc`: Brand Blue 색상 `#3182F6` → `#5542F6`로 업데이트
  - `output.md`: 문서 내 색상 참조 업데이트
- ✅ **그라데이션 색상 수정**
  - HeroSection, UserFlowSection의 그라데이션 색상 `#E8F3FF` → `#E8E5FF`로 변경
  - Brand Blue Light 색상과 일치하도록 조정
- ✅ **코드 검증**
  - 모든 컴포넌트가 Tailwind 클래스(`bg-brand-blue`, `text-brand-blue` 등) 사용 확인
  - 인라인 스타일의 `rgba(85, 66, 246, ...)` 값이 이미 `#5542F6`의 RGB 값임을 확인
  - 하드코딩된 `#3182F6` 색상 없음 확인

### 2026-01-26 (About MISO 페이지 구현 및 UI/UX 개선)
- ✅ **About MISO 페이지 구현**
  - `/page/miso` 경로에 About MISO 페이지 생성
  - Hero 섹션: GenAI PlayGround MISO 소개 및 YouTube 비디오 임베드
  - 팀 업무 활용 섹션: GenAI 활용 안내
  - 미소 앱 유형 섹션: 에이전트 앱, 워크플로우 앱, 챗플로우 앱 카드 (3개)
  - Case Study 섹션: 3개 케이스 스터디 카드 (파카소, 위험성평가서, 백투백 계약서)
  - 각 섹션 사이 회색 구분선 추가
  - Case Study 썸네일 이미지 자동 로딩 API 추가 (`/api/case-study-preview`)
- ✅ **네비게이션바 개선**
  - About MISO 링크를 `/page/miso`로 연결
  - 보도자료, FAQ 스크롤 링크 추가 (usePathname 사용)
  - About MISO 페이지에서도 보도자료/FAQ 클릭 시 랜딩페이지로 이동 후 스크롤
- ✅ **HeroSection 텍스트 수정**
  - "약 4,400개 사례*" → "4,400개 사례*" ("약" 제거)
- ✅ **FeaturesShowcaseSection 제목 레이아웃 변경**
  - AIR 로고 + 별표(*) (같은 줄)
  - "*AI Risk Assessment" 설명 텍스트 (로고 아래)
  - "핵심 강점" 제목 (설명 아래)
  - 별표 스타일: UserFlowSection Step 2, Step 4와 동일 (크고 파란색)
- ✅ **FeaturesShowcaseSection 카드 설명 텍스트 개선**
  - 카드 1: "위험성 평가 시간을 5분 이하로" 줄바꿈 추가
  - 카드 2: "검증된 평가 기법으로 표준화해" 줄바꿈 추가
  - 카드 3: "AI 기반 위험성 평가 결과를" 및 "바로 적용 가능한 체크리스트로 변환해" 줄바꿈 추가
- ✅ **배너 하단 안내 문구 추가**
  - "▲ 배너를 누르면 MISO에 대한 자세한 정보가 표시됩니다" 문구 추가
  - 큰 텍스트 크기 (`text-[16px] md:text-[18px]`), 보라색 (`text-brand-blue`), 애니메이션 효과
- ✅ **리다이렉트 설정**
  - `/miso` → `/page/miso` 영구 리다이렉트 추가 (next.config.js)
  - 운영환경에서 localhost로 이동하는 문제 해결
- ✅ **문서 추가**
  - `survey.md`: 설문조사 기능 설계 문서 추가 (질문 구성, UI/UX 가이드라인, 액션아이템)
  - `guide.md`: 개발 환경 설정 가이드 추가 (설치, 실행, 배포, 트러블슈팅)

### 2025-01-26 (관련기사 섹션 개선 및 섹션 배경색 수정)
- ✅ **관련기사 섹션 네비게이션 개선**
  - 워크플로우 섹션과 동일한 방식으로 네비게이션 구현 (Slider 컴포넌트 사용)
  - 일시정지/재생 버튼, 이전/다음 버튼 추가
  - 자동 재생 기능 (8초 간격)
  - 순환형 네비게이션 및 키보드/스와이프 제스처 지원
  - 네비게이션 버튼을 카드 섹션 내부 우측 상단으로 이동
- ✅ **섹션 배경색 수정**
  - HeroSection: `bg-white` (흰색)
  - UserFlowSection: `bg-bg-base` (회색 #F2F4F6)
  - FeaturesShowcaseSection: `bg-white` (흰색)
  - PressSection: `bg-bg-base` (회색 #F2F4F6)
  - FAQContactSection: `bg-white` (흰색)
  - 각 섹션이 번갈아가며 색상 구분되도록 수정

### 2025-01-26 (Phase 1 완료: Hero Section 재구성 및 CTA 전략 강화)
- ✅ **Phase 1 완료: Hero Section 재구성**
  - 태블릿 프레임 제거, 전통적인 Hero Section으로 변경
  - 데스크탑용 2열 레이아웃 구현 (좌측: 텍스트, 우측: 화면 미리보기)
  - 헤드라인: "AI 기반 위험성 평가서, 이제 1분이면 충분합니다"
  - 부제목: "약 4,400개 사례* 기반 AI가 자동으로 작성하는\n현장 맞춤형 위험성 평가서" (*고용노동부 제공 고위험요인(SIF) 사례)
  - 3가지 핵심 이점: 한국산업안전보건공단 지침 준수, JSA 및 KRAS 기법 기반 위험성평가, 현장 작업 맞춤형 체크리스트 생성
  - Primary/Secondary CTA 버튼 추가
- ✅ **Phase 1 완료: CTA 전략 강화**
  - Hero Section: Primary CTA ("무료 데모 신청하기") + Secondary CTA ("더 알아보기")
  - Navigation Bar: CTA 메시지 개선 ("무료 데모 신청하기")
  - Sticky CTA: 화면 하단 고정 플로팅 버튼 (스크롤 300px 이상 시 표시)
  - Middle CTA 및 Final CTA 섹션 제거 (요구사항 변경)
- ✅ **워크플로우 섹션 개선**
  - 섹션 제목 추가: "어떻게 AI가 위험성평가서를 작성하나요?"
  - 자동 재생 간격 변경: 5초 → 8초
  - 자동 재생 일시정지/재개 버튼 추가 (Pause/Play 아이콘)
  - 화살표 클릭 시 자동 재생 타이머 초기화 기능 추가
  - Step 2에 MISO 로고 및 설명 추가 ("*GS그룹이 만든 비개발자를 위한 현장 맞춤형 AI 플랫폼")
  - 텍스트 수정: "KOSHA Guide" → "한국산업안전보건공단 지침"
- ✅ **FeaturesShowcaseSection 개선**
  - 모달 기능 완전 제거 (카드 클릭 시 모달 열기 기능 삭제)
  - "자세히 보기 →" 텍스트 제거
  - 3가지 핵심 강점 텍스트 업데이트:
    - "안전보건공단 가이드 준수" → "한국산업안전보건공단 지침 준수"
    - "법규 준수 부담 제로" → "JSA 및 KRAS 기법 기반 위험성평가"
    - "현장 맞춤 체크리스트 자동 생성" → "현장 작업 맞춤형 체크리스트 생성"
- ✅ **FAQ 섹션 개선**
  - 마크다운 서식 지원 추가 (`**텍스트**` → `<strong>` 태그로 변환)
  - FAQ 답변에서 Bold 서식이 정상적으로 표시됨
- ✅ **전역 텍스트 수정**
  - 모든 "안전보건공단" → "한국산업안전보건공단"
  - 모든 "KOSHA" → "한국산업안전보건공단"
  - 모든 "Guide" → "지침"

### 2025-01-26 (UI/UX 개선 및 반응형 최적화)
- ✅ **네비게이션 바 개선**
  - MISO 로고를 air_logo.png로 교체
  - 텍스트 변경: "AI 위험성 평가서 AIR" → "AI기반 위험성 평가 시스템"
  - 버튼 위치 변경: "with 52g"와 "About MISO" 순서 변경 (with 52g가 먼저)
- ✅ **Footer 개선**
  - miso-logo.svg와 air_logo.png를 나란히 표시
  - 텍스트 변경: "AI기반 위험성 평가 시스템"
  - 소셜 미디어 섹션 제거, Contact Us 정보 추가
  - 이메일과 전화번호를 한 줄에 표시
  - 주소의 오시는 길 정보 제거
  - 아이콘과 텍스트 수직 중앙 정렬 개선
- ✅ **FAQ 섹션 개선**
  - faq.md 기반으로 카테고리별 FAQ 구조화 (서비스, 기능, 문서, 운영, 보안)
  - 카테고리 태그 버튼 추가 (상단에 표시)
  - Accordion 제거, 모든 질문과 답변이 항상 표시되는 카드 형태로 변경
  - 제목 아래 설명 텍스트 제거
  - 시작하기 버튼 및 영역 제거
- ✅ **워크플로우 섹션 개선**
  - 이미지 확장자 .jpg → .webp로 변경 (404 에러 해결)
  - 좌우 화살표 제거, 우측 상단에 (< >) 버튼 추가
  - 자동 재생 활성화 (5초마다 전환)
  - 순환형 슬라이더 구현 (첫 페이지 ↔ 마지막 페이지)
  - iframe 스타일 프레임 디자인 적용
  - 이미지 로딩 최적화 (현재/다음 슬라이드만 priority 로딩)
- ✅ **FeaturesShowcaseSection 개선**
  - 제목 아래 설명 텍스트 제거 ("현장 안전 관리를 혁신하는 3가지 핵심 강점")
  - 제목 위아래 여백 조정
- ✅ **Banner 섹션 개선**
  - Banner 이미지 아래 여백 추가 (pb-16 md:pb-24)
- ✅ **반응형 및 섹션 구분 개선**
  - 모든 섹션에 overflow-hidden 추가 (잘림 방지)
  - 반응형 패딩 적용 (py-16 md:py-20 lg:py-24)
  - 섹션별 배경색 교차 적용 (bg-bg-base ↔ bg-bg-surface)
  - Toss 스타일 기반 섹션 구분 디자인 적용
  - TabletFrame 컴포넌트 viewport 기반 크기 조정 (maxWidth: min(1200px, 95vw))
- ✅ **메인 화면 개선**
  - 스크롤 화살표 제거
  - iframe 해상도 대응 개선 (잘림 방지)

### 2025-01-26 (빌드 최적화 및 워크플로우 개선)
- ✅ **GitHub 연동 완료**
  - 원격 저장소 설정: `https://github.com/simpson52/airlanding.git`
  - 모든 변경사항 푸시 완료
- ✅ **Vercel 빌드 에러 수정**
  - Button.tsx: Framer Motion과 React 타입 충돌 해결 (HTMLMotionProps 사용)
  - Slider.tsx: useEffect 의존성 배열 경고 수정 (useCallback, useRef 활용)
  - MisoLogo.tsx: Next.js Image 컴포넌트로 변경하여 최적화
  - FeaturesShowcaseSection.tsx: Lucide 아이콘 타입 정의 수정 (LucideProps 사용)
- ✅ **3가지 iframe 반응형 개선**
  - TabletFrame 컴포넌트 모바일 최적화 (패딩, border-radius, 그림자 반응형)
  - YouTube 영상 iframe 반응형 개선
  - miso.gs 및 52g.gs iframe 반응형 개선
  - 모바일에서 iframe이 화면 크기에 맞게 자동 조정
- ✅ **네비게이션 바 버튼 위치 변경**
  - "with 52g"와 "About MISO" 버튼 순서 변경 (with 52g가 먼저)
- ✅ **워크플로우 이미지 추가 및 디자인 개선**
  - 워크플로우 이미지 표시 로직 추가 (Next.js Image 컴포넌트)
  - iframe 스타일의 가벼운 프레임 적용 (그라데이션 배경, rounded corners, subtle shadow)
  - Step 3 이미지 경로 추가
  - 이미지 파일 위치: `/public/userflow-1.jpg` ~ `/public/userflow-5.jpg`
- ✅ **워크플로우 이미지 로딩 속도 최적화**
  - 현재 슬라이드 및 다음 슬라이드 이미지만 priority 로딩
  - 나머지 이미지는 lazy loading 적용
  - 이미지 quality 85로 설정 (파일 크기와 품질 균형)
  - blur placeholder 추가로 로딩 경험 개선
- ✅ **워크플로우 슬라이더 개선**
  - 좌우 화살표 제거 (showArrows={false})
  - 우측 상단에 (< >) 스타일 네비게이션 버튼 추가
  - 자동 재생 활성화 (5초마다 자동 전환)
  - 순환형 슬라이더 구현 (첫 페이지에서 왼쪽 버튼 → 마지막 페이지, 마지막 페이지에서 오른쪽 버튼 → 첫 페이지)
  - Slider 컴포넌트에 forwardRef 및 useImperativeHandle 추가 (외부 제어 지원)
  - 버튼 비활성화 제거 (순환형으로 인해 항상 활성화)
- ✅ **워크플로우 여백 제거**
  - 슬라이드 내부 py-12 패딩 제거
  - motion.div에 m-0 p-0 클래스 추가

### 2025-01-23 (Contact 페이지 및 네비게이션 개선)
- ✅ **Contact 페이지 구현**
  - Contact 페이지 생성 (`/page/contact`)
  - 네비게이션바의 FAQ 버튼을 'Contact Us'로 변경하고 `/page/contact` 경로로 연결
  - 좌우 2열 레이아웃 구현 (좌측: 회사 정보 카드, 우측: Google Maps)
  - 연락처 정보 표시 (이메일, 전화번호, 주소)
  - Google Maps iframe 통합 (주소: 서울특별시 강남구 논현로 508 GS강남타워)
  - 오시는 길 정보 추가 (지하철: 2호선 역삼역 7번 출구, 버스 노선 안내)
  - 아이콘 크기 최적화 (w-8 h-8, 아이콘 w-4 h-4)
  - CI 심볼 및 회사명 제거 (연락처 정보만 표시)
  - 주소 업데이트: 서울특별시 강남구 논현로 508 GS강남타워 25층
- ✅ **네비게이션바 개선**
  - HOME 버튼 추가 (About MISO 버튼 왼쪽)
  - 로고와 서비스명 클릭 시 랜딩페이지로 이동 기능 추가
  - Security 항목 삭제
  - FAQ 버튼을 Contact Us로 변경
- ✅ **디자인 개선**
  - Contact 페이지 미니멀 디자인 적용
  - 아이콘 기반 연락처 정보 표시
  - 반응형 레이아웃 최적화

### 2024-01-XX (최신 업데이트 - 리팩토링 및 코드 정리)
- ✅ **리팩토링 완료**
  - 사용되지 않는 섹션 파일 삭제 (HeroSection, FAQSection, CoreFeaturesSection, RiskMatrixSection, SecuritySection, SocialProofSection)
  - 사용되지 않는 레이아웃 컴포넌트 삭제 (Container, Layout)
  - 사용되지 않는 애니메이션 함수 정리 (slideInRight, scaleOnClick)
  - 중복 코드 제거 및 컴포넌트 추출 (TabletFrame 컴포넌트 생성)
  - NavigationBar 인터페이스 순서 수정 (TypeScript 호환성)
  - 코드베이스 정리 및 유지보수성 향상
- ✅ **페이지 타이틀 변경**
  - 페이지 타이틀: 'MISO AIR 위험성평가서'로 변경 (app/layout.tsx)
- ✅ **TabletFrame 컴포넌트 생성**
  - iframe 표시용 태블릿 프레임 컴포넌트 추출
  - MISO 브랜드 스타일 적용 (그라데이션, Super Ellipse, 베젤 효과)
  - 코드 중복 제거 및 재사용성 향상
  - components/ui/index.ts에 export 추가

### 2024-01-XX (태블릿 프레임 스타일 및 iframe 개선)
- ✅ **태블릿 프레임 스타일 적용**
  - "About MISO"와 "with 52g" iframe을 MISO 브랜드에 맞춘 태블릿 프레임으로 표시
  - MISO 브랜드 컬러 그라데이션 프레임 (#E8F3FF → #FFFFFF)
  - Super Ellipse 스타일 (rounded-[32px] 외부, rounded-[24px] 내부)
  - 상단/하단 베젤 효과 (브랜드 컬러 기반)
  - 중앙 정렬 레이아웃 (최대 너비 1200px)
  - 브랜드 컬러 기반 그림자 효과
- ✅ **"About MISO" 버튼 추가**
  - Navigation Bar에 "About MISO" 버튼 추가 (with 52g 왼쪽)
  - 클릭 시 `https://www.miso.gs` iframe 표시
  - ContentViewContext에 "miso" 타입 추가
- ✅ **Navigation Bar 개선**
  - 항상 고정 표시 (애니메이션 제거)
  - MISO CI 로고 추가 (MisoLogo 컴포넌트)
  - 'AI 위험성 평가서 AIR' 텍스트 추가
  - 높이 54px로 조정
  - 'Features' 버튼을 'with 52g'로 변경 (iframe 전환 기능)
  - 'About AIR' 링크 제거
  - '무료 데모 신청하기' 버튼을 '시작하기'로 변경
  - 내부 요소 크기 15% 축소 (버튼 크기 유지)
- ✅ **ContentViewContext 생성**
  - iframe 전환 기능을 위한 Context API 구현
  - 'landing', '52g', 'miso' 3가지 뷰 타입 지원
  - 랜딩 페이지와 iframe 뷰 전환 관리
- ✅ **Footer 개선**
  - MISO 로고 추가
  - 'AI 위험성 평가서 AIR' 텍스트 추가
  - 설명 텍스트 변경: "GS그룹이 만든<br />MISO AI기반 위험성 평가 솔루션"
  - "빠른 링크" 섹션 제거
  - 소셜 미디어 아이콘 변경 (공식 홈페이지, YouTube, 이메일)
- ✅ **User Flow Section 개선**
  - 제목/부제목 제거 (깔끔한 디자인)
  - Step 1 설명 업데이트
  - 첫 번째 단계에서 왼쪽 화살표 숨김
  - 마지막 단계에서 오른쪽 화살표 숨김
  - 드래그/스와이프 제스처 지원 (모바일 및 데스크톱)
- ✅ **Features Section 개선**
  - 6개에서 3개로 축소 (AI Expert, Compliance, Action Plan)
  - 모달 디자인 개선 (30년차 UX 디자이너 관점)
- ✅ **FAQ Section 개선**
  - 설명 텍스트 제거
  - 버튼 크기 조정 (세로 30% 축소, 가로 FAQ 섹션 너비에 맞춤)
- ✅ **MisoLogo 컴포넌트 생성**
  - 이미지 로드 실패 시 폴백 텍스트 표시
  - 재사용 가능한 로고 컴포넌트
- ✅ **Favicon 설정**
  - favicon.png 파일 사용
  - metadata API를 통한 favicon 설정

---

## 📌 주의사항

1. **디자인 원칙 준수**: Toss 스타일의 Extreme Minimalism 원칙을 엄격히 준수
2. **Desktop First**: PC 접속이 기본이므로 PC 우선 설계 (모바일 대응 필수)
3. **신뢰감 강조**: 모든 시각적 요소는 'Safety'와 'Trust'를 전달해야 함
4. **성능 최적화**: 현장 환경을 고려하여 로딩 속도 최적화 필수
5. **16:9 비율**: 모든 비디오/이미지는 16:9 비율 유지
6. **YouTube 비디오 설정**: `.env` 파일에 `NEXT_PUBLIC_YOUTUBE_URL` 설정 필수

---

## 🤝 기여 가이드

작업 시작 전:
1. 해당 섹션의 액션아이템을 확인
2. 디자인 시스템 가이드라인 준수
3. 작업 완료 후 README.md의 진행 상황 업데이트

---

---

## 📝 최근 변경 이력 (2026-01-26)

### ✅ 가입 신청 폼 페이지 구현 (`/form`)

- **페이지 생성**: `/app/form/page.tsx` 생성
- **입력 필드 구성**:
  - 회사명 (필수)
  - 회사 이메일 (필수)
  - 기타 문의사항 (선택, 텍스트 영역)
- **레이아웃**: 한 줄에 두 개씩 입력 가능하도록 그리드 레이아웃 적용
- **디자인**:
  - 흰색 배경으로 변경
  - 입력 필드 시인성 강화 (회색 배경, 테두리 추가)
  - 모달 스타일 제거, 일반 페이지 레이아웃으로 변경
- **개인정보 수집 및 처리방침 동의**:
  - 체크박스로 동의 받기
  - 모달로 전체 내용 확인 가능
  - 필수 입력 필드로 설정
- **문구 변경**:
  - "AIR 서비스에 대한 관심을 가져주셔서 감사합니다" → "서비스에 대한 관심을 가져주셔서 감사합니다"
  - 개인정보 동의 문구 법적 표현으로 변경

### ✅ 감사 페이지 수정 (`/form/thank-you`)

- "입력하신 이메일로 확인 메일을 발송해드렸습니다" 문구 삭제
- "홈으로 돌아가기" 버튼 삭제

### ✅ 개인정보 수집 및 처리방침 문서

- **파일 생성**: `legal.md`
- 가입 신청서용 개인정보 수집 및 처리방침 문서 작성
- 개인정보 수집 항목, 이용 목적, 보유 기간 등 포함

### ✅ Google Sheets 웹훅 연동

- **가이드 문서**: `GOOGLE_SHEETS_SETUP.md` 생성
- **Google Apps Script 웹훅 설정**:
  - Google Sheet에 데이터 자동 저장
  - 작성시간 (년월일시분초 형식) 자동 기록
- **API Route 구현**: `/app/api/submit-form/route.ts`
  - 폼 데이터를 Google Apps Script 웹훅으로 전송
  - 필수 필드 검증
  - 에러 처리

### ✅ Slack 웹훅 연동

- **Slack 알림 기능 추가**:
  - 폼 제출 시 Slack 채널에 마크다운 테이블 형식으로 알림 전송
  - Google Sheets 저장 성공 후 자동 전송
  - Slack 웹훅 미설정 시에도 정상 작동 (선택사항)
- **가이드 문서 업데이트**: Slack Incoming Webhook 설정 방법 추가

### ✅ 환경 변수 설정

- **파일 생성**: `.env.local.example` (템플릿)
- **환경 변수**:
  - `GOOGLE_SHEETS_WEBHOOK_URL`: Google Apps Script 웹앱 URL (필수)
  - `SLACK_WEBHOOK_URL`: Slack Incoming Webhook URL (선택사항)
- **Vercel 배포 환경**: Vercel 대시보드에서 환경 변수 설정 필요 (자세한 내용은 `GOOGLE_SHEETS_SETUP.md` 참고)

---

**Last Updated**: 2026-01-26 (가입 신청 폼 및 웹훅 연동 구현 완료)
