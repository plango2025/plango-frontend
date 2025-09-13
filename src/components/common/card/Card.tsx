// Card.tsx
import  { forwardRef, useEffect, useState } from "react";
import { Wrapper, Image, Name, ButtonBox, Button, Profile } from "./Card.style";
import {
  FaHeart,
  FaRegHeart,
  FaRegBookmark,
  FaRegCommentDots,
  FaBookmark,
} from "react-icons/fa";
import { Avatar, RatingGroup, Separator } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import {
  createApiWithToken,
  CustomAxiosRequestConfig,
} from "@/api/axiosInstance";
import { Review } from "@/types/review/review";
import { Rating } from "@/components/common/card/Card.style";
import { useToggleLikeScrap } from "@/hooks/useToggleLikeScrap";

const Card = forwardRef<HTMLDivElement, { review: Review }>(
  ({ review }, ref) => {
    const { accessToken, setAccessToken } = useAccessToken();
    const api = createApiWithToken(() => accessToken, setAccessToken);
    const navigate = useNavigate();

    const { id, title, rating, author, thumbnail_url, comment_count } = review;
    const [localImg, setLocalImg] = useState<string | null>(null);
    const {
      liked,
      likeCount,
      bookmarked,
      bookmarkCount,
      toggleLike,
      toggleBookmark,
    } = useToggleLikeScrap("REVIEW", id, {
      initialLiked: review.is_liked,
      initialBookmarked: review.is_scrapped,
      initialLikeCount: review.like_count,
      initialBookmarkCount: review.scrap_count,
    });

    // 썸네일 처리
    useEffect(() => {
      if (!thumbnail_url) return;
      const isRemote = /^https?:\/\//i.test(thumbnail_url);
      if (isRemote) {
        setLocalImg(thumbnail_url);
        return;
      }

      const fileName = thumbnail_url.split("/").pop() ?? "";
      if (!fileName) return;

      let objectUrl: string | null = null;

      (async () => {
        try {
          const res = await api.get(`/files/${encodeURIComponent(fileName)}`, {
            responseType: "blob",
          } as CustomAxiosRequestConfig);
          objectUrl = URL.createObjectURL(res.data);
          setLocalImg(objectUrl);
        } catch (err) {
          console.error("이미지 불러오기 실패", err);
        }
      })();

      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }, [api, thumbnail_url]);

    return (
      <Wrapper ref={ref} onClick={() => navigate(`/reviews/${id}`)}>
        <div style={{ cursor: "pointer" }}>
          <Profile>
            <Avatar.Root size="sm">
              <Avatar.Fallback name={author.nickname} />
              <Avatar.Image src={author.profile_image} />
            </Avatar.Root>
            <span>{author.nickname}</span>
          </Profile>

          {localImg && <Image src={localImg} alt={title} />}
          <Name>{title}</Name>
        </div>

        <Rating>
          <RatingGroup.Root value={rating} count={5} readOnly>
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root>
        </Rating>

        <Separator mt="0.2rem" mb="0.2rem" size="sm" mr="0.7rem" ml="0.7rem" />

        <ButtonBox>
          <Button onClick={toggleLike}>
            {liked ? (
              <FaHeart color="red" size={20} />
            ) : (
              <FaRegHeart size={20} />
            )}
            <span>{likeCount}</span>
          </Button>

          <Button onClick={toggleBookmark}>
            {bookmarked ? (
              <FaBookmark size={20} color="#F9DE51" />
            ) : (
              <FaRegBookmark size={20} />
            )}{" "}
            <span>{bookmarkCount}</span>
          </Button>

          <Button>
            <FaRegCommentDots size={20} />
            <span>{comment_count}</span>
          </Button>
        </ButtonBox>
      </Wrapper>
    );
  }
);

export default Card;
