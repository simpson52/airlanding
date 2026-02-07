# Google Sheets 웹훅 연동 가이드

가입 신청 폼 제출 시 Google Sheet에 자동으로 한 행씩 저장되도록 설정하는 방법입니다.

---

## 1. Google Sheet 생성 및 헤더 설정

1. [Google Sheet](https://sheets.google.com)에서 **빈 스프레드시트** 생성
2. 첫 번째 행에 아래 **헤더**를 입력합니다.

| A1 | B1 | C1 | D1 | E1 | F1 |
|----|----|----|----|----|----|
| 작성시간 | 회사명 | 회사 이메일 | 기타 문의사항 | 100인 이하 사업장 여부 | 개인정보처리방침 동의 |

---

## 2. Google Apps Script 설정

1. 시트 메뉴에서 **확장 프로그램** → **Apps Script** 클릭
2. **기존 코드 전체를 삭제**한 뒤, 아래 스크립트 **전체**를 복사해 붙여넣습니다.  
   (예전에 소재지·이름·전화번호·담당업무 등이 있던 버전이라면 반드시 이 코드로 **통째로 교체**하세요.)  
   프로젝트 루트의 `google-apps-script-form-webhook.js` 파일을 열어 복사해 써도 됩니다.

```javascript
function pad2(n) {
  return n < 10 ? "0" + n : String(n);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "No POST data" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    var now = new Date();
    var timestamp = now.getFullYear() + "-" + pad2(now.getMonth() + 1) + "-" + pad2(now.getDate()) + " " +
      pad2(now.getHours()) + ":" + pad2(now.getMinutes()) + ":" + pad2(now.getSeconds());

    var under100Text = data.under100Workplace === true ? "맞음" : "아님";
    var privacyText = data.privacyAgreement === true ? "동의" : "미동의";

    var row = [timestamp, data.company || "", data.email || "", data.inquiry || "", under100Text, privacyText];
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **저장** (Ctrl+S / Cmd+S), 프로젝트 이름 예: `AIR Form Webhook`
4. **배포** → **새 배포** → **유형 선택**에서 **웹 앱** 선택
   - **실행 사용자**: 나
   - **액세스 권한**: 모든 사용자
   - **배포** 클릭 후 생성된 **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/.../exec`)
5. 첫 배포 시 **권한 검토** → 본인 계정 선택 → **고급** → 해당 프로젝트로 이동 → **허용**

---

## 3. 환경 변수 설정

### 로컬 (`.env.local`)

```env
GOOGLE_SHEETS_WEBHOOK_URL=여기에_복사한_웹앱_URL
```

### Vercel 배포

1. Vercel 대시보드 → 프로젝트 → **Settings** → **Environment Variables**
2. `GOOGLE_SHEETS_WEBHOOK_URL` 추가, 값에 웹 앱 URL 입력
3. Production / Preview / Development 원하는 환경 선택 후 저장
4. 필요 시 **Redeploy** 실행

---

## 4. API에서 전송하는 데이터 구조

폼 제출 시 아래 JSON이 Google Apps Script로 전달됩니다.

| 키 | 타입 | 설명 |
|----|------|------|
| `company` | string | 회사명 |
| `email` | string | 회사 이메일 |
| `inquiry` | string | 기타 문의사항 |
| `under100Workplace` | boolean | 100인 이하 사업장 여부 |
| `privacyAgreement` | boolean | 개인정보 수집·이용 동의 여부 |

스크립트는 위 구조에 맞춰 시트의 **작성시간, 회사명, 회사 이메일, 기타 문의사항, 100인 이하 사업장 여부, 개인정보처리방침 동의** 순서로 한 행을 추가합니다.

---

## 5. 확인

- 가입 신청 폼에서 제출 후 해당 Google Sheet에 새 행이 추가되는지 확인
- **100인 이하 사업장 여부** 열에는 "맞음" 또는 "아님"이 저장됩니다.

---

## 6. 새 폼이 작동하지 않을 때

- **원인**: 예전 폼(소재지·이름·전화번호·담당업무 등)용 스크립트가 그대로 배포되어 있으면, 새 폼에서 보내는 데이터 구조와 맞지 않아 실패합니다.
- **해결**:
  1. Google 시트 → **확장 프로그램** → **Apps Script** 열기
  2. 편집기에서 **기존 코드 전부 삭제**
  3. 이 문서의 **2번 스크립트 전체** 또는 프로젝트의 `google-apps-script-form-webhook.js` 내용 **전체**를 복사해 붙여넣기
  4. **저장** 후 **배포** → **배포 관리** → 기존 웹 앱 옆 **연필 아이콘(편집)** → **버전**을 "새 버전"으로 선택 후 **배포**
  5. (선택) 시트 1행 헤더를 아래 6개로 맞춤: `작성시간` | `회사명` | `회사 이메일` | `기타 문의사항` | `100인 이하 사업장 여부` | `개인정보처리방침 동의`
- 배포 후에는 URL이 그대로이므로 `.env.local`이나 Vercel 환경 변수는 수정할 필요 없습니다.
