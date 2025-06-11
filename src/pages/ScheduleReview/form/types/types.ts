export interface Place {
  order: number;
  name: string;
  description: string;
  image: string | null;
}

export interface DaySchedule {
  day: number;
  places: Place[];
}

export interface ScheduleData {
  title: string;
  days: DaySchedule[];
}
