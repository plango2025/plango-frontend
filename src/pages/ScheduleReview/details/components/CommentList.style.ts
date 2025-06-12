import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 2rem;
`;

export const Title = styled.h3`
  margin-bottom: 1.5rem;
`;

export const List = styled.ul`
  padding: 0;
`;

export const Item = styled.li`
  list-style: none;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

export const UserInfo = styled.div``;

export const UserName = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

export const CreatedAt = styled.div`
  font-size: 12px;
  color: #999;
`;

export const Content = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
`;
