import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Wrapper } from './Gallery.styles';
import { createGlobalStyle } from "styled-components";

interface GalleryProps {
  images: string[];
}
export const SwiperCustomStyle = createGlobalStyle`
  .swiper-button-prev,
  .swiper-button-next {
    color: #15BDB1; /* ← 화살표 색상 */
    font-weight:1000;
  }

  .swiper-pagination-bullet {
    background: #ccc; /* ← 기본 점 색상 */
    opacity: 1;
        font-weight:bold;

  }

  .swiper-pagination-bullet-active {
    background: #15BDB1; /* ← 선택된 점 색상 */
  }
`;
const Gallery = ({ images }: GalleryProps) => {
  return (
    <Wrapper style={{ marginBottom:"4rem", maxWidth: "700px", margin: "0 auto"}}>
      <SwiperCustomStyle/>
      <Swiper
     
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img
              src={image}
              alt={image}
              style={{
                margin: "0 auto",
                width: "100%",
                height: "auto", 
                objectFit: "cover", 
                borderRadius: "8px", 
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
              }}
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default Gallery;
