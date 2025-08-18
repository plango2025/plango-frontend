// ReviewDetailView.tsx
import {
  Avatar,
  GridItem,
  Text,
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Image,
  Separator,
  RatingGroup,
} from "@chakra-ui/react";
import {
  Title,
  InputWrap,
  Header,
  IconBox,
  Icon,
  GalleryImage,
  Wrapper,
  Profile,
  Gallery,
  CommentSubmitBtn,
  CommentSection,
  CommentInput,
} from "./ReviewDetailPage.style";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Rating } from "@/components/common/card/Card.style";
import CommentList from "@/pages/ScheduleReview/details/components/CommentList";
import {
  PaddingMd,
  SidePaddingTextbox,
} from "@/components/common/padding/padding";
import { AutoCenter } from "@/components/common/align/AutoCenter";
import type { Review, UserProfile } from "@/types/review/review";
import type { Comment } from "@/types/comment/comment";

type ReviewDetailViewProps = {
  review: Review;
  user: UserProfile;
  comments: Comment[]; // 화면에 표시할 전체 목록 (무한 스크롤)
  allCount: number; // 로드된 댓글 총 개수(표시용)
  hasMore: boolean; // 다음 페이지 존재 여부
  isFetchingNext: boolean; // 다음 페이지 로딩 중

  // 무한 스크롤 센티넬 엘리먼트 세터
  setSentinelEl: (el: HTMLDivElement | null) => void;

  // UX/액션
  loading: boolean;
  liked: boolean;
  likeCount: number;
  bookmarked: boolean;
  bookmarkCount: number;
  handleScheduleClick: () => void;
  handleLikeClick: () => void;
  handleBookmarkClick: () => void;
  handleCommentSubmit: () => void;
  comment: string;
  setComment: (value: string) => void;
};

const ReviewDetailView = ({
  comment,
  setComment,
  liked,
  likeCount,
  bookmarked,
  bookmarkCount,
  handleLikeClick,
  handleBookmarkClick,
  handleCommentSubmit,
  handleScheduleClick,
  review,
  comments,
  allCount,
  hasMore,
  isFetchingNext,
  setSentinelEl,
}: ReviewDetailViewProps) => {
  // 숫자 포맷(천단위)
  const fmt = (n: number) => new Intl.NumberFormat().format(n);

  return (
    <GridItem colSpan={12}>
      {review.file_urls.length > 0 && (
        <Header backgroundUrl={review.file_urls[0]}>
          <Title>{review.title}</Title>
          <Profile>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={review.author.nickname} />
              <Avatar.Image src={review.author.profile_image} />
            </Avatar.Root>
            <p>{review.author.nickname}</p>
          </Profile>
          <Rating>
            <RatingGroup.Root
              colorPalette="yellow"
              value={review.rating}
              count={5}
              readOnly
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
          </Rating>
        </Header>
      )}

      <Wrapper>
        <SidePaddingTextbox>
          <PaddingMd />
          <AutoCenter>
            <Card.Root
              bg="white"
              flexDirection="row"
              pr="1rem"
              gap="2rem"
              overflow="hidden"
              w="100%"
            >
              <Image
                objectFit="cover"
                maxW="200px"
                src={review.reference.thumbnail_url}
                alt={review.title}
              />
              <Box>
                <Card.Body>
                  <Card.Title pt="1.5rem">{review.reference.title}</Card.Title>
                  <HStack mt="2">
                    <Badge p="0.3rem">{review.reference.destination}</Badge>
                    <Badge p="0.3rem">{review.reference.duration}</Badge>
                  </HStack>
                </Card.Body>
                <Card.Footer pb="1rem">
                  <Button onClick={handleScheduleClick} p="0.5rem" mt="1rem">
                    일정 바로보기
                  </Button>
                </Card.Footer>
              </Box>
            </Card.Root>
          </AutoCenter>

          <PaddingMd />
          {review.file_urls.length > 0 && (
            <Gallery>
              {review.file_urls.map((image) => (
                <GalleryImage key={image} src={image} alt="리뷰 이미지" />
              ))}
            </Gallery>
          )}

          <Text
            whiteSpace="pre-line"
            p="1rem 2rem"
            fontSize="18px"
            lineHeight="3rem"
          >
            {review.content}
          </Text>

          <Separator mt="3rem" mb="3rem" size="lg" />

          {/* 좋아요 / 스크랩 */}
          <IconBox>
            <Icon
              onClick={handleLikeClick}
              style={{ cursor: "pointer" }}
              role="button"
              aria-pressed={liked}
              aria-label={liked ? "좋아요 취소" : "좋아요"}
              title={liked ? "좋아요 취소" : "좋아요"}
            >
              {liked ? <FaHeart color="red" /> : <FaRegHeart />}{" "}
              <span>{fmt(likeCount)}</span>
            </Icon>

            <Icon
              onClick={handleBookmarkClick}
              style={{ cursor: "pointer" }}
              role="button"
              aria-pressed={bookmarked}
              aria-label={bookmarked ? "스크랩 취소" : "스크랩"}
              title={bookmarked ? "스크랩 취소" : "스크랩"}
            >
              {bookmarked ? <FaBookmark color="gold" /> : <FaRegBookmark />}{" "}
              <span>{fmt(bookmarkCount)}</span>
            </Icon>
          </IconBox>

          {/* 댓글 */}
          <CommentSection>
            <PaddingMd />
            <InputWrap>
              <CommentInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="댓글을 입력하세요"
                aria-label="댓글 입력"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    handleCommentSubmit();
                  }
                }}
              />
              <CommentSubmitBtn onClick={handleCommentSubmit}>
                등록
              </CommentSubmitBtn>
            </InputWrap>

            {comments.length > 0 ? (
              <>
                <CommentList comments={comments} />
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#8a8a8a",
                    textAlign: "right",
                  }}
                >
                  총 {fmt(allCount)}개
                </div>
              </>
            ) : (
              <>
                <PaddingMd />
                <AutoCenter>
                  <p style={{ color: "#919294", textAlign: "center" }}>
                    댓글이 없습니다. <br />
                    첫번째 댓글을 달아주세요!
                  </p>
                </AutoCenter>
                <PaddingMd />
              </>
            )}

            {/* 무한 스크롤 상태 */}
            {isFetchingNext && (
              <div style={{ textAlign: "center", marginTop: "8px" }}>
                더 불러오는 중…
              </div>
            )}

            {/* 바닥 센티넬: viewport에 들어오면 자동으로 다음 페이지 로드 */}
            {hasMore && (
              <div
                ref={setSentinelEl}
                style={{ height: 1 }}
                aria-hidden="true"
              />
            )}
          </CommentSection>
        </SidePaddingTextbox>
      </Wrapper>
    </GridItem>
  );
};

export default ReviewDetailView;
