import axios from "axios";
import { ScheduleResponse } from "./SavedSchedulePageModel";

const BASE_URL = "http://localhost:8000"; // ✅ 서버 주소 명시

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

export const CheckSavedSchedule = async (
  schedule_id: string
): Promise<ScheduleResponse> => {
  const res = await fetch(`/api/schedules/${schedule_id}`);
  if (!res.ok) throw new Error("Failed to fetch schedule");
  return res.json();
};
