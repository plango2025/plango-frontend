// ReviewFormView.tsx
import { FaExchangeAlt } from "react-icons/fa";
import { GridItem, Textarea, RatingGroup } from "@chakra-ui/react";
import AppLayout from "@/layout/AppLayout";

import {
  SidePadding,
  BackGround,
  Bottom,
  FormContainer,
  SubmitBtn,
  Button,
  SelectedScheduleTitle,
} from "./ReviewForm.style";
import ScheduleSelector from "../components/ScheduleSelector";
import ImageUploader from "../components/ImageUploader";
import { AutoCenter } from "./../../../../components/common/align/AutoCenter";

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
    console.dir(reviewData)
  return (
    <BackGround>
      <AppLayout>
        <GridItem colSpan={12}>
          <Bottom>
            <SubmitBtn onClick={handleSubmit}>등록하기</SubmitBtn>
          </Bottom>

          <FormContainer>
            {showModal && (
              <ScheduleSelector
                setShowModal={setShowModal}
                selected={selectedSchedule}
                schedules={savedSchedules}
                handleSelectSchedule={handleSelectSchedule}
              />
            )}

            <SidePadding>
              {!showModal && (
                <SelectedScheduleTitle>
                  <Button onClick={()=>setShowModal(true)}>
                    <FaExchangeAlt />
                  </Button>
                  {selectedSchedule.reviewtitle}
                </SelectedScheduleTitle>
              )}

              <input
                type="text"
                value={reviewData.title}
                onChange={(e) =>
                  setReviewData({ ...reviewData, title: e.target.value })
                }
                placeholder="제목을 입력하세요"
              />
              <AutoCenter>
                <ImageUploader files={imageFiles} onChange={setImageFiles} />
              </AutoCenter>
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
              <Textarea
                value={reviewData.content}
                onChange={(e) =>
                  setReviewData({ ...reviewData, content: e.target.value })
                }
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
