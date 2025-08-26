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
    handleCommentSubmit,
    handleScheduleClick,
    handleMenuClick,
    hasMore,
    isFetchingNext,
    setSentinelEl,
    isEditModalOpen,
    setIsEditModalOpen
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
        handleCommentSubmit={handleCommentSubmit}
        handleMenuClick={handleMenuClick}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </AppLayout>
  );
};

export default ReviewDetailPage;
