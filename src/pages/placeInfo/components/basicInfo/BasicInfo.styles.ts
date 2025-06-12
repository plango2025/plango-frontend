import styled from 'styled-components';
export const Container = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: #fdfdfd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoItem = styled.p`
  font-size: 16px;
  color: #333;
`;

export const ExternalLink = styled.a`
  color: #3182ce;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
