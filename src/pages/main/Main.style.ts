import styled from 'styled-components';
export const Wrapper = styled.div`

`; 
export const Section = styled("section")`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: auto;
  align-items: center;
  justify-content: space-around;
  padding: 100px;
`;
export const Image=styled.img`
width: 510px;
height: 510px

`
export const TextContainer= styled.div`
display:flex;
flex-direction: column;

`

export const Text= styled.p`
font-size: 20px;
`
export const LoginBtn = styled.button`
  width: 18.75rem;
  height: 5rem;
  background-color: black;
  color: white;
  font-size: 24px;
  border-radius: 40px;

  /* color: main.$bg-light;
  background-color: main.$text-primary;
  border-radius: 2.5rem;
  font-size: main.$subtitle-s;
  font-weight: main.$fontweightExtraBold; */
`;
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