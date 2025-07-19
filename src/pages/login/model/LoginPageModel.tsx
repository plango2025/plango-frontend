import {
  CustomAxiosRequestConfig,
} from "@/api/axiosInstance";

export const requestKakaoLoginUrl = async (api): Promise<string> => {
  const res = await api.get("/oauth/kakao/login", {
    requiresAuth: false, 
  } as CustomAxiosRequestConfig);
 
  return res.data.redirect_uri;
};
