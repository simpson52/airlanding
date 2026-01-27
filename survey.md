# 설문조사 기능 설계 문서

> AIR 랜딩페이지에 통합될 설문조사 기능의 설계 및 구현 계획

---

## 📋 설문조사 목적 및 목표

### 주요 목적
1. **사용자 니즈 파악**: 잠재 고객의 위험성 평가 업무 현황 및 니즈 조사
2. **데모 신청 수집**: 무료 데모 신청 시 필요한 기본 정보 수집
3. **타겟팅 개선**: 응답 데이터를 기반으로 마케팅 전략 개선
4. **전환율 향상**: 설문 완료 후 자연스러운 CTA 연결

### 목표 지표
- 설문 완료율: 60% 이상
- 평균 완료 시간: 3-5분 이내
- 모바일 완료율: 데스크톱 대비 80% 이상

---

## 🎯 설문조사 구조

### 설문 유형
**단일 페이지 설문조사** (Single Page Survey)
- 모든 질문을 한 페이지에 배치
- 스크롤 기반 진행
- 진행률 표시 (Progress Bar)
- 섹션별 구분 (시각적 계층 구조)

### 질문 구성 (총 8-10개)

#### 섹션 1: 기본 정보 (2-3개)
1. **회사명** (선택)
   - 타입: 텍스트 입력
   - 필수: 아니오
   - 목적: 개인화된 응답 제공

2. **직책/역할** (필수)
   - 타입: 단일 선택 (라디오 버튼)
   - 옵션:
     - 안전 관리자
     - 현장 관리자
     - EHS 담당자
     - 경영진/의사결정자
     - 기타 (텍스트 입력)
   - 목적: 타겟팅 및 메시지 커스터마이징

3. **회사 규모** (선택)
   - 타입: 단일 선택
   - 옵션:
     - 50인 미만
     - 50-200인
     - 200-500인
     - 500인 이상
   - 목적: 솔루션 스케일 제안

#### 섹션 2: 현재 업무 현황 (3-4개)
4. **위험성 평가서 작성 빈도** (필수)
   - 타입: 단일 선택
   - 옵션:
     - 매일
     - 주 2-3회
     - 주 1회
     - 월 1-2회
     - 필요 시에만
   - 목적: 사용 빈도 기반 가치 제안

5. **현재 사용 중인 방법** (필수, 다중 선택 가능)
   - 타입: 다중 선택 (체크박스)
   - 옵션:
     - 엑셀 템플릿
     - 수기 작성
     - 기존 소프트웨어
     - AI 도구
     - 기타 (텍스트 입력)
   - 목적: 현재 프로세스 파악

6. **주요 어려움** (필수, 다중 선택 가능)
   - 타입: 다중 선택
   - 옵션:
     - 작성 시간이 너무 오래 걸림
     - 작성자마다 품질이 들쑥날쑥함
     - 반복 작업이 많음
     - 표준화가 어려움
     - 검토/승인 프로세스가 복잡함
     - 기타 (텍스트 입력)
   - 목적: Pain Point 파악

7. **평균 작성 시간** (선택)
   - 타입: 단일 선택
   - 옵션:
     - 30분 미만
     - 30분-1시간
     - 1-2시간
     - 2시간 이상
   - 목적: 시간 절감 가치 제시

#### 섹션 3: 관심사 및 연락처 (2-3개)
8. **관심 있는 기능** (선택, 다중 선택 가능)
   - 타입: 다중 선택
   - 옵션:
     - AI 기반 자동 작성
     - 표준화된 템플릿
     - 체크리스트 자동 생성
     - 모바일/태블릿 지원
     - 협업 기능
     - 기타 (텍스트 입력)
   - 목적: 기능 우선순위 파악

9. **이메일 주소** (필수, 데모 신청 시)
   - 타입: 이메일 입력
   - 필수: 예 (데모 신청 시)
   - 검증: 이메일 형식 검증
   - 목적: 후속 연락 및 데모 제공

10. **연락 선호 방법** (선택)
    - 타입: 단일 선택
    - 옵션:
      - 이메일
      - 전화
      - 화상 미팅
      - 연락 불필요
    - 목적: 커뮤니케이션 채널 최적화

---

## 🎨 UI/UX 디자인

### 디자인 원칙
- **Toss 스타일**: Extreme Minimalism + Content First
- **진행률 표시**: 상단 고정 Progress Bar
- **섹션 구분**: 시각적 계층 구조 (배경색, 간격)
- **반응형**: 모바일 우선 고려

