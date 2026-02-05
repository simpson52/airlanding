import { NextRequest, NextResponse } from "next/server";

interface FormSubmissionData {
  company: string;
  locationProvince: string;
  locationCity: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  inquiry: string;
  privacyAgreement: boolean;
}

// Slack에 마크다운 테이블 형식으로 알림 전송
async function sendSlackNotification(data: FormSubmissionData) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();
  if (!slackWebhookUrl) {
    return; // Slack 웹훅이 설정되지 않았으면 무시
  }

  const timestamp = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const markdownTable = `| 항목 | 내용 |
|------|------|
| 작성시간 | ${timestamp} |
| 회사명 | ${data.company || "-"} |
| 소재지(시/도) | ${data.locationProvince || "-"} |
| 소재지(시/군/구) | ${data.locationCity || "-"} |
| 이름 | ${data.name || "-"} |
| 담당 업무 | ${data.position || "-"} |
| 이메일 | ${data.email || "-"} |
| 전화번호 | ${data.phone || "-"} |
| 기타 문의사항 | ${data.inquiry || "-"} |
| 개인정보처리방침 동의 | ${data.privacyAgreement ? "✅ 동의" : "❌ 미동의"} |`;

  const slackPayload = {
    text: "🚀 *새로운 가입 신청이 접수되었습니다*",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🚀 새로운 가입 신청이 접수되었습니다",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: markdownTable,
        },
      },
    ],
  };

  try {
    await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackPayload),
    });
  } catch (error) {
    console.error("Slack 알림 전송 실패:", error);
    // Slack 전송 실패는 전체 프로세스를 중단하지 않음
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: FormSubmissionData = await request.json();

    // 필수 필드 검증
    if (
      !data.company ||
      !data.locationProvince ||
      !data.locationCity ||
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.privacyAgreement
    ) {
      return NextResponse.json(
        { success: false, error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    // Google Sheets 웹훅 URL 확인
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL이 설정되지 않았습니다.");
      console.error("환경 변수 확인:", {
        hasEnv: !!process.env.GOOGLE_SHEETS_WEBHOOK_URL,
        envKeys: Object.keys(process.env).filter(key => key.includes('GOOGLE') || key.includes('SHEET')),
      });
      return NextResponse.json(
        { 
          success: false, 
          error: "서버 설정 오류: Google Sheets 웹훅 URL이 설정되지 않았습니다. Vercel 대시보드에서 환경 변수를 설정해주세요." 
        },
        { status: 500 }
      );
    }

    // Google Apps Script 웹훅으로 데이터 전송
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: data.company,
        locationProvince: data.locationProvince,
        locationCity: data.locationCity,
        name: data.name,
        position: data.position || "",
        email: data.email,
        phone: data.phone,
        inquiry: data.inquiry || "",
        privacyAgreement: data.privacyAgreement,
      }),
    });

    if (!response.ok) {
      throw new Error(`웹훅 요청 실패: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "웹훅 처리 실패");
    }

    // Google Sheets 저장 성공 후 Slack 알림 전송 (비동기, 실패해도 무시)
    sendSlackNotification(data).catch((error) => {
      console.error("Slack 알림 전송 실패:", error);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("폼 제출 오류:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "알 수 없는 오류",
      },
      { status: 500 }
    );
  }
}
