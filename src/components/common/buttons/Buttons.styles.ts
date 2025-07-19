import styled from 'styled-components';

export const LoginBtnWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: end;
  top: 2rem;
  rignt: 2rem;
`;
export const LoginBtn = styled.button`
  width: 10rem;
  height: 3.5rem;
  background-color: main.$accent-primary;
  border-radius: 10px;
  color: main.$bg-light;
  font-weight: 400;
  font-size: 20px;
  outline: none;
  border: none;
`;
export const KakaoLoginBtnWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 15rem;
  height: 6rem;
`;
export const KakaoBtn = styled.button`

  width: 100%;
  background-color: #fee500;
  border: none;
  padding: 12px 18px;
  display: flex;
  gap: 30px;
  align-items: center;
  border-radius: 40px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: #ead300;
  }

  svg {
    margin-right: 8px;
  }
`;
