export interface Comment {
  id: string;
  author: {
    id: string;
    nickname: string;
    profile_image?: string; // 있을 수도 있고 없을 수도 있으므로 optional
  };
  content: string;
  created_at: string; 
}
