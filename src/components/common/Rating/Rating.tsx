import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import styled from "styled-components";
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
const Rating = styled.div`
  padding-left: 0.5rem;
  z-index: 1;
  padding-top: 0.5rem;
  display: flex;
  font-size: 1.1rem;
  color: rgba(255, 200, 0, 1);
  span {
    color: #333333;
    padding-left: 1rem;
  }
`;
const StarRating = ({ rating }) => {
  return (
    <Rating>
      {getStarsIcons(rating)}
      <span>{rating.toFixed(1)}</span>
    </Rating>
  );
};

export default StarRating;
