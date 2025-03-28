import React from "react";
import CommonStepperPresenter from "@/components/common/stepper/CommonStepperPresenter";
import "./ScheduleCreation.scss";
import SideBar from "@/components/common/sidebar/CommonSidebar";

// Step 타입 정의
interface Step {
  label: string;
  content: React.ReactNode; // content는 JSX 요소로 설정
}

export default function ScheduleCreationView() {
  return (
    <div className="schedule-creation">

      <SideBar/>
    
      <main>
        <div className="main-container">
          <CommonStepperPresenter/>
        </div>
      </main>

    </div>
  );
}
