import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Wrapper } from './Gallery.styles';

interface ImageItem {
  contentid: number;
  imgname: string;
  originimgurl: string;
  serialnum: string;
}
interface GalleryProps {
  images: ImageItem[];
}
const Gallery = ({ images }: GalleryProps) => {
  return (
    <Wrapper style={{ marginBottom:"4rem", maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
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
          <SwiperSlide key={image.serialnum}>
            <img
              src={image.originimgurl}
              alt={image.imgname}
              style={{
                margin: "0 auto",
                width: "80%",
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
