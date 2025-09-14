// api.ts
import axios from "axios";
import { TravelPlan } from "./StepPagesModel"; // 인터페이스가 정의된 곳으로 경로 맞춰줘
const BASE_URL = "http://localhost:8000"; // 여기에 서버 주소

// TravelPlan 보내기 (POST)
export const sendTravelPlan = async (plan: Partial<TravelPlan>) => {
  console.log("서버에 보내는 계획:", plan);
  const response = await axios.post(`${BASE_URL}/api/schedules`, plan);
  console.log("서버 응답:", response.data);
  return response.data;
};

// Feedback 보내기 (PATCH)
export const sendScheduleFeedback = async (
  scheduleId: string | number,
  feedback: string,
  accessToken: string
) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/schedules/${scheduleId}/feedback`,
      { feedback },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("피드백 전송 결과:", response.data);
    return response.data;
  } catch (error) {
    console.error("피드백 전송 실패:", error);
    throw error;
  }
};

// TravelPlan 받아오기 (GET)
// export const getTravelPlan = async (id: string): Promise<ScheduleResponse> => {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/schedules/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("API 호출 실패:", error);
//     throw error;
//   }
// };
