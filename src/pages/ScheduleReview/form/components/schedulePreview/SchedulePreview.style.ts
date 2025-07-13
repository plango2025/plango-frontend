import styled from 'styled-components';

export const ScheduleInfo = styled.div`
  width: 100%;
  max-width: 1000px;
  height: auto;
  background-color:rgb(244, 252, 253);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.19);
    transition: background-color 0.1s ease, box-shadow 0.3s ease;
  }

  h1{
    font-size: 20px;
  }
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #343a40;
  }
`;

export const Place = styled.p`
padding-left:2rem;
padding-bottom: 0.4rem;
`
