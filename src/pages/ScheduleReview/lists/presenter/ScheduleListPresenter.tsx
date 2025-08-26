import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import { fetchReviews, createDummySchedule } from "../model/ScheduleListModel";
import ScheduleListView from "../view/ScheduleListView";
import { useInfiniteQuery } from "@tanstack/react-query";

const ScheduleListPresenter = () => {
  const { accessToken, setAccessToken, user, logout, isLoggedIn } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

console.log(isLoggedIn)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["schdReviews", keyword, isLoggedIn],
      queryFn: ({ pageParam = 0 }) =>
        fetchReviews(api, keyword, pageParam, isLoggedIn),
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext ? lastPage.page + 1 : undefined;
      },
      retry: false,
      refetchOnWindowFocus: false,
    });

  // 평탄화된 리뷰 리스트
  const schdReviews = data?.pages.flatMap((page) => page.items) || [];
console.dir(schdReviews)
  // 마지막 카드가 화면에 보이면 다음 페이지 불러오기
  const observerRef = useRef<HTMLDivElement | null>(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  return (
    <ScheduleListView
      keyword={keyword}
      setKeyword={setKeyword}
      isLoggedIn={isLoggedIn}
      logout={logout}
      schdReviews={schdReviews}
      user={user}
      observerRef={observerRef}
      handleObserver={handleObserver}
      isFetchingNextPage={isFetchingNextPage}
      navigateToNewReview={() => navigate("/reviews/new/SCHEDULE")}
      handleCreateDummy={async () => {
        try {
          await createDummySchedule(api);
          refetch();
        } catch (error) {
          console.error("임시 리뷰 생성 실패:", error);
          alert("에러가 발생했습니다.");
        }
      }}
      navigateToLogin={() => navigate("/login")}
    />
  );
};

export default ScheduleListPresenter;
