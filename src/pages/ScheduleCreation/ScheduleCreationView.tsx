import React from "react"
import styles from "./ScheduleCreation.module.scss" // 스타일 직접 적용
import SideBar from "@/components/common/sidebar/CommonSidebar"
import StepperPresenter from "./scheduleCreationFeatures/Stepper/StepperView"

export default function ScheduleCreationView() {
  return (
    <div className= " schedule-creation">
      <SideBar />
      <main>
        <div className = {styles.mainContainer}>
          <StepperPresenter />
        </div>
      </main>
    </div>
  )
}
