import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
  _retry?: boolean;
}

export const createApiWithToken = (
  getAccessToken: () => string | null,
  setAccessToken: (token: string) => void
) => {
  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
  });

  // ✅ 요청 인터셉터
  let refreshingPromise: Promise<string | null> | null = null;

api.interceptors.request.use(async (config: CustomAxiosRequestConfig) => {
  const needsAuth = config.requiresAuth === true;

  if (needsAuth && config.headers) {
    let token = getAccessToken();

    if (!token) {
      // 이미 리프레시 중이면 해당 promise를 기다림
      if (!refreshingPromise) {
        refreshingPromise = axios
          .post(
            "http://localhost:8000/api/auth/refresh",
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            const newToken = res.headers["authorization"]?.replace(
              "Bearer ",
              ""
            );
            if (newToken) {
              setAccessToken(newToken);
              return newToken;
            } else {
              throw new Error("❌ refresh 후에도 accessToken 없음");
            }
          })
          .catch((e) => {
            console.error("🚫 refresh 실패 (request):", e);
            alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
            window.location.href = "/login";
            return null;
          })
          .finally(() => {
            refreshingPromise = null;
          });
      }

      token = await refreshingPromise;

      if (!token) {
        return Promise.reject(new Error("❌ accessToken 갱신 실패"));
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

  // ✅ 응답 인터셉터
  api.interceptors.response.use(
    (response) => {
      console.log("📥 [Response] 응답 성공:", response.config.url);
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      console.error(
        "❌ [Response Error]",
        error.response?.status,
        "on",
        originalRequest.url
      );

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== "/auth/refresh"
      ) {
        console.warn("🔁 access token 만료 → refresh 시도");
        originalRequest._retry = true;

        try {
          console.log("🔄 refresh 재시도 중...");
          const res = await api.post(
            "/auth/refresh",
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("✅ refresh 성공");

          const newToken = res.headers["authorization"]?.replace("Bearer ", "");
          console.log("🎟️ 새로운 accessToken:", newToken);

          if (!newToken)
            throw new Error("❌ access token 없음 (응답 인터셉터)");

          setAccessToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          console.log("📦 원래 요청 재시도:", originalRequest.url);

          return api(originalRequest);
        } catch (refreshErr) {
          console.error("🚫 refresh 실패 (response interceptor):", refreshErr);
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login";
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};