import { Review, User, Comment } from "../types/types";

export const fetchReview = async (id: string): Promise<Review> => {
  const res = await fetch(`/api/reviews/${id}`);
  if (!res.ok) throw new Error("리뷰 불러오기 실패");
  return res.json();
};

export const fetchUser = async (userId: string): Promise<User> => {
  const res = await fetch(`/api/users/${userId}`);
  if (!res.ok) throw new Error("사용자 불러오기 실패");
  return res.json();
};

export const fetchComments = async (reviewId: number): Promise<Comment[]> => {
  const res = await fetch(
    `/api/comments?targetId=${reviewId}&targetType=SCHEDULE_REVIEW`
  );
  if (!res.ok) throw new Error("댓글 불러오기 실패");
  return res.json();
};

export const fetchUsersByIds = async (userIds: string[]): Promise<User[]> => {
  return Promise.all(userIds.map((id) => fetchUser(id).catch(() => null))).then(
    (res) => res.filter(Boolean) as User[]
  );
};

export const fetchLikeCount = async (
  targetId: number,
  targetType: string
): Promise<number> => {
  const res = await fetch(
    `/api/likes/count?target_id=${targetId}&target_type=${targetType}`
  );
  if (!res.ok) throw new Error("좋아요 수 조회 실패");
  const data = await res.json();
  return data.like_count ?? 0;
};
