# GitHub 연동 가이드

> AIR Landing Page 프로젝트의 GitHub 저장소 설정 및 협업 가이드

---

## 📋 목차

1. [GitHub 저장소 생성](#1-github-저장소-생성)
2. [로컬 저장소 초기화 및 연결](#2-로컬-저장소-초기화-및-연결)
3. [초기 커밋 및 푸시](#3-초기-커밋-및-푸시)
4. [브랜치 전략](#4-브랜치-전략)
5. [협업 워크플로우](#5-협업-워크플로우)
6. [커밋 컨벤션](#6-커밋-컨벤션)
7. [Pull Request 가이드](#7-pull-request-가이드)
8. [환경 변수 관리](#8-환경-변수-관리)
9. [GitHub Actions (CI/CD)](#9-github-actions-cicd)
10. [문제 해결](#10-문제-해결)

---

## 1. GitHub 저장소 생성

### 1.1 새 저장소 생성

1. GitHub에 로그인 후 [New Repository](https://github.com/new) 페이지로 이동
2. 저장소 정보 입력:
   - **Repository name**: `air-landing` (또는 원하는 이름)
   - **Description**: `AIR - 현장 데이터 기반 지능형 안전관리 솔루션 랜딩페이지`
   - **Visibility**: 
     - Public: 오픈소스 프로젝트인 경우
     - Private: 내부 프로젝트인 경우
   - **Initialize this repository with**: 체크하지 않음 (로컬에 이미 프로젝트가 있음)
3. **Create repository** 클릭

### 1.2 저장소 URL 확인

생성된 저장소의 URL을 복사합니다:
- HTTPS: `https://github.com/[username]/air-landing.git`
- SSH: `git@github.com:[username]/air-landing.git`

---

## 2. 로컬 저장소 초기화 및 연결

### 2.1 Git 초기화 (아직 안 했다면)

```bash
cd /Users/simpson-root/Documents/01_projects/AIR_Landing
git init
```

### 2.2 원격 저장소 연결

```bash
# HTTPS 방식 (권장)
git remote add origin https://github.com/[username]/air-landing.git

# 또는 SSH 방식
git remote add origin git@github.com:[username]/air-landing.git
```

### 2.3 원격 저장소 확인

```bash
git remote -v
```

출력 예시:
```
origin  https://github.com/[username]/air-landing.git (fetch)
origin  https://github.com/[username]/air-landing.git (push)
```

---

## 3. 초기 커밋 및 푸시

### 3.1 파일 스테이징

```bash
# 모든 파일 추가
git add .

# 또는 특정 파일만 추가
git add README.md package.json
```

### 3.2 초기 커밋

```bash
git commit -m "feat: 초기 프로젝트 설정

- Next.js 14 App Router 프로젝트 구조 설정
- Tailwind CSS 및 Framer Motion 설정
- 기본 컴포넌트 및 섹션 구현
- 디자인 시스템 적용"
```

### 3.3 기본 브랜치 이름 설정 (main)

```bash
git branch -M main
```

### 3.4 원격 저장소에 푸시

```bash
git push -u origin main
```

**참고**: `-u` 옵션은 이후 `git push`만으로도 푸시할 수 있도록 upstream을 설정합니다.

---

## 4. 브랜치 전략

### 4.1 브랜치 구조

```
main (production)
  ├── develop (development)
  │   ├── feature/기능명
  │   ├── fix/버그명
  │   └── refactor/리팩토링명
  └── hotfix/긴급수정명
```

### 4.2 브랜치 생성 및 전환

```bash
# develop 브랜치 생성 및 전환
git checkout -b develop
git push -u origin develop

# feature 브랜치 생성
git checkout -b feature/contact-page
git push -u origin feature/contact-page

# 브랜치 목록 확인
git branch -a
```

### 4.3 브랜치 전략 설명

- **main**: 프로덕션 배포용 브랜치 (항상 안정적)
- **develop**: 개발 통합 브랜치
- **feature/**: 새로운 기능 개발
- **fix/**: 버그 수정
- **refactor/**: 코드 리팩토링
- **hotfix/**: 프로덕션 긴급 수정

---

## 5. 협업 워크플로우

### 5.1 저장소 클론 (새로운 팀원)

```bash
git clone https://github.com/[username]/air-landing.git
cd air-landing
npm install
```

### 5.2 최신 변경사항 가져오기

```bash
# 원격 저장소의 변경사항 확인
git fetch origin

# main 브랜치 최신화
git checkout main
git pull origin main

# develop 브랜치 최신화
git checkout develop
git pull origin develop
```

### 5.3 기능 개발 워크플로우

```bash
# 1. develop 브랜치에서 최신화
git checkout develop
git pull origin develop

# 2. feature 브랜치 생성
git checkout -b feature/new-feature

# 3. 작업 및 커밋
git add .
git commit -m "feat: 새로운 기능 추가"

# 4. 원격 저장소에 푸시
git push -u origin feature/new-feature

# 5. GitHub에서 Pull Request 생성
```

### 5.4 변경사항 병합

```bash
# develop 브랜치로 전환
git checkout develop

# feature 브랜치 병합
git merge feature/new-feature

# 원격 저장소에 푸시
git push origin develop
```

---

## 6. 커밋 컨벤션

### 6.1 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 6.2 Type 종류

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- **refactor**: 코드 리팩토링
- **test**: 테스트 코드 추가/수정
- **chore**: 빌드 업무 수정, 패키지 매니저 설정 등

### 6.3 커밋 메시지 예시

```bash
# 기능 추가
git commit -m "feat(contact): Contact Us 페이지 구현

- 회사 정보 카드 섹션 추가
- Google Maps 연동
- 반응형 레이아웃 적용"

# 버그 수정
git commit -m "fix(navbar): 네비게이션 바 색상 수정

- brand-blue 색상을 #5542F6로 변경
- 모든 버튼 색상 일관성 유지"

# 문서 업데이트
git commit -m "docs: README.md 업데이트

- 프로젝트 구조 설명 추가
- 최신 변경사항 반영"
```

---

## 7. Pull Request 가이드

### 7.1 PR 생성 전 체크리스트

- [ ] 코드가 정상적으로 작동하는지 확인
- [ ] `npm run lint` 통과 확인
- [ ] `npm run build` 성공 확인
- [ ] 관련 문서 업데이트 (README.md 등)
- [ ] 불필요한 주석 및 디버그 코드 제거

### 7.2 PR 제목 및 설명 형식

**제목**:
```
[Type] 간단한 설명
```

**설명 템플릿**:
```markdown
## 변경 사항
- 변경 내용 1
- 변경 내용 2

## 관련 이슈
- Closes #이슈번호

## 스크린샷 (필요시)
![스크린샷](이미지URL)

## 테스트
- [ ] 로컬에서 테스트 완료
- [ ] 빌드 성공 확인
```

### 7.3 PR 리뷰 프로세스

1. PR 생성 후 리뷰어 지정
2. 리뷰어의 승인 대기
3. 리뷰 코멘트 반영
4. 승인 후 `develop` 또는 `main` 브랜치로 병합
5. 병합 후 feature 브랜치 삭제

---

## 8. 환경 변수 관리

### 8.1 환경 변수 파일

프로젝트의 `.env` 파일은 Git에 커밋하지 않습니다 (`.gitignore`에 포함).

### 8.2 GitHub Secrets 설정

1. 저장소 Settings → Secrets and variables → Actions
2. **New repository secret** 클릭
3. 필요한 환경 변수 추가:
   - `NEXT_PUBLIC_YOUTUBE_URL` (필요시)
   - 기타 API 키 등

### 8.3 로컬 환경 변수 설정

```bash
# .env.local 파일 생성
cp .env.example .env.local

# 환경 변수 편집
nano .env.local
```

**참고**: `.env.example` 파일을 만들어서 필요한 환경 변수 목록을 문서화하는 것을 권장합니다.

---

## 9. GitHub Actions (CI/CD)

### 9.1 기본 CI 설정

`.github/workflows/ci.yml` 파일 생성:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Build
      run: npm run build
```

### 9.2 자동 배포 설정 (Vercel 연동)

Vercel과 GitHub를 연동하면 자동 배포가 가능합니다:

1. [Vercel](https://vercel.com)에 로그인
2. **Add New Project** 클릭
3. GitHub 저장소 선택
4. 빌드 설정 확인 후 **Deploy**

---

## 10. 문제 해결

### 10.1 충돌 해결

```bash
# 충돌 발생 시
git pull origin develop

# 충돌 파일 수정 후
git add .
git commit -m "fix: merge conflict 해결"
git push origin feature/branch-name
```

### 10.2 커밋 히스토리 수정

```bash
# 마지막 커밋 메시지 수정
git commit --amend -m "새로운 메시지"

# 여러 커밋을 하나로 합치기 (interactive rebase)
git rebase -i HEAD~3
```

### 10.3 원격 저장소 변경

```bash
# 원격 저장소 URL 변경
git remote set-url origin https://github.com/[new-username]/air-landing.git

# 확인
git remote -v
```

### 10.4 브랜치 삭제

```bash
# 로컬 브랜치 삭제
git branch -d feature/branch-name

# 원격 브랜치 삭제
git push origin --delete feature/branch-name
```

### 10.5 변경사항 되돌리기

```bash
# 마지막 커밋 취소 (변경사항 유지)
git reset --soft HEAD~1

# 마지막 커밋 취소 (변경사항 삭제)
git reset --hard HEAD~1

# 특정 파일만 되돌리기
git checkout HEAD -- 파일명
```

---

## 📚 추가 리소스

- [Git 공식 문서](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

---

## 💡 팁

1. **작은 단위로 커밋**: 관련된 변경사항만 묶어서 커밋
2. **자주 푸시**: 로컬 변경사항을 자주 원격 저장소에 푸시
3. **브랜치 네이밍**: 명확하고 일관된 브랜치 이름 사용
4. **PR 전 테스트**: PR 생성 전 반드시 로컬에서 테스트
5. **커밋 메시지**: 명확하고 이해하기 쉬운 커밋 메시지 작성

---

**마지막 업데이트**: 2025-01-23
