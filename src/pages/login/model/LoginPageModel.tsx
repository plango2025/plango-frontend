import {
} from "@/api/axiosInstance";

export const requestKakaoLoginUrl = async (api): Promise<string> => {
  const res = await api.get("/oauth/kakao/login", {
    requiresAuth: false, 
  });
 
  return res.data.redirect_uri;
};
