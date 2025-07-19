import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 2rem;

`;
export const BackGround = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
`;
export const PlaceInfoWrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom:3rem;
`;
export const BackIcon = styled.button`
width:100%;
  font-size: 30px; // 아이콘 크기 (원하는 크기로 조절, 예: 32px, 40px 등)

`;
export const Content = styled.p`
  font-size: 20px;
 
  line-height: 2rem;
`;
export const SubTitle = styled.p`
font-size: 22px;
font-weight:700 ;


`