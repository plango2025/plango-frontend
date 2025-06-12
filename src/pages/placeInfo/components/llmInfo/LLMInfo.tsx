import { Box, Flex, Separator } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Answer,
  CheckList,
  ListItem,
  Question,
  SubLabel,
} from "./LLMInfo.style";
import { IoCheckmark } from "react-icons/io5";
interface LLMChecklistItem {
  question: string;
  answer: string;
}

interface LLMResultData {
  one_line_summary: string;
  summary: string;
  keywords: string[];
  style: string;
  checklist: LLMChecklistItem[];
}
interface LLMInfoProps {
  llmresult: LLMResultData;
}
const LLMInfo = ({ llmresult }: LLMInfoProps) => {
  const { one_line_summary, summary, keywords, style, checklist } = llmresult;
  console.log(one_line_summary, summary, keywords, style, checklist);

  return (
    <Box p={"3rem"} bg={"#FFFFFF"} mb={6} borderRadius="md">
      <Text fontSize="1.5rem" fontWeight="bold" mb={3}>
        🤗 {llmresult.one_line_summary}
      </Text>
      <Text pb={"4rem"} fontSize={"1.3rem"} lineHeight={3}>
        {llmresult.summary}
      </Text>

      <CheckList>
        <h1>체크리스트</h1>
        <SubLabel>
          꼼꼼하게 준비해볼까요? 체크리스트를 보고 확인해보세요{" "}
        </SubLabel>
        {llmresult.checklist.map((item) => {
          return (
            <>
              <Separator margin={"1rem"}></Separator>

              <ListItem>
                <IoCheckmark size={32}></IoCheckmark>
                <Separator
                  orientation="vertical"
                  height="auto"
                  mx={4}
                  borderColor="gray.300"
                />

                <Flex
                  gap={"0.5rem"}
                  direction={"column"}
                  justify={"center"}
                  pl="1.3rem"
                >
                  <Question>{item.question}</Question>
                  <Answer>{item.answer}</Answer>
                </Flex>
              </ListItem>
            </>
          );
        })}
      </CheckList>
    </Box>
  );
};

export default LLMInfo;
