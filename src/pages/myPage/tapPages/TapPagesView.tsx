import React, { useEffect, useState } from "react";
import CommonCard from "@/components/common/card/CommonCard";
import styles from "./TapPages.module.scss";
import { ReviewItem } from "./TapPagesmodel";
import { useReviewApi } from "./TapPagesPresenter";
import { Text } from "@chakra-ui/react";

const ReviewPage: React.FC = () => {
  const { fetchReviews } = useReviewApi();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadReviews = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const data = await fetchReviews(3, cursor); // limit=3
      setReviews(prev => [...prev, ...data.items]);
      setCursor(data.next_cursor);
      setHasMore(data.has_more);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  if (reviews.length === 0 && !loading) {
    return <Text>리뷰가 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>
      {reviews.map(r => (
        <CommonCard
          key={r.id}
          profile_image={r.author.profile_image}
          name={r.author.nickname}
          title={r.title}
          rating={String(r.rating)}
        />
      ))}

      {hasMore && (
        <button onClick={loadReviews} disabled={loading}>
          {loading ? "로딩중..." : "더보기"}
        </button>
      )}
    </div>
  );
};

export function Page1() {
  return <ReviewPage />;
}
export function Page2() {
  return <ReviewPage />;
}
export function Page3() {
  return <ReviewPage />;
}


