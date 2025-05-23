import React from "react";
import { Container, GridItem } from './GridLayout';
import Sidebar from './Sidebar';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <Container>
      <Sidebar />
      <GridItem span={12}>{children}</GridItem>
    </Container>
  );
};

export default AppLayout;
