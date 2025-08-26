import { useEffect } from "react";
import { GridItem } from "@chakra-ui/react";
import {
  ButtonContainer,
  Wrapper,
  CardWrapper,
  GoFormBtn,
  LoginBtn,
} from "./ScheduleList.style";
import AppLayout from "@/layout/AppLayout";
import Header from "../components/Header";
import Card from "@/components/common/card/Card";
import { useAccessToken } from "@/context/AccessTokenContext";
import styled from 'styled-components';

const ScheduleListView = ({
  keyword,
  user,
  logout,
  setKeyword,
  schdReviews,
  observerRef,
  handleObserver,
  isFetchingNextPage,
  navigateToNewReview,
  handleCreateDummy,
  navigateToLogin,
  onSearch,
}: any) => {
  const {isLoggedIn } = useAccessToken();

 

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver, observerRef]);

  return (
    <Wrapper>
      <AppLayout>
        <GridItem colSpan={12}>
          <ButtonContainer>
            <GoFormBtn onClick={navigateToNewReview} className="add-button">
              리뷰 작성하기
            </GoFormBtn>
            {isLoggedIn ? (
              <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
            ) : (
              <LoginBtn onClick={navigateToLogin} className="login-button">
                로그인
              </LoginBtn>
            )}
          </ButtonContainer>
        </GridItem>

        <GridItem colSpan={12}>
          <Header
            onSearch={onSearch}
            keyword={keyword}
            setKeyword={setKeyword}
          />

          <CardWrapper>
            {schdReviews.map((review: any, index: number) => {
              const isLast = index === schdReviews.length - 1;
              return (
                <Card
                  key={review.id}
                  review={review}
                  ref={isLast ? observerRef : null}
                />
              );
            })}
            {isFetchingNextPage && <p>불러오는 중...</p>}
          </CardWrapper>
        </GridItem>
      </AppLayout>
    </Wrapper>
  );
};
export const LogoutBtn = styled.button`
  background-color: #b3b1b1;
  width: 8rem;
  height: 2.5rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover {
    background-color: #bebebe;
  }
`;

export default ScheduleListView;
