import { CustomAxiosRequestConfig } from '@/api/axiosInstance';
import axios from "axios";

const BASE_URL = "http://localhost:8000"; // ✅ 서버 주소 명시

export const sendScheduleFeedback = async (
  scheduleId: string,
  feedback: string,
  accessToken: string
) => {
 
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/schedules/${scheduleId}/feedback`, // ✅ 절대 경로로 수정
      { feedback },
      { requiresAuth: true } as CustomAxiosRequestConfig
    );

    return response.data;
  } catch (error) {
    console.error("피드백 전송 실패:", error);
    throw error;
  }
};

export const pinPlaces = async (
  scheduleId: string,
  places: string[],
  accessToken: string
) => {
  const url = `${BASE_URL}/api/schedules/${scheduleId}/places/pin`;
  const body = { places };

  try {
    const response = await axios.patch(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("핀 저장 오류", error);
    throw error;
  }
};