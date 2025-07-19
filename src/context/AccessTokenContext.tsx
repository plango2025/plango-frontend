// AccessTokenContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(undefined);

export const AccessTokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken") // ⬅️ localStorage에서 초기값을 가져오도록
  );

  // accessToken이 바뀔 때마다 로컬스토리지에 저장
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = () => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error("useAccessToken must be used within an AccessTokenProvider");
  }
  return context;
};
