import React, { useEffect, useState } from "react"; // useState 추가
import {
  Button,
  ButtonGroup,
  Stack,
  Steps,
  Spinner,
  Text,
} from "@chakra-ui/react";
import stepPageChanger, { getSteps } from "./StepperPresenter";
import { useTravelPlan } from "./StepperPages/StepPageContext";
import styles from "./Stepper.module.scss";
import { sendTravelPlan } from "./StepperPages/StepPagePresenter";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const CommonStepperPresenter = () => {
  const { travelPlan } = useTravelPlan(); // travelPlan을 Context에서 받아옴
  const steps = getSteps();
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  //로딩관련
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    try {
      if (!travelPlan) {
        console.error("여행 계획이 없습니다.");
        return;
      }

      setIsLoading(true); // ✅ 로딩 시작
      // required_places가 배열인지 확인, 아니라면 배열로 변환
      const normalizedTravelPlan = {
        ...travelPlan,
        required_places: Array.isArray(travelPlan.required_places)
          ? travelPlan.required_places
          : typeof travelPlan.required_places === "string"
          ? [{ name: travelPlan.required_places, address: "" }]
          : [],
      };

      console.log("전송 전 normalizedTravelPlan 확인:", normalizedTravelPlan);

      const result = await sendTravelPlan(normalizedTravelPlan);
      console.log("여행 계획 전송 완료:", result);

      // ✅ 서버 응답 후 약간의 delay 후 페이지 이동 (progressive UX)
      setTimeout(() => {
        setIsLoading(false);
        navigate("/scheduleResult", { state: { scheduleResponse: result } });
      }, 1500); // 1.5초 후 페이지 이동
    } catch (error: any) {
      console.error("여행 계획 전송 실패:", error);
      setIsLoading(false);

      let errorMessage = "알 수 없는 오류가 발생했습니다.";
      if (error.response) {
        errorMessage = `서버 응답 에러: ${
          error.response.status
        } ${JSON.stringify(error.response.data)}`;
      } else if (error.request) {
        errorMessage = "응답 없음, 요청 실패";
      } else {
        errorMessage = error.message;
      }

      alert("전부 기입해주길 바랍니다."); // 여기서 팝업 띄움
    }
  };
  useEffect(() => {
    if (currentStepIndex === steps.length) {
      handleComplete();
    }
  }, [currentStepIndex, steps.length]);

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
            여행 일정 생성 중입니다...
          </Text>
        </Stack>
      )}

      <Steps.Root
        orientation="vertical"
        height="100vh"
        defaultStep={0}
        count={steps.length}
        onStepChange={(details: any) => {
          setCurrentStepIndex(details.step);
        }}
      >
        <div className={styles.layout1}>
          <Steps.List className={styles.stepperProgress}>
            <Steps.Title className={styles.progressTitle}></Steps.Title>
            {steps.map((step, index) => (
              <Steps.Item
                className={styles.stepsItem}
                key={index}
                index={index}
                title={step.progressTitle}
              >
                <div className={styles.indicatorLayout}>
                  <Steps.Indicator className={styles.indicator} />
                </div>

                <div className={styles.progressTitles}>
                  <Steps.Title className={styles.progressTitle}>
                    {step.progressTitle}
                  </Steps.Title>
                  <div className={styles.progeressSubTitle}>
                    {step.progressSubTitle && travelPlan
                      ? formatSubtitleValue(
                          step.progressSubTitle,
                          travelPlan[step.progressSubTitle]
                        )
                      : "선택 안 됨"}
                  </div>
                </div>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        </div>

        <Stack className={styles.layout2}>
          <div className={styles.layout2Division}>
            {steps.map((step, index) => (
              <Steps.Content
                key={index}
                index={index}
                className={styles.stepContent}
              >
                <div className={styles.stepperContent}>
                  <div className={styles.titleBox}>
                    <div className={styles.stepemoji}>{step.emoji}</div>
                    <div className={styles.stepTitle}>{step.title}</div>
                    <div className={styles.stepSubTitle}>{step.subTitle}</div>
                  </div>

                  <div className={styles.contentLayout}>
                    {stepPageChanger(step.content)}
                  </div>
                </div>
              </Steps.Content>
            ))}
          </div>

          <div className={styles.buttonLayout}>
            <Steps.PrevTrigger asChild>
              <Button className={styles.preButton}>이전</Button>
            </Steps.PrevTrigger>

            {currentStepIndex === steps.length - 1 ? (
              // 마지막 스텝일 때
              <Button
                className={styles.preButton}
                onClick={() => {
                  const confirmed = window.confirm("정말 제출하시겠습니까?");
                  if (confirmed) {
                    handleComplete();
                  }
                }}
              >
                제출
              </Button>
            ) : (
              // 마지막 스텝이 아닐 때
              <Steps.NextTrigger asChild>
                <Button className={styles.preButton}>다음</Button>
              </Steps.NextTrigger>
            )}
          </div>
        </Stack>
      </Steps.Root>
    </>
  );
};

const scheduleCountLabelsMap: Record<number, string> = {
  2: "느긋한 일정 (하루 1-2곳)",
  3: "적당한 일정 (하루 2-3곳)",
  4: "빽빽한 일정 (하루 3-4곳)",
  5: "강행군 (하루 5곳 이상)",
};
const formatSubtitleValue = (key: string, value: any) => {
  if (value === undefined || value === null || value === "") {
    return "선택 안 됨";
  }

  if (key === "duration" && typeof value === "number") {
    return value === 1 ? "당일치기" : `${value - 1}박${value}일`;
  }

  if (key === "schedule_count" && typeof value === "number") {
    return scheduleCountLabelsMap[value] ?? "알 수 없는 일정";
  }

  if (key === "required_places" && Array.isArray(value)) {
    if (value.length === 0) return "선택 안 됨";
    if (value.length <= 3) {
      // 장소 이름을 쉼표로 연결해서 보여주기
      return value.map((place: { name: string }) => place.name).join(", ");
    }
    // 4개 이상이면 요약 표시
    return `${value.length}곳 선택됨`;
  }

  return String(value);
};

export default CommonStepperPresenter;
