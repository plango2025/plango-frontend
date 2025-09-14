// ReviewFormPresenter.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import { createApiWithToken } from "@/api/axiosInstance";
import {
  fetchSchedules,
  postReview,
  uploadImages,
} from "../model/ReviewFormModel";
import ReviewFormView from "../view/ReviewFormView";
import { useInfiniteQuery } from "@tanstack/react-query";

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
  const [showModal, setShowModal] = useState(true);

  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(() => accessToken, setAccessToken);
  const navigate = useNavigate();

  // URL 파라미터에서 type, keyword 가져오기
  const { type, keyword } = useParams<{ type: string; keyword?: string }>();

  // 보관함 일정 불러오기
  const { data } = useInfiniteQuery({
    initialPageParam: null,
    queryKey: ["savedSchedules"],
    queryFn: ({ pageParam }) => fetchSchedules({ pageParam }, api),
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
  });

  const savedSchedules = data?.pages.flatMap((page) => page.items) ?? [];
  console.log("저장된 일정들:", savedSchedules);

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
      .replace(/\s+/g, "_")
      .replace(/[^\w-]/g, "")
      .toLowerCase();
    const newFileName = `${safeName}${ext}`;
    return new File([file], newFileName, { type: file.type });
  };

  // 리뷰 제출
  const handleSubmit = async () => {
    try {
      // 필수 항목 체크
      if (
        type === "SCHEDULE" &&
        (!selectedSchedule ||
          !reviewData.content ||
          !reviewData.title ||
          reviewData.rating === 0)
      ) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      if (
        type === "PLACE" &&
        (!keyword || !reviewData.content || reviewData.rating === 0)
      ) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      // 이미지 업로드
      const file_urls = await uploadImages(api, imageFiles, renameFile);

      // 타입별 리뷰 등록
      if (type === "SCHEDULE") {
        await postReview(api, {
          type: "SCHEDULE",
          title: reviewData.title,
          rating: Number(reviewData.rating),
          content: reviewData.content,
          file_urls: file_urls,
          reference_id: String(selectedSchedule?.id),
        });
      } else if (type === "PLACE") {
        console.log(reviewData.title);
        await postReview(api, {
          title: reviewData.title,
          type: "PLACE",
          keyword: keyword,
          rating: Number(reviewData.rating),
          content: reviewData.content,
          file_urls: file_urls,
        });
      }

      alert("리뷰가 등록되었습니다.");
      navigate(-1);
    } catch (e: any) {
      console.error(e.response?.data || e);
      alert("리뷰 등록 실패");
    }
  };

  return (
    <ReviewFormView
      showModal={showModal}
      setShowModal={setShowModal}
      reviewData={reviewData}
      setReviewData={setReviewData}
      setImageFiles={setImageFiles}
      savedSchedules={savedSchedules}
      handleSelectSchedule={handleSelectSchedule}
      handleSubmit={handleSubmit}
      selectedSchedule={selectedSchedule}
            />
  );
};

export default ReviewFormPresenter;
