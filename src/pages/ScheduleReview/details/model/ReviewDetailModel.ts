// model/ReviewDetailModel.ts

import { Comment } from '@/types/comment/comment';
import { Review, UserProfile } from '@/types/review/review';


// 리뷰 id로 리뷰에 대한 정보 가져오
export const fetchReview = async (api, id: string): Promise<Review> => {
  const res = await api.get(`/reviews/${id}`, {
    requiresAuth: true, // 인증 필요하면 추가
  });
  console.dir(res.data)
  return res.data;
};
// 유저 정보 조회 (리뷰를 작성한 유저)
export const fetchUser = async (api, userId: string): Promise<UserProfile> => {
  const res = await api.get(`/users/${userId}/profile`, { requiresAuth: true });
  return res.data;
};
//리뷰에 대한 댓글 조회
export const fetchComments = async (
  api,
  id: string
): Promise<Comment[]> => {
  const res = await api.get(
    `/comments?type=REVIEW&ref_id=${id}`,
    {}
  );
  return res.data.comments;
};
//댓글 등록 post 
export const postComment = async (
  api: any,
  reviewId: string,
  comment: string
): Promise<string> => {
  try {
    const response = await api.post(
      `/comments`,
      { content: comment,
        type:'REVIEW',
        reference_id: reviewId,
       
      },
      {
        requiresAuth: true,
      }
    );

    return response.data.id;
  } catch (error) {
    console.error("댓글 작성 중 오류 발생:", error);
    throw error;
  }
};
export const fetchUsersByIds = async (
  api,
  userIds: string[]
): Promise<UserProfile[]> => {
  return Promise.all(
    userIds.map((id) => fetchUser(api, id).catch(() => null))
  ).then((res) => res.filter(Boolean) as User[]);
};
