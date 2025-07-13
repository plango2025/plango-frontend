import { Box, Text } from '@chakra-ui/react';
import { ExternalLink } from './BasicInfo.styles';
import { Greyspan } from '../detailedInfo/DetailedInfo.styles';
import { InfoItem, InfoList } from '../infolist/Infolist';

// interface  BasicInfoProps  {
//     address: string;
//     tel: string;
//     homepage:string;


// }
const BasicInfo = ({ address, tel, homepage }) => {
  const url = homepage?.match(/href="(.*?)"/)?.[1] || "";

  return (
    <Box p={"3rem"} bg={"#FFFFFF"} mb={6} borderRadius="md">
      <Text fontSize="1.5rem" fontWeight="bold" mb={3}>
        기본 정보
      </Text>
      <InfoList>
        <InfoItem>
          📍 주소: <Greyspan>{address}</Greyspan>
        </InfoItem>
        {tel && (
          <InfoItem>
            ☎️ 연락처:<Greyspan>{tel}</Greyspan>
          </InfoItem>
        )}
        {url && (
          <InfoItem>
            🌐 홈페이지:{" "}
            <ExternalLink href={url} target="_blank" rel="noopener noreferrer">
              <Greyspan>{url}</Greyspan>
            </ExternalLink>
          </InfoItem>
        )}
      </InfoList>
    </Box>
  );
};

export default BasicInfo;
