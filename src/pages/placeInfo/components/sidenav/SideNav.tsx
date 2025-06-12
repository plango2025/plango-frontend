import React from 'react'
import { NavItem, Nav } from './Sidenav.style';

const SideNav = () => {
  return (
    <Nav>
      <NavItem href="#basic">기본정보</NavItem>
      <NavItem href="#llm">소개</NavItem>
      <NavItem href="#detail">상세정보</NavItem>
    </Nav>
  );
}

export default SideNav
