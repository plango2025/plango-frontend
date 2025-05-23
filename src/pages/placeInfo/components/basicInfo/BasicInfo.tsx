import { Container } from '@chakra-ui/react';
import { InfoItem, InfoList, Title, ExternalLink } from './BasicInfo.styles';

interface  BasicInfoProps  {
    address: string;
    tel: string;
    homepage:string;


}
const BasicInfo = ({ address, tel, homepage }: BasicInfoProps) => {
  const url = homepage?.match(/href="(.*?)"/)?.[1] || "";

  return (
    <Container>
      <Title>기본 정보</Title>
      <InfoList>
        <InfoItem>📍 주소: {address}</InfoItem>
        {tel && <InfoItem>☎️ 연락처: {tel}</InfoItem>}
        {url && (
          <InfoItem>
            🌐 홈페이지:{" "}
            <ExternalLink href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </ExternalLink>
          </InfoItem>
        )}
      </InfoList>
    </Container>
  );
};

export default BasicInfo;
