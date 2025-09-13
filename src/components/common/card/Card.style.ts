import { styled } from "styled-components";
export const Wrapper = styled.div`
  width: 100%;
  height: 370px;
  min-width: 0; // grid 아이템 폭 강제
  font-weight: 700;
  border-radius: 20px;
  box-shadow: 2px 5px 5px 3px rgb(199, 199, 199);
  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }
`;
export const Profile = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  height: 3rem;
  border-radius: 40px 40px 0 0;
  span {
    font-size: 1rem;
    color: #333;
  }
`;
export const Image = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

export const Name = styled.h2`
  padding-left: 0.5rem;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: #333;
  height: 30px;

  /* 한 줄에서 말줄임 */
  white-space: nowrap; /* 한 줄로 강제 */
  overflow: hidden; /* 넘치는 부분 숨김 */
  text-overflow: ellipsis; /* … 표시 */
`;

export const Rating = styled.div`
  padding-top: 0.3rem;
  padding-left: 0.6rem;
`;
export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Button = styled.button`
  display: flex;
  border: none;
  border-radius: 5px;
  padding: 1rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  align-items: center;
  margin-bottom: 0.4rem;

  span {
    margin-left: 0.5rem;
    padding: 0;
  }
`;
