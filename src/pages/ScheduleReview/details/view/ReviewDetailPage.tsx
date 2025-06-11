import { useParams } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import CommentList from "./../components/CommentList";
import { Avatar, GridItem, Heading, Separator, Text } from "@chakra-ui/react";
import {
  Header,
  IconBox,
  Image,
  Wrapper,
  Profile,
  Gallery,
} from "./ReviewDetailPage.style.ts";
import { FaHeart } from "react-icons/fa";
import { Rating } from "../../../../components/Card.style";
import { getStarsIcons } from "../../../../components/Card";
import { useReviewDetailPresenter } from "../presenter/presenter.tsx";

const ReviewDetailPage = () => {


  const { id } = useParams();
  const { review, user, comments, likeCount, loading } =useReviewDetailPresenter(id);
  // const handleLikeClick = async ()=>{
  //   try{
  //    // 좋아요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //   }
  // }
  // ===========review
  // {
  //   "review_id": 321,
  //   "target_id": "place_101",
  //   "target_type": "PLACE",
  //   "user_id": "user_001",
  //   "title": "정말 멋진 장소였어요",
  //   "content": "사진보다 더 예뻐요. 추천합니다!",
  //   "rating": 4.8,
  //   "images": [
  //     "https://plango.img/rev1.jpg"
  //   ],
  //   "created_at": "2025-06-01T10:11:22",
  //   "updated_at": "2025-06-01T10:11:22"
  // }
  //===========user
  // {
  //   "id": "wsAz8mRfCuaky0o",
  //   "nickname": "홍길동",
  //   "profile_image": "http://localhost:8080/files/ihnioknks2bJd",
  //   "address": "강원도 춘천시",
  //   "birth": "2006-08-25",
  //   "trip_count": 3
  // }
  //===========comments => enriched
  // [
  //   {
  //     comment_id: 101,
  //     target_id: 42,
  //     target_type: "PLACE_REVIEW",
  //     user_id: "user_123",
  //     content: "이 장소 정말 좋았어요!",
  //     created_at: "2025-06-01T09:15:30",
  //     updated_at: "2025-06-01T09:15:30",
  //     user_nickname: "민수",
  //     user_avatar: "https://example.com/images/minsu.jpg",
  //   },
  //   {
  //     comment_id: 102,
  //     target_id: 42,
  //     target_type: "PLACE_REVIEW",
  //     user_id: "user_456",
  //     content: "리뷰보고 방문했는데 만족했습니다 :)",
  //     created_at: "2025-06-01T10:22:45",
  //     updated_at: "2025-06-01T10:22:45",
  //     user_nickname: "지현",
  //     user_avatar: "https://example.com/images/jihyun.png",
  //   },
  // ];
  //===========likeCount
  //{
  //   "target_id": 42,
  //   "target_type": "PLACE_REVIEW",
  //   "like_count": 17
  // }

  if (loading || !review || !user) return <div>로딩 중...</div>;

  return (
    <AppLayout>
      <GridItem colSpan={12}>
        {review.images.length > 0 && (
          <Header backgroundUrl={review.images[0]}>
            <Heading zIndex={"1"} fontSize="3rem">
              {review.title}
            </Heading>
            <Profile>
              <Avatar.Root size={"sm"}>
                <Avatar.Fallback name={user.nickname} />
                <Avatar.Image src={user.profile_image || undefined} />
              </Avatar.Root>
              <p>{user.nickname}</p>
            </Profile>
            <Rating>
              {getStarsIcons(review.rating)}
              <span style={{ color: "white" }}>{review.rating}</span>
            </Rating>
          </Header>
        )}
        <Wrapper>
          {review.images.length > 0 && (
            <Gallery>
              {review.images.map((image) => (
                <Image key={image} src={image} alt="리뷰 이미지" />
              ))}
            </Gallery>
          )}
          <Text
            whiteSpace="pre-line"
            p="1rem 2rem"
            fontSize="1.2rem"
            lineHeight="3rem"
          >
            {review.content}
          </Text>
          <IconBox>
            <span>
              <FaHeart /> {likeCount}
              {/* <FaRegHeart />
               */}
            </span>
          </IconBox>
          <Separator mt="3rem" mb="3rem" size={"lg"} />
          <input type="text" placeholder="댓글을 입력하세요" />
          <CommentList comments={comments} />
        </Wrapper>
      </GridItem>
    </AppLayout>
  );
};

export default ReviewDetailPage;
