import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { scheduleSidebarModel } from "./SavedSchedulePageModel";
import { useAccessToken } from "@/context/AccessTokenContext";
import { FaRegBookmark, FaBookmark, FaArrowCircleUp } from "react-icons/fa";
import pin from "@/assets/images/icons/scheduleCreation/pin (1).png";
import emptypin from "@/assets/images/icons/scheduleCreation/empty_pin.png";
import {
  createApiWithToken,
  CustomAxiosRequestConfig,
} from "@/api/axiosInstance";
import { CheckSavedSchedule } from "./SavedSchedulePagePresenter";
import styles from "./SavedSchedulePage.module.scss";
import { ScheduleResponse } from "./SavedSchedulePageModel";

// StepItem 인터페이스
export interface StepItem {
  id: string;
  name: string;
  title: string;
  dayname: string;
  description: string;
  imageAlt: string;
  imageUrl: string;
}

const ScheduleSidebar: React.FC = () => {
  const [scheduleParams, setScheduleParams] = useState<
    ScheduleResponse["parameters"] | null
  >(null);

  const { schedule_id } = useParams<{ schedule_id: string }>();
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);

  const [isLoading, setIsLoading] = useState(false);
  const [stepItems, setStepItems] = useState<StepItem[]>([]);
  const [Bookmarked, setBookmarked] = useState(false);
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  const [pinnedPlaces, setPinnedPlaces] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");

  /** ✅ 페이지 시작 시 서버에서 일정 불러오기 */
  useEffect(() => {
    if (!schedule_id) return;

    const fetchSchedule = async () => {
      setIsLoading(true);
      try {
        // ✅ api 인스턴스를 사용하도록 수정
        const response = await api.get(`/schedules/${schedule_id}`);
        setScheduleId(response.data.schedule_id);
        setScheduleTitle(response.data.schedule.title);
        setStepItems(scheduleSidebarModel(response.data));
        setScheduleParams(response.data.parameters); // ✅ 파라미터 저장
        console.log("response", response.data);
      } catch (err) {
        console.error("일정 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [schedule_id, accessToken]);

  /** 북마크 */
  const handleBookmarkClick = async () => {
    if (!scheduleId) return;
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

  /** 핀 저장 */
  const handlePinClick = async (placeName: string) => {
    if (!scheduleId) return;
    if (pinnedPlaces.includes(placeName)) {
      alert("이미 저장된 핀입니다.");
      return;
    }
    try {
      const url = `/schedules/${scheduleId}/places/pin`;
      const body = { places: [...pinnedPlaces, placeName] };
      await api.patch(url, body, {
        requiresAuth: true,
      } as CustomAxiosRequestConfig);
      setPinnedPlaces((prev) => [...prev, placeName]);
      alert(`"${placeName}"가 저장되었습니다.`);
    } catch (error) {
      console.error("핀 저장 오류", error);
      alert("핀 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
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
            여행 일정 불러오는 중입니다...
          </Text>
        </Stack>
      )}
      <div className={styles.mainbody}>
        <div className={styles.layout}>
          <div className={styles.toplayout}>
            <div className={styles.title}></div>
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
                <span>{scheduleTitle}</span>
              </button>
            </Text>
            <div className={styles.indicatorTitleLine2} />
            <Text>일정 파라미터</Text>
            <div>
              <p>
                필수코스: {scheduleParams?.required_places?.join(", ") || "-"}
              </p>
              <p>여행지: {scheduleParams?.destination || "-"}</p>
              <p>여행 기간: {scheduleParams?.duration || "-"}일</p>
              <p>동행자: {scheduleParams?.companion || "-"}</p>
              <p>여행 스타일: {scheduleParams?.style || "-"}</p>
              <p>일정 개수: {scheduleParams?.schedule_count || "-"}개</p>
              <p>예산: {scheduleParams?.budget || "-"}원</p>
              <p>기타 사항: {scheduleParams?.extra || "없음"}</p>
            </div>
          </div>

          <div className={styles.indicatorTitleLine}></div>
          <Flex className={styles.flexContent}>
            <Box>
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
                      <Steps.Indicator className={styles.indicor} />
                      <Steps.Separator />
                    </Steps.Item>
                  ))}
                </Steps.List>
              </Steps.Root>
            </Box>

            <Box>
              <Stack gap="0" marginTop="25px" marginLeft="10px">
                {stepItems.map((step, index) => (
                  <Box
                    key={index}
                    minHeight="150px"
                    maxHeight="150px"
                    cursor="pointer"
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
        </div>
      </div>
    </>
  );
};

export default ScheduleSidebar;
