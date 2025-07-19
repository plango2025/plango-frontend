import styled from "styled-components";
export const Wrapper = styled.div`
  background-color: #fcfcfc;
`;
export const CardWrapper=styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
gap:0.6rem;`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  margin-top: 1rem;
  gap: 1rem;
  
 
`
export const LoginBtn = styled.button`
 width: 8rem;
    height: 2.5rem;
    border-radius: 40px;
    font-size: 1rem;
    cursor: pointer;
 background-color: #15bdb1; /* Green */
    color: white;
    border: none;
      :hover{background-color: #109a90;
      }
`
export const GoFormBtn= styled.button`
 width: 8rem;
    height: 2.5rem;
    border-radius: 40px;
    font-size: 1rem;
    cursor: pointer;
 background-color: #0071c1; /* Blue */
    color: white;
    border: none;
`