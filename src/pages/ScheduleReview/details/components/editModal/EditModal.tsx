// ReviewEditModal.tsx
import { useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import type { Review } from "@/types/review/review";
import ReviewFormView from '@/pages/ScheduleReview/form/view/ReviewFormView';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  reviewData: Review;
  setReviewData: (data: Review) => void;
  imageFiles: File[];
  setImageFiles: (files: File[]) => void;
  handleSubmit: (type: string, keyword?: string) => void;
}

const ReviewEditModal = ({
  isOpen,
  onClose,
  reviewData,
  setReviewData,
  imageFiles,
  setImageFiles,
  handleSubmit,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = () => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    handleResizeHeight();
  }, [reviewData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>리뷰 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ReviewFormView
            showModal={false} // 수정에서는 일정 모달 안 띄움
            setShowModal={() => {}}
            reviewData={reviewData}
            setReviewData={setReviewData}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            selectedSchedule={null} // 수정에서는 일정 선택 X
            savedSchedules={[]}
            handleSelectSchedule={() => {}}
            handleSubmit={() => {
              handleSubmit("REVIEW"); // 수정 API 호출
              onClose(); // 제출 후 모달 닫기
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => handleSubmit("REVIEW")}
          >
            저장
          </Button>
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewEditModal;
