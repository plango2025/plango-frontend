import { useState } from "react";
import {
  Button,
  Stack,
  Box,
  Image,
  Text,
  Flex,
  Steps,
  Spinner,
} from "@chakra-ui/react";
import styles from "./scheduleSidebar.module.scss";
import { scheduleSidebarModel } from "./scheduleSidebarModel";
import { useLocation } from "react-router-dom";
import { useMapContext } from "@/components/common/kakaomap/MapContext";
import { FaRegBookmark, FaBookmark, FaArrowCircleUp } from "react-icons/fa";
import pin from "@/assets/images/icons/scheduleCreation/pin (1).png";
import emptypin from "@/assets/images/icons/scheduleCreation/empty_pin.png";
import {
  createApiWithToken,
  CustomAxiosRequestConfig,
} from "@/api/axiosInstance";

// StepItem 인터페이스
export interface StepItem {
  id: string;
  name: string;
  title: string;
  dayname: string;
  description: string;
  imageAlt: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}


const ScheduleSidebar= () => {
  const location = useLocation();
  const { scheduleResponse } = location.state || {};
  const { centerMapToLocation, showPlaceOverlay } = useMapContext();
  const [feedback, setFeedback] = useState("");
  const api = createApiWithToken(
    () => localStorage.getItem("accessToken"),
    () => {}
  );

  // isLoading 상태 추가
  const [isLoading, setIsLoading] = useState(false);

  const [stepItems, setStepItems] = useState<StepItem[]>(() =>
    scheduleSidebarModel(scheduleResponse)
  );
  const [Bookmarked, setBookmarked] = useState(false);
  const scheduleId = scheduleResponse.schedule_id;
  const [pinnedPlaces, setPinnedPlaces] = useState<string[]>([]);

  const handleBookmarkClick = async () => {
    try {
      await api.patch(`/schedules/${scheduleId}/keep`, {}, {
        requiresAuth: true,
      } as CustomAxiosRequestConfig);
      setBookmarked(true);
      alert("일정이 보관되었습니다.");
    } catch (error) {
      console.error("보관 실패:", error);
      alert("보관 중 오류가 발생했습니다.");
    }
  };

  const handlePinClick = async (placeName: string) => {
    if (pinnedPlaces.includes(placeName)) {
      alert("이미 저장된 핀입니다.");
      return;
    }

    const pinPlaces = async (scheduleId: string, places: string[]) => {
      const url = `/schedules/${scheduleId}/places/pin`;
      const body = { places };
      try {
        const response = await api.patch(url, body, {
          requiresAuth: true,
        } as CustomAxiosRequestConfig);
        return response.data;
      } catch (error) {
        console.error("핀 저장 오류", error);
        throw error;
      }
    };

    try {
      const updatedPlaces = [...pinnedPlaces, placeName];
      await pinPlaces(scheduleId, updatedPlaces);
      setPinnedPlaces(updatedPlaces);
      alert(`"${placeName}"가 저장되었습니다.`);
    } catch {
      alert("핀 저장 중 오류가 발생했습니다.");
    }
  };

  const handleFeedbackClick = async () => {
    if (!scheduleId) return alert("스케줄 ID가 없습니다.");
    if (!feedback.trim()) return alert("피드백을 입력해주세요.");

    // 로딩 시작
    setIsLoading(true);

    const sendScheduleFeedback = async (
      scheduleId: string,
      feedback: string
    ) => {
      try {
        const response = await api.patch(`/schedules/${scheduleId}/feedback`, {
          feedback,
        });
        return response.data;
      } catch (error) {
        console.error("피드백 전송 실패:", error);
        throw error;
      }
    };

    try {
      const result = await sendScheduleFeedback(scheduleId, feedback);
      alert("피드백이 저장되었습니다!");
      setFeedback("");

      const newItems = scheduleSidebarModel(result);
      setStepItems(newItems);
    } catch (error) {
      alert("피드백 저장 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      // 로딩 종료
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 로딩 스피너 오버레이 */}
      {isLoading && (
        <Stack
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bg="rgba(0,0,0,0.3)"
          align="center"
          justify="center"
          zIndex={9999}
        >
          <Spinner size="xl" color="blue.500" />
          <Text mt={4} color="white" fontSize="lg" fontWeight="semibold">
            여행 일정 재생성 중입니다...
          </Text>
        </Stack>
      )}

      <div className={styles.layout}>
        {/* 타이틀 */}
        <div className={styles.title}>
          <Text fontSize="2xl" fontWeight="bold">
            <button
              onClick={handleBookmarkClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {Bookmarked ? (
                <FaBookmark size={24} color="#F9DE51" />
              ) : (
                <FaRegBookmark size={24} color="gray" />
              )}
              <span>{scheduleResponse.schedule.title}</span>
            </button>{" "}
          </Text>
        </div>

        {/* 인디케이터 */}
        <div className={styles.indicatorTitleLine}></div>

        {/* 메인 콘텐츠 */}
        <Flex className={styles.flexContent}>
          {/* 왼쪽: 스텝 리스트 */}
          <Box>
            <Steps.Root
              orientation="vertical"
              defaultStep={0}
              count={stepItems.length}
            >
              <Steps.List justifyContent="flex-start">
                {stepItems.map((_, index) => (
                  <Steps.Item
                    key={index}
                    index={index}
                    minHeight="150px"
                    maxHeight="150px"
                    padding="0"
                    marginLeft="15px"
                    flex="initial" // 이 줄을 추가하세요!
                  >
                    <Steps.Indicator className={styles.indicator} />
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
            </Steps.Root>
          </Box>

          {/* 오른쪽: Step 내용 박스 */}
          <Box>
            <Stack gap="0" marginTop="25px" marginLeft="10px">
              {stepItems.map((step, index) => (
                <Box
                  key={index}
                  minHeight="150px"
                  maxHeight="150px"
                  cursor="pointer"
                  onClick={() => {
                    centerMapToLocation(step.latitude, step.longitude);
                    showPlaceOverlay(step);
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
                          <Button
                            aria-label="핀 저장"
                            size="sm"
                            variant="ghost"
                            onClick={() => handlePinClick(step.name)}
                            padding="0"
                            minW="auto"
                          >
                            <Image
                              src={
                                pinnedPlaces.includes(step.name)
                                  ? pin
                                  : emptypin
                              }
                              alt="핀 아이콘"
                              boxSize="25px"
                            />
                          </Button>

                          <Text className={styles.stepDayname}>
                            {step.dayname}
                          </Text>
                        </Flex>
                        <Text
                          maxHeight="90px"
                          overflow="hidden"
                          overflowY="auto"
                        >
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
              placeholder="수정하고 싶은 내용을 입력해주세요."
              className={styles.textarea}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button
              className={styles.clickButton}
              onClick={handleFeedbackClick}
            >
              <FaArrowCircleUp />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleSidebar;
