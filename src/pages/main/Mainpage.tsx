import LoginBtn from "@components/common/loginBtn/LoginBtn";
import styles from "./Mainpage.module.scss";
import gridStyle from "@assets/styles/grid.module.scss";
import CommonFooter from '@/components/common/footer/CommonFooter';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate= useNavigate()
  return (
    <div className={styles.fullpageContainer}>
      {/* 슬라이드 1 */}
      <section className={`${styles.slide} ${gridStyle.container}`}>
        {/* <LoginBtn /> */}
        <div className={styles.main__left}>
          <p>여행 계획? 이제 클릭 한 번으로 끝!</p>
          <div className={styles.main__left__logos}>
            <img src="src/assets/images/icons/plane.png" alt="plane" />
            <span>Plango</span>
          </div>
          <button onClick={()=>{navigate("/schedule");}} className={styles.main__left__startBtn}>
            바로 일정 만들기
          </button>
        </div>
        <div className={styles.main__right}>
          <img src="src/assets/images/main/main.png" alt="main-2" />
        </div>
      </section>

      {/* 슬라이드 2 */}
      <section className={`${styles.slide} ${gridStyle.container}`}>
        <div className={styles.main__left}>
        
            <img src="src/assets/images/main/main2.png" alt="calendar" />
           
        
        </div>
        <div className={styles.main__right}>
          <img src="src/assets/images/main/ai-schedule.png" alt="ai-schedule" />
        </div>
      </section>

      {/* 더 추가 가능 */}

      <CommonFooter></CommonFooter>
    </div>
  );
}
