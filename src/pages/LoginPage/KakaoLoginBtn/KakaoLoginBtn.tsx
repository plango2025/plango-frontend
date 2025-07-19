import styles from "../LoginPage.module.scss"; // SCSS 모듈 import
import axios from 'axios';
import { useState } from 'react';

function KakaoLoginBtn() {
const [user, setUser] = useState<KakaoUser | null>(null); // null → 로그인 안 됨  { nickname: string, id: string } → 로그인 됨
const [error, setError] = useState<string | null>(null);
//로그인 버튼 클릭 시-> 로그인 리디렉션 URL 받아서 이동
const handleLogin = async () => {
  try {
    const res = await axios.get("/api/oauth/kakao/login", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const redirectUrl = res.data;
    window.location.href = redirectUrl; //카카오 로그인 페이지로 이동
  } catch (err: unknown) {
    setError("로그인 URL 요청 실패: " + err);
    console.error(error)
  }
};
  return (
    <button onClick={handleLogin} className={styles.container__kakao_login}>
      <div className={styles.kakaoIcon}>
        <svg
          width="36"
          height="34"
          viewBox="0 0 36 34"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 0.199951C8.05835 0.199951 0 6.42587 0 14.1045C0 18.88 3.11681 23.0899 7.86305 25.5939L5.86606 32.8889C5.68962 33.5335 6.42683 34.0473 6.99293 33.6738L15.7467 27.8964C16.4854 27.9676 17.2362 28.0093 18 28.0093C27.9409 28.0093 35.9999 21.7836 35.9999 14.1045C35.9999 6.42587 27.9409 0.199951 18 0.199951"
            fill="black"
          />
        </svg>
      </div>
      카카오 로그인
    </button>
  );
}

export default KakaoLoginBtn;
