import { detailMock, previewMock } from "@/mocks/gyeongbokgungMock";
import Gallery from "./components/gallary/Gallery";
import Header from "./components/header/Header";
import BasicInfo from "./components/basicInfo/BasicInfo";
import DetailedInfo from "./components/detailedInfo/DetailedInfo";
import AppLayout from '@/layout/AppLayout';
import { GridItem } from '@chakra-ui/react';

const PlaceInfo = () => {
  const preview = previewMock.data;
  const detail = detailMock;
 
    

  return (
    <AppLayout>
      <GridItem colSpan={12}>
      <Header name={preview.keyword_search_info.title} rating={3}></Header>
      <BasicInfo
        address={preview.keyword_search_info.addr1}
        tel={preview.keyword_search_info.tel}
        homepage={detail.data.common_info.homepage}
      ></BasicInfo>
      <Gallery images={detail.data.images}></Gallery>
      <DetailedInfo contentTypeId={preview.contenttypeid} introData={detail.data.intro_info}/>
     

   </GridItem>
    </AppLayout>
  );
};

export default PlaceInfo;
