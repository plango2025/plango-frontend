import React from 'react'
import styles from "./LoginPage.module.scss"; // SCSS 모듈 import
import SideBar from "@/components/common/sidebar/CommonSidebar";


type LoginViewProps={
    id: string;
    setId :(id:string)=> void ;
    pw : string;
    setPw:(pw:string)=>void;
    rememberId: boolean;
    setRememberId:(rememberId:boolean)=>void;
    handleLogin:()=>void;
}
const LoginView:React.FC<LoginViewProps>=({
  id,
  setId,
  pw,
  setPw,
  rememberId,
  setRememberId,
  handleLogin,
})=> {
  return (

      <div className={styles["login-container"]}>
        {/* 사이드바 */}
        <SideBar />
        <div className={styles["login-form"]}>
          <div className={styles["text_container"]}>
            <h2>
              안녕하세요! ; ) <br /> 플랭고입니다.
            </h2>
          </div>
          <div className={styles["form-container"]}>
            <div className={styles["input-container"]}>
              <span>로그인</span>
              <input
                id="id"
                type="text"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className={styles["input-container"]}>
              <input
                id="password"
                type="password"
                placeholder="비밀번호(영문, 숫자, 특수문자 포함 8~20자)"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
            </div>

            <div className={styles["remember-container"]}>
              <input
                type="checkbox"
                checked={rememberId}
                onChange={() => setRememberId(!rememberId)}
              />
              <span>아이디 저장</span>
            </div>
            <div className={styles["links"]}>
              <a href="">아이디 찾기</a>
              <a href="">비밀번호 찾기</a>
            </div>
            <button onClick={handleLogin} className={styles["login-button"]}>
              로그인
            </button>

            <button className={styles["kakao-login-button"]}>
              카카오 간편 로그인
            </button>
          </div>
        </div>
      </div>
    
  );
}

export default LoginView
