// 리뷰 타입
export interface Review {
  id: string;
  title: string;
  content: string;
  created_at: string; // YYYY-MM-DD
  rating: number;
  author: UserProfile;
  file_urls: string[];
  like_count: number;
  comment_count: number;
  scrap_count: number;
}
export type ReviewSummary = {
  id: string;
  title: string;
  author: UserProfile;
  thumbnail_url: string;
  rating: number;
  like_count: number;
  comment_count: number;
  scrap_count: number;
};
export interface UserProfile {
  id: string; // 사용자 ID
  nickname: string; // 닉네임
  profile_image?: string; // 프로필 이미지 (null 또는 undefined 허용)
}
