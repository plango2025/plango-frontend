// view/ScheduleListView.tsx
import { GridItem } from "@chakra-ui/react";
import { ButtonContainer, Wrapper } from "./ScheduleList.style";
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
            <button onClick={navigateToNewReview} className="add-button">
              리뷰 작성하기
            </button>
            <button onClick={handleCreateDummy}>임시 리뷰들들</button>
            <button onClick={navigateToLogin} className="login-button">
              로그인
            </button>
          </ButtonContainer>
        </GridItem>

        <GridItem colSpan={12}>
          <Header
            onSearch={handleSearch}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        </GridItem>

        {schdReviews.map((review) => (
          <GridItem  colSpan={3}>
            <Card key={review.review_id} review={review} />
          </GridItem>
        ))}
      </AppLayout>
    </Wrapper>
  );
};

export default ScheduleListView;
