import axios from "axios";

export const sendScheduleFeedback = async (
  scheduleId: string,
  feedback: string,
  accessToken: string
) => {
  try {
    const response = await axios.post(
      `/api/schedules/${scheduleId}/feedback`,
      { feedback },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("피드백 전송 실패:", error);
    throw error; // 호출한 곳에서 예외 처리하도록 throw
  }
};