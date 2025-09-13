import { GridItem } from "@chakra-ui/react";
import AppLayout from "@/layout/AppLayout";
import {
  Image,
  StartBtn,
  PlaneIcon,
  Section,
  LoginBtnWrapper,
  Text,
  TextContainer,
  Logo,
  LogoTitle,
  Wrapper,
  Wrap,
  Bold,
} from "./Main.style";
import LoginBtn from "@/components/common/loginBtn/LoginBtn";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccessToken } from "@/context/AccessTokenContext";
import { LogoutBtn } from "../ScheduleReview/lists/view/ScheduleListView";

export default function MainPage() {
  const { isLoggedIn, logout } = useAccessToken();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const TOTAL_SECTIONS = 5;

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.transform = `translateY(${-page * 100}vh)`;
    }
  }, [page]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollTimeout) return; 

      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 800); 

      if (e.deltaY > 0) {
        setPage((prev) => Math.min(prev + 1, TOTAL_SECTIONS - 1));
      } else if (e.deltaY < 0) {
        setPage((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <AppLayout>
      <GridItem colSpan={12}>
        <Wrap>
          <Wrapper
            ref={wrapperRef}
            style={{
              height: `${TOTAL_SECTIONS * 100}vh`,
              transition: "transform 0.8s ease-in-out", 
            }}
          >
            <LoginBtnWrapper>
              {isLoggedIn ? (
                <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
              ) : (
                <LoginBtn />
              )}
            </LoginBtnWrapper>

            <Section>
              <TextContainer>
                <Text>여행 계획? 이제 클릭 한 번으로 끝!</Text>
                <Logo>
                  <LogoTitle>Plango </LogoTitle>
                  <PlaneIcon
                    src="src/assets/images/icons/plane.png"
                    alt="plane"
                  />
                </Logo>
                <StartBtn onClick={() => navigate("/schedule")}>
                  바로 일정 만들기
                </StartBtn>
              </TextContainer>
              <Image src="src/assets/images/main/main1.png" />
            </Section>

            <Section>
              <Image src="src/assets/images/main/main2.png" />
              <TextContainer>
                <Text>맛집 투어를 좋아하는 유리씨도</Text>
              </TextContainer>
            </Section>

            <Section>
              <TextContainer>
                <Text>혼자 있는 시간이 중요한 소희씨도</Text>
              </TextContainer>
              <Image src="src/assets/images/main/main3.png" />
            </Section>

            <Section>
              <Image src="src/assets/images/main/main4.png" />
              <TextContainer>
                <Text>다양한 걸 보고 싶은 도윤씨도</Text>
              </TextContainer>
            </Section>

            <Section>
              <TextContainer>
                <Text>
                  나중엔 우주여행까지 <Bold>Plango</Bold>와 함께!
                </Text>
              </TextContainer>
              <Image src="src/assets/images/main/main5.png" />
            </Section>
          </Wrapper>
        </Wrap>
      </GridItem>
    </AppLayout>
  );
}
