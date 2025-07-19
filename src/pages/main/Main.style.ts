import styled from 'styled-components';
import styled from "styled-components";

export const Wrap = styled.div`
  overflow: hidden;
  position: relative;
  height: 100vh;
`;
export const Bold = styled.span`
font-weight:bold;`
export const Wrapper = styled.div`
  position: relative;
  top: 0;
  transition: top 0.6s ease-in-out;
`;

export const Section = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;


export const Image=styled.img`
width: 510px;
height: 510px;

`
export const TextContainer= styled.div`
display:flex;
flex-direction: column;

`

export const Text= styled.p`
font-size: 20px;
`

export const StartBtn = styled.button`
  width: 18.75rem;
  height: 4rem;
  background-color: black;
  color: white;
  font-size: 24px;
  border-radius: 40px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.98);
  }
`;
  /* color: main.$bg-light;
  background-color: main.$text-primary;
  border-radius: 2.5rem;
  font-size: main.$subtitle-s;
  font-weight: main.$fontweightExtraBold; */
// `;

export const LoginBtnWrapper= styled.div`
position:absolute;
padding:2rem;
width:100%;
display: flex;
justify-content: flex-end;
`
export const Logo = styled.div`
display: flex;
align-items: center;
text-align: center;
`
export const PlaneIcon= styled.img`
width: 92px;
height: 92px;
`

export const LogoTitle = styled.p`
font-size:96px;
font-weight:700;
`