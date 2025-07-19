import { Wrapper, Image, Name, ButtonBox, Button, Profile } from "./Card.style";
import { FaHeart, FaRegBookmark, FaRegCommentDots } from "react-icons/fa";
import { Avatar, RatingGroup, Separator } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import { ReviewSummary } from "@/types/review/review";
import { Rating } from '@/components/Card.style';

const fetchLocalImg = async (api, thumbnail_url) => {
  const res = api.get(`/files/${thumbnail_url}`);
  return res.data;
};
const Card = ({ review }: { review: ReviewSummary }) => {
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  console.dir(review);
  fetchLocalImg(api, review.thumbnail_url);
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
  } = review;

  return (
    <Wrapper onClick={() => navigate(`/schdReviews/${id}`)}>
      <div style={{ cursor: "pointer" }}>
        <Profile>
          <Avatar.Root size="sm">
            <Avatar.Fallback name={author.nickname} />
            <Avatar.Image src={author.profile_image} />
          </Avatar.Root>

          <span>{author.nickname}</span>
        </Profile>

        {thumbnail_url && <Image src={encodeURI(thumbnail_url)} alt={title} />}

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
        <Button>
          <FaHeart />
          <span>{like_count}</span>
        </Button>
        <Button>
          <FaRegBookmark />
          <span>{comment_count}</span>
        </Button>
        <Button>
          <FaRegCommentDots />
          <span>{scrap_count}</span>
        </Button>
      </ButtonBox>
    </Wrapper>
  );
};

export default Card;
