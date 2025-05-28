import { useState } from "react";
import { requestKakaoLoginUrl } from "./LoginPageModel";

export const useLoginPresenter = () => {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const redirectUrl = await requestKakaoLoginUrl();
      window.location.href = redirectUrl;
    } catch (err) {
      setError("로그인 URL 요청 실패: " + String(err));
      console.log(err);
    }
  };

  return {
    handleLogin,
    error,
  };
};
