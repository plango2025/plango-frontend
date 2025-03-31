import SearchBarPresenter from "@/components/common/searchbar/CommonSearchbar";
import styles from "./StepPages.module.scss"
import CommonCheckbox from "../../components/checkbox/CommonCheckbox";
import CardView from "../../components/card/CardView";


// StepPage1 컴포넌트 선언
const StepPage1 = () => {
    return (  
        <div className = {styles.containerSp1}>
            <div className = {styles.searchBarContainerSp1}>
                <SearchBarPresenter/>  
            </div>

            <div className = {styles.cardViewContainer}>
                <CardView/>
            </div>
                

        </div>


    );
};

// StepPage2 컴포넌트 선언
const StepPage2 = () => {
    return (
        <div>
            <h1>Step 2 페이지</h1>
            {/* Step 2 관련 내용 추가 */}
        </div>
    );
};


const step3CommonCheckboxLabels = ["당일치기", "1박 2일", "2박 3일", "3박 4일", "4박 5일", "5박 6일"]

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

export const StepPages = {
    StepPage1,
    StepPage2,
    StepPage3,
};