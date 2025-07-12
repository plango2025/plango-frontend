import { ScheduleResponse } from "@/pages/ScheduleCreationPage/scheduleCreationFeatures/Stepper/StepperPages/StepPagesModel";
import { StepItem } from "./scheduleSidebar";

// schedule_id도 같이 받도록 수정
export const scheduleSidebarModel = (
  scheduleResponse: ScheduleResponse
): StepItem[] => {
  return scheduleResponse.schedule.days.flatMap((day) =>
    day.places.map((place) => ({
      id: scheduleResponse.schedule_id, // schedule_id를 id로 사용
      name: place.name,
      title: place.name,
      dayname: `Day ${day.day} - ${place.name}`,
      description: place.description,
      imageUrl:
        place.image ||
        "https://cdn.crowdpic.net/list-thumb/thumb_l_D623AE308211C3678E61EC0E3FF3C969.jpg",
      imageAlt: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
    }))
  );
};
