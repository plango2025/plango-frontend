// components/CommonSidebar/CommonSidebar.styles.ts
import styled from "styled-components";

const LOGO_WIDTH = "4.5rem";
const LOGO_TOP_MARGIN = "2.938rem";
const ICON_WIDTH = "2.5rem";
const SIDEBAR_WIDTH = "5.625rem"; // 약 90px

export const SidebarContainer = styled.div`
  position: fixed;
  width: ${SIDEBAR_WIDTH};
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
`;

export const SidebarLogo = styled.img`
  position: relative;
  width: ${LOGO_WIDTH};
  height: ${LOGO_WIDTH};
  left: 2.125rem;
  top: ${LOGO_TOP_MARGIN};
`;

export const IconList = styled.ul`
  position: relative;
  width: 100%;
  height: calc(100% - ${LOGO_TOP_MARGIN} - ${LOGO_WIDTH});
  margin-top: calc(${LOGO_TOP_MARGIN} + ${LOGO_WIDTH});
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

export const IconItem = styled.li`
  width: ${ICON_WIDTH};

  svg path {
    transition: fill 0.1s ease;
    cursor: pointer;
  }

  svg:hover path {
    fill: #253422;
  }
`;
