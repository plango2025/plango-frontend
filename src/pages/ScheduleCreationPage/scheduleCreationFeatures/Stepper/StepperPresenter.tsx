import { steps } from "./StepperModel";
import { StepPages } from "./StepperPages/StepPages";

// steps를 반환하는 함수
export const getSteps = () => steps;

const stepPageChanger = (data) => {
  switch (
    data // data가 null이나 undefined인 경우를 대비하여 옵셔널 체이닝 사용
  ) {
    case "stepPage1":
      return <StepPages.StepPage1 />; 
      
    case "stepPage2":
      return <StepPages.StepPage2 />;
    case "stepPage3":
      return <StepPages.StepPage3 />;
    case "stepPage4":
      return <StepPages.StepPage4 />;
    case "stepPage5":
      return <StepPages.StepPage5 />;
    case "stepPage6":
      return <StepPages.StepPage6 />;
    case "stepPage7":
      return <StepPages.StepPage7 />;
    case "stepPage8":
      return <StepPages.StepPage8/>

    default:
      return <StepPages.StepPage1 />;  // 기본 페이지 또는 null 처리
  }
};

export default stepPageChanger;