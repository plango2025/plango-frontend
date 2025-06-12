import { useState } from "react";
import CommentList from '@/pages/ScheduleReview/details/components/CommentList'; // 기존 댓글 리스트 컴포넌트 재사용
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";

import { CommentSubmitBtn } from './../../pages/ScheduleReview/details/view/ReviewDetailPage.style';
 import { createApiWithToken,
  CustomAxiosRequestConfig,
} from "@/api/axiosInstance";

const CommentSection = ({
  targetId,
  targetType,
  initialComments,
  currentUser,
}) => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useAccessToken();
  const api = createApiWithToken(accessToken, setAccessToken);

  const [comments, setComments] = useState(initialComments || []);
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = async () => {
    try {
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      if (!commentContent.trim()) {
        alert("댓글을 입력해주세요.");
        return;
      }

      const res = await api.post(
        "/comments",
        {
          target_id: targetId,
          target_type: targetType,
          content: commentContent,
        },
        {
          requiresAuth: true,
        } as CustomAxiosRequestConfig
      );

      const newComment = {
        ...res.data,
        user_nickname: currentUser?.nickname ?? "알 수 없음",
        user_avatar: currentUser?.profile_image ?? "",
      };

      setComments([...comments, newComment]);
      setCommentContent("");
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div>
      <input
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        type="text"
        placeholder="댓글을 입력하세요"
      />
      <CommentSubmitBtn onClick={handleSubmit}>댓글 등록</CommentSubmitBtn>
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
