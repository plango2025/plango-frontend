import { useEffect, useState } from "react";
import { Review, User, Comment } from "../types/types";
import {
  fetchReview,
  fetchUser,
  fetchComments,
  fetchUsersByIds,
  fetchLikeCount,
} from "../model/model";

export const useReviewDetailPresenter = (id: string | undefined) => {
  const [review, setReview] = useState<Review | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [loading, setLoading] = useState(true); //로딩시작작

  useEffect(() => {
    if (!id) return;
    (async () => {
      try { //데이터 불러오는 작업
       
        
        const reviewData = await fetchReview(id);
        setReview(reviewData);
       

        const userData = await fetchUser(reviewData.user_id);
        setUser(userData);

        const like = await fetchLikeCount(
          reviewData.review_id,
         "SCHEDULE_REVIEW"
        );
        setLikeCount(like);

        const commentList = await fetchComments(reviewData.review_id);
        const userIds = [...new Set(commentList.map((c) => c.user_id))];
        const users = await fetchUsersByIds(userIds);
        const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

        const enriched = commentList.map((c) => ({
          ...c,
          user_nickname: userMap[c.user_id]?.nickname ?? "알 수 없음",
          user_avatar: userMap[c.user_id]?.profile_image ?? "",
        }));

        setComments(enriched);
      } catch (err) { //불러오기를 실패했을때
        console.error(err);
      } finally {
        //성공이든 실패든 상관없이, 마지막에 무조건 실행
        setLoading(false);
      }
    })();
  }, [id]);

  return { review, user, comments,setComments, likeCount, loading };
};
