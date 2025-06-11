import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
//  📢커스텀 Axios 인스턴스
// - access token 자동 첨부 (requiresAuth: true일 때)
// - access token 만료 시 refresh token으로 재발급 시도
// - 재발급 성공 시 원래 요청 재시도
// - 재발급 실패 시 로그인 페이지로 이동

// ✅ 커스텀 타입 확장 
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean; //요청에 인증이 필요한 지 여부 (false면 Authorization 헤더 안 붙임임)
  _retry?: boolean; // 401 재요청 방지용 플래그
}
//토큰을 받아서 axios 인스턴스를 반환하는 함수
export const createApiWithToken = (
  accessToken: string | null,
  setAccessToken: (token: string) => void
) => {
  const api = axios.create({
    baseURL: "/api",
    withCredentials: true, // ✅ refresh_token 쿠키 자동 포함
  });

  // ✅ __요청 인터셉터 : access token 필요할 때만 Authorization 헤더 추가
  api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
    const needsAuth = config.requiresAuth === true;
    //requiresAuth: true이면 Authorization 헤더 추가
    //예를 들어 마이페이지, 찜 목록 등등 (반대로 로그인, 회원가입, 토큰재발급 요청에는 안붙임임)
    if (needsAuth && accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  // ✅ __응답 인터셉터 :access token 만료 시 → refresh + 실패한 요청 재시도
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      //access token 만료된 경우(401)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        //originalRequest._retry: access token을 재발급받았는데도 401이 또 나올 수 있는 상황이 발생하는 것을 방지

        //refreshToken으로 accessTOken 받음
        try {
          const res = await axios.post(
            "/api/auth/refresh",
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                // ❌ Authorization 절대 넣지 말기
              },
            }
          );
          const newToken = res.headers["authorization"]?.replace("Bearer ", "");
          if (!newToken) throw new Error("access token 없음");

          setAccessToken(newToken);

          // ✅ 실패했던 요청에 새 토큰 붙여서 재시도
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest); //axios(originalRequest) 사용하면 baseURL없이 로우 요청이 들어갈 수 있음
        } catch (refreshErr) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login"; // 재발급 실패 시 로그인 페이지로 이동
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(error);
    }
  );

  return api; // 위의 기능이 다 들어있는 커스텀 axios 
};
