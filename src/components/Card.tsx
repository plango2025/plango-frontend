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
import { useEffect, useState } from "react";
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

// 리뷰 타입
interface Review {
  review_id: number;
  user_id: string;
  title: string;
  content: string;
  rating: number;
  images: string[];
  created_at: string;
  updated_at: string;
}

// 사용자 타입
interface User {
  id: string;
  nickname: string;
  profile_image: string;
  address: string;
  birth: string;
  trip_count: number;
}

// 칭호 계산 함수
const getTitleByTripCount = (count: number) => {
  if (count >= 10) return "여행왕";
  if (count >= 5) return "여행러";
  if (count >= 1) return "여행초보";
  return "여행시작 전";
};

const Card = ({ review }: { review: Review }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const { review_id, user_id, title,  rating, images } = review;

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${user_id}`);
        if (!res.ok) throw new Error("유저 정보 불러오기 실패");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("유저 정보 API 오류:", err);
      }
    };

    fetchUser();
  }, [user_id]);

  return (
    <Wrapper onClick={() => navigate(`/schdReviews/${review_id}`)}>
      <div style={{ cursor: "pointer" }}>
        <Profile>
          <Avatar.Root shape="square" size="lg">
            <Avatar.Fallback name ={user?.nickname ?? "익명"}/>
            <Avatar.Image src={user?.profile_image ?? ""} />
          </Avatar.Root>
          
          <span>{user?.nickname ?? "익명 사용자"}</span>
          {user && (
            <span style={{ fontSize: "0.8rem", color: "#999" }}>
              {getTitleByTripCount(user.trip_count)}
            </span>
          )}
        </Profile>

        {images.length > 0 && <Image src={images[0]} alt={title} />}
        <Name>{title}</Name>
      </div>

      <Rating>
        {getStarsIcons(rating)}
        <span>{rating.toFixed(1)}</span>
      </Rating>

      <ButtonBox>
        <Button>
          <FaHeart />
          <span>0</span>
        </Button>
        <Button>
          <FaRegBookmark />
          <span>0</span>
        </Button>
        <Button>
          <FaRegCommentDots />
          <span>0</span>
        </Button>
      </ButtonBox>
    </Wrapper>
  );
};

export default Card;
