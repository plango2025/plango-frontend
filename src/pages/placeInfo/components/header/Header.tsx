import { Wrapper, Title, Adress, Rating } from "./Header.styles";
import { IoLocationOutline } from "react-icons/io5";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { Flex, Box, RatingGroup } from "@chakra-ui/react";

interface Props {
  name: string;
  address: string;
  subtitle?: string;
  bookmarked: boolean;
  liked: boolean;
  onLikeClick?: () => void;
  onBookmarkClick?: () => void;
}

const Header = ({
  name,
  address,
  bookmarked,
  liked,
  onLikeClick,
  onBookmarkClick,
  rating,
  like_count,
}: Props) => {
  return (
    <Wrapper>
      {/* 북마크 + 타이틀 수평 정렬 */}
      <Flex align="center" gap="0.5rem">
        <Box
          as="button"
          onClick={onBookmarkClick}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            height: "7px",
          }}
        >
          {bookmarked ? (
            <FaBookmark size={24} color="gold" />
          ) : (
            <FaRegBookmark size={24} />
          )}
        </Box>
        <Title>{name}</Title>
      </Flex>
      <Flex align="center" gap="1rem">
        <Box display="flex" gap="0.5rem">
          <Rating >
            <RatingGroup.Root colorPalette={'yellow'}  value={rating} count={5} readOnly>
              <RatingGroup.HiddenInput />
              <RatingGroup.Control />
            </RatingGroup.Root>
          </Rating>
          <p>{rating}</p>
        </Box>

        <Box
          as="button"
          onClick={onLikeClick}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            height: "7px",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {liked ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}{" "}
        </Box>
      </Flex>

      <Flex align="center" gap="0.5rem" mt="0.5rem" color="gray">
        <IoLocationOutline size={20} />
        <Adress>{address}</Adress>
      </Flex>
    </Wrapper>
  );
};

export default Header;
