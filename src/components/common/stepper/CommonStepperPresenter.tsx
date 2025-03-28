import React from "react";
import useCommonStepperModel from "./CommonStepperModel";
import CommonStepper from "./CommonStepper";
import Page1 from "./Stepper.pages/page1"; // Import 실제 컴포넌트

// Step 타입 정의 (Presenter 내부에서 관리)
interface Step {
  label: string;
  content: React.ReactNode; // content는 ReactNode로 정의
}

const defaultSteps: Step[] = [
  { label: "기본 정보", content: <Page1 /> }, // JSX 형태로 컴포넌트 인스턴스 할당
  { label: "세부 설정", content: "qq" }, // JSX 형태로 컴포넌트 인스턴스 할당
  { label: "확인 및 완료", content: "qq" }, // JSX 형태로 컴포넌트 인스턴스 할당
  // 필요에 따라 더 많은 스텝을 추가할 수 있습니다.
];

function CommonStepperPresenter({ steps: propSteps }: { steps?: Step[] }) {
  // propSteps이 있으면 propSteps을 사용하고, 없으면 defaultSteps를 사용합니다.
  const stepsToUse = propSteps || defaultSteps;

  const {
    currentStep,
    steps: modelSteps,
    handleContinue,
    handleBack,
  } = useCommonStepperModel(stepsToUse);

  return (
    <CommonStepper
      steps={modelSteps}
      currentStep={currentStep}
      onContinue={handleContinue}
      onBack={handleBack}
    />
  );
}

export default CommonStepperPresenter;