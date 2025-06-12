import styled from "styled-components";
export const Wrapper = styled.header`
  margin-top: 5rem;
  margin-bottom: 4rem;
  text-align: center;
  font-weight: 700;
  
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;

`;
export const SearchBar = styled.input`
margin-top: 2rem;
width: 40rem;
height: 3rem;
border: 1px solid #ccc;
border-radius: 10px;
padding: 0.5rem;
&:focus {
  outline: none;
  border-color: #007bff;
}
`;