### 레이아웃 구조
```
┌─────────────────────────────────┐
│  Progress Bar (고정)            │
├─────────────────────────────────┤
│  제목: "AIR에 대해 알려주세요"   │
│  부제목: "간단한 설문으로..."    │
├─────────────────────────────────┤
│  섹션 1: 기본 정보               │
│  ┌───────────────────────────┐ │
│  │ 질문 1                     │ │
│  │ [입력 필드]                │ │
│  └───────────────────────────┘ │
│  ┌───────────────────────────┐ │
│  │ 질문 2                     │ │
│  │ ( ) 옵션 1                │ │
│  │ ( ) 옵션 2                │ │
│  └───────────────────────────┘ │
├─────────────────────────────────┤
│  섹션 2: 현재 업무 현황          │
│  ...                            │
├─────────────────────────────────┤
│  섹션 3: 관심사 및 연락처        │
│  ...                            │
├─────────────────────────────────┤
│  [제출하기] 버튼 (하단 고정)    │
└─────────────────────────────────┘
```

### 컴포넌트 스타일
- **입력 필드**: 기존 Input 컴포넌트 활용
- **라디오 버튼**: 커스텀 스타일 (Toss 스타일)
- **체크박스**: 커스텀 스타일
- **제출 버튼**: Primary Button (하단 고정, Sticky)

---

## 🔧 기술 구현

### 기술 스택
- **폼 관리**: React Hook Form
- **검증**: Zod
- **상태 관리**: React Hook Form 내장
- **API**: Next.js API Route (`/api/survey/submit`)

### 파일 구조
```
app/
├── page/
│   └── survey/
│       ├── page.tsx          # 설문조사 페이지
│       └── thank-you/
│           └── page.tsx       # 감사 페이지
├── api/
│   └── survey/
│       └── route.ts           # 설문 제출 API
components/
└── ui/
    ├── RadioGroup.tsx         # 라디오 버튼 그룹
    ├── CheckboxGroup.tsx      # 체크박스 그룹
    └── ProgressBar.tsx        # 진행률 표시
types/
└── survey.ts                  # 설문 타입 정의
```

### 데이터 스키마 (Zod)
```typescript
const surveySchema = z.object({
  companyName: z.string().optional(),
  role: z.enum(["safety_manager", "site_manager", "ehs", "executive", "other"]),
  roleOther: z.string().optional(),
  companySize: z.enum(["under_50", "50_200", "200_500", "over_500"]).optional(),
  frequency: z.enum(["daily", "2_3_weekly", "weekly", "1_2_monthly", "as_needed"]),
  currentMethod: z.array(z.string()).min(1),
  currentMethodOther: z.string().optional(),
  painPoints: z.array(z.string()).min(1),
  painPointsOther: z.string().optional(),
  averageTime: z.enum(["under_30min", "30min_1h", "1h_2h", "over_2h"]).optional(),
  interests: z.array(z.string()).optional(),
  interestsOther: z.string().optional(),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  contactPreference: z.enum(["email", "phone", "video", "no_contact"]).optional(),
});
```

---

## 📍 설문조사 위치

### 옵션 1: 별도 페이지 (권장)
- **경로**: `/page/survey`
- **접근 방법**:
  - 네비게이션바에 "설문조사" 링크 추가
  - CTA 버튼 클릭 시 이동
  - 랜딩페이지 하단 배너에 링크
- **장점**: 집중된 사용자 경험, 완료율 향상
- **단점**: 랜딩페이지 이탈 가능

### 옵션 2: 랜딩페이지 섹션
- **위치**: FAQ 섹션 아래 또는 Footer 위
- **접근 방법**: 스크롤 또는 앵커 링크
- **장점**: 랜딩페이지 내 자연스러운 흐름
- **단점**: 페이지 길이 증가, 집중도 저하

**결정**: **옵션 1 (별도 페이지)** 권장
- 전환율 최적화
- 완료율 향상
- 데이터 수집 효율성

---

## 🔄 사용자 플로우

### 정상 플로우
1. 사용자가 "설문조사" 또는 CTA 클릭
2. `/page/survey` 페이지로 이동
3. Progress Bar 확인 (0%)
4. 질문 순차적으로 답변
5. Progress Bar 업데이트 (실시간)
6. 모든 필수 질문 완료
7. "제출하기" 버튼 활성화
8. 제출 클릭
9. API 호출 (`/api/survey/submit`)
10. 성공 시 `/page/survey/thank-you`로 이동
11. 감사 메시지 및 다음 단계 안내

### 에러 처리
- **검증 실패**: 해당 필드에 에러 메시지 표시
- **네트워크 오류**: 재시도 버튼 제공
- **서버 오류**: 에러 메시지 및 고객센터 연락처

---

## 💾 데이터 저장

### 저장 방식
**옵션 1: 데이터베이스 (권장)**
- PostgreSQL 또는 MongoDB
- 구조화된 데이터 저장
- 분석 및 리포트 생성 가능

**옵션 2: 외부 서비스**
- Google Sheets API
- Airtable API
- Notion API
- 간단한 구현, 빠른 프로토타입

**옵션 3: 파일 저장**
- JSON 파일로 저장
- 서버 로컬 저장
- 단순하지만 확장성 낮음

**결정**: **옵션 2 (Google Sheets 또는 Airtable)** 초기 구현
- 빠른 프로토타입
- 비용 효율적
- 나중에 DB로 마이그레이션 가능

