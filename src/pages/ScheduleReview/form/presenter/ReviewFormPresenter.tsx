// ReviewFormPresenter.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import {
  createDummySchedule,
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
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [savedSchedules, setSavedSchedules] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const navigate = useNavigate();
  const handleCreateDummy = async () => {
    try {
      const dummy = await createDummySchedule(api);
      const dummyScheduleId = dummy.schedule_id;
      setSelectedSchedule({
        id: dummyScheduleId,
        reviewtitle: `일정 임시 제목(id 동일) ${dummyScheduleId}`,
      });
      setShowModal(false);
      // 다시 불러와서 셀렉터에 반영되게
    } catch (e) {
      console.error(e.response?.data);
      alert("더미 일정 생성 실패");
    }
  };

  //보관함에 있는 일정 가져오는 함수
  const loadSchedules = async () => {
    try {
      const data = await fetchSavedSchedules(api);
      setSavedSchedules(data);
      console.dir(data)
    } catch (e) {
      console.error(e?.response?.data);
      alert("일정 등록 실패");
    }
  };
  useEffect(() => {
    loadSchedules();
  }, []);

  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule({
      id: schedule.schedule_id,
      reviewtitle: schedule.title,
    });
    setShowModal(false);
  };


  const renameFile = (file: File): File => {
    const ext = file.name.substring(file.name.lastIndexOf("."));
    const baseName = file.name.substring(0, file.name.lastIndexOf("."));

    const safeName = baseName
      .replace(/\s+/g, "_") // 공백 → 언더스코어
      .replace(/[^\w\-]/g, "") // 특수문자, 한글 제거
      .toLowerCase();

    const newFileName = `${safeName}${ext}`;
    return new File([file], newFileName, { type: file.type });
  };
  //폼 제출
  const handleSubmit = async () => {
    const { title, content, rating } = reviewData;
    if (!title || !content || rating === 0 || !selectedSchedule) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      const file_urls = await uploadImages(api, imageFiles, renameFile);
      console.log(selectedSchedule.id)
      await postReview(api, {
        title: reviewData.title,
        rating: Number(reviewData.rating),
        content: reviewData.content,
        file_urls: file_urls,
        type: "SCHEDULE",
        reference_id: String(selectedSchedule.id),
      });
      alert("리뷰가 등록되었습니다.");
      navigate("/schdReviews");
    } catch (e) {
      console.error(e.response?.data);
      alert("리뷰 등록 실패");
    }
  };

  return (
    <ReviewFormView
      handleCreateDummy={handleCreateDummy}
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
