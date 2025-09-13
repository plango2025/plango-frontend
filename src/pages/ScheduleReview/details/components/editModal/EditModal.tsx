// EditReviewModal.tsx
import React, { useEffect, useRef, useState } from "react";
import { Button as CkButton, HStack, Input } from "@chakra-ui/react";
import { RatingGroup } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";
import { createPortal } from "react-dom";

import {
  FormContainer,
  SidePadding,
  SelectedScheduleTitle,
  TextBox,
  Rating,
  Button as StyledIconButton,
} from "./ReviewForm.style";
import ScheduleSelector from "../components/ScheduleSelector";
import ImageUploader from "../components/ImageUploader";
import { AutoCenter } from "@/components/common/align/AutoCenter";
import { PaddingMd } from "@/components/common/padding/padding";

type ReviewType = "PLACE" | "SCHEDULE";

export type EditReviewPayload = {
  title: string;
  content: string;
  rating: number;
  type: ReviewType;
  keyword?: string | null;
  scheduleId?: string;
  imageFiles: File[];
};

type SavedSchedule = {
  id: string;
  reviewtitle: string;
  [k: string]: unknown;
};

type InitialReview = {
  id: string | number;
  type: ReviewType;
  title: string;
  content: string;
  rating: number;
  keyword?: string | null;
  scheduleId?: string;
  file_urls?: string[];
};

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReview: InitialReview;
  savedSchedules?: SavedSchedule[];
  onSubmit: (payload: EditReviewPayload) => Promise<void> | void;
  isSubmitting?: boolean;
}

/** -------- 커스텀 모달 내부 유틸 -------- */
const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
};

const ModalPortal= ({ children }) => {
  const target =
    document.getElementById("modal-root") ??
    (() => {
      const el = document.createElement("div");
      el.id = "modal-root";
      document.body.appendChild(el);
      return el;
    })();
  return createPortal(children, target);
};

const Overlay = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) => {
  // ESC 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
      onClick={onClose} // 백드롭 클릭 닫기
    >
      <div
        style={{
          width: "min(720px, 100%)",
          maxHeight: "90vh",
          overflow: "auto",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.12), 0 6px 6px rgba(0,0,0,0.16)",
        }}
        onClick={(e) => e.stopPropagation()} // 콘텐츠 클릭은 버블 막기
      >
        {children}
      </div>
    </div>
  );
};

/** -------- 실제 수정 모달 -------- */
const EditModal = ({
  isOpen,
  onClose,
  initialReview,
  savedSchedules = [],
  onSubmit,
  isSubmitting = false,
}:EditReviewModalProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);

  const [form, setForm] = useState({
    title: initialReview.title ?? "",
    content: initialReview.content ?? "",
    rating: initialReview.rating ?? 0,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<
    SavedSchedule | undefined
  >(() => {
    if (initialReview.type !== "SCHEDULE" || !initialReview.scheduleId)
      return undefined;
    return savedSchedules.find((s) => s.id === initialReview.scheduleId);
  });

  const isSchedule = initialReview.type === "SCHEDULE";
  const isPlace = initialReview.type === "PLACE";

  const resizeTextArea = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  };

  useEffect(() => {
    if (!isOpen) return;
    setForm({
      title: initialReview.title ?? "",
      content: initialReview.content ?? "",
      rating: initialReview.rating ?? 0,
    });
    setImageFiles([]);
    if (isSchedule) {
      setSelectedSchedule(
        initialReview.scheduleId
          ? savedSchedules.find((s) => s.id === initialReview.scheduleId)
          : undefined
      );
    }
    setTimeout(resizeTextArea, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    resizeTextArea();
  }, [form.content]);

  const handleSelectSchedule = (s: SavedSchedule) => {
    setSelectedSchedule(s);
    setShowSchedulePicker(false);
  };

  const onSave = async () => {
    const payload: EditReviewPayload = {
      title: form.title,
      content: form.content,
      rating: form.rating,
      type: initialReview.type,
      keyword: isPlace ? initialReview.keyword ?? form.title : undefined,
      scheduleId: isSchedule ? selectedSchedule?.id : undefined,
      imageFiles,
    };
    await onSubmit(payload);
    onClose();
  };

  // 스크롤 락
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <Overlay onClose={onClose}>
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #eee",
            position: "sticky",
            top: 0,
            background: "white",
            zIndex: 1,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
            리뷰 수정
          </h3>
          <button
            onClick={onClose}
            aria-label="닫기"
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
            }}
            title="닫기"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 20px" }}>
          <FormContainer>
            {isSchedule && showSchedulePicker && (
              <ScheduleSelector
                savedSchedules={savedSchedules}
                handleSelectSchedule={handleSelectSchedule}
              />
            )}

            <SidePadding>
              {isSchedule && !showSchedulePicker && selectedSchedule && (
                <SelectedScheduleTitle>
                  <StyledIconButton onClick={() => setShowSchedulePicker(true)}>
                    <FaExchangeAlt />
                  </StyledIconButton>
                  {selectedSchedule.reviewtitle}
                </SelectedScheduleTitle>
              )}

              {/* 제목 */}
              <Input
                mt={3}
                value={
                  isPlace ? initialReview.keyword ?? form.title : form.title
                }
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="제목을 입력하세요"
              />

              {/* 이미지 업로더 */}
              <AutoCenter>
                <ImageUploader files={imageFiles} onChange={setImageFiles} />
              </AutoCenter>

              {/* 별점 */}
              <Rating>
                <RatingGroup.Root
                  value={form.rating}
                  onValueChange={(e) =>
                    setForm((p) => ({ ...p, rating: e.value ?? 0 }))
                  }
                  count={5}
                >
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>
              </Rating>

              <PaddingMd />

              {/* 내용 */}
              <TextBox
                ref={textareaRef}
                rows={1}
                value={form.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                placeholder="리뷰를 작성해주세요."
              />
            </SidePadding>
          </FormContainer>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #eee",
            position: "sticky",
            bottom: 0,
            background: "white",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <HStack spacing={3} justify="flex-end">
            <CkButton variant="ghost" onClick={onClose}>
              취소
            </CkButton>
            <CkButton
              colorScheme="teal"
              onClick={onSave}
              isLoading={isSubmitting}
              isDisabled={isSchedule && !selectedSchedule}
            >
              수정 완료
            </CkButton>
          </HStack>
        </div>
      </Overlay>
    </ModalPortal>
  );
};

export default EditModal;
