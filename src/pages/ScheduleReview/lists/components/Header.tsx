import { Input, InputGroup } from "@chakra-ui/react";
import { Title, Wrapper } from "./Header.style";
import { LuSearch } from "react-icons/lu";
const Header = ({ keyword, setKeyword, onSearch }) => {
  return (
    <Wrapper>
      <Title>🌍 다른 사람들은 어떤 여행을 했을까요?</Title>
      <div>사람들이 남긴 리뷰 속에서 당신의 여행을 찾아보세요.</div>
      <InputGroup w="50%" pt="3rem" mx="auto" startElement={<LuSearch />}>
        <Input
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          size="lg"
          placeholder="장소를 입력하세요"
        />
      </InputGroup>
    </Wrapper>
  );
};

export default Header;
