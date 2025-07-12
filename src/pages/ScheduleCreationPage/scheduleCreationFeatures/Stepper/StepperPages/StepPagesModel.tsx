export interface Place {
  name: string;
  address: string;
}

export interface TravelPlan {
  required_place: Place[];
  destination: string;
  duration: number | null;
  companion: string;
  style: string;
  schedule_count: number | null;
  budget: number; // 단위: 만원
  extra?: string;
}

// 타입 정의
export interface SchedulePlace {
  order: number;
  name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
}

export interface DaySchedule {
  day: number;
  places: SchedulePlace[];
}

export interface Schedule {
  title: string;
  days: DaySchedule[];
}

export interface ScheduleResponse {
  schedule_id: string;
  schedule: Schedule;
}
