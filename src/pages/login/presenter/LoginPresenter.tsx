import { useState } from "react";
import { requestKakaoLoginUrl } from "../model/LoginPageModel";

export const useLoginPresenter = () => {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const rediret_uri = await requestKakaoLoginUrl()
      console.log(rediret_uri)
      window.location.href =rediret_uri
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
