import React, { createContext, useContext, useState, useEffect } from "react";
import { createApiWithToken } from "@/api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

type UserProfile = {
  id: string;
  profile_image: string;
  nickname: string;
};

interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoggedIn: boolean;
  api: ReturnType<typeof createApiWithToken>;
  logout: () => Promise<void>;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
  undefined
);

export const AccessTokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const isLoggedIn = !!accessToken;

  // API 인스턴스 생성
  const api = createApiWithToken(
    () => accessToken,
    (token) => {
      setAccessToken(token);
    }
  );

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        const newToken = res.headers["authorization"]?.replace("Bearer ", "");

        if (newToken) {
          setAccessToken(newToken);
          const profileRes = await api.get("/users/me/profile", {
            requiresAuth: true,
          });
          setUser(profileRes.data);
        } else {
          console.warn("❌ refresh로도 accessToken 없음");
          setAccessToken(null);
          toast("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        }
      } catch (e) {
        console.error("🚫 자동 로그인 실패", e);
        setAccessToken(null);
      }
    };

    init();
  }, []);

  // 로그아웃
  const logout = async () => {
    api.post("/auth/logout", {}, { requiresAuth: true })
    .then(() => {
      console.log("일반 로그아웃 성공");
      setAccessToken(null);
      api.get("/oauth/kakao/logout", {}, { requiresAuth: false })
      .then((result) => {
        const logout_url = result.data.logout_redirect_uri;
        window.location.href = logout_url;
      });
    });
  };


  return (
    <AccessTokenContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isLoggedIn,
        api,
        logout,
        user,
        setUser,
      }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context)
    throw new Error(
      "useAccessToken must be used within an AccessTokenProvider"
    );
  return context;
};
