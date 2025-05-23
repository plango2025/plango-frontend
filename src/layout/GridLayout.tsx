// styles/Grid.tsx
import styled, { css } from "styled-components";

// 기본 값 설정
const GRID_COLUMNS = 12;
const COLUMN_WIDTH = 72; // px
const GUTTER = 30; // px

// ✅ 컨테이너
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRID_COLUMNS}, ${COLUMN_WIDTH}px);
  column-gap: ${GUTTER}px;
  justify-items: center;
  margin: 0 auto;
  height: 100vh;
  width: 74.625rem; // 1194px
  position: relative;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(12, ${COLUMN_WIDTH}px);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(8, ${COLUMN_WIDTH}px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(6, ${COLUMN_WIDTH}px);
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(4, ${COLUMN_WIDTH}px);
  }
`;

// ✅ 공통 column span 스타일 유틸
const columnSpan = (span: number) => css`
  grid-column: span ${span};
`;

// ✅ span 컴포넌트
export const GridItem = styled.div<{ span?: number }>`
  ${(props) => columnSpan(props.span ?? 1)}
`;
