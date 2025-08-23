// TapPages.tsx
import React from "react";
import CommonCard from "@/components/common/card/CommonCard";
import CommonCard2 from "@/components/common/card/CommonCard2";

import styles from "./TapPages.module.scss";
import { Text, Button } from "@chakra-ui/react";
import { ReviewItem, ScheduleItem, MyLoveReview, PlaceItem, ScrapReviewItem, ScrapPlaceItem } from "./TapPagesmodel";
import { useFetchList } from "./TapPagesPresenter";
import CardComponent from "@/components/common/card/Card2"
import CardComponent3 from "@/components/common/card/Card3"
import CardComponent4 from "@/components/common/card/Card4"
import CardComponent5 from "@/components/common/card/Card5"
import CardComponent6 from "@/components/common/card/Card6"
import CardComponent7 from "@/components/common/card/Card7"

// 1- 1 내가 작성한 리뷰 목록 조회 API 
const ReviewPage1_1: React.FC = () => {
  const { data: reviews, hasMore, loading, fetchData } = useFetchList<ReviewItem>("/users/reviews", 3);

  if (reviews.length === 0 && !loading) {
    return <Text>리뷰가 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>
      {reviews.map((r) => (
        <CardComponent
          key={r.id}
          card = {r}

        />
      ))}

      {hasMore && (
        <Button onClick={fetchData} loading={loading}>
          더보기
        </Button>
      )}
    </div>
  );
};

// 1-2 내가 보관한 일정 목록 조회 api
const ReviewPage1_2: React.FC = () => {
  const { data: schedules, hasMore, loading, fetchData } = useFetchList<ScheduleItem>("/users/schedules", 3);

  if (schedules.length === 0 && !loading) {
    return <Text>일정이 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>

      {schedules.map((s) => (
        <CardComponent3
          key={s.schedule_id}
          card={s}
        />
      ))}

      {hasMore && (
        <Button onClick={fetchData} loading={loading}>
          더보기
        </Button>
      )}
    </div>

  );
};

// 2-1 내가 좋아한 리뷰 목록 조회 api
const ReviewPage2_1: React.FC = () => {
  const { data: reviews, hasMore, loading, fetchData } = useFetchList<MyLoveReview>("/users/like/reviews", 3);

  if (reviews.length === 0 && !loading) {
    return <Text>리뷰가 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>
      {reviews.map((r) => (
        <CardComponent4
          key={r.id}
          card={r}
        />
      ))}

      {hasMore && (
        <Button onClick={fetchData} loading={loading}>
          더보기
        </Button>
      )}
    </div>
  );
};
// 2-2 내가 좋아한 장소 목록 조회 api
const ReviewPage2_2: React.FC = () => {
  const { data: reviews, hasMore, loading, fetchData } = useFetchList<PlaceItem>("users/like/places", 3);

  if (reviews.length === 0 && !loading) {
    return <Text>리뷰가 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>
      {reviews.map((r) => (
        <CardComponent5
          key={r.id}
          card={r}
        />
      ))}

      {hasMore && (
        <Button onClick={fetchData} loading={loading}>
          더보기
        </Button>
      )}
    </div>
  );
};

// 3-1 내가 스크랩한 리뷰 목록 조회 api
const ReviewPage3_1: React.FC = () => {
  const { data: reviews, hasMore, loading, fetchData } = useFetchList<ScrapReviewItem>("users/scrap/reviews", 3);

  if (reviews.length === 0 && !loading) {
    return <Text>리뷰가 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>
      {reviews.map((r) => (
        <CardComponent6
          key={r.id}
          card={r}
        />
      ))}

      {hasMore && (
        <Button onClick={fetchData} loading={loading}>
          더보기
        </Button>
      )}
    </div>
  );
};

// 3-2 내가 스크랩한 장소 목록 조회 api
const ReviewPage3_2: React.FC = () => {
  const { data: reviews, hasMore, loading, fetchData } = useFetchList<ScrapPlaceItem>("users/scrap/places", 3);

  if (reviews.length === 0 && !loading) {
    return <Text>리뷰가 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>
      {reviews.map((r) => (
        <CardComponent7
          key={r.id}
          card={r}
        />
      ))}

      {hasMore && (
        <Button onClick={fetchData} loading={loading}>
          더보기
        </Button>
      )}
    </div>
  );
};
export function Page1() {
  return <ReviewPage1_1 />;
}
export function Page2() {
  return <ReviewPage1_2 />;
}
export function Page3() {
  return <ReviewPage2_1 />;
}

export function Page4() {
  return <ReviewPage2_2 />;
}
export function Page5() {
  return <ReviewPage3_1 />;
}
export function Page6() {
  return <ReviewPage3_2 />;
}


