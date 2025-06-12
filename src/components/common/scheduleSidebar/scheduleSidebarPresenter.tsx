import { ScheduleResponse } from "@/pages/ScheduleCreationPage/scheduleCreationFeatures/Stepper/StepperPages/StepPagesModel";
import { StepItem } from "./scheduleSidebar";

export const scheduleSidebarPresenter = (schedule: ScheduleResponse["schedule"]): StepItem[] => {
  return schedule.days.flatMap((day) =>
    day.places.map((place) => ({
      title: `Day ${day.day} - ${place.name}`,
      description: place.description,
      imageUrl: place.image || "https://via.placeholder.com/100?text=No+Image",
      imageAlt: place.name,
    }))
  );
};
