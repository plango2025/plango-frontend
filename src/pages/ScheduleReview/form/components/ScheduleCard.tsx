import styled from "styled-components";
const CardWrapper = styled.div`
min-width:400px;
  cursor: pointer;
  background-color: #ffffff;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  min-height: 300px;
  box-shadow: 3px 3px 3px 3px #969696;
`;
const Image = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;
const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  padding-top: 10px;
`;
const Info = styled.div``;
const P = styled.p``;
export interface ScheduleCardProps {
  id: number;
  imgUrl: string;
  title: string;
  destination: string;
  duration: string;
  companion: string;
  onhandleSelect: (value: string) => void;
}
const ScheduleCard = ({
  id,
  imgUrl,
  title,
  destination,
  duration,
  companion,
  onhandleSelect,
}: ScheduleCardProps) => {
  return (
    <CardWrapper onClick={() => onhandleSelect(title)}>
      <Image src={imgUrl}></Image>
      <InfoWrapper>
        <Title>{title}</Title>
        <Info>
          <P>{destination}</P>
          <P>{duration}</P>
          <P>{companion}</P>
        </Info>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ScheduleCard;
