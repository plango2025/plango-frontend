
// 내가 작성한 리뷰 목록 조회 API 1-1 
export interface Author {
  id: string;
  nickname: string;
  profile_image: string;
}

export interface ReviewItem {
  id: string;
  title: string;
  author: Author;
  type: string;
  thumbnail_url: string;
  rating: number;
  like_count: number;
  comment_count: number;
  scrap_count: number;
  is_liked: boolean;
  is_scrapped: boolean;
}

export interface ReviewsResponse {
  items: ReviewItem[];
  next_cursor: string | null;
  has_more: boolean;
}
