import { styled } from 'styled-components';
export const Wrapper = styled.div`
  width: 100%;
  font-weight: 700;
  border-radius: 40px;
  box-shadow: 2px 5px 5px 3px rgb(199, 199, 199);
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }
`;
export const Profile = styled.div`
padding-top: 1rem;
padding-left: 0.5rem;
margin-bottom: 1rem;
  display: flex;
  align-items: center;
  width: 100%;  
  height: 3rem;
  border-radius: 40px 40px 0  0;
  span{
    font-size: 1rem;
    color: #333;
    padding-left: 0.5rem;
  }
  `;
export const Image = styled.img`
  width: 100%;  
  height: 10rem;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;

    
`;

export const Name = styled.h2`
padding-left: 0.5rem;
  font-size: 1.2rem;      
    font-weight: 700;
    margin-top: 0.5rem;
    color: #333;

`;
export const Rating = styled.div`
  padding-left: 0.5rem;

  display: flex;
  font-size: 1rem;
  color: rgb(255, 211, 54);
  margin-top: 1rem;
  span {
    color: #333333;
    padding-left: 1rem;
  }
`;
export const ButtonBox=styled.div`
display: flex;
  justify-content: space-between;
`
export const Button = styled.button`
display: flex;
  border: none;
  border-radius: 5px;
  padding: 1rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  align-items: center;
  margin-bottom: 2rem;

  span{
    margin-left: 0.5rem;
    padding:0;
  }
  
`;