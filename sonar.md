
---

## 🔍 실제 SonarQube 분석 결과

### 분석 요약
- **총 이슈 수**: 8개
- **파일별 분포**:
  - `PressSection.tsx`: 5개
  - `NavigationBar.tsx`: 1개
  - `HeroSection.tsx`: 1개
  - `UserFlowSection.tsx`: 1개

---

## 📋 발견된 이슈 상세 분석

### 1. PressSection.tsx (5개 이슈)

#### ⬆️ 이슈 #1: 사용되지 않는 변수 할당 (Major)
- **규칙**: `typescript:S1854`
- **위치**: Line 21, Column 9
- **문제**: `currentSlideIndex` 변수가 할당되지만 사용되지 않음
- **코드**:
  ```typescript
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  ```
- **설명**: 
  - `currentSlideIndex` 상태가 선언되었지만 실제로 읽히지 않음
  - `setCurrentSlideIndex`만 사용되고 있음
  - 불필요한 상태 변수로 메모리 낭비 및 코드 복잡도 증가
- **해결 방법**:
  ```typescript
  // 방법 1: 변수 제거 (사용되지 않는 경우)
  // const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 삭제
  
  // 방법 2: 실제로 사용해야 하는 경우, 사용처 추가
  // 예: 현재 슬라이드 인덱스를 표시하거나 로직에 활용
  ```

#### ⬆️ 이슈 #2, #3: 중첩된 삼항 연산자 (Major)
- **규칙**: `typescript:S3358`
- **위치**: Line 136, Column 12 / Line 142, Column 12
- **문제**: 중첩된 삼항 연산자로 인한 가독성 저하
- **코드**:
  ```typescript
  // Line 136
  ) : sortedArticles.length === 0 ? (
    // ...
  ) : articleSlides.length === 0 ? (
    // ...
  )
  ```
- **설명**:
  - 중첩된 삼항 연산자는 코드 가독성을 크게 저하시킴
  - 디버깅이 어렵고 유지보수 비용 증가
  - 조건이 많아질수록 복잡도가 기하급수적으로 증가
- **해결 방법**:
  ```typescript
  // Before (중첩된 삼항 연산자)
  {isLoading ? (
    <div>로딩 중...</div>
  ) : sortedArticles.length === 0 ? (
    <div>기사 없음</div>
  ) : articleSlides.length === 0 ? (
    <div>슬라이드 없음</div>
  ) : (
    <div>콘텐츠</div>
  )}
  
  // After (조건문으로 분리)
  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (sortedArticles.length === 0) {
    return <div>기사를 불러올 수 없습니다.</div>;
  }
  if (articleSlides.length === 0) {
    return <div>표시할 기사가 없습니다.</div>;
  }
  return <div>콘텐츠</div>;
  ```

#### ⬆️ 이슈 #4: Array index를 key로 사용 (Major)
- **규칙**: `typescript:S6479`
- **위치**: Line 174, Column 28
- **문제**: React에서 배열 인덱스를 `key` prop으로 사용
- **코드**:
  ```typescript
  {articleSlides.map((slideArticles, slideIndex) => (
    <div key={slideIndex} className="w-full">
  ```
- **설명**:
  - 배열 인덱스를 key로 사용하면 리스트 순서가 변경되거나 항목이 추가/삭제될 때 React가 올바르게 컴포넌트를 추적하지 못함
  - 성능 문제 및 상태 관리 오류 발생 가능
  - 특히 동적 리스트에서 심각한 버그로 이어질 수 있음
- **해결 방법**:
  ```typescript
  // Before
  {articleSlides.map((slideArticles, slideIndex) => (
    <div key={slideIndex} className="w-full">
  
  // After (고유한 ID 사용)
  {articleSlides.map((slideArticles, slideIndex) => (
    <div key={`slide-${slideIndex}-${slideArticles[0]?.id || slideIndex}`} className="w-full">
  
  // 또는 더 나은 방법: 각 슬라이드에 고유 ID 부여
  interface Slide {
    id: string;
    articles: NewsArticle[];
  }
  {articleSlides.map((slide) => (
    <div key={slide.id} className="w-full">
  ```

