// view/ScheduleListView.tsx
import { GridItem } from "@chakra-ui/react";
import { ButtonContainer, Wrapper, CardWrapper , GoFormBtn, LoginBtn} from "./ScheduleList.style";
import AppLayout from "@/layout/AppLayout";
import Card from "@/components/Card";
import Header from "../components/Header";

const ScheduleListView = ({
  keyword,
  setKeyword,
  handleSearch,
  navigateToNewReview,
  handleCreateDummy,
  navigateToLogin,
  schdReviews,
}: any) => {
  return (
    <Wrapper>
      <AppLayout>
        <GridItem colSpan={12}>
          <ButtonContainer>
            <GoFormBtn onClick={navigateToNewReview} className="add-button">
              리뷰 작성하기
            </GoFormBtn>
          
            <LoginBtn onClick={navigateToLogin} className="login-button">
              로그인
            </LoginBtn>
          </ButtonContainer>
        </GridItem>

        <GridItem colSpan={12}>
          <Header
            onSearch={handleSearch}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          
        <CardWrapper>{schdReviews.map((review) => (
            <Card key={review.id} review={review} />
        ))}</CardWrapper>
        </GridItem>

      </AppLayout>
    </Wrapper>
  );
};

export default ScheduleListView;
