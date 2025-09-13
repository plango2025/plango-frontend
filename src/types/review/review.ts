// 리뷰 타입

export type ReviewType = { SCHEDULE: "SCHEDULE"; PLACE: "PLACE" }; // 필요하면 다른 타입도 추가: | "PLACE" | "ATTRACTION" ...

export interface ReviewReference {
  schedule_id: string;
  title: string;
  destination: string;
  duration: string;
  created_at: string; // "2025-07-20" 형식
  thumbnail_url: string;
}
export interface UserProfile {
  id: string; // 사용자 ID
  nickname: string; // 닉네임
  profile_image?: string; // 프로필 이미지 (null 또는 undefined 허용)
}
export interface Review {
  id: string;
  title: string;
  content: string;
  created_at: string; // "YYYY-MM-DD HH:mm:ss" (예: "2025-07-20 12:54:49")
  rating: number;
  author: UserProfile;

  type: ReviewType; // 예: "SCHEDULE"
  reference: ReviewReference;
  thumbnail_url: string;
  file_urls: string[];

  like_count: number;
  comment_count: number;
  scrap_count: number;

  is_liked: boolean; // 내가 좋아요 눌렀는지
  is_scrapped: boolean; // 내가 스크랩 했는지
}
