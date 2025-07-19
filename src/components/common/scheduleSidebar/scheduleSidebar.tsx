import { Button, Stack, Box, Image, Text, Flex, Steps, IconButton } from "@chakra-ui/react";
import styles from "./scheduleSidebar.module.scss";
import { scheduleSidebarModel } from "./scheduleSidebarModel";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useMapContext } from "@/components/common/kakaomap/MapContext";
import { useAccessToken } from "@/context/AccessTokenContext";
import  { sendScheduleFeedback, pinPlaces} from "./scheduleSiderbarPresenter";
import { FaThumbtack } from "react-icons/fa";



// StepItem 인터페이스 정의
export interface StepItem {
  id: string; // Step 고유 ID (필요 시 사용)
  name: string; // Step 이름 (필요 시 사용)
  title: string;
  dayname: string;
  description: string;
  imageAlt: string;
  imageUrl: string;
  latitude: number; // 지도 좌표 추가
  longitude: number;
}

// 컴포넌트 props 정의 (필요 시 외부에서도 재사용 가능)
interface ScheduleSidebarProps {
  stepsData?: StepItem[];
}

const ScheduleSidebar: React.FC<ScheduleSidebarProps> = ({ stepsData }) => {
  const location = useLocation();
  const { scheduleResponse } = location.state || {};
  const { centerMapToLocation, showPlaceOverlay } = useMapContext(); // 지도 중심 이동 함수
  const [feedback, setFeedback] = useState("");
  // accessToken은 실제 로그인/인증에서 받아오는 값으로 대체하세요
  const { accessToken, setAccessToken } = useAccessToken();

  // Step 데이터 준비
  const stepItems = scheduleSidebarModel(scheduleResponse);

  const scheduleId = scheduleResponse.schedule_id; // 스케줄 ID 추출
  const [pinnedPlaces, setPinnedPlaces] = useState<string[]>([]);
  
  const handlePinClick = async (placeName: string) => {
  if (pinnedPlaces.includes(placeName)) {
    alert("이미 저장된 핀입니다.");
    return;
  }

  try {
    // API 호출
    console.log("scheduleId" + scheduleId)
    console.log("accessToken:", accessToken);
    const updatedPlaces = [...pinnedPlaces, placeName];
    await pinPlaces(scheduleId, updatedPlaces, accessToken);

      // 상태 업데이트
      setPinnedPlaces(updatedPlaces);
      alert(`"${placeName}"가 저장되었습니다.`);
    } catch {
      alert("핀 저장 중 오류가 발생했습니다.");
    }
  };
  
const handleFeedbackClick = async () => {
  if (!scheduleId) return alert("스케줄 ID가 없습니다.");
  if (!feedback.trim()) return alert("피드백을 입력해주세요.");

  try {
    console.log("scheduleId:", scheduleId);
    console.log("피드백:", feedback);
    const result = await sendScheduleFeedback(scheduleId, feedback, accessToken);
    alert("피드백이 저장되었습니다!");
    setFeedback("");
    console.log("서버 응답:", result);
  } catch (error) {
    alert("피드백 저장 중 오류가 발생했습니다.");
    console.error(error);
  }
};
  return (
    <div className={styles.layout}>
      {/* 타이틀 */}
      <div className={styles.title}>
        <Text fontSize="2xl" fontWeight="bold">
          {scheduleResponse.schedule.title}
        </Text>
            
      </div>

        {/* 인디케이터 */}
        <div className={styles.indicatorTitleLine}></div>

    
  

      {/* 메인 콘텐츠 */}
      <Flex className={styles.flexContent}>
        {/* 왼쪽: 스텝 리스트 (Steps 인디케이터만) */}
        <Box >
          <Steps.Root
            orientation="vertical"
            defaultStep={0}
            count={stepItems.length}
          >
            <Steps.List>
              {stepItems.map((_, index) => (
                <Steps.Item
                  key={index}
                  index={index}
                  minHeight="150px"
                  maxHeight="150px"
                  marginLeft="15px"
                >
                  <Steps.Indicator className={styles.indicor}/>
                  <Steps.Separator />
                </Steps.Item>
              ))}
            </Steps.List>
          </Steps.Root>
        </Box>

        {/* 오른쪽: Step 내용 박스 */}
        <Box>
          <Stack gap = "0"
          marginTop="25px"
          marginLeft="10px">
            {stepItems.map((step, index) => (
              <Box
                
                padding="0px" margin="0"                
                key={index}
                minHeight="150px"
                maxHeight="150px"
              
                
                //borderWidth="1px"
                //borderRadius="lg"
                //shadow="md"
                cursor="pointer"
                onClick={() => {
                  centerMapToLocation(step.latitude, step.longitude);
                  showPlaceOverlay(step); // 🔥 클릭 시 오버레이 표시
                }}
              >
                <Flex>
                  <Box
                    width="100px"
                    height="100px"
                    overflow="hidden"
                    borderRadius="8px"
                  >
                    <Image
                      src={step.imageUrl}
                      alt={step.imageAlt}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>
                  <Box className={styles.discriptionBoxLayout}>
                      <div className={styles.discriptionBox}>
    <Flex alignItems="center" gap="8px">
      <IconButton
  aria-label="핀 저장"
  size="sm"
  onClick={() => handlePinClick(step.name)}
  color={pinnedPlaces.includes(step.name) ? "red.500" : "gray.500"}
>
  <FaThumbtack  />
</IconButton>

      <Text className={styles.stepDayname}>{step.dayname}</Text>
    </Flex>
    <Text maxHeight="90px" overflow="hidden" overflowY="auto">
      {step.description}
    </Text>
  </div>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>

      {/* 하단 버튼 */}
      <div className={styles.textBoxLayout}>
        <div className={styles.textBox}>
          <textarea
            className={styles.textarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button className={styles.clickButton} onClick={handleFeedbackClick}>
            마음속에 저장!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSidebar;
