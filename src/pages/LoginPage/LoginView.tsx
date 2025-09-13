import styles from "./LoginPage.module.scss"; // SCSS 모듈 import
import SideBar from "@/components/common/sidebar/CommonSidebar";
import KakaoLoginBtn from "./KakaoLoginBtn/KakaoLoginBtn";

const LoginView = () => {
  
 
  return (
    <div className={styles.container}>
      {/* 사이드바 */}
      <SideBar />
      <div className={styles.container__title}>
        <span className={styles.container__title__desc}>
          여행 계획? 이젠 클릭 한 번으로 끝!
        </span>
        <div className={styles.container__title__logo}>
          <img src="/src/assets/images/icons/plane.png" alt="Plango Logo" />
          {/* @assets 왜 안되는 지 알아보기 */}
          <h1>Plango</h1>
        </div>
      </div>
      <div className={styles.container__center}>
        <img
          className={styles.container__center__img}
          src="/src/assets/images/login/background.png"
          alt="Background Image"
        />
      </div>
      <KakaoLoginBtn />
    </div>
  );
};

export default LoginView;