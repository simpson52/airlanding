/**
 * AIR 가입 신청 폼 → Google Sheet 웹훅 (현재 폼 구조용)
 * 사용: Apps Script 편집기에서 기존 코드 전부 삭제 후 이 파일 전체 붙여넣기 → 저장 → 배포(웹 앱)
 *
 * 시트 1행 헤더: 작성시간 | 회사명 | 회사 이메일 | AIR 마음에 드신 점 | 기타 문의사항 | 개인정보처리방침 동의
 */

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

    // 작성시간: YYYY-MM-DD HH:mm:ss (pad2로 구 브라우저 호환)
    var now = new Date();
    var timestamp = now.getFullYear() + "-" +
      pad2(now.getMonth() + 1) + "-" +
      pad2(now.getDate()) + " " +
      pad2(now.getHours()) + ":" +
      pad2(now.getMinutes()) + ":" +
      pad2(now.getSeconds());

    // AIR 마음에 드신 점 (복수 선택): 배열을 쉼표로 연결
    var likedPointsStr = "";
    if (data.likedPoints && Array.isArray(data.likedPoints) && data.likedPoints.length > 0) {
      likedPointsStr = data.likedPoints.join(", ");
    }

    var privacyText = data.privacyAgreement === true ? "동의" : "미동의";

    // 시트 열 순서: 작성시간 | 회사명 | 회사 이메일 | AIR 마음에 드신 점 | 기타 문의사항 | 개인정보처리방침 동의
    var row = [
      timestamp,
      data.company || "",
      data.email || "",
      likedPointsStr,
      data.inquiry || "",
      privacyText
    ];

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
