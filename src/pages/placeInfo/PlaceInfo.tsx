import { detailMock, previewMock } from "@/mocks/gyeongbokgungMock";
import Gallery from "./components/gallary/Gallery";
import Header from "./components/header/Header";
import BasicInfo from "./components/basicInfo/BasicInfo";
import DetailedInfo from "./components/detailedInfo/DetailedInfo";
import AppLayout from '@/layout/AppLayout';

const PlaceInfo = () => {
  const preview = previewMock.data;
  const detail = detailMock;
 
    

  return (
    <AppLayout>
      <Header name={preview.keyword_search_info.title} rating={3}></Header>
      <BasicInfo
        address={preview.keyword_search_info.addr1}
        tel={preview.keyword_search_info.tel}
        homepage={detail.data.common_info.homepage}
      ></BasicInfo>
      <Gallery images={detail.data.images}></Gallery>
      <DetailedInfo contentTypeId={preview.contenttypeid} introData={detail.data.intro_info}/>
      {/* <DetailedInfo
        chkbabycarriage="없음"
        chkcreditcard="가능"
        chkpet="불가"
        parking="가능 (승용차 240대 / 버스 50대)"
        usetime="[1월~2월] 09:00~17:00<br>[3월~5월] 09:00~18:00"
        restdate="매주 화요일"
        infocenter="02-3700-3900"
      /> */}

   
    </AppLayout>
  );
};

export default PlaceInfo;
