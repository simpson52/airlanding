# Vercel 프로젝트 설정 가이드

## 문제 상황
GitHub 저장소가 Vercel에 연결될 때 자동으로 새 프로젝트(`airlanding`)가 생성되었을 수 있습니다. 기존 프로젝트(`air-miso`)를 사용하려면 다음 단계를 따르세요.

## 해결 방법

### 방법 1: 기존 프로젝트에 저장소 연결 (권장)

1. **Vercel 대시보드 접속**
   - https://vercel.com 접속 후 로그인
   - **"air-miso"** 프로젝트 선택

2. **Settings > Git 연결**
   - 좌측 메뉴에서 **"Settings"** 클릭
   - **"Git"** 섹션으로 이동
   - 현재 연결된 저장소가 있다면 **"Disconnect"** 클릭
   - **"Connect Git Repository"** 클릭
   - `simpson52/airlanding` 저장소 선택
   - **"Import"** 클릭

3. **자동 배포 설정 확인**
   - 연결 후 자동으로 배포가 시작됩니다
   - Production 브랜치는 `main`으로 설정되어 있는지 확인

### 방법 2: 불필요한 프로젝트 삭제

1. **Vercel 대시보드 접속**
   - https://vercel.com 접속 후 로그인

2. **"airlanding" 프로젝트 삭제**
   - **"airlanding"** 프로젝트 선택
   - **"Settings"** > 맨 아래 **"Delete Project"** 클릭
   - 확인 후 삭제

3. **"air-miso" 프로젝트에 저장소 연결**
   - **"air-miso"** 프로젝트 선택
   - **"Settings"** > **"Git"** 섹션
   - **"Connect Git Repository"** 클릭
   - `simpson52/airlanding` 저장소 선택

## 환경 변수 설정

프로젝트 연결 후 환경 변수를 설정하세요:

1. **"air-miso" 프로젝트** 선택
2. **"Settings"** > **"Environment Variables"** 클릭
3. 다음 환경 변수 추가:

   **필수:**
   ```
   이름: GOOGLE_SHEETS_WEBHOOK_URL
   값: [Google Apps Script 웹앱 URL]
   환경: Production, Preview, Development 모두 선택
   ```

   **선택사항:**
   ```
   이름: SLACK_WEBHOOK_URL
   값: [Slack 웹훅 URL]
   환경: Production, Preview, Development 모두 선택
   ```

4. 환경 변수 추가 후 자동으로 재배포됩니다

## 확인

- 배포 완료 후 `air-miso` 프로젝트의 도메인에서 사이트가 정상 작동하는지 확인
- 폼 제출 기능이 정상 작동하는지 테스트
