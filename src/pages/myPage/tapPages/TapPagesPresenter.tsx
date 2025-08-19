import { ReviewsResponse } from "./TapPagesmodel";
import { CustomAxiosRequestConfig, createApiWithToken } from "@/api/axiosInstance";
import { useAccessToken } from "@/context/AccessTokenContext";
import { useMemo } from "react";
import axios from "axios";

export const useReviewApi = () => {
  const { accessToken, setAccessToken } = useAccessToken();

  const api = useMemo(
    () => createApiWithToken(() => accessToken, setAccessToken),
    [accessToken, setAccessToken]
  );

  const fetchReviews = async (limit: number = 10, cursor: string | null = null): Promise<ReviewsResponse> => {
    const params = { limit, cursor };
    const headers = new axios.AxiosHeaders(); // 빈 헤더 객체

    const config: CustomAxiosRequestConfig = {
      requiresAuth: true,
      headers,
      params,
    };

    const res = await api.get("/users/reviews", config);
    return res.data as ReviewsResponse;
  };

  return { fetchReviews };
};
