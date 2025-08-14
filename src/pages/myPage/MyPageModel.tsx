// models/UserModel.ts
export interface UserProfile {
  id: string;
  nickname: string;
  profile_image: string;
}
const BASE_URL = "http://localhost:8000"; // ✅ 서버 주소 명시

export async function fetchUserProfile(): Promise<UserProfile> {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("토큰이 없습니다.");

  const res = await fetch(`${BASE_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("서버 오류");
  return res.json();
}
