import {
  Avatar,
  GridItem,
  Heading,
  RatingGroup,
  Separator,
  Text,
  Badge, Box, Button, Card, HStack, Image
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
  ReviewLink,
} from "./ReviewDetailPage.style";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Rating } from "@/components/Card.style";
import { Review, UserProfile } from "@/types/review/review";
import CommentList from "@/pages/ScheduleReview/details/components/CommentList";
import {
  PaddingLg,
  PaddingMd,
  SidePaddingTextbox,
} from "@/components/common/padding/padding";
import { getStarsIcons } from "@/components/common/Rating/Rating";
import { AutoCenter } from "./../../../../components/common/align/AutoCenter";
type ReviewDetailViewProps = {
  review: Review;
  user: UserProfile;
  comments: Comment[] | null;
  setComments: (value: Comment[]) => {};
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
  user,
  comments,
  setComments,
  loading,
}: ReviewDetailViewProps) => {
  
  return (
    <GridItem colSpan={12}>
      {/* <ReviewLink onClick={handleScheduleClick}>{review.id}</ReviewLink> */}
     
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
          <PaddingMd/>
          <AutoCenter>
          <Card.Root  bg="white" 
   flexDirection="row" pr="1rem" gap="2rem" overflow="hidden" w="100%">
    <Image
      objectFit="cover"
      maxW="200px"
      src={review.reference.thumbnail_url}
      alt={review.title}
    />
    <Box>
      <Card.Body>
        <Card.Title  pt="1.5rem" >{review.reference.title}</Card.Title>
        
       <HStack mt="2">
  <Badge p="0.3rem">{review.reference.destination}</Badge>
  <Badge p="0.3rem">{review.reference.duration}</Badge>
</HStack>
      </Card.Body>
      <Card.Footer pb="1rem">
        <Button  onClick ={handleScheduleClick} p="0.5rem" mt="1rem">일정 바로보기</Button>
      </Card.Footer >
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
          <IconBox>
            {/* 좋아요 아이콘 */}

            <Icon onClick={handleLikeClick} style={{ cursor: "pointer" }}>
              {liked ? <FaHeart color="red" /> : <FaRegHeart />}
              <span> {likeCount}</span>
            </Icon>

            {/* 북마크 아이콘 */}

            <Icon onClick={handleBookmarkClick} style={{ cursor: "pointer" }}>
              {bookmarked ? <FaBookmark color="gold" /> : <FaRegBookmark />}
              <span>{bookmarkCount}</span>
            </Icon>
          </IconBox>
          <CommentSection>
            {comments.length > 0 ? (
              <CommentList comments={comments} />
            ) : (
              <>
                <PaddingMd />
                <AutoCenter>
                  <p style={{ color: "#919294" }}>
                    댓글이 없습니다. <br />
                    첫번째 댓글을 달아주세요!{" "}
                  </p>
                </AutoCenter>
                <PaddingMd />
              </>
            )}
            <InputWrap>
              <CommentInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="댓글을 입력하세요"
              />
              <CommentSubmitBtn onClick={handleCommentSubmit}>
                등록
              </CommentSubmitBtn>
            </InputWrap>
          </CommentSection>
        </SidePaddingTextbox>
      </Wrapper>
    </GridItem>
  );
};

export default ReviewDetailView;
