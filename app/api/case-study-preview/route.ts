import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

// 타임아웃이 있는 fetch
async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${response.status}` },
        { status: response.status }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // OG 이미지 추출
    let imageUrl = $("meta[property='og:image']").attr("content") || "";
    
    // Twitter card 이미지
    if (!imageUrl) {
      imageUrl = $("meta[name='twitter:image']").attr("content") || "";
    }

    // 상대 경로를 절대 경로로 변환
    if (imageUrl && imageUrl.startsWith("/")) {
      const urlObj = new URL(url);
      imageUrl = `${urlObj.protocol}//${urlObj.hostname}${imageUrl}`;
    }

    // 이미지가 없으면 빈 문자열 반환
    return NextResponse.json({ imageUrl: imageUrl || "" });
  } catch (error) {
    console.error(`Error fetching preview for ${url}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch preview" },
      { status: 500 }
    );
  }
}
