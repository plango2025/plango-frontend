// src/pages/placeInfo/presenter/PlaceInfoPresenter.ts
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPlaceByKeyword,
  fetchPlaceReviews,
} from "../model/placeInfoModel";
import { createApiWithToken } from "@/api/axiosInstance";
import { useAccessToken } from "@/context/AccessTokenContext";
import { PlaceIntro } from "@/types/place";
import {
  toggleLike,
  toggleScrap,
} from "@/pages/ScheduleReview/details/model/ReviewDetailModel";

export const usePlaceSearch = (keyword?: string) => {
  // 리뷰 상태
  const [reviewItems, setReviewItems] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean | null>(null);

  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);

  // 장소소개 API (React Query)
  const {
    data: placeIntro,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["placeInfo", keyword],
    queryFn: () => fetchPlaceByKeyword(api, keyword!),
    enabled: !!keyword,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setLiked(data.is_liked);
      setBookmarked(data.is_bookmarked);
      console.log("장소 정보:", data);
    },
  });
  const loadFirstReviews = useCallback(
    async (keyword: string, limit = 10) => {
      try {
        const data = await fetchPlaceReviews(api, {
          keyword,
          limit,
          cursor: null,
        });
        setReviewItems(data.items);
        setNextCursor(data.next_cursor ?? null);
        setHasMore(data.has_more);
      } catch (err) {
        console.error("리뷰 불러오기 실패:", err);
      }
    },
    [api]
  );

  const loadMoreReviews = useCallback(
    async (keyword: string, limit = 10) => {
      if (!hasMore || !nextCursor) return;
      try {
        const data = await fetchPlaceReviews(api, {
          keyword,
          limit,
          cursor: nextCursor,
        });
        setReviewItems((prev) => [...prev, ...data.items]);
        setNextCursor(data.next_cursor ?? null);
        setHasMore(data.has_more);
        return data;
      } catch (err) {
        console.error("리뷰 추가 불러오기 실패:", err);
      }
    },
    [api, hasMore, nextCursor]
  );

  /** 좋아요 (낙관적 토글) */
  const handleLikeClick = async () => {
    if (!placeIntro) return;
    const nextLiked = !liked;
    setLiked(nextLiked);
    try {
      await toggleLike(api, "PLACE", keyword!, nextLiked);
    } catch (err) {
      console.error(err);
      setLiked(!nextLiked); // 실패 시 롤백
    }
  };

  /** 북마크 (낙관적 토글) */
  const handleBookmarkClick = async () => {
    if (!placeIntro) return;
    const nextBookmarked = !bookmarked;
    setBookmarked(nextBookmarked);
    try {
      await toggleScrap(api, "PLACE", keyword!, nextBookmarked);
    } catch (err) {
      console.error(err);
      setBookmarked(!nextBookmarked); // 실패 시 롤백
    }
  };

  return {
    liked,
    bookmarked,
    placeIntro,
    loading,
    error,
    reviewItems,
    hasMore,
    loadFirstReviews,
    loadMoreReviews,
    handleLikeClick,
    handleBookmarkClick,
  };
};
