import { useNavigate, useParams } from "react-router-dom";
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
  CommentSubmitBtn,
} from "./ReviewDetailPage.style.ts";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Rating } from "../../../../components/Card.style";
import { getStarsIcons } from "../../../../components/Card";
import { useReviewDetailPresenter } from "../presenter/presenter.tsx";
import { useAccessToken } from '@/context/AccessTokenContext.tsx';
import { createApiWithToken, CustomAxiosRequestConfig } from '@/api/axiosInstance.ts';
import { useState } from 'react';

const ReviewDetailPage = () => {
  const [commentContent, setCommentContent] = useState("");
  const handleCommentSubmit = async () => {
    try {
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      if (!commentContent.trim()) {
        alert("댓글을 입력해주세요.");
        return;
      }

      const res = await api.post(
        "/comments",
        {
          target_id: review.review_id,
          target_type: "SCHEDULE_REVIEW",
          content: commentContent,
        },
        {
          requiresAuth: true,
        } as CustomAxiosRequestConfig
      );
      const newComment = res.data;
      setComments([
        ...comments,
        {
          ...newComment,
          user_nickname: user?.nickname ?? "알 수 없음",
          user_avatar: user?.profile_image ?? "",
        },
      ]);
      setCommentContent("")
      console.log("댓글 작성 성공:", res.data);
      alert("댓글이 등록되었습니다!");

      // 새 댓글 UI에 반영하려면 페이지 새로고침 or 상태 갱신 필요
      window.location.reload(); // 임시로 전체 새로고침 (또는 presenter 리팩토링해도 됨)
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };
const {accessToken, setAccessToken} = useAccessToken();
const api = createApiWithToken(accessToken,setAccessToken)
const navigate = useNavigate()
const [liked, setLiked] = useState(false)
  const { id } = useParams();
  const { review, user, comments,setComments, likeCount, loading } =useReviewDetailPresenter(id);
  const handleLikeClick = async ()=>{
    try{
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
if (!liked){
  
      //좋아요 등록
      const res = await api.post("/likes", {
        "target_id": review.review_id,
        "target_type": "SCHEDULE_REVIEW"
      }, {
        requiresAuth:true,
      } as CustomAxiosRequestConfig )
    console.log("좋아요 성공", res.data)
setLiked(true)
}
    
}catch(err){
  console.error("좋아요 처리 중 오류", err)

}}

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
              <span onClick={handleLikeClick} style={{ cursor: "pointer" }}>
                {liked ? <FaHeart color="red" /> : <FaRegHeart />}
              </span>
              {likeCount}
            </span>
          </IconBox>
          <Separator mt="3rem" mb="3rem" size={"lg"} />
          <input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            type="text"
            placeholder="댓글을 입력하세요"
          />
          <CommentSubmitBtn
            onClick={handleCommentSubmit}
          >
            댓글 등록
          </CommentSubmitBtn>
          {/* 디자인하기 댓글인풋🔴...! */}
          <CommentList comments={comments} />
        </Wrapper>
      </GridItem>
    </AppLayout>
  );
};

export default ReviewDetailPage;
