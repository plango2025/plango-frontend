import React from 'react'
import Sidebar from './Sidebar';
import styled from 'styled-components';

const FullContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  
`;

const FullLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <FullContainer>{children}</FullContainer>
    </>
  );
}

export default FullLayout
