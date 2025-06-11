import {
  Button,
  ButtonGroup,
  Stack,
  Steps,
  Box,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react"; // React 임포트 추가
import styles from "./scheduleSidebar.module.scss";

// StepItem 인터페이스 정의
export interface StepItem {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

// 컴포넌트 props에 대한 인터페이스 정의
interface ScheduleSidebarProps {
  stepsData?: StepItem[]; // StepItem 배열을 받거나 undefined일 수 있음
}

const scheduleSidebar: React.FC<ScheduleSidebarProps> = ({ stepsData }) => {
  // stepsData가 제공되지 않으면 기본값을 사용
  const actualSteps: StepItem[] = stepsData || steps;

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.title}>강릉 - 당일치기</div>
        <Flex className={styles.flexContent}>
          {/* 왼쪽 열: 스텝 목록 */}
          <Box flex="1">
            {" "}
            {/* Flex 비율 조정 */}
            <Steps.Root
              orientation="vertical"
              defaultStep={0}
              count={actualSteps.length}
            >
              <Steps.List gap="3">
                {actualSteps.map((step, index) => (
                  <Steps.Item
                    key={index}
                    index={index}
                    title={step.title}
                    minHeight="150px"
                  >
                    <Steps.Indicator />
                    <Steps.Title>{step.title}</Steps.Title>
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
            </Steps.Root>
          </Box>

          {/* 오른쪽 열: 모든 스텝 내용 컨테이너 */}
          <Box flex="2">
            {" "}
            {/* Flex 비율 및 왼쪽 여백 조정 */}
            <Stack gap="3">
              {" "}
              {/* 내용 박스 사이의 간격 추가 */}
              {actualSteps.map((step, index) => (
                <Box
                  minHeight="150px"
                  key={index}
                  p="4"
                  borderWidth="1px"
                  borderRadius="lg"
                  shadow="md"
                >
                  <Flex align="center">
                    <Image
                      src={step.imageUrl} // StepItem에서 imageUrl 사용
                      alt={step.imageAlt} // StepItem에서 imageAlt 사용
                      boxSize="100px" // 필요에 따라 크기 조정
                      objectFit="cover"
                      mr="4" // 간격을 위한 오른쪽 여백
                    />
                    <Box>
                      <Text fontWeight="bold" fontSize="lg">
                        {step.title}
                      </Text>
                      <Text>{step.description}</Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>
        </Flex>
        <div className={styles.textBoxLayout}>
          <div className={styles.textBox}>
            <Button className={styles.clickButton}>마음속에 저장!</Button>
          </div>
        </div>
      </div>
    </>
  );
};

// 기본 단계 데이터 (StepItem 타입으로 명시)
const steps: StepItem[] = [
  {
    title: "초기 설정",
    description: "여정에 오신 것을 환영합니다! 첫 번째 구성을 시작해 봅시다.",
    imageUrl: "https://via.placeholder.com/100/FF5733/FFFFFF?text=Step1",
    imageAlt: "설정 일러스트",
  },
  {
    title: "데이터 입력",
    description: "이제 프로젝트에 필요한 정보를 제공해 주세요.",
    imageUrl: "https://via.placeholder.com/100/33FF57/FFFFFF?text=Step2",
    imageAlt: "데이터 입력 일러스트",
  },
  {
    title: "검토 및 확인",
    description: "최종 확정 전에 모든 세부 사항을 검토해 보세요.",
    imageUrl: "https://via.placeholder.com/100/3357FF/FFFFFF?text=Step3",
    imageAlt: "검토 일러스트",
  },
  {
    title: "완료",
    description: "축하합니다! 모든 단계가 완료되었으며, 프로세스가 끝났습니다.",
    imageUrl: "https://via.placeholder.com/100/FFFF33/000000?text=Step4",
    imageAlt: "완료 일러스트",
  },
  {
    title: "완료",
    description: "축하합니다! 모든 단계가 완료되었으며, 프로세스가 끝났습니다.",
    imageUrl: "https://via.placeholder.com/100/FFFF33/000000?text=Step4",
    imageAlt: "완료 일러스트",
  },
];

export default scheduleSidebar;