### 저장 데이터 구조
```typescript
interface SurveyResponse {
  id: string; // UUID
  timestamp: string; // ISO 8601
  companyName?: string;
  role: string;
  roleOther?: string;
  companySize?: string;
  frequency: string;
  currentMethod: string[];
  currentMethodOther?: string;
  painPoints: string[];
  painPointsOther?: string;
  averageTime?: string;
  interests?: string[];
  interestsOther?: string;
  email: string;
  contactPreference?: string;
  userAgent?: string; // 브라우저 정보
  referrer?: string; // 유입 경로
}
```

---

## 🎯 액션아이템 (Action Items)

### Phase 1: 기반 설정 (Foundation)
- [ ] **의존성 설치**
  - `react-hook-form` 설치
  - `zod` 설치
  - `@hookform/resolvers` 설치 (Zod 통합)
- [ ] **타입 정의**
  - `types/survey.ts` 파일 생성
  - SurveyResponse 인터페이스 정의
  - Zod 스키마 정의
- [ ] **UI 컴포넌트 개발**
  - `components/ui/RadioGroup.tsx` 생성
  - `components/ui/CheckboxGroup.tsx` 생성
  - `components/ui/ProgressBar.tsx` 생성
  - Toss 스타일 적용

### Phase 2: 페이지 구현 (Pages)
- [ ] **설문조사 페이지**
  - `app/page/survey/page.tsx` 생성
  - React Hook Form 통합
  - Progress Bar 구현
  - 섹션별 레이아웃 구성
  - 반응형 디자인 적용
- [ ] **감사 페이지**
  - `app/page/survey/thank-you/page.tsx` 생성
  - 감사 메시지 표시
  - 다음 단계 안내 (데모 신청, 연락 등)
  - 홈으로 돌아가기 버튼

### Phase 3: API 및 데이터 처리 (Backend)
- [ ] **API 엔드포인트**
  - `app/api/survey/submit/route.ts` 생성
  - 요청 검증 (Zod)
  - 데이터 저장 로직
  - 에러 처리
- [ ] **데이터 저장 설정**
  - Google Sheets API 또는 Airtable 연동
  - 환경 변수 설정 (API 키 등)
  - 테스트 데이터 저장 확인

### Phase 4: 통합 및 연결 (Integration)
- [ ] **네비게이션바 업데이트**
  - "설문조사" 링크 추가 (선택적)
- [ ] **CTA 버튼 연결**
  - "무료 데모 신청하기" 버튼 클릭 시 설문조사 페이지로 이동
  - 또는 설문조사 완료 후 데모 신청으로 연결
- [ ] **랜딩페이지 연결**
  - Footer 또는 배너에 설문조사 링크 추가 (선택적)

### Phase 5: 검증 및 테스트 (Testing)
- [ ] **폼 검증 테스트**
  - 필수 필드 검증
  - 이메일 형식 검증
  - 조건부 필드 검증 (roleOther, currentMethodOther 등)
- [ ] **사용자 경험 테스트**
  - 모바일 반응형 테스트
  - 진행률 표시 정확성 확인
  - 에러 메시지 표시 확인
- [ ] **API 테스트**
  - 제출 성공 케이스
  - 검증 실패 케이스
  - 네트워크 오류 케이스

### Phase 6: 최적화 및 개선 (Optimization)
- [ ] **성능 최적화**
  - 폼 필드 lazy loading
  - 이미지 최적화 (있는 경우)
- [ ] **접근성 개선**
  - 키보드 네비게이션
  - ARIA 라벨
  - 포커스 관리
- [ ] **애니메이션 추가**
  - 섹션 전환 애니메이션
  - 제출 버튼 클릭 피드백
  - Progress Bar 애니메이션

---

## 📊 성공 지표 (Success Metrics)

### 정량적 지표
- 설문 완료율: 60% 이상
- 평균 완료 시간: 3-5분
- 모바일 완료율: 데스크톱 대비 80% 이상
- 이탈률: 40% 이하

### 정성적 지표
- 사용자 피드백 수집
- 질문 이해도
- UI/UX 만족도

---

## 🔮 향후 개선 사항

### 단기 (1-2개월)
- A/B 테스트 (질문 순서, 문구)
- 진행률 표시 개선
- 자동 저장 기능 (로컬 스토리지)

### 중기 (3-6개월)
- 데이터베이스 마이그레이션
- 대시보드 구축 (응답 분석)
- 이메일 자동 발송 (감사 메일)

### 장기 (6개월 이상)
- 다국어 지원
- 조건부 질문 로직 (Skip Logic)
- 개인화된 설문 (이전 응답 기반)

---

## 📝 참고 사항

### 보안 고려사항
- 이메일 주소 암호화 저장 (선택적)
- 개인정보 보호 정책 링크 제공
- GDPR 준수 (유럽 사용자)

### 법적 고려사항
- 개인정보 처리방침 명시
- 데이터 보관 기간 정책
- 사용자 동의 확인

---

**작성일**: 2026-01-26  
**작성자**: AI Assistant  
**버전**: 1.0
