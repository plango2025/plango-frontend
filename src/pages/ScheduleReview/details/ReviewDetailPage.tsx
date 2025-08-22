import { useParams } from "react-router-dom";
import { useReviewDetailPresenter } from "./presenter/ReviewDetailPresenter";
import ReviewDetailView from "./view/ReviewDetailView";
import AppLayout from "@/layout/AppLayout";

const ReviewDetailPage = () => {
  const { id } = useParams();

  const {
    review,
    user,
    comments,
    loading,
    liked,
    likeCount,
    bookmarked,
    bookmarkCount,
    comment,
    setComment,
    handleLikeClick,
    handleBookmarkClick,
    handleCommentSubmit,
    handleScheduleClick,
    handleMenuClick,
    hasMore,
    isFetchingNext,
    setSentinelEl,
  } = useReviewDetailPresenter(id);

  if (!review || !user) return <div>로딩 중...</div>;

  return (
    <AppLayout>
      <ReviewDetailView
        review={review}
        user={user}
        comments={comments}
        allCount={comments.length}
        hasMore={hasMore}
        isFetchingNext={isFetchingNext}
        setSentinelEl={setSentinelEl}
        loading={loading}
        liked={liked}
        likeCount={likeCount}
        bookmarked={bookmarked}
        bookmarkCount={bookmarkCount}
        comment={comment}
        setComment={setComment}
        handleScheduleClick={handleScheduleClick}
        handleLikeClick={handleLikeClick}
        handleBookmarkClick={handleBookmarkClick}
        handleCommentSubmit={handleCommentSubmit}
        handleMenuClick={handleMenuClick}
      />
    </AppLayout>
  );
};

export default ReviewDetailPage;
