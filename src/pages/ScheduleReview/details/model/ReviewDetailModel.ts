// model/ReviewDetailModel.ts
import { Comment } from "@/types/comment/comment";
import { Review, UserProfile } from "@/types/review/review";

/** 리뷰 상세 */
export const fetchReview = async (api: any, id: string): Promise<Review> => {
  const res = await api.get(`/reviews/${id}`, { requiresAuth: true });
  console.log("상세에서의 리뷰:", res.data);
  return res.data;
};

/** 유저 프로필 */
export const fetchUser = async (
  api: any,
  userId: string
): Promise<UserProfile> => {
  const res = await api.get(`/users/${userId}/profile`, { requiresAuth: true });
  return res.data;
};

/** 페이지 응답 타입 */
export type CommentPage = {
  items: Comment[];
  has_more: boolean;
  next_cursor: string | null;
};

/** 댓글 페이지 조회 (cursor 기반) */
export const fetchComments = async ({
  api,
  refId,
  cursor = null,
  limit = 20,
}: {
  api: any;
  refId: string;
  cursor?: string | null;
  limit?: number;
}): Promise<CommentPage> => {
  const res = await api.get("/comments", {
    params: { type: "REVIEW", ref_id: refId, cursor, limit },
  });
  const data = res?.data ?? {};

  // 백엔드가 items/has_more/next_cursor로 내려온다고 했으니 그대로 정규화
  return {
    items: Array.isArray(data.items) ? data.items : [],
    has_more: Boolean(data.has_more),
    next_cursor: data.next_cursor ?? null,
  };
};

/** 댓글 등록 */
export const postComment = async (
  api: any,
  reviewId: string,
  content: string
): Promise<string> => {
  const res = await api.post(
    `/comments`,
    { content, type: "REVIEW", reference_id: reviewId },
    { requiresAuth: true }
  );
  return res.data.id;
};

/** 여러 유저 프로필 조회 */
export const fetchUsersByIds = async (
  api: any,
  userIds: string[]
): Promise<UserProfile[]> => {
  const results = await Promise.all(
    userIds.map((id) => fetchUser(api, id).catch(() => null))
  );
  return results.filter(Boolean) as UserProfile[];
};

/** 좋아요  */
// types
type LikeResponse = { liked: boolean; like_count: number };

// 서버: POST /likes, DELETE /likes  (쿼리: type, ref_id)
export async function toggleLike(
  api: any,
  reviewId: string,
  willLike: boolean
): Promise<LikeResponse> {
  const config = {
    params: { type: "REVIEW", ref_id: reviewId },
    requiresAuth: true,
  };

  if (willLike) {
    console.log("좋아요 요청:", config);
    const res = await api.post("/like", null, config);
    return res.data as LikeResponse;
  } else {
    console.log("좋아요 취소 요청:", config);
    const res = await api.delete("/like", config);
    return res.data as LikeResponse;
  }
}
export type ScrapResponse = { scrapped: boolean; scrap_count: number };

export const toggleScrap = async(
  api: any,
  reviewId: string,
  willScrap: boolean,
  opts?: { keyword?: string } // 필요 시
): Promise<ScrapResponse> => {
  const config = {
    params: {
      type: "REVIEW",
      ref_id: reviewId,
      ...(opts?.keyword ? { keyword: opts.keyword } : {}),
    },
    requiresAuth: true,
  };

  if (willScrap) {
    const res = await api.post("/scrap", null, config); // POST /scrap
    return res.data as ScrapResponse;
  } else {
    const res = await api.delete("/scrap", config); // DELETE /scrap
    return res.data as ScrapResponse;
  }
}