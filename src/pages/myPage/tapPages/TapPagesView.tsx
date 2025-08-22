// TapPages.tsx
import React from "react";
import CommonCard from "@/components/common/card/CommonCard";
import CommonCard2 from "@/components/common/card/CommonCard2";
import styles from "./TapPages.module.scss";
import { Text, Button } from "@chakra-ui/react";
import { ReviewItem, ScheduleItem } from "./TapPagesmodel";
import { useFetchList } from "./TapPagesPresenter";

// 1- 1 내가 작성한 리뷰 목록 조회 API 
const ReviewPage1_1: React.FC = () => {
  const { data: reviews, hasMore, loading, fetchData } = useFetchList<ReviewItem>("/users/reviews", 3);

  if (reviews.length === 0 && !loading) {
    return <Text>리뷰가 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>
      {reviews.map((r) => (
        <CommonCard
          key={r.id}
          profile_image={r.author.profile_image}
          name={r.author.nickname}
          title={r.title}
          rating={String(r.rating)}
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
const SchedulePage1_2: React.FC = () => {
  const { data: schedules, hasMore, loading, fetchData } = useFetchList<ScheduleItem>("/users/schedules", 3);

  if (schedules.length === 0 && !loading) {
    return <Text>일정이 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>

      {schedules.map((s) => (
        <CommonCard2
          key={s.schedule_id}
          title={s.title}
          destination={s.destination}
          thumbnail_url={s.thumbnail_url}
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
  const { data: reviews, hasMore, loading, fetchData } = useFetchList<ReviewItem>("/users/like/reviews", 3);

  if (reviews.length === 0 && !loading) {
    return <Text>리뷰가 없습니다.</Text>;
  }

  return (
    <div className={styles.pageContainer}>
      {reviews.map((r) => (
        <CommonCard
          key={r.id}
          profile_image={r.author.profile_image}
          name={r.author.nickname}
          title={r.title}
          rating={String(r.rating)}
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
  return <SchedulePage1_2 />;
}
export function Page3() {
  return <ReviewPage2_1 />;
}


