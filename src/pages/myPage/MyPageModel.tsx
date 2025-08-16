// MyPageModel.ts
import {
  createApiWithToken,
  CustomAxiosRequestConfig,
} from "@/api/axiosInstance";
import { useAccessToken } from "@/context/AccessTokenContext";
import { useMemo } from "react";

export interface UserProfile {
  id: string;
  nickname: string;
  birth: string;
  about: string;
  address: string;
  profile_image: string;
}

export const useUserApi = () => {
  const { accessToken, setAccessToken } = useAccessToken();

  // api instance는 accessToken 변경 시마다 갱신
  const api = useMemo(
    () => createApiWithToken(() => accessToken, setAccessToken),
    [accessToken, setAccessToken]
  );

  const fetchUserProfile = async (): Promise<UserProfile> => {
    const res = await api.get("/users", {
      requiresAuth: true,
    } as CustomAxiosRequestConfig);

    const data = res.data;
    return {
      id: data.id.toString(),
      nickname: data.nickname ?? data.properties?.nickname ?? "",
      birth: data.birth ?? data.properties?.birth ?? "",
      about: data.about ?? data.properties?.about ?? "",
      address: data.address ?? data.properties?.address ?? "",
      profile_image: data.profile_image ?? data.properties?.profile_image ?? "",
    };
  };

  return { fetchUserProfile };
};
