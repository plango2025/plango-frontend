import {
  createApiWithToken,
  CustomAxiosRequestConfig,
} from "@/api/axiosInstance";

export const requestKakaoLoginUrl = async (): Promise<string> => {
  const api = createApiWithToken(null, () => {}); 

  const res = await api.get("/oauth/kakao/login", {
    requiresAuth: false, 
  } as CustomAxiosRequestConfig);
 
  return res.data.redirect_uri;
};
