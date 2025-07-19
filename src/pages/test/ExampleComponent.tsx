import { createApiWithToken } from '@/api/axiosInstance';
import { useAccessToken } from '@/context/AccessTokenContext';
import { patchScheduleFeedback } from './patchScheduleFeedback';

const FeedbackTestButton = () => {
  const { accessToken, setAccessToken } = useAccessToken();

  const testPatchFeedback = async () => {
    const api = createApiWithToken(() => accessToken, setAccessToken);
    const scheduleId = "d3aee12f722d43c7be7cf1e5ac071f36"; // 임시 테스트용 ID
    const feedback = "나 빙수 먹고 싶어";

    try {
      const response = await patchScheduleFeedback(api, scheduleId, feedback);
      console.log("🎉 API 응답 성공:", response);
      alert("성공! 콘솔에서 응답 확인");
    } catch (error) {
      console.error("🚨 API 요청 실패:", error);
      alert("API 실패! 콘솔 확인");
    }
  };

  return <button onClick={testPatchFeedback}>피드백 PATCH 테스트</button>;
};

export default FeedbackTestButton;