#### ⬇️ 이슈 #5: replace() 대신 replaceAll() 사용 권장 (Minor)
- **규칙**: `typescript:S7781`
- **위치**: Line 248, Column 42
- **문제**: `replace()` 대신 `replaceAll()` 사용 권장
- **코드**:
  ```typescript
  {article.date.replace(/-/g, ". ")}
  ```
- **설명**:
  - `replace()`는 정규식을 사용해야 모든 항목을 치환할 수 있음 (`/g` 플래그 필요)
  - `replaceAll()`은 더 명확하고 직관적이며 실수 가능성 감소
  - 코드 가독성 향상
- **해결 방법**:
  ```typescript
  // Before
  {article.date.replace(/-/g, ". ")}
  
  // After
  {article.date.replaceAll("-", ". ")}
  ```

---

### 2. NavigationBar.tsx (1개 이슈)

#### ⬇️ 이슈 #6: 예상치 못한 부정 조건 (Minor)
- **규칙**: `typescript:S7735`
- **위치**: Line 38, Column 8
- **문제**: 부정 조건으로 인한 가독성 저하
- **코드**:
  ```typescript
  if (pathname !== "/") {
    router.push("/");
  }
  ```
- **설명**:
  - 부정 조건(`!==`)은 긍정 조건(`===`)보다 이해하기 어려울 수 있음
  - 코드 의도를 더 명확하게 표현하는 것이 좋음
- **해결 방법**:
  ```typescript
  // Before
  if (pathname !== "/") {
    router.push("/");
  }
  
  // After (더 명확한 의도 표현)
  const isNotLandingPage = pathname !== "/";
  if (isNotLandingPage) {
    router.push("/");
  }
  
  // 또는 Early Return 패턴
  if (pathname === "/") {
    return; // 이미 랜딩 페이지에 있으면 종료
  }
  router.push("/");
  ```

---

### 3. HeroSection.tsx (1개 이슈)

#### ℹ️ 이슈 #7: TODO 주석 완료 (Info)
- **규칙**: `typescript:S1135`
- **위치**: Line 10, Column 7
- **문제**: TODO 주석이 완료되지 않음
- **코드**:
  ```typescript
  // TODO: 데모 신청 페이지로 이동 또는 모달 열기
  console.log("CTA 클릭");
  ```
- **설명**:
  - TODO 주석은 미완성 작업을 나타냄
  - 프로덕션 코드에 남아있으면 기술 부채로 간주됨
  - 실제 구현 또는 TODO 제거 필요
- **해결 방법**:
  ```typescript
  // 방법 1: 실제 구현
  const handleCTAClick = () => {
    router.push("/demo-request");
    // 또는 모달 열기
    // setShowDemoModal(true);
  };
  
  // 방법 2: TODO 제거 (구현 완료 시)
  const handleCTAClick = () => {
    router.push("/demo-request");
  };
  ```

---

### 4. UserFlowSection.tsx (1개 이슈)

#### ⬆️ 이슈 #8: 중첩된 삼항 연산자 (Major)
- **규칙**: `typescript:S3358`
- **위치**: Line 129, Column 18
- **문제**: 중첩된 삼항 연산자로 인한 가독성 저하
- **코드**:
  ```typescript
  ) : step.id === 4 ? (
    <>
      <Image src="/miso-logo.svg" ... />
      <sup>*</sup>
      <span>기반 위험성 평가서 작성</span>
    </>
  ) : (
  ```
- **설명**:
  - PressSection과 동일한 문제
  - 조건부 렌더링이 복잡할 때는 함수나 컴포넌트로 분리하는 것이 좋음
