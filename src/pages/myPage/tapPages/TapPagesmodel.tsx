
// 1- 1 내가 작성한 리뷰 목록 조회 API 
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

// 1-2 내가 보관한 일정 목록 조회 api
export interface ScheduleItem {
  schedule_id: string;
  title: string;
  destination: string;
  duration: string;
  created_at: string;
  thumbnail_url: string;
}

export interface ScheduleListResponse {
  items: ScheduleItem[];
  next_cursor: string | null;
  has_more: boolean;
}

// 2-1 내가 좋아한 리뷰 목록 조회 api
export interface MyLoveReview {
  id: string;
  title: string;
  author: Author;
  type: "PLACE" | "SCHEDULE" | string; // 확장 가능
  thumbnail_url: string;
  rating: number;
  like_count: number;
  comment_count: number;
  scrap_count: number;
  is_liked: boolean;
  is_scrapped: boolean;
}

export interface CardItem1Response {
  items: MyLoveReview[];
  next_cursor: string | null;
  has_more: boolean;
}

// 2-2 내가 좋아한 장소 목록 조회 api
export interface PlaceItem {
  id: string;
  name: string;
  address: string;
  thumbnail_url: string;
  rating: number;
  review_count: number;
}

export interface PlaceItemResponse {
  items: PlaceItem[];
  next_cursor: string | null;
  has_more: boolean;
}

// 3-1 내가 스크랩한 리뷰 목록 조회 api
export interface ScrapReviewItem {
  id: string;
  title: string;
  author: Author;
  type: string; // 예: "PLACE"
  thumbnail_url: string;
  rating: number;
  like_count: number;
  comment_count: number;
  scrap_count: number;
  is_liked: boolean;
  is_scrapped: boolean;
}

export interface ReviewItemResponse {
  items: ScrapReviewItem[];
  next_cursor: string | null;
  has_more: boolean;
}


// 3-2 내가 스크랩한 장소 목록 조회 api
export interface ScrapPlaceItem {
  id: string;
  name: string;
  address: string;
  thumbnail_url: string;
  rating: number;
  review_count: number;
}

export interface PlaceItemResponse {
  items: ScrapPlaceItem[];
  next_cursor: string | null;
  has_more: boolean;
}