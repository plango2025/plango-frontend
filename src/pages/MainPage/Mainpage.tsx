import LoginBtn from "@components/common/loginBtn/LoginBtn";
import styles from "./Mainpage.module.scss";

export default function MainPage() {
  return (
    <div className={styles.container}>
      {/* 로그인 버튼 */}
      <LoginBtn />
      {/* 메인1. 상단 로고 및 버튼 */}
        <div className={styles.main__left}>
          <p>여행 계획? 이제 클릭 한 번으로 끝!</p>
          <div className={styles.main__left__logos}>
            <img src="src/assets/images/icons/plane.png" alt="plane" />
            <span>Plango</span>
          </div>
          <button className={styles.main__left__startBtn}>바로 일정 만들기</button>
        </div>
        <div className={styles.main__right}>
        <img
          
          src="src/assets/images/main/main.png"
          alt="main-2"
        /></div>
      </div>
  );
}