import { Box, Input, InputGroup} from "@chakra-ui/react";
import { Title, Wrapper } from "./Header.style";
import { LuSearch } from "react-icons/lu";
import { PaddingMd } from '@/components/common/padding/padding';
const Header = ({ keyword, setKeyword, onSearch }) => {
  return (
    <Wrapper>
      <Title>🌍 다른 사람들은 어떤 여행을 했을까요?</Title>
      <div>사람들이 남긴 리뷰 속에서 당신의 여행을 찾아보세요.</div>
      <PaddingMd />
      <InputGroup
        w="50%"
        flex="1"
        startElement={
          <Box ml="4" mr="2">
            <LuSearch />
          </Box>
        }
      >
        <Input
          borderRadius="30px"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          size="lg"
          placeholder="장소를 입력하세요"
          css={{ "--focus-color": "#B1E1E8" }} // 👈 이거 추가!
          transition="all 0.2s ease-in-out" // ✅ 부드러운 애니메이션
          _focus={{
            transform: "scale(1.02)", // ✅ 살짝 확대
            boxShadow: "none", // ✅ 기본 아웃라인 제거
          }}
        />
      </InputGroup>
    </Wrapper>
  );
};

export default Header;
