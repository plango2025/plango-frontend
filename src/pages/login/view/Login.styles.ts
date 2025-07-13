// LoginPage.styles.ts
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const TitleWrapper = styled.div`
  grid-column: 3 / span 8;
  text-align: center;
  margin-top: 100px;
`;

export const TitleDesc = styled.span`
  font-size: 32px;
  font-weight: 700;`

export const TitleLogo = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  img {
    width: 48px;
    height: 48px;
  }

  h1 {
    font-size:32px;
    font-weight: 700;
  }
`;

export const CenterWrapper = styled.div`
  width:100%;
  display:flex;
  justify-content:center;
`;

export const CenterImage = styled.img`
  width: 23rem;
  height: auto;
  object-fit: cover;
`;

export const KakaoLoginButton = styled.button`
  
  width: 20rem;
  height: 5.625rem;
  border-radius: 80px;
  background-color: #fee500;
  padding: 20px;
  bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
padding-left:30px;
  &:hover {
    background-color: #ead300;
  }
`;

export const KakaoIcon = styled.div`
  

`;
