import { Place, ScheduleInfo } from ".././schedulePreview/SchedulePreview.style";
import { HStack, Separator, Text } from "@chakra-ui/react";
import type { ScheduleData } from "../../types/types"; // 위치에 따라 경로 수정

interface Props {
  scheduleData?: ScheduleData;
}

const SchedulePreview = ({ scheduleData }: Props) => {
  return (
    <ScheduleInfo>
      <h1>
        {scheduleData ? scheduleData.title : "일정 제목을 불러오는 중..."}
      </h1>

      {scheduleData?.days.map((dayItem) => (
        <div key={dayItem.day}>
          <HStack>
            <Text flexShrink="0" pl={"1rem"} pb={"1rem"}>
              ✅ {dayItem.day}일차
            </Text>
            <Separator flex="1" />
          </HStack>
          {dayItem.places.map((place) => (
            <div key={place.order}>
              <Place>
                {place.order}.{place.name} : {place.description}
              </Place>
            </div>
          ))}
        </div>
      ))}
    </ScheduleInfo>
  );
};

export default SchedulePreview;
