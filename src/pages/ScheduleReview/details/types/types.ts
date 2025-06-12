export interface Review {
  review_id: number;
  target_id: string;
  user_id: string;
  title: string;
  content: string;
  rating: number;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface Comment {
  comment_id: number;
  target_id: number;
  target_type: string;
  user_id: string;
  content: string;
  user_nickname: string;
  user_avatar: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  nickname: string;
  profile_image: string;
  adress: string;
  birth: string;
  trip_count: number;
}
