import { GridItem } from "@chakra-ui/react";
import AppLayout from "@/layout/AppLayout";
import {
  Image,
  LoginBtn,
  PlaneIcon,
  Section,
  Text,
  TextContainer,
  Logo,
  LogoTitle,
  Wrapper,
} from "./Main.style";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function MainPage() {
  const navigate = useNavigate();
  const sectionRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <AppLayout>
      <GridItem colSpan={12}>
        <Wrapper>
          {" "}
          {/* 스크롤 래퍼 */}
          <Section ref={addToRefs}>
            <TextContainer>
              <Text>여행 계획? 이제 클릭 한 번으로 끝!</Text>
              <Logo>
                <LogoTitle>Plango</LogoTitle>
                <PlaneIcon
                  src="src/assets/images/icons/plane.png"
                  alt="plane"
                />
              </Logo>
              <LoginBtn onClick={() => navigate("/schedule")}>
                바로 일정 만들기
              </LoginBtn>
            </TextContainer>
            <Image src="src/assets/images/main/main1.png" />
          </Section>
          <Section ref={addToRefs}>
            <Image src="src/assets/images/main/main2.png" />
            <TextContainer>
              <Text>맛집 투어를 좋아하는 유리씨도</Text>
            </TextContainer>
          </Section>
          <Section ref={addToRefs}>
            <TextContainer>
              <Text>혼자 있는 시간이 중요한 소희씨도</Text>
            </TextContainer>
            <Image src="src/assets/images/main/main3.png" />
          </Section>
          <Section ref={addToRefs}>
            <Image src="src/assets/images/main/main4.png" />
            <TextContainer>
              <Text>안녕</Text>
            </TextContainer>
          </Section>
          <Section ref={addToRefs}>
            <TextContainer>
              <Text>
               나중엔 우주여행까지 <span>Plango</span>와 함께!
              </Text>
            </TextContainer>
            <Image src="src/assets/images/main/main5.png" />
          </Section>
        </Wrapper>
      </GridItem>
    </AppLayout>
  );
}
