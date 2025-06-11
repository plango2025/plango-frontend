import AppLayout from "@/layout/AppLayout";
import { Breadcrumb, GridItem } from "@chakra-ui/react";
import Header from "../components/header/Header";
import BasicInfo from "../components/basicInfo/BasicInfo";
import Gallery from "../components/gallary/Gallery";
import DetailedInfo from "../components/detailedInfo/DetailedInfo";
import LLMInfo from "../components/llmInfo/LLMInfo";
import SideNav from "../components/sidenav/SideNav";
import { BackGround, Wrapper } from './PlaceInfo.style';
import { usePlaceSearch } from './../presenter/PlaceInfoPresenter';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
const PlaceInfo = () => {
  const [params] = useSearchParams();
  const keyword = params.get("keyword");//url에서 장소키워드 가지고옴
    const { preview, detail, llmResult, loading, searchPlace }= usePlaceSearch();
    useEffect(() => {
      if (keyword) searchPlace(keyword); //키워드 중심으로 장소 찾기기
    }, [keyword, searchPlace]);

    if (loading || !preview || !detail || !llmResult) {
      return <div>로딩 중입니다...</div>;
    }
  
    
  return (
    <BackGround>
      <AppLayout>
        <GridItem colSpan={12}>
          <SideNav></SideNav>

          <Breadcrumb.Root key={"md"} size={"lg"} marginTop={"1rem"}>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="#">일정생성</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink>장소소개</Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
          <Wrapper>
            <Header
              name={preview.keyword_search_info.title}
              subtitle={llmResult.style}
              taglist={llmResult.keywords}
              rating={3}
            />
            <Gallery images={detail.images} />
            <div id="llm">
              {llmResult && <LLMInfo llmresult={llmResult} />}{" "}
            </div>
            <div id="basic">
              <BasicInfo
                address={preview.keyword_search_info.addr1}
                tel={preview.keyword_search_info.tel}
                homepage={detail.common_info.homepage}
              />
            </div>
            <div id="detail">
              <DetailedInfo
                contentTypeId={preview.contenttypeid}
                introData={detail.intro_info}
              />
            </div>
          </Wrapper>
        </GridItem>
      </AppLayout>
    </BackGround>
  );
};

export default PlaceInfo;
