// ReviewFormPresenter.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import {
  fetchSavedSchedules,
  postReview,
  uploadImages,
} from "../model/ReviewFormModel";
import ReviewFormView from "../view/ReviewFormView";
interface Schedule {
  id: number;
  reviewtitle: string;
}
const ReviewFormPresenter = () => {
  const [reviewData, setReviewData] = useState({
    title: "",
    rating: 0,
    content: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>({
    id: 0,
    reviewtitle: "",
  });
  const [savedSchedules, setSavedSchedules] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedSchedules(api).then(setSavedSchedules);
  }, []);

  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule({ id: schedule.id, reviewtitle: schedule.title });
    setShowModal(false); 
  };

  const handleSubmit = async () => {
    const { title, content, rating } = reviewData;
    console.log(title);
    if (!title || !content || rating === 0) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      const file_urls = await uploadImages(api, imageFiles);
      
      await postReview(api, {
        
        title: reviewData.title,
        rating: Number(reviewData.rating),
        content: reviewData.content,
        file_urls,
        type: "SCHEDULE",
        reference_id: String(selectedSchedule.id),
      });
      alert("리뷰가 등록되었습니다.");
    //   navigate("/schdReviews");
    } catch (e) {
      console.error(e.response?.data);
      alert("리뷰 등록 실패" );
    }
  };

  return (
    <ReviewFormView
      showModal={showModal}
      setShowModal={setShowModal}
      reviewData={reviewData}
      setReviewData={setReviewData}
      imageFiles={imageFiles}
      setImageFiles={setImageFiles}
      selectedSchedule={selectedSchedule}
      savedSchedules={savedSchedules}
      handleSelectSchedule={handleSelectSchedule}
      handleSubmit={handleSubmit}
    />
  );
};

export default ReviewFormPresenter;
