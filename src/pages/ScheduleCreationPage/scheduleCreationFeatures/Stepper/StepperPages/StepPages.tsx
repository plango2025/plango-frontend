import SearchBarPresenter from "@/components/common/searchbar/CommonSearchbar";
import styles from "./StepPages.module.scss";
import CommonCheckbox from "../../components/checkbox/CommonCheckbox";
import CardView from "../../components/card/CardView";
import CommonSlider from "@/components/common/slider/CommonSlider";
import { useTravelPlan, TravelPlanProvider } from "./StepPageContext";
import ParentComponent from "@/components/common/slider/CommonSlider.presenter"
import React, { useState } from "react";

//context 사용할라고 전역 변수
  

const step1CommonCheckboxLabels1 = [
  "대한민국",
  "일본",
  "필리핀",
  "대만",
  "직접입력",
  "직접입력",
  "직접입력",
  "직접입력",
  "직접입력",
  "직접입력",
  "직접입력",
  "직접입력",
];

// StepPage1 컴포넌트 선언
const StepPage1 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const handleCheckboxClick = (label: string, checked: boolean) => {
    // 이미 있는지 확인
    const alreadyExists = travelPlan.required_place?.some(
      (place) => place.name === label
    );

    if (alreadyExists) {
      // 선택 해제 (제거)
      setTravelPlan((prev) => ({
        ...prev,
        required_place: prev.required_place?.filter((place) => place.name !== label),
      }));
    } else {
      // 선택 추가
      setTravelPlan((prev) => ({
        ...prev,
        required_place: [...(prev.required_place || []), { name: label, address: "강원도" }],
      }));
    }
  };

  const rows = 3;
  const cols = 4;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex;
        const label = step1CommonCheckboxLabels1[index];
        return (
          <CommonCheckbox
            key={`${rowIndex}-${colIndex}`}
            labels={[label]}
            onChange={(label, checked) => handleCheckboxClick(label, checked)} // ✅ 체크 이벤트 받기
          />
        );
      })}
    </div>
  ));

  console.log("Current Travel Plan:", travelPlan);

  return (
    <div className={styles.containerSp1}>
      <div className={styles.searchBarContainerSp1}>
        <SearchBarPresenter />
      </div>
      <div className={styles.checkboxesContainerSp1}>
        <div className={styles.gridSp3}>{checkboxes}</div>
      </div>
    </div>
  );
};

// StepPage2 컴포넌트 선언
const StepPage2 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  console.log("Current Travel Plan:", travelPlan);
  
  return (
    <div className={styles.containerSp2}>
      <div className={styles.searchBarContainerSp2}>
        <SearchBarPresenter />
      </div>

      <div className={styles.cardViewContainerSp2}>
        <CardView />
        <CardView />
        <CardView />
        <CardView />
      </div>
    </div>
  );
};

const step3CommonCheckboxLabels = [
  "당일치기",
  "1박 2일",
  "2박 3일",
  "3박 4일",
  "4박 5일",
  "5박 6일",
];

const StepPage3 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const handleCheckboxClick = (label: string, checked: boolean) => {
    // 이미 있는지 확인
    const alreadyExists = travelPlan.required_place?.some(
      (place) => place.name === label
    );

    if (alreadyExists) {
      // 선택 해제 (제거)
      setTravelPlan((prev) => ({
        ...prev,
        duration: null,
      }));
    } else {
      // 선택 추가
      setTravelPlan((prev) => ({
        ...prev,
        duration: label,
      }));
    }
  };
  
  // 3x2 배열을 생성
  const rows = 2;
  const cols = 3;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step3CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} onChange={(label, checked) => handleCheckboxClick(label, checked)}/> // 각 체크박스에 해당하는 라벨 전달
        );
      })}
    </div>
  ));

  return (
    <div className={styles.containerSp3}>
      <div className={styles.checkboxesContainerSp3}>
        <div className={styles.gridSp3}>{checkboxes}</div>
      </div>
    </div>
  );
};

const step4CommonCheckboxLabels = [
  "혼자",
  "연인과",
  "친구와",
  "부모님",
  "아이와",
  "배우자와",
  "MT",
  "회사 워크숍",
  "기타타",
];

const StepPage4 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const handleCheckboxClick = (label: string, checked: boolean) => {
    // 이미 있는지 확인
    const alreadyExists = travelPlan.required_place?.some(
      (place) => place.name === label
    );

    if (alreadyExists) {
      // 선택 해제 (제거)
      setTravelPlan((prev) => ({
        ...prev,
        companion: null,
      }));
    } else {
      // 선택 추가
      setTravelPlan((prev) => ({
        ...prev,
        companion: label,
      }));
    }
  };


  // 3x2 배열을 생성
  const rows = 3;
  const cols = 3;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step4CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} onChange={(label, checked) => handleCheckboxClick(label, checked)}/> // 각 체크박스에 해당하는 라벨 전달
        );
      })}
    </div>
  ));

  return (
    <div className={styles.containerSp4}>
      <div className={styles.checkboxesContainerSp4}>
        <div className={styles.gridSp3}>{checkboxes}</div>
      </div>

      <div className={styles.searchBarContainerSp4}>
        <SearchBarPresenter />
      </div>
    </div>
  );
};

