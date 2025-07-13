import { Wrapper, Title, Stars, Ratingnum } from "./Header.styles";
import { getStarsIcons } from "@/components/Card";
import { Rating } from "@/components/Card.style";
// import { HStack, Tag } from "@chakra-ui/react";

interface Props {
  name: string;
  rating: number;
  subtitle: string;
  // taglist: string[];
}

const Header = ({ name, rating, subtitle}: Props) => {
  return (
    <Wrapper>
      <Title>
        {name}
        <span>{subtitle}</span>
      </Title>
      {/* <HStack>
        {taglist.map((item) => {
          return (
            <Tag.Root
              size={"lg"}
              bg={"white"}
              border={"1px solid #15BDB1 "}
              borderRadius={"10px"}
              padding={"0.2rem 0.5rem"}
              fontSize={"14px"}
            >
              <Tag.Label fontSize={"1rem"}>{item}</Tag.Label>
            </Tag.Root>
          );
        })}
      </HStack> */}
      
      <Stars>
        <Rating
          style={{
            fontSize: "1.4rem",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          {getStarsIcons(rating)}
        </Rating>
        <Ratingnum>{rating}</Ratingnum>
      </Stars>
    </Wrapper>
  );
};

export default Header;
