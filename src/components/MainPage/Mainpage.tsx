import LoginBtn from "@components/common/loginBtn/LoginBtn";
import styles from "./Mainpage.module.scss";
export default function MainPage() {
  return (
    <div className={styles.gridContainer}>
      {/* 로그인 버튼 */}
      <LoginBtn />
      {/* 메인1. 상단 로고 및 버튼 */}
      <div className={styles.main}>
        <div className={styles.main__left}>
          <p>여행 계획? 이제 클릭 한 번으로 끝!</p>
          <div className={styles.main__left__logos}>
            <img src="src/assets/images/icons/plane.png" alt="plane" />
            <span>Plango</span>
          </div>
          <button className={styles.main__left__startBtn}>바로 일정 만들기</button>
        </div>
        <img
          className={styles.main__right}
          src="src/assets/images/main/main.png"
          alt="main-2"
        />
      </div>
      {/* 메인2
      <div className={styles.main}>
        <img src="/main2.png" alt="main-2" />
        <div className='main__right'>
          <span>먹는 걸 좋아하는 유리씨께께</span>
        </div>
      </div>
      <div>
        <img src="/main3.png" alt="main-3" />
        <img src="/main4.png" alt="main-4" />
        <img src="/main5.png" alt="main-5" />
        <img src="/main6.png" alt="main-6" />
        <img src="/main7.png" alt="main-7" />
      </div>

     
      <div>
        <img src="/space.png" alt="space" />
        <div>
          <p>
            나중엔 우주여행까지 <span>플랭고</span>와 함께!
          </p>
          <p>(뭐, 언젠간 되겠죠?)</p>
        </div>
      </div>

      바닥 물결
      <div /> */}
    </div>
  );
}
