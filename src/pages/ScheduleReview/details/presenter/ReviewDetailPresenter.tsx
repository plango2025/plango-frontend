import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchReview,
  fetchComments,
  postComment,
} from "../model/ReviewDetailModel";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import { Review, UserProfile } from "@/types/review/review";
import { Comment } from "@/types/comment/comment";
export const useReviewDetailPresenter = (id: string | undefined) => {
    const navigate = useNavigate()
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const [review, setReview] = useState<Review | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [comments, setComments] = useState<Comment[] | null>([]);
  const [liked, setLiked] = useState(false); // 내가 좋아요 눌렀는지
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(true);

const handleScheduleClick=()=>{
  navigate(`/schedule/${review.reference.schedule_id}`);
}
  const handleLikeClick = (e:MouseEvent) => {
      e.stopPropagation();
    setLiked((prev) => {
      const newLiked = !prev;
      setLikeCount((prevCount) => (newLiked ? prevCount + 1 : prevCount - 1));
      console.log("like clicked"); 
      return newLiked;
    });
  };
  const handleBookmarkClick = () => {
    setBookmarked((prev) => {
      const newBookmarked = !prev;
      setBookmarkCount((prevCount) =>
        newBookmarked ? prevCount + 1 : prevCount - 1
      );
      return newBookmarked;
    });
  };
  const handleCommentSubmit = async () => {
    if (!review) return;
    await postComment(api, review.id, comment);
    const newComments = await fetchComments(api, review.id);
    setComments(newComments);
    setComment("");
  };
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const reviewData = await fetchReview(api, id);
        const commentList = await fetchComments(api, reviewData.id);
        setReview(reviewData);
        setUser(reviewData.author);
        setLikeCount(reviewData.like_count);
        setBookmarkCount(reviewData.scrap_count);
        setComments(commentList);
      } catch (err) {
        //불러오기를 실패했을때
        console.error(err);
      } finally {
        //성공이든 실패든 상관없이, 마지막에 무조건 실행
        setLoading(false);
      }
    })();
  }, [id]);

  return {
    review,
    user,
    comments,
    setComments,
    loading,
    handleLikeClick,
    handleBookmarkClick,
    handleCommentSubmit,
    handleScheduleClick,
    liked,
    likeCount,
    bookmarked,
    bookmarkCount,
    comment,
    setComment,
  };
};
