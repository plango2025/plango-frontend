import AppLayout from "@/layout/AppLayout";
import { GridItem, Separator, Spinner } from "@chakra-ui/react";
import Header from "../components/header/Header";
import Gallery from "../components/gallary/Gallery";
import { IoIosArrowBack } from "react-icons/io";
import {
  BackGround,
  PlaceInfoWrapper,
  SubTitle,
  Content,
  BackIcon,
  MapContainer,
} from "./PlaceInfo.style";
import {
  Padding1,
  PaddingMd,
  PlaceIntroPadding,
} from "@/components/common/padding/padding";
import { useNavigate, useParams } from "react-router-dom";
import PlaceReviews from "@/pages/test/placeReivews";
import { usePlaceSearch } from "../presenter/PlaceInfoPresenter";
import FullLayout from "@/layout/FullLayout";

const PlaceInfo = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();

  const {
    liked,
    bookmarked,
    placeIntro,
    loading,
    reviewItems,
    hasMore,
    likeCount,
    loadFirstReviews,
    loadMoreReviews,
    handleLikeClick,
    handleBookmarkClick,
  } = usePlaceSearch(keyword);

  const handleBack = () => navigate(-1);

  if (loading || !placeIntro) return <Spinner />;
  console.log(likeCount);
  const { title, sub_title, content, address, images, rating, like_count } =
    placeIntro;
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

              {/* Header에 상태와 클릭 핸들러 전달 */}
              <Header
                name={title}
                subtitle={sub_title}
                address={address}
                bookmarked={bookmarked}
                liked={liked}
                onLikeClick={handleLikeClick}
                onBookmarkClick={handleBookmarkClick}
                rating={Math.floor(rating)}
                like_count={like_count}
              />

              <Separator mt="2rem" mb="2rem" />
              <SubTitle>{sub_title}</SubTitle>
              <Padding1 />
              <Content>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </Content>
              {/* <MapContainer id="map"></MapContainer> */}
              <PaddingMd />
              <PlaceReviews
                keyword={keyword}
                reviewItems={reviewItems}
                hasMore={hasMore}
                loadFirstReviews={loadFirstReviews}
                loadMoreReviews={loadMoreReviews}
              />
            </PlaceIntroPadding>
          </PlaceInfoWrapper>
        </GridItem>
      </AppLayout>
    </BackGround>
  );
};

export default PlaceInfo;
