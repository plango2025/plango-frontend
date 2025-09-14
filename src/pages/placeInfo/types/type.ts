export interface PlaceReviewItem {
  id: string;
  title: string;
  author: {
    id: string;
    nickname: string;
    profile_image?: string;
  };
  type: "PLACE";
  thumbnail_url?: string;
  rating: number;
  like_count: number;
  comment_count: number;
  scrap_count: number;
  is_liked: boolean;
  is_scrapped: boolean;
}