- **해결 방법**:
  ```typescript
  // Before
  {step.id === 2 ? (
    // ...
  ) : step.id === 4 ? (
    // ...
  ) : (
    // ...
  )}
  
  // After (함수로 분리)
  const renderStepTitle = (step: UserFlowStep) => {
    if (step.id === 2) {
      return (
        <>
          <Image src="/miso-logo.svg" ... />
          <sup>*</sup>
          <span>기반 위험요인 자동 식별</span>
        </>
      );
    }
    if (step.id === 4) {
      return (
        <>
          <Image src="/miso-logo.svg" ... />
          <sup>*</sup>
          <span>기반 위험성 평가서 작성</span>
        </>
      );
    }
    return <span>{step.title}</span>;
  };
  
  // 사용
  {renderStepTitle(step)}
  ```

---

## 🎯 이슈 우선순위 및 수정 권장사항

### 🔴 높은 우선순위 (즉시 수정 권장)

1. **PressSection.tsx - 사용되지 않는 변수 (S1854)**
   - 영향: 메모리 낭비, 코드 복잡도
   - 수정 난이도: ⭐ 쉬움
   - 예상 시간: 5분

2. **PressSection.tsx, UserFlowSection.tsx - 중첩된 삼항 연산자 (S3358)**
   - 영향: 가독성, 유지보수성
   - 수정 난이도: ⭐⭐ 보통
   - 예상 시간: 15-30분

3. **PressSection.tsx - Array index를 key로 사용 (S6479)**
   - 영향: React 성능, 상태 관리 오류 가능
   - 수정 난이도: ⭐⭐ 보통
   - 예상 시간: 10-15분

### 🟡 중간 우선순위 (점진적 개선)

4. **PressSection.tsx - replace() → replaceAll() (S7781)**
   - 영향: 코드 가독성
   - 수정 난이도: ⭐ 매우 쉬움
   - 예상 시간: 2분

5. **NavigationBar.tsx - 부정 조건 (S7735)**
   - 영향: 코드 가독성
   - 수정 난이도: ⭐ 쉬움
   - 예상 시간: 5분

### 🟢 낮은 우선순위 (정보성)

6. **HeroSection.tsx - TODO 주석 (S1135)**
   - 영향: 기술 부채 추적
   - 수정 난이도: ⭐⭐ 보통 (실제 구현 필요)
   - 예상 시간: 구현에 따라 다름

---

## 📊 이슈 통계

### 심각도별 분류
- **Major (⬆)**: 5개
- **Minor (⬇)**: 2개
- **Info (ℹ)**: 1개

### 규칙별 분류
- **S3358** (중첩된 삼항 연산자): 3개
- **S1854** (사용되지 않는 변수): 1개
- **S6479** (Array index key): 1개
- **S7781** (replace → replaceAll): 1개
- **S7735** (부정 조건): 1개
- **S1135** (TODO 주석): 1개

### 파일별 분류
- **PressSection.tsx**: 5개 (62.5%)
- **NavigationBar.tsx**: 1개 (12.5%)
- **HeroSection.tsx**: 1개 (12.5%)
- **UserFlowSection.tsx**: 1개 (12.5%)

---

## ✅ 수정 계획

### Phase 1: 즉시 수정 (높은 우선순위)
1. ✅ 사용되지 않는 변수 제거
2. ✅ 중첩된 삼항 연산자 리팩토링
3. ✅ Array index key 문제 해결

### Phase 2: 점진적 개선 (중간 우선순위)
4. ✅ replace() → replaceAll() 변경
5. ✅ 부정 조건 개선

### Phase 3: 장기 개선 (낮은 우선순위)
6. ✅ TODO 주석 처리 (실제 구현 또는 제거)

---

## 📝 참고사항

- 모든 이슈는 **기능 변경 없이** 코드 품질만 개선하는 것이 목표입니다.
- 수정 후 반드시 빌드 및 기능 테스트를 수행해야 합니다.
- SonarQube 재분석을 통해 개선 효과를 확인할 수 있습니다.
