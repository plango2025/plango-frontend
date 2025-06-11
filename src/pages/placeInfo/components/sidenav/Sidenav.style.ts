import styled from 'styled-components';


export const Nav = styled.div`
  position: fixed;
  top: 100px;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  z-index: 100;
`;

export const NavItem = styled.a`
  color: #333333;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #3182ce; 
  }
`;