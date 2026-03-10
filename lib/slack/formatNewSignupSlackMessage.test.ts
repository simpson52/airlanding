import { describe, expect, it } from "vitest";
import { formatNewSignupSlackMessage } from "./formatNewSignupSlackMessage";

describe("formatNewSignupSlackMessage", () => {
  it("예시 포맷으로 신규 가입 메시지를 만든다", () => {
    const fixedNow = new Date("2026-02-11T04:30:54.000Z"); // KST 2026-02-11 13:30:54

    const message = formatNewSignupSlackMessage(
      {
        company: "(주)신호정유",
        businessRegistrationNumber: "123-45-67890",
        email: "jej un0504@naver.com".replace(" ", ""),
        under100Workplace: true,
        inquiry: "잘 쓰겠습니다.",
      },
      fixedNow
    );

    expect(message).toBe(
      [
        "신규 가입신청이 있습니다. (2026-02-11 13:30:54)",
        "",
        "회사명 : (주)신호정유",
        "사업자등록번호 : 123-45-67890",
        "이메일 : jejun0504@naver.com",
        "100인 이하 사업장 : 맞음",
        "문의사항 : 잘 쓰겠습니다.",
        "",
        "신청서 링크 : https://docs.google.com/spreadsheets/d/17M0c0eMz1x2ZIS9bzgc8sy9OJrneZ0WhEgsbM9Ggzc0/edit?usp=sharing",
      ].join("\n")
    );
  });
});

