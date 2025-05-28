import axios from "axios";

export const requestKakaoLoginUrl = async (): Promise<string> => {
  const res = await axios.get("/api/oauth/kakao/login", {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
