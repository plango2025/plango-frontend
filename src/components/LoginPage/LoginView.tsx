import styles from "./LoginPage.module.scss"; // SCSS 모듈 import
import SideBar from "@/components/common/sidebar/CommonSidebar";

const LoginView = () => {
  return (
    <div className={styles.login_container}>
      {/* 사이드바 */}
      <SideBar />
      <div className={styles.container}>
        <div className={styles.container__title}>
          <span className={styles.container__title__desc}>
            여행 계획? 이젠 클릭 한 번으로 끝!
          </span>
          <div className={styles.container__title__logo}>
            <img src="src/assets/images/icons/plane.png"></img>
            {/* @assets 왜 안되는 지 알아보기기 */}
            <h1>Plango</h1>
          </div>

          <img
            className={styles.container__img}
            src="src/assets/images/login/background.png"
            alt=""
          />
        </div>
        <button className={styles.container__kakao_login}>
        </button>
      </div>
    </div>
  );
};

export default LoginView;
