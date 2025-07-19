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
  Bold
} from "./Main.style";
import LoginBtn from "@/components/common/loginBtn/LoginBtn"
import { useEffect, useRef, useState } from 'react';


export default function MainPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
const TOTAL_SECTIONS = 5;
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      setPage((prev) => {
        let next = prev;
        if (e.deltaY > 0) next++;
        if (e.deltaY < 0) next--;
        if (next < 0) next = 0;
        if (next > TOTAL_SECTIONS - 1) next = TOTAL_SECTIONS - 1;
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.top = `${-page * 100}vh`;
    }
  }, [page]);
  return (
    <AppLayout>
      <GridItem colSpan={12}>
        {" "}
        <Wrap>
          <Wrapper
            ref={wrapperRef}
            style={{ height: `${TOTAL_SECTIONS * 100}vh` }}
          >
            <LoginBtnWrapper><LoginBtn/>
            </LoginBtnWrapper>
            
            <Section>
              <TextContainer>
                <Text>여행 계획? 이제 클릭 한 번으로 끝!</Text>
                <Logo>
                  <LogoTitle>Plango</LogoTitle>
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
