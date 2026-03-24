/**
 * AIR 가입 신청 폼 → Google Sheet 웹훅 (현재 폼 구조용)
 * 사용: Apps Script 편집기에서 기존 코드 전부 삭제 후 이 파일 전체 붙여넣기 → 저장 → 배포(웹 앱)
 *
 * 시트 1행 헤더: 작성시간 | 회사명 | 회사 이메일 | 기타 문의사항 | 100인 이하 사업장 여부 | 개인정보처리방침 동의 | 사업자등록번호 | 유입 경로(알게 된 경로)
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

    // 5열: 100인 이하 사업장 (boolean 또는 예전 단일 문자열 페이로드 호환)
    var under100Text;
    if (typeof data.under100Workplace === "string") {
      under100Text = data.under100Workplace;
    } else {
      under100Text = data.under100Workplace === true ? "맞음" : "아님";
    }
    // 마지막 열: 유입 경로 (Next API는 referralSourceDisplay 문자열로 전송)
    // typeof만 쓰면 일부 환경에서 누락될 수 있어 null/undefined 후 String() 처리
    var referralRaw = data.referralSourceDisplay;
    var referralText =
      referralRaw === undefined || referralRaw === null
        ? ""
        : String(referralRaw).trim();
    var privacyText = data.privacyAgreement === true ? "동의" : "미동의";

    // 시트 열 순서: 작성시간 | 회사명 | 회사 이메일 | 기타 문의사항 | 100인 이하 | 개인정보처리방침 동의 | 사업자등록번호 | 유입 경로
    var row = [
      timestamp,
      data.company || "",
      data.email || "",
      data.inquiry || "",
      under100Text,
      privacyText,
      data.businessRegistrationNumber || "",
      referralText
    ];

    // 8열 구조(유입 경로 맨 끝). 예전 7열만 append 하던 스크립트를 쓰면 마지막 열이 비어 보임 → 배포 갱신 필요
    if (row.length !== 8) {
      throw new Error("row length must be 8, got " + row.length);
    }

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
