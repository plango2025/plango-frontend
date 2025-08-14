import React, { useEffect, useState } from "react";
import { fetchUserProfile, UserProfile } from "./MyPageModel";
import MyPageView from "./MyPageView";

export const UserProfilePresenter: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile()
      .then(setUser)
      .catch(() => setError("사용자 정보를 불러올 수 없습니다."))
      .finally(() => setLoading(false));
  }, []);

  return <MyPageView user={user} loading={loading} error={error} />;
};
