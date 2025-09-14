import StepperPresenter from "./scheduleCreationFeatures/Stepper/StepperView";
import { TravelPlanProvider } from "./scheduleCreationFeatures/Stepper/StepperPages/StepPageContext"; // TravelPlanProvider 경로 확인
import FullLayout from "@/layout/FullLayout";
import { MainContainer } from "./ScheduleCreation.styles";

export default function ScheduleCreationView() {
  return (
    <TravelPlanProvider>
      <div className=" schedule-creation">
        <FullLayout>
          <MainContainer>
            <StepperPresenter />
          </MainContainer>
        </FullLayout>
      </div>
    </TravelPlanProvider>
  );
}
