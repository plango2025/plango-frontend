// 일정 리뷰 상세 페이지지
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentList from "./components/CommentList";
import AppLayout from "@/layout/AppLayout";
import {
  Avatar,
  GridItem,
  Heading,
  Separator,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { Wrapper } from "./ReviewDetailPage.style";
import { Image } from "@chakra-ui/react";
export const mockbaseUrl =
  "https://7e452e4c-a625-48c5-b9a5-8909c25cbaef.mock.pstmn.io";
import { FaHeart, FaRegBookmark, FaRegCommentDots } from "react-icons/fa";
import { Profile, Rating } from "../../../components/Card.style";
import { getStarsIcons } from "../../../components/Card";
//일정 리뷰 상세 정보
interface Review {
  id: number;
  userId: string;
  scheduleReview: string;
  content: string;
  rating: number;
  likes: number;
  bookmarks: number;
  comments: number;
  imageUrl: string;
  commentList: Comment[];
}
//일정 리뷰에 대한 댓글
interface Comment {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  content: string;
}

const ReviewDetailPage = () => {
  const { id } = useParams();
  const [review, setReview] = useState<Review | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );

  useEffect(() => {
    // 리뷰 본문 불러오기
    fetch(`${mockbaseUrl}/api/reviews/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("리뷰 데이터를 불러오는 데 실패했습니다.");
        }
        return res.json();
      })
      .then((data) => {
        setReview(data);
        console.log(data);
        //리뷰 작성자 정보 가져오기
        fetch(`${mockbaseUrl}/api/users/${data.userId}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("사용자 데이터를 불러오는 데 실패했습니다.");
            }
            return res.json();
          })
          .then((userData) => setUser(userData))
          .catch((err) => console.error(err)); // 사용자 정보 에러 처리
      })
      .catch((err) => console.error(err)); // 리뷰 데이터 에러 처리

    // 댓글 목록 불러오기
    fetch(`${mockbaseUrl}/api/reviews/${id}/comments`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("댓글 데이터를 불러오는 데 실패했습니다.");
        }
        return res.json();
      })
      .then((data) => setComments(data))
      .catch((err) => console.error(err)); // 댓글 데이터 에러 처리
  }, [id]);

  if (!review || !user) return <div>로딩 중...</div>;

  return (
    <AppLayout>
      <GridItem colSpan={12}>
        <Wrapper>
          <Heading size="3xl">{review.scheduleReview}</Heading>
          <Profile>
            <Avatar.Root size={"xs"}>
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={user.avatar} />
            </Avatar.Root>
            <span>{user.name}</span>
            <img src="" alt="" />
          </Profile>
          <Rating>
            {getStarsIcons(review.rating)}
            <span>{review.rating}</span>
          </Rating>
          <Image width="70%" margin="auto" src={review.imageUrl}></Image>
          <Text textStyle="2xl" textAlign="center" lineHeight="3rem">
            {review.content}
          </Text>
          <Wrap>
            <span>
              <FaHeart /> {review.likes}
            </span>
            <span>
              <FaRegBookmark /> {review.bookmarks}
            </span>
            <span>
              <FaRegCommentDots /> {review.comments}
            </span>
            <Separator mt="3rem" mb="3rem" />
          </Wrap>
          <h4>댓글</h4>
          <CommentList comments={comments} />
        </Wrapper>
      </GridItem>
    </AppLayout>
  );
};
export default ReviewDetailPage;
