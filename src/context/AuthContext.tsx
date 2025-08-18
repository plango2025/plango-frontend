import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import { createContext, useState } from "react";
type UserProfile = {
  id: string;
  nickname: string;
  profile_image: string;
};

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const fetchUserProfile = async () => {

  const res = await api.get("/users/me/profile", { requiresAuth: true });
  console.dir(res.request.status);
  if (res.request.status === 200) {
    setUser(res.data);
    setIsLoggedIn(true);
  }else{
    setIsLoggedIn(false);
    setUser(null);
  }
  return res;
};
  const refreshUser = () => {
    fetchUserProfile();
    console.log("유저 정보 새로고침");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, refreshUser}}>
      {children}
    </AuthContext.Provider>
  );
};
