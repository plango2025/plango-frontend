import SearchBarPresenter from "@/components/common/searchBar/CommonSearchbar";
import styles from "./StepPages.module.scss";
import CommonCheckbox from "../../components/checkbox/CommonCheckbox";
import CardView from "../../components/card/CardView";
import CommonSlider from "@/components/common/slider/CommonSlider";
import { useTravelPlan, TravelPlanProvider } from "./StepPageContext";
import React, { useState } from "react";
import { useEffect } from "react";

const step1CommonCheckboxLabels1 = [
  "가평",
  "강릉",
  "속초",
  "부산",
  "여수",
  "인천",
  "전주",
  "제주",
  "춘천",
  "태안",
  "거제",
  "포항",
];

// StepPage1 컴포넌트 선언
const StepPage1 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan(); // 단일 선택을 위해 선택된 항목이 있으면 해제, 없으면 설정

   useEffect(() => {
    // extra가 없을 때만 초기값 설정
    if (!travelPlan.extra) {
      setTravelPlan((prev) => ({
        ...prev,
      }));
    }
  }, []);

  // SearchBarPresenter에서 호출할 함수
  const handleSearch = (text: string) => {
    setTravelPlan((prev) => ({
      ...prev,
      destination: text, // 원하는 키로 저장
    }));
    console.log("StepPage1 검색어 저장:", text);
  };

  const handleCheckboxClick = (label: string, checked: boolean) => {
    setTravelPlan((prev) => {
      if (prev.destination === label) {
        return {
          ...prev,
          destination: null, // 선택 해제
        };
      } else {
        return {
          ...prev,
          destination: label,
        };
      }
    });
  };
  console.log("여행 일정", travelPlan); // 값 확인용 콘솔
  const rows = 3;
  const cols = 4;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {" "}
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex;
        const label = step1CommonCheckboxLabels1[index]; // 단일 선택된 항목과 비교

        const isChecked = travelPlan.destination === label;

        return (
          <CommonCheckbox
            key={`${rowIndex}-${colIndex}`}
            labels={[label]}
            onChange={(clickedLabel, clickedChecked) =>
              handleCheckboxClick(clickedLabel, clickedChecked)
            }
            isChecked={isChecked}
          />
        );
      })}{" "}
    </div>
  ));

  return (
    <div className={styles.containerSp1}>
      {" "}
      <div className={styles.searchBarContainerSp1}>
        <SearchBarPresenter mode="button" onSearch={handleSearch} />{" "}
      </div>{" "}
      <div className={styles.checkboxesContainerSp1}>
        <div className={styles.gridSp3}>{checkboxes}</div>{" "}
      </div>{" "}
    </div>
  );
};

