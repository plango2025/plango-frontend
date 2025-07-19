import React, { useState } from "react";
import { useTravelPlan } from "@/pages/ScheduleCreationPage/scheduleCreationFeatures/Stepper/StepperPages/StepPageContext"; // TravelPlanContext에서 훅 가져오기
import styles from "./CommonSearchbar.module.scss"; // 스타일 import

const SearchBarPresenter: React.FC = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan(); // TravelPlanContext 사용
  const [inputText, setInputText] = useState<string>(""); // 입력값을 관리하는 상태

  const handleButtonClick = () => {
    setTravelPlan((prevState) => ({
      ...prevState,
      destination: inputText, // 버튼 클릭 시 입력된 텍스트를 searchText로 업데이트
    }));
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={inputText} // inputText 상태와 바인딩
        onChange={(e) => setInputText(e.target.value)} // 텍스트 변경 시 상태 업데이트
        className={styles.input}
        placeholder="Enter text"
      />
      <button onClick={handleButtonClick} className={styles.button}>
        검색
      </button>
    </div>
  );
};

export default SearchBarPresenter;
