import { useState } from "react";
import { requestKakaoLoginUrl } from "../model/LoginPageModel";
import { createApiWithToken } from '@/api/axiosInstance';
import { useAccessToken } from '@/context/AccessTokenContext';

export const useLoginPresenter = () => {
  const [error, setError] = useState<string | null>(null);
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const handleLogin = async () => {
    try {
      const rediret_uri = await requestKakaoLoginUrl(api)
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
