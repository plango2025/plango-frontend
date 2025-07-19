import ScheduleCard from "./ScheduleCard";
import { FaCalendarCheck } from "react-icons/fa";

import {
  ChooseSchedule,
  ScheduleList,
  SelectScheduleWrapper,
} from "../view/ReviewForm.style";

const ScheduleSelector = ({
  savedSchedules,
  handleSelectSchedule,
}) => {        
  console.dir(savedSchedules)

  return (
    <SelectScheduleWrapper>
      <ChooseSchedule><FaCalendarCheck />리뷰를 작성할 일정을 골라주세요</ChooseSchedule>
      <ScheduleList>
        {savedSchedules.map((schedule) => (
          
          <ScheduleCard
            key={schedule.schedule_id}
            {...schedule}
            onhandleSelect={() => handleSelectSchedule(schedule)}
          />
        ))}
      </ScheduleList>
    </SelectScheduleWrapper>
  );
};

export default ScheduleSelector;