const StepPage2 = () => {
  const [selectedPlace, setSelectedPlace] = useState<string>("");

  return (
    <div className={styles.containerSp2}>
        <div className={styles.containerSp2_85}>
          <SearchBarPresenter mode="autocomplete" />
        {selectedPlace ? (
          <ul>
            <li>{selectedPlace}</li>
          </ul>
        ) : (
          <ul>
            
          </ul>
        )}
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

const parseDurationLabelToDays = (label: string): number | null => {
  if (label === "당일치기") return 1;

  const match = label.match(/(\d+)박\s*(\d+)일/);
  if (match) {
    return parseInt(match[2], 10); // "3일"에서 3만 추출
  }

  return null;
};

const StepPage3 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();

  // 이 함수는 'duration' 필드가 단일 값을 가지도록 변경합니다.
  const handleCheckboxClick = (label: string, checked: boolean) => {
    // 'checked' 값은 CommonCheckbox 내부에서 이미 토글된 상태를 반영할 것이므로,
    // 여기서는 단순히 'label' 값을 'duration'에 할당합니다.
    // 만약 체크 해제를 허용한다면 'checked'가 false일 때 null을 할당할 수 있습니다.
    const parsedDuration = parseDurationLabelToDays(label);

    setTravelPlan((prev) => {
      // 이미 선택된 항목을 다시 클릭하여 '해제'하는 경우
      if (prev.duration === parsedDuration) {
        // 이미 선택된 항목을 다시 클릭하면 선택 해제 (null 할당)
        return {
          ...prev,
          duration: null,
        };
      } else {
        // 새로운 항목을 선택하는 경우 (단일 선택)
        return {
          ...prev,
          duration: parsedDuration,
        };
      }
    });
  };

  // 3x2 배열을 생성
  const rows = 2;
  const cols = 3;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step3CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기

        // 현재 체크박스가 travelPlan.duration에 저장된 값과 일치하는지 확인하여
        // CommonCheckbox 컴포넌트의 'checked' 상태를 제어합니다.
        const isChecked =
          travelPlan.duration === parseDurationLabelToDays(label);

        return (
          <CommonCheckbox
            key={`${rowIndex}-${colIndex}`}
            labels={[label]}
            onChange={(clickedLabel, clickedChecked) =>
              handleCheckboxClick(clickedLabel, clickedChecked)
            }
            isChecked={isChecked} // CommonCheckbox에 현재 선택 상태를 전달
          />
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

  // 단일 선택만 가능하도록 수정
  const handleCheckboxClick = (label: string, checked: boolean) => {
    setTravelPlan((prev) => {
      if (prev.companion === label) {
        return {
          ...prev,
          companion: null, // 이미 선택된 항목 클릭 → 해제
        };
      } else {
        return {
          ...prev,
          companion: label, // 새로운 항목 선택
        };
      }
    });
  };

  // 3x3 배열 생성
  const rows = 3;
  const cols = 3;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex;
        const label = step4CommonCheckboxLabels[index];
        const isChecked = travelPlan.companion === label;

        return (
          <CommonCheckbox
            key={`${rowIndex}-${colIndex}`}
            labels={[label]}
            onChange={(clickedLabel, clickedChecked) =>
              handleCheckboxClick(clickedLabel, clickedChecked)
            }
            isChecked={isChecked}
          />
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
        <SearchBarPresenter mode="button" />
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

  // 단일 선택만 가능하도록 수정
  const handleCheckboxClick = (label: string, checked: boolean) => {
    setTravelPlan((prev) => {
      if (prev.style === label) {
        return {
          ...prev,
          style: null, // 선택 해제
        };
      } else {
        return {
          ...prev,
          style: label, // 새로 선택
        };
      }
    });
  };

  // 4x3 배열 생성
  const rows = 4;
  const cols = 3;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex;
        const label = step5CommonCheckboxLabels[index];
        const isChecked = travelPlan.style === label;

        return (
          <CommonCheckbox
            key={`${rowIndex}-${colIndex}`}
            labels={[label]}
            onChange={(clickedLabel, clickedChecked) =>
              handleCheckboxClick(clickedLabel, clickedChecked)
            }
            isChecked={isChecked}
          />
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
        <SearchBarPresenter mode="button" />
      </div>
    </div>
  );
};
const step6CommonCheckboxLabels = [
  "느긋한 일정 (하루 1-2곳)",
  "적당한 일정 (하루 2-3곳)",
  "빽빽한 일정 (하루 3-4곳)",
  "강행군 (하루 5곳 이상)",

];

// 문자열에서 하루 방문 예상 장소 수를 숫자 형태로 파싱하는 함수
const parseScheduleLabelToCount = (label: string): number | null => {
  // "강행군 (하루 5곳 이상)" → 5
  if (label.includes("5곳 이상")) return 5;

  // "적당한 일정 (하루 2-3곳)" → 3 (최대 방문 수)
  let match = label.match(/하루 (\d+)-(\d+)곳/);
  if (match) {
    return parseInt(match[2], 10); // 2-3 중 3 반환
  }

  // "느긋한 일정 (하루 1-2곳)" 같은 경우도 위에서 처리됨
  return null;
};

const StepPage6 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();

  const handleCheckboxClick = (label: string, checked: boolean) => {
    const parsedCount = parseScheduleLabelToCount(label);

    setTravelPlan((prev) => {
      // 같은 숫자가 이미 선택된 상태면 해제
      if (prev.schedule_count === parsedCount) {
        return {
          ...prev,
          schedule_count: null,
        };
      } else {
        return {
          ...prev,
          schedule_count: parsedCount,
        };
      }
    });
  };

  const rows = 4;
  const cols = 1;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex;
        const label = step6CommonCheckboxLabels[index];
        const isChecked =
          travelPlan.schedule_count === parseScheduleLabelToCount(label);

        return (
          <CommonCheckbox
            key={`${rowIndex}-${colIndex}`}
            labels={[label]}
            large
            onChange={(clickedLabel, clickedChecked) =>
              handleCheckboxClick(clickedLabel, clickedChecked)
            }
            isChecked={isChecked}
          />
        );
      })}
    </div>
  ));

  return (
    <div className={styles.containerSp6}>
      <div className={styles.checkboxesContainerSp6}>
        <div className={styles.gridSp3}>{checkboxes}</div>
      </div>

 
    </div>
  );
};

//예산

const StepPage7 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();
  const [sliderValue, setSliderValue] = useState<number>(
    travelPlan?.budget ?? 100
  );

  const handleSliderValueChange = (value: number) => {
    setSliderValue(value);
  };

  const handleSave = () => {
    setTravelPlan((prev) => ({
      ...prev,
      budget: sliderValue,
    }));
    console.log("Budget saved:", sliderValue);
  };

  return (
  <div className={styles.containerSp1}>
    <div className={styles.CommonSliderContainerSp7}>
      <CommonSlider onValueChange={handleSliderValueChange} />
      <div className={styles.budgetInfo}>
        <span>현재 예산: <strong>{sliderValue} 만원</strong></span>
      </div>
      <button className={styles.saveButton} onClick={handleSave}>
        예산 저장
      </button>
    </div>
  </div>
);
};

export default StepPage7;

const StepPage8 = () => {
  const { travelPlan, setTravelPlan } = useTravelPlan();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTravelPlan((prev) => ({
      ...prev,
      extra: value,
    }));
  };

  return (
    <div className={styles.inputContainerSp8}>
      <textarea
        className={styles.textareaSp8}
        placeholder="여기에 글을 입력하세요."
        value={travelPlan.extra || ""}
        onChange={handleChange}
      />
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
