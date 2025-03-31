import { steps } from "./StepperModel"
import { StepPages } from "./StepperPages/StepPages" 


// steps를 반환하는 함수
export const getSteps = () => steps

const stepPageChanger = (data) => {
    switch (data) { // data가 null이나 undefined인 경우를 대비하여 옵셔널 체이닝 사용
      case "stepPage1":
        return <StepPages.StepPage1 />; // 데이터도 props로 전달 가능
      case "stepPage2":
        return <StepPages.StepPage2 />;
      default:
        return <StepPages.StepPage3 />; // 기본 페이지 또는 null 처리
    }
  };



  
export default stepPageChanger;
