import AppLayout from "@/layout/AppLayout";
import { GridItem, Separator } from "@chakra-ui/react";
import Header from "../components/header/Header";
import Gallery from "../components/gallary/Gallery";
import { IoIosArrowBack } from "react-icons/io";
import {
  BackGround,
  PlaceInfoWrapper,
  SubTitle,
  Content,
  BackIcon,
} from "./PlaceInfo.style";
import {
  Padding1,
  PaddingMd,
  PlaceIntroPadding,
} from "@/components/common/padding/padding";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePlaceSearch } from "../presenter/PlaceInfoPresenter";

const PlaceInfo = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { placeIntro, loading, searchPlace } = usePlaceSearch();

  useEffect(() => {
    if (keyword && keyword.trim()) {
      searchPlace(keyword);
    }
  }, [keyword]);

  const handleBack = () => {
  navigate(-1);
  };

  if (loading || !placeIntro) {
    return <div>로딩 중입니다...</div>;
  }

  const { title, sub_title, content, address, images } = placeIntro;

  return (
    <BackGround>
      <AppLayout>
        <GridItem colSpan={12}>
          <PlaceInfoWrapper>
            <PlaceIntroPadding>
              <PaddingMd />
              <BackIcon onClick={handleBack}>
                <IoIosArrowBack />
              </BackIcon>

              <Gallery images={images} />
              <Header name={title} subtitle={sub_title} address={address} />
              <Separator mt="2rem" mb="2rem" />
              <SubTitle>{sub_title}</SubTitle>
              <Padding1 />
              <Content>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </Content>
            </PlaceIntroPadding>
          </PlaceInfoWrapper>
        </GridItem>
      </AppLayout>
    </BackGround>
  );
};

export default PlaceInfo;
