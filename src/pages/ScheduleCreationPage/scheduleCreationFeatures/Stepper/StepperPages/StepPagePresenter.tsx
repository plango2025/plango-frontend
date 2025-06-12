// api.ts
import axios from 'axios';
import { TravelPlan } from './StepPagesModel'; // 인터페이스가 정의된 곳으로 경로 맞춰줘
import { ScheduleResponse } from './StepPagesModel'; // 혹은 분리된 타입 경로로 수정

const BASE_URL = 'http://13.238.28.77:8080'; // 여기에 서버 주소

// TravelPlan 보내기 (POST)
export const sendTravelPlan =  async (plan: Partial<TravelPlan>) => {
  const response = await axios.post(`${BASE_URL}/api/schedules`, plan);
  return response.data;
};

// TravelPlan 받아오기 (GET)
export const getTravelPlan = async (id: string): Promise<ScheduleResponse> => {
  const response = await axios.get(`${BASE_URL}/api/schedules/${id}`);
  return response.data;
};