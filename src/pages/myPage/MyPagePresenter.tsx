import React, { useEffect, useState } from "react";
import MyPageView from "./MyPageView";
import { UserProfile, useUserApi } from "./MyPageModel";

export const MyPagePresenter: React.FC = () => {
  const { fetchUserProfile } = useUserApi();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const profile = await fetchUserProfile();
        setUser(profile);
      } catch (err: any) {
        console.error("프로필 조회 실패:", err);
        setError(err.message || "사용자 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return <MyPageView user={user} loading={loading} error={error} />;
};

export default MyPagePresenter;
