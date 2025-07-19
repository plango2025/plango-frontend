import { useParams } from "react-router-dom";
import { useReviewDetailPresenter } from './presenter/ReviewDetailPresenter';
import ReviewDetailView from './view/ReviewDetailView';
import AppLayout from '@/layout/AppLayout';
import { SidePadding } from '@/components/common/padding/padding';

const ReviewDetailPage = () => {
  const { id } = useParams();

  const {
    review,
    user,
    comments,
    setComments,
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
  } = useReviewDetailPresenter(id);

  if (!review || !user) return <div>로딩 중...</div>;

  return (
    <AppLayout>
      <ReviewDetailView
        review={review}
        user={user}
        comments={comments}
        setComments={setComments}
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
      />
    </AppLayout>
  );
};

export default ReviewDetailPage;
