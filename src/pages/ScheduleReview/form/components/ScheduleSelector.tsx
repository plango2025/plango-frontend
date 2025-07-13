import { scheduleCardMocks } from "@/mocks/reviews";
import ScheduleCard from "./ScheduleCard";
import {
  ChooseSchedule,
  ScheduleList,
  SelectScheduleWrapper,
} from "../view/ReviewForm.style";

const ScheduleSelector = ({ setShowModal, selected, handleSelectSchedule }) => {
  return (
    <SelectScheduleWrapper>
      <ChooseSchedule>리뷰를 작성할 일정을 골라주세요</ChooseSchedule>
      <ScheduleList>
        {scheduleCardMocks.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            {...schedule}
            onhandleSelect={() => handleSelectSchedule(schedule)}
          />
        ))}
      </ScheduleList>
    </SelectScheduleWrapper>
  );
};

export default ScheduleSelector;
