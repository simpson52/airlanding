# 프로젝트 설정 가이드

## 필수 사전 요구사항

### 1. Node.js 설치
프로젝트를 실행하기 위해 Node.js가 필요합니다.

**macOS (Homebrew 사용 시)**:
```bash
brew install node
```

**또는 공식 웹사이트에서 다운로드**:
- https://nodejs.org/

**설치 확인**:
```bash
node --version
npm --version
```

### 2. 프로젝트 의존성 설치

프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

```bash
npm install
```

이 명령어는 다음 패키지들을 설치합니다:
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Lucide React (아이콘)
- TypeScript

### 3. 개발 서버 실행

의존성 설치가 완료되면 개발 서버를 시작할 수 있습니다:

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인하세요.

## 프로젝트 구조

```
AIR_Landing/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
├── components/            # 재사용 가능한 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   │   ├── Container.tsx
│   │   └── Layout.tsx
│   └── ui/               # UI 컴포넌트 (추가 예정)
├── sections/              # 페이지 섹션 컴포넌트
├── utils/                 # 유틸리티 함수
│   └── animations.ts     # Framer Motion 애니메이션
├── types/                 # TypeScript 타입 정의
│   └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts     # Tailwind CSS 설정 (디자인 시스템)
└── next.config.js
```

## YouTube 비디오 설정

1. `.env.example` 파일을 `.env`로 복사:
   ```bash
   cp .env.example .env
   ```

2. `.env` 파일을 열고 YouTube 비디오 링크를 붙여넣기:
   ```env
   NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
   ```
   
   또는 비디오 ID만 입력:
   ```env
   NEXT_PUBLIC_YOUTUBE_URL=YOUR_VIDEO_ID
   ```

3. 개발 서버 재시작:
   ```bash
   npm run dev
   ```

## 다음 단계

1. **의존성 설치**: `npm install` 실행
2. **YouTube 비디오 설정**: `.env` 파일에 YouTube 링크 설정
3. **개발 서버 시작**: `npm run dev` 실행

자세한 작업 계획은 `README.md`를 참고하세요.
