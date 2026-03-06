export interface NewSignupSlackMessageData {
  company: string;
  businessRegistrationNumber: string;
  email: string;
  under100Workplace: boolean;
  inquiry: string;
}

const DEFAULT_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/17M0c0eMz1x2ZIS9bzgc8sy9OJrneZ0WhEgsbM9Ggzc0/edit?usp=sharing";

function formatKstTimestamp(date: Date): string {
  // sv-SE는 기본 포맷이 YYYY-MM-DD HH:mm:ss 형태라 Slack 알림용으로 적합
  // 서버 로케일/타임존 영향 없이 항상 Asia/Seoul 기준으로 고정
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return formatter.format(date);
}

export function formatNewSignupSlackMessage(
  data: NewSignupSlackMessageData,
  now: Date = new Date()
): string {
  const timestamp = formatKstTimestamp(now);
  const under100Text = data.under100Workplace ? "맞음" : "아님";

  return [
    `신규 가입신청이 있습니다. (${timestamp})`,
    "",
    `회사명 : ${data.company || "-"}`,
    `사업자등록번호 : ${data.businessRegistrationNumber || "-"}`,
    `이메일 : ${data.email || "-"}`,
    `100인 이하 사업장 : ${under100Text}`,
    `문의사항 : ${data.inquiry || "-"}`,
    "",
    `링크 : ${DEFAULT_SHEET_URL}`,
  ].join("\n");
}

