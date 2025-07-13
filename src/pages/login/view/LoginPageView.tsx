import SideBar from "@/components/common/sidebar/CommonSidebar";
import { useLoginPresenter } from "../presenter/LoginPresenter";
import {
  Container,
  TitleWrapper,
  TitleDesc,
  TitleLogo,
  CenterWrapper,
  CenterImage,
  KakaoLoginButton,
  KakaoIcon,
} from "./Login.styles";
import { GridItem } from "@chakra-ui/react";
import AppLayout from "@/layout/AppLayout";

const LoginPageView: React.FC = () => {
  const { handleLogin, error } = useLoginPresenter();

  return (
   
      <AppLayout>
        <GridItem colSpan={12}>

    <Container>
      

      <TitleWrapper>
        <TitleDesc>여행 계획? 이젠 클릭 한 번으로 끝!</TitleDesc>
        <TitleLogo>
          <img src="/src/assets/images/icons/plane.png" alt="Plango Logo" />
          <h1>Plango</h1>
        </TitleLogo>
      </TitleWrapper>

      <CenterWrapper>
        <CenterImage
          src="/src/assets/images/login/background.png"
          alt="Background Image"
        />
      </CenterWrapper>
<CenterWrapper>
      <KakaoLoginButton onClick={handleLogin}>
        <KakaoIcon>
          <svg
            width="36"
            height="34"
            viewBox="0 0 36 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 0.199951C8.05835 0.199951 0 6.42587 0 14.1045C0 18.88 3.11681 23.0899 7.86305 25.5939L5.86606 32.8889C5.68962 33.5335 6.42683 34.0473 6.99293 33.6738L15.7467 27.8964C16.4854 27.9676 17.2362 28.0093 18 28.0093C27.9409 28.0093 35.9999 21.7836 35.9999 14.1045C35.9999 6.42587 27.9409 0.199951 18 0.199951"
              fill="black"
            />
          </svg>
        </KakaoIcon>
        카카오 로그인
      </KakaoLoginButton>
</CenterWrapper>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Container>
          </GridItem>
      </AppLayout>


  );
};

export default LoginPageView;