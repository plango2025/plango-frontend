// model/ReviewDetailModel.ts
import { Comment } from "@/types/comment/comment";
import { Review, UserProfile } from "@/types/review/review";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
export type ScrapResponse = { scrapped: boolean; scrap_count: number };

/** 리뷰 상세 */
export const fetchReview = async (
  api: any,
  id: string,
  isLoggedIn: boolean
): Promise<Review> => {
  const res = await api.get(`/reviews/${id}`, { requiresAuth: isLoggedIn });
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
export async function toggleLike(
  api: any,
  type: "REVIEW" | "PLACE",
  idOrKeyword: string,
  willLike: boolean
): Promise<LikeResponse> {
  const params: Record<string, string> =
    type === "REVIEW"
      ? { type, ref_id: idOrKeyword }
      : { type, keyword: idOrKeyword };

  const config = { params, requiresAuth: true };

  if (willLike) {
    const res = await api.post("/like", null, config);
    return res.data as LikeResponse;
  } else {
    const res = await api.delete("/like", config);
    return res.data as LikeResponse;
  }
}

// toggleScrap 범용화: REVIEW 또는 PLACE
export const toggleScrap = async (
  api: any,
  type: "REVIEW" | "PLACE",
  idOrKeyword: string,
  willScrap: boolean
): Promise<ScrapResponse> => {
  const params: Record<string, string> =
    type === "REVIEW"
      ? { type, ref_id: idOrKeyword }
      : { type, keyword: idOrKeyword };

  const config = { params, requiresAuth: true };

  if (willScrap) {
    const res = await api.post("/scrap", null, config);
    return res.data as ScrapResponse;
  } else {
    const res = await api.delete("/scrap", config);
    return res.data as ScrapResponse;
  }
};
export const deleteReview = async (api: any, id: string): Promise<void> => {
  try {
    await api.delete(`/reviews/${id}`, { requiresAuth: true });
  } catch (err) {
    const error = err as AxiosError;

    if (error.status === 403) {
      toast.error("본인이 작성한 글만 삭제할 수 있습니다.");
    }
  }
};
export const deleteComment = async (api: any, id: string): Promise<void> => {
  try {
    await api.delete(`/comments/${id}`, { requiresAuth: true });
  } catch (err) {
    const error = err as AxiosError;

    if (error.status === 403) {
      toast.error("본인이 작성한 글만 삭제할 수 있습니다.");
    }
  }
};
