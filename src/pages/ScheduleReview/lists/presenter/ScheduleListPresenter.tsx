// ScheduleListPresenter.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import { fetchReviews, createDummySchedule } from ".././model/ScheduleListModel";
import ScheduleListView from ".././view/ScheduleListView";

const ScheduleListPresenter = () => {
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const [keyword, setKeyword] = useState("");
  const [schdReviews, setScheduleReviews] = useState([]);
  const navigate = useNavigate();

  const loadReviews = async (searchKeyword = "") => {
    try {
      const data = await fetchReviews(api,searchKeyword);
      setScheduleReviews(data);
    } catch (error) {
      console.error("API 호출 오류", error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <ScheduleListView
      keyword={keyword}
      setKeyword={setKeyword}
      handleSearch={() => loadReviews(keyword)}
      navigateToNewReview={() => navigate("/schdReviews/new")}
      handleCreateDummy={async () => {
        try {
          await createDummySchedule(api);
          await loadReviews();
        } catch (error) {
          console.error("임시 리뷰 생성 실패:", error);
          alert("에러가 발생했습니다.");
        }
      }}
      navigateToLogin={() => navigate("/login")}
      schdReviews={schdReviews}
    />
  );
};

export default ScheduleListPresenter;
