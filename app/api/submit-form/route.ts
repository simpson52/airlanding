import { NextRequest, NextResponse } from "next/server";
import {
  formatNewSignupSlackMessage,
  type NewSignupSlackMessageData,
} from "../../../lib/slack/formatNewSignupSlackMessage";

interface FormSubmissionData {
  company: string;
  email: string;
  inquiry: string;
  under100Workplace: boolean;
  privacyAgreement: boolean;
  businessRegistrationNumber: string;
}

async function sendSlackNotification(data: FormSubmissionData) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();
  if (!slackWebhookUrl) {
    return; // Slack 웹훅이 설정되지 않았으면 무시
  }

  const messageData: NewSignupSlackMessageData = {
    company: data.company,
    businessRegistrationNumber: data.businessRegistrationNumber,
    email: data.email,
    under100Workplace: data.under100Workplace,
    inquiry: data.inquiry,
  };

  const slackPayload = {
    text: formatNewSignupSlackMessage(messageData),
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

    // 필수 필드 검증 (under100Workplace는 예/아니오 중 선택된 boolean)
    const regNoDigits = (data.businessRegistrationNumber ?? "").replaceAll(/\D/g, "");
    if (
      !data.company ||
      !data.email ||
      regNoDigits.length !== 10 ||
      typeof data.under100Workplace !== "boolean" ||
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
        email: data.email,
        inquiry: data.inquiry || "",
        under100Workplace: data.under100Workplace,
        privacyAgreement: data.privacyAgreement,
        businessRegistrationNumber: data.businessRegistrationNumber || "",
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
