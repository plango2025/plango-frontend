export interface PlaceIntro {
  title: string; // 장소 이름
  sub_title: string; // 서브 타이틀 (간략한 설명)
  content: string; // 본문 설명
   rating: number
 address: string; // 주소
  longitude: number; // 경도
  latitude: number; // 위도
  main_image: string; // 대표 이미지 URL
  images: string[]; // 추가 이미지 URL 리스트
  like_count: number;  
  review_count: number;
  is_liked: boolean;
  is_scrapped: boolean;
}

