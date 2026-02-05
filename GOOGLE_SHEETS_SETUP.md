# Google Sheets 웹훅 연동 가이드

## 방법 1: Google Apps Script 웹훅 (추천 - 무료, 간단)

### 사용자가 해야 할 작업

#### 1. Google Sheet 생성 및 헤더 설정

1. **새 Google Sheet 생성**
   - https://sheets.google.com/ 접속
   - "빈 스프레드시트" 클릭하여 새 시트 생성
   - 시트 이름 변경 (예: "AIR 가입 신청")

2. **헤더 행 설정**
   - 첫 번째 행에 다음 헤더를 입력:
     ```
     A1: 작성시간
     B1: 회사명
     C1: 소재지(시/도)
     D1: 소재지(시/군/구)
     E1: 이름
     F1: 담당 업무
     G1: 이메일
     H1: 전화번호
     I1: 기타 문의사항
     J1: 개인정보처리방침 동의
     ```

#### 2. Google Apps Script 설정

1. **Google Apps Script 열기**
   - Google Sheet에서 "확장 프로그램" > "Apps Script" 클릭
   - 새 스크립트 편집기가 열립니다

2. **웹훅 스크립트 작성**
   - 기존 코드를 모두 삭제하고 아래 코드를 붙여넣기:
   
   ```javascript
   function doPost(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       const data = JSON.parse(e.postData.contents);
       
       // 년월일시분초 형식으로 작성시간 생성
       const now = new Date();
       const year = now.getFullYear();
       const month = String(now.getMonth() + 1).padStart(2, '0');
       const day = String(now.getDate()).padStart(2, '0');
       const hours = String(now.getHours()).padStart(2, '0');
       const minutes = String(now.getMinutes()).padStart(2, '0');
       const seconds = String(now.getSeconds()).padStart(2, '0');
       const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
       
       const row = [
         timestamp,
         data.company || '',
         data.locationProvince || '',
         data.locationCity || '',
         data.name || '',
         data.position || '',
         data.email || '',
         data.phone || '',
         data.inquiry || '',
         data.privacyAgreement ? '동의' : '미동의'
       ];
       
       sheet.appendRow(row);
       
       return ContentService
         .createTextOutput(JSON.stringify({ success: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService
         .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

3. **스크립트 저장 및 배포**
   - 상단의 "저장" 버튼 클릭 (프로젝트 이름: "AIR Form Webhook")
   - "배포" > "새 배포" 클릭
   - "유형 선택"에서 "웹 앱" 선택
   - 설명: "AIR Form Submission" 입력
   - "다음 사용자로 실행": "나" 선택
   - "액세스 권한": "모든 사용자" 선택
   - "배포" 클릭
   - **중요: 웹 앱 URL을 복사하세요!** (예: `https://script.google.com/macros/s/.../exec`)

4. **권한 승인**
   - 첫 배포 시 권한 승인 팝업이 나타날 수 있습니다
   - "권한 검토" 클릭
   - Google 계정 선택
   - "고급" > "AIR Landing(안전하지 않은 페이지)로 이동" 클릭
   - "허용" 클릭

#### 3. Slack 웹훅 설정 (선택사항)

1. **Slack 워크스페이스에서 Incoming Webhook 생성**
   - https://api.slack.com/apps 접속
   - "Create New App" 클릭
   - "From scratch" 선택
   - App 이름: "AIR Form Notifications" 입력
   - 워크스페이스 선택 후 "Create App" 클릭

2. **Incoming Webhooks 활성화**
   - 좌측 메뉴에서 "Incoming Webhooks" 클릭
   - "Activate Incoming Webhooks" 토글을 ON으로 변경

3. **Webhook URL 생성**
   - 하단의 "Add New Webhook to Workspace" 클릭
   - 알림을 받을 채널 선택 (예: #air-form-notifications)
   - "Allow" 클릭
   - **Webhook URL을 복사하세요!** (예: `https://hooks.slack.com/services/...`)

4. **환경 변수 설정**
   - `.env.local` 파일에 다음 추가:
     ```
     SLACK_WEBHOOK_URL=여기에_복사한_Slack_웹훅_URL_입력
     ```

#### 4. 환경 변수 설정

##### 로컬 개발 환경 (`.env.local`)

1. **프로젝트 루트에 `.env.local` 파일 생성** (이미 있다면 수정)
   - 다음 내용 추가:
     ```
     GOOGLE_SHEETS_WEBHOOK_URL=여기에_복사한_웹앱_URL_입력
     SLACK_WEBHOOK_URL=여기에_복사한_Slack_웹훅_URL_입력 (선택사항)
     ```

##### Vercel 배포 환경 설정 (중요!)

**배포된 사이트에서 폼 제출이 작동하려면 Vercel에 환경 변수를 설정해야 합니다.**

1. **Vercel 대시보드 접속**
   - https://vercel.com 접속 후 로그인
   - 프로젝트 선택 (airlanding)

2. **환경 변수 설정**
   - 좌측 메뉴에서 **"Settings"** 클릭
   - 상단 탭에서 **"Environment Variables"** 클릭
   - 다음 환경 변수 추가:

   **필수:**
   ```
   이름: GOOGLE_SHEETS_WEBHOOK_URL
   값: 여기에_복사한_Google_Apps_Script_웹앱_URL_입력
   환경: Production, Preview, Development 모두 선택
   ```

   **선택사항:**
   ```
   이름: SLACK_WEBHOOK_URL
   값: 여기에_복사한_Slack_웹훅_URL_입력
   환경: Production, Preview, Development 모두 선택
   ```

3. **재배포**
   - 환경 변수 추가 후 **자동으로 재배포**되거나
   - 수동으로 **"Deployments"** 탭에서 최신 배포의 **"Redeploy"** 클릭

4. **확인**
   - 재배포 완료 후 배포된 사이트에서 폼 제출 테스트
   - Google Sheet에 데이터가 저장되는지 확인

---

---

## 완료 후 확인사항

### 완료 확인사항:
✅ Google Sheet 생성 및 헤더 설정 완료
✅ Google Apps Script에 웹훅 코드 작성 완료
✅ 웹 앱으로 배포 완료
✅ 웹 앱 URL 복사 완료
✅ `.env.local`에 `GOOGLE_SHEETS_WEBHOOK_URL` 설정 완료
✅ (선택) Slack 웹훅 생성 및 `.env.local`에 `SLACK_WEBHOOK_URL` 설정 완료

위 항목들이 모두 완료되면 코드가 자동으로 Google Sheets와 Slack에 데이터를 전송합니다.
