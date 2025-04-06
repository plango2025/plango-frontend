import SearchBarPresenter from "@/components/common/searchBar/CommonSearchbar";
import styles from "./StepPages.module.scss";
import CommonCheckbox from "../../components/checkbox/CommonCheckbox";
import CardView from "../../components/card/CardView";
import CommonSlider from "@/components/common/slider/CommonSlider";

const step2CommonCheckboxLabels1 = [
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
  // 3x2 배열을 생성
  const rows = 3;
  const cols = 4;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step2CommonCheckboxLabels1[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} /> // 각 체크박스에 해당하는 라벨 전달
        );
      })}
    </div>
  ));

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
  // 3x2 배열을 생성
  const rows = 2;
  const cols = 3;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step3CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} /> // 각 체크박스에 해당하는 라벨 전달
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
  // 3x2 배열을 생성
  const rows = 3;
  const cols = 3;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step4CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} /> // 각 체크박스에 해당하는 라벨 전달
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
];

const StepPage5 = () => {
  // 3x2 배열을 생성
  const rows = 0;
  const cols = 0;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step5CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} /> // 각 체크박스에 해당하는 라벨 전달
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
  // 3x2 배열을 생성
  const rows = 4;
  const cols = 1;

  const checkboxes = Array.from({ length: rows }, (_, rowIndex) => (
    <div key={rowIndex} className={styles.rowSp3}>
      {Array.from({ length: cols }, (_, colIndex) => {
        const index = rowIndex * cols + colIndex; // 각 체크박스의 고유한 인덱스 계산
        const label = step6CommonCheckboxLabels[index]; // 해당 인덱스의 레이블 가져오기
        return (
          <CommonCheckbox key={`${rowIndex}-${colIndex}`} labels={[label]} /> // 각 체크박스에 해당하는 라벨 전달
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

const StepPage7 = () => {
  return (
    <div className={styles.containerSp1}>
      <div className={styles.cardViewContainer}>
        <CommonSlider />
      </div>
    </div>
  );
};

const StepPage8 = () => {
  return (
    <div className={styles.containerSp1}>
      <div className={styles.cardViewContainer}>
        <CommonSlider />
      </div>
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
