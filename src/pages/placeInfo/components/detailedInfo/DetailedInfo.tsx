import React from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import { introInfoLabelsMap, LabelItem } from '../../constants/intro_info_labels';

interface IntroInfoProps {
  chkbabycarriage?: string;
  chkcreditcard?: string;
  chkpet?: string;
  parking?: string;
  usetime?: string;
  restdate?: string;
  infocenter?: string;
}

const DetailedInfo = ({contentTypeId, introData}) => {
  // console.log(introInfoLabelsMap[contentTypeId])
  const labelList: LabelItem[] = introInfoLabelsMap[contentTypeId] || [];

  console.log(introData)
  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold" mb={3}>
        상세 정보
      </Text>
      <Stack >
        {labelList.map(({key, label, icon})=>{
          const value = introData[key]
          return value ? (
            <div key={key}>
              {icon} <strong>{label}</strong>:{" "}
              <span dangerouslySetInnerHTML={{ __html: value }} />{" "}
            </div>
          ) : null;

        })}
        {/* {chkbabycarriage && <Text>🍼 유모차 대여: {chkbabycarriage}</Text>}
        {chkcreditcard && <Text>💳 카드 결제: {chkcreditcard}</Text>}
        {chkpet && <Text>🐶 반려동물 동반: {chkpet}</Text>}
        {parking && <Text>🅿️ 주차: {parking}</Text>}
        {usetime && (
          <Text
            dangerouslySetInnerHTML={{ __html: `🕘 운영시간: ${usetime}` }}
          />
        )}
        {restdate && (
          <Text
            dangerouslySetInnerHTML={{ __html: `📅 휴무일: ${restdate}` }}
          />
        )}
        {infocenter && <Text>📞 안내 전화: {infocenter}</Text>} */}
      </Stack>
    </Box>
  );
};

export default DetailedInfo;
