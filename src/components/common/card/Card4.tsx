import  { useEffect, useState } from "react";
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
import { MyLoveReview } from "@/pages/myPage/tapPages/TapPagesmodel";
import { Rating } from "@/components/common/card/Card.style";

interface Props {
  card: MyLoveReview; // ✅ props 이름을 card로 명확히
}

const CardComponent4 = ({ card }: Props) => {
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const navigate = useNavigate();

  const {
    id,
    title,
    rating,
    author,
    thumbnail_url,
    like_count,
    comment_count,
    scrap_count,
    is_liked,
    is_scrapped,
  } = card;

  const [liked, setLiked] = useState<boolean>(is_liked);
  const [bookmarked, setBookmarked] = useState<boolean>(is_scrapped);
  const [likeCount, setLikeCount] = useState<number>(like_count ?? 0);
  const [bookmarkCount, setBookmarkCount] = useState<number>(scrap_count ?? 0);
  const [localImg, setLocalImg] = useState<string | null>(null);

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

  // 좋아요
  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = liked
        ? await api.delete("/like", {
            params: { type: "REVIEW", ref_id: id },
          })
        : await api.post("/like", null, {
            params: { type: "REVIEW", ref_id: id },
          });

      const newLiked = res.data.liked as boolean;
      setLiked(newLiked);
      setLikeCount((prev) => (newLiked ? prev + 1 : Math.max(prev - 1, 0)));
    } catch (err) {
      console.error("좋아요 처리 실패", err);
    }
  };

  // 북마크
  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = bookmarked
        ? await api.delete("/scrap", {
            params: { type: "REVIEW", ref_id: id },
          })
        : await api.post("/scrap", null, {
            params: { type: "REVIEW", ref_id: id },
          });

      const newBookmarked = (res.data.scrapped ??
        res.data.bookmarked) as boolean;
      setBookmarked(newBookmarked);
      setBookmarkCount((prev) =>
        newBookmarked ? prev + 1 : Math.max(prev - 1, 0)
      );
    } catch (err) {
      console.error("북마크 처리 실패", err);
    }
  };

  return (
    <Wrapper onClick={() => navigate(`/reviews/${id}`)}>
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
        <Button onClick={handleLikeClick}>
          {liked ? <FaHeart color="red" /> : <FaRegHeart />}
          <span>{likeCount}</span>
        </Button>

        <Button onClick={handleBookmarkClick}>
          {bookmarked ? (
            <FaBookmark size={20} color="#F9DE51" />
          ) : (
            <FaRegBookmark size={20} color="gray" />
          )}{" "}
          <span>{bookmarkCount}</span>
        </Button>

        <Button>
          <FaRegCommentDots />
          <span>{comment_count}</span>
        </Button>
      </ButtonBox>
    </Wrapper>
  );
};

export default CardComponent4;
