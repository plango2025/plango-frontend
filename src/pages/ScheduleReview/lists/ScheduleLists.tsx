import Header from "./components/Header";
import AppLayout from "@/layout/AppLayout";
import Card from '@/components/Card';
import { ButtonContainer } from "./ScheduleList.style";
import { useNavigate } from "react-router-dom";
import { GridItem } from "@chakra-ui/react";
import { mockReviews } from "@/mocks/schedule";
import { Wrapper } from "./ScheduleList.style";

const ScheduleLists = () => {
  const schdReviews = mockReviews.data;
  const navigate = useNavigate();
  return (
    <Wrapper>
      <AppLayout>
        {/* GridItem은 AppLayout 내부에서만 사용 */}
        <GridItem colSpan={12}>
          <ButtonContainer>
            <button
              onClick={() => navigate("/schdReview/new")}
              className="add-button"
            >
              리뷰 작성하기
            </button>
            <button className="login-button">로그인</button>
          </ButtonContainer>
        </GridItem>

        <GridItem colSpan={12}>
          <Header />
        </GridItem>

        {schdReviews.map((review) => (
          <GridItem key={review.id} colSpan={3}>
            <Card key={review.id} review={review} />
          </GridItem>
        ))}
      </AppLayout>
    </Wrapper>
  );
};

export default ScheduleLists;
