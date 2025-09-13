// CommonSidebar.styles.ts
import styled from "styled-components";

// ✅ 숫자로 관리
const LOGO_WIDTH = 2.5; // rem
const LOGO_TOP_MARGIN = 2.938; // rem
const ICON_WIDTH = 2; // rem
const SIDEBAR_WIDTH = 5; // rem

export const SidebarContainer = styled.div`
  position: fixed;
  width: ${SIDEBAR_WIDTH}rem;
  display:  flex;
  flex-direction: column;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 1;


`;
export const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${LOGO_WIDTH}rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${LOGO_TOP_MARGIN}rem;
  /* margin-bottom: ${LOGO_TOP_MARGIN}rem; */
`;

export const SidebarLogo = styled.img`
  position: relative;
  width: ${LOGO_WIDTH}rem;
  height: ${LOGO_WIDTH}rem;
  
`;

export const IconList = styled.ul`
  position: relative;
  width: 100%;
  height: calc(90% - ${LOGO_TOP_MARGIN}rem - ${LOGO_WIDTH}rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

`;

export const IconItem = styled.li`
  font-size: ${ICON_WIDTH}rem;
  color: #bebebeff;
  cursor: pointer;
  width: ${ICON_WIDTH}rem;

  height: ${ICON_WIDTH}rem;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  &:hover {
    color: #50adff;
  }
`;
