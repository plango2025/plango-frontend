import { users } from "@/mocks/users";
import {
  Wrapper,
  Image,
  Name,
  Rating,
  ButtonBox,
  Button,
  Profile,
} from "./Card.style";
import {
  FaStarHalfAlt,
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegBookmark,
  FaRegCommentDots,
} from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const getStarsIcons = (rating: number) => {
  const stars = [];
  const rounded = Math.floor(rating * 2) / 2;
  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) stars.push(<FaStar key={i} />);
    else if (i - 0.5 === rounded) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return stars;
};
const Card = ({ review }) => {
  const navigate = useNavigate();
  // review 타입 정의
  const {
    userId,
    scheduleReview,
    rating,
    likes,
    bookmarks,
    comments,
    imageUrl,
  } = review;

  const user = users.find((user) => user.id === userId);

  return (
    <Wrapper
      onClick={() => {
        navigate(`/schdReviews/${review.id}`);
      }}
    >
      <div style={{ cursor: "pointer" }}>
        <Profile>
          <Avatar.Root size={"xs"}>
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.avatar} />
          </Avatar.Root>
          <span>{user.name}</span>
          <img src="" alt="" />
        </Profile>
        <Image src={imageUrl} alt={scheduleReview} />
        <Name>{scheduleReview}</Name>
      </div>
      <Rating>
        {getStarsIcons(rating)}
        <span>{rating}</span>
      </Rating>
      <ButtonBox>
        <Button>
          <FaHeart />
          <span>{likes}</span>
        </Button>
        <Button>
          <FaRegBookmark />
          <span>{bookmarks}</span>
        </Button>
        <Button>
          <FaRegCommentDots />
          <span>{comments}</span>
        </Button>
      </ButtonBox>
    </Wrapper>
  );
};

export default Card;
