import { getStarsIcons } from "@/components/common/Rating/Rating";
import { Wrapper, Title, Stars, Ratingnum, Adress } from "./Header.styles";
import { Rating } from "@/components/common/card/Card.style";
// import { HStack, Tag } from "@chakra-ui/react";
import { IoLocationOutline } from "react-icons/io5";

interface Props {
  name: string;
  address: string;
  subtitle: string;
  // taglist: string[];
}

const Header = ({ name, address, subtitle }: Props) => {
  return (
    <Wrapper>
      <Title>{name}</Title>
      <Adress>
        {" "}
        <IoLocationOutline />
        {address}
      </Adress>
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

      {/* <Stars>
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
      </Stars> */}
    </Wrapper>
  );
};

export default Header;
