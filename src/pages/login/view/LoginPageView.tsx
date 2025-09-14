import { useLoginPresenter } from "../presenter/LoginPresenter";
import {
  Container,
  TitleWrapper,
  TitleDesc,
  TitleLogo,
  CenterWrapper,
  CenterImage,
  
} from "./Login.styles";
import { GridItem } from "@chakra-ui/react";
import AppLayout from "@/layout/AppLayout";
import { KakaoLoginBtn } from '@/components/common/buttons/Buttons';
import logo from "@assets/images/icons/plane.png";
import bgImg from "@assets/images/login/background.png"
const LoginPageView = () => {
  
  const { handleLogin, error } = useLoginPresenter();
  //  const getKakaoLoginUrl = async (): Promise<string> => {
  //    const res = await api.get("/oauth/kakao/login", {
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //    });
  //    return res.data;
  //  };

  return (
    <AppLayout>
      <GridItem colSpan={12}>
        <Container>
          <TitleWrapper>
            <TitleDesc>여행 계획? 이젠 클릭 한 번으로 끝!</TitleDesc>
            <TitleLogo>
              <img src={logo} alt="Plango Logo" />
              <h1>Plango</h1>
            </TitleLogo>
          </TitleWrapper>

          <CenterWrapper>
            <CenterImage
              src={bgImg}
              alt="Background Image"
            />
          </CenterWrapper>
          <CenterWrapper>
            <KakaoLoginBtn onClick={handleLogin} />
          </CenterWrapper>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Container>
      </GridItem>
    </AppLayout>
  );
};

export default LoginPageView;