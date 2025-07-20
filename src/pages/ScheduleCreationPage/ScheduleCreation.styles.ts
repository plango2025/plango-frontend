import styled from "styled-components";
import { CONTAINER_WIDTH } from "@/layout/GridLayout";

// ✅ 숫자로 관리
const LOGO_WIDTH = 2.5; // rem
const LOGO_TOP_MARGIN = 2.938; // rem
const ICON_WIDTH = 2; // rem
const SIDEBAR_WIDTH = 5; // rem
const BREAKPOINT = CONTAINER_WIDTH + SIDEBAR_WIDTH; // rem

export const MainContainer = styled.div`
width: 100%;
  margin-left: 5rem;

  @media (max-width: ${BREAKPOINT}px) {
    margin-left: 0;
  }
`;
