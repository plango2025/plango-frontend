// presenter/useReviewDetailPresenter.ts
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchReview,
  fetchComments,
  postComment,
  CommentPage,
  toggleLike,
  toggleScrap,
  deleteReview,
} from "../model/ReviewDetailModel";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import type { Review, UserProfile } from "@/types/review/review";
import type { Comment } from "@/types/comment/comment";

export const useReviewDetailPresenter = (id: string | undefined) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);

  // 엔티티 상태
  const [review, setReview] = useState<Review | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  // 댓글 페이지 누적 / 페이지네이션 상태
  const [pages, setPages] = useState<CommentPage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  // UX
  const [liked, setLiked] = useState(null);
  const [likeCount, setLikeCount] = useState(review?.like_count || 0);
  const [bookmarked, setBookmarked] = useState(null);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 합쳐진 댓글 리스트 (항상 전체 노출: 버튼 없음)
  const comments: Comment[] = useMemo(
    () => pages.flatMap((p) => p.items),
    [pages]
  );

  /** 일정 바로보기 */
  const handleScheduleClick = () => {
    if (!review) return;
    navigate(`/schedule/${review.reference.schedule_id}`);
  };
  const handleLikeClick = async (type: "REVIEW" | "PLACE", id: string) => {
    setLiked((prev) => {
      const next = !prev;
      void toggleLike(api, type, id, next); // type과 id를 그대로 전달
      return next;
    });
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const handleBookmarkClick = (type: "REVIEW" | "PLACE", id: string) => {
    setBookmarked((prev) => {
      const next = !prev;
      void toggleScrap(api, type, id, next);
      return next;
    });
    setBookmarkCount((c) => (bookmarked ? c - 1 : c + 1));
  };

  /** 댓글 등록 → 첫 페이지 새로고침 */
  const [commentInput, setCommentInput] = useState("");
  const handleCommentSubmit = async () => {
    if (!review || !commentInput.trim()) return;
    await postComment(api, review.id, commentInput.trim());

    const first = await fetchComments({
      api,
      refId: review.id,
      cursor: null,
      limit: 20,
    });
    setPages([first]);
    setNextCursor(first.next_cursor);
    setHasMore(first.has_more);
    setCommentInput("");
  };

  /** 다음 페이지 로드(무한 스크롤에서 호출) */
  const loadNextPage = async () => {
    if (!review || !hasMore || !nextCursor || isFetchingNext) return;
    try {
      setIsFetchingNext(true);
      const next = await fetchComments({
        api,
        refId: review.id,
        cursor: nextCursor,
        limit: 20,
      });
      setPages((prev) => [...prev, next]);
      setNextCursor(next.next_cursor);
      setHasMore(next.has_more);
    } finally {
      setIsFetchingNext(false);
    }
  };

  /** 초기 로드 */
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const reviewData = await fetchReview(api, id);
        const first = await fetchComments({
          api,
          refId: reviewData.id,
          cursor: null,
          limit: 20,
        });

        setReview(reviewData);
        setUser(reviewData.author);
        setLiked(reviewData.is_liked);
        setLikeCount(reviewData.like_count);
        setBookmarked(reviewData.is_scrapped);
        setBookmarkCount(reviewData.scrap_count);

        setPages([first]);
        setNextCursor(first.next_cursor);
        setHasMore(first.has_more);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  /** 무한 스크롤용 센티넬 ref & 옵저버 등록 */
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadNextPage();
        }
      },
      {
        root: null, // viewport 기준(페이지 전체 스크롤)
        rootMargin: "0px 0px 200px 0px", // 미리 당겨 로드
        threshold: 0.01,
      }
    );

    io.observe(el);
    return () => io.disconnect();
    // hasMore/nextCursor가 변해도 ref는 동일하므로 의존성에 넣지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinelRef.current]);

  const handleMenuClick = (action: "edit" | "delete") => {
    console.log("여기를 아예 들어오지르 않네");
    switch (action) {
      case "edit":
        setIsEditModalOpen(true);
        break;
      case "delete":
        console.log("삭제");
        deleteReview(api, id);
        navigate("/reviews")
        break;
    }
  };

  return {
    // 데이터
    review,
    user,
    comments,
    allCount: comments.length,

    // 페이지네이션 상태
    hasMore,
    isFetchingNext,

    // 액션/UX
    handleScheduleClick,
    handleLikeClick,
    handleBookmarkClick,
    handleCommentSubmit,
    handleMenuClick,
    comment: commentInput,
    setComment: setCommentInput,
    isEditModalOpen,
    setIsEditModalOpen,
    liked,
    likeCount,
    bookmarked,
    bookmarkCount,
    loading,

    // View에 내려줄 센티넬 ref setter
    setSentinelEl: (el: HTMLDivElement | null) => {
      sentinelRef.current = el;
    },
  };
};
