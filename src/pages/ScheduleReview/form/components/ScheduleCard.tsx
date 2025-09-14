import styled from "styled-components";
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";

const CardWrapper = styled.div`
  margin: 1rem 0;
  max-width: 240px;
  max-height: 300px;
  cursor: pointer;
  background-color: #ffffff;
  width: 100%;
  border-radius: 7px;
  min-height: 230px;
  box-shadow: 2px 5px 5px 3px rgb(199, 199, 199);
`;
const Image = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius:7px 7px 0 0;
`;
const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left:1rem;
`;
const Title = styled.p`
  font-weight: 700;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom:0.4rem;
`;
const Info = styled.div`
  color: #919294;
  display:flex;
  flex-direction:column;
  gap:0.2rem;
`;
const P = styled.p`
font-size:12px;
display:flex;
justify-content:start;
align-items: center;
gap:0.2rem;

`;
const Bold = styled.span`
padding-left:0.2rem;
font-weight:bold;
`
export interface ScheduleCardProps {
  id: number;
  thumbnail_url: string;
  title: string;
  destination: string;
  duration: string;
  companion: string;
  onhandleSelect: (value: string) => void;
}
const ScheduleCard = ({
  thumbnail_url,
  title,
  destination,
  duration,
  companion,
  onhandleSelect,
}: ScheduleCardProps) => {
  return (
    <CardWrapper onClick={() => onhandleSelect(title)}>
      <Image src={thumbnail_url}></Image>
      <InfoWrapper>
        <Title>{title}</Title>
        <Info>
          <P>
            <FaLocationDot />
            <span>여행지</span>
            <Bold>{destination}</Bold>
          </P>
          <P>
            <IoMdTime />
            <span>여행 기간</span>
            <Bold> {duration} </Bold>
          </P>
          <P>
            <IoPerson />
            <span>동행자 </span>
            <Bold>{companion}</Bold>

          </P>
        </Info>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ScheduleCard;