const step5CommonCheckboxLabels = [
  "짜릿한 엑티비티",
  "평화로운 힐링코스",
  "맛집 탐방",
  "역사속으로",
  "인생샷 건지러 GO!",
  "호캉스",
  "도시 감성 한가득",
  "쇼핑 플렉스",
  "자연과 함께",
  "기타",
  "기타",
  "기타",
];

const StepPage5 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const handleCheckboxClick = (label: string, checked: boolean) => {
    // 이미 있는지 확인
    const alreadyExists = travelPlan.required_place?.some(
      (place) => place.name === label
    );

    if (alreadyExists) {
      // 선택 해제 (제거)
      setTravelPlan((prev) => ({
        ...prev,
        style: null,
      }));
    } else {
      // 선택 추가
      setTravelPlan((prev) => ({
        ...prev,
        style: label,
      }));
    }
  };


  // 3x2 배열을 생성
  const rows = 4;
  const cols = 3;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step5CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} onChange={(label, checked) => handleCheckboxClick(label, checked)}/> // 각 체크박스에 해당하는 라벨 전달
        );
      })}
    </div>
  ));

  return (
    <div className={styles.containerSp5}>
      <div className={styles.checkboxesContainerSp5}>
        <div className={styles.gridSp3}>{checkboxes}</div>
      </div>

      <div className={styles.searchBarContainerSp5}>
        <SearchBarPresenter />
      </div>
    </div>
  );
};

const step6CommonCheckboxLabels = [
  "강행군 (하루 5곳 이상)",
  "적당한 일정 (하루 2-3곳)",
  "빽빽한 일정 (하루 3-4곳)",
  "느긋한 일정 (하루 1-2곳)",
];

const StepPage6 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const handleCheckboxClick = (label: string, checked: boolean) => {
    // 이미 있는지 확인
    const alreadyExists = travelPlan.required_place?.some(
      (place) => place.name === label
    );

    if (alreadyExists) {
      // 선택 해제 (제거)
      setTravelPlan((prev) => ({
        ...prev,
        schedule_count: null,
      }));
    } else {
      // 선택 추가
      setTravelPlan((prev) => ({
        ...prev,
        schedule_count: label,
      }));
    }
  };

  // 3x2 배열을 생성
  const rows = 4;
  const cols = 1;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step6CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} large onChange={(label, checked) => handleCheckboxClick(label, checked)} /> // 각 체크박스에 해당하는 라벨 전달
        );
      })}
    </div>
  ));

  return (
    <div className={styles.containerSp6}>
      <div className={styles.checkboxesContainerSp6}>
        <div className={styles.gridSp3}>{checkboxes}</div>
      </div>

      <div className={styles.searchBarContainerSp4}>
        <SearchBarPresenter />
      </div>
    </div>
  );
};


//예산
const StepPage7 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan(); // context에서 travelPlan과 setTravelPlan 가져오기
  const [sliderValue, setSliderValue] = useState<number>(50); // 슬라이더 값 상태

  const handleSliderValueChange = (value: number) => {
    setSliderValue(value); // 슬라이더 값 업데이트
    
    setTravelPlan((prev) => ({
      ...prev,
      budget: value, // 슬라이더 값을 budget에 설정
    }));
    console.log("Updated Budget:", value); // 값 확인용 콘솔
  };
  
  return (
    <div className={styles.containerSp1}>
      <div className={styles.CommonSliderContainerSp7}>
        <CommonSlider onValueChange={handleSliderValueChange}/>
      </div>
    </div>
  );
};

const StepPage8 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const handleCheckboxClick = (label: string, checked: boolean) => {
    // 이미 있는지 확인
    const alreadyExists = travelPlan.required_place?.some(
      (place) => place.name === label
    );

    if (alreadyExists) {
      // 선택 해제 (제거)
      setTravelPlan((prev) => ({
        ...prev,
        extra : null,
      }));
    } else {
      // 선택 추가
      setTravelPlan((prev) => ({
        ...prev,
        extra : label,
      }));
    }
  };

  return (
        <div className={styles.inputContainerSp8}>
          <textarea className={styles.textareaSp8} placeholder="여기에 글을 입력하세요."/>
    </div>
  );
};

export const StepPages = {
  StepPage1,
  StepPage2,
  StepPage3,
  StepPage4,
  StepPage5,
  StepPage6,
  StepPage7,
  StepPage8,
};
