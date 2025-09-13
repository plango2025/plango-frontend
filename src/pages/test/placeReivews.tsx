// PlaceReviews.tsx
import React, { useEffect, useState } from "react";
import PlaceReview from "../placeInfo/components/placeReview/PlaceReview";
import { usePlaceSearch } from "../placeInfo/presenter/PlaceInfoPresenter";

interface PlaceReviewsProps {
  keyword: string;
}
const PlaceReviews = ({ keyword }:PlaceReviewsProps) => {
  const {
    reviewItems,
    loadFirstReviews,
    loadMoreReviews,
    loading,
    totalCount,
  } = usePlaceSearch(keyword);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (keyword.trim()) {
      loadFirstReviews(keyword, 3);
      setExpanded(false);
    }
  }, [keyword]);

  const handleToggle = async () => {
    if (!expanded) {
      // 펼치기: 남은 리뷰가 있으면 더 불러오기
      await loadMoreReviews(keyword, totalCount); // 전체 가져오기
    }
    setExpanded(!expanded);
  };

  if (!keyword.trim()) return <div>테스트용: URL에 /:keyword 가 필요해요.</div>;
  if (loading && reviewItems.length === 0) return <div>리뷰 불러오는 중…</div>;

  const visibleReviews = expanded ? reviewItems : reviewItems.slice(0, 5);

  return (
    <div style={{ padding: 16 }}>
      <PlaceReview title={keyword} items={visibleReviews} />

      {/* 버튼은 항상 보이도록 */}
     {reviewItems.length>0 && <button
        onClick={handleToggle}
        style={{
          display: "block",
          margin: "16px auto",
          padding: "8px 12px",
          border: "1px solid #ddd",
          borderRadius: 6,
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {expanded ? "접기" : "더보기"}
      </button>} 

      {loading && reviewItems.length > 0 && (
        <div style={{ textAlign: "center", margin: "16px 0" }}>
          리뷰 불러오는 중…
        </div>
      )}
    </div>
  );
};
export default PlaceReviews;