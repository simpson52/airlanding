/**
 * YouTube 유틸리티 함수
 * YouTube URL에서 비디오 ID를 추출합니다.
 */

/**
 * YouTube URL에서 비디오 ID를 추출
 * @param url YouTube URL (다양한 형식 지원)
 * @returns 비디오 ID 또는 null
 */
export function extractYouTubeVideoId(url: string | undefined | null): string | null {
  if (!url) return null;

  // 이미 비디오 ID만 있는 경우 (11자리 영숫자)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return url.trim();
  }

  // YouTube URL 패턴들
  const patterns = [
    // https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // https://youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // https://www.youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // https://www.youtube.com/v/VIDEO_ID
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    // https://m.youtube.com/watch?v=VIDEO_ID
    /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * 환경 변수에서 YouTube 비디오 ID 또는 URL을 가져옴
 * @returns 비디오 ID 또는 null
 */
export function getYouTubeVideoId(): string | null {
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
  const youtubeVideoId = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID;

  // URL이 있으면 URL에서 추출
  if (youtubeUrl) {
    const extractedId = extractYouTubeVideoId(youtubeUrl);
    if (extractedId) return extractedId;
  }

  // 비디오 ID가 직접 있으면 사용
  if (youtubeVideoId) {
    return youtubeVideoId.trim();
  }

  return null;
}
