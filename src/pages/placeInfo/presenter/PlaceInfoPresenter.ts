// src/pages/placeInfo/presenter/PlaceInfoPresenter.ts
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPlaceByKeyword,
  fetchPlaceReviews,
} from "../model/placeInfoModel";
import { createApiWithToken } from "@/api/axiosInstance";
import { useAccessToken } from "@/context/AccessTokenContext";
import {
  toggleLike,
  toggleScrap,
} from "@/pages/ScheduleReview/details/model/ReviewDetailModel";
import { PlaceIntro } from '@/types/place';

export const usePlaceSearch = (keyword?: string) => {
  // 리뷰 상태
  const [reviewItems, setReviewItems] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
const [reviewCount,setReviewCount] = useState(0)
  // 장소소개 API (React Query)
  const {
    data: placeIntroData,
    isLoading: loading,
    error,
  } = useQuery<PlaceIntro>({
    queryKey: ["placeInfo", keyword],
    queryFn: () => fetchPlaceByKeyword(api, keyword!),
    enabled: !!keyword,
  });

useEffect(() => {
  if (placeIntroData) {
    setLiked(placeIntroData.is_liked);
    setBookmarked(placeIntroData.is_scrapped);
    setLikeCount(placeIntroData.like_count);
    setReviewCount(placeIntroData.review_count)
    console.log("장소 정보:", placeIntroData);
  }
}, [placeIntroData]);

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
    async (keyword: string, limit = 5) => {
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
    if (!placeIntroData) return;
    const nextLiked = !liked;
    setLiked(nextLiked);
    
    try {
      await toggleLike(api, "PLACE", keyword!, nextLiked);
      setLikeCount(nextLiked ? (likeCount ?? 0) + 1 : (likeCount ?? 0) - 1);
    } catch (err) {
      console.error(err);
      setLiked(!nextLiked); // 실패 시 롤백
    }
  };

  /** 북마크 (낙관적 토글) */
  const handleBookmarkClick = async () => {
    if (!placeIntroData) return;
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
    likeCount,
    bookmarked,
    placeIntroData,
    loading,
    error,
    reviewItems,
    hasMore,
    loadFirstReviews,
    loadMoreReviews,
    handleLikeClick,
    handleBookmarkClick,
    reviewCount,
  };
};
