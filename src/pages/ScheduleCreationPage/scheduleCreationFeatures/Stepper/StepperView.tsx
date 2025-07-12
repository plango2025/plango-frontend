import React, { useEffect } from "react";
import { Button, ButtonGroup, Stack, Steps } from "@chakra-ui/react";
import stepPageChanger, { getSteps } from "./StepperPresenter";
import { useTravelPlan } from "./StepperPages/StepPageContext";
import styles from "./Stepper.module.scss";
import { sendTravelPlan } from "./StepperPages/StepPagePresenter";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const CommonStepperPresenter = () => {
  const { travelPlan } = useTravelPlan(); // travelPlan을 Context에서 받아옴
  const steps = getSteps();
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleComplete = async () => {
    try {
      if (!travelPlan) {
        console.error("여행 계획이 없습니다.");
        return;
      }

      console.log("전송 전 travelPlan 확인:", travelPlan);
      const result = await sendTravelPlan(travelPlan);
      console.log("여행 계획 전송 완료:", result);

      navigate("/scheduleResult", { state: { scheduleResponse: result } });
      console.log("페이지 이동 시도");
    } catch (error: any) {
      console.error("여행 계획 전송 실패:", error);
      if (error.response) {
        // axios 에러 응답
        console.error(
          "서버 응답 에러:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // 요청은 됐지만 응답 없음
        console.error("응답 없음, 요청:", error.request);
      } else {
        // 기타 오류
        console.error("기타 오류:", error.message);
      }
    }
  };

  return (
    <Steps.Root
      orientation="vertical"
      height="100vh"
      defaultStep={1}
      count={steps.length}
    >
      <div className={styles.layout1}>
        <Steps.List className={styles.stepperProgress}>
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
                  {step.progressSubTitle}
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
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepSubTitle}>{step.subTitle}</div>
                </div>

                <div className={styles.contentLayout}>
                  {stepPageChanger(step.content)}
                </div>
              </div>
            </Steps.Content>
          ))}
          <Steps.CompletedContent>
            {/* 완료 버튼 클릭 시 handleComplete 호출 */}
            <Button onClick={handleComplete}>여행 계획 완료</Button>
          </Steps.CompletedContent>
        </div>

        <div className={styles.buttonLayout}>
          <ButtonGroup
            size="lg"
            variant="outline"
            className={styles.buttonGroup}
          >
            <Steps.PrevTrigger asChild>
              <Button>Prev</Button>
            </Steps.PrevTrigger>
            <Steps.NextTrigger asChild>
              <Button>Next</Button>
            </Steps.NextTrigger>
          </ButtonGroup>
        </div>
      </Stack>
    </Steps.Root>
  );
};

export default CommonStepperPresenter;
