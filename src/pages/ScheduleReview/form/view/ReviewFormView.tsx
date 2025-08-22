// ReviewFormView.tsx
import { FaExchangeAlt } from "react-icons/fa";
import { GridItem, RatingGroup } from "@chakra-ui/react";
import AppLayout from "@/layout/AppLayout";

import {
  Rating,
  // TextBox,
  SidePadding,
  BackGround,
  Bottom,
  FormContainer,
  SubmitBtn,
  Button,
  SelectedScheduleTitle,
  TextBox,
} from "./ReviewForm.style";
import ScheduleSelector from "../components/ScheduleSelector";
import ImageUploader from "../components/ImageUploader";
import { AutoCenter } from "./../../../../components/common/align/AutoCenter";
import { PaddingMd } from "./../../../../components/common/padding/padding";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ReviewFormView = ({
  showModal,
  setShowModal,
  reviewData,
  setReviewData,
  imageFiles,
  setImageFiles,
  selectedSchedule,
  savedSchedules,
  handleSelectSchedule,
  handleSubmit,
}) => {
  const textareaRef = useRef(null);
  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
console.log(reviewData);
const { type, keyword } = useParams();

useEffect(() => {
  handleResizeHeight();
  if (type === "PLACE") {
    setReviewData((prev) => ({
      ...prev,
      title: keyword,
    }));
  }
}, [type, keyword]);
  const param = useParams();

  console.log(type, keyword);
  return (
    <BackGround>
      <AppLayout>
        <GridItem colSpan={12}>
          <Bottom>
            <SubmitBtn onClick={() => handleSubmit(type, keyword)}>등록하기</SubmitBtn>
          </Bottom>

          <FormContainer>
            {/* 타입이 SCHEDULE일 때 */}

            {type === "SCHEDULE" && showModal && (
              <ScheduleSelector
                savedSchedules={savedSchedules}
                handleSelectSchedule={handleSelectSchedule}
              />
            )}
            <SidePadding>
              {/* 타입이 SCHEDULE일 때 */}
              {type === "SCHEDULE" && !showModal && savedSchedules && (
                <SelectedScheduleTitle>
                  <Button onClick={() => setShowModal(true)}>
                    <FaExchangeAlt />
                  </Button>
                  {selectedSchedule.reviewtitle}
                </SelectedScheduleTitle>
              )}
            </SidePadding>
            <SidePadding>
             
              <input
                type="text"
                value={type === "PLACE" ? keyword : reviewData.title}
                onChange={(e) =>
                  setReviewData({ ...reviewData, title: e.target.value })
                }
                placeholder="제목을 입력하세요"
              />
              <AutoCenter>
                <ImageUploader files={imageFiles} onChange={setImageFiles} />
              </AutoCenter>
              <Rating>
                <RatingGroup.Root
                  value={reviewData.rating}
                  onValueChange={(e) =>
                    setReviewData({ ...reviewData, rating: e.value ?? 0 })
                  }
                  count={5}
                >
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>
              </Rating>
              <PaddingMd />
              <TextBox
                ref={textareaRef}
                rows={1}
                value={reviewData.content}
                onChange={(e) => {
                  setReviewData({ ...reviewData, content: e.target.value });
                  handleResizeHeight();
                }}
                placeholder="리뷰를 작성해주세요."
              />
            </SidePadding>
          </FormContainer>
        </GridItem>
      </AppLayout>
    </BackGround>
  );
};

export default ReviewFormView;
