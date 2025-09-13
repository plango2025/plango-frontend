import styled from "styled-components";
import { CONTAINER_WIDTH } from "@/layout/GridLayout";

const SIDEBAR_WIDTH = 5; // rem
const BREAKPOINT = CONTAINER_WIDTH + SIDEBAR_WIDTH; // rem

export const MainContainer = styled.div`
width: 100%;
  margin-left: 5rem;

  @media (max-width: ${BREAKPOINT}px) {
    margin-left: 0;
  }
`;
